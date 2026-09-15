#!/usr/bin/env node
// Lab 3 — self-test.  Run with:  npm test   (or: node tests/verify.mjs)
//
// Exit code 0  → your environment is ready for the lab.
// Exit code 1  → something needs fixing; the message above the summary tells you what.
//
// Pure Node, no dependencies, no network. Safe to run on a locked-down machine.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { execFileSync, execSync, spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (p) => path.join(root, p);

let failures = 0;
let warnings = 0;
const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const fail = (m) => {
  console.log(`  \x1b[31m✗\x1b[0m ${m}`);
  failures++;
};
const warn = (m) => {
  console.log(`  \x1b[33m!\x1b[0m ${m}`);
  warnings++;
};
const section = (t) => console.log(`\n${t}`);

function need(relPath, label) {
  if (existsSync(rel(relPath))) ok(label ?? relPath);
  else fail(`${label ?? relPath} — missing: ${relPath}`);
}

console.log("Lab 3 self-test — checking your environment\n" + "─".repeat(48));

// ── Runtime ───────────────────────────────────────────────────────────────
section("Runtime");
const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor >= 20) ok(`Node ${process.version}`);
else fail(`Node ${process.version} — the lab needs Node 20 or newer`);

// ── Root dependencies ───────────────────────────────────────────────────────
// Only decks (pptxgenjs) and PDF reading (pdfjs-dist) need them. The web app, the agents,
// the skills and the memory loop all run without any install — a missing install is a
// warning, not a failure, so the lab never blocks on a slow corporate network.
section("Dependencies (root) — from `npm install` (decks + PDF reading only)");
let rootDepsOk = true;
for (const dep of ["pdfjs-dist", "pptxgenjs", "tsx", "typescript"]) {
  if (existsSync(rel(`node_modules/${dep}`))) ok(dep);
  else {
    warn(`${dep} not installed — needed for decks / PDF reading only (run \`npm install\` at the repo root)`);
    rootDepsOk = false;
  }
}

// ── Skills ──────────────────────────────────────────────────────────────────
section("Skills (.claude/skills) — all bundled, no download");
for (const s of [
  "cv-scoring",
  "press-synthesis",
  "deck-builder",
  "frontend-design",
  "pdf-reading",
  "nda-analysis",
  "brainstorming",
  "teach",
  "test-repo",
  "kick-off",
  "agent-builder",
  "quick-start",
  "self-improve",
  "capgemini-brand",
  "showcase",
  "cv-demo",
  "debug",
]) {
  need(`.claude/skills/${s}/SKILL.md`, `${s}`);
}

// ── Agents & memory ──────────────────────────────────────────────────────────
section("Agents (.claude/agents) & long-term memory");
for (const a of ["press-release", "deck-maker", "cv-screener"]) {
  need(`.claude/agents/${a}.md`, `agent: ${a}`);
}
need("memory/MEMORY.md", "long-term memory index");

// ── Projects & data ──────────────────────────────────────────────────────────
section("Projects & data");
for (const p of [
  "1-talent-cv-scoring",
  "2-radar-press-synthesis",
  "3-deck-pptx-creation",
]) {
  need(`projects/${p}/README.md`, `projects/${p}`);
}
try {
  const cvs = readdirSync(rel("projects/1-talent-cv-scoring/data/cvs")).filter((f) =>
    f.toLowerCase().endsWith(".pdf"),
  );
  if (cvs.length > 0) ok(`${cvs.length} CV PDFs present`);
  else fail("no CV PDFs found in projects/1-talent-cv-scoring/data/cvs");
} catch {
  fail("CV data folder missing: projects/1-talent-cv-scoring/data/cvs");
}

// ── Demo (memory × skill) ─────────────────────────────────────────────────────
section("Demo — memory × skill (instructor)");
need("demos/CLAUDE.md", "demos/CLAUDE.md");
need("demos/nda-review/memory/MEMORY.md", "memory index");
need("demos/nda-review/memory/it-stack.md", "Microsoft-only memory rule");
need("demos/nda-review/contracts/sample-nda.md", "sample NDA");

// ── References ────────────────────────────────────────────────────────────────
section("References (vendored)");
need("references/karpathy-CLAUDE.md", "Karpathy CLAUDE.md");
need("references/knowledge-work-legal/triage-nda.SKILL.md", "knowledge-work legal");

// ── Functional smoke (offline) ─────────────────────────────────────────────────
section("Functional smoke (offline)");
if (!rootDepsOk) {
  warn("skipping PDF + deck smoke tests (root deps not installed)");
}
// 1. PDF reading really works (Node + pdfjs).
if (rootDepsOk) try {
  const cvDir = rel("projects/1-talent-cv-scoring/data/cvs");
  const firstCv = readdirSync(cvDir).find((f) => f.toLowerCase().endsWith(".pdf"));
  if (!firstCv) throw new Error("no CV to test");
  const out = execFileSync(
    process.execPath,
    [rel("scripts/read-pdf.mjs"), path.join(cvDir, firstCv), "--max-chars", "400"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  ok(`read:pdf works (extracted ${out.trim().length} chars from a sample CV)`);
} catch (e) {
  fail(`read:pdf failed — ${String(e.message ?? e).split("\n")[0]}`);
}
// 2. Deck rendering dependency loads and renders (pptxgenjs), in-memory, no disk.
if (rootDepsOk) try {
  const Pptx = (await import("pptxgenjs")).default;
  const deck = new Pptx();
  deck.addSlide().addText("AI Agents Tech — Lab", { x: 1, y: 1 });
  const data = await deck.write({ outputType: "base64" });
  if (typeof data === "string" && data.length > 0) ok("deck rendering works (pptxgenjs)");
  else fail("pptxgenjs produced no output");
} catch (e) {
  fail(`deck rendering failed — ${String(e.message ?? e).split("\n")[0]}`);
}

// ── Front-end (site/ + scripts/serve.mjs) ─────────────────────────────────────
// The lab web app is static HTML served by a zero-dependency Node server: nothing to
// install, nothing to build. This boots it on a dedicated port (so a server already running
// on 3000 doesn't interfere), checks the exact pages a participant sees, then stops it.
section("Front-end (site/) — static app, no install needed");
need("scripts/serve.mjs", "static server script");
need("site/index.html", "welcome page");
need("site/flow.html", "live Agent Flow page");
need("site/assets/site.css", "shared stylesheet");
need("site/assets/app.js", "page runtime");
need("site/vendor/mermaid.min.js", "Mermaid (vendored, offline)");
need("site/assets/capgemini-logo.webp", "Capgemini logo");
try {
  const html = readFileSync(rel("site/index.html"), "utf8");
  if (html.includes("you build your own AI agent")) ok("participants' welcome message is on the page");
  else fail("welcome message not found in site/index.html");
} catch {
  fail("site/index.html missing");
}
{
  process.stdout.write("  … booting the web app — welcome page check (~3s) … ");
  const PORT = 3100;
  const server = spawn(process.execPath, [rel("scripts/serve.mjs"), "--port", String(PORT)], {
    cwd: root,
    stdio: "ignore",
  });
  const stopServer = () => {
    try {
      server.kill("SIGTERM");
    } catch {}
  };
  try {
    const deadline = Date.now() + 20_000;
    let html = "";
    for (;;) {
      try {
        const res = await fetch(`http://localhost:${PORT}/`);
        if (res.ok) {
          html = await res.text();
          break;
        }
      } catch {}
      if (Date.now() > deadline) throw new Error(`web app did not answer on port ${PORT} within 20s`);
      await new Promise((r) => setTimeout(r, 250));
    }
    console.log(`\r  \x1b[32m✓\x1b[0m web app boots and serves the home page (port ${PORT})   `);
    if (html.includes("you build your own AI agent")) ok("welcome message is served");
    else fail("welcome message not found on the served home page");
    const checks = [
      ["/flow", "live Agent Flow page responds"],
      ["/radar", "Radar page responds"],
      ["/deck", "Deck page responds"],
      ["/assets/capgemini-logo.webp", "Capgemini logo is served"],
      ["/vendor/mermaid.min.js", "Mermaid is served (offline)"],
      ["/api/flow", "flow API responds"],
      ["/api/project/2-radar-press-synthesis", "project API responds"],
    ];
    for (const [route, label] of checks) {
      const res = await fetch(`http://localhost:${PORT}${route}`);
      if (res.ok) ok(label);
      else fail(`${label.replace(" responds", "")} failed (HTTP ${res.status}) — check site/ and scripts/serve.mjs`);
    }
    const api = await (await fetch(`http://localhost:${PORT}/api/project/2-radar-press-synthesis`)).json();
    if (Array.isArray(api.outputs) && Array.isArray(api.runs)) ok("project API returns outputs + runs");
    else fail("project API payload malformed — check scripts/serve.mjs");
  } catch (e) {
    console.log("\r  \x1b[31m✗\x1b[0m web app / welcome page check failed              ");
    console.log("    " + String(e.message ?? e).split("\n")[0]);
    failures++;
  } finally {
    stopServer();
  }
}

// ── Fallback front-end (web/, Next.js) — opt-in: `npm test -- --next` ───────────
// Kept for machines where npm install works; never required for the lab to run.
if (process.argv.includes("--next")) {
  section("Fallback front-end (web/, Next.js) — opt-in check");
  if (existsSync(rel("web/node_modules"))) {
    process.stdout.write("  … building the Next.js app (~20s) … ");
    try {
      // execSync runs through a shell, which resolves `npm` → `npm.cmd` (via PATHEXT) on
      // Windows. Modern Node (CVE-2024-27980 mitigation) refuses to execFile a .cmd/.bat
      // directly and throws EINVAL. Build into .next-verify (see web/next.config.mjs) so a
      // dev server already running on .next is never corrupted by the self-test.
      execSync("npm run build", {
        cwd: rel("web"),
        stdio: ["ignore", "pipe", "pipe"],
        env: { ...process.env, NEXT_DIST_DIR: ".next-verify" },
      });
      console.log("\r  \x1b[32m✓\x1b[0m Next.js app builds cleanly            ");
    } catch (e) {
      console.log("\r  \x1b[31m✗\x1b[0m Next.js app build failed              ");
      const out = (String(e.stdout ?? "") + String(e.stderr ?? "")).trim();
      console.log("    " + (out || String(e.message ?? e)).split("\n").slice(-6).join("\n    "));
      failures++;
    }
  } else {
    warn("web deps not installed — the Next.js fallback needs `npm --prefix web install`");
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(48));
if (failures === 0) {
  console.log(
    `\x1b[32mPASS\x1b[0m — your environment is ready` +
      (warnings ? ` (${warnings} warning(s) above)` : "") +
      `.\nNext: run \`npm run web:dev\` and open http://localhost:3000 (no install needed)`,
  );
  process.exit(0);
} else {
  console.log(
    `\x1b[31mFAIL\x1b[0m — ${failures} problem(s) above. Fix them and re-run \`npm test\`.`,
  );
  process.exit(1);
}
