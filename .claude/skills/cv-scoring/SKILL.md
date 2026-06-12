---
name: cv-scoring
description: Use when scoring or ranking CVs/resumes against a job description. Produces a structured, criteria-based scorecard and a defensible ranking with vigilance points.
---

# CV scoring

Score candidates against a job description **transparently** — every score is justified, biases are flagged, and the ranking is reproducible.

## Method

1. **Extract the grid first.** From the job description, derive 4–6 weighted criteria (e.g. *relevant experience*, *technical fit*, *domain knowledge*, *seniority*, *language/location*). If the participant has a real evaluation grid, use theirs.
2. **Score each CV per criterion** on a 1–5 scale, with a one-line justification grounded in the CV text. Never score a criterion the CV doesn't support — mark it as *unknown* instead of guessing.
3. **Compute a weighted total** and rank candidates.
4. **Surface vigilance points**: gaps, inconsistencies, claims that need verification, and anything that could bias the score (name, gender, age, school prestige). Recommend a human review before any decision.

## Output format

```markdown
## Shortlist — <job title>

### Criteria & weights
| Criterion | Weight |
| --- | --- |
| ... | ... |

### Scorecard
| Candidate | C1 | C2 | C3 | ... | Weighted total | Rank |
| --- | --- | --- | --- | --- | --- | --- |

### Per-candidate notes
**Candidate A** — score rationale, strengths, gaps, vigilance points.

### Vigilance & fairness
- Bias risks observed and how they were handled.
- What a human reviewer must verify before any decision.
```

## Limits to state out loud

- This is **decision support, not a hiring decision.** A human owns the call.
- Models can absorb bias from the CV text — flag it, don't hide it.
- Scores are only as good as the grid; make the grid explicit.
