# web — the lab front-end

A **minimal Next.js app** that renders each project's `output/` folder on screen:

- `/talent` → the latest scorecard markdown from `projects/1-talent-cv-scoring/output/`
- `/radar` → the latest briefing markdown from `projects/2-radar-press-synthesis/output/`
- `/deck` → deck specs (`*.json`) and rendered `*.pptx` from `projects/3-deck-pptx-creation/output/`

It is its **own npm project** (separate from the root scripts), so the root `npm install`
stays small — only people who want the UI pull Next.js.

## Run it

From the repo root:

```bash
npm run web:dev      # → http://localhost:3000   (or: npm --prefix web run dev)
```

Drop a markdown file into a project's `output/` and refresh — the pages read at request time.

## Deliberately plain

The styling is intentionally basic (Capgemini brand colors, lots of white space). The point
is to **upgrade it live with the `frontend-design` skill** — that's a demo moment, not a gap.

## Dependencies (for IT review)

`next`, `react`, `react-dom` only — about **28 packages** total from the **npm registry**
(Next 15 ships most of its tooling pre-bundled, so the tree is small). Per the lab's network
rules, this must be **pre-installed by IT** when machines are prepared
(`npm --prefix web install`), the same way the CV data is pre-loaded. The committed
`package-lock.json` pins exact versions; `node_modules` is git-ignored. (`npm audit` reports
2 moderate advisories in Next's transitive deps — acceptable for a local lab; do not
`audit fix --force`, which pulls a breaking major.)

## How it reads project output

`lib/readOutput.ts` resolves sibling projects at `path.join(process.cwd(), "..", "projects")`
and reads with `node:fs`. `lib/markdown.tsx` is a tiny, dependency-free markdown→React
renderer covering what the lab skills emit (headings, tables, lists, bold/links). No markdown
library is added.
