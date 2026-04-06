---
date: 2026-03-12
title: Evolution <> Super Agentes
project: evolution-api
type: meeting
source_file: 2026-03-12__evolution-api__meeting__evolution-super-agentes__129574008.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 129574008
recording_url: https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz
---

# Resumo executivo

## Meeting Purpose

[Define a strategy to scale a high-volume WhatsApp marketing operation.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=1027.0)

## Key Takeaways

  - [**Goal:** Outsource a high-volume WhatsApp operation to hit a client's break-even, enabling a shift from operational management to strategic marketing.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=778.0)
  - [**Problem:** The current setup has a low 37% delivery rate, blocking growth. The client needs a mass campaign (4k contacts) to hit break-even and unlock a revenue-share model.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=240.0)
  - [**Solution:** Implement a hybrid API architecture (official + unofficial) to ensure high deliverability for aggressive campaigns, while using official APIs for standard flows to maintain account health.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=919.0)
  - [**Timeline:** A 2-week POC for the mass campaign is required to provide the client with immediate, tangible results.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=1027.0)

## Topics

### The Challenge: Scaling a High-Risk Operation

  - [**Objective:** Hit break-even for a new Forex trading client to trigger a revenue-share partnership.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=480.0)
  - [**Current State:** The operation is stalled by a low 37% WhatsApp delivery rate, blocking the mass campaign needed to hit the break-even target.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=240.0)
  - [**Client Profile:**](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=155.0)
      - [\~150 new clients/day, primarily from the Middle East.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=472.0)
      - [High-volume potential: client is ready to increase ad spend significantly.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=472.0)
  - [**Current Architecture:**](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=180.0)
      - [**API:** Official WhatsApp Business API (BSP) via a partner.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=180.0)
      - [**Cost:** \~R$0.60 per message.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=521.0)
      - [**Automation:** N800 workflow using ZAPI for non-official API access.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=382.0)
      - [**Flow:** E-commerce event → DB entry → N800 reads DB → 3-message recovery sequence (15m, 45m, 75m).](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=180.0)

### Proposed Solution: Hybrid API Strategy

  - [**Core Idea:** Use a hybrid architecture to balance account health and deliverability.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=919.0)
      - [**Official API:** For standard, lower-risk flows.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=919.0)
      - [**Unofficial API:** For aggressive campaigns where deliverability is paramount.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=960.0)
  - [**Tactics for Official API:**](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=919.0)
      - [**Template Rotation:** Dynamically vary templates to avoid detection.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=930.0)
      - [**Utility Messaging:** Frame marketing messages as "utility" to improve delivery.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=925.0)
      - [**Number Rotation:** Use a pool of numbers (Twilio) to manage reputation.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=953.0)
  - [**Tactics for Unofficial API:**](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=960.0)
      - [**Mass Campaigns:** Ensure high deliverability for large, one-off sends.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=960.0)
      - [**Account Warm-up:** Implement a systematic process to build account reputation.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=420.0)

## Next Steps

  - [**Davidson:** Analyze the current architecture and propose a hybrid API strategy.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=1071.0)
  - [**Davidson:** Create a document outlining technical options before discussing pricing.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=1071.0)
  - [**Talles:** Provide any additional information Davidson needs for the analysis.](https://fathom.video/share/hRzs17w4eVsPQvsw5yxw2RydebHNVNNz?tab=summary&timestamp=1094.0)

## Ações

- [ ] Send WhatsApp billing/cost metrics to Davidson — Talles Souza ([watch](https://fathom.video/calls/598359854?timestamp=607.9999))
- [ ] Analyze Talles's WhatsApp setup; send alternatives/POC plan (official vs unofficial) to Talles — Davidson Gomes ([watch](https://fathom.video/calls/598359854?timestamp=899.9999))
