# CLAUDE.md — Lab 3, AI Agents Tech

This repository is a **starter for a hands-on lab** (45 min theory · 2h15 build), co-run by the lab team. A participant (a Capgemini executive, possibly non-technical) will work with you to **design, build, run and showcase their own agent**. Optimize for *finished and reliable*, not *clever and incomplete*.

## Your operating principles here

1. **Finish over impress.** Scope every step so the project is demoable within the time budget. If something risks blowing the budget, propose the 80/20 version first.
2. **Production thinking, not "vibe coding".** Narrate the reflexes that matter: where does the data come from, what could leak, what breaks in production, what are the limits. Keep it light — voice-over, not a lecture.
3. **Public data only by default.** Unless the participant explicitly provides internal Capgemini data, use the provided proxy data or public sources. Never invent confidential-looking data.
4. **You carry the tooling.** The participant answers business questions; you make every technical decision (tools, files, formats) without exposing them to it.
5. **Close the loop, every time.** After any agent or skill produces a deliverable, apply the `self-improve` skill: ask 2 short questions, save the learnings to `memory/`. This is the lab's core lesson made visible.

## The lab flow — where you fit at each step

The conceptual spine is **"an agent is a new hire"** (instructions = rulebook, tools = accesses, memory = experience, skills = training — full mapping in `docs/good-practices.md`).

1. **Theory** *(instructor)* — the new-hire metaphor; the memory × skill demo lives in `demos/`.
2. **Design** — the participant describes the agent they want. Use the **`agent-builder`** skill: a short guided interview, one question at a time. **No idea at all?** Use the **`quick-start`** skill: three business questions, then you generate every output for them (press release, briefing, deck) — zero technical vocabulary.
3. **Create** — generate the agent as a markdown file in **`.claude/agents/<name>.md`** (agent-builder does this; template inside it).
4. **Run & iterate** — invoke the agent on real tasks. After every run: **`self-improve`** → record learnings in `memory/` → visibly apply them on the next run ("scoring CRM higher this time, as you asked").
5. **Showcase** — use the **`showcase`** skill to turn the agent's outputs into a polished, Capgemini-branded web page (`frontend-design` + `capgemini-brand`) for the final demo.

## Pre-defined agents (`.claude/agents/`) — the fallback choice

- **`press-release`** — produces a high-quality press release from competitor information (web search / `npm run fetch:news`), following `capgemini-brand`.
- **`deck-maker`** — builds a professional PowerPoint from notes, a topic, or another agent's output (`deck-builder` + `capgemini-brand`; rendered via `npm run build:deck`).

Both read `memory/MEMORY.md` on start and end each run with 2 improvement questions. Participant agents built with `agent-builder` follow the same shape.

## Skills available (`.claude/skills/`)

**Lab-flow skills:**

- `agent-builder` — guided interview → generates the participant's agent file in `.claude/agents/`.
- `quick-start` — for participants with no idea: 3 business questions → all outputs generated (press release, briefing, deck), no technical vocabulary.
- `self-improve` — after every run: 2 feedback questions → learnings written to `memory/`.
- `showcase` — end-of-lab demo frontend from the agent's outputs (**requires** `frontend-design` + `capgemini-brand`).
- `capgemini-brand` — editorial voice + visual identity for anything client-facing (press release, deck, web).
- `test-repo` — verify the whole environment works (`npm test`), cross-platform macOS/Windows, with per-OS fix commands.
- `kick-off` — install all dependencies and launch the local web app (`npm run web:dev`).
- `cv-demo` — **instructor-only**: the scripted live CV-scoring demo (screen → shortlist → voice feedback → re-rank → memory written on screen).

**Craft skills:**

- `cv-scoring` — structured scoring grid + ranking output.
- `press-synthesis` — turn raw news items into an executive briefing.
- `deck-builder` — write a JSON deck spec, render a themed .pptx.
- `frontend-design` — production-grade, non-generic UI. Vendored from Anthropic's official plugin (Apache-2.0).
- `pdf-reading` — read/extract text from any PDF on-device, standalone via `npm run read:pdf`.
- `nda-analysis` — review an NDA/contract, cross-check company memory. Powers the memory demo in `demos/`.
- `brainstorming` — one-question dialogue to firm up a fuzzy idea. Vendored & trimmed from superpowers.
- `teach` — quiz the user, build lessons. **Invoke by name** (`/teach <topic>`). Vendored from Matt Pocock.

All skills are bundled in this repo — no marketplace or plugin install needed.

## Long-term memory (`memory/`)

`memory/MEMORY.md` is the index; one file per learning (format in the `self-improve` skill). Agents read it during onboarding. It starts empty on purpose — watching it grow is the demo of "experience". Never store personal or confidential data there.

## Data & projects (`projects/`)

Project folders hold the **data and briefs** behind the pre-defined agents, plus a third use case:

- **`1-talent-cv-scoring`** — CV bank (116 anonymized sales PDFs + 3 markdown smoke-test CVs `candidate-*.md`) and the sales job offer. Data for a **custom** CV-scoring agent (via `agent-builder` + the `cv-scoring` skill) — not part of the quick-start path.
- **`2-radar-press-synthesis`** — themes + news tooling; its `output/` hosts briefings and press releases. Feeds `press-release`.
- **`3-deck-pptx-creation`** — deck rendering + Capgemini brand tokens (`brand/capgemini-brand.md`). Feeds `deck-maker`.

## Demos (instructor-only)

- **CV demo** — the headline live demo ("One agent sorts 20 CVs, then remembers you"). Run it with the **`cv-demo`** skill: screen 20 CVs in one pass → argue a top-5 → spoken feedback → re-rank → **write the learning to `memory/` on screen**. The CV data (`projects/1-talent-cv-scoring/`) exists for this demo; participants don't build on it.
- **Memory × skill crossover** (`demos/`): review `demos/nda-review/contracts/sample-nda.md` with `nda-analysis` — it catches a deal-breaker (data routed through Google Cloud) **only because it reads the memory** (`memory/it-stack.md`, "Microsoft/Azure only"). Same skill, no memory → it sails through. Experience changes judgment.

## Front-end (`web/`)

A minimal Next.js app renders each project's `output/`. Run `npm run web:dev` → http://localhost:3000. It's deliberately plain — upgrading it with `showcase` at the end of the lab is a demo moment, not a gap.

## Tooling

- **Environment check:** `npm test` (see `test-repo` skill) — run it if anything seems broken.
- **News freshness:** `npm run fetch:news -- "<query>"` (Tavily / NewsAPI, keys in `.env`; explains what's missing if no key). Prefer your own web search when faster.
- **Deck rendering:** `npm run build:deck -- <deck.json> [out.pptx]` — you write the JSON spec, the script renders the house theme.
- **PDF reading:** `npm run read:pdf -- <file.pdf>` — pure JS, offline. For a live CV demo, sample ~8–10 rather than all 116.

## Output conventions

- Write agent outputs (briefings, scorecards, press releases) into the relevant project's `output/` folder as Markdown, so the web app renders them.
- **Log each run:** `npm run log:run -- <project> "<result>" --input "<what>" --output "<rel path>"` → `projects/<project>/runs.json` (gitignored; `runs.example.json` shows the shape). The web app surfaces these as "Recent runs". Name the moment you'd graduate from a flat log to a database.
- Keep outputs in **English** (the lab is run in English).
