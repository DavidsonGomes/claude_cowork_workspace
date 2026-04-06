#!/usr/bin/env python3
"""
ADW: Review Todoist — Organiza tarefas do projeto Evolution
Skills: review-todoist (todoist)
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("📋 Review Todoist — Organizando tarefas...")
    run_skill("review-todoist", log_name="review-todoist", timeout=300)
    print("✅ Triagem concluída.")

if __name__ == "__main__":
    main()
