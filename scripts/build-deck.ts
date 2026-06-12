/**
 * build-deck.ts — render a professional .pptx from a JSON deck spec.
 *
 * Usage:  npm run build:deck -- <path/to/deck.json> [path/to/output.pptx]
 * Output: a .pptx file written next to the spec (or to the given output path).
 *
 * The agent writes the *content* as a structured deck spec (see the deck-builder
 * skill for the schema); this script renders it with a clean, consistent house
 * theme. Keeping content (JSON) and rendering (this script) separate is the 80/20:
 * the model focuses on the story, the renderer guarantees the design.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import PptxGenJS from "pptxgenjs";

interface DeckSpec {
  title: string;
  subtitle?: string;
  author?: string;
  slides: Slide[];
}

type Slide =
  | { type: "title"; title: string; subtitle?: string }
  | { type: "section"; title: string }
  | { type: "bullets"; title: string; bullets: string[] }
  | { type: "two-column"; title: string; left: string[]; right: string[]; leftTitle?: string; rightTitle?: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "closing"; title: string; subtitle?: string };

// --- House theme ----------------------------------------------------------
const THEME = {
  ink: "1A2233",
  accent: "0B5FFF",
  muted: "5B6472",
  light: "F4F6FA",
  white: "FFFFFF",
  font: "Arial",
};

function isSlide(s: unknown): s is Slide {
  return !!s && typeof s === "object" && typeof (s as { type?: unknown }).type === "string";
}

function loadSpec(path: string): DeckSpec {
  const raw = JSON.parse(readFileSync(path, "utf8")) as DeckSpec;
  if (!raw.title || !Array.isArray(raw.slides)) {
    throw new Error("Deck spec must have a `title` and a `slides` array.");
  }
  raw.slides.forEach((s, i) => {
    if (!isSlide(s)) throw new Error(`Slide #${i} is missing a valid \`type\`.`);
  });
  return raw;
}

function render(spec: DeckSpec): PptxGenJS {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "WIDE";
  pptx.author = spec.author ?? "Capgemini Lab 3";
  pptx.title = spec.title;

  for (const slide of spec.slides) {
    const s = pptx.addSlide();
    switch (slide.type) {
      case "title":
        s.background = { color: THEME.ink };
        s.addText(slide.title, { x: 0.8, y: 2.6, w: 11.7, h: 1.6, fontSize: 40, bold: true, color: THEME.white, fontFace: THEME.font });
        if (slide.subtitle)
          s.addText(slide.subtitle, { x: 0.8, y: 4.2, w: 11.7, h: 0.9, fontSize: 20, color: THEME.light, fontFace: THEME.font });
        s.addShape(pptx.ShapeType.rect, { x: 0.8, y: 2.45, w: 1.6, h: 0.08, fill: { color: THEME.accent } });
        break;

      case "section":
        s.background = { color: THEME.accent };
        s.addText(slide.title, { x: 0.8, y: 3.1, w: 11.7, h: 1.3, fontSize: 32, bold: true, color: THEME.white, fontFace: THEME.font });
        break;

      case "bullets":
        addHeader(pptx, s, slide.title);
        s.addText(
          slide.bullets.map((b) => ({ text: b, options: { bullet: { indent: 18 }, breakLine: true } })),
          { x: 0.9, y: 1.8, w: 11.5, h: 4.8, fontSize: 18, color: THEME.ink, fontFace: THEME.font, valign: "top", lineSpacingMultiple: 1.3 },
        );
        break;

      case "two-column": {
        addHeader(pptx, s, slide.title);
        const col = (x: number, title: string | undefined, items: string[]) => {
          if (title) s.addText(title, { x, y: 1.7, w: 5.6, h: 0.5, fontSize: 16, bold: true, color: THEME.accent, fontFace: THEME.font });
          s.addText(
            items.map((b) => ({ text: b, options: { bullet: { indent: 16 }, breakLine: true } })),
            { x, y: title ? 2.3 : 1.8, w: 5.6, h: 4.4, fontSize: 16, color: THEME.ink, fontFace: THEME.font, valign: "top", lineSpacingMultiple: 1.25 },
          );
        };
        col(0.9, slide.leftTitle, slide.left);
        col(6.9, slide.rightTitle, slide.right);
        break;
      }

      case "quote":
        s.background = { color: THEME.light };
        s.addText(`“${slide.text}”`, { x: 1.2, y: 2.4, w: 10.9, h: 2.4, fontSize: 26, italic: true, color: THEME.ink, fontFace: THEME.font, align: "center" });
        if (slide.attribution)
          s.addText(`— ${slide.attribution}`, { x: 1.2, y: 4.9, w: 10.9, h: 0.6, fontSize: 16, color: THEME.muted, fontFace: THEME.font, align: "center" });
        break;

      case "closing":
        s.background = { color: THEME.ink };
        s.addText(slide.title, { x: 0.8, y: 3.0, w: 11.7, h: 1.2, fontSize: 32, bold: true, color: THEME.white, fontFace: THEME.font });
        if (slide.subtitle)
          s.addText(slide.subtitle, { x: 0.8, y: 4.2, w: 11.7, h: 0.8, fontSize: 18, color: THEME.light, fontFace: THEME.font });
        break;
    }
  }
  return pptx;
}

function addHeader(pptx: PptxGenJS, slide: PptxGenJS.Slide, title: string) {
  slide.background = { color: THEME.white };
  slide.addText(title, { x: 0.9, y: 0.6, w: 11.5, h: 0.9, fontSize: 26, bold: true, color: THEME.ink, fontFace: THEME.font });
  slide.addShape(pptx.ShapeType.rect, { x: 0.9, y: 1.55, w: 1.4, h: 0.06, fill: { color: THEME.accent } });
}

async function main() {
  const [specArg, outArg] = process.argv.slice(2);
  if (!specArg) {
    console.error("Usage: npm run build:deck -- <deck.json> [output.pptx]");
    process.exit(1);
  }
  const specPath = resolve(specArg);
  const spec = loadSpec(specPath);
  const out = outArg ? resolve(outArg) : specPath.replace(/\.json$/, "") + ".pptx";
  const pptx = render(spec);
  await pptx.writeFile({ fileName: out });
  console.error(`[build-deck] wrote ${spec.slides.length} slides → ${out}`);
}

main().catch((err) => {
  console.error(`[build-deck] error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
