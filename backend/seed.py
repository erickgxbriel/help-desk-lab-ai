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
        "expected_solution": "Limpar as credenciais do Outlook (MS.Outlook) no Gerenciador de Credenciais do Windows e reiniciar o aplicativo.",
        "keywords": "gerenciador de credenciais,credenciais,limpar,remover,excluir,apagar"
    },
    {
        "id": "HD-1002",
        "title": "Impressora do setor financeiro offline",
        "description": "Tento imprimir meus relatórios e diz que a impressora está offline. Já apertei o botão e nada.",
        "category": "Impressora",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "LEIGO",
        "context": "O cabo de rede RJ45 está desconectado na parte traseira da impressora. O usuário apenas verificou se ela estava ligada na tomada.",
        "expected_solution": "Verificar se o cabo de rede RJ45 atrás da impressora está conectado firmemente e reconectá-lo.",
        "keywords": "cabo de rede,cabo,rj45,atrás,conectar,plugado,conectar"
    },
    {
        "id": "HD-1003",
        "title": "VPN não conecta - Acesso Remoto",
        "description": "Estou em home office e a VPN FortiClient dá erro de credenciais inválidas ou falha de conexão. Preciso acessar a rede interna.",
        "category": "VPN",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "ANSIOSO",
        "context": "O token MFA no celular do usuário está com a hora desbalanceada (relógio manual). A solução é colocar o relógio do celular no modo automático.",
        "expected_solution": "Sincronizar a hora do celular / aplicativo de MFA ou colocar o relógio em modo automático.",
        "keywords": "mfa,token,celular,sincronizar,hora,automático,relogio"
    },
    {
        "id": "HD-1004",
        "title": "Teams sem áudio durante reuniões",
        "description": "Eu escuto as pessoas mas ninguém me ouve nas reuniões do Teams. O ícone de microfone não está mutado.",
        "category": "Teams",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "GESTOR",
        "context": "O Teams selecionou por padrão o microfone da webcam em vez do headset USB do usuário.",
        "expected_solution": "Alterar o dispositivo de microfone nas configurações do Microsoft Teams para o Headset USB.",
        "keywords": "configurações,dispositivo,entrada,microfone,teams,headset,alterar,mudar"
    },
    {
        "id": "HD-1005",
        "title": "Senha do Active Directory expirada",
        "description": "Cheguei para trabalhar e o Windows diz que minha conta está bloqueada ou senha expirou. Não consigo logar.",
        "category": "Senha / Acesso",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "CONFUSO",
        "context": "A conta do usuário expirou no Active Directory por ultrapassar 90 dias. O suporte precisa redefinir a senha e desbloquear a conta no ADUC.",
        "expected_solution": "Redefinir a senha do usuário no console do Active Directory (ADUC), marcar troca no próximo logon e desbloquear a conta.",
        "keywords": "active directory,ad,redefinir,senha,desbloquear,desbloqueio,reset"
    },
    {
        "id": "HD-1006",
        "title": "OneDrive não sincroniza arquivos da pasta",
        "description": "Coloco arquivos na pasta do OneDrive mas eles não sobem para a nuvem. Fica um ícone de setinhas azuis infinito.",
        "category": "OneDrive",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "A sessão da conta OneDrive expirou e precisa ser reautenticada no aplicativo.",
        "expected_solution": "Sair da conta no aplicativo do OneDrive e fazer login novamente para reestabelecer a sincronização.",
        "keywords": "login,logar,entrar,sair,reautenticar,reiniciar,desvincular"
    },
    {
        "id": "HD-1007",
        "title": "Computador extremamente lento (Disco 100%)",
        "description": "Não consigo trabalhar. Para abrir o navegador demora 5 minutos. Travando tudo.",
        "category": "Sistema lento",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "DIRETOR",
        "context": "O computador está com o uso de disco em 100% devido ao serviço SysMain (Superfetch). A ação é desativar o serviço no services.msc.",
        "expected_solution": "Desativar o serviço SysMain (Superfetch) nos Serviços do Windows (services.msc).",
        "keywords": "sysmain,superfetch,serviços,services.msc,disco 100%,desativar"
    },
    {
        "id": "HD-1008",
        "title": "Acesso Negado a Pasta Compartilhada na Rede",
        "description": "Preciso acessar a pasta do Financeiro no servidor local, mas dá erro de 'Acesso Negado' quando clico.",
        "category": "Permissões",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "O usuário mudou de cargo e precisa ser adicionado ao grupo de segurança de rede correspondente no Active Directory.",
        "expected_solution": "Adicionar o usuário ao grupo de segurança de rede no Active Directory e instruí-lo a fazer logoff/logon.",
        "keywords": "grupo,segurança,active directory,ad,adicionar,logoff,logon"
    },
    {
        "id": "HD-1009",
        "title": "Wi-Fi da empresa desconectando direto",
        "description": "Estou na sala de reuniões e o Wi-Fi conecta mas fica caindo a cada 2 minutos. Fico sem internet.",
        "category": "Wi-Fi",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "A placa Wi-Fi está com economia de energia ativada no Gerenciador de Dispositivos.",
        "expected_solution": "Desativar a opção 'O computador pode desligar o dispositivo para economizar energia' nas propriedades do adaptador Wi-Fi.",
        "keywords": "energia,gerenciador de dispositivos,adaptador,economia,desmarcar,propriedades"
    },
    {
        "id": "HD-1010",
        "title": "Sistema Corporativo ERP não abre (DNS/Oracle)",
        "description": "Clico no ícone do sistema de Vendas e aparece um erro dizendo que não foi possível conectar ao banco de dados Oracle.",
        "category": "Software corporativo",
        "priority": "CRITICAL",
        "difficulty": "DESAFIO",
        "user_profile": "CONFUSO",
        "context": "O usuário está com as configurações de DNS incorretas apontando para DNS público em vez do DNS interno.",
        "expected_solution": "Alterar as configurações de DNS do adaptador de rede para obter o IP do DNS interno da empresa automaticamente.",
        "keywords": "dns,servidor dns,interno,placa de rede,adaptador,configurar"
    },
    {
        "id": "HD-1011",
        "title": "Tela Azul da Morte (BSOD) recorrente: MEMORY_MANAGEMENT",
        "description": "Meu computador desliga sozinho com uma tela azul dizendo MEMORY_MANAGEMENT toda vez que abro mais de 3 abas.",
        "category": "Hardware / Windows",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "ANSIOSO",
        "context": "Módulo de memória RAM com defeito físico. A ação é rodar mdsched.exe e limpar/substituir o pente de RAM.",
        "expected_solution": "Executar o Diagnóstico de Memória do Windows (mdsched.exe) para identificar o pente defeituoso e limpar/substituir a memória RAM.",
        "keywords": "mdsched,memória,ram,diagnostico,limpar contatos,pente,slot,substituir"
    },
    {
        "id": "HD-1012",
        "title": "Computador liga, ventoinha gira, mas não dá vídeo (sem sinal)",
        "description": "Aperto o botão power, a luz acende e o cooler gira forte, mas o monitor fica piscando dizendo 'Sem Sinal'.",
        "category": "Hardware",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "LEIGO",
        "context": "O cabo HDMI foi plugado na saída onboard superior em vez de na placa de vídeo dedicada (GPU) inferior.",
        "expected_solution": "Conectar o cabo de vídeo (HDMI/DisplayPort) na porta correta da placa de vídeo dedicada (GPU) na parte inferior traseira.",
        "keywords": "placa de video,gpu,conectar,hdmi,porta correta,inferior,onboard,plugar"
    },
    {
        "id": "HD-1013",
        "title": "Conflito de Endereço IP na Rede Local",
        "description": "Apareceu um alerta no cantinho da barra de tarefas: 'Foi detectado um conflito de endereço IP'. A internet parou na hora.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "Outro dispositivo foi configurado com o mesmo IP. A ação é liberar e renovar via ipconfig /release e /renew.",
        "expected_solution": "Executar os comandos 'ipconfig /release' e 'ipconfig /renew' no Prompt de Comando (CMD) para obter um novo IP via DHCP.",
        "keywords": "ipconfig,release,renew,dhcp,renovar,cmd,liberar"
    },
    {
        "id": "HD-1014",
        "title": "Sem Internet: Navegador não abre sites, mas ping 8.8.8.8 responde",
        "description": "Não abre nenhum site (Google, Intranet, nada), mas consigo pingar IPs no terminal. Parece que a internet caiu.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "GESTOR",
        "context": "Falha na resolução de nomes (DNS). A solução é limpar o cache com ipconfig /flushdns e configurar DNS válido.",
        "expected_solution": "Executar 'ipconfig /flushdns' no CMD e configurar servidores DNS válidos (como 1.1.1.1 ou 8.8.8.8).",
        "keywords": "flushdns,dns,ipconfig /flushdns,resolução de nomes,cache,ipconfig"
    },
    {
        "id": "HD-1015",
        "title": "Windows não inicia: 'No Bootable Device Found'",
        "description": "Liguei o notebook de manhã e apareceu uma tela preta dizendo 'No bootable device found - insert boot disk and press any key'.",
        "category": "Hardware / Windows",
        "priority": "CRITICAL",
        "difficulty": "N2",
        "user_profile": "DIRETOR",
        "context": "Há um pendrive não inicializável plugado na porta USB fazendo a BIOS tentar dar boot por ele.",
        "expected_solution": "Remover qualquer pendrive/dispositivo USB conectado e reiniciar o computador.",
        "keywords": "pendrive,usb,remover,bios,uefi,boot,boot order,tirar"
    },
    {
        "id": "HD-1016",
        "title": "Computador pegando IP 169.254.x.x (APIPA) / Sem Conexão",
        "description": "Meu computador está com o ícone de rede com exclamação amarela e diz 'Rede Não Identificada'. Não consigo acessar nada.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "Computador não recebeu resposta do servidor DHCP (APIPA). A ação é verificar o cabo físico e rodar ipconfig /renew.",
        "expected_solution": "Identificar endereço APIPA (169.254.x.x), verificar conexão com a tomada de rede e executar 'ipconfig /renew'.",
        "keywords": "apipa,169.254,dhcp,ipconfig,renew,rede não identificada,servidor dhcp"
    },
    {
        "id": "HD-1017",
        "title": "GPO / Políticas de Grupo do Windows não aplicadas",
        "description": "O papel de parede corporativo e a pasta de rede mapeada da minha equipe sumiram hoje de manhã após trocar de setor.",
        "category": "Active Directory",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "GESTOR",
        "context": "O computador precisa forçar a atualização imediata das diretivas do AD via gpupdate /force.",
        "expected_solution": "Executar o comando 'gpupdate /force' no Prompt de Comando como Administrador para forçar a sincronização das GPOs.",
        "keywords": "gpupdate,gpupdate /force,gpresult,gpo,diretivas,politicas,active directory"
    },
    {
        "id": "HD-1018",
        "title": "Bloqueio de Chave de Recuperação BitLocker ao ligar",
        "description": "Liguei meu notebook e apareceu uma tela azul pedindo uma 'Chave de Recuperação do BitLocker' de 48 dígitos.",
        "category": "Segurança / Windows",
        "priority": "CRITICAL",
        "difficulty": "N1",
        "user_profile": "DIRETOR",
        "context": "O BitLocker bloqueou por alteração de firmware/hardware. A chave de 48 dígitos deve ser consultada no Microsoft Entra ID / Intune.",
        "expected_solution": "Consultar a chave de recuperação do BitLocker no portal do Microsoft Entra ID (Azure AD) / Intune e orientar o usuário a digitá-la.",
        "keywords": "bitlocker,chave de recuperação,recuperação,azure ad,entra id,intune,active directory"
    },
    {
        "id": "HD-1019",
        "title": "Licença do Microsoft 365 / Office desativada ('Produto Não Licenciado')",
        "description": "Abro o Word ou Excel e aparece uma faixa vermelha dizendo 'Produto Não Licenciado - a maioria dos recursos foi desativada'.",
        "category": "Microsoft 365",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "FINANCEIRO",
        "context": "A sessão do Office expirou. O procedimento é desconectar a conta no Word (Arquivo > Conta) e fazer login novamente.",
        "expected_solution": "Desconectar e reconectar a conta corporativa dentro do pacote Office em Arquivo > Conta.",
        "keywords": "licença,microsoft 365,office,m365,admin center,produto não licenciado,relogar,desconectar"
    },
    {
        "id": "HD-1020",
        "title": "E-mails indo direto para a pasta Lixo Eletrônico / Spam no Outlook",
        "description": "Clientes importantes estão nos enviando propostas e todas as mensagens estão caindo na pasta de Lixo Eletrônico.",
        "category": "Outlook / E-mail",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "O domínio do cliente precisa ser adicionado à lista de Remetentes Confiáveis nas Opções de Lixo Eletrônico do Outlook.",
        "expected_solution": "Adicionar o domínio do cliente na lista de 'Remetentes Confiáveis' nas opções de Lixo Eletrônico do Outlook.",
        "keywords": "remetentes confiaveis,lixo eletronico,spam,outlook,regras,confiaveis,adicionar"
    },
    {
        "id": "HD-1021",
        "title": "Alerta de Segurança: Suspeita de Phishing / Anexo Malicioso",
        "description": "Recebi um e-mail de 'Fatura Atrasada' e cliquei no anexo .zip. Minha tela piscou e abriu uma janela preta rápida.",
        "category": "Segurança / Resposta a Incidentes",
        "priority": "CRITICAL",
        "difficulty": "N1",
        "user_profile": "ANSIOSO",
        "context": "Possível infecção por malware via anexo malicioso. A primeira ação crítica de contenção é desconectar imediatamente o cabo de rede/Wi-Fi para evitar movimentação lateral, abrir chamado para o time de SOC/Segurança e resetar a senha da conta.",
        "expected_solution": "Instruir o usuário a desconectar imediatamente o cabo de rede e desativar o Wi-Fi para isolamento, alterar a senha corporativa e acionar o time de segurança.",
        "keywords": "desconectar rede,isolar,desconectar cabo,wifi,phishing,malware,senha,segurança"
    },
    {
        "id": "HD-1022",
        "title": "Software interno bloqueado pelo Windows Defender / SmartScreen",
        "description": "Tento abrir o sistema de emissão de notas fiscais e o Windows Defender bloqueia dizendo 'Aplicativo potencialmente indesejado'.",
        "category": "Segurança / Windows",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "O executável interno não possui certificado comercial público conhecido pelo SmartScreen. O analista deve validar a integridade do arquivo e criar uma exclusão segura no Windows Defender (Proteção contra vírus e ameaças).",
        "expected_solution": "Adicionar o executável ou pasta do sistema interno na lista de 'Exclusões' do Windows Defender em Proteção contra vírus e ameaças.",
        "keywords": "defender,smartscreen,exclusão,exclusões,exceção,adicionar exclusão,vírus"
    },
    {
        "id": "HD-1023",
        "title": "Erro de Certificado SSL/TLS: 'Sua conexão não é privada'",
        "description": "Tento acessar o portal de Recursos Humanos no navegador e dá erro de certificado SSL inválido ou expirado.",
        "category": "Segurança / Rede",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "O relógio do computador está com a data do ano passado (bateria CMOS fraca) ou a cadeia de certificados raiz da CA interna da empresa precisa ser atualizada no certmgr.msc.",
        "expected_solution": "Ajustar a data e hora do Windows para sincronização automática com o servidor NTP ou instalar a cadeia de certificado raiz da empresa.",
        "keywords": "data e hora,relogio,sincronizar,certificado,ssl,certmgr,ntp"
    },
    {
        "id": "HD-1024",
        "title": "Dispositivo 'Não Conforme' no Microsoft Intune (Acesso Bloqueado)",
        "description": "O aplicativo do Teams e Outlook no notebook corporativo diz que o dispositivo não cumpre as regras de conformidade da empresa.",
        "category": "Microsoft Intune / MDM",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "GESTOR",
        "context": "A política de Acesso Condicional (Conditional Access) bloqueou o acesso porque o Windows Update está pendente ou o aplicativo Portal da Empresa (Company Portal) está desincronizado com o Intune.",
        "expected_solution": "Abrir o aplicativo Portal da Empresa (Company Portal), clicar em 'Verificar Conformidade' / Sincronizar e aplicar as atualizações pendentes do Windows Update.",
        "keywords": "company portal,portal da empresa,intune,conformidade,sincronizar,windows update"
    },
    {
        "id": "HD-1025",
        "title": "Falha na instalação de aplicativo via Software Center / Intune (Erro 0x87D1041C)",
        "description": "Tento instalar o Power BI pelo catálogo de aplicativos corporativos e a barra trava em 0% com erro de instalação.",
        "category": "Software Corporativo / Intune",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "TECNICO",
        "context": "O cache do instalador corporativo está corrompido. A solução é reiniciar o serviço 'Microsoft Intune Management Extension' ou limpar o cache temporário em C:\\Windows\\Temp.",
        "expected_solution": "Reiniciar o serviço 'Microsoft Intune Management Extension' no services.msc ou limpar a pasta temporária de cache e tentar instalar novamente.",
        "keywords": "intune management extension,services.msc,serviço,cache,limpar,reiniciar serviço"
    },
    {
        "id": "HD-1026",
        "title": "Docking Station USB-C: Monitores externos sem sinal",
        "description": "Conectei meu notebook na Dock Station da mesa de trabalho; o notebook carrega a bateria, mas os dois monitores externos não dão vídeo.",
        "category": "Hardware / Periféricos",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "DIRETOR",
        "context": "O driver DisplayLink / Thunderbolt travou ou precisa de reinicialização do driver de vídeo com o atalho Win + Ctrl + Shift + B, ou desconectar e reconectar a fonte de alimentação da Dock Station.",
        "expected_solution": "Pressionar 'Win + Ctrl + Shift + B' para reiniciar o driver gráfico ou desligar a fonte de energia da Dock Station por 10 segundos para reset.",
        "keywords": "displaylink,dock station,reiniciar driver,win ctrl shift b,dock,energia"
    },
    {
        "id": "HD-1027",
        "title": "Bateria conectada, mas sem carregar (Throttling de CPU)",
        "description": "O notebook está plugado na tomada, mas diz 'Conectada, mas sem carregar'. O computador ficou absurdamente lento e travando.",
        "category": "Hardware",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "APRESSADO",
        "context": "O driver de gerenciamento de bateria ACPI travou no Windows. A solução é desinstalar o dispositivo 'Bateria de Método de Controle Compatível com ACPI' no Gerenciador de Dispositivos e reiniciar o notebook.",
        "expected_solution": "Desinstalar o driver 'Bateria de Método de Controle Compatível com ACPI da Microsoft' no Gerenciador de Dispositivos (devmgmt.msc) e reiniciar a máquina.",
        "keywords": "acpi,bateria,gerenciador de dispositivos,devmgmt.msc,desinstalar driver,reiniciar"
    },
    {
        "id": "HD-1028",
        "title": "Perda de Confiança com o Domínio ('The trust relationship failed')",
        "description": "Voltei de licença médica após 60 dias e ao digitar minha senha na tela de login diz 'A relação de confiança entre esta estação de trabalho e o domínio falhou'.",
        "category": "Active Directory",
        "priority": "CRITICAL",
        "difficulty": "DESAFIO",
        "user_profile": "CONFUSO",
        "context": "A conta da máquina (Computer Account Password) expirou no Active Directory devido ao longo período desconectada. A solução é logar com Administrador local e rodar 'Test-ComputerSecureChannel -Repair' no PowerShell ou retirar e reingressar a máquina no domínio.",
        "expected_solution": "Fazer login com a conta de Administrador local e executar 'Test-ComputerSecureChannel -Repair' no PowerShell ou retirar e recolocar no domínio.",
        "keywords": "test-computersecurechannel,relação de confiança,dominio,powershell,administrador local,reingressar"
    },
    {
        "id": "HD-1029",
        "title": "Serviço Web / Aplicação local não inicia (Porta 80/443 Ocupada)",
        "description": "Tento iniciar o servidor local de testes e dá erro de socket: 'Port 80/443 is already in use by another process'.",
        "category": "Rede / Sistemas",
        "priority": "MEDIUM",
        "difficulty": "N2",
        "user_profile": "TECNICO",
        "context": "Outro processo (como o serviço IIS / W3SVC ou Skype) está ocupando a porta 80. O analista deve identificar o PID com netstat -ano e encerrar o processo com taskkill.",
        "expected_solution": "Identificar o PID do processo em execução na porta com 'netstat -ano | findstr :80' e finalizá-lo via Task Manager ou 'taskkill /PID <PID> /F'.",
        "keywords": "netstat,findstr,porta 80,taskkill,pid,finalizar processo"
    },
    {
        "id": "HD-1030",
        "title": "Arquivo em Pasta Compartilhada 'Bloqueado para Edição por Outro Usuário'",
        "description": "Vou abrir a planilha de fechamento no servidor e diz que está bloqueada para edição pelo João, mas o João já desligou o computador e foi embora.",
        "category": "Servidor de Arquivos / Rede",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "A sessão do protocolo SMB ficou presa no servidor de arquivos (Open File Lock). O analista de suporte deve abrir o Gerenciamento do Computador (compmgmt.msc) no servidor, ir em Pastas Compartilhadas > Arquivos Abertos e fechar a trava do arquivo.",
        "expected_solution": "Acessar o Gerenciamento do Computador (compmgmt.msc) no servidor de arquivos, navegar em 'Pastas Compartilhadas' > 'Arquivos Abertos' e fechar a sessão do arquivo preso.",
        "keywords": "compmgmt.msc,arquivos abertos,pastas compartilhadas,sessão,smb,fechar arquivo"
    },
    {
        "id": "HD-1031",
        "title": "Notebook fora da tomada não liga (LEDs apagados / Carga Residual)",
        "description": "Estou em uma reunião presencial, tirei o notebook da tomada e apertei o botão de ligar, mas ele está completamente morto. Não acende nenhuma luz e nem o cooler gira.",
        "category": "Hardware / Alimentação",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "DIRETOR",
        "context": "Travamento por energia estática acumulada nos capacitores da placa-mãe (Carga Residual / Power Lock). A solução padrão de suporte é o 'Hard Reset / Drenagem de Energia': desconectar qualquer cabo, segurar o botão Power pressionado por 30 a 60 segundos contínuos para descarregar a placa, e depois ligar.",
        "expected_solution": "Executar a drenagem de energia residual (Hard Reset): desconectar periféricos e carregador, segurar o botão Power pressionado por 30 segundos contínuos para descarregar os capacitores e ligar novamente.",
        "keywords": "drenagem,hard reset,segurar botão,power,30 segundos,energia residual,capacitores,descarga"
    },
    {
        "id": "HD-1032",
        "title": "Windows em loop de inicialização / Acesso ao Modo de Segurança (WinRE)",
        "description": "Após uma atualização com tela azul, meu Windows fica reiniciando em loop e não entra na área de trabalho. Preciso entrar no Modo de Segurança para restaurar.",
        "category": "Hardware / Windows",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "CONFUSO",
        "context": "Acesso ao Ambiente de Recuperação do Windows (WinRE) e Modo de Segurança (Safe Mode). Em computadores modernos UEFI/Windows 10/11, o F8 foi desativado por padrão. Os 3 métodos padrão são: (1) Segurar a tecla Shift enquanto clica em 'Reiniciar'; (2) Forçar 3 desligamentos abruptos no botão Power durante o boot para acionar o Reparo Automático; (3) Usar o comando 'shutdown /r /o /t 0' no CMD.",
        "expected_solution": "Instruir o acesso ao WinRE segurando a tecla SHIFT ao clicar em Reiniciar (ou forçar o desligamento no Power 3 vezes no boot) e navegar até Solução de Problemas > Configurações de Inicialização > Modo de Segurança (Opção 4 ou 5).",
        "keywords": "shift,reiniciar,winre,modo de segurança,safe mode,opções avançadas,reparo automatico,f4,f5,f8"
    },
    {
        "id": "HD-1033",
        "title": "VLAN Incorreta após mudança de mesa física no escritório",
        "description": "Mudei de baia hoje de manhã, conectei o cabo de rede na tomada da parede e a internet funciona, mas não consigo acessar nenhum servidor ou impressora do meu setor.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "FINANCEIRO",
        "context": "A porta do switch de acesso na tomada de rede da parede está associada a uma VLAN diferente (ex: VLAN Visitantes ou Marketing) em vez da VLAN Financeiro (802.1Q). O analista N1 deve identificar a etiqueta da tomada na parede (ex: PONTO-A12), verificar a sub-rede obtida via ipconfig e solicitar ao time de redes a alteração da VLAN da porta do switch.",
        "expected_solution": "Verificar a sub-rede via 'ipconfig', solicitar a identificação da etiqueta do ponto de rede na parede e acionar a equipe de infraestrutura para alterar a VLAN da porta do switch.",
        "keywords": "vlan,switch,ponto de rede,tomada,etiqueta,sub-rede,ipconfig,porta do switch"
    },
    {
        "id": "HD-1034",
        "title": "Navegador não abre sites em Home Office (Erro: ERR_PROXY_CONNECTION_FAILED)",
        "description": "Trouxe meu notebook da empresa para casa. Conectei no Wi-Fi de casa, o Teams funciona, mas o Chrome e o Edge não abrem nenhum site dizendo 'Não foi possível conectar ao servidor proxy'.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "O navegador ficou com o servidor Proxy manual da empresa configurado nas Propriedades de Internet (inetcpl.cpl). Fora da rede do escritório, esse proxy interno fica inacessível. A solução é abrir as Propriedades de Internet > Conexões > Configurações da LAN e desmarcar 'Usar um servidor proxy para a rede local'.",
        "expected_solution": "Abrir 'inetcpl.cpl' (Propriedades de Internet) > Conexões > Configurações da LAN > desmarcar a opção 'Usar um servidor proxy' e marcar 'Detectar automaticamente as configurações'.",
        "keywords": "proxy,inetcpl.cpl,desmarcar proxy,configurações da lan,servidor proxy,propriedades de internet"
    },
    {
        "id": "HD-1035",
        "title": "Cabo de rede danificado / Negociação travada em 10 Mbps Half-Duplex",
        "description": "A cópia de arquivos para o servidor de rede está extremamente lenta (menos de 1 MB/s) e as chamadas no Teams ficam picotando o áudio.",
        "category": "Rede e Conectividade",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "O cabo de rede RJ45 está com um dos 8 fios internos rompido ou com pino torto, forçando a placa de rede a negociar em 10 Mbps Half-Duplex em vez de 1 Gbps Full-Duplex. A solução é inspecionar o status de velocidade do adaptador no ncpa.cpl e substituir o patch cord (cabo de rede).",
        "expected_solution": "Verificar a velocidade do link no adaptador de rede (ncpa.cpl > Status > Velocidade: 10 Mbps) e substituir o cabo de rede danificado por um novo cabo Cat5e/Cat6 Gigabit.",
        "keywords": "substituir cabo,velocidade,10 mbps,100 mbps,half duplex,gigabit,patch cord,ncpa.cpl"
    },
    {
        "id": "HD-1036",
        "title": "Instabilidade e Queda de Conexão com Filial (Diagnóstico Tracert / Latência)",
        "description": "O sistema da filial em Curitiba fica caindo a cada 10 minutos. O ping responde, mas com tempos muito altos e perda frequente de pacotes.",
        "category": "Rede e Conectividade",
        "priority": "HIGH",
        "difficulty": "N2",
        "user_profile": "GESTOR",
        "context": "Perda de pacotes e latência anormal em um roteador intermediário da operadora (ISP). O analista de suporte deve executar 'tracert' ou 'pathping' para mapear os saltos (Hops) e identificar exatamente em qual IP/roteador a latência sobe de 15ms para 800ms.",
        "expected_solution": "Executar o comando 'tracert <IP_Servidor>' ou 'pathping' no CMD para identificar em qual salto (hop) da rota ocorre a perda de pacotes e latência elevada, coletando os dados para o chamado de telecom.",
        "keywords": "tracert,pathping,saltos,hop,latência,perda de pacotes,rota,cmd"
    },
    {
        "id": "HD-1037",
        "title": "VPN: Adaptador Virtual Desativado / Falha ao Fechar Túnel (AnyConnect / FortiClient)",
        "description": "Clico em Conectar na VPN da empresa (Cisco AnyConnect / FortiClient), ele aceita minha senha e token, mas na hora de fechar a conexão dá erro 'Virtual Adapter failure / Tunnel initialization failed'.",
        "category": "VPN / Rede",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "APRESSADO",
        "context": "O adaptador de rede virtual do cliente VPN (Cisco AnyConnect Secure Mobility Client / Fortinet Virtual Adapter) foi desativado no Windows ou o serviço em segundo plano travou. A solução é abrir o 'ncpa.cpl', localizar a interface virtual e clicar em 'Ativar', ou reiniciar o serviço da VPN.",
        "expected_solution": "Abrir as Conexões de Rede (ncpa.cpl), verificar se a placa de rede virtual da VPN está desativada, clicar com o botão direito e selecionar 'Ativar' (ou reiniciar o serviço no services.msc).",
        "keywords": "ncpa.cpl,adaptador virtual,ativar,virtual adapter,cisco anyconnect,forticlient,services.msc,habilitar"
    },
    {
        "id": "HD-1038",
        "title": "Conta Bloqueada por Tentativas Incorretas de Senha (Account Lockout)",
        "description": "Errei minha senha 4 vezes de manhã e agora diz que 'A conta de usuário referenciada está atualmente bloqueada e não pode ser utilizada'.",
        "category": "Active Directory",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "ANSIOSO",
        "context": "A política de segurança do domínio bloqueou a conta por excesso de tentativas incorretas (Account Lockout Threshold). O analista N1 abre o console ADUC (dsa.msc), localiza a conta do usuário, vai nas Propriedades > aba 'Account' (Conta) e desmarca a caixa 'Unlock account' (Desbloquear conta).",
        "expected_solution": "Acessar o console do Active Directory (dsa.msc), abrir as propriedades do usuário na aba 'Account' (Conta), marcar/desmarcar a opção 'Unlock account' e clicar em Aplicar.",
        "keywords": "dsa.msc,unlock account,desbloquear conta,active directory,aduc,conta bloqueada,propriedades"
    },
    {
        "id": "HD-1039",
        "title": "Provisionamento de Novo Colaborador (Criação de Usuário no AD)",
        "description": "Novo funcionário iniciou hoje no departamento de Compras. Preciso que seja criado o login de rede, e-mail corporativo e pasta de departamento.",
        "category": "Active Directory",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "Processo de Onboarding padrão no Active Directory. O analista N1 navega até a OU correta (ex: OU=Compras,OU=Usuarios), clica em 'New > User' (ou copia um usuário modelo do mesmo setor), preenche Nome, Sobrenome, Logon Name (sAMAccountName), define a senha temporária com 'User must change password at next logon' e adiciona aos grupos padrão.",
        "expected_solution": "Criar a nova conta de usuário na Unidade Organizacional (OU) correta no ADUC (dsa.msc), definir a senha temporária obrigando alteração no primeiro logon e associar aos grupos de segurança do setor.",
        "keywords": "criar usuário,novo usuario,ou,unidade organizacional,dsa.msc,samaccountname,senha temporaria,onboarding"
    },
    {
        "id": "HD-1040",
        "title": "Desligamento de Funcionário (Offboarding / Desativação de Conta)",
        "description": "O colaborador encerrou o contrato com a empresa hoje às 17h. Solicito o bloqueio imediato de todos os acessos por segurança.",
        "category": "Active Directory",
        "priority": "HIGH",
        "difficulty": "N1",
        "user_profile": "RH",
        "context": "Processo de Offboarding de segurança. O analista N1 abre o ADUC (dsa.msc), clica com botão direito na conta do colaborador > 'Disable Account' (Desativar Conta), move a conta para a OU 'Desligados / Inactive_Users' e remove dos grupos de segurança corporativos.",
        "expected_solution": "Localizar o usuário no console ADUC (dsa.msc), clicar com o botão direito e selecionar 'Disable Account' (Desativar Conta) e movê-lo para a OU de usuários desativados.",
        "keywords": "disable account,desativar conta,desligamento,offboarding,dsa.msc,bloquear acesso,desativar"
    },
    {
        "id": "HD-1041",
        "title": "Atribuição de Grupos de Segurança e Permissões (Security Groups)",
        "description": "O analista júnior foi promovido para a equipe de Faturamento e precisa de acesso aos relatórios do ERP e pasta confidencial.",
        "category": "Active Directory",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "GESTOR",
        "context": "Gerenciamento de membros em grupos do AD (Member Of). O analista N1 abre as propriedades do usuário no dsa.msc > aba 'Member Of' (Membro de) > clica em 'Add...' (Adicionar) > digita o nome do grupo 'SEC_FIN_FATURAMENTO' e salva. Instruir o usuário a fazer logoff e logon para renovar o token Kerberos.",
        "expected_solution": "Acessar o usuário no ADUC (dsa.msc) > aba 'Member Of' > adicionar o grupo de segurança 'SEC_FIN_FATURAMENTO' e orientar o colaborador a fazer logoff/logon para atualizar os tokens de acesso.",
        "keywords": "member of,membro de,grupo de segurança,adicionar grupo,dsa.msc,logoff,kerberos,token"
    },
    {
        "id": "HD-1042",
        "title": "RSAT não instalado / Gerenciamento Remoto do AD pelo Windows 10/11",
        "description": "Fui contratado como suporte N1, recebi meu notebook mas não encontro o console do Active Directory (dsa.msc) para atender os chamados.",
        "category": "Active Directory / Ferramentas",
        "priority": "MEDIUM",
        "difficulty": "N1",
        "user_profile": "TECNICO",
        "context": "As ferramentas de administração remota de servidor (RSAT - Remote Server Administration Tools) não vêm habilitadas por padrão no Windows cliente. A ação é ir em Configurações do Windows > Aplicativos > Recursos Opcionais > Adicionar Recurso > 'Ferramentas do Active Directory Domain Services e Lightweight Directory Services' (ou via PowerShell com Add-WindowsCapability).",
        "expected_solution": "Instalar o pacote RSAT do Active Directory em Configurações > Recursos Opcionais (ou via PowerShell 'Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0').",
        "keywords": "rsat,recursos opcionais,dsa.msc,ferramentas do active directory,aduc,instalar rsat,powershell"
    }
]

def seed_db(db: Session):
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

    # Clear existing and reload 30 tickets
    db.query(Ticket).delete()
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
        print(f"Database seeded with {len(INITIAL_TICKETS)} comprehensive tickets successfully!")
    finally:
        db.close()
