#!/bin/bash

# Diretório raiz do projeto (onde está o script)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=================================================="
echo "⚡ Iniciando Service Desk Lab..."
echo "=================================================="

# Função para encerrar os processos em segundo plano ao fechar a janela
cleanup() {
    echo ""
    echo "🛑 Encerrando servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Iniciar o Backend usando o Python do venv diretamente
echo "📦 Iniciando Backend (FastAPI na porta 8000)..."
cd "$DIR/backend"
if [ -f "$DIR/backend/venv/bin/uvicorn" ]; then
    "$DIR/backend/venv/bin/uvicorn" main:app --reload --port 8000 &
    BACKEND_PID=$!
elif [ -f "$DIR/backend/venv/bin/python" ]; then
    "$DIR/backend/venv/bin/python" -m uvicorn main:app --reload --port 8000 &
    BACKEND_PID=$!
else
    python3 -m uvicorn main:app --reload --port 8000 &
    BACKEND_PID=$!
fi

# 2. Iniciar o Frontend
echo "🌐 Iniciando Frontend (Next.js na porta 3000)..."
cd "$DIR/frontend"
npm run dev &
FRONTEND_PID=$!

# 3. Aguardar o Backend e Frontend estarem prontos
sleep 3
echo "🚀 Abrindo navegador em http://localhost:3000..."
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:3000" >/dev/null 2>&1 &
elif command -v sensible-browser > /dev/null; then
    sensible-browser "http://localhost:3000" >/dev/null 2>&1 &
fi

echo "=================================================="
echo "✅ Service Desk Lab rodando com sucesso!"
echo "👉 Painel: http://localhost:3000"
echo "👉 Academy: http://localhost:3000/academy"
echo "👉 Pressione Ctrl+C para parar todos os servidores."
echo "=================================================="

# Manter o script aberto
wait
