# Capgemini brand tokens

Lightweight, always-accessible summary of the brand essentials — transcribed from
Capgemini's official brand guidelines (**2017 — Version 1.0**). This is everything the
deck theme needs; the full 45 MB brand PDF is **not** bundled (to keep clones lean). If
you have the source PDF, you can read it with `npm run read:pdf -- <file>`.

> ⚠️ This is the **2017** brand book (the version provided for the lab). Confirm
> against the team's current brand assets before any external-facing use.

## Color palette (page 32)

**Primary (logo colors):**

| Name | HEX | RGB | Pantone |
| --- | --- | --- | --- |
| Capgemini Blue | `#0070AD` | 0, 112, 173 | 7461C |
| Vibrant Blue | `#12ABDB` | 18, 171, 219 | 2191C |

**Secondary:**

| Name | HEX | RGB | Pantone |
| --- | --- | --- | --- |
| Deep Purple | `#2B0A3D` | 43, 10, 61 | 2695C |
| Tech Red | `#FF304C` | 255, 48, 76 | 710C |
| Zest Green | `#95E616` | 149, 230, 22 | 2300C |

**Neutrals:** Gray `#ECECEC` (Cool Grey 1) · White `#FFFFFF`.

Rules: lead with the two primary blues; **max 3 colors** from primary/secondary per
layout; let white space feature heavily; Tech Red is an accent, never behind the logo.

## Typography (pages 48–51)

- **Brand typeface: Ubuntu** — weights Light, Regular, Medium, Bold. Headlines and
  body both set in Ubuntu; slightly negative tracking (~-10).
- **System fallback: Verdana** — when Ubuntu isn't available. *Use this for generated
  `.pptx`* so the deck renders correctly on any machine without font installs.

## Suggested mapping for the deck renderer

| Deck role | Token |
| --- | --- |
| Cover / section / closing background | Capgemini Blue `#0070AD` (or Deep Purple `#2B0A3D`) |
| Accent bar / highlights | Vibrant Blue `#12ABDB` |
| Body text on light slides | Deep Purple `#2B0A3D` or near-black |
| Content background | White, with Gray `#ECECEC` for panels |
| Font | Verdana (Ubuntu-compatible fallback) |
