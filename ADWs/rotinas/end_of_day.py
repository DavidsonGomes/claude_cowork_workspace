#!/usr/bin/env python3
"""ADW: End of Day — Encerramento do dia"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_skill, banner, summary

def main():
    banner("🌙 End of Day", "Sync • Organiza • Log")
    results = []
    results.append(run_skill("prod-end-of-day", log_name="end-of-day", timeout=600))
    summary(results, "End of Day")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠ Cancelado.")
