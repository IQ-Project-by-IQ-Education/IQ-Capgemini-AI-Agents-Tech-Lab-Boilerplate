import { promises as fs } from "node:fs";
import path from "node:path";

// The web app lives in web/. The lab projects are its siblings under ../projects.
const PROJECTS_ROOT = path.join(process.cwd(), "..", "projects");

export type OutputFile = {
  name: string;
  /** Absolute path on disk (server-side only). */
  fullPath: string;
  /** Size in bytes. */
  size: number;
  /** Last-modified time (ms since epoch) — used to pick the newest output. */
  mtimeMs: number;
};

/** List files in a project's output/ folder matching any of the given extensions. */
export async function listOutputs(projectDir: string, exts: string[]): Promise<OutputFile[]> {
  const dir = path.join(PROJECTS_ROOT, projectDir, "output");
  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return []; // no output yet — the page shows an empty state
  }
  const matches = names.filter(
    (n) => !n.startsWith(".") && exts.some((e) => n.toLowerCase().endsWith(e)),
  );
  const files = await Promise.all(
    matches.sort().map(async (name) => {
      const fullPath = path.join(dir, name);
      const stat = await fs.stat(fullPath);
      return { name, fullPath, size: stat.size, mtimeMs: stat.mtimeMs };
    }),
  );
  return files;
}

/** Read the most recently modified markdown file in a project's output/. */
export async function readLatestMarkdown(
  projectDir: string,
): Promise<{ name: string; content: string } | null> {
  const files = await listOutputs(projectDir, [".md", ".markdown"]);
  if (files.length === 0) return null;
  // Pick the newest by mtime, not by name — a `_smoke-*` file must not shadow
  // the real latest output just because it sorts later alphabetically.
  const latest = files.reduce((a, b) => (b.mtimeMs > a.mtimeMs ? b : a));
  const content = await fs.readFile(latest.fullPath, "utf8");
  return { name: latest.name, content };
}

export type RunRecord = { ts?: string; input?: string; output?: string; result?: string };

/** Read a project's local run-log (runs.json), newest first. Returns [] if absent/invalid. */
export async function readRuns(projectDir: string): Promise<RunRecord[]> {
  const file = path.join(PROJECTS_ROOT, projectDir, "runs.json");
  try {
    const parsed = JSON.parse(await fs.readFile(file, "utf8"));
    if (!Array.isArray(parsed)) return [];
    return (parsed as RunRecord[]).slice().reverse();
  } catch {
    return [];
  }
}

/** Read every JSON file in a project's output/ and parse it (skips invalid JSON). */
export async function readJsonOutputs(
  projectDir: string,
  ext = ".json",
): Promise<{ name: string; data: unknown }[]> {
  const files = await listOutputs(projectDir, [ext]);
  const out: { name: string; data: unknown }[] = [];
  for (const f of files) {
    try {
      out.push({ name: f.name, data: JSON.parse(await fs.readFile(f.fullPath, "utf8")) });
    } catch {
      // skip files that aren't valid JSON
    }
  }
  return out;
}
