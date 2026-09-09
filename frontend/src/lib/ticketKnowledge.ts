export interface ScenarioKnowledge {
  title: Record<'pt' | 'en' | 'es', string>;
  category: Record<'pt' | 'en' | 'es', string>;
  level: string;
  whatIsHappening: Record<'pt' | 'en' | 'es', string>;
  investigationSteps: Record<'pt' | 'en' | 'es', string[]>;
  goldenQuestion: Record<'pt' | 'en' | 'es', string>;
  howToSolve: Record<'pt' | 'en' | 'es', string>;
  commandsCheatSheet: { cmd: string; desc: Record<'pt' | 'en' | 'es', string> }[];
}

export const TICKET_KNOWLEDGE: Record<string, ScenarioKnowledge> = {
  "HD-1001": {
    title: {"pt": "Outlook pedindo senha em loop", "en": "Outlook repeatedly prompting for password in loop", "es": "Outlook pidiendo contraseña en bucle continuo"},
    category: {"pt": "Outlook / E-mail", "en": "Outlook / Email", "es": "Outlook / Correo"},
    level: "N1",
    whatIsHappening: { pt: "O Windows guarda senhas antigas no 'Gerenciador de Credenciais'. Quando a senha muda ou o e-mail migra, o Outlook tenta usar o token velho e fica pedindo senha sem parar.", en: "Windows stores old passwords in the 'Credential Manager'. When the password changes or the email migrates, Outlook tries to use the old token and keeps asking for a password over and over again.", es: "Windows almacena contraseñas antiguas en el 'Administrador de credenciales'. Cuando la contraseña cambia o el correo electrónico migra, Outlook intenta utilizar el token antiguo y sigue pidiendo una contraseña una y otra vez." },
    investigationSteps: {
      pt: ["Pergunte se o usuário consegue acessar o e-mail pelo navegador (Webmail / Outlook Web).", "Se no navegador funciona, o problema é exclusivamente no aplicativo local e no cache de credenciais do Windows."],
      en: ["Ask if the user can access the email via the browser (Webmail / Outlook Web).", "If it works in the browser, the problem is exclusively with the local application and the Windows credential cache."],
      es: ["Preguntar si el usuario puede acceder al correo electrónico a través del navegador (Webmail/Outlook Web).", "Si funciona en el navegador, el problema está exclusivamente en la aplicación local y en la caché de credenciales de Windows."]
    },
    goldenQuestion: { pt: "Você consegue abrir o e-mail no navegador pelo link do Webmail ou o erro também acontece lá?", en: "Can you open the email in the browser using the Webmail link or does the error also happen there?", es: "¿Puedes abrir el correo electrónico en el navegador usando el enlace de Webmail o el error también ocurre allí?" },
    howToSolve: { pt: "Oriente o usuário a abrir o menu Iniciar > digitar 'Gerenciador de Credenciais' > ir em 'Credenciais do Windows' > apagar todas as entradas que comecem com 'MicrosoftOffice' ou 'MS.Outlook' e reabrir o Outlook.", en: "Instruct the user to open the Start menu > type 'Credential Manager' > go to 'Windows Credentials' > delete all entries that begin with 'MicrosoftOffice' or 'MS.Outlook' and reopen Outlook.", es: "Indique al usuario que abra el menú Inicio > escriba 'Administrador de credenciales' > vaya a 'Credenciales de Windows' > elimine todas las entradas que comiencen con 'MicrosoftOffice' o 'MS.Outlook' y vuelva a abrir Outlook." },
    commandsCheatSheet: [
      { cmd: "control keymgr.dll", desc: { pt: "Abre o Gerenciador de Credenciais do Windows diretamente.", en: "Opens Windows Credential Manager directly.", es: "Abre el Administrador de credenciales de Windows directamente." } },
      { cmd: "outlook.exe /safe", desc: { pt: "Inicia o Outlook em modo de segurança sem suplementos.", en: "Starts Outlook in safe mode without add-ins.", es: "Inicia Outlook en modo seguro sin complementos." } },
    ]
  },
  "HD-1002": {
    title: {"pt": "Impressora Offline / Sem Conexão", "en": "Printer Offline / No Network Connection", "es": "Impresora Desconectada / Sin Conexión de Red"},
    category: {"pt": "Impressora", "en": "Printer", "es": "Impresora"},
    level: "N1",
    whatIsHappening: { pt: "O computador não consegue se comunicar com a impressora. 80% dos casos são físicos (cabo de rede solto ou travamento no serviço de Spooler do Windows).", en: "The computer cannot communicate with the printer. 80% of cases are physical (loose network cable or crash in the Windows Spooler service).", es: "La computadora no puede comunicarse con la impresora. El 80% de los casos son físicos (cable de red suelto o falla en el servicio Spooler de Windows)." },
    investigationSteps: {
      pt: ["Pergunte se as luzes da impressora estão acesas na parte frontal.", "Peça para o usuário verificar se o cabo azul/cinza de rede (RJ45) atrás da impressora está com o LED verde/laranja piscando."],
      en: ["Ask if the printer lights are on the front.", "Ask the user to check whether the blue/gray network cable (RJ45) behind the printer has the green/orange LED flashing."],
      es: ["Pregunte si las luces de la impresora están en el frente.", "Solicite al usuario que verifique si el cable de red azul/gris (RJ45) detrás de la impresora tiene el LED verde/naranja parpadeando."]
    },
    goldenQuestion: { pt: "Atrás da impressora tem um cabo de rede conectado. As luzinhas dele estão piscando ou o cabo está meio solto?", en: "There is a network cable connected to the back of the printer. Are the lights blinking or is the cable a bit loose?", es: "Hay un cable de red conectado a la parte posterior de la impresora. ¿Las luces parpadean o el cable está un poco flojo?" },
    howToSolve: { pt: "Reconectar o cabo de rede firmemente na porta traseira da impressora até ouvir o clique e reiniciar o serviço de Spooler se a fila estiver travada.", en: "Reconnect the network cable firmly into the printer's rear port until it clicks and restart the Spooler service if the queue is stuck.", es: "Vuelva a conectar el cable de red firmemente al puerto posterior de la impresora hasta que haga clic y reinicie el servicio Spooler si la cola está atascada." },
    commandsCheatSheet: [
      { cmd: "net stop spooler && net start spooler", desc: { pt: "Reinicia o serviço de fila de impressão do Windows.", en: "Restarts the Windows Print Queue service.", es: "Reinicia el servicio Cola de impresión de Windows." } },
    ]
  },
  "HD-1003": {
    title: {"pt": "VPN não conecta / Erro de Autenticação", "en": "VPN Fails to Connect / Authentication Error", "es": "VPN no conecta / Error de Autenticación"},
    category: {"pt": "VPN", "en": "VPN", "es": "VPN"},
    level: "N1",
    whatIsHappening: { pt: "O usuário digita login e senha, mas o token de 2 fatores (MFA/Authenticator) está desincronizado ou ele esqueceu de digitar o código no campo correto.", en: "The user enters login and password, but the 2-factor token (MFA/Authenticator) is out of sync or he forgot to enter the code in the correct field.", es: "El usuario ingresa el nombre de usuario y la contraseña, pero el token de 2 factores (MFA/Authenticator) no está sincronizado o olvidó ingresar el código en el campo correcto." },
    investigationSteps: {
      pt: ["Pergunte se o relógio do celular do usuário está no modo automático.", "Confirme se o aplicativo da VPN pede a senha combinada com o código do token (ex: Senha123456789)."],
      en: ["Ask if the user's cell phone clock is in automatic mode.", "Confirm that the VPN application asks for the password combined with the token code (ex: Password123456789)."],
      es: ["Preguntar si el reloj del celular del usuario está en modo automático.", "Confirme que la aplicación VPN solicite la contraseña combinada con el código del token (por ejemplo: Contraseña123456789)."]
    },
    goldenQuestion: { pt: "Você está digitando o código de 6 números do aplicativo do celular (Microsoft Authenticator) junto com a sua senha?", en: "Are you entering the 6-number code from the cell phone app (Microsoft Authenticator) along with your password?", es: "¿Estás ingresando el código de 6 números de la aplicación del celular (Microsoft Authenticator) junto con tu contraseña?" },
    howToSolve: { pt: "Ajustar o relógio do celular para automático e digitar o código MFA gerado na hora.", en: "Set your cell phone clock to automatic and enter the MFA code generated at the time.", es: "Configura el reloj de tu celular en automático e ingresa el código MFA generado en ese momento." },
    commandsCheatSheet: [
      { cmd: "ping 10.0.0.1", desc: { pt: "Testa se o túnel da VPN fechou com a rede interna da empresa.", en: "Tests whether the VPN tunnel has closed with the company's internal network.", es: "Comprueba si el túnel VPN se ha cerrado con la red interna de la empresa." } },
    ]
  },
  "HD-1004": {
    title: {"pt": "Teams sem áudio / Microfone incorreto", "en": "Teams No Audio / Incorrect Microphone Input", "es": "Teams sin audio / Micrófono incorrecto seleccionado"},
    category: {"pt": "Teams", "en": "Teams", "es": "Teams"},
    level: "N1",
    whatIsHappening: { pt: "O Microsoft Teams selecionou o microfone da webcam em vez do Headset USB do usuário.", en: "Microsoft Teams selected the webcam microphone instead of the user's USB Headset.", es: "Microsoft Teams seleccionó el micrófono de la cámara web en lugar de los auriculares USB del usuario." },
    investigationSteps: {
      pt: ["Pergunte se o usuário usa fone de ouvido com fio ou Bluetooth.", "Oriente a abrir as configurações de dispositivo no Teams."],
      en: ["Ask whether the user uses a wired or Bluetooth headset.", "Guide to open device settings in Teams."],
      es: ["Pregunte si el usuario utiliza auriculares con cable o Bluetooth.", "Guía para abrir la configuración del dispositivo en Teams."]
    },
    goldenQuestion: { pt: "No Teams, clique nos 3 pontinhos (...) > Configurações > Dispositivos. Qual microfone está selecionado lá?", en: "In Teams, click on the 3 dots (...) > Settings > Devices. Which microphone is selected there?", es: "En Teams, haga clic en los 3 puntos (...) > Configuración > Dispositivos. ¿Qué micrófono se selecciona allí?" },
    howToSolve: { pt: "Mudar o dispositivo de microfone no Teams para 'Headset USB'.", en: "Change the microphone device in Teams to 'USB Headset'.", es: "Cambie el dispositivo de micrófono en Teams a \"Auriculares USB\"." },
    commandsCheatSheet: [
      { cmd: "mmsys.cpl", desc: { pt: "Abre a lista clássica de dispositivos de Gravação e Reprodução do Windows.", en: "Opens the classic Windows Recording and Playback device list.", es: "Abre la lista clásica de dispositivos de grabación y reproducción de Windows." } },
    ]
  },
  "HD-1005": {
    title: {"pt": "Senha do Active Directory Expirada", "en": "Active Directory Password Expired", "es": "Contraseña de Active Directory Expirada"},
    category: {"pt": "Senha / Acesso", "en": "Password / Access", "es": "Contraseña / Acceso"},
    level: "N1",
    whatIsHappening: { pt: "A política corporativa de 90 dias expirou a senha do colaborador ou a conta bloqueou após tentativas erradas.", en: "The corporate policy of 90 days has expired the employee's password or the account has been locked after wrong attempts.", es: "La política corporativa de 90 días ha caducado la contraseña del empleado o la cuenta ha sido bloqueada después de intentos equivocados." },
    investigationSteps: {
      pt: ["Valide a identidade do colaborador (Nome completo, matrícula/CPF).", "Verifique o status da conta no console do Active Directory (ADUC)."],
      en: ["Validate the employee's identity (Full name, registration number/CPF).", "Check the account status in the Active Directory console (ADUC)."],
      es: ["Validar la identidad del empleado (Nombre completo, número de registro/CPF).", "Verifique el estado de la cuenta en la consola de Active Directory (ADUC)."]
    },
    goldenQuestion: { pt: "Há quanto tempo você não alterava a sua senha corporativa de rede?", en: "How long has it been since you changed your corporate network password?", es: "¿Cuánto tiempo ha pasado desde que cambió la contraseña de su red corporativa?" },
    howToSolve: { pt: "Acessar o AD, clicar com botão direito no usuário > 'Reset Password' > marcar 'User must change password at next logon' e desmarcar 'Unlock the user's account'.", en: "Access AD, right-click on the user > 'Reset Password' > check 'User must change password at next logon' and uncheck 'Unlock the user's account'.", es: "Acceda a AD, haga clic derecho en el usuario > 'Restablecer contraseña' > marque 'El usuario debe cambiar la contraseña en el próximo inicio de sesión' y desmarque 'Desbloquear la cuenta del usuario'." },
    commandsCheatSheet: [
      { cmd: "dsa.msc", desc: { pt: "Abre o Active Directory Users and Computers (ADUC).", en: "Opens Active Directory Users and Computers (ADUC).", es: "Abre Usuarios y computadoras de Active Directory (ADUC)." } },
    ]
  },
  "HD-1006": {
    title: {"pt": "OneDrive não sincroniza arquivos", "en": "OneDrive Not Syncing Files / Storage Error", "es": "OneDrive no sincroniza archivos / Error de almacenamiento"},
    category: {"pt": "OneDrive", "en": "OneDrive", "es": "OneDrive"},
    level: "N1",
    whatIsHappening: { pt: "A sessão do OneDrive expirou ou o armazenamento atingiu o limite de cota.", en: "The OneDrive session has expired or the storage has reached the quota limit.", es: "La sesión de OneDrive expiró o el almacenamiento alcanzó el límite de cuota." },
    investigationSteps: {
      pt: ["Pergunte qual o ícone do OneDrive no canto do relógio (nuvem azul com 'x' vermelho ou setas infinitas).", "Peça para clicar na nuvem e ver se tem mensagem pedindo para entrar com a conta."],
      en: ["Ask what the OneDrive icon is in the corner of the clock (blue cloud with red 'x' or infinite arrows).", "Ask to click on the cloud and see if there is a message asking to log in with the account."],
      es: ["Pregunte qué es el ícono de OneDrive en la esquina del reloj (nube azul con una 'x' roja o flechas infinitas).", "Solicite hacer clic en la nube y vea si hay un mensaje solicitando iniciar sesión con la cuenta."]
    },
    goldenQuestion: { pt: "No cantinho do relógio, perto do volume, a nuvem do OneDrive está com algum aviso ou pedindo para 'Entrar'?", en: "In the corner of the clock, near the volume, is the OneDrive cloud showing a warning or asking to 'Sign in'?", es: "En la esquina del reloj, cerca del volumen, ¿la nube de OneDrive muestra una advertencia o solicita \"Iniciar sesión\"?" },
    howToSolve: { pt: "Clicar no ícone da nuvem > Configurações > Conta > Desvincular este computador e entrar novamente.", en: "Click the cloud icon > Settings > Account > Unlink this computer and sign in again.", es: "Haga clic en el ícono de la nube > Configuración > Cuenta > Desvincular esta computadora e inicie sesión nuevamente." },
    commandsCheatSheet: [
      { cmd: "%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset", desc: { pt: "Reseta o cache corrompido do OneDrive.", en: "Resets corrupted OneDrive cache.", es: "Restablece la caché de OneDrive dañada." } },
    ]
  },
  "HD-1007": {
    title: {"pt": "Computador extremamente lento / Disco 100%", "en": "Extremely Slow Computer / 100% Disk Usage", "es": "Computadora extremadamente lenta / Disco al 100%"},
    category: {"pt": "Sistema lento", "en": "Slow System", "es": "Sistema lento"},
    level: "N2",
    whatIsHappening: { pt: "O serviço SysMain (Superfetch) ou Windows Update está consumindo 100% de leitura do disco rígido.", en: "SysMain (Superfetch) or Windows Update service is consuming 100% hard disk read.", es: "El servicio SysMain (Superfetch) o Windows Update consume el 100% de la lectura del disco duro." },
    investigationSteps: {
      pt: ["Peça para o usuário abrir o Gerenciador de Tarefas (Ctrl + Shift + Esc).", "Pergunte se a coluna 'Disco' está marcando 100% em vermelho."],
      en: ["Ask the user to open the Task Manager (Ctrl + Shift + Esc).", "Ask if the 'Disk' column is marking 100% in red."],
      es: ["Pídale al usuario que abra el Administrador de tareas (Ctrl + Shift + Esc).", "Pregunte si la columna 'Disco' marca 100% en rojo."]
    },
    goldenQuestion: { pt: "Pressione Ctrl + Shift + Esc para abrir o Gerenciador de Tarefas. A coluna 'Disco' está em 100%?", en: "Press Ctrl + Shift + Esc to open Task Manager. Is the 'Disk' column at 100%?", es: "Presione Ctrl + Shift + Esc para abrir el Administrador de tareas. ¿La columna 'Disco' está al 100%?" },
    howToSolve: { pt: "Abrir 'services.msc', procurar o serviço 'SysMain', clicar com botão direito > Propriedades > Tipo de inicialização: 'Desativado' e clicar em 'Parar'.", en: "Open 'services.msc', search for the 'SysMain' service, right-click > Properties > Startup type: 'Disabled' and click 'Stop'.", es: "Abra 'services.msc', busque el servicio 'SysMain', haga clic derecho > Propiedades > Tipo de inicio: 'Deshabilitado' y haga clic en 'Detener'." },
    commandsCheatSheet: [
      { cmd: "services.msc", desc: { pt: "Abre o painel de serviços do Windows.", en: "Opens the Windows Services panel.", es: "Abre el panel de Servicios de Windows." } },
      { cmd: "taskmgr", desc: { pt: "Abre o Gerenciador de Tarefas para ver consumo de CPU, RAM e Disco.", en: "Open Task Manager to see CPU, RAM and Disk consumption.", es: "Abra el Administrador de tareas para ver el consumo de CPU, RAM y disco." } },
    ]
  },
  "HD-1008": {
    title: {"pt": "Acesso Negado a Pasta de Rede", "en": "Access Denied to Shared Network Folder", "es": "Acceso Denegado a Carpeta Compartida de Red"},
    category: {"pt": "Permissões", "en": "Permissions", "es": "Permisos"},
    level: "N2",
    whatIsHappening: { pt: "O usuário trocou de função e ainda não foi colocado no grupo de segurança do Active Directory que tem permissão na pasta.", en: "The user has switched roles and has not yet been placed in the Active Directory security group that has permissions on the folder.", es: "El usuario cambió de roles y aún no se lo ha colocado en el grupo de seguridad de Active Directory que tiene permisos en la carpeta." },
    investigationSteps: {
      pt: ["Descubra qual o caminho da pasta compartilhada (ex: \\\\servidor\\financeiro).", "Verifique quais grupos têm acesso de leitura/escrita na pasta."],
      en: ["Find out the path of the shared folder (ex: \\\\server\\financial).", "Check which groups have read/write access to the folder."],
      es: ["Descubra la ruta de la carpeta compartida (por ejemplo: \\\\server\\financial).", "Compruebe qué grupos tienen acceso de lectura/escritura a la carpeta."]
    },
    goldenQuestion: { pt: "Você mudou de cargo ou setor recentemente na empresa?", en: "Have you recently changed positions or sectors within the company?", es: "¿Ha cambiado recientemente de puesto o sector dentro de la empresa?" },
    howToSolve: { pt: "Adicionar o usuário ao grupo de segurança correspondente no AD e instruí-lo a fazer logoff e logon.", en: "Add the user to the corresponding security group in AD and instruct them to log off and on.", es: "Agregue el usuario al grupo de seguridad correspondiente en AD e indíquele que cierre y vuelva a iniciar sesión." },
    commandsCheatSheet: [
      { cmd: "whoami /groups", desc: { pt: "Lista todos os grupos de segurança do domínio aos quais o usuário pertence.", en: "Lists all domain security groups to which the user belongs.", es: "Enumera todos los grupos de seguridad de dominio a los que pertenece el usuario." } },
    ]
  },
  "HD-1009": {
    title: {"pt": "Wi-Fi caindo a cada 2 minutos", "en": "Wi-Fi Disconnecting Every 2 Minutes", "es": "Wi-Fi se desconecta cada 2 minutos"},
    category: {"pt": "Wi-Fi", "en": "Wi-Fi", "es": "Wi-Fi"},
    level: "N1",
    whatIsHappening: { pt: "O Windows está desligando a placa Wi-Fi para economizar bateria.", en: "Windows is turning off the Wi-Fi card to save battery.", es: "Windows está apagando la tarjeta Wi-Fi para ahorrar batería." },
    investigationSteps: {
      pt: ["Pergunte se o notebook está fora da tomada (usando apenas bateria).", "Oriente a abrir o Gerenciador de Dispositivos."],
      en: ["Ask if the notebook is unplugged (only using battery).", "Instruct to open Device Manager."],
      es: ["Pregunte si la notebook está desconectada (solo usa batería).", "Indique abrir el Administrador de dispositivos."]
    },
    goldenQuestion: { pt: "O Wi-Fi cai mais quando o notebook está fora da tomada usando a bateria?", en: "Does the Wi-Fi drop more when the notebook is unplugged using the battery?", es: "¿El Wi-Fi baja más cuando se desconecta el notebook usando la batería?" },
    howToSolve: { pt: "Abrir 'devmgmt.msc' > Adaptadores de Rede > clicar na placa Wi-Fi > Guia 'Gerenciamento de Energia' > desmarcar 'O computador pode desligar este dispositivo para economizar energia'.", en: "Open 'devmgmt.msc' > Network Adapters > click on the Wi-Fi card > 'Power Management' tab > uncheck 'The computer may turn off this device to save power'.", es: "Abra 'devmgmt.msc' > Adaptadores de red > haga clic en la tarjeta Wi-Fi > pestaña 'Administración de energía' > desmarque 'La computadora puede apagar este dispositivo para ahorrar energía'." },
    commandsCheatSheet: [
      { cmd: "devmgmt.msc", desc: { pt: "Abre o Gerenciador de Dispositivos.", en: "Open Device Manager.", es: "Abra el Administrador de dispositivos." } },
    ]
  },
  "HD-1010": {
    title: {"pt": "Sistema ERP não conecta (Oracle / DNS)", "en": "Corporate ERP Fails to Connect (Oracle / DNS)", "es": "Sistema ERP no conecta (Oracle / DNS)"},
    category: {"pt": "Software corporativo", "en": "Corporate Software", "es": "Software corporativo"},
    level: "DESAFIO",
    whatIsHappening: { pt: "A placa de rede do usuário está configurada com DNS público (8.8.8.8) e não consegue traduzir o nome do servidor de banco de dados interno.", en: "The user's network card is configured with public DNS (8.8.8.8) and cannot translate the internal database server name.", es: "La tarjeta de red del usuario está configurada con DNS público (8.8.8.8) y no puede traducir el nombre del servidor de base de datos interno." },
    investigationSteps: {
      pt: ["Peça para o usuário rodar 'ipconfig /all' e ver qual o servidor DNS.", "Teste se o IP interno responde ao ping."],
      en: ["Ask the user to run 'ipconfig /all' and see what the DNS server is.", "Test whether the internal IP responds to ping."],
      es: ["Pídale al usuario que ejecute 'ipconfig /all' y vea cuál es el servidor DNS.", "Pruebe si la IP interna responde al ping."]
    },
    goldenQuestion: { pt: "Abra o CMD e digite 'ipconfig /all'. Qual o endereço que aparece em 'Servidores DNS'?", en: "Open CMD and type 'ipconfig /all'. What address appears in 'DNS Servers'?", es: "Abra CMD y escriba 'ipconfig /all'. ¿Qué dirección aparece en 'Servidores DNS'?" },
    howToSolve: { pt: "Alterar as propriedades IPv4 da placa de rede para 'Obter endereço dos servidores DNS automaticamente' ou inserir o IP do DNS corporativo.", en: "Change the IPv4 properties of the network card to 'Obtain DNS server address automatically' or enter the corporate DNS IP.", es: "Cambie las propiedades IPv4 de la tarjeta de red a 'Obtener la dirección del servidor DNS automáticamente' o ingrese la IP DNS corporativa." },
    commandsCheatSheet: [
      { cmd: "nslookup servidor-oracle", desc: { pt: "Testa se o DNS corporativo resolve o IP do servidor ERP.", en: "Tests whether the corporate DNS resolves the ERP server IP.", es: "Prueba si el DNS corporativo resuelve la IP del servidor ERP." } },
    ]
  },
  "HD-1011": {
    title: {"pt": "Tela Azul (BSOD) MEMORY_MANAGEMENT", "en": "Blue Screen (BSOD) MEMORY_MANAGEMENT", "es": "Pantalla Azul (BSOD) MEMORY_MANAGEMENT"},
    category: {"pt": "Hardware / Windows", "en": "Hardware / Windows", "es": "Hardware / Windows"},
    level: "N1",
    whatIsHappening: { pt: "Um pente de memória RAM está com defeito físico, oxidação ou mau contato no slot.", en: "A RAM memory stick has a physical defect, oxidation or poor contact in the slot.", es: "Una memoria RAM tiene algún defecto físico, oxidación o mal contacto en la ranura." },
    investigationSteps: {
      pt: ["Pergunte qual mensagem de parada escrita em letras maiúsculas aparece na tela azul.", "Oriente a executar o teste de memória nativo do Windows."],
      en: ["Ask which stop message written in capital letters appears on the blue screen.", "Guide you to run the Windows native memory test."],
      es: ["Pregunte qué mensaje de parada escrito en mayúsculas aparece en la pantalla azul.", "Le guiará para ejecutar la prueba de memoria nativa de Windows."]
    },
    goldenQuestion: { pt: "Na tela azul aparece uma carinha triste e uma mensagem em letras maiúsculas. O que está escrito lá?", en: "A sad face and a message in capital letters appear on the blue screen. What is written there?", es: "En la pantalla azul aparece una cara triste y un mensaje en mayúsculas. ¿Qué está escrito ahí?" },
    howToSolve: { pt: "Executar 'mdsched.exe' no Windows para diagnosticar a RAM. Se confirmar falha, abrir o gabinete, limpar os contatos dourados da RAM com borracha e reencaixar.", en: "Run 'mdsched.exe' in Windows to diagnose RAM. If failure is confirmed, open the case, clean the golden RAM contacts with rubber and reseat.", es: "Ejecute 'mdsched.exe' en Windows para diagnosticar la RAM. Si se confirma la falla, abra la caja, limpie los contactos dorados de la RAM con goma y vuelva a colocarla." },
    commandsCheatSheet: [
      { cmd: "mdsched.exe", desc: { pt: "Executa o Diagnóstico de Memória do Windows antes do boot.", en: "Runs Windows Memory Diagnostics before booting.", es: "Ejecuta el diagnóstico de memoria de Windows antes de iniciar." } },
      { cmd: "sfc /scannow", desc: { pt: "Repara arquivos corrompidos do sistema causados por desligamento abrupto.", en: "Repairs corrupted system files caused by abrupt shutdown.", es: "Repara archivos del sistema dañados causados ​​por un apagado abrupto." } },
    ]
  },
  "HD-1012": {
    title: {"pt": "Computador liga, mas monitor fica \"Sem Sinal\"", "en": "PC Powers On, but Monitor Shows \"No Signal\"", "es": "La PC enciende, pero el monitor muestra \"Sin Señal\""},
    category: {"pt": "Hardware", "en": "Hardware", "es": "Hardware"},
    level: "N1",
    whatIsHappening: { pt: "O computador possui placa de vídeo dedicada (GPU), mas o usuário plugou o cabo HDMI na saída superior onboard errada da placa-mãe.", en: "The computer has a dedicated video card (GPU), but the user plugged the HDMI cable into the wrong onboard top output on the motherboard.", es: "La computadora tiene una tarjeta de video dedicada (GPU), pero el usuario conectó el cable HDMI en la salida superior integrada incorrecta en la placa base." },
    investigationSteps: {
      pt: ["Pergunte se o computador foi mudado de lugar ou os cabos foram desconectados.", "Peça para olhar a traseira do gabinete e verificar se tem duas portas HDMI diferentes."],
      en: ["Ask if the computer has been moved or cables have been disconnected.", "Ask to look at the back of the case and check if it has two different HDMI ports."],
      es: ["Pregunte si se ha movido la computadora o se han desconectado los cables.", "Pida mirar la parte posterior del estuche y verifique si tiene dos puertos HDMI diferentes."]
    },
    goldenQuestion: { pt: "Atrás do seu computador, o cabo HDMI está conectado na parte de cima perto dos USBs ou mais embaixo perto das ventoinhas da placa de vídeo?", en: "On the back of your computer, is the HDMI cable connected at the top near the USBs or lower near the graphics card fans?", es: "En la parte posterior de su computadora, ¿el cable HDMI está conectado en la parte superior cerca de los USB o en la parte inferior cerca de los ventiladores de la tarjeta gráfica?" },
    howToSolve: { pt: "Conectar o cabo de vídeo na porta HDMI/DisplayPort horizontal da placa de vídeo dedicada na parte inferior traseira.", en: "Connect the video cable to the horizontal HDMI/DisplayPort port of the dedicated video card at the bottom back.", es: "Conecte el cable de video al puerto HDMI/DisplayPort horizontal de la tarjeta de video dedicada en la parte inferior posterior." },
    commandsCheatSheet: [
      { cmd: "Inspeção Visual", desc: { pt: "Sempre usar a saída de vídeo da placa dedicada (inferior) quando disponível.", en: "Always use the dedicated card's video output (bottom) when available.", es: "Utilice siempre la salida de vídeo de la tarjeta dedicada (inferior) cuando esté disponible." } },
    ]
  },
  "HD-1013": {
    title: {"pt": "Conflito de Endereço IP na Rede Local", "en": "IP Address Conflict on Local Network", "es": "Conflicto de Dirección IP en la Red Local"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N1",
    whatIsHappening: { pt: "Dois computadores ou uma impressora receberam o mesmo endereço IP na rede, travando a navegação.", en: "Two computers or a printer received the same IP address on the network, blocking browsing.", es: "Dos computadoras o una impresora recibieron la misma dirección IP en la red, bloqueando la navegación." },
    investigationSteps: {
      pt: ["Peça para o usuário abrir o Prompt de Comando (CMD).", "Solicite que ele libere e renove a concessão IP com o servidor DHCP."],
      en: ["Ask the user to open Command Prompt (CMD).", "Request it to release and renew the IP lease with the DHCP server."],
      es: ["Pídale al usuario que abra el símbolo del sistema (CMD).", "Solicite que libere y renueve la concesión de IP con el servidor DHCP."]
    },
    goldenQuestion: { pt: "Abra o Prompt de Comando (CMD) e digite 'ipconfig'. Qual endereço IPv4 aparece para você?", en: "Open Command Prompt (CMD) and type 'ipconfig'. Which IPv4 address appears to you?", es: "Abra el símbolo del sistema (CMD) y escriba 'ipconfig'. ¿Qué dirección IPv4 te aparece?" },
    howToSolve: { pt: "Executar no Prompt de Comando: 'ipconfig /release' (para soltar o IP conflitante) e depois 'ipconfig /renew' (para pegar um IP novo e livre no DHCP).", en: "Run in the Command Prompt: 'ipconfig /release' (to release the conflicting IP) and then 'ipconfig /renew' (to get a new, free IP from DHCP).", es: "Ejecute en el símbolo del sistema: 'ipconfig /release' (para liberar la IP en conflicto) y luego 'ipconfig /renew' (para obtener una nueva IP gratuita de DHCP)." },
    commandsCheatSheet: [
      { cmd: "ipconfig /release", desc: { pt: "Libera o endereço IP atual comunicando o servidor DHCP.", en: "Releases the current IP address by communicating to the DHCP server.", es: "Libera la dirección IP actual comunicándose con el servidor DHCP." } },
      { cmd: "ipconfig /renew", desc: { pt: "Solicita um novo IP exclusivo e livre ao servidor DHCP.", en: "Requests a new unique and free IP from the DHCP server.", es: "Solicita una nueva IP única y gratuita al servidor DHCP." } },
    ]
  },
  "HD-1014": {
    title: {"pt": "Sem Internet: Navegador não abre, mas ping 8.8.8.8 funciona", "en": "No Internet: Browser fails, but ping 8.8.8.8 works (DNS Failure)", "es": "Sin Internet: Navegador no abre, pero ping 8.8.8.8 funciona (Falla de DNS)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N2",
    whatIsHappening: { pt: "A rota de internet e o roteador estão funcionando perfeitamente, mas o servidor DNS travou ou o cache local corrompeu.", en: "The internet route and router are working perfectly, but the DNS server has crashed or the local cache has become corrupted.", es: "La ruta de Internet y el enrutador funcionan perfectamente, pero el servidor DNS falló o el caché local se corrompió." },
    investigationSteps: {
      pt: ["Peça para o usuário digitar 'ping 8.8.8.8' no terminal.", "Se responder, peça para testar 'ping google.com'. Se falhar, é 100% DNS."],
      en: ["Ask the user to type 'ping 8.8.8.8' into the terminal.", "If it responds, ask it to test 'ping google.com'. If it fails, it's 100% DNS."],
      es: ["Pídale al usuario que escriba 'ping 8.8.8.8' en la terminal.", "Si responde, pídale que pruebe 'ping google.com'. Si falla, es 100% DNS."]
    },
    goldenQuestion: { pt: "Abra o CMD e digite 'ping 8.8.8.8'. Aparece 'Resposta de 8.8.8.8' com tempo em milissegundos?", en: "Open CMD and type 'ping 8.8.8.8'. 'Response from 8.8.8.8' appears with time in milliseconds?", es: "Abra CMD y escriba 'ping 8.8.8.8'. ¿Aparece 'Respuesta de 8.8.8.8' con el tiempo en milisegundos?" },
    howToSolve: { pt: "Executar 'ipconfig /flushdns' para limpar o cache local e configurar o DNS para 1.1.1.1 ou 8.8.8.8.", en: "Run 'ipconfig /flushdns' to clear the local cache and set the DNS to 1.1.1.1 or 8.8.8.8.", es: "Ejecute 'ipconfig /flushdns' para borrar el caché local y configurar el DNS en 1.1.1.1 o 8.8.8.8." },
    commandsCheatSheet: [
      { cmd: "ping 8.8.8.8", desc: { pt: "Testa se há saída para a internet por endereço IP puro.", en: "Tests whether there is access to the internet via a pure IP address.", es: "Comprueba si hay acceso a Internet a través de una dirección IP pura." } },
      { cmd: "ipconfig /flushdns", desc: { pt: "Limpa o cache corrompido do resolvedor de nomes DNS.", en: "Clears corrupt DNS name resolver cache.", es: "Borra la caché de resolución de nombres DNS corrupta." } },
    ]
  },
  "HD-1015": {
    title: {"pt": "No Bootable Device Found (Tela Preta de Inicialização)", "en": "No Bootable Device Found (Startup Black Screen)", "es": "No Bootable Device Found (Pantalla Negra de Arranque)"},
    category: {"pt": "Hardware / Windows", "en": "Hardware / Windows", "es": "Hardware / Windows"},
    level: "N2",
    whatIsHappening: { pt: "O usuário esqueceu um pendrive não inicializável plugado e a BIOS tentou dar boot por ele primeiro em vez do SSD.", en: "The user forgot a non-bootable USB stick plugged in and the BIOS tried to boot from that first instead of the SSD.", es: "El usuario olvidó conectar una memoria USB que no es de arranque y el BIOS intentó arrancar desde allí primero en lugar del SSD." },
    investigationSteps: {
      pt: ["Pergunte se há algum pendrive, HD externo ou cartão de memória plugado no notebook.", "Peça para remover tudo e ligar novamente."],
      en: ["Ask if there is a pendrive, external hard drive or memory card plugged into the notebook.", "Ask to remove everything and turn it on again."],
      es: ["Pregunte si hay algún pendrive, disco duro externo o tarjeta de memoria conectado al notebook.", "Pide quitar todo y volver a encenderlo."]
    },
    goldenQuestion: { pt: "Tem algum pendrive ou dispositivo USB plugado nas portas laterais do computador neste momento?", en: "Do you have a pendrive or USB device plugged into the computer's side ports right now?", es: "¿Tienes ahora mismo un pendrive o dispositivo USB conectado a los puertos laterales del ordenador?" },
    howToSolve: { pt: "Desconectar qualquer pendrive ou dispositivo USB e reiniciar o equipamento.", en: "Disconnect any pendrive or USB device and restart the equipment.", es: "Desconecta cualquier pendrive o dispositivo USB y reinicia el equipo." },
    commandsCheatSheet: [
      { cmd: "BIOS F2 / DEL", desc: { pt: "Acessa as opções de prioridade de boot (Boot Priority Order).", en: "Access boot priority options (Boot Priority Order).", es: "Acceda a las opciones de prioridad de arranque (Orden de prioridad de arranque)." } },
    ]
  },
  "HD-1016": {
    title: {"pt": "IP 169.254.x.x (APIPA / Rede Não Identificada)", "en": "IP 169.254.x.x (APIPA / Unidentified Network)", "es": "IP 169.254.x.x (APIPA / Red No Identificada)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N1",
    whatIsHappening: { pt: "O computador não conseguiu falar com o servidor DHCP. O Windows atribuiu um IP automático provisório inútil (faixa 169.254).", en: "The computer was unable to talk to the DHCP server. Windows assigned a useless temporary automatic IP (range 169,254).", es: "La computadora no pudo comunicarse con el servidor DHCP. Windows asignó una IP automática temporal inútil (rango 169.254)." },
    investigationSteps: {
      pt: ["Peça o resultado do 'ipconfig'.", "Verifique se o cabo de rede está conectado na tomada da parede ou switch."],
      en: ["Ask for the result of 'ipconfig'.", "Check if the network cable is plugged into the wall socket or switch."],
      es: ["Solicite el resultado de 'ipconfig'.", "Compruebe si el cable de red está enchufado a la toma de pared o al interruptor."]
    },
    goldenQuestion: { pt: "No 'ipconfig', o seu endereço IPv4 começa com 169.254 e o Gateway Padrão está vazio?", en: "In 'ipconfig', your IPv4 address starts with 169.254 and the Default Gateway is empty?", es: "En 'ipconfig', ¿su dirección IPv4 comienza con 169.254 y la puerta de enlace predeterminada está vacía?" },
    howToSolve: { pt: "Reconectar o cabo de rede firmemente na tomada de rede da parede/switch e rodar 'ipconfig /renew'.", en: "Reconnect the network cable firmly into the wall/switch network socket and run 'ipconfig /renew'.", es: "Vuelva a conectar el cable de red firmemente a la toma de red de la pared/interruptor y ejecute 'ipconfig /renew'." },
    commandsCheatSheet: [
      { cmd: "ipconfig", desc: { pt: "Verifica se o IP está na faixa de autoconfiguração 169.254.0.0/16.", en: "Checks if the IP is in the 169.254.0.0/16 autoconfiguration range.", es: "Comprueba si la IP está en el rango de configuración automática 169.254.0.0/16." } },
    ]
  },
  "HD-1017": {
    title: {"pt": "Políticas de Grupo (GPO) e Pastas não aplicadas", "en": "Group Policies (GPO) and Folders Not Applied", "es": "Políticas de Grupo (GPO) y Carpetas no aplicadas"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "N2",
    whatIsHappening: { pt: "O computador perdeu a sincronização com o controlador de domínio do Active Directory.", en: "The computer has lost synchronization with the Active Directory domain controller.", es: "La computadora ha perdido la sincronización con el controlador de dominio de Active Directory." },
    investigationSteps: {
      pt: ["Pergunte se os atalhos e pastas de rede sumiram após a troca de setor.", "Oriente a forçar a sincronização de diretivas."],
      en: ["Ask if network shortcuts and folders disappeared after sector switching.", "Guide to force policy synchronization."],
      es: ["Pregunte si las carpetas y los accesos directos de red desaparecieron después del cambio de sector.", "Guía para forzar la sincronización de políticas."]
    },
    goldenQuestion: { pt: "Você pode abrir o CMD como Administrador para forçarmos a sincronização das políticas da empresa?", en: "Can you open CMD as an Administrator so we can force company policies to sync?", es: "¿Puedes abrir CMD como administrador para que podamos forzar la sincronización de las políticas de la empresa?" },
    howToSolve: { pt: "Abrir o Prompt como Administrador e executar o comando 'gpupdate /force'.", en: "Open the Prompt as Administrator and run the 'gpupdate /force' command.", es: "Abra el mensaje como administrador y ejecute el comando 'gpupdate /force'." },
    commandsCheatSheet: [
      { cmd: "gpupdate /force", desc: { pt: "Força a aplicação e atualização imediata das políticas de grupo do Active Directory.", en: "Forces Active Directory group policies to be immediately applied and updated.", es: "Fuerza la aplicación y actualización inmediata de las políticas de grupo de Active Directory." } },
      { cmd: "gpresult /r", desc: { pt: "Exibe o relatório de GPOs aplicadas com sucesso.", en: "Displays the successfully applied GPOs report.", es: "Muestra el informe de GPO aplicados correctamente." } },
    ]
  },
  "HD-1018": {
    title: {"pt": "Chave de Recuperação BitLocker (48 Dígitos)", "en": "BitLocker 48-Digit Recovery Key Required", "es": "Clave de Recuperación BitLocker de 48 Dígitos Requerida"},
    category: {"pt": "Segurança / Windows", "en": "Security / Windows", "es": "Seguridad / Windows"},
    level: "N1",
    whatIsHappening: { pt: "O BitLocker bloqueou a inicialização por segurança após uma atualização de BIOS ou alteração de hardware.", en: "BitLocker blocked booting for security after a BIOS update or hardware change.", es: "BitLocker bloqueó el arranque por seguridad después de una actualización del BIOS o un cambio de hardware." },
    investigationSteps: {
      pt: ["Peça para o usuário ler o 'Recovery Key ID' de 8 a 32 caracteres que aparece na tela azul.", "Localize a chave no Microsoft Entra ID (Azure AD) ou Active Directory."],
      en: ["Ask the user to read the 8 to 32 character 'Recovery Key ID' that appears on the blue screen.", "Locate the key in Microsoft Entra ID (Azure AD) or Active Directory."],
      es: ["Pídale al usuario que lea el 'ID de clave de recuperación' de 8 a 32 caracteres que aparece en la pantalla azul.", "Busque la clave en Microsoft Entra ID (Azure AD) o Active Directory."]
    },
    goldenQuestion: { pt: "Na tela azul do BitLocker, qual é o 'Identificador da Chave de Recuperação' (Key ID) que aparece?", en: "On the BitLocker blue screen, what is the 'Recovery Key Identifier' (Key ID) that appears?", es: "En la pantalla azul de BitLocker, ¿qué es el 'Identificador de clave de recuperación' (ID de clave) que aparece?" },
    howToSolve: { pt: "Acessar o portal do Microsoft Entra ID > Dispositivos > localizar pelo ID e fornecer a chave numérica de 48 dígitos para o usuário digitar.", en: "Access the Microsoft Entra ID portal > Devices > locate by ID and provide the 48-digit numeric key for the user to enter.", es: "Acceda al portal Microsoft Entra ID > Dispositivos > busque por ID y proporcione la clave numérica de 48 dígitos para que el usuario la ingrese." },
    commandsCheatSheet: [
      { cmd: "portal.azure.com", desc: { pt: "Portal do Microsoft Entra ID onde ficam salvas as chaves do BitLocker.", en: "Microsoft Portal Enter ID where BitLocker keys are saved.", es: "Portal de Microsoft Introduzca el ID donde se guardan las claves de BitLocker." } },
    ]
  },
  "HD-1019": {
    title: {"pt": "Office: \"Produto Não Licenciado\"", "en": "Office Suite: \"Unlicensed Product\" Banner", "es": "Suite de Office: \"Producto No Licenciado\""},
    category: {"pt": "Microsoft 365", "en": "Microsoft 365", "es": "Microsoft 365"},
    level: "N1",
    whatIsHappening: { pt: "A sessão do Microsoft 365 expirou no Windows ou a licença precisa ser reautenticada.", en: "Microsoft 365 session has expired on Windows or license needs to be re-authenticated.", es: "La sesión de Microsoft 365 expiró en Windows o es necesario volver a autenticar la licencia." },
    investigationSteps: {
      pt: ["Peça para o usuário abrir o Word > ir no menu Arquivo > Conta.", "Verifique se o e-mail logado é o e-mail corporativo correto."],
      en: ["Ask the user to open Word > go to the File > Account menu.", "Check that the logged in email is the correct corporate email."],
      es: ["Pídale al usuario que abra Word> vaya al menú Archivo> Cuenta.", "Verifique que el correo electrónico registrado sea el correo electrónico corporativo correcto."]
    },
    goldenQuestion: { pt: "No Word, clique em Arquivo > Conta. Qual e-mail aparece em 'Informações do Usuário'?", en: "In Word, click File > Account. Which email appears in 'User Information'?", es: "En Word, haga clic en Archivo > Cuenta. ¿Qué correo electrónico aparece en 'Información de usuario'?" },
    howToSolve: { pt: "Clicar em 'Desconectar' na tela de Conta do Office, fechar o Word, abrir novamente e fazer login com o e-mail corporativo e senha.", en: "Click 'Disconnect' on the Office Account screen, close Word, open it again and log in with your corporate email and password.", es: "Haga clic en 'Desconectar' en la pantalla Cuenta de Office, cierre Word, ábralo nuevamente e inicie sesión con su correo electrónico y contraseña corporativos." },
    commandsCheatSheet: [
      { cmd: "admin.microsoft.com", desc: { pt: "Portal do Microsoft 365 para checar se a licença do usuário está ativa.", en: "Microsoft 365 portal to check if the user's license is active.", es: "Portal de Microsoft 365 para comprobar si la licencia del usuario está activa." } },
    ]
  },
  "HD-1020": {
    title: {"pt": "E-mails importantes caindo no Lixo Eletrônico / Spam", "en": "Critical Emails Going to Junk / Spam Folder", "es": "Correos importantes cayendo en Correo no deseado / Spam"},
    category: {"pt": "Outlook / E-mail", "en": "Outlook / Email", "es": "Outlook / Correo"},
    level: "N1",
    whatIsHappening: { pt: "O filtro de spam do Outlook está agressivo ou o remetente não está na lista de exceções seguras.", en: "Outlook's spam filter is aggressive or the sender is not on the safe exceptions list.", es: "El filtro de spam de Outlook es agresivo o el remitente no está en la lista de excepciones seguras." },
    investigationSteps: {
      pt: ["Pergunte qual é o domínio de e-mail do cliente (ex: @parceiro.com.br).", "Oriente o usuário a acessar as configurações de Lixo Eletrônico no Outlook."],
      en: ["Ask what the customer's email domain is (e.g. @parceiro.com.br).", "Guide the user to access the Junk Email settings in Outlook."],
      es: ["Pregunte cuál es el dominio de correo electrónico del cliente (por ejemplo, @parceiro.com.br).", "Guíe al usuario para acceder a la configuración de correo electrónico no deseado en Outlook."]
    },
    goldenQuestion: { pt: "Qual é o endereço ou domínio de e-mail exato do cliente que está caindo no lixo eletrônico?", en: "What is the exact email address or domain of the customer that is being spammed?", es: "¿Cuál es la dirección de correo electrónico exacta o el dominio del cliente al que se envía spam?" },
    howToSolve: { pt: "No Outlook, ir na aba Página Inicial > Lixo Eletrônico > 'Opções de Lixo Eletrônico' > aba 'Remetentes Confiáveis' > Adicionar o domínio '@propostas-parceiro.com.br' e salvar.", en: "In Outlook, go to the Home tab > Junk Email > 'Junk Email Options' > 'Safe Senders' tab > Add the domain '@propostas-parceiro.com.br' and save.", es: "En Outlook, vaya a la pestaña Inicio > Correo no deseado > 'Opciones de correo electrónico no deseado' > pestaña 'Remitentes seguros' > Agregue el dominio '@propostas-parceiro.com.br' y guarde." },
    commandsCheatSheet: [
      { cmd: "Remetentes Confiáveis", desc: { pt: "Garante que mensagens de um domínio nunca sejam enviadas para o lixo.", en: "Ensures that messages from a domain are never sent to the trash.", es: "Garantiza que los mensajes de un dominio nunca se envíen a la papelera." } },
    ]
  },
  "HD-1021": {
    title: {"pt": "Suspeita de Phishing / Anexo Malicioso (.zip)", "en": "Suspected Phishing Email / Malicious Attachment (.zip)", "es": "Sospecha de Phishing / Archivo Adjunto Malicioso (.zip)"},
    category: {"pt": "Segurança / Resposta a Incidentes", "en": "Security / Incident Response", "es": "Seguridad / Respuesta a Incidentes"},
    level: "N1",
    whatIsHappening: { pt: "O usuário executou um anexo malicioso recebido por e-mail. A prioridade zero absoluta de ITIL/Security é conter o incidente antes que o malware se espalhe pela rede.", en: "The user executed a malicious attachment received via email. ITIL/Security's absolute zero priority is to contain the incident before the malware spreads across the network.", es: "El usuario ejecutó un archivo adjunto malicioso recibido por correo electrónico. La prioridad cero absoluta de ITIL/Seguridad es contener el incidente antes de que el malware se propague por la red." },
    investigationSteps: {
      pt: ["Pergunte se a máquina ainda está conectada no cabo de rede ou Wi-Fi.", "Instrua imediatamente a desconexão física."],
      en: ["Ask if the machine is still connected to the network cable or Wi-Fi.", "Immediately instruct physical disconnection."],
      es: ["Pregunte si la máquina todavía está conectada al cable de red o Wi-Fi.", "Instruir inmediatamente la desconexión física."]
    },
    goldenQuestion: { pt: "Por favor, puxe imediatamente o cabo de rede azul atrás do computador e desligue o Wi-Fi para isolarmos a máquina!", en: "Please immediately pull the blue network cable behind the computer and turn off the Wi-Fi so we can isolate the machine!", es: "¡Tire inmediatamente el cable de red azul detrás de la computadora y apague el Wi-Fi para que podamos aislar la máquina!" },
    howToSolve: { pt: "Instruir isolamento físico de rede imediato (desconectar cabo/Wi-Fi), resetar a senha da conta corporativa e abrir chamado de segurança para o time de SOC/CSIRT.", en: "Instruct immediate physical network isolation (disconnect cable/Wi-Fi), reset the corporate account password and open a security ticket to the SOC/CSIRT team.", es: "Instruya el aislamiento físico inmediato de la red (desconecte el cable/Wi-Fi), restablezca la contraseña de la cuenta corporativa y abra un ticket de seguridad para el equipo SOC/CSIRT." },
    commandsCheatSheet: [
      { cmd: "ncpa.cpl", desc: { pt: "Abre os adaptadores de rede para desativar interfaces imediatamente.", en: "Opens network adapters to disable interfaces immediately.", es: "Abre adaptadores de red para desactivar las interfaces inmediatamente." } },
      { cmd: "shutdown /s /t 0", desc: { pt: "Desliga a máquina caso apresente atividade de ransomware.", en: "Shut down the machine if it shows ransomware activity.", es: "Apague la máquina si muestra actividad de ransomware." } },
    ]
  },
  "HD-1022": {
    title: {"pt": "Software Bloqueado pelo Windows Defender (Falso Positivo)", "en": "Software Blocked by Windows Defender (False Positive)", "es": "Software Bloqueado por Windows Defender (Falso Positivo)"},
    category: {"pt": "Segurança / Windows", "en": "Security / Windows", "es": "Seguridad / Windows"},
    level: "N2",
    whatIsHappening: { pt: "O sistema interno da empresa não possui assinatura comercial da Microsoft e o SmartScreen bloqueou como 'Aplicativo Potencialmente Indesejado'.", en: "The company's internal system does not have a Microsoft commercial signature and SmartScreen blocked it as a 'Potentially Unwanted Application'.", es: "El sistema interno de la empresa no tiene una firma comercial de Microsoft y SmartScreen lo bloqueó como \"aplicación potencialmente no deseada\"." },
    investigationSteps: {
      pt: ["Pergunte o nome do executável e a mensagem exata do Defender.", "Verifique se o executável é da pasta oficial de programas da empresa."],
      en: ["Ask for the name of the executable and the exact message from Defender.", "Check that the executable is from the company's official programs folder."],
      es: ["Solicite el nombre del ejecutable y el mensaje exacto de Defender.", "Comprueba que el ejecutable sea de la carpeta de programas oficiales de la empresa."]
    },
    goldenQuestion: { pt: "Qual é o nome do programa e a mensagem exata que o Windows Defender exibe ao tentar abrir?", en: "What is the name of the program and the exact message that Windows Defender displays when trying to open it?", es: "¿Cuál es el nombre del programa y el mensaje exacto que muestra Windows Defender al intentar abrirlo?" },
    howToSolve: { pt: "Abrir 'Segurança do Windows' > Proteção contra vírus e ameaças > Gerenciar configurações > Exclusões > Adicionar a pasta do programa interno em 'Exclusões'.", en: "Open 'Windows Security' > Virus and threat protection > Manage settings > Exclusions > Add the built-in program folder under 'Exclusions'.", es: "Abra 'Seguridad de Windows' > Protección contra virus y amenazas > Administrar configuración > Exclusiones > Agregue la carpeta del programa integrado en 'Exclusiones'." },
    commandsCheatSheet: [
      { cmd: "windowsdefender:", desc: { pt: "Atalho para abrir a Central de Segurança do Windows.", en: "Shortcut to open Windows Security Center.", es: "Acceso directo para abrir el Centro de seguridad de Windows." } },
    ]
  },
  "HD-1023": {
    title: {"pt": "Erro de Certificado SSL: \"Sua conexão não é privada\"", "en": "SSL Certificate Error: \"Your connection is not private\"", "es": "Error de Certificado SSL: \"Su conexión no es privada\""},
    category: {"pt": "Segurança / Rede", "en": "Security / Networking", "es": "Seguridad / Redes"},
    level: "N1",
    whatIsHappening: { pt: "O relógio do computador perdeu a sincronização ou a bateria da placa-mãe esgotou, fazendo com que todos os certificados SSL válidos pareçam expirados.", en: "The computer's clock has lost synchronization or the motherboard's battery has run out, causing all valid SSL certificates to appear expired.", es: "El reloj de la computadora ha perdido la sincronización o la batería de la placa base se ha agotado, lo que hace que todos los certificados SSL válidos parezcan caducados." },
    investigationSteps: {
      pt: ["Peça para o usuário olhar a data e o ano no canto inferior direito do Windows.", "Se o ano estiver incorreto, a criptografia TLS/HTTPS falha automaticamente."],
      en: ["Ask the user to look at the date and year in the bottom right corner of Windows.", "If the year is incorrect, TLS/HTTPS encryption automatically fails."],
      es: ["Pídale al usuario que mire la fecha y el año en la esquina inferior derecha de Windows.", "Si el año es incorrecto, el cifrado TLS/HTTPS falla automáticamente."]
    },
    goldenQuestion: { pt: "No cantinho do relógio do Windows, qual data, mês e ano estão marcando agora?", en: "In the corner of the Windows clock, what date, month and year are they ticking now?", es: "En la esquina del reloj de Windows, ¿qué fecha, mes y año marcan ahora?" },
    howToSolve: { pt: "Acessar as Configurações de Data e Hora do Windows e ativar 'Definir horário automaticamente' e 'Sincronizar seu relógio' com o servidor NTP.", en: "Access Windows Date and Time Settings and enable 'Set time automatically' and 'Synchronize your clock' with the NTP server.", es: "Acceda a la configuración de fecha y hora de Windows y habilite 'Establecer hora automáticamente' y 'Sincronizar su reloj' con el servidor NTP." },
    commandsCheatSheet: [
      { cmd: "w32tm /resync", desc: { pt: "Força a ressincronização imediata do relógio com o controlador de domínio via NTP.", en: "Forces immediate clock resynchronization with the domain controller via NTP.", es: "Fuerza la resincronización inmediata del reloj con el controlador de dominio a través de NTP." } },
      { cmd: "timedate.cpl", desc: { pt: "Abre o painel clássico de ajuste de Data e Hora.", en: "Opens the classic Date and Time adjustment panel.", es: "Abre el panel clásico de ajuste de fecha y hora." } },
    ]
  },
  "HD-1024": {
    title: {"pt": "Dispositivo \"Não Conforme\" no Microsoft Intune", "en": "Device Flagged as \"Non-Compliant\" in Microsoft Intune", "es": "Dispositivo marcado como \"No Conforme\" en Microsoft Intune"},
    category: {"pt": "Microsoft Intune / MDM", "en": "Microsoft Intune / MDM", "es": "Microsoft Intune / MDM"},
    level: "N2",
    whatIsHappening: { pt: "A política de Acesso Condicional da empresa bloqueou o dispositivo por falta de atualizações de segurança ou desincronização com o Intune.", en: "The company's Conditional Access policy locked the device due to lack of security updates or out of sync with Intune.", es: "La política de acceso condicional de la empresa bloqueó el dispositivo debido a la falta de actualizaciones de seguridad o a la falta de sincronización con Intune." },
    investigationSteps: {
      pt: ["Peça para o usuário abrir o aplicativo 'Portal da Empresa' (Company Portal).", "Verifique se há aviso de atualização pendente do Windows."],
      en: ["Ask the user to open the 'Company Portal' application.", "Check for Windows update pending warning."],
      es: ["Solicite al usuario que abra la aplicación 'Portal de empresa'.", "Verifique la advertencia pendiente de actualización de Windows."]
    },
    goldenQuestion: { pt: "Abra o aplicativo 'Portal da Empresa' no menu Iniciar. Qual status aparece para o seu computador?", en: "Open the 'Company Portal' app from the Start menu. What status appears for your computer?", es: "Abra la aplicación 'Portal de empresa' desde el menú Inicio. ¿Qué estado aparece para tu computadora?" },
    howToSolve: { pt: "Abrir o aplicativo 'Portal da Empresa' (Company Portal) > Dispositivos > selecionar a máquina > clicar em 'Verificar Conformidade' e instalar atualizações pendentes.", en: "Open the 'Company Portal' application > Devices > select the machine > click 'Check Compliance' and install pending updates.", es: "Abra la aplicación 'Portal de empresa' > Dispositivos > seleccione la máquina > haga clic en 'Verificar cumplimiento' e instale las actualizaciones pendientes." },
    commandsCheatSheet: [
      { cmd: "ms-settings:windowsupdate", desc: { pt: "Abre a tela do Windows Update para instalar patches pendentes.", en: "Opens the Windows Update screen to install pending patches.", es: "Abre la pantalla de Windows Update para instalar parches pendientes." } },
    ]
  },
  "HD-1025": {
    title: {"pt": "Falha na Instalação no Software Center (Erro 0x87D1041C)", "en": "Installation Failure in Software Center (Error 0x87D1041C)", "es": "Fallo de Instalación en Software Center (Error 0x87D1041C)"},
    category: {"pt": "Software Corporativo / Intune", "en": "Corporate Software / Intune", "es": "Software Corporativo / Intune"},
    level: "N2",
    whatIsHappening: { pt: "O serviço de download e agentes de gerenciamento do Intune/SCCM travou com arquivos temporários corrompidos.", en: "The Intune/SCCM download service and management agents crashed with corrupt temporary files.", es: "El servicio de descarga y los agentes de administración de Intune/SCCM fallaron con archivos temporales corruptos." },
    investigationSteps: {
      pt: ["Pergunte qual é o código de erro exibido no catálogo de softwares.", "Oriente o reinício do serviço de extensão do Intune."],
      en: ["Ask what error code is displayed in the software catalog.", "Guide restart of the Intune extension service."],
      es: ["Pregunte qué código de error se muestra en el catálogo de software.", "Guía de reinicio del servicio de extensión de Intune."]
    },
    goldenQuestion: { pt: "Qual o código de erro exato que aparece no Software Center ao tentar instalar o programa?", en: "What is the exact error code that appears in Software Center when trying to install the program?", es: "¿Cuál es el código de error exacto que aparece en el Centro de software al intentar instalar el programa?" },
    howToSolve: { pt: "Abrir 'services.msc' como Administrador, localizar o serviço 'Microsoft Intune Management Extension', clicar com botão direito e selecionar 'Reiniciar'.", en: "Open 'services.msc' as Administrator, locate the 'Microsoft Intune Management Extension' service, right-click and select 'Restart'.", es: "Abra 'services.msc' como administrador, busque el servicio 'Microsoft Intune Management Extension', haga clic derecho y seleccione 'Reiniciar'." },
    commandsCheatSheet: [
      { cmd: "net stop IntuneManagementExtension && net start IntuneManagementExtension", desc: { pt: "Reinicia o agente do Intune pelo CMD.", en: "Restarts the Intune agent via CMD.", es: "Reinicia el agente de Intune a través de CMD." } },
    ]
  },
  "HD-1026": {
    title: {"pt": "Docking Station USB-C: Monitores Sem Sinal", "en": "USB-C Docking Station: Monitors Show No Signal", "es": "Docking Station USB-C: Monitores Sin Señal"},
    category: {"pt": "Hardware / Periféricos", "en": "Hardware / Peripherals", "es": "Hardware / Periféricos"},
    level: "N1",
    whatIsHappening: { pt: "O handshake do driver de vídeo Thunderbolt/DisplayLink travou após o notebook entrar em suspensão (Sleep Mode).", en: "The Thunderbolt/DisplayLink video driver handshake stuck after the notebook went to sleep (Sleep Mode).", es: "El protocolo de enlace del controlador de video Thunderbolt/DisplayLink se bloqueó después de que la computadora portátil entró en modo de suspensión (modo de suspensión)." },
    investigationSteps: {
      pt: ["Verifique se o notebook está recebendo carga de bateria pela Dock.", "Oriente o atalho de reset do driver gráfico do Windows."],
      en: ["Check if the notebook is receiving battery charge through the Dock.", "Guide the Windows graphics driver reset shortcut."],
      es: ["Verifique si la computadora portátil recibe carga de batería a través del Dock.", "Guíe el acceso directo para restablecer el controlador de gráficos de Windows."]
    },
    goldenQuestion: { pt: "O notebook está carregando a bateria pela Dock Station e o mouse USB funciona?", en: "Is the notebook charging the battery via the Dock Station and does the USB mouse work?", es: "¿La computadora portátil está cargando la batería a través de la estación de acoplamiento y funciona el mouse USB?" },
    howToSolve: { pt: "Pressionar as teclas 'Win + Ctrl + Shift + B' no teclado para reiniciar o driver de vídeo ou desligar o cabo de energia da Dock por 10 segundos.", en: "Press the 'Win + Ctrl + Shift + B' keys on the keyboard to restart the video driver or unplug the Dock's power cable for 10 seconds.", es: "Presione las teclas 'Win + Ctrl + Shift + B' en el teclado para reiniciar el controlador de video o desconecte el cable de alimentación del Dock durante 10 segundos." },
    commandsCheatSheet: [
      { cmd: "Win + Ctrl + Shift + B", desc: { pt: "Atalho nativo do Windows que reseta o subsistema de vídeo sem fechar programas.", en: "Native Windows shortcut that resets the video subsystem without closing programs.", es: "Acceso directo nativo de Windows que restablece el subsistema de vídeo sin cerrar programas." } },
    ]
  },
  "HD-1027": {
    title: {"pt": "Bateria \"Conectada, mas sem carregar\" (CPU Throttling)", "en": "Battery \"Plugged In, Not Charging\" (CPU Throttling)", "es": "Batería \"Conectada y sin cargarse\" (CPU Throttling)"},
    category: {"pt": "Hardware", "en": "Hardware", "es": "Hardware"},
    level: "N2",
    whatIsHappening: { pt: "O driver ACPI de gerenciamento de energia travou no Windows, limitando a frequência do processador para 0.79 GHz por proteção.", en: "The ACPI power management driver crashed in Windows, limiting the processor frequency to 0.79 GHz for protection.", es: "El controlador de administración de energía ACPI falló en Windows, lo que limitó la frecuencia del procesador a 0,79 GHz como protección." },
    investigationSteps: {
      pt: ["Pergunte se o carregador utilizado é o original da marca do notebook.", "Oriente a desinstalar o driver de bateria no Gerenciador de Dispositivos."],
      en: ["Ask if the charger used is the original one from the notebook brand.", "Guide to uninstall the battery driver in Device Manager."],
      es: ["Preguntar si el cargador utilizado es el original de la marca del portátil.", "Guía para desinstalar el controlador de la batería en el Administrador de dispositivos."]
    },
    goldenQuestion: { pt: "Você está usando o carregador original e a bateria fica parada em 0% sem subir?", en: "Are you using the original charger and the battery stays at 0% without going up?", es: "¿Estás usando el cargador original y la batería se queda al 0% sin subir?" },
    howToSolve: { pt: "Abrir 'devmgmt.msc' > Baterias > desinstalar 'Bateria de Método de Controle Compatível com ACPI da Microsoft' e reiniciar o notebook.", en: "Open 'devmgmt.msc' > Batteries > uninstall 'Microsoft ACPI Compliant Control Method Battery' and restart the notebook.", es: "Abra 'devmgmt.msc' > Baterías > desinstale 'Batería del método de control compatible con ACPI de Microsoft' y reinicie la computadora portátil." },
    commandsCheatSheet: [
      { cmd: "devmgmt.msc", desc: { pt: "Abre o Gerenciador de Dispositivos para reinstalar drivers de sistema.", en: "Open Device Manager to reinstall system drivers.", es: "Abra el Administrador de dispositivos para reinstalar los controladores del sistema." } },
      { cmd: "powercfg /batteryreport", desc: { pt: "Gera um relatório HTML com a saúde e capacidade real da bateria.", en: "Generates an HTML report with actual battery health and capacity.", es: "Genera un informe HTML con el estado y la capacidad reales de la batería." } },
    ]
  },
  "HD-1028": {
    title: {"pt": "Perda de Confiança com o Domínio (Trust Relationship Failed)", "en": "Domain Trust Relationship Failed (Workstation Disconnected)", "es": "Fallo de Confianza con el Dominio (Trust Relationship Failed)"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "DESAFIO",
    whatIsHappening: { pt: "A máquina ficou desligada por mais de 30-60 dias e a senha da conta de computador (Computer Account Password) expirou no controlador de domínio.", en: "The machine has been offline for more than 30-60 days and the Computer Account Password has expired on the domain controller.", es: "La máquina ha estado desconectada durante más de 30 a 60 días y la contraseña de la cuenta de la computadora ha caducado en el controlador de dominio." },
    investigationSteps: {
      pt: ["Pergunte há quanto tempo o equipamento estava sem ligar ou fora da rede corporativa.", "Use as credenciais de Administrador local para reparar a relação de confiança."],
      en: ["Ask how long the equipment had been unplugged or off the corporate network.", "Use the local Administrator credentials to repair the trust."],
      es: ["Pregunte cuánto tiempo estuvo el equipo desconectado o fuera de la red corporativa.", "Utilice las credenciales de administrador local para reparar la confianza."]
    },
    goldenQuestion: { pt: "O computador ficou quanto tempo desligado antes de apresentar esse erro de relação de confiança?", en: "How long was the computer turned off before showing this trust error?", es: "¿Cuánto tiempo estuvo apagada la computadora antes de mostrar este error de confianza?" },
    howToSolve: { pt: "Fazer logon na máquina com a conta de Administrador local (.\\Administrator), abrir o PowerShell como Admin e rodar: 'Test-ComputerSecureChannel -Repair -Credential (Get-Credential)'.", en: "Log on to the machine with the local Administrator account (.\\Administrator), open PowerShell as Admin and run: 'Test-ComputerSecureChannel -Repair -Credential (Get-Credential)'.", es: "Inicie sesión en la máquina con la cuenta de administrador local (.\\Administrator), abra PowerShell como administrador y ejecute: 'Test-ComputerSecureChannel -Repair -Credential (Get-Credential)'." },
    commandsCheatSheet: [
      { cmd: "Test-ComputerSecureChannel -Repair", desc: { pt: "Restaura o canal seguro da máquina com o domínio sem precisar reiniciar.", en: "Restores the machine's secure channel to the domain without having to restart.", es: "Restaura el canal seguro de la máquina al dominio sin tener que reiniciar." } },
      { cmd: "nltest /sc_query:dominio.com", desc: { pt: "Verifica o status da conexão do canal seguro com o DC.", en: "Checks the connection status of the secure channel to the DC.", es: "Comprueba el estado de conexión del canal seguro al DC." } },
    ]
  },
  "HD-1029": {
    title: {"pt": "Aplicação Local / Web Não Inicia (Porta 80/443 Ocupada)", "en": "Local/Web Application Fails to Start (Port 80/443 Conflict)", "es": "Aplicación Local/Web no inicia (Conflicto en Puerto 80/443)"},
    category: {"pt": "Rede / Sistemas", "en": "Networking / Systems", "es": "Redes / Sistemas"},
    level: "N2",
    whatIsHappening: { pt: "Um serviço em segundo plano (como IIS ou Skype) está ouvindo na porta TCP 80, impedindo a nova aplicação de iniciar.", en: "A background service (such as IIS or Skype) is listening on TCP port 80, preventing the new application from starting.", es: "Un servicio en segundo plano (como IIS o Skype) está escuchando en el puerto TCP 80, lo que impide que se inicie la nueva aplicación." },
    investigationSteps: {
      pt: ["Peça para o usuário rodar netstat no Prompt de Comando para identificar qual PID está segurando a porta.", "Finalize o processo bloqueador."],
      en: ["Ask the user to run netstat in the Command Prompt to identify which PID is holding the port.", "End the blocking process."],
      es: ["Solicite al usuario que ejecute netstat en el símbolo del sistema para identificar qué PID contiene el puerto.", "Finalice el proceso de bloqueo."]
    },
    goldenQuestion: { pt: "Abra o CMD como Administrador e digite 'netstat -ano | findstr :80'. Qual número de PID aparece na última coluna?", en: "Open CMD as Administrator and type 'netstat -ano | findstr :80'. What PID number appears in the last column?", es: "Abra CMD como administrador y escriba 'netstat -ano | encontrarcadena: 80'. ¿Qué número PID aparece en la última columna?" },
    howToSolve: { pt: "Identificar o PID da porta 80 via 'netstat -ano | findstr :80' e finalizar o processo com 'taskkill /PID <PID> /F' ou desativar o serviço IIS no 'services.msc'.", en: "Identify the PID of port 80 via 'netstat -ano | findstr :80' and end the process with 'taskkill /PID <PID> /F' or disable the IIS service in 'services.msc'.", es: "Identifique el PID del puerto 80 mediante 'netstat -ano | findstr :80' y finalice el proceso con 'taskkill /PID <PID> /F' o deshabilite el servicio IIS en 'services.msc'." },
    commandsCheatSheet: [
      { cmd: "netstat -ano | findstr :80", desc: { pt: "Lista o PID do processo que está ocupando a porta 80.", en: "Lists the PID of the process occupying port 80.", es: "Muestra el PID del proceso que ocupa el puerto 80." } },
      { cmd: "taskkill /PID <PID> /F", desc: { pt: "Encerra o processo travado pelo seu identificador (PID).", en: "Terminates the process blocked by its identifier (PID).", es: "Finaliza el proceso bloqueado por su identificador (PID)." } },
    ]
  },
  "HD-1030": {
    title: {"pt": "Arquivo Bloqueado para Edição por Outro Usuário (SMB Lock)", "en": "File Locked for Editing by Another User (SMB Session Lock)", "es": "Archivo Bloqueado para Edición por Otro Usuario (Bloqueo SMB)"},
    category: {"pt": "Servidor de Arquivos / Rede", "en": "File Server / Network", "es": "Servidor de Archivos / Red"},
    level: "N2",
    whatIsHappening: { pt: "A conexão do protocolo SMB manteve a trava de arquivo aberta no servidor de arquivos mesmo após o colega ter desconectado.", en: "The SMB protocol connection kept the file lock open on the file server even after the colleague disconnected.", es: "La conexión del protocolo SMB mantuvo abierto el bloqueo de archivos en el servidor de archivos incluso después de que el colega se desconectara." },
    investigationSteps: {
      pt: ["Descubra qual o caminho de rede do arquivo compartilhado (\\\\servidor\\pasta\\arquivo.xlsx).", "Acesse o Gerenciamento do Computador do servidor para liberar a trava."],
      en: ["Find out the network path of the shared file (\\\\server\\folder\\file.xlsx).", "Access the server's Computer Management to release the lock."],
      es: ["Descubra la ruta de red del archivo compartido (\\\\servidor\\carpeta\\archivo.xlsx).", "Accede a la Gestión Informática del servidor para liberar el bloqueo."]
    },
    goldenQuestion: { pt: "Qual é o caminho da pasta de rede e o nome exato do arquivo que está bloqueado para edição?", en: "What is the network folder path and exact name of the file that is locked for editing?", es: "¿Cuál es la ruta de la carpeta de red y el nombre exacto del archivo que está bloqueado para editarse?" },
    howToSolve: { pt: "No servidor de arquivos, abrir 'compmgmt.msc' > Pastas Compartilhadas > Arquivos Abertos > localizar o arquivo na lista, clicar com botão direito e selecionar 'Fechar Arquivo Aberto'.", en: "On the file server, open 'compmgmt.msc' > Shared Folders > Open Files > locate the file in the list, right-click and select 'Close Open File'.", es: "En el servidor de archivos, abra 'compmgmt.msc' > Carpetas compartidas > Abrir archivos > busque el archivo en la lista, haga clic derecho y seleccione 'Cerrar archivo abierto'." },
    commandsCheatSheet: [
      { cmd: "compmgmt.msc", desc: { pt: "Abre o Gerenciamento do Computador no servidor de arquivos.", en: "Open Computer Management on the file server.", es: "Abra Administración de computadoras en el servidor de archivos." } },
      { cmd: "openfiles /query", desc: { pt: "Lista todos os arquivos compartilhados abertos via prompt de comando.", en: "Lists all shared files opened via command prompt.", es: "Enumera todos los archivos compartidos abiertos mediante el símbolo del sistema." } },
    ]
  },
  "HD-1031": {
    title: {"pt": "Notebook Não Liga Fora da Tomada (Hard Reset / Carga Residual)", "en": "Laptop Does Not Power On Unplugged (Hard Reset / Residual Charge)", "es": "Laptop no enciende desconectada (Hard Reset / Carga Residual)"},
    category: {"pt": "Hardware / Alimentação", "en": "Hardware / Power", "es": "Hardware / Alimentación"},
    level: "N1",
    whatIsHappening: { pt: "Capacitores da placa-mãe acumularam carga estática residual, travando o circuito de alimentação e impedindo a bateria de alimentar o sistema.", en: "Capacitors on the motherboard have accumulated residual static charge, blocking the power circuit and preventing the battery from powering the system.", es: "Los condensadores de la placa base han acumulado carga estática residual, bloqueando el circuito de alimentación e impidiendo que la batería alimente el sistema." },
    investigationSteps: {
      pt: ["Pergunte se algum LED de energia acende ao pressionar o botão Power.", "Verifique se o cooler dá algum sinal de partida."],
      en: ["Ask if any power LEDs light up when you press the Power button.", "Check if the cooler gives any sign of starting."],
      es: ["Pregunte si algún LED de encendido se enciende cuando presiona el botón de Encendido.", "Compruebe si el enfriador da alguna señal de arrancar."]
    },
    goldenQuestion: { pt: "Ao apertar o botão de ligar na bateria, acende alguma luzinha na lateral ou o notebook parece completamente morto?", en: "When you press the power button on the battery, does a little light on the side come on or does the notebook seem completely dead?", es: "Cuando presionas el botón de encendido de la batería, ¿se enciende una pequeña luz en el costado o parece que la computadora portátil está completamente muerta?" },
    howToSolve: { pt: "Executar a drenagem de energia residual (Hard Reset / Power Drain): desconectar periféricos e carregador, segurar o botão Power pressionado por 30 a 60 segundos contínuos para descarregar os capacitores e ligar novamente.", en: "Perform residual energy drain (Hard Reset / Power Drain): disconnect peripherals and charger, hold down the Power button for 30 to 60 continuous seconds to discharge the capacitors and turn on again.", es: "Realice un drenaje de energía residual (Hard Reset / Power Drain): desconecte los periféricos y el cargador, mantenga presionado el botón de Encendido durante 30 a 60 segundos continuos para descargar los capacitores y vuelva a encender." },
    commandsCheatSheet: [
      { cmd: "Hard Reset (30s Power)", desc: { pt: "Pressionar o botão Power por 30 segundos contínuos descarrega a estática da placa-mãe.", en: "Pressing the Power button for 30 continuous seconds discharges static from the motherboard.", es: "Al presionar el botón de Encendido durante 30 segundos continuos se descarga estática de la placa base." } },
    ]
  },
  "HD-1032": {
    title: {"pt": "Loop de Boot e Modo de Segurança (WinRE / Tecla Shift)", "en": "Boot Loop & Safe Mode Access (WinRE / Shift Key)", "es": "Bucle de Arranque y Modo Seguro (WinRE / Tecla Shift)"},
    category: {"pt": "Hardware / Windows", "en": "Hardware / Windows", "es": "Hardware / Windows"},
    level: "N1",
    whatIsHappening: { pt: "Após falha de driver ou atualização corrompida, o Windows entra em loop de reinício. Em sistemas modernos (Windows 10/11 UEFI), a tecla F8 foi desativada para acelerar o boot, sendo necessário acionar o WinRE via atalhos especiais.", en: "After driver failure or corrupted update, Windows goes into restart loop. On modern systems (Windows 10/11 UEFI), the F8 key has been disabled to speed up booting, making it necessary to activate WinRE via special shortcuts.", es: "Después de una falla del controlador o una actualización dañada, Windows entra en un ciclo de reinicio. En los sistemas modernos (Windows 10/11 UEFI), la tecla F8 se ha desactivado para acelerar el arranque, por lo que es necesario activar WinRE mediante atajos especiales." },
    investigationSteps: {
      pt: ["Pergunte se o usuário consegue ver a tela de login com o botão de energia no canto inferior direito.", "Se sim, instrua a segurar a tecla SHIFT enquanto clica em 'Reiniciar'."],
      en: ["Ask if the user can see the login screen with the power button in the lower right corner.", "If yes, instruct to hold SHIFT key while clicking 'Restart'."],
      es: ["Pregunte si el usuario puede ver la pantalla de inicio de sesión con el botón de encendido en la esquina inferior derecha.", "En caso afirmativo, indique que mantenga presionada la tecla MAYÚS mientras hace clic en \"Reiniciar\"."]
    },
    goldenQuestion: { pt: "Na tela onde pede senha, você consegue ver o botãozinho de desligar no canto da tela?", en: "On the screen where it asks for a password, can you see the little off button in the corner of the screen?", es: "En la pantalla donde te pide una contraseña, ¿puedes ver el pequeño botón de apagado en la esquina de la pantalla?" },
    howToSolve: { pt: "Instruir o usuário a segurar a tecla SHIFT no teclado e clicar em 'Reiniciar' (ou desligar o botão Power 3 vezes no boot para acionar o Reparo Automático). Na tela azul do WinRE, navegar em: Solução de Problemas > Opções Avançadas > Configurações de Inicialização > Reiniciar > Pressionar a tecla 4 ou F4 (Habilitar Modo de Segurança).", en: "Instruct the user to hold the SHIFT key on the keyboard and click 'Restart' (or turn off the Power button 3 times at boot to trigger Automatic Repair). On the WinRE blue screen, navigate to: Troubleshooting > Advanced Options > Startup Settings > Restart > Press the 4 or F4 key (Enable Safe Mode).", es: "Indique al usuario que mantenga presionada la tecla MAYÚS en el teclado y haga clic en \"Reiniciar\" (o apague el botón de Encendido 3 veces en el arranque para activar la Reparación automática). En la pantalla azul de WinRE, navegue hasta: Solución de problemas > Opciones avanzadas > Configuración de inicio > Reiniciar > Presione la tecla 4 o F4 (Habilitar modo seguro)." },
    commandsCheatSheet: [
      { cmd: "Shift + Clique em Reiniciar", desc: { pt: "Atalho universal do Windows para abrir o menu azul de Opções Avançadas (WinRE).", en: "Universal Windows shortcut to open the blue Advanced Options (WinRE) menu.", es: "Acceso directo universal de Windows para abrir el menú azul de Opciones avanzadas (WinRE)." } },
      { cmd: "shutdown /r /o /t 0", desc: { pt: "Comando CMD para reiniciar a máquina diretamente nas Opções Avançadas do WinRE.", en: "CMD command to restart the machine directly in WinRE Advanced Options.", es: "Comando CMD para reiniciar la máquina directamente en Opciones avanzadas de WinRE." } },
      { cmd: "F4 ou F5 (no WinRE)", desc: { pt: "Opção 4: Modo de Segurança básico. Opção 5: Modo de Segurança com Rede.", en: "Option 4: Basic Safe Mode. Option 5: Safe Mode with Networking.", es: "Opción 4: Modo seguro básico. Opción 5: Modo seguro con funciones de red." } },
    ]
  },
  "HD-1033": {
    title: {"pt": "VLAN Incorreta após Mudança de Mesa (Cisco / Switch)", "en": "Incorrect VLAN Assignment After Desk Relocation (Switch Port)", "es": "VLAN Incorrecta tras Cambio de Escritorio (Puerto de Switch)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N2",
    whatIsHappening: { pt: "A porta do switch conectada à tomada da parede está configurada em uma VLAN diferente da necessária para o setor (ex: VLAN Visitantes em vez de VLAN Financeiro).", en: "The switch port connected to the wall jack is configured on a different VLAN than is required for the industry (e.g. Guest VLAN instead of Financial VLAN).", es: "El puerto del conmutador conectado al conector de pared está configurado en una VLAN diferente a la requerida por la industria (por ejemplo, VLAN invitada en lugar de VLAN financiera)." },
    investigationSteps: {
      pt: ["Peça a identificação física da tomada na parede (etiqueta do patch panel).", "Peça o resultado do 'ipconfig' para verificar a sub-rede obtida."],
      en: ["Ask for physical identification of the wall outlet (patch panel label).", "Ask for the result of 'ipconfig' to verify the subnet you got."],
      es: ["Solicite la identificación física del tomacorriente de pared (etiqueta del panel de conexión).", "Solicite el resultado de 'ipconfig' para verificar la subred que obtuvo."]
    },
    goldenQuestion: { pt: "Qual é a etiqueta impressa na tomada de rede da parede onde você plugou o cabo (ex: PONTO-A12)?", en: "What is the label printed on the wall socket where you plugged the cable (ex: PONTO-A12)?", es: "¿Cuál es la etiqueta impresa en el enchufe de pared donde conectó el cable (ej: PONTO-A12)?" },
    howToSolve: { pt: "Verificar a sub-rede via 'ipconfig', solicitar a identificação da etiqueta do ponto de rede na parede e acionar a equipe de infraestrutura para alterar a VLAN da porta do switch correspondente.", en: "Check the subnet via 'ipconfig', request identification of the network point label on the wall and contact the infrastructure team to change the VLAN of the corresponding switch port.", es: "Verifique la subred a través de 'ipconfig', solicite la identificación de la etiqueta del punto de red en la pared y comuníquese con el equipo de infraestructura para cambiar la VLAN del puerto del switch correspondiente." },
    commandsCheatSheet: [
      { cmd: "ipconfig", desc: { pt: "Verifica a sub-rede e gateway atuais obtidos via DHCP.", en: "Checks the current subnet and gateway obtained via DHCP.", es: "Comprueba la subred y la puerta de enlace actuales obtenidas a través de DHCP." } },
      { cmd: "show vlan brief", desc: { pt: "Comando Cisco IOS para verificar atribuição de VLANs nas portas do switch.", en: "Cisco IOS command to check VLAN assignment on switch ports.", es: "Comando de Cisco IOS para verificar la asignación de VLAN en los puertos del switch." } },
    ]
  },
  "HD-1034": {
    title: {"pt": "Erro de Proxy em Home Office (ERR_PROXY_CONNECTION_FAILED)", "en": "Proxy Error in Home Office (ERR_PROXY_CONNECTION_FAILED)", "es": "Error de Proxy en Home Office (ERR_PROXY_CONNECTION_FAILED)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N1",
    whatIsHappening: { pt: "O navegador manteve as configurações manuais do servidor Proxy do escritório corporativo, que é inacessível na rede residencial comum.", en: "The browser retained the manual settings of the corporate office Proxy server, which is inaccessible on the common home network.", es: "El navegador conservó la configuración manual del servidor proxy de la oficina corporativa, al que no se puede acceder en la red doméstica común." },
    investigationSteps: {
      pt: ["Pergunte se o erro ocorre em todos os navegadores (Chrome/Edge).", "Oriente o usuário a abrir as Propriedades de Internet (inetcpl.cpl)."],
      en: ["Ask if the error occurs in all browsers (Chrome/Edge).", "Instruct the user to open Internet Properties (inetcpl.cpl)."],
      es: ["Pregunte si el error ocurre en todos los navegadores (Chrome/Edge).", "Indique al usuario que abra Propiedades de Internet (inetcpl.cpl)."]
    },
    goldenQuestion: { pt: "No Chrome, aparece a mensagem 'Não foi possível conectar ao servidor proxy (ERR_PROXY_CONNECTION_FAILED)'?", en: "In Chrome, the message 'Unable to connect to proxy server (ERR_PROXY_CONNECTION_FAILED)' appears?", es: "En Chrome, aparece el mensaje \"No se puede conectar al servidor proxy (ERR_PROXY_CONNECTION_FAILED)\"." },
    howToSolve: { pt: "Abrir 'inetcpl.cpl' > aba 'Conexões' > clicar no botão 'Configurações da LAN' > desmarcar 'Usar um servidor proxy para a rede local' e marcar 'Detectar automaticamente as configurações'.", en: "Open 'inetcpl.cpl' > 'Connections' tab > click 'LAN Settings' button > uncheck 'Use a proxy server for the local network' and check 'Automatically detect settings'.", es: "Abra 'inetcpl.cpl' > pestaña 'Conexiones' > haga clic en el botón 'Configuración de LAN' > desmarque 'Usar un servidor proxy para la red local' y marque 'Detectar configuración automáticamente'." },
    commandsCheatSheet: [
      { cmd: "inetcpl.cpl", desc: { pt: "Abre diretamente as Propriedades de Internet do Windows.", en: "Directly opens Windows Internet Properties.", es: "Abre directamente Propiedades de Internet de Windows." } },
      { cmd: "ms-settings:network-proxy", desc: { pt: "Abre a página moderna de configurações de Proxy do Windows 10/11.", en: "Opens the modern Windows 10/11 Proxy settings page.", es: "Abre la página de configuración moderna del proxy de Windows 10/11." } },
    ]
  },
  "HD-1035": {
    title: {"pt": "Cabo de Rede Danificado (Negociação 10 Mbps Half-Duplex)", "en": "Damaged Network Cable (10 Mbps Half-Duplex Auto-Negotiation)", "es": "Cable de Red Dañado (Negociación a 10 Mbps Half-Duplex)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N1",
    whatIsHappening: { pt: "Um pino quebrado ou cabo Cat5e esmagado impede a negociação Gigabit (1000 Mbps), forçando a placa de rede a operar em 10 Mbps Half-Duplex com alta perda de pacotes.", en: "A broken pin or crushed Cat5e cable prevents Gigabit (1000 Mbps) negotiation, forcing the network card to operate at 10 Mbps Half-Duplex with high packet loss.", es: "Una clavija rota o un cable Cat5e aplastado impiden la negociación Gigabit (1000 Mbps), lo que obliga a la tarjeta de red a funcionar a 10 Mbps Half-Duplex con una alta pérdida de paquetes." },
    investigationSteps: {
      pt: ["Peça para o usuário checar o Status de Velocidade no adaptador Ethernet (ncpa.cpl).", "Oriente a substituição do cabo de rede (patch cord)."],
      en: ["Ask the user to check the Speed ​​Status on the Ethernet adapter (ncpa.cpl).", "Guide the replacement of the network cable (patch cord)."],
      es: ["Solicite al usuario que verifique el estado de velocidad en el adaptador Ethernet (ncpa.cpl).", "Guíe el reemplazo del cable de red (latiguillo)."]
    },
    goldenQuestion: { pt: "Abra o 'ncpa.cpl', dê dois cliques na placa 'Ethernet' e me diga qual valor aparece em 'Velocidade'?", en: "Open 'ncpa.cpl', double-click on the 'Ethernet' card and tell me what value appears in 'Speed'?", es: "Abra 'ncpa.cpl', haga doble clic en la tarjeta 'Ethernet' y dígame qué valor aparece en 'Velocidad'." },
    howToSolve: { pt: "Inspecionar a velocidade do link no adaptador (Velocidade: 10.0 Mbps indica falha física) e substituir o cabo de rede RJ45 danificado por um cabo novo Cat5e/Cat6 Gigabit.", en: "Inspect the link speed on the adapter (Speed: 10.0 Mbps indicates physical failure) and replace the damaged RJ45 network cable with a new Cat5e/Cat6 Gigabit cable.", es: "Inspeccione la velocidad del enlace en el adaptador (Velocidad: 10,0 Mbps indica una falla física) y reemplace el cable de red RJ45 dañado con un nuevo cable Gigabit Cat5e/Cat6." },
    commandsCheatSheet: [
      { cmd: "ncpa.cpl", desc: { pt: "Abre a lista de Adaptadores de Rede para ver o status de velocidade do link.", en: "Opens the Network Adapters list to see the link speed status.", es: "Abre la lista de Adaptadores de red para ver el estado de la velocidad del enlace." } },
    ]
  },
  "HD-1036": {
    title: {"pt": "Instabilidade com Filial (Diagnóstico Tracert / Latência)", "en": "Branch Office Latency / Instability (Tracert & MTU Diagnosis)", "es": "Inestabilidad con Sucursal (Diagnóstico Tracert / Latencia)"},
    category: {"pt": "Rede & Conectividade", "en": "Networking & Connectivity", "es": "Redes y Conectividad"},
    level: "N2",
    whatIsHappening: { pt: "Um roteador intermediário da operadora de telecomunicações está descartando pacotes e elevando a latência de 20ms para mais de 800ms.", en: "An intermediate router at the telecommunications operator is dropping packets and increasing latency from 20ms to more than 800ms.", es: "Un enrutador intermedio del operador de telecomunicaciones está descartando paquetes y aumentando la latencia de 20 ms a más de 800 ms." },
    investigationSteps: {
      pt: ["Solicite a execução de um rastreamento de rota (tracert) para o IP do servidor remoto.", "Identifique o salto (hop) exato onde o tempo de resposta explode."],
      en: ["Request a tracert to be performed on the remote server IP.", "Identify the exact hop where response time explodes."],
      es: ["Solicite que se realice un tracert en la IP del servidor remoto.", "Identifique el salto exacto donde se dispara el tiempo de respuesta."]
    },
    goldenQuestion: { pt: "Abra o CMD e digite 'tracert <IP_Servidor>'. Em qual número de linha o tempo de milissegundos começa a subir muito?", en: "Open CMD and type 'tracert <Server_IP>'. At what line number does the millisecond time start to go up a lot?", es: "Abra CMD y escriba 'tracert <Server_IP>'. ¿A partir de qué número de línea el tiempo de milisegundos empieza a aumentar mucho?" },
    howToSolve: { pt: "Executar 'tracert <IP>' ou 'pathping' no Prompt de Comando, salvar o relatório com o IP do salto defeituoso e abrir chamado de degradação de link junto à operadora/telecom.", en: "Run 'tracert <IP>' or 'pathping' in the Command Prompt, save the report with the IP of the faulty hop and open a link degradation ticket with the operator/telecom.", es: "Ejecute 'tracert <IP>' o 'pathping' en el símbolo del sistema, guarde el informe con la IP del salto defectuoso y abra un ticket de degradación del enlace con el operador/telecomunicaciones." },
    commandsCheatSheet: [
      { cmd: "tracert 10.50.1.10", desc: { pt: "Mapeia os saltos de roteadores até o destino e exibe a latência em cada um.", en: "Maps the router hops to the destination and displays the latency at each.", es: "Asigna los saltos del enrutador al destino y muestra la latencia en cada uno." } },
      { cmd: "pathping 10.50.1.10", desc: { pt: "Combina ping e tracert para calcular porcentagem exata de perda em cada salto.", en: "Combines ping and tracert to calculate exact loss percentage for each hop.", es: "Combina ping y tracert para calcular el porcentaje de pérdida exacto para cada salto." } },
    ]
  },
  "HD-1037": {
    title: {"pt": "VPN: Adaptador Virtual Desativado (AnyConnect / FortiClient)", "en": "VPN: Virtual Network Adapter Disabled (AnyConnect / FortiClient)", "es": "VPN: Adaptador de Red Virtual Desactivado (FortiClient / Cisco)"},
    category: {"pt": "VPN / Rede", "en": "VPN / Networking", "es": "VPN / Redes"},
    level: "N1",
    whatIsHappening: { pt: "A placa de rede virtual criada pelo software da VPN (TAP Virtual Adapter) foi desativada manualmente ou após uma atualização do Windows.", en: "The virtual network card created by the VPN software (TAP Virtual Adapter) was disabled manually or after a Windows update.", es: "La tarjeta de red virtual creada por el software VPN (TAP Virtual Adapter) se deshabilitó manualmente o después de una actualización de Windows." },
    investigationSteps: {
      pt: ["Pergunte qual é a mensagem de erro exata após digitar as credenciais na VPN.", "Peça para o usuário verificar se a interface virtual da VPN está desativada no ncpa.cpl."],
      en: ["Ask what the exact error message is after entering credentials into the VPN.", "Ask the user to verify that the VPN virtual interface is disabled in ncpa.cpl."],
      es: ["Pregunte cuál es el mensaje de error exacto después de ingresar las credenciales en la VPN.", "Solicite al usuario que verifique que la interfaz virtual VPN esté deshabilitada en ncpa.cpl."]
    },
    goldenQuestion: { pt: "Ao conectar na VPN, aparece a mensagem 'Virtual Adapter failure / Tunnel initialization failed'?", en: "When connecting to the VPN, the message 'Virtual Adapter failure / Tunnel initialization failed' appears?", es: "Al conectarse a la VPN, aparece el mensaje \"Error del adaptador virtual/Error en la inicialización del túnel\"." },
    howToSolve: { pt: "Abrir 'ncpa.cpl', localizar o adaptador virtual da VPN (ex: 'Cisco AnyConnect Secure Mobility Client' ou 'Fortinet Virtual Adapter'), clicar com botão direito e selecionar 'Ativar' (ou reiniciar o serviço da VPN no services.msc).", en: "Open 'ncpa.cpl', locate the VPN virtual adapter (e.g. 'Cisco AnyConnect Secure Mobility Client' or 'Fortinet Virtual Adapter'), right-click and select 'Activate' (or restart the VPN service in services.msc).", es: "Abra 'ncpa.cpl', ubique el adaptador virtual VPN (por ejemplo, 'Cisco AnyConnect Secure Mobility Client' o 'Fortinet Virtual Adapter'), haga clic derecho y seleccione 'Activar' (o reinicie el servicio VPN en services.msc)." },
    commandsCheatSheet: [
      { cmd: "ncpa.cpl", desc: { pt: "Abre o Painel de Conexões de Rede para reativar placas virtuais.", en: "Open the Network Connections Panel to reactivate virtual cards.", es: "Abra el Panel de conexiones de red para reactivar tarjetas virtuales." } },
      { cmd: "services.msc", desc: { pt: "Abre a lista de serviços para reiniciar o serviço em segundo plano da VPN.", en: "Opens the list of services to restart the VPN background service.", es: "Abre la lista de servicios para reiniciar el servicio VPN en segundo plano." } },
    ]
  },
  "HD-1038": {
    title: {"pt": "Conta Bloqueada no Active Directory (Unlock Account)", "en": "Account Locked Out in Active Directory (Unlock Account)", "es": "Cuenta Bloqueada en Active Directory (Unlock Account)"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "N1",
    whatIsHappening: { pt: "A conta do usuário foi bloqueada automaticamente pelo controlador de domínio após exceder o limite de tentativas de senha incorreta (Account Lockout Policy).", en: "The user account was automatically locked by the domain controller after exceeding the incorrect password attempt limit (Account Lockout Policy).", es: "El controlador de dominio bloqueó automáticamente la cuenta de usuario después de exceder el límite de intentos de contraseña incorrectos (Política de bloqueo de cuenta)." },
    investigationSteps: {
      pt: ["Valide a identidade do colaborador (Nome completo, CPF/matrícula).", "Abra o console ADUC (dsa.msc) e localize a conta."],
      en: ["Validate the employee's identity (Full name, CPF/registration number).", "Open the ADUC console (dsa.msc) and locate the account."],
      es: ["Validar la identidad del empleado (Nombre completo, CPF/número de registro).", "Abra la consola ADUC (dsa.msc) y localice la cuenta."]
    },
    goldenQuestion: { pt: "Por gentileza, pode me confirmar seu nome completo, login de rede e matrícula para validarmos a identidade?", en: "Could you please confirm your full name, network login and registration number so we can validate your identity?", es: "¿Podría confirmar su nombre completo, inicio de sesión de red y número de registro para que podamos validar su identidad?" },
    howToSolve: { pt: "Abrir o console ADUC (dsa.msc), clicar com botão direito no usuário > 'Properties' > aba 'Account' > marcar a caixa 'Unlock account' e clicar em 'Apply' e 'OK'.", en: "Open the ADUC console (dsa.msc), right-click on the user > 'Properties' > 'Account' tab > check the 'Unlock account' box and click 'Apply' and 'OK'.", es: "Abra la consola ADUC (dsa.msc), haga clic derecho en el usuario > 'Propiedades' > pestaña 'Cuenta' > marque la casilla 'Desbloquear cuenta' y haga clic en 'Aplicar' y 'Aceptar'." },
    commandsCheatSheet: [
      { cmd: "dsa.msc", desc: { pt: "Abre o console Active Directory Users and Computers.", en: "Opens the Active Directory Users and Computers console.", es: "Abre la consola Usuarios y equipos de Active Directory." } },
      { cmd: "Unlock-ADAccount -Identity <usuario>", desc: { pt: "Comando PowerShell para desbloquear conta do Active Directory instantaneamente.", en: "PowerShell command to unlock Active Directory account instantly.", es: "Comando de PowerShell para desbloquear la cuenta de Active Directory al instante." } },
    ]
  },
  "HD-1039": {
    title: {"pt": "Criação de Usuário no Active Directory (Onboarding)", "en": "New User Account Creation in Active Directory (Onboarding)", "es": "Creación de Nuevo Usuario en Active Directory (Onboarding)"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "N1",
    whatIsHappening: { pt: "Novo colaborador contratado precisa de conta de domínio criada na Unidade Organizacional (OU) correta com senha temporária e grupos padrão.", en: "New hired employee needs domain account created in the correct Organizational Unit (OU) with temporary password and default groups.", es: "El nuevo empleado contratado necesita una cuenta de dominio creada en la unidad organizativa (OU) correcta con una contraseña temporal y grupos predeterminados." },
    investigationSteps: {
      pt: ["Confirme os dados recebidos do RH (Nome, Sobrenome, Setor, Cargo, Gestor).", "Identifique a OU correspondente e copie um usuário modelo (Copy Template)."],
      en: ["Confirm the data received from HR (Name, Surname, Sector, Position, Manager).", "Identify the corresponding OU and copy a template user (Copy Template)."],
      es: ["Confirmar los datos recibidos de RRHH (Nombre, Apellidos, Sector, Cargo, Responsable).", "Identifique la unidad organizativa correspondiente y copie un usuario de plantilla (Copiar plantilla)."]
    },
    goldenQuestion: { pt: "Qual é o nome completo, departamento e cargo do novo colaborador que devemos cadastrar?", en: "What is the full name, department and position of the new employee we must register?", es: "¿Cuál es el nombre completo, departamento y puesto del nuevo empleado que debemos registrar?" },
    howToSolve: { pt: "No ADUC (dsa.msc), navegar até a OU do departamento > clicar com botão direito > 'New > User' > preencher Nome, Sobrenome e Logon Name (sAMAccountName) > definir senha temporária > marcar 'User must change password at next logon' > adicionar aos grupos de segurança padrão.", en: "In ADUC (dsa.msc), navigate to the department OU > right click > 'New > User' > fill in First Name, Last Name and Logon Name (sAMAccountName) > set temporary password > check 'User must change password at next logon' > add to default security groups.", es: "En ADUC (dsa.msc), navegue hasta la unidad organizativa del departamento > haga clic derecho > 'Nuevo > Usuario' > complete Nombre, Apellido y Nombre de inicio de sesión (sAMAccountName) > establezca una contraseña temporal > marque 'El usuario debe cambiar la contraseña en el próximo inicio de sesión' > agregue a los grupos de seguridad predeterminados." },
    commandsCheatSheet: [
      { cmd: "New-ADUser", desc: { pt: "Cmdlet do PowerShell para provisionamento automatizado de usuários no AD.", en: "PowerShell cmdlet for automated user provisioning in AD.", es: "Cmdlet de PowerShell para el aprovisionamiento automatizado de usuarios en AD." } },
    ]
  },
  "HD-1040": {
    title: {"pt": "Desativação de Usuário no AD (Offboarding / Desligamento)", "en": "User Account Deprovisioning in AD (Offboarding / Disable)", "es": "Desactivación de Cuenta de Usuario en AD (Offboarding)"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "N1",
    whatIsHappening: { pt: "Colaborador desligado da empresa deve ter a conta desativada e movida para a OU de inativos imediatamente para impedir acesso indevido.", en: "Any employee who has been terminated from the company must have their account deactivated and moved to the inactive OU immediately to prevent unauthorized access.", es: "A cualquier empleado que haya sido despedido de la empresa se le debe desactivar su cuenta y trasladarla a la unidad organizativa inactiva de inmediato para evitar el acceso no autorizado." },
    investigationSteps: {
      pt: ["Confirme a autorização oficial do RH/Gestor com o nome e login exato.", "Localize a conta do usuário no domínio."],
      en: ["Confirm official authorization from HR/Manager with the exact name and login.", "Locate the user account on the domain."],
      es: ["Confirme la autorización oficial de Recursos Humanos/Gerente con el nombre exacto y el inicio de sesión.", "Localice la cuenta de usuario en el dominio."]
    },
    goldenQuestion: { pt: "Qual é o login de rede e o departamento do colaborador que foi desligado da organização?", en: "What is the network login and department of the employee who was terminated from the organization?", es: "¿Cuál es el inicio de sesión de red y el departamento del empleado que fue despedido de la organización?" },
    howToSolve: { pt: "No ADUC (dsa.msc), localizar a conta do usuário > clicar com botão direito > 'Disable Account' (Desativar Conta) > mover a conta para a OU 'Desligados / Inactive_Users' > remover grupos de segurança corporativos.", en: "In ADUC (dsa.msc), locate the user account > right click > 'Disable Account' > move the account to the 'Disabled / Inactive_Users' OU > remove corporate security groups.", es: "En ADUC (dsa.msc), ubique la cuenta de usuario > haga clic con el botón derecho > 'Desactivar cuenta' > mueva la cuenta a la unidad organizativa 'Disabled/Inactive_Users' > elimine los grupos de seguridad corporativos." },
    commandsCheatSheet: [
      { cmd: "Disable-ADAccount -Identity <usuario>", desc: { pt: "Comando PowerShell para desativar imediatamente a conta no Active Directory.", en: "PowerShell command to immediately disable the account in Active Directory.", es: "Comando de PowerShell para deshabilitar inmediatamente la cuenta en Active Directory." } },
    ]
  },
  "HD-1041": {
    title: {"pt": "Atribuição de Grupos de Segurança no AD (Member Of)", "en": "Security Group Membership in Active Directory (Member Of)", "es": "Asignación de Grupos de Seguridad en AD (Member Of)"},
    category: {"pt": "Active Directory", "en": "Active Directory", "es": "Active Directory"},
    level: "N1",
    whatIsHappening: { pt: "Colaborador promovido ou transferido de setor precisa de novas permissões concedidas através de grupos de segurança (Security Groups).", en: "Employee promoted or transferred from sector needs new permissions granted through Security Groups.", es: "El empleado ascendido o transferido del sector necesita nuevos permisos otorgados a través de Grupos de Seguridad." },
    investigationSteps: {
      pt: ["Identifique qual grupo de segurança concede acesso à pasta ou sistema solicitado.", "Verifique na aba 'Member Of' quais grupos o usuário já possui."],
      en: ["Identify which security group grants access to the requested folder or system.", "Check the 'Member Of' tab to see which groups the user already has."],
      es: ["Identifique qué grupo de seguridad otorga acceso a la carpeta o sistema solicitado.", "Consulte la pestaña 'Miembro de' para ver qué grupos ya tiene el usuario."]
    },
    goldenQuestion: { pt: "Qual é o nome da pasta de rede ou sistema e qual grupo de segurança foi aprovado pelo seu gestor?", en: "What is the name of the network or system folder and which security group has been approved by your manager?", es: "¿Cuál es el nombre de la red o carpeta del sistema y qué grupo de seguridad ha sido aprobado por su administrador?" },
    howToSolve: { pt: "No ADUC (dsa.msc), abrir as propriedades do usuário > aba 'Member Of' > clicar em 'Add...' > digitar o nome do grupo de segurança (ex: SEC_FIN_FATURAMENTO) > salvar e instruir o colaborador a fazer logoff/logon para renovar o token Kerberos.", en: "In ADUC (dsa.msc), open the user properties > 'Member Of' tab > click on 'Add...' > enter the name of the security group (ex: SEC_FIN_FATURAMENTO) > save and instruct the employee to log off/login to renew the Kerberos token.", es: "En ADUC (dsa.msc), abra las propiedades del usuario > pestaña 'Miembro de' > haga clic en 'Agregar...' > ingrese el nombre del grupo de seguridad (por ejemplo: SEC_FIN_FATURAMENTO) > guarde e indique al empleado que cierre sesión/inicie sesión para renovar el token Kerberos." },
    commandsCheatSheet: [
      { cmd: "Add-ADGroupMember -Identity 'Grupo' -Members 'Usuario'", desc: { pt: "Adiciona o usuário ao grupo de segurança via PowerShell.", en: "Adds the user to the security group via PowerShell.", es: "Agrega el usuario al grupo de seguridad a través de PowerShell." } },
      { cmd: "whoami /groups", desc: { pt: "Executado no PC do usuário para verificar se o novo grupo foi carregado após o logon.", en: "Run on the user's PC to verify that the new group was loaded after logon.", es: "Ejecútelo en la PC del usuario para verificar que el nuevo grupo se cargó después de iniciar sesión." } },
    ]
  },
  "HD-1042": {
    title: {"pt": "Instalação do RSAT (Active Directory no Windows 10/11)", "en": "RSAT Tools Installation (Active Directory for Windows 10/11)", "es": "Instalación de Herramientas RSAT (Active Directory en Windows)"},
    category: {"pt": "Active Directory / Ferramentas", "en": "Active Directory / Tools", "es": "Active Directory / Herramientas"},
    level: "N1",
    whatIsHappening: { pt: "O analista de suporte N1 precisa gerenciar o Active Directory a partir do seu próprio notebook sem precisar abrir sessão RDP no servidor Domain Controller.", en: "The N1 support analyst needs to manage Active Directory from his own notebook without having to open an RDP session on the Domain Controller server.", es: "El analista de soporte N1 necesita administrar Active Directory desde su propia computadora portátil sin tener que abrir una sesión RDP en el servidor del controlador de dominio." },
    investigationSteps: {
      pt: ["Verifique se o comando 'dsa.msc' não é encontrado no Windows.", "Oriente a instalação das ferramentas RSAT."],
      en: ["Check if the 'dsa.msc' command is not found in Windows.", "Guide the installation of RSAT tools."],
      es: ["Compruebe si el comando 'dsa.msc' no se encuentra en Windows.", "Guiar la instalación de herramientas RSAT."]
    },
    goldenQuestion: { pt: "Ao abrir o Executar (Win+R) e digitar 'dsa.msc', aparece a mensagem de que o Windows não encontra o arquivo?", en: "When opening Run (Win+R) and typing 'dsa.msc', the message appears that Windows cannot find the file?", es: "Al abrir Ejecutar (Win+R) y escribir 'dsa.msc', aparece el mensaje que indica que Windows no puede encontrar el archivo." },
    howToSolve: { pt: "Abrir Configurações do Windows > Aplicativos > Recursos Opcionais > 'Adicionar um recurso' > selecionar 'Ferramentas do Active Directory Domain Services e Lightweight Directory Services (RSAT)' > clicar em Instalar (ou via PowerShell).", en: "Open Windows Settings > Applications > Optional Features > 'Add a feature' > select 'Active Directory Domain Services and Lightweight Directory Services (RSAT) Tools' > click Install (or via PowerShell).", es: "Abra Configuración de Windows > Aplicaciones > Funciones opcionales > 'Agregar una función' > seleccione 'Herramientas de servicios de dominio de Active Directory y servicios de directorio ligero (RSAT)' > haga clic en Instalar (o mediante PowerShell)." },
    commandsCheatSheet: [
      { cmd: "Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0", desc: { pt: "Instala o console ADUC (dsa.msc) no Windows 10/11 via PowerShell.", en: "Installs the ADUC console (dsa.msc) on Windows 10/11 via PowerShell.", es: "Instala la consola ADUC (dsa.msc) en Windows 10/11 a través de PowerShell." } },
    ]
  },
};
