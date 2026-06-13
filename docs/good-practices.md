# Good practices — the production reflexes

Voice-over material for the build, not a lecture. The goal: leave with the reflexes that separate _a demo_ from _something you'd actually run_. We talk **production, security, quality, and limits** — not "vibe coding".

## The one rule

**A finished project beats an impressive but incomplete one.** Scope down until it ships in the time you have.

## The conceptual spine — an agent is a new hire

The whole morning maps onto onboarding a new employee. It's why each piece of the repo exists:

| A new hire gets… | The agent's version | Where it lives here |
| --- | --- | --- |
| the rulebook | **instructions** (CLAUDE.md) | root `CLAUDE.md`, each project's `README.md` |
| their accesses | **tools** | web search / fetch, `npm run …` scripts, MCP |
| experience on the job | **memory** | `demos/nda-review/memory/` (index + one file per fact) |
| training | **skills** | `.claude/skills/**` |
| a laptop, not the master keys | **sandbox** | the launch folder = the agent's reach |
| a promotion | **subagents** | parallel orchestration |

The point of the **memory × skill** demo (`demos/`): a very capable reviewer still misses a
company-specific deal-breaker until it has *experience*. Capability without memory isn't enough
— exactly like a brilliant new hire on day one.

## Prototype vs. production

|         | Personal prototype | Industrializable project      |
| ------- | ------------------ | ----------------------------- |
| Data    | Whatever's handy   | Sourced, owned, compliant     |
| Output  | One-off            | Repeatable, consistent format |
| Failure | Re-run by hand     | Handled, logged, alerted      |
| Trust   | "Looks right"      | Verified against sources      |

You're building a prototype _with production reflexes_ — knowing what would need to harden for the right column.

## Data & security reflexes

- **Public / proxy data by default.** Don't paste confidential or personal data you're not authorized to use. The lab data (CV bank, news, public web) is chosen to be safe.
- **Know where data flows.** With Claude Code, the outbound connection is to Claude + the public sources you query. Nothing internal leaves your machine unless you send it.
- **PII awareness.** CVs contain personal data — treat the scoring output as sensitive, flag bias, keep a human in the loop.
- **Blast radius.** Know what an agent can reach *before* you let it run — what it can read, write, send, or delete. An external skill or MCP server runs with the **agent's own permissions**, so it's attack surface: read it before you install it, and prefer a reviewed local copy over pulling code live (that's why this repo vendors its skills — see `references/`).

## Quality & trust reflexes

- **Source everything.** Briefings and competitive claims link to where they came from. Freshness ≠ truth.
- **Name the gaps.** Say what wasn't fetched, what window you used, what's single-source.
- **Consistent output.** Skills enforce a house format so results are presentable and comparable — not a different shape every run.

## Knowing the limits

- The model is a capable assistant, not an oracle. It can be confidently wrong.
- It only knows what it was given or fetched — context engineering matters as much as prompting.
- High-stakes decisions (hiring, strategy) stay with a human; the agent is decision _support_.

## Before you ship / share — checklist

- [ ] Does it actually run end-to-end, reproducibly?
- [ ] Is every external claim sourced?
- [ ] Any sensitive data in the output? Handled appropriately?
- [ ] Could someone else re-run it (clear inputs, reproducible steps)?
- [ ] Have you said out loud what its limits are?

## Prompt shape — brief it like an intern

A good prompt has the same four parts as a good briefing: **Context · Task · Guidelines ·
Constraints.** Say what's going on, what you want done, how to do it well, and what not to do.
The same shape runs through `CLAUDE.md`, the skills, and the copy-paste prompts.

**Progressive disclosure:** every index file (a `MEMORY.md`, a skill's front-matter) leads
with a **name + one line**, detail loaded on demand. The model rebuilds its whole context each
turn, so keep the top of each file skimmable. Write new memory and skill files this way.

## The vocabulary we use

Prompt engineering · context engineering · agents · instructions · skills. We frame the work as **building reliable agents**.
