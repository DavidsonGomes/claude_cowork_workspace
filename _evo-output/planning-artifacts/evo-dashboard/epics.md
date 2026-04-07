---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ['prd.md', 'architecture.md']
status: 'complete'
completedAt: '2026-04-06'
---

# EVO Dashboard - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for EVO Dashboard, decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR1: Davidson pode ver o status atual de todos os 5 agentes com indicador de ultima execucao
- FR2: Davidson pode ver a lista de todas as 14 rotinas com status da ultima execucao
- FR3: Davidson pode ver o historico de execucoes de qualquer rotina com filtro por periodo (7d, 30d, 90d, 365d)
- FR4: Davidson pode ver detalhes de uma execucao especifica (duracao, return code, linhas de output, erro)
- FR5: Davidson pode ver metricas agregadas por rotina (total runs, success rate, duracao media)
- FR6: O sistema coleta automaticamente dados de execucao apos cada rotina via collector
- FR6a: O runner retenta automaticamente 1x antes de marcar como falhada
- FR6b: Davidson pode configurar timeout individual por rotina
- FR6c: Davidson pode ver o custo estimado em tokens de cada execucao
- FR6d: O sistema executa git auto-commit dos arquivos gerados ao final do dia
- FR7: Davidson pode ver o snapshot diario da comunidade (mensagens 24h, membros ativos, novos membros, sentimento)
- FR8: Davidson pode ver trend de sentimento ao longo do tempo
- FR9: Davidson pode ver top topicos da comunidade com contagem de mencoes
- FR10: Davidson pode ver perguntas sem resposta com indicador de urgencia
- FR11: Davidson pode ver o status da comunidade (normal/atencao/critico) como badge visual
- FR12: O sistema coleta automaticamente dados do community pulse diario
- FR13: Davidson pode ver o progresso do sprint atual
- FR14: Davidson pode ver PRs abertos por repositorio (5 repos)
- FR15: Davidson pode ver issues abertas por repositorio com filtro por prioridade
- FR16: Davidson pode ver stats dos repos (stars, forks, commits 7d)
- FR17: Davidson pode ver blockers ativos com link direto
- FR18: O sistema coleta automaticamente dados do GitHub e Linear
- FR19: Davidson pode ver MRR atual e trend mensal
- FR20: Davidson pode ver contagem de clientes ativos e churn
- FR21: Davidson pode ver assinaturas ativas por plano
- FR22: Davidson pode ver NFs pendentes e contas a receber/pagar do Omie
- FR23: O sistema coleta automaticamente dados do Stripe e Omie
- FR24: Davidson pode ver lista de reunioes do Fathom com data, titulo e participantes
- FR25: Davidson pode ver action items das reunioes com status de conclusao
- FR26: Davidson pode ver resumo de uma reuniao especifica
- FR27: Davidson pode filtrar reunioes por periodo e por projeto
- FR28: O sistema importa automaticamente dados das reunioes Fathom
- FR29: Davidson pode ver cockpit consolidado na Home com metricas-chave
- FR30: Davidson pode ver alertas visuais para rotinas falhadas, sentimento negativo, blockers
- FR31: Davidson pode navegar do cockpit para qualquer tela de detalhe
- FR32: Davidson pode ver a data/hora da ultima atualizacao de cada metrica
- FR33: O dashboard atualiza automaticamente os dados a cada 60 segundos
- FR34: Davidson pode ver o estado geral do ecossistema (health score)
- FR35: Davidson pode ver seus dados de saude atuais (peso, gordura%, musculo%, visceral, BMI)
- FR36: Davidson pode ver trend de peso e composicao corporal ao longo do tempo
- FR37: Davidson pode ver aderencia semanal (diet score, workouts, medicacao)
- FR38: Davidson pode ver sintomas reportados
- FR39: Davidson pode ver dados da Isabella no mesmo dashboard de saude
- FR40: O sistema coleta automaticamente dados dos health check-ins JSON
- FR41: As skills do Claude podem enviar dados estruturados via POST na API
- FR42: Cada dominio tem um endpoint de ingestao POST /api/v1/ingest/{dominio}
- FR43: O endpoint de ingestao valida o payload e grava no SQLite
- FR44: Skills existentes sao atualizadas para chamar a API de ingestao
- FR45: O sistema aceita dados tanto dos collectors quanto da ingestao direta (dual-write)
- FR46: O runner grava POST /ingest/routine apos TODA execucao de ADW (14/14 rotinas)
- FR47: Rotinas sem dados de dominio (morning, EOD, triage, etc.) sao rastreadas via FR46
- FR48: Community weekly grava no endpoint /ingest/community com type:weekly

### NonFunctional Requirements

- NFR1: API responde em menos de 200ms para p95
- NFR2: Frontend carrega tela Home em menos de 2 segundos (FCP)
- NFR3: Queries SQLite executam em menos de 100ms para 1 ano de dados
- NFR4: Backend permanece estavel rodando 24/7 local
- NFR5: Falha em collector nao afeta outros collectors nem a API
- NFR6: SQLite opera em WAL mode
- NFR7: Collectors integram com outputs existentes sem modificar formatos
- NFR8: Backend consome mesmas env vars existentes
- NFR9: APScheduler mantem compatibilidade com ADWs existentes
- NFR10: Novos collectors podem ser adicionados sem modificar codigo existente (plugin pattern)
- NFR11: Schema SQLite versionado via Alembic
- NFR12: Cada collector e modulo Python independente

### Additional Requirements

- Architecture especifica: FastAPI + SQLAlchemy + aiosqlite + APScheduler
- Architecture especifica: React + Vite + TypeScript + Shadcn/ui + TanStack Query + Recharts
- Architecture especifica: SQLite WAL mode, retencao 365 dias
- Architecture especifica: Monorepo dashboard/ com backend/ e frontend/
- Architecture especifica: Bind em 127.0.0.1 (localhost only, sem auth)
- Architecture especifica: Collector base ABC pattern
- Runner precisa de retry logic (1 retry, 30s backoff)
- Timeout configuravel por rotina via config
- Git auto-commit no EOD
- Scheduler persistente via launchd

### FR Coverage Map

- FR1 → Epic 2 (Story 2.3)
- FR2 → Epic 2 (Story 2.3)
- FR3 → Epic 2 (Story 2.4)
- FR4 → Epic 2 (Story 2.4)
- FR5 → Epic 2 (Story 2.3)
- FR6 → Epic 2 (Story 2.2)
- FR6a → Epic 2 (Story 2.1)
- FR6b → Epic 2 (Story 2.1)
- FR6c → Epic 2 (Story 2.2)
- FR6d → Epic 2 (Story 2.5)
- FR7 → Epic 3 (Story 3.1, 3.2)
- FR8 → Epic 3 (Story 3.2)
- FR9 → Epic 3 (Story 3.2)
- FR10 → Epic 3 (Story 3.2)
- FR11 → Epic 3 (Story 3.2)
- FR12 → Epic 3 (Story 3.1)
- FR13 → Epic 4 (Story 4.2)
- FR14 → Epic 4 (Story 4.1, 4.2)
- FR15 → Epic 4 (Story 4.2)
- FR16 → Epic 4 (Story 4.1, 4.2)
- FR17 → Epic 4 (Story 4.2)
- FR18 → Epic 4 (Story 4.1)
- FR19 → Epic 5 (Story 5.2)
- FR20 → Epic 5 (Story 5.2)
- FR21 → Epic 5 (Story 5.2)
- FR22 → Epic 5 (Story 5.1, 5.2)
- FR23 → Epic 5 (Story 5.1)
- FR24 → Epic 6 (Story 6.2)
- FR25 → Epic 6 (Story 6.2)
- FR26 → Epic 6 (Story 6.2)
- FR27 → Epic 6 (Story 6.2)
- FR28 → Epic 6 (Story 6.1)
- FR29 → Epic 7 (Story 7.1)
- FR30 → Epic 7 (Story 7.1)
- FR31 → Epic 7 (Story 7.1)
- FR32 → Epic 7 (Story 7.1)
- FR33 → Epic 7 (Story 7.2)
- FR34 → Epic 7 (Story 7.1)
- FR35 → Epic 8 (Story 8.2)
- FR36 → Epic 8 (Story 8.2)
- FR37 → Epic 8 (Story 8.2)
- FR38 → Epic 8 (Story 8.2)
- FR39 → Epic 8 (Story 8.2)
- FR40 → Epic 8 (Story 8.1)
- FR41 → Epic 9 (Story 9.1)
- FR42 → Epic 9 (Story 9.1)
- FR43 → Epic 9 (Story 9.1)
- FR44 → Epic 9 (Story 9.2)
- FR45 → Epic 9 (Story 9.1)
- FR46 → Epic 9 (Story 9.2) — runner grava /ingest/routine pra TODAS as 14 rotinas
- FR47 → Epic 2 (Story 2.2) + Epic 9 (Story 9.2) — rotinas sem dominio rastreadas via routine ingest
- FR48 → Epic 9 (Story 9.2) — community weekly usa mesmo endpoint com type:weekly

## Epic List

### Epic 1: Project Foundation & Infrastructure
Setup do monorepo, SQLite, FastAPI skeleton e frontend skeleton. Davidson pode rodar `make dev` e ver a aplicacao vazia funcionando.
**FRs covered:** Nenhum FR direto — habilita todos os demais.

### Epic 2: Rotinas & Runner Intelligence
Davidson pode ver todas as rotinas, seu historico, metricas e detalhes. Runner ganha retry e timeout configuravel.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR6a, FR6b, FR6c, FR6d

### Epic 3: Monitoramento de Comunidade
Davidson pode ver o pulso da comunidade com sentimento, topicos, perguntas sem resposta e trends.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12

### Epic 4: Acompanhamento de Projetos
Davidson pode ver sprint progress, GitHub stats, PRs, issues e blockers dos 5 repos Evolution.
**FRs covered:** FR13, FR14, FR15, FR16, FR17, FR18

### Epic 5: Visibilidade Financeira
Davidson pode ver MRR, churn, assinaturas (Stripe) e NFs pendentes (Omie).
**FRs covered:** FR19, FR20, FR21, FR22, FR23

### Epic 6: Gestao de Reunioes
Davidson pode ver reunioes Fathom, action items e resumos filtrados por projeto e periodo.
**FRs covered:** FR24, FR25, FR26, FR27, FR28

### Epic 7: Cockpit Home & Integracao Final
Davidson abre uma unica tela e ve o estado de todo o ecossistema com alertas, health score e navegacao.
**FRs covered:** FR29, FR30, FR31, FR32, FR33, FR34

### Epic 8: Acompanhamento Pessoal / Saude
Davidson pode ver dados de saude (peso, composicao corporal, aderencia, sintomas) dele e da Isabella.
**FRs covered:** FR35, FR36, FR37, FR38, FR39, FR40

### Epic 9: Ingest API & Skills de Integracao
Skills do Claude gravam dados estruturados direto na API do dashboard, eliminando dependencia de parsing de arquivos.
**FRs covered:** FR41, FR42, FR43, FR44, FR45

---

## Epic 1: Project Foundation & Infrastructure

Setup do monorepo com backend FastAPI + frontend React, banco SQLite com Alembic, e APScheduler integrado. Ao final, Davidson roda `make dev` e ve a aplicacao skeleton funcionando em localhost.

### Story 1.1: Inicializar Monorepo Backend

As a developer,
I want to initialize the backend project with FastAPI, SQLAlchemy, and APScheduler,
So that I have a working API skeleton to build upon.

**Acceptance Criteria:**

**Given** o diretorio `dashboard/backend/` nao existe
**When** eu rodo os comandos de setup (`uv init`, `uv add fastapi uvicorn sqlalchemy alembic apscheduler aiosqlite httpx rich`)
**Then** o diretorio `dashboard/backend/` existe com `pyproject.toml` e `uv.lock`
**And** `app/main.py` existe com FastAPI app + lifespan placeholder
**And** `app/core/database.py` existe com SQLite engine + WAL mode
**And** `app/config.py` existe lendo env vars do `.env`
**And** `alembic.ini` + `alembic/env.py` estao configurados para SQLAlchemy
**And** `uvicorn app.main:app --host 127.0.0.1 --port 8000` inicia sem erros
**And** `GET /health` retorna `{"status": "ok"}`

### Story 1.2: Inicializar Frontend React

As a developer,
I want to initialize the frontend project with React, Vite, TypeScript, Shadcn/ui, and TanStack Query,
So that I have a working SPA skeleton to build upon.

**Acceptance Criteria:**

**Given** o diretorio `dashboard/frontend/` nao existe
**When** eu rodo `npm create vite@latest frontend -- --template react-ts` e instalo dependencias
**Then** `dashboard/frontend/` existe com `package.json`, `vite.config.ts`, `tsconfig.json`
**And** Shadcn/ui esta inicializado com `components.json` e tema escuro
**And** Tailwind CSS esta configurado com cores Evolution (azul/roxo)
**And** TanStack Query esta configurado com `QueryClient` e `refetchInterval: 60000`
**And** React Router v6 esta configurado com rotas placeholder para todas as 7 paginas
**And** Layout base existe com Sidebar + Header + PageContainer
**And** `npm run dev` inicia o frontend em `localhost:5173`
**And** Vite proxy esta configurado para `/api` → `localhost:8000`

### Story 1.3: Makefile & Development Workflow

As a developer,
I want a Makefile with all dev/build/start commands,
So that I can run the project with simple make targets.

**Acceptance Criteria:**

**Given** o monorepo `dashboard/` existe com backend/ e frontend/
**When** eu rodo `make dev`
**Then** backend (uvicorn --reload) e frontend (vite dev) iniciam em paralelo
**And** `make build` gera o build de producao do frontend em `frontend/dist/`
**And** `make start` roda o backend servindo `frontend/dist/` como StaticFiles
**And** `make migrate` roda `alembic upgrade head`
**And** `make migration msg="X"` gera nova migration
**And** `make test` roda pytest
**And** `.env.example` existe com todas as env vars necessarias

### Story 1.4: SQLite Schema Base & Alembic Migrations

As a developer,
I want the base SQLite schema with all 7 tables and indices,
So that collectors can start writing data.

**Acceptance Criteria:**

**Given** o backend esta inicializado com SQLAlchemy + Alembic
**When** eu rodo `make migrate`
**Then** as 7 tabelas sao criadas: `routine_runs`, `community_snapshots`, `github_snapshots`, `finance_snapshots`, `meetings`, `sprint_snapshots`, `metrics`
**And** todos os indices estao criados conforme architecture.md
**And** WAL mode esta ativo no SQLite
**And** o arquivo `data/evo-dashboard.db` e criado automaticamente
**And** `data/` esta no `.gitignore`

### Story 1.5: APScheduler Integration

As a developer,
I want APScheduler running inside FastAPI lifespan,
So that scheduled jobs execute automatically.

**Acceptance Criteria:**

**Given** FastAPI app com lifespan
**When** o backend inicia
**Then** APScheduler inicia automaticamente com job store no SQLite
**And** um job de teste (heartbeat) executa a cada 5 minutos e grava na tabela `metrics`
**And** os jobs sobrevivem a restart (persistent job store)
**And** o scheduler para graciosamente no shutdown (SIGINT/SIGTERM)
**And** logs de scheduler aparecem no console via `rich`

---

## Epic 2: Rotinas & Runner Intelligence

Davidson pode ver todas as rotinas do ecossistema, seu historico de execucoes, metricas agregadas e detalhes. O runner ganha retry logic e timeout configuravel.

### Story 2.1: Runner com Retry e Timeout Configuravel

As Davidson,
I want the runner to retry failed routines once and respect configurable timeouts,
So that transient failures don't cause unnecessary alerts.

**Acceptance Criteria:**

**Given** um ADW script falha por timeout
**When** o runner detecta o returncode != 0
**Then** o runner espera 30s e retenta 1x automaticamente
**And** se o retry tambem falha, marca como `failure` com `retry_count: 1`
**And** se o retry sucede, marca como `success` com `retry_count: 1`
**And** cada rotina pode ter timeout individual via `config.yaml` (default: 900s)
**And** o runner loga cada tentativa com timestamp e duracao

### Story 2.2: Routine Collector

As the system,
I want to collect routine execution data from JSONL logs into SQLite,
So that the API can serve routine data to the frontend.

**Acceptance Criteria:**

**Given** uma rotina termina de executar (sucesso ou falha)
**When** o collector de rotinas e acionado
**Then** os dados da execucao sao parseados de `ADWs/logs/YYYY-MM-DD.jsonl`
**And** uma row e inserida na tabela `routine_runs` com todos os campos (name, agent, started_at, finished_at, duration_secs, return_code, stdout_lines, status, retry_count, error_summary)
**And** o campo `token_cost` e estimado a partir do stdout (se disponivel)
**And** dados existentes no JSONL historico sao importados na primeira execucao (backfill)
**And** duplicatas sao detectadas e ignoradas (based on name + started_at)

### Story 2.3: API e Frontend — Lista de Rotinas

As Davidson,
I want to see all routines with their status, last run, and aggregated metrics,
So that I can quickly identify which routines need attention.

**Acceptance Criteria:**

**Given** dados de rotinas existem no SQLite
**When** Davidson acessa `/routines` no dashboard
**Then** a tela mostra uma lista de todas as 14 rotinas
**And** cada rotina mostra: nome, agente, status da ultima execucao (badge verde/vermelho/amarelo), duracao da ultima execucao, horario
**And** metricas agregadas sao exibidas: total runs, success rate %, duracao media
**And** a API `GET /api/v1/routines` retorna os dados no formato `{data, meta}`
**And** a lista atualiza automaticamente a cada 60s

### Story 2.4: API e Frontend — Historico e Detalhe de Rotina

As Davidson,
I want to drill down into any routine's execution history and see details of specific runs,
So that I can investigate failures and trends.

**Acceptance Criteria:**

**Given** Davidson clica numa rotina na lista
**When** a pagina de detalhe carrega
**Then** mostra o historico de execucoes com filtro por periodo (7d, 30d, 90d, 365d)
**And** cada execucao mostra: timestamp, duracao, status, return code, retry count, token cost
**And** Davidson pode clicar numa execucao para ver error_summary e stdout lines
**And** um grafico de trend mostra duracao e success rate ao longo do tempo
**And** a API `GET /api/v1/routines/{name}/history?days=30` retorna dados paginados

### Story 2.5: Git Auto-Commit no EOD

As Davidson,
I want the system to auto-commit generated files at end of day,
So that daily outputs are versioned without manual intervention.

**Acceptance Criteria:**

**Given** a rotina de EOD termina
**When** o job de git auto-commit executa (agendado apos EOD)
**Then** arquivos em `01 Daily Logs/`, `03 Comunidade/reports/`, `02 Projects/`, `07 Reunioes/summaries/` sao staged
**And** um commit e criado com mensagem `chore: auto-commit daily outputs YYYY-MM-DD`
**And** arquivos em `.env`, `data/`, `node_modules/` NAO sao incluidos
**And** se nao houver mudancas, nenhum commit e criado
**And** erros no git sao logados mas nao crasham o backend

---

## Epic 3: Monitoramento de Comunidade

Davidson pode ver o pulso da comunidade Discord com sentimento, topicos, perguntas sem resposta e trends historicos.

### Story 3.1: Community Collector

As the system,
I want to collect community data from pulse HTML reports into SQLite,
So that the API can serve community metrics to the frontend.

**Acceptance Criteria:**

**Given** um arquivo `03 Comunidade/reports/daily/[C] YYYY-MM-DD-community-pulse.html` existe
**When** o community collector executa (agendado apos pulse daily)
**Then** o HTML e parseado para extrair: messages_count, active_members, new_members, sentiment_score, sentiment_label, top_topics (JSON), unresolved_questions, status
**And** uma row e inserida na tabela `community_snapshots`
**And** dados historicos existentes sao importados na primeira execucao (backfill)
**And** se o HTML nao existe ou falha o parse, o collector loga o erro e nao crasha

### Story 3.2: API e Frontend — Comunidade

As Davidson,
I want to see community health with sentiment trends, topics, and unresolved questions,
So that I can proactively address community concerns.

**Acceptance Criteria:**

**Given** dados de comunidade existem no SQLite
**When** Davidson acessa `/community` no dashboard
**Then** a tela mostra: mensagens 24h, membros ativos, novos membros, sentimento (badge com emoji e %)
**And** status geral da comunidade como badge (normal/atencao/critico)
**And** top topicos com contagem de mencoes (bar chart)
**And** perguntas sem resposta com indicador de urgencia
**And** grafico de trend de sentimento (line chart, periodo selecionavel: 7d, 30d, 90d)
**And** a API `GET /api/v1/community/latest` e `GET /api/v1/community/trend?days=30` retornam dados
**And** dados atualizam automaticamente a cada 60s

---

## Epic 4: Acompanhamento de Projetos

Davidson pode ver sprint progress, GitHub stats, PRs abertos, issues e blockers dos 5 repos Evolution.

### Story 4.1: GitHub + Sprint Collectors

As the system,
I want to collect GitHub stats and sprint data into SQLite,
So that the API can serve project metrics to the frontend.

**Acceptance Criteria:**

**Given** os arquivos de GitHub review (`02 Projects/github-reviews/`) e Linear review (`02 Projects/linear-reviews/`) existem
**When** os collectors executam (agendados apos github_review e linear_review ADWs)
**Then** o GitHub collector parseia o HTML/MD e grava na tabela `github_snapshots`: date, repo, stars, forks, open_prs, open_issues, commits_7d, latest_release (para cada um dos 5 repos)
**And** o Sprint collector parseia o review do Linear e grava na tabela `sprint_snapshots`: date, total_issues, done, in_progress, in_review, blocked, backlog
**And** backfill de dados historicos na primeira execucao
**And** falhas sao logadas sem crashar

### Story 4.2: API e Frontend — Projetos

As Davidson,
I want to see sprint progress, GitHub stats, and blockers in one view,
So that I can track project health and prioritize actions.

**Acceptance Criteria:**

**Given** dados de projetos existem no SQLite
**When** Davidson acessa `/projects` no dashboard
**Then** a tela mostra progress bar do sprint (done/total, %)
**And** cards por repositorio com: stars, forks, open PRs, open issues, commits 7d
**And** lista de blockers ativos com link direto para Linear/GitHub
**And** a API `GET /api/v1/projects/sprint` e `GET /api/v1/projects/github` retornam dados
**And** dados atualizam a cada 60s

---

## Epic 5: Visibilidade Financeira

Davidson pode ver MRR, churn, assinaturas ativas (Stripe) e NFs pendentes (Omie).

### Story 5.1: Finance Collector

As the system,
I want to collect financial data from Stripe and Omie into SQLite,
So that the API can serve financial metrics to the frontend.

**Acceptance Criteria:**

**Given** as env vars STRIPE_SECRET_KEY, OMIE_APP_KEY e OMIE_APP_SECRET estao configuradas
**When** o finance collector executa (agendado diariamente)
**Then** dados do Stripe sao coletados via `scripts/stripe_query.py`: MRR, active_subscriptions, new_customers, churned_customers
**And** dados do Omie sao coletados via `scripts/omie_client.py`: nfs_pendentes, contas_a_receber, contas_a_pagar
**And** uma row e inserida na tabela `finance_snapshots`
**And** se Stripe ou Omie falhar, os dados disponiveis sao salvos e o erro logado

### Story 5.2: API e Frontend — Financeiro

As Davidson,
I want to see MRR, churn, subscriptions, and pending invoices,
So that I can monitor financial health at a glance.

**Acceptance Criteria:**

**Given** dados financeiros existem no SQLite
**When** Davidson acessa `/finance` no dashboard
**Then** a tela mostra: MRR atual com trend mensal (line chart), clientes ativos, churn
**And** assinaturas ativas por plano
**And** NFs pendentes e saldo de contas a receber/pagar do Omie
**And** a API `GET /api/v1/finance/latest` e `GET /api/v1/finance/trend?days=30` retornam dados
**And** dados atualizam a cada 60s

---

## Epic 6: Gestao de Reunioes

Davidson pode ver reunioes do Fathom, action items com status de conclusao, e resumos filtrados por projeto.

### Story 6.1: Meeting Collector

As the system,
I want to collect meeting data from Fathom JSON files into SQLite,
So that the API can serve meeting data to the frontend.

**Acceptance Criteria:**

**Given** arquivos JSON existem em `07 Reunioes/fathom/YYYY-MM-DD/`
**When** o meeting collector executa (agendado apos sync_meetings ADW)
**Then** cada JSON e parseado: title, date, duration, participants (JSON), action_items_count, action_items_done, project (classificado), summary_excerpt
**And** rows sao inseridas na tabela `meetings` com fathom_id unico
**And** backfill de todos os 40+ JSON historicos na primeira execucao
**And** duplicatas detectadas por fathom_id e ignoradas

### Story 6.2: API e Frontend — Reunioes

As Davidson,
I want to see all meetings with action items and filter by project,
So that I can track follow-ups and meeting outcomes.

**Acceptance Criteria:**

**Given** dados de reunioes existem no SQLite
**When** Davidson acessa `/meetings` no dashboard
**Then** a tela mostra lista de reunioes com: titulo, data, duracao, participantes, action items (done/total)
**And** filtros por periodo (7d, 30d, 90d) e por projeto (dropdown)
**And** Davidson pode clicar numa reuniao para ver o resumo e lista de action items
**And** action items mostram: descricao, assignee, status (done/pending)
**And** a API `GET /api/v1/meetings` e `GET /api/v1/meetings/{id}` retornam dados
**And** dados atualizam a cada 60s

---

## Epic 7: Cockpit Home & Integracao Final

Davidson abre uma unica tela e ve o estado de todo o ecossistema com metricas-chave, alertas, health score e navegacao para cada detalhe.

### Story 7.1: Dashboard Overview API + Cockpit Home

As Davidson,
I want to see the complete ecosystem status on one screen,
So that I can assess everything in under 5 seconds.

**Acceptance Criteria:**

**Given** todos os collectors estao populando dados no SQLite
**When** Davidson acessa `/` (Home) no dashboard
**Then** a tela mostra cards de agentes com status (ultimo run, verde/vermelho)
**And** card de rotinas: X executadas hoje, Y falhas, com alerta visual se falha > 0
**And** card de comunidade: sentimento %, status badge, perguntas sem resposta
**And** card de sprint: progress bar, blockers count
**And** card financeiro: MRR com variacao vs mes anterior
**And** card de reunioes: proximas reunioes, action items pendentes
**And** health score geral do ecossistema (calculado a partir de todos os dominios)
**And** cada card e clicavel e navega para a tela de detalhe correspondente
**And** data/hora da ultima atualizacao visivel em cada card
**And** a API `GET /api/v1/dashboard/overview` consolida dados de todos os dominios
**And** `GET /api/v1/dashboard/alerts` retorna alertas ativos (rotinas falhadas, sentimento negativo, blockers)

### Story 7.2: Auto-Refresh & Polish Final

As Davidson,
I want the dashboard to auto-refresh and feel polished,
So that it's a reliable daily tool.

**Acceptance Criteria:**

**Given** o dashboard esta completo com todas as telas
**When** dados mudam no backend (novo collector run)
**Then** todas as telas atualizam automaticamente a cada 60s via TanStack Query
**And** loading states mostram Skeleton components (nao spinners fullscreen)
**And** erros de fetch mostram "Sem dados" + timestamp da ultima coleta
**And** o tema escuro Evolution esta consistente em todas as telas
**And** a sidebar mostra indicadores de status por dominio (bolinha verde/vermelha)
**And** o backend serve o frontend build via StaticFiles em producao
**And** `make start` roda tudo num processo unico

---

## Epic 8: Acompanhamento Pessoal / Saude

Davidson pode ver dados de saude (peso, composicao corporal, aderencia a dieta/treino, sintomas) dele e da Isabella, com trends historicos.

### Story 8.1: Health Collector

As the system,
I want to collect health data from check-in JSON files into SQLite,
So that the API can serve health metrics to the frontend.

**Acceptance Criteria:**

**Given** arquivos JSON existem em `06 Pessoal/health-checkins/` (formato: date, davidson{scale, trend, adherence, symptoms}, isabella{...})
**When** o health collector executa (agendado apos health check-in semanal)
**Then** cada JSON e parseado e rows sao inseridas na tabela `health_snapshots` para davidson e isabella
**And** campos extraidos: weight_kg, fat_pct, skeletal_muscle_pct, visceral, bmi, water_pct, bmr_kcal, diet_score, workouts_count, medication_on_time, symptoms (JSON)
**And** backfill dos 4+ JSONs historicos na primeira execucao
**And** duplicatas detectadas por (date, person) e ignoradas
**And** dados de `health-data.js` (31 medicoes Davidson, 17 Isabella) sao importados no backfill

### Story 8.2: API e Frontend — Saude

As Davidson,
I want to see health metrics with trends for myself and Isabella,
So that I can track our progress with Mounjaro and fitness goals.

**Acceptance Criteria:**

**Given** dados de saude existem no SQLite
**When** Davidson acessa `/health` no dashboard
**Then** a tela mostra tabs ou toggle: Davidson | Isabella
**And** para cada pessoa mostra: peso atual, gordura %, musculo %, visceral, BMI, agua %, BMR
**And** badges de trend: seta verde para melhoria, vermelha para piora
**And** grafico de linha: peso ao longo do tempo (periodo selecionavel: 30d, 90d, 365d)
**And** grafico de composicao: gordura vs musculo ao longo do tempo
**And** secao de aderencia: diet score, workouts esta semana, medicacao em dia (check/x)
**And** secao de sintomas: lista de sintomas reportados com intensidade
**And** a API `GET /api/v1/health/latest?person=davidson` e `GET /api/v1/health/trend?person=davidson&days=90` retornam dados
**And** dados atualizam a cada 60s

---

## Epic 9: Ingest API & Skills de Integracao

A API do dashboard aceita dados estruturados via POST, e skills do Claude sao criadas/atualizadas para gravar dados direto na API alem dos outputs HTML/MD existentes.

### Story 9.1: Ingest API Endpoints

As a developer,
I want POST endpoints for each domain that accept structured data,
So that Claude skills can write directly to the dashboard database.

**Acceptance Criteria:**

**Given** o backend FastAPI esta rodando
**When** uma skill faz `POST /api/v1/ingest/community` com payload JSON valido
**Then** os dados sao validados (campos obrigatorios, tipos corretos)
**And** uma row e inserida/atualizada na tabela correspondente
**And** resposta 201 com `{data: {id: N}, meta: {timestamp}}` em caso de sucesso
**And** resposta 422 com detalhes de validacao em caso de payload invalido
**And** endpoints existem para todos os 7 dominios: community, github, finance, sprint, meeting, health, routine
**And** duplicatas sao tratadas com upsert (update se ja existe row para mesma date/chave)
**And** a API aceita tanto dados novos quanto atualizacoes de dados existentes

### Story 9.2: Skills Claude de Integracao

As Davidson,
I want my existing Claude skills to automatically send data to the dashboard API,
So that the dashboard stays updated without depending on file parsing.

**Acceptance Criteria:**

**Given** o backend esta rodando em localhost:8000
**When** a rotina `community_daily.py` termina de executar via runner
**Then** o runner (ou uma skill dedicada `int-dashboard-community`) extrai os dados estruturados do output
**And** faz `POST /api/v1/ingest/community` com o payload JSON
**And** o dashboard recebe os dados e grava no SQLite
**And** isso funciona para todos os 7 dominios:
  - `pulse-daily` → `POST /ingest/community`
  - `int-github-review` → `POST /ingest/github`
  - `int-stripe` + `int-omie` → `POST /ingest/finance`
  - `int-linear-review` → `POST /ingest/sprint`
  - `int-sync-meetings` → `POST /ingest/meeting`
  - health check-in → `POST /ingest/health`
  - `community_weekly.py` → `POST /ingest/community` (com `type: weekly`)
  - runner pos-execucao → `POST /ingest/routine` (TODAS as 14 rotinas, automatico)
**And** 7 skills de dominio sao criadas em `.claude/skills/`: `int-dashboard-community.md`, `int-dashboard-github.md`, etc.
**And** o runner.py e modificado para fazer `POST /ingest/routine` automaticamente apos TODA execucao (14/14), sem precisar de skill separada
**And** rotinas sem dominio especifico (morning, EOD, triage, todoist, FAQ sync, memory sync, weekly review, trends) sao rastreadas apenas via `/ingest/routine` — nao precisam de skill de dominio
**And** cada skill contem instrucoes para extrair dados do output e formatar o payload JSON
**And** se a API estiver offline, a skill loga o erro mas nao falha (graceful degradation)
**And** os collectors de arquivo continuam funcionando como fallback (dual-write)
