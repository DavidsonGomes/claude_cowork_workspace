---
name: prod-end-of-day
description: "End-of-day shutdown that syncs meetings, organizes tasks, and logs what was worked on so the next session can pick up. Trigger when user says 'end of day', 'wrap up', 'encerra o dia', 'finaliza', 'done for today', 'goodnight', 'boa noite', 'shutdown', or anything that signals finishing a work session."
---

# End of Day

This skill writes a handoff note from the current session — something Claude can read at the start of the next session to quickly understand what happened and where to pick up.

## Why this matters

Without this log, the next Claude session starts with no memory of what you did today. This note is what bridges sessions together and keeps momentum going.

## Step 0 — Sync and organize (silent)

Before reviewing the session, run these housekeeping steps silently — don't narrate them:

1. **Sync meetings do dia** — use `/sync-meetings` to process any unsynced Fathom recordings from today. Skip silently if none.
2. **Review Todoist** — use `/review-todoist` to organize any uncategorized, untranslated, or messy tasks in the Evolution project.

If either step fails (API down, etc.), skip and move on.

## Step 1 — Review the session

Look back through the conversation and pull out what matters:

- **What we worked on** — which projects, which tasks (3–6 bullets, keep it tight)
- **What was built or changed** — specific files created or edited, decisions made
- **Still open** — anything mid-flight, unresolved, or left for later
- **Start here tomorrow** — 1–2 sentences on the best place to pick up next session

Write it like a note to a colleague taking over the shift — enough to orient them fast, not so much they have to read an essay. If nothing is clearly "still open," skip that section. Don't pad.

## Step 2 — Save the log

Save to:

```
01 Daily Logs/[C] YYYY-MM-DD.md
```

Use this format:

```markdown
---
author: claude
type: daily
date: YYYY-MM-DD
---

# Session Log — [Weekday, Month DD YYYY]

## What We Worked On
- [project — what was done]
- [project — what was done]

## What Was Built or Changed
- [specific file or decision]
- [specific file or decision]

## Still Open
- [thing that's mid-flight or unresolved]

## Start Here Tomorrow
[1–2 sentences on the best place to pick up next session]
```

Only include "Still Open" if there's actually something unresolved. Don't invent open items.

## Step 3 — Update CLAUDE.md folder structure

Open CLAUDE.md and update the `## Folder Structure` section to reflect any new folders or files created during the session. This keeps the context file accurate over time so future sessions don't work from stale information.

Only update what actually changed — don't rewrite the whole section if one folder was added.

## Step 4 — Confirm

Tell the user where the file was saved and give them the "Start Here Tomorrow" line so they know the handoff is solid. Keep it to one or two lines — they're done for the day.