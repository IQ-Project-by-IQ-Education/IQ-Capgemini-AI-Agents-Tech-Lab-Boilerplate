# Demos — instructor-only

This folder holds material used **during the theory / live-demo part of the lab**, not by
participants in their own build. Keep it out of the participant project flow.

## How to run the memory × skill demo (slide: "why an agent needs memory")

Open **`demos/nda-review/`** in Claude Code (so the paths below resolve), then ask it to
review the sample contract with the `nda-analysis` skill. The point of the demo: the agent
catches a deal-breaker **only because it remembers a company rule** — the same skill on the
same contract would miss it without the memory.

## Standing rule for this folder

Before judging ANY contract or NDA in this folder, you MUST:

1. Read `./nda-review/memory/MEMORY.md` and every file it points to.
2. Cross-check the contract against those facts.
3. If the contract conflicts with a memory entry, that is a **high-severity flag** — say so
   plainly and explain which memory it violates.

This rule is also written into the `nda-analysis` skill itself — belt and suspenders, so the
crossover fires reliably on a live screen.
