---
date: 2026-03-16
title: Alinhamento
project: outros
type: meeting
people:
  - danilo.carneiro@etus.com.br
  - Davidson Gomes
source: fathom
status: raw
tags: [fathom, meeting]
recording_id: 130168769
recording_url: https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa
---

# Contexto

- Registro importado automaticamente do Fathom
- Fonte: /root/.openclaw/workspace/meetings/inbox/fathom/2026-03-16/2026-03-16__130168769__alinhamento.json

# Action items

- [ ] Add Danilo to repo; send access; share repo link — Davidson Gomes ([watch](https://fathom.video/calls/602765291?timestamp=261.9999))
- [ ] Ask Gui to send Danilo Docker/arch docs; then Danilo copies repos, removes multi-account, builds installer, points front — Davidson Gomes ([watch](https://fathom.video/calls/602765291?timestamp=402.9999))

# Summary (Fathom)

## Meeting Purpose

[Align on the new community platform and open-source strategy.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=95.0)

## Key Takeaways

  - [**New Community Platform:** A found Laravel repo will launch a members' area in weeks, bypassing a 3-month build. It will integrate with Fandex for sales via API.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=95.0)
  - [**Open-Source Strategy:** A simplified, single-account version of the core platform will be created to differentiate it from the multi-tenant paid version.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=289.0)
  - [**Immediate Action:** Danilo will begin creating the open-source version, starting with `auth-service`, after receiving the architecture plan from Gui.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=540.0)

## Topics

### New Community Platform

  - [Davidson found a complete Laravel members' area repo on GitHub, accelerating launch from \~3 months to weeks.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=95.0)
  - [**Goal:** Launch quickly to meet member demand and generate revenue while the new platform is developed.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=233.0)
  - [**Architecture:**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=213.0)
      - [**Sales:** Handled by Fandex.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=213.0)
      - [**Access:** Fandex API will grant access to the new platform post-purchase.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=218.0)
  - [**Status:** Davidson is organizing the repo and adding content (e.g., live streams as courses).](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=130.0)

### Open-Source Strategy

  - [**Goal:** Create a simplified, single-account version of the core platform to differentiate it from the multi-tenant paid version.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=289.0)
  - [**Key Simplifications:**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=330.0)
      - [**Single Account:** Remove multi-account functionality.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=330.0)
          - [**Rationale:** Protect the paid version's value, as it targets agencies and requires multi-tenancy.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=499.0)
          - [**Implementation:** Remove `account_id` from routes and headers.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=364.0)
      - [**Simplified `auth-service`:** Replace the `accounts` table with a `config` table for account-level settings.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=476.0)
      - [**No SuperAdmin:** The community version will not include the SuperAdmin panel.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=467.0)
      - [**Installer:** Develop a new installer to remove reliance on Docker for setup.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=310.0)
  - [**Process:**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=310.0)
      - [Create new community-specific repos (`auth-service`, `crm`, `front`).](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=324.0)
      - [Copy code from the main repos, then simplify it.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=390.0)

### Team & Project Status

  - [**New Developer (Matheus):**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=11.0)
      - [**Performance:** Good for a new hire; delivered 6 epics on time.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=11.0)
      - [**Feedback:** Danilo provided constructive feedback to guide improvements.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=15.0)
      - [**Blocker:** Limited by a personal laptop with only 5% disk space, causing performance issues.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=68.0)
  - [**Licensing Project:** Matheus is on track to complete the licensing implementation.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=515.0)

## Next Steps

  - [**Davidson:**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=272.0)
      - [Add Danilo to the new community platform repo and provide access.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=272.0)
      - [Get the open-source architecture plan from Gui and send it to Danilo.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=540.0)
  - [**Danilo:**](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=540.0)
      - [Begin creating the open-source version, starting with `auth-service`, after receiving the plan from Gui.](https://fathom.video/share/C_NFfmeAXYxSuPJhzQsNjydrC54hu7fa?tab=summary&timestamp=540.0)

# Transcrição

(transcrição não disponível no endpoint para este recording_id)
