import json
from openai import OpenAI
from models import Settings, Ticket, Message

SYSTEM_PROMPT_TEMPLATE = """You are a simulated employee in a company contacting the IT Service Desk for help.
Your details:
- Issue: {title}
- What you are experiencing: {description}
- Real hidden technical cause (NEVER reveal this directly, only describe symptoms when asked): {context}
- Personality/Profile: {profile}
- Expected solution needed: {expected_solution}
- Scenario Difficulty: {difficulty}

Rules for your roleplay:
1. Stay in character! If you are LEIGO, you don't know technical terms (e.g. describe what you see on the screen).
2. If you are APRESSADO, be impatient and ask to hurry up.
3. If you are ANSIOSO, worry about losing files and breaking things.
4. If you are TECNICO, give exact error messages when requested.
5. If the technician asks troubleshooting questions, answer honestly according to the technical context.
6. If the technician explains how to fix it, follow their instructions and confirm if it worked!
7. NEVER solve the ticket by yourself upfront. Only confirm success AFTER the technician instructs you with the steps!
8. Respond concisely in Portuguese (1-3 sentences max).
"""

def get_llm_client(settings: Settings) -> tuple[OpenAI, str]:
    provider = settings.provider.lower()
    if provider == "openrouter":
        return OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.api_key,
            default_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Service Desk Lab",
            }
        ), settings.model or "meta-llama/llama-3.3-70b-instruct"
    elif provider == "gemini":
        return OpenAI(
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
            api_key=settings.api_key
        ), settings.model or "gemini-1.5-flash"
    elif provider == "ollama":
        return OpenAI(
            base_url=settings.base_url or "http://localhost:11434/v1",
            api_key="ollama"
        ), settings.model or "llama3:8b"
    else:  # openai
        return OpenAI(
            base_url=settings.base_url if settings.base_url else None,
            api_key=settings.api_key
        ), settings.model or "gpt-4o-mini"


def generate_user_response(settings: Settings, ticket: Ticket, chat_history: list[Message]) -> str:
    if settings.provider == "mock" or (settings.provider != "ollama" and not settings.api_key):
        return get_mock_response(ticket, chat_history)

    try:
        client, model_name = get_llm_client(settings)
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
            model=model_name,
            messages=messages,
            temperature=settings.temperature,
            max_tokens=150
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Error calling LLM: {str(e)}. Falling back to mock responses.")
        return get_mock_response(ticket, chat_history)


def get_mock_response(ticket: Ticket, chat_history: list[Message]) -> str:
    last_agent_msg = ""
    for msg in reversed(chat_history):
        if msg.sender == "AGENT":
            last_agent_msg = msg.content.lower()
            break

    if not last_agent_msg:
        return "Olá? Tem alguém aí?"

    # --- HD-1020: Outlook Safe Senders / Lixo Eletrônico ---
    if ticket.id == "HD-1020":
        if any(w in last_agent_msg for w in ["confiáveis", "confiaveis", "adicionar", "salvar", "opções de lixo", "opcoes de lixo"]):
            return "Acessei 'Opções de Lixo Eletrônico' no Outlook e adicionei o domínio '@propostas-parceiro.com.br' em 'Remetentes Confiáveis'. O cliente reenviou a proposta e agora caiu direto na Caixa de Entrada! Deu certo!"
        if any(w in last_agent_msg for w in ["qual", "domínio", "dominio", "endereço", "endereco", "cliente", "remetente", "e-mail", "email"]):
            return "O e-mail do cliente é 'contato@propostas-parceiro.com.br' e o domínio é '@propostas-parceiro.com.br'. O que eu preciso fazer no Outlook para parar de cair no lixo eletrônico?"
        return "Todos os e-mails com arquivos PDF de propostas estão caindo direto na pasta de Lixo Eletrônico."

    # --- HD-1001: Outlook credentials ---
    elif ticket.id == "HD-1001":
        if any(w in last_agent_msg for w in ["apagar", "remover", "excluir", "limpar", "deletar"]):
            return "Abri o Gerenciador de Credenciais, excluí as entradas antigas do 'MS.Outlook' e reabri o Outlook. Ele pediu a senha uma única vez e conectou! Muito obrigado!"
        if any(w in last_agent_msg for w in ["webmail", "navegador", "chrome", "edge", "site"]):
            return "Pelo navegador (Outlook Web) eu consigo entrar normal com minha senha. O erro só acontece quando abro o aplicativo do Outlook no computador."
        if any(w in last_agent_msg for w in ["gerenciador", "painel"]):
            return "Achei esse Gerenciador de Credenciais no Windows. Tem várias entradas aqui, incluindo 'MS.Outlook'. É para remover?"
        return "O aplicativo do Outlook fica pedindo senha a cada 2 minutos em uma janelinha preta."

    # --- HD-1002: Impressora offline ---
    elif ticket.id == "HD-1002":
        if any(w in last_agent_msg for w in ["conectar", "empurrar", "plugar", "encaixar", "ligar"]):
            return "Pluguei o cabo firmemente na traseira até ouvir o clique. A luzinha verde começou a piscar e a impressão saiu na hora! Perfeito!"
        if any(w in last_agent_msg for w in ["cabo", "atrás", "atras", "luz", "painel"]):
            return "Olhei atrás da impressora e realmente o cabo de rede azul estava solto no chão! Eu conecto ele na portinha preta?"
        return "A impressora está ligada na tomada, mas no computador aparece 'Status: Offline'."

    # --- HD-1003: VPN MFA ---
    elif ticket.id == "HD-1003":
        if any(w in last_agent_msg for w in ["hora", "relógio", "relogio", "sincronizar", "automático", "automatico"]):
            return "O relógio do meu celular estava manual com 3 minutos de atraso! Mudei para automático e o código do token funcionou, a VPN conectou! Valeu!"
        if any(w in last_agent_msg for w in ["código", "codigo", "token", "authenticator", "mfa", "celular"]):
            return "Sim, eu abro o app Authenticator no celular e digito os 6 números, mas a VPN diz falha de autenticação."
        return "A VPN tenta conectar e dá erro de autenticação inválida."

    # --- HD-1004: Teams microfone ---
    elif ticket.id == "HD-1004":
        if any(w in last_agent_msg for w in ["mudar", "alterar", "selecionar", "escolher"]):
            return "Mudei para o microfone do Headset USB. Fiz o teste de chamada e o som está perfeito agora!"
        if any(w in last_agent_msg for w in ["dispositivo", "configuração", "configuracao", "qual", "headset", "microfone"]):
            return "Fui nas configurações do Teams e no microfone está selecionado 'Webcam Micro USB', mas meu headset está no conector USB."
        return "Nas reuniões do Teams todo mundo diz que não me ouve."

    # --- HD-1005: Senha AD ---
    elif ticket.id == "HD-1005":
        if any(w in last_agent_msg for w in ["reset", "redefinir", "nova senha", "desbloqueada", "desbloqueei", "trocar"]):
            return "Recebi a senha temporária e o Windows já pediu para eu criar uma nova senha. Consegui fazer login no sistema!"
        if any(w in last_agent_msg for w in ["tempo", "última", "ultima", "meses", "dias", "quando"]):
            return "Faz mais de 3 meses que não mudo minha senha. Aparece que a conta está bloqueada ou expirou."
        return "Não consigo logar no Windows de jeito nenhum."

    # --- HD-1011: BSOD MEMORY_MANAGEMENT ---
    elif ticket.id == "HD-1011":
        if any(w in last_agent_msg for w in ["mdsched", "diagnóstico", "diagnostico", "limpar", "trocar", "testar"]):
            return "Executei o mdsched.exe e ao reiniciar ele apontou defeito no módulo de memória RAM do slot 2. Vamos substituir o pente! Obrigado pelo diagnóstico preciso."
        if any(w in last_agent_msg for w in ["código", "codigo", "escrito", "erro", "tela azul"]):
            return "Aparece uma tela azul com a carinha triste e o código de parada é: MEMORY_MANAGEMENT."
        return "Meu computador desliga sozinho com tela azul toda vez que abro mais de 3 programas."

    # --- HD-1012: Sem vídeo GPU ---
    elif ticket.id == "HD-1012":
        if any(w in last_agent_msg for w in ["conectar", "mudar", "inferior", "baixo", "placa de vídeo", "placa de video"]):
            return "Tirei da porta de cima e conectei na porta HDMI de baixo da placa de vídeo... O monitor deu vídeo na hora! Que alívio!"
        if any(w in last_agent_msg for w in ["traseira", "onde", "porta", "cima", "baixo", "hdmi", "monitor"]):
            return "Olhei atrás: o cabo HDMI está na parte de cima perto dos USBs. Mas tem outra porta HDMI mais embaixo perto das ventoinhas da placa de vídeo."
        return "O cooler do computador gira forte, mas o monitor fica piscando 'Sem Sinal'."

    # --- HD-1013: Conflito de IP ---
    elif ticket.id == "HD-1013":
        if any(w in last_agent_msg for w in ["release", "renew", "renovar", "liberar"]):
            return "Digitei 'ipconfig /release' e depois 'ipconfig /renew'... Ele pegou o IP 192.168.1.142 e a internet voltou instantaneamente!"
        if any(w in last_agent_msg for w in ["ipconfig", "cmd", "qual", "ip", "endereço", "endereco"]):
            return "Abri o CMD e dei ipconfig. O meu IPv4 está como 192.168.1.105 e deu aviso de conflito de IP."
        return "Apareceu alerta de conflito de endereço IP e a internet caiu."

    # --- HD-1014: DNS vs Rota ---
    elif ticket.id == "HD-1014":
        if any(w in last_agent_msg for w in ["flushdns", "1.1.1.1", "8.8.8.8", "configurar"]):
            return "Executei 'ipconfig /flushdns' e configurei o DNS para 1.1.1.1. Todos os sites voltaram a carregar na hora!"
        if any(w in last_agent_msg for w in ["ping", "8.8.8.8", "teste"]):
            return "Dei o comando 'ping 8.8.8.8' e deu 'Resposta de 8.8.8.8 tempo=12ms'. Mas quando dou ping no google.com diz que a solicitação não encontrou o host."
        return "O navegador não abre nenhum site, mas a VPN continua conectada."

    # --- HD-1015: No bootable device ---
    elif ticket.id == "HD-1015":
        if any(w in last_agent_msg for w in ["tirar", "remover", "reiniciar", "desconectar", "desplugar"]):
            return "Tirei o pendrive e apertei o botão de ligar... O Windows iniciou normalmente direto no SSD!"
        if any(w in last_agent_msg for w in ["pendrive", "usb", "espetado", "conectado", "porta"]):
            return "Olhei aqui e tem um pendrive antigo plugado na porta USB lateral! Devo tirar ele?"
        return "Ligo o notebook e fica em tela preta dizendo 'No bootable device found'."

    # --- HD-1016: APIPA ---
    elif ticket.id == "HD-1016":
        if any(w in last_agent_msg for w in ["cabo", "tomada", "renew", "reconectar", "porta"]):
            return "Reconectei o cabo na tomada de rede da parede e dei 'ipconfig /renew'. Peguei o IP 10.0.1.25 e a rede corporativa voltou!"
        if any(w in last_agent_msg for w in ["ipconfig", "ip", "endereço", "endereco"]):
            return "Dei ipconfig no CMD e o IPv4 está como 169.254.88.12 e o Gateway está em branco."
        return "O ícone de rede está com exclamação amarela e 'Rede Não Identificada'."

    # --- HD-1017: GPO ---
    elif ticket.id == "HD-1017":
        if any(w in last_agent_msg for w in ["gpupdate", "force", "atualizar"]):
            return "Abri o CMD como Admin e digitei 'gpupdate /force'. Apareceu mensagem de sucesso e as minhas pastas de rede reapareceram no Meu Computador!"
        return "Mudei de setor na empresa e as pastas de rede mapeadas sumiram do Windows Explorer."

    # --- HD-1018: BitLocker ---
    elif ticket.id == "HD-1018":
        if any(w in last_agent_msg for w in ["chave", "digitar", "inserir", "números", "numeros"]):
            return "Digitei os 48 números que você informou e o Windows desbloqueou perfeitamente!"
        if any(w in last_agent_msg for w in ["key id", "identificador", "código", "codigo", "id"]):
            return "O Identificador da Chave (Key ID) que aparece na tela é: 8A4F-9C12. Você consegue ver a chave no portal da TI?"
        return "Liguei o notebook e apareceu tela azul do BitLocker pedindo chave de recuperação de 48 números."

    # --- HD-1019: M365 Licença ---
    elif ticket.id == "HD-1019":
        if any(w in last_agent_msg for w in ["conta", "arquivo", "desconectar", "relogar", "login"]):
            return "Fui em Arquivo > Conta no Word, cliquei em Desconectar e entrei novamente com meu e-mail corporativo. A faixa vermelha sumiu e o Office ativou!"
        return "O Word e o Excel mostram 'Produto Não Licenciado' e travaram a edição."

    # --- HD-1021: Phishing Incident ---
    elif ticket.id == "HD-1021":
        if any(w in last_agent_msg for w in ["desconectar", "puxar", "cabo", "desativar wifi", "wifi", "isolar"]):
            return "Desconectei o cabo de rede azul e desliguei a chavinha do Wi-Fi na mesma hora! A tela parou de piscar. O que eu faço com a minha senha corporativa?"
        if any(w in last_agent_msg for w in ["anexo", "link", "remetente", "assunto", "qual"]):
            return "O assunto do e-mail era 'Cobrança Urgente Bradesco' e o anexo chamava 'Fatura_9921.zip'. Eu cliquei duas vezes e abriu um terminal preto rápido."
        return "Socorro! Meu computador abriu várias janelas pretas estranhas após eu abrir o anexo do e-mail!"

    # --- HD-1022: Windows Defender SmartScreen ---
    elif ticket.id == "HD-1022":
        if any(w in last_agent_msg for w in ["exclusão", "exclusao", "adicionar", "defender", "exceção", "excecao"]):
            return "Adicionei a pasta do sistema em 'Exclusões' da Proteção contra vírus e ameaças do Defender. O programa abriu sem travar!"
        if any(w in last_agent_msg for w in ["nome", "programa", "aviso", "mensagem"]):
            return "O programa se chama 'NFe_Emissor_v3.exe' e o Defender diz: 'O SmartScreen do Microsoft Defender impediu a inicialização de um aplicativo não reconhecido'."
        return "Não consigo emitir notas fiscais porque o antivírus do Windows bloqueia o executável."

    # --- HD-1023: Certificado SSL/Data ---
    elif ticket.id == "HD-1023":
        if any(w in last_agent_msg for w in ["data", "hora", "relogio", "relógio", "automático", "automatico", "ajustar"]):
            return "Nossa! O relógio do computador estava marcando o ano de 2021! Ajustei para sincronização automática de data/hora e o site abriu seguro com cadeado verde!"
        if any(w in last_agent_msg for w in ["qual erro", "mensagem", "cadeado", "net::"]):
            return "O navegador diz: 'Sua conexão não é privada - NET::ERR_CERT_DATE_INVALID'."
        return "O portal de Recursos Humanos não abre e diz erro de certificado de segurança."

    # --- HD-1024: Intune Non-Compliant ---
    elif ticket.id == "HD-1024":
        if any(w in last_agent_msg for w in ["portal da empresa", "company portal", "sincronizar", "verificar conformidade", "windows update"]):
            return "Abri o Portal da Empresa, instalei a atualização de segurança pendente e cliquei em 'Verificar Conformidade'. O status mudou para 'Conforme' e o Teams liberou o acesso!"
        if any(w in last_agent_msg for w in ["portal", "aplicativo", "aviso", "requisitos"]):
            return "O aviso diz: 'Você não pode acessar este recurso corporativo porque o seu dispositivo não atende aos requisitos de conformidade da organização'."
        return "O Teams e o Outlook no meu notebook foram bloqueados por Acesso Condicional."

    # --- HD-1025: Software Center Cache ---
    elif ticket.id == "HD-1025":
        if any(w in last_agent_msg for w in ["intune management extension", "reiniciar serviço", "reiniciar servico", "services.msc", "limpar"]):
            return "Reiniciei o serviço 'Microsoft Intune Management Extension' no services.msc. O Power BI baixou novamente e instalou com sucesso!"
        if any(w in last_agent_msg for w in ["código", "codigo", "erro", "software center"]):
            return "Aparece 'Falha na instalação - Erro 0x87D1041C' no catálogo de aplicativos."
        return "O aplicativo corporativo não instala e a barra fica travada em 0%."

    # --- HD-1026: Dock Station ---
    elif ticket.id == "HD-1026":
        if any(w in last_agent_msg for w in ["win ctrl shift b", "win+ctrl+shift+b", "desligar fonte", "reiniciar driver", "tomada"]):
            return "Apertei Win + Ctrl + Shift + B, a tela deu um bipe rápido e os dois monitores externos ligaram instantaneamente! Que truque incrível!"
        if any(w in last_agent_msg for w in ["carrega", "cabo", "luz", "dock"]):
            return "O notebook está recebendo carga pela USB-C da Dock, o mouse USB funciona, mas os dois monitores HDMI ficam pretos sem sinal."
        return "Conectei o notebook na Dock Station da mesa e os dois monitores adicionais não dão vídeo."

    # --- HD-1027: Bateria ACPI Throttling ---
    elif ticket.id == "HD-1027":
        if any(w in last_agent_msg for w in ["devmgmt", "gerenciador de dispositivos", "desinstalar", "acpi", "bateria"]):
            return "Fui no Gerenciador de Dispositivos, desinstalei o driver ACPI da bateria e reiniciei. Agora a bateria começou a carregar (45%) e a lentidão sumiu!"
        if any(w in last_agent_msg for w in ["carregador", "original", "porcentagem", "lento"]):
            return "O carregador é o original da Dell, a bateria está estagnada em 0% e no Gerenciador de Tarefas o processador está travado em 0.79 GHz."
        return "O notebook está travando muito e a bateria diz 'Conectada, mas sem carregar'."

    # --- HD-1028: Domain Trust Relationship ---
    elif ticket.id == "HD-1028":
        if any(w in last_agent_msg for w in ["test-computersecurechannel", "powershell", "administrador local", "reingressar", "reparar"]):
            return "Entrei com a conta de Administrador local e executei 'Test-ComputerSecureChannel -Repair' no PowerShell. A relação de confiança foi restaurada e consegui logar com meu usuário corporativo!"
        if any(w in last_agent_msg for w in ["quando", "tempo", "desligado", "mensagem exata"]):
            return "O notebook ficou 60 dias guardado na gaveta durante minhas férias. A mensagem é: 'A relação de confiança entre esta estação de trabalho e o domínio falhou'."
        return "Não consigo passar da tela de login do Windows por erro de relação de confiança com o domínio."

    # --- HD-1029: Porta 80 Ocupada ---
    elif ticket.id == "HD-1029":
        if any(w in last_agent_msg for w in ["netstat", "findstr", "taskkill", "pid", "finalizar"]):
            return "Rodei 'netstat -ano | findstr :80', descobri que o serviço do IIS estava rodando no PID 4120. Encerrei o processo e meu servidor local subiu na hora!"
        if any(w in last_agent_msg for w in ["qual porta", "erro", "netstat"]):
            return "Diz 'Error: listen EADDRINUSE: address already in use 0.0.0.0:80'."
        return "Minha aplicação web local não inicia dizendo que a porta 80 já está em uso."

    # --- HD-1030: Arquivo Bloqueado SMB ---
    elif ticket.id == "HD-1030":
        if any(w in last_agent_msg for w in ["compmgmt", "arquivos abertos", "fechar", "sessão", "sessao", "servidor"]):
            return "O suporte acessou o servidor de arquivos via compmgmt.msc e fechou a sessão aberta presa. Consegui abrir a planilha no Excel para edição!"
        if any(w in last_agent_msg for w in ["quem", "nome", "qual arquivo", "caminho"]):
            return "É o arquivo '\\\\servidor\\financeiro\\Fechamento_Agosto.xlsx' e diz que está bloqueado para edição pelo usuário 'joao.silva'."
        return "A planilha de fechamento no servidor de rede diz que está bloqueada por outro colega que já foi embora."

    # --- HD-1031: Notebook não liga sem tomada / Drenagem Residual ---
    elif ticket.id == "HD-1031":
        if any(w in last_agent_msg for w in ["segurar", "30 segundos", "60 segundos", "drenagem", "hard reset", "pressionado", "descarregar"]):
            return "Desconectei tudo e segurei o botão Power apertado por 30 segundos contínuos. Depois apertei normal e o notebook ligou na hora na bateria com a logo da Dell! Muito obrigado!"
        if any(w in last_agent_msg for w in ["led", "luz", "cooler", "barulho", "acontece"]):
            return "Absolutamente nada acontece. Nenhum LED acende na lateral e a tela não pisca. O notebook parece completamente morto."
        return "O notebook estava funcionando ontem na tomada, mas agora fora da tomada não liga de jeito nenhum."

    # --- HD-1032: WinRE / Modo de Segurança ---
    elif ticket.id == "HD-1032":
        if any(w in last_agent_msg for w in ["shift", "modo de segurança", "modo de seguranca", "safe mode", "f4", "f5", "reparo", "configurações de inicialização"]):
            return "Segurei a tecla SHIFT enquanto cliquei em Reiniciar. Abriu a tela azul com 'Escolha uma opção'. Fui em Solução de Problemas > Configurações de Inicialização e apertei 4 para Modo de Segurança... O Windows entrou com a tela preta nas bordas! Agora consigo desinstalar a atualização defeituosa!"
        if any(w in last_agent_msg for w in ["f8", "como", "opções avançadas", "tela azul", "winre"]):
            return "Eu tentei apertar F8 no boot, mas no Windows 11 o F8 não faz nada e continua em loop de reinício. Qual o jeito certo de entrar nas opções avançadas?"
        return "O computador liga, aparece a logo do Windows girando e dá tela azul rápida reiniciando em loop."

    # --- HD-1033: VLAN incorreta ---
    elif ticket.id == "HD-1033":
        if any(w in last_agent_msg for w in ["vlan", "redes", "switch", "infraestrutura", "alterar", "ponto"]):
            return "Passei o número da tomada 'PONTO-FIN-12' para o suporte de redes. Eles moveram a porta para a VLAN 20 do Financeiro e agora meus servidores e a impressora do setor abriram perfeitamente!"
        if any(w in last_agent_msg for w in ["etiqueta", "tomada", "parede", "ipconfig", "qual ip"]):
            return "Na tomada de rede da parede está escrito 'PONTO-FIN-12'. Dei ipconfig e meu IP está 192.168.99.45 (que parece ser a rede de Visitantes)."
        return "Mudei de mesa no escritório, a internet abre mas não consigo acessar o sistema do Financeiro nem a impressora."

    # --- HD-1034: Proxy preso no Windows ---
    elif ticket.id == "HD-1034":
        if any(w in last_agent_msg for w in ["inetcpl", "desmarcar", "proxy", "configurações da lan", "configuracoes da lan"]):
            return "Abri o inetcpl.cpl > Conexões > Configurações da LAN e desmarquei a caixinha 'Usar servidor proxy'. Na mesma hora o Chrome e o Edge voltaram a abrir todos os sites no meu Wi-Fi de casa!"
        if any(w in last_agent_msg for w in ["erro", "mensagem", "qual", "chrome"]):
            return "No navegador aparece a mensagem: 'Não foi possível conectar ao servidor proxy - ERR_PROXY_CONNECTION_FAILED'."
        return "Trouxe o notebook para casa e os navegadores não abrem nada por erro de proxy."

    # --- HD-1035: Cabo 10 Mbps Half-Duplex ---
    elif ticket.id == "HD-1035":
        if any(w in last_agent_msg for w in ["trocar cabo", "substituir", "outro cabo", "cabo novo", "patch cord"]):
            return "Peguei um cabo de rede azul novo no almoxarifado e troquei. O status no ncpa.cpl mudou para 1.0 Gbps (Gigabit) e a cópia de arquivos foi voando! Que diagnóstico cirúrgico!"
        if any(w in last_agent_msg for w in ["velocidade", "ncpa.cpl", "status", "link", "mbps"]):
            return "Abri o ncpa.cpl > dei dois cliques no adaptador Ethernet > Status: Velocidade está marcando apenas '10.0 Mbps'."
        return "A rede cabeada está absurdamente lenta copiando arquivos a menos de 1 MB/s."

    # --- HD-1036: Tracert salto ---
    elif ticket.id == "HD-1036":
        if any(w in last_agent_msg for w in ["tracert", "pathping", "salto", "hop", "telecom", "operadora"]):
            return "Rodei 'tracert 10.50.1.10'. Nos saltos 1 a 3 deu 2ms, mas no salto 4 (roteador da operadora 200.180.x.x) o tempo pulou para 850ms com asterisco de perda (*)! Coletamos o log para abrir chamado no provedor."
        if any(w in last_agent_msg for w in ["ping", "tempo", "perda", "filial"]):
            return "O ping para o servidor de Curitiba oscila entre 15ms e 'Tempo limite esgotado' a cada 5 segundos."
        return "A conexão com a filial fica caindo e picotando toda hora."

    # --- HD-1037: VPN Adaptador Virtual ---
    elif ticket.id == "HD-1037":
        if any(w in last_agent_msg for w in ["ncpa.cpl", "ativar", "habilitar", "adaptador virtual", "services.msc"]):
            return "Abri o ncpa.cpl e a placa 'Cisco AnyConnect Virtual Miniport Adapter' estava cinza (Desativada). Cliquei com o botão direito e selecionei 'Ativar'. Conectei a VPN e fechou o túnel instantaneamente!"
        if any(w in last_agent_msg for w in ["qual erro", "mensagem", "tela"]):
            return "Aparece a mensagem: 'Virtual Adapter failure / Tunnel initialization failed' logo após digitar o token."
        return "A VPN valida minha senha e token mas dá falha de adaptador virtual na hora de conectar."

    # --- HD-1038: Desbloqueio de Conta AD (Unlock Account) ---
    elif ticket.id == "HD-1038":
        if any(w in last_agent_msg for w in ["desbloquear", "unlock", "desbloqueei", "desmarquei", "aplicar"]):
            return "O suporte desbloqueou a conta no console do Active Directory. Digitei minha senha novamente e consegui logar no Windows sem erros!"
        if any(w in last_agent_msg for w in ["usuário", "usuario", "login", "matricula", "cpf"]):
            return "Meu usuário de rede é 'marina.silva' e meu CPF é 123.456.789-00. Pode desbloquear meu acesso, por favor?"
        return "Minha conta de rede está bloqueada por excesso de tentativas."

    # --- HD-1039: Criação de Novo Usuário (Onboarding) ---
    elif ticket.id == "HD-1039":
        if any(w in last_agent_msg for w in ["criado", "criei", "login", "senha temporária", "senha temporaria", "ou"]):
            return "Excelente! Usuário 'carlos.compras' criado na OU Compras com senha temporária 'Mudar@2026' e grupos de segurança configurados. O novo colaborador já conseguiu realizar o primeiro logon!"
        if any(w in last_agent_msg for w in ["dados", "nome", "setor", "cargo", "informações"]):
            return "Nome: Carlos Eduardo, Setor: Compras, Cargo: Comprador Júnior, Gestor: Roberto Santos. Login desejado: 'carlos.compras'."
        return "Solicito a criação do login de rede e e-mail para o novo colaborador de Compras."

    # --- HD-1040: Desativação / Offboarding ---
    elif ticket.id == "HD-1040":
        if any(w in last_agent_msg for w in ["desativar", "disable", "desativei", "bloqueei", "desligados"]):
            return "Conta do usuário 'lucas.lima' desativada no ADUC (Disable Account) e movida para a OU 'Desligados'. Acessos corporativos revogados com sucesso!"
        if any(w in last_agent_msg for w in ["qual usuário", "qual usuario", "nome", "login", "matrícula"]):
            return "O colaborador desligado é 'Lucas Lima', login de rede 'lucas.lima', departamento Comercial."
        return "Solicito o bloqueio imediato do usuário desligado da empresa."

    # --- HD-1041: Grupos de Segurança (Member Of) ---
    elif ticket.id == "HD-1041":
        if any(w in last_agent_msg for w in ["adicionar", "member of", "membro de", "grupo", "logoff"]):
            return "Adicionei o grupo 'SEC_FIN_FATURAMENTO' na aba Member Of do usuário. Ele realizou logoff/logon e a pasta confidencial e o ERP abriram com permissão total!"
        if any(w in last_agent_msg for w in ["qual grupo", "nome do grupo", "usuário", "login"]):
            return "O colaborador é 'pedro.santos' e o grupo necessário é 'SEC_FIN_FATURAMENTO'."
        return "Colaborador promovido precisa de permissões em pastas de rede e grupos do AD."

    # --- HD-1042: Instalação do RSAT ---
    elif ticket.id == "HD-1042":
        if any(w in last_agent_msg for w in ["recursos opcionais", "rsat", "powershell", "instalar", "add-windowscapability"]):
            return "Fui em Configurações > Recursos Opcionais e instalei as 'Ferramentas do Active Directory (RSAT)'. O comando dsa.msc agora abre o console do AD perfeitamente!"
        if any(w in last_agent_msg for w in ["erro", "mensagem", "versão", "windows"]):
            return "Quando digito 'dsa.msc' no Executar (Win+R) dá erro 'O Windows não pode encontrar dsa.msc'."
        return "Não encontro o console do Active Directory no meu notebook de suporte N1."

    # --- Fallbacks Gerais ---
    if any(greet in last_agent_msg for greet in ["olá", "ola", "bom dia", "boa tarde"]):
        return f"Olá, tudo bem. Meu problema é: {ticket.description}"

    if ticket.user_profile == "LEIGO":
        return "Não entendi muito bem. Você pode me explicar de um jeito mais simples o que eu devo olhar ou clicar?"
    elif ticket.user_profile == "APRESSADO":
        return "Podemos agilizar? O que exatamente eu preciso fazer agora?"
    elif ticket.user_profile == "ANSIOSO":
        return "Por favor, me ajude! O que eu devo fazer no meu computador?"
    else:
        return "Entendi. O que mais você precisa que eu verifique aqui na minha máquina?"
