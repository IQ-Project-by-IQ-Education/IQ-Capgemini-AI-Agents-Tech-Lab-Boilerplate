# Test protocol — does the lab run on your machine?

A 2-step check that this repository works end-to-end on a participant's environment,
**before** the lab. It needs **no internet** once installed, **no Python**, and runs from
the terminal or from the **Claude app** (Claude Code).

> **What "pass" means:** the self-test exits with **code 0**, and the boilerplate web app
> boots and shows the lab title. If both are true, this machine is ready.

---

## One-time setup

```bash
# Node 20+ required (22+ recommended). Check with: node -v
npm install                 # root tooling (PDF reading, deck rendering, self-test)
npm --prefix web install    # the front-end app (Next.js) — IT pre-installs this on machines
```

All packages come from the npm registry; nothing is pulled from public GitHub at lab time.

---

## Step 1 — run the self-test  →  expect exit code 0

```bash
npm test
```

This runs [`tests/verify.mjs`](tests/verify.mjs) (pure Node, offline). It checks, with a
green ✓ / red ✗ per line:

- **Runtime** — Node 20+.
- **Dependencies** — `pdfjs-dist`, `pptxgenjs`, `tsx`, `typescript` installed.
- **Skills** — all 15 skills present in `.claude/skills/`.
- **Agents & memory** — the two pre-defined agents (`cv-scorer`, `press-release`) and the
  long-term memory index are in place.
- **Projects & data** — the 3 project briefs + the CV PDFs are there.
- **Demo** — the memory × skill (NDA) demo files are in place.
- **References** — the vendored reading is present.
- **Functional smoke** — actually extracts text from a sample CV (PDF pipeline) and renders
  a slide in memory (deck pipeline).
- **Front-end, end-to-end** — the lab title and Capgemini logo are wired, and (if `web/`
  deps are installed) **the app builds cleanly**, then the **dev server is booted for real**
  (on port 3100): the participants' welcome page must answer with the welcome message and
  serve the logo before the server is stopped.

It ends with a single line:

```
PASS — your environment is ready.
Next: run `npm run web:dev` and open http://localhost:3000
```

and **exit code 0**. Any red ✗ prints what to fix and exits non-zero. To see the code
explicitly: `npm test; echo "exit code: $?"`.

---

## Step 2 — boot the boilerplate app  →  expect to see the lab title

```bash
npm run web:dev
```

Wait for `✓ Ready`, then open the printed link (**http://localhost:3000**). You should see
the Capgemini logo, the header **“AI Agents Tech · Lab”** and the welcome heading
**“Welcome — this morning, you build your own AI agent”** with the 4 lab steps. Step 1
already verified this page serves end-to-end; this step is the human eyeball on it. Press
`Ctrl-C` to stop the server.

---

## Doing it from the Claude app

Open this folder in Claude Code and ask, in plain language:

- **“Run the lab self-test and tell me the exit code.”** → Claude runs `npm test` and reports
  PASS/FAIL.
- **“Start the web app and give me the link.”** → Claude runs `npm run web:dev` and hands you
  the localhost URL to click.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `npm: command not found` / Node too old | Install Node 20+ (22+ recommended). `node -v` to check. |
| `node`/`npm` "command not found" or no-ops under **nvm** | nvm defines `node`/`npm` as shell functions that don't resolve in a non-login/automation shell. Call the binaries by absolute path (e.g. `~/.nvm/versions/node/<ver>/bin/npm`) or run from an interactive/login shell. |
| Self-test fails on **Dependencies** | Run `npm install` at the repo root. |
| Self-test **warns** “web deps not installed” | Run `npm --prefix web install`. (Warning only — still exit 0.) |
| Self-test fails on **web app build** | Re-run `npm --prefix web install`, then `npm test`. Share the 4 lines it printed. |
| `web:dev` port 3000 busy | `npm --prefix web run dev -- -p 3001`, open that port. |
| Page loads but is blank | Hard-refresh; check the terminal running `web:dev` for errors. |

---

## For IT review — what this proves (and what it doesn't)

- **Proves:** Node toolchain works; all repo assets are present; the PDF and deck pipelines
  actually run offline; the Next.js app compiles and serves locally.
- **Does not test:** Claude Code itself (needs `api.anthropic.com`) or live news fetching
  (needs the web / a Tavily key) — both are expected to require network and are documented in
  the README's *Network & data* table.
