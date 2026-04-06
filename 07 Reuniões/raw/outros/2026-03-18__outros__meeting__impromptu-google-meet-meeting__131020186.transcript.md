---
date: 2026-03-18
title: Impromptu Google Meet Meeting
project: outros
type: meeting
people:
  - Davidson Gomes
source: fathom
status: raw
tags: [fathom, meeting]
recording_id: 131020186
recording_url: https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz
---

# Contexto

- Registro importado automaticamente do Fathom
- Fonte: /root/.openclaw/workspace/meetings/inbox/fathom/2026-03-18/2026-03-18__131020186__impromptu-google-meet-meeting.json

# Action items

- [ ] Add ISS retention flag to CNPJ customers; then auto-cancel OME NFSe on refund — Davidson Gomes ([watch](https://fathom.video/calls/606299651?timestamp=589.9999))
- [ ] Implement 7-day NFSe emission; then run test purchase/refund w/ Felipe — Davidson Gomes ([watch](https://fathom.video/calls/606299651?timestamp=816.9999))

# Summary (Fathom)

## Meeting Purpose

[Define OMI invoice automation logic for a new platform.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=13.0)

## Key Takeaways

  - [**OMI Configuration is the Key:** The automation's success hinges on correctly configuring OMI's service codes (`Código de Serviço`, `Código da Lei Complementar`) and tax rules, not the Stripe data source.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=13.0)
  - [**Strategic 7-Day Delay:** Invoice issuance will be delayed 7 days to align with the refund window. This avoids manual reconciliation of canceled invoices and ensures accurate monthly revenue reports.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=731.0)
  - [**Automated Refund Cancellation:** Refunds will automatically trigger an OMI invoice cancellation, eliminating a manual step from the current workflow.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=780.0)
  - [**New Platform & Payment Gateway:** Davidson is building a platform that integrates with the low-cost `Gator` payment gateway (2.79% fee, no admin fees), replacing Stripe.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=963.0)

## Topics

### OMI Automation Requirements

  - [Felipe's existing automation (Stripe → Pluga → OMI) failed to auto-issue invoices due to incorrect OMI configuration.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=166.0)
  - [**Critical OMI Fields:**](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=327.0)
      - [`Código de Serviço` (Service Code)](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=241.0)
      - [`Código da Lei Complementar` (Complementary Law Code)](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=327.0)
  - [**Tax Logic:**](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=589.0)
      - [**Tributation Type:** `Tributável` (Taxable) for Brazil, `Isento` (Exempt) for international.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=638.0)
      - [**ISS Withholding:** A new checkout field will capture if a CNPJ client withholds ISS.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=589.0)
  - [**Service Codes:**](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=421.0)
      - [Initially, all services can use the same SaaS code.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=421.0)
      - [The new platform can support product-specific codes if needed.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=540.0)

### Invoice & Refund Workflow

  - [**Problem:** Issuing invoices immediately for refunded purchases creates manual reconciliation work and distorts monthly revenue reports.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=741.0)
  - [**Solution:** Delay invoice issuance by 7 days to align with the refund window.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=731.0)
      - [**Rationale:** This ensures only final, non-refunded sales are invoiced, simplifying reporting.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=819.0)
  - [**Refund Process:** Refunds will automatically trigger an OMI invoice cancellation.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=780.0)
      - [**Felipe's Confirmation:** OMI's simple cancellation process makes this feasible.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=927.0)

### New Platform & Payment Gateway

  - [Davidson is building a platform to replace the current Stripe/Pluga setup.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=963.0)
  - [**Payment Gateway:** The platform will integrate with `Gator`, a low-cost alternative to Stripe.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=963.0)
      - [**Fee:** 2.79% per transaction, with no admin fees.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=1020.0)
  - [**Business Model:** Davidson plans to offer the platform to other businesses, bundling `Gator` to generate revenue from transaction volume.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=1030.0)

## Next Steps

  - [**Davidson:**](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=951.0)
      - [Finalize the OMI integration, incorporating the 7-day delay and automated cancellation logic.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=951.0)
      - [Add the "ISS withholding" field to the checkout for CNPJ clients.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=589.0)
      - [Notify Felipe to test the full purchase-invoice-refund flow.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=951.0)
  - [**Felipe:**](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=1092.0)
      - [Provide Davidson with OMI access credentials via Slack.](https://fathom.video/share/7HqaW7tSxRXPW2E5sk5h-BMjrwbHvZEz?tab=summary&timestamp=1092.0)

# Transcrição

(transcrição não disponível no endpoint para este recording_id)
