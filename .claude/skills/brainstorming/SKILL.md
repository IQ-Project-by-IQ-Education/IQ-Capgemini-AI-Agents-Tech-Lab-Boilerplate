---
name: brainstorming
description: Use this before any build — creating an agent, a skill, a feature, or a front-end. Turns a fuzzy idea into a clear, agreed design through one-question-at-a-time dialogue, BEFORE any code is written.
---

<!--
  VENDORED + ADAPTED for the lab.
  Source : superpowers plugin (claude-plugins-official), skills/brainstorming · by obra.
  Adaptation: trimmed to the *dialogue* for a non-technical audience. Removed the
  browser "visual companion" server (scripts/) and the dev-only terminal steps that
  wrote+committed a spec doc and handed off to a `writing-plans` skill (not in this repo).
  It now ends cleanly at "design approved → ready to build."
-->

# Brainstorming ideas into designs

Help turn a rough idea into a clear, agreed design through natural collaborative dialogue —
**before** writing any code, scaffolding anything, or invoking another skill.

<HARD-GATE>
Do NOT write code, scaffold a project, or invoke an implementation skill until you have
presented a design and the user has approved it. This applies to EVERY project, no matter
how simple it seems.
</HARD-GATE>

## Anti-pattern: "this is too simple to need a design"

Every project goes through this. A one-page agent, a single skill, a small front-end — all
of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The
design can be short (a few sentences), but you MUST present it and get a yes.

## Checklist (do these in order)

1. **Explore context** — look at the current files, the project README, recent work. Understand what's already here before proposing anything.
2. **Ask clarifying questions — one at a time.** Understand purpose, constraints, and what "done" looks like. Prefer multiple-choice questions; never dump several questions in one message.
3. **Propose 2–3 approaches** — with trade-offs. Lead with your recommendation and say why.
4. **Present the design** — in sections scaled to their complexity (a few sentences if simple). After each section, ask whether it looks right. Cover: what it does, the pieces and how they fit, the data flow, what could go wrong, how you'll check it works.
5. **Get approval** — once the user agrees, summarize the agreed design in a few lines and stop. **You are now ready to build.** (In this lab, that means: go run the relevant skill or write the code.)

## Process notes

- **Scope check first.** If the request is really several independent things ("an app with chat, billing, analytics, and a CV scorer"), say so immediately and help split it into pieces — brainstorm the first piece through this flow, then the next. Don't refine details of something that needs decomposing.
- **One question per message.** Don't overwhelm.
- **YAGNI ruthlessly.** Cut every feature that isn't needed for the goal.
- **Be flexible.** If something stops making sense, go back and re-clarify.
- **In an existing codebase**, follow the patterns already there; propose only changes that serve the current goal, not unrelated refactors.

## Why this matters (lab voice-over)

This is the cheapest place to catch a misunderstanding. A five-minute conversation here saves
an hour of the agent confidently building the wrong thing. Treat it like briefing a smart new
hire: you don't hand them the keyboard before you've agreed on what you're actually building.
