#!/usr/bin/env node
// Append one record to a project's local run-log (its "experience" ledger).
//
//   npm run log:run -- <project> "<result>" [--input "<what it was about>"] [--output "<rel path>"]
//
// Example:
//   npm run log:run -- 1-talent-cv-scoring "10 CVs scored; top: Candidate A (4.4/5)" \
//     --input "GenAI Consultant JD" --output "output/shortlist-genai.md"
//
// Pure Node, no dependencies. Creates projects/<project>/runs.json if it doesn't exist.
// This is the deliberately-simple "start with a file" version of memory — when a flat JSON
// log stops being enough, that's the moment you'd graduate to a database (SQLite/FTS).

import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = path.join(root, "projects");

function usageExit(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error(
    'Usage: npm run log:run -- <project> "<result>" [--input "..."] [--output "..."]\n' +
      "Projects: " +
      readdirSync(projectsDir).filter((d) => /^\d/.test(d)).join(", "),
  );
  process.exit(1);
}

const argv = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === "--input" || argv[i] === "--output") flags[argv[i].slice(2)] = argv[++i];
  else positional.push(argv[i]);
}

const [project, result] = positional;
if (!project) usageExit("missing <project>");
if (!result) usageExit("missing \"<result>\" (a one-line summary of the run)");

const projDir = path.join(projectsDir, project);
if (!existsSync(projDir)) usageExit(`unknown project "${project}"`);

const logPath = path.join(projDir, "runs.json");
let runs = [];
if (existsSync(logPath)) {
  try {
    const parsed = JSON.parse(readFileSync(logPath, "utf8"));
    if (Array.isArray(parsed)) runs = parsed;
  } catch {
    console.warn(`(runs.json was unreadable — starting a fresh log)`);
  }
}

const record = { ts: new Date().toISOString() };
if (flags.input) record.input = flags.input;
if (flags.output) record.output = flags.output;
record.result = result;
runs.push(record);

writeFileSync(logPath, JSON.stringify(runs, null, 2) + "\n");
console.log(`Logged run → projects/${project}/runs.json (${runs.length} total)`);
