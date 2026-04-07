# OpenClaude

> Sistema operacional pessoal multiagente construído sobre Claude Code — 9 agentes especializados, 109 skills, 15 rotinas automatizadas e 12 integrações orquestrando trabalho real.

---

## O que é

OpenClaude é um workspace operacional que transforma o Claude Code numa equipe virtual de agentes especializados. Cada agente tem seu domínio, suas skills, sua memória persistente e suas rotinas automatizadas. O resultado é um sistema que organiza, executa e monitora tarefas do dia a dia de um CEO/founder — desde o briefing da manhã até a consolidação de memória à noite.

**Não é um chatbot.** É um sistema de produção real que roda rotinas, gera relatórios, sincroniza reuniões, organiza tarefas, monitora comunidade e analisa métricas — tudo automatizado.

---

## Arquitetura

```
Davidson (human)
    |
    v
Claude Code (orchestrator)
    |
    ├── Clawdia 🦞  — Hub operacional (agenda, emails, tarefas, decisões)
    ├── Flux 🧮     — Financeiro (Stripe, Omie, MRR, fluxo de caixa)
    ├── Atlas 🗂️    — Projetos (Linear, GitHub, milestones, blockers)
    ├── Kai 👤      — Pessoal (saúde, hábitos, rotina — domínio isolado)
    ├── Pulse 📣    — Comunidade (Discord, sentimento, FAQ, engajamento)
    ├── Sage 🎯     — Estratégia (OKRs, roadmap, priorização, cenários)
    ├── Pixel 📲    — Social media (conteúdo, calendário, análise)
    ├── Nex 💼      — Comercial (pipeline, propostas, qualificação)
    └── Mentor 🎓   — Cursos (trilhas, módulos, Evo Academy)
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
| Skills | 109 |
| Commands | 9 |
| Rotinas (ADWs) | 15 |
| Templates (MD + HTML) | 15 |
| Integrações | 12 |
| Make targets | 24 |

---

## Stack de Integrações

| Integração | Tipo | Uso |
|---|---|---|
| Google Calendar | MCP | Agenda, eventos, disponibilidade |
| Gmail | MCP | Emails, triagem, rascunhos |
| Linear | MCP | Issues, sprints, projetos |
| GitHub | MCP + CLI | PRs, issues, releases, stars |
| Canva | MCP | Artes e apresentações |
| Telegram | MCP + Bot | Mensagens, notificações, comandos |
| Discord | API | Comunidade, mensagens, moderação |
| Fathom | API | Reuniões, transcrições, action items |
| Todoist | CLI | Gestão de tarefas |
| Stripe | API | Cobranças, assinaturas, MRR |
| Omie | API | ERP, NF-e, financeiro |
| Notion | MCP | Base de conhecimento |

---

## Skills por Categoria

| Prefixo | Categoria | Qtd |
|---------|-----------|-----|
| `prod-` | Produtividade (morning, eod, review, memory, trends) | 7 |
| `gog-` | Gmail, Calendar, Tasks | 6 |
| `int-` | Integrações (Fathom, Todoist, Stripe, Omie, Discord, Telegram, Linear, GitHub) | 10 |
| `fin-` | Financeiro (statements, journal, reconciliation, SOX) | 8 |
| `mkt-` | Marketing (content, campaigns, SEO, email sequences) | 8 |
| `obs-` | Obsidian (CLI, markdown, bases, canvas) | 5 |
| `discord-` | Discord (messages, channels, manage) | 5 |
| `pulse-` | Comunidade (daily, weekly, FAQ sync) | 3 |
| `sage-` | Estratégia (OKR review, competitive analysis, digest) | 3 |
| `social-` | Social media (post, thread, carousel, hook, calendar, strategy) | 13 |
| `evo-` | Evo Method (dev, architect, QA, PM, sprints) | 45 |

---

## Rotinas Automatizadas

Gerenciadas pelo scheduler (`make scheduler`).

### Diárias

| Horário | Rotina | Agente | Make |
|---------|--------|--------|------|
| 06:50 | Review Todoist | @clawdia | `make review` |
| 07:00 | Good Morning | @clawdia | `make morning` |
| 07:15 | Email Triage | @clawdia | `make triage` |
| a cada 30min | Sync Meetings | @clawdia | `make sync` |
| 20:00 | Community Pulse | @pulse | `make community` |
| 20:15 | FAQ Sync | @pulse | `make faq` |
| 21:00 | End of Day | @clawdia | `make eod` |
| 21:15 | Memory Sync | @clawdia | `make memory` |

### Semanais

| Dia | Rotina | Agente | Make |
|-----|--------|--------|------|
| Sexta 08:00 | Weekly Review | @clawdia | `make weekly` |
| Sexta 08:30 | Trends | @clawdia | `make trends` |
| Sexta 09:00 | Strategy Digest | @sage | `make strategy` |
| Seg/Qua/Sex 09:00 | Linear Review | @atlas | `make linear` |
| Seg/Qua/Sex 09:15 | GitHub Review | @atlas | `make github` |
| Segunda 09:30 | Community Weekly | @pulse | `make community-week` |
| Domingo 10:00 | Health Check-in | @kai | `make health` |

---

## Estrutura do Workspace

```
OpenClaude/
├── .claude/
│   ├── agents/          — 9 agentes com system prompts
│   ├── commands/        — 9 slash commands (/clawdia, /sage, etc.)
│   ├── skills/          — 109 skills organizadas por prefixo
│   ├── templates/       — templates MD + HTML (relatórios, logs)
│   ├── agent-memory/    — memória persistente por agente
│   └── .env             — tokens e API keys
├── ADWs/
│   ├── runner.py        — core runner (Rich output + logs + Telegram)
│   ├── rotinas/         — 15 ADWs (Python scripts)
│   └── logs/            — JSONL + logs detalhados + métricas
├── 01 Daily Logs/       — briefings, logs, reviews semanais
├── 02 Projects/         — projetos ativos
├── 03 Comunidade/       — FAQ, relatórios Discord (HTML)
├── 04 Redes Sociais/    — conteúdo e estratégia social
├── 05 Financeiro/       — fluxo de caixa, relatórios
├── 06 Pessoal/          — saúde, hábitos (domínio isolado)
├── 07 Reuniões/         — Fathom sync, summaries, transcripts
├── 08 Cursos/           — Evo Academy (3 cursos)
├── 09 Estrategia/       — OKRs, roadmap, análises, digests
├── _evo/                — Evo Method (framework de dev)
├── memory/              — memória persistente global
├── scheduler.py         — serviço de rotinas automatizadas
├── telegram_server.py   — bot Telegram
├── Makefile             — 24 comandos make
├── CLAUDE.md            — contexto global do Claude
├── ROTINAS.md           — guia de rotinas com horários
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
```

---

## Como funciona o ADW Runner

Cada rotina é um **ADW (AI Developer Workflow)** — um script Python que:

1. Chama o Claude Code CLI com o **agente correto** (`--agent`)
2. Executa a **skill correspondente** (prompt estruturado)
3. Mostra **output em tempo real** no terminal (Rich)
4. Salva **logs estruturados** (JSONL + detalhado)
5. Envia **notificação no Telegram** com resumo
6. Registra **métricas de execução** (success rate, tempo, runs)

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

Relatórios gerados automaticamente seguem o brand book da Evolution (dark theme, verde `#00FFA7`, fonte Inter):

- **Community Daily Pulse** — saúde diária do Discord
- **Community Weekly Report** — análise semanal com métricas e sentimento
- **GitHub Review** — PRs, issues, stars, releases
- **Trends** — scorecard semanal cruzando todas as áreas

---

## Observabilidade

```bash
make logs          # Últimas entradas do JSONL
make logs-detail   # Lista logs detalhados
make logs-tail     # Último log completo
make metrics       # Métricas acumuladas por rotina (runs, success rate, tempo)
make clean-logs    # Remove logs > 30 dias
```

---

## Créditos

Construído por **Davidson Gomes** usando:
- [Claude Code](https://claude.ai/claude-code) (Anthropic)
- [Evo Method](https://github.com/EvolutionAPI/EVO-METHOD)
- Inspirado no [OpenClaw](https://github.com/nicholasgriffintn/openclaw) e no [Tactical Agentic Coding](https://github.com/pashpashpash/tac)

---

## Licença

Uso pessoal. Os conceitos e padrões são livres para inspiração.
