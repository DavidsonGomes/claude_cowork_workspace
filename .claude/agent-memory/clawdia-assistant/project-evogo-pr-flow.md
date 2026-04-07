---
name: EvoGo — Fluxo de merge de PRs públicos
description: PRs da comunidade entram primeiro no repo privado, são rebuilt e depois empurrados ao público — decisão de qualidade/segurança
type: project
---

## Decisão (referência: Planning Evolution 06/04/2026)

### Fluxo de merge para PRs externos (EvoGo open-source)
1. PR da comunidade chega no repo **público** do EvoGo
2. É mergeado primeiro no repo **privado** para revisão e rebuild
3. Só então é reconstruído e empurrado de volta ao repo público

**Why:** Mantém controle de qualidade e permite revisão antes de expor ao público. Evita código não-revisado entrar direto no produto.

**How to apply:** Se Davidson mencionar PRs do EvoGo, lembrar que o processo tem essa etapa intermediária — não é merge direto no público.

### Responsável
- **Matheus Pastorini** — monitora issues e PRs do EvoGo open-source; propõe merges ao Davidson
