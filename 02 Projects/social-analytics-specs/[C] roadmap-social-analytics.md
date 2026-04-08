# Roadmap — Social Analytics

> Criado: 2026-04-08
> Última atualização: 2026-04-08
> Status: Em andamento — Fase 0 + 1 + 2 + 3 concluídas

---

## Visão

Monitorar as redes sociais (pessoais + Evolution) com coleta automatizada, relatórios HTML unificados e insights cross-platform. Foco inicial em YouTube, Instagram e LinkedIn.

---

## Fase 0 — Infraestrutura ✅

| # | Item | Status | Artefato |
|---|------|--------|----------|
| 0.1 | **Social Auth App** — Flask, multi-account, OAuth pra 6 plataformas | ✅ Feito | `social-auth/` + `make social-auth` |
| 0.2 | **Template HTML** — `social-analytics-report.html` (cross-platform) | ✅ Feito | `.claude/templates/html/social-analytics-report.html` |
| 0.3 | **Skill orquestradora** — `social-analytics` que chama cada `int-*` | Pendente | Depende de pelo menos 1 int-* |

---

## Fase 1 — YouTube ✅

| # | Item | Status | Artefato |
|---|------|--------|----------|
| 1.1 | **int-youtube** — client Python + skill | ✅ Feito | `.claude/skills/int-youtube/` |
| 1.2 | **social-youtube-report** — skill de relatório | ✅ Feito | `.claude/skills/social-youtube-report/` |
| 1.3 | ADW + Makefile | ✅ Feito | `make youtube` (@pixel) |
| 1.4 | OAuth conectado (Evolution API) | ✅ Feito | 7.450 inscritos, 132K views |

---

## Fase 2 — Instagram ✅

| # | Item | Status | Artefato |
|---|------|--------|----------|
| 2.1 | **int-instagram** — client Python + skill | ✅ Feito | `.claude/skills/int-instagram/` |
| 2.2 | **social-instagram-report** — skill de relatório | ✅ Feito | `.claude/skills/social-instagram-report/` |
| 2.3 | ADW + Makefile | ✅ Feito | `make instagram` (@pixel) |
| 2.4 | OAuth conectado (2 contas) | ✅ Feito | evolution.foundation (686) + agenciadgcode (273) |

---

## Fase 3 — LinkedIn (parcial) ✅

| # | Item | Status | Artefato |
|---|------|--------|----------|
| 3.1 | **int-linkedin** — client Python + skill | ✅ Feito | `.claude/skills/int-linkedin/` |
| 3.2 | **social-linkedin-report** — skill de relatório | ✅ Feito | `.claude/skills/social-linkedin-report/` |
| 3.3 | ADW + Makefile | ✅ Feito | `make linkedin` (@pixel) |
| 3.4 | OAuth conectado (Davidson Gomes) | ✅ Perfil | Posts/Org bloqueados pelo LinkedIn |

**Limitação:** Posts requer Community Management API (app exclusivo). Company Page requer Advertising API. CSV export como workaround.

---

## Fase 4 — Relatórios Unificados + Rotinas

| # | Item | Status | Comando |
|---|------|--------|---------|
| 4.1 | **Skill orquestradora** `social-analytics` | Pendente | — |
| 4.2 | ADW Social Analytics Daily | Pendente | `make social-daily` |
| 4.3 | ADW Social Analytics Weekly | Pendente | `make social-weekly` |
| 4.4 | ADW Social Analytics Monthly | Pendente | `make social-monthly` |

**Depende de:** Pelo menos YouTube + Instagram funcionando (Fases 1-2)
**Agente:** @pixel

---

## Backlog (quando usar as plataformas)

| # | Integração | Status | Spec |
|---|-----------|--------|------|
| B.1 | **int-twitter** | Spec pronta, auth app pronto | [spec](quick-spec-int-twitter.md) |
| B.2 | **int-tiktok** | Spec pronta, auth app pronto (precisa ngrok) | [spec](quick-spec-int-tiktok.md) |
| B.3 | **int-twitch** | Spec pronta, auth app pronto | [spec](quick-spec-int-twitch.md) |

---

## Resumo visual

```
✅ Concluído       Próximo                Backlog
─────────────      ─────────────          ─────────
[Auth App]         [Relatórios unific.]   [Twitter/X]
[Template HTML]    [ADWs scheduler]       [TikTok]
[YouTube]                                 [Twitch]
[Instagram]                               [LinkedIn posts/org]
[LinkedIn perfil]
```

---

## Checklist de API Keys (Davidson)

Pra continuar:
- [x] **Google Console** → YouTube OAuth Client (conectado via Social Auth App)
- [x] **Meta/Facebook** → App configurado, OAuth conectado (2 contas Instagram)

Quando precisar:
- [x] **LinkedIn** → App criado, OAuth conectado (perfil OK, posts/org limitados pelo LinkedIn)

Backlog:
- [ ] **Twitter/X** → developer.twitter.com → App + comprar créditos
- [ ] **TikTok** → developers.tiktok.com → App + submeter review
- [ ] **Twitch** → console.twitch.tv → App (Client ID + Secret)

---

## Specs

| Spec | Arquivo | Status |
|------|---------|--------|
| Social Auth App | [quick-spec-social-auth-app.md](quick-spec-social-auth-app.md) | ✅ Implementado |
| Analytics Unificado | [quick-spec-social-analytics.md](quick-spec-social-analytics.md) | Pendente (Fase 4) |
| YouTube | [quick-spec-int-youtube.md](quick-spec-int-youtube.md) | ✅ Implementado |
| Instagram | [quick-spec-int-instagram.md](quick-spec-int-instagram.md) | ✅ Implementado |
| LinkedIn | [quick-spec-int-linkedin.md](quick-spec-int-linkedin.md) | ✅ Implementado (perfil) |
| Twitter/X | [quick-spec-int-twitter.md](quick-spec-int-twitter.md) | Spec pronta (backlog) |
| TikTok | [quick-spec-int-tiktok.md](quick-spec-int-tiktok.md) | Spec pronta (backlog) |
| Twitch | [quick-spec-int-twitch.md](quick-spec-int-twitch.md) | Spec pronta (backlog) |
