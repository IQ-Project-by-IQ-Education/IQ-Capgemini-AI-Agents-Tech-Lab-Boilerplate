---
name: cv-demo
description: Use when the instructor runs the live CV-scoring demo — "run the CV demo", "start the demo", "lance la démo CV". Instructor-only; participants use quick-start or agent-builder instead.
---

# CV demo — "One agent sorts 20 CVs, then remembers you"

The instructor's **live theory demo** (watch first, build after). One scripted flow, five beats, on screen. The punchline is the last beat: the agent **writes what it learned to memory, live** — capability becomes experience.

Data: `projects/1-talent-cv-scoring/data/` — the sales job offer (`jobs/sales-account-executive.md`) and the CV bank. Read PDFs with `npm run read:pdf` (the `pdf-reading` skill); score with the `cv-scoring` grid. Write the shortlist to `projects/1-talent-cv-scoring/output/` so it renders at `/talent` in the web app.

## The five beats — keep this exact order

### 01 · Screen — pass 1
Take **20 CVs** from the bank (the first 20 PDFs, alphabetically — stable across demos). Filter them against the role **in one pass**: show a compact kept/dropped table, one-line reason each. No deep analysis yet — this beat is about throughput.

### 02 · Shortlist — pass 2
Argue a **top 5**, with the evidence quoted from each CV (grid from the `cv-scoring` skill, stated first). This beat is about judgment: every rank must be defensible out loud.

### 03 · Feedback — your voice
The instructor **reacts out loud** (dictated via Whisper Flow — no typing). Treat whatever arrives as steering input: preferences, vetoes, weight changes. Ask nothing; just listen and restate what you understood in one line.

### 04 · Re-rank — pass 3
Rebuild the shortlist around what was just said. **Show the movement**: who rose ↑, who dropped ↓, and why, in one line each. The before/after is the visible proof the agent listened.

### 05 · Remember — memory, on screen
Distill the feedback into **one memory line** (e.g. *"Prefer hands-on sales experience over management titles, shortlist max 5"*), write it via the `self-improve` format into `memory/`, and **show the file on screen**. Close with the message: *this line was not typed by anyone — the next screening starts from here.*

## Staging notes

- **Optional but strong opener**: before beat 01, write the five-beat flow to `agent-flow.mmd` (repo root, Mermaid, shape in `agent-flow.example.mmd`) and put **http://localhost:3000/flow** on the projector, the audience sees the plan before you run it. In-app browser first: `preview_start` with `{url: "http://localhost:3000/flow"}` when the `mcp__Claude_Browser__*` tools are available, otherwise `open`/`Start-Process`/`xdg-open`.

- Timebox: ~10 minutes. Beat 1 is the slowest — announce it ("20 CVs, one pass, give me a minute") and let the table land all at once.
- Fallback if PDFs misbehave: the 3 markdown CVs (`candidate-*.md`) keep the flow alive.
- Log the run (`npm run log:run -- 1-talent-cv-scoring …`) so "Recent runs" has a first entry.
- Keep one line of vigilance in the shortlist (bias, human decision) — production thinking, voiced, not lectured.
- To prove the loop next time: re-run beat 1 in a later session — it must start from the memory line and say so.
