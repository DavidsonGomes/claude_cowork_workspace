---
name: Evo CRM — Status de Lançamento
description: Evo CRM lança na semana de 06/04; campanha de marketing ativa; foco total em testes e estabilização
type: project
---

## Situação atual (referência: 2026-04-07)

O Evo CRM está em fase final antes do lançamento. Campanha de marketing (email + Instagram) começou em 06/04 e vai até 23/04.

### Protocolo de testes em dois tempos
- **Fase 1 (06–07/04):** Apenas testar. Reportar bugs e feedbacks pelo painel admin. **Não corrigir bugs** (evitar merge conflicts).
- **Fase 2 (meados da semana):** Davidson triaga os bugs reportados, remove duplicatas e distribui tarefas para correção.

### Fluxos críticos a validar
- Pipeline do CRM
- Integração Evolution API
- Funcionalidade de agentes
- Conversas multi-canal (ex: Telegram)

### Instalação
- Todo o time deve fazer instalação fresh seguindo o readme
- Marcelo é responsável pela documentação de instalação (MCT-SERV)

### Onboarding (Beacop)
- Davidson deve revisar onboarding com Marcelo

### WhatsApp / WID
- WhatsApp está substituindo phone number por WID (user ID) em alguns payloads da API
- Evo CRM provavelmente não é afetado (já usa IDs para leads), mas Davidson deve garantir que o CRM armazene WID em vez de número de telefone
- Meta está fazendo A/B test — a equipe está monitorando

### Portal de testes
- URL: portal.evi.com.br — usado pelo time para acesso ao ambiente de testes

### Fase 2 (meados semana de 07/04)
- Davidson triaga bugs reportados na Fase 1, remove duplicatas e distribui tarefas para correção

**Why:** O lançamento acontece agora — qualquer lacuna de contexto pode fazer a Clawdia sugerir ações já tomadas ou conflitar com a estratégia atual.

**How to apply:** Ao receber perguntas sobre Evo CRM, assumir que o produto entrou em Fase 2 (triagem de bugs). Não sugerir novas features. Priorizar estabilização e fix dos bugs reportados.
