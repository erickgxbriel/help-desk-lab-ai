import json
from openai import OpenAI
from models import Settings, Ticket, Message

# System prompt templates
SYSTEM_PROMPT_TEMPLATE = """You are the END USER (customer/employee) of a company. You are NOT an AI assistant, and you are NOT a technical support agent.
You are chatting with the internal IT Help Desk technician to solve your problem.

Your ticket details:
- Title: {title}
- What you reported: {description}
- Internal technical context (you don't know this technically, but it dictates the reality of your device): {context}
- Expected solution: {expected_solution}

Your personality profile: {profile}
- LEIGO: Absolutely non-technical, uses vague terms (like 'the thingy', 'screen is blank'), doesn't know IT jargon (IP address, driver, etc.), gets confused easily.
- APRESSADO: Very short answers, impatient, mentions they have an urgent meeting, complains about delays.
- CONFUSO: Mixes up systems, explains things poorly, forgets what they did, changes topics.
- GESTOR: Professional but demanding, worried about team productivity, asks for ETAs.
- DIRETOR: Highly busy, expects immediate resolution, polite but firm, has zero patience for technical jargon.
- RH: Friendly, polite, talks about payroll/people impact, non-technical.
- FINANCEIRO: Anxious about reports/deadlines, very organized, mentions files/numbers.
- TECNICO: Knows some IT, might have tried basic things (like restarting), uses technical terms, but still needs you to guide the fix.
- ANSIOSO: Panicky, worried they will lose files or get fired, asks for reassurance.

Difficulty Level: {difficulty}
- N1: standard issue. If asked simple questions, you give clear clues.
- N2: intermediate. You give clues only if the agent asks clear, specific questions.
- DESAFIO: hard. Symptoms are ambiguous. You give incomplete clues, might be slightly evasive or confused, requiring deep investigation.

RULES OF ENGAGEMENT:
1. NEVER output any assistant-like formatting. Do not say "Here is a response" or "Sure, I can simulate that". Talk EXACTLY as the employee.
2. Keep replies short, natural, and realistic (1 to 3 sentences).
3. NEVER tell the agent the technical cause or the expected solution directly. You do not know it!
4. Answer ONLY what is asked. Provide clues gradually and only when asked.
5. If the agent proposes the correct expected solution (or something extremely close), simulate trying it, and if it works, tell them it solved the issue (e.g. "Oh, I did that and now it is working! Thank you!").
6. If they propose a wrong solution (like restarting for a disconnected cable), tell them you tried it but it didn't change anything.
"""

def generate_user_response(settings: Settings, ticket: Ticket, chat_history: list[Message]) -> str:
    # 1. Check if using Mock mode
    if settings.provider == "mock" or not settings.api_key:
        return get_mock_response(ticket, chat_history)

    # 2. Build OpenAI or Ollama client
    try:
        if settings.provider == "openai":
            client = OpenAI(api_key=settings.api_key)
        else:  # ollama
            client = OpenAI(
                base_url=settings.base_url or "http://localhost:11434/v1",
                api_key="ollama" # placeholder
            )

        # Build messages
        system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
            title=ticket.title,
            description=ticket.description,
            context=ticket.context,
            expected_solution=ticket.expected_solution,
            profile=ticket.user_profile,
            difficulty=ticket.difficulty
        )

        messages = [{"role": "system", "content": system_prompt}]
        for msg in chat_history:
            role = "assistant" if msg.sender == "AGENT" else "user"
            messages.append({"role": role, "content": msg.content})

        response = client.chat.completions.create(
            model=settings.model,
            messages=messages,
            temperature=settings.temperature,
            max_tokens=150
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error calling LLM: {str(e)}. Falling back to mock responses.")
        return get_mock_response(ticket, chat_history)


def get_mock_response(ticket: Ticket, chat_history: list[Message]) -> str:
    """
    Fallback rule-based simulator for when there is no internet, no API key, or Mock mode is selected.
    It analyzes the last message sent by the agent and responds based on the ticket context.
    """
    if not chat_history:
        return "Olá. " + ticket.description

    last_agent_msg = ""
    for msg in reversed(chat_history):
        if msg.sender == "AGENT":
            last_agent_msg = msg.content.lower()
            break

    if not last_agent_msg:
        return "Olá? Tem alguém aí?"

    # Check if agent is greeting
    if any(greet in last_agent_msg for greet in ["olá", "ola", "bom dia", "boa tarde", "tudo bem", "como vai"]):
        if ticket.user_profile == "APRESSADO":
            return "Olá, tudo. Mas por favor, preciso resolver isso rápido, tenho uma reunião em 10 minutos!"
        elif ticket.user_profile == "ANSIOSO":
            return "Oi, tudo bem? Ai, ainda bem que atendeu! Estou desesperada, meus arquivos sumiram?"
        elif ticket.user_profile == "DIRETOR":
            return "Olá. Preciso de suporte imediato. Minha equipe está aguardando os relatórios."
        else:
            return f"Olá, tudo bem. Meu problema é: {ticket.description}"

    # Check if agent proposed the correct expected solution (keyword matching)
    keywords = [kw.strip().lower() for kw in ticket.keywords.split(",") if kw.strip()]
    matched_kws = [kw for kw in keywords if kw in last_agent_msg]

    # If the user proposes a solution containing the target keywords
    if len(matched_kws) >= 2 or (len(keywords) == 1 and len(matched_kws) >= 1):
        if ticket.user_profile == "LEIGO":
            return "Nossa! Fiz o que você falou... E não é que funcionou? Deu certo aqui! Muito obrigado!"
        elif ticket.user_profile == "APRESSADO":
            return "Funcionou! Finalmente. Obrigado pelo atendimento rápido. Tchau!"
        elif ticket.user_profile == "DIRETOR":
            return "Excelente. O problema foi resolvido. Agradeço a eficiência."
        else:
            return "Deu certo! Agora voltou a funcionar normalmente. Muito obrigado pela ajuda!"

    # Specific responses based on ticket context questions
    if ticket.id == "HD-1002": # Printer offline (RJ45 disconnected)
        if "ligad" in last_agent_msg or "painel" in last_agent_msg:
            return "Sim, a luzinha verde está acesa na frente, ela liga normal."
        if "cabo" in last_agent_msg or "atrás" in last_agent_msg or "atras" in last_agent_msg:
            return "Espera, deixa eu ver atrás dela... Tem um cabo cinza solto aqui no chão! É para ligar ali na portinha preta?"
        return "Eu já tentei desligar e ligar de novo, mas na tela do computador continua dizendo offline."

    elif ticket.id == "HD-1001": # Outlook credentials
        if "senha" in last_agent_msg or "credencial" in last_agent_msg:
            return "Ele pede a minha senha da rede, eu digito certinho, mas dois segundos depois a caixinha de senha aparece de novo."
        if "painel de controle" in last_agent_msg or "gerenciador" in last_agent_msg:
            return "Achei esse Gerenciador de Credenciais. Tem uma linha escrita 'MS.Outlook'. O que eu faço com ela?"
        return "Já fechei e abri o Outlook e não adiantou. O que mais posso tentar?"

    elif ticket.id == "HD-1003": # VPN MFA time sync
        if "senha" in last_agent_msg:
            return "Sim, tenho certeza absoluta que a senha está certa. Digito ela todo dia."
        if "celular" in last_agent_msg or "token" in last_agent_msg or "mfa" in last_agent_msg:
            return "Eu coloco o código do aplicativo Authenticator. Ele gera um número novo a cada 30 segundos. Mas diz que falhou."
        if "hora" in last_agent_msg or "sincronizar" in last_agent_msg:
            return "Ah, no meu celular a hora estava manual porque viajei semana passada. Mudei para automático e sincronizei... Deixa eu tentar conectar a VPN... Olha, conectou!"
        return "O FortiClient tenta conectar, chega em 40% e dá erro de credenciais inválidas."

    elif ticket.id == "HD-1004": # Teams micro
        if "configura" in last_agent_msg or "dispositivo" in last_agent_msg:
            return "Abri as configurações de dispositivo no Teams. Em microfone está selecionado 'Webcam USB'. Eu tenho um headset plugado."
        if "headset" in last_agent_msg or "fone" in last_agent_msg or "mudar" in last_agent_msg:
            return "Mudei o microfone para 'Headset USB'. Ei, você consegue me escutar agora no teste?"
        return "Eu escuto o som da reunião pelos fones, mas quando falo o pessoal diz no chat que não me ouve."

    elif ticket.id == "HD-1005": # AD Password expired
        if "última vez" in last_agent_msg or "ultima vez" in last_agent_msg:
            return "Ih, faz muito tempo que não mudo a senha. Acho que uns 3 ou 4 meses."
        return "Eu digito a senha e aparece: 'Sua conta foi bloqueada ou sua senha expirou'."

    # General fallback messages matching the profiles
    if ticket.user_profile == "LEIGO":
        return "Não entendi muito bem. Você pode me explicar de um jeito mais simples o que eu devo clicar?"
    elif ticket.user_profile == "APRESSADO":
        return "Podemos agilizar? Ainda não resolveu e preciso entrar na reunião."
    elif ticket.user_profile == "ANSIOSO":
        return "Será que meu computador quebrou? Por favor, me diz que não vou perder meu trabalho!"
    elif ticket.user_profile == "TECNICO":
        return "Eu já reiniciei a máquina e verifiquei o status do serviço local, mas o erro persiste."
    else:
        return "Entendi. E qual seria o próximo passo para resolver isso?"
