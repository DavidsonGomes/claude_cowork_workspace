# Quick Spec — int-youtube

> **Status: IMPLEMENTADO** (2026-04-08)
> Client: `.claude/skills/int-youtube/scripts/youtube_client.py`
> Skill: `.claude/skills/int-youtube/SKILL.md`
> Report: `.claude/skills/social-youtube-report/SKILL.md`
> ADW: `ADWs/rotinas/youtube_report.py` | `make youtube` (@pixel)
> OAuth: conectado via `make social-auth` (Evolution API, 7.450 inscritos)

## Resumo
Skill de integração com YouTube Data API v3 para monitorar canais da Evolution Foundation. Coleta métricas de vídeos, inscritos, views, watch time e engagement.

## Contas a monitorar
- **Evolution Foundation** (canal principal)

## API
- **YouTube Data API v3** — gratuita, 10.000 quota units/dia (reset meia-noite Pacific Time)
- **Base URL:** `https://www.googleapis.com/youtube/v3`
- **Auth:** API Key (não precisa OAuth para dados públicos)
- **Env:** `YOUTUBE_API_KEY` em `.claude/.env`

## Endpoints necessários

| Endpoint | Quota | O que retorna |
|----------|-------|---------------|
| `channels?part=statistics,snippet,contentDetails&id={ID}` | 1 unit | subscribers, views total, videos count, **uploads playlist ID** |
| `playlistItems?part=snippet&playlistId={UPLOADS_ID}&maxResults=10` | 1 unit | últimos vídeos publicados (substitui search — **99x mais barato**) |
| `videos?part=statistics,snippet,contentDetails&id={IDs}` | 1 unit | views, likes, comments, duration por vídeo |
| `commentThreads?part=snippet&videoId={ID}&maxResults=20` | 1 unit | comentários de um vídeo (análise de sentimento/engagement) |

**Fluxo recomendado para listar vídeos recentes:**
1. `channels?part=contentDetails&id={ID}` → pega `relatedPlaylists.uploads` (1 unit)
2. `playlistItems?part=snippet&playlistId={UPLOADS}&maxResults=10` → últimos vídeos (1 unit)
3. `videos?part=statistics&id={IDs}` → stats de cada vídeo (1 unit)
4. **Total: 3 units** (vs 102 units usando search.list)

**EVITAR:** `search?part=snippet` custa **100 units** por chamada. Usar `playlistItems` sempre que possível.

**Nota:** Cada página de paginação cobra o custo completo novamente.

## Script: `youtube_client.py`

### Comandos
```bash
youtube_client.py channel_stats CHANNEL_ID          # Inscritos, views, total vídeos
youtube_client.py recent_videos CHANNEL_ID [N]      # Últimos N vídeos (via playlistItems, não search)
youtube_client.py video_stats VIDEO_ID [VIDEO_ID..] # Stats de vídeos específicos
youtube_client.py top_videos CHANNEL_ID [N]         # Top N por views (últimos 30 publicados)
youtube_client.py comments VIDEO_ID [N]             # Últimos N comentários de um vídeo
```

### Output JSON
```json
{
  "channel": { "title": "...", "subscribers": 1234, "total_views": 56789, "video_count": 42 },
  "recent_videos": [
    { "id": "abc", "title": "...", "published": "2026-...", "views": 100, "likes": 10, "comments": 2, "duration": "PT5M30S" }
  ]
}
```

## Métricas-chave para relatórios
- Inscritos (delta diário/semanal/mensal)
- Views total e por vídeo
- Engagement rate: (likes + comments) / views
- Melhor vídeo do período
- Frequência de publicação
- Comentários recentes (sentimento)
- Watch time médio (se disponível via OAuth — futuro)

## Notas
- Quota de 10K units/dia: usando playlistItems rende ~3.000+ operações completas/dia
- Dados públicos não precisam OAuth
- Para watch time e analytics avançados, precisa OAuth com YouTube Analytics API (futuro)
- OAuth scopes (se necessário): `https://www.googleapis.com/auth/youtube.readonly`, `https://www.googleapis.com/auth/yt-analytics.readonly`

## Tasks
- [x] Criar `.claude/skills/int-youtube/scripts/youtube_client.py` (multi-account, OAuth + API Key)
- [x] Criar `.claude/skills/int-youtube/SKILL.md`
- [x] Criar `.claude/skills/social-youtube-report/SKILL.md` (agente @pixel)
- [x] Criar `ADWs/rotinas/youtube_report.py` + `make youtube`
- [x] Conectar via OAuth (Evolution API — `make social-auth`)
- [x] Testar: 7.450 inscritos, 132K views, 27 vídeos, avg engagement 7%
