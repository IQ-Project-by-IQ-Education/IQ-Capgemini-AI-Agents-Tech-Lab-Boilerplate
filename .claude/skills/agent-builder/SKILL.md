---
name: agent-builder
description: Use when the participant wants to create their own agent, design a new agent, or doesn't know where to start — "build my agent", "I have an idea for an agent", "create an agent for X", or when they're stuck choosing a use case.
---

# Agent builder

Turn a participant's idea into a **working agent file** in `.claude/agents/`, through a short guided interview. The participant is possibly non-technical: you carry all the tooling decisions; they only answer business questions. Everything happens **in this repo, in this session** — never mention deployment, hosting, servers, API keys or any technical setup. The agent they design runs right here, minutes later.

Run the whole interview **in English** (the lab is run in English).

## Coaching principles

You are a coach, not the designer. Two modes, depending on the step:

- **Objective, capabilities (Steps 1 and 3a): ask, don't assume.** The participant decides. If they're stuck, ask simple prompting questions to help them find their own answer (what task eats their time, who it's for) — don't hand them ready-made agent ideas.
- **Flow and tools (Steps 2 and 3b): propose, then validate.** The participant usually can't picture an agent's internals — you imagine the flow and the tooling yourself, they react to a few big blocks, not to every box.

Rules for every turn: one focused question per message · short questions, zero jargon · restate your understanding of their answer before asking the next question · don't move to the next step until the current one is settled · keep every flow as simple as possible — never over-engineer unless the participant explicitly asks for more detail · no em dashes in participant-facing text (commas or colons instead) · **every ASCII redraw in the chat is paired with a Write of `agent-flow.mmd` in the same turn — never one without the other** (the /flow page on the projector only updates through that file).

## Show the flow, right in the chat

The participant must never switch windows to follow their agent taking shape. The flow lives in two places:

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

**2. In the browser (projector / second screen).** Mirror the same flow to `agent-flow.mmd` at the repo root (Mermaid `flowchart TD`, shape in `agent-flow.example.mmd`, no commas inside `[...]` node labels): **http://localhost:3000/flow** redraws it within 2 seconds. That page is already open next to the chat since Step 0 (the app runs without any install). **The `.mmd` Write happens in the same turn as every chat redraw, without exception** — a chat-only redraw leaves the projector frozen on a stale diagram, which reads as "broken" to the room. Update the file silently; the chat version is the one you narrate.

The first (mostly-`?`) drawing is written in Step 0 and accompanies your very first question. The bottom line — feedback ⟲ memory → next run starts smarter — is part of the template, keep it in every drawing. Never paste raw Mermaid in the chat — the chat gets the ASCII version, the `.mmd` file feeds the browser.

## Step 0 — Open the stage (before the first question, no exceptions)

The participant must see their agent's flow draw itself **without doing anything**. So, as the very first thing this skill does, before any question:

1. **Is the web app running?** Check port 3000 (`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/flow` on macOS/Linux, `Invoke-WebRequest http://localhost:3000/api/flow` in PowerShell). Nothing to install either way: the app is static, served by `scripts/serve.mjs`.
2. **Not running?** Start it: in Claude Desktop, `preview_start` with `{name: "web"}` (config in `.claude/launch.json`); otherwise `npm run web:dev` in the background. It answers within a second.
3. **Write the first drawing** to `agent-flow.mmd` at the repo root, the mostly-`?` skeleton below, so the page never shows its empty state:

```
flowchart TD
  A[/? inputs/] --> B
  subgraph agent [? Your agent]
    B[? step 1] --> C[? step 2]
  end
  C --> D([? deliverable])
  D --> F{{Your feedback in 2 questions}}
  F -. writes a learning .-> M[(Long-term memory)]
  M -. read at onboarding .-> B
```

4. **Open the flow page for them**, in the in-app browser first: `preview_start` with `{url: "http://localhost:3000/flow"}` (or `navigate` to it if the panel is already open on another page). Without the in-app browser tools: `open http://localhost:3000/flow` on macOS, `Start-Process http://localhost:3000/flow` in Windows PowerShell, `xdg-open http://localhost:3000/flow` on Linux. Never just print the link.
5. Say one sentence: "Your agent's flow will draw itself on the right as we talk." Then ask the first question.

If any of this fails (port busy, panel not opening), don't stall the interview: say so in one line, fall back to the chat-only ASCII flow, and fix it after the interview with the `debug` skill.

## Step 1 — Identity & core capability (ask)

Ask for: the agent's **name**, and its **main objective** in 1–2 sentences ("if this agent were a new hire, what's their job title and their one deliverable?"). Name + objective count as one identity question, ask them together.

- **No idea at all, or stalling?** Switch to the **`quick-start`** skill (three simple questions, everything generated for them) and stop here. A vague idea can also adopt a pre-defined agent (**press-release** or **deck-maker**) as a base.

Then ask: **what is the single most important thing this agent must do well?** Restate it and get a confirmation. This is the *core capability* everything else serves.

## Step 2 — Build the agent flow (propose, then validate — one pass)

Build this in **2–3 broad turns total**, not one question per box:

1. **Ask for milestones, once.** "From the moment you ask it something to the moment [core capability] is delivered, what are the big steps?" If they're unsure, skip straight to 2 and propose them yourself.
2. **Sketch the whole flow in 3–4 broad phases.** Group the journey into a few phases (e.g. for a research agent: Intake & clarify → Gather → Analyze & organize → Deliver). You design the steps, decisions and data reads inside each phase yourself — don't ask the participant to detail them. Draw it in the chat (ASCII) and mirror it to `agent-flow.mmd`.
3. **Validate once.** "Here's the full flow I imagined — does it match what you had in mind, or should we change something?" Adjust from their reaction.

Defaults: **happy path only** — no error handling, no edge cases, no extra decision branches unless the participant explicitly asks. A short readable chain beats a diagram full of branches. Once validated, summarize the steps and move on.

## Step 3 — Capabilities & tooling (one broad question, then one map)

**3a — Ask one broad question:** "What are the main things this agent must be good at?" Let them list as many as they want in one go — each is a candidate capability. Also cover, in the same conversation: **what makes a run good, and what must it never do** (the quality bar).

**3b — You propose the tooling, they just confirm.** Deciding what each capability needs is your job, not another round of questions. For each capability, decide yourself whether it needs:

- an existing **lab skill** (`capgemini-brand` for anything client-facing, `cv-scoring`, `press-synthesis`, `deck-builder`, `pdf-reading`, `frontend-design`…),
- a **real action** (web search, reading files or PDFs from the repo, `npm run fetch:news`, `npm run build:deck`, writing outputs) — this becomes the agent's `tools:` list,
- or **nothing** — pure reasoning stays tool-free.

Reuse across capabilities; don't duplicate. Present the whole map at once, as a simple indented tree in the chat (agent on top, one line per capability naming its skills/tools in plain text — no decision diamonds, no box per tool), mirror it to `agent-flow.mmd`, and ask a single question: "Here's what I think each part needs — does that look right, or should we change something?" One map, one confirmation.

Never surface the technical layer beyond this: no file formats, no frontmatter talk, no model choice — that's all yours.

## Step 4 — Personality & first task (ask, quick)

Ask how the agent should sound and behave (friendly, formal, concise, proactive, cautious…). Default if no preference: **professional, concise, proactive**. In the same turn, ask for **one first real task** to test it on right after creation.

## Step 5 — How it should look on screen (ask, then propose)

The agent's outputs won't stay buried in files: they get their **own page in the lab web app**, and that page is a demo moment. One question, business terms only: "At the demo, your agent's results appear on the big screen. What should that moment feel like: a sharp boardroom brief, a product launch reveal, or a live mission control dashboard?" Those three are openers, let them answer freely.

Translate their answer yourself into a one-line **design direction** (e.g. "bold editorial, dark background, oversized type, blue accents"). Restate it in plain words and get one confirmation. Never surface fonts, CSS or any design vocabulary: they describe a feeling, you carry the craft. The direction is written into the agent file (Step 6) and drives the page build (Step 8). Redraw the flow with a final "presented on the agent's page" node.

## Step 6 — Generate the agent file

Write `.claude/agents/<kebab-name>.md` following this template (same shape as `press-release.md` and `deck-maker.md` — read one for reference):

```markdown
---
name: <kebab-name>
description: Use when <triggering situations, third person — this is how Claude Code auto-picks the agent>.
tools: Read, Write, Glob, Grep, Bash[, WebSearch, WebFetch if it needs the web]
---

You are the **<Name> agent** — <one-sentence mission from Step 1>.

## Onboarding (do this first, every run)
1. Read `memory/MEMORY.md` and apply past learnings relevant to this job.
2. <read the relevant skill(s) / data / guidelines — e.g. capgemini-brand for anything editorial>

## The job
<the validated flow from Step 2: inputs → phases → deliverable. Write outputs to a `projects/*/output/` folder as Markdown so the web app renders them — they also feed the agent's dedicated page `/<kebab-name>` — and log the run with `npm run log:run`.>

## Personality
<from Step 4 — how it sounds and behaves.>

## Presentation
<the design direction from Step 5, one line — it styles the agent's page at `site/<kebab-name>.html`.>

## Guardrails
<the quality bar from Step 3a — plus: label unverified facts, no real personal data, decision support not decision.>

## Close the loop (mandatory)
End every report with a "### Getting better — 2 questions for you" section: two specific
questions about this run. Answers are saved via the `self-improve` skill.
```

The capability → tooling map from Step 3b drives the `tools:` line and the onboarding skill reads. Keep the tool list to the minimum the flow requires.

## Step 7 — First run

1. Tell the participant their agent now exists and show the file.
2. Run it immediately on the test task from Step 4 (invoke the agent, or follow its instructions directly).
3. After the run, apply the `self-improve` skill — the first memory entry is the moment the "new hire" starts gaining experience. Name that moment out loud: it's the lab's core lesson.

## Step 8 — Embed in the app (the wow moment)

Right after the first run, turn the agent's output into a **dedicated page in the web app** — the moment the participant sees their agent become a product. Announce it, then build it yourself; the design direction was already validated in Step 5, no more questions needed.

1. **Read `frontend-design` and `capgemini-brand` first.** Precedence for these pages: `frontend-design` leads — commit fully to the Step 5 direction (distinctive type treatment, motion, spatial composition, backgrounds). `capgemini-brand` contributes the accent colors (the `--cap-*` tokens already in `site/assets/site.css`) and the editorial voice only; the light-and-sober constraints of the showcase surface do not govern these pages.
2. **Build `site/<kebab-name>.html`** — a plain HTML page, no build step, served as `http://localhost:3000/<kebab-name>`. Start from `site/agent-page.example.html` and reuse the existing plumbing, never reinvent it: the page loads `/assets/site.css` + `/assets/app.js`, then calls `LabSite.mountDoc({project: "<project-dir>", tag, title, empty})`, which fetches the newest markdown in `projects/<project-dir>/output/`, renders it, and appends the "Recent runs" strip from `runs.json`. For a custom layout, use the pieces directly: `LabSite.project(dir)` (data), `LabSite.renderMarkdown(md)`, `LabSite.runsHtml(runs)`, `LabSite.emptyHtml(html)`. Always include a styled empty state for when `output/` is still empty.
3. **Style inline in that page's `<style>`**, scoped under one page-level class on `<body>` (`.page-<kebab-name>`) so nothing leaks into other routes. No new dependencies, no CDN fonts, offline-safe — distinctiveness comes from scale, weight, spacing, color and motion on the self-hosted stack (Ubuntu is already loaded by `site.css`).
4. **Add the page to `site/nav.json`** (`{"href": "/<kebab-name>", "label": "<Agent name>"}`), the header picks it up on the next load.
5. **Open it for them** — in-app browser `preview_start`/`navigate` if available, otherwise `open http://localhost:3000/<kebab-name>` (`Start-Process` on Windows) — never just print the link. No restart needed: the server serves the new file immediately.
6. **Close the loop on the design too:** one quick question in participant terms ("anything you'd change about how this looks?"), saved via `self-improve`, in addition to the Step 7 run feedback.

Time-box it (80/20): one page — a hero carrying the agent's name and mission, the latest output as the centerpiece, the runs strip below. If the direction risks the time budget, ship the strong-typography version first and refine only if time allows. The `showcase` skill can still upgrade this page at the end of the lab; keep the design direction consistent when it does.

## Watch out

- Keep the agent's scope **shippable within the lab** — one deliverable, one happy path, buildable and demoable well within the session. Refuse scope creep politely; park extras under a "Stretch" note in the agent file.
- The `description` frontmatter must state *when to use it*, not summarize the method.
- Never ask the participant about deployment, hosting, accounts, keys or infrastructure — none of it exists in this lab, and mentioning it breaks the "you carry the tooling" contract.
