---
date: 2026-04-06
title: Planning Evolution
project: evolution-api
type: meeting
status: summary
tags: [fathom, meeting]
recording_id: 135624447
recording_url: https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK
people: [Raphael Petronilho, Guilherme Gomes, Nickolas Oliveira, Daniel Paes, Danilo Carneiro, Marcelo Soares, Davidson Gomes]
---

## Meeting Purpose

[Finalize the Evo CRM for its launch next week.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=280.0)

## Key Takeaways

  - [**Launch is Next Week:** The Evo CRM launches next week, with marketing campaigns starting today. The immediate priority is testing and stabilization.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=305.0)
  - [**Testing Protocol:** All new development is paused. The team will test the Evo CRM today and tomorrow, reporting all bugs and feedback via the admin panel. **Do not fix bugs during this phase** to prevent merge conflicts.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
  - [**Critical Test Flows:** The core user experience must be flawless. This includes end-to-end flows for the CRM pipeline, Evolution API integration, agent functionality, and multi-channel conversations (e.g., Telegram).](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=473.0)
  - [**EvoGo & Evolution API Strategy:** EvoGo is stable. The EvoGo Manager will be adapted to serve both EvoGo and the upcoming Evolution API V3, creating a unified panel.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)

## Topics

### Evo CRM Launch & Stabilization

  - [**Launch Timeline:** The Evo CRM launches next week. Marketing campaigns (email, Instagram) begin today and run daily through April 23.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=328.0)
  - [**Immediate Priority:** Pause all new feature development. The focus is exclusively on testing, bug fixing, and stabilization to ensure a smooth launch.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=310.0)
  - [**Testing Protocol:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
      - [**Phase 1 (Today & Tomorrow):** Test only. Report all bugs and feedback via the admin panel. Do not fix bugs.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=554.0)
      - [**Phase 2 (Mid-Week):** Davidson will triage all reported issues, remove duplicates, and assign tasks for the team to fix.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1680.0)
  - [**Installation Test:** All team members must perform a fresh installation using the `readme` to validate the setup process. This is critical for Marcelo to create accurate installation documentation.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=439.0)

### EvoGo & Evolution API Status

  - [**EvoGo:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1170.0)
      - [**Status:** Stable. Matheus fixed a bug preventing buttons/carousels from working on all devices.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1170.0)
      - [**Community Bugs:** Users report a `400 license server error`. Matheus will monitor the public repo for this and other issues.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=782.0)
      - [**PR Merging:** Public PRs are merged into the private repo first, then rebuilt and pushed to the public version. This maintains code quality and enables review.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=860.0)
  - [**Evolution API:**](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)
      - [**Manager Strategy:** The EvoGo Manager will be adapted to serve both EvoGo and the upcoming Evolution API V3.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1260.0)
      - [**Rationale:** This creates a unified panel, simplifies maintenance, and is not open-sourced because it's a simple component.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1314.0)
      - [**V3 Launch Goal:** Use the new panel to drive user migration and capture installation data.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1500.0)

### WhatsApp API Changes

  - [**Issue:** WhatsApp is replacing phone numbers with a user ID (WID) in some API payloads.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1767.0)
  - [**Impact:** The Evo CRM is likely unaffected, as it already handles IDs for leads. The change is a simple data format swap, not a structural API break.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1767.0)
  - [**Context:** This appears to be a limited A/B test by Meta. The team is monitoring the official API to track the change.](https://fathom.video/share/2hQ2E8BLfe75skBNZT-ncNy_tkMS2PJK?tab=summary&timestamp=1843.0)

## Action Items

- [ ] **Davidson Gomes** — Review Danilo's Evo CRM PR ([00:04:42](https://fathom.video/calls/625646479?timestamp=282.9999))
- [ ] **Davidson Gomes** — Coordinate Evo CRM install/test w/ team; collect bug reports by Apr 7 12:00 ([00:07:08](https://fathom.video/calls/625646479?timestamp=428.9999))
- [ ] **Daniel Paes** — Access portal.evi.com.br; confirm WhatsApp messages; notify Davidson to activate WhatsApp Web ([00:11:38](https://fathom.video/calls/625646479?timestamp=698.9999))
- [ ] **Daniel Paes** — Ask community to open EvoGo license issues on GitHub ([00:13:23](https://fathom.video/calls/625646479?timestamp=803.9999))
- [ ] **Matheus Gomes Pastorini** — Monitor EvoGo open-source issues/PRs; propose merges to Davidson ([00:13:44](https://fathom.video/calls/625646479?timestamp=824.9999))
- [ ] **Davidson Gomes** — Test Evo CRM single-account/Telegram flow ([00:15:49](https://fathom.video/calls/625646479?timestamp=949.9999))
- [ ] **Davidson Gomes** — Review Evo CRM onboarding (Beacop) w/ Marcelo ([00:17:59](https://fathom.video/calls/625646479?timestamp=1079.9999))
- [ ] **Marcelo dos Reis Soares Junior** — Document Evo CRM installation (MCT-SERV) ([00:18:18](https://fathom.video/calls/625646479?timestamp=1098.9999))
- [ ] **Matheus Gomes Pastorini** — Test Evolution API V2 w/ license manager; send PR ([00:20:33](https://fathom.video/calls/625646479?timestamp=1233.9999))
- [ ] **Davidson Gomes** — Update EvoGo locally ([00:24:17](https://fathom.video/calls/625646479?timestamp=1457.9999))
- [ ] **Nickolas de Oliveira** — Set up Evo CRM locally; test core flows; log bugs ([00:25:52](https://fathom.video/calls/625646479?timestamp=1552.9999))
- [ ] **Davidson Gomes** — Ensure Evo CRM stores WhatsApp contact ID (WID) instead of phone number ([00:29:56](https://fathom.video/calls/625646479?timestamp=1796.9999))
