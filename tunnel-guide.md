# Cloudflare Tunnel — Guia para adicionar novos domínios

## Dados do Tunnel

| Campo | Valor |
|---|---|
| **Tunnel name** | local-evo |
| **Tunnel ID** | 7a49f39c-9fe4-4c34-8790-445d9de1231d |
| **Config** | /etc/cloudflared/config.yml |
| **Credentials** | /etc/cloudflared/7a49f39c-9fe4-4c34-8790-445d9de1231d.json |
| **Logs** | /Library/Logs/com.cloudflare.cloudflared.err.log |
| **Serviço** | com.cloudflare.cloudflared (launchd) |

## Domínios ativos

| Hostname | Porta local | Serviço |
|---|---|---|
| local.evofoundation.ai | 3333 | Evolution Summit |
| personal-dash.evofoundation.ai | 3334 | Dashboard Saúde |

---

## Como adicionar um novo domínio

### Passo 1 — Editar o config

```bash
sudo nano /etc/cloudflared/config.yml
```

Adicionar uma nova entrada **antes** da linha `- service: http_status:404`:

```yaml
ingress:
  - hostname: local.evofoundation.ai
    service: http://localhost:3333
  - hostname: personal-dash.evofoundation.ai
    service: http://localhost:3334
  - hostname: NOVO.evofoundation.ai        # ← adicionar aqui
    service: http://localhost:PORTA          # ← porta do serviço
  - service: http_status:404                # ← sempre por último
```

### Passo 2 — Criar o DNS

```bash
cloudflared tunnel route dns local-evo NOVO.evofoundation.ai
```

### Passo 3 — Reiniciar o tunnel

```bash
sudo launchctl stop com.cloudflare.cloudflared && sudo launchctl start com.cloudflare.cloudflared
```

### Passo 4 — Adicionar autenticação (opcional)

1. Acessar https://one.dash.cloudflare.com
2. **Access** → **Applications** → editar a application existente
3. Adicionar `NOVO.evofoundation.ai` como domínio adicional
4. Salvar — o mesmo login já protege o novo domínio

---

## Comandos úteis

```bash
# Ver status do serviço
sudo launchctl list | grep cloudflare

# Ver logs
tail -f /Library/Logs/com.cloudflare.cloudflared.err.log

# Reiniciar tunnel
sudo launchctl stop com.cloudflare.cloudflared && sudo launchctl start com.cloudflare.cloudflared

# Listar tunnels
cloudflared tunnel list

# Deletar um tunnel (cuidado)
cloudflared tunnel delete NOME
```

## Remover um domínio

1. Remover a entrada do `/etc/cloudflared/config.yml`
2. Remover o DNS: ir no dashboard Cloudflare → DNS → deletar o CNAME
3. Reiniciar o tunnel
4. Remover do Access se necessário
