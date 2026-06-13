<!--
  VENDORED REFERENCE (prose only) — NOT an installed skill in this repo.
  Source : github.com/anthropics/knowledge-work-plugins — legal/skills/review-contract/SKILL.md
  Author : Anthropic · Licence: Apache-2.0 · Fetched: 2026-06-13
  Note   : Connectors (CLM / Box / Egnyte / SharePoint via MCP) are NOT wired here.
           Kept as reference material behind our local `nda-analysis` skill.
-->

# review-contract — Contract Review Against a Playbook

Review a contract against your organization's negotiation playbook. Analyze each clause, flag deviations, generate redline suggestions, and provide business-impact analysis.

**Important**: This assists with legal workflows but does not provide legal advice. All analysis should be reviewed by qualified legal professionals.

## Workflow

### Step 1: Accept the Contract
File, URL, or pasted text. If none is provided, prompt for one.

### Step 2: Gather Context
Ask before reviewing: which side are you on (vendor/customer/licensor/licensee/partner)? deadline? specific focus areas? deal context (size, strategic importance, existing relationship)? Proceed with partial context and note assumptions.

### Step 3: Load the Playbook
Look for the org's playbook (standard positions, acceptable ranges, escalation triggers). If none is found, offer to set one up or proceed against generic commercial standards — and say which basis you used.

### Step 4: Clause-by-Clause Analysis
Identify the contract type and the user's side, **read the whole contract before flagging** (clauses interact), then analyze each material clause:

| Clause Category | Key Review Points |
|----------------|-------------------|
| Limitation of Liability | Cap amount, carveouts, mutual vs. unilateral, consequential damages |
| Indemnification | Scope, mutual vs. unilateral, cap, IP infringement, data breach |
| IP Ownership | Pre-existing IP, developed IP, work-for-hire, licence grants, assignment |
| Data Protection | DPA requirement, processing terms, sub-processors, breach notification, cross-border transfers |
| Confidentiality | Scope, term, carveouts, return/destruction |
| Reps & Warranties | Scope, disclaimers, survival period |
| Term & Termination | Duration, renewal, termination for convenience/cause, wind-down |
| Governing Law & Dispute Resolution | Jurisdiction, venue, arbitration vs. litigation |
| Insurance | Coverage requirements, minimums, evidence |
| Assignment | Consent, change of control, exceptions |
| Force Majeure | Scope, notification, termination rights |
| Payment Terms | Net terms, late fees, taxes, price escalation |

Detailed guidance exists for each (e.g. limitation of liability: watch caps set at a fraction of fees, asymmetric carveouts, carveouts so broad they eliminate the cap; data protection: missing DPA when personal data is processed, blanket sub-processor authorization, breach-notice windows longer than regulation, no cross-border transfer mechanism).

### Step 5: Flag Deviations (three tiers)
- **GREEN — Acceptable**: aligns with or beats the standard position. Note for awareness.
- **YELLOW — Negotiate**: outside the standard but within range. Provide redline language, a fallback, and the business impact of accepting vs. negotiating.
- **RED — Escalate**: outside acceptable range / triggers escalation / material risk (e.g. uncapped liability, uncapped unilateral indemnity, assignment of pre-existing IP, no DPA for personal data, unreasonable non-compete/exclusivity). Explain the risk, give standard-market alternative language, estimate exposure, recommend an escalation path.

### Step 6: Generate Redline Suggestions
For each YELLOW/RED: quote current language, give specific proposed redline, a 1–2 sentence rationale suitable for the counterparty, a priority (must-have / should-have / nice-to-have), and a fallback.

### Step 7: Business Impact Summary
Overall risk profile, top 3 issues, negotiation strategy, timeline factors. Organize redlines by priority: **Tier 1 must-haves** (deal-breakers — uncapped liability, missing data protection for regulated data, IP risk to core assets), **Tier 2 should-haves** (cap adjustments, indemnity mutuality, termination flexibility), **Tier 3 nice-to-haves** (preferred governing law, notice periods). Lead with Tier 1; trade Tier 3 to win Tier 2; never concede Tier 1 without escalation.

## Notes
- Non-English contract: note it and ask whether to review in the original or translate.
- Very long contract (50+ pages): offer to focus on the most material sections first.
- Always remind the user qualified counsel must review before reliance.
