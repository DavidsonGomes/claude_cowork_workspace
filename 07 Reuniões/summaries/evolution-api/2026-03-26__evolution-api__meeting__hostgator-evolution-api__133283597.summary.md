---
date: 2026-03-26
title: HostGator <> Evolution API
project: evolution-api
type: meeting
source_file: 2026-03-26__evolution-api__meeting__hostgator-evolution-api__133283597.transcript.md
status: summary
tags: [fathom, meeting]
recording_id: 133283597
recording_url: https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE
---

# Resumo executivo

## Meeting Purpose

[Review launch issues and product feedback for the Evolution API integration.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=21.0)

## Key Takeaways

  - [**Critical Bugs Identified:** The launch was blocked by three bugs: stalled server provisioning, failed password changes, and inaccessible SSH on Ubuntu builds.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=345.0)
  - [**Root Causes & Fixes:**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=587.0)
      - [**SSH:** Ubuntu builds block the outdated RSA key protocol. The fix is to rebuild on Alma Linux, which supports modern protocols.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=587.0)
      - [**Rebuilds:** A pending `rebootsoft` command on the server prevented a rebuild from executing.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=980.0)
      - [**Password Changes:** The request to change a password is not reaching the backend (`SBOG` API), preventing the Ansible playbook from running.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1124.0)
  - [**Product Feedback:** Users need a simple UI for pre-installation configuration (e.g., RabbitMQ credentials) to avoid manual `.env` file edits.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1230.0)
  - [**Next Steps:** A follow-up meeting is set for Monday to review a demo of a proposed setup UI.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1420.0)

## Topics

### Launch Issues & Debugging

  - [**Stalled Server Provisioning**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=348.0)
      - [**Issue:** New VPS purchases were stuck in a "configuring" state for hours, blocking user access.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=348.0)
      - [**Status:** Fixed yesterday afternoon (March 25). Support is manually activating all remaining stalled accounts.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1516.0)
  - [**SSH Access Failure**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=367.0)
      - [**Issue:** SSH connection was refused on a server running Ubuntu.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=367.0)
      - [**Root Cause:** The server's SSH configuration was set to reject the outdated RSA key protocol for security.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=618.0)
      - [**Resolution:** Rebuilding the server on Alma Linux, which supports modern protocols, resolves the issue.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=587.0)
  - [**Password Change Failure**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=806.0)
      - [**Issue:** Changing the root password in the client portal fails.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=806.0)
      - [**Root Cause:** The password change request is not reaching the backend (`SBOG` API), preventing the Ansible playbook from running.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1124.0)
      - [**Status:** Unresolved; requires further investigation.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1573.0)
  - [**Web Terminal Login Failure**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=806.0)
      - [**Issue:** The web terminal (VNC) rejects correct passwords.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=806.0)
      - [**Root Cause:** The VNC client does not support copy-pasting, requiring manual entry. However, manual entry also fails, indicating a separate bug.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=498.0)
      - [**Status:** Unresolved; requires further investigation.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1573.0)
  - [**Failed Server Rebuild**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=980.0)
      - [**Issue:** A server rebuild request failed to execute.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=980.0)
      - [**Root Cause:** A pending `rebootsoft` command on the server was blocking the rebuild process.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=980.0)
      - [**Resolution:** The rebuild succeeded after the pending reboot completed.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=980.0)

### Product Feedback: Configuration UI

  - [**Problem:** Users need a simple way to configure the application (e.g., RabbitMQ credentials) without manual SSH access and `.env` file edits.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1230.0)
  - [**Proposed Solution:** A pre-installation setup screen in the portal, similar to the one used for OpenClaw's LLM API keys.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1383.0)
  - [**Demo:** Davidson is building a setup application and will demo it on Monday to illustrate the required configuration options.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1420.0)

## Next Steps

  - [**Eduarda:**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1573.0)
      - [Prioritize and investigate the password change failure bug.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1573.0)
      - [Schedule a follow-up meeting for Monday to review the setup UI demo.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1420.0)
  - [**Davidson:**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1600.0)
      - [Demo the setup application on Monday.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1420.0)
      - [Contact Guilherme directly for urgent server/SSH issues.](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=1600.0)
  - [**Fernando:**](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=67.0)
      - [Schedule a separate meeting for tomorrow (March 27) to discuss business terms (SaaS, revenue share).](https://fathom.video/share/znsziK28UjC18KJjwKkNMJvmqvxZ8rSE?tab=summary&timestamp=67.0)

## Ações

- [ ] Email meeting recording to Davidson + team — Tiago de Oliveira ([watch](https://fathom.video/calls/616177109?timestamp=114.9999))
- [ ] Email Eduarda your account email + IPs of affected servers — Davidson Gomes ([watch](https://fathom.video/calls/616177109?timestamp=926.9999))
- [ ] Open task re: password change + web terminal; prioritize fix; update Davidson — Eduarda da Silva ([watch](https://fathom.video/calls/616177109?timestamp=1562.9999))
