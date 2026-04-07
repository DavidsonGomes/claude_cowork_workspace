---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['prd.md', 'ROADMAP.md']
workflowType: 'architecture'
project_name: 'EVO Dashboard'
user_name: 'Davidson'
date: '2026-04-06'
lastStep: 8
status: 'complete'
completedAt: '2026-04-06'
---

# Architecture Decision Document — EVO Dashboard

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
34 FRs organizados em 6 areas de capacidade: Gestao de Agentes/Rotinas (FR1-FR6d), Monitoramento de Comunidade (FR7-FR12), Acompanhamento de Projetos (FR13-FR18), Visibilidade Financeira (FR19-FR23), Gestao de Reunioes (FR24-FR28), Dashboard/Cockpit (FR29-FR34). O sistema e predominantemente de leitura — coleta dados de fontes existentes e apresenta num painel visual. Escrita limitada a configuracao de timeouts e trigger manual de rotinas (Phase 2).

**Non-Functional Requirements:**
- Performance: API <200ms p95, frontend FCP <2s, SQLite queries <100ms para 1 ano
- Reliability: 24/7 local, isolamento de falhas entre collectors, WAL mode no SQLite
- Integration: compatibilidade com outputs existentes (JSONL, JSON, HTML), mesmas env vars
- Maintainability: monorepo, Alembic migrations, collectors como modulos independentes

**Scale & Complexity:**
- Primary domain: Web App (SPA + API backend)
- Complexity level: Media
- Single-user, local-only
- 7 tabelas SQLite, 6 collectors, 6 endpoints de API, 6 telas frontend
- 11 integracoes externas (ja existentes, dashboard le os outputs)

### Technical Constraints & Dependencies

- **Python obrigatorio no backend** — ecossistema existente e 100% Python (scheduler.py, runner.py, telegram_server.py)
- **React obrigatorio no frontend** — decisao do Davidson
- **Compatibilidade com ADWs** — os 13 scripts em `ADWs/rotinas/` rodam via `runner.py` que chama `claude CLI`. O backend deve manter este fluxo
- **Env vars existentes** — TELEGRAM_BOT_TOKEN, FATHOM_API_KEY, STRIPE_SECRET_KEY, OMIE_APP_KEY, OMIE_APP_SECRET, TODOIST_API_TOKEN
- **Package manager: uv** — ja usado no workspace (`uv run python`)
- **Makefile como task runner** — targets existentes devem ser preservados e estendidos

### Cross-Cutting Concerns

- **Coleta de dados pos-rotina** — todo collector precisa parsear output (JSONL/JSON/HTML) e gravar no SQLite
- **Tratamento de erros** — falha em collector nao pode derrubar o backend
- **Retencao de dados** — 365 dias de historico, cleanup periodico
- **Retry logic** — runner precisa de retry configuravel por rotina
- **Git auto-commit** — EOD deve commitar arquivos gerados

## Starter Template Evaluation

### Primary Technology Domain

**Backend:** Python API (FastAPI) — nao ha starter CLI oficial. Projeto inicializado manualmente com estrutura definida abaixo.

**Frontend:** React SPA (Vite) — inicializado via `npm create vite@latest`.

### Starter Options Considered

| Opcao | Pros | Contras | Decisao |
|-------|------|---------|---------|
| FastAPI manual | Controle total, sem bloat, alinhado com stack existente | Mais setup inicial | **Selecionado** |
| FastAPI-template (tiangolo) | Estrutura pronta, Docker incluso | Over-engineered pra single-user local | Descartado |
| Vite + React + TS | Rapido, leve, oficial | Precisa adicionar Shadcn/ui e Tailwind | **Selecionado** |
| Next.js | SSR, full-stack | Overkill — nao precisa SSR, SEO, nem Node backend | Descartado |
| Create React App | Familiar | Deprecated, Vite e superior | Descartado |

### Selected Starters

**Backend — FastAPI manual:**
```bash
mkdir -p dashboard/backend && cd dashboard/backend
uv init --python 3.12
uv add fastapi uvicorn sqlalchemy alembic apscheduler aiosqlite python-telegram-bot httpx rich
```

**Frontend — Vite + React + TypeScript:**
```bash
cd dashboard
npm create vite@latest frontend -- --template react-ts
cd frontend
npx shadcn@latest init
npm install recharts @tanstack/react-query react-router-dom lucide-react
```

**Architectural Decisions Provided by Starters:**
- Language: Python 3.12 (backend), TypeScript 5.x (frontend)
- Build: uvicorn (backend), Vite (frontend)
- Styling: Tailwind CSS via Shadcn/ui
- State: TanStack Query (server state only)
- Routing: React Router v6

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database: SQLite com SQLAlchemy + Alembic
- API Framework: FastAPI com async
- Scheduler: APScheduler (substituindo `schedule` lib)
- Frontend: React + Vite + TypeScript + Shadcn/ui

**Important Decisions (Shape Architecture):**
- Dual-write: collectors (parse de arquivos) + ingest API (skills gravam direto)
- Skills Claude `.claude/skills/int-dashboard-*` para cada dominio
- API response format padronizado
- Error handling centralizado
- Logging estruturado

**Deferred Decisions (Post-MVP):**
- WebSocket (se polling nao for suficiente)
- Auth (quando virar multi-user)
- Docker compose para producao
- Telegram bidirecional

### Data Architecture

**Database:** SQLite 3 via SQLAlchemy 2.0 (async com aiosqlite)
- WAL mode habilitado na inicializacao
- Alembic para migrations versionadas
- Arquivo: `dashboard/backend/data/evo-dashboard.db`
- Retencao: 365 dias. Cleanup job semanal via APScheduler

**Schema (7 tabelas):**

```sql
-- Execucoes de rotinas (fonte: ADWs/logs/*.jsonl + runner hooks)
routine_runs (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL,
    agent         TEXT,
    started_at    DATETIME NOT NULL,
    finished_at   DATETIME,
    duration_secs REAL,
    return_code   INTEGER,
    stdout_lines  INTEGER,
    status        TEXT CHECK(status IN ('success','failure','timeout','retrying')),
    retry_count   INTEGER DEFAULT 0,
    token_cost    INTEGER,
    error_summary TEXT,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Snapshots diarios da comunidade (fonte: community pulse HTML parser)
community_snapshots (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    date                 DATE UNIQUE NOT NULL,
    messages_count       INTEGER,
    active_members       INTEGER,
    new_members          INTEGER,
    sentiment_score      REAL,
    sentiment_label      TEXT,
    top_topics           JSON,
    unresolved_questions INTEGER,
    status               TEXT CHECK(status IN ('normal','atencao','critico')),
    created_at           DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Snapshots de repos GitHub (fonte: gh CLI output parser)
github_snapshots (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    date         DATE NOT NULL,
    repo         TEXT NOT NULL,
    stars        INTEGER,
    forks        INTEGER,
    open_prs     INTEGER,
    open_issues  INTEGER,
    commits_7d   INTEGER,
    latest_release TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, repo)
);

-- Snapshots financeiros (fonte: Stripe API + Omie API)
finance_snapshots (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    date                 DATE UNIQUE NOT NULL,
    mrr                  REAL,
    new_customers        INTEGER,
    churned_customers    INTEGER,
    active_subscriptions INTEGER,
    nfs_pendentes        INTEGER,
    contas_a_receber     REAL,
    contas_a_pagar       REAL,
    created_at           DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Reunioes do Fathom (fonte: JSON files em 07 Reunioes/fathom/)
meetings (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    fathom_id           INTEGER UNIQUE,
    title               TEXT NOT NULL,
    date                DATE NOT NULL,
    duration_minutes    INTEGER,
    participants        JSON,
    action_items_count  INTEGER,
    action_items_done   INTEGER,
    project             TEXT,
    summary_excerpt     TEXT,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Snapshots de sprint/Linear (fonte: Linear MCP output parser)
sprint_snapshots (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    date         DATE UNIQUE NOT NULL,
    total_issues INTEGER,
    done         INTEGER,
    in_progress  INTEGER,
    in_review    INTEGER,
    blocked      INTEGER,
    backlog      INTEGER,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Metricas genericas (chave-valor com serie temporal)
metrics (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    category    TEXT NOT NULL,
    key         TEXT NOT NULL,
    value       REAL,
    metadata    JSON
);

-- Snapshots de saude (fonte: health check-in JSON + API ingest)
health_snapshots (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    date                  DATE NOT NULL,
    person                TEXT NOT NULL CHECK(person IN ('davidson','isabella')),
    weight_kg             REAL,
    fat_pct               REAL,
    skeletal_muscle_pct   REAL,
    visceral              REAL,
    bmi                   REAL,
    water_pct             REAL,
    bmr_kcal              REAL,
    diet_score            INTEGER,
    workouts_count        INTEGER,
    medication_on_time    BOOLEAN,
    symptoms              JSON,
    created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, person)
);

-- Indices
CREATE INDEX idx_health_date_person ON health_snapshots(date, person);
CREATE INDEX idx_routine_runs_name_date ON routine_runs(name, started_at);
CREATE INDEX idx_community_date ON community_snapshots(date);
CREATE INDEX idx_github_date_repo ON github_snapshots(date, repo);
CREATE INDEX idx_finance_date ON finance_snapshots(date);
CREATE INDEX idx_meetings_date ON meetings(date);
CREATE INDEX idx_sprint_date ON sprint_snapshots(date);
CREATE INDEX idx_metrics_category_date ON metrics(category, recorded_at);
```

### Authentication & Security

**Decisao: Sem autenticacao no MVP.** Single-user, localhost only. Bind em `127.0.0.1` (nao `0.0.0.0`).

**Post-MVP (quando virar multi-user):** HTTP Basic Auth ou session-based. Sem OAuth — overkill para ferramenta interna.

### API & Communication Patterns

**Framework:** FastAPI com async, auto-documentacao OpenAPI em `/docs`

**Base URL:** `http://localhost:8000/api/v1`

**Endpoints:**

| Grupo | Endpoints |
|-------|-----------|
| Routines | `GET /routines` `GET /routines/{name}` `GET /routines/{name}/history?days=30` |
| Community | `GET /community/latest` `GET /community/trend?days=30` |
| Projects | `GET /projects/sprint` `GET /projects/github` `GET /projects/github/{repo}` |
| Finance | `GET /finance/latest` `GET /finance/trend?days=30` |
| Meetings | `GET /meetings` `GET /meetings/{id}` `GET /meetings?project=evo-ai&days=30` |
| Health | `GET /health/latest?person=davidson` `GET /health/trend?person=davidson&days=90` |
| Dashboard | `GET /dashboard/overview` `GET /dashboard/health` `GET /dashboard/alerts` |
| Ingest | `POST /ingest/community` `POST /ingest/github` `POST /ingest/finance` `POST /ingest/sprint` `POST /ingest/meeting` `POST /ingest/health` `POST /ingest/routine` |

**Response Format Padrao:**
```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2026-04-06T12:00:00-03:00",
    "source": "sqlite"
  }
}
```

**Error Format:**
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Routine 'xyz' not found"
  }
}
```

### Frontend Architecture

**State Management:** TanStack Query v5 — server state only. Sem store local.

**Polling:** `refetchInterval: 60_000` em todas as queries. Sem WebSocket.

**Routing (React Router v6):**

| Rota | Componente | Dados |
|------|-----------|-------|
| `/` | `HomePage` | `GET /dashboard/overview` |
| `/community` | `CommunityPage` | `GET /community/latest` + `GET /community/trend` |
| `/projects` | `ProjectsPage` | `GET /projects/sprint` + `GET /projects/github` |
| `/finance` | `FinancePage` | `GET /finance/latest` + `GET /finance/trend` |
| `/routines` | `RoutinesPage` | `GET /routines` |
| `/routines/:name` | `RoutineDetailPage` | `GET /routines/{name}/history` |
| `/meetings` | `MeetingsPage` | `GET /meetings` |

**Component Architecture:** Flat feature-based. Sem atomic design — overkill.

### Infrastructure & Deployment

**Processo unico:** `uvicorn` rodando FastAPI que inclui:
- APScheduler (in-process, job store no SQLite)
- Collectors (triggered por scheduler apos cada ADW)
- Static file serving do frontend build (`/` → `dashboard/frontend/dist/`)

**Persistencia do processo:**
- MVP: `launchd` plist no macOS (auto-start no boot)
- Post-MVP: `docker-compose.yml` com volume pro SQLite

**Logs:** `rich` para terminal + Python `logging` para arquivo rotativo

### Decision Impact Analysis

**Implementation Sequence:**
1. SQLite schema + Alembic migrations
2. FastAPI app skeleton + lifespan (scheduler init)
3. Collectors (rotinas primeiro, depois comunidade, GitHub, finance, meetings, sprint)
4. API endpoints por dominio
5. Frontend skeleton (Vite + React + Router + TanStack Query)
6. Tela Home (cockpit)
7. Telas de detalhe (uma por vez)
8. Runner retry + timeout config
9. Git auto-commit no EOD
10. Scheduler persistente (launchd)

**Cross-Component Dependencies:**
- Collectors dependem do schema SQLite → schema primeiro
- API depende de collectors popularem dados → collectors antes de testar API
- Frontend depende de API funcional → API antes de frontend
- Runner retry e independente → pode ser parallelizado

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database Naming (SQLite/SQLAlchemy):**
- Tabelas: `snake_case` plural (`routine_runs`, `community_snapshots`)
- Colunas: `snake_case` (`started_at`, `return_code`, `sentiment_score`)
- Foreign keys: `{tabela_singular}_id` (`meeting_id`)
- Indices: `idx_{tabela}_{colunas}` (`idx_routine_runs_name_date`)

**API Naming:**
- Endpoints: `snake_case` plural (`/routines`, `/meetings`)
- Query params: `snake_case` (`?days=30`, `?project=evo-ai`)
- JSON response fields: `snake_case` (`messages_count`, `active_members`)

**Python Code Naming:**
- Modulos/arquivos: `snake_case` (`routine_collector.py`, `community_service.py`)
- Classes: `PascalCase` (`RoutineRun`, `CommunitySnapshot`)
- Funcoes/metodos: `snake_case` (`get_latest_snapshot`, `collect_routine_data`)
- Constantes: `UPPER_SNAKE_CASE` (`DEFAULT_RETENTION_DAYS = 365`)

**React/TypeScript Naming:**
- Componentes: `PascalCase` arquivo e export (`MetricCard.tsx`, `TrendChart.tsx`)
- Hooks: `camelCase` com prefixo `use` (`useRoutines`, `useCommunityTrend`)
- Utils/libs: `camelCase` (`api.ts`, `formatDate.ts`)
- Types/interfaces: `PascalCase` (`RoutineRun`, `CommunitySnapshot`)
- CSS classes: Tailwind utilities (sem CSS modules, sem BEM)

### Structure Patterns

**Backend organization:** Por dominio/feature, nao por tipo.
```
app/
  api/           # Routers FastAPI por dominio
  models/        # SQLAlchemy models por tabela
  services/      # Business logic por dominio
  collectors/    # Um arquivo por collector
  core/          # Config, database, scheduler setup
```

**Frontend organization:** Por feature/pagina.
```
src/
  pages/         # Uma pagina por rota
  components/    # Componentes compartilhados (cards, charts, badges)
  hooks/         # Custom hooks (useApi wrappers)
  lib/           # Utils, api client, formatters
  types/         # TypeScript interfaces
```

**Tests:** Co-localizados com o codigo.
```
app/collectors/routine_collector.py
app/collectors/test_routine_collector.py
```

### Format Patterns

**Datas:** ISO 8601 em UTC na API (`2026-04-06T15:00:00Z`). Frontend converte para BRT na exibicao.

**JSON fields:** Sempre `snake_case`. Numeros como numeros (nao strings). Null explicito quando sem dados (nao omitir campo).

**API pagination:** Query params `?limit=50&offset=0` quando necessario. Default: sem paginacao (datasets pequenos).

### Process Patterns

**Error Handling (Backend):**
```python
# Collector errors: log + continue (nunca crash)
try:
    await collector.collect()
except Exception as e:
    logger.error(f"Collector {collector.name} failed: {e}")
    # NAO re-raise. Proximo collector roda normalmente.

# API errors: HTTPException com formato padrao
raise HTTPException(status_code=404, detail={"code": "NOT_FOUND", "message": "..."})
```

**Error Handling (Frontend):**
```typescript
// TanStack Query error boundaries por pagina
// Fallback: card com "Sem dados" + timestamp da ultima coleta bem-sucedida
```

**Loading States:**
- Skeleton loading (Shadcn Skeleton component)
- Sem spinners fullscreen — cada card carrega independente

**Retry (Runner):**
```python
# 1 retry com backoff de 30s. Se falhar de novo, marca como failure.
max_retries = config.get(routine_name, {}).get("max_retries", 1)
retry_delay = config.get(routine_name, {}).get("retry_delay", 30)
```

### Enforcement Guidelines

**All AI Agents MUST:**
- Usar `snake_case` em todo Python e JSON
- Usar `PascalCase` em componentes React e classes Python
- Nunca crashar o backend — todo collector em try/except
- Toda query SQLite com indice (verificar EXPLAIN)
- Todo endpoint retorna formato padrao `{data, meta}` ou `{error}`
- Todo componente React usa Shadcn/ui como base

## Project Structure & Boundaries

### Complete Project Directory Structure

```
dashboard/
├── Makefile                        # dev, build, start, migrate, test
├── docker-compose.yml              # Post-MVP: persistencia
├── README.md
│
├── backend/
│   ├── pyproject.toml              # uv project config
│   ├── uv.lock
│   ├── alembic.ini
│   ├── alembic/
│   │   ├── env.py
│   │   └── versions/              # Migration files
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI app + lifespan (scheduler, static files)
│   │   ├── config.py              # Settings via env vars + .env
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── database.py        # SQLite engine, session, WAL mode
│   │   │   ├── scheduler.py       # APScheduler setup + job definitions
│   │   │   └── runner.py          # ADW runner com retry logic
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── routine_run.py
│   │   │   ├── community_snapshot.py
│   │   │   ├── github_snapshot.py
│   │   │   ├── finance_snapshot.py
│   │   │   ├── meeting.py
│   │   │   ├── sprint_snapshot.py
│   │   │   └── metric.py
│   │   │
│   │   ├── collectors/
│   │   │   ├── __init__.py
│   │   │   ├── base.py            # BaseCollector ABC
│   │   │   ├── routine_collector.py
│   │   │   ├── community_collector.py
│   │   │   ├── github_collector.py
│   │   │   ├── finance_collector.py
│   │   │   ├── meeting_collector.py
│   │   │   ├── sprint_collector.py
│   │   │   └── health_collector.py # Parse health check-in JSONs
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── routine_service.py
│   │   │   ├── community_service.py
│   │   │   ├── project_service.py
│   │   │   ├── finance_service.py
│   │   │   ├── meeting_service.py
│   │   │   ├── health_service.py
│   │   │   ├── ingest_service.py   # Valida e grava dados da API de ingestao
│   │   │   └── dashboard_service.py
│   │   │
│   │   └── api/
│   │       ├── __init__.py
│   │       ├── deps.py            # Dependency injection (get_db)
│   │       ├── routines.py        # /api/v1/routines
│   │       ├── community.py       # /api/v1/community
│   │       ├── projects.py        # /api/v1/projects
│   │       ├── finance.py         # /api/v1/finance
│   │       ├── meetings.py        # /api/v1/meetings
│   │       ├── health.py          # /api/v1/health
│   │       ├── ingest.py          # POST /api/v1/ingest/{dominio}
│   │       └── dashboard.py       # /api/v1/dashboard
│   │
│   ├── data/
│   │   └── evo-dashboard.db       # SQLite database (gitignored)
│   │
│   └── tests/
│       ├── conftest.py            # Fixtures (test db, test client)
│       ├── test_collectors/
│       ├── test_services/
│       └── test_api/
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── components.json            # Shadcn config
│   ├── index.html
│   │
│   ├── src/
│   │   ├── main.tsx               # React entry + Router + QueryClient
│   │   ├── App.tsx                # Layout + Routes
│   │   ├── index.css              # Tailwind imports + theme vars
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── CommunityPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── FinancePage.tsx
│   │   │   ├── RoutinesPage.tsx
│   │   │   ├── RoutineDetailPage.tsx
│   │   │   ├── MeetingsPage.tsx
│   │   │   └── HealthPage.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                # Shadcn components (auto-generated)
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── PageContainer.tsx
│   │   │   ├── cards/
│   │   │   │   ├── MetricCard.tsx
│   │   │   │   ├── AgentCard.tsx
│   │   │   │   ├── AlertCard.tsx
│   │   │   │   └── RoutineCard.tsx
│   │   │   └── charts/
│   │   │       ├── TrendChart.tsx
│   │   │       ├── BarChart.tsx
│   │   │       └── SprintProgress.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDashboard.ts
│   │   │   ├── useRoutines.ts
│   │   │   ├── useCommunity.ts
│   │   │   ├── useProjects.ts
│   │   │   ├── useFinance.ts
│   │   │   ├── useMeetings.ts
│   │   │   └── useHealth.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts             # Fetch wrapper com base URL
│   │   │   ├── utils.ts           # cn(), formatDate(), etc.
│   │   │   └── constants.ts       # API_BASE_URL, REFETCH_INTERVAL
│   │   │
│   │   └── types/
│   │       ├── routine.ts
│   │       ├── community.ts
│   │       ├── project.ts
│   │       ├── finance.ts
│   │       ├── meeting.ts
│   │       └── dashboard.ts
│   │
│   └── dist/                      # Build output (gitignored, served by FastAPI)
│
└── .env.example                   # Template de env vars
```

### Architectural Boundaries

**API Boundaries:**
- Frontend → Backend: somente via REST API (`/api/v1/*`)
- Backend → SQLite: somente via SQLAlchemy models (nunca SQL raw)
- Collectors → Filesystem: read-only dos outputs existentes (JSONL, JSON, HTML)
- Collectors → SQLite: write via services

**Component Boundaries:**
- Cada pagina do frontend e auto-contida (hook proprio, componentes proprios)
- Componentes compartilhados (`cards/`, `charts/`) sao stateless — recebem dados via props
- Nenhum componente acessa a API diretamente — sempre via hooks em `hooks/`

**Service Boundaries:**
- Cada service encapsula queries de um dominio
- Services nao chamam outros services (flat, nao nested)
- API routers chamam services, nunca models diretamente

**Data Flow (Dual-Write):**
```
Path A: Collectors (backfill + fallback)
  ADW Runner → JSONL/JSON/HTML (filesystem)
                  ↓
           Collectors (parsers)
                  ↓
              SQLite DB

Path B: Ingest API (primary — skills gravam direto)
  Claude CLI → Skill execution → POST /api/v1/ingest/{dominio}
                                        ↓
                                    SQLite DB

Both paths write to the same tables.
Path B is preferred (structured, no parsing needed).
Path A exists for backfill and resilience.

              SQLite DB
                  ↓
           Services (queries)
                  ↓
            API Routers (GET)
                  ↓
          Frontend (React)
```

### Skills de Integracao (.claude/skills/)

Skills novas que as rotinas ADW chamam para gravar dados direto na API:

| Skill | Chamada | Endpoint |
|-------|---------|----------|
| `int-dashboard-community` | Chamada pelo `pulse-daily` apos gerar report | `POST /api/v1/ingest/community` |
| `int-dashboard-github` | Chamada pelo `int-github-review` apos gerar report | `POST /api/v1/ingest/github` |
| `int-dashboard-finance` | Chamada pelo `int-stripe` + `int-omie` | `POST /api/v1/ingest/finance` |
| `int-dashboard-sprint` | Chamada pelo `int-linear-review` | `POST /api/v1/ingest/sprint` |
| `int-dashboard-meeting` | Chamada pelo `int-sync-meetings` | `POST /api/v1/ingest/meeting` |
| `int-dashboard-health` | Chamada pelo health check-in (Kai) | `POST /api/v1/ingest/health` |
| `int-dashboard-routine` | Chamada pelo runner apos cada execucao | `POST /api/v1/ingest/routine` |

**Payload de exemplo (community):**
```json
{
  "date": "2026-04-06",
  "messages_count": 117,
  "active_members": 24,
  "new_members": 16,
  "sentiment_score": 0.78,
  "sentiment_label": "positivo",
  "top_topics": [{"topic": "Evolution Go", "count": 18}],
  "unresolved_questions": 4,
  "status": "atencao"
}
```

**Como funciona:** A skill e um script shell ou prompt que:
1. Recebe os dados da rotina que acabou de executar
2. Formata como JSON
3. Faz `curl -X POST http://localhost:8000/api/v1/ingest/{dominio} -H 'Content-Type: application/json' -d '{...}'`
4. Retorna sucesso/falha

Alternativamente, o runner.py pode chamar diretamente via `httpx` apos cada ADW sem precisar de skill separada.

### Requirements to Structure Mapping

| FR Category | Backend | Frontend |
|---|---|---|
| Agentes/Rotinas (FR1-FR6d) | `collectors/routine_collector.py` `services/routine_service.py` `api/routines.py` | `pages/RoutinesPage.tsx` `pages/RoutineDetailPage.tsx` |
| Comunidade (FR7-FR12) | `collectors/community_collector.py` `services/community_service.py` `api/community.py` | `pages/CommunityPage.tsx` |
| Projetos (FR13-FR18) | `collectors/github_collector.py` `collectors/sprint_collector.py` `services/project_service.py` `api/projects.py` | `pages/ProjectsPage.tsx` |
| Financeiro (FR19-FR23) | `collectors/finance_collector.py` `services/finance_service.py` `api/finance.py` | `pages/FinancePage.tsx` |
| Reunioes (FR24-FR28) | `collectors/meeting_collector.py` `services/meeting_service.py` `api/meetings.py` | `pages/MeetingsPage.tsx` |
| Dashboard (FR29-FR34) | `services/dashboard_service.py` `api/dashboard.py` | `pages/HomePage.tsx` |

### Development Workflow

```bash
# Desenvolvimento (hot reload backend + frontend)
make dev
# → uvicorn app.main:app --reload --port 8000
# → npm run dev (Vite em :5173, proxy /api → :8000)

# Build de producao
make build
# → cd frontend && npm run build (gera dist/)
# → Backend serve dist/ via StaticFiles

# Producao local
make start
# → uvicorn app.main:app --host 127.0.0.1 --port 8000

# Database
make migrate          # alembic upgrade head
make migration msg="add X"  # alembic revision --autogenerate

# Testes
make test             # pytest
make test-api         # pytest tests/test_api/
make test-collectors  # pytest tests/test_collectors/
```

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:** Todas as decisoes sao compativeis. FastAPI + SQLAlchemy + aiosqlite trabalham juntos nativamente. React + Vite + TanStack Query e uma stack consolidada. APScheduler suporta async e job store em SQLite (mesmo banco).

**Pattern Consistency:** Naming `snake_case` no backend e JSON alinha com convencoes Python. `PascalCase` no frontend alinha com React. Sem conflito entre camadas.

**Structure Alignment:** Monorepo `dashboard/` com separacao clara backend/frontend. Cada dominio tem seu collector → service → router → page. Nenhuma ambiguidade sobre onde codigo novo vai.

### Requirements Coverage Validation

**Functional Requirements:** Todos os 34 FRs + 4 sub-FRs (6a-6d) mapeados para componentes especificos na tabela de mapping acima. Zero gaps.

**Non-Functional Requirements:**
- Performance: SQLite WAL + indices por tabela + queries simples = <100ms. FastAPI async = <200ms.
- Reliability: try/except em todos collectors. Isolamento total.
- Integration: Collectors leem filesystem read-only. Zero mudanca nos outputs existentes.
- Maintainability: Alembic, monorepo, modulos independentes.

### Implementation Readiness

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Stack 100% alinhada com ecossistema existente (Python)
- Zero infra nova — tudo roda local
- Dados ja existem — collectors apenas parseiam
- Schema SQLite simples e direto
- Frontend e pura leitura — complexidade minima

**Areas for Future Enhancement:**
- WebSocket para real-time (se polling nao satisfizer)
- Docker compose para deploy mais robusto
- Auth quando virar multi-user
- Testes E2E com Playwright

### Implementation Handoff

**AI Agent Guidelines:**
- Seguir todas as decisoes arquiteturais exatamente como documentadas
- Usar implementation patterns consistentemente em todos os componentes
- Respeitar a estrutura do projeto e boundaries
- Referir a este documento para todas as questoes arquiteturais

**First Implementation Priority:**
1. `uv init` + `npm create vite@latest` (skeleton)
2. SQLite schema + Alembic migrations
3. Collector de rotinas (fonte: `ADWs/logs/*.jsonl`) — valida o pattern inteiro
4. API endpoint `/routines` + tela `RoutinesPage` — valida o fluxo end-to-end
