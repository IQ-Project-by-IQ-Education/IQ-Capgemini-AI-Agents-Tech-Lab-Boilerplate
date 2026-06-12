# Radar — Press synthesis ⭐ *safety net*

**Goal:** generate a dated executive briefing of business & tech news, filtered on chosen themes.

**Time-boxed target (2h15):** a live "press briefing of the day" in executive format, fully sourced.

> ⭐ **Safety-net project** — fully demoable with public data, no internal Capgemini data needed.

## What's provided

- `themes.example.md` — sample theme filters to start from.
- Skill: [`press-synthesis`](../../.claude/skills/press-synthesis/SKILL.md).
- Helper: `npm run fetch:news -- "<query>"` (Tavily / NewsAPI).

## 80/20 path

1. Open Claude Code. Tell it: *"Build the Radar press-synthesis project. Read the project README and use the press-synthesis skill."*
2. Pick your **themes** (edit `themes.example.md` → `themes.md`), e.g. *GenAI, enterprise IT, regulation, deals*.
3. Ask Claude to gather fresh news (via `fetch:news` or its own web search) and **synthesize** a briefing into `output/briefing-<date>.md`.
4. Read it together; tighten the TL;DR to the 3 things that matter.

## Demo angle

Today's press briefing, generated **live** on screen — immediate and visual.

## Stretch (only if finished)

- Schedule it: adapt [`n8n/`](../../n8n) so the briefing is generated every morning automatically.
- Add a second language version of the TL;DR.

## Watch out

- Freshness ≠ truth. Flag single-source claims; always link sources.
- State the window and sources so the gaps are visible.
