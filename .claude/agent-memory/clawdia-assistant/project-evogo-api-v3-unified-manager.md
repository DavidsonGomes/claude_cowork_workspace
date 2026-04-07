---
name: EvoGo + Evolution API V3 — Manager Unificado
description: Decisão de unificar o painel de gestão EvoGo para servir também o Evolution API V3
type: project
---

## Decisão (referência: 2026-04-06 — Planning Evolution)

O **EvoGo Manager** será adaptado para servir tanto EvoGo quanto o futuro Evolution API V3, criando um painel unificado.

### Rationale
- Simplifica manutenção
- Não será open-source (componente simples, não estratégico abrir)
- Objetivo: usar o novo painel para impulsionar migração de usuários e capturar dados de instalação

### Status EvoGo
- Estável
- Bug de botões/carrosséis em todos os dispositivos corrigido por Matheus
- Bug `400 license server error` sendo reportado pela comunidade → Matheus monitora

### Fluxo de PRs do EvoGo
- PRs públicos são mergeados no repo privado primeiro → rebuild → push para versão pública
- Garante qualidade de código e revisão antes de expor

**Why:** Decisão tomada no Planning para reduzir duplicação de painel de gestão.

**How to apply:** Ao falar sobre manager do EvoGo ou painel do Evolution API V3, referenciar que será um componente unificado.
