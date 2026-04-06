---
date: 2026-03-31
title: Impromptu Google Meet Meeting
project: outros
type: meeting
people:
  - Davidson Gomes
source: fathom
status: raw
tags: [fathom, meeting]
recording_id: 134212847
recording_url: https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v
---

# Contexto

- Registro importado automaticamente do Fathom
- Fonte: /root/.openclaw/workspace/meetings/inbox/fathom/2026-03-31/2026-03-31__134212847__impromptu-google-meet-meeting.json

# Action items

- [ ] Pull EvoCRM Community main; test install/setup end-to-end — Davidson Gomes ([watch](https://fathom.video/calls/621004666?timestamp=73.9999))
- [ ] Test EvoCRM Community end-to-end; report issues to Davidson — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/621004666?timestamp=425.9999))
- [ ] Coordinate notification run w/ team — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/621004666?timestamp=572.9999))
- [ ] Contact team re: add new program to Leste Maio — Danilo Leone dos Santos Carneiro ([watch](https://fathom.video/calls/621004666?timestamp=580.9999))

# Summary (Fathom)

## Meeting Purpose

[Review the EvoCRM Community setup and plan next steps.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=224.0)

## Key Takeaways

  - [The `EvoCRM Community` repo is ready for testing; it uses `EvoAlf` and `EvoFrontEnd` submodules and connects directly to the production license server to simplify the initial setup.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=43.0)
  - [The setup now correctly handles 503 "Service Unavailable" errors, resolving a critical bug that previously broke the entire Focus application.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=110.0)
  - [Davidson will test the full installation process to validate the new simplified onboarding flow and prepare for pilot deployments with two key clients.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=231.0)

## Topics

### EvoCRM Community Setup

  - [**Repo Structure:** The main `EvoCRM Community` repo uses `EvoAlf` and `EvoFrontEnd` as submodules.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=93.0)
  - [**License Connection:** The setup connects directly to the production license server, bypassing dev/staging environments to streamline the initial installation.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=43.0)
  - [**Simplified Onboarding:** The initial setup screen is minimal, requiring only basic account data. All other configurations are managed from within the platform, eliminating external steps.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=361.0)

### Critical Bug Fix

  - [**Problem:** The Focus application was breaking due to two issues:](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=110.0)
      - [The frontend failed to recognize 503 "Service Unavailable" errors.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=110.0)
      - [The `EvoAlf` service was crashing over license issues, causing a memory leak.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=122.0)
  - [**Solution:** Danilo implemented fixes to ensure the frontend correctly handles 503 errors and the `EvoAlf` service manages licenses properly, stabilizing the application.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=110.0)

### Pilot Deployment Strategy

  - [**Goal:** Validate the installation process to prepare for pilot deployments with two key clients.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=231.0)
  - [**Client 1:** A large client with \>300 clinics.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=392.0)
      - [**Rationale:** Pilot deployment accelerates their access to the system.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=396.0)
      - [**Upside:** Potential for a significant paid contract if the pilot is successful.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=396.0)
  - [**Client 2:** A client of partner Diego.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=415.0)
      - [**Rationale:** Allows Diego to use the system for content strategy, strengthening the partnership.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=415.0)

### Future Onboarding Enhancements

  - [Davidson plans to improve the user onboarding experience by adding:](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=337.0)
      - [A guided tour.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=337.0)
      - [In-platform links to video tutorials.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=337.0)

## Next Steps

  - [**Davidson:**](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=231.0)
      - [Test the full installation process of the `EvoCRM Community` repo.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=231.0)
      - [Record video tutorials and create in-platform guides based on the validated process.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=443.0)
      - [Prepare for pilot deployments with the two key clients.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=231.0)
  - [**Danilo:**](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=436.0)
      - [Run new end-to-end tests to confirm all functionalities are stable.](https://fathom.video/share/VwyEszN-v4J2S5J_L9LNXKxJRyZ7uf4v?tab=summary&timestamp=436.0)

# Transcrição

(transcrição não disponível no endpoint para este recording_id)
