# FAQ — Evolution Foundation

> Atualizado automaticamente. Última sync: 2026-04-06 18:00
> Fontes: Discord (#chat-pt) + GitHub Issues (evolution-api, evo-ai, evolution-go)
> Total: 14 perguntas

---

## Instalação & Setup
<!-- tag: instalação, setup, docker, deploy, vps, coolify, easypanel -->

### QR Code não está sendo gerado — o que fazer?
**Resposta:** Este é o problema mais comum na comunidade. Tente nesta ordem:
1. Certifique-se de usar a variável `CONFIG_SESSION_PHONE_VERSION` com uma versão recente (ex: `2.3000.1036217085`)
2. Reinicie o serviço da Evolution na VPS
3. Aguarde alguns minutos e gere um novo QR code
4. Verifique se a API key está correta — erro `401 Unauthorized` indica chave inválida, não problema de QR

Se estiver usando **Coolify** ou **EasyPanel**, confirme que todas as variáveis de ambiente foram salvas corretamente antes de reiniciar.
**Fonte:** Discord #chat-pt (recorrente, 3+ mensagens hoje) | GitHub #2488, #2489
**Adicionado:** 2026-04-06

### Como instalar a Evolution API via Docker?
**Resposta:** Use a imagem oficial `evoapicloud/evolution-api:v2.3.7`. Configure as variáveis de ambiente necessárias (DATABASE_URL, REDIS, API key) e suba o container. Para deploy em VPS, recomenda-se usar Docker Compose ou Swarm. Documentação oficial disponível em https://doc.evolution-api.com
**Fonte:** Discord #chat-pt (recorrente)
**Adicionado:** 2026-04-06

---

## Configuração
<!-- tag: config, env, variáveis, webhook, api-key, proxy -->

### Qual a diferença entre Baileys e WhatsApp Cloud API?
**Resposta:** 
- **Baileys**: Conexão via QR code (WhatsApp Web), gratuito, sem aprovação da Meta. Ideal para uso pessoal e pequenas operações. Risco de ban se usado de forma agressiva.
- **WhatsApp Cloud API**: API oficial da Meta. Requer aprovação, tem custo por mensagem (varia por volume e região — verificar no site da Meta), mas é mais estável e segura para uso comercial em escala.

Para usar Cloud API na Evolution, você precisa ter o token oficial da Meta liberado — não é possível usá-la sem aprovação.
**Fonte:** Discord #chat-pt (recorrente)
**Adicionado:** 2026-04-06

### Meu número está sendo banido ao escanear o QR code — o que fazer?
**Resposta:** Bans imediatos ao conectar geralmente indicam:
1. Número novo ou com pouco histórico — WhatsApp desconfia de números sem atividade orgânica
2. Muitas instâncias no mesmo servidor/IP sem proxy — use **proxy residencial rotativo** por instância
3. Comportamento automatizado agressivo — adicione simulação de digitação (`typing`) e delays entre mensagens
4. Versão desatualizada do `CONFIG_SESSION_PHONE_VERSION`

**Importante:** Número com bastante tempo de uso também pode ser banido se o padrão de uso for anormal. Use proxy dedicado por número e simule comportamento humano.
**Fonte:** Discord #chat-pt (recorrente) | GitHub #2497
**Adicionado:** 2026-04-06

### Como enviar mensagem para o destinatário correto via webhook (resposta sempre vai para o número padrão)?
**Resposta:** Se suas mensagens estão sendo enviadas para o número errado ao usar webhook + n8n, verifique:
1. O endpoint correto é `POST /message/sendText/{instance}` — o `{instance}` deve ser o nome da instância, **não** o número
2. No campo `number`, use o formato `5511999999999` (sem `@s.whatsapp.net`)
3. Certifique-se de que a variável dinâmica que você está usando no n8n está passando o `remoteJid` do remetente, não o número da instância
4. Teste com um número fixo primeiro para confirmar que o endpoint está funcionando

Este comportamento foi reportado como bug na v2.3.7 — verifique se há atualização disponível.
**Fonte:** GitHub #2496
**Adicionado:** 2026-04-06

---

## Integrações
<!-- tag: whatsapp, telegram, typebot, n8n, chatwoot, baileys -->

### Chatwoot mostra "Falha ao enviar" mesmo quando a mensagem foi entregue
**Resposta:** Este é um bug conhecido na v2.3.7 com Chatwoot. O controller da Evolution aguarda toda a confirmação de envio antes de responder ao Chatwoot, que acaba atingindo timeout em fluxos com múltiplas mensagens simultâneas.

**Workaround via Docker entrypoint** (aplica patch ao `dist/main.js`):
```yaml
entrypoint:
  - sh
  - -c
  - |
    sed -i 's|return this.chatwootService.receiveWebhook(s,e)|this.chatwootService.receiveWebhook(s,e).catch(err=>this.logger.error(err));return{message:"bot"}|g' /evolution/dist/main.js
    npm run start:prod
```
**Fonte:** GitHub #2494 (análise detalhada com patch completo)
**Adicionado:** 2026-04-06

### `CHATWOOT_MESSAGE_READ=false` não está tendo efeito
**Resposta:** Este é um bug confirmado. A variável `CHATWOOT_MESSAGE_READ` controla se a Evolution marca mensagens como lidas **no WhatsApp** quando agente responde pelo Chatwoot — **não** controla o envio do evento `messages.read` para o Chatwoot.

Além disso, as descrições de `CHATWOOT_MESSAGE_READ` e `CHATWOOT_MESSAGE_DELETE` estão trocadas no `.env.example` (bug documentado no #1616).

**Workaround** para desabilitar envio de read receipts ao Chatwoot:
```yaml
entrypoint:
  - sh
  - -c
  - |
    sed -i 's|if(s==="messages.read"){|if(s==="messages.read"){return;|g' /evolution/dist/main.js
    npm run start:prod
```
**Fonte:** GitHub #2494
**Adicionado:** 2026-04-06

### Histórico do Chatwoot não importa completamente (syncFullHistory=true não traz todos os contatos)
**Resposta:** Bug confirmado na v2.3.7. Mesmo com `syncFullHistory=true`, `importContacts=true` e `importMessages=true`, apenas uma parte dos contatos/conversas é importada para o Chatwoot. O problema está relacionado a conversas com identificadores `@lid` (formato mais antigo do WhatsApp multi-device).

Realtime sync funciona normalmente. O problema é específico para **importação do histórico** na conexão inicial.

Ainda sem solução definitiva — acompanhe o GitHub issue #2478 para updates.
**Fonte:** GitHub #2478
**Adicionado:** 2026-04-06

### Evento TYPEBOT_START não está sendo recebido no webhook
**Resposta:** Bug reportado na v2.3.7. O evento `typebot.start` não está sendo disparado — o primeiro evento recebido é `messages.upsert`. Isso impossibilita obter o `sessionId` e o telefone do usuário no início da conversa.

Ainda sem solução oficial. Limpar a sessão do usuário não resolve. Acompanhe o GitHub issue #2490.
**Fonte:** GitHub #2490
**Adicionado:** 2026-04-06

---

## Evolution API
<!-- tag: api, endpoints, instância, qrcode, mensagem, prisma -->

### `archiveChat` retorna erro 500 (PrismaClientValidationError)
**Resposta:** Bug confirmado na v2.3.7. O endpoint `POST /chat/archiveChat/{instance}` sempre retorna HTTP 500 com `PrismaClientValidationError: Unknown argument 'remoteJid'`.

A causa é um mismatch entre o schema do Prisma e o campo `remoteJid` usado na query de resolução de JID.

**Workaround:** Arquivar apenas no nível da aplicação. O comando `chatModify` do Baileys nunca é alcançado.

Acompanhe o GitHub issue #2495 para o fix oficial.
**Fonte:** GitHub #2495
**Adicionado:** 2026-04-06

### Instância conecta normalmente mas é removida ~7 segundos depois (stream:error 515)
**Resposta:** Bug confirmado na v2.3.7. Ao escanear o QR code, o WhatsApp envia um `stream:error code=515` (comportamento normal de multi-device). O Baileys reconecta corretamente, mas o `WAMonitoringService` inicia um timer de remoção que **não é cancelado** após a reconexão bem-sucedida. Resultado: a instância é removida 7 segundos após ficar saudável.

Acompanhe o GitHub issue #2498 para o patch.
**Fonte:** GitHub #2498
**Adicionado:** 2026-04-06

---

## Evo Go
<!-- tag: evogo, go, manager, licença, proxy, ui -->

### Erro `invalid product slug (HTTP 400)` ao emitir licença do Evo Go
**Resposta:** Problema relatado por membros da comunidade. A solução que funcionou:
1. Faça downgrade para a versão `0.6.0`
2. Emita a licença nessa versão
3. Faça upgrade para `0.6.1`

Reporte o problema também nas issues do GitHub do evolution-go.
**Fonte:** Discord #chat-pt
**Adicionado:** 2026-04-06

### QR Code trava e não é gerado quando proxy está ativado no Evo Go
**Resposta:** Bug confirmado. A documentação descreve suporte a proxy HTTP, mas o código usa `CreateSocks5Proxy()` e `SetSOCKSProxy()` internamente — mismatch que causa hang no processo de geração do QR.

O log para após `[INFO] Proxy enabled` e nenhum QR é retornado.

**Workaround:** Conectar sem proxy primeiro e testar o QR. Acompanhe o GitHub issue #12 do evolution-go para resolução.
**Fonte:** GitHub evolution-go #12
**Adicionado:** 2026-04-06

### Interface do Evo Go Manager fica piscando a cada 5 segundos
**Resposta:** Bug de UI confirmado na versão 0.6.1-beta. O polling do endpoint `GET /instance/all` a cada 5 segundos está causando re-render completo do componente ao invés de atualização parcial de estado. Nenhum erro no console — o problema é de implementação do frontend.

Acompanhe o GitHub issue #11 do evolution-go.
**Fonte:** GitHub evolution-go #11
**Adicionado:** 2026-04-06

---

## Evo CRM
<!-- tag: crm, agentes, pipeline, leads, evo-ai -->

### Sessão não persiste entre mensagens no Evo AI (novo chat a cada mensagem)
**Resposta:** Problema de integração Evolution API + Evo AI. Cada nova mensagem do WhatsApp está criando um novo chat no Evo AI ao invés de continuar a sessão existente. Isso geralmente indica que o `sessionId` ou identificador de conversa não está sendo passado/mantido corretamente na integração.

Verifique a configuração do webhook e se o `remoteJid` está sendo usado como chave de sessão. Acompanhe o GitHub issue #28 do evo-ai.
**Fonte:** GitHub evo-ai #28
**Adicionado:** 2026-04-06

---

## Billing & Licenças
<!-- tag: licença, plano, preço, pagamento, stripe -->

---

## Erros Comuns
<!-- tag: erro, bug, 503, 401, 400, timeout, connection -->

---

*Este arquivo é mantido automaticamente pela rotina `/pulse-faq-sync`. Edições manuais são permitidas — a rotina preserva entradas existentes.*
