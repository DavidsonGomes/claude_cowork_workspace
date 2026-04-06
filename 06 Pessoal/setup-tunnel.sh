#!/bin/bash
# Setup tunnel para personal-dash.evofoundation.ai → localhost:3334

set -e

echo "=== Atualizando config do tunnel ==="
sudo tee /etc/cloudflared/config.yml > /dev/null << 'EOF'
tunnel: 7a49f39c-9fe4-4c34-8790-445d9de1231d
credentials-file: /etc/cloudflared/7a49f39c-9fe4-4c34-8790-445d9de1231d.json

ingress:
  - hostname: local.evofoundation.ai
    service: http://localhost:3333
  - hostname: personal-dash.evofoundation.ai
    service: http://localhost:3334
  - service: http_status:404
EOF
echo "✅ Config atualizado"

echo ""
echo "=== Criando DNS ==="
cloudflared tunnel route dns local-evo personal-dash.evofoundation.ai || echo "⚠️  DNS já existe (ok)"
echo "✅ DNS configurado"

echo ""
echo "=== Reiniciando tunnel ==="
sudo launchctl stop com.cloudflare.cloudflared
sleep 2
sudo launchctl start com.cloudflare.cloudflared
echo "✅ Tunnel reiniciado"

echo ""
echo "=== Pronto! ==="
echo "Acesse: https://personal-dash.evofoundation.ai"
echo ""
echo "💡 Para proteger com login, adicione personal-dash.evofoundation.ai"
echo "   no Access: https://one.dash.cloudflare.com → Access → Applications"
