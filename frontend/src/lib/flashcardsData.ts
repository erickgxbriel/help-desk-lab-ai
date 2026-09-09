export interface Flashcard {
  id: string;
  category: "Redes" | "VPN" | "Hardware" | "Active Directory" | "Microsoft 365" | "Segurança";
  topic: Record<'pt' | 'en' | 'es', string>;
  type: "Comando" | "Conceito" | "Troubleshooting" | "Atalho" | "Operação";
  question: Record<'pt' | 'en' | 'es', string>;
  answer: Record<'pt' | 'en' | 'es', string>;
  hint?: Record<'pt' | 'en' | 'es', string>;
  level: "N1";
}

export const FLASHCARDS_N1: Flashcard[] = [
  // --- REDES ---
  {
    id: "fc-net-1",
    category: "Redes",
    topic: {"pt": "Comandos Básicos", "en": "Basic Commands", "es": "Comandos Básicos"},
    type: "Comando",
    question: {
      pt: "O que faz o comando 'ipconfig' e quando deve ser o primeiro comando executado?",
      en: "What does the 'ipconfig' command do and when should it be the first command executed?",
      es: "¿Qué hace el comando 'ipconfig' y cuándo debe ser el primer comando ejecutado?"
    },
    answer: {
      pt: "Exibe as configurações básicas de rede do computador: Endereço IPv4, Máscara de Sub-rede e Gateway Padrão.\n\n💡 Uso: É o primeiro comando a rodar em qualquer chamada de falta de conexão.",
      en: "Displays basic network configuration of the computer: IPv4 Address, Subnet Mask, and Default Gateway.\n\n💡 Usage: It is the first command to run on any no-connection ticket.",
      es: "Muestra la configuración básica de red del equipo: Dirección IPv4, Máscara de subred y Puerta de enlace predeterminada.\n\n💡 Uso: Es el primer comando a ejecutar en cualquier caso de falta de conexión."
    },
    hint: {
      pt: "Mostra IP, Máscara e Gateway.",
      en: "Shows IP, Mask, and Gateway.",
      es: "Muestra IP, Máscara y Puerta de enlace."
    },
    level: "N1"
  },
  {
    id: "fc-net-2",
    category: "Redes",
    topic: {"pt": "Comandos Básicos", "en": "Basic Commands", "es": "Comandos Básicos"},
    type: "Comando",
    question: {
      pt: "Quais informações adicionais o comando 'ipconfig /all' exibe?",
      en: "What additional information does the 'ipconfig /all' command display?",
      es: "¿Qué información adicional muestra el comando 'ipconfig /all'?"
    },
    answer: {
      pt: "Traz os dados detalhados completos:\n• Endereço Físico (MAC Address)\n• Servidor DHCP (quem forneceu o IP)\n• Servidores DNS (quem resolve nomes)\n• Data de concessão e expiração do Lease Time.",
      en: "Shows complete detailed data:\n• Physical Address (MAC Address)\n• DHCP Server (who provided the IP)\n• DNS Servers (who resolves names)\n• Lease obtained and expiration date.",
      es: "Muestra los datos detallados completos:\n• Dirección física (MAC Address)\n• Servidor DHCP (quién proporcionó la IP)\n• Servidores DNS (quién resuelve los nombres)\n• Fecha de concesión y caducidad del Lease Time."
    },
    hint: {
      pt: "MAC, DHCP, DNS e Lease.",
      en: "MAC, DHCP, DNS, and Lease.",
      es: "MAC, DHCP, DNS y Lease."
    },
    level: "N1"
  },
  {
    id: "fc-net-3",
    category: "Redes",
    topic: {"pt": "Renovação DHCP", "en": "DHCP Renewal", "es": "Renovación DHCP"},
    type: "Comando",
    question: {
      pt: "Para que servem os comandos 'ipconfig /release' e 'ipconfig /renew'?",
      en: "What are the 'ipconfig /release' and 'ipconfig /renew' commands used for?",
      es: "¿Para qué sirven los comandos 'ipconfig /release' e 'ipconfig /renew'?"
    },
    answer: {
      pt: "• ipconfig /release: Libera e solta a concessão de IP atual comunicando o servidor DHCP.\n• ipconfig /renew: Solicita um novo endereço IPv4 livre ao servidor DHCP.\n\n💡 Uso: Resolver conflitos de IP e falhas de renovação de lease.",
      en: "• ipconfig /release: Drops the current IP lease, communicating with the DHCP server.\n• ipconfig /renew: Requests a new free IPv4 address from the DHCP server.\n\n💡 Usage: Resolve IP conflicts and lease renewal failures.",
      es: "• ipconfig /release: Libera la concesión de IP actual comunicándose con el servidor DHCP.\n• ipconfig /renew: Solicita una nueva dirección IPv4 libre al servidor DHCP.\n\n💡 Uso: Resolver conflictos de IP y fallos de renovación de lease."
    },
    hint: {
      pt: "Solta o IP velho e pede um IP novo.",
      en: "Drops the old IP and requests a new one.",
      es: "Libera la IP antigua y pide una IP nueva."
    },
    level: "N1"
  },
  {
    id: "fc-net-4",
    category: "Redes",
    topic: {"pt": "Resolução DNS", "en": "DNS Resolution", "es": "Resolución DNS"},
    type: "Comando",
    question: {
      pt: "O que faz o comando 'ipconfig /flushdns'?",
      en: "What does the 'ipconfig /flushdns' command do?",
      es: "¿Qué hace el comando 'ipconfig /flushdns'?"
    },
    answer: {
      pt: "Esvazia e redefine o cache local do resolvedor de nomes DNS do Windows.\n\n💡 Uso: Quando o navegador não abre sites, mas o comando ping por endereço IP funciona.",
      en: "Empties and resets the local Windows DNS resolver cache.\n\n💡 Usage: When the browser does not open websites, but the ping command by IP address works.",
      es: "Vacía y restablece la caché del resolutor de nombres DNS local de Windows.\n\n💡 Uso: Cuando el navegador no abre sitios web, pero el comando ping por dirección IP funciona."
    },
    hint: {
      pt: "Limpa o cache de nomes de sites.",
      en: "Clears the website names cache.",
      es: "Borra la caché de nombres de sitios web."
    },
    level: "N1"
  },
  {
    id: "fc-net-5",
    category: "Redes",
    topic: {"pt": "Conceitos de Rede", "en": "Networking Concepts", "es": "Conceptos de Red"},
    type: "Conceito",
    question: {
      pt: "O que é o Gateway Padrão (Default Gateway)?",
      en: "What is the Default Gateway?",
      es: "¿Qué es la Puerta de enlace predeterminada (Default Gateway)?"
    },
    answer: {
      pt: "É o endereço IP do Roteador da rede local. Funciona como a 'porta de saída' para enviar pacotes para fora da rede local (internet ou outras sub-redes).",
      en: "It is the IP address of the local network Router. It acts as the 'exit door' to send packets outside the local network (internet or other subnets).",
      es: "Es la dirección IP del Enrutador de la red local. Funciona como la 'puerta de salida' para enviar paquetes fuera de la red local (internet u otras subredes)."
    },
    hint: {
      pt: "É o IP do Roteador local.",
      en: "It is the local Router's IP.",
      es: "Es la IP del Enrutador local."
    },
    level: "N1"
  },
  {
    id: "fc-net-6",
    category: "Redes",
    topic: {"pt": "APIPA & Sub-rede", "en": "APIPA & Subnet", "es": "APIPA y Subred"},
    type: "Conceito",
    question: {
      pt: "O que significa um computador obter o endereço IP 169.254.x.x (APIPA)?",
      en: "What does it mean when a computer gets the IP address 169.254.x.x (APIPA)?",
      es: "¿Qué significa que un ordenador obtenga la dirección IP 169.254.x.x (APIPA)?"
    },
    answer: {
      pt: "Significa que o computador NÃO conseguiu se comunicar com o servidor DHCP. O Windows atribui esse IP de autoconfiguração inútil automaticamente.\n\n🛠️ Ação N1: Verificar cabo de rede na parede, switch ou serviço DHCP.",
      en: "It means the computer FAILED to communicate with the DHCP server. Windows assigns this useless autoconfiguration IP automatically.\n\n🛠️ N1 Action: Check network cable in the wall, switch, or DHCP service.",
      es: "Significa que el ordenador NO pudo comunicarse con el servidor DHCP. Windows asigna esta IP de autoconfiguración inútil automáticamente.\n\n🛠️ Acción N1: Comprobar el cable de red en la pared, switch o servicio DHCP."
    },
    hint: {
      pt: "Falha de comunicação com o servidor DHCP.",
      en: "Communication failure with the DHCP server.",
      es: "Fallo de comunicación con el servidor DHCP."
    },
    level: "N1"
  },
  {
    id: "fc-net-7",
    category: "Redes",
    topic: {"pt": "Diagnóstico ICMP", "en": "ICMP Diagnostics", "es": "Diagnóstico ICMP"},
    type: "Comando",
    question: {
      pt: "O que é e para que serve o comando 'ping'?",
      en: "What is the 'ping' command and what is it used for?",
      es: "¿Qué es y para qué sirve el comando 'ping'?"
    },
    answer: {
      pt: "Envia pacotes de teste ICMP (Echo Request) para medir conectividade, latência em milissegundos (ms) e taxa de perda de pacotes.\n\n💡 Exemplo: 'ping 8.8.8.8' testa saída física para internet.",
      en: "Sends ICMP test packets (Echo Request) to measure connectivity, latency in milliseconds (ms), and packet loss rate.\n\n💡 Example: 'ping 8.8.8.8' tests physical output to the internet.",
      es: "Envía paquetes de prueba ICMP (Echo Request) para medir la conectividad, la latencia en milisegundos (ms) y la tasa de pérdida de paquetes.\n\n💡 Ejemplo: 'ping 8.8.8.8' prueba la salida física a internet."
    },
    hint: {
      pt: "Testa conectividade e latência em ms.",
      en: "Tests connectivity and latency in ms.",
      es: "Prueba conectividad y latencia en ms."
    },
    level: "N1"
  },
  {
    id: "fc-net-8",
    category: "Redes",
    topic: {"pt": "Rastreamento de Rota", "en": "Route Tracing", "es": "Rastreo de Ruta"},
    type: "Comando",
    question: {
      pt: "O que faz o comando 'tracert' (Traceroute)?",
      en: "What does the 'tracert' (Traceroute) command do?",
      es: "¿Qué hace el comando 'tracert' (Traceroute)?"
    },
    answer: {
      pt: "Mapeia todos os saltos de roteadores (Hops) até o destino e exibe a latência em cada ponto.\n\n💡 Uso: Descobrir em qual roteador da rota está ocorrendo perda de pacotes ou lentidão.",
      en: "Maps all router hops (Hops) to the destination and displays latency at each point.\n\n💡 Usage: Discover which router on the route is causing packet loss or slowness.",
      es: "Mapea todos los saltos de enrutadores (Hops) hasta el destino y muestra la latencia en cada punto.\n\n💡 Uso: Descubrir en qué enrutador de la ruta está ocurriendo pérdida de paquetes o lentitud."
    },
    hint: {
      pt: "Mapeia os saltos de roteadores até o destino.",
      en: "Maps router hops to the destination.",
      es: "Mapea los saltos de enrutadores hasta el destino."
    },
    level: "N1"
  },
  {
    id: "fc-net-9",
    category: "Redes",
    topic: {"pt": "Atalhos Windows", "en": "Windows Shortcuts", "es": "Atajos de Windows"},
    type: "Atalho",
    question: {
      pt: "Qual o comando para abrir o painel clássico de Conexões de Rede do Windows?",
      en: "What command opens the classic Windows Network Connections panel?",
      es: "¿Cuál es el comando para abrir el panel clásico de Conexiones de red de Windows?"
    },
    answer: {
      pt: "Win + R ➔ ncpa.cpl\n\n💡 Uso: Permite ativar/desativar placas de rede, checar velocidade do link (10 Mbps vs 1 Gbps) e configurar IP estático.",
      en: "Win + R ➔ ncpa.cpl\n\n💡 Usage: Allows enabling/disabling network adapters, checking link speed (10 Mbps vs 1 Gbps), and configuring static IP.",
      es: "Win + R ➔ ncpa.cpl\n\n💡 Uso: Permite activar/desactivar adaptadores de red, comprobar la velocidad del enlace (10 Mbps vs 1 Gbps) y configurar una IP estática."
    },
    hint: {
      pt: "ncpa.cpl",
      en: "ncpa.cpl",
      es: "ncpa.cpl"
    },
    level: "N1"
  },
  {
    id: "fc-net-10",
    category: "Redes",
    topic: {"pt": "Proxy Corporativo", "en": "Corporate Proxy", "es": "Proxy Corporativo"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Usuário em Home Office diz que o Chrome não abre sites com erro ERR_PROXY_CONNECTION_FAILED, mas o Teams funciona. Como resolver?",
      en: "Scenario: Home Office user says Chrome won't open websites with ERR_PROXY_CONNECTION_FAILED error, but Teams works. How to resolve?",
      es: "Escenario: Un usuario de Home Office dice que Chrome no abre sitios con el error ERR_PROXY_CONNECTION_FAILED, pero Teams funciona. ¿Cómo resolverlo?"
    },
    answer: {
      pt: "O navegador manteve as configurações de Servidor Proxy do escritório ativas.\n\n🛠️ Solução N1: Abrir 'inetcpl.cpl' > Conexões > Configurações da LAN > desmarcar 'Usar um servidor proxy' e marcar 'Detectar automaticamente as configurações'.",
      en: "The browser kept the office Proxy Server settings active.\n\n🛠️ N1 Solution: Open 'inetcpl.cpl' > Connections > LAN settings > uncheck 'Use a proxy server' and check 'Automatically detect settings'.",
      es: "El navegador mantuvo activa la configuración del servidor proxy de la oficina.\n\n🛠️ Solución N1: Abrir 'inetcpl.cpl' > Conexiones > Configuración de LAN > desmarcar 'Usar un servidor proxy' y marcar 'Detectar la configuración automáticamente'."
    },
    hint: {
      pt: "Desmarcar servidor proxy nas Configurações da LAN (inetcpl.cpl).",
      en: "Uncheck proxy server in LAN settings (inetcpl.cpl).",
      es: "Desmarcar servidor proxy en la configuración de LAN (inetcpl.cpl)."
    },
    level: "N1"
  },
  {
    id: "fc-net-11",
    category: "Redes",
    topic: {"pt": "Camada Física", "en": "Physical Layer", "es": "Capa Física"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Cópia de arquivos lenta a 1 MB/s e no 'ncpa.cpl' o status marca 'Velocidade: 10.0 Mbps'. Qual a causa e solução?",
      en: "Scenario: Slow file copy at 1 MB/s and in 'ncpa.cpl' status says 'Speed: 10.0 Mbps'. What is the cause and solution?",
      es: "Escenario: Copia de archivos lenta a 1 MB/s y en 'ncpa.cpl' el estado dice 'Velocidad: 10.0 Mbps'. ¿Cuál es la causa y solución?"
    },
    answer: {
      pt: "Causa: Cabo de rede RJ45 danificado (fio interno quebrado ou pino torto) forçando negociação em 10 Mbps Half-Duplex.\n\n🛠️ Solução N1: Substituir o cabo de rede (patch cord) por um cabo Cat5e/Cat6 Gigabit novo.",
      en: "Cause: Damaged RJ45 network cable (broken internal wire or bent pin) forcing negotiation at 10 Mbps Half-Duplex.\n\n🛠️ N1 Solution: Replace the network cable (patch cord) with a new Cat5e/Cat6 Gigabit cable.",
      es: "Causa: Cable de red RJ45 dañado (hilo interno roto o pin torcido) que fuerza la negociación a 10 Mbps Half-Duplex.\n\n🛠️ Solución N1: Sustituir el cable de red (patch cord) por un cable Cat5e/Cat6 Gigabit nuevo."
    },
    hint: {
      pt: "Cabo de rede danificado; substituir por cabo novo Gigabit.",
      en: "Damaged network cable; replace with a new Gigabit cable.",
      es: "Cable de red dañado; sustituir por un cable Gigabit nuevo."
    },
    level: "N1"
  },

  // --- VPN ---
  {
    id: "fc-vpn-1",
    category: "VPN",
    topic: {"pt": "Autenticação MFA", "en": "MFA Authentication", "es": "Autenticación MFA"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Usuário em home office não conecta na VPN por erro de credenciais inválidas, mesmo com a senha correta. O que verificar?",
      en: "Scenario: Home office user cannot connect to VPN due to invalid credentials error, even with correct password. What to check?",
      es: "Escenario: Usuario de home office no se conecta a la VPN por error de credenciales inválidas, incluso con la contraseña correcta. ¿Qué verificar?"
    },
    answer: {
      pt: "Verificar se o relógio do celular do MFA (Microsoft Authenticator / FortiToken) está no modo automático.\n\n💡 Causa: 2 minutos de diferença de horário no smartphone invalidam os códigos temporários do token.",
      en: "Verify if the MFA phone's clock (Microsoft Authenticator / FortiToken) is set to automatic mode.\n\n💡 Cause: A 2-minute time difference on the smartphone invalidates the temporary token codes.",
      es: "Comprobar si el reloj del móvil del MFA (Microsoft Authenticator / FortiToken) está en modo automático.\n\n💡 Causa: Una diferencia de 2 minutos de hora en el smartphone invalida los códigos temporales del token."
    },
    hint: {
      pt: "Sincronização de horário do celular do token.",
      en: "Token phone time synchronization.",
      es: "Sincronización de hora del móvil del token."
    },
    level: "N1"
  },
  {
    id: "fc-vpn-2",
    category: "VPN",
    topic: {"pt": "Adaptador Virtual", "en": "Virtual Adapter", "es": "Adaptador Virtual"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Na VPN (AnyConnect / FortiClient) aparece 'Virtual Adapter failure / Tunnel initialization failed'. O que fazer?",
      en: "Scenario: In the VPN (AnyConnect / FortiClient) 'Virtual Adapter failure / Tunnel initialization failed' appears. What to do?",
      es: "Escenario: En la VPN (AnyConnect / FortiClient) aparece 'Virtual Adapter failure / Tunnel initialization failed'. ¿Qué hacer?"
    },
    answer: {
      pt: "O Adaptador de Rede Virtual da VPN foi desativado no Windows.\n\n🛠️ Solução N1: Abrir 'ncpa.cpl', localizar a placa virtual da VPN, clicar com botão direito e selecionar 'Ativar' (ou reiniciar o serviço da VPN no services.msc).",
      en: "The VPN Virtual Network Adapter has been disabled in Windows.\n\n🛠️ N1 Solution: Open 'ncpa.cpl', find the VPN virtual adapter, right-click, and select 'Enable' (or restart the VPN service in services.msc).",
      es: "El Adaptador de red virtual de la VPN se ha desactivado en Windows.\n\n🛠️ Solución N1: Abrir 'ncpa.cpl', localizar el adaptador virtual de la VPN, hacer clic con el botón derecho y seleccionar 'Activar' (o reiniciar el servicio VPN en services.msc)."
    },
    hint: {
      pt: "Reativar o adaptador virtual no ncpa.cpl.",
      en: "Re-enable the virtual adapter in ncpa.cpl.",
      es: "Reactivar el adaptador virtual en ncpa.cpl."
    },
    level: "N1"
  },

  // --- HARDWARE ---
  {
    id: "fc-hw-1",
    category: "Hardware",
    topic: {"pt": "Energia Residual", "en": "Residual Power", "es": "Energía Residual"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Notebook estava funcionando na tomada, foi retirado para uma reunião e NÃO liga de jeito nenhum na bateria (nenhum LED acende). O que fazer?",
      en: "Scenario: Laptop was working while plugged in, was unplugged for a meeting, and WON'T turn on at all on battery (no LEDs light up). What to do?",
      es: "Escenario: El portátil funcionaba enchufado, se desenchufó para una reunión y NO se enciende de ninguna manera con la batería (ningún LED se enciende). ¿Qué hacer?"
    },
    answer: {
      pt: "Executar a Drenagem de Energia Residual (Hard Reset / Power Drain):\n1. Desconectar carregador e periféricos.\n2. Segurar o botão Power pressionado por 30 a 60 segundos contínuos para descarregar os capacitores da placa-mãe.\n3. Ligar normalmente na bateria.",
      en: "Perform a Residual Power Drain (Hard Reset / Power Drain):\n1. Disconnect charger and peripherals.\n2. Hold the Power button pressed for 30 to 60 continuous seconds to discharge motherboard capacitors.\n3. Turn on normally on battery.",
      es: "Ejecutar un Drenaje de energía residual (Hard Reset / Power Drain):\n1. Desconectar cargador y periféricos.\n2. Mantener presionado el botón de Encendido de 30 a 60 segundos continuos para descargar los condensadores de la placa base.\n3. Encender normalmente con batería."
    },
    hint: {
      pt: "Hard Reset: segurar botão Power por 30 segundos contínuos.",
      en: "Hard Reset: hold Power button for 30 continuous seconds.",
      es: "Hard Reset: mantener el botón Power durante 30 segundos continuos."
    },
    level: "N1"
  },
  {
    id: "fc-hw-2",
    category: "Hardware",
    topic: {"pt": "Conexão de Vídeo", "en": "Video Connection", "es": "Conexión de Video"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Computador liga, cooler gira forte, mas o monitor fica piscando 'Sem Sinal'. Qual o erro clássico de usuário?",
      en: "Scenario: Computer turns on, cooler spins loud, but monitor flashes 'No Signal'. What is the classic user error?",
      es: "Escenario: El ordenador se enciende, el ventilador gira fuerte, pero el monitor parpadea 'Sin señal'. ¿Cuál es el clásico error de usuario?"
    },
    answer: {
      pt: "O cabo de vídeo (HDMI/DisplayPort) foi plugado na saída de vídeo superior Onboard da placa-mãe em vez de na porta inferior da Placa de Vídeo Dedicada (GPU).\n\n🛠️ Solução: Conectar o cabo na porta horizontal inferior da GPU.",
      en: "The video cable (HDMI/DisplayPort) was plugged into the upper Onboard video output of the motherboard instead of the lower port of the Dedicated Graphics Card (GPU).\n\n🛠️ Solution: Connect the cable to the lower horizontal port on the GPU.",
      es: "El cable de vídeo (HDMI/DisplayPort) se conectó a la salida de vídeo Onboard superior de la placa base en lugar del puerto inferior de la Tarjeta gráfica dedicada (GPU).\n\n🛠️ Solución: Conectar el cable al puerto horizontal inferior de la GPU."
    },
    hint: {
      pt: "Cabo plugado na saída onboard em vez da GPU dedicada.",
      en: "Cable plugged into onboard output instead of dedicated GPU.",
      es: "Cable conectado a la salida onboard en lugar de la GPU dedicada."
    },
    level: "N1"
  },
  {
    id: "fc-hw-3",
    category: "Hardware",
    topic: {"pt": "Periféricos & Dock", "en": "Peripherals & Dock", "es": "Periféricos y Dock"},
    type: "Atalho",
    question: {
      pt: "Cenário: Notebook conectado na Dock Station USB-C carrega a bateria, mas os monitores externos não dão vídeo. Qual o atalho de reset gráfico?",
      en: "Scenario: Laptop connected to USB-C Dock Station charges battery, but external monitors show no video. What is the graphics reset shortcut?",
      es: "Escenario: Portátil conectado a Dock Station USB-C carga batería, pero monitores externos no dan vídeo. ¿Cuál es el atajo de restablecimiento gráfico?"
    },
    answer: {
      pt: "Pressionar as teclas Win + Ctrl + Shift + B.\n\n💡 O que faz: Reinicia instantaneamente o subsistema gráfico e o driver de vídeo do Windows sem fechar programas.",
      en: "Press the keys Win + Ctrl + Shift + B.\n\n💡 What it does: Instantly restarts the Windows graphics subsystem and video driver without closing programs.",
      es: "Presionar las teclas Win + Ctrl + Shift + B.\n\n💡 Qué hace: Reinicia instantáneamente el subsistema gráfico y el controlador de vídeo de Windows sin cerrar programas."
    },
    hint: {
      pt: "Win + Ctrl + Shift + B",
      en: "Win + Ctrl + Shift + B",
      es: "Win + Ctrl + Shift + B"
    },
    level: "N1"
  },
  {
    id: "fc-hw-4",
    category: "Hardware",
    topic: {"pt": "Diagnóstico de RAM", "en": "RAM Diagnostics", "es": "Diagnóstico de RAM"},
    type: "Comando",
    question: {
      pt: "Como testar a integridade da memória RAM nativamente no Windows sem instalar programas de terceiros?",
      en: "How to test RAM integrity natively in Windows without installing third-party programs?",
      es: "¿Cómo probar la integridad de la memoria RAM de forma nativa en Windows sin instalar programas de terceros?"
    },
    answer: {
      pt: "Executar o comando 'mdsched.exe' (Diagnóstico de Memória do Windows).\n\n💡 Uso: Diagnosticar telas azuis de MEMORY_MANAGEMENT ou travamentos aleatórios.",
      en: "Run the 'mdsched.exe' command (Windows Memory Diagnostic).\n\n💡 Usage: Diagnose MEMORY_MANAGEMENT blue screens or random crashes.",
      es: "Ejecutar el comando 'mdsched.exe' (Diagnóstico de memoria de Windows).\n\n💡 Uso: Diagnosticar pantallas azules de MEMORY_MANAGEMENT o bloqueos aleatorios."
    },
    hint: {
      pt: "mdsched.exe",
      en: "mdsched.exe",
      es: "mdsched.exe"
    },
    level: "N1"
  },
  {
    id: "fc-hw-5",
    category: "Hardware",
    topic: {"pt": "WinRE & Modo de Segurança", "en": "WinRE & Safe Mode", "es": "WinRE y Modo Seguro"},
    type: "Atalho",
    question: {
      pt: "Quais os métodos padrão para entrar no Modo de Segurança (WinRE) no Windows 10/11?",
      en: "What are the standard methods to enter Safe Mode (WinRE) in Windows 10/11?",
      es: "¿Cuáles son los métodos estándar para entrar en Modo seguro (WinRE) en Windows 10/11?"
    },
    answer: {
      pt: "1. Atalho principal: Segurar a tecla SHIFT enquanto clica em 'Reiniciar'.\n2. Se o Windows não entra: Forçar o desligamento no botão Power 3 vezes consecutivas durante o boot (aciona o Reparo Automático).\n3. Via CMD: 'shutdown /r /o /t 0'.",
      en: "1. Main shortcut: Hold SHIFT key while clicking 'Restart'.\n2. If Windows doesn't boot: Force shutdown on Power button 3 consecutive times during boot (triggers Automatic Repair).\n3. Via CMD: 'shutdown /r /o /t 0'.",
      es: "1. Atajo principal: Mantener la tecla SHIFT mientras se hace clic en 'Reiniciar'.\n2. Si Windows no arranca: Forzar el apagado en el botón Power 3 veces consecutivas durante el arranque (activa la Reparación automática).\n3. Vía CMD: 'shutdown /r /o /t 0'."
    },
    hint: {
      pt: "Shift + Reiniciar (ou desligar 3 vezes no botão Power).",
      en: "Shift + Restart (or shutdown 3 times with Power button).",
      es: "Shift + Reiniciar (o apagar 3 veces con el botón Power)."
    },
    level: "N1"
  },
  {
    id: "fc-hw-6",
    category: "Hardware",
    topic: {"pt": "BitLocker", "en": "BitLocker", "es": "BitLocker"},
    type: "Conceito",
    question: {
      pt: "Onde o analista N1 localiza a Chave de Recuperação BitLocker de 48 dígitos do notebook de um usuário?",
      en: "Where does the L1 analyst locate the 48-digit BitLocker Recovery Key for a user's laptop?",
      es: "¿Dónde localiza el analista N1 la clave de recuperación BitLocker de 48 dígitos del portátil de un usuario?"
    },
    answer: {
      pt: "No portal do Microsoft Entra ID (Azure AD) em 'Dispositivos' ou no console do Microsoft Intune, pesquisando pelo Nome ou ID do computador do usuário.",
      en: "In the Microsoft Entra ID (Azure AD) portal under 'Devices' or in the Microsoft Intune console, searching by the user's computer Name or ID.",
      es: "En el portal de Microsoft Entra ID (Azure AD) en 'Dispositivos' o en la consola de Microsoft Intune, buscando por el Nombre o ID del ordenador del usuario."
    },
    hint: {
      pt: "Portal do Microsoft Entra ID (Azure AD) / Intune.",
      en: "Microsoft Entra ID (Azure AD) / Intune portal.",
      es: "Portal de Microsoft Entra ID (Azure AD) / Intune."
    },
    level: "N1"
  },

  // --- ACTIVE DIRECTORY ---
  {
    id: "fc-ad-1",
    category: "Active Directory",
    topic: {"pt": "Consoles Administrativos", "en": "Admin Consoles", "es": "Consolas de Administración"},
    type: "Atalho",
    question: {
      pt: "Qual o comando de atalho para abrir o console principal de Usuários e Computadores do Active Directory?",
      en: "What is the shortcut command to open the main Active Directory Users and Computers console?",
      es: "¿Cuál es el comando de atajo para abrir la consola principal de Usuarios y equipos de Active Directory?"
    },
    answer: {
      pt: "Win + R ➔ dsa.msc (Active Directory Users and Computers - ADUC).",
      en: "Win + R ➔ dsa.msc (Active Directory Users and Computers - ADUC).",
      es: "Win + R ➔ dsa.msc (Active Directory Users and Computers - ADUC)."
    },
    hint: {
      pt: "dsa.msc",
      en: "dsa.msc",
      es: "dsa.msc"
    },
    level: "N1"
  },
  {
    id: "fc-ad-2",
    category: "Active Directory",
    topic: {"pt": "Estrutura do Domínio", "en": "Domain Structure", "es": "Estructura del Dominio"},
    type: "Conceito",
    question: {
      pt: "O que é uma Unidade Organizacional (OU) no Active Directory?",
      en: "What is an Organizational Unit (OU) in Active Directory?",
      es: "¿Qué es una Unidad Organizacional (OU) en Active Directory?"
    },
    answer: {
      pt: "É uma pasta/estrutura lógica dentro do domínio usada para organizar contas de usuários, computadores e grupos por departamento (ex: OU=Financeiro) e aplicar políticas de grupo (GPO).",
      en: "It is a folder/logical structure within the domain used to organize user accounts, computers, and groups by department (e.g., OU=Finance) and apply group policies (GPO).",
      es: "Es una carpeta/estructura lógica dentro del dominio usada para organizar cuentas de usuario, ordenadores y grupos por departamento (ej: OU=Finanzas) y aplicar políticas de grupo (GPO)."
    },
    hint: {
      pt: "Pasta lógica para organizar contas e aplicar GPOs.",
      en: "Logical folder to organize accounts and apply GPOs.",
      es: "Carpeta lógica para organizar cuentas y aplicar GPOs."
    },
    level: "N1"
  },
  {
    id: "fc-ad-3",
    category: "Active Directory",
    topic: {"pt": "Desbloqueio de Conta", "en": "Account Unlock", "es": "Desbloqueo de Cuenta"},
    type: "Operação",
    question: {
      pt: "Como realizar o desbloqueio de conta (Account Lockout) no Active Directory?",
      en: "How to perform account unlock (Account Lockout) in Active Directory?",
      es: "¿Cómo realizar el desbloqueo de cuenta (Account Lockout) en Active Directory?"
    },
    answer: {
      pt: "1. Abrir o dsa.msc e localizar a conta do usuário.\n2. Abrir Propriedades > aba 'Account' (Conta).\n3. Marcar a caixa 'Unlock account' (Desbloquear conta) e clicar em Aplicar.",
      en: "1. Open dsa.msc and locate the user account.\n2. Open Properties > 'Account' tab.\n3. Check the 'Unlock account' box and click Apply.",
      es: "1. Abrir dsa.msc y localizar la cuenta de usuario.\n2. Abrir Propiedades > pestaña 'Account' (Cuenta).\n3. Marcar la casilla 'Unlock account' (Desbloquear cuenta) y hacer clic en Aplicar."
    },
    hint: {
      pt: "dsa.msc > Propriedades > aba Account > marcar Unlock account.",
      en: "dsa.msc > Properties > Account tab > check Unlock account.",
      es: "dsa.msc > Propiedades > pestaña Account > marcar Unlock account."
    },
    level: "N1"
  },
  {
    id: "fc-ad-4",
    category: "Active Directory",
    topic: {"pt": "Redefinição de Senha", "en": "Password Reset", "es": "Restablecimiento de Contraseña"},
    type: "Operação",
    question: {
      pt: "Quais as 2 opções obrigatórias ao redefinir a senha de um usuário no AD?",
      en: "What are the 2 mandatory options when resetting a user's password in AD?",
      es: "¿Cuáles son las 2 opciones obligatorias al restablecer la contraseña de un usuario en AD?"
    },
    answer: {
      pt: "1. Marcar 'User must change password at next logon' (obriga o colaborador a criar a sua senha pessoal no primeiro acesso).\n2. Desmarcar 'Unlock the user's account' caso a conta estivesse travada por tentativas incorretas.",
      en: "1. Check 'User must change password at next logon' (forces the employee to create their personal password on first access).\n2. Check 'Unlock the user's account' in case the account was locked due to incorrect attempts.",
      es: "1. Marcar 'User must change password at next logon' (obliga al empleado a crear su contraseña personal en el primer acceso).\n2. Marcar 'Unlock the user's account' en caso de que la cuenta estuviera bloqueada por intentos incorrectos."
    },
    hint: {
      pt: "Troca obrigatória no próximo logon + Desbloqueio.",
      en: "Mandatory change at next logon + Unlock.",
      es: "Cambio obligatorio en el próximo inicio de sesión + Desbloqueo."
    },
    level: "N1"
  },
  {
    id: "fc-ad-5",
    category: "Active Directory",
    topic: {"pt": "Offboarding / Desligamento", "en": "Offboarding / Deprovisioning", "es": "Offboarding / Desactivación"},
    type: "Operação",
    question: {
      pt: "Por que no desligamento de um funcionário deve-se DESATIVAR a conta (Disable Account) em vez de EXCLUÍ-LA (Delete)?",
      en: "Why should an employee's account be DISABLED (Disable Account) instead of DELETED (Delete) upon termination?",
      es: "¿Por qué en la salida de un empleado se debe DESACTIVAR la cuenta (Disable Account) en lugar de ELIMINARLA (Delete)?"
    },
    answer: {
      pt: "Sempre DESATIVAR (Disable Account)!\nDesativar bloqueia o acesso imediatamente preservando o SID (identificador de segurança único), histórico de e-mails e permissões de arquivos. Excluir destrói o histórico permanentemente.",
      en: "Always DISABLE (Disable Account)!\nDisabling blocks access immediately preserving the SID (unique security identifier), email history, and file permissions. Deleting destroys history permanently.",
      es: "¡Siempre DESACTIVAR (Disable Account)!\nDesactivar bloquea el acceso inmediatamente conservando el SID (identificador de seguridad único), el historial de correo y los permisos de archivos. Eliminar destruye el historial de forma permanente."
    },
    hint: {
      pt: "Desativar preserva o SID e histórico; excluir destrói tudo.",
      en: "Disabling preserves SID and history; deleting destroys everything.",
      es: "Desactivar preserva el SID y el historial; eliminar destruye todo."
    },
    level: "N1"
  },
  {
    id: "fc-ad-6",
    category: "Active Directory",
    topic: {"pt": "Grupos de Segurança", "en": "Security Groups", "es": "Grupos de Seguridad"},
    type: "Operação",
    question: {
      pt: "Como adicionar um usuário a um grupo de segurança no AD e o que instruir ao colaborador em seguida?",
      en: "How to add a user to a security group in AD and what to instruct the employee next?",
      es: "¿Cómo agregar un usuario a un grupo de seguridad en AD y qué instruir al empleado a continuación?"
    },
    answer: {
      pt: "1. No dsa.msc > Propriedades do usuário > aba 'Member Of' > clicar em 'Add...' e salvar.\n2. Instrução obrigatória: Pedir para o colaborador fazer Logoff e Logon para que o Windows renove o token Kerberos com as novas permissões.",
      en: "1. In dsa.msc > User Properties > 'Member Of' tab > click 'Add...' and save.\n2. Mandatory instruction: Ask the employee to Logoff and Logon so Windows renews the Kerberos token with new permissions.",
      es: "1. En dsa.msc > Propiedades de usuario > pestaña 'Member Of' > hacer clic en 'Add...' y guardar.\n2. Instrucción obligatoria: Pedir al empleado que cierre y abra sesión para que Windows renueve el token Kerberos con los nuevos permisos."
    },
    hint: {
      pt: "Aba Member Of + pedir para fazer Logoff e Logon.",
      en: "Member Of tab + ask to Logoff and Logon.",
      es: "Pestaña Member Of + pedir hacer Logoff y Logon."
    },
    level: "N1"
  },
  {
    id: "fc-ad-7",
    category: "Active Directory",
    topic: {"pt": "Ferramentas Remotas (RSAT)", "en": "Remote Tools (RSAT)", "es": "Herramientas Remotas (RSAT)"},
    type: "Conceito",
    question: {
      pt: "O que é o RSAT e por que o analista de suporte N1 precisa dele instalado?",
      en: "What is RSAT and why does the L1 support analyst need it installed?",
      es: "¿Qué es RSAT y por qué el analista de soporte N1 necesita tenerlo instalado?"
    },
    answer: {
      pt: "Remote Server Administration Tools.\nÉ o pacote oficial que instala os consoles administrativos (como dsa.msc) no Windows 10/11 para o suporte gerenciar o domínio do seu próprio notebook sem precisar acessar o servidor Domain Controller via RDP.",
      en: "Remote Server Administration Tools.\nIt is the official package that installs administrative consoles (like dsa.msc) on Windows 10/11 for support to manage the domain from their own laptop without accessing the Domain Controller via RDP.",
      es: "Remote Server Administration Tools.\nEs el paquete oficial que instala las consolas administrativas (como dsa.msc) en Windows 10/11 para que el soporte gestione el dominio desde su propio portátil sin acceder al Controlador de Dominio por RDP."
    },
    hint: {
      pt: "Pacote para gerenciar o AD do próprio notebook.",
      en: "Package to manage AD from own laptop.",
      es: "Paquete para gestionar el AD desde el propio portátil."
    },
    level: "N1"
  },

  // --- MICROSOFT 365 ---
  {
    id: "fc-m365-1",
    category: "Microsoft 365",
    topic: {"pt": "Outlook Credenciais", "en": "Outlook Credentials", "es": "Credenciales de Outlook"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: O Outlook fica pedindo senha em loop a cada 2 minutos em uma janela preta. Causa e Solução N1?",
      en: "Scenario: Outlook keeps asking for password in a loop every 2 minutes in a black window. Cause and L1 Solution?",
      es: "Escenario: Outlook sigue pidiendo la contraseña en bucle cada 2 minutos en una ventana negra. ¿Causa y Solución N1?"
    },
    answer: {
      pt: "Causa: Token de autenticação antigo corrompido no Gerenciador de Credenciais do Windows.\n\n🛠️ Solução N1: Abrir 'control keymgr.dll' (Gerenciador de Credenciais) > Credenciais do Windows > remover entradas do 'MS.Outlook' e reabrir o Outlook.",
      en: "Cause: Old authentication token corrupted in Windows Credential Manager.\n\n🛠️ N1 Solution: Open 'control keymgr.dll' (Credential Manager) > Windows Credentials > remove 'MS.Outlook' entries and reopen Outlook.",
      es: "Causa: Token de autenticación antiguo dañado en el Administrador de credenciales de Windows.\n\n🛠️ Solución N1: Abrir 'control keymgr.dll' (Administrador de credenciales) > Credenciales de Windows > eliminar entradas de 'MS.Outlook' y reabrir Outlook."
    },
    hint: {
      pt: "Limpar credenciais do MS.Outlook no Gerenciador de Credenciais.",
      en: "Clear MS.Outlook credentials in Credential Manager.",
      es: "Borrar credenciales de MS.Outlook en el Administrador de credenciales."
    },
    level: "N1"
  },
  {
    id: "fc-m365-2",
    category: "Microsoft 365",
    topic: {"pt": "Filtro Anti-Spam", "en": "Anti-Spam Filter", "es": "Filtro Antispam"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: E-mails importantes de propostas de clientes estão caindo no Lixo Eletrônico no Outlook. Como resolver?",
      en: "Scenario: Important client proposal emails are going to Junk Email in Outlook. How to resolve?",
      es: "Escenario: Correos importantes de propuestas de clientes van a la carpeta de Correo no deseado en Outlook. ¿Cómo resolverlo?"
    },
    answer: {
      pt: "No Outlook: Página Inicial > Lixo Eletrônico > Opções de Lixo Eletrônico > aba 'Remetentes Confiáveis' > Adicionar o domínio do cliente (ex: @parceiro.com.br) e salvar.",
      en: "In Outlook: Home > Junk > Junk Email Options > 'Safe Senders' tab > Add the client's domain (e.g., @partner.com) and save.",
      es: "En Outlook: Inicio > Correo no deseado > Opciones de correo electrónico no deseado > pestaña 'Remitentes seguros' > Añadir el dominio del cliente (ej. @socio.com) y guardar."
    },
    hint: {
      pt: "Adicionar o domínio em Remetentes Confiáveis no Outlook.",
      en: "Add the domain in Safe Senders in Outlook.",
      es: "Añadir el dominio en Remitentes seguros en Outlook."
    },
    level: "N1"
  },
  {
    id: "fc-m365-3",
    category: "Microsoft 365",
    topic: {"pt": "Licenciamento Office", "en": "Office Licensing", "es": "Licencias de Office"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Word e Excel exibem faixa vermelha com 'Produto Não Licenciado'. Qual a solução N1 mais rápida?",
      en: "Scenario: Word and Excel display red banner with 'Unlicensed Product'. What is the fastest L1 solution?",
      es: "Escenario: Word y Excel muestran una franja roja con 'Producto sin licencia'. ¿Cuál es la solución N1 más rápida?"
    },
    answer: {
      pt: "Abrir o Word > ir em Arquivo > Conta > clicar em 'Desconectar' na conta corporativa, fechar o aplicativo e fazer login novamente com o e-mail corporativo e senha.",
      en: "Open Word > go to File > Account > click 'Sign out' on the corporate account, close the app, and sign in again with corporate email and password.",
      es: "Abrir Word > ir a Archivo > Cuenta > hacer clic en 'Cerrar sesión' en la cuenta corporativa, cerrar la aplicación e iniciar sesión de nuevo con el correo corporativo y contraseña."
    },
    hint: {
      pt: "Arquivo > Conta > Desconectar e relogar a conta corporativa.",
      en: "File > Account > Sign out and log back into corporate account.",
      es: "Archivo > Cuenta > Cerrar sesión y volver a iniciar la cuenta corporativa."
    },
    level: "N1"
  },
  {
    id: "fc-m365-4",
    category: "Microsoft 365",
    topic: {"pt": "Teams Áudio", "en": "Teams Audio", "es": "Audio de Teams"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: O usuário escuta a reunião no Teams, mas ninguém ouve o que ele fala. O que verificar nas configurações?",
      en: "Scenario: User hears the meeting in Teams, but no one hears what they say. What to check in settings?",
      es: "Escenario: El usuario escucha la reunión en Teams, pero nadie oye lo que dice. ¿Qué verificar en la configuración?"
    },
    answer: {
      pt: "No Teams: Configurações > Dispositivos > verificar o dispositivo de entrada (Microfone). Mudar de 'Webcam Microfone' para 'Headset USB'.",
      en: "In Teams: Settings > Devices > check input device (Microphone). Change from 'Webcam Microphone' to 'USB Headset'.",
      es: "En Teams: Configuración > Dispositivos > comprobar dispositivo de entrada (Micrófono). Cambiar de 'Micrófono de webcam' a 'Auriculares USB'."
    },
    hint: {
      pt: "Configurações > Dispositivos > selecionar Headset USB.",
      en: "Settings > Devices > select USB Headset.",
      es: "Configuración > Dispositivos > seleccionar Auriculares USB."
    },
    level: "N1"
  },

  // --- SEGURANÇA ---
  {
    id: "fc-sec-1",
    category: "Segurança",
    topic: {"pt": "Resposta a Incidentes", "en": "Incident Response", "es": "Respuesta a Incidentes"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Usuário relata que abriu um anexo malicioso de e-mail (Phishing) e janelas estranhas começaram a abrir. Qual a PRIMEIRA ação do N1?",
      en: "Scenario: User reports opening a malicious email attachment (Phishing) and strange windows started opening. What is the FIRST action for L1?",
      es: "Escenario: El usuario informa que abrió un archivo adjunto de correo malicioso (Phishing) y empezaron a abrirse ventanas extrañas. ¿Cuál es la PRIMERA acción del N1?"
    },
    answer: {
      pt: "ISOLAR O COMPUTADOR DA REDE IMEDIATAMENTE!\nInstruir o usuário a puxar o cabo de rede e desativar o Wi-Fi para impedir que o malware se espalhe pela rede, alterar a senha corporativa e notificar o SOC/Segurança.",
      en: "ISOLATE THE COMPUTER FROM THE NETWORK IMMEDIATELY!\nInstruct user to pull the network cable and disable Wi-Fi to prevent malware from spreading, change corporate password, and notify SOC/Security.",
      es: "¡AISLAR EL ORDENADOR DE LA RED INMEDIATAMENTE!\nInstruir al usuario para que desconecte el cable de red y desactive el Wi-Fi para evitar que el malware se propague, cambiar la contraseña corporativa y notificar al SOC/Seguridad."
    },
    hint: {
      pt: "Isolamento físico imediato (desconectar cabo e Wi-Fi).",
      en: "Immediate physical isolation (disconnect cable and Wi-Fi).",
      es: "Aislamiento físico inmediato (desconectar cable y Wi-Fi)."
    },
    level: "N1"
  },
  {
    id: "fc-sec-2",
    category: "Segurança",
    topic: {"pt": "Certificados SSL/TLS", "en": "SSL/TLS Certificates", "es": "Certificados SSL/TLS"},
    type: "Troubleshooting",
    question: {
      pt: "Cenário: Ao acessar o portal interno da empresa no navegador, aparece NET::ERR_CERT_DATE_INVALID (Sua conexão não é privada). Qual a causa clássica?",
      en: "Scenario: When accessing the internal company portal in browser, NET::ERR_CERT_DATE_INVALID appears (Your connection is not private). Classic cause?",
      es: "Escenario: Al acceder al portal interno de la empresa en el navegador, aparece NET::ERR_CERT_DATE_INVALID (Su conexión no es privada). ¿Causa clásica?"
    },
    answer: {
      pt: "O Relógio/Data do computador está incorreto (ex: ano de 2021 por bateria CMOS gasta), fazendo com que todos os certificados SSL válidos pareçam expirados.\n\n🛠️ Solução: Ajustar e sincronizar data e hora automática.",
      en: "The computer's Clock/Date is incorrect (e.g., year 2021 due to dead CMOS battery), causing all valid SSL certificates to appear expired.\n\n🛠️ Solution: Adjust and synchronize automatic date and time.",
      es: "El reloj/fecha del ordenador es incorrecto (ej. año 2021 por batería CMOS agotada), provocando que todos los certificados SSL válidos parezcan caducados.\n\n🛠️ Solución: Ajustar y sincronizar fecha y hora automáticamente."
    },
    hint: {
      pt: "Relógio/Data do Windows incorreto.",
      en: "Incorrect Windows Clock/Date.",
      es: "Reloj/Fecha de Windows incorrecto."
    },
    level: "N1"
  }
];
