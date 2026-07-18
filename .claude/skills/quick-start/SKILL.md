---
name: quick-start
description: Use when the participant has no idea what to build, doesn't know what to do, hesitates, or asks for the quick start / "do it for me" — three simple questions, then every lab output (press release, news briefing, deck) is generated for them.
---

# Quick start — no idea? Three questions, everything generated

For participants with **no use case in mind**. You ask three business questions, then you do all the work: run the agents and skills, produce every output, and show them on screen. **Zero technical vocabulary with the participant** — no file paths, no commands, no skill names, no JSON. You translate everything into plain language.

## Step 0 — Show the plan, right in the chat

After **each answer**, redraw the three-output pipeline as a compact ASCII flow directly in your message (code fence, max ~12 lines, `?` for the questions still unanswered) so the participant follows the plan without switching windows. Mirror the same flow to `agent-flow.mmd` at the repo root (Mermaid `flowchart TD`, shape in `agent-flow.example.mmd`, no commas inside `[...]` node labels): **http://localhost:3000/flow** redraws it within 2 seconds — and **open that page for them**, never just print a link: in-app browser first (`preview_start` with `{url: "http://localhost:3000/flow"}` when the `mcp__Claude_Browser__*` tools are available, `navigate` if the panel is already open), otherwise `open <url>` on macOS, `Start-Process <url>` on Windows, `xdg-open <url>` on Linux. **The `.mmd` Write is paired with every chat redraw, in the same turn, never one without the other** — a chat-only redraw leaves the projector frozen on a stale diagram.

## Step 1 — Three questions (one at a time, plain language)

Ask them conversationally, one per message. If the participant hesitates on any of them, propose the default and move on — this must feel effortless.

1. **Press release** — "Pick a competitor or market move you'd like Capgemini to react to — any recent announcement that caught your eye?" *(default: a recent AI announcement from a major tech player, found via web search)*
2. **Topics** — "Which topics should your news radar watch?" *(default: GenAI and enterprise IT)*
3. **Deck** — "The final deck: should it tell the story of everything your agents produced this morning, or go deep on one result?" *(default: the story of everything)*

Never ask more than these three. Never ask how, only what.

## Step 2 — Generate everything

Do all of this yourself, announcing each result in one plain sentence ("Your briefing is ready — 5 themes, fully sourced…"). Technical steps stay invisible.

1. **News briefing** — `press-synthesis` skill on their answer-2 topics (web search or `npm run fetch:news`) → `projects/2-radar-press-synthesis/output/briefing-<date>.md`.
2. **Press release** — run the `press-release` agent on their answer-1 move → `projects/2-radar-press-synthesis/output/`.
3. **Deck** — run the `deck-maker` agent: 6–8 slides telling the answer-3 story, fed by the outputs above → rendered `.pptx` in `projects/3-deck-pptx-creation/output/`.
4. Log every run with `npm run log:run` so "Recent runs" fills up on screen.

Time-boxed: deliver in this order and stop cleanly when time runs out — each output stands alone.

## Step 3 — Show and close the loop

1. Open (or point to) **http://localhost:3000** — the cards now have content. That's the moment.
2. Apply the `self-improve` skill: 2 short questions, learnings saved to memory.
3. Offer the natural next step: *"Want to turn one of these into your own agent?"* → `agent-builder`.

## Rules

- The participant never sees paths, commands, or internals — only questions, results, and the web page.
- Defaults are first-class: accepting all three defaults must still produce a great demo.
- Outputs in English (lab rule); converse in the participant's language.
