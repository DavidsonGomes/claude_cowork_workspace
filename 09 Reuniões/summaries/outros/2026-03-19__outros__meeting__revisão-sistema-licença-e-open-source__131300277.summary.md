---
date: 2026-03-19
title: Revisão sistema Licença e Open Source
project: outros
type: meeting
source_file: 2026-03-19__outros__meeting__revisão-sistema-licença-e-open-source__131300277.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 131300277
recording_url: https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh
---

# Resumo executivo

## Meeting Purpose

[Review open-source progress and define next steps for licensing and onboarding.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=0.0)

## Key Takeaways

  - [**Open-Source Version Simplified:** The community version is now a single-tenant app, removing the "Super Admin" role and related features (multi-tenancy, campaign segmentation) to streamline the architecture and installation process.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
  - [**Automated License Activation:** A new, low-friction flow will use a social login redirect to automatically activate a license during installation, eliminating manual key entry.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1492.0)
  - [**Guided Onboarding Wizard:** The installation wizard will adopt the multi-step, guided structure of the Evoacademy onboarding flow to improve user experience and ensure correct setup.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1831.0)
  - [**AI-Powered Content Strategy:** A self-hosted GPU server will power AI agents for support, content recommendations, and commercial lead generation, using a hybrid RAG/semantic search model to manage costs and data privacy.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3172.0)

## Topics

### Open-Source Version Simplification

  - [The community version was simplified to streamline architecture and installation.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
  - [**Removed:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
      - ["Super Admin" role](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
      - [Multi-tenancy features (e.g., organization management)](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
      - [Campaign segmentation](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
  - [**Result:** A single-tenant application with a simplified database schema.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=120.0)
  - [**Architecture:** Remains a 5-repository setup (CRM, SiteKick, API, Processor, Office Service) plus a future AI runtime, making installation straightforward.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=227.0)

### Licensing System & Activation Flow

  - [The `Gerenciador de Licença` (License Manager) admin panel was reviewed.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1126.0)
      - [**Dashboard:** Provides key metrics (active instances, Heartbeat coverage, alerts) and a map of installations by country.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1126.0)
      - [**API Keys:** Lists keys with tiers (e.g., Community, Beta).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1191.0)
      - [**Instances:** Shows installation status, version, and telemetry (IP, country, city).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1351.0)
      - [**Missing:** A direct link between keys/instances and the user who generated them.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1206.0)
  - [**New Activation Flow:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1492.0)
    1.  [**User Action:** During installation, the user clicks an "Activate License" button.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1492.0)
    2.  [**Redirect:** The user is sent to a public social login page on the `Foundation` platform.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1503.0)
    3.  [**Login/Registration:** The user logs in or registers (e.g., via Google).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1503.0)
    4.  [**Callback:** `Foundation` sends a callback to the CRM with an encrypted license key.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1611.0)
    5.  [**Auto-Activation:** The CRM automatically activates the instance with the new key.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1611.0)
  - [**Duplicate Instance Handling:** If a user clones a disk, creating a duplicate instance with the same key, the system will automatically generate and assign a new, unique key to the duplicate.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1744.0)

### Guided Onboarding Wizard

  - [The installation wizard will adopt the multi-step, guided structure of the Evoacademy onboarding flow to improve user experience.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1831.0)
  - [**Model:** Marcelo's Evoacademy onboarding flow, which uses a step-by-step process with quizzes to personalize content.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=1831.0)
  - [**Application:** The CRM wizard will guide users through setup steps like database configuration and initial organization creation.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2165.0)
  - [**Rationale:** This structure provides a clear, intuitive path for users, especially for non-CLI installations (e.g., HostGator).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2224.0)

### AI & Content Strategy

  - [**Goal:** Build a robust knowledge base for AI agents using all content (videos, transcripts, community posts).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2807.0)
  - [**Infrastructure:** A self-hosted GPU server will be used to avoid high token costs from external providers and ensure data privacy.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3338.0)
  - [**AI Agents:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3172.0)
      - [**Support Agent:** Handles user queries.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3172.0)
      - [**Recommendation Agent:** Suggests content based on user profile and skill level.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3201.0)
      - [**Commercial Agent:** Analyzes usage to identify upsell opportunities (e.g., Enterprise version) and trigger targeted offers.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3232.0)
  - [**Knowledge Base Architecture:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2807.0)
      - [**Courses/Videos:** Transcripts will be vectorized once for efficient RAG.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2921.0)
      - [**Community Posts:** A hybrid approach will be used to manage high volume.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3487.0)
          - [**Semantic Search:** For general queries.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3487.0)
          - [**AI Summarization:** An agent will periodically summarize trending topics, saving them to a standard database to avoid constant vectorization and token costs.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3527.0)

### Frontend Protection & Auto-Update

  - [**Frontend Protection:** A mechanism will be implemented to prevent users from altering core branding elements (logo, favicon, colors).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=421.0)
      - [**Rationale:** Maintain brand consistency and prevent unauthorized use.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=447.0)
      - [**Enforcement:** The system will automatically revert changes on build.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=447.0)
      - [**Alerts:** The license system will notify the team of any attempted alterations.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=471.0)
  - [**Auto-Update Notification:** The system will check for new versions of the main repository and notify users in the UI.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2476.0)
      - [**Rationale:** Ensure users stay current and receive important updates.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2476.0)
      - [**Implementation:** A simple check against a central changelog file is the preferred initial approach.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=2494.0)

## Next Steps

  - [**Matheus:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3942.0)
      - [Finalize the License Manager frontend (expose user data, complete UI flow).](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3942.0)
      - [Build the public social login page on `Foundation` for automated license activation.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3845.0)
  - [**Danilo & Marcelo:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3730.0)
      - [Collaborate to build the multi-step installation wizard for the CRM, using the Evoacademy flow as a model.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3721.0)
  - [**Danilo:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=416.0)
      - [Research and implement the frontend protection mechanism.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=416.0)
      - [Organize the main open-source repository with proper documentation and links.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=389.0)
  - [**Davidson:**](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=4021.0)
      - [Define and share key telemetry metrics (OKRs) to guide data collection.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=4021.0)
      - [Plan the integration of AI agents and content embeds into the CRM.](https://fathom.video/share/RLgyEvvHgxxmps9Ux6siwBhcqmxxjNjh?tab=summary&timestamp=3775.0)

## Ações

- [ ] Organize main repo; add license, install book, Evo API/Go links — Davidson Gomes ([watch](https://fathom.video/calls/607210067?timestamp=48.9999))
- [ ] Review Gui's config changes; align w/ Gui — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/607210067?timestamp=319.9999))
- [ ] Send Danilo brand-protection spec; then Danilo implement front-asset lock — Davidson Gomes ([watch](https://fathom.video/calls/607210067?timestamp=425.9999))
- [ ] Add 24h filter to license dashboard — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=1159.9999))
- [ ] Add commercial alerts to license dashboard — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=1165.9999))
- [ ] Revoke license (keep history); remove delete — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=1309.9999))
- [ ] Implement social-login activation (public route + callback); then build install wizard/CLI — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=1538.9999))
- [ ] Implement auto-update detection + in-app changelog; then set main version + email notifications — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/607210067?timestamp=2465.9999))
- [ ] Share API tester w/ team; then coordinate testing w/ Danilo — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=2726.9999))
- [ ] Research and recommend RAG/vector approach for knowledge base — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/607210067?timestamp=3014.9999))
- [ ] Send Matheus telemetry/OKRs; then Matheus assess installer vs in-app telemetry — Davidson Gomes ([watch](https://fathom.video/calls/607210067?timestamp=4010.9999))
