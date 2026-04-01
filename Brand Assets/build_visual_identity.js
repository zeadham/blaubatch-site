const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, ImageRun, TabStopType, TabStopPosition
} = require("docx");

// ── Load logo image ──
const LOGO_PATH = "C:/Users/Adham/Desktop/Blau Batch Master/Brand Assets/Logos/BlauBatch_Logo_Primary.jpg";
const logoBuffer = fs.readFileSync(LOGO_PATH);
const CORAPLAST_PATH = "C:/Users/Adham/Desktop/Blau Batch Master/Brand Assets/Logos/coraplast-logo0d-01-01.png";
const coraplastBuffer = fs.readFileSync(CORAPLAST_PATH);

// ── Monochrome logo variants ──
const LOGOS_DIR = "C:/Users/Adham/Desktop/Blau Batch Master/Brand Assets/Logos";
const monoNavyOnWhite     = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_Navy_on_White.png`);
const monoWhiteOnNavy     = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_White_on_Navy.png`);
const monoBlackOnWhite    = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_Black_on_White.png`);
const monoWhiteOnBlack    = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_White_on_Black.png`);
const monoSteelBlueOnWhite= fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_SteelBlue_on_White.png`);
const monoNavyTransp      = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_Navy_Transparent.png`);
const monoWhiteTransp     = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_White_Transparent.png`);
const monoBlackTransp     = fs.readFileSync(`${LOGOS_DIR}/BlauBatch_Logo_Mono_Black_Transparent.png`);

// ── Pattern assets ──
const cutoutBuffer        = fs.readFileSync(`${LOGOS_DIR}/Blaubatch_cutout-logo.png`);
const textOnlyNavyBuffer  = fs.readFileSync(`${LOGOS_DIR}/Export/TextOnly/BlauBatch_TextOnly_Navy_Transparent.png`);
const textOnlyWhiteBuffer = fs.readFileSync(`${LOGOS_DIR}/Export/TextOnly/BlauBatch_TextOnly_White_on_Navy.png`);

function cutoutImage(w, h) {
  return new ImageRun({ type: "png", data: cutoutBuffer, transformation: { width: w, height: h },
    altText: { title: "Blau Batch Cutout Logomark", description: "Transparent B lettermark", name: "Cutout" } });
}
function textOnlyImage(buf, w, h) {
  return new ImageRun({ type: "png", data: buf, transformation: { width: w, height: h },
    altText: { title: "Blau Batch Text-Only Logo", description: "BLAU BATCH wordmark", name: "TextOnly" } });
}

function monoImage(buf, w, h) {
  return new ImageRun({ type: "png", data: buf, transformation: { width: w, height: h },
    altText: { title: "Blau Batch Monochrome Logo", description: "Single-colour B lettermark", name: "Mono Logo" } });
}

// ── Brand Colors ──
const DEEP_NAVY   = "141B3E";
const STEEL_BLUE  = "23447A";
const SKY_BLUE    = "2B8DD0";
const MFG_AMBER   = "D4840A";
const LIGHT_GREY  = "DCDCDC";
const WHITE       = "FFFFFF";
const BLACK       = "000000";
const MID_GREY    = "666666";
const DARK_GREY   = "333333";

// ── Helpers ──
const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: LIGHT_GREY };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

function logoImage(w, h) {
  return new ImageRun({
    type: "jpg",
    data: logoBuffer,
    transformation: { width: w, height: h },
    altText: { title: "Blau Batch Logo", description: "Blau Batch B lettermark logo", name: "BlauBatch Logo" },
  });
}

function colorSwatch(hexColor, name, rgb, cmyk, pantone) {
  return new TableRow({
    children: [
      new TableCell({
        borders: noBorders,
        width: { size: 1800, type: WidthType.DXA },
        shading: { fill: hexColor, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [
          new Paragraph({ children: [new TextRun({ text: " ", font: "Open Sans", size: 20 })] }),
          new Paragraph({ children: [new TextRun({ text: " ", font: "Open Sans", size: 20 })] }),
        ],
      }),
      new TableCell({
        borders: noBorders,
        width: { size: 7560, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 200, right: 120 },
        children: [
          new Paragraph({ children: [new TextRun({ text: name, font: "Montserrat", bold: true, size: 22, color: DEEP_NAVY })] }),
          new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: `HEX: #${hexColor}`, font: "Open Sans", size: 18, color: DARK_GREY })] }),
          new Paragraph({ children: [new TextRun({ text: `RGB: ${rgb}`, font: "Open Sans", size: 18, color: DARK_GREY })] }),
          new Paragraph({ children: [new TextRun({ text: `CMYK: ${cmyk}`, font: "Open Sans", size: 18, color: DARK_GREY })] }),
          new Paragraph({ children: [new TextRun({ text: `Pantone: ${pantone}`, font: "Open Sans", size: 18, color: DARK_GREY })] }),
        ],
      }),
    ],
  });
}

function sectionTitle(text) {
  return new Paragraph({
    spacing: { before: 480, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE, space: 8 } },
    children: [new TextRun({ text: text.toUpperCase(), font: "Montserrat", bold: true, size: 36, color: DEEP_NAVY })],
  });
}

function subTitle(text) {
  return new Paragraph({
    spacing: { before: 360, after: 120 },
    children: [new TextRun({ text, font: "Montserrat", bold: true, size: 26, color: STEEL_BLUE })],
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [new TextRun({ text, font: "Open Sans", size: 21, color: DARK_GREY })],
  });
}

function bulletItem(text, bold = "") {
  const children = [];
  if (bold) children.push(new TextRun({ text: bold + " ", font: "Open Sans", bold: true, size: 21, color: DEEP_NAVY }));
  children.push(new TextRun({ text, font: "Open Sans", size: 21, color: DARK_GREY }));
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 460, hanging: 230 },
    children: [new TextRun({ text: "\u2022  ", font: "Open Sans", size: 21, color: SKY_BLUE }), ...children],
  });
}

function ruleItem(text, icon = "\u2713") {
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: 460, hanging: 230 },
    children: [
      new TextRun({ text: icon + "  ", font: "Open Sans", bold: true, size: 21, color: icon === "\u2713" ? "22883E" : "CC2233" }),
      new TextRun({ text, font: "Open Sans", size: 21, color: DARK_GREY }),
    ],
  });
}

function spacer(h = 200) {
  return new Paragraph({ spacing: { before: h, after: 0 }, children: [] });
}

function contentHeader() {
  return new Header({ children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
      new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 16, color: STEEL_BLUE }),
      new TextRun({ text: "  Visual Identity Guide", font: "Open Sans", size: 16, color: MID_GREY }),
    ],
  })] });
}

function contentFooter() {
  return new Footer({ children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_GREY, space: 4 } },
    children: [
      new TextRun({ text: "BLAU BATCH Visual Identity Guide  |  Page ", font: "Open Sans", size: 16, color: MID_GREY }),
      new TextRun({ children: [PageNumber.CURRENT], font: "Open Sans", size: 16, color: MID_GREY }),
    ],
  })] });
}

// Helper for simple spec tables
function specTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    rows: rows.map(([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            borders: thinBorders, width: { size: 2800, type: WidthType.DXA },
            shading: { fill: "F0F4F8", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: label, font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] })],
          }),
          new TableCell({
            borders: thinBorders, width: { size: 6560, type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: value, font: "Open Sans", size: 18, color: DARK_GREY })] })],
          }),
        ],
      })
    ),
  });
}

// ── Build Document ──
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Open Sans", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Montserrat", color: DEEP_NAVY },
        paragraph: { spacing: { before: 480, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Montserrat", color: STEEL_BLUE },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [
    // ═══════════════════════════════════════════════════════
    // COVER PAGE
    // ═══════════════════════════════════════════════════════
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
      children: [
        new Table({
          width: { size: 12240, type: WidthType.DXA },
          columnWidths: [12240],
          rows: [new TableRow({
            height: { value: 15840, rule: "exact" },
            children: [new TableCell({
              borders: noBorders,
              width: { size: 12240, type: WidthType.DXA },
              shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR },
              verticalAlign: "center",
              margins: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
              children: [
                spacer(1200),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [logoImage(200, 216)] }),
                spacer(400),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 56, color: WHITE })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 80 },
                  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: SKY_BLUE, space: 12 } },
                  children: [new TextRun({ text: "Visual Identity Guide", font: "Montserrat", size: 36, color: SKY_BLUE })] }),
                spacer(300),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Open Sans", size: 22, color: LIGHT_GREY })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 120 }, children: [new TextRun({ text: "v1.0  |  2026", font: "Open Sans", size: 20, color: MID_GREY })] }),
                spacer(2000),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "www.blaubatch.com", font: "Open Sans", size: 18, color: SKY_BLUE })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 40 }, children: [new TextRun({ text: "Confidential \u2014 For authorised use only", font: "Open Sans", size: 16, color: MID_GREY })] }),
              ],
            })],
          })],
        }),
      ],
    },

    // ═══════════════════════════════════════════════════════
    // TABLE OF CONTENTS
    // ═══════════════════════════════════════════════════════
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: contentHeader() },
      footers: { default: contentFooter() },
      children: [
        new Paragraph({
          spacing: { before: 200, after: 400 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE, space: 12 } },
          children: [new TextRun({ text: "TABLE OF CONTENTS", font: "Montserrat", bold: true, size: 36, color: DEEP_NAVY })],
        }),
        spacer(200),
        ...[
          ["01", "Introduction & Purpose"],
          ["02", "The Logo System"],
          ["03", "Text-Only Logo"],
          ["04", "Arabic Brand Name"],
          ["05", "Logo Clear Space & Minimum Sizes"],
          ["06", "Brand Name: How We Write It"],
          ["07", "Logo on Backgrounds"],
          ["08", "Monochrome & Silhouette Versions"],
          ["09", "Incorrect Logo Usage"],
          ["10", "Colour Palette"],
          ["11", "Colour Usage Rules"],
          ["12", "Typography System"],
          ["13", "Typography Hierarchy & Scale"],
          ["14", "Stationery & Applications"],
          ["15", "Digital Applications"],
          ["16", "Iconography & Graphic Elements"],
          ["17", "Patterns & Textures"],
          ["18", "Motion & Animation"],
          ["19", "Co-Branding & Partner Logos"],
          ["20", "Brand Approval & Contact"],
        ].map(([num, title]) =>
          new Paragraph({
            spacing: { before: 130, after: 130 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: LIGHT_GREY, space: 6 } },
            children: [
              new TextRun({ text: num, font: "Montserrat", bold: true, size: 22, color: SKY_BLUE }),
              new TextRun({ text: `    ${title}`, font: "Open Sans", size: 22, color: DEEP_NAVY }),
            ],
          })
        ),
      ],
    },

    // ═══════════════════════════════════════════════════════
    // MAIN CONTENT
    // ═══════════════════════════════════════════════════════
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: contentHeader() },
      footers: { default: contentFooter() },
      children: [
        // ── 01 INTRODUCTION ──
        sectionTitle("01  Introduction & Purpose"),
        bodyText("This Visual Identity Guide is the definitive reference for how Blau Batch presents itself visually across every medium, channel, and touchpoint. It governs the use of our logo, colours, typography, and brand assets \u2014 ensuring consistency whether the brand appears on a business card, a factory signboard, a digital advertisement, or a technical data sheet."),
        bodyText("Visual consistency is not a creative limitation. It is a competitive advantage. In B2B industrial markets, a disciplined brand identity signals reliability, professionalism, and attention to detail \u2014 the same qualities our customers expect from our products and service."),
        subTitle("Who This Guide Is For"),
        bulletItem("Internal marketing and communications teams"),
        bulletItem("External design agencies and print vendors"),
        bulletItem("Sales teams preparing proposals and presentations"),
        bulletItem("Digital teams managing web, social, and email assets"),
        bulletItem("Partner organisations using the Blau Batch brand in co-branded materials"),
        subTitle("Core Principle"),
        bodyText("Every application of the Blau Batch brand must be recognisable, consistent, and professional. When in doubt, refer to this guide. When this guide does not cover a specific case, contact the Marketing & Operations Manager for approval before proceeding."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 02 THE LOGO SYSTEM ──
        sectionTitle("02  The Logo System"),
        bodyText("The Blau Batch logo is built around a distinctive geometric \u2018B\u2019 lettermark composed of layered blue tones that convey precision, depth, and industrial confidence. The logo system consists of four official versions, each designed for specific contexts."),

        subTitle("2.1  Primary Logo (Full Lockup)"),
        bodyText("The primary logo consists of the \u2018B\u2019 lettermark on its official navy square background. This is the default logo for all branded communications including brochures, trade show displays, proposals, product catalogues, and formal print materials."),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 }, children: [logoImage(280, 302)] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Primary Logo \u2014 B lettermark on navy background", font: "Open Sans", italics: true, size: 18, color: MID_GREY })] }),
        bodyText("Always use this version when space permits and the logo will be displayed at a prominent size."),

        subTitle("2.2  Horizontal Logo (Wordmark Lockup)"),
        bodyText("The horizontal logo combines the \u2018B\u2019 lettermark with the company name \u2018BLAU BATCH\u2019 set in Montserrat Black, arranged in a single horizontal lockup. Use for letterheads, email signatures, website navigation, presentation title slides, and trade show banners."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2200, 7160],
          rows: [new TableRow({
            height: { value: 1100, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 200, right: 80 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(100, 108)] })] }),
              new TableCell({ borders: thinBorders, width: { size: 7160, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 300, right: 120 },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 44, color: DEEP_NAVY })] }),
                  new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Open Sans", size: 18, color: MID_GREY })] }),
                ] }),
            ],
          })],
        }),

        subTitle("2.3  Logomark Only (Standalone B)"),
        bodyText("The standalone \u2018B\u2019 lettermark without any text. Use only when brand context is established or space is extremely limited: favicons, app icons, social media avatars, watermarks, embossed packaging, and small promotional items."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({
            height: { value: 1400, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(120, 129)] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "On Navy Background", font: "Open Sans", size: 16, color: LIGHT_GREY, italics: true })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(120, 129)] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80 }, children: [new TextRun({ text: "On Light Background", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                ] }),
            ],
          })],
        }),

        subTitle("2.4  Logo File Formats"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2340, 7020],
          rows: [
            ["AI / EPS", "Print, large format, press materials \u2014 vector source, fully scalable"],
            ["SVG", "Web, icons, responsive digital design \u2014 vector, lightweight, scalable"],
            ["PNG", "Presentations, email signatures, digital collateral \u2014 transparent background"],
            ["JPG", "Social media backgrounds, digital contexts only \u2014 no transparency"],
          ].map(([fmt, desc]) =>
            new TableRow({
              children: [
                new TableCell({ borders: thinBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: fmt, font: "Montserrat", bold: true, size: 20, color: DEEP_NAVY })] })] }),
                new TableCell({ borders: thinBorders, width: { size: 7020, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: desc, font: "Open Sans", size: 20, color: DARK_GREY })] })] }),
              ],
            })
          ),
        }),

        spacer(200),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, left: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, right: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "F0F8FF", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [
                new TextRun({ text: "\u2139  ASSET NOTE:  ", font: "Montserrat", bold: true, size: 18, color: STEEL_BLUE }),
                new TextRun({ text: "Logo files in all four versions (Primary, Horizontal, Logomark, Text-Only) and all formats (AI/EPS, SVG, PNG, JPG) are available from the Marketing & Operations Manager upon request. Always use the official supplied files \u2014 never recreate, trace, or screenshot the logo.", font: "Open Sans", size: 18, color: DARK_GREY }),
              ] }),
            ],
          })] })],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════
        // 03 TEXT-ONLY LOGO
        // ══════════════════════════════════════════════════
        sectionTitle("03  Text-Only Logo"),
        bodyText("The text-only logo is the brand name \u2018BLAU BATCH\u2019 set in Montserrat Black, all caps, with controlled letter-spacing. It is an approved logo variant for contexts where the B lettermark is not suitable or when a typographic-only treatment is preferred."),

        subTitle("3.1  Text-Only Logo \u2014 Navy on Light Backgrounds"),
        bodyText("Use the Deep Navy (#141B3E) text-only logo on white, off-white, and light grey backgrounds."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({
            height: { value: 900, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "White (#FFFFFF)", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Off-White (#F5F5F5)", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: LIGHT_GREY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Light Grey (#DCDCDC)", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
            ],
          })],
        }),

        subTitle("3.2  Text-Only Logo \u2014 White on Dark Backgrounds"),
        bodyText("Use the White (#FFFFFF) text-only logo on Deep Navy, Steel Blue, Black, or any dark background."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({
            height: { value: 900, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Deep Navy (#141B3E)", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: STEEL_BLUE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Steel Blue (#23447A)", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: BLACK, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Black (#000000)", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
            ],
          })],
        }),

        subTitle("3.3  Text-Only Logo with Tagline"),
        bodyText("The text-only logo may optionally include the tagline \u2018Full-Spectrum Masterbatch Solutions\u2019 set below in Open Sans Regular. This version is used for presentations, proposals, and document covers."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({
            height: { value: 1100, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 36, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Open Sans", size: 18, color: STEEL_BLUE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Navy on White", font: "Open Sans", size: 14, color: MID_GREY, italics: true })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 36, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Open Sans", size: 18, color: SKY_BLUE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "White on Navy", font: "Open Sans", size: 14, color: LIGHT_GREY, italics: true })] }),
                ] }),
            ],
          })],
        }),

        subTitle("3.4  Text-Only Logo Rules"),
        bulletItem("Always set in Montserrat Black (900 weight), all caps"),
        bulletItem("Maintain consistent letter-spacing as defined in the official logo files"),
        bulletItem("Never use a different typeface, weight, or case for the text-only logo"),
        bulletItem("The text-only logo follows the same clear space rules as the primary logo"),
        bulletItem("Never combine the text-only logo and the B lettermark in an unofficial arrangement"),

        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════
        // 04 ARABIC BRAND NAME
        // ══════════════════════════════════════════════════
        sectionTitle("04  Arabic Brand Name"),
        bodyText("For Arabic-language markets and materials, the brand name has an approved Arabic rendering. This is used in bilingual communications, MENA-market sales materials, and Arabic social media content."),

        subTitle("4.1  Approved Arabic Brand Name"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({
            height: { value: 1000, rule: "exact" },
            children: [new TableCell({
              borders: thinBorders, width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "F8F9FC", type: ShadingType.CLEAR }, verticalAlign: "center",
              margins: { top: 100, bottom: 100, left: 200, right: 200 },
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 52, color: DEEP_NAVY })],
              })],
            })],
          })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 60, after: 200 },
          children: [new TextRun({ text: "Cairo Bold \u00B7 Approved Arabic rendering of BLAU BATCH", font: "Open Sans", italics: true, size: 16, color: MID_GREY })],
        }),

        subTitle("4.2  Arabic on Light Backgrounds"),
        bodyText("Use the Deep Navy (#141B3E) Arabic brand name on white, off-white, and light grey backgrounds."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({
            height: { value: 900, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "White", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Off-White", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: LIGHT_GREY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Light Grey", font: "Open Sans", size: 14, color: MID_GREY })] }),
                ] }),
            ],
          })],
        }),

        subTitle("4.3  Arabic on Dark Backgrounds"),
        bodyText("Use the White (#FFFFFF) Arabic brand name on Deep Navy, Steel Blue, or Black backgrounds."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({
            height: { value: 900, rule: "exact" },
            children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Deep Navy", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: STEEL_BLUE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Steel Blue", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: BLACK, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Black", font: "Open Sans", size: 14, color: LIGHT_GREY })] }),
                ] }),
            ],
          })],
        }),

        subTitle("4.4  Bilingual Lockup"),
        bodyText("In bilingual applications, the Latin and Arabic brand names appear together. The Latin name always appears first (left or top), with the Arabic name second (right or below)."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({
            height: { value: 1200, rule: "exact" },
            children: [
              // Light version
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 200, right: 200 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 32, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: STEEL_BLUE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Bilingual \u2014 Light", font: "Open Sans", size: 14, color: MID_GREY, italics: true })] }),
                ] }),
              // Dark version
              new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 200, right: 200 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 32, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 28, color: SKY_BLUE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Bilingual \u2014 Dark", font: "Open Sans", size: 14, color: LIGHT_GREY, italics: true })] }),
                ] }),
            ],
          })],
        }),

        subTitle("4.5  Arabic Brand Name Rules"),
        bulletItem("Always set in Cairo Bold (Google Fonts)"),
        bulletItem("Noto Sans Arabic Bold is an approved alternative"),
        bulletItem("Always use the exact approved rendering: \u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634"),
        bulletItem("Never alter, respace, or re-typeset the Arabic name independently"),
        bulletItem("In bilingual layouts, maintain visual balance between Latin and Arabic names"),
        bulletItem("Arabic text always uses right-to-left (RTL) layout \u2014 never mix LTR and RTL in the same design element"),
        bulletItem("All Arabic brand materials require approval from the Marketing & Operations Manager before publication"),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 05 CLEAR SPACE & MINIMUM SIZES ──
        sectionTitle("05  Logo Clear Space & Minimum Sizes"),
        subTitle("5.1  Clear Space (Exclusion Zone)"),
        bodyText("The clear space is the minimum protected area surrounding the logo where no other visual element may appear. It is defined as the height of the \u2018B\u2019 letterform (X), applied equally on all four sides."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({
            height: { value: 3200, rule: "exact" },
            children: [new TableCell({
              borders: { top: { style: BorderStyle.DASHED, size: 2, color: SKY_BLUE }, bottom: { style: BorderStyle.DASHED, size: 2, color: SKY_BLUE }, left: { style: BorderStyle.DASHED, size: 2, color: SKY_BLUE }, right: { style: BorderStyle.DASHED, size: 2, color: SKY_BLUE } },
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "FAFAFA", type: ShadingType.CLEAR }, verticalAlign: "center",
              margins: { top: 200, bottom: 200, left: 200, right: 200 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u2193  X (clear space)", font: "Montserrat", size: 18, color: SKY_BLUE })] }),
                spacer(80),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [
                  new TextRun({ text: "X  \u2190    ", font: "Montserrat", size: 18, color: SKY_BLUE }),
                  logoImage(140, 151),
                  new TextRun({ text: "    \u2192  X", font: "Montserrat", size: 18, color: SKY_BLUE }),
                ] }),
                spacer(80),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "\u2191  X (clear space)", font: "Montserrat", size: 18, color: SKY_BLUE })] }),
                spacer(80),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "X = Height of the B letterform. No elements may enter the exclusion zone.", font: "Open Sans", italics: true, size: 18, color: MID_GREY })] }),
              ],
            })],
          })],
        }),

        subTitle("5.1b  Clear Space \u2014 Absolute Measurements"),
        bodyText("At minimum logo size, X resolves to the following fixed values. Use these when communicating with print vendors or developers who need exact specifications."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CONTEXT", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MIN CLEAR SPACE (X)", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PREFERRED CLEAR SPACE", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
            ] }),
            ...([
              ["Print (brochures, TDS)",    "5 mm",  "10 mm"],
              ["Large format (signage)",    "20 mm", "40 mm"],
              ["Business card",             "3 mm",  "5 mm"],
              ["Digital (web, email)",      "20 px", "40 px"],
              ["Social media avatar",       "8 px",  "16 px"],
              ["Favicon / App icon",        "2 px",  "4 px"],
            ].map(([ctx, min, pref]) => new TableRow({ children: [
              new TableCell({ borders: thinBorders, margins: { top: 70, bottom: 70, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: ctx, font: "Open Sans", size: 18, color: DARK_GREY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 70, bottom: 70, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: min, font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: "F0F8FF", type: ShadingType.CLEAR }, margins: { top: 70, bottom: 70, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: pref, font: "Open Sans", size: 18, color: STEEL_BLUE })] })] }),
            ] }))),
          ],
        }),
        spacer(80),

        subTitle("5.2  Minimum Sizes"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "APPLICATION", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MINIMUM SIZE", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LOGO VERSION", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
            ] }),
            ...[
              ["Print (brochures, datasheets)", "25 mm width", "Primary or Horizontal"],
              ["Digital (web, email, social)", "120 px width", "Primary or Horizontal"],
              ["Favicon / App Icon", "32 \u00D7 32 px", "Logomark Only"],
              ["Business Card", "15 mm width", "Logomark or Horizontal"],
              ["Large Format (signage)", "100 mm width", "Primary"],
            ].map(([a, s, v]) => new TableRow({ children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: a, font: "Open Sans", size: 20, color: DARK_GREY })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: s, font: "Montserrat", bold: true, size: 20, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: v, font: "Open Sans", size: 20, color: STEEL_BLUE })] })] }),
            ] })),
          ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 06 BRAND NAME RULES ──
        sectionTitle("06  Brand Name: How We Write It"),
        bodyText("The brand name is a critical part of our visual identity. Incorrect spelling, capitalisation, or formatting undermines brand recognition. Follow these rules without exception."),

        subTitle("6.1  Official Name"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({
            height: { value: 1000, rule: "exact" },
            children: [new TableCell({
              borders: thinBorders, width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "F8F9FC", type: ShadingType.CLEAR }, verticalAlign: "center",
              margins: { top: 80, bottom: 80, left: 200, right: 200 },
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  logoImage(60, 65),
                  new TextRun({ text: "   BLAU BATCH", font: "Montserrat", bold: true, size: 48, color: DEEP_NAVY }),
                ],
              })],
            })],
          })],
        }),
        bodyText("Two words. Always capitalised. No hyphen, no camelCase, no abbreviation."),

        subTitle("6.2  Acceptable Written Forms"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ children: [
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "E8F5E9", type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "\u2713  CORRECT", font: "Montserrat", bold: true, size: 20, color: "22883E" })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 22, color: DARK_GREY })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "All logo and display uses \u2014 always caps", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "Blau Batch", font: "Open Sans", bold: true, size: 22, color: DARK_GREY })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "In running body text only, title case", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "blaubatch.com", font: "Open Sans", size: 22, color: DARK_GREY })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "Domain/URL only, lowercase, no space", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 22, color: DARK_GREY })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "Approved Arabic rendering only", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
              ] }),
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "FFEBEE", type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 200, right: 200 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "\u2717  INCORRECT", font: "Montserrat", bold: true, size: 20, color: "CC2233" })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "BlauBatch", font: "Open Sans", size: 22, color: DARK_GREY, strike: true })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "No camelCase", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "blau batch", font: "Open Sans", size: 22, color: DARK_GREY, strike: true })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "Never all lowercase in text", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "Blau-Batch / BB / B.B.", font: "Open Sans", size: 22, color: DARK_GREY, strike: true })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "No hyphens, abbreviations, or initials", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "Unofficial Arabic transliterations", font: "Open Sans", size: 22, color: DARK_GREY, strike: true })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "Only the approved Arabic form is permitted", font: "Open Sans", size: 16, color: MID_GREY, italics: true })] }),
              ] }),
          ] })],
        }),

        subTitle("6.3  Tagline"),
        new Paragraph({ spacing: { before: 120, after: 60 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Montserrat", bold: true, size: 28, color: STEEL_BLUE })] }),
        bodyText("The tagline is always written in title case. It may appear beneath the logo in formal applications."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 07 LOGO ON BACKGROUNDS ──
        sectionTitle("07  Logo on Backgrounds"),
        bodyText("The logo must maintain high contrast and visual clarity across all background applications."),

        subTitle("7.0  Transparency Guidance"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, left: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE }, right: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "F0F8FF", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [new TextRun({ text: "PRIMARY LOGO (JPG)", font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Includes the navy background container as part of the image. Use this version on white, light, or photographic backgrounds where the navy square provides brand consistency and clear framing.", font: "Open Sans", size: 18, color: DARK_GREY })] }),
              spacer(80),
              new Paragraph({ children: [new TextRun({ text: "LOGOMARK (PNG \u2014 TRANSPARENT)", font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "The B lettermark without background. Use on dark or navy backgrounds where the container square is unnecessary, or when the logo must float over a coloured surface. Available as a transparent PNG or SVG.", font: "Open Sans", size: 18, color: DARK_GREY })] }),
              spacer(80),
              new Paragraph({ children: [new TextRun({ text: "RULE OF THUMB:", font: "Montserrat", bold: true, size: 18, color: STEEL_BLUE }), new TextRun({ text: "  If the background is light \u2192 use the Primary (with navy container). If the background is dark navy or black \u2192 use the transparent Logomark.", font: "Open Sans", size: 18, color: DARK_GREY })] }),
            ],
          })] })],
        }),
        spacer(100),

        subTitle("7.1  On White / Light Backgrounds"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({ height: { value: 1400, rule: "exact" }, children: [
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "White", font: "Open Sans", size: 14, color: MID_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: "F5F5F5", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Off-White", font: "Open Sans", size: 14, color: MID_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: LIGHT_GREY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Light Grey", font: "Open Sans", size: 14, color: MID_GREY })] }) ] }),
          ] })],
        }),

        subTitle("7.2  On Dark / Navy Backgrounds"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({ height: { value: 1400, rule: "exact" }, children: [
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Deep Navy", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: STEEL_BLUE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Steel Blue", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: BLACK, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(90, 97)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Black", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
          ] })],
        }),

        spacer(60),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, bottom: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, left: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, right: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "FFF8E1", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [
                new TextRun({ text: "\u26A0  NOTE ON BLACK BACKGROUND:  ", font: "Montserrat", bold: true, size: 18, color: MFG_AMBER }),
                new TextRun({ text: "Use of the logo on a pure black (#000000) background is not a standard brand application and is unlikely to arise in normal communications. The logo\u2019s built-in navy container does not provide optimal contrast against black. If a black background is required (e.g., specific exhibition or event context), this must be reviewed and approved by the Marketing & Operations Manager before use.", font: "Open Sans", size: 18, color: DARK_GREY }),
              ] }),
            ],
          })] })],
        }),
        spacer(60),

        subTitle("7.3  On Coloured & Photographic Backgrounds"),
        bodyText("On non-brand colours, always place the logo inside a solid navy or white container block. On photographic backgrounds, apply a semi-transparent navy overlay (min 80% opacity) behind the logo."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 08 MONOCHROME & SILHOUETTE ──
        sectionTitle("08  Monochrome & Silhouette Versions"),
        bodyText("For single-colour print, embossing, engraving, fax, or merchandise, use approved monochrome versions of the logo. In monochrome applications, the multi-tonal B lettermark is reduced to a single flat colour, preserving the outer silhouette shape only."),

        subTitle("8.1  Monochrome Versions"),
        bodyText("The table below defines the three approved single-colour treatments. Each version flattens the layered B lettermark into one solid colour."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [
            // Header row
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "NAVY ON LIGHT", font: "Montserrat", bold: true, size: 16, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WHITE ON DARK", font: "Montserrat", bold: true, size: 16, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BLACK (GREYSCALE)", font: "Montserrat", bold: true, size: 16, color: WHITE })] })] }),
            ] }),
            // Visual row — actual monochrome logo files
            new TableRow({ height: { value: 1800, rule: "exact" }, children: [
              // Navy on White
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [monoImage(monoNavyOnWhite, 110, 110)] }),
                  spacer(40),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Flat Navy  #141B3E", font: "Open Sans", bold: true, size: 14, color: DEEP_NAVY })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Letterheads, embossing, engraving", font: "Open Sans", size: 13, color: MID_GREY, italics: true })] }),
                ] }),
              // White on Navy
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [monoImage(monoWhiteOnNavy, 110, 110)] }),
                  spacer(40),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Flat White  #FFFFFF", font: "Open Sans", bold: true, size: 14, color: WHITE })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Foil stamp, dark merchandise", font: "Open Sans", size: 13, color: LIGHT_GREY, italics: true })] }),
                ] }),
              // Black on White
              new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [monoImage(monoBlackOnWhite, 110, 110)] }),
                  spacer(40),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Flat Black  #000000", font: "Open Sans", bold: true, size: 14, color: BLACK })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Fax, newspaper, photocopy", font: "Open Sans", size: 13, color: MID_GREY, italics: true })] }),
                ] }),
            ] }),
          ],
        }),
        spacer(100),
        subTitle("8.2  Additional Monochrome Variants"),
        bodyText("Two further approved variants for specific print and finishing contexts:"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ height: { value: 1600, rule: "exact" }, children: [
            // Steel Blue on White
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [monoImage(monoSteelBlueOnWhite, 110, 110)] }),
                spacer(40),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Steel Blue  #23447A", font: "Open Sans", bold: true, size: 14, color: STEEL_BLUE })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Single-colour brand blue, light backgrounds", font: "Open Sans", size: 13, color: MID_GREY, italics: true })] }),
              ] }),
            // White on Black
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: BLACK, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [monoImage(monoWhiteOnBlack, 110, 110)] }),
                spacer(40),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Flat White  #FFFFFF", font: "Open Sans", bold: true, size: 14, color: WHITE })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Requires Marketing Manager approval", font: "Open Sans", size: 13, color: MFG_AMBER, italics: true })] }),
              ] }),
          ] })],
        }),

        spacer(100),
        subTitle("8.3  Monochrome Asset Index"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4500, 4860],
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "FILENAME", font: "Montserrat", bold: true, size: 16, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: "USE CASE", font: "Montserrat", bold: true, size: 16, color: WHITE })] })] }),
            ] }),
            ...([
              ["BlauBatch_Logo_Mono_Navy_on_White.png",      "Standard print: letterheads, datasheets, embossing on light stock"],
              ["BlauBatch_Logo_Mono_White_on_Navy.png",      "Dark print: foil stamp, screen print on navy merchandise"],
              ["BlauBatch_Logo_Mono_Black_on_White.png",     "Greyscale print: fax, newspaper, photocopy"],
              ["BlauBatch_Logo_Mono_White_on_Black.png",     "Special use only — requires Marketing Manager approval"],
              ["BlauBatch_Logo_Mono_SteelBlue_on_White.png", "Brand-colour single-tone variant for presentations"],
              ["BlauBatch_Logo_Mono_Navy_Transparent.png",   "Layering on custom-coloured surfaces (PNG, transparent bg)"],
              ["BlauBatch_Logo_Mono_White_Transparent.png",  "Layering on dark custom surfaces (PNG, transparent bg)"],
              ["BlauBatch_Logo_Mono_Black_Transparent.png",  "Greyscale layering (PNG, transparent bg)"],
            ].map(([file, use]) => new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: file, font: "Courier New", size: 16, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: use, font: "Open Sans", size: 16, color: DARK_GREY })] })] }),
            ] }))),
          ],
        }),

        subTitle("8.4  Greyscale Mapping"),
        bulletItem("Deep Navy \u2192 90% Black", "Deep Navy"),
        bulletItem("Steel Blue \u2192 65% Black", "Steel Blue"),
        bulletItem("Sky Blue \u2192 45% Black", "Sky Blue"),
        bulletItem("Manufacturing Amber \u2192 55% Black", "Manufacturing Amber"),

        subTitle("8.5  Silhouette / Embossed Mark"),
        bodyText("For embossing, debossing, engraving, or watermark: use the simplified silhouette B lettermark only (no wordmark), reduced to a single flat shape."),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 09 INCORRECT USAGE ──
        sectionTitle("09  Incorrect Logo Usage"),
        bodyText("The following are strictly prohibited:"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [
            ["\u2717  Do not stretch or compress", "Maintain original aspect ratio at all times.", "\u2717  Do not rotate or tilt", "Always upright and level, never angled."],
            ["\u2717  Do not add effects", "No shadows, glows, bevels, outlines, gradients.", "\u2717  Do not recolour", "Only approved colour versions permitted."],
            ["\u2717  Do not place on busy images", "Use a solid backing panel for legibility.", "\u2717  Do not alter proportions", "Lettermark and wordmark spacing as supplied."],
            ["\u2717  Do not use low-res rasters", "Always use vector for print. Never screenshot.", "\u2717  Do not crop or mask", "Full logo must be visible at all times."],
          ].map(([t1, d1, t2, d2]) => new TableRow({ children: [
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "FFF5F5", type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 200, right: 200 },
              children: [
                new Paragraph({ children: [new TextRun({ text: t1, font: "Open Sans", bold: true, size: 20, color: "CC2233" })] }),
                new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: d1, font: "Open Sans", size: 18, color: MID_GREY })] }),
              ] }),
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "FFF5F5", type: ShadingType.CLEAR }, margins: { top: 120, bottom: 120, left: 200, right: 200 },
              children: [
                new Paragraph({ children: [new TextRun({ text: t2, font: "Open Sans", bold: true, size: 20, color: "CC2233" })] }),
                new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: d2, font: "Open Sans", size: 18, color: MID_GREY })] }),
              ] }),
          ] })),
        }),

        spacer(200),
        new Paragraph({ children: [new TextRun({ text: "Visual Example \u2014 What NOT to Do:", font: "Montserrat", bold: true, size: 22, color: "CC2233" })] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ height: { value: 1200, rule: "exact" }, children: [
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, bottom: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, left: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, right: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" } },
              width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(160, 80)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "\u2717 Stretched / distorted", font: "Open Sans", size: 16, color: "CC2233" })] }),
              ] }),
            new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, bottom: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, left: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" }, right: { style: BorderStyle.SINGLE, size: 2, color: "CC2233" } },
              width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(60, 120)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "\u2717 Compressed / squished", font: "Open Sans", size: 16, color: "CC2233" })] }),
              ] }),
          ] })],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 10 COLOUR PALETTE ──
        sectionTitle("10  Colour Palette"),
        subTitle("10.1  Primary Brand Colours"),
        new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1800, 7560], rows: [
          colorSwatch(DEEP_NAVY, "Deep Navy", "20, 27, 62", "68, 56, 0, 76", "2767 C"),
          colorSwatch(STEEL_BLUE, "Steel Blue", "35, 68, 122", "71, 44, 0, 52", "295 C"),
          colorSwatch(SKY_BLUE, "Sky Blue", "43, 141, 208", "79, 32, 0, 18", "285 C"),
        ] }),
        subTitle("10.2  Accent & Neutral Colours"),
        new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [1800, 7560], rows: [
          colorSwatch(MFG_AMBER, "Manufacturing Amber", "212, 132, 10", "0, 38, 95, 17", "144 C"),
          colorSwatch(LIGHT_GREY, "Light Grey", "220, 220, 220", "0, 0, 0, 14", "Cool Gray 1 C"),
          colorSwatch(WHITE, "White", "255, 255, 255", "0, 0, 0, 0", "11-0601 TPX"),
        ] }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 11 COLOUR USAGE ──
        sectionTitle("11  Colour Usage Rules"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2400, 6960],
          rows: [
            [DEEP_NAVY, "Deep Navy", "Primary background, dark panels, main headings, logo base, cover pages"],
            [STEEL_BLUE, "Steel Blue", "Secondary headings, navigation, supporting panels, table headers"],
            [SKY_BLUE, "Sky Blue", "Accents, CTA buttons, hyperlinks, highlights, icons, product badges"],
            [MFG_AMBER, "Manufacturing Amber", "Manufacturing accent ONLY: \u2018MANUFACTURED\u2019 labels. Never dominant."],
            [LIGHT_GREY, "Light Grey", "Page backgrounds, alternate table rows, subtle dividers"],
            [WHITE, "White", "Text on dark backgrounds, clean print backgrounds, whitespace"],
          ].map(([fill, name, desc]) => new TableRow({ children: [
            new TableCell({ borders: thinBorders, width: { size: 2400, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: name, font: "Montserrat", bold: true, size: 20, color: (fill === LIGHT_GREY || fill === WHITE) ? DARK_GREY : WHITE })] })] }),
            new TableCell({ borders: thinBorders, width: { size: 6960, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: desc, font: "Open Sans", size: 20, color: DARK_GREY })] })] }),
          ] })),
        }),
        subTitle("11.1  Colour Ratio"),
        bulletItem("60% \u2014 Deep Navy + White (dominant foundation)"),
        bulletItem("25% \u2014 Steel Blue + Sky Blue (supporting structure and accents)"),
        bulletItem("10% \u2014 Light Grey (neutral spacing and dividers)"),
        bulletItem("5% \u2014 Manufacturing Amber (sparingly, manufacturing-specific only)"),

        spacer(120),
        subTitle("11.2  WCAG Accessibility Contrast"),
        bodyText("All text and logo applications must meet WCAG 2.1 minimum contrast standards. AA (4.5:1) is required for all body text; AAA (7:1) is the target for headings and logo applications."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2600, 2200, 1800, 1380, 1380],
          rows: [
            new TableRow({ children: [
              ...[["COMBINATION", DEEP_NAVY], ["CONTRAST RATIO", DEEP_NAVY], ["WCAG AA", DEEP_NAVY], ["WCAG AAA", DEEP_NAVY], ["NOTES", DEEP_NAVY]].map(([t, c]) =>
                new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 100, right: 100 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: "Montserrat", bold: true, size: 16, color: WHITE })] })] })
              ),
            ] }),
            ...([
              ["Navy on White",         "#141B3E / #FFF",   "14.7:1", "\u2705 Pass", "\u2705 Pass", "Preferred — use freely"],
              ["White on Navy",         "#FFF / #141B3E",   "14.7:1", "\u2705 Pass", "\u2705 Pass", "Preferred — use freely"],
              ["Steel Blue on White",   "#23447A / #FFF",   "7.2:1",  "\u2705 Pass", "\u2705 Pass", "Use for subheadings"],
              ["Sky Blue on White",     "#2B8DD0 / #FFF",   "4.6:1",  "\u2705 Pass", "\u274C Fail",  "Min 18pt / Bold only"],
              ["Sky Blue on Navy",      "#2B8DD0 / #141B3E","3.2:1",  "\u274C Fail",  "\u274C Fail",  "Graphic/icon use only"],
              ["Amber on White",        "#D4840A / #FFF",   "3.2:1",  "\u274C Fail",  "\u274C Fail",  "NEVER for body text \u2014 graphic accent \u226518pt only"],
              ["White on Steel Blue",   "#FFF / #23447A",   "7.2:1",  "\u2705 Pass", "\u2705 Pass", "Safe for reversed text"],
              ["Dark Grey on White",    "#333333 / #FFF",   "12.6:1", "\u2705 Pass", "\u2705 Pass", "Body text default"],
            ].map(([combo, codes, ratio, aa, aaa, note]) => new TableRow({ children: [
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: combo, font: "Open Sans", bold: true, size: 16, color: DARK_GREY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: codes, font: "Courier New", size: 14, color: MID_GREY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ratio, font: "Montserrat", bold: true, size: 16, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: aa, font: "Open Sans", size: 16 })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: aaa, font: "Open Sans", size: 16 })] })] }),
              // Note col omitted (5 cols) — fold into last cell
            ] }))),
          ],
        }),
        spacer(60),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, bottom: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, left: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER }, right: { style: BorderStyle.SINGLE, size: 2, color: MFG_AMBER } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "FFF8E1", type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 200, right: 200 },
            children: [new Paragraph({ children: [
              new TextRun({ text: "\u26A0  AMBER TEXT RULE:  ", font: "Montserrat", bold: true, size: 18, color: MFG_AMBER }),
              new TextRun({ text: "Manufacturing Amber (#D4840A) has a contrast ratio of only 3.2:1 on white \u2014 below WCAG 2.1 AA. It must NEVER be used for body text or any text below 18pt / Bold. Permitted uses: graphic accents, badge labels (e.g. \u2018MANUFACTURED\u2019 chips), decorative callouts at large size only.", font: "Open Sans", size: 18, color: DARK_GREY }),
            ] })],
          })] })],
        }),

        spacer(120),
        subTitle("11.3  Design Tokens \u2014 Spacing, Radius & Layout"),
        bodyText("The following tokens define the structural system. Apply consistently across all digital and print applications to ensure visual coherence."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2800, 2200, 4360],
          rows: [
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "TOKEN", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "VALUE", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
              new TableCell({ borders: thinBorders, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: "USAGE", font: "Montserrat", bold: true, size: 18, color: WHITE })] })] }),
            ] }),
            ...([
              // Border radius
              ["border-radius-none",   "0px / 0mm",      "Print documents, business cards, TDS headers \u2014 sharp industrial aesthetic"],
              ["border-radius-sm",     "2px",             "Icon bounding boxes, small UI tags, badge chips"],
              ["border-radius-md",     "4px",             "UI cards, form inputs, modal containers, CTA buttons"],
              ["border-radius-lg",     "8px",             "Notification panels, feature callout blocks"],
              // Layout grid
              ["grid-columns-print",   "12 columns",      "Print layouts: 10mm margins, 5mm gutters, A4/Letter"],
              ["grid-columns-web",     "12 columns",      "Web: 80px margins (desktop), 24px (mobile), 24px gutters"],
              ["grid-margin-print",    "10mm",            "Minimum page margin for all print documents"],
              ["grid-margin-web",      "80px / 24px",     "Desktop / mobile page margin"],
              ["grid-gutter-print",    "5mm",             "Column gutter for multi-column print layouts"],
              ["grid-gutter-web",      "24px",            "Column gutter for web layouts"],
              // Spacing scale
              ["space-xs",             "4px / 1mm",       "Icon-to-label gaps, tight inline spacing"],
              ["space-sm",             "8px / 2mm",       "Component internal padding (compact)"],
              ["space-md",             "16px / 4mm",      "Standard component padding, list item spacing"],
              ["space-lg",             "32px / 8mm",      "Section spacing, card padding"],
              ["space-xl",             "64px / 16mm",     "Page section breaks, hero padding"],
              ["space-xxl",            "128px / 30mm",    "Cover page spacing, large banner margins"],
              // Shadow / elevation
              ["shadow-none",          "none",            "Flat print, flat UI panels (default brand style)"],
              ["shadow-low",           "0 1px 3px rgba(20,27,62,0.12)", "Cards, dropdowns, tooltips"],
              ["shadow-mid",           "0 4px 12px rgba(20,27,62,0.18)", "Modals, floating panels, popovers"],
            ].map(([token, value, usage]) => new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: token, font: "Courier New", size: 16, color: STEEL_BLUE })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: value, font: "Montserrat", bold: true, size: 16, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: usage, font: "Open Sans", size: 16, color: DARK_GREY })] })] }),
            ] }))),
          ],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 12 TYPOGRAPHY ──
        sectionTitle("12  Typography System"),
        subTitle("12.1  Primary Typeface \u2014 Montserrat"),
        specTable([
          ["Role", "Logo lockups, display titles, section headers, brand callouts"],
          ["Weights", "Black (900) \u00B7 ExtraBold (800) \u00B7 Bold (700)"],
          ["Style", "All Caps preferred for brand headlines; Title Case for subheadings"],
          ["Source", "Google Fonts (free) \u2014 fonts.google.com/specimen/Montserrat"],
          ["Fallback", "Arial Black \u2192 Arial \u2192 Sans-serif"],
        ]),
        subTitle("12.2  Body Typeface \u2014 Open Sans"),
        specTable([
          ["Role", "Body copy, captions, data tables, UI text, email, TDS"],
          ["Weights", "Regular (400) \u00B7 Semi-Bold (600) \u00B7 Bold (700)"],
          ["Style", "Sentence case. Line height 1.5\u00D7 body, 1.2\u00D7 headings"],
          ["Source", "Google Fonts (free) \u2014 fonts.google.com/specimen/Open+Sans"],
          ["Fallback", "Arial \u2192 Helvetica \u2192 Sans-serif"],
        ]),
        subTitle("12.3  Arabic Typeface \u2014 Cairo"),
        specTable([
          ["Role", "Arabic brand name, Arabic body copy, bilingual materials"],
          ["Weights", "Bold (700) for brand name \u00B7 Regular (400) for body"],
          ["Alternative", "Noto Sans Arabic (Google Fonts)"],
          ["Source", "Google Fonts (free) \u2014 fonts.google.com/specimen/Cairo"],
          ["Direction", "Always RTL \u2014 never mix LTR and RTL in same element"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 13 TYPE HIERARCHY ──
        sectionTitle("13  Typography Hierarchy & Scale"),
        new Paragraph({ spacing: { before: 200, after: 60 }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR },
          children: [new TextRun({ text: "  FULL-SPECTRUM MASTERBATCH SOLUTIONS", font: "Montserrat", bold: true, size: 36, color: WHITE })] }),
        new Paragraph({ children: [new TextRun({ text: "Display / Cover Title  \u2014  Montserrat Black \u00B7 48\u201372pt \u00B7 All Caps", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
        spacer(100),
        new Paragraph({ spacing: { before: 60, after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: SKY_BLUE, space: 4 } },
          children: [new TextRun({ text: "SECTION HEADING \u2014 HEADING 1", font: "Montserrat", bold: true, size: 32, color: DEEP_NAVY })] }),
        new Paragraph({ children: [new TextRun({ text: "Montserrat ExtraBold \u00B7 36\u201348pt \u00B7 All Caps", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
        spacer(100),
        new Paragraph({ children: [new TextRun({ text: "Subsection Heading \u2014 Heading 2", font: "Montserrat", bold: true, size: 28, color: STEEL_BLUE })] }),
        new Paragraph({ children: [new TextRun({ text: "Montserrat Bold \u00B7 28\u201332pt \u00B7 Title Case", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
        spacer(100),
        new Paragraph({ children: [new TextRun({ text: "Sub-Subsection Heading \u2014 Heading 3", font: "Open Sans", bold: true, size: 24, color: STEEL_BLUE })] }),
        new Paragraph({ children: [new TextRun({ text: "Open Sans Bold \u00B7 20\u201324pt \u00B7 Title Case", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
        spacer(100),
        new Paragraph({ children: [new TextRun({ text: "Body copy set in Open Sans Regular at 11\u201312pt with 1.5\u00D7 line height for readability.", font: "Open Sans", size: 22, color: DARK_GREY })] }),
        new Paragraph({ children: [new TextRun({ text: "Open Sans Regular \u00B7 10\u201312pt \u00B7 Sentence Case", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
        spacer(100),
        new Paragraph({ children: [new TextRun({ text: "CAPTION AND LABEL TEXT \u2014 METADATA AND ANNOTATIONS", font: "Open Sans", size: 16, color: MID_GREY })] }),
        new Paragraph({ children: [new TextRun({ text: "Open Sans Regular \u00B7 8\u20139pt \u00B7 All Caps or Sentence Case", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 14 STATIONERY ──
        sectionTitle("14  Stationery & Applications"),
        subTitle("14.1  Business Card"),
        specTable([
          ["Dimensions", "90 \u00D7 55 mm (standard international)"],
          ["Front \u2014 Name", "Montserrat Bold 10pt, charcoal"],
          ["Front \u2014 Title", "Montserrat Regular 8pt, Steel Blue (#23447A)"],
          ["Front \u2014 Contact", "Open Sans Regular 7.5pt \u2014 phone, email, website"],
          ["Back", "Full B lettermark centred on navy background"],
          ["Print Spec", "CMYK \u00B7 350gsm coated \u00B7 Matt laminate + UV spot on logo"],
        ]),
        spacer(100),
        // Business card mockup
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ height: { value: 1600, rule: "exact" }, children: [
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 120, bottom: 120, left: 200, right: 200 },
              children: [
                new Paragraph({ children: [logoImage(40, 43)] }),
                spacer(60),
                new Paragraph({ children: [new TextRun({ text: "Adham Zahran", font: "Montserrat", bold: true, size: 20, color: DARK_GREY })] }),
                new Paragraph({ spacing: { before: 20 }, children: [new TextRun({ text: "Marketing & Operations Manager", font: "Montserrat", size: 16, color: STEEL_BLUE })] }),
                spacer(40),
                new Paragraph({ children: [new TextRun({ text: "+2 0102 2227723", font: "Open Sans", size: 15, color: DARK_GREY })] }),
                new Paragraph({ children: [new TextRun({ text: "adham.zahran@blaubatch.com", font: "Open Sans", size: 15, color: SKY_BLUE })] }),
                new Paragraph({ children: [new TextRun({ text: "www.blaubatch.com", font: "Open Sans", size: 15, color: SKY_BLUE })] }),
                spacer(40),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "FRONT", font: "Open Sans", size: 14, color: LIGHT_GREY, italics: true })] }),
              ] }),
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 120, bottom: 120, left: 200, right: 200 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(100, 108)] }),
                spacer(60),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "BACK", font: "Open Sans", size: 14, color: MID_GREY, italics: true })] }),
              ] }),
          ] })],
        }),

        subTitle("14.2  Letterhead"),
        bulletItem("Header: BLAU BATCH horizontal lockup + www.blaubatch.com \u2014 top left"),
        bulletItem("Body: Open Sans 11pt, single spacing, 1.15 line height"),
        bulletItem("Footer: Office address \u00B7 Phone \u00B7 Email \u00B7 Website in Open Sans 8pt"),
        bulletItem("Paper: A4 white 100gsm for print; digital PDF on white"),
        bulletItem("Colour accents: Navy and Sky Blue only \u2014 no amber on letterhead"),

        subTitle("14.3  Email Signature"),
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 12, color: SKY_BLUE }, right: noBorder },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "F0F8FF", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 200, right: 200 },
            children: [new Paragraph({ children: [
              new TextRun({ text: "\u2139  PLATFORM CONSTRAINT \u2014 ARIAL ONLY:  ", font: "Montserrat", bold: true, size: 18, color: SKY_BLUE }),
              new TextRun({ text: "Email clients (Outlook, Gmail, Apple Mail) do not load web fonts. Arial is specified here as a platform constraint, not as a brand preference. The brand fonts \u2014 Montserrat and Open Sans \u2014 remain the standard for all other touchpoints. The logo image embedded as a PNG ensures brand consistency regardless of font rendering.", font: "Open Sans", size: 18, color: DARK_GREY }),
            ] })],
          })] })],
        }),
        spacer(80),
        specTable([
          ["Name", "Arial Bold 11pt, charcoal  \u2014  (platform constraint: see note above)"],
          ["Title", "Arial 10pt, Steel Blue (#23447A)"],
          ["Phone", "Arial 9pt, charcoal"],
          ["Email", "Arial 9pt, Sky Blue, no underline"],
          ["Website", "Arial 9pt, Sky Blue, no underline"],
          ["Logo", "Horizontal lockup \u2014 180px wide \u2014 PNG transparent"],
          ["Disclaimer", "Arial 7.5pt, grey, thin grey rule above"],
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 15 DIGITAL ──
        sectionTitle("15  Digital Applications"),
        subTitle("15.1  Website"),
        bulletItem("Clean, minimal layouts \u2014 product information first"),
        bulletItem("Mobile-responsive across all breakpoints"),
        bulletItem("Navy backgrounds, Sky Blue CTAs, Amber for manufacturing highlights only"),
        bulletItem("Arial/Helvetica as web-safe fallbacks for Montserrat and Open Sans"),

        subTitle("15.2  Social Media Profiles"),
        specTable([
          ["Profile Image", "Logomark (B) on navy \u2014 consistent across all platforms"],
          ["Cover / Banner", "Navy background with horizontal lockup and tagline"],
          ["Handle", "@BlauBatch \u2014 consistent across all platforms"],
          ["Post Visuals", "White or navy backgrounds, brand palette, no stock photography"],
        ]),
        spacer(100),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [new TableRow({ height: { value: 1200, rule: "exact" }, children: [
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(70, 75)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "LinkedIn", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(70, 75)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Instagram", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
            new TableCell({ borders: thinBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(70, 75)] }), new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Facebook", font: "Open Sans", size: 14, color: LIGHT_GREY })] }) ] }),
          ] })],
        }),

        subTitle("15.3  Photography Rules"),
        bulletItem("Clean, well-lit, sharply in focus \u2014 no blurred or poorly lit imagery"),
        bulletItem("Colour accuracy critical \u2014 masterbatch colours must render faithfully"),
        bulletItem("No stock photography. No AI-generated imagery. No heavy filters."),
        bulletItem("300 dpi for print; 72 dpi web-optimised for digital"),

        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════
        // 16 ICONOGRAPHY & GRAPHIC ELEMENTS
        // ══════════════════════════════════════════════════
        sectionTitle("16  Iconography & Graphic Elements"),
        bodyText("Icons and graphic elements used across BLAU BATCH communications must follow a consistent visual language that aligns with the brand\u2019s precision-focused identity."),

        subTitle("16.1  Icon Style"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2800, 6560],
          rows: [
            ["Style", "Line icons (outlined), geometric, clean corners"],
            ["Stroke Weight", "2px at 24\u00D724px base size \u2014 scale proportionally"],
            ["Corner Radius", "2px rounded corners for consistency"],
            ["Colour", "Deep Navy (#141B3E) primary \u00B7 Sky Blue (#2B8DD0) for interactive/hover states \u00B7 White on dark backgrounds"],
            ["Sizing Grid", "24\u00D724px base unit \u00B7 Scale in multiples: 16, 24, 32, 48, 64px"],
            ["Optical Padding", "2px internal padding within the bounding box"],
          ].map(([label, value]) =>
            new TableRow({
              children: [
                new TableCell({ borders: thinBorders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: label, font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] })] }),
                new TableCell({ borders: thinBorders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: value, font: "Open Sans", size: 18, color: DARK_GREY })] })] }),
              ],
            })
          ),
        }),

        subTitle("16.2  Approved Icon Library"),
        bodyText("The approved icon library for Blau Batch is Phosphor Icons \u2014 a clean, consistent line-icon set that matches the brand\u2019s geometric and precision-focused aesthetic. Always use the regular (outlined) weight."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2800, 6560],
          rows: [
            ["Library", "Phosphor Icons \u2014 phosphoricons.com"],
            ["Weight to use", "Regular (outlined) only \u2014 never Thin or Bold weight in brand contexts"],
            ["Web",    "npm: phosphor-react / phosphor-vue / phosphor-svelte \u00B7 or CDN SVG sprites"],
            ["Print",  "Export individual SVGs from phosphoricons.com at required size"],
            ["Figma",  "Phosphor Icons Figma plugin (search \u2018Phosphor\u2019 in Figma Community)"],
            ["Licence","MIT \u2014 free for commercial use, no attribution required"],
          ].map(([label, value]) =>
            new TableRow({ children: [
              new TableCell({ borders: thinBorders, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: label, font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] })] }),
              new TableCell({ borders: thinBorders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: value, font: "Open Sans", size: 18, color: DARK_GREY })] })] }),
            ] })
          ),
        }),
        spacer(80),

        subTitle("16.3  Icon Usage Rules"),
        bulletItem("Always source icons from Phosphor Icons (regular weight) \u2014 never mix icon libraries or styles"),
        bulletItem("Maintain consistent stroke weight across all icons in a single layout"),
        bulletItem("Icons must sit within the brand colour palette \u2014 never use colours outside the system"),
        bulletItem("Use Sky Blue icons for interactive/clickable elements; Deep Navy for static/informational"),
        bulletItem("Minimum icon size: 16\u00D716px on screen, 4mm\u00D74mm in print"),
        bulletItem("Never combine filled and outlined icons in the same context"),
        bulletItem("For contexts where Phosphor is unavailable, use Material Symbols (outlined) as the only permitted alternative"),

        subTitle("16.3  Graphic Elements"),
        bodyText("Supporting graphic elements are derived from the geometric language of the B lettermark:"),
        bulletItem("Diagonal divider lines at the same angle as the lettermark\u2019s facets (approx. 30\u00B0)", "Angular Dividers:"),
        bulletItem("Layered translucent rectangles in brand blues, used as section backgrounds or accent blocks", "Layered Panels:"),
        bulletItem("Thin Sky Blue lines (1\u20132px) for separating content sections, table dividers, and pull-quote borders", "Accent Lines:"),
        bulletItem("Subtle geometric patterns at 5\u201310% opacity for large background areas", "Background Geometry:"),

        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════
        // 17 PATTERNS & TEXTURES
        // ══════════════════════════════════════════════════
        sectionTitle("17  Patterns & Textures"),
        bodyText("Branded patterns extend the visual identity into backgrounds, packaging, and environmental design. Two approved pattern types are defined below. Both use official logo assets \u2014 never recreate pattern elements manually."),

        // ── PREFERRED badge helper ──
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: noBorder, bottom: noBorder, left: { style: BorderStyle.SINGLE, size: 12, color: SKY_BLUE }, right: noBorder },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "F0F8FF", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 200, right: 200 },
            children: [new Paragraph({ children: [
              new TextRun({ text: "\u2605  PREFERRED PATTERN:  ", font: "Montserrat", bold: true, size: 18, color: SKY_BLUE }),
              new TextRun({ text: "The Text-Only pattern (Section 17.2) is the recommended choice for all background pattern applications. It reads clearly at any scale, tiles cleanly, and never creates visual confusion with the primary B lettermark logo.", font: "Open Sans", size: 18, color: DARK_GREY }),
            ] })],
          })] })],
        }),
        spacer(100),

        subTitle("17.1  Logomark Pattern \u2014 Cutout B Grid"),
        bodyText("A repeating grid of the transparent B lettermark cutout at reduced opacity. For use in large-format print backgrounds, packaging liners, trade show panels, and environmental graphics. Reduce to 8\u201312% opacity in production so it never competes with foreground content."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ height: { value: 1800, rule: "exact" }, children: [
            // Light: cutout on white
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 60, bottom: 60, left: 60, right: 60 },
              children: [
                new Table({
                  width: { size: 4320, type: WidthType.DXA },
                  columnWidths: [1440, 1440, 1440],
                  rows: [
                    ...[0,1,2].map(() => new TableRow({ children: [
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                    ] })),
                  ],
                }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "On white \u2014 reduce to 8% opacity in production", font: "Open Sans", size: 14, color: MID_GREY, italics: true })] }),
              ] }),
            // Dark: cutout on navy
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 60, bottom: 60, left: 60, right: 60 },
              children: [
                new Table({
                  width: { size: 4320, type: WidthType.DXA },
                  columnWidths: [1440, 1440, 1440],
                  rows: [
                    ...[0,1,2].map(() => new TableRow({ children: [
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                      new TableCell({ borders: noBorders, width: { size: 1440, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, margins: { top: 40, bottom: 40, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [cutoutImage(38, 43)] })] }),
                    ] })),
                  ],
                }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "On navy \u2014 reduce to 10% lighter than base in production", font: "Open Sans", size: 14, color: LIGHT_GREY, italics: true })] }),
              ] }),
          ] })],
        }),
        spacer(60),
        bodyText("Note: The cutout B lettermark pattern works best at large scale (signage, packaging, booth panels). At small scale or high density, use the Text-Only pattern instead."),

        spacer(120),

        // ── PREFERRED badge ──
        new Table({
          width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE }, left: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE }, right: { style: BorderStyle.SINGLE, size: 6, color: SKY_BLUE } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "EBF5FB", type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 240, right: 240 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
              new TextRun({ text: "\u2605  PREFERRED PATTERN USE  \u2605", font: "Montserrat", bold: true, size: 22, color: SKY_BLUE }),
            ] })],
          })] })],
        }),

        subTitle("17.2  Text-Only Pattern \u2014 BLAU BATCH Wordmark Grid"),
        bodyText("A repeating grid of the BLAU BATCH wordmark in Montserrat Black. This is the preferred pattern for most applications: it tiles cleanly at any scale, is immediately legible as a brand watermark, and never creates confusion with the primary logo. Use on document backgrounds, presentation slides, social media templates, and promotional materials."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4680, 4680],
          rows: [new TableRow({ height: { value: 1800, rule: "exact" }, children: [
            // Light: text-only navy on white
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: WHITE, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [textOnlyImage(textOnlyNavyBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyNavyBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyNavyBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyNavyBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Navy on white \u2014 reduce to 8% opacity in production", font: "Open Sans", size: 14, color: MID_GREY, italics: true })] }),
              ] }),
            // Dark: text-only white on navy
            new TableCell({ borders: thinBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 80, right: 80 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [textOnlyImage(textOnlyWhiteBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyWhiteBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyWhiteBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [textOnlyImage(textOnlyWhiteBuffer, 200, 42)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "White on navy \u2014 reduce to 10% opacity in production", font: "Open Sans", size: 14, color: LIGHT_GREY, italics: true })] }),
              ] }),
          ] })],
        }),

        subTitle("17.3  Secondary Pattern \u2014 Angular Stripes"),
        bodyText("Diagonal stripe pattern using brand blues at varying opacities (10\u201320%). Used on packaging wraps, trade show booth panels, and promotional banners. Stripes follow the 30\u00B0 angle derived from the lettermark geometry."),

        subTitle("17.4  Pattern Rules"),
        bulletItem("Text-Only wordmark pattern is the preferred choice for most backgrounds and templates", "\u2605"),
        bulletItem("Logomark (cutout B) pattern is reserved for large-format and environmental applications"),
        bulletItem("Patterns must never compete with the logo \u2014 always below 15% opacity when behind content"),
        bulletItem("Only brand palette colours permitted (Deep Navy, Steel Blue, Sky Blue)"),
        bulletItem("Manufacturing Amber is never used in patterns"),
        bulletItem("Patterns must tile seamlessly at any scale"),
        bulletItem("Never stretch, skew, or rotate the pattern grid independently"),
        bulletItem("Pattern source files are available from the Marketing & Operations Manager"),

        new Paragraph({ children: [new PageBreak()] }),

        // ══════════════════════════════════════════════════
        // 18 MOTION & ANIMATION
        // ══════════════════════════════════════════════════
        sectionTitle("18  Motion & Animation"),
        bodyText("Motion design for BLAU BATCH is purposeful, restrained, and premium. Animations reinforce the brand\u2019s precision engineering identity \u2014 smooth, confident, and never flashy."),

        subTitle("18.1  Logo Animation"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2800, 6560],
          rows: [
            ["Reveal Style", "The B lettermark builds layer by layer \u2014 each blue tone fades in sequentially from back to front, suggesting depth and precision"],
            ["Duration", "1.2\u20131.8 seconds total (0.3s per layer)"],
            ["Easing", "ease-out (cubic-bezier 0.25, 0.46, 0.45, 0.94) \u2014 smooth deceleration"],
            ["End State", "Hold full logo for minimum 2 seconds before any transition"],
            ["Sound", "Optional: a subtle, low metallic tone \u2014 no swooshes, no jingles"],
          ].map(([label, value]) =>
            new TableRow({
              children: [
                new TableCell({ borders: thinBorders, width: { size: 2800, type: WidthType.DXA }, shading: { fill: "F0F4F8", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: label, font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] })] }),
                new TableCell({ borders: thinBorders, width: { size: 6560, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                  children: [new Paragraph({ children: [new TextRun({ text: value, font: "Open Sans", size: 18, color: DARK_GREY })] })] }),
              ],
            })
          ),
        }),

        subTitle("18.2  UI & Web Transitions"),
        bulletItem("Page transitions: fade-in (300ms ease-out) \u2014 no sliding, no bouncing"),
        bulletItem("Button hover: background colour shift over 200ms (e.g., Sky Blue \u2192 Steel Blue)"),
        bulletItem("Card/panel reveals: fade-up (translate Y 20px \u2192 0, opacity 0 \u2192 1, 400ms ease-out)"),
        bulletItem("Loading states: subtle pulse animation using Sky Blue at reduced opacity"),
        bulletItem("Never use: spinning logos, bouncing elements, confetti, parallax effects, or aggressive zoom transitions"),

        subTitle("18.3  Video & Presentation"),
        bulletItem("Opening bumper: logo animation (as above) on navy background, 3 seconds total"),
        bulletItem("Lower thirds: navy bar with white Montserrat text, Sky Blue accent line, fade-in 400ms"),
        bulletItem("End card: full logo lockup centred on navy, tagline below, hold for 4 seconds minimum"),
        bulletItem("Transitions between sections: simple crossfade (500ms) \u2014 no wipes, no star transitions"),
        bulletItem("Title cards: Montserrat Bold white text on navy, fade-in with 200ms stagger per line"),

        subTitle("18.4  Motion Principles"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2400, 6960],
          rows: [
            [DEEP_NAVY, "Purposeful", "Every animation must serve a functional purpose \u2014 guide attention, indicate state change, or provide feedback. No decorative motion."],
            [STEEL_BLUE, "Restrained", "Subtle and smooth. Maximum 500ms for any single transition. No overshooting, bouncing, or elastic effects."],
            [SKY_BLUE, "Consistent", "Use the same easing curve (ease-out) and timing scale across all touchpoints. Motion should feel unified."],
          ].map(([fill, name, desc]) => new TableRow({ children: [
            new TableCell({ borders: thinBorders, width: { size: 2400, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: name, font: "Montserrat", bold: true, size: 20, color: WHITE })] })] }),
            new TableCell({ borders: thinBorders, width: { size: 6960, type: WidthType.DXA }, margins: { top: 100, bottom: 100, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: desc, font: "Open Sans", size: 20, color: DARK_GREY })] })] }),
          ] })),
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 19 CO-BRANDING ──
        sectionTitle("19  Co-Branding & Partner Logos"),
        bulletItem("BLAU BATCH logo must be at least equal in visual weight to partner logo"),
        bulletItem("Minimum 2\u00D7 standard clear space between logos"),
        bulletItem("A thin divider line (Light Grey #DCDCDC) may separate logos"),
        bulletItem("Never blend, merge, or combine logos into a single mark"),
        bulletItem("All co-branded materials require Marketing & Operations Manager approval"),

        subTitle("16.1  Coraplast Co-Branding"),
        bodyText("BLAU BATCH logo appears first (left or top), Coraplast logo second, separated by a divider."),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4200, 480, 4680],
          rows: [new TableRow({ height: { value: 1000, rule: "exact" }, children: [
            new TableCell({ borders: noBorders, width: { size: 4200, type: WidthType.DXA }, shading: { fill: "F8F9FC", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 200, right: 80 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(80, 86)] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 18, color: DEEP_NAVY })] }),
              ] }),
            new TableCell({ borders: { top: noBorder, bottom: noBorder, left: noBorder, right: { style: BorderStyle.SINGLE, size: 2, color: LIGHT_GREY } },
              width: { size: 480, type: WidthType.DXA }, shading: { fill: "F8F9FC", type: ShadingType.CLEAR }, verticalAlign: "center",
              children: [new Paragraph({ children: [new TextRun({ text: " ", size: 20 })] })] }),
            new TableCell({ borders: noBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "F8F9FC", type: ShadingType.CLEAR }, verticalAlign: "center", margins: { top: 80, bottom: 80, left: 200, right: 200 },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [
                  new ImageRun({ type: "png", data: coraplastBuffer, transformation: { width: 140, height: 50 }, altText: { title: "Coraplast Logo", description: "Coraplast partner logo", name: "Coraplast" } }),
                ] }),
                new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 20 }, children: [new TextRun({ text: "Authorised Distribution Partner", font: "Open Sans", italics: true, size: 16, color: MID_GREY })] }),
              ] }),
          ] })],
        }),

        new Paragraph({ children: [new PageBreak()] }),

        // ── 20 BRAND APPROVAL ──
        sectionTitle("20  Brand Approval & Contact"),
        bodyText("All uses of the BLAU BATCH logo, brand colours, and brand assets must be reviewed and approved by the Marketing & Operations Manager before publication or distribution."),
        spacer(200),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({ children: [new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 3, color: SKY_BLUE }, bottom: { style: BorderStyle.SINGLE, size: 3, color: SKY_BLUE }, left: { style: BorderStyle.SINGLE, size: 3, color: SKY_BLUE }, right: { style: BorderStyle.SINGLE, size: 3, color: SKY_BLUE } },
            width: { size: 9360, type: WidthType.DXA }, shading: { fill: "F0F4F8", type: ShadingType.CLEAR },
            margins: { top: 200, bottom: 200, left: 300, right: 300 },
            children: [
              new Paragraph({ spacing: { after: 120 }, children: [logoImage(40, 43), new TextRun({ text: "   BRAND APPROVAL CONTACT", font: "Montserrat", bold: true, size: 24, color: DEEP_NAVY })] }),
              new Paragraph({ children: [new TextRun({ text: "Adham Zahran", font: "Montserrat", bold: true, size: 22, color: DEEP_NAVY })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Marketing & Operations Manager", font: "Open Sans", size: 20, color: STEEL_BLUE })] }),
              spacer(100),
              new Paragraph({ children: [new TextRun({ text: "Email:  ", font: "Open Sans", bold: true, size: 20, color: DARK_GREY }), new TextRun({ text: "adham.zahran@blaubatch.com", font: "Open Sans", size: 20, color: SKY_BLUE })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Company:  ", font: "Open Sans", bold: true, size: 20, color: DARK_GREY }), new TextRun({ text: "info@blaubatch.com", font: "Open Sans", size: 20, color: SKY_BLUE })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Phone:  ", font: "Open Sans", bold: true, size: 20, color: DARK_GREY }), new TextRun({ text: "+2 0102 2227723", font: "Open Sans", size: 20, color: DARK_GREY })] }),
              new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: "Website:  ", font: "Open Sans", bold: true, size: 20, color: DARK_GREY }), new TextRun({ text: "www.blaubatch.com", font: "Open Sans", size: 20, color: SKY_BLUE })] }),
            ],
          })] })],
        }),
        spacer(400),
        // Closing
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [new TableRow({ height: { value: 1600, rule: "exact" }, children: [new TableCell({
            borders: noBorders, width: { size: 9360, type: WidthType.DXA },
            shading: { fill: DEEP_NAVY, type: ShadingType.CLEAR }, verticalAlign: "center",
            margins: { top: 200, bottom: 200, left: 300, right: 300 },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [logoImage(80, 86)] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "BLAU BATCH", font: "Montserrat", bold: true, size: 32, color: WHITE })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "\u0628\u0640\u0640\u0644\u0627\u0648 \u0628\u0640\u0640\u0627\u062A\u0634", font: "Cairo", bold: true, size: 24, color: SKY_BLUE })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "Full-Spectrum Masterbatch Solutions", font: "Open Sans", size: 20, color: LIGHT_GREY })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [new TextRun({ text: "Manufacturer  \u00B7  Distributor  \u00B7  Partner", font: "Open Sans", size: 18, color: MID_GREY })] }),
            ],
          })] })],
        }),
      ],
    },
  ],
});

// ── Generate ──
const OUT = "C:/Users/Adham/Desktop/Blau Batch Master/Brand Assets/BlauBatch_VisualIdentityGuide_v1.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("Done:", OUT, `(${(buf.length / 1024).toFixed(1)} KB)`);
}).catch(e => console.error("Error:", e));
