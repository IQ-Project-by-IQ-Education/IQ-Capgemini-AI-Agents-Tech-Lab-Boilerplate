<!--
  VENDORED REFERENCE (prose only) — NOT an installed skill in this repo.
  Source : github.com/anthropics/knowledge-work-plugins — legal/skills/triage-nda/SKILL.md
  Author : Anthropic · Licence: Apache-2.0 · Fetched: 2026-06-13
  Note   : The original plugin wired MCP connectors (Slack/Box/Egnyte/Jira/M365) via a
           CONNECTORS.md that is NOT included here. This file is kept as reference material
           that our local `nda-analysis` skill (.claude/skills/nda-analysis/) is based on.
-->

# triage-nda — NDA Pre-Screening

Rapidly triage incoming NDAs against standard screening criteria. Classify the NDA for routing: standard approval, counsel review, or full legal review.

**Important**: This assists with legal workflows but does not provide legal advice. All analysis should be reviewed by qualified legal professionals before being relied upon.

## Workflow

### Step 1: Accept the NDA
Accept the NDA in any format (file upload, URL, or pasted text). If none is provided, prompt the user to supply one.

### Step 2: Load NDA Playbook
Look for NDA screening criteria in local settings (e.g. a company playbook / memory). The playbook should define mutual vs. unilateral requirements, acceptable term lengths, required carveouts, prohibited provisions, and organization-specific requirements.

**If no playbook is configured**, proceed with market-standard defaults and say so clearly:
- Mutual obligations required (unless the organization is only disclosing)
- Term: 2–3 years standard, up to 5 years for trade secrets
- Standard carveouts required: independently developed, publicly available, rightfully received from third party, required by law
- No non-solicitation or non-compete provisions
- No residuals clause (or narrowly scoped if present)
- Governing law in a reasonable commercial jurisdiction

### Step 3: Quick Screen
Evaluate systematically against: agreement structure (mutual/unilateral, standalone), definition of confidential information (reasonable scope, exclusions), obligations of the receiving party (standard of care, use/disclosure restrictions), standard carveouts (public knowledge, prior possession, independent development, third-party receipt, legal compulsion), permitted disclosures (employees, contractors, affiliates, legal), term and duration (not perpetual), return/destruction (with retention exception), remedies (no liquidated damages), problematic provisions to flag (no non-solicit / non-compete / exclusivity / standstill / hidden IP grant / audit rights), and governing law / jurisdiction.

### Step 4: Classify
- **GREEN — Standard Approval**: mutual (or correctly unilateral), all standard carveouts present, term in range, no non-solicit/non-compete/exclusivity, narrow or no residuals, reasonable jurisdiction, standard remedies. → Approve via standard delegation; no counsel review.
- **YELLOW — Counsel Review Needed**: outside the standard position but within a negotiable range (e.g. broader-than-preferred definition, longer-but-market term, one missing easy carveout, non-preferred jurisdiction, minor asymmetry). → Flag specific issues; counsel likely resolves in one pass.
- **RED — Significant Issues**: unilateral when mutual required, missing critical carveouts, non-solicit/non-compete embedded, exclusivity/standstill without context, unreasonable term (10+ yrs / perpetual), overbroad definition, broad residuals, hidden IP assignment/licence, liquidated damages, unfavorable jurisdiction with mandatory arbitration, or the document is not actually an NDA. → Do not sign; full legal review, negotiate or counter.

### Step 5: Generate Triage Report
Output a structured report: classification, parties, type, term, governing law, review basis; a screening-results table (criterion / PASS-FLAG-FAIL / notes); an issues-found section (what / risk / suggested fix per issue); a recommendation; and next steps.

### Step 6: Routing Suggestion
| Classification | Recommended Action | Typical Timeline |
|---|---|---|
| GREEN | Approve and route for signature per delegation of authority | Same day |
| YELLOW | Send to designated reviewer with specific issues flagged | 1–2 business days |
| RED | Engage counsel for full review; prepare counterproposal | 3–5 business days |

## Common NDA Issues and Standard Positions
- **Overbroad definition of confidential information** → narrow to information marked/identified as confidential or reasonably understood to be.
- **Missing independent-development carveout** → add it; without it, internally-developed products could be claimed as derived.
- **Non-solicitation of employees** → does not belong in an NDA; delete (or narrowly limit + short term).
- **Broad residuals clause** → resist; if required, limit to unaided memory, exclude trade secrets/patents, grant no IP licence.
- **Perpetual confidentiality** → replace with a 2–5 year term (trade secrets may warrant longer).

## Notes
- If a document labeled an NDA contains substantive commercial terms, flag RED and recommend full contract review.
- For an NDA inside a larger agreement (e.g. an MSA confidentiality section), note the broader context affects the analysis.
- Always note this is a screening tool; counsel should review anything uncertain.
