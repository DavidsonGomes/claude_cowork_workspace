# OpenClaude

> Sistema operacional pessoal multiagente construído sobre Claude Code — 9 agentes especializados, 126 skills, 27 rotinas automatizadas e 18 integrações orquestrando trabalho real.

---

## O que é

OpenClaude é um workspace operacional que transforma o Claude Code numa equipe virtual de agentes especializados. Cada agente tem seu domínio, suas skills, sua memória persistente e suas rotinas automatizadas. O resultado é um sistema que organiza, executa e monitora tarefas do dia a dia de um CEO/founder — desde o briefing da manhã até a consolidação de memória à noite.

**Não é um chatbot.** É um sistema de produção real que roda rotinas, gera relatórios, sincroniza reuniões, organiza tarefas, monitora comunidade, analisa métricas financeiras e de redes sociais, e acompanha o crescimento open source — tudo automatizado.

---

## Arquitetura

```
Davidson (human)
    |
    v
Claude Code (orchestrator)
    |
    ├── Clawdia   — Hub operacional (agenda, emails, tarefas, decisões, dashboard)
    ├── Flux      — Financeiro (Stripe, Omie, MRR, fluxo de caixa, fechamento)
    ├── Atlas     — Projetos (Linear, GitHub, Licensing, milestones, blockers)
    ├── Kai       — Pessoal (saúde, hábitos, rotina — domínio isolado)
    ├── Pulse     — Comunidade (Discord, WhatsApp, sentimento, FAQ)
    ├── Sage      — Estratégia (OKRs, roadmap, priorização, cenários, digest)
    ├── Pixel     — Social media (conteúdo, calendário, analytics cross-platform)
    ├── Nex       — Comercial (pipeline, propostas, qualificação)
    └── Mentor    — Cursos (trilhas, módulos, Evo Academy)
```

Cada agente:
- Tem um **system prompt** dedicado (`.claude/agents/*.md`)
- Pode ser acionado por **command** (`/clawdia`, `/flux`, `/sage`, etc.)
- Possui **memória persistente** (`.claude/agent-memory/`)
- Opera em **nível L1** — sugere e executa, mas decisões críticas passam pelo humano

---

## Números

| Componente | Quantidade |
|---|---|
| Agentes | 9 |
| Skills | 126 |
| Commands | 9 |
| Rotinas (ADWs) | 27 |
| Templates MD | 11 |
| Templates HTML | 17 |
| Integrações | 18 |
| Make targets | 44 |

---

## Stack de Integrações

| Integração | Tipo | Uso |
|---|---|---|
| Google Calendar | MCP | Agenda, eventos, disponibilidade |
| Gmail | MCP | Emails, triagem, rascunhos, envio |
| Linear | MCP | Issues, sprints, projetos |
| GitHub | MCP + CLI | PRs, issues, releases, stars |
| Canva | MCP | Artes e apresentações |
| Notion | MCP | Base de conhecimento |
| Telegram | MCP + Bot | Mensagens, notificações, comandos |
| Computer Use | MCP | Screenshots, clicks, controle de desktop |
| Discord | API | Comunidade, mensagens, moderação |
| WhatsApp | API (Evolution) | Grupos, mensagens, stats |
| Fathom | API | Reuniões, transcrições, action items |
| Todoist | CLI | Gestão de tarefas |
| Stripe | API | Cobranças, assinaturas, MRR |
| Omie | API | ERP, NF-e, financeiro |
| YouTube | API (OAuth) | Analytics do canal |
| Instagram | API (OAuth) | Analytics dos perfis |
| LinkedIn | API (OAuth) | Analytics do perfil/org |
| Licensing | API | Telemetria open source (instâncias, geo, versões) |

---

## Skills por Categoria

| Prefixo | Categoria | Qtd |
|---------|-----------|-----|
| `evo-` | Evo Method (dev, architect, QA, PM, sprints, reviews) | 45 |
| `social-` | Social media (post, thread, carousel, hook, calendar, strategy, analytics) | 17 |
| `int-` | Integrações (Fathom, Todoist, Stripe, Omie, Discord, Telegram, Linear, GitHub, YouTube, Instagram, LinkedIn, WhatsApp, Licensing) | 13 |
| `fin-` | Financeiro (statements, journal, reconciliation, SOX, pulse, close, variance) | 11 |
| `prod-` | Produtividade (morning, eod, review, memory, dashboard, trends, licensing) | 9 |
| `mkt-` | Marketing (content, campaigns, SEO, email sequences, competitive) | 8 |
| `gog-` | Google (Gmail, Calendar, Tasks, followups) | 6 |
| `obs-` | Obsidian (CLI, markdown, bases, canvas, defuddle) | 5 |
| `discord-` | Discord (messages, channels, manage, create) | 5 |
| `pulse-` | Comunidade (daily, weekly, monthly, FAQ sync) | 4 |
| `sage-` | Estratégia (OKR review, competitive analysis, strategy digest) | 3 |

---

## Rotinas Automatizadas

Gerenciadas pelo scheduler (`make scheduler`). Ver `ROTINAS.md` para detalhes completos.

### Diárias (12 rotinas)

| Horário | Rotina | Agente | Make |
|---------|--------|--------|------|
| 06:50 | Review Todoist | @clawdia | `make review` |
| 07:00 | Good Morning | @clawdia | `make morning` |
| 07:15 | Email Triage | @clawdia | `make triage` |
| a cada 30min | Sync Meetings | @clawdia | `make sync` |
| 18:00 | Social Analytics | @pixel | `make social` |
| 18:30 | Licensing Daily | @atlas | `make licensing` |
| 19:00 | Financial Pulse | @flux | `make fin-pulse` |
| 20:00 | Community Pulse | @pulse | `make community` |
| 20:15 | FAQ Sync | @pulse | `make faq` |
| 21:00 | End of Day | @clawdia | `make eod` |
| 21:15 | Memory Sync | @clawdia | `make memory` |
| 21:30 | Dashboard Consolidado | @clawdia | `make dashboard` |

### Semanais (10 rotinas)

| Dia | Rotina | Agente | Make |
|-----|--------|--------|------|
| Sexta 07:30 | Financial Weekly | @flux | `make fin-weekly` |
| Sexta 07:45 | Licensing Weekly | @atlas | `make licensing-weekly` |
| Sexta 08:00 | Weekly Review | @clawdia | `make weekly` |
| Sexta 08:15 | Social Analytics Weekly | @pixel | `make social` |
| Sexta 08:30 | Trends | @clawdia | `make trends` |
| Sexta 09:00 | Strategy Digest | @sage | `make strategy` |
| Seg/Qua/Sex 09:00 | Linear Review | @atlas | `make linear` |
| Seg/Qua/Sex 09:15 | GitHub Review | @atlas | `make github` |
| Segunda 09:30 | Community Weekly | @pulse | `make community-week` |
| Domingo 10:00 | Health Check-in | @kai | `make health` |

### Mensais (Dia 1, 4 rotinas)

| Rotina | Agente | Make |
|--------|--------|------|
| Monthly Close Kickoff | @flux | `make fin-close` |
| Community Monthly | @pulse | `make community-month` |
| Licensing Monthly | @atlas | `make licensing-month` |
| Social Analytics Monthly | @pixel | `make social` |

---

## Estrutura do Workspace

```
OpenClaude/
├── .claude/
│   ├── agents/          — 9 agentes com system prompts
│   ├── commands/        — 9 slash commands (/clawdia, /sage, etc.)
│   ├── skills/          — 126 skills organizadas por prefixo
│   ├── templates/
│   │   ├── html/        — 17 templates HTML (dark theme Evolution)
│   │   └── *.md         — 11 templates Markdown
│   └── agent-memory/    — memória persistente por agente
├── ADWs/
│   ├── runner.py        — core runner (Rich output + logs + Telegram)
│   ├── rotinas/         — 27 ADWs (Python scripts)
│   └── logs/            — JSONL + logs detalhados + métricas
├── social-auth/         — OAuth app para redes sociais (localhost:8765)
├── 01 Daily Logs/       — briefings, logs, reviews, dashboards
├── 02 Projects/         — projetos + reviews (github, linear, licensing, social)
├── 03 Comunidade/       — FAQ, relatórios Discord/WhatsApp (HTML)
├── 04 Redes Sociais/    — conteúdo, estratégia e reports consolidados
├── 05 Financeiro/       — fluxo de caixa, relatórios (daily, weekly, monthly)
├── 06 Pessoal/          — saúde, hábitos (domínio isolado)
├── 07 Reuniões/         — Fathom sync (legacy)
├── 08 Cursos/           — Evo Academy, agentic-engineer, claude-code, openclaw
├── 09 Estrategia/       — OKRs, roadmap, análises, digests, cenários
├── 09 Reuniões/         — Fathom sync (summaries atuais)
├── _evo/                — Evo Method (framework de dev)
├── _evo-output/         — artifacts gerados (planning + implementation)
├── memory/              — memória persistente global (people, projects, trends)
├── scheduler.py         — serviço de rotinas automatizadas
├── Makefile             — 44 make targets
├── Dockerfile           — imagem Docker para VPS
├── docker-compose.yml   — scheduler + telegram containerizados
├── CLAUDE.md            — contexto global do Claude
├── ROTINAS.md           — guia completo de rotinas com horários e templates
└── ROADMAP.md           — plano de melhorias
```

---

## Quick Start

```bash
# Setup
uv venv .venv && uv sync

# Configurar tokens
cp .env.example .env
# Editar .env com suas API keys

# Testar uma rotina
make morning

# Ver todos os comandos
make help

# Iniciar scheduler (roda todas as rotinas automaticamente)
make scheduler

# Iniciar bot Telegram
make telegram

# Autenticar redes sociais (YouTube, Instagram, LinkedIn)
make social-auth
```

---

## Como funciona o ADW Runner

Cada rotina é um **ADW (AI Developer Workflow)** — um script Python que:

1. Chama o Claude Code CLI com o **agente correto** (`--agent`)
2. Executa a **skill correspondente** (prompt estruturado)
3. Mostra **output em tempo real** no terminal (Rich)
4. Salva **logs estruturados** (JSONL + detalhado)
5. Envia **notificação no Telegram** com resumo
6. Registra **métricas de execução** (success rate, tempo, custo, tokens)

```python
# Exemplo: good_morning.py
from runner import run_skill, banner, summary

def main():
    banner("Good Morning", "Agenda + Emails + Tarefas | @clawdia")
    results = []
    results.append(run_skill("prod-good-morning", agent="clawdia-assistant"))
    summary(results, "Good Morning")
```

---

## Relatórios HTML

17 templates seguindo o brand book da Evolution (dark theme, verde `#00FFA7`, fonte Inter):

- **Morning Briefing** — agenda, emails, tarefas do dia
- **Email Triage** — classificação por urgência
- **Community Daily/Weekly/Monthly** — saúde da comunidade (Discord + WhatsApp)
- **GitHub Review** — PRs, issues, stars, releases
- **Linear Review** — sprint progress, blockers, stale issues
- **Financial Pulse/Weekly** — Stripe + Omie snapshot
- **Monthly Close** — DRE, checklist, pendências
- **Social Analytics** — YouTube + Instagram + LinkedIn cross-platform
- **Licensing Report** — crescimento open source (daily/weekly/monthly)
- **Trends** — scorecard semanal cruzando todas as áreas
- **Strategy Digest** — visão consolidada do negócio
- **Health Check-in** — acompanhamento de saúde
- **Dashboard Consolidado** — visão 360 com health badges

---

## Observabilidade

```bash
make logs          # Últimas entradas do JSONL
make logs-detail   # Lista logs detalhados
make logs-tail     # Último log completo
make metrics       # Métricas acumuladas por rotina (runs, success rate, tempo, custo)
make clean-logs    # Remove logs > 30 dias
```

---

## Deploy (Docker)

```bash
make docker-build     # Build da imagem
make docker-up        # Sobe scheduler + telegram
make docker-down      # Para containers
make docker-logs      # Logs em tempo real
make docker-run ADW=good_morning.py  # Roda rotina manualmente
```

---

## Créditos

Construído por **Davidson Gomes** usando:
- [Claude Code](https://claude.ai/claude-code) (Anthropic)
- [Evo Method](https://github.com/EvolutionAPI/EVO-METHOD)

---

## Licença

Uso pessoal. Os conceitos e padrões são livres para inspiração.
