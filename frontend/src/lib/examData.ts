export type Language = "pt" | "en" | "es";

export interface ExamQuestion {
  id: string;
  domain: string;
  domainCode: string;
  question: Record<Language, string>;
  scenario?: Record<Language, string>;
  options: {
    id: "A" | "B" | "C" | "D";
    text: Record<Language, string>;
  }[];
  correctOption: "A" | "B" | "C" | "D";
  explanation: Record<Language, string>;
  objectiveRef: string;
}

export const COMPTIA_CORE1_EXAM: ExamQuestion[] = [
  {
    "id": "q-mob-1",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.1 Laptop Display",
    "scenario": {
      "pt": "A tela LCD de um notebook corporativo está extremamente escura. O usuário só consegue enxergar a área de trabalho se apontar uma lanterna diretamente contra o visor.",
      "en": "The LCD screen of a corporate laptop is extremely dim. The user can only barely see desktop icons when pointing a flashlight directly at the screen.",
      "es": "La pantalla LCD de una laptop corporativa está extremadamente oscura. El usuario solo puede ver el escritorio si apunta una linterna directamente contra la pantalla."
    },
    "question": {
      "pt": "Qual componente interno do display do notebook sofreu falha física?",
      "en": "Which internal component of the laptop display has suffered a hardware failure?",
      "es": "¿Qué componente interno de la pantalla de la laptop sufrió una falla física?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "Inversor de luz (Inverter) ou fita de retroiluminação (Backlight/LED).",
          "en": "Inverter board or Backlight LED strip.",
          "es": "Inversor de luz (Inverter) o tira de retroiluminación (Backlight/LED)."
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "A placa de vídeo dedicada (GPU) queimou por completo.",
          "en": "The dedicated graphics card (GPU) has completely burned out.",
          "es": "La tarjeta gráfica dedicada (GPU) se quemó por completo."
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "O cabo de força da tomada está fornecendo subtensão.",
          "en": "The AC power adapter is providing undervoltage.",
          "es": "El cable de alimentación está suministrando bajo voltaje."
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "A memória RAM do sistema está corrompida.",
          "en": "System RAM memory is corrupted.",
          "es": "La memoria RAM del sistema está dañada."
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "Se a imagem ainda é formada (visível com lanterna), a matriz LCD e a GPU estão funcionando. A ausência de iluminação é causada pela queima do inversor (em telas CCFL antigas) ou falha na fita de LEDs de retroiluminação (Backlight).",
      "en": "If the faint image is still visible under a flashlight, the LCD matrix and GPU are functioning properly. The lack of illumination is caused by a faulty inverter board or a burnt-out LED backlight strip.",
      "es": "Si la imagen aún se forma (visible con linterna), la matriz LCD y la GPU funcionan correctamente. La falta de iluminación se debe a una falla en el inversor o en la tira de LEDs de retroiluminación (Backlight)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.1: Mobile display components & inverters"
  },
  {
    "id": "q-mob-2",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.1 Laptop Hardware",
    "scenario": {
      "pt": "A carcaça plástica de um notebook corporativo está abrindo pelas laterais e o trackpad está estufado para cima, dificultando os cliques.",
      "en": "The outer casing of a corporate laptop is separating along the sides, and the trackpad is visibly bulging upward, making it hard to click.",
      "es": "La carcasa de una laptop corporativa se está abriendo por los lados y el trackpad está hinchado hacia arriba, dificultando hacer clics."
    },
    "question": {
      "pt": "Qual é a causa de segurança imediata desse problema e qual ação deve ser tomada?",
      "en": "What is the immediate safety cause of this issue, and what action must be taken?",
      "es": "¿Cuál es la causa de seguridad inmediata de este problema y qué acción debe tomarse?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "Superaquecimento do processador; aplicar nova pasta térmica.",
          "en": "CPU overheating; reapply thermal paste.",
          "es": "Sobrecalentamiento del procesador; aplicar nueva pasta térmica."
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Bateria de Íon de Lítio (Li-ion) estufada com risco de incêndio; desligar e substituir a bateria com descarte seguro.",
          "en": "Swollen Lithium-ion (Li-ion) battery posing fire hazard; power off and safely replace and dispose of the battery.",
          "es": "Batería de Iones de Litio (Li-ion) hinchada con riesgo de incendio; apagar y reemplazar la batería con desecho seguro."
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "O teclado mecânico desencaixou das travas plásticas.",
          "en": "Mechanical keyboard popped out of plastic retention tabs.",
          "es": "El teclado mecánico se desprendió de las pestañas de plástico."
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "O SSD NVMe expandiu por excesso de arquivos gravados.",
          "en": "The NVMe SSD expanded due to high disk storage usage.",
          "es": "El SSD NVMe se expandió por exceso de datos grabados."
        }
      }
    ],
    "correctOption": "B",
    "explanation": {
      "pt": "Baterias de lítio estufam devido a sobrecarga, degradação química ou calor excessivo, acumulando gases inflamáveis. O equipamento deve ser desligado imediatamente e a bateria descartada em local apropriado para evitar combustão química.",
      "en": "Lithium batteries swell due to overcharging, chemical degradation, or high temperatures, accumulating flammable gases. The device must be immediately shut down and the battery disposed of in accordance with hazardous material safety standards.",
      "es": "Las baterías de litio se hinchan debido a sobrecargas o degradación química acumulando gases inflamables. El equipo debe apagarse de inmediato y la batería debe desecharse en un lugar seguro para evitar riesgos de combustión."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.1: Battery swelling and safety handling"
  },
  {
    "id": "q-mob-3",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.2 Mobile Connectivity",
    "scenario": {
      "pt": "Um executivo precisa parear seu smartphone corporativo com um terminal de pagamento por aproximação no aeroporto a menos de 4 centímetros de distância.",
      "en": "An executive needs to pair a corporate smartphone with a contactless payment terminal at an airport within less than 4 centimeters of distance.",
      "es": "Un ejecutivo necesita vincular su teléfono inteligente corporativo con una terminal de pago por proximidad a menos de 4 centímetros de distancia."
    },
    "question": {
      "pt": "Qual tecnologia de comunicação sem fio de curtíssimo alcance foi projetada especificamente para pagamentos e tags de identificação?",
      "en": "Which very short-range wireless communication technology was specifically designed for contactless payments and identity tags?",
      "es": "¿Qué tecnología inalámbrica de muy corto alcance fue diseñada específicamente para pagos sin contacto y tarjetas de identificación?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "NFC (Near Field Communication)",
          "en": "NFC (Near Field Communication)",
          "es": "NFC (Near Field Communication)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Bluetooth Low Energy (BLE)",
          "en": "Bluetooth Low Energy (BLE)",
          "es": "Bluetooth Low Energy (BLE)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Wi-Fi Direct 5 GHz",
          "en": "Wi-Fi Direct 5 GHz",
          "es": "Wi-Fi Direct 5 GHz"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "Infravermelho (IR)",
          "en": "Infrared (IR)",
          "es": "Infrarrojo (IR)"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O NFC opera na frequência de 13.56 MHz com alcance máximo de 4 a 10 cm, sendo o padrão global seguro para pagamentos por aproximação (Apple Pay / Google Wallet) e crachás de acesso.",
      "en": "NFC operates at 13.56 MHz with a maximum range of 4 to 10 cm, making it the global standard for secure tap-to-pay systems (Apple Pay / Google Wallet) and access badges.",
      "es": "NFC opera en la frecuencia de 13.56 MHz con un alcance de 4 a 10 cm, siendo el estándar global para pagos sin contacto (Apple Pay / Google Wallet) y tarjetas de acceso."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.2: NFC, Bluetooth and Mobile Accessories"
  },
  {
    "id": "q-mob-4",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.1 Mobile Antenna",
    "scenario": {
      "pt": "Após a troca da tampa traseira de um notebook, o usuário relata que o sinal de Wi-Fi e Bluetooth ficou extremamente fraco, só funcionando se ele encostar o laptop no roteador.",
      "en": "After replacing the top lid of a laptop, the user reports that Wi-Fi and Bluetooth signals are extremely weak, only connecting when placed right beside the access point.",
      "es": "Después de cambiar la tapa de una laptop, el usuario informa que la señal de Wi-Fi y Bluetooth es muy débil y solo funciona si acerca la laptop al router."
    },
    "question": {
      "pt": "Qual erro comum de montagem interna causou essa degradação de sinal?",
      "en": "Which common internal reassembly mistake caused this severe signal loss?",
      "es": "¿Qué error común de ensamblaje interno causó esta pérdida de señal?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "Os cabos conectores da antena Wi-Fi que passam pela dobradiça até o topo da tampa não foram reconectados na placa WLAN.",
          "en": "The Wi-Fi antenna wires running through the hinge to the top display bezel were not reconnected to the WLAN card.",
          "es": "Los cables de la antena Wi-Fi que pasan por la bisagra hacia la parte superior no se conectaron a la tarjeta WLAN."
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "A placa-mãe entrou em modo de economia de energia permanente.",
          "en": "The motherboard entered permanent low-power state.",
          "es": "La placa madre entró en modo de ahorro de energía permanente."
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "O driver de áudio desativou o rádio de 2.4 GHz.",
          "en": "The audio driver disabled the 2.4 GHz radio.",
          "es": "El controlador de audio desactivó la radio de 2.4 GHz."
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "O SSD NVMe está gerando interferência eletromagnética.",
          "en": "The NVMe SSD is producing electromagnetic interference.",
          "es": "El SSD NVMe está generando interferencias electromagnéticas."
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "Em notebooks, as antenas de Wi-Fi e Bluetooth ficam localizadas na moldura superior da tela LCD para melhor recepção. Se os cabos de antena (conectores U.FL/MHF4) não forem plugados na placa mini-PCIe/M.2 WLAN, o alcance cai para centímetros.",
      "en": "In laptops, Wi-Fi/Bluetooth antenna leads are routed through hinges up to the top display bezel for optimal reception. If the tiny antenna connectors (U.FL/MHF4) are not attached to the M.2 WLAN card, wireless range drops dramatically.",
      "es": "En las laptops, los cables de antena Wi-Fi/Bluetooth van hasta el marco superior de la pantalla. Si no se conectan a la tarjeta WLAN M.2, el alcance inalámbrico se reduce a unos pocos centímetros."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.1: Wi-Fi antenna connector placement"
  },
  {
    "id": "q-mob-5",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.2 Connectors",
    "scenario": {
      "pt": "Um funcionário viaja com frequência e precisa de um cabo universal de alta velocidade que suporte carregamento de 100W, transmissão de vídeo 4K e dados em 40 Gbps com conector reversível.",
      "en": "A traveling employee needs a universal high-speed cable supporting 100W power charging, 4K display output, and 40 Gbps data transfers with a reversible connector.",
      "es": "Un empleado que viaja con frecuencia necesita un cable universal de alta velocidad que soporte 100W de carga, salida de video 4K y datos a 40 Gbps con conector reversible."
    },
    "question": {
      "pt": "Qual padrão físico e interface atende integralmente a esses requisitos?",
      "en": "Which physical connector and interface standard fully satisfies these requirements?",
      "es": "¿Qué estándar físico e interfaz cumple íntegramente con estos requisitos?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "USB-C com suporte a Thunderbolt 4",
          "en": "USB-C with Thunderbolt 4 support",
          "es": "USB-C con soporte Thunderbolt 4"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Micro-USB 2.0",
          "en": "Micro-USB 2.0",
          "es": "Micro-USB 2.0"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Lightning da Apple",
          "en": "Apple Lightning",
          "es": "Apple Lightning"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "Mini-HDMI tipo C",
          "en": "Mini-HDMI Type C",
          "es": "Mini-HDMI tipo C"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O conector USB-C reversível com protocolo Thunderbolt 3/4 suporta até 40 Gbps de dados, protocolos PCIe/DisplayPort para monitores 4K/8K e até 100W/240W de Power Delivery (PD).",
      "en": "Reversible USB-C with Thunderbolt 3/4 protocols delivers up to 40 Gbps bandwidth, PCIe/DisplayPort tunneling for 4K/8K external screens, and up to 100W/240W Power Delivery (PD).",
      "es": "El conector USB-C reversible con Thunderbolt 3/4 soporta hasta 40 Gbps de velocidad, salida de video DisplayPort para monitores 4K/8K y hasta 100W/240W de Power Delivery (PD)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.2: USB-C, Lightning and accessories"
  },
  {
    "id": "q-mob-6",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.3 Display Types",
    "scenario": {
      "pt": "Um designer gráfico necessita de um notebook com pretos perfeitos (contraste infinito), ângulos de visão máximos e menor espessura de tela.",
      "en": "A graphic designer requires a laptop featuring true black levels (infinite contrast), maximum viewing angles, and the thinnest possible display panel.",
      "es": "Un diseñador gráfico necesita una laptop con negros perfectos (contraste infinito), ángulos de visión máximos y el menor grosor de pantalla."
    },
    "question": {
      "pt": "Qual tecnologia de display não utiliza lâmpada de retroiluminação (Backlight) porque cada pixel individual emite sua própria luz?",
      "en": "Which display technology does not use a backlight because each individual pixel emits its own light?",
      "es": "¿Qué tecnología de pantalla no utiliza retroiluminación (Backlight) porque cada píxel individual emite su propia luz?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "OLED (Organic Light-Emitting Diode)",
          "en": "OLED (Organic Light-Emitting Diode)",
          "es": "OLED (Diodo Orgánico Emisor de Luz)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "LCD TN (Twisted Nematic)",
          "en": "LCD TN (Twisted Nematic)",
          "es": "LCD TN (Twisted Nematic)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "LCD IPS com CCFL",
          "en": "LCD IPS with CCFL",
          "es": "LCD IPS con CCFL"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "LCD VA com LED",
          "en": "LCD VA with LED",
          "es": "LCD VA con LED"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "Painéis OLED e AMOLED possuem pixels autoemissores orgânicos individuais. Ao exibir preto, o pixel é completamente desligado, gerando contraste infinito e eliminando a necessidade de camada de backlight.",
      "en": "OLED panels utilize self-emissive organic pixels. When displaying black, pixels turn completely off, resulting in infinite contrast ratios without requiring a separate backlight layer.",
      "es": "Los paneles OLED cuentan con píxeles autoemisores. Al mostrar negro, el píxel se apaga completamente, logrando contraste infinito y eliminando la necesidad de retroiluminación."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.3: Display types (OLED, LCD, IPS)"
  },
  {
    "id": "q-mob-7",
    "domain": "1.0 Mobile Devices",
    "domainCode": "1.1 Digitizer",
    "scenario": {
      "pt": "A tela de um tablet corporativo exibe o sistema operacional com imagem perfeita, mas o aparelho não responde a nenhum toque dos dedos do usuário.",
      "en": "A company tablet screen displays the operating system with crystal-clear image quality, but fails to register any finger touches or gestures.",
      "es": "La pantalla de una tablet corporativa muestra la imagen con perfecta claridad, pero no responde a ningún toque de los dedos del usuario."
    },
    "question": {
      "pt": "Qual camada física do display touchscreen é responsável por registrar e converter os toques em comandos na tela?",
      "en": "Which physical layer of the touchscreen assembly is responsible for detecting and converting touches into digital input?",
      "es": "¿Qué capa física de la pantalla táctil es responsable de registrar y convertir los toques en comandos?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "Digitalizador (Digitizer)",
          "en": "Digitizer",
          "es": "Digitalizador (Digitizer)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Placa T-Con",
          "en": "T-Con board",
          "es": "Placa T-Con"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Inversor CCFL",
          "en": "CCFL Inverter",
          "es": "Inversor CCFL"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "Camada antirreflexo (Polarizer)",
          "en": "Anti-glare polarizing film",
          "es": "Lámina polarizada antirreflejos"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O digitalizador (Digitizer) é a malha de vidro condutivo sensível ao toque que fica colada sobre o painel LCD/OLED, responsável por capturar o toque capacitivo dos dedos ou stylus e enviar ao processador.",
      "en": "The digitizer is the conductive glass touch grid bonded over the display panel, responsible for translating analog touch or stylus input into digital coordinates.",
      "es": "El digitalizador (Digitizer) es la lámina de vidrio conductora sobre la pantalla que captura los toques capacitivos de los dedos o lápiz óptico y los envía al procesador."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 1.1: Digitizer functionality"
  },
  {
    "id": "q-net-1",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "Um analista de suporte N1 está configurando regras em um firewall corporativo para permitir que clientes de e-mail enviem mensagens de forma segura e autenticada.",
      "en": "A Tier 1 technician is configuring corporate firewall rules to allow email clients to send outbound messages with authentication and encryption.",
      "es": "Un analista de soporte N1 está configurando reglas de firewall para permitir que los clientes de correo envíen mensajes de forma segura y autenticada."
    },
    "question": {
      "pt": "Qual das seguintes portas padrão TCP e protocolo devem ser liberados para envio seguro de e-mails via SMTP com criptografia TLS/SSL?",
      "en": "Which default TCP port and protocol should be opened for secure email transmission using SMTP over TLS/SSL?",
      "es": "¿Cuál de los siguientes puertos estándar TCP y protocolo deben habilitarse para el envío seguro de correos mediante SMTP con TLS/SSL?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "Porta 25 (SMTP sem criptografia)",
          "en": "Port 25 (Unencrypted SMTP)",
          "es": "Puerto 25 (SMTP sin cifrado)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Porta 110 (POP3)",
          "en": "Port 110 (POP3)",
          "es": "Puerto 110 (POP3)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Porta 587 (Secure SMTP / SMTPS Submission)",
          "en": "Port 587 (Secure SMTP / SMTPS Submission)",
          "es": "Puerto 587 (Secure SMTP / SMTPS Submission)"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "Porta 143 (IMAP)",
          "en": "Port 143 (IMAP)",
          "es": "Puerto 143 (IMAP)"
        }
      }
    ],
    "correctOption": "C",
    "explanation": {
      "pt": "A porta TCP 587 (ou 465) é a porta padrão para envio de e-mails com autenticação e criptografia TLS/STARTTLS. A porta 25 é usada para relay não criptografado entre servidores. As portas 110 e 143 são usadas para recebimento (POP3/IMAP).",
      "en": "Port 587 (or 465) is standard for secure authenticated client email submission via TLS/STARTTLS. Port 25 is legacy unencrypted server-to-server relay. Ports 110 and 143 are incoming POP3/IMAP.",
      "es": "El puerto TCP 587 (o 465) es el estándar para envío de correos con cifrado TLS/STARTTLS. El puerto 25 es para relay no cifrado entre servidores y los puertos 110 y 143 son de recepción (POP3/IMAP)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: TCP/UDP ports and protocols"
  },
  {
    "id": "q-net-2",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "Um técnico precisa gerenciar remotamente roteadores e servidores Linux de forma segura através de uma sessão de terminal criptografada por linha de comando.",
      "en": "A technician needs to securely manage remote routers and Linux servers via an encrypted command-line terminal session.",
      "es": "Un técnico necesita administrar de forma remota routers y servidores Linux mediante una sesión de terminal cifrada por línea de comandos."
    },
    "question": {
      "pt": "Qual protocolo e porta padrão TCP atendem a esse requisito de segurança substituindo o legado Telnet?",
      "en": "Which protocol and default TCP port satisfy this security requirement, replacing legacy unencrypted Telnet?",
      "es": "¿Qué protocolo y puerto estándar TCP cumplen este requisito de seguridad reemplazando al legado Telnet?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "SSH (Secure Shell) na porta 22",
          "en": "SSH (Secure Shell) on port 22",
          "es": "SSH (Secure Shell) en el puerto 22"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "RDP (Remote Desktop Protocol) na porta 3389",
          "en": "RDP (Remote Desktop Protocol) on port 3389",
          "es": "RDP (Remote Desktop Protocol) en el puerto 3389"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Telnet na porta 23",
          "en": "Telnet on port 23",
          "es": "Telnet en el puerto 23"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "HTTPS na porta 443",
          "en": "HTTPS on port 443",
          "es": "HTTPS en el puerto 443"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O SSH opera na porta TCP 22 e fornece sessões de linha de comando totalmente criptografadas, substituindo com segurança o Telnet (porta 23) que enviava texto plano.",
      "en": "SSH operates on TCP port 22, providing fully encrypted terminal sessions to replace cleartext Telnet (port 23).",
      "es": "SSH opera en el puerto TCP 22 y proporciona sesiones de terminal totalmente cifradas, reemplazando con seguridad a Telnet (puerto 23)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: Ports (SSH vs Telnet)"
  },
  {
    "id": "q-net-3",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "O analista de help desk precisa conectar remotamente na área de trabalho gráfica de um servidor Windows para prestar suporte ao usuário.",
      "en": "A help desk technician needs to remotely connect to the graphical desktop of a Windows Server to provide end-user support.",
      "es": "El analista de soporte necesita conectarse de forma remota al escritorio gráfico de un servidor Windows para dar soporte al usuario."
    },
    "question": {
      "pt": "Qual protocolo nativo da Microsoft e porta TCP padrão são utilizados para conexões de Remote Desktop?",
      "en": "Which native Microsoft protocol and default TCP port are used for Remote Desktop graphical connections?",
      "es": "¿Qué protocolo nativo de Microsoft y puerto TCP estándar se utilizan para conexiones de escritorio remoto?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "RDP (Remote Desktop Protocol) na porta TCP 3389",
          "en": "RDP (Remote Desktop Protocol) on TCP port 3389",
          "es": "RDP (Remote Desktop Protocol) en el puerto TCP 3389"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "VNC na porta TCP 5900",
          "en": "VNC on TCP port 5900",
          "es": "VNC en el puerto TCP 5900"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "SSH na porta TCP 22",
          "en": "SSH on TCP port 22",
          "es": "SSH en el puerto TCP 22"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "SMB na porta TCP 445",
          "en": "SMB on TCP port 445",
          "es": "SMB en el puerto TCP 445"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O RDP (Remote Desktop Protocol) da Microsoft escuta nativamente na porta TCP 3389 para sessões de gerenciamento gráfico remoto.",
      "en": "Microsoft Remote Desktop Protocol (RDP) listens natively on TCP port 3389 for graphical remote administrative sessions.",
      "es": "El protocolo RDP (Remote Desktop Protocol) de Microsoft escucha nativamente en el puerto TCP 3389 para administración gráfica remota."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: RDP Port 3389"
  },
  {
    "id": "q-net-4",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "Durante o diagnóstico de rede, o técnico nota que a máquina não consegue resolver nomes como 'empresa.com.br' para endereços IP.",
      "en": "During network troubleshooting, a technician finds that a workstation cannot resolve domain names like 'company.com' into IP addresses.",
      "es": "Durante el diagnóstico de red, el técnico nota que el equipo no puede resolver nombres de dominio como 'empresa.com' a direcciones IP."
    },
    "question": {
      "pt": "Qual protocolo e porta padrão UDP/TCP são responsáveis pela resolução de nomes de domínio na internet?",
      "en": "Which protocol and default UDP/TCP port are responsible for domain name resolution on IP networks?",
      "es": "¿Qué protocolo y puerto estándar UDP/TCP son responsables de la resolución de nombres de dominio en la red?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "DNS (Domain Name System) na porta 53",
          "en": "DNS (Domain Name System) on port 53",
          "es": "DNS (Domain Name System) en el puerto 53"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "DHCP na porta 67/68",
          "en": "DHCP on ports 67/68",
          "es": "DHCP en el puerto 67/68"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "LDAP na porta 389",
          "en": "LDAP on port 389",
          "es": "LDAP en el puerto 389"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "NTP na porta 123",
          "en": "NTP on port 123",
          "es": "NTP en el puerto 123"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O DNS opera na porta 53 (principalmente UDP para consultas rápidas e TCP para transferências de zona) convertendo FQDNs em endereços IP.",
      "en": "DNS operates on port 53 (UDP for queries, TCP for zone transfers) resolving human-readable hostnames into numerical IP addresses.",
      "es": "DNS opera en el puerto 53 (UDP para consultas y TCP para transferencias) resolviendo nombres de dominio a direcciones IP."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: DNS Port 53"
  },
  {
    "id": "q-net-5",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "Um técnico de TI está configurando uma pasta compartilhada corporativa (Network Share) no Windows Server para que as estações acessem arquivos.",
      "en": "An IT technician is configuring a shared folder (Network Share) on a Windows Server so that client machines can access files.",
      "es": "Un técnico de TI está configurando una carpeta compartida en Windows Server para que las estaciones accedan a archivos en red."
    },
    "question": {
      "pt": "Qual protocolo de compartilhamento de arquivos em rede e porta TCP são utilizados nativamente no ecossistema Windows?",
      "en": "Which network file-sharing protocol and TCP port are natively used in the Windows ecosystem?",
      "es": "¿Qué protocolo de carpetas compartidas y puerto TCP se utilizan nativamente en el ecosistema Windows?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "SMB (Server Message Block) na porta TCP 445",
          "en": "SMB (Server Message Block) on TCP port 445",
          "es": "SMB (Server Message Block) en el puerto TCP 445"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "FTP na porta TCP 21",
          "en": "FTP on TCP port 21",
          "es": "FTP en el puerto TCP 21"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "TFTP na porta UDP 69",
          "en": "TFTP on UDP port 69",
          "es": "TFTP en el puerto UDP 69"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "NFS na porta TCP 2049",
          "en": "NFS on TCP port 2049",
          "es": "NFS en el puerto TCP 2049"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O SMB (Server Message Block / CIFS) opera na porta TCP 445 diretamente sobre TCP/IP para compartilhamento de pastas, arquivos e impressoras no Windows.",
      "en": "SMB (Server Message Block) operates over TCP port 445 for native Windows file and printer sharing.",
      "es": "SMB (Server Message Block) opera en el puerto TCP 445 para compartir carpetas, archivos e impresoras en Windows."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: SMB Port 445"
  },
  {
    "id": "q-net-6",
    "domain": "2.0 Networking",
    "domainCode": "2.1 Ports & Protocols",
    "scenario": {
      "pt": "A equipe de redes precisa monitorar em tempo real o tráfego, uso de CPU e estado das portas de 50 switches gerenciáveis através de um painel central.",
      "en": "A network team needs to monitor traffic, CPU load, and port states across 50 managed switches in real time from a centralized dashboard.",
      "es": "El equipo de redes necesita monitorear el tráfico, uso de CPU y estado de puertos de 50 switches en tiempo real desde un panel central."
    },
    "question": {
      "pt": "Qual protocolo e porta UDP são o padrão da indústria para gerenciamento e monitoramento de dispositivos de rede?",
      "en": "Which protocol and UDP ports are the industry standard for monitoring and managing network hardware devices?",
      "es": "¿Qué protocolo y puerto UDP son el estándar de la industria para monitoreo y gestión de dispositivos de red?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "SNMP (Simple Network Management Protocol) nas portas UDP 161/162",
          "en": "SNMP (Simple Network Management Protocol) on UDP ports 161/162",
          "es": "SNMP (Simple Network Management Protocol) en los puertos UDP 161/162"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "Syslog na porta UDP 514",
          "en": "Syslog on UDP port 514",
          "es": "Syslog en el puerto UDP 514"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "LDAP na porta TCP 389",
          "en": "LDAP on TCP port 389",
          "es": "LDAP en el puerto TCP 389"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "NTP na porta UDP 123",
          "en": "NTP on UDP port 123",
          "es": "NTP en el puerto UDP 123"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O SNMP opera na porta UDP 161 (consultas/polling) e UDP 162 (SNMP Traps / alertas de eventos) para coletar métricas de hardware de switches, roteadores e servidores.",
      "en": "SNMP uses UDP port 161 (polling/queries) and UDP port 162 (traps/alerts) to monitor network device health and bandwidth.",
      "es": "SNMP opera en el puerto UDP 161 (consultas) y UDP 162 (alertas/traps) para recopilar métricas de hardware de switches y servidores."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.1: SNMP Ports 161/162"
  },
  {
    "id": "q-net-7",
    "domain": "2.0 Networking",
    "domainCode": "2.2 IP Addressing",
    "scenario": {
      "pt": "Um usuário relata que não consegue acessar a rede corporativa nem a internet. O técnico executa 'ipconfig' e observa o endereço IP 169.254.10.45 com máscara 255.255.0.0.",
      "en": "A user reports losing connection to both the local network and internet. The technician runs 'ipconfig' and finds IP address 169.254.10.45 with subnet mask 255.255.0.0.",
      "es": "Un usuario informa que no puede acceder a la red ni a internet. El técnico ejecuta 'ipconfig' y observa la IP 169.254.10.45 con máscara 255.255.0.0."
    },
    "question": {
      "pt": "Qual é a causa mais provável para a estação ter obtido esse endereço IP específico?",
      "en": "What is the most likely reason the workstation received this specific IP address?",
      "es": "¿Cuál es la causa más probable de que la estación haya obtenido esta dirección IP específica?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "O servidor DNS corporativo está inacessível ou corrompido.",
          "en": "The corporate DNS server is unreachable or corrupt.",
          "es": "El servidor DNS corporativo es inaccesible o está dañado."
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "A estação não conseguiu se comunicar com o servidor DHCP e utilizou APIPA.",
          "en": "The client failed to reach a DHCP server and assigned an APIPA link-local address.",
          "es": "La estación no pudo comunicarse con el servidor DHCP y utilizó APIPA."
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "O computador foi infectado por malware que alterou o gateway padrão.",
          "en": "The computer was infected with malware altering default gateway.",
          "es": "La computadora fue infectada por malware que alteró la puerta de enlace."
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "A placa de rede está configurada com IP estático inválido.",
          "en": "The network interface card is configured with an invalid static IP.",
          "es": "La tarjeta de red está configurada con una IP estática no válida."
        }
      }
    ],
    "correctOption": "B",
    "explanation": {
      "pt": "Endereços na faixa 169.254.0.1 a 169.254.255.254 são gerados pelo APIPA (Automatic Private IP Addressing) quando o cliente Windows falha em obter resposta do servidor DHCP (processo DORA).",
      "en": "Addresses in the range 169.254.0.1 - 169.254.255.254 are self-assigned by APIPA when the client fails the DHCP DORA discovery process.",
      "es": "Las direcciones 169.254.x.x son generadas automáticamente por APIPA cuando el equipo cliente no recibe respuesta del servidor DHCP (proceso DORA)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.2: IP Addressing & DHCP Concepts"
  },
  {
    "id": "q-net-8",
    "domain": "2.0 Networking",
    "domainCode": "2.2 DNS Records",
    "scenario": {
      "pt": "A equipe de segurança da informação precisa configurar registros DNS para impedir que atacantes forjem e-mails usando o domínio da empresa (Anti-Spoofing e Phishing).",
      "en": "An information security team must configure DNS records to prevent attackers from spoofing emails from the corporate domain (Anti-Phishing & Spoofing).",
      "es": "El equipo de seguridad debe configurar registros DNS para evitar que atacantes envíen correos falsos usando el dominio de la empresa (Anti-Spoofing)."
    },
    "question": {
      "pt": "Quais são os 3 mecanismos de segurança baseados em registros DNS do tipo TXT recomendados para autenticação de e-mail?",
      "en": "Which three DNS TXT-based authentication frameworks are recommended to prevent email spoofing?",
      "es": "¿Cuáles son los 3 mecanismos de seguridad basados en registros DNS tipo TXT recomendados para autenticación de correo?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "SPF, DKIM e DMARC",
          "en": "SPF, DKIM, and DMARC",
          "es": "SPF, DKIM y DMARC"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "A, AAAA e CNAME",
          "en": "A, AAAA, and CNAME",
          "es": "A, AAAA y CNAME"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "DHCP, DNS e WINS",
          "en": "DHCP, DNS, and WINS",
          "es": "DHCP, DNS y WINS"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "MX, PTR e SOA",
          "en": "MX, PTR, and SOA",
          "es": "MX, PTR y SOA"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail) e DMARC utilizam registros DNS TXT para validar remetentes autorizados, assinar chaves públicas criptográficas e definir políticas contra falsificação de e-mails.",
      "en": "SPF, DKIM, and DMARC use DNS TXT records to validate authorized mail servers, provide cryptographic signatures, and enforce policies against domain spoofing.",
      "es": "SPF, DKIM y DMARC utilizan registros DNS TXT para validar remitentes autorizados, firmar criptográficamente correos y definir políticas contra la suplantación de identidad."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.2: DNS Records (SPF, DKIM, DMARC)"
  },
  {
    "id": "q-net-9",
    "domain": "2.0 Networking",
    "domainCode": "2.3 Network Hardware",
    "scenario": {
      "pt": "Um técnico precisa instalar 20 telefones IP (VoIP) e 5 câmeras de segurança no teto do escritório sem precisar puxar fiação elétrica para cada aparelho.",
      "en": "A technician needs to install 20 VoIP desk phones and 5 ceiling security cameras without running dedicated electrical power lines to each device.",
      "es": "Un técnico necesita instalar 20 teléfonos VoIP y 5 cámaras de seguridad en el techo sin instalar tomas de corriente dedicadas para cada uno."
    },
    "question": {
      "pt": "Qual recurso de switch Ethernet fornece energia elétrica e dados simultaneamente através do próprio cabo de rede de par trançado?",
      "en": "Which Ethernet switch technology delivers DC electrical power and data simultaneously across twisted-pair copper cables?",
      "es": "¿Qué tecnología de switch Ethernet suministra energía eléctrica y datos simultáneamente a través del cable de par trenzado?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "PoE (Power over Ethernet - IEEE 802.3af/at/bt)",
          "en": "PoE (Power over Ethernet - IEEE 802.3af/at/bt)",
          "es": "PoE (Power over Ethernet - IEEE 802.3af/at/bt)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "QoS (Quality of Service)",
          "en": "QoS (Quality of Service)",
          "es": "QoS (Quality of Service)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "VLAN Trunking (802.1Q)",
          "en": "VLAN Trunking (802.1Q)",
          "es": "VLAN Trunking (802.1Q)"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "STP (Spanning Tree Protocol)",
          "en": "STP (Spanning Tree Protocol)",
          "es": "STP (Spanning Tree Protocol)"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O PoE (Power over Ethernet) permite que switches compatíveis enviem corrente contínua pelos condutores do cabo Cat5e/Cat6, alimentando APs, telefones VoIP e câmeras IP sem necessidade de tomadas elétricas dedicadas.",
      "en": "Power over Ethernet (PoE) allows network switches to supply DC electrical current through Cat5e/Cat6 twisted-pair cabling directly to VoIP phones, APs, and cameras.",
      "es": "Power over Ethernet (PoE) permite a los switches compatibles transmitir corriente continua a través de cables Cat5e/Cat6 para alimentar teléfonos VoIP, APs y cámaras."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.3: PoE Switch & Injectors"
  },
  {
    "id": "q-net-10",
    "domain": "2.0 Networking",
    "domainCode": "2.3 VLAN Concepts",
    "scenario": {
      "pt": "Para evitar que o tráfego do departamento Financeiro seja interceptado por computadores do departamento de Marketing no mesmo switch físico, o que deve ser configurado?",
      "en": "To prevent Finance department traffic from being intercepted by workstations in the Marketing department on the same physical switch, what should be configured?",
      "es": "Para evitar que el tráfico de Finanzas sea interceptado por equipos de Marketing conectados al mismo switch físico, ¿qué debe configurarse?"
    },
    "question": {
      "pt": "Qual recurso de Camada 2 (Data Link) permite segmentar logicamente uma rede local física em domínios de broadcast isolados?",
      "en": "Which Layer 2 (Data Link) feature logically segments a physical local area network into isolated broadcast domains?",
      "es": "¿Qué función de Capa 2 permite segmentar lógicamente una red local física en dominios de difusión (broadcast) aislados?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "VLAN (Virtual Local Area Network - IEEE 802.1Q)",
          "en": "VLAN (Virtual Local Area Network - IEEE 802.1Q)",
          "es": "VLAN (Virtual Local Area Network - IEEE 802.1Q)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "NAT (Network Address Translation)",
          "en": "NAT (Network Address Translation)",
          "es": "NAT (Network Address Translation)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "Port Forwarding",
          "en": "Port Forwarding",
          "es": "Redireccionamiento de Puertos"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "DHCP Relay",
          "en": "DHCP Relay",
          "es": "DHCP Relay"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "VLANs (802.1Q) dividem logicamente switches físicos em redes virtuais isoladas, aumentando a segurança e reduzindo o tráfego de broadcast entre departamentos.",
      "en": "VLANs (802.1Q) logically subdivide physical switches into isolated virtual networks, boosting security and shrinking broadcast domains between departments.",
      "es": "Las VLANs (802.1Q) subdividen lógicamente switches físicos en redes virtuales independientes, aislando dominios de difusión y mejorando la seguridad."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.2: VLAN concepts and segmentation"
  },
  {
    "id": "q-net-11",
    "domain": "2.0 Networking",
    "domainCode": "2.4 Wireless Standards",
    "scenario": {
      "pt": "Uma empresa está modernizando sua infraestrutura Wi-Fi para alta densidade no escritório e comprou Access Points compatíveis com Wi-Fi 6.",
      "en": "A company is upgrading its office Wi-Fi infrastructure for high-density environments and purchased Wi-Fi 6 compatible Access Points.",
      "es": "Una empresa está modernizando su red Wi-Fi para entornos de alta densidad adquiriendo Puntos de Acceso compatibles con Wi-Fi 6."
    },
    "question": {
      "pt": "Qual é a designação do padrão IEEE oficial correspondente ao Wi-Fi 6 e quais frequências ele opera?",
      "en": "What is the official IEEE standard designation for Wi-Fi 6 and which frequency bands does it support?",
      "es": "¿Cuál es la designación oficial del estándar IEEE para Wi-Fi 6 y en qué bandas de frecuencia opera?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "802.11ac operando apenas em 5 GHz",
          "en": "802.11ac operating exclusively on 5 GHz",
          "es": "802.11ac operando exclusivamente en 5 GHz"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "802.11ax operando em 2.4 GHz e 5 GHz (e 6 GHz no 6E)",
          "en": "802.11ax operating on 2.4 GHz and 5 GHz (and 6 GHz in 6E)",
          "es": "802.11ax operando en 2.4 GHz y 5 GHz (y 6 GHz en 6E)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "802.11n operando apenas em 2.4 GHz",
          "en": "802.11n operating exclusively on 2.4 GHz",
          "es": "802.11n operando exclusivamente en 2.4 GHz"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "802.11g operando em 5 GHz",
          "en": "802.11g operating on 5 GHz",
          "es": "802.11g operando en 5 GHz"
        }
      }
    ],
    "correctOption": "B",
    "explanation": {
      "pt": "O Wi-Fi 6 é o padrão IEEE 802.11ax, trazendo melhorias como OFDMA e MU-MIMO operando em 2.4 GHz e 5 GHz. O 802.11ac é o Wi-Fi 5 (apenas 5GHz) e o 802.11n é o Wi-Fi 4.",
      "en": "Wi-Fi 6 is IEEE 802.11ax, supporting OFDMA, 1024-QAM, and bi-directional MU-MIMO across both 2.4 GHz and 5 GHz (and 6 GHz for Wi-Fi 6E).",
      "es": "Wi-Fi 6 es el estándar IEEE 802.11ax, con soporte para OFDMA y MU-MIMO en frecuencias de 2.4 GHz y 5 GHz (y 6 GHz en Wi-Fi 6E)."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.4: Wireless Standards"
  },
  {
    "id": "q-net-12",
    "domain": "2.0 Networking",
    "domainCode": "2.5 Network Services",
    "scenario": {
      "pt": "Uma empresa possui uma única conexão de internet com um endereço IPv4 público estático (203.0.113.1) fornecido pelo provedor, mas 200 computadores internos na faixa 192.168.1.0/24 precisam navegar na web simultaneamente.",
      "en": "A company has a single broadband connection with one public IPv4 address (203.0.113.1), but 200 internal workstations on 192.168.1.0/24 need simultaneous web access.",
      "es": "Una empresa tiene una única conexión con una dirección IPv4 pública (203.0.113.1), pero 200 computadoras en 192.168.1.0/24 necesitan navegar simultáneamente."
    },
    "question": {
      "pt": "Qual tecnologia implementada no roteador/firewall traduz múltiplos endereços IP privados internos para o único IP público usando portas dinâmicas?",
      "en": "Which feature on the router/firewall translates multiple private internal IPs to a single public IP using ephemeral dynamic port numbers?",
      "es": "¿Qué tecnología en el router/firewall traduce múltiples IPs privadas internas a una sola IP pública utilizando puertos dinámicos?"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "pt": "PAT / NAT com Sobrecarga (Port Address Translation)",
          "en": "PAT / NAT Overload (Port Address Translation)",
          "es": "PAT / NAT con Sobrecarga (Port Address Translation)"
        }
      },
      {
        "id": "B",
        "text": {
          "pt": "DHCP Scope",
          "en": "DHCP Scope",
          "es": "Ámbito DHCP (DHCP Scope)"
        }
      },
      {
        "id": "C",
        "text": {
          "pt": "DNS Forwarder",
          "en": "DNS Forwarder",
          "es": "Reenviador DNS"
        }
      },
      {
        "id": "D",
        "text": {
          "pt": "Static Route",
          "en": "Static Route",
          "es": "Ruta Estática"
        }
      }
    ],
    "correctOption": "A",
    "explanation": {
      "pt": "O PAT (Port Address Translation / NAT Overload) mapeia milhares de conexões internas privadas para um único IP público associando cada sessão a uma porta TCP/UDP efêmera única.",
      "en": "Port Address Translation (PAT / NAT Overload) maps multiple private IP sockets to a single public IP address by assigning unique ephemeral TCP/UDP port numbers.",
      "es": "PAT (Port Address Translation / NAT Overload) asigna múltiples direcciones IP privadas a una sola IP pública mediante puertos TCP/UDP efímeros únicos."
    },
    "objectiveRef": "CompTIA 220-1201 Obj 2.2: NAT and PAT concepts"
  }
,
  {
  "id": "q-hw-1",
  "domain": "3.0 Hardware",
  "domainCode": "3.1 RAM",
  "question": {
    "pt": "Qual formato de módulo de memória RAM é tipicamente utilizado em laptops?",
    "en": "Which RAM module form factor is typically used in laptops?",
    "es": "¿Qué factor de forma de módulo de memoria RAM se utiliza típicamente en computadoras portátiles?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "DIMM",
        "en": "DIMM",
        "es": "DIMM"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "SODIMM",
        "en": "SODIMM",
        "es": "SODIMM"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "MicroDIMM",
        "en": "MicroDIMM",
        "es": "MicroDIMM"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "SIMM",
        "en": "SIMM",
        "es": "SIMM"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "SODIMM (Small Outline Dual In-line Memory Module) é um tipo de memória projetado especificamente para sistemas com espaço limitado, como laptops e computadores de pequeno formato.",
    "en": "SODIMM (Small Outline Dual In-line Memory Module) is a type of computer memory built using integrated circuits designed for systems with limited space, such as laptops.",
    "es": "SODIMM (Small Outline Dual In-line Memory Module) es un tipo de memoria diseñada para sistemas con espacio limitado, como las computadoras portátiles."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.1: Explain basic cable types and their connectors, features, and purposes."
},
  {
  "id": "q-hw-2",
  "domain": "3.0 Hardware",
  "domainCode": "3.1 RAM",
  "scenario": {
    "pt": "Um administrador está configurando um novo servidor de banco de dados que requer máxima integridade dos dados e proteção contra corrupção silenciosa.",
    "en": "An administrator is configuring a new database server that requires maximum data integrity and protection against silent data corruption.",
    "es": "Un administrador está configurando un nuevo servidor de base de datos que requiere máxima integridad y protección contra la corrupción de datos."
  },
  "question": {
    "pt": "Qual tipo de memória RAM deve ser instalado neste servidor?",
    "en": "Which type of RAM should be installed in this server?",
    "es": "¿Qué tipo de memoria RAM se debe instalar en este servidor?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "VRAM",
        "en": "VRAM",
        "es": "VRAM"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Non-ECC RAM",
        "en": "Non-ECC RAM",
        "es": "RAM Non-ECC"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "ECC RAM",
        "en": "ECC RAM",
        "es": "RAM ECC"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "SRAM",
        "en": "SRAM",
        "es": "SRAM"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "A memória ECC (Error-Correcting Code) pode detectar e corrigir os tipos mais comuns de corrupção de dados internos. É essencial para servidores de banco de dados e sistemas críticos.",
    "en": "ECC (Error-Correcting Code) memory can detect and correct the most common kinds of internal data corruption. It is essential for servers and critical systems.",
    "es": "La memoria ECC (Error-Correcting Code) puede detectar y corregir los tipos más comunes de corrupción de datos internos. Es esencial para servidores."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.1"
},
  {
  "id": "q-hw-3",
  "domain": "3.0 Hardware",
  "domainCode": "3.2 Storage",
  "question": {
    "pt": "Qual das seguintes tecnologias de armazenamento oferece a maior velocidade de transferência de dados, comunicando-se diretamente através do barramento PCIe?",
    "en": "Which of the following storage technologies offers the highest data transfer speed by communicating directly over the PCIe bus?",
    "es": "¿Cuál de las siguientes tecnologías de almacenamiento ofrece la mayor velocidad transfiriendo datos directamente a través del bus PCIe?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "SATA III SSD",
        "en": "SATA III SSD",
        "es": "SSD SATA III"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "NVMe M.2 SSD",
        "en": "NVMe M.2 SSD",
        "es": "SSD NVMe M.2"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "SAS HDD",
        "en": "SAS HDD",
        "es": "HDD SAS"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "USB 3.0 Flash Drive",
        "en": "USB 3.0 Flash Drive",
        "es": "Unidad Flash USB 3.0"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Os SSDs NVMe M.2 utilizam o barramento PCIe para oferecer velocidades significativamente mais altas do que as unidades baseadas em SATA III, que são limitadas a cerca de 600 MB/s.",
    "en": "NVMe M.2 SSDs utilize the PCIe bus to offer significantly higher speeds than SATA III-based drives, which are limited to about 600 MB/s.",
    "es": "Los SSD NVMe M.2 utilizan el bus PCIe para ofrecer velocidades significativamente más altas que las unidades basadas en SATA III (límite de ~600 MB/s)."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.2"
},
  {
  "id": "q-hw-4",
  "domain": "3.0 Hardware",
  "domainCode": "3.2 Storage",
  "scenario": {
    "pt": "Um usuário precisa de uma configuração de armazenamento que forneça redundância total. Ele possui apenas dois discos rígidos idênticos.",
    "en": "A user needs a storage configuration that provides full redundancy. They only have two identical hard drives.",
    "es": "Un usuario necesita una configuración de almacenamiento que proporcione redundancia total y solo tiene dos discos duros idénticos."
  },
  "question": {
    "pt": "Qual nível de RAID deve ser configurado?",
    "en": "Which RAID level should be configured?",
    "es": "¿Qué nivel de RAID se debe configurar?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "RAID 0",
        "en": "RAID 0",
        "es": "RAID 0"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "RAID 1",
        "en": "RAID 1",
        "es": "RAID 1"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "RAID 5",
        "en": "RAID 5",
        "es": "RAID 5"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "RAID 10",
        "en": "RAID 10",
        "es": "RAID 10"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "RAID 1 (Espelhamento) usa dois discos e grava exatamente os mesmos dados em ambos, fornecendo redundância completa (tolerância a falhas de um disco).",
    "en": "RAID 1 (Mirroring) uses two disks and writes exactly the same data to both, providing complete redundancy (fault tolerance of one disk).",
    "es": "RAID 1 (Espejo) usa dos discos y escribe los mismos datos en ambos, proporcionando redundancia completa."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.2"
},
  {
  "id": "q-hw-5",
  "domain": "3.0 Hardware",
  "domainCode": "3.2 Storage",
  "question": {
    "pt": "Qual nível de RAID utiliza striping (divisão de dados) com paridade distribuída e requer no mínimo 3 discos?",
    "en": "Which RAID level uses striping with distributed parity and requires a minimum of 3 disks?",
    "es": "¿Qué nivel de RAID utiliza división de datos (striping) con paridad distribuida y requiere un mínimo de 3 discos?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "RAID 0",
        "en": "RAID 0",
        "es": "RAID 0"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "RAID 1",
        "en": "RAID 1",
        "es": "RAID 1"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "RAID 5",
        "en": "RAID 5",
        "es": "RAID 5"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "RAID 10",
        "en": "RAID 10",
        "es": "RAID 10"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "RAID 5 espalha os dados e a paridade por todos os discos no array, requerendo pelo menos três discos. Permite a falha de um disco sem perda de dados.",
    "en": "RAID 5 spreads data and parity across all disks in the array, requiring at least three disks. It allows one disk to fail without data loss.",
    "es": "RAID 5 distribuye datos y paridad en todos los discos del array, requiriendo al menos 3 discos."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.2"
},
  {
  "id": "q-hw-6",
  "domain": "3.0 Hardware",
  "domainCode": "3.3 Motherboards",
  "question": {
    "pt": "Qual slot de expansão da placa-mãe é usado tipicamente para instalar uma placa de vídeo (GPU) dedicada de alto desempenho?",
    "en": "Which motherboard expansion slot is typically used to install a dedicated high-performance Graphics Processing Unit (GPU)?",
    "es": "¿Qué ranura de expansión de la placa base se usa típicamente para instalar una tarjeta de video (GPU) de alto rendimiento?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "PCIe x1",
        "en": "PCIe x1",
        "es": "PCIe x1"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "PCI",
        "en": "PCI",
        "es": "PCI"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "PCIe x16",
        "en": "PCIe x16",
        "es": "PCIe x16"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "SATA",
        "en": "SATA",
        "es": "SATA"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "O slot PCIe x16 (Peripheral Component Interconnect Express x16) oferece a maior largura de banda para placas de expansão, sendo o padrão para GPUs.",
    "en": "The PCIe x16 (Peripheral Component Interconnect Express x16) slot offers the highest bandwidth for expansion cards, making it the standard for GPUs.",
    "es": "La ranura PCIe x16 ofrece el mayor ancho de banda para tarjetas de expansión, siendo el estándar para las GPU."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.3"
},
  {
  "id": "q-hw-7",
  "domain": "3.0 Hardware",
  "domainCode": "3.3 Motherboards",
  "question": {
    "pt": "Qual tipo de soquete de CPU apresenta pinos na própria placa-mãe em vez de no processador?",
    "en": "Which type of CPU socket features pins on the motherboard itself rather than on the processor?",
    "es": "¿Qué tipo de zócalo de CPU presenta pines en la propia placa base en lugar de en el procesador?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "PGA (Pin Grid Array)",
        "en": "PGA (Pin Grid Array)",
        "es": "PGA"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "LGA (Land Grid Array)",
        "en": "LGA (Land Grid Array)",
        "es": "LGA"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "BGA (Ball Grid Array)",
        "en": "BGA (Ball Grid Array)",
        "es": "BGA"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "ZIF (Zero Insertion Force)",
        "en": "ZIF (Zero Insertion Force)",
        "es": "ZIF"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "LGA (Land Grid Array) possui os pinos na placa-mãe e contatos planos na CPU (usado pela Intel e CPUs recentes da AMD). PGA tem os pinos na CPU.",
    "en": "LGA (Land Grid Array) has the pins on the motherboard and flat contacts on the CPU (used by Intel and recent AMD CPUs). PGA has pins on the CPU.",
    "es": "LGA (Land Grid Array) tiene los pines en la placa base y contactos planos en la CPU. PGA tiene los pines en la CPU."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.3"
},
  {
  "id": "q-hw-8",
  "domain": "3.0 Hardware",
  "domainCode": "3.4 Power Supplies",
  "scenario": {
    "pt": "Um técnico ouve um estalo alto seguido de cheiro de queimado vindo de um computador. O PC não liga mais.",
    "en": "A technician hears a loud popping noise followed by a burning smell coming from a computer. The PC no longer turns on.",
    "es": "Un técnico escucha un fuerte estallido seguido de un olor a quemado proveniente de una computadora. El PC ya no enciende."
  },
  "question": {
    "pt": "Qual componente provavelmente falhou e deve ser testado com um testador apropriado ou multímetro?",
    "en": "Which component has most likely failed and should be tested with an appropriate tester or multimeter?",
    "es": "¿Qué componente probablemente ha fallado y debe probarse con un probador apropiado o multímetro?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Memória RAM",
        "en": "RAM",
        "es": "Memoria RAM"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Placa-mãe",
        "en": "Motherboard",
        "es": "Placa base"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Fonte de Alimentação (PSU)",
        "en": "Power Supply Unit (PSU)",
        "es": "Fuente de Alimentación (PSU)"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Disco Rígido (HDD)",
        "en": "Hard Drive (HDD)",
        "es": "Disco Duro (HDD)"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "Estouros e cheiro de queimado (especialmente fumaça ou ozônio) são sinais clássicos de capacitores estourados em uma Fonte de Alimentação (PSU).",
    "en": "Popping noises and a burning smell (especially smoke or ozone) are classic signs of blown capacitors inside a Power Supply Unit (PSU).",
    "es": "Los estallidos y el olor a quemado son signos clásicos de condensadores reventados dentro de una Fuente de Alimentación (PSU)."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.4 & 5.1"
},
  {
  "id": "q-hw-9",
  "domain": "3.0 Hardware",
  "domainCode": "3.4 Power Supplies",
  "question": {
    "pt": "Qual conector da fonte de alimentação é o principal responsável por fornecer energia à placa-mãe em sistemas ATX modernos?",
    "en": "Which power supply connector is primarily responsible for providing power to the motherboard in modern ATX systems?",
    "es": "¿Qué conector de la fuente de alimentación es responsable de proporcionar energía a la placa base en los sistemas ATX modernos?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Conector PCIe de 8 pinos",
        "en": "8-pin PCIe connector",
        "es": "Conector PCIe de 8 pines"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Conector EPS de 8 pinos",
        "en": "8-pin EPS connector",
        "es": "Conector EPS de 8 pines"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Conector SATA de 15 pinos",
        "en": "15-pin SATA connector",
        "es": "Conector SATA de 15 pines"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Conector ATX de 24 pinos",
        "en": "24-pin ATX connector",
        "es": "Conector ATX de 24 pines"
      }
    }
  ],
  "correctOption": "D",
  "explanation": {
    "pt": "O conector ATX de 24 pinos é o conector de energia principal que fornece as tensões necessárias (3.3V, 5V, 12V) para os componentes da placa-mãe.",
    "en": "The 24-pin ATX connector is the main power connector that supplies the necessary voltages (3.3V, 5V, 12V) to motherboard components.",
    "es": "El conector ATX de 24 pines es el conector de alimentación principal que suministra los voltajes (3.3V, 5V, 12V) a los componentes de la placa base."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.4"
},
  {
  "id": "q-hw-10",
  "domain": "3.0 Hardware",
  "domainCode": "3.3 Motherboards",
  "scenario": {
    "pt": "Uma empresa exige que todos os laptops tenham criptografia de disco inteiro (BitLocker) habilitada, vinculada ao hardware para evitar adulteração.",
    "en": "A company requires all laptops to have full disk encryption (BitLocker) enabled, tied to the hardware to prevent tampering.",
    "es": "Una empresa requiere que todas las computadoras tengan encriptación de disco (BitLocker) vinculada al hardware para evitar manipulaciones."
  },
  "question": {
    "pt": "Qual chip na placa-mãe deve estar presente e habilitado para suportar esse recurso de forma nativa?",
    "en": "Which chip on the motherboard must be present and enabled to natively support this feature?",
    "es": "¿Qué chip en la placa base debe estar presente y habilitado para soportar esta función de forma nativa?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "TPM 2.0 (Trusted Platform Module)",
        "en": "TPM 2.0 (Trusted Platform Module)",
        "es": "TPM 2.0"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Controladora RAID",
        "en": "RAID Controller",
        "es": "Controlador RAID"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Bateria CMOS",
        "en": "CMOS Battery",
        "es": "Batería CMOS"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Chipset Ponte Sul",
        "en": "Southbridge Chipset",
        "es": "Chipset Southbridge"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "O TPM (Trusted Platform Module) é um criptoprocessador seguro usado para operações criptográficas, como armazenar as chaves de criptografia do BitLocker.",
    "en": "The TPM (Trusted Platform Module) is a secure cryptoprocessor used for cryptographic operations, such as storing BitLocker encryption keys.",
    "es": "El TPM (Trusted Platform Module) es un criptoprocesador seguro utilizado para almacenar las claves de encriptación de BitLocker."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.3"
},
  {
  "id": "q-hw-11",
  "domain": "3.0 Hardware",
  "domainCode": "3.3 Motherboards",
  "scenario": {
    "pt": "Toda vez que um computador antigo é desconectado da tomada, o relógio do sistema (data/hora) é redefinido para o ano 2010 e configurações da BIOS são perdidas.",
    "en": "Every time an older computer is unplugged, the system clock (date/time) resets to the year 2010 and custom BIOS settings are lost.",
    "es": "Cada vez que se desenchufa una computadora vieja, el reloj del sistema se restablece al año 2010 y se pierden las configuraciones del BIOS."
  },
  "question": {
    "pt": "O que deve ser substituído para resolver este problema?",
    "en": "What should be replaced to resolve this issue?",
    "es": "¿Qué debe reemplazarse para resolver este problema?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "A fonte de alimentação",
        "en": "The power supply",
        "es": "La fuente de alimentación"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "A bateria CMOS (ex: CR2032)",
        "en": "The CMOS battery (e.g., CR2032)",
        "es": "La batería CMOS (ej. CR2032)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "O processador (CPU)",
        "en": "The processor (CPU)",
        "es": "El procesador (CPU)"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "O disco rígido (HDD)",
        "en": "The hard drive (HDD)",
        "es": "El disco duro (HDD)"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "A bateria CMOS (geralmente uma CR2032) fornece energia ao chip RTC (Real-Time Clock) e à RAM não volátil para manter a hora e as configurações do BIOS.",
    "en": "The CMOS battery (usually a CR2032) provides power to the RTC (Real-Time Clock) and non-volatile RAM to retain the time and BIOS settings.",
    "es": "La batería CMOS proporciona energía al reloj en tiempo real (RTC) y la RAM no volátil para mantener la hora y la configuración del BIOS."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.3"
},
  {
  "id": "q-hw-12",
  "domain": "3.0 Hardware",
  "domainCode": "3.1 Cables",
  "question": {
    "pt": "Qual interface de vídeo é mais apropriada para conectar um monitor 4K a 144Hz para jogos de alto desempenho?",
    "en": "Which video interface is most appropriate for connecting a 4K monitor at 144Hz for high-performance gaming?",
    "es": "¿Qué interfaz de video es más apropiada para conectar un monitor 4K a 144Hz para juegos de alto rendimiento?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "VGA",
        "en": "VGA",
        "es": "VGA"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "DVI-D",
        "en": "DVI-D",
        "es": "DVI-D"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "DisplayPort (versão 1.4+)",
        "en": "DisplayPort (version 1.4+)",
        "es": "DisplayPort (versión 1.4+)"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "S-Video",
        "en": "S-Video",
        "es": "S-Video"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "DisplayPort 1.4 e versões superiores suportam altas resoluções e altas taxas de atualização (como 4K a 144Hz), essenciais para jogos modernos.",
    "en": "DisplayPort 1.4 and newer versions support high bandwidth for high resolutions and refresh rates (like 4K at 144Hz), essential for modern gaming.",
    "es": "DisplayPort 1.4 y versiones superiores admiten altas resoluciones y frecuencias de actualización (como 4K a 144Hz)."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.1"
},
  {
  "id": "q-hw-13",
  "domain": "3.0 Hardware",
  "domainCode": "3.5 Printers",
  "scenario": {
    "pt": "Uma impressora térmica em um ponto de venda (PDV) está imprimindo recibos com listras brancas e caracteres ilegíveis.",
    "en": "A thermal printer at a Point of Sale (POS) is printing receipts with white streaks and unreadable characters.",
    "es": "Una impresora térmica en un punto de venta imprime recibos con rayas blancas y caracteres ilegibles."
  },
  "question": {
    "pt": "Qual é a etapa de manutenção mais recomendada para resolver este problema em impressoras térmicas?",
    "en": "What is the most recommended maintenance step to resolve this issue in thermal printers?",
    "es": "¿Cuál es el paso de mantenimiento más recomendado para resolver este problema en impresoras térmicas?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Substituir o cartucho de toner",
        "en": "Replace the toner cartridge",
        "es": "Reemplazar el cartucho de tóner"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Limpar a cabeça de impressão com álcool isopropílico (IPA)",
        "en": "Clean the print head with isopropyl alcohol (IPA)",
        "es": "Limpiar el cabezal de impresión con alcohol isopropílico (IPA)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Alinhar os cabeçotes de jato de tinta",
        "en": "Align the inkjet print heads",
        "es": "Alinear los cabezales de inyección de tinta"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Substituir o conjunto do fusor (fuser)",
        "en": "Replace the fuser assembly",
        "es": "Reemplazar el conjunto del fusor"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Impressoras térmicas não usam tinta ou toner. A falha de impressão (listras) geralmente ocorre devido a acúmulo de resíduos na cabeça de aquecimento. Limpar com Álcool Isopropílico resolve o problema.",
    "en": "Thermal printers don't use ink or toner. Print failure (streaks) is usually due to residue buildup on the heating head. Cleaning it with Isopropyl Alcohol resolves the issue.",
    "es": "Las impresoras térmicas no usan tinta ni tóner. Limpiar el cabezal de impresión con alcohol isopropílico (IPA) elimina los residuos y resuelve las rayas blancas."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 3.5"
},
  {
  "id": "q-cld-1",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.1 Cloud Models",
  "question": {
    "pt": "Qual modelo de serviço em nuvem fornece aos usuários acesso a aplicativos hospedados e gerenciados inteiramente pelo provedor, como o Microsoft 365 ou Google Workspace?",
    "en": "Which cloud service model provides users access to applications hosted and managed entirely by the provider, such as Microsoft 365 or Google Workspace?",
    "es": "¿Qué modelo de servicio en la nube proporciona a los usuarios acceso a aplicaciones administradas por el proveedor, como Microsoft 365 o Google Workspace?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "IaaS",
        "en": "IaaS",
        "es": "IaaS"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "PaaS",
        "en": "PaaS",
        "es": "PaaS"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "SaaS",
        "en": "SaaS",
        "es": "SaaS"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "DaaS",
        "en": "DaaS",
        "es": "DaaS"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "SaaS (Software as a Service) entrega aplicativos prontos para uso pela internet, eliminando a necessidade de instalar e manter softwares localmente.",
    "en": "SaaS (Software as a Service) delivers ready-to-use applications over the internet, eliminating the need to install and maintain software locally.",
    "es": "SaaS (Software como Servicio) ofrece aplicaciones listas para usar a través de Internet."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.1"
},
  {
  "id": "q-cld-2",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.1 Cloud Models",
  "question": {
    "pt": "Um desenvolvedor precisa alugar servidores virtuais na nuvem (como AWS EC2) onde ele terá controle total do Sistema Operacional (root/admin). Qual é o modelo?",
    "en": "A developer needs to rent virtual servers in the cloud (like AWS EC2) where they have full control over the Operating System (root/admin). Which model is this?",
    "es": "Un desarrollador necesita alquilar servidores virtuales en la nube (como AWS EC2) con control total sobre el Sistema Operativo (root/admin). ¿Qué modelo es?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "IaaS",
        "en": "IaaS",
        "es": "IaaS"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "PaaS",
        "en": "PaaS",
        "es": "PaaS"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "SaaS",
        "en": "SaaS",
        "es": "SaaS"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "MaaS",
        "en": "MaaS",
        "es": "MaaS"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "IaaS (Infrastructure as a Service) fornece recursos computacionais virtualizados (servidores, armazenamento, rede), permitindo que o cliente gerencie o SO e os aplicativos.",
    "en": "IaaS (Infrastructure as a Service) provides virtualized computing resources, allowing the client to manage the OS, runtime, and applications.",
    "es": "IaaS (Infraestructura como Servicio) proporciona recursos informáticos virtualizados, permitiendo al cliente administrar el SO y las aplicaciones."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.1"
},
  {
  "id": "q-cld-3",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.1 Cloud Characteristics",
  "scenario": {
    "pt": "Durante a Black Friday, um site de e-commerce experimenta um aumento repentino de tráfego. A infraestrutura em nuvem adiciona automaticamente mais servidores virtuais e, após o evento, os remove.",
    "en": "During Black Friday, an e-commerce site experiences a sudden traffic spike. The cloud infrastructure automatically adds more virtual servers, and removes them after the event.",
    "es": "Durante el Black Friday, un sitio de comercio electrónico experimenta un pico de tráfico. La infraestructura en la nube agrega automáticamente más servidores virtuales y luego los elimina."
  },
  "question": {
    "pt": "Qual característica da computação em nuvem isso descreve?",
    "en": "Which cloud computing characteristic does this describe?",
    "es": "¿Qué característica de la computación en la nube describe esto?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Metered Service",
        "en": "Metered Service",
        "es": "Servicio Medido"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Rapid Elasticity",
        "en": "Rapid Elasticity",
        "es": "Elasticidad Rápida"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "High Availability",
        "en": "High Availability",
        "es": "Alta Disponibilidad"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Resource Pooling",
        "en": "Resource Pooling",
        "es": "Agrupación de Recursos"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Rapid Elasticity (Elasticidade Rápida) é a capacidade de dimensionar recursos computacionais para cima ou para baixo instantaneamente (auto-scaling) em resposta à demanda.",
    "en": "Rapid Elasticity is the ability to scale computing resources up or down dynamically (auto-scaling) in response to demand.",
    "es": "La elasticidad rápida es la capacidad de escalar los recursos informáticos hacia arriba o hacia abajo dinámicamente en respuesta a la demanda."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.1"
},
  {
  "id": "q-cld-4",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.2 Virtualization",
  "question": {
    "pt": "O VMware ESXi e o Microsoft Hyper-V (quando instalado diretamente no hardware) são exemplos de qual tipo de software?",
    "en": "VMware ESXi and Microsoft Hyper-V (when installed directly on the hardware) are examples of which type of software?",
    "es": "VMware ESXi y Microsoft Hyper-V (instalados directamente en el hardware) son ejemplos de qué tipo de software?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Type 2 Hypervisor",
        "en": "Type 2 Hypervisor",
        "es": "Hipervisor Tipo 2"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Type 1 Hypervisor (Bare-metal)",
        "en": "Type 1 Hypervisor (Bare-metal)",
        "es": "Hipervisor Tipo 1 (Bare-metal)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Emulador de Hardware",
        "en": "Hardware Emulator",
        "es": "Emulador de Hardware"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Containers (Docker)",
        "en": "Containers (Docker)",
        "es": "Contenedores (Docker)"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Hypervisors Tipo 1 (bare-metal) são instalados diretamente no hardware do servidor, sem um sistema operacional subjacente (host OS), oferecendo melhor desempenho.",
    "en": "Type 1 (bare-metal) hypervisors are installed directly on the server's hardware, without an underlying host OS, offering better performance.",
    "es": "Los hipervisores Tipo 1 (bare-metal) se instalan directamente en el hardware del servidor, sin un sistema operativo anfitrión, ofreciendo un mejor rendimiento."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.2"
},
  {
  "id": "q-cld-5",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.2 Virtualization",
  "scenario": {
    "pt": "Um estudante instala o Oracle VirtualBox em seu laptop Windows 10 para rodar uma máquina virtual Linux para um projeto de faculdade.",
    "en": "A student installs Oracle VirtualBox on their Windows 10 laptop to run a Linux virtual machine for a college project.",
    "es": "Un estudiante instala Oracle VirtualBox en su computadora con Windows 10 para ejecutar una máquina virtual Linux."
  },
  "question": {
    "pt": "O VirtualBox é classificado como qual tipo de hipervisor?",
    "en": "VirtualBox is classified as which type of hypervisor?",
    "es": "¿Cómo se clasifica VirtualBox en términos de hipervisores?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Hipervisor Tipo 1",
        "en": "Type 1 Hypervisor",
        "es": "Hipervisor Tipo 1"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Hipervisor Tipo 2 (Hosted)",
        "en": "Type 2 Hypervisor (Hosted)",
        "es": "Hipervisor Tipo 2 (Alojado)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Virtualização em nuvem",
        "en": "Cloud Virtualization",
        "es": "Virtualización en la nube"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Ambiente de execução isolado (Sandbox)",
        "en": "Isolated execution environment (Sandbox)",
        "es": "Entorno aislado (Sandbox)"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Hipervisores Tipo 2 (Hosted) rodam como um aplicativo dentro de um Sistema Operacional host existente (ex: Windows, macOS).",
    "en": "Type 2 (Hosted) hypervisors run as an application within an existing host Operating System (e.g., Windows, macOS).",
    "es": "Los hipervisores Tipo 2 (alojados) se ejecutan como una aplicación dentro de un sistema operativo anfitrión existente."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.2"
},
  {
  "id": "q-cld-6",
  "domain": "4.0 Cloud & Virtualization",
  "domainCode": "4.2 Virtualization",
  "scenario": {
    "pt": "Ao tentar iniciar uma VM no Hyper-V, um técnico recebe um erro afirmando que a virtualização assistida por hardware não está disponível.",
    "en": "When attempting to start a VM in Hyper-V, a technician receives an error stating that hardware-assisted virtualization is not available.",
    "es": "Al intentar iniciar una VM en Hyper-V, un técnico recibe un error que indica que la virtualización asistida por hardware no está disponible."
  },
  "question": {
    "pt": "Onde o técnico deve habilitar esse recurso (Intel VT-x ou AMD-V)?",
    "en": "Where should the technician enable this feature (Intel VT-x or AMD-V)?",
    "es": "¿Dónde debe el técnico habilitar esta función (Intel VT-x o AMD-V)?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Gerenciador de Dispositivos do Windows",
        "en": "Windows Device Manager",
        "es": "Administrador de Dispositivos de Windows"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Nas configurações de UEFI / BIOS da placa-mãe",
        "en": "In the motherboard UEFI / BIOS settings",
        "es": "En la configuración UEFI / BIOS de la placa base"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "No Painel de Controle, em Opções de Energia",
        "en": "In Control Panel, under Power Options",
        "es": "En el Panel de Control, en Opciones de Energía"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Nas configurações de rede do roteador",
        "en": "In the router's network settings",
        "es": "En la configuración de red del router"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "O suporte à virtualização em nível de hardware (Intel VT-x ou AMD-V) deve ser habilitado no firmware da placa-mãe (BIOS ou UEFI) antes que um hypervisor possa usá-lo.",
    "en": "Hardware-level virtualization support (Intel VT-x or AMD-V) must be enabled in the motherboard's firmware (BIOS or UEFI) before a hypervisor can utilize it.",
    "es": "El soporte de virtualización a nivel de hardware (Intel VT-x o AMD-V) debe habilitarse en el firmware de la placa base (BIOS o UEFI)."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 4.2"
},
  {
  "id": "q-tr-1",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.1 Methodology",
  "question": {
    "pt": "De acordo com a metodologia de solução de problemas da CompTIA, qual é o Passo 1 antes de fazer qualquer alteração no sistema?",
    "en": "According to the CompTIA troubleshooting methodology, what is Step 1 before making any changes to the system?",
    "es": "Según la metodología de solución de problemas de CompTIA, ¿cuál es el Paso 1 antes de realizar cualquier cambio en el sistema?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Estabelecer uma teoria de causa provável",
        "en": "Establish a theory of probable cause",
        "es": "Establecer una teoría de causa probable"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Identificar o problema (coletar informações, fazer perguntas, fazer backup)",
        "en": "Identify the problem (gather info, ask questions, perform backup)",
        "es": "Identificar el problema (recopilar info, hacer preguntas, respaldar)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Testar a teoria para determinar a causa",
        "en": "Test the theory to determine cause",
        "es": "Probar la teoría para determinar la causa"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Estabelecer um plano de ação",
        "en": "Establish a plan of action",
        "es": "Establecer un plan de acción"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "O primeiro passo é Identificar o Problema. Isso envolve questionar o usuário, replicar o problema se possível e fazer backup de dados antes de iniciar os reparos.",
    "en": "The first step is to Identify the Problem. This involves questioning the user, replicating the problem if possible, and performing backups before starting repairs.",
    "es": "El primer paso es Identificar el Problema, lo que implica interrogar al usuario y realizar copias de seguridad de los datos."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.1: Best practice methodology"
},
  {
  "id": "q-tr-2",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.1 Methodology",
  "scenario": {
    "pt": "No Passo 3 (Testar a teoria), o técnico substitui um cabo de rede acreditando ser a causa da falha de conexão, mas o problema persiste.",
    "en": "In Step 3 (Test the theory), the technician replaces a network cable believing it to be the cause of connection failure, but the issue persists.",
    "es": "En el Paso 3 (Probar la teoría), el técnico reemplaza un cable de red, pero el problema de conexión persiste."
  },
  "question": {
    "pt": "Qual deve ser a próxima ação do técnico de acordo com a metodologia?",
    "en": "What should be the technician's next action according to the methodology?",
    "es": "¿Cuál debería ser la siguiente acción del técnico según la metodología?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Documentar a falha e fechar o chamado",
        "en": "Document the failure and close the ticket",
        "es": "Documentar la falla y cerrar el ticket"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Verificar a funcionalidade total do sistema",
        "en": "Verify full system functionality",
        "es": "Verificar la funcionalidad total del sistema"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Estabelecer uma nova teoria de causa provável ou escalar o problema",
        "en": "Establish a new theory of probable cause or escalate",
        "es": "Establecer una nueva teoría de causa probable o escalar el problema"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Reinstalar o Sistema Operacional",
        "en": "Reinstall the Operating System",
        "es": "Reinstalar el Sistema Operativo"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "Se a teoria for testada e estiver incorreta, o técnico deve retornar à fase de formulação de uma nova teoria (Passo 2) ou escalar o problema para um nível de suporte superior.",
    "en": "If the theory is tested and found to be incorrect, the technician must either formulate a new theory (Step 2) or escalate the issue to a higher support tier.",
    "es": "Si la teoría no es correcta, el técnico debe formular una nueva teoría (Paso 2) o escalar el problema a un nivel superior."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.1"
},
  {
  "id": "q-tr-3",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.1 Methodology",
  "question": {
    "pt": "Após aplicar com sucesso uma correção para um problema, qual é a ação obrigatória do técnico no Passo 5 (Verificar funcionalidade) antes de encerrar o chamado e documentar (Passo 6)?",
    "en": "After successfully applying a fix, what is the technician's mandatory action in Step 5 (Verify functionality) before closing the ticket and documenting (Step 6)?",
    "es": "Después de aplicar una solución con éxito, ¿cuál es la acción obligatoria del técnico en el Paso 5 antes de documentar y cerrar el ticket?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Verificar a funcionalidade total do sistema e implementar medidas preventivas",
        "en": "Verify full system functionality and implement preventive measures",
        "es": "Verificar la funcionalidad total del sistema e implementar medidas preventivas"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Formatar o disco rígido",
        "en": "Format the hard drive",
        "es": "Formatear el disco duro"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Desinstalar o software antivírus temporariamente",
        "en": "Temporarily uninstall antivirus software",
        "es": "Desinstalar temporalmente el software antivirus"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Reiniciar a infraestrutura do servidor principal",
        "en": "Reboot the primary server infrastructure",
        "es": "Reiniciar la infraestructura principal de servidores"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "É crucial garantir que a correção não quebrou outras funções (Verificar funcionalidade total) e, se aplicável, implementar medidas para que o problema não ocorra novamente.",
    "en": "It is crucial to ensure the fix did not break other functions (Verify full functionality) and, if applicable, implement measures to prevent recurrence.",
    "es": "Es fundamental asegurarse de que la solución no haya roto otras funciones y aplicar medidas preventivas si corresponde."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.1"
},
  {
  "id": "q-tr-4",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.2 Network Issues",
  "scenario": {
    "pt": "Um usuário consegue acessar um servidor web interno usando seu endereço IP (ex: 10.0.0.50), mas não consegue acessá-lo pelo nome do host (ex: intranet.empresa.local).",
    "en": "A user can access an internal web server using its IP address (e.g., 10.0.0.50) but cannot access it using its hostname (e.g., intranet.company.local).",
    "es": "Un usuario puede acceder a un servidor web usando su dirección IP pero no por su nombre de host."
  },
  "question": {
    "pt": "Isso indica uma falha em qual serviço, e qual comando do Windows pode ajudar a limpar o cache local para tentar resolver?",
    "en": "This indicates a failure in which service, and what Windows command might help clear the local cache to resolve it?",
    "es": "¿Qué servicio está fallando y qué comando de Windows podría limpiar el caché local para intentar resolverlo?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "DHCP; ipconfig /renew",
        "en": "DHCP; ipconfig /renew",
        "es": "DHCP; ipconfig /renew"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "DNS; ipconfig /flushdns",
        "en": "DNS; ipconfig /flushdns",
        "es": "DNS; ipconfig /flushdns"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Gateway; tracert",
        "en": "Gateway; tracert",
        "es": "Gateway; tracert"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Firewall; netstat -a",
        "en": "Firewall; netstat -a",
        "es": "Firewall; netstat -a"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "O problema de resolução de nome para IP é uma falha de DNS. O comando 'ipconfig /flushdns' limpa o cache DNS local do Windows, forçando uma nova consulta.",
    "en": "The inability to resolve a hostname to an IP is a DNS failure. The command 'ipconfig /flushdns' clears the local Windows DNS resolver cache.",
    "es": "El problema de resolución de nombres a IP es una falla de DNS. El comando 'ipconfig /flushdns' borra el caché DNS local."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.2"
},
  {
  "id": "q-tr-5",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.2 Network Issues",
  "scenario": {
    "pt": "Um administrador de rede deseja identificar exatamente em qual roteador intermediário (salto/hop) uma conexão para um servidor na Internet está sendo interrompida.",
    "en": "A network administrator wants to identify exactly at which intermediate router (hop) a connection to a server on the Internet is failing.",
    "es": "Un administrador desea identificar en qué enrutador intermedio exacto (salto) está fallando una conexión a Internet."
  },
  "question": {
    "pt": "Qual ferramenta de linha de comando fornecerá a lista de todos os roteadores ao longo do caminho?",
    "en": "Which command-line tool will provide the list of all routers along the path?",
    "es": "¿Qué herramienta de línea de comandos proporcionará la lista de todos los enrutadores a lo largo de la ruta?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "ping",
        "en": "ping",
        "es": "ping"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "ipconfig",
        "en": "ipconfig",
        "es": "ipconfig"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "tracert (ou traceroute)",
        "en": "tracert (or traceroute)",
        "es": "tracert (o traceroute)"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "nslookup",
        "en": "nslookup",
        "es": "nslookup"
      }
    }
  ],
  "correctOption": "C",
  "explanation": {
    "pt": "A ferramenta tracert (no Windows) ou traceroute (no Linux/macOS) mostra a rota completa que os pacotes fazem até o destino, exibindo o tempo de resposta de cada salto.",
    "en": "The tracert (Windows) or traceroute (Linux/macOS) tool displays the full path packets take to the destination, showing the response time of each hop.",
    "es": "La herramienta tracert (Windows) o traceroute muestra la ruta completa que toman los paquetes hasta el destino, mostrando cada salto."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.2"
},
  {
  "id": "q-tr-6",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.3 Motherboard/CPU",
  "scenario": {
    "pt": "O computador de um usuário está desligando sozinho de forma intermitente, especialmente durante tarefas pesadas. Antes de desligar, o sistema fica visivelmente lento. Ao abrir o gabinete, nota-se muito acúmulo de poeira.",
    "en": "A user's computer is intermittently shutting down, especially during heavy workloads. Before shutting down, the system slows to a crawl. Opening the case reveals heavy dust buildup.",
    "es": "Una computadora se apaga sola intermitentemente bajo carga pesada. Antes de apagarse, el sistema se ralentiza. Al abrir el gabinete, hay mucho polvo."
  },
  "question": {
    "pt": "Qual é a causa mais provável para esses sintomas?",
    "en": "What is the most likely cause for these symptoms?",
    "es": "¿Cuál es la causa más probable de estos síntomas?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Falha na bateria CMOS",
        "en": "CMOS battery failure",
        "es": "Fallo de la batería CMOS"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Thermal throttling (Superaquecimento da CPU)",
        "en": "Thermal throttling (CPU overheating)",
        "es": "Estrangulamiento térmico (sobrecalentamiento de CPU)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Corrupção de drivers de vídeo",
        "en": "Video driver corruption",
        "es": "Corrupción de controladores de video"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Falha do cabo SATA",
        "en": "SATA cable failure",
        "es": "Fallo del cable SATA"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Quando a CPU superaquece (frequentemente por poeira bloqueando o dissipador/cooler), ela reduz a velocidade para esfriar (thermal throttling) e, se continuar quente, o sistema realiza um desligamento de emergência.",
    "en": "When a CPU overheats (often due to dust blocking the cooler), it reduces its clock speed to cool down (thermal throttling). If it remains too hot, it forces an emergency shutdown.",
    "es": "Cuando la CPU se sobrecalienta, reduce su velocidad para enfriarse (estrangulamiento térmico). Si sigue caliente, se apaga de emergencia para evitar daños."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.3"
},
  {
  "id": "q-tr-7",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.3 Motherboard/CPU",
  "question": {
    "pt": "Ao ligar um PC de mesa, não há imagem no monitor, mas a placa-mãe emite um padrão de bipes longos e curtos. O que esses bipes representam?",
    "en": "Upon turning on a desktop PC, there is no display on the monitor, but the motherboard emits a pattern of long and short beeps. What do these beeps represent?",
    "es": "Al encender una PC, no hay imagen, pero la placa base emite pitidos largos y cortos. ¿Qué representan estos pitidos?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Códigos POST indicando falha de hardware antes do vídeo inicializar",
        "en": "POST beep codes indicating a hardware failure before video initializes",
        "es": "Códigos POST que indican falla de hardware antes de que el video se inicie"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Aviso de que a impressora está sem papel",
        "en": "Warning that the printer is out of paper",
        "es": "Advertencia de que la impresora no tiene papel"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Confirmação de que o Windows carregou corretamente",
        "en": "Confirmation that Windows loaded correctly",
        "es": "Confirmación de que Windows cargó correctamente"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Alarme de vírus detectado na BIOS",
        "en": "BIOS virus detection alarm",
        "es": "Alarma de detección de virus en la BIOS"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "Os códigos de bipe POST (Power-On Self-Test) são usados pela BIOS/UEFI para comunicar erros críticos de hardware (como RAM ou GPU ausente/com defeito) quando o sistema não consegue exibir vídeo.",
    "en": "POST (Power-On Self-Test) beep codes are used by the BIOS/UEFI to communicate critical hardware errors (like missing RAM or GPU) when the system cannot output video.",
    "es": "Los códigos de pitido POST son utilizados por la BIOS/UEFI para comunicar errores críticos de hardware (como RAM defectuosa) cuando no hay señal de video."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.3"
},
  {
  "id": "q-tr-8",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.4 Storage",
  "scenario": {
    "pt": "Um usuário relata que seu computador está travando ao tentar abrir arquivos e há um som repetitivo de clique alto vindo do gabinete.",
    "en": "A user reports their computer is freezing when trying to open files, and there is a loud repetitive clicking sound coming from the computer case.",
    "es": "Un usuario reporta que su computadora se congela al abrir archivos y hay un sonido de clic repetitivo y fuerte proveniente del gabinete."
  },
  "question": {
    "pt": "Qual é a ação IMEDIATA que o técnico deve tomar?",
    "en": "What is the IMMEDIATE action the technician should take?",
    "es": "¿Cuál es la acción INMEDIATA que debe tomar el técnico?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Executar o utilitário chkdsk /r para reparar os setores",
        "en": "Run the chkdsk /r utility to repair sectors",
        "es": "Ejecutar la utilidad chkdsk /r para reparar los sectores"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Desligar o PC imediatamente para evitar mais danos físicos ao HD e tentar recuperar os dados de um backup.",
        "en": "Power down the PC immediately to prevent further physical damage to the HDD and attempt to recover data from backup.",
        "es": "Apagar el PC inmediatamente para evitar daños físicos al disco duro y recuperar datos del respaldo."
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Desfragmentar o disco rígido",
        "en": "Defragment the hard drive",
        "es": "Desfragmentar el disco duro"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Atualizar o firmware da placa-mãe",
        "en": "Update the motherboard firmware",
        "es": "Actualizar el firmware de la placa base"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "O 'Click of Death' indica uma falha mecânica catastrófica iminente no cabeçote de leitura/gravação de um HD magnético. Continuar usando (ou rodar chkdsk) destruirá o disco e os dados.",
    "en": "The 'Click of Death' indicates an imminent catastrophic mechanical failure of the read/write head in a magnetic HDD. Continuing to run it will destroy the platters and data.",
    "es": "El 'Clic de la Muerte' indica una falla mecánica inminente en un disco duro magnético. Continuar usándolo destruirá el disco y los datos."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.4"
},
  {
  "id": "q-tr-9",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.4 Storage",
  "scenario": {
    "pt": "Um computador exibe a mensagem 'Boot Device Not Found' ao ser ligado após um usuário ter conectado um pen drive USB para copiar arquivos.",
    "en": "A computer displays 'Boot Device Not Found' upon startup after a user plugged in a USB flash drive to copy files.",
    "es": "Una computadora muestra 'Dispositivo de arranque no encontrado' después de que un usuario conectó una unidad USB para copiar archivos."
  },
  "question": {
    "pt": "Qual é a primeira configuração que deve ser verificada pelo técnico?",
    "en": "What is the first setting the technician should check?",
    "es": "¿Cuál es la primera configuración que debe verificar el técnico?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "A Ordem de Inicialização (Boot Order) nas configurações da UEFI/BIOS",
        "en": "The Boot Order in the UEFI/BIOS settings",
        "es": "El Orden de Arranque en la configuración UEFI/BIOS"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "A voltagem da fonte de alimentação",
        "en": "The power supply voltage",
        "es": "El voltaje de la fuente de alimentación"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "As permissões do Active Directory",
        "en": "Active Directory permissions",
        "es": "Permisos de Active Directory"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "A taxa de atualização do monitor",
        "en": "The monitor's refresh rate",
        "es": "La frecuencia de actualización del monitor"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "A BIOS pode estar tentando dar boot pelo pen drive conectado, que não possui um SO (Sistema Operacional). O técnico deve remover o USB ou corrigir a Ordem de Boot na BIOS para priorizar o HD interno.",
    "en": "The BIOS might be attempting to boot from the connected USB drive, which lacks an OS. The technician should remove the USB or correct the Boot Order to prioritize the internal drive.",
    "es": "La BIOS podría estar intentando arrancar desde la unidad USB, que no tiene un sistema operativo. Se debe corregir el Orden de Arranque."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.4"
},
  {
  "id": "q-tr-10",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.5 Display Issues",
  "question": {
    "pt": "Um usuário recebeu um novo monitor LCD, mas reclama que a imagem está borrada e os ícones estão distorcidos. Qual é a causa mais provável?",
    "en": "A user received a new LCD monitor but complains that the image is blurry and icons are distorted. What is the most likely cause?",
    "es": "Un usuario recibió un nuevo monitor LCD, pero se queja de que la imagen está borrosa y los iconos distorsionados. ¿Cuál es la causa más probable?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "A luz de fundo (backlight) está falhando",
        "en": "The backlight is failing",
        "es": "La retroiluminación está fallando"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "O monitor não está configurado para sua Resolução Nativa nas configurações do SO",
        "en": "The monitor is not set to its Native Resolution in OS settings",
        "es": "El monitor no está configurado en su Resolución Nativa en el SO"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "O monitor possui pixels mortos",
        "en": "The monitor has dead pixels",
        "es": "El monitor tiene píxeles muertos"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "O Inversor (Inverter) do monitor está quebrado",
        "en": "The monitor's Inverter is broken",
        "es": "El Inversor del monitor está roto"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "Monitores LCD/LED possuem uma grade física de pixels (Resolução Nativa). Usar qualquer resolução diferente da nativa forçará o monitor a interpolar a imagem, resultando em desfoque.",
    "en": "LCD/LED monitors have a physical grid of pixels (Native Resolution). Using any non-native resolution forces the monitor to interpolate the image, resulting in blurriness.",
    "es": "Los monitores LCD/LED tienen una cuadrícula física de píxeles (Resolución Nativa). Usar otra resolución fuerza la interpolación, causando borrosidad."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.5"
},
  {
  "id": "q-tr-11",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.6 Printers",
  "scenario": {
    "pt": "Um usuário relata que as páginas impressas por uma impressora a laser estão saindo com o toner solto, que borra e suja os dedos quando tocado.",
    "en": "A user reports that pages printed from a laser printer have loose toner that smears and rubs off onto fingers when touched.",
    "es": "Un usuario reporta que las páginas impresas por una impresora láser salen con el tóner suelto, que se mancha al tocarlo."
  },
  "question": {
    "pt": "Qual componente da impressora a laser está falhando?",
    "en": "Which component of the laser printer is failing?",
    "es": "¿Qué componente de la impresora láser está fallando?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Cilindro OPC (Imaging Drum)",
        "en": "OPC Imaging Drum",
        "es": "Tambor OPC (Imaging Drum)"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "Conjunto do Fusor (Fuser Assembly)",
        "en": "Fuser Assembly",
        "es": "Conjunto del Fusor (Fuser)"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "Rolo de Transferência (Transfer Roller)",
        "en": "Transfer Roller",
        "es": "Rodillo de Transferencia"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "Rolo de Alimentação (Pickup Roller)",
        "en": "Pickup Roller",
        "es": "Rodillo de Alimentación (Pickup)"
      }
    }
  ],
  "correctOption": "B",
  "explanation": {
    "pt": "O Fusor (Fuser) usa calor e pressão para derreter o pó do toner permanentemente no papel. Se o toner estiver solto, o fusor não está aquecendo corretamente e precisa ser substituído.",
    "en": "The Fuser uses heat and pressure to permanently melt the toner powder onto the paper. If toner rubs off, the fuser is not heating properly and needs replacement.",
    "es": "El Fusor usa calor y presión para derretir permanentemente el tóner en el papel. Si el tóner se desprende, el fusor está fallando y debe ser reemplazado."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.6"
},
  {
  "id": "q-tr-12",
  "domain": "5.0 Troubleshooting",
  "domainCode": "5.6 Printers",
  "scenario": {
    "pt": "Toda página impressa em uma impressora a laser apresenta uma fina linha preta vertical exatamente na mesma posição da folha.",
    "en": "Every page printed from a laser printer has a thin vertical black line in the exact same position on the page.",
    "es": "Cada página impresa en una impresora láser tiene una fina línea negra vertical exactamente en la misma posición de la hoja."
  },
  "question": {
    "pt": "Qual é a causa mais comum para esse defeito de impressão?",
    "en": "What is the most common cause of this print defect?",
    "es": "¿Cuál es la causa más común de este defecto de impresión?"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "pt": "Um risco no cilindro de imagem (OPC Drum)",
        "en": "A scratch on the OPC Imaging Drum",
        "es": "Un rasguño en el tambor de imagen (OPC Drum)"
      }
    },
    {
      "id": "B",
      "text": {
        "pt": "A impressora está sem papel",
        "en": "The printer is out of paper",
        "es": "La impresora no tiene papel"
      }
    },
    {
      "id": "C",
      "text": {
        "pt": "O cabo USB está com defeito",
        "en": "The USB cable is defective",
        "es": "El cable USB está defectuoso"
      }
    },
    {
      "id": "D",
      "text": {
        "pt": "O fusor está muito frio",
        "en": "The fuser is too cold",
        "es": "El fusor está muy frío"
      }
    }
  ],
  "correctOption": "A",
  "explanation": {
    "pt": "Um cilindro fotossensível (OPC drum) arranhado ou danificado reterá toner dentro do arranhão a cada rotação, resultando em uma linha reta preta e contínua ao longo de toda a página impressa.",
    "en": "A scratched or damaged photosensitive OPC drum will hold toner in the scratch on every rotation, resulting in a solid, continuous black line down the entire printed page.",
    "es": "Un tambor fotosensible (OPC) rayado retendrá el tóner en el rasguño en cada rotación, lo que resulta en una línea negra continua a lo largo de toda la página."
  },
  "objectiveRef": "CompTIA 220-1201 Obj 5.6"
}
];
