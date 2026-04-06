#!/usr/bin/env python3
"""ADW: Weekly Review — Revisão semanal via Clawdia"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_claude, banner, summary

PROMPT = """Execute a revisão semanal completa:

1. **Reuniões da semana** — use /int-sync-meetings com período da semana
2. **Tarefas** — use /prod-review-todoist, depois liste concluídas, atrasadas e próxima semana
3. **Agenda próxima semana** — use /gog-calendar para listar eventos
4. **Memória** — revise daily logs da semana, consolide decisões/aprendizados

Apresentar relatório consolidado usando o template em .claude/templates/weekly-review.md
Salvar em '01 Daily Logs/[C] YYYY-WXX-weekly-review.md'"""

def main():
    banner("📊 Weekly Review", "Reuniões • Tarefas • Agenda • Memória | @clawdia")
    results = []
    results.append(run_claude(PROMPT, log_name="weekly-review", timeout=900, agent="clawdia-assistant"))
    summary(results, "Weekly Review")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠ Cancelado.")
