# BLAU BATCH Logos → Inter: Audit & Claude Design Prompt

**Date:** 2026-11-03 · **Goal:** every BLAU BATCH logo wordmark and tagline set in **Inter**, matching the rest of the brand. The B lettermark is unchanged.

---

## 1. Logo audit: where Montserrat still lives

### 1a. Logo files with a wordmark (need redrawing)

Only lockups that contain the words BLAU BATCH or the tagline are affected. Every file below is currently set in **Montserrat** (Black 900 for the wordmark, Regular 400 for the tagline).

| Set | Files (`Brand Assets/Logos/Export/`) | Size | Wordmark / tagline today |
|---|---|---|---|
| Horizontal on White | `Horizontal/BlauBatch_Horizontal_on_White.{png,jpg,svg,eps}` | 3138 × 960 | Navy `#141B3E` wordmark · Steel Blue `#23447A` tagline |
| Horizontal on Navy | `Horizontal/BlauBatch_Horizontal_on_Navy.{png,jpg,svg,eps}` | 3138 × 960 | White wordmark · Sky Blue `#2B8DD0` tagline |
| Horizontal Transparent | `Horizontal/BlauBatch_Horizontal_Transparent.png` | 3138 × 960 | Navy wordmark · Steel Blue tagline |
| Text-only Navy | `TextOnly/BlauBatch_TextOnly_Navy.svg`, `_Navy_Transparent.png`, `_Navy_on_White.{jpg,eps}` | 2356 × 460 | Navy wordmark |
| Text-only White on Navy | `TextOnly/BlauBatch_TextOnly_White_on_Navy.{png,jpg,svg,eps}` | 2356 × 460 | White wordmark |
| Text-only Black on White | `TextOnly/BlauBatch_TextOnly_Black_on_White.jpg` | 2356 × 460 | Black wordmark |
| **Website** (`zeadham/blaubatch`) | `public/logo-horizontal-navy.svg`, `logo-horizontal-white.{svg,png}`, `logo-textonly-navy.png`, `logo-textonly-white.png` | — | Montserrat |

**Technical defect in every SVG lockup:** the text is live `<text>` that pulls Montserrat from Google Fonts with `@import`. Browsers block that import when an SVG is used as an `<img>`, and offline print tools can't fetch it. So the wordmark silently falls back to Arial Black, or isn't shown in the brand font at all. The redesigned SVGs must have their **text converted to outlines (paths)**, with no font import.

### 1b. Logo files with no lettering (no change needed)

Primary (`Logos/BlauBatch_Logo_Primary.jpg`, `Export/Primary/*`), Logomark (`Export/Logomark/*`), all Mono variants (`Logos/BlauBatch_Logo_Mono_*`) and `Blaubatch_cutout-logo.png` contain only the B lettermark. Website `logo-mark*.{png,svg}` and `logo.jpg` are the same.

### 1c. Typed BLAU BATCH wordmarks (text set to look like the logo)

These retype the wordmark in HTML or code instead of placing a logo file. They switch to **Inter Black** once the new logos are approved:

| Where | File(s) | Font today |
|---|---|---|
| Instagram carousels | `Brand Assets/Marketing Content/Instagram Carousels/1–7_*.html` (`.logo-bar`, `.logo-text`) | Montserrat 800/900 |
| Product card | `Brand Assets/Marketing Content/BlauBatch_ProductCard_Print.html` (`.logo-text`, `.back-wordmark`) | Montserrat 900 |
| Sales Tools header | `Sales Tools/index.html` (`.wordmark`) | Montserrat 900 |
| Sales tool page on the website | `zeadham/blaubatch` `app/[lang]/tools/sales/route.js` (embedded copy of the Sales Tools page) | Montserrat 900 |
| Visual Identity Guide samples | `Brand Assets/build_visual_identity.js` (typed "BLAU BATCH" runs) | Montserrat |
| Logo generator | `Brand Assets/generate_logos.py` (renders lockups from `Fonts/Logo only (Montserrat)`) | Montserrat Black / Regular |
| **Website header and footer** | `zeadham/blaubatch` `components/Navbar.jsx`, `Footer.jsx` | **Already Inter 900** ✓ |

The live website already shows the wordmark in Inter, so the logo files are now the outlier.

### 1d. Rule text to update after the new logos are approved

- **Brand Guidelines v5:** §5.2 "Logo Wordmark — Montserrat", and §3 logo descriptions.
- **Visual Identity Guide v1.1:** §2.2, §3 and §3.4 ("Always set in Montserrat Black"), §12.2 and §17.2 (pattern wordmark).
- **`Brand Assets/Fonts/Logo only (Montserrat)/`:** retire it once nothing references it.

---

## 2. Claude Design prompt

**Attach before sending:**
- `Export/Horizontal/BlauBatch_Horizontal_on_White.png` and `BlauBatch_Horizontal_on_Navy.png` (current lockups, for reference)
- `Export/TextOnly/BlauBatch_TextOnly_Navy_Transparent.png`
- `Export/Logomark/BlauBatch_Logomark_Transparent.svg` (the B mark to reuse unchanged)
- `Brand Assets/Fonts/Inter-Black.ttf` and `Inter-Regular.ttf` / `Inter-Medium.ttf`

```text
Redraw the BLAU BATCH logo lockups with the wordmark and tagline set in Inter,
replacing Montserrat. BLAU BATCH is a plastics masterbatch manufacturer; the
brand typeface is now Inter everywhere, and the logo is the last place still in
Montserrat. This is a typeface swap, not a redesign.

KEEP EXACTLY AS IS
- The geometric "B" lettermark: shape, layered blue tones, proportions. Use the
  attached BlauBatch_Logomark_Transparent.svg unchanged.
- Colours: Deep Navy #141B3E, Steel Blue #23447A, Sky Blue #2B8DD0, White #FFFFFF.
- Layouts and canvas sizes of the current files (attached for reference).

CHANGE
- Wordmark "BLAU BATCH": Inter Black (900), all caps. Start from about 0%
  tracking and adjust optically so it holds together at small sizes; it should
  read as a tight, solid block next to the B. Match the cap height of the
  current wordmark.
- Tagline "Full-Spectrum Masterbatch Solutions": Inter Regular (400) or Medium
  (500), title case exactly as written. Pick whichever reads cleaner at 120 px
  logo width, and keep its width no wider than the wordmark above it.

LAYOUT REFERENCE (current horizontal lockup, 3138 x 960 px canvas)
- B mark in its navy container: x 80 to 821, y 80 to 879.
- Wordmark: left edge x ~950, cap band y ~312 to 531 (about 220 px caps).
- Tagline: left edge aligned with the wordmark, y ~572 to 647.
- Re-balance spacing for Inter's wider letterforms, but keep the text block
  vertically centred on the B and the left edges aligned.
Text-only lockup: 2356 x 460 px canvas, "BLAU BATCH" centred, caps about 215 px.

DELIVER THESE VARIANTS (same names, so they drop into the existing folders)
Horizontal (3138 x 960):
  BlauBatch_Horizontal_on_White    navy wordmark, Steel Blue tagline, white background
  BlauBatch_Horizontal_on_Navy     white wordmark, Sky Blue tagline, #141B3E background
  BlauBatch_Horizontal_Transparent navy wordmark, Steel Blue tagline, transparent
Text-only (2356 x 460):
  BlauBatch_TextOnly_Navy_Transparent  navy, transparent
  BlauBatch_TextOnly_Navy_on_White     navy on white
  BlauBatch_TextOnly_White_on_Navy     white on #141B3E
  BlauBatch_TextOnly_Black_on_White    #000000 on white
Formats for each: SVG + PNG (transparent where named, otherwise flat), plus JPG
for the on-White / on-Navy versions.

SVG REQUIREMENTS
- Convert ALL text to outlined paths. No <text> elements, no @import or
  webfont links; the files must render identically offline and inside <img>.
- Embed the B mark as vector paths, not a base64 PNG.
- Exact brand hex values, no gradients or effects added.

CHECKS BEFORE YOU FINISH
- Show each lockup at 120 px wide (the guideline minimum) and at full size,
  on white and on navy, so legibility can be judged.
- Show a side-by-side of old (Montserrat) vs new (Inter) horizontal lockup.
- Confirm the B mark is pixel-identical to the reference.
```

---

## 3. After the new files arrive

1. Replace the files in `Brand Assets/Logos/Export/Horizontal/` and `TextOnly/`. Regenerate the EPS files from the new SVGs.
2. Copy the website variants into `zeadham/blaubatch/public/`.
3. Switch the typed wordmarks in §1c to Inter Black. Update `generate_logos.py` to use `Fonts/Inter-*.ttf` (or retire it, since Claude Design supplies the masters).
4. Update the guideline text in §1d and rebuild the Visual Identity Guide.
5. Regenerate anything that embeds the lockups: AfroPlast PDFs, the Visual Identity Guide, and Generated TDS PDFs (these use the Primary mark only, so they're unaffected).
