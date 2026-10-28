# Blau Batch — 16:9 Presentation Layout Blueprint

**Deck:** "One Source. Full Spectrum." — Filler Masterbatch & Portfolio Overview
**Format:** 16:9 widescreen · 1920 × 1080 px (13.333 × 7.5 in / 960 × 540 pt)
**Brand source:** Brand Guidelines v4 (colours, Montserrat + Open Sans), spec data from `generate_tds_pdfs.py`
**Imagery:** "Antigravity shot" = AI-generated plate produced in Antigravity per the shot brief on each slide.

---

## 0. Global System (applies to every slide)

### 0.1 Canvas & Grid

| Token | Value (px @1920) | PowerPoint (pt) |
|---|---|---|
| Canvas | 1920 × 1080 | 960 × 540 |
| Outer margin (L/R) | 96 | 48 |
| Top margin | 80 | 40 |
| Bottom margin (above footer) | 72 | 36 |
| Columns | 12 | 12 |
| Gutter | 24 | 12 |
| Column width | 128 | 64 |
| Baseline unit | 8 | 4 |

**Split conventions** (measured edge-to-edge of the canvas, image panels bleed to the edge):

| Split | Text zone | Image zone | Use |
|---|---|---|---|
| 60 / 40 | cols 1–7 (x 96 → 1128) | x 1152 → 1920 (bleed right) | Spec slides |
| 40 / 60 | x 0 → 768 (bleed left) | cols 6–12 (x 792 → 1824) | Mirrored spec slides |
| 55 / 45 | cols 1–6 | x 1056 → 1920 | Title / section openers |
| 100 | cols 1–12 | — | Tables, grids |

### 0.2 Colour Tokens (60-30-10)

| Role | Token | Hex | Share |
|---|---|---|---|
| Dominant surface (dark slides) | Deep Navy | `#141B3E` | 60% |
| Dominant surface (light slides) | White / Mist | `#FFFFFF` / `#F0F4F8` | 60% |
| Secondary surface, table headers, cards | Steel Blue | `#23447A` | 30% |
| Rules, eyebrows, data highlights | Sky Blue | `#2B8DD0` | — |
| Single accent (one element per slide max) | Manufacturing Amber | `#D4840A` | 10% |
| Hairlines, dividers | Light Grey | `#DCDCDC` | — |

Rule: Amber appears **once per slide** — a badge, a key number, or a CTA. Never on body text.

### 0.3 Text Hierarchy

| Level | Font / Weight | Size px (pt) | Line height | Tracking | Case | Colour (dark / light slide) |
|---|---|---|---|---|---|---|
| **Eyebrow** | Montserrat ExtraBold 800 | 16 (8) | 1.0 | +12% | UPPERCASE | Sky Blue / Sky Blue |
| **H1 — Slide title** | Montserrat Black 900 | 72 (36) | 1.05 | -1% | Sentence | White / Deep Navy |
| **H1 Display (title & section slides only)** | Montserrat Black 900 | 112 (56) | 1.0 | -2% | Sentence | White |
| **H2 — Sub-header** | Montserrat ExtraBold 800 | 36 (18) | 1.2 | 0 | Sentence | Sky Blue / Steel Blue |
| **H3 — Card / column title** | Montserrat Bold 700 | 24 (12) | 1.25 | 0 | Sentence | White / Deep Navy |
| **Body** | Open Sans Regular 400 | 22 (11) | 1.5 | 0 | Sentence | White 85% / `#2A3350` |
| **Spec Value** | Montserrat ExtraBold 800 | 44 (22) | 1.0 | -1% | — | White / Deep Navy |
| **Spec Unit** | Montserrat Bold 700 | 18 (9) | 1.0 | 0 | as written | Sky Blue |
| **Spec Label** | Montserrat Bold 700 | 13 (6.5) | 1.2 | +8% | UPPERCASE | White 60% / `#5A6380` |
| **Table cell** | Open Sans Regular 400 | 18 (9) | 1.4 | 0 | — | Deep Navy |
| **Footnote / source** | Open Sans Regular 400 | 14 (7) | 1.4 | 0 | Sentence | White 50% / `#7A8299` |

Hierarchy rules:
- Max **3 levels** visible per slide (Eyebrow + H1 + one of H2/Body/Specs).
- H1 max 2 lines, ≤ 8 words. Body max 3 lines, ≤ 60 characters per line.
- Spec blocks always stack **Label → Value + Unit**, never inline.

### 0.4 Persistent Chrome

- **Footer band** (y 1008 → 1080, height 72): logo mono 28 px tall at x 96 (white on navy slides, navy on light); page number right-aligned at x 1824, Montserrat Bold 14; thin 1 px Light Grey rule at y 1008 on light slides only.
- **Footer is suppressed** on Slide 1 (Title) and Slide 12 (Close).
- Image panels that bleed to an edge sit **behind** the footer; the footer turns transparent over imagery.

### 0.5 Antigravity Macro Shot — Global Art Direction

All macro plates share one look so the deck reads as a single set:
- **Subject:** masterbatch pellets / CaCO₃ granules / film and sack textures.
- **Lens:** 100 mm macro, f/4–f/5.6, shallow depth of field, focus plane on the front third.
- **Light:** single soft key from top-left, cool fill; specular highlights on pellet edges.
- **Background:** seamless Deep Navy `#141B3E` falling to near black `#0A0E1A`, or clean white sweep for light slides.
- **Grade:** low saturation, cool whites, no colour cast other than brand blues; **no text, logos or hands** in frame.
- **Composition:** subject weighted to the side **away** from the text zone; 15% negative space on the text-facing edge.
- **Export:** 2× the panel size (e.g. a 768 × 1080 panel → 1536 × 2160 JPG), sRGB.

---

## Slide-by-Slide Blueprint

---

### Slide 1 — Title

**Framing:** 55 / 45. **Left 55%** is a Deep Navy type panel; **right 45%** (x 1056 → 1920, full height, bleed top/right/bottom) is reserved for a clean Antigravity macro shot.

```
┌───────────────────────────────┬──────────────────────┐
│ [logo]                        │                      │
│                               │   ANTIGRAVITY MACRO  │
│ EYEBROW                       │   white CaCO₃ pellets│
│ One Source.                   │   on navy            │
│ Full Spectrum.                │                      │
│ ───────── (sky rule 60%)      │                      │
│ Sub-header                    │                      │
│                       [AMBER] │                      │
└───────────────────────────────┴──────────────────────┘
```

| Element | Level | Copy | Position |
|---|---|---|---|
| Logo | — | Blau Batch white mono | x 96, y 80, height 48 |
| Eyebrow | Eyebrow | MASTERBATCH PORTFOLIO 2026 | x 96, y 360 |
| Title | H1 Display | One Source. / Full Spectrum. | x 96, y 400, two lines |
| Rule | — | Sky Blue, 2 px, 60% of text column | below title, +32 |
| Sub-header | H2 (Sky Blue) | Filler, white, black, colour and additive masterbatch from a single supplier. | below rule, +32, max width cols 1–6 |
| Badge | Amber accent | MANUFACTURED IN-HOUSE | bottom-left, y 920 |

**Antigravity shot brief:** Overhead-angled macro of white CaCO₃ filler pellets spilling diagonally from upper-right to lower-centre; pellets crisp in the right half, blurring into navy toward the left edge to blend with the type panel.

---

### Slide 2 — The Problem

**Framing:** 40 / 60, **light slide**. **Left 40%** holds the problem statement; **right 60%** is a vertical stack of 3 pain-point cards.

```
┌────────────────┬─────────────────────────────────────┐
│ EYEBROW        │ ┌─────────────────────────────────┐ │
│ Still managing │ │ 01  Multiple suppliers          │ │
│ 3–5 masterbatch│ └─────────────────────────────────┘ │
│ suppliers?     │ ┌─────────────────────────────────┐ │
│                │ │ 02  Inconsistent quality        │ │
│ Body           │ └─────────────────────────────────┘ │
│                │ ┌─────────────────────────────────┐ │
│                │ │ 03  Fragmented technical support│ │
└────────────────┴─────────────────────────────────────┘
```

| Element | Level | Copy / Spec |
|---|---|---|
| Eyebrow | Eyebrow | THE PROBLEM |
| Title | H1 | Still managing 3–5 masterbatch suppliers? |
| Body | Body | Every extra supplier adds a contract, a quality variable and a technical contact. |
| Cards (×3) | H3 + Body | Mist `#F0F4F8` fill, 4 px Steel Blue left border, 24 px padding, 24 px gap; number in Montserrat Black 44 Sky Blue |

No imagery. Typography and cards only.

---

### Slide 3 — The Portfolio: One Source

**Framing:** 100% width, **dark slide**. Header block across top 30%; **bottom 70%** is a 5-column portfolio grid.

```
┌──────────────────────────────────────────────────────┐
│ EYEBROW                                              │
│ H1 One supplier. Every grade.                        │
├──────────┬──────────┬──────────┬──────────┬──────────┤
│ FILLER   │ WHITE    │ BLACK    │ COLOUR   │ ADDITIVE │
│ [AMBER   │ [SKY     │ [SKY     │ [SKY     │ [SKY     │
│ IN-HOUSE]│ CORAPLAST│ CORAPLAST│ CORAPLAST│ CORAPLAST│
│ swatch   │ swatch   │ swatch   │ swatch   │ swatch   │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

| Element | Spec |
|---|---|
| Columns | 5 equal cards, Steel Blue `#23447A` fill, 24 px gutters, 8 px radius |
| Card top | 200 px square pellet swatch (mini Antigravity plate per product family, same lighting) |
| Card title | H3 — Filler / White / Black / Colour / Additive |
| Origin tag | Spec Label in a pill: "MANUFACTURED IN-HOUSE" (Amber — the slide's single accent) on Filler; "VIA CORAPLAST" (Sky Blue outline) on the other four |
| Card body | Body, 2 lines max, e.g. "PE & PP grades, 70–80% CaCO₃" |

---

### Slide 4 — PE Filler Masterbatch Range

**Framing:** 60 / 40. **Left 60%** (cols 1–7) contains a 2 × 2 grade-card grid, each card with a 3-column specs row; **right 40%** (x 1152 → 1920, full bleed) is reserved for a clean Antigravity macro shot.

```
┌──────────────────────────────────────┬───────────────────┐
│ EYEBROW  PE FILLER MASTERBATCH       │                   │
│ H1 High loading for film & bags      │                   │
│ H2 LLDPE / LDPE carrier              │   ANTIGRAVITY     │
│ ┌────────────────┐ ┌────────────────┐│   MACRO           │
│ │FMPE-1070       │ │FMPE-1075       ││   pellets on      │
│ │CaCO₃│MFI│DENS. │ │CaCO₃│MFI│DENS. ││   blown film      │
│ └────────────────┘ └────────────────┘│                   │
│ ┌────────────────┐ ┌────────────────┐│                   │
│ │FMPE-1080       │ │FMPE-2070       ││                   │
│ └────────────────┘ └────────────────┘│                   │
└──────────────────────────────────────┴───────────────────┘
```

| Element | Level | Copy |
|---|---|---|
| Eyebrow | Eyebrow | PE FILLER MASTERBATCH |
| Title | H1 | High loading for film and bags |
| Sub-header | H2 | LLDPE & LDPE carriers · 160–250 °C processing |

**Grade cards** (each 504 × 196 px, Mist fill on light slide, 24 px padding). Card title = H3 grade code; beneath it a **3-column specs row** (Spec Label → Spec Value + Unit), separated by 1 px Light Grey verticals:

| Grade | Carrier (in card subtitle) | CaCO₃ | MFI (2.16 kg / 190 °C) | Density @23 °C |
|---|---|---|---|---|
| FMPE-1070 | LLDPE | 70 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-1075 | LLDPE | 75 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-1080 | LLDPE | 80 % ±2 | 2.3 g/10 min | 1.70 g/cm³ |
| FMPE-2070 | LDPE | 70 % ±2 | 2.0 g/10 min | 1.65 g/cm³ |

Accent: the highest-loading grade's CaCO₃ value (FMPE-1080 · 80%) is set in Amber.

Footnote (y 968): *Typical values. See individual TDS for full specification.*

**Antigravity shot brief:** Macro of white filler pellets resting on a translucent, slightly crinkled blown-film sheet, backlit so the film glows cool blue-white. Subject weighted right; left 15% falls off to Mist `#F0F4F8` to meet the grid.

---

### Slide 5 — PP Filler Masterbatch Range

**Framing:** Mirror of Slide 4 — 40 / 60. **Left 40%** (x 0 → 768, full bleed) is reserved for a clean Antigravity macro shot; **right 60%** (cols 6–12) contains the 2 × 2 grade-card grid with 3-column specs rows.

| Element | Level | Copy |
|---|---|---|
| Eyebrow | Eyebrow | PP FILLER MASTERBATCH |
| Title | H1 | Stiffness and stability for raffia and moulding |
| Sub-header | H2 | PP & PPH carriers · 160–250 °C processing |

| Grade | Carrier | CaCO₃ | MFI (2.16 kg / 230 °C) | Specific gravity |
|---|---|---|---|---|
| FMPP-1070 | PP | 70 % ±2 | 8 g/10 min | 2.1 |
| FMPP-1075 | PP | 75 % ±2 | 8 g/10 min | 2.1 |
| FMPP-1080 | PP | 80 % ±2 | 8 g/10 min | 2.1 |
| FMPP-2180 | PPH | 80 % ±2 | 8 g/10 min | 2.1 |

Card specs identical to Slide 4. Accent: Amber on the "PPH" carrier tag of FMPP-2180 (the differentiator).

**Antigravity shot brief:** Macro of pellets nested in the weave of a woven PP raffia sack, side-lit to rake across the weave texture. Subject weighted left; right 15% falls off to white.

---

### Slide 6 — Full Grade Comparison

**Framing:** 100% width, **light slide**. Header top 22%; **bottom 78%** is a single full-width spec table. No imagery.

| Element | Spec |
|---|---|
| Eyebrow / H1 | GRADE COMPARISON / Eight grades, one specification standard |
| Table width | cols 1–12 (1728 px) |
| Columns (7) | Grade · Carrier · CaCO₃ · MFI · Density / SG · Moisture · Primary applications |
| Header row | Steel Blue fill, Spec Label style in white, 56 px tall |
| Body rows | 8 rows × 64 px, Table cell style, alternating `#FFFFFF` / `#F0F4F8` |
| Group divider | 2 px Sky Blue rule between PE block (4 rows) and PP block (4 rows) |
| Grade column | Montserrat Bold 18, Deep Navy |
| Moisture values | < 0.05 (all except FMPE-2070 and FMPP-1080: < 0.08) |
| Accent | None — data slide, no Amber |

---

### Slide 7 — Applications

**Framing:** 100% width, **dark slide**. Header top 20%; **bottom 80%** is a 4 × 2 image-tile grid.

| Element | Spec |
|---|---|
| Eyebrow / H1 | APPLICATIONS / Built for the lines you already run |
| Tiles | 8 tiles, 414 × 300 px, 24 px gutters, 8 px radius |
| Tile image | Antigravity macro per industry (same set as `public/images/industries/`): Packaging, Pipes, Agriculture, Textiles, Construction, Wire & Cable, Automotive, Consumer Goods |
| Tile overlay | Bottom 40% linear gradient Deep Navy 0 → 90% opacity |
| Tile label | H3 white, bottom-left, 20 px inset; Spec Label beneath listing the matching grades (e.g. "FMPE-1070 · FMPE-1080") |

**Antigravity shot brief (set):** Each tile is a material-level macro, not a product shot — e.g. film edge, pipe cross-section, raffia weave, cable jacket — identical lighting to §0.5, centred subject (tiles are text-bottom).

---

### Slide 8 — Processing & Handling

**Framing:** 60 / 40, **light slide**. **Left 60%** contains a 3-column × 2-row specs grid; **right 40%** is reserved for a clean Antigravity macro shot.

| Spec tile | Label | Value | Unit |
|---|---|---|---|
| 1 | PROCESSING TEMP. | 160–250 | °C |
| 2 | PACKING | 25 | kg PP bag |
| 3 | SHELF LIFE | 6 | months |
| 4 | DISPERSION AID | Included | — |
| 5 | APPEARANCE | White | — |
| 6 | STORAGE | Dry | conditions |

Tiles: 320 × 200 px, no fill, 1 px Light Grey top border, Spec Label → Spec Value + Unit. Accent: Amber on "25 kg".

**Antigravity shot brief:** Macro of a 25 kg woven bag's open mouth with pellets cascading out in a frozen arc, shot from low angle; dark navy backdrop on the right edge for contrast with the light slide.

---

### Slide 9 — Manufacturing Capability

**Framing:** Full-bleed photograph with a **left 45% navy gradient panel** (Deep Navy 95% → 0% from x 0 → 864) carrying the type.

| Element | Level | Copy / Spec |
|---|---|---|
| Background | — | `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg`, cropped to 1920 × 1080, subject right of centre |
| Eyebrow | Eyebrow | MANUFACTURED IN-HOUSE |
| Title | H1 | Our line. Our formulation. Our quality control. |
| Proof points | 3 stacked rows, Spec Value (Amber on first only) + Body | e.g. "8 filler grades", "PE & PP carriers", "70–80% CaCO₃ loading" |

---

### Slide 10 — Distribution Partnership (Coraplast)

**Framing:** 50 / 50, **light slide**. **Left 50%** text and co-brand lock-up; **right 50%** is a 2 × 2 grid of product-family swatch tiles.

| Element | Spec |
|---|---|
| Lock-up | Blau Batch primary logo + 1 px vertical Light Grey divider + Coraplast logo, total height 56 px, x 96, y 120 |
| Eyebrow / H1 | DISTRIBUTION PARTNER / White, black, colour and additive via Coraplast |
| Body | One order, one invoice, one technical contact — Blau Batch. |
| Swatch tiles | White · Black · Colour · Additive; 384 × 384 px each, Antigravity macro pellet plate per family, H3 label below tile |

---

### Slide 11 — Custom Formulation

**Framing:** 40 / 60, **dark slide**. **Left 40%** is reserved for a clean Antigravity macro shot; **right 60%** contains a 4-step horizontal process strip.

| Step | H3 | Body (1 line) |
|---|---|---|
| 01 | Brief | Share resin, process and target properties. |
| 02 | Formulate | Lab trial against your specification. |
| 03 | Sample | Trial quantity shipped with TDS. |
| 04 | Supply | Scale to production volumes. |

Steps: number in Montserrat Black 56 Sky Blue, connected by a 2 px Sky Blue line at number mid-height; Amber dot on step 04.

**Antigravity shot brief:** Macro of a lab petri dish holding a gradient of pellets from white to blue, top-down, glass edge catching a rim light. Reference: `Brand Assets/Photos & Visuals/Blue masterbatch in lab.png`.

---

### Slide 12 — Close / Call to Action

**Framing:** Mirrors Slide 1 — 55 / 45. **Left 55%** navy type panel; **right 45%** reuses the Slide 1 Antigravity plate, flipped horizontally, for bookend symmetry.

| Element | Level | Copy |
|---|---|---|
| Title | H1 Display | One source. / Let's talk. |
| Sub-header | H2 (Sky Blue) | Request samples or a technical data sheet. |
| CTA button | Amber fill, white Montserrat ExtraBold 20, 64 px tall, 32 px horizontal padding, 8 px radius | Request samples |
| Contact block | Body | blaubatch.com · [email] · [phone] |
| Logo | — | White mono, bottom-left, 40 px tall |

---

## Appendix — Asset Checklist

| # | Asset | Slide(s) | Source |
|---|---|---|---|
| A1 | White CaCO₃ pellet spill (navy) | 1, 12 | Antigravity |
| A2 | 5 product-family swatches | 3, 10 | Antigravity |
| A3 | Pellets on blown film | 4 | Antigravity |
| A4 | Pellets in raffia weave | 5 | Antigravity |
| A5 | 8 industry material macros | 7 | Existing `public/images/industries/` set or Antigravity |
| A6 | Bag mouth pellet cascade | 8 | Antigravity |
| A7 | Facility photo | 9 | `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg` |
| A8 | Lab gradient petri dish | 11 | Antigravity |
| A9 | Logos (white mono, navy mono, primary, Coraplast) | all | `Brand Assets/Logos/` |

**Data note:** PE TDS sheets state density in g/cm³; PP TDS sheets state specific gravity (unitless). Slides 4–5 keep each family's own label; Slide 6 heads the column "Density / SG" and keeps the g/cm³ unit on PE cells only.
