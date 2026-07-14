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
section("Dependencies (root) — from `npm install`");
for (const dep of ["pdfjs-dist", "pptxgenjs", "tsx", "typescript"]) {
  if (existsSync(rel(`node_modules/${dep}`))) ok(dep);
  else fail(`${dep} not installed — run \`npm install\` at the repo root`);
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
]) {
  need(`.claude/skills/${s}/SKILL.md`, `${s}`);
}

// ── Agents & memory ──────────────────────────────────────────────────────────
section("Agents (.claude/agents) & long-term memory");
for (const a of ["press-release", "deck-maker"]) {
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
// 1. PDF reading really works (Node + pdfjs).
try {
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
try {
  const Pptx = (await import("pptxgenjs")).default;
  const deck = new Pptx();
  deck.addSlide().addText("AI Agents Tech — Lab", { x: 1, y: 1 });
  const data = await deck.write({ outputType: "base64" });
  if (typeof data === "string" && data.length > 0) ok("deck rendering works (pptxgenjs)");
  else fail("pptxgenjs produced no output");
} catch (e) {
  fail(`deck rendering failed — ${String(e.message ?? e).split("\n")[0]}`);
}

// ── Front-end (web/) ────────────────────────────────────────────────────────────
section("Front-end (web/)");
need("web/package.json", "web app present");
need("web/public/capgemini-logo.webp", "Capgemini logo");
try {
  const layout = readFileSync(rel("web/app/layout.tsx"), "utf8");
  if (layout.includes("AI Agents Tech")) ok('lab title wired ("AI Agents Tech — Lab")');
  else fail("lab title not found in web/app/layout.tsx");
} catch {
  fail("web/app/layout.tsx missing");
}
if (existsSync(rel("web/node_modules"))) {
  process.stdout.write("  … building the web app (~20s) … ");
  try {
    // execSync runs through a shell, which resolves `npm` → `npm.cmd` (via PATHEXT) on
    // Windows. Modern Node (CVE-2024-27980 mitigation) refuses to execFile a .cmd/.bat
    // directly and throws EINVAL.
    execSync("npm run build", {
      cwd: rel("web"),
      stdio: ["ignore", "pipe", "pipe"],
    });
    console.log("\r  \x1b[32m✓\x1b[0m web app builds cleanly            ");
  } catch (e) {
    console.log("\r  \x1b[31m✗\x1b[0m web app build failed              ");
    const out = (String(e.stdout ?? "") + String(e.stderr ?? "")).trim();
    const detail = out || String(e.message ?? e);
    console.log("    " + detail.split("\n").slice(-6).join("\n    "));
    failures++;
  }

  // End-to-end: boot the dev server and check the participants' welcome page — the exact
  // flow a participant runs on lab day (`npm run web:dev` → http://localhost:3000).
  process.stdout.write("  … booting the dev server — welcome page check (~15s) … ");
  const PORT = 3100; // dedicated port, so a dev server already running on 3000 doesn't interfere
  // Single command string + shell:true — resolves npm→npm.cmd on Windows without tripping
  // DEP0190. detached on POSIX makes the server its own process group so we can kill
  // npm AND next; taskkill /T does that job on Windows.
  const server = spawn(`npm run dev -- --port ${PORT}`, {
    cwd: rel("web"),
    stdio: "ignore",
    shell: true,
    detached: process.platform !== "win32",
  });
  const stopServer = () => {
    try {
      if (process.platform === "win32") {
        execFileSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
      } else {
        process.kill(-server.pid, "SIGTERM");
      }
    } catch {}
  };
  try {
    let html = "";
    const deadline = Date.now() + 90_000;
    for (;;) {
      try {
        const res = await fetch(`http://localhost:${PORT}/`);
        if (res.ok) {
          html = await res.text();
          break;
        }
      } catch {}
      if (Date.now() > deadline) throw new Error(`dev server did not answer on port ${PORT} within 90s`);
      await new Promise((r) => setTimeout(r, 1000));
    }
    console.log(`\r  \x1b[32m✓\x1b[0m dev server boots and serves the home page (port ${PORT})   `);
    if (html.includes("you build your own AI agent")) ok("participants' welcome message is on the page");
    else fail("welcome message not found on the home page — check web/app/page.tsx");
    const logo = await fetch(`http://localhost:${PORT}/capgemini-logo.webp`);
    if (logo.ok) ok("Capgemini logo is served");
    else fail(`Capgemini logo not served (HTTP ${logo.status}) — check web/public/capgemini-logo.webp`);
  } catch (e) {
    console.log("\r  \x1b[31m✗\x1b[0m dev server / welcome page check failed              ");
    console.log("    " + String(e.message ?? e).split("\n")[0]);
    failures++;
  } finally {
    stopServer();
  }
} else {
  warn("web deps not installed — run `npm --prefix web install` (IT pre-installs this)");
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n" + "─".repeat(48));
if (failures === 0) {
  console.log(
    `\x1b[32mPASS\x1b[0m — your environment is ready` +
      (warnings ? ` (${warnings} warning(s) above)` : "") +
      `.\nNext: run \`npm run web:dev\` and open http://localhost:3000`,
  );
  process.exit(0);
} else {
  console.log(
    `\x1b[31mFAIL\x1b[0m — ${failures} problem(s) above. Fix them and re-run \`npm test\`.`,
  );
  process.exit(1);
}
