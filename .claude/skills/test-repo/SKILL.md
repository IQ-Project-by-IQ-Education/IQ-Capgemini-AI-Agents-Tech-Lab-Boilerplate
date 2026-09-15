---
name: test-repo
description: Use when checking that the lab environment works — right after cloning, before a demo, or when something seems broken (missing dependencies, PDF reading fails, web app won't build or start). Also use when the participant asks "does everything work?" or "is my setup ready?".
---

# Test the repo

Verify the whole lab with **one command** — runtime, bundled skills, agents, memory, project data, the optional deps (PDF reading, deck rendering), **and an end-to-end boot of the web app**: it starts the participants' welcome page on port 3100, checks the welcome message, the live flow page, the project API and the Capgemini logo are actually served, then stops it. The test script (`tests/verify.mjs`) is pure Node, offline, and cross-platform: the **same command works on macOS, Linux and Windows** (~5s; nothing to install or build first).

## How to run

From the repo root, on any OS:

```bash
npm test
```

- **Exit code 0 / `PASS`** → the environment is ready.
- **Exit code 1 / `FAIL`** → each ✗ line says exactly what to fix. Fix, re-run.
- ⚠️ lines are warnings (e.g. root deps not installed: decks and PDF reading unavailable) — the lab core still works, the web app included.

The web app needs **no install**. The optional `npm install` (root only) enables decks and PDF reading — see the [`kick-off`](../kick-off/SKILL.md) skill; run it in the background, never block the participant on it. `npm test -- --next` additionally checks the Next.js fallback in `web/` (instructor option).

## Fixing failures — adapt commands to the OS

Detect the platform first (`process.platform`, or ask the participant: Mac or Windows?). `npm` commands are identical everywhere; shell commands are not:

| Fix | macOS / Linux | Windows (PowerShell) |
| --- | --- | --- |
| Reinstall root deps | `rm -rf node_modules && npm install` | `Remove-Item -Recurse -Force node_modules; npm install` |
| Reinstall web (Next.js fallback) deps, instructor only | `rm -rf web/node_modules && npm --prefix web install` | `Remove-Item -Recurse -Force web\node_modules; npm --prefix web install` |
| Check Node ≥ 20 | `node --version` | `node --version` |
| Chain commands | `cmd1 && cmd2` | `cmd1; if ($?) { cmd2 }` |

Windows notes:
- Run commands in **PowerShell** (not cmd.exe); don't use `&&` on older PowerShell 5.
- The test script already resolves `npm` → `npm.cmd` itself — no adaptation needed to *run* it, only to *fix* what it reports.
- If script execution is blocked by policy, `npm test` via the terminal still works (it doesn't need `.ps1` scripts).

## Common failures

| Symptom | Fix |
| --- | --- |
| `Node vXX — the lab needs Node 20 or newer` | Install Node 20 LTS from nodejs.org, reopen the terminal |
| `<dep> not installed` (warning) | `npm install` at the repo root, in the background; only decks / PDF reading need it |
| `web app did not answer on port 3100` | Something else holds port 3100, or Node < 20; read the line printed, then `node scripts/serve.mjs --port 3100` by hand to see the error |
| `Agent Flow page failed` / `project API failed` | A file is missing in `site/` or `scripts/serve.mjs` was edited; `git status` then restore |
| `read:pdf failed` | Re-run `npm install` (pdfjs-dist missing or corrupted) |

## When it passes

Tell the participant the environment is ready and suggest the next step: the web app at http://localhost:3000 (see the `kick-off` skill, it's probably already open).
