"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "pt" | "en" | "es";

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

export const translations: Translations = {
  // Brand & Nav
  brand_title: { pt: "ServiceDesk Lab", en: "ServiceDesk Lab", es: "ServiceDesk Lab" },
  brand_subtitle: { pt: "ITSM v2.4", en: "ITSM v2.4", es: "ITSM v2.4" },
  top_bar_title: { pt: "Ambiente de Treinamento e Simulação N1/N2", en: "N1/N2 Simulation & Training Environment", es: "Ambiente de Entrenamiento y Simulación N1/N2" },
  status_online: { pt: "Online", en: "Online", es: "En línea" },
  nav_capacitation: { pt: "Capacitação & Labs", en: "Training & Labs", es: "Capacitación y Labs" },
  nav_fundamentals: { pt: "Metodologia & Teoria", en: "Methodology & Theory", es: "Metodología y Teoría" },
  nav_academy: { pt: "Academy (Trilhas)", en: "Academy (Tracks)", es: "Academy (Rutas)" },
  nav_flashcards: { pt: "Flashcards (Anki N1)", en: "Flashcards (Anki N1)", es: "Tarjetas (Anki N1)" },
  nav_exam: { pt: "Simulado CompTIA A+", en: "CompTIA A+ Exam", es: "Simulador CompTIA A+" },
  nav_queues: { pt: "Filas de Atendimento", en: "Support Queues", es: "Colas de Atención" },
  nav_incidents: { pt: "Incidentes & Fila", en: "Incidents & Queue", es: "Incidentes y Cola" },
  nav_new_ticket: { pt: "Abrir Incidente", en: "New Incident", es: "Nuevo Incidente" },
  nav_system: { pt: "Sistema & IA", en: "System & AI", es: "Sistema e IA" },
  nav_settings: { pt: "Motor de Simulação", en: "Simulation Engine", es: "Motor de Simulación" },

  // Dashboard Page
  dash_title: { pt: "Fila de Atendimento e Incidentes", en: "Support Queue & Incidents", es: "Cola de Atención e Incidentes" },
  dash_subtitle: { pt: "Gerenciamento de tickets de suporte simulados com usuários interativos.", en: "Simulated support ticket management with interactive AI users.", es: "Gestión de tickets de soporte simulados con usuarios interactivos." },
  dash_academy_btn: { pt: "Ver Modo Academy (Trilhas)", en: "View Academy Tracks", es: "Ver Modo Academy (Rutas)" },
  dash_new_btn: { pt: "Novo Incidente", en: "New Incident", es: "Nuevo Incidente" },
  dash_total_base: { pt: "Total na Base", en: "Total Tickets", es: "Total en Base" },
  dash_total_sub: { pt: "Registros totais", en: "Total records", es: "Registros totales" },
  dash_open_title: { pt: "Pendentes / Abertos", en: "Pending / Open", es: "Pendientes / Abiertos" },
  dash_open_sub: { pt: "Aguardando atendimento", en: "Awaiting support", es: "Esperando atención" },
  dash_completed_title: { pt: "Resolvidos", en: "Resolved", es: "Resueltos" },
  dash_completed_sub: { pt: "Finalizados com sucesso", en: "Successfully finished", es: "Finalizados con éxito" },
  dash_score_title: { pt: "Nota Média Geral", en: "Average Score", es: "Puntuación Media" },
  dash_score_sub: { pt: "Base de 0 a 100", en: "Scale 0 to 100", es: "Escala 0 a 100" },
  dash_filter_all: { pt: "Todos os Status", en: "All Status", es: "Todos los Estados" },
  dash_filter_open: { pt: "Apenas Abertos", en: "Open Only", es: "Solo Abiertos" },
  dash_filter_solved: { pt: "Apenas Resolvidos", en: "Resolved Only", es: "Solo Resueltos" },
  dash_all_categories: { pt: "Todas as Categorias", en: "All Categories", es: "Todas las Categorías" },
  dash_search_placeholder: { pt: "Buscar por ID (ex: HD-1001), título ou descrição...", en: "Search by ID (e.g. HD-1001), title or description...", es: "Buscar por ID (ej: HD-1001), título o descripción..." },
  dash_table_id: { pt: "ID & Título", en: "ID & Title", es: "ID y Título" },
  dash_table_category: { pt: "Categoria", en: "Category", es: "Categoría" },
  dash_table_priority: { pt: "Prioridade", en: "Priority", es: "Prioridad" },
  dash_table_level: { pt: "Nível", en: "Level", es: "Nivel" },
  dash_table_profile: { pt: "Perfil", en: "Profile", es: "Perfil" },
  dash_table_status: { pt: "Status", en: "Status", es: "Estado" },
  dash_table_action: { pt: "Ação", en: "Action", es: "Acción" },
  dash_btn_attend: { pt: "Atender ➔", en: "Support ➔", es: "Atender ➔" },
  dash_btn_view_eval: { pt: "Ver Avaliação", en: "View Evaluation", es: "Ver Evaluación" },

  // Fundamentals Page - 6 Steps CompTIA
  fund_badge: { pt: "📖 Teoria Geral & Metodologia", en: "📖 General Theory & Methodology", es: "📖 Teoría General y Metodología" },
  fund_cert_badge: { pt: "CompTIA A+ & ITIL 4 Foundation", en: "CompTIA A+ & ITIL 4 Foundation", es: "CompTIA A+ e ITIL 4 Foundation" },
  fund_title: { pt: "Metodologia de Atendimento & Resolução de Chamados", en: "IT Support Methodology & Incident Resolution", es: "Metodología de Atención y Resolución de Tickets" },
  fund_subtitle: { pt: "O passo a passo padronizado internacionalmente para investigar, isolar e documentar incidentes com precisão.", en: "The standardized international workflow to investigate, isolate, and document incidents.", es: "El flujo de trabajo estándar internacional para investigar, aislar y documentar incidentes." },
  fund_tab_comptia: { pt: "🎯 6 Passos de Troubleshooting (CompTIA)", en: "🎯 6 Troubleshooting Steps (CompTIA)", es: "🎯 6 Pasos de Troubleshooting (CompTIA)" },
  fund_tab_itil: { pt: "🏢 Fundamentos ITIL 4 & SLA", en: "🏢 ITIL 4 Foundations & SLA", es: "🏢 Fundamentos ITIL 4 y SLA" },
  fund_tab_softskills: { pt: "🗣️ Comunicação & Perfis de Usuários", en: "🗣️ Communication & User Profiles", es: "🗣️ Comunicación y Perfiles de Usuarios" },
  fund_tab_checklist: { pt: "📋 Roteiro de Ouro do N1", en: "📋 N1 Golden Checklist", es: "📋 Lista de Oro del N1" },

  fund_formula_title: { pt: "A Fórmula Oficial do Suporte Técnico Internacional (CompTIA A+ Standard)", en: "The Official International IT Support Formula (CompTIA A+ Standard)", es: "La Fórmula Oficial de Soporte Técnico Internacional (Estándar CompTIA A+)" },
  fund_formula_desc: { pt: "Em qualquer processo seletivo ou chamado crítico, nunca 'tente adivinhar' ou trocar peças aleatoriamente. Siga rigorosamente os 6 passos ordenados abaixo:", en: "In any job interview or critical ticket, never guess or replace parts blindly. Strictly follow the 6 ordered steps below:", es: "En cualquier entrevista técnica o ticket crítico, nunca adivine ni cambie piezas al azar. Siga estrictamente los 6 pasos ordenados abajo:" },
  
  fund_step1_title: { pt: "1. Identificar o Problema (Identify the Problem)", en: "1. Identify the Problem", es: "1. Identificar el Problema" },
  fund_step1_b1: { pt: "Questione o usuário: Colete os sintomas literais (sem interpretar ainda).", en: "Question the user: Gather literal symptoms (without premature assumptions).", es: "Pregunte al usuario: Recopile los síntomas literales (sin suposiciones previas)." },
  fund_step1_b2: { pt: "O que mudou recentemente? Atualizações, novo software, quedas de energia.", en: "What changed recently? Updates, new software, power outages.", es: "¿Qué cambió recientemente? Actualizaciones, nuevo software, cortes de energía." },
  fund_step1_b3: { pt: "Verifique códigos de erro: Mensagens exatas da tela ou Event Viewer.", en: "Check error codes: Exact onscreen messages or Event Viewer logs.", es: "Verifique códigos de error: Mensajes exactos en pantalla o Visor de Eventos." },
  fund_step1_b4: { pt: "Faça backup prévio: Nunca mexa em dados sem antes garantir segurança.", en: "Perform prior backup: Never modify storage without ensuring data safety.", es: "Haga respaldo previo: Nunca modifique datos sin garantizar su seguridad." },

  fund_step2_title: { pt: "2. Estabelecer Teoria de Causa Provável (Theory of Cause)", en: "2. Establish a Theory of Probable Cause", es: "2. Establecer una Teoría de Causa Probable" },
  fund_step2_b1: { pt: "Questione o óbvio primeiro: Cabo plugado? Monitor ligado na tomada? CAPS LOCK ativo?", en: "Question the obvious first: Cable plugged in? Monitor powered on? CAPS LOCK on?", es: "Cuestione lo obvio primero: ¿Cable conectado? ¿Monitor encendido? ¿Bloq Mayús activo?" },
  fund_step2_b2: { pt: "Considere fatores internos e externos.", en: "Consider internal and external factors.", es: "Considere factores internos y externos." },
  fund_step2_b3: { pt: "Aplique o princípio da Navalha de Occam: a explicação mais simples geralmente é a correta.", en: "Apply Occam's Razor: the simplest explanation is usually the correct one.", es: "Aplique la Navaja de Ockham: la explicación más simple suele ser la correcta." },

  fund_step3_title: { pt: "3. Testar a Teoria para Determinar a Causa (Test Theory)", en: "3. Test the Theory to Determine Cause", es: "3. Probar la Teoría para Determinar la Causa" },
  fund_step3_b1: { pt: "Execute testes controlados (ex: trocar de porta de switch, usar cabo reserva).", en: "Execute controlled tests (e.g. switch ports, swap reserve cable).", es: "Ejecute pruebas controladas (ej: cambiar de puerto de switch, usar cable de repuesto)." },
  fund_step3_b2: { pt: "Teoria confirmada? Avance para o plano de ação.", en: "Theory confirmed? Proceed to action plan.", es: "¿Teoría confirmada? Avance al plan de acción." },
  fund_step3_b3: { pt: "Teoria refutada? Estabeleça uma nova teoria ou escale para o Nível 2 / Engenharia.", en: "Theory disproven? Formulate a new theory or escalate to Tier 2 / Engineering.", es: "¿Teoría refutada? Formule una nueva teoría o escale a Nivel 2 / Ingeniería." },

  fund_step4_title: { pt: "4. Plano de Ação e Implementação da Solução (Plan of Action)", en: "4. Establish a Plan of Action & Implement", es: "4. Plan de Acción e Implementación de la Solución" },
  fund_step4_b1: { pt: "Crie um plano de ação detalhado identificando possíveis impactos em outros sistemas.", en: "Build a detailed plan identifying potential impacts on other systems.", es: "Cree un plan de acción detallado identificando posibles impactos en otros sistemas." },
  fund_step4_b2: { pt: "Se necessário, consulte a política de Gerenciamento de Mudanças (Change Management).", en: "If necessary, adhere to Change Management policies.", es: "Si es necesario, consulte la política de Gestión de Cambios (Change Management)." },
  fund_step4_b3: { pt: "Execute a correção passo a passo de forma cirúrgica.", en: "Execute the fix step by step with surgical precision.", es: "Ejecute la corrección paso a paso de forma quirúrgica." },

  fund_step5_title: { pt: "5. Verificar Funcionalidade e Prevenção (Verify & Prevent)", en: "5. Verify Full System Functionality & Prevent", es: "5. Verificar Funcionalidad Completa y Prevención" },
  fund_step5_b1: { pt: "Valide se todo o sistema está 100% funcional na presença do próprio usuário.", en: "Validate that the system is 100% operational in the user's presence.", es: "Valide que todo el sistema esté 100% operativo en presencia del propio usuario." },
  fund_step5_b2: { pt: "Aplique medidas preventivas (ex: orientar o usuário, limpar arquivos temporários, criar regra).", en: "Apply preventive measures (e.g. educate user, clean cache, add firewall rule).", es: "Aplique medidas preventivas (ej: orientar al usuario, limpiar caché, crear regla)." },

  fund_step6_title: { pt: "6. Documentar Descobertas, Ações e Resultados (Document)", en: "6. Document Findings, Actions, and Outcomes", es: "6. Documentar Hallazgos, Acciones y Resultados" },
  fund_step6_b1: { pt: "Registre detalhadamente a causa raiz e a resolução na Base de Conhecimento (KB / Ticket).", en: "Record root cause and resolution details in Knowledge Base / Ticket logs.", es: "Registre detalladamente la causa raíz y resolución en la Base de Conocimiento (KB)." },
  fund_step6_b2: { pt: "Permite que outros técnicos resolvam o mesmo problema rapidamente no futuro.", en: "Enables other technicians to solve identical incidents rapidly in the future.", es: "Permite que otros técnicos resuelvan el mismo incidente rápidamente en el futuro." },

  // ITIL Section
  fund_itil_title: { pt: "ITIL 4: O Vocabulário Corporativo Obrigatório do Service Desk", en: "ITIL 4: Essential Corporate Service Desk Terminology", es: "ITIL 4: Terminología Corporativa Esencial de Service Desk" },
  fund_itil_desc: { pt: "No mercado corporativo global, a ITIL rege todos os processos de suporte. Entender essas definições é decisivo para entrevistas técnicas:", en: "In the global corporate ecosystem, ITIL governs all IT support workflows. Mastering these definitions is critical for technical interviews:", es: "En el ecosistema corporativo global, ITIL rige todos los procesos de soporte. Dominar estas definiciones es crítico para entrevistas técnicas:" },
  fund_itil_inc_title: { pt: "🚨 Incidente (Incident)", en: "🚨 Incident", es: "🚨 Incidente" },
  fund_itil_inc_desc: { pt: "Uma interrupção não planejada de um serviço ou redução na sua qualidade. Meta do N1: Restaurar o serviço normal o mais rápido possível.", en: "An unplanned interruption or quality reduction of an IT service. N1 goal: Restore normal service operation as quickly as possible.", es: "Una interrupción no planificada o degradación de calidad de un servicio. Meta N1: Restaurar la operación normal lo más rápido posible." },
  fund_itil_req_title: { pt: "📝 Requisição de Serviço (Service Request)", en: "📝 Service Request", es: "📝 Solicitud de Servicio" },
  fund_itil_req_desc: { pt: "Uma solicitação formal de um usuário para algo padrão e esperado (ex: reset de senha, novo mouse, acesso a pasta).", en: "A formal request from a user for something standard and planned (e.g. password reset, new mouse, folder access).", es: "Una solicitud formal de un usuario para algo estándar y planificado (ej: reseteo de contraseña, nuevo ratón, acceso a carpeta)." },
  fund_itil_prob_title: { pt: "🔍 Problema (Problem)", en: "🔍 Problem", es: "🔍 Problema" },
  fund_itil_prob_desc: { pt: "A causa desconhecida ou raiz de um ou múltiplos incidentes recorrentes (ex: VPN caindo todo dia às 15h).", en: "The underlying root cause of one or multiple recurring incidents (e.g. VPN disconnecting daily at 3 PM).", es: "La causa raíz subyacente de uno o múltiples incidentes recurrentes (ej: VPN cayéndose a diario a las 15:00)." },
  fund_itil_sla_title: { pt: "⏱️ SLA (Service Level Agreement)", en: "⏱️ SLA (Service Level Agreement)", es: "⏱️ SLA (Acuerdo de Nivel de Servicio)" },
  fund_itil_sla_desc: { pt: "Acordo formal que define os tempos máximos de primeira resposta e de resolução com base em Impacto e Urgência.", en: "Formal agreement defining maximum first-response and resolution deadlines based on Impact and Urgency.", es: "Acuerdo formal que define los tiempos máximos de primera respuesta y resolución basados en Impacto y Urgencia." },

  // Soft Skills Section
  fund_soft_title: { pt: "Comunicação Não-Violenta & Gerenciamento de Usuários", en: "Empathetic Communication & Handling Difficult Users", es: "Comunicación Empática y Manejo de Usuarios Difíciles" },
  fund_soft_desc: { pt: "Mais de 60% da avaliação em entrevistas de Help Desk foca em inteligência emocional e resolução de conflitos:", en: "Over 60% of evaluation in Help Desk interviews focuses on emotional intelligence and conflict de-escalation:", es: "Más del 60% de la evaluación en entrevistas de Help Desk se enfoca en inteligencia emocional y resolución de conflictos:" },
  fund_soft_u1_title: { pt: "1. Usuário Nervoso / Frustrado", en: "1. Angry / Frustrated User", es: "1. Usuario Molesto / Frustrado" },
  fund_soft_u1_desc: { pt: "Nunca responda com hostilidade ou jargão técnico. Pratique a escuta ativa e acolhimento.", en: "Never respond with hostility or complex jargon. Practice active listening and validate their urgency.", es: "Nunca responda con hostilidad o jerga compleja. Practique la escucha activa y valide su urgencia." },
  fund_soft_u1_quote: { pt: '"Entendo perfeitamente o impacto dessa lentidão no seu trabalho. Vou acompanhar o seu caso até resolvermos juntos."', en: '"I completely understand how critical this issue is for your work. I will stay with you until we resolve this together."', es: '"Entiendo perfectamente el impacto de este problema en su trabajo. Acompañaré su caso hasta resolverlo juntos."' },

  fund_soft_u2_title: { pt: "2. Usuário VIP / Executivo", en: "2. VIP / Executive User", es: "2. Usuario VIP / Ejecutivo" },
  fund_soft_u2_desc: { pt: "Valoriza agilidade máxima, discrição e comunicação direta sem rodeios.", en: "Values maximum agility, discretion, and direct, concise communication.", es: "Valora máxima agilidad, discreción y comunicación directa y concisa." },
  fund_soft_u2_quote: { pt: '"Diretor, identificamos a falha na placa de rede. A correção levará 3 minutos. Posso assumir o controle remoto agora?"', en: '"Director, we identified the network adapter issue. The fix takes 3 minutes. May I take remote control now?"', es: '"Director, identificamos la falla en la red. La solución tomará 3 minutos. ¿Puedo tomar control remoto ahora?"' },

  fund_soft_u3_title: { pt: "3. Usuário Leigo", en: "3. Non-Technical User", es: "3. Usuario No Técnico" },
  fund_soft_u3_desc: { pt: "Não fale sobre 'DHCP', 'DNS' ou 'Registros'. Use analogias simples e passos visuais guiados.", en: "Avoid mentioning 'DHCP', 'DNS' or 'Registry keys'. Use everyday analogies and guided visual steps.", es: "Evite mencionar 'DHCP', 'DNS' o 'Registros'. Use analogías cotidianas y pasos visuales guiados." },
  fund_soft_u3_quote: { pt: '"Poderia pressionar a tecla Windows ao lado do espaço e a letra R juntas, e digitar cmd?"', en: '"Could you press the Windows key next to the spacebar together with the letter R, and type cmd?"', es: '"¿Podría presionar la tecla Windows al lado del espacio y la letra R juntas, y escribir cmd?"' },

  // Checklist Section
  fund_chk_title: { pt: "Checklist de Ouro para Atendimento N1 Perfeito", en: "Golden Checklist for Flawless N1 Support", es: "Lista de Oro para Atención N1 Impecable" },
  fund_chk_desc: { pt: "Guarde este checklist mental para gabaritar suas simulações e atendimentos diários:", en: "Keep this mental checklist ready to ace your simulations and everyday tickets:", es: "Tenga presente esta lista mental para superar con éxito sus simulaciones y tickets diarios:" },
  fund_chk_1: { pt: "1. Saudação Profissional & Abertura: Cumprimentar pelo nome, confirmar ID do chamado e validar sintomas.", en: "1. Professional Greeting & Opening: Greet by name, confirm ticket ID, and validate symptoms.", es: "1. Saludo Profesional y Apertura: Saludar por el nombre, confirmar ID del ticket y validar síntomas." },
  fund_chk_2: { pt: "2. Isolamento de Causa Raiz: Executar testes de eliminação (ping, ipconfig, status físico, checagem de cabos).", en: "2. Root Cause Isolation: Run elimination tests (ping, ipconfig, hardware status, cable check).", es: "2. Aislamiento de Causa Raíz: Ejecutar pruebas de descarte (ping, ipconfig, estado de hardware, cables)." },
  fund_chk_3: { pt: "3. Aplicação da Ação Corretiva: Explicar ao usuário o que será feito antes de executar o comando.", en: "3. Implementation of Corrective Action: Explain the action to the user before running the command.", es: "3. Aplicación de Acción Correctiva: Explicar al usuario la acción antes de ejecutar el comando." },
  fund_chk_4: { pt: "4. Validação com o Usuário: Pedir para o usuário testar pessoalmente antes de fechar o chamado.", en: "4. User Validation: Have the user personally test the application before closing the ticket.", es: "4. Validación con el Usuario: Solicitar al usuario que pruebe personalmente antes de cerrar el ticket." },
  fund_chk_5: { pt: "5. Documentação e Fechamento com Nota Técnica: Registrar a solução detalhada no histórico do ITSM.", en: "5. Documentation & Technical Closure: Record full resolution details into ITSM ticket history.", es: "5. Documentación y Cierre con Nota Técnica: Registrar la solución detallada en el historial ITSM." },

  // Academy Page
  acad_badge: { pt: "Trilha de Capacitação Técnica", en: "Technical Training Track", es: "Ruta de Capacitación Técnica" },
  acad_title: { pt: "Academy • Laboratórios Práticos N1 / N2", en: "Academy • Practical N1 / N2 Labs", es: "Academy • Laboratorios Prácticos N1 / N2" },
  acad_subtitle: { pt: "42 cenários reais de atendimento estruturados para entrevistas técnicas e preparação para o mercado de trabalho.", en: "42 real-world support scenarios tailored for technical interviews and job readiness.", es: "42 escenarios reales de soporte diseñados para entrevistas técnicas y preparación laboral." },
  acad_filter_all: { pt: "Todos os Níveis", en: "All Levels", es: "Todos los Niveles" },
  acad_filter_n1: { pt: "🎯 Apenas N1 (Iniciante)", en: "🎯 N1 Only (Beginner)", es: "🎯 Solo N1 (Principiante)" },
  acad_filter_n2: { pt: "⚡ Apenas N2 & Desafios", en: "⚡ N2 & Challenges", es: "⚡ Solo N2 y Desafíos" },
  acad_start_lab: { pt: "Entrar no Lab ➔", en: "Start Lab ➔", es: "Iniciar Lab ➔" },
  acad_completed: { pt: "✓ Concluído", en: "✓ Completed", es: "✓ Completado" },

  // Flashcards Page
  fc_badge: { pt: "🧠 Repetição Espaçada • Modo Anki", en: "🧠 Spaced Repetition • Anki Mode", es: "🧠 Repetición Espaciada • Modo Anki" },
  fc_level: { pt: "Nível N1 (Iniciante)", en: "N1 Level (Beginner)", es: "Nivel N1 (Principiante)" },
  fc_title: { pt: "Flashcards de Fixação Rápida", en: "Quick Recall Flashcards", es: "Tarjetas de Memorización Rápida" },
  fc_subtitle: { pt: "Memorize os conceitos, comandos de terminal e passos de troubleshooting cobrados em entrevistas técnicas.", en: "Master the concepts, terminal commands, and troubleshooting steps asked in technical interviews.", es: "Memoriza los conceptos, comandos de terminal y pasos de soporte técnico de entrevistas." },
  fc_card_counter: { pt: "Card", en: "Card", es: "Tarjeta" },
  fc_of: { pt: "de", en: "of", es: "de" },
  fc_mastered: { pt: "Dominados", en: "Mastered", es: "Dominadas" },
  fc_mark_mastered: { pt: "☆ Marcar como Dominado", en: "☆ Mark as Mastered", es: "☆ Marcar como Dominada" },
  fc_is_mastered: { pt: "★ Dominado", en: "★ Mastered", es: "★ Dominada" },
  fc_prev_btn: { pt: "← Card Anterior", en: "← Previous Card", es: "← Tarjeta Anterior" },
  fc_flip_btn_reveal: { pt: "Revelar Resposta", en: "Reveal Answer", es: "Revelar Respuesta" },
  fc_flip_btn_hide: { pt: "Ocultar Resposta", en: "Hide Answer", es: "Ocultar Respuesta" },
  fc_next_btn: { pt: "Próximo Card →", en: "Next Card →", es: "Siguiente Tarjeta →" },
  fc_hint_btn: { pt: "💡 Ver dica rápida", en: "💡 Show quick hint", es: "💡 Ver pista rápida" },

  // Exam Page
  exam_badge: { pt: "🎓 Exame Oficial • CompTIA A+ Core 1 (220-1201)", en: "🎓 Official Exam • CompTIA A+ Core 1 (220-1201)", es: "🎓 Examen Oficial • CompTIA A+ Core 1 (220-1201)" },
  exam_v15_badge: { pt: "V15 (Versão Mais Recente)", en: "V15 (Latest Version)", es: "V15 (Versión Más Reciente)" },
  exam_title: { pt: "Simulador de Certificação Internacional", en: "International Certification Simulator", es: "Simulador de Certificación Internacional" },
  exam_subtitle: { pt: "50 questões baseadas em cenários reais, portas TCP/IP, hardware e metodologia de Troubleshooting.", en: "50 questions based on real-world scenarios, TCP/IP ports, hardware and Troubleshooting.", es: "50 preguntas basadas en escenarios reales, puertos TCP/IP, hardware y resolución de problemas." },
  exam_restart_btn: { pt: "Reiniciar Simulado", en: "Restart Exam", es: "Reiniciar Simulador" },
  exam_question_counter: { pt: "Questão", en: "Question", es: "Pregunta" },
  exam_answered: { pt: "Respondidas", en: "Answered", es: "Respondidas" },
  exam_scenario_label: { pt: "📋 CENÁRIO DE SUPORTE:", en: "📋 SUPPORT SCENARIO:", es: "📋 ESCENARIO DE SOPORTE:" },
  exam_show_expl: { pt: "💡 Ver Gabarito & Explicação", en: "💡 Show Answer & Explanation", es: "💡 Ver Respuesta y Explicación" },
  exam_hide_expl: { pt: "💡 Ocultar Explicação", en: "💡 Hide Explanation", es: "💡 Ocultar Explicación" },
  exam_prev_btn: { pt: "← Anterior", en: "← Previous", es: "← Anterior" },
  exam_next_btn: { pt: "Próxima Questão ➔", en: "Next Question ➔", es: "Siguiente Pregunta ➔" },
  exam_finish_btn: { pt: "Finalizar Exame ➔", en: "Finish Exam ➔", es: "Finalizar Examen ➔" },

  // Ticket Room
  chat_room_badge: { pt: "SALA DE ATENDIMENTO", en: "SUPPORT ROOM", es: "SALA DE ATENCIÓN" },
  chat_status_open: { pt: "Em Atendimento", en: "In Progress", es: "En Atención" },
  chat_status_resolved: { pt: "Resolvido", en: "Resolved", es: "Resuelto" },
  chat_user_profile: { pt: "Perfil do Solicitante", en: "Requester Profile", es: "Perfil del Solicitante" },
  chat_priority: { pt: "Prioridade:", en: "Priority:", es: "Prioridad:" },
  chat_difficulty: { pt: "Dificuldade:", en: "Difficulty:", es: "Dificultad:" },
  chat_category: { pt: "Categoria:", en: "Category:", es: "Categoría:" },
  chat_input_placeholder: { pt: "Digite sua mensagem para o usuário ou instrução técnica...", en: "Type your message to the user or technical instruction...", es: "Escriba su mensaje al usuario o instrucción técnica..." },
  chat_send_btn: { pt: "Enviar", en: "Send", es: "Enviar" },
  chat_resolve_btn: { pt: "Resolver Incidente", en: "Resolve Incident", es: "Resolver Incidente" },
  chat_guide_title: { pt: "Guia Didático do Chamado (Passo a Passo)", en: "Step-by-Step Troubleshooting Guide", es: "Guía Didáctica del Ticket (Paso a Paso)" },
  chat_guide_what_happening: { pt: "O que está acontecendo?", en: "What is happening?", es: "¿Qué está pasando?" },
  chat_guide_how_investigate: { pt: "Como Investigar (Sintomas):", en: "How to Investigate (Symptoms):", es: "¿Cómo Investigar (Síntomas)?" },
  chat_guide_golden_question: { pt: "Pergunta de Ouro para o Usuário:", en: "Golden Question for the User:", es: "Pregunta de Oro para el Usuario:" },
  chat_guide_copy_btn: { pt: "Copiar para o campo de texto ↵", en: "Copy to chat input ↵", es: "Copiar al chat ↵" },
  chat_guide_solution: { pt: "Como Resolver (Ação Técnica N1/N2):", en: "How to Solve (Technical Action):", es: "¿Cómo Resolver (Acción Técnica):" },
  chat_guide_commands: { pt: "Comandos Rápidos:", en: "Quick Commands:", es: "Comandos Rápidos:" },

  // Flashcards Categories & Extras
  fc_cat_all: { pt: "TODAS", en: "ALL", es: "TODAS" },
  fc_cat_redes: { pt: "Redes", en: "Networks", es: "Redes" },
  fc_cat_vpn: { pt: "VPN", en: "VPN", es: "VPN" },
  fc_cat_hardware: { pt: "Hardware", en: "Hardware", es: "Hardware" },
  fc_cat_ad: { pt: "Active Directory", en: "Active Directory", es: "Active Directory" },
  fc_cat_m365: { pt: "Microsoft 365", en: "Microsoft 365", es: "Microsoft 365" },
  fc_cat_seg: { pt: "Segurança", en: "Security", es: "Seguridad" },

  fc_question_label: { pt: "PERGUNTA / SITUAÇÃO", en: "QUESTION / SITUATION", es: "PREGUNTA / SITUACIÓN" },
  fc_hint_label: { pt: "💡 Dica:", en: "💡 Hint:", es: "💡 Pista:" },
  fc_answer_label: { pt: "RESPOSTA / RESOLUÇÃO N1", en: "ANSWER / N1 RESOLUTION", es: "RESPUESTA / RESOLUCIÓN N1" },
  fc_click_to_flip_back: { pt: "Clique para voltar à pergunta", en: "Click to flip back to question", es: "Haz clic para volver a la pregunta" },
  fc_click_to_flip: { pt: "Clique no card para virar ↵", en: "Click card to flip ↵", es: "Haz clic en la tarjeta para voltear ↵" },
  fc_hide_hint: { pt: "Ocultar dica", en: "Hide hint", es: "Ocultar pista" },
  fc_mark_memorized_title: { pt: "Marcar como memorizado", en: "Mark as memorized", es: "Marcar como memorizada" },

  // Dashboard Extras
  dash_loading: { pt: "Carregando painel de incidentes...", en: "Loading incident dashboard...", es: "Cargando panel de incidentes..." },
  dash_error_conn: { pt: "Não foi possível conectar ao servidor de chamados (backend:8000).", en: "Could not connect to the ticket server (backend:8000).", es: "No se pudo conectar al servidor de tickets (backend:8000)." },
  dash_error_title: { pt: "Falha de Conexão com o Backend", en: "Backend Connection Failure", es: "Fallo de Conexión con el Backend" },
  dash_btn_reconnect: { pt: "Reconectar", en: "Reconnect", es: "Reconectar" },
  dash_no_tickets: { pt: "Nenhum incidente encontrado para o filtro selecionado.", en: "No incidents found for the selected filter.", es: "No se encontraron incidentes para el filtro seleccionado." },

  dash_priority_critical: { pt: "Crítica", en: "Critical", es: "Crítica" },
  dash_priority_high: { pt: "Alta", en: "High", es: "Alta" },
  dash_priority_medium: { pt: "Média", en: "Medium", es: "Media" },
  dash_priority_low: { pt: "Baixa", en: "Low", es: "Baja" },
  dash_level_prefix: { pt: "Nível", en: "Level", es: "Nivel" },

  exam_domain_all: { pt: 'Todos os Domínios (Simulado Geral)', en: 'All Domains (Full Exam)', es: 'Todos los Dominios (Simulado Completo)' },
  exam_domain_1: { pt: '1.0 Mobile Devices (15%)', en: '1.0 Mobile Devices (15%)', es: '1.0 Dispositivos Móviles (15%)' },
  exam_domain_2: { pt: '2.0 Networking (20%)', en: '2.0 Networking (20%)', es: '2.0 Redes (20%)' },
  exam_domain_3: { pt: '3.0 Hardware (25%)', en: '3.0 Hardware (25%)', es: '3.0 Hardware (25%)' },
  exam_domain_4: { pt: '4.0 Cloud & Virtualization (11%)', en: '4.0 Cloud & Virtualization (11%)', es: '4.0 Nube y Virtualización (11%)' },
  exam_domain_5: { pt: '5.0 Troubleshooting (29%)', en: '5.0 Troubleshooting (29%)', es: '5.0 Resolución de Problemas (29%)' },
  exam_result_pass: { pt: 'Aprovado no Simulado CompTIA A+!', en: 'Passed the CompTIA A+ Exam Simulator!', es: '¡Aprobado en el Simulador CompTIA A+!' },
  exam_result_fail: { pt: 'Quase lá! Revise os Domínios de Estudo.', en: 'Not yet! Review your weak domains and try again.', es: '¡Casi! Revisa los dominios y vuelve a intentarlo.' },
  exam_cutoff_label: { pt: 'Nota de corte oficial da CompTIA:', en: 'Official CompTIA passing score:', es: 'Puntuación mínima oficial de CompTIA:' },
  exam_scale_label: { pt: '(Escala de 100 a 900)', en: '(Scale: 100 to 900)', es: '(Escala: 100 a 900)' },
  exam_score_label: { pt: 'Pontuação CompTIA', en: 'CompTIA Score', es: 'Puntuación CompTIA' },
  exam_score_of: { pt: '/ 900 pontos', en: '/ 900 points', es: '/ 900 puntos' },
  exam_accuracy_label: { pt: 'Precisão', en: 'Accuracy', es: 'Precisión' },
  exam_correct_label: { pt: 'corretas', en: 'correct', es: 'correctas' },
  exam_result_label: { pt: 'Resultado', en: 'Result', es: 'Resultado' },
  exam_new_test_btn: { pt: 'Fazer Novo Teste', en: 'Take New Test', es: 'Hacer Nuevo Examen' },
  exam_review_btn: { pt: 'Revisar Metodologia & ITIL', en: 'Review Methodology & ITIL', es: 'Revisar Metodología e ITIL' },
  exam_official_answer: { pt: 'Gabarito Oficial: Alternativa', en: 'Official Answer: Option', es: 'Respuesta Oficial: Alternativa' },

  // Evaluation / Audit Page
  eval_loading: { pt: 'Carregando auditoria de qualidade...', en: 'Loading quality audit...', es: 'Cargando auditoría de calidad...' },
  eval_unavailable: { pt: 'Auditoria Indisponível', en: 'Audit Unavailable', es: 'Auditoría No Disponible' },
  eval_not_finished: { pt: 'Este chamado ainda não foi finalizado com diagnóstico.', en: 'This ticket has not been resolved with a diagnosis yet.', es: 'Este ticket aún no ha sido finalizado con un diagnóstico.' },
  eval_back_queue: { pt: 'Voltar à Fila', en: 'Back to Queue', es: 'Volver a la Cola' },
  eval_attend_incident: { pt: 'Atender Incidente', en: 'Attend Incident', es: 'Atender Incidente' },
  eval_audit_qa: { pt: 'Auditoria & QA', en: 'Audit & QA', es: 'Auditoría y QA' },
  eval_report_title: { pt: 'Relatório de Encerramento e Auditoria de Qualidade', en: 'Closure Report & Quality Audit', es: 'Informe de Cierre y Auditoría de Calidad' },
  eval_restarting: { pt: 'Reiniciando...', en: 'Restarting...', es: 'Reiniciando...' },
  eval_redo_btn: { pt: 'Refazer Atendimento', en: 'Redo Support Session', es: 'Repetir Atención' },
  eval_finish_btn: { pt: 'Concluir e Voltar à Fila', en: 'Finish & Back to Queue', es: 'Finalizar y Volver a la Cola' },
  eval_approved: { pt: 'Conforme / Aprovado', en: 'Compliant / Approved', es: 'Conforme / Aprobado' },
  eval_needs_review: { pt: 'Revisão Necessária', en: 'Review Required', es: 'Revisión Necesaria' },
  eval_complexity: { pt: 'Complexidade', en: 'Complexity', es: 'Complejidad' },
  eval_requester: { pt: 'Solicitante', en: 'Requester', es: 'Solicitante' },
  eval_strengths: { pt: 'Pontos Positivos Observados', en: 'Observed Strengths', es: 'Puntos Positivos Observados' },
  eval_improvements: { pt: 'Oportunidades de Melhoria', en: 'Improvement Opportunities', es: 'Oportunidades de Mejora' },
  eval_technical_analysis: { pt: 'Análise Técnica do Diagnóstico', en: 'Technical Diagnosis Analysis', es: 'Análisis Técnico del Diagnóstico' },
  eval_submitted_diagnosis: { pt: 'Diagnóstico Submetido pelo Técnico', en: 'Diagnosis Submitted by Technician', es: 'Diagnóstico Enviado por el Técnico' },
  eval_expected_solution: { pt: 'Gabarito Técnico Esperado', en: 'Expected Technical Solution', es: 'Solución Técnica Esperada' },
  eval_qa_opinion: { pt: 'Parecer do Auditor de Qualidade', en: 'Quality Auditor Assessment', es: 'Dictamen del Auditor de Calidad' },
  acad_beginner: { pt: 'Iniciante', en: 'Beginner', es: 'Principiante' },
  acad_intermediate: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio' },
  acad_section1_title: { pt: '1. O que está acontecendo aqui? (Causa Raiz Explicada)', en: '1. What is happening here? (Root Cause Explained)', es: '1. ¿Qué está pasando aquí? (Causa Raíz Explicada)' },
  acad_section2_title: { pt: '2. O que você deve perguntar ao usuário? (Investigação)', en: '2. What should you ask the user? (Investigation)', es: '2. ¿Qué debes preguntar al usuario? (Investigación)' },
  acad_section3_title: { pt: '3. Passo a Passo da Solução Técnica', en: '3. Step-by-Step Technical Solution', es: '3. Solución Técnica Paso a Paso' },
  acad_golden_question_label: { pt: 'Pergunta de Ouro para fazer no Chat:', en: 'Golden Question to ask in Chat:', es: 'Pregunta Clave para hacer en el Chat:' },
  acad_commands_label: { pt: 'Comandos / Atalhos Rápidos:', en: 'Commands / Quick Shortcuts:', es: 'Comandos / Atajos Rápidos:' },

  // Settings Page
  settings_breadcrumb: { pt: 'Configurações', en: 'Settings', es: 'Configuraciones' },
  settings_title: { pt: 'Parâmetros do Motor de Simulação', en: 'Simulation Engine Parameters', es: 'Parámetros del Motor de Simulación' },
  settings_ai_provider_section: { pt: 'Provedor & Conexão de IA', en: 'AI Provider & Connection', es: 'Proveedor y Conexión de IA' },
  settings_ai_provider_desc: { pt: 'Defina se usará o simulador de regras offline ou uma LLM externa/local.', en: 'Choose whether to use the offline rule-based simulator or an external/local LLM.', es: 'Defina si usará el simulador de reglas offline o una LLM externa/local.' },
  settings_provider_label: { pt: 'Provedor de Simulação', en: 'Simulation Provider', es: 'Proveedor de Simulación' },
  settings_provider_mock: { pt: 'Simulador Estático de Regras (Offline / Sem API Key)', en: 'Static Rule Simulator (Offline / No API Key)', es: 'Simulador Estático de Reglas (Offline / Sin API Key)' },
  settings_provider_openrouter: { pt: 'OpenRouter (Acesso a DeepSeek, Claude, Llama 3, etc.)', en: 'OpenRouter (Access to DeepSeek, Claude, Llama 3, etc.)', es: 'OpenRouter (Acceso a DeepSeek, Claude, Llama 3, etc.)' },
  settings_provider_gemini: { pt: 'Google Gemini (API Oficial Google AI Studio)', en: 'Google Gemini (Official Google AI Studio API)', es: 'Google Gemini (API Oficial Google AI Studio)' },
  settings_provider_openai: { pt: 'OpenAI (GPT-4o, GPT-4o-mini)', en: 'OpenAI (GPT-4o, GPT-4o-mini)', es: 'OpenAI (GPT-4o, GPT-4o-mini)' },
  settings_provider_ollama: { pt: 'Ollama / LM Studio (Localhost compatível)', en: 'Ollama / LM Studio (Localhost compatible)', es: 'Ollama / LM Studio (Compatible con Localhost)' },
  settings_hint_openrouter: { pt: 'Use sua chave do OpenRouter para acessar qualquer modelo de ponta.', en: 'Use your OpenRouter API key to access any state-of-the-art model.', es: 'Use su clave de OpenRouter para acceder a cualquier modelo avanzado.' },
  settings_hint_gemini: { pt: 'Use sua API Key gratuita do Google AI Studio (aistudio.google.com).', en: 'Use your free API Key from Google AI Studio (aistudio.google.com).', es: 'Use su API Key gratuita de Google AI Studio (aistudio.google.com).' },
  settings_hint_openai: { pt: 'Use sua chave oficial da OpenAI (sk-...).' , en: 'Use your official OpenAI API key (sk-...).', es: 'Use su clave oficial de OpenAI (sk-...).' },
  settings_hint_ollama: { pt: 'Conecte-se ao seu servidor local Ollama sem custos de API.', en: 'Connect to your local Ollama server with zero API costs.', es: 'Conéctese a su servidor local de Ollama sin costos de API.' },
  settings_hint_mock: { pt: 'O modo estático responde com regras inteligentes sem gastar tokens.', en: 'Static mode responds with smart rules without spending tokens.', es: 'El modo estático responde con reglas inteligentes sin gastar tokens.' },
  settings_model_label: { pt: 'Identificador do Modelo (LLM)', en: 'Model Identifier (LLM)', es: 'Identificador del Modelo (LLM)' },
  settings_model_desc: { pt: 'Nome do modelo na API (ex:', en: 'Model name in the API (e.g.', es: 'Nombre del modelo en la API (ej:' },
  settings_key_openrouter: { pt: 'Chave de API OpenRouter (sk-or-v1-...)', en: 'OpenRouter API Key (sk-or-v1-...)', es: 'Clave de API OpenRouter (sk-or-v1-...)' },
  settings_key_gemini: { pt: 'Chave de API Google AI Studio (AIzaSy...)', en: 'Google AI Studio API Key (AIzaSy...)', es: 'Clave de API Google AI Studio (AIzaSy...)' },
  settings_key_openai: { pt: 'Chave de API OpenAI (sk-...)', en: 'OpenAI API Key (sk-...)', es: 'Clave de API OpenAI (sk-...)' },
  settings_url_ollama: { pt: 'Base URL do Endpoint Ollama', en: 'Ollama Endpoint Base URL', es: 'URL Base del Endpoint de Ollama' },
  settings_get_key_at: { pt: 'Obtenha sua chave em', en: 'Get your key at', es: 'Obtenga su clave en' },
  settings_get_free_key_at: { pt: 'Obtenha sua chave gratuita em', en: 'Get your free key at', es: 'Obtenga su clave gratuita en' },
  settings_key_security_notice: { pt: 'Chave persistida apenas na base de dados SQLite local.', en: 'Key stored only in the local SQLite database.', es: 'Clave persistida únicamente en la base de datos SQLite local.' },
  settings_temperature: { pt: 'Temperatura:', en: 'Temperature:', es: 'Temperatura:' },
  settings_temperature_hint: { pt: 'Determinismo / Variabilidade', en: 'Determinism / Variability', es: 'Determinismo / Variabilidad' },
  settings_response_mode: { pt: 'Comportamento de Resposta', en: 'Response Behavior', es: 'Comportamiento de Respuesta' },
  settings_mode_instant: { pt: 'Instantâneo (Sem atraso de digitação)', en: 'Instant (No typing delay)', es: 'Instantáneo (Sin retraso de escritura)' },
  settings_mode_realistic: { pt: 'Realista (Simula latência e digitação do usuário)', en: 'Realistic (Simulates latency and user typing)', es: 'Realista (Simula latencia y escritura del usuario)' },
  settings_save_btn: { pt: 'Salvar Parâmetros', en: 'Save Parameters', es: 'Guardar Parámetros' },
  settings_saving_btn: { pt: 'Salvando...', en: 'Saving...', es: 'Guardando...' },
  settings_msg_saved: { pt: 'Configurações salvas com sucesso!', en: 'Settings saved successfully!', es: '¡Configuraciones guardadas con éxito!' },
  settings_msg_save_error: { pt: 'Erro ao salvar configurações no servidor.', en: 'Error saving settings on server.', es: 'Error al guardar configuraciones en el servidor.' },
  settings_msg_load_error: { pt: 'Erro ao carregar configurações. O backend está ativo?', en: 'Error loading settings. Is backend active?', es: 'Error al cargar configuraciones. ¿El backend está activo?' },
  settings_loading: { pt: 'Carregando parâmetros...', en: 'Loading parameters...', es: 'Cargando parámetros...' },
  settings_reset_title: { pt: 'Restauração de Fábrica', en: 'Factory Reset', es: 'Restauración de Fábrica' },
  settings_reset_desc: { pt: 'Restaura a base SQLite local para o estado inicial contendo os 10 incidentes padronizados e limpa o histórico de chat.', en: 'Restores the local SQLite database to the initial state containing the 10 standard incidents and clears chat history.', es: 'Restaura la base SQLite local al estado inicial que contiene los 10 incidentes estandarizados y limpia el historial de chat.' },
  settings_reset_btn: { pt: 'Restaurar Banco de Dados', en: 'Reset Database', es: 'Restaurar Base de Datos' },
  settings_resetting_btn: { pt: 'Restaurando...', en: 'Restoring...', es: 'Restaurando...' },
  settings_msg_reset_success: { pt: 'Base de dados redefinida com sucesso!', en: 'Database reset successfully!', es: '¡Base de datos restablecida con éxito!' },
  settings_msg_reset_error: { pt: 'Erro ao resetar o banco de dados.', en: 'Error resetting database.', es: 'Error al restablecer la base de datos.' },
  settings_reset_confirm: { pt: 'Tem certeza que deseja restaurar o banco? Isso redefinirá os incidentes e mensagens para os 10 cenários padrões.', en: 'Are you sure you want to reset the database? This will reset tickets and messages to the 10 standard scenarios.', es: '¿Está seguro de que desea restaurar la base de datos? Esto restablecerá los incidentes y mensajes a los 10 escenarios estándar.' },

  // New Ticket Page
  new_ticket_breadcrumb: { pt: 'Novo Registro', en: 'New Ticket', es: 'Nuevo Registro' },
  new_ticket_title: { pt: 'Abertura de Incidente / Simulação', en: 'Create Incident / Simulation', es: 'Apertura de Incidente / Simulación' },
  new_ticket_section_params: { pt: 'Parâmetros de Triagem', en: 'Triage Parameters', es: 'Parámetros de Triaje' },
  new_ticket_params_hint: { pt: 'Campos não preenchidos serão sorteados pelo simulador.', en: 'Unfilled fields will be randomly generated by the simulator.', es: 'Los campos no completados serán sorteados por el simulador.' },
  new_ticket_category_label: { pt: 'Categoria do Serviço', en: 'Service Category', es: 'Categoría del Servicio' },
  new_ticket_category_random: { pt: 'Aleatória (Sorteio entre todas as categorias)', en: 'Random (Drawn from all categories)', es: 'Aleatoria (Sorteo entre todas las categorías)' },
  new_ticket_difficulty_label: { pt: 'Complexidade Técnica', en: 'Technical Complexity', es: 'Complejidad Técnica' },
  new_ticket_difficulty_random: { pt: 'Aleatória (N1, N2 ou Desafio)', en: 'Random (Tier 1, Tier 2 or Challenge)', es: 'Aleatoria (N1, N2 o Desafío)' },
  new_ticket_diff_n1: { pt: 'Nível 1 (N1) — Procedimento Padrão / Resolução Conhecida', en: 'Tier 1 (N1) — Standard Procedure / Known Fix', es: 'Nivel 1 (N1) — Procedimiento Estándar / Resolución Conocida' },
  new_ticket_diff_n2: { pt: 'Nível 2 (N2) — Investigação Técnica / Análise Intermediária', en: 'Tier 2 (N2) — Technical Investigation / Intermediate Analysis', es: 'Nivel 2 (N2) — Investigación Técnica / Análisis Intermedio' },
  new_ticket_diff_challenge: { pt: 'Nível Desafio — Diagnóstico Oculto / Sintomas Ambíguos', en: 'Challenge Tier — Hidden Diagnosis / Ambiguous Symptoms', es: 'Nivel Desafío — Diagnóstico Oculto / Síntomas Ambiguos' },
  new_ticket_profile_label: { pt: 'Perfil Comportamental do Solicitante', en: 'Requester Behavioral Profile', es: 'Perfil Conductual del Solicitante' },
  new_ticket_profile_random: { pt: 'Aleatório (Sorteado pelo motor de simulação)', en: 'Random (Drawn by simulation engine)', es: 'Aleatorio (Sorteado por el motor de simulación)' },
  new_ticket_prof_leigo: { pt: 'LEIGO — Termos vagos, não técnico, dificuldade de orientações', en: 'LAYMAN — Vague terms, non-technical, needs guidance', es: 'LEGO — Términos vagos, no técnico, dificultad con instrucciones' },
  new_ticket_prof_apressado: { pt: 'APRESSADO — Respostas curtas, reclama de reuniões/prazos', en: 'RUSHED — Short replies, complains about meetings/deadlines', es: 'APURADO — Respuestas cortas, se queja de reuniones/plazos' },
  new_ticket_prof_confuso: { pt: 'CONFUSO — Confunde sistemas, omite detalhes importantes', en: 'CONFUSED — Confuses systems, omits key details', es: 'CONFUSO — Confunde sistemas, omite detalles importantes' },
  new_ticket_prof_gestor: { pt: 'GESTOR — Focado em impacto da equipe, exige previsões', en: 'MANAGER — Focused on team impact, demands ETAs', es: 'GERENTE — Enfocado en impacto del equipo, exige estimaciones' },
  new_ticket_prof_diretor: { pt: 'DIRETOR — Urgência corporativa, espera resolução imediata', en: 'EXECUTIVE — Corporate urgency, expects immediate fix', es: 'DIRECTOR — Urgencia corporativa, espera resolución inmediata' },
  new_ticket_prof_rh: { pt: 'RH — Comunicação amigável, impacto em pessoas/folha', en: 'HR — Friendly communication, payroll/people impact', es: 'RRHH — Comunicación amigable, impacto en personal/nómina' },
  new_ticket_prof_financeiro: { pt: 'FINANCEIRO — Preocupado com fechamento e planilhas', en: 'FINANCE — Concerned with billing/spreadsheets', es: 'FINANCIERO — Preocupado por cierres y hojas de cálculo' },
  new_ticket_prof_tecnico: { pt: 'TÉCNICO — Tenta vocabulário de TI, executou passos prévios', en: 'TECH-SAVVY — Uses IT terms, performed prior steps', es: 'TÉCNICO — Intenta vocabulario de TI, ejecutó pasos previos' },
  new_ticket_prof_ansioso: { pt: 'ANSIOSO — Medo de perda de arquivos e dados locais', en: 'ANXIOUS — Afraid of data/file loss', es: 'ANSIOSO — Miedo a perder archivos y datos locales' },
  new_ticket_priority_label: { pt: 'Classificação de Impacto / Urgência', en: 'Impact / Urgency Classification', es: 'Clasificación de Impacto / Urgencia' },
  new_ticket_priority_random: { pt: 'Aleatória (P1 a P4)', en: 'Random (P1 to P4)', es: 'Aleatoria (P1 a P4)' },
  new_ticket_prio_low: { pt: 'Baixa (P4) — Impacto isolado sem bloqueio crítico', en: 'Low (P4) — Isolated impact, non-blocking', es: 'Baja (P4) — Impacto aislado sin bloqueo crítico' },
  new_ticket_prio_med: { pt: 'Média (P3) — Impacto individual com degradação', en: 'Medium (P3) — Individual impact with degradation', es: 'Media (P3) — Impacto individual con degradación' },
  new_ticket_prio_high: { pt: 'Alta (P2) — Bloqueio de atividade urgente', en: 'High (P2) — Urgent activity blocked', es: 'Alta (P2) — Bloqueo de actividad urgente' },
  new_ticket_prio_crit: { pt: 'Crítica (P1) — Incidente de alto impacto corporativo', en: 'Critical (P1) — High corporate impact incident', es: 'Crítica (P1) — Incidente de alto impacto corporativo' },
  new_ticket_cancel_btn: { pt: 'Cancelar', en: 'Cancel', es: 'Cancelar' },
  new_ticket_create_btn: { pt: 'Criar e Iniciar Atendimento', en: 'Create & Start Support', es: 'Crear e Iniciar Atención' },
  new_ticket_creating_btn: { pt: 'Provisionando...', en: 'Provisioning...', es: 'Provisionando...' },
  new_ticket_err_create: { pt: 'Falha ao registrar e provisionar incidente no backend.', en: 'Failed to create and provision incident in backend.', es: 'Error al registrar y aprovisionar incidente en el backend.' },
  new_ticket_err_random: { pt: 'Erro ao gerar incidente aleatório.', en: 'Error generating random incident.', es: 'Error al generar incidente aleatorio.' },
  new_ticket_quick_title: { pt: 'Sorteio Rápido', en: 'Quick Draw', es: 'Sorteo Rápido' },
  new_ticket_quick_desc: { pt: 'Inicie imediatamente uma sessão de atendimento com parâmetros e sintomas 100% sorteados.', en: 'Immediately start a support session with 100% randomly drawn parameters and symptoms.', es: 'Inicie inmediatamente una sesión de atención con parámetros y síntomas 100% sorteados.' },
  new_ticket_quick_feat1: { pt: '• 17 categorias de problemas de Service Desk', en: '• 17 Service Desk problem categories', es: '• 17 categorías de problemas de Service Desk' },
  new_ticket_quick_feat2: { pt: '• 9 perfis corporativos de usuário', en: '• 9 corporate user profiles', es: '• 9 perfiles corporativos de usuario' },
  new_ticket_quick_feat3: { pt: '• Cenários com auditoria técnica integrada', en: '• Scenarios with integrated technical audit', es: '• Escenarios con auditoría técnica integrada' },
  new_ticket_quick_btn: { pt: 'Sortear Incidente Aleatório', en: 'Draw Random Incident', es: 'Sortear Incidente Aleatorio' },
  new_ticket_quick_generating: { pt: 'Gerando...', en: 'Generating...', es: 'Generando...' },

  // Chat Room Page
  chat_loading_console: { pt: 'Abrindo console do chamado...', en: 'Opening ticket console...', es: 'Abriendo consola del ticket...' },
  chat_error_title: { pt: 'Erro no Incidente', en: 'Incident Error', es: 'Error en el Incidente' },
  chat_error_not_found: { pt: 'Incidente não localizado.', en: 'Incident not found.', es: 'Incidente no encontrado.' },
  chat_view_qa_report: { pt: 'Ver Relatório de QA', en: 'View QA Report', es: 'Ver Informe de QA' },
  chat_restart_btn: { pt: 'Reiniciar', en: 'Restart', es: 'Reiniciar' },
  chat_restart_title: { pt: 'Reiniciar Atendimento', en: 'Restart Support Session', es: 'Reiniciar Atención' },
  chat_direct_channel: { pt: 'Canal Direto com Solicitante', en: 'Direct Channel with Requester', es: 'Canal Directo con el Solicitante' },
  chat_audit_logged: { pt: 'Registrado no log de auditoria', en: 'Logged in audit stream', es: 'Registrado en el log de auditoría' },
  chat_initial_desc_label: { pt: 'Descrição enviada pelo solicitante na abertura:', en: 'Description provided by requester at opening:', es: 'Descripción enviada por el solicitante en la apertura:' },
  chat_sender_agent: { pt: 'Técnico (Você)', en: 'Technician (You)', es: 'Técnico (Tú)' },
  chat_sender_user_prefix: { pt: 'Solicitante', en: 'Requester', es: 'Solicitante' },
  chat_typing_status: { pt: 'Solicitante respondendo', en: 'Requester typing', es: 'Solicitante respondiendo' },
  chat_closed_placeholder: { pt: 'Incidente finalizado. Não é possível enviar novas mensagens.', en: 'Ticket resolved. No further messages can be sent.', es: 'Incidente finalizado. No se pueden enviar nuevos mensajes.' },
  chat_waiting_placeholder: { pt: 'Aguardando resposta do solicitante...', en: 'Waiting for requester response...', es: 'Esperando respuesta del solicitante...' },
  chat_meta_title: { pt: 'Ficha do Incidente', en: 'Incident Record', es: 'Ficha del Incidente' },
  chat_behavior_note: { pt: 'Comportamento simulado com base no perfil comportamental corporativo.', en: 'Behavior simulated based on corporate user profile.', es: 'Comportamiento simulado según el perfil conductual corporativo.' },
  chat_modal_title: { pt: 'Encerramento de Incidente & Auditoria Técnica', en: 'Incident Closure & Technical Audit', es: 'Cierre de Incidente y Auditoría Técnica' },
  chat_modal_label: { pt: 'Nota Técnica de Resolução (Diagnóstico & Solução Aplicada):', en: 'Technical Resolution Note (Diagnosis & Applied Fix):', es: 'Nota Técnica de Resolución (Diagnóstico y Solución Aplicada):' },
  chat_modal_placeholder: { pt: 'Ex: Identificado cabo desconectado. Realizado teste com ping no gateway e liberado o acesso do usuário...', en: 'E.g. Disconnected cable identified. Verified via ping to gateway and restored access...', es: 'Ej: Se identificó cable desconectado. Se probó con ping al gateway y se restableció el acceso...' },
  chat_modal_disclaimer: { pt: 'Sua resposta será submetida ao avaliador de Qualidade (QA) para cálculo de pontuação e assertividade.', en: 'Your answer will be submitted to the Quality Auditor (QA) for scoring and accuracy assessment.', es: 'Su respuesta será enviada al evaluador de Calidad (QA) para calcular la puntuación y asertividad.' },
  chat_modal_cancel: { pt: 'Cancelar', en: 'Cancel', es: 'Cancelar' },
  chat_modal_submit: { pt: 'Concluir & Obter Avaliação', en: 'Submit & Get Evaluation', es: 'Concluir y Obtener Evaluación' },
  chat_modal_submitting: { pt: 'Processando Auditoria...', en: 'Processing Audit...', es: 'Procesando Auditoría...' },
  chat_confirm_restart: { pt: 'Deseja reiniciar a interação deste chamado? O histórico será limpo para novo teste.', en: 'Do you want to restart this ticket interaction? History will be cleared for a new attempt.', es: '¿Desea reiniciar la interacción de este ticket? Se borrará el historial para un nuevo intento.' },
  chat_err_load: { pt: 'Não foi possível carregar as informações do incidente.', en: 'Could not load incident details.', es: 'No se pudo cargar la información del incidente.' },
  chat_err_send: { pt: 'Falha ao enviar mensagem.', en: 'Failed to send message.', es: 'Error al enviar el mensaje.' },
  chat_err_restart: { pt: 'Erro ao reiniciar o chamado.', en: 'Error restarting ticket.', es: 'Error al reiniciar el ticket.' },
  chat_err_resolve: { pt: 'Erro ao encerrar chamado.', en: 'Error resolving ticket.', es: 'Error al cerrar el ticket.' },
  // Academy Modules & Badges
  acad_focus_badge: { pt: 'Foco N1 ➔ N2', en: 'Tier 1 ➔ Tier 2 Focus', es: 'Enfoque N1 ➔ N2' },
  acad_tab_active: { pt: 'Ativo', en: 'Active', es: 'Activo' },
  acad_tab_explore: { pt: 'Explorar', en: 'Explore', es: 'Explorar' },
  acad_labs_title: { pt: 'Laboratórios', en: 'Labs', es: 'Laboratorios' },
  acad_module_1_title: { pt: '1. Redes & Conectividade', en: '1. Networking & Connectivity', es: '1. Redes y Conectividad' },
  acad_module_1_desc: { pt: 'Domine a metodologia em camadas (OSI) para isolar falhas de IP, DHCP, DNS, VPN, Portas TCP e Gateway.', en: 'Master layered methodology (OSI) to isolate IP, DHCP, DNS, VPN, TCP Ports and Gateway faults.', es: 'Domine la metodología en capas (OSI) para aislar fallas de IP, DHCP, DNS, VPN, Puertos TCP y Gateway.' },
  acad_module_2_title: { pt: '2. Hardware & Diagnóstico', en: '2. Hardware & Diagnostics', es: '2. Hardware y Diagnóstico' },
  acad_module_2_desc: { pt: 'Resolva telas azuis (BSOD), falhas de vídeo, boot, lentidão, Dock Stations, carga residual e baterias.', en: 'Troubleshoot blue screens (BSOD), video, boot, slowness, Dock Stations, residual power and batteries.', es: 'Resuelva pantallas azules (BSOD), fallas de video, arranque, lentitud, Dock Stations, carga residual y baterías.' },
  acad_module_3_title: { pt: '3. Active Directory & Identidade', en: '3. Active Directory & Identity', es: '3. Active Directory e Identidad' },
  acad_module_3_desc: { pt: 'Gerencie contas, senhas expiradas, desbloqueios, onboarding/offboarding, grupos de segurança e GPOs.', en: 'Manage user accounts, expired passwords, unlocks, onboarding/offboarding, security groups and GPOs.', es: 'Gestione cuentas, contraseñas expiradas, desbloqueos, onboarding/offboarding, grupos de seguridad y GPOs.' },
  acad_module_4_title: { pt: '4. Microsoft 365 & E-mail', en: '4. Microsoft 365 & Email', es: '4. Microsoft 365 y Correo' },
  acad_module_4_desc: { pt: 'Solucione problemas de Spam/Lixo Eletrônico, licenças do Office, loop de senhas, Teams e OneDrive.', en: 'Resolve Spam/Junk mail issues, Office licenses, password loops, Teams and OneDrive.', es: 'Solucione problemas de Spam/No deseado, licencias de Office, bucle de contraseñas, Teams y OneDrive.' },
  acad_module_5_title: { pt: '5. Segurança & Microsoft Intune', en: '5. Security & Microsoft Intune', es: '5. Segurança y Microsoft Intune' },
  acad_module_5_desc: { pt: 'Resposta a incidentes de Phishing, falso positivo no Defender, certificados SSL e conformidade Intune.', en: 'Incident response for Phishing, Defender false positives, SSL certificates and Intune compliance.', es: 'Respuesta a incidentes de Phishing, falso positivo en Defender, certificados SSL y conformidad Intune.' },

  // Flashcard Types
  fc_type_comando: { pt: 'Comando', en: 'Command', es: 'Comando' },
  fc_type_conceito: { pt: 'Conceito', en: 'Concept', es: 'Concepto' },
  fc_type_troubleshooting: { pt: 'Troubleshooting', en: 'Troubleshooting', es: 'Troubleshooting' },
  fc_type_atalho: { pt: 'Atalho', en: 'Shortcut', es: 'Atajo' },
  fc_type_operacao: { pt: 'Operação', en: 'Operation', es: 'Operación' },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  language: "pt",
  setLanguage: () => {},
  t: (key: string) => key
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("servicedesk_lang") as Language;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("servicedesk_lang", lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
