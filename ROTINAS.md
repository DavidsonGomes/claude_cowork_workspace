# Rotinas Automatizadas

Guia de todas as rotinas do workspace, seus horários e agentes responsáveis.

---

## Rotinas Diárias

| Horário (BRT) | Rotina | Comando | Agente | O que faz |
|:---:|--------|---------|--------|-----------|
| **06:50** | Review Todoist | `make review` | @clawdia | Categoriza, traduz e organiza tarefas do projeto Evolution |
| **07:00** | Good Morning | `make morning` | @clawdia | Briefing: agenda do dia + emails importantes + tarefas prioritárias |
| **07:15** | Email Triage | `make triage` | @clawdia | Classifica emails não lidos por urgência, propõe ações |
| **a cada 30min** | Sync Meetings | `make sync` | @clawdia | Puxa reuniões do Fathom, salva summaries, cria tarefas no Todoist |
| **18:30** | Licensing Daily | `make licensing` | @atlas | Instâncias, geo, versões, funil de ativação, alertas → HTML open source growth |
| **19:00** | Financial Pulse | `make fin-pulse` | @flux | Puxa Stripe (MRR, charges, churn) + Omie (contas, NFs) → snapshot financeiro HTML |
| **20:00** | Community Pulse | `make community` | @pulse | Lê Discord 24h → atividade, sentimento, suporte, tópicos → relatório HTML |
| **20:15** | FAQ Sync | `make faq` | @pulse | Atualiza FAQ com perguntas do Discord + GitHub → `03 Comunidade/[C] FAQ.md` |
| **21:00** | End of Day | `make eod` | @clawdia | Consolida memória dos agentes, logs ADW, tarefas, aprendizados → gera daily log |
| **21:15** | Memory Sync | `make memory` | @clawdia | Extrai decisões/pessoas/feedbacks dos logs e reuniões → atualiza memória persistente |
| **21:30** | Dashboard Consolidado | `make dashboard` | @clawdia | Lê outputs de todas as rotinas → gera HTML dashboard 360 com health badges |

## Rotinas Semanais

| Dia/Horário | Rotina | Comando | Agente | O que faz |
|:---:|--------|---------|--------|-----------|
| **Sexta 08:00** | Weekly Review | `make weekly` | @clawdia | Revisão completa: reuniões, tarefas, agenda, memória → relatório semanal |
| **Sexta 08:30** | Trends | `make trends` | @clawdia | Análise de tendências: comunidade + GitHub + financeiro + operacional → scorecard |
| **Seg/Qua/Sex 09:00** | Linear Review | `make linear` | @atlas | Issues em review, blockers, stale, sprint progress → relatório |
| **Seg/Qua/Sex 09:15** | GitHub Review | `make github` | @atlas | PRs abertos, issues comunidade, stars/forks, releases → relatório |
| **Segunda 09:30** | Community Weekly | `make community-week` | @pulse | Análise semanal: WAM, sentimento, tópicos, insights produto, docs gaps → HTML |
| **Sexta 09:00** | Strategy Digest | `make strategy` | @sage | Consolida financeiro + produto + comunidade + mercado → visão estratégica |
| **Sexta 07:30** | Financial Weekly | `make fin-weekly` | @flux | Consolida semana: receitas, despesas, fluxo de caixa, inadimplência → HTML |
| **Sexta 07:45** | Licensing Weekly | `make licensing-weekly` | @atlas | Crescimento semanal: instâncias, geo expansion, version adoption → HTML |
| **Domingo 10:00** | Health Check-in | `make health` | @kai | Check-in de saúde: peso, alimentação, treino, sono, energia, Mounjaro |

## Rotinas Mensais

| Dia/Horário | Rotina | Comando | Agente | O que faz |
|:---:|--------|---------|--------|-----------|
| **Dia 1 08:00** | Monthly Close Kickoff | `make fin-close` | @flux | DRE, checklist fechamento, NFs pendentes, pendências Samara → HTML |
| **Dia 1 08:00** | Community Monthly | `make community-month` | @pulse | Discord + WhatsApp 30d: MAM, sentimento, tópicos, produto, docs gaps → HTML |
| **Dia 1 08:00** | Licensing Monthly | `make licensing-month` | @atlas | Crescimento mensal: trajetória, mercados, versões, projeções → HTML |

---

## Como funciona

Cada rotina é um ADW (AI Developer Workflow) em `ADWs/rotinas/` que:
1. Chama o Claude Code CLI com o **agente correto** (`--agent`)
2. Executa a **skill correspondente** (prompt estruturado)
3. Mostra **output em tempo real** no terminal (Rich)
4. Salva **logs estruturados** em `ADWs/logs/` (JSONL + detalhado)

## Logs

```bash
make logs          # Últimas entradas do JSONL
make logs-detail   # Lista logs detalhados
make logs-tail     # Mostra último log completo
make clean-logs    # Remove logs > 30 dias
```

## Agentes usados

| Agente | Rotinas |
|--------|---------|
| **@clawdia** | Morning, Sync, Triage, Review, Memory, EOD, Dashboard, Weekly, Trends |
| **@sage** | Strategy Digest |
| **@atlas** | Linear Review, GitHub Review |
| **@atlas** | Linear Review, GitHub Review, Licensing (diário, semanal, mensal) |
| **@pulse** | Community Pulse (diário), Community Weekly, Community Monthly, FAQ Sync |
| **@flux** | Financial Pulse (diário), Financial Weekly, Monthly Close |
| **@kai** | Health Check-in |

## Arquivos gerados

| Rotina | Formato | Onde salva |
|--------|---------|-----------|
| Good Morning | HTML | `01 Daily Logs/[C] YYYY-MM-DD-morning.html` |
| Email Triage | HTML | `01 Daily Logs/[C] YYYY-MM-DD-email-triage.html` |
| Review Todoist | MD | `01 Daily Logs/[C] YYYY-MM-DD-todoist-review.md` |
| Sync Meetings | JSON + MD | `07 Reuniões/fathom/` + `summaries/` |
| End of Day | MD | `01 Daily Logs/[C] YYYY-MM-DD.md` |
| Memory Sync | MD | `memory/` (arquivos individuais) |
| Weekly Review | HTML + MD | `01 Daily Logs/[C] YYYY-WXX-weekly-review.html` |
| Trends | HTML + MD | `01 Daily Logs/[C] YYYY-WXX-trends.html` |
| Strategy Digest | HTML + MD | `09 Estrategia/digests/[C] YYYY-WXX-strategy-digest.html` |
| Linear Review | HTML | `02 Projects/linear-reviews/[C] YYYY-MM-DD-linear-review.html` |
| GitHub Review | HTML | `02 Projects/github-reviews/[C] YYYY-MM-DD-github-review.html` |
| Community Pulse | HTML | `03 Comunidade/reports/daily/[C] YYYY-MM-DD-community-pulse.html` |
| Community Weekly | HTML | `03 Comunidade/reports/weekly/[C] YYYY-WXX-community-report.html` |
| FAQ Sync | MD | `03 Comunidade/[C] FAQ.md` (atualiza) |
| Health Check-in | HTML + MD | `06 Pessoal/health-checkins/reports/[C] YYYY-MM-DD-health.html` |
| Dashboard Consolidado | HTML | `01 Daily Logs/[C] YYYY-MM-DD-dashboard.html` |
| Financial Pulse | HTML | `05 Financeiro/reports/daily/[C] YYYY-MM-DD-financial-pulse.html` |
| Financial Weekly | HTML | `05 Financeiro/reports/weekly/[C] YYYY-WXX-financial-weekly.html` |
| Monthly Close | HTML | `05 Financeiro/reports/monthly/[C] YYYY-MM-monthly-close.html` |
| Community Monthly | HTML | `03 Comunidade/reports/monthly/[C] YYYY-MM-community-monthly.html` |
| Licensing Daily | HTML | `02 Projects/licensing-reports/daily/[C] YYYY-MM-DD-licensing-daily.html` |
| Licensing Weekly | HTML | `02 Projects/licensing-reports/weekly/[C] YYYY-WXX-licensing-weekly.html` |
| Licensing Monthly | HTML | `02 Projects/licensing-reports/monthly/[C] YYYY-MM-licensing-monthly.html` |

### Templates HTML disponíveis

Todos em `.claude/templates/html/`, dark theme Evolution (verde `#00FFA7`, Inter):

| Template | Usado por |
|----------|-----------|
| `morning-briefing.html` | Good Morning |
| `email-triage.html` | Email Triage |
| `weekly-review.html` | Weekly Review |
| `trends-report.html` | Trends |
| `strategy-digest.html` | Strategy Digest |
| `linear-review.html` | Linear Review |
| `github-review.html` | GitHub Review |
| `community-daily-pulse.html` | Community Pulse |
| `community-weekly-report.html` | Community Weekly |
| `health-checkin.html` | Health Check-in |
| `dashboard-consolidation.html` | Dashboard Consolidado |
| `financial-pulse.html` | Financial Pulse |
| `financial-weekly.html` | Financial Weekly |
| `monthly-close.html` | Monthly Close Kickoff |
| `community-monthly-report.html` | Community Monthly |
| `licensing-report.html` | Licensing Daily / Weekly / Monthly |
