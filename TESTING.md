# Test protocol — does the lab run on your machine?

A 2-step check that this repository works end-to-end on a participant's environment,
**before** the lab. It needs **no internet**, **no install**, **no Python**, and runs from
the terminal or from the **Claude app** (Claude Code).

> **What "pass" means:** the self-test exits with **code 0**, and the boilerplate web app
> boots and shows the lab title. If both are true, this machine is ready.

---

## Setup

```bash
# Node 20+ required (22+ recommended). Check with: node -v
```

That's it for the web app, the agents, the skills and the memory loop: the app is static
HTML in `site/`, served by a zero-dependency Node script (`scripts/serve.mjs`). Nothing is
downloaded, nothing is built.

Optional, and only for **rendering PowerPoint decks** and **reading PDFs**:

```bash
npm install                 # root tooling: pdfjs-dist, pptxgenjs, tsx, typescript (~60 packages)
```

All packages come from the npm registry; nothing is pulled from public GitHub at lab time.
If this install hangs on a corporate proxy, the lab still runs: skip it, the self-test
reports the missing pieces as warnings.

---

## Step 1 — run the self-test  →  expect exit code 0

```bash
npm test
```

This runs [`tests/verify.mjs`](tests/verify.mjs) (pure Node, offline, ~5 seconds). It
checks, with a green ✓ / red ✗ / yellow ! per line:

- **Runtime** — Node 20+.
- **Dependencies (optional)** — `pdfjs-dist`, `pptxgenjs`, `tsx`, `typescript`; missing =
  warning, decks and PDF reading unavailable until `npm install`.
- **Skills** — all bundled skills present in `.claude/skills/`.
- **Agents & memory** — the pre-defined agents and the long-term memory index are in place.
- **Projects & data** — the 3 project briefs + the CV PDFs are there.
- **Demo** — the memory × skill (NDA) demo files are in place.
- **References** — the vendored reading is present.
- **Functional smoke** — actually extracts text from a sample CV (PDF pipeline) and renders
  a slide in memory (deck pipeline); skipped with a warning when the optional deps are absent.
- **Front-end, end-to-end** — all files of the static app are present, then **the web app is
  booted for real** (on port 3100): the participants' welcome page must answer with the
  welcome message, the live Agent Flow page, the project API, the Capgemini logo and the
  vendored Mermaid must be served, before the server is stopped.

It ends with a single line:

```
PASS — your environment is ready.
Next: run `npm run web:dev` and open http://localhost:3000 (no install needed)
```

and **exit code 0**. Any red ✗ prints what to fix and exits non-zero. To see the code
explicitly: `npm test; echo "exit code: $?"`.

`npm test -- --next` additionally builds the Next.js fallback in `web/` (instructor option,
needs `npm --prefix web install`).

---

## Step 2 — boot the boilerplate app  →  expect to see the lab title

```bash
npm run web:dev             # = node scripts/serve.mjs
```

Open **http://localhost:3000**. You should see the Capgemini logo, the header
**“AI Agents Tech · Lab”** and the welcome heading
**“Welcome. This morning, you build your own AI agent”** with the 4 lab steps. Step 1
already verified this page serves end-to-end; this step is the human eyeball on it. Press
`Ctrl-C` to stop the server.

---

## Doing it from the Claude app

Open this folder in Claude Code and ask, in plain language:

- **“Run the lab self-test and tell me the exit code.”** → Claude runs `npm test` and reports
  PASS/FAIL.
- **“Kick off the lab.”** → Claude starts the web app (in the in-app browser on Claude
  Desktop, or opens http://localhost:3000 for you) and launches the optional install in the
  background.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `node: command not found` / Node too old | Install Node 20+ (22+ recommended). `node -v` to check. |
| `node`/`npm` "command not found" or no-ops under **nvm** | nvm defines `node`/`npm` as shell functions that don't resolve in a non-login/automation shell. Call the binaries by absolute path (e.g. `~/.nvm/versions/node/<ver>/bin/node`) or run from an interactive/login shell. |
| Self-test **warns** on **Dependencies** | Optional: `npm install` at the repo root enables decks and PDF reading. Warning only, still exit 0. |
| Self-test fails on **web app did not answer** | Port 3100 is taken, or Node < 20. Run `node scripts/serve.mjs --port 3100` by hand and read the error. |
| `Port 3000 is already in use` | The app is probably already running: open http://localhost:3000. Otherwise `node scripts/serve.mjs --port 3001` and open that port. |
| Page loads but says "Couldn't reach the local server" | The server stopped; relaunch `npm run web:dev`. |

---

## For IT review — what this proves (and what it doesn't)

- **Proves:** Node runs; all repo assets are present; the web app serves locally with zero
  packages; when the optional deps are installed, the PDF and deck pipelines actually run
  offline.
- **Does not test:** Claude Code itself (needs `api.anthropic.com`) or live news fetching
  (needs the web / a Tavily key) — both are expected to require network and are documented in
  the README's *Network & data* table.
