# BLAU BATCH — 16:9 Presentation Layout Blueprint

**Deck:** "One Source. Full Spectrum." — Filler Masterbatch & Portfolio Overview
**Format:** 16:9 widescreen · 1920 × 1080 px (13.333 × 7.5 in / 960 × 540 pt). Sizes are given in pt (PowerPoint) with px at 1920 wide (px = pt × 2).
**Spec data:** `generate_tds_pdfs.py` (TDS values for the 8 filler grades)

**Governing documents** (cited inline):
- **[BG]** `Brand Assets/BlauBatch_BrandGuidelines_v4.docx`: Corporate Brand Identity Manual v4.0
- **[VI]** `Brand Assets/BlauBatch_VisualIdentityGuide_v1.docx`: Visual Identity Guide v1.0

Where the two differ, the stricter rule is used and the conflict is noted.

> **Imagery rule.** Both guides prohibit AI-generated and stock imagery ([BG §16.4], [VI §15.3]). Every image zone in this deck is reserved for **real Blau Batch photography**: studio product shots, process shots or application samples. Each slide carries a shot brief for the photographer. All photography needs approval from the Marketing & Operations Manager before use ([BG §16.4], [VI §20]).

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

| Slide type | Logo file | Placement | Source |
|---|---|---|---|
| Title (navy) | Horizontal lockup, white, **with tagline** | Top-left, x 80, y 80 | [VI §2.2, §3.3] |
| Dark content slides | `BlauBatch_Logo_Mono_White_Transparent.png` | Footer, left | [VI §7, §8.3] |
| Light content slides | `BlauBatch_Logo_Mono_SteelBlue_on_White.png` ("for presentations") | Footer, left | [VI §8.3] |
| Over photography | Logo on a Deep Navy panel at ≥ 80% opacity | — | [VI §7.3] |
| End card | Full lockup centred on navy, tagline below | Centre | [VI §18.3] |

- **Minimum logo width:** 120 px (60 pt). **Clear space:** at least 20 px, preferably 40 px [VI §5.1b, §5.2].
- **Footer band:** y 1016 → 1080 (64 px). Logo at x 80. Page number right-aligned at x 1840 in Footnote style.
- **No footer** on slides 1 and 12.
- **Asset gap:** the horizontal lockup files aren't in this repo (only the primary and mono marks are). Request them from the Marketing & Operations Manager [VI §2.4]. Never rebuild the lockup by typesetting next to the mark.

### 0.6 Background Pattern

The text-only BLAU BATCH wordmark pattern is the preferred pattern [VI §17.2].
- **Opacity:** White at 10% on navy slides; Deep Navy at 8% on white slides.
- **Where:** slides 1, 3 and 12 only, behind content and never behind the logo.
- **Rules:** never use Amber in it, and never rotate or skew it [VI §17.4].

### 0.7 Photography: Global Art Direction

All image zones share one look, per [BG §16.4]:
- **Subject:** real Blau Batch pellets, process and application samples, from the "Product", "Process" and "Material Detail" categories.
- **Lighting:** studio light. Clean, well lit and sharp across the subject. No blur used as a stylistic effect.
- **Background:** White, Light Grey `#DCDCDC` or Deep Navy seamless.
- **Colour accuracy:** masterbatch colours must be rendered faithfully. No heavy filters or stylisation.
- **Composition:** subject weighted away from the text zone, with about 15% negative space on the edge facing the text.
- **Resolution:** at least 2× the panel size (for a 768 × 1080 panel, supply 1536 × 2160). For print versions of the deck, 300 dpi.
- **Never:** stock photography or AI-generated images.

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

**Framing:** 55 / 45. The **left 55%** is a Deep Navy type panel with the wordmark pattern at 10%. The **right 45%** (x 1056 → 1920, full height, bleeding top, right and bottom) is reserved for a studio product photograph.

```
┌───────────────────────────────┬──────────────────────┐
│ [BLAU BATCH lockup + tagline] │                      │
│                               │   STUDIO PHOTO       │
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
| Logo | Horizontal lockup, white, with tagline | — | x 80, y 80, ≥ 240 px wide |
| Eyebrow | Caption, White | MASTERBATCH PORTFOLIO 2026 | x 80, y 392 |
| Title | Display, White | ONE SOURCE. / FULL SPECTRUM. | x 80, y 424, 2 lines |
| Accent line | Sky Blue 2 px, 60% of text-zone width | — | title + 32 px |
| Sub-header | H2, White | Filler, White, Black, Colour and Additive Masterbatch | line + 32 px, max width 912 px |
| Chip | Amber fill, Deep Navy Caption text, 2 px radius, 8 / 16 px padding | MANUFACTURED: FILLER MASTERBATCH | y 904 |

**Shot brief:** Studio close-up of Blau Batch white CaCO₃ filler pellets in a loose diagonal spill on a Deep Navy seamless background. Soft top-left key light. Every pellet in focus. Subject weighted right.

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
| Card image | 269 px square studio photo of that product family's pellets on a White background. All five shot under identical lighting. |
| Card title | H3, White: Filler / White / Black / Colour / Additive |
| Origin chip | **Filler:** Amber fill, Deep Navy Caption text "MANUFACTURED". **The other four:** 1 px White outline, White Caption text "VIA CORAPLAST" (Sky Blue text would fail on Steel Blue). |
| Card body | Body, White, 2 lines max. e.g. "PE and PP grades, 70–80% CaCO₃." |

---

### Slide 4 — PE Filler Masterbatch Range

**Framing:** 60 / 40, **light slide** (White). The **left 60%** (x 80 → 1088) contains a 2 × 2 grid of grade cards, each with a 3-column specs row. The **right 40%** (x 1152 → 1920, full bleed) is reserved for a studio photograph.

```
┌──────────────────────────────────────┬───────────────────┐
│ EYEBROW  [MANUFACTURED chip]         │                   │
│ HIGH LOADING FOR FILM & BAGS         │                   │
│ Sub-header (Sky Blue H2)             │   STUDIO PHOTO    │
│ ┌────────────────┐ ┌────────────────┐│   pellets + film  │
│ │FMPE-1070       │ │FMPE-1075       ││   sample on white │
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

**Shot brief:** Studio close-up of white PE filler pellets resting on a finished blown-film sample (an application sample per [BG §16.4]) on a White seamless background. Even, colour-accurate light. Subject weighted right.

---

### Slide 5 — PP Filler Masterbatch Range

**Framing:** The mirror of Slide 4: 40 / 60. The **left 40%** (x 0 → 768, full bleed) is reserved for a studio photograph. The **right 60%** (x 832 → 1840) contains the 2 × 2 grade-card grid with 3-column specs rows. All other specs match Slide 4.

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

**Shot brief:** Studio close-up of PP filler pellets resting on a section of woven PP raffia sack, side-lit to show the weave, on a Light Grey seamless background. Subject weighted left.

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
| Tile image | Real application-sample photos [BG §16.4 "Material Detail"]: Packaging film, Pipe, Agricultural film, Textiles / non-woven, Construction sheet, Wire & cable jacket, Automotive moulding, Consumer goods |
| Tile label | Separate Deep Navy strip below each tile (64 px tall) with an H3 White label and Caption grade codes, e.g. "FMPE-1070 · FMPE-1080". This avoids text over photography. |

**Shot brief (set):** Each tile is a studio close-up of a finished product sample made with Blau Batch masterbatch, on a White seamless background, all under identical light. The images in `public/images/industries/` should only be reused once confirmed as real photographs; they were produced during the site's image-sourcing phase (PLAN.md Phase 4–5), and AI images are not permitted.

---

### Slide 8 — Processing & Handling

**Framing:** 60 / 40, **light slide** (White). The **left 60%** contains a 3-column × 2-row specs grid. The **right 40%** is reserved for a studio photograph.

| Tile | Label (Caption) | Value (H2 style) | Unit (Body) | Icon (Phosphor, Deep Navy, 32 px) |
|---|---|---|---|---|
| 1 | PROCESSING TEMP. | 160–250 | °C | `Thermometer` |
| 2 | PACKING | 25 | kg PP bag | `Package` |
| 3 | SHELF LIFE | 6 | months | `CalendarBlank` |
| 4 | ADDITIVES | Included | dispersion agent, processing aid | `Drop` |
| 5 | APPEARANCE | White | surface colour | `Circle` |
| 6 | STORAGE | Dry | conditions | `Warehouse` |

**Tile style:** 320 × 200 px, no fill, 2 px Sky Blue accent line along the top edge. No Amber on this slide, because this is handling data rather than manufacturing content.

**Shot brief:** Real process photo: the open mouth of a branded 25 kg Blau Batch bag with pellets visible, shot at the factory against a neutral background. Process category [BG §16.4].

---

### Slide 9 — Manufacturing Capability

**Framing:** A full-bleed photograph with a **left 45% Deep Navy panel** that goes from 90% opacity at x 0 to 0% at x 864. The text sits inside the ≥ 80% opacity area (x 80 → 760).

| Element | Level | Copy / Spec |
|---|---|---|
| Background | — | `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg`, cropped to 1920 × 1080 with the subject right of centre. Confirm it is a real photo and approved. |
| Eyebrow + chip | Caption, White, followed by the Amber "MANUFACTURED" chip | IN-HOUSE PRODUCTION |
| Title | H1, White | OUR LINE. OUR FORMULATION. |
| Proof points | 3 stacked spec blocks, Value in White H2 style plus a Body line | "8" filler grades · "PE & PP" carriers · "70–80%" CaCO₃ loading |
| Logo | Footer White mono, on the navy panel | — |

---

### Slide 10 — Distribution Partnership (Coraplast)

**Framing:** 50 / 50, **light slide** (White). The **left 50%** holds text and the co-brand lock-up. The **right 50%** is a 2 × 2 grid of product-family photo tiles.

| Element | Spec | Source |
|---|---|---|
| Lock-up | BLAU BATCH primary logo **first (left)**, then a 1 px Light Grey vertical divider, then the Coraplast logo. Logos at equal visual weight, 2× standard clear space between them (≥ 80 px). | [VI §19] |
| Lock-up label | Caption, Steel Blue: AUTHORISED DISTRIBUTION PARTNER | [VI §19, 16.1] |
| Title | H1: WHITE, BLACK, COLOUR & ADDITIVE | — |
| Body | One order, one invoice, one technical contact: Blau Batch. | [BG §14.2] "cite the Coraplast partnership as a portfolio credential" |
| Photo tiles | White · Black · Colour · Additive; 416 × 416 px each, 24 px gutter, 4 px radius. Real studio pellet photos on White or Light Grey. H3 label below each tile. | [BG §16.4] |
| Amber | None (distributed products) | [VI §11] |

The co-branded slide needs approval from the Marketing & Operations Manager [VI §19].

---

### Slide 11 — Custom Formulation

**Framing:** 40 / 60, **dark slide** (Deep Navy). The **left 40%** is reserved for a studio photograph. The **right 60%** holds a 4-step horizontal process strip.

| Step | Number | H3 (White) | Body (White) |
|---|---|---|---|
| 01 | Montserrat Bold 28 pt, White | Brief | Share your polymer, process and target properties. |
| 02 | — | Recommend | We recommend the grade, loading and let-down ratio. |
| 03 | — | Sample | Trial quantity shipped with its TDS. |
| 04 | — | Supply | Scale to production volumes. |

- **Connector:** a 2 px Sky Blue line runs through the steps at the height of the numbers' midline.
- **Copy:** follows the custom formulation process in [BG §6.3 / §11] and promises no lead times [BG §14.2].

**Shot brief:** Real lab photo: a Blau Batch technician's gloved hands weighing pellet samples, or a lab dish of pellets in clean, even light. Use `Brand Assets/Photos & Visuals/Blue masterbatch in lab.png` if it is confirmed as an authentic photo.

---

### Slide 12 — End Card

**Framing:** An end card per [VI §18.3]: a full BLAU BATCH lockup **centred** on Deep Navy with the tagline below, wordmark pattern at 10%, and no photography. Hold for at least 4 s when the deck is presented as video.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│              [BLAU BATCH full lockup]                │
│          Full-Spectrum Masterbatch Solutions         │
│                                                      │
│            REQUEST SAMPLES OR A TDS (H2)             │
│                 [ REQUEST SAMPLES ]                  │
│                                                      │
│  info@blaubatch.com · +2 0102 2227723 · blaubatch.com│
└──────────────────────────────────────────────────────┘
```

| Element | Level / Spec | Copy |
|---|---|---|
| Logo | Full lockup, white, centred, ≥ 480 px wide, 40 px clear space | — |
| Tagline | Open Sans Regular, title case, White | Full-Spectrum Masterbatch Solutions |
| Sub-header | H2, White | Request Samples or a Technical Data Sheet |
| CTA button | Sky Blue fill, White Montserrat Bold 18 pt in all caps (large text, 3.6:1, passes AA-large), 4 px radius, 64 px tall, 32 px horizontal padding | REQUEST SAMPLES |
| Contact | Body, White | info@blaubatch.com · +2 0102 2227723 · blaubatch.com [BG cover page] |
| Addresses (optional) | Footnote, White | Office: Arkan Plaza, Building 4, Sheikh Zayed City, Giza · Factory: 79, 6th Industrial Zone, 6th of October, Egypt |

---

## Appendix A — Photography Shot List

None of these may be AI-generated or stock [BG §16.4]. All need approval before use.

| # | Shot | Category [BG §16.4] | Background | Slide(s) |
|---|---|---|---|---|
| P1 | White filler pellet spill | Product | Deep Navy seamless | 1 |
| P2 | 5 product-family pellet close-ups, identical light | Product | White | 3, 10 |
| P3 | PE pellets on a blown-film sample | Material Detail | White | 4 |
| P4 | PP pellets on raffia weave | Material Detail | Light Grey | 5 |
| P5 | 8 application samples | Material Detail | White | 7 |
| P6 | 25 kg bag, pellets visible | Process | Neutral factory | 8 |
| P7 | Facility / extrusion line | Process | — | 9 (existing `BlauBatchFacility.jpg`, if approved) |
| P8 | Lab sample weighing | Process | — | 11 (existing lab image, if approved) |

## Appendix B — Assets to Request

- **Horizontal lockup, white and navy, with and without tagline (PNG transparent).** Not in the repo; request per [VI §2.4].
- **BLAU BATCH text-only wordmark pattern source file** [VI §17.4].
- **Origin confirmation** for everything in `Brand Assets/Photos & Visuals/` and `public/images/industries/`.

## Appendix C — Data Note

The PE TDS sheets state density in g/cm³; the PP TDS sheets state specific gravity, which has no unit. Slides 4–5 keep each family's own label. Slide 6 heads the column "Density / SG" and shows the g/cm³ unit on PE cells only.
