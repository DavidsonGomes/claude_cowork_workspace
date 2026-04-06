#!/bin/bash
# Inicia o servidor do Dashboard Saúde e abre no navegador

cd "$(dirname "$0")"

# Verifica se Python 3 está disponível
if ! command -v python3 &>/dev/null; then
  echo "❌ Python 3 não encontrado. Instale em https://python.org"
  exit 1
fi

# Mata instância anterior se houver
pkill -f "python3 server.py" 2>/dev/null

# Inicia o servidor em background
python3 server.py &
SERVER_PID=$!

# Aguarda iniciar
sleep 0.8

# Abre no navegador padrão
open "http://localhost:8765/dashboard.html" 2>/dev/null || \
  xdg-open "http://localhost:8765/dashboard.html" 2>/dev/null || \
  echo "Abra manualmente: http://localhost:8765/dashboard.html"

echo ""
echo "Servidor rodando (PID $SERVER_PID)."
echo "Para parar: pkill -f 'python3 server.py'"
echo ""

# Mantém o terminal aberto mostrando logs
wait $SERVER_PID
