#!/usr/bin/env python3
"""ADW: Email Triage — Triagem de inbox"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill, banner, summary

def main():
    banner("📧 Email Triage", "Inbox • Classificar • Priorizar")
    results = []
    results.append(run_skill("gog-email-triage", log_name="email-triage", timeout=300))
    summary(results, "Email Triage")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠ Cancelado.")
