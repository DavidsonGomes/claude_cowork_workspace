---
date: 2026-03-26
title: Impromptu Google Meet Meeting
project: outros
type: meeting
source_file: 2026-03-26__outros__meeting__impromptu-google-meet-meeting__133098531.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 133098531
recording_url: https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo
---

# Resumo executivo

## Meeting Purpose

[Align on replicating the open-source release process for other products.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=18.0)

## Key Takeaways

  - [Replicate the Evolution Go release process (code obfuscation, auto-sync) for the CRM and Community products.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=368.0)
  - [The paid version's value is SaaS hosting (no installation) and advanced features like multi-account management, which are excluded from the open-source build.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=151.0)
  - [Danilo will build the licensing system; Matheus will configure the automated build/obfuscation process.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
  - [A separate `community-develop` branch will isolate Community code from Enterprise features, simplifying the build logic.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=502.0)

## Topics

### Open-Source Strategy & Value Proposition

  - [**Concern:** Open-sourcing the CRM could enable competitors to replicate the paid version using AI.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=127.0)
  - [**Resolution:** The paid version's value is protected by two key differentiators:](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=151.0)
      - [**SaaS Hosting:** No self-installation required.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=151.0)
      - [**Feature Gating:** Advanced features (e.g., multi-account management) are excluded from the open-source build.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=151.0)
  - [**Product Focus:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=69.0)
      - [**Evolgo:** Keep the manager panel closed-source as a pre-compiled build.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=94.0)
      - [**CRM & Community:** Focus open-source efforts here.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=69.0)

### Technical Implementation Plan

  - [**Goal:** Replicate the Evolution Go release workflow for the CRM and Community products.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=368.0)
  - [**Core Components:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=438.0)
      - [**Licensing System:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=300.0)
          - [**Mechanism:** Use a `runtime_configs` DB table to store `Instance ID` and API key.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=300.0)
          - [**Activation:** Managed by the CRM backend, with a front-end wizard.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=334.0)
      - [**Automated Build & Obfuscation:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=355.0)
          - [**Process:** Obfuscate code (e.g., using Fathom) before public release.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=463.0)
          - [**Workflow:** `develop` branch → `beta` repo; `main` branch → public repo.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=378.0)
  - [**Branching Strategy:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=502.0)
      - [**Decision:** Create a separate `community-develop` branch.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=502.0)
      - [**Rationale:** Prevents mixing Community code with Enterprise-only features (e.g., super admin), simplifying the build process.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=502.0)

## Next Steps

  - [**Danilo:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
      - [Build the licensing system and activation wizard for the CRM, using the Evolution Go manager as a reference.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
  - [**Matheus:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
      - [Configure the automated build, obfuscation, and repository sync process for the CRM and Community products.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
  - [**Danilo & Matheus:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
      - [Coordinate to define dependencies (e.g., API routes) and ensure parallel work on the front-end and back-end.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=450.0)
  - [**Davidson:**](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=594.0)
      - [Prioritize development over detailed task tracking; log only a summary of work in Línea to maintain momentum.](https://fathom.video/share/9zb1n9yFMUjGtcxespEHcVR1odYE6Cpo?tab=summary&timestamp=594.0)

## Ações

- [ ] Test/upload Noivo, Community, CRM changes — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/615794090?timestamp=19.9999))
- [ ] Align w/ Danilo on Open Source/Community scope + responsibilities — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/615794090?timestamp=275.9999))
- [ ] Align w/ Danilo on Open Source/Community scope + responsibilities — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/615794090?timestamp=275.9999))
- [ ] Implement license/activation wizard + routes; use CRM backend for activation — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/615794090?timestamp=439.9999))
- [ ] Implement obfuscation + build/sync; use Fathom; align w/ Danilo on routes — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/615794090?timestamp=452.9999))
- [ ] Create Community develop repo; keep Enterprise/Community separate — Davidson Gomes ([watch](https://fathom.video/calls/615794090?timestamp=514.9999))
