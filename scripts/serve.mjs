#!/usr/bin/env node
// Lab web app — zero-dependency static server.
//
//   node scripts/serve.mjs [--port 3000]        (or: npm run web:dev)
//
// Serves the static pages in site/ plus three small read-only endpoints the pages poll:
//   GET /api/flow                → { content, updatedAt }   the live agent-flow.mmd (repo root)
//   GET /api/project/<dir>       → { outputs, latestMarkdown, json, runs }  one projects/<dir>/
//   GET /projects/<dir>/output/x → the raw output file (download a .pptx, view a .md)
//
// Pure Node (node:http), nothing to install: it must start on any participant machine even
// when `npm install` hangs on a corporate network. The Next.js app in web/ stays available as
// a fallback (`npm run web:next`), it renders the same data with the same look.
//
// Production thinking, in one line: this is a lab server. It binds to localhost, reads only
// site/ and projects/*/output/, never writes, never executes anything. Don't expose it.

import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = path.join(ROOT, "site");
const PROJECTS = path.join(ROOT, "projects");
const FLOW_FILE = path.join(ROOT, "agent-flow.mmd");

const argPort = process.argv.indexOf("--port");
const PORT = Number(argPort > -1 ? process.argv[argPort + 1] : process.env.PORT || 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".mmd": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

const NO_CACHE = { "Cache-Control": "no-store" };

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...NO_CACHE, ...headers });
  res.end(body);
}

function json(res, data, status = 200) {
  send(res, status, JSON.stringify(data), { "Content-Type": MIME[".json"] });
}

/** Resolve `rel` inside `base`; null when it escapes the base (path traversal). */
function safeJoin(base, rel) {
  const full = path.normalize(path.join(base, rel));
  return full === base || full.startsWith(base + path.sep) ? full : null;
}

async function sendFile(res, file) {
  try {
    const info = await stat(file);
    if (!info.isFile()) return false;
    const type = MIME[path.extname(file).toLowerCase()] || "application/octet-stream";
    send(res, 200, await readFile(file), { "Content-Type": type, "Content-Length": info.size });
    return true;
  } catch {
    return false;
  }
}

// ── /api/flow ──────────────────────────────────────────────────────────────────
// The agent-design skills rewrite agent-flow.mmd after each participant answer; the /flow
// page polls this every 2s. updatedAt (mtime, ms) lets the page show how fresh the last
// write is, so "file not written" and "file written but not rendering" look different.
async function apiFlow(res) {
  try {
    const [content, info] = await Promise.all([readFile(FLOW_FILE, "utf8"), stat(FLOW_FILE)]);
    json(res, { content, updatedAt: info.mtimeMs });
  } catch {
    json(res, { content: "", updatedAt: null });
  }
}

// ── /api/project/<dir> ─────────────────────────────────────────────────────────
// Everything a project page needs, in one call: the files in output/, the newest markdown
// (by mtime, so a `_smoke-*` file never shadows the real latest output), every JSON spec,
// and the run log (newest first).
const isProjectDir = (name) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name);

async function apiProject(res, dir) {
  if (!isProjectDir(dir)) return json(res, { error: "bad project name" }, 400);
  const projDir = safeJoin(PROJECTS, dir);
  if (!projDir) return json(res, { error: "bad project name" }, 400);
  const outDir = path.join(projDir, "output");

  let outputs = [];
  try {
    const names = (await readdir(outDir)).filter((n) => !n.startsWith(".")).sort();
    outputs = (
      await Promise.all(
        names.map(async (name) => {
          const info = await stat(path.join(outDir, name));
          return info.isFile() ? { name, size: info.size, mtimeMs: info.mtimeMs } : null;
        }),
      )
    ).filter(Boolean);
  } catch {
    outputs = []; // no output yet — the page shows its empty state
  }

  let latestMarkdown = null;
  const mds = outputs.filter((f) => /\.(md|markdown)$/i.test(f.name));
  if (mds.length) {
    const latest = mds.reduce((a, b) => (b.mtimeMs > a.mtimeMs ? b : a));
    latestMarkdown = { name: latest.name, content: await readFile(path.join(outDir, latest.name), "utf8") };
  }

  const jsonSpecs = [];
  for (const f of outputs.filter((f) => /\.json$/i.test(f.name))) {
    try {
      jsonSpecs.push({ name: f.name, data: JSON.parse(await readFile(path.join(outDir, f.name), "utf8")) });
    } catch {
      /* skip invalid JSON */
    }
  }

  let runs = [];
  try {
    const parsed = JSON.parse(await readFile(path.join(projDir, "runs.json"), "utf8"));
    if (Array.isArray(parsed)) runs = parsed.slice().reverse();
  } catch {
    runs = [];
  }

  json(res, { project: dir, outputs, latestMarkdown, json: jsonSpecs, runs });
}

// ── Router ─────────────────────────────────────────────────────────────────────
const server = createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, "Method not allowed");
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return send(res, 400, "Bad request");
  }

  if (pathname === "/api/flow") return apiFlow(res);
  const proj = /^\/api\/project\/([^/]+)$/.exec(pathname);
  if (proj) return apiProject(res, proj[1]);

  // Raw output files: /projects/<dir>/output/<file>
  const out = /^\/projects\/([^/]+)\/output\/([^/]+)$/.exec(pathname);
  if (out && isProjectDir(out[1])) {
    const file = safeJoin(path.join(PROJECTS, out[1], "output"), out[2]);
    if (file && (await sendFile(res, file))) return;
    return send(res, 404, "Not found");
  }

  // Static site: "/" → index.html, "/flow" → flow.html, "/assets/x" → as is.
  const rel = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const direct = safeJoin(SITE, rel);
  if (!direct) return send(res, 404, "Not found");
  if (await sendFile(res, direct)) return;
  if (!path.extname(rel) && (await sendFile(res, direct + ".html"))) return;
  send(res, 404, `Not found: ${pathname}`, { "Content-Type": "text/plain; charset=utf-8" });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Either the lab app is already running (open http://localhost:${PORT}),\n` +
        `or stop the other process (macOS/Linux: lsof -ti:${PORT} | xargs kill).`,
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`AI Agents Tech Lab — web app ready on http://localhost:${PORT}  (Ctrl+C to stop)`);
});
