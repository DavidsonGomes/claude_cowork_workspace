#!/usr/bin/env python3
"""
ADW: End of Day — Encerramento do dia
Skills: sync-meetings + review-todoist + log
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("🌙 End of Day — Encerrando o dia...")
    run_skill("end-of-day", log_name="end-of-day", timeout=600)
    print("✅ Dia encerrado.")

if __name__ == "__main__":
    main()
