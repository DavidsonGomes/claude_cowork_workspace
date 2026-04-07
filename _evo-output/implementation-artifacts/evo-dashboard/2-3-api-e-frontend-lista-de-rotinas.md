# Story 2.3: API e Frontend — Lista de Rotinas

Status: ready-for-dev

## Story

As Davidson,
I want to see all routines with their status, last run, and aggregated metrics,
so that I can quickly identify which routines need attention.

## Acceptance Criteria

1. Tela `/routines` mostra lista de todas as 14 rotinas
2. Cada rotina mostra: nome, agente, status da ultima execucao (badge), duracao, horario
3. Metricas agregadas: total runs, success rate %, duracao media
4. API `GET /api/v1/routines` retorna dados no formato `{data, meta}`
5. Lista atualiza automaticamente a cada 60s

## Tasks / Subtasks

- [ ] Task 1: Criar routine_service.py (AC: 3, 4)
  - [ ] Criar `app/services/routine_service.py`
  - [ ] `async def get_all_routines(db: AsyncSession) -> list[RoutineOverview]`
  - [ ] RoutineOverview: name, agent, last_status, last_run_at, last_duration, total_runs, success_rate, avg_duration
  - [ ] Query: GROUP BY name, com subquery para last run
  - [ ] Retornar lista ordenada por nome

- [ ] Task 2: Criar API router (AC: 4)
  - [ ] Criar `app/api/routines.py` com FastAPI router prefix `/api/v1/routines`
  - [ ] `GET /` → lista de rotinas com metricas agregadas
  - [ ] Response format: `{"data": [...], "meta": {"timestamp": "ISO8601", "source": "sqlite"}}`
  - [ ] Registrar router em `app/main.py`
  - [ ] Criar `app/api/deps.py` com `get_db` dependency

- [ ] Task 3: Criar frontend RoutinesPage (AC: 1, 2, 3, 5)
  - [ ] Criar `src/hooks/useRoutines.ts` com TanStack Query hook chamando `GET /api/v1/routines`
  - [ ] Atualizar `src/pages/RoutinesPage.tsx`:
    - Tabela com colunas: Nome, Agente, Status (badge), Ultima Exec, Duracao, Success Rate
    - StatusBadge: verde (success), vermelho (failure), amarelo (timeout)
    - Clicar na row navega para `/routines/${name}`
  - [ ] Criar componentes: `src/components/cards/StatusBadge.tsx`
  - [ ] Skeleton loading enquanto dados carregam
  - [ ] Auto-refresh via TanStack Query (60s)

- [ ] Task 4: Testes (AC: 1-4)
  - [ ] Teste da API: GET /api/v1/routines retorna formato correto
  - [ ] Teste do service: calculos de success_rate e avg_duration

## Dev Notes

### API Response Format (architecture.md)

```json
{
  "data": [
    {
      "name": "good-morning",
      "agent": "@clawdia",
      "last_status": "success",
      "last_run_at": "2026-04-06T17:34:33Z",
      "last_duration_secs": 55.6,
      "total_runs": 42,
      "success_rate": 95.2,
      "avg_duration_secs": 48.3
    }
  ],
  "meta": {
    "timestamp": "2026-04-06T22:00:00Z",
    "source": "sqlite"
  }
}
```

### Frontend Components Needed

- `StatusBadge` — Shadcn Badge customizado com 3 variantes (success/failure/timeout)
- Usar Shadcn `Table` component (instalar via `npx shadcn@latest add table`)
- Usar Shadcn `Skeleton` para loading state (instalar via `npx shadcn@latest add skeleton`)

### Routing

Row click → `navigate(`/routines/${routine.name}`)` via React Router

### Previous Story Context

- Story 2.2 criou o RoutineCollector que popula a tabela `routine_runs`
- Este story le os dados e apresenta no frontend

### References

- [Source: architecture.md#API & Communication Patterns]
- [Source: ux-design-specification.md#Page 2: Rotinas]
- [Source: prd.md#FR1, FR2, FR3, FR5]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
