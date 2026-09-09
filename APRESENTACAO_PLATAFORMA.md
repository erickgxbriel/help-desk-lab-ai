# 🖥️ ServiceDesk Lab — Apresentação Oficial da Plataforma

> **A plataforma interativa de simulação, capacitação e treinamento prático para Suporte Técnico de TI e Service Desk N1/N2 baseada em Inteligência Artificial e metodologias internacionais (CompTIA A+ & ITIL 4).**

---

## 📌 Sumário Executivo

O **ServiceDesk Lab** foi desenvolvido para preencher a lacuna entre a teoria acadêmica e a prática diária exigida no mercado de Tecnologia da Informação. Inspirado em ferramentas líderes de ITSM (*ServiceNow*, *Jira Service Management*, *Zendesk*) e em plataformas de aprendizado prático como *TryHackMe*, o sistema proporciona uma experiência imersiva onde analistas, estudantes e profissionais de suporte interagem com usuários simulados por Inteligência Artificial, investigam problemas reais, aplicam procedimentos padronizados e recebem auditoria de qualidade técnica automatizada.

---

## 🌐 Suporte Multilíngue Global (100% Internacionalizado)

A plataforma conta com internacionalização nativa completa através de um seletor dinâmico no cabeçalho:
* 🇧🇷 **Português (Brasil)**
* 🇺🇸 **Inglês (English - US)**
* 🇪🇸 **Espanhol (Español - LATAM)**

**100% do conteúdo é traduzido em tempo real**, incluindo:
- Interface do Usuário (Menus, botões, modais, tooltips e formulários);
- Teoria e Metodologias (6 Passos CompTIA, ITIL 4, Soft Skills);
- Trilhas do Academy (Causas-raiz, Perguntas de Ouro e Procedimentos);
- Cartões de Flashcards Anki (Perguntas, Respostas e Dicas);
- Simulado CompTIA A+ (Todas as 50 questões, cenários, alternativas e explicações);
- Fichas Técnicas de Chamados e Relatórios de Auditoria de QA.

---

## 🏛️ Arquitetura e Tecnologias

A aplicação foi desenvolvida seguindo padrões modernos de engenharia de software:

```
┌────────────────────────────────────────────────────────┐
│               ServiceDesk Lab Frontend                 │
│      Next.js 16 (App Router) + React 19 + TypeScript   │
│         Tailwind CSS v4 + Context API (i18n)           │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON)
┌───────────────────────────▼────────────────────────────┐
│                ServiceDesk Lab Backend                 │
│         FastAPI (Python 3.10+) + Pydantic v2           │
│        SQLAlchemy ORM + Banco de Dados SQLite          │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│             Motor Híbrido de Simulação                 │
│  • Google Gemini (AI Studio)  • OpenRouter (DeepSeek)  │
│  • OpenAI (GPT-4o)            • Ollama (Local/Offline) │
│  • Simulador Estático de Regras (Mock Offline)         │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Módulos e Funcionalidades da Plataforma

---

### 1. 📊 Fila de Incidentes & Dashboard ITSM (`/`)
Interface corporativa inspirada em plataformas corporativas reais de gerenciamento de serviços de TI.
* **KPIs em Tempo Real**:
  * Total de chamados na base de dados;
  * Incidentes abertos e pendentes;
  * Incidentes resolvidos com sucesso;
  * Nota Média Geral de Auditoria (0 a 100 pontos).
* **Filtros e Busca Instantânea**:
  * Filtros rápidos por status (*Todos*, *Apenas Abertos*, *Apenas Resolvidos*);
  * Filtro seletivo por Categoria de Serviço;
  * Busca instantânea por ID (ex: `HD-1001`), título, descrição ou perfil do usuário.
* **Tabela de Chamados Densa**:
  * Badges de Prioridade ITSM: **P1 - Crítica**, **P2 - Alta**, **P3 - Média**, **P4 - Baixa**;
  * Indicadores de Nível de Complexidade: **N1 (Iniciante)**, **N2 (Intermediário)** e **Desafio**;
  * Acesso rápido direto ao atendimento (`Atender ➔`) ou à auditoria (`Ver Avaliação`).

---

### 2. 📖 Metodologia & Teoria Geral (`/fundamentals`)
Base conceitual rigorosamente alinhada aos padrões globais de suporte de TI e certificações.
* **🎯 6 Passos Oficiais de Troubleshooting (CompTIA A+)**:
  1. *Identificar o Problema* (Coleta de sintomas, mudanças recentes, verificação de logs e backup prévio);
  2. *Estabelecer uma Teoria de Causa Provável* (Questionar o óbvio e Navalha de Occam);
  3. *Testar a Teoria para Determinar a Causa* (Testes controlados, confirmação ou escalonamento);
  4. *Estabelecer Plano de Ação e Implementar a Solução* (Mitigação de impactos e gestão de mudanças);
  5. *Verificar Funcionalidade Completa e Prevenção* (Validação com o usuário e boas práticas);
  6. *Documentar Descobertas, Ações e Resultados* (Base de conhecimento e histórico).
* **🏢 Fundamentos de ITIL 4 & SLA**:
  * Diferenças fundamentais entre **Incidentes**, **Requisições de Serviço**, **Problemas** e **Mudanças**;
  * Matriz de Impacto × Urgência e cumprimento de Acordo de Nível de Serviço (SLA).
* **🗣️ Soft Skills & Comunicação Corporativa**:
  * Táticas para lidar com 9 perfis corporativos: *Leigo*, *Apressado*, *Confuso*, *Gestor*, *Diretor*, *RH*, *Financeiro*, *Técnico* e *Ansioso*.
* **📋 Roteiro de Ouro do N1**:
  * Mandamentos práticos do analista (não assumir permissões sem validação, isolar malware imediatamente, manter postura calma).

---

### 3. 🎓 Academy — Trilhas Didáticas Práticas (`/academy`)
Ambiente de capacitação guiada com **42+ cenários reais** classificados por trilhas:
* **Trilhas Disponíveis**:
  * 🌐 *Redes & Conectividade* (DNS, DHCP, Gateway, Conflitos de IP, Tracert, MTU, VPN);
  * 💻 *Hardware & Sistema Operacional* (BSOD, Boot Order, Bateria CMOS, Disco 100%, Spooler);
  * 🏢 *Active Directory & Identidade* (Bloqueio de conta, GPO, Permissões NTFS, Offboarding, RSAT);
  * ☁️ *Microsoft 365 & Nuvem* (Loop de senha no Outlook, Licenciamento Office, Teams, OneDrive);
  * 🔒 *Segurança da Informação* (Phishing, Isolamento de rede, BitLocker, Certificados SSL).
* **Estrutura de Cada Aula Prática**:
  * 🔍 **1. Causa Raiz Explicada**: O que está acontecendo tecnicamente nos bastidores;
  * 💬 **2. Investigação no Chat**: Perguntas-chave a fazer e a **"Pergunta de Ouro"**;
  * 🛠️ **3. Solução Técnica Passo a Passo**: Procedimento exato de resolução;
  * ⌨️ **Comandos & Atalhos Rápidos**: Lista pronta de comandos do Windows/PowerShell/Linux;
  * 🚀 **Botão "Iniciar Lab"**: Carrega o chamado diretamente na sala de chat interativa.

---

### 4. 🗂️ Flashcards de Memorização Ativa Anki N1 (`/flashcards`)
Módulo de memorização ativa e repetição espaçada com **32 flashcards técnicos**:
* **Categorias**: *Redes*, *VPN*, *Hardware*, *Active Directory*, *Microsoft 365* e *Segurança*;
* **Interface Dinâmica de Estudo**:
  * Efeito de flip interativo (Frente: Pergunta Técnica / Situação | Verso: Resposta & Procedimento);
  * Botão de Dica conceitual (`💡 Dica`);
  * Marcador de domínio ("Marcar como dominado");
  * Barra de progresso em tempo real e contador de cards memorizados com persistência local.

---

### 5. 📝 Simulado Oficial CompTIA A+ Core 1 - 220-1201 (`/exam`)
Simulador completo da prova de certificação internacional **CompTIA A+ (Core 1 - 220-1201 V15)**:
* **50 Questões Inéditas e Ponderadas**:
  * `1.0 Mobile Devices` (15% da prova — Conectores USB-C/Lightning, Telas OLED/LCD, Baterias, Configuração de E-mail/MDM);
  * `2.0 Networking` (20% da prova — Portas e Protocolos TCP/UDP, IPv4 vs IPv6, Wi-Fi 802.11ax, Topologias, Ferramentas de Rede);
  * `3.0 Hardware` (25% da prova — RAM DDR4/DDR5, SODIMM vs DIMM, RAID 0/1/5/10, NVMe PCIe, Fontes ATX, Sockets CPU, Impressoras Laser/Térmicas);
  * `4.0 Virtualization & Cloud` (11% da prova — Modelos SaaS/IaaS/PaaS, Hypervisors Tipo 1 e Tipo 2, Elasticidade, Virtualização no BIOS/UEFI);
  * `5.0 Troubleshooting & Security` (29% da prova — Metodologia dos 6 passos, Diagnósticos de Vídeo, BSOD, Quedas de Rede, Problemas de Impressão, Click of Death).
* **Recursos do Simulado**:
  * Filtro por domínio específico para estudo focado ou Simulado Geral com todas as 50 questões;
  * Enunciados com cenários corporativos realistas;
  * Revelação de gabarito oficial com referência ao código do objetivo e explicação detalhada;
  * **Scorecard no Padrão CompTIA**: Pontuação na escala de 100 a 900 pontos, nota de corte de **675 pontos** e status final **PASS** ou **FAIL**.

---

### 6. 💬 Console de Atendimento & Chat Interativo (`/tickets/[id]`)
Ambiente de simulação de chat em tempo real entre o técnico e o solicitante:
* **Simulação Comportamental Realista**:
  * Usuários com personalidades e níveis de conhecimento distintos;
  * Indicador de digitação dinâmico (*"Solicitante respondendo..."*) com latência calculada;
  * Histórico de mensagens com carimbo de data/hora.
* **Ficha Lateral do Incidente & Guia Didático**:
  * Metadados completos do chamado (Status, Prioridade, Nível, Perfil do Usuário);
  * Guia didático embutido com Causa Raiz, Pergunta de Ouro (com botão de cópia com 1 clique), Passo a Passo e Atalhos.
* **Ações do Chamado**:
  * `Reiniciar`: Reinicia a conversa para praticar uma nova abordagem;
  * `Concluir Incidente`: Abre o modal de submissão do diagnóstico técnico para auditoria.

---

### 7. 🏆 Auditoria de Qualidade & Relatório de QA (`/tickets/[id]/evaluation`)
Sistema avaliador automático que analisa a qualidade do atendimento prestado:
* **Scorecard de 0 a 100 Pontos**:
  * Status de conformidade: **Conforme / Aprovado** (>= 70 pontos) ou **Revisão Necessária** (< 70 pontos).
* **Diagnóstico Comparativo**:
  * Diagnóstico submetido pelo técnico vs. Gabarito técnico esperado;
* **Parecer Estruturado do Auditor**:
  * ✅ **Pontos Positivos Observados**: Polidez, técnica de investigação, perguntas corretas;
  * ⚠️ **Oportunidades de Melhoria**: Omissão de validações, precipitação em soluções, clareza;
  * 💬 **Parecer do Auditor**: Análise detalhada do desempenho.
* **Refazer Atendimento**: Permite reiniciar o ticket e buscar uma nota mais alta.

---

### 8. ➕ Abertura de Novos Incidentes & Sorteio Rápido (`/tickets/new`)
Módulo de provisionamento dinâmico de novos tickets de suporte:
* **Configuração Personalizada de Triagem**:
  * Escolha da **Categoria do Serviço** (17 categorias diferentes);
  * Nível de **Complexidade** (N1, N2 ou Desafio);
  * **Perfil Comportamental** do Solicitante (9 perfis corporativos);
  * **Classificação de Prioridade** (P1 a P4).
* **Modo Sorteio Rápido**:
  * Gera instantaneamente um chamado 100% aleatório para treinamento surpresa.

---

### 9. ⚙️ Parâmetros do Motor de Simulação (`/settings`)
Central de controle técnico da Inteligência Artificial:
* **Provedores Suportados**:
  * 📦 *Simulador Estático de Regras (Mock)*: 100% offline, sem gastar tokens e sem precisar de chave de API;
  * 🌐 *Google Gemini*: Compatível com API gratuita do Google AI Studio;
  * 🔀 *OpenRouter*: Acesso a modelos como DeepSeek, Claude 3.5, Llama 3.3;
  * 🤖 *OpenAI*: GPT-4o, GPT-4o-mini;
  * 🏠 *Ollama / LM Studio*: Conexão com LLMs locais via endpoint `localhost:11434`.
* **Ajustes Avançados**:
  * Controle de Temperatura (Determinismo vs Variabilidade);
  * Comportamento de Resposta (Instantâneo vs Realista com digitação).
* **Restauração de Fábrica**:
  * Botão de segurança para redefinir o banco de dados SQLite para os 10 cenários padrões limpos.

---

## 📋 Matriz de Resumo das Funcionalidades

| Módulo / Rota | Objetivo Principal | Suporte i18n | Integração IA |
| :--- | :--- | :---: | :---: |
| **`/` Dashboard** | Gestão de fila, métricas corporativas e busca | 🇧🇷 🇺🇸 🇪🇸 | Sim |
| **`/fundamentals`** | Metodologia 6 Passos CompTIA, ITIL 4 e Soft Skills | 🇧🇷 🇺🇸 🇪🇸 | Não (Estático) |
| **`/academy`** | 42+ Aulas práticas guiadas com causa-raiz e comandos | 🇧🇷 🇺🇸 🇪🇸 | Não (Guiado) |
| **`/flashcards`** | 32 Cartões Anki com repetição espaçada e progresso | 🇧🇷 🇺🇸 🇪🇸 | Não (Estático) |
| **`/exam`** | 50 Questões CompTIA A+ Core 1 com Scorecard 100-900 | 🇧🇷 🇺🇸 🇪🇸 | Não (Ponderado) |
| **`/tickets/[id]`** | Console de chat interativo com o solicitante | 🇧🇷 🇺🇸 🇪🇸 | Sim (Híbrido) |
| **`/tickets/[id]/evaluation`** | Relatório de auditoria de qualidade e feedback | 🇧🇷 🇺🇸 🇪🇸 | Sim (Avaliador) |
| **`/tickets/new`** | Provisionamento e sorteio aleatório de incidentes | 🇧🇷 🇺🇸 🇪🇸 | Sim (Gerador) |
| **`/settings`** | Configuração de provedores de IA e reset de dados | 🇧🇷 🇺🇸 🇪🇸 | Sim (Admin) |

---

## 🏁 Conclusão

O **ServiceDesk Lab** se consolida como uma plataforma completa, robusta e modular para capacitação e avaliação em Suporte Técnico de TI. Combinando metodologias de ensino consagradas, layout moderno inspirado nas ferramentas mais usadas pelo mercado e suporte multilíngue nativo, o sistema está pronto para ser utilizado em treinamentos corporativos, cursos técnicos, faculdades e preparação individual para certificações e processos seletivos de TI.
