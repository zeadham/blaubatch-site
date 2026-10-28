# BLAU BATCH — 16:9 Presentation Layout Blueprint

**Deck:** "One Source. Full Spectrum." — Filler Masterbatch & Portfolio Overview
**Format:** 16:9 widescreen · 1920 × 1080 px (13.333 × 7.5 in / 960 × 540 pt). Sizes are given in pt (PowerPoint) with px at 1920 wide (px = pt × 2).
**Spec data:** `generate_tds_pdfs.py` (TDS values for the 8 filler grades)

**Governing documents** (cited inline):
- **[BG]** `Brand Assets/BlauBatch_BrandGuidelines_v4.docx`: Corporate Brand Identity Manual v4.0
- **[VI]** `Brand Assets/BlauBatch_VisualIdentityGuide_v1.docx`: Visual Identity Guide v1.0

Where the two differ, the stricter rule is used and the conflict is noted.

> **Imagery: approved exception.** [BG §16.4] and [VI §15.3] prohibit AI-generated imagery. The Marketing & Operations Manager, the brand approval authority [VI §20], approved **photorealistic AI images generated in Antigravity** for this deck on 2026-10-28. Every other photography rule in [BG §16.4] still applies: clean, sharp, colour-accurate, studio-lit, and on white, light grey or navy backgrounds. Each image zone carries an **Antigravity shot brief**. See §0.7 for the conditions on generated images.

---

## 0. Global System

### 0.1 Canvas & Grid

The guides define no slide grid, so this deck uses the web grid tokens ([VI §11.3]).

| Token | px @1920 | pt | Source |
|---|---|---|---|
| Canvas | 1920 × 1080 | 960 × 540 | — |
| Side margins | 80 | 40 | `grid-margin-web` [VI §11.3] |
| Top margin | 80 | 40 | matches side margin |
| Columns | 12 | 12 | `grid-columns-web` |
| Gutter | 24 | 12 | `grid-gutter-web` |
| Column width | ≈ 124.7 | ≈ 62.3 | derived |
| Spacing scale | 4 · 8 · 16 · 32 · 64 · 128 | 2 · 4 · 8 · 16 · 32 · 64 | `space-xs` → `space-xxl` |

**Split conventions.** Image zones bleed to the canvas edge. Text zones keep the 80 px margin, with a `space-xl` (64 px) gap before the image.

| Split | Text zone (x) | Image zone (x) | Use |
|---|---|---|---|
| 60 / 40 | 80 → 1088 | 1152 → 1920 | Spec slides (image right) |
| 40 / 60 | 832 → 1840 | 0 → 768 | Mirrored spec slides (image left) |
| 55 / 45 | 80 → 992 | 1056 → 1920 | Title |
| 50 / 50 | 80 → 896 | 960 → 1920 | Partnership |
| 100 | 80 → 1840 | — | Tables, grids |

### 0.2 Colour

| Token | Hex | Permitted role on slides | Source |
|---|---|---|---|
| Deep Navy | `#141B3E` | Dark slide backgrounds, cover, H1 on light slides | [BG §4.3], [VI §11] |
| Steel Blue | `#23447A` | Secondary headings, eyebrows on light slides, supporting panels, table headers | [VI §11] |
| Sky Blue | `#2B8DD0` | Accent lines (1–2 px), CTA buttons, icons, product badges, H2 sub-headers on **light** slides | [BG §4.3], [VI §11, §16.3] |
| Manufacturing Amber | `#D4840A` | **Only** "MANUFACTURED" chips and manufacturing highlights. Never dominant, never in patterns. | [VI §11, §17.4] |
| Light Grey | `#DCDCDC` | Light slide backgrounds, alternate table rows, dividers, co-brand divider | [VI §11, §19] |
| White | `#FFFFFF` | Light slide backgrounds, all text on dark slides | [VI §11] |

**Ratio across the deck** [VI §11.1]: 60% Deep Navy + White · 25% Steel Blue + Sky Blue · 10% Light Grey · 5% Amber.

**Contrast rules applied** [VI §11.2]:
- **On Deep Navy:** all text is White. Sky Blue is used for lines and icons only, never text. The guide lists Sky-on-Navy as failing.
- **Sky Blue text:** only on White, and only at ≥ 18 pt or ≥ 14 pt bold (H2 and larger).
- **Amber:** never used as text colour. The "MANUFACTURED" chip is an Amber fill with Deep Navy text (5.7:1).
- **Body text on light slides:** Deep Navy (14.7:1) or Dark Grey `#333333`.

> **Guide discrepancy.** The [VI §11.2] contrast table lists Sky Blue on White at 4.6:1 and Sky Blue on Navy at 3.2:1. Measured values are 3.6:1 and 4.6:1. This blueprint follows both the guide's restrictions and the measured values, which is why Sky Blue text is limited to large sizes on White. The table should be corrected in the next guide revision.

### 0.3 Text Hierarchy

All levels come from the [BG §5.3] / [VI §13] type scale. Heading line height 1.2×, body 1.5× [VI §12.2].

| Level | Font / Weight | pt (px) | Case | Colour: light slide / dark slide | Source |
|---|---|---|---|---|---|
| **Display** (slides 1, 12 only) | Montserrat Black 900 | 60 (120) | ALL CAPS | — / White | BG 60–72 pt; VI 48–72 pt → 60 satisfies both |
| **H1: slide title** | Montserrat ExtraBold 800 | 36 (72) | ALL CAPS | Deep Navy / White | 36–48 pt |
| **H2: sub-header** | Montserrat Bold 700 | 28 (56) | Title Case | Sky Blue / White | 28–32 pt; Sky Blue for subheadings [BG §4.3] |
| **H3: card / column title** | Open Sans Bold 700 | 20 (40) | Title Case | Deep Navy / White | 20–24 pt |
| **Body** | Open Sans Regular 400 | 12 (24) | Sentence case | Deep Navy / White | 10–12 pt |
| **Caption / label** (eyebrows, spec labels) | Open Sans Regular 400 | 9 (18) | ALL CAPS | Steel Blue / White | 8–9 pt |
| **Footnote / page no.** | Open Sans Regular 400 | 8 (16) | Sentence case | `#333333` / White | 7–8 pt |

**Spec blocks** (no dedicated data style exists in the guides, so existing levels are combined):
- **Label:** Caption.
- **Value:** H2 style (Montserrat Bold 28 pt), in Deep Navy or White, *not* Sky Blue, so it reads as data and not as a heading.
- **Unit:** Body (Open Sans 12 pt), placed on the line below the value.

**Hierarchy rules**
- Maximum 3 levels per slide: Caption eyebrow + H1 + one of H2, Body or spec blocks.
- H1 maximum 2 lines. Body maximum 3 lines per block.
- Brand name: **BLAU BATCH** in display and logo uses; **Blau Batch** in body text; **blaubatch.com** for the URL. Never "BlauBatch" [VI §6].
- Tagline is always "Full-Spectrum Masterbatch Solutions", in title case [VI §6.3].
- Voice: technical and precise. Use specifications instead of superlatives. Make no unsubstantiated claims and no claims of certifications not held [BG §14.2].

### 0.4 Shapes, Lines & Icons

| Element | Spec | Source |
|---|---|---|
| Cards / panels | `border-radius-md` 4 px, flat (`shadow-none`) | [VI §11.3] |
| Callout blocks | `border-radius-lg` 8 px | [VI §11.3] |
| Chips / badges | `border-radius-sm` 2 px | [VI §11.3] |
| Tables | 0 px radius (sharp industrial) | [VI §11.3] |
| Accent lines | Sky Blue, 1–2 px | [VI §16.3] |
| Angular dividers | 30° diagonal, matching the lettermark facets | [VI §16.3] |
| Icons | Phosphor Icons, Regular weight only; 32 or 48 px; Deep Navy on light, White on dark | [VI §16.1–16.3] |

### 0.5 Logo & Persistent Chrome

All files are in `Brand Assets/Logos/`. Paths below are relative to that folder.

| Use | File | Size / placement | Source |
|---|---|---|---|
| Title slide (navy) | `Export/Horizontal/BlauBatch_Horizontal_on_Navy.png`. The tagline is built in and the box is `#141B3E`, so it blends into the slide. | Top-left, x 80, y 80, 400 px wide (122 px tall) | [VI §2.2] |
| Light-slide title / header uses | `Export/Horizontal/BlauBatch_Horizontal_Transparent.png` (navy wordmark, tagline built in) | As needed, ≥ 120 px wide | [VI §2.2] |
| Footer, dark slides | `Export/Logomark/BlauBatch_Logomark_Transparent.png` (full-colour B, white stem) | x 80, 40 px tall | [VI §2.3] |
| Footer, light slides | `BlauBatch_Logo_Mono_SteelBlue_Transparent.png` (single-tone B, the "presentations" variant) | x 80, 40 px tall | [VI §8.3] |
| Over photography | `Export/Primary/BlauBatch_Logo_Primary.png` (B inside its navy container) | — | [VI §7.0, §7.3] |
| End card | `Export/Horizontal/BlauBatch_Horizontal_on_Navy.png`, centred | 640 px wide | [VI §18.3] |
| Co-brand (slide 10) | `Export/Horizontal/BlauBatch_Horizontal_Transparent.png` + `coraplast-logo0d-01-01.png` | See slide 10 | [VI §19] |
| Wordmark pattern tile | `Export/TextOnly/BlauBatch_TextOnly_White_on_Navy.png` (dark) / `Export/TextOnly/BlauBatch_TextOnly_Navy_Transparent.png` (light) | See §0.6 | [VI §17.2] |

- **Footer logos:** the logomark-only versions are allowed because the brand is established on the title slide [VI §2.3].
- **Don't use on a light background:** `BlauBatch_Logomark_Transparent.png` or `Blaubatch_cutout-logo.png`. Their white stem disappears.
- **File format:** use the PNG files in PowerPoint. The SVG lockups import Montserrat from Google Fonts for their text, so they render wrongly where that font isn't loaded. Use the EPS files only for print.
- **Minimum size and clear space:** at least 120 px wide (60 pt) for any lockup. Clear space at least 20 px, preferably 40 px [VI §5.1b, §5.2]. Never recolour, stretch or re-typeset a logo [BG §3.1].
- **Footer band:** y 1016 → 1080 (64 px). Logo at x 80. Page number right-aligned at x 1840 in Footnote style.
- **No footer** on slides 1 and 12.

### 0.6 Background Pattern

The text-only BLAU BATCH wordmark pattern is the preferred pattern [VI §17.2].
- **Tile:** build it from the TextOnly files listed in §0.5.
- **Opacity:** White at 10% on navy slides; Deep Navy at 8% on white slides.
- **Where:** slides 1, 3 and 12 only, behind content and never behind the logo.
- **Rules:** never use Amber in it, and never rotate or skew it [VI §17.4].

### 0.7 Antigravity Imagery: Global Art Direction

All image zones share one look, following the [BG §16.4] visual style rules.

**Style**
- **Subjects:** masterbatch pellets, application samples (film, raffia, pipe and others), lab and process scenes. These map to the "Product", "Material Detail" and "Process" categories.
- **Realism:** must read as authentic studio or industrial photography. No illustrative, 3D-render or painterly look, no heavy filters or stylisation [BG §16.4].
- **Lighting:** studio light, clean and evenly lit, sharp across the subject. No blur used as a stylistic effect.
- **Background:** White, Light Grey `#DCDCDC` or Deep Navy `#141B3E` seamless.
- **Colour accuracy:** pellet colours must match the real product. White filler reads neutral white, with no blue or yellow cast.
- **Composition:** subject weighted away from the text zone, with about 15% negative space on the edge facing the text.
- **Resolution:** generate at least 2× the panel size (for a 768 × 1080 panel, 1536 × 2160). For print versions, upscale to 300 dpi.

**Conditions on generated images**
- **No text, logos or labels in the generated image.** Image generators distort logos. Where a branded bag or sign is needed, generate it blank and composite the real logo file from §0.5 afterwards.
- **No identifiable people.** Hands or gloved hands are fine. [BG §16.4] reserves people imagery for real Blau Batch staff.
- **Proof-of-capability shots stay real.** Slide 9 (the factory) uses the actual `BlauBatchFacility.jpg`, so the claim "our line" is backed by a real photo.
- **Approval:** final selects are approved by the Marketing & Operations Manager [VI §20].

**Base prompt suffix** (append to every brief): *"photorealistic studio product photography, 100 mm macro lens, f/8, soft key light from top-left, sharp focus throughout, accurate neutral colour, clean seamless background, no text, no logos, no people's faces"*.

### 0.8 Transitions

Following [VI §18.3–18.4]:
- **Between sections:** crossfade, 500 ms.
- **Title text:** fade in with a 200 ms stagger per line.
- **Optional:** a 3 s opening logo bumper.
- **Never:** wipes, zooms, bounces or "star" transitions.

---

## Slide-by-Slide Blueprint

---

### Slide 1 — Title

**Framing:** 55 / 45. The **left 55%** is a Deep Navy type panel with the wordmark pattern at 10%. The **right 45%** (x 1056 → 1920, full height, bleeding top, right and bottom) is reserved for an Antigravity product image.

```
┌───────────────────────────────┬──────────────────────┐
│ [BLAU BATCH lockup + tagline] │                      │
│                               │   ANTIGRAVITY IMAGE  │
│ EYEBROW (caption)             │   filler pellets     │
│ ONE SOURCE.                   │   on navy seamless   │
│ FULL SPECTRUM.                │                      │
│ ── sky line 2px               │                      │
│ Sub-header (white, H2)        │                      │
│ [MANUFACTURED chip]           │                      │
└───────────────────────────────┴──────────────────────┘
```

| Element | Level | Copy | Position |
|---|---|---|---|
| Logo | `Export/Horizontal/BlauBatch_Horizontal_on_Navy.png` | — | x 80, y 80, 400 px wide |
| Eyebrow | Caption, White | MASTERBATCH PORTFOLIO 2026 | x 80, y 392 |
| Title | Display, White | ONE SOURCE. / FULL SPECTRUM. | x 80, y 424, 2 lines |
| Accent line | Sky Blue 2 px, 60% of text-zone width | — | title + 32 px |
| Sub-header | H2, White | Filler, White, Black, Colour and Additive Masterbatch | line + 32 px, max width 912 px |
| Chip | Amber fill, Deep Navy Caption text, 2 px radius, 8 / 16 px padding | MANUFACTURED: FILLER MASTERBATCH | y 904 |

**Antigravity shot brief:** *"Close-up of matte white calcium carbonate filler masterbatch pellets, cylindrical, about 3 mm, in a loose diagonal spill from upper right to lower centre on a deep navy (#141B3E) seamless background, pellets concentrated in the right two-thirds of the frame"* + base suffix. Output 1728 × 2160 (portrait).

---

### Slide 2 — The Problem

**Framing:** 40 / 60, **light slide** (White). The **left 40%** holds the problem statement; the **right 60%** is a vertical stack of 3 cards. No photography.

```
┌────────────────┬─────────────────────────────────────┐
│ EYEBROW        │ ┌─[icon]──────────────────────────┐ │
│ STILL MANAGING │ │ Multiple Suppliers              │ │
│ 3–5 MASTER-    │ └─────────────────────────────────┘ │
│ BATCH SUPPLIERS│ ┌─[icon]──────────────────────────┐ │
│ Body           │ │ Variable Batch Quality          │ │
│                │ └─────────────────────────────────┘ │
│                │ ┌─[icon]──────────────────────────┐ │
│                │ │ Several Technical Contacts      │ │
└────────────────┴─────────────────────────────────────┘
```

| Element | Level | Copy / Spec |
|---|---|---|
| Eyebrow | Caption, Steel Blue | THE PROBLEM |
| Title | H1, Deep Navy | STILL MANAGING 3–5 MASTERBATCH SUPPLIERS? |
| Body | Body | Every extra supplier adds a contract, a quality variable and another technical contact. |
| Cards (×3) | H3 + Body | Light Grey `#DCDCDC` fill, 4 px radius, 32 px padding, 16 px between cards. 2 px Sky Blue accent line on the left edge. Phosphor icon at 32 px in Deep Navy (e.g. `Truck`, `Flask`, `Phone`). |

This layout has the text on the left and the cards on the right, so it uses a 40 / 60 split measured from the left. Text zone: x 80 → 688. Cards: x 752 → 1840.

---

### Slide 3 — The Portfolio: One Source

**Framing:** 100% width, **dark slide** (Deep Navy, wordmark pattern 10%). A header block fills the top 28%; the **bottom 72%** is a 5-column portfolio grid.

```
┌──────────────────────────────────────────────────────┐
│ EYEBROW                                              │
│ ONE SUPPLIER. EVERY GRADE.                           │
├──────────┬──────────┬──────────┬──────────┬──────────┤
│ [photo]  │ [photo]  │ [photo]  │ [photo]  │ [photo]  │
│ Filler   │ White    │ Black    │ Colour   │ Additive │
│[MANUFAC- │ VIA      │ VIA      │ VIA      │ VIA      │
│ TURED]   │ CORAPLAST│ CORAPLAST│ CORAPLAST│ CORAPLAST│
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

| Element | Spec |
|---|---|
| Eyebrow / H1 | Caption, White: FULL-SPECTRUM PORTFOLIO / H1, White: ONE SUPPLIER. EVERY GRADE. |
| Columns | 5 equal cards, 333 px wide, 24 px gutters. Steel Blue fill, 4 px radius, 32 px padding. |
| Card image | 269 px square Antigravity image of that product family's pellets on a White background. All five use one prompt, changing only the pellet colour (white / black / one bright colour / translucent natural for additive / matte white filler), so the lighting matches. |
| Card title | H3, White: Filler / White / Black / Colour / Additive |
| Origin chip | **Filler:** Amber fill, Deep Navy Caption text "MANUFACTURED". **The other four:** 1 px White outline, White Caption text "VIA CORAPLAST" (Sky Blue text would fail on Steel Blue). |
| Card body | Body, White, 2 lines max. e.g. "PE and PP grades, 70–80% CaCO₃." |

---

### Slide 4 — PE Filler Masterbatch Range

**Framing:** 60 / 40, **light slide** (White). The **left 60%** (x 80 → 1088) contains a 2 × 2 grid of grade cards, each with a 3-column specs row. The **right 40%** (x 1152 → 1920, full bleed) is reserved for an Antigravity image.

```
┌──────────────────────────────────────┬───────────────────┐
│ EYEBROW  [MANUFACTURED chip]         │                   │
│ HIGH LOADING FOR FILM & BAGS         │                   │
│ Sub-header (Sky Blue H2)             │   ANTIGRAVITY     │
│ ┌────────────────┐ ┌────────────────┐│   IMAGE: pellets  │
│ │FMPE-1070       │ │FMPE-1075       ││   on blown film   │
│ │CaCO₃│MFI│DENS. │ │CaCO₃│MFI│DENS. ││                   │
│ └────────────────┘ └────────────────┘│                   │
│ ┌────────────────┐ ┌────────────────┐│                   │
│ │FMPE-1080       │ │FMPE-2070       ││                   │
│ └────────────────┘ └────────────────┘│                   │
└──────────────────────────────────────┴───────────────────┘
```

| Element | Level | Copy |
|---|---|---|
| Eyebrow + chip | Caption, Steel Blue, followed by the Amber "MANUFACTURED" chip | PE FILLER MASTERBATCH |
| Title | H1, Deep Navy | HIGH LOADING FOR FILM & BAGS |
| Sub-header | H2, Sky Blue | LLDPE & LDPE Carriers, 160–250 °C Processing |

**Grade cards:**
- **Size and style:** 2 × 2, each 488 × 226 px, 32 px gutter. White fill with a 1 px Light Grey border, 4 px radius, 32 px padding.
- **Card title:** H3, the grade code.
- **Subtitle:** Caption, the carrier.
- **Specs row:** 3 columns (Label → Value → Unit), separated by 1 px Light Grey vertical rules.

| Grade | Carrier | CaCO₃ | MFI (2.16 kg / 190 °C) | Density @23 °C |
|---|---|---|---|---|
| FMPE-1070 | LLDPE | 70 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-1075 | LLDPE | 75 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-1080 | LLDPE | 80 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-2070 | LDPE | 70 % ±2 | 2.0 g/10 min | 1.65 g/cm³ |

- **Highlighting:** none on individual values. Amber is reserved for the "MANUFACTURED" chip.
- **Footnote** (Footnote style, y 968): *Typical values. See the individual TDS for full specification.*

**Antigravity shot brief:** *"Close-up of matte white filler masterbatch pellets scattered on a sheet of thin translucent white blown polyethylene film with soft natural creases, on a pure white seamless background, pellets weighted to the right of frame"* + base suffix. Output 1536 × 2160.

---

### Slide 5 — PP Filler Masterbatch Range

**Framing:** The mirror of Slide 4: 40 / 60. The **left 40%** (x 0 → 768, full bleed) is reserved for an Antigravity image. The **right 60%** (x 832 → 1840) contains the 2 × 2 grade-card grid with 3-column specs rows. All other specs match Slide 4.

| Element | Level | Copy |
|---|---|---|
| Eyebrow + chip | Caption, Steel Blue, followed by the Amber "MANUFACTURED" chip | PP FILLER MASTERBATCH |
| Title | H1 | STIFFNESS FOR RAFFIA & MOULDING |
| Sub-header | H2, Sky Blue | PP & PPH Carriers, 160–250 °C Processing |

| Grade | Carrier | CaCO₃ | MFI (2.16 kg / 230 °C) | Specific gravity |
|---|---|---|---|---|
| FMPP-1070 | PP | 70 % ±2 | 8 g/10 min | 2.1 |
| FMPP-1075 | PP | 75 % ±2 | 8 g/10 min | 2.1 |
| FMPP-1080 | PP | 80 % ±2 | 8 g/10 min | 2.1 |
| FMPP-2180 | PPH | 80 % ±2 | 8 g/10 min | 2.1 |

**Antigravity shot brief:** *"Close-up of matte white filler masterbatch pellets resting on a section of woven white polypropylene raffia sack fabric, low side light raking across the weave texture, light grey seamless background, pellets weighted to the left of frame"* + base suffix. Output 1536 × 2160.

---

### Slide 6 — Full Grade Comparison

**Framing:** 100% width, **light slide** (White). A header fills the top 22%; the **bottom 78%** is a single full-width spec table. No photography.

| Element | Spec |
|---|---|
| Eyebrow / H1 | Caption, Steel Blue: GRADE COMPARISON / H1: EIGHT GRADES, ONE STANDARD |
| Table | x 80 → 1840, starts at y 248, 0 px radius |
| Columns (7) | Grade · Carrier · CaCO₃ · MFI · Density / SG · Moisture · Primary applications |
| Header row | Steel Blue fill, White Caption text, 56 px tall |
| Body rows | 8 × 64 px, Body style in Deep Navy. Alternate rows White / Light Grey `#DCDCDC` [VI §11]. |
| Grade column | Open Sans Bold 12 pt |
| Group divider | 2 px Sky Blue line between the PE block (4 rows) and the PP block (4 rows) |
| Moisture | < 0.05 for all grades except FMPE-2070 and FMPP-1080, which are < 0.08 |
| Applications | From the TDS: PE grades for blown film, bags, agricultural film and liners; PP grades for woven sacks, raffia, injection moulding and thermoforming |
| Amber | None |

---

### Slide 7 — Applications

**Framing:** 100% width, **dark slide** (Deep Navy). A header fills the top 20%; the **bottom 80%** is a 4 × 2 grid of photo tiles.

| Element | Spec |
|---|---|
| Eyebrow / H1 | Caption, White: APPLICATIONS / H1, White: BUILT FOR THE LINES YOU RUN |
| Tiles | 8 tiles, 422 × 300 px, 24 px gutters, 4 px radius |
| Tile image | Application-sample images [BG §16.4 "Material Detail"]: Packaging film, Pipe, Agricultural film, Textiles / non-woven, Construction sheet, Wire & cable jacket, Automotive moulding, Consumer goods. Reuse the existing set in `public/images/industries/` (`packaging.png`, `pipes.png`, `agriculture.png`, `textiles.png`, `construction.png`, `wire_cable.png`, `automotive.png`, `consumer_goods.png`) so the deck matches the website. |
| Tile label | Separate Deep Navy strip below each tile (64 px tall) with an H3 White label and Caption grade codes, e.g. "FMPE-1070 · FMPE-1080". This avoids text over photography. |

**Antigravity shot brief (only for gaps in the existing set):** *"Close-up of [finished product sample, e.g. cut end of HDPE pipe] on a white seamless background, centred"* + base suffix. Tiles are centre-weighted because their labels sit below the image.

---

### Slide 8 — Processing & Handling

**Framing:** 60 / 40, **light slide** (White). The **left 60%** contains a 3-column × 2-row specs grid. The **right 40%** is reserved for an Antigravity image.

| Tile | Label (Caption) | Value (H2 style) | Unit (Body) | Icon (Phosphor, Deep Navy, 32 px) |
|---|---|---|---|---|
| 1 | PROCESSING TEMP. | 160–250 | °C | `Thermometer` |
| 2 | PACKING | 25 | kg PP bag | `Package` |
| 3 | SHELF LIFE | 6 | months | `CalendarBlank` |
| 4 | ADDITIVES | Included | dispersion agent, processing aid | `Drop` |
| 5 | APPEARANCE | White | surface colour | `Circle` |
| 6 | STORAGE | Dry | conditions | `Warehouse` |

**Tile style:** 320 × 200 px, no fill, 2 px Sky Blue accent line along the top edge. No Amber on this slide, because this is handling data rather than manufacturing content.

**Antigravity shot brief:** *"Open mouth of a plain white woven polypropylene 25 kg industrial bag, folded down to reveal matte white masterbatch pellets inside, low three-quarter angle, deep navy seamless background"* + base suffix. Output 1536 × 2160. The bag is generated **blank**. If branding is wanted, composite `BlauBatch_Logo_Mono_Navy_Transparent.png` onto the bag face in post, following the bag's perspective.

---

### Slide 9 — Manufacturing Capability

**Framing:** A full-bleed photograph with a **left 45% Deep Navy panel** that goes from 90% opacity at x 0 to 0% at x 864. The text sits inside the ≥ 80% opacity area (x 80 → 760).

| Element | Level | Copy / Spec |
|---|---|---|
| Background | — | `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg` (real photo, per §0.7), cropped to 1920 × 1080 with the subject right of centre |
| Eyebrow + chip | Caption, White, followed by the Amber "MANUFACTURED" chip | IN-HOUSE PRODUCTION |
| Title | H1, White | OUR LINE. OUR FORMULATION. |
| Proof points | 3 stacked spec blocks, Value in White H2 style plus a Body line | "8" filler grades · "PE & PP" carriers · "70–80%" CaCO₃ loading |
| Logo | Footer `Export/Logomark/BlauBatch_Logomark_Transparent.png`, on the navy panel | — |

---

### Slide 10 — Distribution Partnership (Coraplast)

**Framing:** 50 / 50, **light slide** (White). The **left 50%** holds text and the co-brand lock-up. The **right 50%** is a 2 × 2 grid of product-family image tiles.

| Element | Spec | Source |
|---|---|---|
| Lock-up | `Export/Horizontal/BlauBatch_Horizontal_Transparent.png` **first (left)**, 96 px tall. Then a 1 px Light Grey vertical divider, then `coraplast-logo0d-01-01.png` scaled to equal visual weight (about 96 px tall). 2× standard clear space between them (≥ 80 px each side of the divider). | [VI §19] |
| Lock-up label | Caption, Steel Blue: AUTHORISED DISTRIBUTION PARTNER | [VI §19, 16.1] |
| Title | H1: WHITE, BLACK, COLOUR & ADDITIVE | — |
| Body | One order, one invoice, one technical contact: Blau Batch. | [BG §14.2] "cite the Coraplast partnership as a portfolio credential" |
| Image tiles | White · Black · Colour · Additive; 416 × 416 px each, 24 px gutter, 4 px radius. Reuse the slide 3 Antigravity pellet images, cropped square. H3 label below each tile. | [BG §16.4] |
| Amber | None (distributed products) | [VI §11] |

The co-branded slide needs approval from the Marketing & Operations Manager [VI §19].

---

### Slide 11 — Custom Formulation

**Framing:** 40 / 60, **dark slide** (Deep Navy). The **left 40%** is reserved for an Antigravity image. The **right 60%** holds a 4-step horizontal process strip.

| Step | Number | H3 (White) | Body (White) |
|---|---|---|---|
| 01 | Montserrat Bold 28 pt, White | Brief | Share your polymer, process and target properties. |
| 02 | — | Recommend | We recommend the grade, loading and let-down ratio. |
| 03 | — | Sample | Trial quantity shipped with its TDS. |
| 04 | — | Supply | Scale to production volumes. |

- **Connector:** a 2 px Sky Blue line runs through the steps at the height of the numbers' midline.
- **Copy:** follows the custom formulation process in [BG §6.3 / §11] and promises no lead times [BG §14.2].

**Antigravity shot brief:** *"Gloved hands in a laboratory weighing a small sample of blue masterbatch pellets on a precision balance, glass petri dishes of white and blue pellets beside it, clean white lab bench, deep navy background falling off on the right"* + base suffix. Output 1536 × 2160. Hands only, with no faces. Alternatively, use the existing `Brand Assets/Photos & Visuals/Blue masterbatch in lab.png`.

---

### Slide 12 — End Card

**Framing:** An end card per [VI §18.3]: a full BLAU BATCH lockup **centred** on Deep Navy with the tagline below, wordmark pattern at 10%, and no photography. Hold for at least 4 s when the deck is presented as video.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│      [BLAU BATCH horizontal lockup + tagline]        │
│                                                      │
│                                                      │
│            REQUEST SAMPLES OR A TDS (H2)             │
│                 [ REQUEST SAMPLES ]                  │
│                                                      │
│  info@blaubatch.com · +2 0102 2227723 · blaubatch.com│
└──────────────────────────────────────────────────────┘
```

| Element | Level / Spec | Copy |
|---|---|---|
| Logo | `Export/Horizontal/BlauBatch_Horizontal_on_Navy.png`, centred, 640 px wide, 40 px clear space. The tagline is built into the file, so don't set it again as text. | — |
| Sub-header | H2, White | Request Samples or a Technical Data Sheet |
| CTA button | Sky Blue fill, White Montserrat Bold 18 pt in all caps (large text, 3.6:1, passes AA-large), 4 px radius, 64 px tall, 32 px horizontal padding | REQUEST SAMPLES |
| Contact | Body, White | info@blaubatch.com · +2 0102 2227723 · blaubatch.com [BG cover page] |
| Addresses (optional) | Footnote, White | Office: Arkan Plaza, Building 4, Sheikh Zayed City, Giza · Factory: 79, 6th Industrial Zone, 6th of October, Egypt |

---

## Appendix A — Image List

| # | Image | Source | Background | Slide(s) |
|---|---|---|---|---|
| P1 | White filler pellet spill | Antigravity | Deep Navy | 1 |
| P2 | 5 product-family pellet close-ups, one prompt | Antigravity | White | 3, 10 |
| P3 | PE pellets on blown film | Antigravity | White | 4 |
| P4 | PP pellets on raffia weave | Antigravity | Light Grey | 5 |
| P5 | 8 application samples | Existing `public/images/industries/` set | White | 7 |
| P6 | Blank 25 kg bag with pellets (logo composited in post) | Antigravity | Deep Navy | 8 |
| P7 | Facility | **Real:** `Photos & Visuals/BlauBatchFacility.jpg` | — | 9 |
| P8 | Lab sample weighing, hands only | Antigravity or existing `Blue masterbatch in lab.png` | Navy fall-off | 11 |

## Appendix B — Logo Files Used

All files are in `Brand Assets/Logos/`.

| File | Slides |
|---|---|
| `Export/Horizontal/BlauBatch_Horizontal_on_Navy.png` | 1, 12 |
| `Export/Horizontal/BlauBatch_Horizontal_Transparent.png` | 10 |
| `Export/Logomark/BlauBatch_Logomark_Transparent.png` | Footers on dark slides: 3, 7, 9, 11 |
| `BlauBatch_Logo_Mono_SteelBlue_Transparent.png` | Footers on light slides: 2, 4, 5, 6, 8, 10 |
| `BlauBatch_Logo_Mono_Navy_Transparent.png` | Bag composite on slide 8 (optional) |
| `Export/TextOnly/BlauBatch_TextOnly_White_on_Navy.png` | Pattern tile on slides 1, 3, 12 |
| `coraplast-logo0d-01-01.png` | 10 |

## Appendix C — Data Note

The PE TDS sheets state density in g/cm³; the PP TDS sheets state specific gravity, which has no unit. Slides 4–5 keep each family's own label. Slide 6 heads the column "Density / SG" and shows the g/cm³ unit on PE cells only.
