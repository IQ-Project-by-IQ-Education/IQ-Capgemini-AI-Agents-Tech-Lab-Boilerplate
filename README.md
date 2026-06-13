# Lab 3 — AI Agents Tech · Capgemini COMEX

> **Build a working AI agent in one morning.** Starter repository for the *AI Agents Tech* lab — Capgemini COMEX, June 18th 2026.

You will leave this lab with **a functional agent project**, not a slide deck. Pick one of the three use cases below, follow the 80/20 method, and ship something that actually runs.

---

## The deal

- **Time budget:** 45 min framing · 2h15 build.
- **Primary agent:** [Claude Code](https://www.anthropic.com/claude-code) (Claude Opus / Sonnet 4.6).
- **Mindset:** *A finished project beats an impressive but incomplete one.* This is **production thinking** — not "vibe coding". You care about data, security, quality, maintainability, and knowing the limits of the tools.
- **Reproducible, not one-off:** structure your agent so it can re-run reliably with clear inputs — production thinking, not a one-shot demo.

---

## Pick your project

Each project is self-contained under `projects/`. Start by reading its `README.md`.

| Project | Folder | What you build | Data |
| --- | --- | --- | --- |
| **Talent** — CV scoring | [`projects/1-talent-cv-scoring`](projects/1-talent-cv-scoring) | Score & rank CVs against a job description, with motivated criteria | Anonymized proxy CVs (provided) |
| **Radar** — Press synthesis ⭐ | [`projects/2-radar-press-synthesis`](projects/2-radar-press-synthesis) | Daily executive briefing of business & tech news, filtered on themes | Public news (Tavily / RSS) |
| **Deck** — Professional PPTX | [`projects/3-deck-pptx-creation`](projects/3-deck-pptx-creation) | Turn content into a clean, executive-ready PowerPoint deck | Your notes / another agent's output |

⭐ = **safety-net project**: demonstrable end-to-end with public data, no internal Capgemini data required.

---

## Quick start

```bash
# 1. Install tooling (Node 20+)
npm install

# 2. Configure API keys (optional — only for the news/web fetch scripts)
cp .env.example .env
#   then fill in TAVILY_API_KEY / EXA_API_KEY / NEWSAPI_KEY

# 3. Open the repo with Claude Code
claude

# 4. Inside Claude Code, tell it which project you picked, e.g.:
#    "Let's build the Radar press-synthesis project. Read its README and the skill, then start."
```

## Check it works

Before the lab, confirm the repo runs on your machine: `npm test` (a Node self-test, exits 0
when everything's in place) then `npm run web:dev` (boot the app, see the lab title). Full
2-step protocol — runnable from the Claude app too — in [`TESTING.md`](TESTING.md).

## Skills (bundled — no download)

All skills live **inside this repo** under `.claude/skills/` and are loaded automatically by Claude Code. **Nothing to install, nothing to download from a marketplace** — clone the repo and they're there.

| Skill | What it's for |
| --- | --- |
| **cv-scoring** | House-style scoring grid + ranking output (Talent). |
| **press-synthesis** | Raw news → executive briefing (Radar). |
| **deck-builder** | JSON deck spec → themed `.pptx` (Deck). |
| **frontend-design** | Production-grade, non-generic UI generation — use it to present results as a polished HTML dashboard or web view. *(Vendored from Anthropic's official plugin, Apache-2.0 — see `.claude/skills/frontend-design/LICENSE`.)* |
| **pdf-reading** | Read/extract text from any PDF on-device (CVs, any reference doc) — standalone via `npm run read:pdf`, no network or Python. |
| **nda-analysis** | Review an NDA/contract, **cross-check company memory**, write a one-page risk report. Powers the memory × skill demo (see `demos/`). |
| **brainstorming** | Turn a fuzzy idea into an agreed design through one-question dialogue *before* building. *(Vendored & trimmed from the superpowers plugin.)* |
| **teach** | Quiz you on a topic and build lessons/diagrams. **Invoke by name** (`/teach <topic>`) — it won't auto-trigger. *(Vendored from Matt Pocock's skills.)* |

This repo is **fully self-contained**: no external plugin marketplace is required. The new
skills were **vendored locally** (copied in, with provenance) precisely so nothing has to be
downloaded on lab day — see [`references/`](references/) for the originals they're based on.

---

## Network & data — for IT review

What this repo needs to reach the network, and what stays local:

| Capability | Network needed? | Notes |
| --- | --- | --- |
| `npm install` (root) | Yes, once | npm registry. Pinned via `package-lock.json`. Deps: `pptxgenjs`, `pdfjs-dist`, `tsx`, `typescript`, `@types/node` (0 known vulnerabilities). |
| `npm --prefix web install` (front-end) | Yes, once | npm registry. ~28 packages (`next`, `react`, `react-dom`), pinned via `web/package-lock.json`. **Pre-install on participant machines** alongside the CV data. 2 moderate transitive advisories, acceptable for a local lab. |
| Claude Code itself | Yes | `api.anthropic.com` — the agent engine. |
| **Deck** project | **No** (offline) | Renders `.pptx` fully locally via `pptxgenjs`. |
| **Talent** project | **No** for data | CVs are local PDFs read on-device. Scoring is done by Claude. |
| PDF reading (`read:pdf`) | **No** (offline) | Local text extraction via pdf.js — no network, no Python. |
| **Radar** project | Yes | Public news (Tavily / NewsAPI, or Claude's web search). |
| Web front-end (`web/`) | **No** at runtime | Reads local `projects/*/output/` only; no network once installed. |
| Skills (incl. frontend-design, nda-analysis, brainstorming, teach) | **No** | All bundled in the repo — no marketplace, no plugin install. |
| References (`references/`) | **No** | Karpathy CLAUDE.md + knowledge-work legal prose are vendored copies — no download. |

**Data handling:** all data in this repo is **public or synthetic**. The `data/cvs/` PDFs are a public, anonymized résumé dataset (PII redacted — see its [README](projects/1-talent-cv-scoring/data/cvs/README.md)); job descriptions and proxy CVs are synthetic. Capgemini's brand essentials are summarized in [`capgemini-brand.md`](projects/3-deck-pptx-creation/brand/capgemini-brand.md) (the full 45 MB brand PDF is intentionally **not** bundled, to keep clones lean). The NDA in `demos/nda-review/` is a **fictional** sample for the memory demo. **No real or internal Capgemini candidate/business data is included.** No secrets are committed (`.env` is git-ignored; only `.env.example` with empty placeholders ships).

---

## Repository layout

```
.
├── CLAUDE.md                  # Project context Claude Code reads on every session
├── .claude/
│   ├── settings.json          # Permissions for the lab
│   └── skills/                # Bundled skills — no download needed
│       ├── cv-scoring/
│       ├── press-synthesis/
│       ├── deck-builder/
│       ├── frontend-design/   # vendored (Anthropic, Apache-2.0)
│       ├── pdf-reading/       # read PDFs on-device, standalone
│       ├── nda-analysis/      # review an NDA + cross-check memory
│       ├── brainstorming/     # vendored & trimmed (superpowers)
│       └── teach/             # vendored (Matt Pocock) — invoke by name
├── projects/                  # Pick ONE — each is a self-contained brief
│   ├── 1-talent-cv-scoring/   # data/cvs/ = 116 anonymized PDF CVs
│   ├── 2-radar-press-synthesis/
│   └── 3-deck-pptx-creation/  # incl. Capgemini brand tokens (brand/)
├── web/                       # Minimal Next.js front-end — renders each project's output/
├── demos/                     # Instructor-only: the memory × skill (NDA) live demo
│   └── nda-review/            #   memory/ + a fictional NDA + output/
├── references/                # Vendored reading: Karpathy CLAUDE.md · knowledge-work legal
├── scripts/                   # Helpers: fetch-news, build-deck (tsx) · read-pdf (node)
└── docs/
    └── good-practices.md      # The production reflexes we voice-over during the build
```

**Front-end:** `npm run web:dev` boots the Next.js app at `http://localhost:3000`; each route
renders a project's `output/`. It's deliberately plain — upgrade it live with `frontend-design`.

**Reference to steal from:** [`references/karpathy-CLAUDE.md`](references/karpathy-CLAUDE.md) — a
short, high-signal `CLAUDE.md` to model your own agent rulebook on.

---

## Before you ship

Read [`docs/good-practices.md`](docs/good-practices.md). The one-page checklist on data, security and "is this production?" is the difference between a demo and something you'd actually run.

---

*Lab team: Louis (lead) · Nathan · Arnaud — IQ for Capgemini.*
