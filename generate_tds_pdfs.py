#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Blau Batch TDS & Catalogue PDF Generator
=========================================
Generates branded PDF Technical Data Sheets:
- Blau Batch branded for manufactured products (Filler Masterbatch)
- Blau Batch + Coraplast co-branded for distributed products

Brand Guidelines v4 compliance:
- Colors: Deep Navy #141B3E, Steel Blue #23447A, Sky Blue #2B8DD0, Mfg Amber #D4840A
- Typography: Montserrat (headings), Open Sans (body) — with Arial fallback
- Logos: Blau Batch primary + Coraplast logo for co-branded
"""

import os
import sys
import re
import pdfplumber
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm, inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    Image, PageBreak, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus.flowables import Flowable
from reportlab.lib.utils import ImageReader

# ============================================================
# PATHS
# ============================================================
BASE_DIR = r"C:\Users\Adham\Desktop\Blau Batch Master"
BRAND_DIR = os.path.join(BASE_DIR, "Brand Assets")
LOGO_BB = os.path.join(BRAND_DIR, "Logos", "BlauBatch_Logo_Primary.jpg")
LOGO_CP = os.path.join(BRAND_DIR, "Logos", "coraplast-logo0d-01-01.png")
CORAPLAST_DIR = os.path.join(BRAND_DIR, "Technical Sheets", "Coraplast_extracted")
OUT_BB = os.path.join(BRAND_DIR, "Generated TDS", "Blau Batch")
OUT_CP = os.path.join(BRAND_DIR, "Generated TDS", "Coraplast Co-branded")

# ============================================================
# BRAND COLORS (v4)
# ============================================================
DEEP_NAVY = colors.HexColor("#141B3E")
STEEL_BLUE = colors.HexColor("#23447A")
SKY_BLUE = colors.HexColor("#2B8DD0")
MFG_AMBER = colors.HexColor("#D4840A")
LIGHT_GREY = colors.HexColor("#DCDCDC")
WHITE = colors.HexColor("#FFFFFF")
TABLE_HEADER_BG = STEEL_BLUE
TABLE_ALT_ROW = colors.HexColor("#F0F4F8")

# ============================================================
# FONT REGISTRATION — use Arial as fallback (universally available on Windows)
# ============================================================
def register_fonts():
    """Register fonts. Use Arial (Windows built-in) as reliable fallback."""
    font_dirs = [
        r"C:\Windows\Fonts",
        os.path.expanduser(r"~\AppData\Local\Microsoft\Windows\Fonts"),
    ]

    # Try Montserrat first, fall back to Arial
    montserrat_found = False
    opensans_found = False

    for fd in font_dirs:
        if not os.path.isdir(fd):
            continue
        for f in os.listdir(fd):
            fl = f.lower()
            if "montserrat" in fl and fl.endswith(".ttf"):
                if "bold" in fl and "extra" not in fl and "semi" not in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("Montserrat-Bold", os.path.join(fd, f)))
                        montserrat_found = True
                    except:
                        pass
                elif "extrabold" in fl or "extra" in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("Montserrat-ExtraBold", os.path.join(fd, f)))
                    except:
                        pass
                elif "black" in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("Montserrat-Black", os.path.join(fd, f)))
                    except:
                        pass
                elif "regular" in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("Montserrat", os.path.join(fd, f)))
                    except:
                        pass
            if "opensans" in fl.replace("-", "").replace(" ", "") and fl.endswith(".ttf"):
                if "bold" in fl and "semi" not in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("OpenSans-Bold", os.path.join(fd, f)))
                        opensans_found = True
                    except:
                        pass
                elif "semibold" in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("OpenSans-SemiBold", os.path.join(fd, f)))
                    except:
                        pass
                elif "regular" in fl:
                    try:
                        pdfmetrics.registerFont(TTFont("OpenSans", os.path.join(fd, f)))
                    except:
                        pass

    # Use Arial as universal fallback
    arial_path = r"C:\Windows\Fonts\arial.ttf"
    arialbd_path = r"C:\Windows\Fonts\arialbd.ttf"

    if os.path.exists(arial_path):
        try:
            pdfmetrics.registerFont(TTFont("Arial", arial_path))
        except:
            pass
    if os.path.exists(arialbd_path):
        try:
            pdfmetrics.registerFont(TTFont("Arial-Bold", arialbd_path))
        except:
            pass

    # Determine actual fonts to use
    heading_font = "Montserrat-Bold" if montserrat_found else "Arial-Bold"
    heading_font_heavy = "Montserrat-ExtraBold" if montserrat_found else "Arial-Bold"
    body_font = "OpenSans" if opensans_found else "Arial"
    body_font_bold = "OpenSans-Bold" if opensans_found else "Arial-Bold"

    # If nothing custom found, just use Helvetica (always available in reportlab)
    try:
        pdfmetrics.getFont(heading_font)
    except:
        heading_font = "Helvetica-Bold"
        heading_font_heavy = "Helvetica-Bold"
    try:
        pdfmetrics.getFont(body_font)
    except:
        body_font = "Helvetica"
        body_font_bold = "Helvetica-Bold"

    return heading_font, heading_font_heavy, body_font, body_font_bold

HEADING_FONT, HEADING_FONT_HEAVY, BODY_FONT, BODY_FONT_BOLD = register_fonts()

# ============================================================
# STYLES
# ============================================================
def get_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name="TDS_Title",
        fontName=HEADING_FONT_HEAVY,
        fontSize=18,
        textColor=DEEP_NAVY,
        alignment=TA_CENTER,
        spaceAfter=4*mm,
        spaceBefore=2*mm,
        leading=22,
    ))
    styles.add(ParagraphStyle(
        name="TDS_Subtitle",
        fontName=HEADING_FONT,
        fontSize=11,
        textColor=STEEL_BLUE,
        alignment=TA_CENTER,
        spaceAfter=2*mm,
        leading=14,
    ))
    styles.add(ParagraphStyle(
        name="TDS_SectionHead",
        fontName=HEADING_FONT,
        fontSize=11,
        textColor=STEEL_BLUE,
        spaceBefore=5*mm,
        spaceAfter=2*mm,
        leading=14,
    ))
    styles.add(ParagraphStyle(
        name="TDS_Body",
        fontName=BODY_FONT,
        fontSize=9,
        textColor=colors.HexColor("#222222"),
        spaceBefore=1*mm,
        spaceAfter=1*mm,
        leading=13,
    ))
    styles.add(ParagraphStyle(
        name="TDS_BodyBold",
        fontName=BODY_FONT_BOLD,
        fontSize=9,
        textColor=colors.HexColor("#222222"),
        spaceBefore=1*mm,
        spaceAfter=1*mm,
        leading=13,
    ))
    styles.add(ParagraphStyle(
        name="TDS_Small",
        fontName=BODY_FONT,
        fontSize=7,
        textColor=colors.HexColor("#666666"),
        spaceBefore=1*mm,
        spaceAfter=0,
        leading=9,
    ))
    styles.add(ParagraphStyle(
        name="TDS_Footer",
        fontName=BODY_FONT,
        fontSize=7.5,
        textColor=WHITE,
        alignment=TA_CENTER,
        leading=10,
    ))
    styles.add(ParagraphStyle(
        name="TDS_CoBrand",
        fontName=BODY_FONT,
        fontSize=8,
        textColor=STEEL_BLUE,
        alignment=TA_CENTER,
        leading=10,
    ))
    styles.add(ParagraphStyle(
        name="TDS_ProductCode",
        fontName=HEADING_FONT,
        fontSize=13,
        textColor=DEEP_NAVY,
        alignment=TA_CENTER,
        spaceAfter=1*mm,
        leading=16,
    ))

    return styles

STYLES = get_styles()

# ============================================================
# CUSTOM FLOWABLES
# ============================================================
class NavyHeaderBar(Flowable):
    """A colored bar for the header area."""
    def __init__(self, width, height, color=DEEP_NAVY):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

class AccentStripe(Flowable):
    """Thin accent stripe below header."""
    def __init__(self, width, height=2*mm, color=SKY_BLUE):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

# ============================================================
# PAGE TEMPLATE WITH HEADER/FOOTER
# ============================================================
def make_header_footer_bb(canvas, doc, is_cobranded=False):
    """Draw header and footer on every page — Blau Batch branded."""
    canvas.saveState()
    w, h = A4

    # === TOP ACCENT BAR ===
    canvas.setFillColor(DEEP_NAVY)
    canvas.rect(0, h - 8*mm, w, 8*mm, fill=1, stroke=0)
    canvas.setFillColor(SKY_BLUE)
    canvas.rect(0, h - 10*mm, w, 2*mm, fill=1, stroke=0)

    # === LOGO (top left, below accent) ===
    logo_y = h - 32*mm
    if os.path.exists(LOGO_BB):
        try:
            canvas.drawImage(LOGO_BB, 15*mm, logo_y, width=35*mm, height=18*mm,
                           preserveAspectRatio=True, mask='auto')
        except:
            pass

    # === Co-brand: Coraplast logo (top right) ===
    if is_cobranded and os.path.exists(LOGO_CP):
        try:
            canvas.drawImage(LOGO_CP, w - 55*mm, logo_y, width=35*mm, height=18*mm,
                           preserveAspectRatio=True, mask='auto')
        except:
            pass

    # === Thin line below logos ===
    canvas.setStrokeColor(LIGHT_GREY)
    canvas.setLineWidth(0.5)
    canvas.line(15*mm, logo_y - 2*mm, w - 15*mm, logo_y - 2*mm)

    # === FOOTER ===
    canvas.setFillColor(DEEP_NAVY)
    canvas.rect(0, 0, w, 18*mm, fill=1, stroke=0)
    canvas.setFillColor(SKY_BLUE)
    canvas.rect(0, 18*mm, w, 1.5*mm, fill=1, stroke=0)

    # Footer text
    canvas.setFillColor(WHITE)
    canvas.setFont(BODY_FONT, 7)

    # Left: contact
    canvas.drawString(15*mm, 11*mm, "+2 0102 2227723  |  info@blaubatch.com")

    # Center: website
    canvas.drawCentredString(w/2, 11*mm, "www.blaubatch.com")

    # Right: address
    canvas.drawRightString(w - 15*mm, 11*mm, "79, 6th Industrial Zone, 6th of October, Egypt")

    # Bottom line
    canvas.setFont(BODY_FONT, 6)
    if is_cobranded:
        canvas.drawCentredString(w/2, 5*mm, "Blau Batch  |  Authorised Distributor of Coraplast Industries")
    else:
        canvas.drawCentredString(w/2, 5*mm, "Blau Batch  |  Full-Spectrum Masterbatch Solutions")

    canvas.restoreState()


def header_footer_bb(canvas, doc):
    make_header_footer_bb(canvas, doc, is_cobranded=False)

def header_footer_cobranded(canvas, doc):
    make_header_footer_bb(canvas, doc, is_cobranded=True)


# ============================================================
# TABLE BUILDER
# ============================================================
def build_properties_table(rows, col_headers, col_widths):
    """Build a styled properties table."""
    data = [col_headers] + rows

    style_cmds = [
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_BG),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('FONTNAME', (0, 0), (-1, 0), BODY_FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, 0), 8),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 4),
        ('TOPPADDING', (0, 0), (-1, 0), 4),

        # Body rows
        ('FONTNAME', (0, 1), (-1, -1), BODY_FONT),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('FONTNAME', (0, 1), (0, -1), BODY_FONT_BOLD),  # First col bold
        ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
        ('ALIGN', (0, 1), (0, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 3),
        ('TOPPADDING', (0, 1), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),

        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#CCCCCC")),
        ('LINEBELOW', (0, 0), (-1, 0), 1, STEEL_BLUE),
    ]

    # Alternating row colors
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_ALT_ROW))

    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle(style_cmds))
    return t


# ============================================================
# BLAU BATCH MANUFACTURED PRODUCTS DATA
# ============================================================
BLAU_BATCH_PRODUCTS = [
    {
        "code": "FMPE-1070",
        "name": "PE Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading to optimize performance, enhance production efficiency, and reduce costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for blown film, shopping bags, garbage bags, agricultural films, liners, extrusion coating, lamination, and selected injection & extrusion applications.",
        "physical_props": [
            ["Carrier", "LLDPE"],
            ["CaCO\u2083", "70% \u00b1 2%"],
            ["Density @23\u00b0C (Specific gravity)", "1.7 g/cm\u00b3"],
            ["MFI (2.16 kg/190 \u00b0C)", "2.3 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPE-1075",
        "name": "PE Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading to optimize performance, enhance production efficiency, and reduce costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for blown film, shopping bags, garbage bags, agricultural films, liners, extrusion coating, lamination, and selected injection & extrusion applications.",
        "physical_props": [
            ["Carrier", "LLDPE"],
            ["CaCO\u2083", "75% \u00b1 2%"],
            ["Density @23\u00b0C (Specific gravity)", "1.7 g/cm\u00b3"],
            ["MFI (2.16 kg/190 \u00b0C)", "2.3 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPE-1080",
        "name": "PE Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading to optimize performance, enhance production efficiency, and reduce costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for blown film, shopping bags, garbage bags, agricultural films, liners, extrusion coating, lamination, and selected injection & extrusion applications.",
        "physical_props": [
            ["Carrier", "LLDPE"],
            ["CaCO\u2083", "80% \u00b1 2%"],
            ["Density @23\u00b0C (Specific gravity)", "1.7 g/cm\u00b3"],
            ["MFI (2.16 kg/190 \u00b0C)", "2.3 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPE-2070",
        "name": "PE Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading to optimize performance, enhance production efficiency, and reduce costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for Blown film, shopping bags, garbage bags, industrial liners, agricultural film, extrusion coating, lamination, and PE sheets (LDPE/LLDPE/HDPE blends).",
        "physical_props": [
            ["Carrier", "LDPE"],
            ["CaCO\u2083", "70% \u00b1 2%"],
            ["Density @23\u00b0C (Specific gravity)", "1.65 g/cm\u00b3"],
            ["MFI (2.16 kg/190 \u00b0C)", "2 g/10 min"],
            ["Moisture content", "< 0.08"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "170\u2013220"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPP-1070",
        "name": "PP Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading, optimizing performance, enhancing production efficiency, and reducing costs.",
        "general_desc": "This product contains: CaCO3, resin, and some additives. It\u2019s suitable for applications such as woven sacks, raffia, injection molding, sheets, thermoforming, blown film, and non-woven fabrics. Ideal where increased stiffness, improved processability, and reduced shrinkage are required without compromising basic mechanical performance.",
        "physical_props": [
            ["Carrier", "PP"],
            ["CaCO\u2083", "70% \u00b1 2%"],
            ["Density @23 \u00b0C (Specific gravity)", "2.1"],
            ["MFI (2.16 kg/230 \u00b0C)", "8 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPP-1075",
        "name": "PP Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading, optimizing performance, enhancing production efficiency, and reducing costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for applications such as woven sacks, raffia, injection molding, sheets, thermoforming, blown film, and non-woven fabrics. Ideal where increased stiffness, improved processability, and reduced shrinkage are required without compromising basic mechanical performance.",
        "physical_props": [
            ["Carrier", "PP"],
            ["CaCO\u2083", "75% \u00b1 2%"],
            ["Density @23 \u00b0C (Specific gravity)", "2.1"],
            ["MFI (2.16 kg/230 \u00b0C)", "8 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPP-1080",
        "name": "PP Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading, optimizing performance, enhancing production efficiency, and reducing costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for applications such as woven sacks, raffia, injection molding, sheets, thermoforming, blown film, and non-woven fabrics. Ideal where increased stiffness, improved processability, and reduced shrinkage are required without compromising basic mechanical performance.",
        "physical_props": [
            ["Carrier", "PP"],
            ["CaCO\u2083", "80% \u00b1 2%"],
            ["Density @23 \u00b0C (Specific gravity)", "2.1"],
            ["MFI (2.16 kg/230 \u00b0C)", "8 g/10 min"],
            ["Moisture content", "< 0.08"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "200\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition"],
        ],
    },
    {
        "code": "FMPP-2180",
        "name": "PP Filler Masterbatch",
        "description": "BLAU BATCH supplies high-performance calcium carbonate filler masterbatches for polyolefin polymers. Our advanced formulation delivers excellent CaCO\u2083 dispersion and high loading, optimizing performance, enhancing production efficiency, and reducing costs.",
        "general_desc": "This product contains: CaCO3, resin and some additives. It\u2019s suitable for applications such as woven sacks, raffia, injection molding, sheets, thermoforming, blown film, and non-woven fabrics. Ideal where increased stiffness, improved processability, and reduced shrinkage are required without compromising basic mechanical performance.",
        "physical_props": [
            ["Carrier", "PPH"],
            ["CaCO\u2083", "80% \u00b1 2%"],
            ["Density @23 \u00b0C (Specific gravity)", "2.1"],
            ["MFI (2.16 kg/230 \u00b0C)", "8 g/10 min"],
            ["Moisture content", "< 0.05"],
        ],
        "technical_props": [
            ["Appearance (Surface color)", "White"],
            ["Additives", "Dispersion agent, processing aid"],
            ["Processing temperature (\u00b0C)", "160\u2013250"],
            ["Expiry date", "6 months"],
            ["Packing", "25 kgs per PP bag"],
            ["Storage", "Keep at dry condition."],
        ],
    },
]


# ============================================================
# CORAPLAST PDF TEXT EXTRACTOR
# ============================================================
def extract_coraplast_data(pdf_path):
    """Extract structured data from a Coraplast TDS PDF using text parsing."""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += (page.extract_text() or "") + "\n"
    except Exception as e:
        print(f"  [WARN] Could not read {pdf_path}: {e}")
        return None

    if not text.strip():
        return None

    data = {}

    # Extract product code from filename as fallback
    fname = os.path.basename(pdf_path).replace(" - TDS.pdf", "").strip()
    data["code"] = fname

    # Product code from text
    m = re.search(r"Product\s*Code[:\s]*([A-Z0-9\s]+?)(?:\n|$)", text, re.I)
    if m:
        data["code"] = m.group(1).strip()

    # Colour
    m = re.search(r"Colou?r[:\s]*([A-Za-z\s]+?)(?:\n|$)", text, re.I)
    data["colour"] = m.group(1).strip() if m else ""

    # Carrier Polymer / Carrier resin
    m = re.search(r"Carrier\s*(?:Polymer|resin)[:\s]*([A-Za-z]+)", text, re.I)
    data["carrier"] = m.group(1).strip() if m else ""

    # Active content (for FY types)
    m = re.search(r"Active\s*content[:\s]*([\d.]+%)", text, re.I)
    data["active_content"] = m.group(1).strip() if m else ""

    # Appearance
    m = re.search(r"Appearance[:\s]*([A-Za-z\s]+?)(?:\n|$)", text, re.I)
    data["appearance"] = m.group(1).strip() if m else "Cylindrical Granules"

    # Product description
    m = re.search(r"Product\s*[Dd]escription[:\s]*\n?(.*?)(?:Addition Level|Masterbatch Information)", text, re.S)
    if m:
        desc = m.group(1).strip()
        desc = re.sub(r'\s+', ' ', desc)
        data["description"] = desc
    else:
        data["description"] = f"{data['code']} is a masterbatch product."

    # Addition level
    m = re.search(r"Addition\s*Level[:\s]*\n?(.*?)(?:Masterbatch Information|Physical Properties)", text, re.S)
    if m:
        al = m.group(1).strip()
        al = re.sub(r'\s+', ' ', al)
        data["addition_level"] = al
    else:
        data["addition_level"] = ""

    # Physical properties — use both table extraction and text fallback
    props = []

    # Method 1: Try table extraction with None filtering
    try:
        with pdfplumber.open(pdf_path) as pdf2:
            for page in pdf2.pages:
                tables = page.extract_tables()
                if not tables:
                    continue
                for table in tables:
                    if not table:
                        continue
                    for row in table:
                        if not row or len(row) < 2:
                            continue
                        # Filter out None values to get actual cells
                        cells = [str(c).strip() if c is not None else None for c in row]
                        cells = [c for c in cells if c is not None and c != '']
                        if len(cells) < 2:
                            continue
                        # Skip header rows
                        if cells[0].lower() in ('properties', 'property', ''):
                            continue
                        # Clean numbering prefix
                        cells[0] = re.sub(r'^\d+\.?\s*', '', cells[0])
                        if not cells[0]:
                            continue
                        # Build 4-col row
                        if len(cells) >= 4:
                            props.append([cells[0], cells[1], cells[2], cells[3]])
                        elif len(cells) == 3:
                            props.append([cells[0], cells[1], "--", cells[2]])
                        elif len(cells) == 2:
                            props.append([cells[0], "--", "--", cells[1]])
    except:
        pass

    # Method 2: Text-based fallback if table extraction yielded nothing
    if not props:
        props_match = re.search(
            r"Physical\s*Properties[:\s]*\n(.*?)(?:Regulatory|Packaging|Note:|This information|$)",
            text, re.S | re.I
        )
        if props_match:
            props_text = props_match.group(1)
            lines = props_text.strip().split('\n')
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                if re.match(r'^Properties\s+(Unit|Test)', line, re.I):
                    continue
                line = re.sub(r'^\d+\.?\s*', '', line)
                if not line:
                    continue
                parts = re.split(r'\s{2,}', line)
                if len(parts) >= 4:
                    props.append([parts[0], parts[1], parts[2], parts[3]])
                elif len(parts) == 3:
                    props.append([parts[0], parts[1], "--", parts[2]])
                elif len(parts) == 2:
                    props.append([parts[0], "--", "--", parts[1]])

    # Clean up unicode artifacts
    for i, row in enumerate(props):
        for j, cell in enumerate(row):
            props[i][j] = cell.replace('\uf0b1', '\u00b1').replace('\uf0b0', '\u00b0')

    data["properties"] = props

    # Regulatory
    m = re.search(r"Regulatory[:\s]*\n?(.*?)(?:Packaging|$)", text, re.S)
    if m:
        reg = m.group(1).strip()
        reg = re.sub(r'\s+', ' ', reg)
        data["regulatory"] = reg
    else:
        data["regulatory"] = ""

    # Packaging & Storage
    m = re.search(r"Packaging\s*&?\s*Storage[:\s]*\n?(.*?)(?:Note:|Survey|This information|$)", text, re.S)
    if m:
        pkg = m.group(1).strip()
        pkg = re.sub(r'\s+', ' ', pkg)
        data["packaging"] = pkg
    else:
        data["packaging"] = "Supplied in 25 kg bags. Store in dry place."

    return data


# ============================================================
# PDF GENERATORS
# ============================================================
def generate_blaubatch_tds(product, output_dir):
    """Generate a Blau Batch branded TDS PDF for a manufactured product."""
    filename = f"{product['code']} {product['name']}.pdf"
    filepath = os.path.join(output_dir, filename)

    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        topMargin=38*mm,
        bottomMargin=24*mm,
        leftMargin=15*mm,
        rightMargin=15*mm,
        title=f"Product Data Sheet - {product['code']}",
        author="Blau Batch",
    )

    story = []
    pw = A4[0] - 30*mm  # page width minus margins

    # Title
    story.append(Paragraph("PRODUCT DATA SHEET", STYLES["TDS_Title"]))

    # Product code & name
    story.append(Paragraph(f"Product Code: {product['code']}", STYLES["TDS_ProductCode"]))
    story.append(Paragraph(f"Product Name: {product['name']}", STYLES["TDS_Subtitle"]))

    # Manufactured badge
    badge_data = [["MANUFACTURED BY BLAU BATCH"]]
    badge = Table(badge_data, colWidths=[60*mm])
    badge.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), MFG_AMBER),
        ('TEXTCOLOR', (0, 0), (-1, -1), WHITE),
        ('FONTNAME', (0, 0), (-1, -1), BODY_FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, -1), 7),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('ROUNDEDCORNERS', [2, 2, 2, 2]),
    ]))
    story.append(Spacer(1, 2*mm))
    badge_wrapper = Table([[badge]], colWidths=[pw])
    badge_wrapper.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    story.append(badge_wrapper)
    story.append(Spacer(1, 4*mm))

    # Description
    story.append(Paragraph(product["description"], STYLES["TDS_Body"]))

    # General Description
    story.append(Paragraph("General Description", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
    story.append(Paragraph(product["general_desc"], STYLES["TDS_Body"]))

    # Physical Properties
    story.append(Paragraph("Physical Properties", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

    phys_table = build_properties_table(
        product["physical_props"],
        ["Property", "Value"],
        [pw * 0.55, pw * 0.45]
    )
    story.append(phys_table)

    # Technical Properties
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Technical Properties", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

    tech_table = build_properties_table(
        product["technical_props"],
        ["Property", "Value"],
        [pw * 0.55, pw * 0.45]
    )
    story.append(tech_table)

    # Method of Usage
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Method of Usage", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
    story.append(Paragraph(
        "Easy to disperse and homogeneous, Blau Batch Filler Masterbatch can be directly added or pre-blended with resin using dosing units. It avoids contamination and ensures smooth processing.",
        STYLES["TDS_Body"]
    ))

    # Caution
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph("Caution:", STYLES["TDS_BodyBold"]))
    story.append(Paragraph(
        "<i>This product may absorb moisture after long-term storage or contact with a moist environment. Please dry it in a dryer before use.</i>",
        STYLES["TDS_Small"]
    ))

    # Disclaimer
    story.append(Spacer(1, 4*mm))
    story.append(HRFlowable(width="100%", thickness=0.3, color=LIGHT_GREY, spaceAfter=2*mm))
    story.append(Paragraph(
        "<i>This product information is based on our general experience and does not constitute a specification. Since many factors affect the use of our products, no warranty is given or implied with respect to this information or patent infringement. We do not accept liability for any loss or damage arising from the use of this information. All sales are subject to our Standard Terms and Conditions of Sale.</i>",
        STYLES["TDS_Small"]
    ))

    doc.build(story, onFirstPage=header_footer_bb, onLaterPages=header_footer_bb)
    print(f"  [OK] {filename}")
    return filepath


def generate_coraplast_tds(product_data, output_dir):
    """Generate a co-branded (Blau Batch + Coraplast) TDS PDF."""
    code = product_data.get("code", "UNKNOWN")
    filename = f"{code} - Technical Data Sheet.pdf"
    filepath = os.path.join(output_dir, filename)

    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        topMargin=38*mm,
        bottomMargin=24*mm,
        leftMargin=15*mm,
        rightMargin=15*mm,
        title=f"Technical Data Sheet - {code}",
        author="Blau Batch | Coraplast",
    )

    story = []
    pw = A4[0] - 30*mm

    # Title
    story.append(Paragraph("TECHNICAL DATA SHEET", STYLES["TDS_Title"]))

    # Co-brand label
    story.append(Paragraph(
        "Distributed by Blau Batch  |  Manufactured by Coraplast Industries",
        STYLES["TDS_CoBrand"]
    ))
    story.append(Spacer(1, 4*mm))

    # Product Description
    story.append(Paragraph("Product Description", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
    story.append(Paragraph(product_data.get("description", ""), STYLES["TDS_Body"]))

    # Addition Level
    if product_data.get("addition_level"):
        story.append(Paragraph("Addition Level", STYLES["TDS_SectionHead"]))
        story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
        story.append(Paragraph(product_data["addition_level"], STYLES["TDS_Body"]))

    # Masterbatch Information
    story.append(Paragraph("Masterbatch Information", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

    info_rows = []
    info_rows.append(["Product Code", code])
    if product_data.get("colour"):
        info_rows.append(["Colour", product_data["colour"]])
    if product_data.get("carrier"):
        info_rows.append(["Carrier Polymer", product_data["carrier"]])
    if product_data.get("active_content"):
        info_rows.append(["Active Content", product_data["active_content"]])
    if product_data.get("appearance"):
        info_rows.append(["Appearance", product_data["appearance"]])

    if info_rows:
        info_table = build_properties_table(
            info_rows,
            ["Parameter", "Value"],
            [pw * 0.45, pw * 0.55]
        )
        story.append(info_table)

    # Physical Properties
    if product_data.get("properties"):
        story.append(Spacer(1, 3*mm))
        story.append(Paragraph("Physical Properties", STYLES["TDS_SectionHead"]))
        story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

        # Determine if 3-col or 4-col table
        has_4_cols = any(len(p) == 4 for p in product_data["properties"])

        if has_4_cols:
            # Normalize all rows to 4 cols
            rows = []
            for p in product_data["properties"]:
                if len(p) == 4:
                    rows.append(p)
                elif len(p) == 3:
                    rows.append([p[0], "--", p[1], p[2]])
                elif len(p) == 2:
                    rows.append([p[0], "--", "--", p[1]])
                else:
                    rows.append(p[:4] if len(p) >= 4 else p + ["--"] * (4 - len(p)))

            prop_table = build_properties_table(
                rows,
                ["Properties", "Unit", "Test Method", "Specification"],
                [pw * 0.38, pw * 0.13, pw * 0.22, pw * 0.27]
            )
        else:
            prop_table = build_properties_table(
                product_data["properties"],
                ["Properties", "Specification"],
                [pw * 0.55, pw * 0.45]
            )
        story.append(prop_table)

    # Regulatory
    if product_data.get("regulatory"):
        story.append(Spacer(1, 3*mm))
        story.append(Paragraph("Regulatory", STYLES["TDS_SectionHead"]))
        story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
        story.append(Paragraph(product_data["regulatory"], STYLES["TDS_Body"]))

    # Packaging & Storage
    if product_data.get("packaging"):
        story.append(Spacer(1, 3*mm))
        story.append(Paragraph("Packaging & Storage", STYLES["TDS_SectionHead"]))
        story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))
        story.append(Paragraph(product_data["packaging"], STYLES["TDS_Body"]))

    # Disclaimer
    story.append(Spacer(1, 5*mm))
    story.append(HRFlowable(width="100%", thickness=0.3, color=LIGHT_GREY, spaceAfter=2*mm))
    story.append(Paragraph(
        "<i>Note: Above report is made in identical condition. Values may be different when processed on different machines and/or different processing conditions, hence cannot be compared with any other same colour or product.</i>",
        STYLES["TDS_Small"]
    ))

    doc.build(story, onFirstPage=header_footer_cobranded, onLaterPages=header_footer_cobranded)
    print(f"  [OK] {filename}")
    return filepath


# ============================================================
# PRODUCT CATALOGUE GENERATOR
# ============================================================
def generate_catalogue(all_bb_products, all_cp_products, output_dir):
    """Generate a comprehensive product catalogue PDF."""
    filepath = os.path.join(output_dir, "BlauBatch_ProductCatalogue_2026.pdf")

    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        topMargin=38*mm,
        bottomMargin=24*mm,
        leftMargin=15*mm,
        rightMargin=15*mm,
        title="Blau Batch Product Catalogue 2026",
        author="Blau Batch",
    )

    story = []
    pw = A4[0] - 30*mm

    # ---- COVER CONTENT ----
    story.append(Spacer(1, 30*mm))
    story.append(Paragraph("PRODUCT CATALOGUE", ParagraphStyle(
        'CatTitle', parent=STYLES["TDS_Title"], fontSize=28, leading=34,
        textColor=DEEP_NAVY,
    )))
    story.append(Spacer(1, 5*mm))
    story.append(Paragraph("Full-Spectrum Masterbatch Solutions", ParagraphStyle(
        'CatSub', parent=STYLES["TDS_Subtitle"], fontSize=14, leading=18,
        textColor=STEEL_BLUE,
    )))
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph("2026 Edition", ParagraphStyle(
        'CatYear', parent=STYLES["TDS_Subtitle"], fontSize=12, textColor=SKY_BLUE,
    )))
    story.append(Spacer(1, 15*mm))

    # Company intro
    story.append(Paragraph(
        "Blau Batch is an Egyptian masterbatch company combining in-house manufacturing with strategic distribution through Coraplast Industries. We provide a single source of reliable supply for plastics manufacturers across packaging, pipe, agriculture, textiles, and construction.",
        STYLES["TDS_Body"]
    ))

    story.append(PageBreak())

    # ---- TABLE OF CONTENTS ----
    story.append(Paragraph("TABLE OF CONTENTS", STYLES["TDS_Title"]))
    story.append(Spacer(1, 5*mm))

    toc_items = [
        "1. Filler Masterbatch (Manufactured by Blau Batch)",
        "2. Black Masterbatch (Distributed \u2014 Coraplast)",
        "3. White Masterbatch (Distributed \u2014 Coraplast)",
        "4. UV Stabilizers (Distributed \u2014 Coraplast)",
        "5. Processing Aids (Distributed \u2014 Coraplast)",
        "6. Slip & Anti-blocking Agents (Distributed \u2014 Coraplast)",
        "7. Specialty Additives (Distributed \u2014 Coraplast)",
    ]
    for item in toc_items:
        story.append(Paragraph(item, STYLES["TDS_Body"]))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())

    # ---- SECTION 1: FILLER MASTERBATCH ----
    story.append(Paragraph("1. FILLER MASTERBATCH", STYLES["TDS_Title"]))

    # Manufactured badge
    badge_data = [["MANUFACTURED BY BLAU BATCH"]]
    badge = Table(badge_data, colWidths=[60*mm])
    badge.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), MFG_AMBER),
        ('TEXTCOLOR', (0, 0), (-1, -1), WHITE),
        ('FONTNAME', (0, 0), (-1, -1), BODY_FONT_BOLD),
        ('FONTSIZE', (0, 0), (-1, -1), 7),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    badge_wrapper = Table([[badge]], colWidths=[pw])
    badge_wrapper.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
    story.append(badge_wrapper)
    story.append(Spacer(1, 5*mm))

    story.append(Paragraph(
        "All filler masterbatch grades are produced at our 6th of October facility with full in-house quality control and traceability.",
        STYLES["TDS_Body"]
    ))
    story.append(Spacer(1, 3*mm))

    # PE Filler summary table
    story.append(Paragraph("PE Filler Masterbatch Series", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

    pe_rows = []
    for p in all_bb_products:
        if p["code"].startswith("FMPE"):
            caco3 = [v[1] for v in p["physical_props"] if "CaCO" in v[0]][0]
            carrier = [v[1] for v in p["physical_props"] if "Carrier" in v[0]][0]
            mfi = [v[1] for v in p["physical_props"] if "MFI" in v[0]][0]
            pe_rows.append([p["code"], carrier, caco3, mfi])

    pe_table = build_properties_table(
        pe_rows,
        ["Product Code", "Carrier", "CaCO\u2083 Loading", "MFI"],
        [pw * 0.25, pw * 0.20, pw * 0.30, pw * 0.25]
    )
    story.append(pe_table)
    story.append(Spacer(1, 5*mm))

    # PP Filler summary table
    story.append(Paragraph("PP Filler Masterbatch Series", STYLES["TDS_SectionHead"]))
    story.append(HRFlowable(width="100%", thickness=0.5, color=SKY_BLUE, spaceAfter=2*mm))

    pp_rows = []
    for p in all_bb_products:
        if p["code"].startswith("FMPP"):
            caco3 = [v[1] for v in p["physical_props"] if "CaCO" in v[0]][0]
            carrier = [v[1] for v in p["physical_props"] if "Carrier" in v[0]][0]
            mfi = [v[1] for v in p["physical_props"] if "MFI" in v[0]][0]
            pp_rows.append([p["code"], carrier, caco3, mfi])

    pp_table = build_properties_table(
        pp_rows,
        ["Product Code", "Carrier", "CaCO\u2083 Loading", "MFI"],
        [pw * 0.25, pw * 0.20, pw * 0.30, pw * 0.25]
    )
    story.append(pp_table)

    story.append(PageBreak())

    # ---- CORAPLAST DISTRIBUTED PRODUCTS ----
    # Group by category
    categories = {}
    for cp in all_cp_products:
        code = cp.get("code", "")
        if code.upper().startswith("BLACK"):
            cat = "Black Masterbatch"
        elif code.upper().startswith("WHITE"):
            cat = "White Masterbatch"
        elif code.upper().startswith("UVS"):
            cat = "UV Stabilizers"
        elif code.upper().startswith("PROCESSING"):
            cat = "Processing Aids"
        elif code.upper().startswith("SLIP"):
            cat = "Slip Agents"
        elif code.upper().startswith("SAB"):
            cat = "Anti-blocking Agents"
        elif code.upper().startswith("DESICCANT"):
            cat = "Desiccant Masterbatch"
        elif code.upper().startswith("BRIGHTNER") or code.upper().startswith("BRIGHTENER"):
            cat = "Optical Brightener"
        elif code.upper().startswith("PPA"):
            cat = "Polymer Processing Aids"
        elif code.upper().startswith("AB "):
            cat = "Anti-blocking Agents"
        elif code.upper().startswith("AFG"):
            cat = "Anti-fog Agents"
        elif code.upper().startswith("AST"):
            cat = "Anti-static Agents"
        else:
            cat = "Specialty Additives"

        if cat not in categories:
            categories[cat] = []
        categories[cat].append(cp)

    section_num = 2
    cat_order = [
        "Black Masterbatch", "White Masterbatch", "UV Stabilizers",
        "Processing Aids", "Polymer Processing Aids", "Slip Agents",
        "Anti-blocking Agents", "Anti-fog Agents", "Anti-static Agents",
        "Desiccant Masterbatch", "Optical Brightener", "Specialty Additives"
    ]

    for cat_name in cat_order:
        if cat_name not in categories:
            continue
        products = sorted(categories[cat_name], key=lambda x: x.get("code", ""))

        story.append(Paragraph(f"{section_num}. {cat_name.upper()}", STYLES["TDS_Title"]))

        # Distributed badge
        dist_badge = Table([["DISTRIBUTED \u2014 Coraplast Industries"]], colWidths=[65*mm])
        dist_badge.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), STEEL_BLUE),
            ('TEXTCOLOR', (0, 0), (-1, -1), WHITE),
            ('FONTNAME', (0, 0), (-1, -1), BODY_FONT_BOLD),
            ('FONTSIZE', (0, 0), (-1, -1), 7),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ]))
        badge_w = Table([[dist_badge]], colWidths=[pw])
        badge_w.setStyle(TableStyle([('ALIGN', (0, 0), (-1, -1), 'CENTER')]))
        story.append(badge_w)
        story.append(Spacer(1, 4*mm))

        # Summary table for this category
        cat_rows = []
        for cp in products:
            carrier = cp.get("carrier", "--")
            colour = cp.get("colour", "--")
            cat_rows.append([cp.get("code", ""), colour, carrier])

        if cat_rows:
            cat_table = build_properties_table(
                cat_rows,
                ["Product Code", "Colour", "Carrier"],
                [pw * 0.40, pw * 0.30, pw * 0.30]
            )
            story.append(cat_table)

        story.append(Spacer(1, 3*mm))
        story.append(Paragraph(
            f"Full Technical Data Sheets for all {cat_name} grades are available as separate documents.",
            STYLES["TDS_Small"]
        ))

        story.append(PageBreak())
        section_num += 1

    # ---- CONTACT PAGE ----
    story.append(Spacer(1, 20*mm))
    story.append(Paragraph("CONTACT US", STYLES["TDS_Title"]))
    story.append(Spacer(1, 10*mm))

    contact_data = [
        ["Office", "Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt"],
        ["Factory", "79, 6th Industrial Zone, 6th of October City, Giza, Egypt"],
        ["Phone", "+2 0102 222 7723"],
        ["Email", "info@blaubatch.com"],
        ["Website", "www.blaubatch.com"],
        ["Hours", "Saturday\u2013Thursday, 9:00 AM\u20135:00 PM (Cairo, EET)"],
    ]

    contact_table = build_properties_table(
        contact_data,
        ["", ""],
        [pw * 0.25, pw * 0.75]
    )
    story.append(contact_table)

    doc.build(story, onFirstPage=header_footer_bb, onLaterPages=header_footer_bb)
    print(f"\n  [OK] Product Catalogue: {filepath}")
    return filepath


# ============================================================
# MAIN
# ============================================================
def main():
    print("=" * 60)
    print("BLAU BATCH TDS & CATALOGUE PDF GENERATOR")
    print("Brand Guidelines v4 Compliant")
    print("=" * 60)

    # ---- 1. Generate Blau Batch Manufactured TDS ----
    print(f"\n--- Blau Batch Manufactured Products ({len(BLAU_BATCH_PRODUCTS)} TDS) ---")
    for product in BLAU_BATCH_PRODUCTS:
        generate_blaubatch_tds(product, OUT_BB)

    # ---- 2. Extract & Generate Coraplast Co-branded TDS ----
    print(f"\n--- Coraplast Distributed Products ---")
    print(f"  Scanning: {CORAPLAST_DIR}")

    coraplast_products = []
    pdf_files = sorted([f for f in os.listdir(CORAPLAST_DIR)
                       if f.endswith(".pdf") and "Price" not in f])

    print(f"  Found {len(pdf_files)} Coraplast TDS PDFs")

    for pdf_file in pdf_files:
        pdf_path = os.path.join(CORAPLAST_DIR, pdf_file)
        data = extract_coraplast_data(pdf_path)
        if data:
            coraplast_products.append(data)
            generate_coraplast_tds(data, OUT_CP)
        else:
            print(f"  [SKIP] Could not parse: {pdf_file}")

    # ---- 3. Generate Product Catalogue ----
    print(f"\n--- Product Catalogue ---")
    catalogue_dir = os.path.join(BRAND_DIR, "Generated TDS")
    generate_catalogue(BLAU_BATCH_PRODUCTS, coraplast_products, catalogue_dir)

    # ---- Summary ----
    bb_count = len(BLAU_BATCH_PRODUCTS)
    cp_count = len(coraplast_products)
    print("\n" + "=" * 60)
    print("GENERATION COMPLETE")
    print(f"  Blau Batch branded TDS:      {bb_count} PDFs")
    print(f"  Coraplast co-branded TDS:    {cp_count} PDFs")
    print(f"  Product Catalogue:           1 PDF")
    print(f"  Total:                       {bb_count + cp_count + 1} PDFs")
    print(f"\nOutput locations:")
    print(f"  Manufactured:  {OUT_BB}")
    print(f"  Distributed:   {OUT_CP}")
    print(f"  Catalogue:     {catalogue_dir}")
    print("=" * 60)


if __name__ == "__main__":
    main()
