---
date: 2026-03-27
title: Impromptu Google Meet Meeting
project: outros
type: meeting
source_file: 2026-03-27__outros__meeting__impromptu-google-meet-meeting__133540686.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 133540686
recording_url: https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C
---

# Resumo executivo

## Meeting Purpose

[Align on the new cloud platform's agent installation and launch strategy.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=752.0)

## Key Takeaways

  - [**Decoupled Agent:** The agent installation will be decoupled from Docker/Swarm, installing only a Go binary. This prevents conflicts on servers with existing setups (e.g., Kubernetes) and enables a monitoring-only mode.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=31.0)
  - [**Phased Launch:** The cloud platform will launch Tuesday with a refined installation flow and a core set of popular apps (Chatwoot, Evolution, Typebot) to drive initial adoption.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=752.0)
  - [**Freemium Model:** A freemium model will offer basic monitoring and a free `.setup.com` subdomain, with paid plans unlocking advanced features like custom DNS, AI-powered alerts, and multi-cloud management.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=549.0)
  - [**Simplified Onboarding:** The "client" concept will be removed, making the user the default client. This streamlines the initial setup and eliminates confusion for single-server users.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=360.0)

## Topics

### Agent & Installation Strategy

  - [**Problem:** The current agent installation script is monolithic and tightly coupled to Docker/Swarm, causing conflicts on servers with existing setups (e.g., Kubernetes).](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=31.0)
  - [**Solution:** The agent installation will be a simple Go binary.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=39.0)
      - [**Rationale:** This allows for a monitoring-only mode and prevents version conflicts on servers with existing Docker or Kubernetes installations.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=39.0)
  - [**Multi-Stage Setup:** Users can optionally install other components (Docker, Swarm, Traefik) after the agent is active, enabling a gradual adoption path.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=62.0)
  - [**Code Structure:** The new setup script is modularized for easier maintenance and future expansion.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=133.0)

### Launch Plan & Feature Prioritization

  - [**Launch Target:** Tuesday, March 30th.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=752.0)
  - [**Pre-Launch Focus:**](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=752.0)
      - [**OrionDesign:** Refine the installation flow to be simpler and more intuitive.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=877.0)
      - [**Davidson:** Test the core platform and organize the codebase.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1006.0)
  - [**Initial App Catalog:** Focus on the most popular apps from the existing Setup Orion platform.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=766.0)
      - [Chatwoot (CRM)](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=766.0)
      - [Evolution API & Evolution Go](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=766.0)
      - [Typebot](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=766.0)
  - [**Marketing Angle:** Highlight AI-focused tools (e.g., Llama, Flowise) to attract new users.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1288.0)

### Business Model & Pricing

  - [**Model:** Freemium, designed to be affordable to maximize user acquisition.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1089.0)
  - [**Free Tier:**](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=549.0)
      - [Basic server monitoring (CPU, RAM, disk).](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=549.0)
      - [Free `.setup.com` subdomain for installed apps.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=530.0)
  - [**Paid Tiers:** Unlock advanced features.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=549.0)
      - [Custom DNS integration (e.g., Cloudflare).](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=530.0)
      - [AI-powered monitoring and alerts.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=586.0)
      - [Automated server cleanup (log rotation, old image deletion).](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=602.0)
      - [Multi-cloud cluster management.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=570.0)
  - [**Pricing Idea:** R$49.90/month for 5 servers, with a customizable plan for higher server counts.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1041.0)

### Future Enhancements

  - [**Portainer Integration:** A future feature to import and manage existing Portainer stacks directly from the platform.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=960.0)
  - [**Embedded Tutorials:** Use OrionDesign's existing video content to create embedded tutorials within the platform.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=797.0)
  - [**Multi-language Support:** A high-priority item for internationalization.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=827.0)

## Next Steps

  - [**Davidson:**](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=121.0)
      - [Grant OrionDesign access to the GitHub repo and Team.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=121.0)
      - [Refine the agent installation script to be Docker-independent.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=273.0)
  - [**OrionDesign:**](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1598.0)
      - [Refine the installation flow UI/UX.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=877.0)
      - [Install Cloud Code and submit monthly invoices to Davidson for reimbursement.](https://fathom.video/share/2fgPyexB9w_i695E_F52esYtp5KfsD_C?tab=summary&timestamp=1598.0)

## Ações

- [ ] Add OrionDesign to GitHub repo + Evoluxo team — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=110.9999))
- [ ] Refactor agent installer: remove Docker; add optional Traefik; add flags; add checks + Docker/Swarm detection — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=262.9999))
- [ ] Implement uptime monitoring: agent heartbeats + fallback checks; short-term logs; AI alerts — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=675.9999))
- [ ] Add Chatwoot, Evolution API, Evolution Go, Typebot to catalog/install — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=755.9999))
- [ ] Add tutorials tab; upload setup/install videos — OrionDesign ([watch](https://fathom.video/calls/617624255?timestamp=798.9999))
- [ ] Add i18n to platform; coordinate w/ Rapti for site i18n — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=816.9999))
- [ ] Add free subdomain feature — Davidson Gomes ([watch](https://fathom.video/calls/617624255?timestamp=858.9999))
- [ ] Set up test VPS for setup/install testing — OrionDesign ([watch](https://fathom.video/calls/617624255?timestamp=1374.9999))
- [ ] Install Cloud Code for dev — OrionDesign ([watch](https://fathom.video/calls/617624255?timestamp=1587.9999))
- [ ] Send Fathom invoice to Davidson via WhatsApp; then monthly — OrionDesign ([watch](https://fathom.video/calls/617624255?timestamp=1631.9999))
