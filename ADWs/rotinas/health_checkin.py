#!/usr/bin/env python3
"""ADW: Health Check-in — Check-in semanal de saúde via Kai"""

import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from runner import run_claude, banner, summary

PROMPT = """Execute o check-in semanal de saúde do Davidson:

1. Leia os dados mais recentes em '06 Pessoal/' (último check-in, evolução, baseline)
2. Pergunte sobre:
   - Peso atual (se tiver balança por perto)
   - Como está a alimentação essa semana
   - Frequência de treino (quantos dias treinou)
   - Hidratação (estimativa de litros/dia)
   - Qualidade do sono (1-10)
   - Nível de energia/disposição geral (1-10)
   - Aplicação do Mounjaro (se aplicável na semana)
3. Compare com o último check-in e identifique tendências
4. Gere um relatório curto com semáforo (verde/amarelo/vermelho) para cada item
5. Salve o check-in em '06 Pessoal/health-checkins/reports/YYYY-MM-DD.md'
6. Atualize o arquivo de evolução se houver mudanças relevantes

Ser direto e prático — como um amigo próximo que se preocupa com a saúde do Davidson."""

def main():
    banner("🏥 Health Check-in", "Saúde • Hábitos • Evolução | @kai")
    results = []
    results.append(run_claude(PROMPT, log_name="health-checkin", timeout=600, agent="kai-personal-assistant"))
    summary(results, "Health Check-in")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n⚠ Cancelado.")
