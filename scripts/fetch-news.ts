/**
 * fetch-news.ts — fetch fresh news items for the press-synthesis project.
 *
 * Usage:  npm run fetch:news -- "<query>"
 * Output: structured JSON on stdout (title, source, url, published, snippet).
 *
 * Prefers Tavily (orientated for agents, news freshness), falls back to NewsAPI.
 * Keys are read from .env — if none is set, the script explains what's missing
 * instead of failing silently. Claude Code can also just search the web directly;
 * this script exists so the same fetch is reproducible inside the n8n routine.
 */

import { loadEnv, requireQuery, type NewsItem } from "./_shared.js";

async function fetchFromTavily(apiKey: string, query: string): Promise<NewsItem[]> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      topic: "news",
      search_depth: "basic",
      max_results: 10,
      days: 7,
    }),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { results?: Array<Record<string, unknown>> };
  return (data.results ?? []).map((r) => ({
    title: String(r.title ?? ""),
    url: String(r.url ?? ""),
    source: hostOf(String(r.url ?? "")),
    published: r.published_date ? String(r.published_date) : null,
    snippet: String(r.content ?? "").slice(0, 400),
  }));
}

async function fetchFromNewsApi(apiKey: string, query: string): Promise<NewsItem[]> {
  const url = new URL("https://newsapi.org/v2/everything");
  url.searchParams.set("q", query);
  url.searchParams.set("language", "en");
  url.searchParams.set("sortBy", "publishedAt");
  url.searchParams.set("pageSize", "10");
  const res = await fetch(url, { headers: { "X-Api-Key": apiKey } });
  if (!res.ok) throw new Error(`NewsAPI ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { articles?: Array<Record<string, any>> };
  return (data.articles ?? []).map((a) => ({
    title: String(a.title ?? ""),
    url: String(a.url ?? ""),
    source: String(a.source?.name ?? hostOf(String(a.url ?? ""))),
    published: a.publishedAt ? String(a.publishedAt) : null,
    snippet: String(a.description ?? "").slice(0, 400),
  }));
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function main() {
  const env = loadEnv();
  const query = requireQuery("fetch:news", '"GenAI enterprise adoption"');

  if (env.TAVILY_API_KEY) {
    console.error(`[fetch-news] querying Tavily for: ${query}`);
    print(await fetchFromTavily(env.TAVILY_API_KEY, query));
    return;
  }
  if (env.NEWSAPI_KEY) {
    console.error(`[fetch-news] querying NewsAPI for: ${query}`);
    print(await fetchFromNewsApi(env.NEWSAPI_KEY, query));
    return;
  }

  console.error(
    [
      "[fetch-news] No news API key found in .env.",
      "  Set TAVILY_API_KEY (preferred) or NEWSAPI_KEY in your .env file.",
      "  Alternatively, ask Claude Code to search the web directly — no key needed.",
    ].join("\n"),
  );
  process.exit(1);
}

function print(items: NewsItem[]) {
  console.log(JSON.stringify({ count: items.length, items }, null, 2));
}

main().catch((err) => {
  console.error(`[fetch-news] error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
