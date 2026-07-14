import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// The agent-design skills (agent-builder, quick-start) rewrite this file after each
// participant answer; the /flow page polls it and redraws the diagram live.
export async function GET() {
  const file = path.join(process.cwd(), "..", "agent-flow.mmd");
  try {
    const content = await readFile(file, "utf8");
    return Response.json({ content });
  } catch {
    return Response.json({ content: "" });
  }
}
