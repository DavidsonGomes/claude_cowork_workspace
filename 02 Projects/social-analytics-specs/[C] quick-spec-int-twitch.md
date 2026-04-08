# Quick Spec — int-twitch

## Resumo
Skill de integração com Twitch API (Helix) para monitorar canal da Evolution. Coleta métricas de streams, viewers, followers e clips.

## Contas a monitorar
- **Evolution Foundation** (canal Twitch)

## API
- **Twitch Helix API** — gratuita, generosa
- **Base URL:** `https://api.twitch.tv/helix`
- **Auth:** Client Credentials (App Access Token) para maioria dos dados públicos, **User Access Token obrigatório para followers**
- **Pré-requisitos:** Twitch Developer App (console.twitch.tv)
- **Env:** `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `TWITCH_ACCESS_TOKEN`, `TWITCH_BROADCASTER_ID` em `.claude/.env`

## Endpoints necessários

| Endpoint | Auth necessário | O que retorna |
|----------|----------------|---------------|
| `GET /users?login={channel}` | App Access Token | User ID, display name, profile, created_at |
| `GET /channels/followers?broadcaster_id={id}` | **User Access Token + `moderator:read:followers`** | Total followers + lista recente |
| `GET /videos?user_id={id}&type=archive` | App Access Token | VODs (streams passadas) com views |
| `GET /clips?broadcaster_id={id}&first=10` | App Access Token | Clips mais populares |
| `GET /streams?user_id={id}` | App Access Token | Stream atual (se live) — viewers, game, title |

**IMPORTANTE:** `channels/followers` **NÃO funciona** com App Access Token (Client Credentials). Requer User Access Token do broadcaster ou de um moderador do canal, com scope `moderator:read:followers`.

## Auth flows

### App Access Token (dados públicos — automático)
```
POST https://id.twitch.tv/oauth2/token
  ?client_id={TWITCH_CLIENT_ID}
  &client_secret={TWITCH_CLIENT_SECRET}
  &grant_type=client_credentials
```
- Suficiente para: users, videos, clips, streams
- Token expira em ~60 dias, re-gerável automaticamente

### User Access Token (followers — requer login)
```
GET https://id.twitch.tv/oauth2/authorize
  ?client_id={TWITCH_CLIENT_ID}
  &redirect_uri=http://localhost:8765/callback/twitch
  &response_type=code
  &scope=moderator:read:followers analytics:read:extensions
```
- Necessário para: followers count/list, analytics avançados
- Token exchange via `POST https://id.twitch.tv/oauth2/token`

## Scopes necessários
- `moderator:read:followers` — **obrigatório** pra endpoint de followers
- `analytics:read:extensions` — analytics de extensões (opcional)
- `analytics:read:games` — analytics de jogos (opcional)

**NÃO usar:** `channel:read:stream_key` (sensível e desnecessário pra analytics)

## Script: `twitch_client.py`

### Comandos
```bash
twitch_client.py profile CHANNEL_NAME         # Perfil + followers (requer User Token)
twitch_client.py is_live CHANNEL_NAME         # Está ao vivo? viewers?
twitch_client.py recent_vods [N]              # Últimos N VODs com views
twitch_client.py top_clips [N]                # Top N clips por views
twitch_client.py followers_count              # Total de seguidores (requer User Token)
```

## Métricas-chave
- Seguidores (delta) — requer User Access Token
- Viewers médio por stream
- Pico de viewers
- VODs views
- Clips criados e views
- Frequência de streams
- Duração média de stream

## Rate Limits
- Sistema de **token bucket** (~800 pontos/minuto)
- Varia por endpoint, não é um número fixo de requests
- Consultar headers `Ratelimit-Limit` e `Ratelimit-Remaining` nas respostas

## Setup necessário
1. Criar app em console.twitch.tv/apps
2. Copiar Client ID e Client Secret
3. Gerar App Access Token (automático, sem login)
4. Gerar User Access Token (via Social Auth App) pra endpoint de followers
5. Adicionar tudo no `.claude/.env`

## Tasks
1. Criar `.claude/skills/int-twitch/scripts/twitch_client.py`
2. Criar `.claude/skills/int-twitch/SKILL.md`
3. Adicionar `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `TWITCH_ACCESS_TOKEN`, `TWITCH_BROADCASTER_ID` no `.claude/.env`
