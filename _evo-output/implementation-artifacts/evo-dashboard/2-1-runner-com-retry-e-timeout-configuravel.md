# Story 2.1: Runner com Retry e Timeout Configuravel

Status: ready-for-dev

## Story

As Davidson,
I want the runner to retry failed routines once and respect configurable timeouts,
so that transient failures don't cause unnecessary alerts.

## Acceptance Criteria

1. Quando um ADW script falha (returncode != 0), o runner espera 30s e retenta 1x
2. Se o retry tambem falha, marca como `failure` com `retry_count: 1`
3. Se o retry sucede, marca como `success` com `retry_count: 1`
4. Cada rotina pode ter timeout individual via `config.yaml` (default: 900s)
5. O runner loga cada tentativa com timestamp e duracao

## Tasks / Subtasks

- [ ] Task 1: Criar arquivo de config de timeouts (AC: 4)
  - [ ] Criar `dashboard/backend/app/core/routine_config.yaml` com timeouts por rotina
  - [ ] Formato: `routines: { good-morning: { timeout: 120, max_retries: 1, retry_delay: 30 }, ... }`
  - [ ] Default: `timeout: 900, max_retries: 1, retry_delay: 30`
  - [ ] Criar `app/core/routine_config.py` que carrega o YAML e fornece `get_routine_config(name)`

- [ ] Task 2: Criar novo runner com retry logic (AC: 1, 2, 3, 5)
  - [ ] Criar `dashboard/backend/app/core/runner.py`
  - [ ] Funcao `async def run_adw(name: str, script: str) -> RoutineResult`
  - [ ] RoutineResult: dataclass com name, status, duration_secs, return_code, retry_count, error_summary, stdout_lines
  - [ ] Logica: executar subprocess com timeout do config → se falha → esperar retry_delay → executar novamente → se falha novamente → return failure com retry_count=1
  - [ ] Usar `asyncio.create_subprocess_exec` para execucao async
  - [ ] Logar cada tentativa via `rich` logger: "[name] attempt 1/2: started" → "[name] attempt 1/2: failed (returncode X, Xs)" → "[name] retry in 30s..."
  - [ ] NAO modificar o runner.py existente em `ADWs/runner.py` — este e o runner novo do dashboard

- [ ] Task 3: Testes unitarios (AC: 1-5)
  - [ ] Testar retry com mock subprocess que falha 1x e depois sucede
  - [ ] Testar retry com mock subprocess que falha 2x → failure com retry_count=1
  - [ ] Testar timeout configuravel
  - [ ] Testar config loading com defaults

## Dev Notes

### Architecture Compliance

- Novo runner em `app/core/runner.py` — separado do `ADWs/runner.py` existente
- O runner existente (`ADWs/runner.py`) continuara funcionando para compatibilidade
- O novo runner sera usado pelo APScheduler do dashboard
- Usar `asyncio.create_subprocess_exec` (async, compativel com FastAPI)

### JSONL Log Format (fonte real: `ADWs/logs/2026-04-06.jsonl`)

```json
{"timestamp": "2026-04-06T17:34:33.945725", "run": "good-morning", "prompt": "...", "returncode": 0, "duration_seconds": 55.6, "stdout_lines": 56, "stderr_lines": 0}
```

### Existing Runner Reference

O runner atual (`ADWs/runner.py`) faz:
1. Chama `claude --print --dangerously-skip-permissions --agent <name> <prompt>` via subprocess
2. Streams stdout via Rich
3. Logs to JSONL + detail files
4. Sends Telegram notification
5. NAO tem retry logic — isso e o que esta story adiciona

### Naming Conventions

- snake_case para tudo em Python
- Config YAML em lowercase com hifens para nomes de rotinas

### References

- [Source: architecture.md#Process Patterns > Retry]
- [Source: prd.md#FR6a, FR6b]
- [Source: ADWs/runner.py — runner existente para referencia]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
