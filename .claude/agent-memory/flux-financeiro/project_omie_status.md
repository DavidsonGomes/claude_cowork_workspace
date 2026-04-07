---
name: Omie API — Status e Dados Março 2026
description: Omie funcional via paginação manual — receita março R$31.376, despesas R$23.395, contas a pagar abril R$33.012
type: project
---

Status atualizado em 07/04/2026 (Monthly Close Março/2026):

**Funcionando:**
- `ListarContasReceber` (paginação manual) → OK, 4.768 registros (239 páginas)
- `ListarContasPagar` (paginação manual) → OK, 1.481 registros (75 páginas)
- Dados de março estão nas últimas páginas (230-239 para CR, 60-75 para CP)

**Com problemas (HTTP 500):**
- Filtros por status (`filtrar_por_status`) → 500
- Filtros por data (`filtrar_por_data_de/ate`) → 500
- Endpoint NF-e com filtros → apenas 1 registro retornado

**Dados março/2026:**
- Receita recebida: R$ 31.376,55 (171 registros, categorias 1.01.90 e 1.01.89)
- Despesas pagas: R$ 23.395,08 (77 lançamentos)
  - Pessoal/RH (2.04.99): R$ 9.526,98 — maior categoria
  - Infra/Cloud (2.05.xx): R$ 6.306,45
  - Serviços (2.06.96): R$ 5.564,52
  - Impostos (2.19.xx): R$ 1.033,17
  - Marketing (2.12.96): R$ 567,61
  - Outros: R$ 396,35
- CR em aberto/atrasado: R$ 0 (todos pagos nas últimas páginas)
- CP abril/2026: R$ 33.012,07 (32 itens, vencimento concentrado 27/04)

**Divergência a monitorar:** Omie receita (R$31.376) vs Stripe charges (R$20.104) — diferença ~R$11.272. Investigar em cada fechamento.

**Why:** Filtros avançados do Omie não funcionam via API — usar paginação manual sempre.
**How to apply:** Para extrair dados de um mês específico, varrer as últimas páginas de CR e CP via paginação + filtro Python por data. Samara confirma categorias e NFs. Alertar se despesas abril > R$30k.
