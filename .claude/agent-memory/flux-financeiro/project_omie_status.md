---
name: Omie API — Status de Integração
description: Omie parcialmente funcional — ListarContasReceber e ListarContasPagar OK, mas filtros e NF-e retornam 500
type: project
---

Status atualizado em 07/04/2026 (Financial Weekly W15):

**Funcionando:**
- `ListarContasReceber` (sem filtros avançados) → OK, 4.768 registros
- `ListarContasPagar` (sem filtros avançados) → OK, 1.481 registros
- Paginação básica funciona até ~página 30 antes de timeout

**Com problemas (HTTP 500):**
- Filtros por status (`filtrar_por_status`) → 500
- Filtros por data (`filtrar_por_data_de/ate`) → 500
- Endpoint NF-e (`produtos/nfe/ObterNFe`) → 500
- Páginas muito altas do Omie (ex: pag 95+) → 500 intermitente

**Dados disponíveis via paginação manual:**
- CR ATRASADOS: R$ 2.129,52 (5 registros encontrados por varredura manual)
- CP A VENCER: R$ 935,99 (1 lançamento em dez/2026)
- CP Histórico: apenas status PAGO visível

**Why:** Filtros avançados do Omie não funcionam via API — possível limitação de plano ou versão do endpoint.
**How to apply:** Usar paginação manual + filtro Python para extrair dados. Para despesas abertas e NFs, sempre acionar Samara Cruz manualmente. Não depender de filtros de status/data do Omie.
