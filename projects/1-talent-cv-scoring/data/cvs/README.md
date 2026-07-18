# CVs Bank

A database of **116 public, anonymized CVs in PDF** — the main data source for the Talent CV-scoring project. Alongside the PDFs: **9 curated named demo CVs** (`cv-*.md`, pool CVs cleaned and given generic fictional names for the live demo — each records its anonymized source id) and **3 markdown benchmarks** (`candidate-*.md`, archetype illustrations, never shortlisted).

## Provenance & data handling (for IT / DSI review)

- **Source:** a public, widely-used résumé dataset (the kind published on open data platforms for ML benchmarking). **Not** Capgemini data, and **not** candidate data collected for this workshop.
- **Anonymized:** names, employers, cities and contact details are redacted/replaced with placeholders (e.g. *"Company Name"*, *"City, State"*). No emails, phone numbers, or candidate names.
- **Purpose:** a realistic stand-in so participants can demo CV scoring without touching any real or internal candidate data.
- Treat them as a **demonstration dataset only** — no real hiring decision rides on them, and don't add real candidate data you're not authorized to use.

## Usage

Read the PDFs on-device — natively, or with the bundled standalone extractor:

```bash
npm run read:pdf -- projects/1-talent-cv-scoring/data/cvs/10138632.pdf
```

- **Don't score all 116 live** — the on-screen demo screens the 9 curated `cv-*.md` (see the `cv-screener` agent).
- Use the full bank for the *batch processing* story (described off-stage, not scored live).

See the [`cv-scoring` skill](../../../../.claude/skills/cv-scoring/SKILL.md) for the scoring method and the [`pdf-reading` skill](../../../../.claude/skills/pdf-reading/SKILL.md) for reading the PDFs.
