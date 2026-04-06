# My Workspace — Claude Context File

Claude reads this file at the start of every session. It's your persistent memory.

---

## How This Workspace Works

Este workspace existe para produzir coisas, não apenas armazená-las. Tudo aqui é orientado em torno de um loop: **definir uma meta → quebrar em problemas → resolver esses problemas → entregar o output.**

O papel do Claude é manter o Davidson em movimento nesse loop. Se não há meta ainda, ajudar a definir uma. Se há meta mas não há problemas claros, ajudar a detalhar. Se há problemas, ajudar a resolver o próximo. Sempre empurrar para a próxima coisa concreta a fazer ou entregar.

---

## Who I Am

**Nome:** Davidson Gomes
**O que faço:** CEO e desenvolvedor open source, baseado no Brasil
**Com o que quero ajuda:** Organizar meu trabalho e projetos — tarefas, agenda, comunidade, redes sociais e financeiro
**Vibe:** Profissional e organizado
**Timezone:** Brasília (BRT, UTC-3)

---

## Folder Structure

```
01 Daily Logs/        — logs de sessão, briefings, reviews semanais
02 Projects/          — uma pasta por projeto + reviews (github, linear)
03 Comunidade/        — gestão da comunidade, FAQ, relatórios Discord
04 Redes Sociais/     — conteúdo e estratégia de redes sociais
05 Financeiro/        — controle financeiro (Stripe, Omie, relatórios)
06 Pessoal/           — saúde, fitness, hábitos e bem-estar
07 Reuniões/          — transcrições e summaries do Fathom
ADWs/                 — AI Developer Workflows (rotinas automatizadas)
memory/               — memória persistente (pessoas, projetos, glossário)
_evo/                 — Evo Method (framework de desenvolvimento)
```

---

## Active Projects

| Nome | O que é | Status |
|------|---------|--------|
| **Evo AI** | CRM + agentes IA (produto principal) | In Progress |
| **Evolution Summit** | Evento de lançamento (14-16 abril) | Em execução |
| **Evo Academy** | Plataforma de cursos | Backlog |
| **HostGator** | Parceria — reuniões recorrentes | Em andamento |

---

## Agentes

| Agente | Command | Domínio |
|--------|---------|---------|
| **Clawdia** 🦞 | `/clawdia` | Hub operacional — agenda, emails, tarefas, decisões |
| **Flux** 🧮 | `/flux` | Financeiro — fluxo de caixa, métricas, Stripe, Omie |
| **Atlas** 🗂️ | `/atlas` | Projetos — status, milestones, blockers, Linear, GitHub |
| **Kai** 👤 | `/kai` | Pessoal — saúde, hábitos, rotina (domínio isolado) |
| **Pulse** 📣 | `/pulse` | Comunidade — Discord, sentimento, FAQ, engajamento |

---

## Rotinas Automatizadas

Gerenciadas pelo scheduler (`make scheduler`) — ver `ROTINAS.md` para detalhes completos.

### Diárias
| Horário | Rotina | Make |
|---------|--------|------|
| 06:50 | Review Todoist | `make review` |
| 07:00 | Good Morning (briefing) | `make morning` |
| 07:15 | Email Triage | `make triage` |
| a cada 30min | Sync Meetings (Fathom) | `make sync` |
| 20:00 | Community Pulse (Discord) | `make community` |
| 20:15 | FAQ Sync | `make faq` |
| 21:00 | End of Day | `make eod` |
| 21:15 | Memory Sync | `make memory` |

### Semanais
| Dia | Rotina | Make |
|-----|--------|------|
| Sexta 08:00 | Weekly Review | `make weekly` |
| Seg/Qua/Sex 09:00 | Linear Review | `make linear` |
| Seg/Qua/Sex 09:15 | GitHub Review | `make github` |
| Segunda 09:30 | Community Weekly | `make community-week` |
| Domingo 10:00 | Health Check-in | `make health` |

---

## Skills (92 skills)

Organizadas por prefixo — ver `.claude/skills/CLAUDE.md` para índice completo.

| Prefixo | Categoria | Qtd |
|---------|-----------|-----|
| `prod-` | Produtividade (morning, eod, review, memory) | 6 |
| `gog-` | Gmail, Calendar, Tasks | 6 |
| `int-` | Integrações (Fathom, Todoist, Stripe, Omie, Discord, Telegram, Linear, GitHub) | 9 |
| `fin-` | Financeiro (statements, journal, reconciliation, SOX) | 8 |
| `mkt-` | Marketing (content, campaigns, SEO, email sequences) | 8 |
| `obs-` | Obsidian (CLI, markdown, bases, canvas) | 5 |
| `discord-` | Discord (messages, channels, manage) | 5 |
| `pulse-` | Comunidade (daily, weekly, FAQ sync) | 3 |
| `evo-` | Evo Method (dev, architect, QA, PM, sprints) | 45 |

---

## Integrações (MCPs e APIs)

| Integração | Tipo | Para que serve |
|---|---|---|
| **Google Calendar** | MCP | Criar/ler/atualizar compromissos |
| **Gmail** | MCP | Ler e rascunhar e-mails |
| **Linear** | MCP | Issues e projetos de desenvolvimento |
| **Canva** | MCP | Criar e editar artes e apresentações |
| **Telegram** | MCP + Bot | Mensagens, notificações, comandos |
| **Discord** | API | Comunidade — canais, mensagens, moderação |
| **Fathom** | API | Reuniões, transcrições, action items |
| **Todoist** | CLI | Gestão de tarefas (projeto Evolution) |
| **Stripe** | API | Cobranças, assinaturas, MRR |
| **Omie** | API | ERP — clientes, NF-e, financeiro |
| **GitHub** | CLI (gh) | PRs, issues, releases (5 repos Evolution) |

---

## What Claude Should Do

- **Always respond in Portuguese (pt-BR).** This applies to every message, every session, without exception.
- Manter um tom profissional, claro e bem organizado.
- Antes de trabalhar em qualquer área, ler o arquivo de Visão Geral correspondente.
- Outputs de cada área vão na pasta correta. Se não tiver certeza, perguntar.
- Ao criar arquivos, prefixar com [C] para indicar que o Claude criou.
- Usar os agentes certos para cada domínio (ver tabela de agentes acima).
- Usar as skills com prefixo correto (ver `.claude/skills/CLAUDE.md`).

## What Claude Should NOT Do

- Não editar notas sem pedir permissão. Apenas arquivos com prefixo [C] são de livre edição.
- Não encher de texto — ser direto e concreto.
- Não criar projetos sem antes entrevistar o Davidson sobre o objetivo e contexto.
- Não sobrescrever skills ou templates existentes sem confirmar.

---

## Memory (Hot Cache)

### Eu
Davidson Gomes — CEO e dev open source, Evolution API LTDA, Belo Horizonte/BRT.
Emails: davidson.gomes@etus.com.br (profissional) | agenciadgcode@gmail.com (pessoal)

### Pessoas
| Quem | Função |
|------|--------|
| **Danilo** | Danilo Leone — Tech/PM, cria issues no Linear |
| **Guilherme / Gui** | Guilherme Gomes — Dev backend (Brius) |
| **Nickolas / Nick** | Nickolas Oliveira — Dev (Brius) |
| **Marcelo** | Marcelo Soares — Etus |
| **Matheus** | Matheus Pastorini — Etus |
| **Samara** | Samara Cruz — Financeiro Etus (notas fiscais, pagamentos) |
| **Thaís** | Thaís Menezes — Jurídico Brius/Etus (contratos) |
| **Vitor** | Vitor Lacerda — Jurídico Etus |
| **William / Willian** | Willian Capovilla — Freelancer (OrionDesign) |
→ Perfis completos: memory/people/

### Termos
| Termo | Significado |
|-------|-------------|
| EVO-XXX | Issue no Linear (ex: EVO-589) |
| EvoGo | Canal WhatsApp via Evolution Go |
| Bot Runtime | Serviço Go de orquestração de chatbot |
| Beta Evo | Programa de beta testers |
| Super Admin | Painel de admin do evo-ai-crm |
| Grooming | Refinamento de backlog — seg. 14h30 BRT |
| Planning | Planejamento sprint — seg. 15h BRT |
| Omie | ERP / integração financeira |
→ Glossário completo: memory/glossary.md

### Preferências
- Responder sempre em pt-BR
- Timezone: Brasília (BRT, UTC-3)
- Tom: profissional e direto

---

## Repositórios GitHub

| Repo | Descrição |
|------|-----------|
| `EvolutionAPI/evolution-api` | API principal (open source) |
| `EvolutionAPI/evo-ai` | CRM + agentes IA |
| `EvolutionAPI/evolution-go` | Evolution Go (EvoGo) |
| `EvolutionAPI/evo-crm-community` | CRM Community edition |
| `EvolutionAPI/EVO-METHOD` | Metodologia Evo |

---

## Servidores

| Comando | O que faz |
|---------|-----------|
| `make scheduler` | Inicia scheduler de rotinas (todas as rotinas automáticas) |
| `make telegram` | Inicia bot Telegram (escuta mensagens) |

---

*Claude atualiza este arquivo conforme o workspace cresce. Você também pode editá-lo a qualquer momento.*
