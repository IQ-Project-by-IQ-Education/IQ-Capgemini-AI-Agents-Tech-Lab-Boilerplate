---
name: self-improve
description: Use right after any agent or skill produces a deliverable (scorecard, briefing, press release, deck, frontend…) — to collect the participant's feedback and store learnings in long-term memory. Also use when the participant gives spontaneous feedback ("too long", "wrong tone", "perfect like this").
---

# Self-improve — feedback → long-term memory

Every run makes the agent smarter, like an employee gaining experience. This skill closes the loop: **ask → record → apply next time**.

## The loop

### 1. Ask (right after showing the deliverable)

Ask the participant **exactly 2 short questions** — specific to this run, never generic:

- one about the **substance** (criteria, sources, depth, structure),
- one about the **form** (format, tone, length, audience fit).

If the agent's report already ends with a "Getting better" section, relay those questions. If the participant volunteers feedback unprompted, skip the questions and record it directly.

### 2. Record (one file per learning)

Write each learning to `memory/<topic-slug>.md`:

```markdown
---
name: <topic-slug>
description: <one line — used to decide relevance on future runs>
agent: <which agent/skill it applies to, or "all">
date: <YYYY-MM-DD>
---

<the learning itself>
**Why:** <what happened in the run that taught this>
**Next time:** <the concrete behavior change>
```

Then add one line to the index `memory/MEMORY.md`: `- [<topic-slug>](<topic-slug>.md) — <hook>`.

Rules:
- One fact per file. Update an existing file rather than duplicating; delete entries proven wrong.
- Record decisions and preferences, **never** raw personal data or confidential content.
- Also record objective findings from the run itself (a source that failed, a prompt that worked) — feedback isn't only what the user says.

### 3. Apply

Agents read `memory/MEMORY.md` during onboarding (it's in their instructions). When a memory changes how you work **say so out loud** — *"scoring CRM higher this time, as you asked last run"* — that visible before/after is the payoff of the loop, and the lab's core lesson: **capability without memory isn't experience**.

## Watch out

- 2 questions max — this is a pulse check, not a survey. Don't block the participant's flow.
- A memory that no run ever applies is noise: prefer few, sharp learnings over many vague ones.
