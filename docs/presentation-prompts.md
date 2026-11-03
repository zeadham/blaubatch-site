# BLAU BATCH Deck — Antigravity & Canva Prompts

Companion to `docs/presentation-layout-blueprint.md`. Run the Antigravity prompt first to create the images, then use the Canva prompt to build the deck around them.

---

## 1. Antigravity Prompt (image generation)

Paste this whole block into Antigravity, opened on the `Blau Batch Master` folder.

```text
You are generating photorealistic product images for the BLAU BATCH 16:9 sales
presentation "One Source. Full Spectrum." Generate each image below, save it
at the exact filename and size, and verify it against the checklist before
moving on.

OUTPUT FOLDER
Brand Assets/Photos & Visuals/Presentation/   (create it if missing)

GLOBAL STYLE (applies to every image; append it to every generation prompt)
"photorealistic studio product photography, 100 mm macro lens, f/8, soft key
light from top-left, sharp focus across the whole subject, accurate neutral
colour, clean seamless background, no text, no logos, no labels, no watermarks,
no people's faces"

BRAND RULES
- Must read as a real studio or industrial photograph. No 3D-render, CGI,
  illustration, painterly or heavily filtered look.
- Backgrounds only in white #FFFFFF, light grey #DCDCDC or deep navy #141B3E.
- Pellet colours must be believable and accurate. White filler masterbatch is
  matte, neutral off-white (no blue or yellow cast). Pellets are small
  cylinders or lentils of about 3 mm.
- No text, logos or brand marks inside any generated image. Generators distort
  logos; real logo files are added later.
- Hands are allowed (gloved). No faces, no identifiable people.
- Leave about 15% clean negative space on the side named in each brief; slide
  text sits next to that edge.

PROCESS
Generate at the closest supported aspect ratio and highest available
resolution, then crop (do not stretch) to the exact pixel size. If the
generator's output is smaller than the target, upscale with a detail-preserving
upscaler. Save as PNG, sRGB.

IMAGES

P1 — bb_p1_title_pellets_navy.png — 1728 x 2160 (4:5 portrait)
"Close-up of matte white calcium carbonate filler masterbatch pellets in a
loose diagonal spill from upper right to lower centre on a deep navy (#141B3E)
seamless background, pellets concentrated in the right two-thirds of the frame,
left third mostly empty navy"
Negative space: LEFT.

P2 — five matching images, 1080 x 1080 (1:1). Use the SAME prompt, camera and
lighting for all five, changing only the pellet description, so they read as a
set:
"Small neat pile of [PELLETS] centred on a pure white seamless background"
  bb_p2_filler.png    [PELLETS] = matte off-white calcium carbonate filler masterbatch pellets
  bb_p2_white.png     [PELLETS] = bright glossy white masterbatch pellets
  bb_p2_black.png     [PELLETS] = glossy deep black masterbatch pellets
  bb_p2_colour.png    [PELLETS] = vivid cobalt blue colour masterbatch pellets
  bb_p2_additive.png  [PELLETS] = translucent natural, slightly milky additive masterbatch pellets
Negative space: even margin on all sides.

P3 — bb_p3_pe_film.png — 1536 x 2160 (portrait)
"Close-up of matte white filler masterbatch pellets scattered on a sheet of
thin translucent white blown polyethylene film with soft natural creases, pure
white seamless background, pellets weighted to the right of frame"
Negative space: LEFT.

P4 — bb_p4_pp_raffia.png — 1536 x 2160 (portrait)
"Close-up of matte white filler masterbatch pellets resting on a section of
woven white polypropylene raffia sack fabric, low side light raking across the
weave texture, light grey (#DCDCDC) seamless background, pellets weighted to
the left of frame"
Negative space: RIGHT.

P6 — bb_p6_bag.png — 1536 x 2160 (portrait)
"Open mouth of a plain white woven polypropylene 25 kg industrial bag, top
folded down to reveal matte white masterbatch pellets inside, low
three-quarter angle, deep navy (#141B3E) seamless background, bag completely
blank with no printing"
Negative space: LEFT.

P8 — bb_p8_lab.png — 1536 x 2160 (portrait)
"Gloved hands in a laboratory weighing a small sample of blue masterbatch
pellets on a precision balance, glass petri dishes of white and blue pellets
beside it, clean white lab bench, background falling off to deep navy on the
right"
Negative space: RIGHT. Hands only, no face, no visible text on the balance display.

VERIFY EACH IMAGE (regenerate if any item fails)
[ ] Looks like a real photograph at 100% zoom (no melted or fused pellets, no
    impossible geometry, no repeating clone patterns)
[ ] No text, letters, numbers, logos or watermarks anywhere
[ ] Background colour matches the brief
[ ] Subject sharp; negative space on the stated side
[ ] Exact pixel size and filename
[ ] P2 set: identical lighting, angle and pile size across all five

OPTIONAL — branded bag
After P6 passes, create bb_p6_bag_branded.png by compositing
Brand Assets/Logos/BlauBatch_Logo_Pack/06_Mono/PNG/BlauBatch_Mono_Navy.png onto the bag face:
about 18% of the bag width, perspective-warped to the bag's surface, multiply
blend at 90% opacity so the weave texture shows through. Keep the original
bb_p6_bag.png.

FINISH
List every saved file with its pixel size, and flag any image you could not get
to pass the checklist.
```

---

## 2. Canva Prompt (deck build)

### 2a. Set up first (once, about 5 minutes)

Do this before pasting the prompt, so Canva applies the brand automatically.

1. **Brand Kit → Colours:** add these as a palette named "BLAU BATCH":
   - Deep Navy `#141B3E`
   - Steel Blue `#23447A`
   - Sky Blue `#2B8DD0`
   - Manufacturing Amber `#D4840A`
   - Light Grey `#DCDCDC`
   - White `#FFFFFF`
2. **Brand Kit → Fonts:**
   - Title: Inter ExtraBold
   - Subtitle: Inter Bold
   - Heading: Inter SemiBold
   - Body: Inter Regular
3. **Brand Kit → Logos:** upload these files from `Brand Assets/Logos/BlauBatch_Logo_Pack/`:
   - `03_Horizontal/PNG/BlauBatch_Horizontal_DarkBG.png`
   - `03_Horizontal/PNG/BlauBatch_Horizontal_LightBG.png`
   - `02_Logomark/PNG/BlauBatch_Logomark_DarkBG.png`
   - `01_Primary/PNG/BlauBatch_Primary.png`
   - `10_CoBrand/PNG/BlauBatch_x_Coraplast_Horizontal.png`
4. **Uploads:** upload these images:
   - all PNGs from `Brand Assets/Photos & Visuals/Presentation/` (from the Antigravity step)
   - `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg`
   - the 8 website industry images from `public/images/industries/` in the website repo (`zeadham/blaubatch`)
5. Create a **Presentation (16:9)** design, open **Canva AI / Magic Design**, select the BLAU BATCH Brand Kit and paste the prompt below.

### 2b. Prompt

```text
Create a 12-slide 16:9 presentation for BLAU BATCH, a plastics masterbatch
manufacturer and distributor (Egypt, serving MENA and Europe). Title:
"One Source. Full Spectrum." Use my BLAU BATCH Brand Kit.

STYLE RULES (apply to every slide)
- Clean, technical, industrial. Flat design, no shadows, no gradients except
  where stated, no stock photos, no decorative illustrations or emojis.
- Colours only from the Brand Kit. Dark slides = Deep Navy #141B3E background
  with white text. Light slides = White background with Deep Navy text.
- One typeface only: Inter. Slide titles: Inter ExtraBold, ALL CAPS.
  Sub-headers: Inter Bold, Title Case (Sky Blue #2B8DD0 on light slides, white
  on dark). Card titles: Inter SemiBold. Body: Inter Regular. Small labels:
  Inter Medium, ALL CAPS, slightly letter-spaced. Big numbers: Inter Bold.
- Do not retype the BLAU BATCH logo; always use the uploaded logo files.
- Never put Sky Blue text on navy. Never use Amber #D4840A for text; Amber is
  ONLY for a small "MANUFACTURED" chip (Amber fill, Deep Navy text).
- Corners: 4 px on cards and buttons, 2 px on chips, square on tables.
- Thin 2 px Sky Blue lines as accents and dividers.
- Generous margins (about 4% of slide width). Max 3 text levels per slide.
- Footer on slides 2–11: small B logomark bottom-left, page number bottom-right.
- Write "BLAU BATCH" in titles and logos, "Blau Batch" in sentences.

SLIDES

1. TITLE (dark). Left 55%: horizontal BLAU BATCH logo top-left; small label
   "MASTERBATCH PORTFOLIO 2026"; large title "ONE SOURCE. FULL SPECTRUM." on two
   lines; thin Sky Blue line; white subtitle "Filler, White, Black, Colour and
   Additive Masterbatch"; Amber chip "MANUFACTURED: FILLER MASTERBATCH".
   Right 45%: full-height image bb_p1_title_pellets_navy.png bleeding to the
   edges. No footer.

2. THE PROBLEM (light). Left 40%: label "THE PROBLEM"; title "STILL MANAGING
   3–5 MASTERBATCH SUPPLIERS?"; body "Every extra supplier adds a contract, a
   quality variable and another technical contact." Right 60%: three stacked
   Light Grey cards with a Sky Blue left edge line and a navy outline icon:
   "Multiple Suppliers", "Variable Batch Quality", "Several Technical
   Contacts". No photos.

3. PORTFOLIO (dark). Label "FULL-SPECTRUM PORTFOLIO"; title "ONE SUPPLIER.
   EVERY GRADE." Below: five equal Steel Blue cards in a row, each with a square
   image on top (bb_p2_filler, bb_p2_white, bb_p2_black, bb_p2_colour,
   bb_p2_additive), a white card title (Filler / White / Black / Colour /
   Additive), and a chip: Filler gets the Amber "MANUFACTURED" chip; the other
   four get a white-outline chip "VIA CORAPLAST". One-line body on Filler:
   "PE and PP grades, 70–80% CaCO₃."

4. PE FILLER MASTERBATCH (light). Left 60% text, right 40% full-height image
   bb_p3_pe_film.png. Label "PE FILLER MASTERBATCH" + Amber "MANUFACTURED" chip;
   title "HIGH LOADING FOR FILM & BAGS"; Sky Blue subtitle "LLDPE & LDPE
   Carriers, 160–250 °C Processing". Then a 2×2 grid of white cards with a thin
   light grey border. Each card: grade code as title, carrier as a small label,
   then three spec columns (small caps label, large bold value, unit below):
     FMPE-1070 · LLDPE · CaCO₃ 70% ±2 · MFI 2.3 g/10 min · Density 1.70 g/cm³
     FMPE-1075 · LLDPE · CaCO₃ 75% ±2 · MFI 2.3 g/10 min · Density 1.70 g/cm³
     FMPE-1080 · LLDPE · CaCO₃ 80% ±2 · MFI 2.3 g/10 min · Density 1.70 g/cm³
     FMPE-2070 · LDPE  · CaCO₃ 70% ±2 · MFI 2.0 g/10 min · Density 1.65 g/cm³
   Footnote: "Typical values. See the individual TDS for full specification.
   MFI at 2.16 kg / 190 °C."

5. PP FILLER MASTERBATCH (light). Mirror of slide 4: left 40% full-height
   image bb_p4_pp_raffia.png, right 60% text and cards. Label "PP FILLER
   MASTERBATCH" + Amber "MANUFACTURED" chip; title "STIFFNESS FOR RAFFIA &
   MOULDING"; subtitle "PP & PPH Carriers, 160–250 °C Processing". 2×2 cards:
     FMPP-1070 · PP  · CaCO₃ 70% ±2 · MFI 8 g/10 min · Specific gravity 2.1
     FMPP-1075 · PP  · CaCO₃ 75% ±2 · MFI 8 g/10 min · Specific gravity 2.1
     FMPP-1080 · PP  · CaCO₃ 80% ±2 · MFI 8 g/10 min · Specific gravity 2.1
     FMPP-2180 · PPH · CaCO₃ 80% ±2 · MFI 8 g/10 min · Specific gravity 2.1
   Footnote: "Typical values. MFI at 2.16 kg / 230 °C."

6. GRADE COMPARISON (light). Label "GRADE COMPARISON"; title "EIGHT GRADES,
   ONE STANDARD". Full-width table, Steel Blue header row with white text,
   alternating White / Light Grey rows, a Sky Blue line between the PE and PP
   groups. Columns: Grade | Carrier | CaCO₃ | MFI | Density / SG | Moisture |
   Primary applications.
     FMPE-1070 | LLDPE | 70% | 2.3 | 1.70 g/cm³ | <0.05 | Blown film, bags, agri film, liners
     FMPE-1075 | LLDPE | 75% | 2.3 | 1.70 g/cm³ | <0.05 | Blown film, bags, agri film, liners
     FMPE-1080 | LLDPE | 80% | 2.3 | 1.70 g/cm³ | <0.05 | Blown film, bags, agri film, liners
     FMPE-2070 | LDPE  | 70% | 2.0 | 1.65 g/cm³ | <0.08 | Film, liners, PE sheet
     FMPP-1070 | PP    | 70% | 8   | 2.1        | <0.05 | Woven sacks, raffia, injection, thermoforming
     FMPP-1075 | PP    | 75% | 8   | 2.1        | <0.05 | Woven sacks, raffia, injection, thermoforming
     FMPP-1080 | PP    | 80% | 8   | 2.1        | <0.08 | Woven sacks, raffia, injection, thermoforming
     FMPP-2180 | PPH   | 80% | 8   | 2.1        | <0.05 | Woven sacks, raffia, injection, thermoforming
   No images.

7. APPLICATIONS (dark). Label "APPLICATIONS"; title "BUILT FOR THE LINES YOU
   RUN". 4×2 grid of image tiles using my industry images (packaging, pipes,
   agriculture, textiles, construction, wire_cable, automotive,
   consumer_goods). Under each image, a navy strip with a white label:
   Packaging, Pipes, Agriculture, Textiles, Construction, Wire & Cable,
   Automotive, Consumer Goods. No text on top of the images.

8. PROCESSING & HANDLING (light). Left 60%: label "PROCESSING & HANDLING";
   title "READY FOR YOUR LINE"; 3×2 grid of spec tiles, each with a 2 px Sky
   Blue top line, a navy outline icon, small caps label, large bold value and
   unit: Processing Temp. 160–250 °C · Packing 25 kg PP bag · Shelf Life 6
   months · Additives: dispersion agent, processing aid · Appearance: White ·
   Storage: Dry conditions. Right 40%: full-height image bb_p6_bag.png (or
   bb_p6_bag_branded.png). No Amber.

9. MANUFACTURING (dark, full-bleed photo). Background BlauBatchFacility.jpg
   with a Deep Navy gradient panel over the left 45% (solid at the left edge,
   fading to transparent). On the panel: label "IN-HOUSE PRODUCTION" + Amber
   "MANUFACTURED" chip; title "OUR LINE. OUR FORMULATION."; three stacked
   proof points, large white value + small line: "8" filler grades · "PE & PP"
   carriers · "70–80%" CaCO₃ loading.

10. DISTRIBUTION PARTNER (light). Left 50%: the BLAU BATCH x Coraplast
    co-brand logo (one uploaded file, already laid out with a divider);
    label "AUTHORISED DISTRIBUTION PARTNER"; title "WHITE, BLACK, COLOUR &
    ADDITIVE"; body "One order, one invoice, one technical contact: Blau
    Batch." Right 50%: 2×2 square image tiles (bb_p2_white, bb_p2_black,
    bb_p2_colour, bb_p2_additive) with labels underneath. No Amber.

11. CUSTOM FORMULATION (dark). Left 40%: full-height image bb_p8_lab.png.
    Right 60%: label "CUSTOM FORMULATION"; title "ENGINEERED TO YOUR
    SPECIFICATION"; a horizontal 4-step process connected by a thin Sky Blue
    line, large white step numbers:
      01 Brief: Share your polymer, process and target properties.
      02 Recommend: We recommend the grade, loading and let-down ratio.
      03 Sample: Trial quantity shipped with its TDS.
      04 Supply: Scale to production volumes.

12. END CARD (dark). Centred: BLAU BATCH horizontal logo (DarkBG version), with
    "Full-Spectrum Masterbatch Solutions" in white Inter Regular below it; white subtitle "Request Samples or a
    Technical Data Sheet"; Sky Blue button with white bold caps text "REQUEST
    SAMPLES"; contact line "info@blaubatch.com · +2 0102 2227723 ·
    blaubatch.com". A very faint repeating "BLAU BATCH" text pattern in the
    background at about 10% opacity. No footer.

TRANSITIONS: simple fade between slides only. No zooms, wipes or bounces.
```

### 2c. After Canva generates

Canva AI tends to drift from long prompts, so check these by hand:

- [ ] **Amber:** appears only on the "MANUFACTURED" chips (slides 1, 3, 4, 5, 9).
- [ ] **Fonts:** Inter only. Titles all caps in Inter ExtraBold, body in Inter Regular. Canva AI sometimes substitutes template fonts, so select all text and check.
- [ ] **No stray content:** no Canva stock photos, illustrations or extra colours slipped in. Swap any you find for the uploaded images.
- [ ] **Logos:** not stretched or recoloured. The LightBG horizontal logo appears only on light slides; the DarkBG version only on slides 1 and 12.
- [ ] **Spec values:** match the tables above exactly.
- [ ] **Prompt length:** if Canva truncates it, paste the STYLE RULES plus 3–4 slides at a time, using "Add slides" with the same Brand Kit.
