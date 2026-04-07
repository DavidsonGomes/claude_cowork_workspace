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
| **20:00** | Community Pulse | `make community` | @pulse | Lê Discord 24h → atividade, sentimento, suporte, tópicos → relatório HTML |
| **20:15** | FAQ Sync | `make faq` | @pulse | Atualiza FAQ com perguntas do Discord + GitHub → `03 Comunidade/[C] FAQ.md` |
| **21:00** | End of Day | `make eod` | @clawdia | Consolida memória dos agentes, logs ADW, tarefas, aprendizados → gera daily log |
| **21:15** | Memory Sync | `make memory` | @clawdia | Extrai decisões/pessoas/feedbacks dos logs e reuniões → atualiza memória persistente |

## Rotinas Semanais

| Dia/Horário | Rotina | Comando | Agente | O que faz |
|:---:|--------|---------|--------|-----------|
| **Sexta 08:00** | Weekly Review | `make weekly` | @clawdia | Revisão completa: reuniões, tarefas, agenda, memória → relatório semanal |
| **Sexta 08:30** | Trends | `make trends` | @clawdia | Análise de tendências: comunidade + GitHub + financeiro + operacional → scorecard |
| **Seg/Qua/Sex 09:00** | Linear Review | `make linear` | @atlas | Issues em review, blockers, stale, sprint progress → relatório |
| **Seg/Qua/Sex 09:15** | GitHub Review | `make github` | @atlas | PRs abertos, issues comunidade, stars/forks, releases → relatório |
| **Segunda 09:30** | Community Weekly | `make community-week` | @pulse | Análise semanal: WAM, sentimento, tópicos, insights produto, docs gaps → HTML |
| **Sexta 09:00** | Strategy Digest | `make strategy` | @sage | Consolida financeiro + produto + comunidade + mercado → visão estratégica |
| **Domingo 10:00** | Health Check-in | `make health` | @kai | Check-in de saúde: peso, alimentação, treino, sono, energia, Mounjaro |

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
| **@clawdia** | Morning, Sync, Triage, Review, Memory, EOD, Weekly, Trends |
| **@sage** | Strategy Digest |
| **@atlas** | Linear Review, GitHub Review |
| **@pulse** | Community Pulse (diário), Community Weekly, FAQ Sync |
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
