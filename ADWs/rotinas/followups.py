#!/usr/bin/env python3
"""ADW: Follow-ups — Emails pendentes de resposta"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill, banner, summary

def main():
    banner("🔔 Follow-ups", "Emails sem resposta • Lembretes")
    results = []
    results.append(run_skill("gog-followups", log_name="followups", timeout=300))
    summary(results, "Follow-ups")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠ Cancelado.")
