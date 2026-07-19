---
name: showcase
description: Use at the end of the lab, when the participant wants to present their agent's results — "build the frontend", "prepare my demo", "showcase my agent's output". Turns the agent's outputs into a polished, Capgemini-branded web page for the final demo.
---

# Showcase — the demo frontend

The last lab step: a **frontend that presents the participant's agent output** for the end-of-lab demo. What's on screen is the agent's *deliverable* — the frontend is the stage, not the star.

**REQUIRED SUB-SKILLS:** `frontend-design` (craft) + `capgemini-brand` (colors, type, editorial voice). Read both before writing any UI code.

## Process

1. **Inventory the story.** List what the agent produced in `projects/*/output/` and `runs.json`. Pick with the participant the 1–2 outputs that carry the demo (the shortlist, the press release…).
2. **Choose the surface.** Default: upgrade the existing Next.js app (`web/`) — the route that renders the agent's project output (`web/app/talent`, `web/app/radar`, `web/app/deck`), or a new route for a custom agent. If `agent-builder` already created a dedicated route for this agent (Step 8), upgrade that route and keep its validated design direction (see the agent file's "Presentation" section). It already reads `output/*.md`; keep that mechanism, redesign the presentation.
3. **Design & build** with `frontend-design`, constrained by `capgemini-brand`:
   - the deliverable's content is the hero — typography does the heavy lifting;
   - show the *agent* story too: a "Recent runs" strip (from `runs.json`) and, if there are memory entries, a small "What this agent has learned" panel — that's the wow moment;
   - blues carry hierarchy, max 3 brand colors, generous white space.
4. **Verify like production**: `npm test` still passes, `npm run web:dev` → check the page at http://localhost:3000, then rehearse the 60-second demo path with the participant.
5. **Close the loop**: run the `self-improve` skill on the showcase itself.

## Watch out

- Time-boxed: a polished single page beats three rough ones. No new frameworks, no component libraries — plain Next.js + CSS is enough.
- Don't invent content to fill the page; if the output is thin, re-run the agent, not the CSS.
- Keep the page working offline (local files only) — the demo room's network is not guaranteed.
