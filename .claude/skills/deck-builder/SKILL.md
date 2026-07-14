---
name: deck-builder
description: Use when creating a professional PowerPoint (.pptx) deck. Separates content (a JSON deck spec you write) from rendering (a themed generator script), producing a clean, consistent, executive-ready presentation.
---

# Deck builder (professional PPTX)

Produce a **presentable .pptx** by writing the *story* as a structured spec and letting the renderer guarantee the *design*. You own the narrative; the house theme stays consistent.

## Method

1. **Pin the brief.** Audience, goal, and length (executive decks: 6–12 slides). Lead with the "so what".
2. **Write the deck spec** as JSON at `output/<name>.deck.json` following the schema below. Keep bullets short (max ~12 words), one idea per bullet, 3–6 bullets per slide.
3. **Render it:** `npm run build:deck -- projects/3-deck-pptx-creation/output/<name>.deck.json`
4. **Review on screen**, iterate on the JSON (not the rendered file), re-render. The JSON is the source of truth.

## Deck spec schema

```json
{
  "title": "Deck title",
  "subtitle": "One-line framing",
  "author": "Name / team",
  "theme": "capgemini",
  "slides": [
    { "type": "title", "title": "...", "subtitle": "..." },
    { "type": "section", "title": "Part 1 — ..." },
    { "type": "bullets", "title": "Slide title", "bullets": ["...", "..."] },
    { "type": "two-column", "title": "...", "leftTitle": "Before", "left": ["..."], "rightTitle": "After", "right": ["..."] },
    { "type": "quote", "text": "...", "attribution": "..." },
    { "type": "closing", "title": "...", "subtitle": "..." }
  ]
}
```

Slide types: `title`, `section`, `bullets`, `two-column`, `quote`, `closing`. Start with `title`, use `section` dividers for structure, end with `closing`.

The optional **`theme`** field (top level) brands the deck. It is either a **preset name**
(string) or an **inline object** that overrides only the tokens you name:

```json
"theme": "capgemini"
"theme": { "accent": "12ABDB", "font": "Verdana" }
```

Omit it for the default house theme. Built-in presets: `capgemini`. Override-able tokens:
`accent`, `ink`, `white`, `light`, `font` (plus `muted`).

## House style (enforced by the renderer)

- Default theme: deep-ink cover/closing, accent blue, clean white content slides, 16:9.
- You don't set positions — focus on words. The renderer handles layout. Colors/font come
  from the default house theme unless the spec sets `theme`.

## Capgemini branding

For a Capgemini-branded deck, set `"theme": "capgemini"` in the spec — the renderer then
applies the brand tokens from
`projects/3-deck-pptx-creation/brand/capgemini-brand.md` (palette: Capgemini Blue
`#0070AD`, Vibrant Blue `#12ABDB`; font: Verdana as the Ubuntu-compatible fallback).
Those tokens are transcribed from Capgemini's official 2017 brand guidelines. (The
full brand PDF isn't bundled; the tokens are what the renderer needs. If a participant
provides the PDF, read it with `npm run read:pdf` for logo rules, shapes, or detail.)

## Limits to state out loud

- Great design can't save a weak story — get the narrative right first.
- The renderer supports the slide types above; if you need charts/images, say so and adapt rather than hand-editing the .pptx.
- The .pptx is generated output — edit the JSON spec and re-render, don't hand-patch the file.

## After every run

Apply the `self-improve` skill: ask the participant 2 short questions about this run and save the learnings to `memory/` — the next run must start smarter.
