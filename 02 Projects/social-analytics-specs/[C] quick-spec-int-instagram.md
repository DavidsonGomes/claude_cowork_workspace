# Quick Spec — int-instagram

> **Status: IMPLEMENTADO** (2026-04-08)
> Client: `.claude/skills/int-instagram/scripts/instagram_client.py`
> Skill: `.claude/skills/int-instagram/SKILL.md`
> Report: `.claude/skills/social-instagram-report/SKILL.md`
> ADW: `ADWs/rotinas/instagram_report.py` | `make instagram` (@pixel)
> OAuth: conectado via `make social-auth` (evolution.foundation 686 seg + agenciadgcode 273 seg)

## Resumo
Skill de integração com Instagram Graph API (via Meta) para monitorar perfis pessoal do Davidson e da Evolution Foundation. Coleta métricas de posts, reels, stories, seguidores e engagement.

## Contas a monitorar
- **Davidson Gomes** (perfil pessoal business)
- **Evolution Foundation** (perfil business)

## API
- **Instagram API with Facebook Login** (variante para Business Accounts vinculadas a Facebook Pages)
- **Base URL:** `https://graph.facebook.com/v25.0` (usar versão mais recente disponível)
- **Auth:** Long-lived User Access Token (60 dias, renovável) ou **Page Access Token (permanente — preferencial)**
- **Pré-requisitos:** Instagram Business Account vinculada a Facebook Page + Facebook App com permissões aprovadas via App Review
- **Env:** `META_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID_DAVIDSON`, `INSTAGRAM_ACCOUNT_ID_EVO` em `.claude/.env`

## Variante da API

Usando **"Instagram API with Facebook Login"** (não "with Instagram Login"). Scopes e endpoints diferem entre as variantes. A variante Facebook Login é necessária para contas Business vinculadas a Pages.

## Endpoints necessários

| Endpoint | O que retorna |
|----------|---------------|
| `{ig-user-id}?fields=followers_count,media_count,username,biography` | Perfil básico + seguidores |
| `{ig-user-id}/media?fields=id,caption,media_type,timestamp,like_count,comments_count,permalink` | Posts recentes |
| `{ig-user-id}/insights?metric=impressions,reach,profile_views&period=day` | Insights do perfil (últimos 30d) |
| `{media-id}/insights?metric=impressions,reach,engagement` | Insights por post |

**Nota sobre métricas:**
- `follower_count` NÃO é métrica de insights — é campo do node IG User. Calcular delta via snapshots diários do campo `followers_count`.
- `engagement` em media insights = likes + comments (não inclui saves).
- `saved` não está confirmado como métrica de media insights na doc atual — verificar na versão em uso.
- `profile_views` é métrica de account insights (incluso acima).

## Permissions (Scopes)

Para a variante "Instagram API with Facebook Login":
- `instagram_basic` — acesso a dados básicos da conta
- `instagram_manage_insights` — acesso a insights (requer App Review)
- `pages_show_list` — listar Pages do usuário

**Nota:** A variante "Instagram API with Instagram Login" usa scopes diferentes com prefixo `instagram_business_*` (deprecados os antigos sem prefixo desde jan/2025). Não misturar as variantes.

## Script: `instagram_client.py`

### Comandos
```bash
instagram_client.py profile [davidson|evo]              # Perfil básico + seguidores
instagram_client.py recent_posts [davidson|evo] [N]     # Últimos N posts
instagram_client.py post_insights POST_ID               # Insights de um post
instagram_client.py account_insights [davidson|evo]     # Insights do perfil (30d)
instagram_client.py top_posts [davidson|evo] [N]        # Top N por engagement
```

## Métricas-chave
- Seguidores (delta diário/semanal/mensal — via snapshots do campo `followers_count`)
- Alcance e impressões (via insights)
- Profile views
- Engagement rate: (likes + comments) / reach
- Melhor post do período
- Reels vs posts estáticos (performance comparada)
- Frequência de publicação

## Auth — Token Strategy

**Opção preferencial: Page Access Token (permanente)**
1. Gerar Long-Lived User Token (60d)
2. Usar `GET /me/accounts?access_token={long-lived-token}` pra pegar Page tokens
3. Page Access Token gerado a partir de Long-Lived User Token é **permanente** (não expira)
4. Usar esse Page Token pra todas as chamadas de Instagram

**Fallback: Long-Lived User Token (60d)**
- Renovável via `GET /oauth/access_token?grant_type=fb_exchange_token&...`
- Criar rotina de refresh antes da expiração

## Rate Limits
- **Endpoints de Instagram Platform:** `4800 × número de impressões` por 24h (escala com tamanho da conta)
- **Business Discovery / Hashtag Search:** 200 calls/hour/user
- Limites são por app e por user, janela rolante de 24h

## Setup necessário
1. Davidson e Evo precisam ter Instagram Business Account
2. Ambas vinculadas a Facebook Pages
3. Facebook App criado com permissões aprovadas (App Review)
4. Gerar tokens via Graph API Explorer ou Social Auth App

## Tasks
1. Criar `.claude/skills/int-instagram/scripts/instagram_client.py`
2. Criar `.claude/skills/int-instagram/SKILL.md`
3. Adicionar tokens no `.claude/.env`
4. Implementar Page Access Token flow (permanente)
