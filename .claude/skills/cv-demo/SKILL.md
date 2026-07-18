---
name: cv-demo
description: Use when the instructor runs the live CV-scoring demo — "run the CV demo", "start the demo", "lance la démo CV". Instructor-only; participants use quick-start or agent-builder instead.
---

# CV demo — "One agent screens the CV pool, then remembers you"

The instructor's **live theory demo** (watch first, build after). One scripted flow, five beats, on screen. The punchline is the last beat: the agent **writes what it learned to memory, live** — capability becomes experience.

**The demo is powered by the `cv-screener` agent** (`.claude/agents/cv-screener.md`) — it carries the scoring key, the live sample and the output board; this skill is the run-of-show. Data: `projects/1-talent-cv-scoring/data/` — the sales job offer (`jobs/sales-account-executive.md`) and the CV bank (116 anonymized PDFs + 9 curated named demo CVs `cv-*.md`).

## The five beats — keep this exact order

### 01 · Screen — pass 1
Invoke `cv-screener` on the **9 curated demo CVs** (`cv-*.md` — nine pool CVs cleaned and given generic names so the shortlist reads human on screen). Screen them against the role **in one pass**: a compact ranked table, one-line reason each. Be explicit, like the agent is: *"116 in the pool; I screened a curated 9-CV sample this pass."* Never take the first PDFs alphabetically — the raw pool is mostly generic sales/retail/admin profiles, and a lucky-draw sample kills the credible top 5 that beat 02 needs.

### 02 · Shortlist — pass 2
Argue a **top 5**, with the evidence quoted from each CV (the agent's scoring key, stated first: four must-haves at 0–5 plus a 0–2 nice-to-have bonus, max 22; any must-have at 0–1 gates the candidate). This beat is about judgment: every rank must be defensible out loud, and the gated weak profiles show the must-have gate doing its job.

### 03 · Feedback — your voice
The instructor **reacts out loud** (dictated via Whisper Flow — no typing). Treat whatever arrives as steering input: preferences, vetoes, weight changes. Ask nothing; just listen and restate what you understood in one line.

### 04 · Re-rank — pass 3
Rebuild the shortlist around what was just said. **Show the movement**: who rose ↑, who dropped ↓, and why, in one line each. The before/after is the visible proof the agent listened.

### 05 · Remember — memory, on screen
Distill the feedback into **one memory line** (e.g. *"Prefer hands-on sales experience over management titles, shortlist max 5"*), write it via the `self-improve` format into `memory/`, and **show the file on screen**. Close with the message: *this line was not typed by anyone — the next screening starts from here.*

## Staging notes

- **Optional but strong opener**: before beat 01, write the five-beat flow to `agent-flow.mmd` (repo root, Mermaid, shape in `agent-flow.example.mmd`) and put **http://localhost:3000/flow** on the projector, the audience sees the plan before you run it. In-app browser first: `preview_start` with `{url: "http://localhost:3000/flow"}` when the `mcp__Claude_Browser__*` tools are available, otherwise `open`/`Start-Process`/`xdg-open`.

- Timebox: ~10 minutes. Beat 1 is the slowest — announce it ("9 CVs against the offer, one pass, give me a minute") and let the table land all at once.
- The visual output is the agent's board: `projects/1-talent-cv-scoring/output/screener/index.html`, regenerated after each pass (same layout, so the room sees ranks move, not the design change). The `/talent` page in the web app remains the plan B render.
- Fallback if anything misbehaves: the 3 markdown benchmarks (`candidate-*.md`) keep the flow alive — but never place them in the ranked shortlist.
- Log the run (`npm run log:run -- 1-talent-cv-scoring …`) so "Recent runs" has a first entry.
- Keep one line of vigilance in the shortlist (bias, human decision) — production thinking, voiced, not lectured.
- To prove the loop next time: re-run beat 1 in a later session — it must start from the memory line and say so.
