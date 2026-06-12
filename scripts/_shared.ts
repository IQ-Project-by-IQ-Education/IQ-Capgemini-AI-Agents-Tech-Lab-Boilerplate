/**
 * Shared helpers for the fetch scripts: a tiny zero-dependency .env loader and
 * common types. We avoid extra dependencies so the lab installs fast.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  published: string | null;
  snippet: string;
}

export interface Env {
  TAVILY_API_KEY?: string;
  NEWSAPI_KEY?: string;
}

/** Load .env from the repo root (best-effort) and merge with process.env. */
export function loadEnv(): Env {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const fromFile: Record<string, string> = {};
  try {
    const raw = readFileSync(join(root, ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (value) fromFile[key] = value;
    }
  } catch {
    // no .env file — fall back to process.env only
  }
  const get = (k: string) => process.env[k] || fromFile[k] || undefined;
  return {
    TAVILY_API_KEY: get("TAVILY_API_KEY"),
    NEWSAPI_KEY: get("NEWSAPI_KEY"),
  };
}

/** Read the CLI query argument or exit with a usage hint. */
export function requireQuery(script: string, example: string): string {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    console.error(`Usage: npm run ${script} -- ${example}`);
    process.exit(1);
  }
  return query;
}
