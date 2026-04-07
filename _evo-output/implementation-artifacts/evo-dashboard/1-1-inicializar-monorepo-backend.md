# Story 1.1: Inicializar Monorepo Backend

Status: ready-for-dev

## Story

As a developer,
I want to initialize the backend project with FastAPI, SQLAlchemy, and APScheduler,
so that I have a working API skeleton to build upon.

## Acceptance Criteria

1. Diretorio `dashboard/backend/` existe com `pyproject.toml` e `uv.lock`
2. `app/main.py` existe com FastAPI app + lifespan placeholder
3. `app/core/database.py` existe com SQLite engine + WAL mode habilitado
4. `app/config.py` existe lendo env vars do `.env`
5. `alembic.ini` + `alembic/env.py` configurados para SQLAlchemy async
6. `uvicorn app.main:app --host 127.0.0.1 --port 8000` inicia sem erros
7. `GET /health` retorna `{"status": "ok"}`

## Tasks / Subtasks

- [ ] Task 1: Criar estrutura de diretorios (AC: 1)
  - [ ] Criar `dashboard/backend/` com subdiretorios `app/`, `app/core/`, `app/api/`, `app/models/`, `app/services/`, `app/collectors/`, `data/`, `tests/`
  - [ ] Criar `__init__.py` em cada pacote Python
  - [ ] Criar `.gitignore` ignorando `data/*.db`, `__pycache__/`, `.venv/`

- [ ] Task 2: Inicializar projeto Python com uv (AC: 1)
  - [ ] `cd dashboard/backend && uv init --python 3.12`
  - [ ] `uv add fastapi uvicorn[standard] sqlalchemy[asyncio] alembic apscheduler aiosqlite httpx rich pydantic-settings`
  - [ ] Verificar que `pyproject.toml` e `uv.lock` foram criados

- [ ] Task 3: Criar config.py (AC: 4)
  - [ ] Usar `pydantic-settings` BaseSettings
  - [ ] Campos: `DATABASE_URL` (default: `sqlite+aiosqlite:///data/evo-dashboard.db`), `API_HOST` (default: `127.0.0.1`), `API_PORT` (default: `8000`)
  - [ ] Carregar `.env` automaticamente

- [ ] Task 4: Criar database.py (AC: 3)
  - [ ] SQLAlchemy async engine com `create_async_engine`
  - [ ] `async_sessionmaker` para dependency injection
  - [ ] Event listener para habilitar WAL mode: `PRAGMA journal_mode=WAL`
  - [ ] Event listener para habilitar foreign keys: `PRAGMA foreign_keys=ON`
  - [ ] Base declarativa para models

- [ ] Task 5: Criar main.py com FastAPI app (AC: 2, 6, 7)
  - [ ] FastAPI app com `lifespan` context manager
  - [ ] Lifespan: inicializa database engine no startup
  - [ ] `GET /health` endpoint retornando `{"status": "ok"}`
  - [ ] Bind em `127.0.0.1` (nao `0.0.0.0`)
  - [ ] Import de routers placeholder (vazio por ora)

- [ ] Task 6: Configurar Alembic (AC: 5)
  - [ ] `alembic init alembic`
  - [ ] Editar `alembic/env.py` para usar async engine e SQLAlchemy Base metadata
  - [ ] Editar `alembic.ini` para apontar `sqlalchemy.url` via config
  - [ ] Criar migration inicial vazia para validar setup

## Dev Notes

### Architecture Compliance

- **Framework:** FastAPI com async (architecture.md)
- **Database:** SQLite via SQLAlchemy 2.0 async + aiosqlite
- **WAL mode:** Obrigatorio na inicializacao do engine
- **Bind:** `127.0.0.1` only — nunca `0.0.0.0` (localhost only, sem auth)
- **Package manager:** `uv` (nao pip, nao poetry)
- **Python version:** 3.12

### Naming Conventions

- Modulos/arquivos: `snake_case` (`config.py`, `database.py`)
- Classes: `PascalCase` (`Settings`, `Base`)
- Funcoes: `snake_case` (`get_db`, `create_engine`)
- Constantes: `UPPER_SNAKE_CASE`

### Project Structure

```
dashboard/backend/
├── pyproject.toml
├── uv.lock
├── alembic.ini
├── alembic/
│   ├── env.py
│   └── versions/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── core/
│   │   ├── __init__.py
│   │   └── database.py
│   ├── api/
│   │   └── __init__.py
│   ├── models/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── collectors/
│       └── __init__.py
├── data/           # SQLite db (gitignored)
└── tests/
    └── conftest.py
```

### API Response Format

```json
{"status": "ok"}
```

Para endpoints futuros, formato padrao:
```json
{
  "data": { ... },
  "meta": { "timestamp": "ISO8601", "source": "sqlite" }
}
```

### References

- [Source: architecture.md#Data Architecture]
- [Source: architecture.md#Infrastructure & Deployment]
- [Source: architecture.md#Implementation Patterns]
- [Source: prd.md#Product Scope > MVP]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
