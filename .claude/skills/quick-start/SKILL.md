---
name: quick-start
description: Use when the participant has no idea what to build, doesn't know what to do, hesitates, or asks for the quick start / "do it for me" — four simple questions, then every lab output (CV shortlist, press release, news briefing, deck) is generated for them.
---

# Quick start — no idea? Four questions, everything generated

For participants with **no use case in mind**. You ask four business questions, then you do all the work: run the agents and skills, produce every output, and show them on screen. **Zero technical vocabulary with the participant** — no file paths, no commands, no skill names, no JSON. You translate everything into plain language.

## Step 1 — Four questions (one at a time, plain language)

Ask them conversationally, one per message. If the participant hesitates on any of them, propose the default and move on — this must feel effortless.

1. **CVs** — "We have a bank of sales CVs and a Sales Account Executive job offer ready. When you picture a great sales hire, what matters most to you?" *(their answer weights the scoring criteria; default: a balanced grid)*
2. **Press release** — "Pick a competitor or market move you'd like Capgemini to react to — any recent announcement that caught your eye?" *(default: a recent AI announcement from a major tech player, found via web search)*
3. **Topics** — "Which topics should your news radar watch?" *(default: GenAI and enterprise IT)*
4. **Deck** — "The final deck: should it tell the story of everything your agents produced this morning, or go deep on one result?" *(default: the story of everything)*

Never ask more than these four. Never ask how, only what.

## Step 2 — Generate everything

Do all of this yourself, announcing each result in one plain sentence ("Your shortlist is ready — 8 CVs scored and ranked…"). Technical steps stay invisible.

1. **CV shortlist** — run the `cv-scorer` agent with their answer-1 emphasis → scorecard in `projects/1-talent-cv-scoring/output/`.
2. **News briefing** — `press-synthesis` skill on their answer-3 topics (web search or `npm run fetch:news`) → `projects/2-radar-press-synthesis/output/briefing-<date>.md`.
3. **Press release** — run the `press-release` agent on their answer-2 move → `projects/2-radar-press-synthesis/output/`.
4. **Deck** — `deck-builder` skill, 6–8 slides telling the answer-4 story, fed by the outputs above → rendered `.pptx` in `projects/3-deck-pptx-creation/output/`.
5. Log every run with `npm run log:run` so "Recent runs" fills up on screen.

Time-boxed: deliver in this order and stop cleanly when time runs out — each output stands alone.

## Step 3 — Show and close the loop

1. Open (or point to) **http://localhost:3000** — every card now has content. That's the moment.
2. Apply the `self-improve` skill: 2 short questions, learnings saved to memory.
3. Offer the natural next step: *"Want to turn one of these into your own agent?"* → `agent-builder`.

## Rules

- The participant never sees paths, commands, or internals — only questions, results, and the web page.
- Defaults are first-class: accepting all four defaults must still produce a great demo.
- Outputs in English (lab rule); converse in the participant's language.
