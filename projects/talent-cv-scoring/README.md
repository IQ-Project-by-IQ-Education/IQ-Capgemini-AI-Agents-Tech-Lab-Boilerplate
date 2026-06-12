# Talent — CV scoring

**Goal:** score and rank a set of CVs against a job description, with a defensible, criteria-based scorecard.

**Time-boxed target (2h15):** a live shortlist of scored & ranked CVs against one job description.

## What's provided

- **`cvs-bank/`** — a database of **116 real (public, anonymized) CVs in PDF** — the main data source.
- `data/jobs/` — sample job descriptions to score against.
- `data/cvs/` — 3 tiny markdown CVs for a quick smoke test before you tackle the bank.
- Skill: [`cv-scoring`](../../.claude/skills/cv-scoring/SKILL.md) — Claude Code uses it automatically.

## 80/20 path

1. Open Claude Code in this repo. Tell it: *"Build the Talent CV-scoring project. Read the project README and use the cv-scoring skill."*
2. Pick one job description from `data/jobs/`.
3. Ask Claude to **extract the scoring grid** from that job description and confirm the criteria/weights with you (this is the 80/20 lever — get the grid right).
4. **Start with a sample** of the bank — score ~8–10 CVs from `cvs-bank/` (don't try all 116 live), writing the scorecard to `output/`. Scale up once the grid is solid.
5. Review the **vigilance & fairness** section together — this is the part you demo.

> ⏱️ **Time tip:** 116 PDFs is a database, not a live demo. Score a curated sample on screen; mention the routine (n8n) as how you'd run the full bank off-stage.

## Demo angle

A shortlist of CVs scored and ranked **live** against a job description, with the reasoning visible per criterion.

## Stretch (only if finished)

- Score a **larger batch** from `cvs-bank/` and produce a ranked top-10 for one job.
- Wire a routine in [`n8n/`](../../n8n) so a new CV dropped in a folder gets auto-scored.
- Feed the shortlist into the **Deck** project to generate a hiring-readout deck.

## Watch out

- This supports a human decision; it does **not** make the hiring call. Keep the fairness/vigilance section front and center.
- The `cvs-bank/` PDFs are public/anonymized proxy data for the lab. If you bring your own candidate data, make sure you're allowed to use it.
