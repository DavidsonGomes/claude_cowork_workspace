---
date: 2026-03-30
title: Evolução de Produto - VPS
project: outros
type: meeting
source_file: 2026-03-30__outros__meeting__evolução-de-produto-vps__134018823.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 134018823
recording_url: https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX
---

# Resumo executivo

## Meeting Purpose

[Review VPS user experience and plan product improvements.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=0.0)

## Key Takeaways

  - [**Docker Manager is the top priority.** The current VPS setup is a "wasted potential" because it lacks a container manager, forcing users to use SSH for updates and limiting them to one app per server. A full Docker Manager is in development.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=162.0)
  - [**Quick wins are coming.** Server naming and favoriting will be released by EOM April to improve management of multiple VPSs. A dedicated support queue for Brius clients is also being created.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=547.0)
  - [**A new partnership is possible.** Brius will demo its multi-cloud server manager to explore an API integration that would allow users to provision HostGator servers directly from the Brius panel.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1174.0)
  - [**CRM launch strategy is set.** The CRM will target users with some technical knowledge, not complete beginners. Its usage will be metered by conversations/day, not agents, to accommodate future AI agents.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1262.0)

## Topics

### VPS User Experience Gaps

  - [**Server Management:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=124.0)
      - [**No Naming:** Users cannot name servers, causing confusion when managing multiple instances for different clients.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=139.0)
      - [**No Favoriting:** The list of all hosting products (VPS, dedicated, shared) is unfilterable, making it hard to find active VPSs.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=637.0)
  - [**Docker Management:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=162.0)
      - [**Limited Functionality:** The current Docker Compose setup is a "wasted potential" because it only installs one app per server and lacks a portal-based manager.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=162.0)
      - [**Technical Barrier:** Users must use SSH for updates, a process that is error-prone and inaccessible to non-technical users.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=877.0)
      - [**Competitor Benchmark:** Hostinger's portal-based Docker manager was cited as the standard for enabling multi-app scaling on a single server.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=232.0)

### Planned Product Improvements

  - [**Docker Manager (Long-Term):**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=495.0)
      - [**Status:** A major, in-progress project requiring a full re-architecture of the provisioning (Ansible) and portal systems. No ETA.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=495.0)
      - [**Goal:** Enable users to manage multiple containers, update apps, and configure environment variables directly from the portal.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=172.0)
  - [**Server Naming & Favoriting (Short-Term):**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=547.0)
      - [**Status:** Figma designs are complete; development starts next week for an EOM April release.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=547.0)
      - [**Features:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=600.0)
          - [**Naming:** Add custom names to servers for better identification.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=600.0)
          - [**Favoriting:** Pin frequently used servers to the top of the list.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=637.0)
          - [**Dedicated View:** Create a VPS-only list to remove clutter from shared hosting plans.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=690.0)
  - [**Dedicated Support Queue:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=780.0)
      - [**Action:** Create a dedicated support queue for Brius clients.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=780.0)
      - [**Benefit:** Provides faster, specialized support, preventing Brius from becoming a de facto support channel.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=780.0)

### Brius Server Manager Demo

  - [**Tool:** A multi-cloud server manager built by Brius and Orion Design.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1150.0)
  - [**Functionality:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=253.0)
      - [Connects to any server via a Go binary agent.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=253.0)
      - [Provides a marketplace to install apps (e.g., Evolution API) with specific versions.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=323.0)
      - [Automates domain provisioning and DNS setup via Cloudflare integration.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=348.0)
      - [Includes a security scanner with fix suggestions.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=300.0)
  - [**Partnership Opportunity:** Brius proposed an API integration to allow users to provision HostGator servers directly from their panel.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1174.0)

### Evolution CRM Launch Strategy

  - [**Target Audience:** Users with some CRM experience, not complete beginners.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1395.0)
  - [**Onboarding:** The product includes a guided tour and a first-run setup screen to simplify initial configuration.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1441.0)
  - [**Usage Metering:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1262.0)
      - [**Metric:** Conversations/day, not agents.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1296.0)
      - [**Rationale:** This model supports future AI agents, which consume resources without being human "users."](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1307.0)
  - [**OS Requirement:** The CRM can run on Alma Linux, aligning with the standard OS for other Evolution apps.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1602.0)

## Next Steps

  - [**Eduarda:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=492.0)
      - [Initiate development of server naming and favoriting features.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=547.0)
      - [Create the dedicated support queue for Brius clients.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=780.0)
      - [Schedule a feedback session for the Docker Manager Figma designs.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1055.0)
  - [**Victor:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=571.0)
      - [Share server list redesign Figma with Davidson for feedback.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=571.0)
  - [**Davidson:**](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1174.0)
      - [Demo the Brius server manager to Fernando to discuss a potential partnership.](https://fathom.video/share/BrSFo2-xW2e_qwxXa2Q6x-1DBoJYWfGX?tab=summary&timestamp=1174.0)

## Ações

- [ ] Email meeting recording to Eduarda, Victor, Isabela — Davidson Gomes ([watch](https://fathom.video/calls/619452626?timestamp=87.9999))
- [ ] Deliver slides/doc on Docker Manager proposal to Eduarda, Victor, Isabela — Davidson Gomes ([watch](https://fathom.video/calls/619452626?timestamp=469.9999))
- [ ] Start dev on VPS list naming/favorites/quick-actions; release to Davidson; then GA by Apr 30 — Eduarda da Silva ([watch](https://fathom.video/calls/619452626?timestamp=536.9999))
- [ ] Confirm w/ Fernando support-queue setup for Brius; then set up dedicated queue + contact — Eduarda da Silva ([watch](https://fathom.video/calls/619452626?timestamp=787.9999))
- [ ] Schedule validation w/ Davidson re: Docker Manager UX/Figma — Eduarda da Silva ([watch](https://fathom.video/calls/619452626?timestamp=1069.9999))
- [ ] Schedule validation w/ Davidson re: Docker Manager UX/Figma — Victor Gomes ([watch](https://fathom.video/calls/619452626?timestamp=1069.9999))
- [ ] Add multi-cloud/API provisioning to Mar 31 agenda w/ Fernando — Eduarda da Silva ([watch](https://fathom.video/calls/619452626?timestamp=1217.9999))
- [ ] Provision CRM on Alma Linux via Ansible — Eduarda da Silva ([watch](https://fathom.video/calls/619452626?timestamp=1591.9999))
