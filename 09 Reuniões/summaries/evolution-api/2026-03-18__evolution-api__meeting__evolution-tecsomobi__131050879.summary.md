---
date: 2026-03-18
title: Evolution <> Tecsomobi
project: evolution-api
type: meeting
source_file: 2026-03-18__evolution-api__meeting__evolution-tecsomobi__131050879.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 131050879
recording_url: https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q
---

# Resumo executivo

## Meeting Purpose

[Review Tecsomobi's WhatsApp bot and discuss migration to the official API.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=4.0)

## Key Takeaways

  - [**High Risk:** Tecsomobi's bus ticket bot, built on the unofficial Evolution API, faces high risk of number banning and instability—critical for a core sales channel.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=166.0)
  - [**Official API Solution:** Davidson recommended migrating to the official Meta API, which is free for passive, user-initiated conversations and offers superior stability and features.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=174.0)
  - [**Early Access Path:** Tecsomobi will join Evolution's early access program (a past crowdfunding tier) to get pre-release access to the new Meta API proxy hub and EvoCRM.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=528.0)
  - [**Migration Benefits:** The new hub simplifies migration by handling Meta's app approval process, enabling rich media (e.g., QR code images), and improving user experience.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=641.0)

## Topics

### Tecsomobi's Current Bot Operation

  - [**Purpose:** A WhatsApp bot for bus ticket sales in the São Paulo metro area.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=30.0)
  - [**Architecture:**](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=22.0)
      - [**API:** Unofficial Evolution API (v2.3.6)](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=82.0)
      - [**Chatbot:** Typebot](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=108.0)
      - [**Backend:** Custom system for payment (Pix) and QR code generation](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=122.0)
  - [**User Flow:** Passive; users initiate contact.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=142.0)
  - [**Business Context:** Developed for Autopass, a client for whom Tecsomobi manages product development.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=37.0)

### Recommended Migration to Official Meta API

  - [**Problem:** The unofficial Evolution API is unsuitable for a core sales channel due to high risk of number banning and poor stability.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=166.0)
  - [**Solution:** Migrate to the official Meta API.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=174.0)
      - [**Cost:** Free for passive, user-initiated conversations.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=177.0)
      - [**Stability:** Secure and reliable, with no ban risk.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=290.0)
      - [**Features:** Enables rich media (buttons, lists, images), solving the current inability to send QR code images.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=705.0)

### Evolution's New Platform & Early Access

  - [**New Products (Launching in \~2 weeks):**](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=313.0)
      - [**Meta API Hub:** A proxy service simplifying official API connection by handling Meta's app approval process.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=263.0)
      - [**EvoCRM:** An open-source CRM for sales and chat management.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=330.0)
  - [**Early Access Program:** A special tier from a past crowdfunding campaign that grants pre-release access to the new hub and EvoCRM.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=427.0)
  - [**Agreement:** Tecsomobi will join this program.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=555.0)

## Next Steps

  - [**Davidson:** Send Tecsomobi the early access program details (Pix payment info, required company data for invoice) today.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=555.0)
  - [**Willys:** Secure approval and complete payment by Monday.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=555.0)
  - [**Both:** Schedule a follow-up call to plan the technical migration once Tecsomobi is onboarded.](https://fathom.video/share/cKBZqmpDya6fw9QrFpizs6QfdqTwK8_Q?tab=summary&timestamp=731.0)

## Ações

- [ ] Email Willys: onboarding (Pix/bank, CNPJ, invoice, signup, docs); then Willys pays, approves, completes signup — Davidson Gomes ([watch](https://fathom.video/calls/604746356?timestamp=572.9999))
