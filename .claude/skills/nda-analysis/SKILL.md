---
name: nda-analysis
description: Use when reviewing an NDA or contract for risk. Walks the clauses, cross-checks company memory for conflicts, and writes a one-page risk report that flags deal-breakers — including data-residency conflicts a generic reviewer would miss.
---

# NDA analysis

Review a contract the way an experienced in-house reviewer would: clause by clause, **and**
against what the company actually knows about itself. The point that makes this skill more
than a generic checker is **step 4 — the memory cross-check.** A clause can be perfectly
standard in the abstract and still be a deal-breaker for *this* company.

> This assists with legal workflows; it is **not legal advice**. A human owns every decision.
> Method is based on the vendored reference in
> [`references/knowledge-work-legal/`](../../../references/knowledge-work-legal/) (Anthropic
> knowledge-work `legal` plugin, Apache-2.0).

## Method

1. **Read the contract.** Map the parties, each Party's side, the purpose, and the scope.
2. **Walk every clause** for standard risks: definition of confidential information,
   obligations, carveouts, term/survival (flag perpetual), return/destruction, IP grants,
   non-solicit / non-compete / exclusivity, liability, remedies, governing law.
3. **Rate each issue** on severity × likelihood (GREEN / YELLOW / ORANGE / RED — see the
   risk framework in the reference). Most clauses in a clean NDA will be GREEN.
4. **Cross-check company memory — do not skip this.**
   - Read `memory/MEMORY.md` **relative to the folder you were launched in** (for the lab
     demo that is `demos/nda-review/memory/MEMORY.md`), then read every file it links to.
   - If you cannot find a memory folder, **ask the user where the company memory lives**
     before concluding — never assume there are no company-specific rules.
   - Compare each memory fact against the contract. A conflict with a memory rule is a
     **RED / deal-breaker flag**, even if the clause looks ordinary on its face. Name the
     exact memory entry it violates and quote the contract clause that triggers it.
   - Example the demo relies on: a data-handling clause routing data through **Google Cloud
     / Google Workspace** conflicts with a "Microsoft / Azure only" memory rule → RED.
5. **Write a one-page risk report**, risks first, to the launch folder's `output/` (for the
   demo: `demos/nda-review/output/nda-risk-report.md`). Lead with the verdict.

## Output format

```markdown
## NDA Risk Report — <counterparty>

**Verdict:** <SIGN / NEGOTIATE / DO NOT SIGN> — <one-line reason>
**Parties:** ...   **Type:** Mutual / Unilateral   **Term:** ...   **Governing law:** ...

### Deal-breakers (RED)
- **<clause>** — what it says, which **memory rule** it violates, why it is a deal-breaker.

### To negotiate (YELLOW / ORANGE)
- ...

### Standard / acceptable (GREEN)
- ...

### Recommendation & next steps
- The single most important action. For any RED flag: route to Legal before responding
  (per company memory). State what a human must confirm.
```

## Limits to state out loud

- **Memory changes the verdict.** Run the same review without the memory cross-check and the
  Google-hosting clause sails through. That gap *is* the lesson — capability without
  experience misses company-specific risk.
- Not legal advice; counsel owns RED calls.
- The agent reads only what it's given — if the real company rules live elsewhere, point it there.
