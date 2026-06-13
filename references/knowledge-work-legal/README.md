# knowledge-work — legal (vendored reference)

Prose copied from the **`legal`** plugin of Anthropic's
[knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) repo
(Apache-2.0), fetched 2026-06-13.

## What's here

- [triage-nda.SKILL.md](triage-nda.SKILL.md) — rapid NDA pre-screen → GREEN / YELLOW / RED routing.
- [review-contract.SKILL.md](review-contract.SKILL.md) — clause-by-clause review against a playbook, with redlines.
- [legal-risk-assessment.SKILL.md](legal-risk-assessment.SKILL.md) — severity × likelihood risk framework.

## Important — connectors are NOT wired

The original plugin connects to Slack, Box, Egnyte, Jira, and Microsoft 365 through a
`.mcp.json` and a `CONNECTORS.md`. **None of that is included here.** These files are kept
as *reference prose only*. They are the basis for this repo's own
[`nda-analysis`](../../.claude/skills/nda-analysis/SKILL.md) skill, which works on **local
files** (no connectors) and cross-checks the demo company memory.

This is not legal advice. Any real contract decision needs qualified counsel.
