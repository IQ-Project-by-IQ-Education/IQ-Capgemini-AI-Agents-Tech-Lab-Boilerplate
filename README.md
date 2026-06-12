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
| **Talent** — CV scoring | [`projects/talent-cv-scoring`](projects/talent-cv-scoring) | Score & rank CVs against a job description, with motivated criteria | Anonymized proxy CVs (provided) |
| **Radar** — Press synthesis ⭐ | [`projects/radar-press-synthesis`](projects/radar-press-synthesis) | Daily executive briefing of business & tech news, filtered on themes | Public news (Tavily / RSS) |
| **Deck** — Professional PPTX | [`projects/deck-pptx-creation`](projects/deck-pptx-creation) | Turn content into a clean, executive-ready PowerPoint deck | Your notes / another agent's output |

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

The repo ships with three **skills** under `.claude/skills/` — Claude Code loads them automatically and uses them when relevant. They encode the "house style" for scoring grids, press synthesis, and deck building.

---

## Plugins (auto-enabled)

This repo declares two Claude Code plugins in `.claude/settings.json`. The **first time you trust this folder**, Claude Code will prompt you to install them — accept:

| Plugin | What it brings |
| --- | --- |
| **superpowers** | A disciplined way of working — brainstorming, planning, systematic debugging, and reusable skills. Use it to scope your project well before building. |
| **frontend-design** | Production-grade, non-generic UI generation. Use it when you want to present results as a polished HTML dashboard or web view instead of raw Markdown. |

Both come from the official marketplace `anthropics/claude-plugins-official`. If the prompt doesn't appear, run `/plugin` and enable `superpowers` and `frontend-design`.

> The lab's **core works without the plugins** — the three skills under `.claude/skills/` are local to this repo and always available. The plugins are an enhancement; if your network can't reach the GitHub marketplace, you can still run all three projects.

---

## Network & data — for IT review

What this repo needs to reach the network, and what stays local:

| Capability | Network needed? | Notes |
| --- | --- | --- |
| `npm install` | Yes, once | npm registry. Pinned via `package-lock.json`. Deps: `pptxgenjs`, `tsx`, `typescript`, `@types/node` (0 known vulnerabilities). |
| Claude Code itself | Yes | `api.anthropic.com` — the agent engine. |
| **Deck** project | **No** (offline) | Renders `.pptx` fully locally via `pptxgenjs`. |
| **Talent** project | **No** for data | CVs are local PDFs read on-device. Scoring is done by Claude. |
| **Radar** project | Yes | Public news (Tavily / NewsAPI, or Claude's web search). |
| Plugins (optional) | Yes | GitHub marketplace `anthropics/claude-plugins-official`. |

**Data handling:** all data in this repo is **public or synthetic**. The `cvs-bank/` PDFs are a public, anonymized résumé dataset (PII redacted — see its [README](projects/talent-cv-scoring/cvs-bank/README.md)); job descriptions and proxy CVs are synthetic. **No real or internal Capgemini data is included.** No secrets are committed (`.env` is git-ignored; only `.env.example` with empty placeholders ships).

---

## Repository layout

```
.
├── CLAUDE.md                  # Project context Claude Code reads on every session
├── .claude/
│   ├── settings.json          # Plugins (superpowers, frontend-design) + permissions
│   └── skills/                # Reusable house-style skills
│       ├── cv-scoring/
│       ├── press-synthesis/
│       └── deck-builder/
├── projects/                  # Pick ONE — each is a self-contained brief
│   ├── talent-cv-scoring/
│   ├── radar-press-synthesis/
│   └── deck-pptx-creation/
├── scripts/                   # TypeScript helpers (news fetch / deck render)
└── docs/
    └── good-practices.md      # The production reflexes we voice-over during the build
```

---

## Before you ship

Read [`docs/good-practices.md`](docs/good-practices.md). The one-page checklist on data, security and "is this production?" is the difference between a demo and something you'd actually run.

---

*Lab team: Louis (lead) · Nathan · Arnaud — IQ for Capgemini.*
