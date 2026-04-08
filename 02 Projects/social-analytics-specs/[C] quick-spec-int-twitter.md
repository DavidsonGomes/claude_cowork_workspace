# Quick Spec — int-twitter

## Resumo
Skill de integração com X/Twitter API v2 para monitorar perfis do Davidson e da Evolution. Coleta métricas de tweets, impressões, seguidores e engagement.

## Contas a monitorar
- **Davidson Gomes** (@davidson_gomes ou similar)
- **Evolution Foundation** (@EvolutionAPI ou similar)

## API
- **X API v2**
- **Base URL:** `https://api.twitter.com/2` (ou `https://api.x.com/2`)
- **Auth:** OAuth 2.0 Bearer Token (App-only, dados públicos) ou OAuth 2.0 Authorization Code com PKCE (User context, métricas avançadas)
- **Env:** `TWITTER_BEARER_TOKEN`, `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_REFRESH_TOKEN` em `.claude/.env`

## Modelo de Pricing (atualizado abril/2026)

**Pay-per-use com créditos** — não há mais tiers fixos (Free/Basic/Pro foram substituídos):
- Compra créditos antecipadamente no Developer Console
- Custo varia por endpoint (visível no Console)
- Cap mensal: 2 milhões de Post reads (acima disso precisa Enterprise)
- **`public_metrics` (incluindo impressions) está disponível com Bearer Token simples** — sem tier especial

**Implicação:** A barreira de entrada é menor que o modelo antigo. Para monitorar 2 contas com ~10 tweets cada, o custo mensal pode ser bem baixo. Investigar custo real no Developer Console.

## Endpoints necessários

| Endpoint | O que retorna | Auth |
|----------|---------------|------|
| `/2/users/{id}?user.fields=public_metrics` | Seguidores, following, tweet count | Bearer Token |
| `/2/users/{id}/tweets?tweet.fields=public_metrics,created_at&max_results=10` | Últimos tweets com métricas (impressions, likes, retweets, replies, bookmarks) | Bearer Token |
| `/2/tweets/{id}?tweet.fields=public_metrics` | Métricas públicas de um tweet | Bearer Token |
| `/2/tweets/{id}?tweet.fields=organic_metrics` | Métricas orgânicas (URL clicks, profile clicks) — **só tweets próprios, últimos 30d** | OAuth 2.0 User Context |
| `/2/users/{id}/followers?max_results=100` | Lista de seguidores | Bearer Token |

**Nota:** `organic_metrics` e `non_public_metrics` exigem OAuth 2.0 User Context e só funcionam para tweets do próprio usuário autenticado, dos últimos 30 dias.

## OAuth 2.0 PKCE (User Context)

- **Authorize:** `https://twitter.com/i/oauth2/authorize` (ou `https://x.com/i/oauth2/authorize`)
- **Token:** `https://api.x.com/2/oauth2/token`
- **Access token dura 2 horas** — refresh com scope `offline.access`
- **Authorization code expira em 30 segundos**
- Requer `code_verifier` / `code_challenge` (PKCE obrigatório)

## Scopes necessários
- `tweet.read` — ler tweets
- `users.read` — ler perfis
- `follows.read` — ler seguidores
- `offline.access` — refresh tokens

## Script: `twitter_client.py`

### Comandos
```bash
twitter_client.py profile [davidson|evo]              # Perfil + seguidores
twitter_client.py recent_tweets [davidson|evo] [N]    # Últimos N tweets com public_metrics
twitter_client.py tweet_stats TWEET_ID                # Stats de um tweet
twitter_client.py top_tweets [davidson|evo] [N]       # Top N por engagement
```

## Métricas-chave
- Seguidores (delta)
- Impressões por tweet (via `public_metrics`)
- Engagement rate: (likes + retweets + replies) / impressões
- Bookmarks (indicador de valor)
- Melhor tweet do período
- Frequência de publicação

## Rate Limits (por endpoint)

| Endpoint | Per App (Bearer) | Per User (OAuth) |
|----------|-----------------|------------------|
| `/2/tweets` (lookup) | 3.500/15min | 5.000/15min |
| `/2/users` (lookup) | 300/15min | 900/15min |
| `/2/users/:id/tweets` | 10.000/15min | 900/15min |
| `/2/users/:id/followers` | 300/15min | 300/15min |

## Abordagem
- **Bearer Token** é suficiente para a maioria dos dados (public_metrics inclui impressions)
- **OAuth User Context** só necessário para `organic_metrics` (URL clicks, profile clicks)
- Começar com Bearer Token, evoluir pra OAuth se necessário

## Tasks
1. Criar `.claude/skills/int-twitter/scripts/twitter_client.py`
2. Criar `.claude/skills/int-twitter/SKILL.md`
3. Adicionar `TWITTER_BEARER_TOKEN` no `.claude/.env`
4. Registrar app em developer.twitter.com e comprar créditos
