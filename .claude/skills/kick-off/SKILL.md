---
name: kick-off
description: Use when setting up the lab after cloning, launching the local web app, or when http://localhost:3000 is not responding — "kick off", "start the app", "open the web view", "npm install".
---

# Kick-off — launch the lab app

Launch the local web app that renders each project's `output/`. **Nothing to install, nothing to build**: the app is static HTML served by a 25-line Node script (`scripts/serve.mjs`, no dependencies). It starts in under a second on any machine with Node 20+, on any network. All commands run from the **repo root** and are **identical on macOS, Linux and Windows** (PowerShell on Windows).

Order matters: **launch first, install later**. The heavy `npm install` used to block participants for 15 to 30 minutes on corporate networks; it is now optional and runs in the background, only for decks and PDF reading.

## 1. Launch the web app (first thing, no install)

**In-app browser first (Claude Desktop).** If the in-app browser tools are available (`mcp__Claude_Browser__*`), do NOT launch the server with Bash: call `preview_start` with `{name: "web"}` (config in `.claude/launch.json`: it runs `node scripts/serve.mjs`, port pinned to 3000 because every printed URL in the lab uses it). One call starts the app *and* opens http://localhost:3000 in the panel right next to the chat — the participant never leaves the app, and `preview_logs` gives you the server output when debugging. **Already running?** If port 3000 already answers, don't start a second one: just open the panel with `preview_start` `{url: "http://localhost:3000"}`.

**Fallback (plain terminal, no browser tools):**

```bash
npm run web:dev          # = node scripts/serve.mjs, nothing to install
```

The server runs in the foreground; keep it in its own terminal (or run it in the background) and stop it with `Ctrl+C`. **Then open the browser for the participant — never just print the link** (many won't know to click it). Once http://localhost:3000 answers:

| macOS | Windows (PowerShell) | Linux |
| --- | --- | --- |
| `open http://localhost:3000` | `Start-Process http://localhost:3000` | `xdg-open http://localhost:3000` |

The welcome page walks them through the lab from there. Requires **Node 20+** (`node --version` to check); nothing else.

## 2. Install the optional dependencies, in the background

Only two things in the lab need an `npm install`: **rendering PowerPoint decks** (`npm run build:deck`, pptxgenjs) and **reading PDFs** (`npm run read:pdf`, pdfjs-dist). Everything else (agents, skills, memory, the web app, the live flow) runs without it.

Run it **in the background** so the participant can start designing their agent right away:

```bash
npm install               # root only: pdfjs-dist, pptxgenjs, tsx, typescript (~60 packages)
```

- Tell the participant in one sentence: "The deck tooling installs in the background, we don't wait for it."
- If it hasn't finished after ~3 minutes, or hangs on a proxy, **cancel it and move on**. Say so plainly. Deck rendering can be retried later; a markdown deliverable on the agent's page is a complete demo on its own.
- **Never** run `npm --prefix web install`: that is the Next.js fallback (~170 packages, 500 MB), not part of the lab flow anymore. See §4.

## 3. Verify (recommended, 5 seconds)

Run the [`test-repo`](../test-repo/SKILL.md) skill, i.e. `npm test`: it boots the app on a spare port, checks the welcome page, the live flow page, the project API, and reports missing optional deps as warnings, not failures.

## 4. Fallback: the Next.js app (`web/`)

The original Next.js app is kept in `web/` for machines where `npm install` works fine and someone wants to hack on React. It renders the same data with the same look. Launch it with `npm run web:next` (needs `npm --prefix web install` once) or `preview_start` `{name: "web-next"}`. Don't propose it to a participant; it's an instructor option.

## Troubleshooting

| Symptom | macOS / Linux | Windows (PowerShell) |
| --- | --- | --- |
| `Port 3000 is already in use` | The app is probably already running: open http://localhost:3000. Otherwise `lsof -ti:3000 \| xargs kill` | `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess \| Stop-Process` |
| `node: command not found` | Install Node 20 LTS from nodejs.org, reopen the terminal | same |
| Page loads but "Couldn't reach the local server" | The server stopped: relaunch (§1) | same |
| `build:deck` / `read:pdf` fails with a missing module | `npm install` at the repo root (§2) | same |

- The app is deliberately plain — upgrading it live with the `frontend-design` skill (via `showcase`) is a demo moment, not a bug.
- Production check: `npm test` is the exact boot a participant gets on lab day.
