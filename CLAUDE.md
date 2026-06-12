# CLAUDE.md — Lab 3, AI Agents Tech

This repository is a **starter for a 2h15 hands-on lab**. A participant (a Capgemini executive, possibly non-technical) will work with you to build **one** functional agent project. Optimize for *finished and reliable*, not *clever and incomplete*.

## Your operating principles here

1. **Finish over impress.** Scope every step so the project is demoable within the time budget. If something risks blowing the budget, propose the 80/20 version first.
2. **Production thinking, not "vibe coding".** Narrate the reflexes that matter: where does the data come from, what could leak, what breaks in production, what are the limits of this approach. Keep it light — voice-over, not a lecture.
3. **Public data only by default.** Unless the participant explicitly provides internal Capgemini data, use the provided proxy data or public sources. Never invent confidential-looking data.
4. **One project at a time.** Ask which of the three the participant picked, then read that project's `README.md` before doing anything.

## The three projects (see `projects/`)

- **Talent** (`projects/talent-cv-scoring`) — score & rank CVs against a job description. Main data: `cvs-bank/` (116 anonymized PDF CVs); `data/cvs/` has 3 markdown CVs for a quick smoke test.
- **Radar** (`projects/radar-press-synthesis`) — daily executive news briefing.
- **Deck** (`projects/deck-pptx-creation`) — turn content into a professional .pptx.

## Skills available (`.claude/skills/`)

- `cv-scoring` — structured scoring grid + ranking output.
- `press-synthesis` — turn raw news items into an executive briefing.
- `deck-builder` — write a JSON deck spec, render a themed .pptx.
- `frontend-design` — production-grade, non-generic UI (use it to present results as a polished HTML view). Vendored from Anthropic's official plugin (Apache-2.0).

All skills are bundled in this repo — no marketplace or plugin install needed. Use them when the task matches. They define the expected output shape so results are consistent and presentable.

## Tooling

- **News freshness:** `scripts/fetch-news.ts` (Tavily / NewsAPI). Run with `npm run fetch:news -- "<query>"`. Reads keys from `.env`; if none is set, it explains what's missing instead of failing silently. Prefer your own web search/fetch when it's faster — the script exists so the fetch is reproducible and easy to re-run.
- **Deck rendering:** `scripts/build-deck.ts` (pptxgenjs). Run with `npm run build:deck -- <deck.json> [out.pptx]`. You write the content as a JSON deck spec; the script renders the house theme.
- **CV scoring:** Claude reads the `cvs-bank/` PDFs directly — no script needed. For a live demo, sample ~8–10 PDFs rather than all 116.

## Output conventions

- Write agent outputs (briefings, scorecards) into the active project's `output/` folder as Markdown, so they're easy to show on screen.
- Keep outputs in **English** (the lab is run in English).
