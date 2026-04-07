# Story 2.4: API e Frontend — Historico e Detalhe de Rotina

Status: ready-for-dev

## Story

As Davidson,
I want to drill down into any routine's execution history and see details of specific runs,
so that I can investigate failures and trends.

## Acceptance Criteria

1. Pagina `/routines/:name` mostra historico de execucoes com filtro por periodo (7d, 30d, 90d, 365d)
2. Cada execucao mostra: timestamp, duracao, status, return code, retry count, token cost
3. Davidson pode ver error_summary de execucoes falhadas
4. Grafico de trend mostra duracao e success rate ao longo do tempo
5. API `GET /api/v1/routines/{name}/history?days=30` retorna dados

## Tasks / Subtasks

- [ ] Task 1: Criar API endpoint de historico (AC: 5)
  - [ ] Adicionar em `app/api/routines.py`: `GET /{name}/history?days=30`
  - [ ] Adicionar em `app/services/routine_service.py`: `get_routine_history(name, days)`
  - [ ] Retornar lista de execucoes ordenada por started_at DESC
  - [ ] Filtrar por periodo: `started_at >= now - days`

- [ ] Task 2: Criar API endpoint de detalhe de rotina (AC: 2, 3)
  - [ ] Adicionar em `app/api/routines.py`: `GET /{name}` (overview da rotina com metricas)
  - [ ] Retornar: name, agent, total_runs, success_rate, avg_duration, last_run, history (ultimos 10)

- [ ] Task 3: Criar frontend RoutineDetailPage (AC: 1, 2, 3, 4)
  - [ ] Atualizar `src/pages/RoutineDetailPage.tsx`:
    - Header com nome + agente + status badge grande
    - Grid de metricas: Total Runs, Success Rate, Duracao Media, Tokens Total
    - Filtro de periodo: tabs 7d | 30d | 90d | 365d
    - Tabela de historico: timestamp, duracao, status, return code, retry count, token cost
    - Expandir row falhada para ver error_summary
  - [ ] Criar `src/hooks/useRoutineDetail.ts`
  - [ ] Instalar Shadcn Tabs: `npx shadcn@latest add tabs`

- [ ] Task 4: Criar grafico de trend (AC: 4)
  - [ ] Criar `src/components/charts/TrendChart.tsx` usando Recharts LineChart
  - [ ] Duas linhas: duracao (primary-500) e success rate (secondary-500)
  - [ ] Eixo X: datas, Eixo Y: valores
  - [ ] Tooltip com bg neutral-800
  - [ ] ResponsiveContainer height 300px

- [ ] Task 5: Testes (AC: 1-5)
  - [ ] Teste da API: GET /routines/good-morning/history?days=7
  - [ ] Teste do service: filtro por periodo

## Dev Notes

### UX Spec (ux-design-specification.md)

```
Header com nome + agente + status badge grande
Grid de metricas: Total Runs, Success Rate, Duracao Media, Tokens Total
Filtro de periodo: tabs 7d | 30d | 90d | 365d
Line chart: duracao ao longo do tempo
Tabela de historico
```

### Recharts Config (architecture.md)

- Grid desligado
- Line stroke primary-500 (#00FFA7), strokeWidth 2
- Tooltip bg neutral-800, border neutral-700, text neutral-50
- ResponsiveContainer width 100%, height 300px

### Componentes a Criar

- `MetricCard` — card com numero grande + label (reusar em outras epics)
- `TrendChart` — Recharts wrapper (reusar em outras epics)
- `PeriodFilter` — tabs de periodo (reusar em outras epics)

### Previous Story Context

- Story 2.3 criou `routine_service.py` e `api/routines.py` com endpoint GET /
- Este story adiciona endpoints de detalhe e historico

### References

- [Source: architecture.md#Frontend Architecture]
- [Source: ux-design-specification.md#Page 3: Detalhe de Rotina]
- [Source: prd.md#FR3, FR4, FR5]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
