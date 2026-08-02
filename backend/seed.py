import datetime
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import Ticket, Settings

INITIAL_TICKETS = [
    {
        "id": "HD-1001",
        "title": "Não consigo acessar o Outlook / E-mail",
        "description": "Fica pedindo senha o tempo todo e dá erro de conexão com o servidor. Preciso mandar um relatório urgente.",
        "category": "Outlook / E-mail",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "APRESSADO",
        "context": "O e-mail do usuário foi migrado recentemente e há credenciais antigas corrompidas no Gerenciador de Credenciais do Windows. A solução é limpar as credenciais antigas do Outlook e reiniciar o aplicativo.",
        "expected_solution": "Limpar as credenciais do Outlook (MS.Outlook) no painel de controle / Gerenciador de Credenciais do Windows e reiniciar o Outlook.",
        "keywords": "gerenciador de credenciais,credenciais,limpar,painel de controle,remover"
    },
    {
        "id": "HD-1002",
        "title": "Impressora do setor financeiro offline",
        "description": "Tento imprimir meus relatórios e diz que a impressora está offline. Já apertei o botão e nada.",
        "category": "Impressora",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "LEIGO",
        "context": "A impressora perdeu a conexão de rede IP estática devido a uma mudança no switch, mas neste caso específico, o cabo de rede RJ45 está desconectado na parte traseira da impressora. O usuário apenas verificou se ela estava ligada na tomada.",
        "expected_solution": "Verificar se o cabo de rede RJ45 atrás da impressora está conectado firmemente e reconectá-lo.",
        "keywords": "cabo de rede,cabo,rj45,atrás,conectar,plugado"
    },
    {
        "id": "HD-1003",
        "title": "VPN não conecta - Acesso Remoto",
        "description": "Estou em home office e a VPN FortiClient dá erro de credenciais inválidas ou falha de conexão. Preciso acessar a rede interna.",
        "category": "VPN",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "ANSIOSO",
        "context": "O usuário está digitando a senha correta, mas seu token MFA (autenticação de dois fatores) no celular está desbalanceado (hora incorreta do celular) ou ele esqueceu de digitar o código MFA no campo apropriado. Na verdade, ele precisa sincronizar o aplicativo do token ou digitar a senha seguida do código.",
        "expected_solution": "Sincronizar a hora do celular / aplicativo de MFA ou digitar o código do token MFA na autenticação.",
        "keywords": "mfa,token,celular,sincronizar,hora,autenticação"
    },
    {
        "id": "HD-1004",
        "title": "Teams sem áudio durante reuniões",
        "description": "Eu escuto as pessoas mas ninguém me ouve nas reuniões do Teams. O ícone de microfone não está mutado.",
        "category": "Teams",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "GESTOR",
        "context": "O Teams selecionou por padrão o dispositivo de entrada de áudio errado (uma webcam externa sem microfone) em vez do headset USB do usuário. A solução é mudar o dispositivo de entrada nas configurações de dispositivo do Teams.",
        "expected_solution": "Alterar o dispositivo de entrada (microfone) nas configurações do Microsoft Teams para o Headset USB.",
        "keywords": "configurações,dispositivo,entrada,microfone,teams,headset,alterar"
    },
    {
        "id": "HD-1005",
        "title": "Senha do Active Directory expirada",
        "description": "Cheguei para trabalhar e o Windows diz que minha conta está bloqueada ou senha expirou. Não consigo logar.",
        "category": "Senha / Acesso",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "CONFUSO",
        "context": "A conta do usuário expirou no Active Directory porque ele passou mais de 90 dias sem trocar a senha. O suporte precisa redefinir a senha no AD e marcar a opção 'Usuário deve alterar a senha no próximo logon' e desbloquear a conta.",
        "expected_solution": "Redefinir a senha do usuário no console do Active Directory (AD) e desbloquear a conta.",
        "keywords": "active directory,ad,redefinir,senha,desbloquear,desbloqueio"
    },
    {
        "id": "HD-1006",
        "title": "OneDrive não sincroniza arquivos da pasta",
        "description": "Coloco arquivos na pasta do OneDrive mas eles não sobem para a nuvem. Fica um ícone de setinhas azuis infinito.",
        "category": "OneDrive",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "O armazenamento da conta OneDrive do usuário atingiu o limite de cota (100% cheio) devido a backups pessoais de fotos que ele colocou lá, ou a conta está deslogada. Nesse caso, a conta foi deslogada devido à expiração de sessão e precisa ser reautenticada.",
        "expected_solution": "Sair da conta no aplicativo do OneDrive e fazer login novamente para reestabelecer a sincronização.",
        "keywords": "login,logar,entrar,sair,reautenticar,reiniciar"
    },
    {
        "id": "HD-1007",
        "title": "Computador extremamente lento",
        "description": "Não consigo trabalhar. Para abrir o navegador demora 5 minutos. Travando tudo.",
        "category": "Sistema lento",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "DIRETOR",
        "context": "O computador está com o uso de disco em 100% no Windows 10/11 devido ao serviço SysMain (antigo Superfetch) ou Windows Update travado em segundo plano. O suporte deve desativar temporariamente o SysMain ou reiniciar o serviço de Windows Update.",
        "expected_solution": "Desativar o serviço SysMain (Superfetch) nos Serviços do Windows (services.msc) ou reiniciar o Windows Update.",
        "keywords": "sysmain,superfetch,serviços,services.msc,disco 100%"
    },
    {
        "id": "HD-1008",
        "title": "Acesso Negado a Pasta Compartilhada na Rede",
        "description": "Preciso acessar a pasta do Financeiro no servidor local, mas dá erro de 'Acesso Negado' quando clico.",
        "category": "Permissões",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "O usuário mudou de cargo recentemente e não foi adicionado ao grupo de segurança correto (por exemplo, 'GG_Financeiro_RW') no Active Directory. O analista de suporte precisa adicionar o usuário ao grupo no AD e pedir para o usuário fazer logoff e logon novamente.",
        "expected_solution": "Adicionar o usuário ao grupo de segurança de rede correspondente no Active Directory e instruí-lo a fazer logoff/logon.",
        "keywords": "grupo,segurança,active directory,ad,adicionar,logoff,reiniciar sessão"
    },
    {
        "id": "HD-1009",
        "title": "Wi-Fi da empresa desconectando direto",
        "description": "Estou na sala de reuniões e o Wi-Fi conecta mas fica caindo a cada 2 minutos. Fico sem internet.",
        "category": "Wi-Fi",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "O driver do adaptador de rede sem fio (Wi-Fi) do notebook do usuário está desatualizado ou a placa está configurada para entrar em modo de economia de energia. A solução imediata é desmarcar a opção de economia de energia nas propriedades do adaptador de rede no Gerenciador de Dispositivos.",
        "expected_solution": "Desativar a opção 'O computador pode desligar o dispositivo para economizar energia' nas propriedades do adaptador Wi-Fi no Gerenciador de Dispositivos.",
        "keywords": "energia,gerenciador de dispositivos,adaptador,economia,desmarcar,propriedades"
    },
    {
        "id": "HD-1010",
        "title": "Sistema Corporativo ERP não abre",
        "description": "Clico no ícone do sistema de Vendas e aparece um erro dizendo que não foi possível conectar ao banco de dados Oracle da filial.",
        "category": "Software corporativo",
        "priority": "CRITICAL",
        "difficulty": "DESAFIO",
        "user_profile": "CONFUSO",
        "context": "O arquivo tnsnames.ora do Oracle Client na máquina do usuário foi corrompido ou o IP do servidor mudou e não foi atualizado. Além disso, o usuário está com as configurações de DNS incorretas na placa de rede, apontando para um DNS público (8.8.8.8) em vez do DNS interno da empresa. O suporte precisa configurar o DNS correto na placa de rede do usuário.",
        "expected_solution": "Alterar as configurações de DNS do adaptador de rede para obter o IP do DNS interno da empresa automaticamente ou setar os IPs corretos dos servidores DNS locais.",
        "keywords": "dns,servidor dns,interno,placa de rede,adaptador,configurar"
    }
]

def seed_db(db: Session):
    # Check if settings already exist, if not, create default
    settings_count = db.query(Settings).count()
    if settings_count == 0:
        db.add(Settings(
            provider="mock",
            api_key="",
            base_url="",
            model="gpt-4o-mini",
            temperature=0.7,
            simulation_mode="normal"
        ))
        db.commit()

    # Check if tickets exist
    ticket_count = db.query(Ticket).count()
    if ticket_count == 0:
        for t in INITIAL_TICKETS:
            db_ticket = Ticket(
                id=t["id"],
                title=t["title"],
                description=t["description"],
                category=t["category"],
                priority=t["priority"],
                difficulty=t["difficulty"],
                user_profile=t["user_profile"],
                context=t["context"],
                expected_solution=t["expected_solution"],
                keywords=t["keywords"],
                status="OPEN"
            )
            db.add(db_ticket)
        db.commit()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_db(db)
        print("Database seeded successfully!")
    finally:
        db.close()
