# Quick Spec — int-tiktok

## Resumo
Skill de integração com TikTok para monitorar conta da Evolution. Coleta métricas de vídeos, views, seguidores e engagement.

## Contas a monitorar
- **Evolution Foundation** (TikTok business)

## API
- **TikTok Business API** (Content Publishing API + Business API)
- **Base URL:** `https://open.tiktokapis.com/v2`
- **Auth:** OAuth 2.0 (Authorization Code flow com consentimento do usuário)
- **IMPORTANTE:** Todos os endpoints são **POST**, não GET
- **Env:** `TIKTOK_ACCESS_TOKEN`, `TIKTOK_REFRESH_TOKEN`, `TIKTOK_OPEN_ID` em `.claude/.env`

## Endpoints necessários

| Endpoint | Método | O que retorna |
|----------|--------|---------------|
| `POST /v2/user/info/` | POST | Seguidores, following, likes totais, vídeos count |
| `POST /v2/video/list/` | POST | Últimos vídeos publicados |
| `POST /v2/video/query/` | POST | Stats de vídeos específicos (views, likes, comments, shares) |

**Token endpoint:** `https://open.tiktokapis.com/v2/oauth/token/` (domínio diferente do authorize URL)

## Scopes necessários

| Scope | Para que |
|-------|---------|
| `user.info.basic` | Username, display name, avatar |
| `user.info.profile` | Bio, links |
| `user.info.stats` | **Seguidores, following, likes totais** (necessário pra analytics) |
| `video.list` | Listar vídeos e acessar `video/query/` |
| `video.insights` | Métricas de engagement por vídeo (se disponível) |

**Nota:** `user.info` NÃO existe como scope único — são 3 scopes separados (`basic`, `profile`, `stats`). `video.query` também não é scope — o acesso é via `video.list`.

## Script: `tiktok_client.py`

### Comandos
```bash
tiktok_client.py profile                    # Perfil + seguidores
tiktok_client.py recent_videos [N]          # Últimos N vídeos
tiktok_client.py video_stats VIDEO_ID       # Stats de um vídeo
tiktok_client.py top_videos [N]             # Top N por views
```

## Métricas-chave
- Seguidores (delta)
- Views por vídeo
- Engagement rate: (likes + comments + shares) / views
- Melhor vídeo do período
- Frequência de publicação
- Ratio likes/views (indicador de qualidade)

## Rate Limits
- Varia por endpoint — sem limite global fixo publicado na doc oficial
- Consultar headers `X-RateLimit-*` nas respostas
- Usar com moderação

## Notas
- **TikTok API é restritiva** — precisa application review que pode levar semanas
- **Alternativa 1:** TikTok Business Center (business.tiktok.com) — analytics exportáveis via interface web
- **Alternativa 2:** TikTok Creator Tools no app — export manual
- Research API tem acesso ainda mais restrito (apenas pesquisadores acadêmicos aprovados)

## Abordagem em fases
1. **Fase 1 (agora):** Métricas manuais via TikTok Business Center ou Metricool
2. **Fase 2 (quando aprovado):** Migrar pra TikTok Business API

## Setup necessário
1. TikTok Business Account
2. App no TikTok Developer Portal (developers.tiktok.com)
3. Submeter pra review (scopes: `user.info.basic`, `user.info.stats`, `video.list`)
4. Gerar access token via OAuth
5. **TikTok exige HTTPS callback** — necessário ngrok ou tunnel pra localhost

## Tasks
1. Criar `.claude/skills/int-tiktok/scripts/tiktok_client.py` (fase 1: placeholder/manual)
2. Criar `.claude/skills/int-tiktok/SKILL.md`
3. Adicionar tokens no `.claude/.env` (quando aprovado)
