#!/usr/bin/env python3
"""
ADW: Email Triage — Checa inbox e classifica por urgência
Skills: gog-email-triage
"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill

def main():
    print("📧 Email Triage — Checando inbox...")
    run_skill("gog-email-triage", log_name="email-triage", timeout=300)
    print("✅ Triagem de emails concluída.")

if __name__ == "__main__":
    main()
