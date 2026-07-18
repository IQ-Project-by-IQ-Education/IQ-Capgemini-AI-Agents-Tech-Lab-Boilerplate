import { readFile, stat } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// The agent-design skills (agent-builder, quick-start) rewrite this file after each
// participant answer; the /flow page polls it and redraws the diagram live.
// updatedAt (file mtime, ms) lets the page show how fresh the last write is —
// so "file not being written" and "file written but not rendering" look different.
export async function GET() {
  const file = path.join(process.cwd(), "..", "agent-flow.mmd");
  try {
    const [content, info] = await Promise.all([readFile(file, "utf8"), stat(file)]);
    return Response.json({ content, updatedAt: info.mtimeMs });
  } catch {
    return Response.json({ content: "", updatedAt: null });
  }
}
