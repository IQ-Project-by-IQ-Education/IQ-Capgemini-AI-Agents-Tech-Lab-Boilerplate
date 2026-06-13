# References — vendored, for inspiration

These are third-party materials **copied into the repo on purpose**, so nothing has to be
downloaded from a public source on lab day (Capgemini IT rule: only this whitelisted repo
is reachable). They are *reference reading*, not installed skills — read them, steal the
good parts, then write your own.

| File | What it is | Provenance | Licence |
| --- | --- | --- | --- |
| [karpathy-CLAUDE.md](karpathy-CLAUDE.md) | A short, high-signal `CLAUDE.md` "to steal from" when writing the rulebook you hand an agent | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | — |
| [knowledge-work-legal/](knowledge-work-legal/) | Anthropic's legal-team skill prose (NDA triage, contract review, risk framework) — the basis for our local `nda-analysis` skill | [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) (`legal/`) | Apache-2.0 |

## A reflex worth voicing during the lab — blast radius

An external skill or MCP server runs **with the agent's own permissions**: it can read,
write, and send whatever the agent can. Treat anything you install as attack surface —
**read it before you install it**, and prefer vendoring a reviewed copy (like these) over
pulling code live. That is exactly why these references are committed here rather than
fetched at runtime.
