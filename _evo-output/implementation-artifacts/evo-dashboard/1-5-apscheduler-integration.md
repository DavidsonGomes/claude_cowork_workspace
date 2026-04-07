# Story 1.5: APScheduler Integration

Status: ready-for-dev

## Story

As a developer,
I want APScheduler running inside FastAPI lifespan,
so that scheduled jobs execute automatically.

## Acceptance Criteria

1. APScheduler inicia automaticamente com o backend via FastAPI lifespan
2. Job store persistente no SQLite (sobrevive restart)
3. Job de teste (heartbeat) executa a cada 5 minutos e grava na tabela `metrics`
4. Scheduler para graciosamente no shutdown (SIGINT/SIGTERM)
5. Logs de scheduler aparecem no console via `rich`

## Tasks / Subtasks

- [ ] Task 1: Criar app/core/scheduler.py (AC: 1, 2)
  - [ ] Criar `AsyncIOScheduler` do APScheduler
  - [ ] Configurar job store: `SQLAlchemyJobStore(url=settings.DATABASE_URL.replace('+aiosqlite', ''))`
  - [ ] Nota: APScheduler job store usa SQLAlchemy sync (nao async) — usar URL sem `+aiosqlite`
  - [ ] Configurar executor: `AsyncIOExecutor`
  - [ ] Funcao `start_scheduler()` chamada no lifespan startup
  - [ ] Funcao `stop_scheduler()` chamada no lifespan shutdown

- [ ] Task 2: Integrar com FastAPI lifespan (AC: 1, 4)
  - [ ] Editar `main.py` lifespan:
    ```python
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        # Startup
        await init_db()
        start_scheduler()
        yield
        # Shutdown
        stop_scheduler()
    ```
  - [ ] Tratar SIGINT/SIGTERM graciosamente

- [ ] Task 3: Criar heartbeat job (AC: 3)
  - [ ] Job que roda a cada 5 minutos
  - [ ] Grava na tabela `metrics`: `category='system', key='heartbeat', value=1.0`
  - [ ] Usa `metadata` JSON para incluir timestamp e uptime
  - [ ] Registrar job com `scheduler.add_job(heartbeat, 'interval', minutes=5, id='heartbeat', replace_existing=True)`

- [ ] Task 4: Configurar logging com Rich (AC: 5)
  - [ ] Configurar `logging` para usar Rich handler
  - [ ] APScheduler logs aparecem formatados no console
  - [ ] Log level: INFO para scheduler, WARNING para apscheduler internals

## Dev Notes

### Architecture Compliance

- **Scheduler:** APScheduler com AsyncIOScheduler (architecture.md)
- **Job Store:** SQLAlchemy persistent store no mesmo SQLite
- **Executor:** AsyncIOExecutor (compativel com FastAPI async)

### APScheduler Setup Pattern

```python
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.executors.asyncio import AsyncIOExecutor
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

def create_scheduler(db_url: str) -> AsyncIOScheduler:
    jobstores = {
        'default': SQLAlchemyJobStore(url=db_url)
    }
    executors = {
        'default': AsyncIOExecutor()
    }
    return AsyncIOScheduler(
        jobstores=jobstores,
        executors=executors,
        job_defaults={'coalesce': True, 'max_instances': 1}
    )
```

### Important: Job Store URL

APScheduler's SQLAlchemyJobStore usa SQLAlchemy sync. O URL deve ser `sqlite:///data/evo-dashboard.db` (sem `+aiosqlite`). Isso e diferente do engine async usado pelo resto do app.

### Previous Story Context

- Story 1.1: Backend FastAPI com lifespan ja criado
- Story 1.4: SQLite schema com tabela `metrics` ja existe
- Este story conecta scheduler ao lifespan e valida com heartbeat

### References

- [Source: architecture.md#Infrastructure & Deployment]
- [Source: architecture.md#Core Architectural Decisions]
- [Source: prd.md#FR6 - coleta automatica via collector]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
