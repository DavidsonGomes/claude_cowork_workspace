---
name: Stripe Baseline — Abril 2026
description: Métricas base do Stripe coletadas em 07/04/2026 — MRR, assinaturas, churn
type: project
---

Baseline atualizado em 07/04/2026 via Financial Weekly W15.

**Assinaturas ativas:** 209 (208 USD + 1 BRL)
**MRR USD:** $4.972,00/mês
**MRR BRL:** R$ 112,26
**MRR Total em BRL (câmbio R$ 5,85):** ~R$ 29.198

**Receita semana W15 (30/03–06/04):** R$ 7.228,22 (+0,9% vs W14)
**Receita semana W14 (23/03–29/03):** R$ 7.163,00
**Charges aprovadas W15:** 51 de 68 tentativas
**Falhas de pagamento W15:** 17 charges = R$ 2.625,95 (taxa 25% — ALERTA)
**Cancelamentos na semana W15:** 2
**Cancel at period end (fila de cancelamento):** 33 assinaturas — ALERTA CRÍTICO

**Churn histórico (30 dias):** ~9,6% — nível ATENÇÃO
**Motivo churn recorrente:** low_quality

**Why:** Referência para comparar semana a semana e detectar tendências de crescimento/queda.
**How to apply:** Alertar se churn > 10%, MRR cair > 5% m/m, ou cancel_at_period_end crescer. 33 pendentes de cancelamento é ponto crítico — acompanhar evolução na W16.
