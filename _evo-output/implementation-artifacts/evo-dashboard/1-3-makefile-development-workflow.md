# Story 1.3: Makefile & Development Workflow

Status: ready-for-dev

## Story

As a developer,
I want a Makefile with all dev/build/start commands,
so that I can run the project with simple make targets.

## Acceptance Criteria

1. `make dev` roda backend (uvicorn --reload) e frontend (vite dev) em paralelo
2. `make build` gera build de producao do frontend em `frontend/dist/`
3. `make start` roda o backend servindo `frontend/dist/` como StaticFiles
4. `make migrate` roda `alembic upgrade head`
5. `make migration msg="X"` gera nova migration com autogenerate
6. `make test` roda pytest
7. `.env.example` existe com todas as env vars

## Tasks / Subtasks

- [ ] Task 1: Criar Makefile na raiz de `dashboard/` (AC: 1-6)
  - [ ] `make dev`: roda `uvicorn app.main:app --reload --port 8000` e `npm run dev` em paralelo (usar `&` ou `concurrently`)
  - [ ] `make dev-backend`: so backend
  - [ ] `make dev-frontend`: so frontend
  - [ ] `make build`: `cd frontend && npm run build`
  - [ ] `make start`: `cd backend && uv run uvicorn app.main:app --host 127.0.0.1 --port 8000`
  - [ ] `make migrate`: `cd backend && uv run alembic upgrade head`
  - [ ] `make migration`: `cd backend && uv run alembic revision --autogenerate -m "$(msg)"`
  - [ ] `make test`: `cd backend && uv run pytest`
  - [ ] `make install`: `cd backend && uv sync && cd ../frontend && npm install`

- [ ] Task 2: Criar .env.example (AC: 7)
  - [ ] Listar todas as env vars necessarias com valores de exemplo:
    ```
    # Dashboard Backend
    DATABASE_URL=sqlite+aiosqlite:///data/evo-dashboard.db
    API_HOST=127.0.0.1
    API_PORT=8000
    
    # Existing workspace env vars (used by collectors)
    TELEGRAM_BOT_TOKEN=your_token_here
    TELEGRAM_CHAT_ID=946857210
    FATHOM_API_KEY=your_key_here
    STRIPE_SECRET_KEY=your_key_here
    OMIE_APP_KEY=your_key_here
    OMIE_APP_SECRET=your_secret_here
    ```

- [ ] Task 3: Configurar FastAPI StaticFiles para producao (AC: 3)
  - [ ] Em `main.py`: se `frontend/dist/` existir, montar como StaticFiles em `/`
  - [ ] Fallback para `index.html` (SPA routing)
  - [ ] Isso so ativa quando `make build` foi rodado

## Dev Notes

### Architecture Compliance

- **Task runner:** GNU Make (architecture.md)
- **Backend runner:** `uv run` (nao python direto)
- **Frontend runner:** npm
- **Producao:** Backend serve static files do Vite build

### Previous Story Context

- Story 1.1 criou `dashboard/backend/` com FastAPI + SQLAlchemy + Alembic
- Story 1.2 criou `dashboard/frontend/` com React + Vite + Shadcn/ui
- Este Makefile unifica ambos

### StaticFiles Config

```python
# Em main.py, apos todos os routers de API
import os
from fastapi.staticfiles import StaticFiles

frontend_dist = os.path.join(os.path.dirname(__file__), "../../frontend/dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
```

### References

- [Source: architecture.md#Implementation Considerations]
- [Source: architecture.md#Development Workflow]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
