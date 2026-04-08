# Quick Spec — Social Auth App

> **Status: IMPLEMENTADO** (2026-04-08)
> Código em `social-auth/` | Comando: `make social-auth`

## Resumo
Mini app web local (Python/Flask) que serve uma tela de login unificada para todas as plataformas sociais. Suporta **múltiplas contas por plataforma**. O usuário clica "Adicionar conta", faz o OAuth flow no navegador, e o app salva automaticamente os tokens no `.claude/.env` com padrão `SOCIAL_{PLATFORM}_{N}_{FIELD}`.

## Arquitetura

```
Browser → localhost:8765 → Flask App → OAuth Redirect → Plataforma
                                    ← Token Callback ←
                                    → Salva .claude/.env
```

## Stack
- **Python + Flask** (já temos Python no workspace)
- **Sem banco de dados** — tokens vão direto pro `.env`
- **Sem deploy** — roda local via `make social-auth`

## Segurança

- Roda APENAS em `localhost:8765` — não expor
- Tokens salvos no `.claude/.env` (gitignored)
- **Obrigatório:** Incluir parâmetro `state` (random) em TODOS os OAuth flows pra prevenir CSRF
- **PKCE** obrigatório pro Twitter e recomendado pra todos os outros
- Client secrets no `.claude/.env` (gitignored)
- Considerar `chmod 600` no `.env` pra restringir acesso
- Callback URLs: `http://localhost:8765/callback/{platform}`

## Compatibilidade de Callback URLs por Plataforma

| Plataforma | `http://localhost` permitido? | Workaround |
|------------|------------------------------|-----------|
| Google/YouTube | Sim (dev e prod) | — |
| Meta/Instagram | Apenas em **Development Mode** | Manter app em Dev Mode (suficiente pra nosso caso) |
| LinkedIn | Sim (dev mode) | Manter app em dev mode |
| X/Twitter | Sim (OAuth 2.0 PKCE) | — |
| TikTok | **NÃO — exige HTTPS** | Usar `ngrok` tunnel ou redirect service |
| Twitch | Sim (dev mode) | — |

## Fluxos por plataforma

### YouTube (OAuth 2.0 ou API Key)
- **Opção simples:** Input manual de API Key (sem OAuth)
- **OAuth (pra Analytics avançado):**
  - Authorize: `https://accounts.google.com/o/oauth2/v2/auth`
  - Token: `https://oauth2.googleapis.com/token`
  - Scopes: `https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly`
- Salva: `YOUTUBE_API_KEY` e/ou `YOUTUBE_ACCESS_TOKEN` + `YOUTUBE_CHANNEL_ID`

### Instagram (Meta OAuth 2.0)
- Authorize: `https://www.facebook.com/v25.0/dialog/oauth` (usar versão mais recente)
- Token: `https://graph.facebook.com/v25.0/oauth/access_token`
- Scopes: `instagram_basic,instagram_manage_insights,pages_show_list`
- Flow: code → short-lived token → long-lived token (60d) → **Page Access Token (permanente)**
- Auto-lista Instagram Business Accounts vinculadas pra user selecionar
- Salva: `META_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID_DAVIDSON`, `INSTAGRAM_ACCOUNT_ID_EVO`
- **Nota:** App Meta precisa estar em Development Mode pra aceitar localhost

### LinkedIn (OAuth 2.0)
- Authorize: `https://www.linkedin.com/oauth/v2/authorization`
- Token: `https://www.linkedin.com/oauth/v2/accessToken`
- Scopes: `openid,profile,r_organization_social,r_organization_admin`
- **NÃO usar:** `r_liteprofile` (deprecated)
- Token dura 60 dias. Refresh programático só pra parceiros aprovados
- Auto-lista organizations que o user é admin pra selecionar
- Salva: `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_PERSON_URN`, `LINKEDIN_ORG_URN`

### X / Twitter (OAuth 2.0 PKCE — obrigatório)
- Authorize: `https://twitter.com/i/oauth2/authorize`
- Token: `https://api.x.com/2/oauth2/token`
- Scopes: `tweet.read,users.read,follows.read,offline.access`
- **PKCE obrigatório:** Gerar `code_verifier` (random 128 chars) → SHA256 → `code_challenge`
- Access token dura **2 horas** — refresh com `offline.access`
- Authorization code expira em **30 segundos**
- Salva: `TWITTER_ACCESS_TOKEN`, `TWITTER_REFRESH_TOKEN`, `TWITTER_USER_ID`

### TikTok (OAuth 2.0 — requer HTTPS)
- Authorize: `https://www.tiktok.com/v2/auth/authorize/`
- Token: `https://open.tiktokapis.com/v2/oauth/token/` (domínio diferente!)
- Scopes: `user.info.basic,user.info.stats,video.list`
- **REQUER HTTPS callback** — precisa de `ngrok` ou tunnel
- Salva: `TIKTOK_ACCESS_TOKEN`, `TIKTOK_REFRESH_TOKEN`, `TIKTOK_OPEN_ID`

### Twitch (Client Credentials + User Token)
- **Client Credentials (automático, sem login):** Gera App Access Token
  - `POST https://id.twitch.tv/oauth2/token` com `grant_type=client_credentials`
- **User Token (pra followers):**
  - Authorize: `https://id.twitch.tv/oauth2/authorize`
  - Token: `https://id.twitch.tv/oauth2/token`
  - Scopes: `moderator:read:followers,analytics:read:extensions`
  - **NÃO usar:** `channel:read:stream_key` (sensível e desnecessário)
- Salva: `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `TWITCH_ACCESS_TOKEN`, `TWITCH_BROADCASTER_ID`

## Tela principal

```
╔══════════════════════════════════════════╗
║     Evolution — Social Connections      ║
╠══════════════════════════════════════════╣
║                                          ║
║  ▶ YouTube        [✅ Conectado]         ║
║    Channel: Evolution Foundation         ║
║    Tipo: API Key (não expira)            ║
║                                          ║
║  ▶ Instagram      [🔄 Conectar]          ║
║    Requer: Business Account + FB Page    ║
║                                          ║
║  ▶ LinkedIn       [⚠️ Expira em 15d]     ║
║    Davidson + Evolution Page             ║
║    [Renovar Token]                       ║
║                                          ║
║  ▶ X / Twitter    [🔄 Conectar]          ║
║    Requer: Developer Account + créditos  ║
║                                          ║
║  ▶ TikTok         [🔄 Conectar]          ║
║    Requer: Business Account + ngrok      ║
║                                          ║
║  ▶ Twitch         [✅ Conectado]         ║
║    Channel: evolutionfoundation          ║
║    Tipo: auto-refresh                    ║
║                                          ║
╚══════════════════════════════════════════╝
```

## Estrutura de arquivos

```
social-auth/
├── app.py              # Flask app principal
├── auth/
│   ├── youtube.py      # OAuth flow YouTube
│   ├── instagram.py    # OAuth flow Meta/Instagram
│   ├── linkedin.py     # OAuth flow LinkedIn
│   ├── twitter.py      # OAuth flow X/Twitter (PKCE)
│   ├── tiktok.py       # OAuth flow TikTok
│   └── twitch.py       # OAuth flow Twitch
├── templates/
│   └── index.html      # Tela principal (dark theme Evolution)
├── env_manager.py      # Lê/escreve .claude/.env
└── requirements.txt    # flask
```

## env_manager.py

Funções:
- `read_env()` → dict com todas as vars
- `set_env(key, value)` → atualiza ou adiciona no `.claude/.env`
- `check_status(platform)` → retorna connected/expired/disconnected (com dias até expiração)
- `refresh_token(platform)` → tenta refresh se expirado (Twitter, TikTok)

## Pré-requisitos (Developer Apps — configurar uma vez)

```env
# Developer App Credentials (criar nos portals)
META_APP_ID=...
META_APP_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
TWITTER_CLIENT_ID=...
TWITTER_CLIENT_SECRET=...
TIKTOK_CLIENT_KEY=...
TIKTOK_CLIENT_SECRET=...
TWITCH_CLIENT_ID=...
TWITCH_CLIENT_SECRET=...
```

## Makefile

```makefile
social-auth:    ## 🔑 Abre tela de login das redes sociais (localhost:8765)
    $(PYTHON) social-auth/app.py
```

## Tasks
- [x] Criar `social-auth/app.py` (Flask + rotas)
- [x] Criar `social-auth/env_manager.py` (lê/escreve .env — multi-account com padrão `SOCIAL_{PLATFORM}_{N}_{FIELD}`)
- [x] Criar `social-auth/templates/index.html` (dark theme Evolution, multi-account UI)
- [x] Implementar OAuth flows: `auth/youtube.py`, `auth/instagram.py`, `auth/linkedin.py`, `auth/twitter.py`, `auth/tiktok.py`, `auth/twitch.py`
- [x] Adicionar `make social-auth` no Makefile (seção Servidores)
- [ ] Documentar URLs de callback pra configurar nos developer portals
- [ ] Configurar ngrok/tunnel pra TikTok (HTTPS obrigatório)

## O que foi implementado

| Arquivo | O que faz |
|---------|-----------|
| `social-auth/app.py` | Flask app, blueprints, rota `/`, disconnect genérico |
| `social-auth/env_manager.py` | Multi-account: `get_accounts()`, `save_account()`, `next_index()`, `delete_account()`, `all_platforms_with_accounts()` |
| `social-auth/templates/index.html` | UI dark theme: lista plataformas, sub-lista contas, botões Adicionar/Remover/Renovar |
| `social-auth/auth/youtube.py` | Form pra API Key + Channel ID (sem OAuth) |
| `social-auth/auth/instagram.py` | OAuth Meta → auto-detecta IG Business Accounts → salva cada uma |
| `social-auth/auth/linkedin.py` | OAuth LinkedIn → pega perfil + person URN |
| `social-auth/auth/twitter.py` | Bearer Token (form) ou OAuth 2.0 PKCE |
| `social-auth/auth/tiktok.py` | OAuth TikTok (requer HTTPS callback) |
| `social-auth/auth/twitch.py` | Form Client ID/Secret → auto-gera App Token, ou OAuth User Token |
