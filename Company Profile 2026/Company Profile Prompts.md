# BLAU BATCH Company Profile — Antigravity & Canva Prompts

A 17-slide 16:9 company profile. All facts come from **Brand Guidelines v5.2**. Layout, colour and type follow the global system in `docs/presentation-layout-blueprint.md` §0 (in this repo) and **Visual Identity Guide v1.2**.

**Order:** run the Antigravity prompt (§1) to create the images, set up Canva (§2a), then paste the Canva prompt (§2b) in two parts.

**Key facts (confirmed 2026-11-03):**
- **Founded:** 2023.
- **Manufactured by Blau Batch:** Filler masterbatch, made in the 6th of October factory.
- **White, Black, Colour and Additive:** supplied through Blau Batch's Coraplast partnership. Standard grades come from the Coraplast range, and custom grades can be produced to the customer's specification by Coraplast, ordered through Blau Batch.
- **ISO 9001:** stated as "aligned with ISO 9001 principles", not "certified".
- **Food-contact grades:** available through Coraplast. No food-contact claims are made for Blau Batch-made filler.
- **Timeline:** only the founding year is documented, so the later stages carry no years.

---

## 1. Antigravity Prompt (image generation)

Paste this whole block into Antigravity, opened on the `Blau Batch Master` folder.

```text
You are generating photorealistic images for the BLAU BATCH company profile, a
16:9 presentation. BLAU BATCH is an Egyptian plastics masterbatch manufacturer
and distributor. Generate each image below, save it at the exact filename and
size, and verify it against the checklist before moving on.

OUTPUT FOLDER
Company Profile 2026/images/   (create it if missing)

GLOBAL STYLE (append to every generation prompt)
"photorealistic studio or industrial photography, sharp focus across the
subject, soft directional light, accurate neutral colour, clean uncluttered
composition, no text, no logos, no labels, no watermarks, no people's faces"

BRAND RULES
- Must read as a real photograph. No 3D-render, CGI, illustration, painterly
  or heavily filtered look.
- Backgrounds and dominant tones: white #FFFFFF, light grey #DCDCDC or deep
  navy #141B3E. No warm or coloured casts.
- Masterbatch pellets are small cylinders or lentils of about 3 mm. White
  filler masterbatch is matte, neutral off-white.
- No text, numbers, logos or brand marks anywhere: generators distort them.
  Bags, boxes, machines and screens must be blank.
- Hands in gloves are fine. No faces or identifiable people.
- Leave about 15% clean negative space on the side named in each brief; slide
  text sits next to that edge.

PROCESS
Generate at the closest supported aspect ratio and highest resolution, then
crop (never stretch) to the exact pixel size. Upscale with a detail-preserving
upscaler if needed. Save as PNG, sRGB.

IMAGES

CP01 — cp01_cover_pellets_navy.png — 1728 x 2160 (4:5 portrait)
"Close-up of matte white calcium carbonate filler masterbatch pellets in a
loose diagonal spill from upper right to lower centre on a deep navy (#141B3E)
seamless background, 100 mm macro, pellets in the right two-thirds, left third
mostly empty navy"
Negative space: LEFT.

CP02 — product family set, five images, 1080 x 1080 (1:1). SAME prompt, camera
and light for all five; change only the pellets:
"Small neat pile of [PELLETS] centred on a pure white seamless background,
100 mm macro, soft top-left key light"
  cp02_filler.png    [PELLETS] = matte off-white calcium carbonate filler masterbatch pellets
  cp02_white.png     [PELLETS] = bright glossy white masterbatch pellets
  cp02_black.png     [PELLETS] = glossy deep black masterbatch pellets
  cp02_colour.png    [PELLETS] = vivid cobalt blue colour masterbatch pellets
  cp02_additive.png  [PELLETS] = translucent natural, slightly milky additive masterbatch pellets
Negative space: even margin on all sides.

CP03 — cp03_qc_lab.png — 1536 x 2160 (portrait)
"Gloved hands in a clean plastics quality-control laboratory placing a small
sample of white masterbatch pellets into a melt flow indexer, a precision
balance and glass dishes of pellets on a white bench, cool daylight, deep navy
wall falling off on the right"
Negative space: RIGHT. Hands only. All instrument displays blank or out of focus.

CP04 — cp04_dispersion.png — 1536 x 2160 (portrait)
"Thin pressed plastic film test sample held up against a bright light panel by
gloved fingertips, showing an even, speckle-free white dispersion, macro detail,
light grey background"
Negative space: LEFT.

CP05 — cp05_logistics.png — 2400 x 1350 (16:9 landscape)
"Clean industrial warehouse aisle with plain white woven polypropylene 25 kg
bags stacked neatly on wooden pallets and two plain white FIBC jumbo bags,
stretch-wrapped, cool even lighting, polished grey concrete floor, everything
completely blank with no printing"
Negative space: LEFT third.

CP06 — cp06_custom_colour.png — 1536 x 2160 (portrait)
"Top-down view of a row of glass petri dishes on a white lab bench, each holding
masterbatch pellets in a gradient from white through sky blue to deep navy,
gloved hand adjusting one dish, crisp rim light on the glass"
Negative space: RIGHT. Hand only.

CP07 — cp07_film_roll.png — 1536 x 2160 (portrait)
"Close-up of a large roll of thin translucent white blown polyethylene film on a
core, the film edge catching soft light, a few white filler masterbatch pellets
resting on the roll, white seamless background"
Negative space: LEFT.

VERIFY EACH IMAGE (regenerate if any item fails)
[ ] Looks like a real photograph at 100% zoom: no fused pellets, warped hands,
    impossible geometry or cloned patterns
[ ] No text, letters, numbers, logos or watermarks anywhere, including on bags,
    instruments and screens
[ ] Background and tones match the brief; no colour cast
[ ] Negative space on the stated side
[ ] Exact pixel size and filename
[ ] CP02 set: identical light, angle and pile size across all five

FINISH
List every saved file with its pixel size, and flag any image that could not
pass the checklist.
```

**Not generated on purpose:**
- **Factory:** slide 7 uses the real `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg`, because "this is our plant" has to be a true photo.
- **Industry tiles:** these reuse the website's set.
- **Market map:** this is built from Canva's map elements, not generated.

---

## 2. Canva Prompt (deck build)

### 2a. Set up first

1. **Brand Kit → Colours:** add a palette named "BLAU BATCH":
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
   - Add **Cairo** only if you also make an Arabic version.
3. **Brand Kit → Logos:** upload these from `Brand Assets/Logos/BlauBatch_Logo_Pack/`:
   - `03_Horizontal/PNG/BlauBatch_Horizontal_DarkBG.png` and `BlauBatch_Horizontal_LightBG.png`
   - `02_Logomark/PNG/BlauBatch_Logomark_DarkBG.png`
   - `01_Primary/PNG/BlauBatch_Primary.png`
   - `10_CoBrand/PNG/BlauBatch_x_Coraplast_Horizontal.png`
4. **Uploads:**
   - all PNGs from `Company Profile 2026/images/` (from §1)
   - `Brand Assets/Photos & Visuals/BlauBatchFacility.jpg`
   - the 8 industry images from the website repo `zeadham/blaubatch`, `public/images/industries/` (packaging, pipes, agriculture, textiles, construction, wire_cable, automotive, consumer_goods)
5. Create a **Presentation (16:9)** design, open **Canva AI / Magic Design**, select the BLAU BATCH Brand Kit and paste **Part A**. When it finishes, use **Add slides** with the same Brand Kit and paste **Part B**.

### 2b. Prompt — Part A (slides 1–9)

```text
Create the first 9 slides of a 17-slide 16:9 company profile for BLAU BATCH,
an Egyptian plastics masterbatch company that manufactures filler masterbatch
and distributes the Coraplast range. Use my BLAU BATCH Brand Kit.

STYLE RULES (apply to every slide)
- Clean, technical, industrial. Flat design, no shadows, no gradients except
  where stated, no stock photos, no illustrations, no emojis.
- Colours only from the Brand Kit. Dark slides: Deep Navy #141B3E background,
  white text. Light slides: White background, Deep Navy text.
- One typeface: Inter. Slide titles Inter ExtraBold ALL CAPS. Sub-headers Inter
  Bold Title Case (Sky Blue #2B8DD0 on light slides, white on dark). Card
  titles Inter SemiBold. Body Inter Regular. Small labels Inter Medium ALL CAPS,
  slightly letter-spaced. Big numbers Inter Bold.
- Use the uploaded logo files; never retype the BLAU BATCH logo.
- Never Sky Blue text on navy. Never Amber #D4840A for text. Amber appears ONLY
  as a small "MANUFACTURED" chip (Amber fill, Deep Navy text).
- Corners 4 px on cards and buttons, 2 px on chips. Thin 2 px Sky Blue lines as
  accents. Navy outline icons only. Generous margins. Max 3 text levels per slide.
- Footer on slides 2–16: small B logomark bottom-left, page number bottom-right.
- "BLAU BATCH" in titles and logos, "Blau Batch" in sentences.

SLIDES

1. COVER (dark). Left 55%: horizontal BLAU BATCH logo (DarkBG) top-left; small
   label "COMPANY PROFILE 2026"; large title "FULL-SPECTRUM MASTERBATCH
   SOLUTIONS" on two or three lines; thin Sky Blue line; white subtitle
   "Manufacturer · Distributor · Partner". Right 45%: full-height image
   cp01_cover_pellets_navy.png bleeding to the edges. No footer.

2. AT A GLANCE (light). Label "AT A GLANCE"; title "ONE SOURCE FOR EVERY
   MASTERBATCH GRADE". Body (2 lines): "Blau Batch is an Egyptian masterbatch
   company: we manufacture filler masterbatch in our own factory and distribute
   the Coraplast range, so plastics producers get one supplier for their
   complete masterbatch requirement." Below, a row of 4 fact tiles (small caps
   label, big bold value, one-line note):
     HEADQUARTERS · Egypt · Office in Sheikh Zayed City, Giza
     FACTORY · 6th of October · In-house production and dispatch
     PRODUCT FAMILIES · 5 · Filler, White, Black, Additive, Colour
     MARKETS · MENA · Europe · Global export
   Amber "MANUFACTURED" chip on the FACTORY tile only.

3. OUR STORY (light). Label "OUR STORY"; title "FROM FILLER SPECIALIST TO
   FULL-SPECTRUM SUPPLIER". Horizontal 4-step timeline on a 2 px Sky Blue line,
   step names in Inter SemiBold; only the first step shows a year:
     2023 · FOUNDED: Filler masterbatch manufacturer producing CaCO₃ compounds
       for MENA plastics producers.
     GROWTH: Authorised Coraplast distributor, adding white, black, colour,
       additive and specialty grades, standard or made to customer specification.
     EXPANSION: Serving manufacturers across MENA and Europe with manufactured
       and distributed grades.
     TODAY: An independent full-spectrum supplier that manufactures,
       distributes, partners and innovates.

4. VISION & MISSION (dark). Two columns divided by a thin Sky Blue vertical line.
   Left: label "VISION", text "To become a trusted benchmark for full-spectrum
   masterbatch solutions across MENA, Europe and global markets, uniting
   manufacturing excellence, distribution reach and technical expertise."
   Right: label "MISSION", text "We manufacture and deliver reliable,
   high-quality masterbatch that enhances product performance, reduces
   production cost and delivers consistent technical value, as both a producer
   and a trusted distribution partner." Large white text, no images.

5. OUR VALUES (light). Label "CORE VALUES"; title "WHAT EVERY BATCH STANDS FOR".
   Four equal cards, Light Grey fill, navy outline icon, title + one line:
     Quality: Every batch meets specification. We never ship below standard.
     Efficiency: Speed, reliability and cost-effectiveness in every interaction.
     Reliability: Consistent supply, consistent results, batch after batch.
     Innovation: Continuous investment in material science, processes and service.

6. THE DUAL MODEL (dark). Label "HOW WE ARE BUILT"; title "MANUFACTURE.
   DISTRIBUTE. PARTNER. INNOVATE." Four Steel Blue cards with big white numbers
   01–04:
     01 Manufacture: Filler masterbatch made in our own factory with full
        process control, QC and traceability. [Amber MANUFACTURED chip]
     02 Distribute: Authorised Coraplast distributor for white, black,
        colour and additive masterbatch, standard grades or produced to your
        specification by Coraplast through Blau Batch.
     03 Partner: Technical consultation, custom formulation and application
        support alongside your team.
     04 Innovate: New grades and service improvements driven by market and
        customer feedback.

7. OUR FACTORY (dark, full-bleed photo). Background BlauBatchFacility.jpg with
   a Deep Navy panel over the left 45% (solid at the left edge, fading to
   transparent). On the panel: label "IN-HOUSE PRODUCTION" + Amber
   "MANUFACTURED" chip; title "BUILT FOR CONSISTENT MASTERBATCH"; body "Our 6th
   of October facility combines extrusion technology with rigorous quality
   control to deliver technical-grade masterbatch at competitive cost and
   reliable lead times." Three stacked proof points (big white value + small
   line): "PE & PP" carriers · "70–80%" CaCO₃ loading · "Custom" formulations
   on request.

8. QUALITY CONTROL (light). Left 60%: label "QUALITY CONTROL"; title "TESTED
   BEFORE IT SHIPS"; five check items with navy outline check icons:
     In-house lab: MFI, ash content, colour measurement and dispersion testing
     Every production run tested before dispatch
     TDS and certificate of analysis with every shipment
     Full batch traceability from raw material to finished goods
     Production managed in line with ISO 9001 principles
   Right 40%: two stacked images, cp03_qc_lab.png (top) and cp04_dispersion.png
   (bottom), 4 px corners.

9. PRODUCT PORTFOLIO (dark). Label "PRODUCT PORTFOLIO"; title "FIVE FAMILIES.
   ONE SUPPLIER." Five equal Steel Blue cards in a row, each with a square image
   on top (cp02_filler, cp02_white, cp02_black, cp02_colour, cp02_additive), a
   white title (Filler / White / Black / Colour / Additive), one line, and a chip:
     Filler: PE and PP carriers, 70 / 75 / 80% CaCO₃ + custom. [Amber MANUFACTURED chip]
     White: TiO₂ white in PE and PP, high-opacity and food-contact grades. [white-outline chip VIA CORAPLAST]
     Black: Carbon black, UV-stable pipe, cable and film grades. [VIA CORAPLAST]
     Colour: RAL/Pantone range, custom matching, special effects. [VIA CORAPLAST]
     Additive: UV, slip, antiblock, anti-static, processing aids. [VIA CORAPLAST]
   Under the four Coraplast cards, one centred line in white Inter Regular:
   "White, Black, Colour and Additive: standard grades or made to your specification by Coraplast, through Blau Batch."

TRANSITIONS: simple fade only.
```

### 2c. Prompt — Part B (slides 10–17)

```text
Add slides 10–17 to this BLAU BATCH company profile. Keep exactly the same
STYLE RULES as slides 1–9: Inter only; Brand Kit colours; Amber only on
"MANUFACTURED" chips; no Sky Blue text on navy; 4 px corners; 2 px Sky Blue
accent lines; navy outline icons; footer with B logomark and page number on
slides 10–16; use the uploaded logo files, never retype the logo.

10. FILLER MASTERBATCH RANGE (light). Label "FILLER MASTERBATCH" + Amber
    "MANUFACTURED" chip; title "EIGHT GRADES, TWO CARRIERS". Compact table,
    Steel Blue header with white text, alternating White / Light Grey rows,
    Sky Blue line between PE and PP groups. Columns: Grade | Carrier | CaCO₃ | Typical use.
      FMPE-1070 | LLDPE | 70% | Blown film, bags, agricultural film
      FMPE-1075 | LLDPE | 75% | Standard blown film lines
      FMPE-1080 | LLDPE | 80% | High-output blown film
      FMPE-2070 | LDPE  | 70% | Film, liners, PE sheet
      FMPP-1070 | PP    | 70% | PP film, raffia
      FMPP-1075 | PP    | 75% | PP film, injection
      FMPP-1080 | PP    | 80% | Cost-intensive PP applications
      FMPP-2180 | PPH   | 80% | Woven sacks, injection moulding
    Footnote: "Typical values. Full specifications in each grade's technical
    data sheet. Custom loadings and carriers on request."

11. CORAPLAST PARTNERSHIP (light). Left 50%: the BLAU BATCH x Coraplast
    co-brand logo file; label "AUTHORISED DISTRIBUTION PARTNER"; title "A
    COMPLETE RANGE, ONE RELATIONSHIP"; body "Through our authorised Coraplast
    partnership we supply white, black, colour and additive masterbatch from an
    international manufacturer: standard grades, or produced to your
    specification by Coraplast. One order, one set of terms, one technical
    team." Right 50%: 2×2 tiles with a big bold number and label:
    "15" Black grades · "11" White grades · "5" UV stabiliser grades ·
    "17" Additive grades. No Amber.

12. INDUSTRIES WE SERVE (dark). Label "INDUSTRIES"; title "BUILT FOR THE LINES
    YOU RUN". 4×2 grid of my industry images; under each, a navy strip with a
    white label and one small grey line:
      Packaging & Flexible Film: blown and cast film, bags, lamination
      Pipes, Fittings & Profiles: HDPE, PPR, PVC, irrigation
      Agriculture: mulch, greenhouse and silage film
      Textiles & Fibre: PP non-woven, yarn, geotextiles
      Construction: geomembranes, waterproofing, panels
      Wire & Cable: jacketing, insulation, conduit
      Automotive & Technical: interior and technical mouldings
      Consumer Goods: housewares, appliances, caps and closures
    No text on top of the images.

13. HOW WE WORK (light). Label "HOW WE WORK"; title "FROM ENQUIRY TO ONGOING
    SUPPLY". Seven numbered steps in two rows (4 + 3) joined by a thin Sky Blue
    line, number in Inter Bold Sky Blue, step name in Inter SemiBold, one line each:
      01 Enquiry: share your application, polymer, process and volumes
      02 Technical consultation: grade, loading and let-down ratio recommended
      03 Samples: trial quantity with TDS and CoA, within days
      04 Trial & approval: on-line support, specification locked
      05 Agreement: volume, pricing, lead time and delivery terms
      06 Production & delivery: scheduled, with full documentation
      07 Ongoing support: performance monitoring and formulation updates
    Small image cp06_custom_colour.png at the right edge, 4 px corners.

14. PACKAGING & LOGISTICS (dark). Top 45%: full-width image cp05_logistics.png
    with a navy fade at the bottom edge. Below: label "SUPPLY & LOGISTICS";
    title "PACKED, DOCUMENTED, DELIVERED"; three columns:
      Packaging: 25 kg PP bags; 500–1000 kg FIBC jumbo bags; private label available
      Documentation: TDS, SDS and certificate of analysis per batch; invoice,
        packing list, certificate of origin, bill of lading, EUR.1 for EU markets
      Freight: sea, air and road; safety stock on core manufactured lines;
        trial quantities available

15. WHERE WE SUPPLY (light). Label "GEOGRAPHIC REACH"; title "FROM EGYPT TO
    MENA, EUROPE AND BEYOND". A simple flat world map in Light Grey with these
    regions highlighted: Egypt in Deep Navy with a pin labelled "HQ & factory";
    Gulf, North Africa and Levant in Steel Blue; Europe, Sub-Saharan Africa and
    South & Southeast Asia in Sky Blue at 40% opacity. Right-hand key, label +
    one line each:
      Egypt: HQ and manufacturing, full range for immediate dispatch
      Gulf: UAE, Saudi Arabia, Kuwait
      North Africa: Libya, Morocco, Tunisia
      Levant: Jordan, Iraq, Lebanon
      Europe: Turkey, Germany, Italy, Poland
      Sub-Saharan Africa: emerging corridor for filler and black
      Asia: specialty export via the Coraplast range

16. SUSTAINABILITY (light). Left 60%: label "SUSTAINABILITY"; title "MEASURED,
    NOT MARKETED"; four short items with navy outline icons:
      Lightweighting: high-fill grades reduce virgin resin per product
      Recyclable packaging: production packed in recyclable PP bags
      Less waste: in-process checks cut off-spec material and rework
      Compliance support: SDS, TDS and REACH statements for your reporting
    Quote block with a 2 px Sky Blue left line, Inter Regular italic: "We do
    not claim to be a 'green' company. We take concrete steps to reduce waste,
    produce compliance-friendly grades and help customers use masterbatch more
    efficiently." Right 40%: full-height image cp07_film_roll.png.

17. CONTACT (dark). Centred: BLAU BATCH horizontal logo (DarkBG); below it
    "Full-Spectrum Masterbatch Solutions" in white Inter Regular; white subtitle
    "Let's talk about your next production run"; Sky Blue button with white
    bold caps "REQUEST SAMPLES". Two columns of contact details in white:
      Office: Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt
      Factory: 79, 6th Industrial Zone, 6th of October, Egypt
      +2 0102 2227723 · info@blaubatch.com · www.blaubatch.com
    A very faint repeating "BLAU BATCH" wordmark pattern at about 10% opacity.
    No footer.

TRANSITIONS: simple fade only.
```

### 2d. After Canva generates, check by hand

- [ ] **Amber** appears only on "MANUFACTURED" chips (slides 2, 6, 7, 9, 10).
- [ ] **Inter only.** Select all text and check that Canva didn't substitute template fonts.
- [ ] **Logos** are the uploaded files: not retyped, stretched or recoloured. LightBG versions only on light slides; DarkBG only on dark ones.
- [ ] **Facts unchanged:** no added years, certifications ("ISO certified"), percentages or customer names. Canva AI sometimes adds filler claims.
- [ ] **Sky Blue text** never appears on navy.
- [ ] **No stock content:** no Canva stock photos or illustrations. Only the uploaded images and Canva's plain map element.
- [ ] **Coraplast numbers on slide 11** (15 / 11 / 5 / 17): these match the Coraplast TDS files in `Technical Sheets/Coraplast_extracted/`. Confirm they're still current with Coraplast before sending the deck out.
