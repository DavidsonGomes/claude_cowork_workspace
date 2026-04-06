#!/usr/bin/env python3
"""
ADW: Follow-ups — Detecta emails sem resposta e gera lembretes
Skills: gog-followups
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("🔔 Follow-ups — Checando emails pendentes...")
    run_skill("gog-followups", log_name="followups", timeout=300)
    print("✅ Follow-ups checados.")

if __name__ == "__main__":
    main()
