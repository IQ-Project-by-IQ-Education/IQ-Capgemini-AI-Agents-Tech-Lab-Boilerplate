---
name: pdf-reading
description: Use when you need to read or extract text from a PDF file (CVs or any reference doc). Guarantees PDF text is accessible on-device, fully standalone — no network, no Python.
---

# PDF reading (standalone)

Read any PDF in this repo reliably, on-device. Two ways — use whichever works in the environment:

1. **Native (default):** Claude Code can usually open a PDF directly with the Read tool. Try this first for a quick look.
2. **Bundled extractor (guaranteed standalone):** if native reading is unavailable or you need plain text for processing, use the local script — it ships with the repo and runs offline after `npm install`:

   ```bash
   npm run read:pdf -- <file.pdf>                 # whole document
   npm run read:pdf -- <file.pdf> --page 3        # one page
   npm run read:pdf -- <file.pdf> --max-chars 4000 # cap output
   ```

   It uses Mozilla's pdf.js (`pdfjs-dist`, pure JavaScript, no native deps) and prints the text page by page to stdout.

## When to use it here

- **Talent / CV scoring:** read CVs from `projects/talent-cv-scoring/data/cvs/*.pdf`. For a live demo, extract a sample of ~8–10, not all 116.
- **Deck / Capgemini branding:** the brand tokens are already summarized in `projects/deck-pptx-creation/brand/capgemini-brand.md`. If a participant supplies the full brand PDF, read it for logo rules and shapes.
- Any other reference PDF a participant drops in.

## Notes & limits

- Works on **text-based PDFs**. Scanned/image-only PDFs have no text layer — the script will return little or nothing (it does not OCR). Say so rather than inventing content.
- Large PDFs (many pages) can take a few seconds — use `--page` or `--max-chars` to target what you need.
- Extraction can include layout artifacts (odd spacing, ligatures); clean up before quoting.
