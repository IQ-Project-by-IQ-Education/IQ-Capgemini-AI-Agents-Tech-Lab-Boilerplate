<!--
  VENDORED REFERENCE (prose only) — NOT an installed skill in this repo.
  Source : github.com/anthropics/knowledge-work-plugins — legal/skills/legal-risk-assessment/SKILL.md
  Author : Anthropic · Licence: Apache-2.0 · Fetched: 2026-06-13
  Note   : Kept as reference material behind our local `nda-analysis` skill — the
           severity × likelihood framing below is what `nda-analysis` uses to rate a flag.
-->

# legal-risk-assessment — Severity × Likelihood Framework

Evaluate, classify, and document legal risks using a structured framework based on severity and likelihood.

**Important**: This assists with legal workflows but does not provide legal advice. Assessments should be reviewed by qualified professionals and the framework customized to the organization's risk appetite.

## Severity × Likelihood Matrix

**Severity** (impact if it materializes): 1 Negligible · 2 Low (<1% of value) · 3 Moderate (1–5%) · 4 High (5–25%, likely public/regulatory attention) · 5 Critical (>25%, fundamental disruption, regulatory action, officer liability).

**Likelihood** (probability): 1 Remote · 2 Unlikely · 3 Possible · 4 Likely · 5 Almost Certain.

**Risk Score = Severity × Likelihood**

| Score | Risk Level | Color |
|---|---|---|
| 1–4 | Low | GREEN |
| 5–9 | Medium | YELLOW |
| 10–15 | High | ORANGE |
| 16–25 | Critical | RED |

## Classification → Recommended Action
- **GREEN (1–4)**: accept with standard controls, document in the risk register, monitor periodically. No escalation.
- **YELLOW (5–9)**: mitigate with specific controls, monitor actively, assign an owner, brief stakeholders, define escalation triggers.
- **ORANGE (10–15)**: escalate to senior counsel, build a mitigation plan, brief leadership, consider outside counsel, document a full risk memo, define a contingency plan.
- **RED (16–25)**: immediate escalation (GC / C-suite / Board), engage outside counsel, stand up a response team, consider insurance/regulatory notifications, preserve evidence (litigation hold), review daily.

## Risk Assessment Memo (format)
Date · Assessor · Matter · Privileged? → 1. Risk description · 2. Background/context · 3. Risk analysis (severity rating + rationale, likelihood rating + rationale, computed score & color) · 4. Contributing factors · 5. Mitigating factors · 6. Mitigation options table (option / effectiveness / cost / recommended?) · 7. Recommended approach · 8. Residual risk · 9. Monitoring plan · 10. Next steps (owner + deadline).

## When to Escalate to Outside Counsel
- **Mandatory**: active litigation; government investigation; criminal exposure; securities issues; board-level matters.
- **Strongly recommended**: novel legal issues; jurisdictional complexity; material financial exposure; specialized expertise needed; major regulatory changes; M&A.
- **Consider**: complex contract disputes; employment matters; data incidents; IP disputes; insurance-coverage disputes.
