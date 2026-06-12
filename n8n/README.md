# n8n — the reliability layer

The point of this brick is to show the step from **"I ran an agent once"** to **"it runs as a reliable, repeatable routine"** — without spending the lab building n8n from scratch.

`agent-routine.workflow.json` is a **minimal template to adapt**, not to build from zero:

```
Schedule trigger  →  Run agent step  →  Deliver
(every weekday)      (your command)     (email / Slack / file)
```

## Import it

1. Open your n8n instance (hosted or local — `npx n8n` / Docker).
2. **Workflows → Import from File** → select `agent-routine.workflow.json`.
3. Adapt the two nodes flagged `ADAPT ME`:
   - **Run agent step** — point the command at this repo and your project (e.g. `npm run fetch:news -- "..."`, `npm run build:deck -- ...`, or a headless Claude Code run).
   - **Deliver** — swap the no-op for an Email / Slack / Write-to-file node.
4. Adjust the schedule (default: weekdays at 07:00).

## Why this matters (voice-over)

A prototype that runs once is a demo. A routine that runs every morning, reliably, with the output landing where people work — that's production. The agent does the thinking; n8n makes it dependable and repeatable.
