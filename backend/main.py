import datetime
import random
import json
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import engine, Base, SessionLocal, get_db
from models import Settings, Ticket, Message
from schemas import (
    SettingsSchema, SettingsBase, TicketSchema, TicketDetailSchema,
    TicketCreateSchema, TicketResolveSchema, EvaluationResponse,
    DashboardStats, MessageSchema
)
from seed import seed_db, INITIAL_TICKETS
from ai import generate_user_response
from evaluator import evaluate_ticket

# Predefined templates for random ticket generation when AI is offline/mock
RANDOM_SCENARIOS = [
    {
        "title": "VPN caindo ao acessar arquivos pesados",
        "category": "VPN",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "A placa de rede do usuário está configurada com MTU incorreto (1500 em vez de 1350/1400) causando fragmentação excessiva de pacotes na VPN FortiClient, o que derruba o túnel. A solução é alterar o MTU da interface física ou da VPN.",
        "expected_solution": "Reduzir o MTU da placa de rede ou do FortiClient para 1350 ou 1400 via prompt de comando.",
        "keywords": "mtu,fragmentação,tamanho de pacote,cmd,interface,forticlient,reduzir"
    },
    {
        "title": "Documento travado na fila da impressora",
        "category": "Impressora",
        "priority": "LOW",
        "difficulty": "N1",
        "user_profile": "LEIGO",
        "context": "Um documento PDF muito pesado travou o spooler de impressão do Windows da máquina do usuário. Outros arquivos na fila não imprimem. O spooler precisa ser parado, os arquivos temporários apagados, e o spooler reiniciado.",
        "expected_solution": "Reiniciar o Spooler de Impressão no Windows (parar spooler, deletar arquivos em PRINTERS, iniciar spooler).",
        "keywords": "spooler,reiniciar,printers,fila,travado,limpar,serviços"
    },
    {
        "title": "Erro de sincronização de pastas no Teams",
        "category": "Teams",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "GESTOR",
        "context": "A pasta do SharePoint vinculada ao canal do Teams atingiu o limite de caracteres no caminho do arquivo (limite de 260 caracteres do Windows API). O usuário criou subpastas com nomes muito longos.",
        "expected_solution": "Renomear as pastas para encurtar o caminho do arquivo ou mover os arquivos para uma pasta raiz.",
        "keywords": "caminho,caracteres,nome da pasta,longo,renomear,limite"
    },
    {
        "title": "Não consigo conectar ao Wi-Fi corporativo",
        "category": "Wi-Fi",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "O certificado de autenticação 802.1X expirou no notebook do usuário ou a máquina perdeu a relação de confiança com o domínio. A solução é renovar a relação de confiança (re-adicionar ao domínio) ou esquecer a rede e conectar novamente.",
        "expected_solution": "Esquecer a rede Wi-Fi corporativa nas configurações e conectar novamente digitando as credenciais AD corretas.",
        "keywords": "esquecer rede,esquecer,senha,ad,reconectar,wi-fi"
    },
    {
        "title": "Aviso de armazenamento de e-mail cheio",
        "category": "Outlook / E-mail",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "DIRETOR",
        "context": "A caixa de entrada do Outlook atingiu a cota de 50GB. O usuário precisa arquivar e-mails antigos para um arquivo local (.pst) ou limpar a pasta de itens excluídos.",
        "expected_solution": "Criar um arquivo de dados do Outlook (.pst) para arquivar e-mails antigos localmente e esvaziar a Lixeira.",
        "keywords": "pst,arquivar,lixeira,esvaziar,cota,limpar,limite"
    },
    {
        "title": "Erro no logon do Windows: 'Serviço de Perfil de Usuário falhou'",
        "category": "Windows",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "ANSIOSO",
        "context": "O perfil local do Windows foi corrompido durante uma atualização incorreta. É necessário acessar pelo administrador local, corrigir a chave do registro .bak em HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList ou recriar a pasta do perfil.",
        "expected_solution": "Acessar via administrador local, renomear a chave correspondente com .bak no registro do Windows (regedit) ou recriar o perfil.",
        "keywords": "regedit,registro,profilelist,bak,administrador,perfil,corrompido"
    },
    {
        "title": "Sem acesso à internet - Rede básica",
        "category": "Rede básica",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "CONFUSO",
        "context": "O notebook do usuário está configurado com um IP estático incorreto na placa de rede (configuração deixada de um trabalho de campo anterior). A solução é alterar as propriedades do protocolo IPv4 para obter endereço IP automaticamente (DHCP).",
        "expected_solution": "Configurar o adaptador de rede (IPv4) para obter endereço IP automaticamente via DHCP.",
        "keywords": "automatico,dhcp,obter ip,ipv4,propriedades,placa de rede"
    },
    {
        "title": "Erro de criptografia ao abrir e-mails assinados",
        "category": "Segurança básica",
        "priority": "HIGH",
        "difficulty": "DESAFIO",
        "user_profile": "TECNICO",
        "context": "O certificado digital do usuário (Token A3 ou certificado de e-mail S/MIME) expirou ou não está instalado no repositório de certificados do Windows. O suporte precisa reinstalar a cadeia de certificação ou o certificado pessoal.",
        "expected_solution": "Instalar ou renovar o certificado digital pessoal S/MIME no navegador/Windows e associá-lo ao Outlook.",
        "keywords": "certificado,s/mime,token,criptografia,assinado,instalar,cadeia"
    }
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database schema
    Base.metadata.create_all(bind=engine)
    # Seed default data
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title="Help Desk Lab AI Backend",
    description="Local simulator backend for N1/N2 Support Training",
    lifespan=lifespan
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for local localhost operations
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SETTINGS ENDPOINTS ---

@app.get("/api/settings", response_model=SettingsSchema)
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(Settings).first()
    if not settings:
        settings = Settings(
            provider="mock",
            api_key="",
            base_url="",
            model="gpt-4o-mini",
            temperature=0.7,
            simulation_mode="normal"
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@app.post("/api/settings", response_model=SettingsSchema)
def update_settings(payload: SettingsBase, db: Session = Depends(get_db)):
    settings = db.query(Settings).first()
    if not settings:
        settings = Settings()
        db.add(settings)
    
    settings.provider = payload.provider
    settings.api_key = payload.api_key
    settings.base_url = payload.base_url
    settings.model = payload.model
    settings.temperature = payload.temperature
    settings.simulation_mode = payload.simulation_mode
    
    db.commit()
    db.refresh(settings)
    return settings

@app.post("/api/settings/reset")
def reset_database(db: Session = Depends(get_db)):
    # Clear messages
    db.query(Message).delete()
    # Clear tickets
    db.query(Ticket).delete()
    # Clear settings
    db.query(Settings).delete()
    db.commit()
    
    # Recreate tables and seed
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    seed_db(db)
    return {"message": "Database has been reset and seeded successfully!"}

# --- STATS / DASHBOARD ENDPOINTS ---

@app.get("/api/stats", response_model=DashboardStats)
def get_stats(db: Session = Depends(get_db)):
    total = db.query(Ticket).count()
    opened = db.query(Ticket).filter(Ticket.status == "OPEN").count()
    completed = db.query(Ticket).filter(Ticket.status == "SOLVED").count()
    
    # Calculate average score of solved tickets
    avg_score_res = db.query(func.avg(Ticket.score)).filter(Ticket.status == "SOLVED").scalar()
    avg_score = round(float(avg_score_res), 1) if avg_score_res is not None else 0.0
    
    # Fetch last 5 tickets
    recent = db.query(Ticket).order_by(Ticket.created_at.desc()).limit(5).all()
    
    return DashboardStats(
        total_tickets=total,
        open_tickets=opened,
        completed_tickets=completed,
        avg_score=avg_score,
        recent_tickets=recent
    )

# --- TICKETS ENDPOINTS ---

@app.get("/api/tickets", response_model=list[TicketSchema])
def list_tickets(db: Session = Depends(get_db)):
    return db.query(Ticket).order_by(Ticket.created_at.desc()).all()

@app.get("/api/tickets/{ticket_id}", response_model=TicketDetailSchema)
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.post("/api/tickets/generate", response_model=TicketSchema)
def generate_ticket(payload: TicketCreateSchema, db: Session = Depends(get_db)):
    # 1. Fetch current settings to see if we can use LLM for generation
    settings = db.query(Settings).first()
    
    # 2. Setup metadata fields
    categories = [
        "Impressora", "Outlook / E-mail", "Windows", "Teams", "VPN", "Wi-Fi", 
        "Senha / Acesso", "OneDrive", "Rede básica", "Linux básico", 
        "Active Directory básico", "Segurança básica", "Software corporativo",
        "Erro de login", "Permissões", "Sistema lento", "Chamado genérico de suporte"
    ]
    difficulties = ["N1", "N2", "DESAFIO"]
    profiles = ["LEIGO", "APRESSADO", "CONFUSO", "GESTOR", "DIRETOR", "RH", "FINANCEIRO", "TECNICO", "ANSIOSO"]
    priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]

    category = payload.category or random.choice(categories)
    difficulty = payload.difficulty or random.choice(difficulties)
    user_profile = payload.user_profile or random.choice(profiles)
    priority = payload.priority or random.choice(priorities)
    
    # Generate unique ID
    last_id = db.query(Ticket).order_by(Ticket.id.desc()).first()
    if last_id and last_id.id.startswith("HD-"):
        try:
            next_num = int(last_id.id.split("-")[1]) + 1
            ticket_id = f"HD-{next_num}"
        except ValueError:
            ticket_id = f"HD-{random.randint(1011, 9999)}"
    else:
        ticket_id = "HD-1011"

    # AI generation if API Key available and not mock
    if settings and settings.provider != "mock" and settings.api_key:
        try:
            client = OpenAI(api_key=settings.api_key)
            prompt = f"""Gere um caso de simulação de suporte de TI realista.
Categoria: {category}
Nível de dificuldade: {difficulty}
Perfil de personalidade do usuário final: {user_profile}
Urgência/Prioridade: {priority}

Retorne APENAS um JSON (sem caixas de código ```json e sem outro texto) com a seguinte estrutura:
{{
  "title": "Título conciso do ticket",
  "description": "Descrição inicial escrita pelo usuário final (linguagem informal, curta, com sintomas)",
  "context": "Contexto técnico detalhado do problema (causa oculta real)",
  "expected_solution": "Qual a ação exata esperada pelo técnico para solucionar (máximo 2 frases)",
  "keywords": "palavra-chave1,palavra-chave2,palavra-chave3 (3 a 5 palavras separadas por vírgula)"
}}
"""
            response = client.chat.completions.create(
                model=settings.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                response_format={"type": "json_object"}
            )
            data = json.loads(response.choices[0].message.content.strip())
            
            new_ticket = Ticket(
                id=ticket_id,
                title=data["title"],
                description=data["description"],
                category=category,
                priority=priority,
                difficulty=difficulty,
                user_profile=user_profile,
                context=data["context"],
                expected_solution=data["expected_solution"],
                keywords=data["keywords"],
                status="OPEN"
            )
            db.add(new_ticket)
            db.commit()
            db.refresh(new_ticket)
            return new_ticket
        except Exception as e:
            print(f"AI Ticket Generation failed: {str(e)}. Falling back to local template pool.")

    # Fallback / Local template generator
    # Filter scenarios matching selected category if possible, or pick random
    pool = [s for s in RANDOM_SCENARIOS if s["category"] == category]
    if not pool:
        pool = RANDOM_SCENARIOS
    
    scenario = random.choice(pool)
    
    # Overwrite properties with selection
    new_ticket = Ticket(
        id=ticket_id,
        title=scenario["title"],
        description=scenario["description"],
        category=category,
        priority=priority,
        difficulty=difficulty,
        user_profile=user_profile,
        context=scenario["context"],
        expected_solution=scenario["expected_solution"],
        keywords=scenario["keywords"],
        status="OPEN"
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket

# --- CHAT / SIMULATION ENDPOINTS ---

@app.post("/api/tickets/{ticket_id}/chat", response_model=list[MessageSchema])
def send_chat_message(ticket_id: str, payload: MessageCreate, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    if ticket.status != "OPEN":
        raise HTTPException(status_code=400, detail="Ticket is already finalized")

    # 1. Save agent message
    agent_msg = Message(
        ticket_id=ticket_id,
        sender="AGENT",
        content=payload.content
    )
    db.add(agent_msg)
    db.commit()

    # 2. Get history and settings
    settings = db.query(Settings).first() or Settings()
    chat_history = db.query(Message).filter(Message.ticket_id == ticket_id).order_by(Message.created_at.asc()).all()

    # 3. Generate response from AI/Mock
    user_response_text = generate_user_response(settings, ticket, chat_history)

    # 4. Save user (customer) response
    user_msg = Message(
        ticket_id=ticket_id,
        sender="USER",
        content=user_response_text
    )
    db.add(user_msg)
    db.commit()

    # Return refreshed history
    return db.query(Message).filter(Message.ticket_id == ticket_id).order_by(Message.created_at.asc()).all()

# --- EVALUATION / FINALIZATION ENDPOINTS ---

@app.post("/api/tickets/{ticket_id}/resolve", response_model=EvaluationResponse)
def resolve_ticket(ticket_id: str, payload: TicketResolveSchema, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    settings = db.query(Settings).first() or Settings()
    chat_history = db.query(Message).filter(Message.ticket_id == ticket_id).order_by(Message.created_at.asc()).all()

    # Run evaluation
    eval_res = evaluate_ticket(settings, ticket, chat_history, payload.diagnosis)

    # Update ticket status
    ticket.status = "SOLVED"
    ticket.score = eval_res.score
    
    # Store feedback as JSON string
    feedback_data = {
        "strengths": eval_res.strengths,
        "improvements": eval_res.improvements,
        "diagnosis_probable": eval_res.diagnosis_probable,
        "feedback_text": eval_res.feedback_text
    }
    ticket.feedback = json.dumps(feedback_data)
    
    db.commit()
    return eval_res

@app.post("/api/tickets/{ticket_id}/restart", response_model=TicketDetailSchema)
def restart_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Clear messages
    db.query(Message).filter(Message.ticket_id == ticket_id).delete()
    
    # Reset ticket details
    ticket.status = "OPEN"
    ticket.score = None
    ticket.feedback = None
    
    db.commit()
    db.refresh(ticket)
    return ticket
