---
name: Estratégia de Produto — Ecossistema Evolution
description: Decisões estratégicas de produto: EvoGo é o futuro, Evolution API vira serviço leve, WhatsApp Neo fica como open-source comunitário, novo Meta proxy hub em desenvolvimento
type: project
---

## Decisões estratégicas tomadas (referência: reunião 30/03/2026)

### EvoGo
- **É o produto do futuro.** Prioridade máxima de desenvolvimento.
- Pós-lançamento do Evo CRM, EvoGo integrará **apenas com o Evo CRM oficial** para forçar adoção.
- EvoGo Manager será adaptado para servir tanto EvoGo quanto Evolution API V3 → painel unificado.
- Não será open-source (componente simples, estratégico).

### Evolution API ("Bales")
- Virá ser um serviço leve que aponta para o manager unificado.
- Objetivo: reduzir carga de manutenção.
- Pós V3: usar o novo painel para migrar usuários e capturar dados de instalação.

### WhatsApp Neo
- Tratado como projeto open-source mantido pela comunidade.
- Sem suporte oficial da equipe Evolution.

### Novo Meta Proxy Hub
- Em desenvolvimento. Objetivo: gerar volume e buscar parceria oficial com a Meta.

### Ponto técnico crítico: Meta "native flow"
- A Meta usa uma nova rota `native flow` para clientes modernos. Rotas antigas estão depreciadas.
- Afeta principalmente o Evolution API ("Bales"). EvoGo em Go é mais simples de corrigir.

### Suporte
- Base crescente de usuários não-técnicos está aumentando a carga de suporte.
- Plano: automatizar suporte com agente de IA treinado na documentação.

**Why:** Essas decisões determinam o que é (e não é) prioridade. Sugestões de roadmap devem respeitar essa hierarquia.

**How to apply:** Ao discutir produto, reforçar EvoGo como futuro. Evolution API = manutenção mínima. WhatsApp Neo = sem compromisso de suporte.
