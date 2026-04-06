---
date: 2026-03-24
title: Impromptu Google Meet Meeting
project: outros
type: meeting
people:
  - Davidson Gomes
source: fathom
status: raw
tags: [fathom, meeting]
recording_id: 132472776
recording_url: https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG
---

# Contexto

- Registro importado automaticamente do Fathom
- Fonte: /root/.openclaw/workspace/meetings/inbox/fathom/2026-03-24/2026-03-24__132472776__impromptu-google-meet-meeting.json

# Action items

- [ ] Upload MaxMind GeoIP DB to backend server — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/612920186?timestamp=194.9999))
- [ ] Cancel old PR; open new PR to develop w/ updated gate URL + version — Danilo Leone ([watch](https://fathom.video/calls/612920186?timestamp=433.9999))
- [ ] Update test suite — Davidson Gomes ([watch](https://fathom.video/calls/612920186?timestamp=448.9999))
- [ ] Implement license-gated migrations + activation redirect; then integrate w/ Matheus's UI — Danilo Leone ([watch](https://fathom.video/calls/612920186?timestamp=1226.9999))
- [ ] Build activation UI in manager w/ redirect to license login; then integrate w/ Danilo's backend — Matheus Gomes Pastorini ([watch](https://fathom.video/calls/612920186?timestamp=1239.9999))

# Summary (Fathom)

## Meeting Purpose

[Finalize the Evolution Go activation and licensing flow for launch.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1237.0)

## Key Takeaways

  - [**Launch Plan:** Deploy the new activation flow today on the existing Docker Swarm. This allows for immediate launch while deferring Kubernetes migration until after load testing provides performance data.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=738.0)
  - [**Activation Flow:** A new `activate` route will gate all access to Evolution Go. Users must complete a web-based activation via the `manager` UI to unlock functionality.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1285.0)
  - [**Security Upgrade:** The API key exchange now uses an authorization code flow, eliminating the security risk of exposing the API key directly in the URL.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=89.0)
  - [**Telemetry Strategy:** Usage data is batched and sent as increments, ensuring metrics are preserved even if a user's local instance is reset.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=540.0)

## Topics

### Activation Flow & User Experience

  - [**Problem:** The current activation process is too technical for non-developers, requiring manual log checks.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1091.0)
  - [**Solution:** A new web-based activation flow will be built into the `manager` UI.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1135.0)
  - [**User Journey:**](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1285.0)
    1.  [User accesses Evolution Go URL.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1285.0)
    2.  [Backend (Go) redirects to `/manager/activate` if not active.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1295.0)
    3.  [Activation page in `manager` UI prompts user to activate.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1371.0)
    4.  [User clicks "Activate License" → redirected to licensing portal.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1373.0)
    5.  [User logs in → redirected back to `manager` UI with an authorization token.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1380.0)
    6.  [`manager` UI exchanges token for API key → saves key.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1380.0)
    7.  [Activation complete; user can now access Evolution Go.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1285.0)

### Security & Telemetry

  - [**API Key Security:** The API key exchange was upgraded from a direct URL parameter to an authorization code flow.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=89.0)
      - [**Why:** Prevents exposing the API key in the URL, a significant security risk.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=103.0)
  - [**Geolocation:** Capturing client geolocation via IP address.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=142.0)
      - [**Why:** The frontend geolocation API is unreliable due to browser blocks.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=186.0)
      - [**Fallback:** Matheus will add a local MaxMind database (\~70MB) to the backend for reliable IP-based lookup.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=186.0)
  - [**Telemetry Strategy:** Usage data is batched and sent as increments.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=540.0)
      - [**Why:** This ensures metrics are preserved even if a user's local instance is reset, as the data is already logged on the server.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=610.0)

### Infrastructure & Scaling

  - [**Decision:** Deploy today on the existing Docker Swarm.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=738.0)
      - [**Why:** Allows for immediate launch while deferring Kubernetes migration until after load testing provides performance data.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=738.0)
  - [**Future Plan:** Conduct automated load testing (e.g., with K6) to determine Swarm's capacity and inform the Kubernetes migration strategy.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=755.0)

## Next Steps

  - [**Danilo:**](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1237.0)
      - [Implement backend redirect logic: if not active, redirect all requests to `/manager/activate`.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1295.0)
      - [Block migrations and other core functions until activation is complete.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=900.0)
  - [**Matheus:**](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1237.0)
      - [Build the activation page in the `manager` React UI.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1371.0)
      - [Implement the authorization token exchange for the API key.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=89.0)
      - [Add the MaxMind geolocation database to the backend.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=186.0)
  - [**Davidson:**](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1237.0)
      - [Grant Danilo `develop` branch bypass permissions.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=242.0)
      - [Coordinate with Danilo and Matheus to ensure a smooth, synchronized launch.](https://fathom.video/share/uHbzqGyZJh4ezEsyMsMftK25HWKs3mqG?tab=summary&timestamp=1237.0)

# Transcrição

(transcrição não disponível no endpoint para este recording_id)
