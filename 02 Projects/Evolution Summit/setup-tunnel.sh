#!/bin/bash

# Setup Cloudflare Tunnel como serviço no macOS

# Mata processo existente
pkill -f "cloudflared tunnel run" 2>/dev/null

# Remove serviço antigo se existir
sudo cloudflared service uninstall 2>/dev/null

# Cria o plist com os argumentos corretos
sudo tee /Library/LaunchDaemons/com.cloudflare.cloudflared.plist > /dev/null <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.cloudflare.cloudflared</string>
    <key>ProgramArguments</key>
    <array>
      <string>/opt/homebrew/bin/cloudflared</string>
      <string>tunnel</string>
      <string>--config</string>
      <string>/etc/cloudflared/config.yml</string>
      <string>run</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Library/Logs/com.cloudflare.cloudflared.out.log</string>
    <key>StandardErrorPath</key>
    <string>/Library/Logs/com.cloudflare.cloudflared.err.log</string>
    <key>KeepAlive</key>
    <true/>
    <key>ThrottleInterval</key>
    <integer>5</integer>
  </dict>
</plist>
EOF

# Carrega e inicia o serviço
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

echo "Cloudflare Tunnel instalado como serviço. Verificando..."
sleep 3
sudo launchctl list | grep cloudflare && echo "Serviço rodando!" || echo "Erro ao iniciar serviço"
