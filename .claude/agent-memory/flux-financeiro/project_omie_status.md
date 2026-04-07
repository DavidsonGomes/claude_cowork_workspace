---
name: Omie API — Status de Integração
description: Omie retornando HTTP 404 nos endpoints financeiros — integração quebrada
type: project
---

Em 07/04/2026, todos os endpoints do Omie retornaram HTTP 404:
- `resumo_financeiro` → 404
- `contas_receber` → 404
- `contas_pagar` → 404

**Why:** Pode ser configuração de credenciais (OMIE_APP_KEY / OMIE_APP_SECRET) incorreta ou endpoint desatualizado.
**How to apply:** Antes de qualquer fechamento mensal ou análise Omie, verificar status da integração. Alertar Davidson e acionar Samara Cruz para confirmar dados manualmente se Omie estiver fora.
