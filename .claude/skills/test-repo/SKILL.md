---
name: test-repo
description: Use when checking that the lab environment works — right after cloning, before a demo, or when something seems broken (missing dependencies, PDF reading fails, web app won't build or start). Also use when the participant asks "does everything work?" or "is my setup ready?".
---

# Test the repo

Verify the whole lab with **one command** — runtime, dependencies, bundled skills, project data, PDF reading, deck rendering, and the web app build. The test script (`tests/verify.mjs`) is pure Node, offline, and cross-platform: the **same command works on macOS, Linux and Windows**.

## How to run

From the repo root, on any OS:

```bash
npm test
```

- **Exit code 0 / `PASS`** → the environment is ready.
- **Exit code 1 / `FAIL`** → each ✗ line says exactly what to fix. Fix, re-run.
- ⚠️ lines are warnings (e.g. web deps not installed) — the lab core still works.

If dependencies were never installed, install them first — see the [`kick-off`](../kick-off/SKILL.md) skill (or run `npm install` then `npm --prefix web install`).

## Fixing failures — adapt commands to the OS

Detect the platform first (`process.platform`, or ask the participant: Mac or Windows?). `npm` commands are identical everywhere; shell commands are not:

| Fix | macOS / Linux | Windows (PowerShell) |
| --- | --- | --- |
| Reinstall root deps | `rm -rf node_modules && npm install` | `Remove-Item -Recurse -Force node_modules; npm install` |
| Reinstall web deps | `rm -rf web/node_modules && npm --prefix web install` | `Remove-Item -Recurse -Force web\node_modules; npm --prefix web install` |
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
| `<dep> not installed` | `npm install` at the repo root |
| `web deps not installed` (warning) | `npm --prefix web install` |
| `web app build failed` | Read the last lines printed; usually a missing install or a TypeScript error in `web/` |
| `read:pdf failed` | Re-run `npm install` (pdfjs-dist missing or corrupted) |

## When it passes

Tell the participant the environment is ready and suggest the next step: `npm run web:dev` → http://localhost:3000 (see the `kick-off` skill).
