#!/usr/bin/env python3
"""
ADW: Good Morning — Briefing matinal
Skills: gog-calendar + gog-email-triage + sync-meetings + todoist
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("☀️  Good Morning — Iniciando briefing...")
    run_skill("good-morning", log_name="good-morning", timeout=600)
    print("✅ Briefing concluído.")

if __name__ == "__main__":
    main()
