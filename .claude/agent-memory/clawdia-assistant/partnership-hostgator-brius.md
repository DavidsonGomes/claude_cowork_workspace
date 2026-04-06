---
name: Parceria — HostGator + Brius (VPS e Docker Manager)
description: Reunião de produto sobre VPS da HostGator; Brius tem server manager multi-cloud; possível integração de API para provisionar servidores HostGator diretamente do painel Brius
type: reference
---

## HostGator + Brius — contexto (reunião 30/03/2026)

### Gaps de UX do VPS HostGator
- Sem nomenclatura de servidores (confuso ao gerenciar múltiplas instâncias para clientes)
- Lista de produtos não filtrável (VPS, dedicados, compartilhados misturados)
- Gerenciamento Docker via SSH — inacessível para usuários não-técnicos

### Melhorias planejadas pela HostGator
- **Curto prazo (até 30/04):** Naming e favoriting de servidores — designs Figma prontos, dev começa em breve
- **Longo prazo:** Docker Manager completo (sem ETA) — requer re-arquitetura de provisioning (Ansible) e portal
- **Suporte dedicado:** Fila exclusiva para clientes Brius

### Brius Server Manager (ferramenta de Brius + Orion Design)
- Manager multi-cloud: conecta a qualquer servidor via agente Go binary
- Marketplace de apps (ex: Evolution API com versões específicas)
- Provisioning de domínio + DNS via Cloudflare
- Scanner de segurança com sugestões de correção

### Oportunidade de parceria
- Brius propôs integração de API para provisionar servidores HostGator direto do painel Brius
- Davidson deve apresentar o Brius Server Manager para Fernando (HostGator) para explorar a parceria

### Estratégia de lançamento do Evo CRM (definida nessa reunião)
- **Público-alvo:** Usuários com algum conhecimento de CRM — não iniciantes completos
- **Modelo de cobrança:** Conversas/dia (não por número de agentes) — suporta futuros agentes de IA que consomem recursos sem ser usuários humanos
- **Requisito de SO:** Alma Linux (padrão dos outros apps Evolution)

### Pessoas novas mencionadas (HostGator)
- **Eduarda:** Desenvolvedora/PM na HostGator — responsável por features de VPS e Docker Manager
- **Victor:** Designer/Desenvolvedor na HostGator — criou redesign do server list (Figma)
- **Fernando:** Contato senior na HostGator — decisor sobre parcerias e suporte
- **Isabela:** Participante da reunião (HostGator) — cargo não especificado
