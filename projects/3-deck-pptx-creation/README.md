# Deck — Professional PPTX creation

**Goal:** turn raw content (notes, a brief, or the output of another agent) into a clean, executive-ready PowerPoint deck.

**Time-boxed target (2h15):** a polished 6–12 slide .pptx generated live, with a consistent house theme.

## What's provided

- `sample.deck.json` — a ready-to-render example spec.
- Skill: [`deck-builder`](../../.claude/skills/deck-builder/SKILL.md).
- Renderer: `npm run build:deck -- <deck.json>` (uses `pptxgenjs`). Generated decks land in `output/`.
- **Capgemini branding:** [`brand/capgemini-brand.md`](brand/capgemini-brand.md) — the brand palette & fonts (Capgemini Blue `#0070AD`, Vibrant Blue `#12ABDB`, Verdana), transcribed from Capgemini's official 2017 brand guidelines. *(The full 45 MB brand PDF is not bundled — these tokens are what the deck theme needs.)* To brand a deck, add `"theme": "capgemini"` to its JSON spec (see the deck-builder skill); omit it for the default house theme.

## 80/20 path

1. Open Claude Code. Tell it: *"Build the Deck PPTX project. Read the project README and use the deck-builder skill."*
2. Give it your content — paste notes, point it at a brief, or feed it a briefing produced by the **Radar** or **Talent** project.
3. Ask Claude to write a **deck spec** (`<name>.deck.json`) — story first, short bullets.
4. Render it: `npm run build:deck -- projects/3-deck-pptx-creation/<name>.deck.json projects/3-deck-pptx-creation/output/<name>.pptx`
5. Open the `.pptx`, review, iterate on the **JSON** (not the file), re-render.

Try the sample first to confirm rendering works:

```bash
npm install
npm run build:deck -- projects/3-deck-pptx-creation/sample.deck.json projects/3-deck-pptx-creation/output/sample.pptx
```

## Demo angle

Raw notes → a professional deck on screen in one step. Bonus: **chain it** — generate a Radar briefing or a Talent shortlist, then turn it into a deck.

## Stretch (only if finished)

- Chain from another project's `output/` automatically.
- Add a "before / after" two-column slide that tells the transformation story.

## Watch out

- The deck is **generated output** — edit the JSON spec and re-render; don't hand-patch the `.pptx`.
- Design can't rescue a weak story. Nail the narrative and the "so what" first.
