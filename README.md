# Service Desk Lab 🛠️⚡

> **Plataforma Interativa de Simulação, Capacitação e Treinamento Prático para Suporte Técnico de TI e Service Desk N1/N2 baseada em Inteligência Artificial e Metodologias Internacionais (CompTIA A+ & ITIL 4).**

Disponível em 3 idiomas: 🇧🇷 **Português** | 🇺🇸 **English** | 🇪🇸 **Español**

---

## 📄 Documentação & Guias

- 👉 **[Apresentação Completa da Plataforma](./APRESENTACAO_PLATAFORMA.md)**: Visão geral de arquitetura, módulos e certificações.
- 👉 **[Guia de Deploy & Próximos Passos](./PROXIMOS_PASSOS_E_DEPLOY.md)**: Passo a passo de deploy gratuito (Vercel + Render) e roadmap de melhorias.
- 👉 **[Guia de Flashcards Anki N1](./GUIA_ESTUDO_ANKI_N1.md)**: Instruções de importação e memorização de comandos e conceitos de TI.

---

## 🚀 Principais Módulos da Plataforma

* **📊 Dashboard ITSM Corporativo (`/`)**: Fila de incidentes densa com métricas em tempo real (Total, Abertos, Resolvidos, Nota Média), busca dinâmica e badges de prioridade (P1 a P4) e complexidade (N1, N2, Desafio).
* **📖 Metodologia & Teoria Geral (`/fundamentals`)**: Guia completo dos **6 Passos de Troubleshooting da CompTIA A+**, conceitos de **ITIL 4 & SLA**, matriz de comunicação para **9 Perfis de Usuários** e Roteiro de Ouro do N1.
* **🎓 Academy — Trilhas Didáticas (`/academy`)**: 42+ cenários práticos guiados em *Redes*, *Hardware*, *Active Directory*, *Microsoft 365* e *Segurança*, com Causa-Raiz, "Pergunta de Ouro" e Cheatsheet de comandos.
* **🗂️ Flashcards Anki N1 (`/flashcards`)**: 32 cartões de memorização ativa com repetição espaçada, dicas conceituais e progresso salvo localmente.
* **📝 Simulado Oficial CompTIA A+ Core 1 (`/exam`)**: 50 questões ponderadas cobrindo os 5 domínios da prova (220-1201 V15), gabarito com explicação técnica e Scorecard oficial (100 a 900 pontos, nota de corte 675, PASS/FAIL).
* **💬 Console de Atendimento & Chat (`/tickets/[id]`)**: Chat simulado em tempo real com solicitantes corporativos, indicador de digitação, ficha do incidente e modal de encerramento com diagnóstico.
* **🏆 Auditoria de Qualidade & QA (`/tickets/[id]/evaluation`)**: Avaliação automática por IA (0 a 100 pts) com pontos positivos, oportunidades de melhoria, parecer técnico e confronto com o gabarito.
* **➕ Abertura de Incidentes & Sorteio Rápido (`/tickets/new`)**: Gerador customizado com 17 categorias, 3 níveis de complexidade, 9 perfis comportamentais e modo de sorteio 100% aleatório.
* **⚙️ Parâmetros do Motor de Simulação (`/settings`)**: Controle de IA com suporte a **Google Gemini**, **OpenRouter**, **OpenAI**, **Ollama local** e **Simulador Estático Offline (Mock)**.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4, Context API (i18n nativo).
* **Backend**: Python 3.10+, FastAPI, SQLAlchemy, SQLite, Pydantic v2.
* **Motor de IA**: OpenAI SDK compatível com múltiplos provedores + Motor de regras determinísticas.

---

## 📦 Instalação e Execução Local

### 1. Início Rápido com Script Automático

```bash
chmod +x start.sh
./start.sh
```

### 2. Execução Manual

#### Backend (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed.py
uvicorn main:app --reload --port 8000
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

Acesse a plataforma em: **`http://localhost:3000`**

---

## 📄 Licença

Projeto sob a licença MIT. Desenvolvido para fins educacionais e capacitação técnica em Suporte e Infraestrutura de TI.
