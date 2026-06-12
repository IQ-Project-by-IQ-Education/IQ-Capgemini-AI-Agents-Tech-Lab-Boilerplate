/**
 * read-pdf.mjs — extract text from a PDF, fully locally (no network, no Python).
 *
 * Usage:  npm run read:pdf -- <file.pdf> [--page N] [--max-chars N]
 * Output: extracted text on stdout, page by page.
 *
 * This is the standalone guarantee for the lab: Claude Code can usually read
 * PDFs natively, but this script ensures the CV bank and the Capgemini brand
 * guidelines are always readable on-device, even if native PDF reading is
 * unavailable on the participant's environment. Uses Mozilla's pdf.js
 * (pdfjs-dist) — pure JavaScript, bundled via `npm install`, no native deps.
 *
 * Plain Node ESM (run directly with `node`, no tsx/transform) for maximum
 * compatibility with pdf.js's bundled module.
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

function parseArgs(argv) {
  const rest = [...argv];
  let file = "";
  let page;
  let maxChars;
  while (rest.length) {
    const a = rest.shift();
    if (a === "--page") page = Number(rest.shift());
    else if (a === "--max-chars") maxChars = Number(rest.shift());
    else if (!file) file = a;
  }
  if (!file) {
    console.error("Usage: npm run read:pdf -- <file.pdf> [--page N] [--max-chars N]");
    process.exit(1);
  }
  return { file, page, maxChars };
}

async function main() {
  const { file, page, maxChars } = parseArgs(process.argv.slice(2));
  const path = resolve(file);
  const data = new Uint8Array(await readFile(path));

  // Legacy build runs in Node without a browser worker.
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await getDocument({ data, useSystemFonts: true, isEvalSupported: false }).promise;

  console.error(`[read-pdf] ${path} — ${doc.numPages} page(s)`);

  const from = page ?? 1;
  const to = page ?? doc.numPages;
  let printed = 0;

  for (let p = from; p <= to; p++) {
    const pg = await doc.getPage(p);
    const content = await pg.getTextContent();
    const text = content.items
      .map((it) => ("str" in it ? it.str : ""))
      .join(" ")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    if (!text) continue;
    if (maxChars && printed >= maxChars) {
      console.error(`[read-pdf] stopped at --max-chars ${maxChars} (page ${p - 1})`);
      break;
    }
    console.log(`\n----- page ${p} -----`);
    const slice = maxChars ? text.slice(0, Math.max(0, maxChars - printed)) : text;
    console.log(slice);
    printed += slice.length;
  }
}

main().catch((err) => {
  console.error(`[read-pdf] error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
