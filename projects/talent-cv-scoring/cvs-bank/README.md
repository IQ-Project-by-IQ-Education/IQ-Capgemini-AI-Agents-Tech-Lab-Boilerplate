# CVs Bank

A database of **116 public, anonymized CVs in PDF** — the main data source for the Talent CV-scoring project.

## Usage

These are proxy CVs for the lab (public/anonymized). Claude Code can read the PDFs directly:

- **Don't score all 116 live** — pick a sample of ~8–10 for the on-screen demo.
- Use the full bank for the *batch / routine* story (see [`n8n/`](../../../n8n)).

## Source & data handling

Public, anonymized resumes used as a stand-in for real candidate data. Treat them as a demonstration dataset:
- No real hiring decisions ride on these.
- Don't add real candidate data you're not authorized to use.

See the [`cv-scoring` skill](../../../.claude/skills/cv-scoring/SKILL.md) for the scoring method and the fairness/vigilance reflexes.
