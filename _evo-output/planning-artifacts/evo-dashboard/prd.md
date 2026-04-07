---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
inputDocuments: ['ROADMAP.md']
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'medium'
  projectContext: 'brownfield'
---

# Product Requirements Document - EVO Dashboard

**Author:** Davidson Gomes
**Date:** 2026-04-06
**Status:** Complete

## Executive Summary

O EVO Dashboard e um cockpit operacional local que consolida o ecossistema de IA do workspace Claude Cowork numa interface visual unica. O ecossistema atual compreende 5 agentes IA (Clawdia, Flux, Atlas, Kai, Pulse), 14 rotinas automatizadas via scheduler Python, e 11 integracoes externas (Fathom, Stripe, Omie, Discord, GitHub, Linear, Gmail, Google Calendar, Todoist, Telegram, Canva). Os dados gerados por essas rotinas estao fragmentados em JSONL, JSON, HTML e Markdown espalhados por 7 pastas do workspace — sem visao unificada.

O dashboard resolve este problema consolidando todos os dados num banco SQLite (retencao de 1 ano) e expondo-os via API REST (FastAPI) consumida por um frontend React. O backend unifica o scheduler e o runner num processo unico robusto (com retry, timeouts configuraveis e persistencia via docker/launchd), adicionando collectors que estruturam os outputs das rotinas em tabelas SQLite e uma API REST para o frontend. O Telegram Bot permanece como processo separado, com integracao bidirecional planejada para fase posterior.

**Usuario-alvo:** Davidson Gomes (unico usuario, uso local).
**Deploy:** localhost, processo unico Python + static build React.

### O Que Torna Este Produto Especial

Nao e um dashboard generico. E uma camada de visualizacao construida sobre um ecossistema de agentes IA que ja funciona e ja produz dados estruturados. O gap nao e de coleta — e de consolidacao e visualizacao. Os dados ja existem: JSONL em `ADWs/logs/`, JSON do Fathom (40+ arquivos), `metrics.json`, community pulse HTML com metricas embutidas, health check-ins em JSON. O dashboard nao substitui nada — da visibilidade ao que ja roda.

## Project Classification

- **Tipo:** Web App (SPA + API backend)
- **Dominio:** DevOps/Productivity tooling interno
- **Complexidade:** Media (multiplas integracoes, zero compliance, zero auth externa, single-user)
- **Contexto:** Brownfield — scheduler.py, telegram_server.py, ADWs/runner.py ja existem em Python

## Success Criteria

### User Success

- Davidson abre UMA tela e ve o estado de todo o ecossistema em menos de 5 segundos
- Identifica rotinas falhadas sem precisar ler logs no terminal
- Visualiza trends de comunidade, financeiro e projetos sem abrir multiplos arquivos
- Acessa historico de metricas com filtros por data e categoria

### Business Success

- Reducao do tempo gasto checando status manualmente: de ~15min/dia para <2min
- Deteccao de falhas em rotinas em tempo real (vs descobrir no dia seguinte)
- Visibilidade de trends permite decisoes mais rapidas sobre comunidade e produto

### Technical Success

- Backend unificado roda como processo unico (scheduler + telegram + API)
- SQLite como fonte unica de dados estruturados com WAL mode
- Frontend carrega e renderiza em menos de 2 segundos
- Zero downtime ao adicionar novos collectors

### Measurable Outcomes

| Metrica | Target |
|---------|--------|
| Tempo para overview completo | < 5s |
| Rotinas monitoradas | 14/14 (100%) |
| Dados historicos disponiveis | 365 dias (1 ano) |
| Uptime do backend local | > 99% durante horario de trabalho |
| Latencia da API | < 200ms p95 |

## Product Scope

### MVP - Minimum Viable Product

**Filosofia:** Problem-solving MVP — resolver a fragmentacao de dados com o minimo de codigo novo.

**Core:**
- Backend unificado (FastAPI + APScheduler) num processo. Telegram Bot permanece separado por ora
- SQLite com schema para rotinas, comunidade, GitHub, financeiro, reunioes, sprint
- Collectors pos-rotina que parseiam outputs e gravam no SQLite
- API REST com endpoints por dominio
- Frontend React com tela Home (cockpit) + 5 telas de detalhe
- Retry logic no runner (1 retry antes de desistir) — ROADMAP F1
- Timeout configuravel por rotina (calibrado por historico real) — ROADMAP F1
- Scheduler persistente via docker-compose ou launchd — ROADMAP F1
- Git auto-commit no EOD (logs, reports, FAQ, summaries gerados no dia) — ROADMAP F1

**Telas MVP:**
1. **Home / Cockpit** — Status dos agentes, rotinas do dia, alertas, metricas-chave de todos os dominios
2. **Comunidade** — Sentimento, perguntas, membros ativos, top topicos, trend
3. **Projetos** — Sprint progress, GitHub PRs/issues, Linear status
4. **Financeiro** — MRR, receita, churn (Stripe), NFs pendentes (Omie)
5. **Rotinas** — Historico de execucoes, falhas, duracao, success rate, custo de tokens
6. **Reunioes** — Lista de reunioes Fathom, action items, status de conclusao
7. **Pessoal / Saude** — Peso, gordura, musculo, visceral, aderencia dieta/treino, Mounjaro (dados do Kai)

**Skills de Integracao (Claude → API):**
- Skills novas em `.claude/skills/` que fazem POST na API do dashboard
- As rotinas existentes (community pulse, GitHub review, finance, etc.) passam a gravar dados estruturados via API alem dos outputs HTML/MD
- Endpoints de escrita: `POST /api/v1/{dominio}/ingest` para cada dominio
- Isso elimina a necessidade de collectors parsearem HTML/MD — a IA grava direto

### Growth Features (Post-MVP)

- Disparar rotinas manualmente pelo dashboard (botao "Run Now")
- Telegram bidirecional completo — ROADMAP F2:
  - Comandos via Telegram ("pulso", "tarefas", "agenda", "github")
  - Roteamento por agente ("financeiro" → Flux, "projeto" → Atlas, "saude" → Kai)
  - Respostas formatadas (markdown, tabelas, emojis)
  - Confirmacao de acoes destrutivas (criar tasks, enviar emails)
  - Modo silencioso (23h-7h) — sem notificacoes exceto alertas criticos
- Notificacoes push no browser para falhas criticas
- Graficos de trend interativos com zoom temporal
- Exportar relatorios em PDF direto do dashboard
- Dark/light theme toggle
- Alertas proativos — ROADMAP F5:
  - Monitorar saldos (RunPod, Stripe)
  - Status de servicos (Supabase, DigitalOcean)
  - Alertar no Telegram quando algo precisa de atencao
- Alertas de degradacao — se rotina falha >20%, alertar automaticamente — ROADMAP F6
- Docs Gap → Issue + Mintlify — FAQ Sync detecta pergunta recorrente sem doc, cria issue no GitHub + draft de pagina Mintlify — ROADMAP F5

### Vision (Future)

- Dash acessivel via web para o time (Danilo, Gui, Samara) com auth basica
- Integracao com Todoist — visualizar e gerenciar tasks direto no dashboard
- Widget de calendario com proximos eventos
- Chat integrado com agentes (perguntar coisas direto no dash)
- Mobile-responsive / PWA para checagem rapida pelo celular
- Weekly Digest pro time — resumo semanal formatado pra Discord/WhatsApp — ROADMAP F5
- Changelog automatico — gerar changelog dos repos a partir de commits/PRs mergeados — ROADMAP F5
- Fechamento mensal automatizado — rotina completa Stripe + Omie + relatorio — ROADMAP F5
- Multi-workspace — replicar estrutura pra outros projetos/clientes — ROADMAP F6
- Backup automatico — rotina semanal git push ou sync cloud — ROADMAP F6
- Novos agentes: Pixel (social media), Nex (comercial/pipeline) — ROADMAP F3

## User Journeys

### Journey 1: Davidson — Morning Check (Happy Path)

**Abertura:** Davidson acorda as 07:00, o scheduler ja rodou Good Morning, Email Triage e Review Todoist. Ele abre `localhost:3000` no browser.

**Desenvolvimento:** O cockpit mostra imediatamente:
- 3 rotinas executadas com sucesso (badges verdes)
- 1 alerta: "FAQ Sync falhou ontem as 20:15" (badge vermelho)
- Comunidade: sentimento 78% positivo, 4 perguntas sem resposta
- Sprint: 6/10 stories done, 1 blocker
- MRR: R$ XX.XXX (+3.2%)

**Climax:** Davidson clica no alerta da FAQ Sync, ve o log do erro (timeout ao chamar Discord API), entende a causa sem abrir terminal.

**Resolucao:** Em 2 minutos Davidson tem visao completa do dia. Decide priorizar as perguntas sem resposta da comunidade e o blocker do sprint. Fecha o dash e comeca a trabalhar.

### Journey 2: Davidson — Investigacao de Problema (Edge Case)

**Abertura:** Davidson recebe mensagem no Telegram: "comunidade reclamando de bugs no Evolution Go". Abre o dashboard.

**Desenvolvimento:** Navega para a tela Comunidade. Filtra os ultimos 3 dias. Ve que o sentimento caiu de 82% para 61%. Top topico: "Evolution Go desconectando". Cruza com a tela Projetos: issue EVO-582 "Bug EvoGo status desconectado" esta In Review ha 4 dias.

**Climax:** A correlacao entre sentimento da comunidade e issue travada fica obvia no dashboard. Sem ele, Davidson precisaria abrir Discord, ler mensagens, depois abrir Linear, buscar a issue — 15+ minutos.

**Resolucao:** Davidson manda mensagem pro Gui cobrar review da EVO-582. O dashboard serviu como radar de problemas.

### Journey 3: Davidson — Review Semanal (Admin/Operations)

**Abertura:** Sexta-feira, Davidson quer fazer a weekly review.

**Desenvolvimento:** Abre a tela Rotinas. Ve o historico da semana: 68 execucoes, 63 success (92.6%), 5 falhas. As falhas sao: 3x sync-meetings (timeout Fathom API), 1x trends (returncode -2), 1x github-review (timeout). Tempo medio de execucao aumentou 15% vs semana anterior.

**Climax:** Identifica que as falhas de sync-meetings coincidem com horarios de pico (14h-16h) — provavelmente rate limit do Fathom.

**Resolucao:** Decide ajustar o scheduler para rodar sync-meetings fora do horario comercial. Registra isso como melhoria.

### Journey Requirements Summary

| Journey | Capabilities Reveladas |
|---------|----------------------|
| Morning Check | Status de agentes, alertas de falha, metricas-chave por dominio, drill-down em logs |
| Investigacao | Filtro temporal, trend de sentimento, correlacao cross-dominio, navegacao entre telas |
| Review Semanal | Historico de execucoes, taxa de sucesso, trend de performance, identificacao de padroes |

## Web App Specific Requirements

### Project-Type Overview

SPA (Single Page Application) local servida pelo mesmo processo FastAPI que fornece a API. Build estatico do Vite servido como arquivos estaticos. Sem SSR, sem SEO (uso local).

### Technical Architecture Considerations

- **SPA:** React + Vite + TypeScript. Build gera `dist/` que o FastAPI serve via `StaticFiles`
- **Browser support:** Chromium-based (Chrome/Edge) — Davidson usa Chrome
- **Responsividade:** Desktop-first, minimo 1280px. Mobile e nice-to-have futuro
- **Real-time:** Polling via TanStack Query (refetch a cada 60s). WebSocket e overkill para single-user
- **State management:** TanStack Query para server state. Sem Redux/Zustand — complexidade desnecessaria
- **Roteamento:** React Router v6. 6 rotas (Home + 5 detalhe)

### UI Framework

- **Shadcn/ui** — componentes bonitos, acessiveis, customizaveis, zero lock-in
- **Recharts** — graficos de trend simples (line, bar, area)
- **Tailwind CSS** — utility-first, tema escuro por padrao com cores Evolution (azul/roxo)
- **Lucide icons** — icones consistentes e leves

### Implementation Considerations

- Frontend e backend no mesmo monorepo (`dashboard/`)
- `make dev` roda backend + frontend em paralelo (hot reload)
- `make build` gera build de producao (frontend static + backend)
- `make start` roda o processo unificado em producao

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-solving MVP — menor caminho para visibilidade unificada.
**Resource Requirements:** Davidson (solo dev com ajuda de agentes IA).

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** Morning Check, Investigacao de Problema

**Must-Have Capabilities:**
- Backend unificado (FastAPI + APScheduler). Telegram Bot permanece separado
- SQLite com schema completo (7 tabelas), retencao de 1 ano
- 6 collectors (rotinas, comunidade, GitHub, financeiro, reunioes, sprint)
- API REST (6 grupos de endpoints)
- Frontend com 6 telas funcionais
- Auto-refresh (polling 60s)
- Tema escuro Evolution
- Retry logic no runner (1 retry)
- Timeout configuravel por rotina
- Scheduler persistente (docker-compose ou launchd)
- Git auto-commit no EOD

### Post-MVP Features (Phase 2)

- Run Now (disparar rotinas pelo dashboard)
- Telegram bidirecional completo (comandos, roteamento por agente, modo silencioso)
- Notificacoes push no browser
- Graficos interativos com zoom
- Export PDF
- Dark/light toggle
- Alertas proativos (saldos, servicos, degradacao de rotinas)
- Docs Gap → Issue + Mintlify

### Post-MVP Features (Phase 3)

- Acesso web pro time com auth
- Integracao Todoist
- Widget calendario
- Chat com agentes
- Mobile-responsive / PWA
- Weekly Digest pro time
- Changelog automatico
- Fechamento mensal automatizado
- Multi-workspace
- Backup automatico
- Novos agentes (Pixel, Nex)

### Risk Mitigation Strategy

**Technical Risks:**
- Migracao do scheduler `schedule` para `APScheduler`: incremental, rodar ambos em paralelo durante transicao
- SQLite concurrency: WAL mode resolve leituras concorrentes
- Parsing de HTML dos community reports: extrair dados estruturados pode ser fragil. Mitigacao: mudar os reports para tambem gravar JSON

**Market Risks:** Nenhum — produto interno, single-user.

**Resource Risks:** Davidson e solo dev. Mitigacao: usar agentes IA (Amelia, Barry) para gerar codigo. Priorizar o cockpit Home como primeira entrega funcional.

## Functional Requirements

### Gestao de Agentes e Rotinas

- FR1: Davidson pode ver o status atual de todos os 5 agentes (Clawdia, Flux, Atlas, Kai, Pulse) com indicador de ultima execucao
- FR2: Davidson pode ver a lista de todas as 14 rotinas com status da ultima execucao (sucesso/falha/timeout)
- FR3: Davidson pode ver o historico de execucoes de qualquer rotina com filtro por periodo (7d, 30d, 90d, 365d)
- FR4: Davidson pode ver detalhes de uma execucao especifica (duracao, return code, linhas de output, erro)
- FR5: Davidson pode ver metricas agregadas por rotina (total runs, success rate, duracao media)
- FR6: O sistema coleta automaticamente dados de execucao apos cada rotina via collector
- FR6a: O runner retenta automaticamente 1x antes de marcar uma rotina como falhada
- FR6b: Davidson pode configurar timeout individual por rotina
- FR6c: Davidson pode ver o custo estimado em tokens de cada execucao de rotina
- FR6d: O sistema executa git auto-commit dos arquivos gerados ao final do dia (EOD)

### Monitoramento de Comunidade

- FR7: Davidson pode ver o snapshot diario da comunidade (mensagens 24h, membros ativos, novos membros, sentimento)
- FR8: Davidson pode ver trend de sentimento ao longo do tempo (grafico de linha, periodo selecionavel)
- FR9: Davidson pode ver top topicos da comunidade com contagem de mencoes
- FR10: Davidson pode ver perguntas sem resposta com indicador de urgencia
- FR11: Davidson pode ver o status da comunidade (normal/atencao/critico) como badge visual
- FR12: O sistema coleta automaticamente dados do community pulse diario

### Acompanhamento de Projetos

- FR13: Davidson pode ver o progresso do sprint atual (total issues, done, in progress, in review, blocked)
- FR14: Davidson pode ver PRs abertos por repositorio (5 repos Evolution)
- FR15: Davidson pode ver issues abertas por repositorio com filtro por prioridade
- FR16: Davidson pode ver stats dos repos (stars, forks, commits ultimos 7 dias)
- FR17: Davidson pode ver blockers ativos com link direto para o Linear/GitHub
- FR18: O sistema coleta automaticamente dados do GitHub e Linear apos cada review

### Visibilidade Financeira

- FR19: Davidson pode ver MRR atual e trend mensal (grafico de linha)
- FR20: Davidson pode ver contagem de clientes ativos e churn
- FR21: Davidson pode ver assinaturas ativas por plano
- FR22: Davidson pode ver NFs pendentes e contas a receber/pagar do Omie
- FR23: O sistema coleta automaticamente dados do Stripe e Omie periodicamente

### Gestao de Reunioes

- FR24: Davidson pode ver lista de reunioes sincronizadas do Fathom com data, titulo e participantes
- FR25: Davidson pode ver action items extraidos das reunioes com status de conclusao
- FR26: Davidson pode ver resumo de uma reuniao especifica
- FR27: Davidson pode filtrar reunioes por periodo e por projeto
- FR28: O sistema importa automaticamente dados das reunioes Fathom via sync

### Dashboard e Cockpit

- FR29: Davidson pode ver um cockpit consolidado na Home com metricas-chave de todos os dominios
- FR30: Davidson pode ver alertas visuais para rotinas falhadas, sentimento negativo, e blockers
- FR31: Davidson pode navegar do cockpit para qualquer tela de detalhe com um clique
- FR32: Davidson pode ver a data/hora da ultima atualizacao de cada metrica
- FR33: O dashboard atualiza automaticamente os dados a cada 60 segundos
- FR34: Davidson pode ver o estado geral do ecossistema num unico olhar (health score)

### Acompanhamento Pessoal / Saude

- FR35: Davidson pode ver seus dados de saude atuais (peso, gordura%, musculo%, visceral, BMI, agua%, BMR)
- FR36: Davidson pode ver trend de peso e composicao corporal ao longo do tempo (grafico de linha)
- FR37: Davidson pode ver aderencia semanal (diet score, workouts count, medicacao em dia)
- FR38: Davidson pode ver sintomas reportados (nausea, refluxo, constipacao)
- FR39: Davidson pode ver dados da Isabella no mesmo dashboard de saude
- FR40: O sistema coleta automaticamente dados dos health check-ins JSON

### Ingestao de Dados via API (Skills Claude → Dashboard)

- FR41: As skills do Claude podem enviar dados estruturados via POST na API do dashboard
- FR42: Cada dominio tem um endpoint de ingestao: `POST /api/v1/{dominio}/ingest`
- FR43: O endpoint de ingestao valida o payload e grava no SQLite
- FR44: Skills existentes (pulse-daily, int-github-review, int-stripe, etc.) sao atualizadas para tambem chamar a API de ingestao
- FR45: O sistema aceita dados tanto dos collectors (parse de arquivos) quanto da ingestao direta (API) — dual-write
- FR46: O runner grava automaticamente `POST /ingest/routine` apos TODA execucao de ADW (14/14 rotinas), independente de ter skill de dominio ou nao
- FR47: Rotinas que nao produzem dados de dominio (morning, EOD, email triage, review todoist, FAQ sync, memory sync, weekly review, trends) ainda sao rastreadas na tela Rotinas via FR46
- FR48: O community weekly (`community_weekly.py`) grava no mesmo endpoint `/ingest/community` com campo `type: weekly` para diferenciar de daily

## Non-Functional Requirements

### Performance

- A API responde a qualquer endpoint em menos de 200ms para p95
- O frontend carrega a tela Home em menos de 2 segundos (first contentful paint)
- Queries SQLite executam em menos de 100ms para consultas de 1 ano de dados (indices em date + category)
- O polling de 60s nao causa degradacao perceptivel de performance

### Reliability

- O backend permanece estavel rodando continuamente (24/7 local)
- Falha em um collector nao afeta a execucao de outros collectors nem da API
- O SQLite opera em WAL mode para evitar lock entre leituras (API) e escritas (collectors)
- O backend se recupera graciosamente de erros transientes (timeout de API externa, disco cheio)

### Integration

- Os collectors se integram com os outputs existentes sem modificar os formatos atuais (JSONL, JSON, HTML)
- O backend consome as mesmas variaveis de ambiente ja configuradas (.env)
- O scheduler migrado para APScheduler mantem compatibilidade com os ADWs existentes
- Novos collectors podem ser adicionados sem modificar o codigo existente (plugin pattern)

### Maintainability

- O codigo segue a estrutura do monorepo (`dashboard/backend/`, `dashboard/frontend/`)
- O schema SQLite e versionado via Alembic migrations
- Cada collector e um modulo Python independente
- O frontend usa componentes Shadcn/ui padrao sem customizacoes profundas
