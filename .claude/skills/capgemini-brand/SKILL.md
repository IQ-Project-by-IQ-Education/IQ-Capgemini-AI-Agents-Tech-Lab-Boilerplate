---
name: capgemini-brand
description: Use when producing any deliverable that represents Capgemini or will be shown at the demo — press release, deck, frontend/showcase page, executive briefing, or any client-facing text or visual. Defines the editorial voice and the visual identity to apply.
---

# Capgemini brand — editorial & visual guidelines

Working guidelines for the lab, based on Capgemini's official brand book (**2017 — Version 1.0**, tokens in [`projects/3-deck-pptx-creation/brand/capgemini-brand.md`](../../../projects/3-deck-pptx-creation/brand/capgemini-brand.md)). Confirm against current brand assets before any external-facing use.

## Editorial voice

- **Confident, not boastful.** State what is done and proven; cut superlatives ("world-leading", "revolutionary") and filler ("we are thrilled/excited to announce").
- **Human and concrete.** Lead with the client/user outcome, not the technology. One idea per sentence; active voice; short sentences.
- **Optimistic and forward-looking** — the brand promise is *"Get the future you want"*: frame change as opportunity, grounded in evidence.
- **Precise.** Numbers over adjectives. Every external claim carries a source; unverified facts are labeled as such.
- Deliverables are in **English** (the lab language). Jargon only if the audience is technical.

## Visual identity

**Colors** — lead with the two primary blues; max 3 brand colors per layout; generous white space:

| Role | Token |
| --- | --- |
| Primary / headers / cover backgrounds | Capgemini Blue `#0070AD` |
| Accent / highlights / links | Vibrant Blue `#12ABDB` |
| Dark backgrounds / body text on light | Deep Purple `#2B0A3D` |
| Alert or hot accent (sparingly, never behind a logo) | Tech Red `#FF304C` |
| Positive accent (sparingly) | Zest Green `#95E616` |
| Panels / neutral background | Gray `#ECECEC` on White |

**Typography** — brand typeface **Ubuntu** (Light/Regular/Medium/Bold, slightly negative tracking). Fallbacks: **Verdana** for generated `.pptx` (renders everywhere), `Ubuntu, Verdana, sans-serif` stack for web.

## Per-deliverable rules

- **Press release** — follow the structure in the `press-release` agent; the voice rules above override any generic PR style.
- **Deck (.pptx)** — the `deck-builder` skill + `scripts/build-deck.ts` already apply the house theme; don't restyle by hand.
- **Web / showcase** — use with the `frontend-design` skill: this file decides *colors, type, voice*; frontend-design decides *craft*. Dark-text-on-white default; blues carry the hierarchy; no color soup.

## Watch out

- Never fabricate Capgemini facts, offerings, or spokespeople — placeholders must be obviously placeholders.
- Max 3 brand colors per screen/slide is a hard rule; when in doubt, more white space.
