# 🚀 Guia de Deploy em Produção & Roadmap de Evolução • ServiceDesk Lab

Este documento reúne o passo a passo completo para colocar o **ServiceDesk Lab** em produção na nuvem de forma **100% gratuita** e o **plano estratégico de melhorias contínuas** (Roadmap) para transformar a plataforma em uma referência ainda maior para portfólio, estudos e treinamento técnico.

---

## 📑 Sumário

1. [🏗️ Arquitetura de Produção na Nuvem](#-1-arquitetura-de-produção-na-nuvem)
2. [📦 Passo a Passo do Deploy (Render + Vercel)](#-2-passo-a-passo-do-deploy)
3. [⚡ Otimização do Render (Evitar Cold Start com UptimeRobot)](#-3-otimização-do-render-evitar-cold-start)
4. [📱 Configuração PWA / Mobile](#-4-configuração-pwa--mobile)
5. [🗺️ Roadmap: Próximos Passos para Melhorar a Plataforma](#-5-roadmap-próximos-passos-para-melhorar-a-plataforma)
   - [Fase 1: Gamificação, XP e Badges](#fase-1-gamificação-xp-e-sistema-de-badges)
   - [Fase 2: Terminal Web Interativo & Sandboxes Visuais](#fase-2-terminal-web-interativo--sandboxes-visuais)
   - [Fase 3: Novos Simulados (CompTIA Core 2 & ITIL 4)](#fase-3-expansão-de-certificações-comptia-core-2-e-itil-4)
   - [Fase 4: Autenticação de Usuários & Histórico na Nuvem](#fase-4-autenticação-de-usuários--banco-relacional-na-nuvem)
   - [Fase 5: Modo Voice Agent (Atendimento por Voz com IA)](#fase-5-modo-voice-agent-atendimento-por-voz-com-ia)
6. [📋 Tabela de Prioridades e Esforço](#-6-tabela-de-prioridades-e-esforço)

---

## 🏗️ 1. Arquitetura de Produção na Nuvem

```
┌────────────────────────────────────────────────────────┐
│               ⚡ FRONTEND: Vercel                      │
│        (Next.js 16 • React 19 • Tailwind CSS)         │
│          URL: https://seu-app.vercel.app               │
└───────────────────────────┬────────────────────────────┘
                            │ Chamadas REST API (JSON)
                            │ Variável: NEXT_PUBLIC_API_URL
┌───────────────────────────▼────────────────────────────┐
│               📦 BACKEND: Render.com                   │
│        (Python 3 • FastAPI • Uvicorn • SQLAlchemy)     │
│       URL: https://seu-backend.onrender.com            │
└───────────────────────────┬────────────────────────────┘
                            │ Leitura / Escrita
┌───────────────────────────▼────────────────────────────┐
│              🗄️ BANCO DE DADOS (DB)                    │
│   • Opção A (Padrão): SQLite com Seed automático       │
│   • Opção B: PostgreSQL (Supabase / Neon / Render)     │
└────────────────────────────────────────────────────────┘
```

---

## 📦 2. Passo a Passo do Deploy

### 🔹 Passo 1: Subir o código para o GitHub

No terminal do seu projeto:

```bash
git add .
git commit -m "feat: versao completa multilingue e configuracoes de deploy"
git push origin main
```

---

### 🔹 Passo 2: Deploy do Backend e Banco de Dados (Render.com)

1. Acesse o [Render Dashboard](https://dashboard.render.com/) e entre com sua conta GitHub.
2. Clique no botão **New +** no topo direito e selecione **Web Service**.
3. Selecione o repositório **`help-desk-lab-ai`** (ou `ServiceDeskLab`).
4. Preencha os campos exatamente assim:
   - **Name**: `servicedesklab-api`
   - **Region**: *Ohio (US East)* ou *Frankfurt (EU Central)*
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r requirements.txt && python seed.py
     ```
   - **Start Command**:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   - **Instance Type**: `Free` (Gratuito)

#### 🗄️ Opções de Banco de Dados:
- **Opção A (SQLite Padrão - Recomendada e Zero Configuração)**:
  - O comando `python seed.py` durante o build cria e popula o arquivo `helpdesk.db` com todos os 42 chamados e configurações.
- **Opção B (PostgreSQL Externo - Supabase / Neon / Render Postgres)**:
  - Se desejar usar um banco relacional permanente em nuvem, vá em **Environment Variables** no Render e adicione a variável `DATABASE_URL` com a string do PostgreSQL. O backend já possui suporte nativo e faz a conversão automática.

5. Clique em **Create Web Service**.
6. Aguarde ~2 minutos até o status mudar para **`Live`**.
7. **Copie a URL gerada pelo Render** (ex: `https://servicedesklab-api.onrender.com`).

---

### 🔹 Passo 3: Deploy do Frontend (Vercel.com)

1. Acesse o [Vercel Dashboard](https://vercel.com/) e faça login com seu GitHub.
2. Clique em **Add New...** ➔ **Project**.
3. Localize o repositório do projeto e clique em **Import**.
4. Configure os parâmetros do projeto:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Clique em **Edit** e selecione a pasta **`frontend`**.
5. Abra a seção **Environment Variables** e adicione:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: A URL do Render gerada no Passo 2 (sem barra `/` no final):
     ```
     https://servicedesklab-api.onrender.com
     ```
6. Clique no botão **Deploy**.
7. Em cerca de 1 minuto, a Vercel gerará a URL oficial do seu frontend:
   > 🌐 Exemplo: `https://servicedesklab.vercel.app`

---

## ⚡ 3. Otimização do Render (Evitar Cold Start)

No plano gratuito do Render, o servidor entra em modo de hibernação (sleep) após 15 minutos sem requisições, demorando ~40 segundos para responder no primeiro acesso.

### Como manter o backend 100% acordado (24/7 Grátis):
1. Crie uma conta gratuita no [UptimeRobot](https://uptimerobot.com/).
2. Clique em **Add New Monitor**.
3. Configure:
   - **Monitor Type**: `HTTP(s)`
   - **Friendly Name**: `ServiceDesk Lab API`
   - **URL**: `https://sua-api.onrender.com/tickets`
   - **Monitoring Interval**: `Every 10 minutes`
4. Clique em **Create Monitor**.
5. Pronto! O UptimeRobot enviará um ping a cada 10 minutos, garantindo que o backend responda de forma instantânea para qualquer recrutador ou usuário.

---

## 📱 4. Configuração PWA / Mobile

A aplicação é 100% responsiva para celulares:

- **No Android (Google Chrome)**:
  1. Acesse a URL da Vercel.
  2. Toque nos 3 pontinhos do menu ➔ **"Instalar aplicativo"** ou **"Adicionar à tela inicial"**.
- **No iOS (Apple Safari)**:
  1. Acesse a URL da Vercel.
  2. Toque no ícone de **Compartilhar** (quadrado com seta para cima) ➔ **"Adicionar à Tela de Início"**.

---

## 🗺️ 5. Roadmap: Próximos Passos para Melhorar a Plataforma

Aqui estão as funcionalidades recomendadas para elevar o nível técnico da plataforma:

### Fase 1: Gamificação, XP e Sistema de Badges
- [ ] **Níveis de Carreira de TI**:
  - Trainee de Help Desk (0 - 500 XP)
  - Técnico N1 Júnior (500 - 1500 XP)
  - Técnico N1 Pleno (1500 - 3500 XP)
  - Analista N2 Especialista (3500+ XP)
- [ ] **Badges e Conquistas Desbloqueáveis**:
  - 🏅 *Detetive de Redes*: Resolver 5 incidentes de DNS/DHCP sem cometer erros.
  - 🛡️ *Guardião da Segurança*: Identificar corretamente ameaças de Phishing e BitLocker.
  - ⚡ *Speed Solver*: Finalizar um chamado N1 com score > 90 em menos de 3 minutos.
  - 🎓 *CompTIA Ready*: Atingir mais de 750 pontos no simulado geral.
- [ ] **Barra de Progresso Global**: Exibição de progresso geral na barra lateral (% de chamados concluídos, % de flashcards memorizados).

---

### Fase 2: Terminal Web Interativo & Sandboxes Visuais
- [ ] **Terminal CLI Embutido no Atendimento**:
  - Uma aba "Terminal do Técnico" dentro do chamado (`/tickets/[id]`).
  - Permite rodar comandos reais simulados:
    - `ipconfig /all`, `ipconfig /release`, `ipconfig /renew`, `ipconfig /flushdns`
    - `ping -t 8.8.8.8`, `tracert 10.0.0.1`, `nslookup meudominio.com`
    - `gpupdate /force`, `net user`, `net localgroup administrators`
  - A resposta do terminal reage ao estado real do problema do ticket.
- [ ] **Simulador Visual de Active Directory (ADUC Mock)**:
  - Uma mini-janela imitando o *Active Directory Users and Computers*.
  - O técnico clica no usuário, vai na aba "Account", marca "Unlock account" ou reseta a senha visualmente.
- [ ] **Simulador de Intune & Microsoft 365 Admin Center**:
  - Painel para verificar status de conformidade de dispositivos e licenças de usuários.

---

### Fase 3: Expansão de Certificações (CompTIA Core 2 e ITIL 4)
- [ ] **Simulado CompTIA A+ Core 2 (220-1202)**:
  - Adicionar 50 novas questões focadas em:
    - Sistemas Operacionais (Windows, macOS, Linux).
    - Procedimentos de Segurança (Malware removal, social engineering).
    - Troubleshooting de Software e Ferramentas Operacionais.
- [ ] **Questões Baseadas em Desempenho (PBQs - Performance-Based Questions)**:
  - Questões interativas de arrastar e soltar (ex: associar portas TCP/UDP aos seus protocolos, configurar máscara de sub-rede CIDR).
- [ ] **Simulado Oficial ITIL 4 Foundation**:
  - 40 questões dedicadas às 34 práticas de gerenciamento, 4 dimensões e Sistema de Valor de Serviço (SVS).

---

### Fase 4: Autenticação de Usuários & Banco Relacional na Nuvem
- [ ] **Login com Google / GitHub / E-mail**:
  - Integração com **NextAuth.js (Auth.js)** ou **Clerk**.
  - Permite que múltiplos técnicos salvem seus próprios históricos individuais de resolução e notas.
- [ ] **Banco de Dados PostgreSQL Permanente**:
  - Conexão com Supabase ou Neon Database para persistência em nuvem multiusuário.
- [ ] **Dashboard do Instrutor / Recrutador**:
  - Painel onde empresas ou professores podem criar turmas, atribuir listas de chamados e auditar o desempenho de cada candidato em tempo real.

---

### Fase 5: Modo Voice Agent (Atendimento por Voz com IA)
- [ ] **Síntese de Voz para o Solicitante (Text-to-Speech)**:
  - O usuário clica em "Ouvir Solicitante" e escuta a voz da pessoa estressada explicando o problema.
- [ ] **Reconhecimento de Voz do Técnico (Speech-to-Text)**:
  - O técnico clica no microfone e fala sua resposta; a plataforma transcreve e envia para o chat.
- [ ] **Avaliação de Tom de Voz e Cordialidade**:
  - O motor de QA avalia se o técnico manteve a calma, foi empático e usou comunicação não-violenta.

---

## 📋 6. Tabela de Prioridades e Esforço

| Melhoria | Impacto no Portfólio | Esforço | Prioridade Recomendada |
| :--- | :---: | :---: | :---: |
| **Deploy Vercel + Render + UptimeRobot** | ⭐⭐⭐⭐⭐ | Baixo (10 min) | 🔴 **Imediata (Hoje)** |
| **Sistema de XP e Níveis de Carreira** | ⭐⭐⭐⭐ | Médio | 🟡 **Curto Prazo** |
| **Terminal CLI Web Simulado** | ⭐⭐⭐⭐⭐ | Médio | 🟡 **Curto Prazo** |
| **Simulado CompTIA Core 2 (220-1202)** | ⭐⭐⭐⭐ | Médio | 🟢 **Médio Prazo** |
| **Simulador Visual de AD (ADUC Mock)** | ⭐⭐⭐⭐⭐ | Alto | 🟢 **Médio Prazo** |
| **Autenticação Multi-usuário (NextAuth/Clerk)** | ⭐⭐⭐⭐ | Médio | 🔵 **Longo Prazo** |
| **Atendimento por Voz (Voice Agent)** | ⭐⭐⭐⭐⭐ | Alto | 🔵 **Longo Prazo** |

---

## 💼 Dica para Entrevistas de Emprego

Ao apresentar o **ServiceDesk Lab** para recrutadores:
1. Mostre o site rodando no celular ou no navegador.
2. Destaque que você resolveu problemas reais de **Active Directory, Redes, VPN, M365 e Hardware**.
3. Demonstre a **auditoria de QA automática**, que avalia a metodologia CompTIA (6 passos de troubleshooting) e ITIL 4.
4. Mencione que o projeto é **100% multilíngue** (PT, EN, ES), comprovando capacidade para posições em multinacionais ou suporte bilíngue.
