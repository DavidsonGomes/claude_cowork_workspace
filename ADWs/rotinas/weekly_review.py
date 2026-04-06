#!/usr/bin/env python3
"""
ADW: Weekly Review — Revisão semanal completa
Skills: gog-calendar + todoist + sync-meetings + gog-followups + memory-management
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_claude

PROMPT = """Execute a revisão semanal completa:

1. **Reuniões da semana** — use /sync-meetings com período da semana para garantir que tudo está sincronizado
2. **Tarefas** — use /review-todoist para organizar tarefas pendentes, depois liste:
   - Tarefas concluídas essa semana
   - Tarefas atrasadas
   - Tarefas para próxima semana
3. **Agenda próxima semana** — use /gog-calendar para listar eventos da próxima semana
4. **Follow-ups** — use /gog-followups para detectar emails sem resposta
5. **Memória** — revise os daily logs da semana e consolide decisões/aprendizados na memória

Apresentar relatório consolidado:

## Revisão Semanal — {data}

### O que foi feito
- {bullets das realizações da semana}

### Reuniões
- {N} reuniões, {T} tarefas geradas

### Tarefas
- Concluídas: {N}
- Atrasadas: {N}
- Próxima semana: {N}

### Follow-ups pendentes
- {emails sem resposta}

### Próxima semana
- {agenda resumida}
- {recomendação de foco}

Salvar em '01 Daily Logs/[C] YYYY-WXX-weekly-review.md'
"""

def main():
    print("📊 Weekly Review — Revisão semanal...")
    run_claude(PROMPT, log_name="weekly-review", timeout=900)
    print("✅ Revisão semanal concluída.")

if __name__ == "__main__":
    main()
