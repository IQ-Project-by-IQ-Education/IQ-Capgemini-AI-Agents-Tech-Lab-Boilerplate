---
name: debug
description: Use when anything breaks or behaves unexpectedly during the lab, before proposing any fix — blank or broken web page, an npm command fails, an error appears in the terminal, an agent's output is suddenly wrong or empty, the app won't start, or the participant says "it's broken", "it worked before", "can you fix it quickly".
---

# Debug, systematically

Random fixes waste lab minutes and create new breakage in front of an audience. **Find the root cause before touching anything: read the actual error, find what changed, test one hypothesis at a time.**

The participant is a (possibly non-technical) executive watching the screen. They must see calm and method, never thrashing. This is the "production thinking" lesson happening live — narrate it lightly.

## Rule 0 — the participant experience

- Explain in business terms, new-hire metaphor, zero jargon: "the agent's badge to the news database got refused", not "401 from the Tavily API".
- **Never display secrets**: no `cat .env` on screen. Check key presence with a pattern that hides the value, or just test the file exists.
- Give a floor, then a bonus: "worst case we're back to the working version in one minute; best case I fix it in three".

## Demo-mode rule (showcase < 30 min away)

1. Timebox diagnosis to **4 minutes**, announced out loud.
2. The rollback is the guaranteed win: uncommitted changes go to `git stash push -m "broken - recover after demo" -- <paths>` — **stash, never `git checkout --`** (that destroys the participant's work).
3. Timebox blown → roll back, demo the last working version, fix after the slot.
4. Once it renders again: **code freeze** until after the demo, and say so.

## Triage — symptom → first move

| Symptom | Layer | First move |
| --- | --- | --- |
| Not sure what's broken | Environment | `npm test` (see `test-repo`) — each ✗ line says the fix |
| Web page blank / error / won't load | Code | Dev server logs + browser console errors, then `git diff -- web/` |
| An npm command fails | Environment | Read the **full** error; check Node ≥ 20; reinstall per-OS (table in `test-repo`) |
| `fetch:news` empty or key error | Data | Check key presence in `.env` (value hidden); fallback: your own web search, no key needed |
| Agent output wrong, empty, or worse than before | Agent behavior | Not a code bug: check the input data, the agent file, `memory/`. Quality issue → `refine-output` / `self-improve`, not debugging |
| `build:deck` / `read:pdf` fails | Environment | Re-run `npm install`; then validate the deck JSON / PDF path |

## The loop

1. **Read the actual error, entirely** — stack trace, line number, file. It usually contains the answer. No error visible? Go get one (server logs, browser console) before theorizing.
2. **What changed?** `git status` + `git diff` on the touched area. In the lab, the breakage is almost always the last edit — the diff is small and recent; the answer is in it.
3. **One hypothesis, smallest test.** State it ("I think X because Y"), change one thing, check. Didn't work? New hypothesis — never stack a second fix on top.
4. **Fix at the root, then verify with your own eyes**: reload the page in the browser / re-run the command yourself before saying "fixed". A correct-looking diff doesn't count.
5. **3 failed fixes → STOP.** The approach is wrong, not the code: roll back, or question the design with the participant. Never attempt fix #4 on momentum.

## Red flags — stop and return to step 1

- "Just try changing X and see" · "It's probably the wifi" · "Let me rewrite the page from scratch" · "Restart everything" · Several changes at once · Proposing a fix before having read the error text · `rm -rf node_modules` as a *first* move.

## Close the loop

Once fixed: say in one sentence what the root cause was and what production would have needed (a test, a guard, a clearer error). Then run `self-improve` and write the learning to `memory/` — the bug becomes the agent's experience, on screen.
