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
| **21:00** | End of Day | `make eod` | @clawdia | Consolida memória dos agentes, logs ADW, tarefas, aprendizados → gera daily log |
| **21:15** | Memory Sync | `make memory` | @clawdia | Extrai decisões/pessoas/feedbacks dos logs e reuniões → atualiza memória persistente |

## Rotinas Semanais

| Dia/Horário | Rotina | Comando | Agente | O que faz |
|:---:|--------|---------|--------|-----------|
| **Sexta 08:00** | Weekly Review | `make weekly` | @clawdia | Revisão completa: reuniões, tarefas, agenda, memória → relatório semanal |
| **Seg/Qua/Sex 09:00** | Linear Review | `make linear` | @atlas | Issues em review, blockers, stale, sprint progress → relatório |
| **Seg/Qua/Sex 09:15** | GitHub Review | `make github` | @atlas | PRs abertos, issues comunidade, stars/forks, releases → relatório |
| **Segunda 09:30** | Community Weekly | `make community-week` | @pulse | Análise semanal: WAM, sentimento, tópicos, insights produto, docs gaps → HTML |
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
| **@clawdia** | Morning, Sync, Triage, Review, Memory, EOD, Weekly |
| **@atlas** | Linear Review, GitHub Review |
| **@pulse** | Community Pulse (diário), Community Weekly |
| **@kai** | Health Check-in |

## Arquivos gerados

| Rotina | Onde salva |
|--------|-----------|
| Good Morning | `01 Daily Logs/[C] YYYY-MM-DD-morning.md` |
| End of Day | `01 Daily Logs/[C] YYYY-MM-DD.md` |
| Weekly Review | `01 Daily Logs/[C] YYYY-WXX-weekly-review.md` |
| Sync Meetings | `07 Reuniões/summaries/{projeto}/` + `09 Reuniões/fathom/` |
| Health Check-in | `06 Pessoal/health-checkins/reports/YYYY-MM-DD.md` |
| Linear Review | `02 Projects/linear-reviews/[C] YYYY-MM-DD-linear-review.md` |
| Community Pulse | `03 Comunidade/reports/daily/[C] YYYY-MM-DD-community-pulse.html` |
| Community Weekly | `03 Comunidade/reports/weekly/[C] YYYY-WXX-community-report.html` |
| GitHub Review | `02 Projects/github-reviews/[C] YYYY-MM-DD-github-review.md` |
| Memory Sync | `memory/` (arquivos individuais) |
