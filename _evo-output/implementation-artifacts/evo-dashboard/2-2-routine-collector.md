# Story 2.2: Routine Collector

Status: ready-for-dev

## Story

As the system,
I want to collect routine execution data from JSONL logs into SQLite,
so that the API can serve routine data to the frontend.

## Acceptance Criteria

1. Dados de execucao sao parseados de `ADWs/logs/YYYY-MM-DD.jsonl`
2. Uma row e inserida na tabela `routine_runs` com todos os campos
3. Campo `token_cost` e estimado a partir do stdout (se disponivel)
4. Dados existentes no JSONL historico sao importados na primeira execucao (backfill)
5. Duplicatas sao detectadas e ignoradas (based on name + started_at)

## Tasks / Subtasks

- [ ] Task 1: Criar BaseCollector ABC (AC: N/A — fundacao)
  - [ ] Criar `app/collectors/base.py` com ABC: `async def collect(self)`, `name: str`
  - [ ] Try/except wrapper que loga erros sem crashar
  - [ ] Logger por collector

- [ ] Task 2: Criar RoutineCollector (AC: 1, 2, 3, 5)
  - [ ] Criar `app/collectors/routine_collector.py` extends BaseCollector
  - [ ] `collect()`: le todos os JSONL em `ADWs/logs/*.jsonl`
  - [ ] Parseia cada linha: timestamp, run (name), returncode, duration_seconds, stdout_lines, stderr_lines
  - [ ] Mapeia para RoutineRun model: name=run, started_at=timestamp, duration_secs=duration_seconds, return_code=returncode, stdout_lines=stdout_lines, status=(success se returncode==0 else failure)
  - [ ] agent: inferir do prompt (se contem `--agent <name>`) ou null
  - [ ] token_cost: null por ora (estimativa futura)
  - [ ] Detectar duplicatas: query `SELECT 1 FROM routine_runs WHERE name=? AND started_at=?`
  - [ ] Skip se ja existe

- [ ] Task 3: Implementar backfill (AC: 4)
  - [ ] Na primeira execucao, processar TODOS os JSONL historicos
  - [ ] `glob.glob("ADWs/logs/*.jsonl")` para encontrar todos os arquivos
  - [ ] Processar em ordem cronologica
  - [ ] Logar progresso: "Backfill: processing 2026-04-06.jsonl (10 entries)"

- [ ] Task 4: Registrar collector no scheduler (AC: 1)
  - [ ] Em `app/core/scheduler.py`, adicionar job que roda RoutineCollector a cada 5 minutos
  - [ ] Collector tambem roda no startup (backfill)

- [ ] Task 5: Testes unitarios (AC: 1-5)
  - [ ] Testar parse de JSONL com dados reais (fixture)
  - [ ] Testar deteccao de duplicatas
  - [ ] Testar backfill com multiplos arquivos

## Dev Notes

### JSONL Format Real (de `ADWs/logs/2026-04-06.jsonl`)

```json
{"timestamp": "2026-04-06T17:34:33.945725", "run": "good-morning", "prompt": "Execute a skill /prod-good-morning", "returncode": 0, "duration_seconds": 55.6, "stdout_lines": 56, "stderr_lines": 0}
```

Campos disponiveis: timestamp, run, prompt, returncode, duration_seconds, stdout_lines, stderr_lines. NAO tem: agent (inferir do prompt), finished_at (calcular: timestamp + duration), retry_count (sempre 0 nos logs atuais), token_cost, error_summary.

### Caminho dos logs no workspace

```
/Users/etus_0104/Projects/claude_cowork_workspace/ADWs/logs/
├── 2026-04-06.jsonl
├── detail/
│   └── YYYYMMDD-HHMMSS-{name}.log
└── metrics.json
```

### RoutineRun Model (ja criado na Epic 1)

Colunas: id, name, agent, started_at, finished_at, duration_secs, return_code, stdout_lines, status, retry_count, token_cost(Float), error_summary, created_at

### Architecture Pattern

```python
# app/collectors/base.py
class BaseCollector(ABC):
    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    async def collect(self) -> None: ...
```

### References

- [Source: architecture.md#Data Flow]
- [Source: architecture.md#Implementation Patterns > Error Handling]
- [Source: prd.md#FR6, FR6c]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
