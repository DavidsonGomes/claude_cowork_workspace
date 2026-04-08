# Quick Spec — int-linkedin

> **Status: IMPLEMENTADO (parcial)** (2026-04-08)
> Client: `.claude/skills/int-linkedin/scripts/linkedin_client.py`
> Skill: `.claude/skills/int-linkedin/SKILL.md`
> Report: `.claude/skills/social-linkedin-report/SKILL.md`
> ADW: `ADWs/rotinas/linkedin_report.py` | `make linkedin` (@pixel)
> OAuth: conectado (Davidson Gomes — perfil OK, posts/org bloqueados pelo LinkedIn)
> **Limitação:** Leitura de posts requer Community Management API (app separado). Company Page requer Advertising API.

## Resumo
Skill de integração com LinkedIn para monitorar perfis pessoal do Davidson e company page da Evolution. Coleta métricas de posts, impressões, seguidores e engagement.

## Contas a monitorar
- **Davidson Gomes** (perfil pessoal)
- **Evolution Foundation** (Company Page)

## API
- **LinkedIn Versioned API** (migrada de `/v2` para `/rest/` desde 2022)
- **Base URL:** `https://api.linkedin.com/rest/` (endpoints de org/analytics) e `https://api.linkedin.com/v2/` (apenas `/v2/me` e `/v2/userinfo`)
- **Headers obrigatórios em toda chamada `/rest/`:**
  - `Linkedin-Version: 202603` (formato YYYYMM — usar versão mais recente)
  - `X-Restli-Protocol-Version: 2.0.0`
- **Auth:** OAuth 2.0 Access Token (3-legged, expira em 60 dias)
- **Env:** `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_PERSON_URN`, `LINKEDIN_ORG_URN` em `.claude/.env`

## Endpoints necessários

| Endpoint | Base | O que retorna |
|----------|------|---------------|
| `/v2/userinfo` | `/v2` | Perfil do Davidson (com scopes `openid profile`) |
| `/rest/posts?q=author&author={urn}&count=10` | `/rest/` | Posts recentes (substitui Shares API — **deprecada**) |
| `/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity={urn}` | `/rest/` | Seguidores da company page |
| `/rest/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity={urn}` | `/rest/` | Impressões, cliques, engagement da page (suporta `timeIntervals`) |
| `/rest/socialMetadata/{postUrn}` | `/rest/` | Reactions detalhadas (LIKE, PRAISE, EMPATHY, etc.) + commentSummary |
| `/rest/organizationalPageStatistics?q=organization&organization={urn}` | `/rest/` | Page views, visitor demographics (função, indústria, localização) |

**EVITAR:** `shares?q=owners` (Shares API) — está **deprecada**. Usar Posts API.

## Permissions (Scopes)

| Scope | Para que |
|-------|---------|
| `openid` | OpenID Connect (perfil pessoal) |
| `profile` | Dados do perfil pessoal (substitui `r_liteprofile` — **deprecado**) |
| `r_organization_social` | Ler posts da org |
| `r_organization_admin` | Analytics da page (followers, share stats, page stats) |

**Nota:** `r_liteprofile` está em processo de deprecação. Usar `openid + profile` para perfil pessoal.

**Nota sobre acesso a org scopes:** `r_organization_social` e `r_organization_admin` requerem aprovação no LinkedIn Developer Portal. Para apps self-serve, pode ser necessário aplicar ao Marketing Developer Platform (partner-level). Se não aprovado, começar com Fase 1 (CSV).

## Script: `linkedin_client.py`

### Comandos
```bash
linkedin_client.py profile [davidson|evo]               # Perfil + seguidores
linkedin_client.py recent_posts [davidson|evo] [N]      # Últimos N posts (Posts API)
linkedin_client.py page_stats                            # Stats da company page + visitors
linkedin_client.py post_stats POST_URN                   # Reactions e comments de um post
linkedin_client.py follower_stats                        # Follower stats (total, novos, orgânico vs pago)
```

## Métricas-chave
- Seguidores (delta diário/semanal/mensal)
- Impressões por post
- Engagement rate: (reactions + comments + shares) / impressões
- CTR: cliques / impressões
- Melhor post do período
- Page views e visitor demographics
- Crescimento orgânico vs total

## Rate Limits
- **Não há limite fixo publicado.** Varia por endpoint e por aplicação.
- Consultar no Developer Portal → Analytics tab da app
- Reset à meia-noite UTC. Requests excedentes recebem HTTP 429
- Dois níveis: Application-level (total/dia) e Member-level (por membro/dia)

## OAuth — Notas
- Access token dura 60 dias
- **Refresh tokens programáticos** só disponíveis para parceiros aprovados (não é automático)
- Para os demais: re-executar OAuth flow (sem tela de consentimento se membro ainda logado)

## Abordagem em fases
1. **Fase 1 (agora):** Export CSV manual do LinkedIn Analytics → script de parse → relatório
2. **Fase 2 (quando aprovado):** Migrar pra API Versioned com OAuth

## Tasks
1. Criar `.claude/skills/int-linkedin/scripts/linkedin_client.py` (fase 1: CSV parser)
2. Criar `.claude/skills/int-linkedin/SKILL.md`
3. Adicionar tokens no `.claude/.env` (quando disponíveis)
