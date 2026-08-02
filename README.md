# Help Desk Lab AI 🛠️🤖

O **Help Desk Lab AI** é um simulador local de Help Desk e Service Desk N1/N2 com Inteligência Artificial. Ele foi projetado para funcionar como um "TryHackMe para Suporte de TI", onde técnicos e estudantes podem treinar habilidades de atendimento, triagem, troubleshooting, diagnóstico, postura profissional e encerramento de chamados com usuários simulados por IA.

O projeto é local-first (executado inteiramente em localhost) e conta com um motor híbrido de IA: suporta APIs da **OpenAI**, servidores locais compatíveis (**Ollama** / LM Studio) e um **Simulador Local Estático** offline que não exige chaves de API nem conexão com a internet.

---

## 🚀 Arquitetura e Estrutura

O sistema é dividido em duas partes principais:

1. **Backend (FastAPI & SQLite)**:
   - Gerencia o ciclo de vida dos chamados, as conversas e a configuração local.
   - Fornece endpoints REST para estatísticas do dashboard, chat e auditoria de qualidade.
   - Localizado em `/backend`.
   
2. **Frontend (Next.js & TailwindCSS)**:
   - Uma interface moderna e responsiva com foco em usabilidade (visual dark e glassmorphic).
   - Componentes modulares desenvolvidos em TypeScript e React 19.
   - Localizado em `/frontend`.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4, Lucide React.
- **Backend**: Python 3.14, FastAPI, SQLAlchemy, SQLite (via `aiosqlite`/`sqlite3`), Pydantic v2.
- **Integração de IA**: Cliente OpenAI SDK, compatibilidade com Ollama (API v1) e motor de regras offline integrado.

---

## 📦 Como Instalar e Executar Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Python 3.10 ou superior**
- **Node.js 18 ou superior**
- **NPM**

---

### Passo 1: Configurar e Executar o Backend

1. Abra um terminal e navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Crie e ative um ambiente virtual Python (recomendado):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # No Windows use: venv\Scripts\activate
   ```

3. Instale as dependências listadas:
   ```bash
   pip install -r requirements.txt
   ```

4. Crie e popule o banco de dados SQLite (`helpdesk.db`) com os 10 chamados padrões (seeds):
   ```bash
   python seed.py
   ```

5. Inicie o servidor FastAPI:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   O backend estará acessível em `http://localhost:8000`.

---

### Passo 2: Configurar e Executar o Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do Next.js:
   ```bash
   npm run dev
   ```
   Abra o seu navegador e acesse `http://localhost:3000`.

---

## 💡 Exemplos de Uso e Fluxo de Jogo

1. **Configurar o Provedor**: 
   Acesse a aba **Configurações** no painel lateral. Escolha o provedor de IA de sua preferência. Se não quiser usar uma chave de API, selecione **Simulador Local Estático (Mock)**. Clique em **Salvar**.
   
2. **Iniciar um Chamado**:
   Navegue até **Novo Chamado**. Você pode escolher os parâmetros manualmente (como dificuldade N1/N2/Desafio e perfil do usuário como Leigo, Apressado, Ansioso, Técnico) ou clicar em **Sortear Chamado** para iniciar um treinamento surpresa.
   
3. **Conversar com o Usuário**:
   Você entrará na **Sala de Atendimento**. Faça perguntas no chat para entender o problema técnico (Ex: *"O cabo de rede está conectado?"* ou *"Aparece alguma mensagem de erro na tela?"*). A IA responderá de acordo com a personalidade do perfil selecionado e não entregará a solução facilmente.
   
4. **Propor Diagnóstico e Finalizar**:
   Quando descobrir o problema e as ações necessárias, clique em **Finalizar Chamado**. Digite o seu diagnóstico técnico detalhado no modal e envie.
   
5. **Ver Avaliação**:
   O sistema de auditoria analisará o histórico da conversa e o diagnóstico em comparação com a solução esperada daquele cenário. Você receberá uma nota de **0 a 100**, pontos fortes, pontos fracos e um feedback detalhado sobre sua comunicação e perícia técnica.

---

## 🔮 Sugestões de Melhorias para a Versão 2 (V2)

1. **Escalonamento para N3 / Especialistas**:
   Implementar a opção de escalonar o chamado para uma equipe de N3 quando o problema for complexo demais para o N1, avaliando se o escalonamento foi feito no momento e formato corretos.
   
2. **Integração com LLMs Locais via Ollama direto na UI**:
   Facilitar o download e seleção de modelos específicos de TI (como *Llama-3-8b-Instruct-Gradient*) diretamente pelas configurações do app.
   
3. **Upload de novos cenários personalizados (JSON)**:
   Uma aba na interface para que professores ou gestores de TI possam carregar arquivos JSON contendo cenários de suporte customizados para treinamento interno de suas equipes.
   
4. **Relatórios em PDF e Exportação de Resultados**:
   Opção para exportar o relatório de auditoria e a nota em PDF para anexar em portfólios ou apresentar em processos seletivos.
   
5. **Treinamento por Voz**:
   Adicionar transcrição de áudio (Speech-to-Text) para treinar atendimento por chamadas de voz simulando o suporte via telefone tradicional.
