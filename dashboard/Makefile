.PHONY: dev dev-backend dev-frontend build start migrate migration test install

dev:
	@echo "Starting backend + frontend..."
	@cd backend && PYTHONPATH=. uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 &
	@cd frontend && npm run dev &
	@wait

dev-backend:
	cd backend && PYTHONPATH=. uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

dev-frontend:
	cd frontend && npm run dev

build:
	cd frontend && npm run build

start:
	cd backend && PYTHONPATH=. uv run uvicorn app.main:app --host 127.0.0.1 --port 8000

migrate:
	cd backend && PYTHONPATH=. uv run alembic upgrade head

migration:
	cd backend && PYTHONPATH=. uv run alembic revision --autogenerate -m "$(msg)"

test:
	cd backend && PYTHONPATH=. uv run pytest

install:
	cd backend && uv sync
	cd frontend && npm install
