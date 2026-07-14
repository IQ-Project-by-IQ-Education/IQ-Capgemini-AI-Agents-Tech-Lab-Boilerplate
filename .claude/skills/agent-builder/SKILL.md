---
name: agent-builder
description: Use when the participant wants to create their own agent, design a new agent, or doesn't know where to start — "build my agent", "I have an idea for an agent", "create an agent for X", or when they're stuck choosing a use case.
---

# Agent builder

Turn a participant's idea into a **working agent file** in `.claude/agents/`, through a short guided interview. The participant is possibly non-technical: you carry all the tooling decisions; they only answer business questions.

## Step 0 — Show the flow, right in the chat

The participant must never have to switch windows to follow their agent taking shape. The flow lives in two places:

**1. In the chat (primary).** After **every answer**, redraw a compact ASCII flow directly in your message, just before the next question. House style, inside a code fence, max ~12 lines, `?` marks what's still undecided:

```
   ? inputs
       ↓
  ┌ PPTX Maker agent ──────────────┐
  │ 1. Shape the story into slides │
  │ 2. Render in the brand style   │
  └────────────────────────────────┘
       ↓
  deck, ready to present
       ↓
  your feedback (2 questions) ⟲ long-term memory → next run starts smarter
```

**2. In the browser (projector / second screen).** Mirror the same flow to `agent-flow.mmd` at the repo root (Mermaid `flowchart TD`, shape in `agent-flow.example.mmd`, no commas inside `[...]` node labels): **http://localhost:3000/flow** redraws it within 2 seconds. Don't print the link and hope, **open it for them**: `open <url>` on macOS, `Start-Process <url>` in Windows PowerShell, `xdg-open <url>` on Linux. Update the file silently; the chat version is the one you narrate.

Map the **key actions**: inputs → agent steps → deliverable → feedback → memory loop back to onboarding. Same structure in both renderings.

## Step 1 — Interview (one question at a time, max 5)

Ask **one question per message**, in plain language, no jargon. Cover:

1. **The job**: "If this agent were a new hire, what's their job title and their one deliverable?" — if they have no idea or stall, switch to the **`quick-start`** skill (three simple questions, everything generated for them) and stop here; participants with a vague idea can also adopt a pre-defined agent (**press-release** or **deck-maker**) as a base.
2. **The inputs**: what does it read? (files they'll drop in the repo, public web info, the provided datasets…)
3. **The output**: what does the deliverable look like, and who is it for? (a Markdown report, a shortlist, a briefing…)
4. **The quality bar**: what makes a run *good*? What must it never do?
5. **A first real task** to test it on right after creation.

Don't ask about tools, models, or file formats — infer those yourself.

## Step 2 — Generate the agent file

Write `.claude/agents/<kebab-name>.md` following this template (same shape as `press-release.md` and `deck-maker.md` — read one for reference):

```markdown
---
name: <kebab-name>
description: Use when <triggering situations, third person — this is how Claude Code auto-picks the agent>.
tools: Read, Write, Glob, Grep, Bash[, WebSearch, WebFetch if it needs the web]
---

You are the **<Name> agent** — <one-sentence mission from answer 1>.

## Onboarding (do this first, every run)
1. Read `memory/MEMORY.md` and apply past learnings relevant to this job.
2. <read the relevant skill(s) / data / guidelines — e.g. capgemini-brand for anything editorial>

## The job
<inputs → method → output, from answers 2–3. Write outputs to a `projects/*/output/` folder as Markdown so the web app renders them, and log the run with `npm run log:run`.>

## Guardrails
<from answer 4 — plus: label unverified facts, no real personal data, decision support not decision.>

## Close the loop (mandatory)
End every report with a "### Getting better — 2 questions for you" section: two specific
questions about this run. Answers are saved via the `self-improve` skill.
```

## Step 3 — First run

1. Tell the participant their agent now exists and show the file.
2. Run it immediately on the test task from question 5 (invoke the agent, or follow its instructions directly).
3. After the run, apply the `self-improve` skill — the first memory entry is the moment the "new hire" starts gaining experience. Name that moment out loud: it's the lab's core lesson.

## Watch out

- Keep the agent's scope **shippable within the lab** — one deliverable, one happy path. Refuse scope creep politely; park extras under a "Stretch" note in the agent file.
- The `description` frontmatter must state *when to use it*, not summarize the method.
