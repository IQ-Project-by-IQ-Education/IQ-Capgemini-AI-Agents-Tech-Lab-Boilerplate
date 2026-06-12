# CVs Bank

A database of **116 public, anonymized CVs in PDF** — the main data source for the Talent CV-scoring project.

## Provenance & data handling (for IT / DSI review)

- **Source:** a public, widely-used résumé dataset (the kind published on open data platforms for ML benchmarking). **Not** Capgemini data, and **not** candidate data collected for this workshop.
- **Anonymized:** names, employers, cities and contact details are redacted/replaced with placeholders (e.g. *"Company Name"*, *"City, State"*). No emails, phone numbers, or candidate names.
- **Purpose:** a realistic stand-in so participants can demo CV scoring without touching any real or internal candidate data.
- Treat them as a **demonstration dataset only** — no real hiring decision rides on them, and don't add real candidate data you're not authorized to use.

## Usage

Claude Code can read the PDFs directly:

- **Don't score all 116 live** — pick a sample of ~8–10 for the on-screen demo.
- Use the full bank for the *batch processing* story (described off-stage, not scored live).

See the [`cv-scoring` skill](../../../.claude/skills/cv-scoring/SKILL.md) for the scoring method and the fairness/vigilance reflexes.
