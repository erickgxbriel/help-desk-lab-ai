import json
from openai import OpenAI
from models import Settings, Ticket, Message
from schemas import EvaluationResponse

EVALUATOR_SYSTEM_PROMPT = """You are an senior IT Service Desk Quality Auditor. Your job is to evaluate a technical support technician's performance based on their chat history with a user and their final proposed diagnosis.

You must compare the technician's chat and final diagnosis with:
- The ticket's expected solution: {expected_solution}
- The internal technical context: {context}
- Target keywords: {keywords}

Evaluate the following criteria:
1. **Qualidade das perguntas** (Did they ask logical troubleshooting questions to isolate the issue?).
2. **Capacidade de triagem** (Did they narrow down the symptoms?).
3. **Clareza da comunicação** (Was the language professional, empathetic, and clear to the user profile?).
4. **Identificação da causa** (Does the final diagnosis match the actual root cause?).
5. **Profundidade de troubleshooting** (Did they avoid random guesswork and focus on structural steps?).
6. **Postura profissional** (Were they polite, patient, and helpful?).
7. **Encerramento adequado** (Did they verify resolution before closing?).

You must respond ONLY with a JSON object matching this structure (no markdown boxes, no other text):
{{
  "score": <integer from 0 to 100>,
  "strengths": [<string list of 2-3 key strengths>],
  "improvements": [<string list of 2-3 areas of improvement>],
  "diagnosis_probable": "<a summary of what the technician diagnosed>",
  "expected_solution": "{expected_solution}",
  "feedback_text": "<detailed helpful feedback paragraph explaining the score, what was done well, and what could be done better next time>"
}}
"""

def evaluate_ticket(settings: Settings, ticket: Ticket, chat_history: list[Message], proposed_diagnosis: str) -> EvaluationResponse:
    # 1. Check if mock mode is used
    if settings.provider == "mock" or not settings.api_key:
        return get_mock_evaluation(ticket, chat_history, proposed_diagnosis)

    # 2. Build LLM call
    try:
        if settings.provider == "openai":
            client = OpenAI(api_key=settings.api_key)
        else: # ollama
            client = OpenAI(
                base_url=settings.base_url or "http://localhost:11434/v1",
                api_key="ollama"
            )

        chat_transcript = ""
        for msg in chat_history:
            role_name = "Técnico (Suporte)" if msg.sender == "AGENT" else f"Usuário ({ticket.user_profile})"
            chat_transcript += f"{role_name}: {msg.content}\n"

        system_prompt = EVALUATOR_SYSTEM_PROMPT.format(
            expected_solution=ticket.expected_solution,
            context=ticket.context,
            keywords=ticket.keywords
        )

        user_prompt = f"Chat History:\n{chat_transcript}\n\nProposed Diagnosis by Technician:\n{proposed_diagnosis}"

        response = client.chat.completions.create(
            model=settings.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        result_json = json.loads(response.choices[0].message.content.strip())
        return EvaluationResponse(
            score=result_json.get("score", 50),
            strengths=result_json.get("strengths", ["Comunicação profissional"]),
            improvements=result_json.get("improvements", ["Investigação mais aprofundada"]),
            diagnosis_probable=result_json.get("diagnosis_probable", proposed_diagnosis),
            expected_solution=ticket.expected_solution,
            feedback_text=result_json.get("feedback_text", "Atendimento avaliado com sucesso.")
        )

    except Exception as e:
        print(f"Error evaluating ticket with LLM: {str(e)}. Using fallback rules.")
        return get_mock_evaluation(ticket, chat_history, proposed_diagnosis)


def get_mock_evaluation(ticket: Ticket, chat_history: list[Message], proposed_diagnosis: str) -> EvaluationResponse:
    """
    Fallback rule-based evaluator that scores based on keyword matching in chat history and diagnosis.
    """
    keywords = [kw.strip().lower() for kw in ticket.keywords.split(",") if kw.strip()]
    
    # Analyze text
    transcript_text = proposed_diagnosis.lower()
    agent_message_count = 0
    for msg in chat_history:
        if msg.sender == "AGENT":
            transcript_text += " " + msg.content.lower()
            agent_message_count += 1

    # Scoring logic
    score = 40  # base score
    matched_kws = [kw for kw in keywords if kw in transcript_text]
    
    # 15 points per matched keyword, max 45 points
    kw_points = len(matched_kws) * 15
    if kw_points > 45:
        kw_points = 45
    score += kw_points

    # Final diagnosis matching core keywords
    diag_lower = proposed_diagnosis.lower()
    matched_diag_kws = [kw for kw in keywords if kw in diag_lower]
    if len(matched_diag_kws) >= 1:
        score += 15

    # Check politeness
    polite_words = ["por favor", "obrigado", "obrigada", "desculpe", "boa tarde", "bom dia", "olá", "ola"]
    has_polite = any(word in transcript_text for word in polite_words)
    if has_polite:
        score += 5

    # Deduct if messages are too few
    if agent_message_count < 2:
        score -= 15
    elif agent_message_count >= 4:
        score += 5

    # Clamp
    score = max(10, min(100, score))

    # Generate strengths and improvements
    strengths = []
    improvements = []

    if has_polite:
        strengths.append("Cortesia e profissionalismo no atendimento")
    else:
        improvements.append("Demonstrar maior empatia e cordialidade na saudação")

    if len(matched_kws) >= len(keywords) // 2 and len(keywords) > 0:
        strengths.append("Investigação focada nas causas corretas do problema")
    else:
        improvements.append("Realizar perguntas mais específicas para isolar a causa raiz")

    if agent_message_count >= 3:
        strengths.append("Troubleshooting estruturado com iterações adequadas")
    else:
        improvements.append("Evitar pressa no diagnóstico; colha mais informações antes de concluir")

    if score >= 80:
        feedback_text = (
            f"Excelente atendimento! Você conseguiu identificar a causa do problema '{ticket.title}' "
            f"e propôs a solução correta ({ticket.expected_solution}). Manteve uma postura profissional "
            f"e resolveu o caso com maestria. Parabéns!"
        )
    elif score >= 60:
        feedback_text = (
            f"Bom trabalho técnico. Você identificou alguns aspectos fundamentais do problema, "
            f"mas faltou refinar a investigação. Lembre-se de certificar-se de todos os detalhes físicos "
            f"e lógicos antes de formular o diagnóstico final. A solução esperada era: {ticket.expected_solution}."
        )
    else:
        feedback_text = (
            f"O atendimento ficou abaixo do ideal para o nível do chamado. Faltou fazer perguntas cruciais "
            f"para o usuário final e isolar a causa. A solução esperada envolvia: {ticket.expected_solution}. "
            f"Pratique fazendo perguntas sobre conexões de cabos, mensagens de erro exatas e histórico recente."
        )

    return EvaluationResponse(
        score=score,
        strengths=strengths if strengths else ["Registro do chamado no sistema"],
        improvements=improvements if improvements else ["Seguir o roteiro padrão de suporte N1"],
        diagnosis_probable=proposed_diagnosis if proposed_diagnosis else "Nenhum diagnóstico detalhado fornecido",
        expected_solution=ticket.expected_solution,
        feedback_text=feedback_text
    )
