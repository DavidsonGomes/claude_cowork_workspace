# Roadmap de Melhorias — Claude Cowork Workspace

> Última atualização: 2026-04-07
> Status: Ativo

---

## Visão

Transformar o workspace num sistema operacional pessoal completo onde rotinas automatizadas, agentes especializados e integrações trabalham juntos pra manter o Davidson informado, organizado e produtivo — com mínima intervenção manual.

---

## Estado Atual

| Componente | Qtd | Status |
|---|---|---|
| Agentes | 9 | Clawdia, Flux, Atlas, Kai, Pulse, Sage, Pixel, Nex, Mentor |
| Skills | 95 | Produtividade, GOG, Integrações, Finance, Marketing, Obsidian, Discord, Pulse, Sage, Social, Evo Method |
| Rotinas (ADWs) | 18 | 10 diárias + 6 semanais + 1 mensal + scheduler |
| Integrações | 12 | Gmail, Calendar, Fathom, Todoist, Stripe, Omie, Linear, Discord, Telegram, GitHub, Canva, Notion |
| Servidores | 2 | Scheduler + Telegram Bot |
| Templates HTML | 14 | Morning, Email Triage, Weekly Review, Trends, Strategy Digest, Linear Review, GitHub Review, Community Pulse, Community Weekly, Health Check-in, Dashboard Consolidation, Financial Pulse, Financial Weekly, Monthly Close |

---

## Fase 1 — Estabilização

Foco: garantir que tudo que foi criado funcione de forma confiável.

- [x] **Testar todas as rotinas** — rodado cada `make` pelo menos 1x e corrigido problemas
- [x] **Scheduler persistente** — `docker-compose.yml` + `Dockerfile` pra scheduler rodar em background
- [x] **Fix Omie API** — corrigido endpoints (contareceber, contapagar, nfconsultar) — validado com doc oficial
- [ ] **Retry no runner** — se Claude CLI falha por timeout/crash, tentar 1x antes de desistir
- [ ] **Git auto-commit no EOD** — end-of-day faz commit dos arquivos gerados (logs, reports, FAQ, summaries)
- [ ] **Ajustar timeouts** — calibrar timeout de cada rotina baseado nos primeiros runs reais

---

## Fase 2 — Telegram Bidirecional ✅

Resolvido com `make telegram` — Claude roda com `--channels plugin:telegram`, aceita mensagens, roteia pro agente correto e responde formatado via MCP.

---

## Fase 3 — Novos Agentes ✅

Todos os agentes planejados foram implementados.

- [x] **Pixel (@pixel)** — Social media / conteúdo multicanal (13 skills `social-*`)
- [x] **Nex (@nex)** — Comercial / pipeline de vendas
- [x] **Sage (@sage)** — Estratégia, OKRs, cenários (3 skills `sage-*`)
- [x] **Mentor (@mentor)** — Cursos e Evo Academy

---

## Fase 4 — Dashboard Unificado

Foco: painéis HTML que consolidam visão geral.

- [x] **Dashboard diário** — template HTML (brand Evolution) consolidando todas as áreas: produto, comunidade, financeiro, rotinas, agenda, reuniões. Skill `prod-dashboard`, ADW `make dashboard`, scheduler 21:30
- [ ] **Servido localmente** — `make dashboard-serve` abre no browser com live reload
- [ ] **Auto-refresh** — atualiza conforme rotinas rodam

---

## Fase 5 — Inteligência e Automação Avançada

Foco: fechar loops e automatizar decisões.

- [x] **Análise de tendências** — comparar métricas semana a semana (skill `prod-trends`, ADW `make trends`)
- [x] **Fechamento mensal automatizado** — rotina completa Stripe + Omie + DRE + checklist + pendências Samara (skill `fin-monthly-close-kickoff`, ADW `make fin-close`, scheduler dia 1 08:00)
- [x] **Rotinas financeiras** — Financial Pulse diário (`make fin-pulse`, 19:00) + Financial Weekly (`make fin-weekly`, sexta 07:30)
- [ ] **Docs Gap → Issue + Mintlify** — quando FAQ Sync detecta pergunta recorrente sem documentação: criar issue no GitHub + gerar draft da página no formato Mintlify e abrir PR
- [ ] **Alertas proativos** — monitorar saldos (RunPod, Stripe), status de serviços (Supabase, DigitalOcean), alertar no Telegram
- [ ] **Weekly Digest pro time** — gerar resumo semanal formatado pra enviar no Discord/WhatsApp pro time
- [ ] **Changelog automático** — gerar changelog dos repos a partir de commits/PRs mergeados da semana

---

## Fase 6 — Escala e Observabilidade

Foco: visibilidade e confiabilidade do sistema.

- [x] **Custo por rotina** — runner rastreia tokens (input, output, cache) e custo USD por execução. Acumulado no `metrics.json`. Visível no terminal e via `make metrics`
- [ ] **Observability dashboard** — painel HTML de saúde das rotinas (success rate, avg time, falhas, custos). Dados já estão no `metrics.json`, falta o template HTML
- [ ] **Alertas de degradação** — se uma rotina começa a falhar mais que 20%, alertar no Telegram
- [ ] **Multi-workspace** — preparar estrutura pra replicar o workspace pra outros projetos/clientes
- [ ] **Backup automático** — rotina semanal que faz backup do workspace (git push, ou sync com cloud)

---

## Backlog (ideias futuras)

| Ideia | Status | Notas |
|-------|--------|-------|
| Bot Discord com IA | Pendente | Responder perguntas no #help usando FAQ como base |
| Voice commands | Pendente | Integrar com Whisper pra comandos por voz no Telegram |
| Mobile dashboard | Pendente | Versão PWA do dashboard pra acessar do celular |
| Integração Notion | Feito | MCP conectado |
| Integração Canva | Feito | MCP conectado |

---

## Princípios

1. **Rotina > heroísmo** — sistemas confiáveis que rodam sozinhos valem mais que sprints heroicos
2. **Dados antes de opinião** — toda decisão baseada em evidência (métricas, logs, reports)
3. **Agente certo pro trabalho** — cada domínio tem seu especialista, não sobrecarregar um só
4. **Humano no loop** — IA sugere e executa, Davidson decide e aprova
5. **Incremental** — cada fase entrega valor independente, não depende da próxima

---

*Atualizado por Claude em 2026-04-07. Davidson pode editar a qualquer momento.*
