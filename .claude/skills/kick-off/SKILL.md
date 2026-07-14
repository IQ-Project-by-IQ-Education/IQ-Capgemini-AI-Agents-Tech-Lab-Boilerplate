---
name: kick-off
description: Use when setting up the lab after cloning, installing dependencies, or launching the local web app — "npm install", "start the dev server", "open the web view", or when http://localhost:3000 is not responding.
---

# Kick-off — install & run

Install everything the lab needs, then launch the local web app that renders each project's `output/`. All commands run from the **repo root** and are **identical on macOS, Linux and Windows** (use PowerShell on Windows).

## 1. Install dependencies (once)

```bash
npm install               # root: pdfjs-dist, pptxgenjs, tsx, typescript
npm --prefix web install  # web app (Next.js)
```

Requires **Node 20+** (`node --version` to check). No network access is needed afterwards — everything else in the lab is bundled.

## 2. Verify (recommended)

Run the [`test-repo`](../test-repo/SKILL.md) skill — i.e. `npm test` — to confirm the environment is ready before demoing.

## 3. Launch the dev server

```bash
npm run web:dev
```

Then open **http://localhost:3000**. The server runs in the foreground; keep it in its own terminal (or run it in the background) and stop it with `Ctrl+C`.

## Troubleshooting

| Symptom | macOS / Linux | Windows (PowerShell) |
| --- | --- | --- |
| Port 3000 already in use | `lsof -ti:3000 \| xargs kill` | `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess \| Stop-Process` |
| `next: command not found` / module errors | `npm --prefix web install` | same command |
| Stale build weirdness | `rm -rf web/.next` then relaunch | `Remove-Item -Recurse -Force web\.next` then relaunch |

- The app is deliberately plain — upgrading it live with the `frontend-design` skill is a demo moment, not a bug.
- Production check: `npm run web:build` builds the app the same way `npm test` does.
