# CLAUDE.md — Lab 3, AI Agents Tech

This repository is a **starter for a 2h15 hands-on lab**. A participant (a Capgemini executive, possibly non-technical) will work with you to build **one** functional agent project. Optimize for *finished and reliable*, not *clever and incomplete*.

## Your operating principles here

1. **Finish over impress.** Scope every step so the project is demoable within the time budget. If something risks blowing the budget, propose the 80/20 version first.
2. **Production thinking, not "vibe coding".** Narrate the reflexes that matter: where does the data come from, what could leak, what breaks in production, what are the limits of this approach. Keep it light — voice-over, not a lecture.
3. **Public data only by default.** Unless the participant explicitly provides internal Capgemini data, use the provided proxy data or public sources. Never invent confidential-looking data.
4. **One project at a time.** Ask which of the three the participant picked, then read that project's `README.md` before doing anything.

## The three projects (see `projects/`)

- **Talent** (`projects/1-talent-cv-scoring`) — score & rank CVs against a job description. Main data: `data/cvs/` — 116 anonymized PDF CVs (plus 3 markdown CVs, `candidate-*.md`, for a quick smoke test). Read PDFs with the `pdf-reading` skill / `npm run read:pdf`.
- **Radar** (`projects/2-radar-press-synthesis`) — daily executive news briefing.
- **Deck** (`projects/3-deck-pptx-creation`) — turn content into a professional .pptx.

## Skills available (`.claude/skills/`)

- `cv-scoring` — structured scoring grid + ranking output.
- `press-synthesis` — turn raw news items into an executive briefing.
- `deck-builder` — write a JSON deck spec, render a themed .pptx.
- `frontend-design` — production-grade, non-generic UI (use it to present results as a polished HTML view). Vendored from Anthropic's official plugin (Apache-2.0).
- `pdf-reading` — read/extract text from any PDF on-device (CVs, any reference doc), standalone via `npm run read:pdf`.
- `nda-analysis` — review an NDA/contract and **cross-check company memory** for conflicts, then write a one-page risk report. Powers the memory demo in `demos/`.
- `brainstorming` — turn a fuzzy idea into an agreed design through one-question dialogue *before* building. Vendored & trimmed from the superpowers plugin.
- `teach` — quiz the user and build lessons/diagrams. **Invoke by name** (`/teach <topic>`); it does not auto-trigger. Vendored from Matt Pocock's skills.

All skills are bundled in this repo — no marketplace or plugin install needed. Use them when the task matches. They define the expected output shape so results are consistent and presentable.

## Demos (instructor-only — `demos/`)

`demos/` holds material for the live theory demos, kept out of the participant project flow.
The headline one is the **memory × skill crossover**: open `demos/nda-review/` and review
`contracts/sample-nda.md` with the `nda-analysis` skill — it catches a deal-breaker (data
routed through Google Cloud) **only because it reads the company memory** (`memory/it-stack.md`,
"Microsoft/Azure only"). Same skill, same contract, no memory → it sails through. That gap is
the lesson: experience changes judgment.

## Front-end (`web/`)

A minimal Next.js app renders each project's `output/`. Run `npm run web:dev`. It's
deliberately plain — upgrading it live with `frontend-design` is a demo moment, not a gap.

## References (`references/`)

Vendored reading, not installed skills: `karpathy-CLAUDE.md` (a `CLAUDE.md` to steal from)
and `knowledge-work-legal/` (the Anthropic legal-skill prose behind `nda-analysis`).

## Tooling

- **News freshness:** `scripts/fetch-news.ts` (Tavily / NewsAPI). Run with `npm run fetch:news -- "<query>"`. Reads keys from `.env`; if none is set, it explains what's missing instead of failing silently. Prefer your own web search/fetch when it's faster — the script exists so the fetch is reproducible and easy to re-run.
- **Deck rendering:** `scripts/build-deck.ts` (pptxgenjs). Run with `npm run build:deck -- <deck.json> [out.pptx]`. You write the content as a JSON deck spec; the script renders the house theme.
- **PDF reading:** `scripts/read-pdf.mjs` (pdf.js, pure JS, no native deps). Run with `npm run read:pdf -- <file.pdf>`. Use it for CVs (`projects/1-talent-cv-scoring/data/cvs/*.pdf`) or any reference PDF a participant brings. Native PDF reading works too; the script is the standalone guarantee. For a live CV demo, sample ~8–10 rather than all 116.

## Output conventions

- Write agent outputs (briefings, scorecards) into the active project's `output/` folder as Markdown, so they're easy to show on screen.
- **Log each run.** After producing an output, append a one-line record to the project's local run-log: `npm run log:run -- <project> "<result>" --input "<what it was about>" --output "<rel path>"`. It writes `projects/<project>/runs.json` (created on first run; gitignored — the `runs.example.json` shows the shape). The `web/` app surfaces these as "Recent runs". This is the deliberately-simple "start with a file" version of memory — name the moment you'd graduate to a database (SQLite/FTS) once a flat log stops scaling.
- Keep outputs in **English** (the lab is run in English).
