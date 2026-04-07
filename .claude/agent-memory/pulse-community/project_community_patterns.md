---
name: Padrões Recorrentes da Comunidade Evolution
description: Dúvidas, membros ativos e padrões detectados nos pulsos da comunidade Discord (atualizado W14/2026)
type: project
---

## Baseline Semanal W14 (30/mar–06/abr/2026)

- **WAM:** 81 membros únicos ativos
- **Total mensagens:** 497 (chat-pt: 456, chat-en: 19, chat-es: 22)
- **Novos membros:** 78 na semana
- **Msgs/membro ativo:** 6,1 (meta >4 ✅)
- **Threads Help ativos:** 29

## Dúvidas Recorrentes (FAQ candidatas)

1. **QR Code não aparece / erro de conexão** — 8x na semana W14 (PT+EN+ES)
   - Resposta padrão: reiniciar serviço na VPS; atualizar para v2.3.7; imagem correta: evoapicloud/evolution-api:v2.3.7

2. **Diferença entre Baileys e WhatsApp Cloud API** — 3x
   - Baileys = instância não-oficial (reverse engineering); Cloud API = API oficial da Meta (requer aprovação e token)

3. **Como instalar Evo Go no Easypanel** — 4x
   - Thread ativa: #1489246173201039391. Ainda sem doc oficial.

4. **Integração Evo Go + Chatwoot** — 5x (mais pedida da semana)
   - Sem integração nativa ainda. Library OSS criada por yuricaetano: https://github.com/yuricaetano/evolution-go-chatwoot-bridge

5. **O que é Evo CRM / Evo v3 / Evo AI — diferenças** — 4x
   - Comunidade confusa sobre roadmap. Necessário comunicado oficial.

6. **Parâmetro "type" no /send/media do Evo Go** — 3x
   - Valores aceitos: "image", "video", "document". Não documentado oficialmente.

## Membros Contribuidores Regulares

- **oismaelash** — MVP da semana: 117 msgs (W14). Suporte técnico em PT, EN e ES. Presença diária constante.
- **d_paes** — 50 msgs W14. Suporte avançado + moderação informal (identificou possível bot na comunidade).
- **yuricaetano** — Contribuidor OSS: criou bridge Evo Go + Chatwoot em abr/2026.
- **leonardrodri** — Abriu PR #2493 com correção de bug no GitHub evolution-api.
- **ocjdaniel** — 19 msgs W14, suporte técnico ativo sobre webhooks e configurações.

## Bugs Detectados na Comunidade (abr/2026)

- **Evo Go: duplicação de eventos webhook** — múltiplos usuários, thread #1488636205859078294 (5 msgs)
- **Evo Go: senha incorreta aleatória** — nandocosta, issue aberta no GitHub
- **setPresence "unavailable" não persiste** — afeta múltiplos clientes, pode ser bug WA ou Evolution
- **Webhook não salva ao criar instância via endpoint** — workaround: configurar após criação

## Bugs GitHub Confirmados — evolution-api v2.3.7 (06/abr/2026)

- **QR não gera** — issues #2488, #2489 (recorrente + Discord) — causa: CONFIG_SESSION_PHONE_VERSION desatualizada ou variáveis mal configuradas
- **Número banido ao conectar** — issue #2497 — usuários sendo banidos só de escanear o QR
- **Webhook respondendo para número errado** — issue #2496 — parâmetro `number` ignorado, resposta sempre vai para número padrão
- **Chatwoot "Falha ao enviar"** — issue #2494 — receiveWebhook síncrono causa timeout; patch via Docker entrypoint documentado
- **CHATWOOT_MESSAGE_READ=false sem efeito** — issue #2494 — var controla fluxo inverso, não o evento messages.read
- **syncFullHistory incompleto** — issue #2478 — conversas @lid não importadas no Chatwoot
- **TYPEBOT_START não disparado** — issue #2490 — primeiro evento é messages.upsert
- **archiveChat 500** — issue #2495 — PrismaClientValidationError: Unknown argument 'remoteJid'
- **stream:error 515 mata instância** — issue #2498 — WAMonitoringService timer não cancelado após reconexão

## Bugs GitHub — evolution-go (06/abr/2026)

- **Proxy HTTP quebra QR** — issue #12 — código usa SOCKS5 internamente, documentação diz HTTP
- **UI piscando 5s** — issue #11 — polling /instance/all causa re-render completo
- **Sticker upload falha no S3** — issue #5 — webp: invalid format ao tentar decode
- **Erro licença "invalid product slug"** — Discord — workaround: downgrade 0.6.0 → emite → upgrade 0.6.1

## FAQ Status (07/abr/2026)

- FAQ atualizado com 21 entradas em: `03 Comunidade/[C] FAQ.md`
- Sync 07/abr adicionou 7 entradas novas: mídia não recebida, erro 400 integrações, canal fechado N8N, nome contato, sendWhatsAppAudio reply, histórico Evo Go, botões Evo Go, sticker S3, Azure/DeepSeek Evo AI, seeder bug Evo AI
- Categorias cobertas: Instalação, Configuração, Integrações (Chatwoot, Typebot), Evolution API, Evo Go, Evo CRM
- Próxima sync: adicionar entradas de Billing & Licenças quando houver dados

## Novos Padrões Detectados (07/abr/2026)

- **Erro "canal fechado" N8N** — recorrente no chat-pt, relacionado a instâncias com falso positivo de conexão
- **Evo Go sem histórico de conversas** — confirmado por oismaelash, PR #3 em andamento
- **Evo Go botões interativos quebrados** — discussão recorrente, sem solução oficial ainda
- **Evo AI: Azure + DeepSeek** — demanda crescente por novos provedores de LLM (issues #37 e #30)
- **Evo AI: bug seeder admin** — issue crítica #38 afeta deployments com troca de credenciais

## Tópicos de Alta Atividade (W14/abr/2026)

- **Evo Go** — migração, dúvidas técnicas, licença, parâmetros da API
- **Bloqueios de instâncias** — escalada crítica: 15 bloqueios em 1 semana (1 usuário)
- **Evolution Summit 14–16/abr** — anúncio gerou pico de atividade em 06/abr (124 msgs no dia)
- **Evo CRM/v3** — expectativa alta, comunidade aguardando lançamento

## Alertas de Padrão

- **Escalada de bloqueios WA**: possível mudança de política do WhatsApp em abr/2026
- Suporte majoritariamente feito por membros (não por staff) — oismaelash e d_paes sustentam 167 msgs/semana de suporte
- Comunidade internacional ainda pequena (chat-en + chat-es = 8% do volume)
- Canal #news ativo em 06/abr com anúncio do Evolution Summit (oriondesign)
- Pico de engajamento coincide com anúncios/eventos (Summit: +55% msgs no dia do anúncio)

**Why:** Relatório semanal W14 — primeira coleta completa com dados reais do Discord.
**How to apply:** Usar como baseline para comparações nas semanas seguintes. Próximo relatório: W15 (07–13/abr/2026).
