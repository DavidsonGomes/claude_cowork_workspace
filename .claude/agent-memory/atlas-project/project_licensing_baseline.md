---
name: Licensing Baseline Abril/2026
description: Primeiro relatório mensal de licensing — dados de baseline para comparação futura
type: project
---

Primeiro relatório mensal de licensing gerado em 08/04/2026.

**Números de baseline (Abril/2026):**
- 639 instâncias ativas (100% heartbeat coverage)
- 1.258 API keys geradas
- ~1.006 clientes cadastrados
- 29 países alcançados
- 90.6% concentração no Brasil
- 2 produtos com instâncias ativas: Evolution Go (633) + Evo AI CRM Community (6)
- Versão dominante: 0.6.1-beta (78.6%)
- 52 alertas pendentes (todos rate limit da instância 50025b56 / API key #771, em 02/04/2026)

**Relatório salvo em:** `02 Projects/licensing-reports/monthly/[C] 2026-04-licensing-monthly.html`

**Why:** Este é o primeiro mês do sistema de licensing — serviu para estabelecer linha de base. Sem comparativos ainda.

**How to apply:** A partir de maio/2026, usar este baseline para calcular % de crescimento mês a mês em instâncias, países, keys e clientes. Alertar se crescimento for abaixo de 10%/mês ou acima de 30%/mês.

**Gaps identificados para resolver:**
1. Feature usage não está sendo coletado nas instâncias (campo null)
2. Métricas de mensagens não integradas ao licensing (apenas 14 mensagens reportadas)
3. Alert #771 sem resolução — investigar cliente
4. 11 instâncias com versão "0.0.0" — sem versão configurada no build
