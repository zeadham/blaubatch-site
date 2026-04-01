"""
Blau Batch — "One Source. Full Spectrum." Campaign
14-Day Posting Calendar PDF Generator
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable,
)
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

# ── Brand Colours ──
NAVY    = HexColor('#141B3E')
STEEL   = HexColor('#23447A')
SKY     = HexColor('#2B8DD0')
AMBER   = HexColor('#D4840A')
GREEN   = HexColor('#22C55E')
WHITE   = HexColor('#FFFFFF')
LIGHT   = HexColor('#E8EDF4')
GREY    = HexColor('#64748B')
DARKGREY = HexColor('#334155')

# ── Output path ──
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(OUTPUT_DIR, 'Blau Batch - Campaign Posting Calendar.pdf')

# ── Styles ──
def make_styles():
    s = {}
    s['cover_title'] = ParagraphStyle('CoverTitle', fontName='Helvetica-Bold', fontSize=32, leading=38, textColor=WHITE, alignment=TA_LEFT)
    s['cover_sub'] = ParagraphStyle('CoverSub', fontName='Helvetica', fontSize=14, leading=20, textColor=HexColor('#8899BB'), alignment=TA_LEFT)
    s['cover_detail'] = ParagraphStyle('CoverDetail', fontName='Helvetica', fontSize=10, leading=16, textColor=HexColor('#6677AA'), alignment=TA_LEFT)

    s['week_title'] = ParagraphStyle('WeekTitle', fontName='Helvetica-Bold', fontSize=20, leading=26, textColor=NAVY, spaceAfter=4)
    s['week_sub'] = ParagraphStyle('WeekSub', fontName='Helvetica', fontSize=10, leading=14, textColor=GREY, spaceAfter=16)

    s['day_title'] = ParagraphStyle('DayTitle', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=NAVY, spaceBefore=6, spaceAfter=2)
    s['day_meta'] = ParagraphStyle('DayMeta', fontName='Helvetica', fontSize=9, leading=13, textColor=GREY, spaceAfter=8)

    s['section'] = ParagraphStyle('Section', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=SKY, spaceBefore=10, spaceAfter=4, leftIndent=0)

    s['body'] = ParagraphStyle('Body', fontName='Helvetica', fontSize=9.5, leading=14.5, textColor=DARKGREY, spaceAfter=6)
    s['body_indent'] = ParagraphStyle('BodyIndent', fontName='Helvetica', fontSize=9.5, leading=14.5, textColor=DARKGREY, spaceAfter=4, leftIndent=12)
    s['caption'] = ParagraphStyle('Caption', fontName='Helvetica', fontSize=9, leading=14, textColor=DARKGREY, spaceAfter=6, leftIndent=12, borderColor=LIGHT, borderWidth=0, borderPadding=0, backColor=HexColor('#F1F5F9'))
    s['prompt'] = ParagraphStyle('Prompt', fontName='Helvetica', fontSize=8.5, leading=13, textColor=HexColor('#475569'), spaceAfter=4, leftIndent=12)

    s['heading2'] = ParagraphStyle('H2', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=NAVY, spaceBefore=14, spaceAfter=6)
    s['heading3'] = ParagraphStyle('H3', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=STEEL, spaceBefore=10, spaceAfter=4)

    s['bullet'] = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=9.5, leading=14, textColor=DARKGREY, spaceAfter=3, leftIndent=20, bulletIndent=10)

    s['table_head'] = ParagraphStyle('TH', fontName='Helvetica-Bold', fontSize=8, leading=11, textColor=WHITE, alignment=TA_CENTER)
    s['table_cell'] = ParagraphStyle('TC', fontName='Helvetica', fontSize=8, leading=11, textColor=DARKGREY, alignment=TA_CENTER)
    s['table_cell_left'] = ParagraphStyle('TCL', fontName='Helvetica', fontSize=8, leading=11, textColor=DARKGREY, alignment=TA_LEFT)

    return s

S = make_styles()

# ── Page template ──
def page_bg(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColor(HexColor('#FAFBFD'))
    canvas_obj.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    # Top accent line
    canvas_obj.setFillColor(SKY)
    canvas_obj.rect(0, A4[1] - 3, A4[0], 3, fill=1, stroke=0)
    # Footer
    canvas_obj.setFont('Helvetica', 7)
    canvas_obj.setFillColor(GREY)
    canvas_obj.drawString(20*mm, 10*mm, 'Blau Batch  |  "One Source. Full Spectrum." Campaign  |  Confidential')
    canvas_obj.drawRightString(A4[0] - 20*mm, 10*mm, f'Page {doc.page}')
    canvas_obj.restoreState()

def cover_page(canvas_obj, doc):
    w, h = A4
    # Full navy background
    canvas_obj.setFillColor(NAVY)
    canvas_obj.rect(0, 0, w, h, fill=1, stroke=0)
    # Sky blue accent bar at top
    canvas_obj.setFillColor(SKY)
    canvas_obj.rect(0, h - 6, w, 6, fill=1, stroke=0)
    # Amber accent stripe
    canvas_obj.setFillColor(AMBER)
    canvas_obj.rect(20*mm, h - 120*mm, 4, 50*mm, fill=1, stroke=0)
    # Decorative circle
    canvas_obj.setStrokeColor(HexColor('#23447A'))
    canvas_obj.setLineWidth(1)
    canvas_obj.circle(w - 40*mm, 60*mm, 30*mm, fill=0, stroke=1)
    canvas_obj.circle(w - 40*mm, 60*mm, 20*mm, fill=0, stroke=1)

# ── Helpers ──
def hr():
    return HRFlowable(width='100%', thickness=0.5, color=LIGHT, spaceBefore=8, spaceAfter=8)

def amber_hr():
    return HRFlowable(width='30%', thickness=2, color=AMBER, spaceBefore=4, spaceAfter=8, hAlign='LEFT')

def tag(text, color=SKY):
    return Paragraph(f'<font color="{color.hexval()}" size="8"><b>{text.upper()}</b></font>', S['body'])

def bullet_list(items):
    result = []
    for item in items:
        result.append(Paragraph(f'<bullet>&bull;</bullet>{esc(item)}', S['bullet']))
    return result

def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def caption_block(title, text):
    """A labelled caption block with background"""
    elements = []
    elements.append(Paragraph(f'<b><font color="{SKY.hexval()}">{esc(title)}</font></b>', S['section']))
    for line in text.strip().split('\n'):
        line = line.strip()
        if line:
            elements.append(Paragraph(esc(line), S['caption']))
    return elements

def prompt_block(title, lines):
    elements = []
    elements.append(Paragraph(f'<b><font color="{AMBER.hexval()}">{esc(title)}</font></b>', S['section']))
    for line in lines:
        elements.append(Paragraph(esc(line), S['prompt']))
    return elements

# ══════════════════════════════════════════
# BUILD THE PDF
# ══════════════════════════════════════════
def build():
    doc = SimpleDocTemplate(
        OUTPUT_PATH, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=18*mm, bottomMargin=18*mm,
    )

    story = []

    # ── COVER PAGE ──
    story.append(Spacer(1, 60*mm))
    story.append(Paragraph('BLAU BATCH', ParagraphStyle('Logo', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=SKY, letterSpacing=4)))
    story.append(Spacer(1, 8*mm))
    story.append(Paragraph('One Source.<br/>Full Spectrum.', S['cover_title']))
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph('14-Day Campaign Posting Calendar', S['cover_sub']))
    story.append(Spacer(1, 4*mm))
    story.append(amber_hr())
    story.append(Spacer(1, 6*mm))
    story.append(Paragraph('Campaign Period: March 30 - April 12, 2026', S['cover_detail']))
    story.append(Paragraph('Goal: Lead Generation + Brand Awareness', S['cover_detail']))
    story.append(Paragraph('Target: Plastics Manufacturers | MENA &amp; Europe', S['cover_detail']))
    story.append(Paragraph('Landing Page: blaubatch.com/campaign', S['cover_detail']))
    story.append(PageBreak())

    # ── CAMPAIGN OVERVIEW PAGE ──
    story.append(Paragraph('Campaign Overview', S['week_title']))
    story.append(amber_hr())
    story.append(Spacer(1, 4*mm))

    overview_data = [
        [Paragraph('<b>Element</b>', S['table_head']), Paragraph('<b>Details</b>', S['table_head'])],
        [Paragraph('Campaign Name', S['table_cell_left']), Paragraph('"One Source. Full Spectrum."', S['table_cell_left'])],
        [Paragraph('Duration', S['table_cell_left']), Paragraph('14 days (March 30 - April 12, 2026)', S['table_cell_left'])],
        [Paragraph('Primary Goal', S['table_cell_left']), Paragraph('Lead generation (quote requests)', S['table_cell_left'])],
        [Paragraph('Secondary Goal', S['table_cell_left']), Paragraph('Brand awareness among plastics manufacturers', S['table_cell_left'])],
        [Paragraph('Target Audience', S['table_cell_left']), Paragraph('Procurement managers, plant managers, technical directors at plastics manufacturers in MENA &amp; Europe', S['table_cell_left'])],
        [Paragraph('Key Message', S['table_cell_left']), Paragraph('Consolidate your masterbatch supply chain to one supplier', S['table_cell_left'])],
        [Paragraph('Landing Page', S['table_cell_left']), Paragraph('blaubatch.com/campaign', S['table_cell_left'])],
    ]

    overview_table = Table(overview_data, colWidths=[40*mm, 120*mm])
    overview_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), STEEL),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('BACKGROUND', (0, 1), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F8FAFC')]),
    ]))
    story.append(overview_table)
    story.append(Spacer(1, 8*mm))

    # Channel overview table
    story.append(Paragraph('Channel Overview', S['heading2']))
    channel_data = [
        [Paragraph('<b>Channel</b>', S['table_head']), Paragraph('<b>Posts</b>', S['table_head']), Paragraph('<b>Type</b>', S['table_head']), Paragraph('<b>Days</b>', S['table_head'])],
        [Paragraph('LinkedIn Organic', S['table_cell_left']), Paragraph('7', S['table_cell']), Paragraph('Carousel, image, text', S['table_cell']), Paragraph('1, 4, 5, 6, 10, 12, 14', S['table_cell'])],
        [Paragraph('LinkedIn Paid', S['table_cell_left']), Paragraph('3', S['table_cell']), Paragraph('Lead gen ads', S['table_cell']), Paragraph('2, 8, 13', S['table_cell'])],
        [Paragraph('Email Outreach', S['table_cell_left']), Paragraph('2 batches', S['table_cell']), Paragraph('Cold email sequences', S['table_cell']), Paragraph('3, 9', S['table_cell'])],
        [Paragraph('WhatsApp', S['table_cell_left']), Paragraph('1', S['table_cell']), Paragraph('Catalogue push', S['table_cell']), Paragraph('5', S['table_cell'])],
        [Paragraph('Google Display', S['table_cell_left']), Paragraph('3 banners', S['table_cell']), Paragraph('Retargeting', S['table_cell']), Paragraph('11', S['table_cell'])],
        [Paragraph('Google Search', S['table_cell_left']), Paragraph('3 ad groups', S['table_cell']), Paragraph('Search ads (ongoing)', S['table_cell']), Paragraph('All', S['table_cell'])],
    ]
    channel_table = Table(channel_data, colWidths=[38*mm, 22*mm, 48*mm, 52*mm])
    channel_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), STEEL),
        ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
        ('BACKGROUND', (0, 1), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F8FAFC')]),
    ]))
    story.append(channel_table)

    story.append(PageBreak())

    # ══════════════════════════════════════
    # WEEK 1
    # ══════════════════════════════════════
    story.append(Paragraph('Week 1 — Launch &amp; Awareness', S['week_title']))
    story.append(Paragraph('March 30 - April 5, 2026', S['week_sub']))
    story.append(amber_hr())

    # ── DAY 1 ──
    story.append(Paragraph('Day 1 — Monday, March 30', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Carousel (5 slides)  |  Post at 9:00 AM Cairo', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption (copy &amp; paste into LinkedIn)', """
Still managing 3-5 masterbatch suppliers?

There's a simpler way.

Blau Batch is the single source for every masterbatch grade your production line needs:

-> Filler Masterbatch (PE & PP) - Manufactured in-house
-> White, Black, Colour, Additive - Distributed via Coraplast partnership
-> Custom formulations - Engineered to your specification

One supplier. One invoice. One technical contact.

See what full-spectrum supply looks like:
[LINK to blaubatch.com/campaign]

#Masterbatch #PlasticsManufacturing #SupplyChain #MENA #BlauBatch #FillerMasterbatch
"""))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph('<b><font color="#D4840A">SLIDE-BY-SLIDE DESIGN PROMPTS</font></b>', S['section']))
    story.append(Spacer(1, 2*mm))

    slides = [
        ('Slide 1 — Hook', [
            'Background: Deep Navy (#141B3E) full bleed',
            'Top-left: Blau Batch logo (white version), small',
            'Centre: Large bold text - "One Source." line 1, "Full Spectrum." line 2',
            'Font: Montserrat Black (900), white, ~48pt',
            'Below text: Thin Sky Blue (#2B8DD0) horizontal rule, 60% width',
            'Bottom-right: Small amber badge - "SWIPE" in Montserrat ExtraBold (#D4840A)',
            'Subtle: Dot grid pattern overlay at 5% opacity',
        ]),
        ('Slide 2 — Problem', [
            'Background: Deep Navy (#141B3E)',
            'Top: Badge - "THE PROBLEM" in Sky Blue (#2B8DD0), pill border',
            'Centre: "3-5 Suppliers" in Montserrat Black, white, ~40pt',
            'Below: Three bullet points in Open Sans, white 60%:',
            '  - Multiple quality standards',
            '  - Multiple lead times',
            '  - Multiple accounts to manage',
            'Left border: 3px amber (#D4840A) accent stripe, full height',
        ]),
        ('Slide 3 — Solution', [
            'Background: Deep Navy (#141B3E)',
            'Top: Badge - "THE SOLUTION" in amber (#D4840A)',
            'Centre: "Blau Batch" in Montserrat Black, white, ~36pt',
            '"Full-Spectrum Masterbatch" in Montserrat Bold, Sky Blue, ~24pt',
            'Two columns: MANUFACTURE (amber) + DISTRIBUTE (blue)',
            'Bottom: Green dot + "Authorised Coraplast Distributor"',
        ]),
        ('Slide 4 — Product Range', [
            'Background: Deep Navy (#141B3E)',
            'Top: "OUR RANGE" badge in Sky Blue',
            '2x3 grid of product cards (Steel Blue #23447A background):',
            '  FMPE, FMPP, WHITE, BLACK, ADDITIVE, COLOUR',
            'Each card: code + name + badge (MANUFACTURED/DISTRIBUTED)',
            'Bottom: "50+ grades available" small text',
            'IMAGE AREA: Optional pellet thumbnails in each card',
        ]),
        ('Slide 5 — CTA', [
            'Background: Deep Navy (#141B3E) with radial blue glow',
            'Centre: "Ready to Simplify Your Supply Chain?" Montserrat Black, white',
            'Sky Blue button - "GET A QUOTE" in white Montserrat ExtraBold',
            'Three contact methods: Email, Phone, WhatsApp',
            'Bottom: "blaubatch.com/campaign" in Sky Blue',
            'IMAGE AREA: Blau Batch logo centred above headline',
        ]),
    ]

    for slide_title, lines in slides:
        story.append(Paragraph(f'<b>{esc(slide_title)}</b>', S['heading3']))
        for line in lines:
            story.append(Paragraph(esc(line), S['prompt']))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())

    # ── DAY 2 ──
    story.append(Paragraph('Day 2 — Tuesday, March 31', S['day_title']))
    story.append(Paragraph('LinkedIn Paid  |  Lead Gen Ad #1  |  Single Image 1200x628', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('<b>Ad Copy</b>', S['heading3']))
    story.extend(bullet_list([
        'Headline: One Supplier for Every Masterbatch Grade',
        'Description: Filler, colour, white, black & additive masterbatch - manufactured & distributed. Request a quote today.',
        'CTA Button: Get Quote',
    ]))

    story.append(Paragraph('<b>Targeting</b>', S['heading3']))
    story.extend(bullet_list([
        'Roles: Procurement managers, plant managers, technical directors',
        'Industries: Plastics manufacturing',
        'Regions: Egypt, Saudi Arabia, UAE, Turkey, Jordan, Libya, Morocco, Germany, Italy',
        'Budget: 40% of LinkedIn ad spend for Week 1',
    ]))

    story.append(Paragraph('<b>Lead Gen Form Fields</b>', S['heading3']))
    story.extend(bullet_list([
        'Full Name (pre-filled from LinkedIn)',
        'Email (pre-filled)',
        'Company Name (pre-filled)',
        'Job Title (pre-filled)',
        '"Which products interest you?" (dropdown: Filler PE, Filler PP, White, Black, Additive, Colour, Multiple, Not Sure)',
        '"Estimated monthly volume?" (dropdown: <1 MT, 1-10 MT, 10-50 MT, 50+ MT, Just exploring)',
    ]))

    story.extend(prompt_block('Ad Creative Design Prompt', [
        'Size: 1200 x 628 px',
        'Background: Split - Left 60% Deep Navy (#141B3E), Right 40% Steel Blue (#23447A)',
        'Left: Logo + "How Many Masterbatch Suppliers Are You Managing?" Montserrat Black, white',
        'Below: "One is enough." in Montserrat Bold, Sky Blue (#2B8DD0)',
        'Right: 3 icon+text pairs (Factory/Globe/Shield) + amber CTA button "GET QUOTE"',
        'IMAGE AREA: Optional factory photo as right background (70% navy overlay)',
    ]))

    story.append(PageBreak())

    # ── DAY 3 ──
    story.append(Paragraph('Day 3 — Wednesday, April 1', S['day_title']))
    story.append(Paragraph('Email Outreach  |  Batch 1: Packaging &amp; Pipe Industries  |  2-email sequence', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('<b>Email 1 — Introduction</b>', S['heading3']))
    story.append(Paragraph('Subject Line A: "Your entire masterbatch requirement - one supplier"', S['body']))
    story.append(Paragraph('Subject Line B: "[Company Name] - simplify your masterbatch supply chain"', S['body']))
    story.append(Spacer(1, 2*mm))

    story.extend(caption_block('Email Body', """
Hi [First Name],

I'm reaching out from Blau Batch - we're an Egyptian masterbatch manufacturer and authorised Coraplast distributor serving plastics producers across MENA and Europe.

We noticed [Company Name] works in [packaging/pipe extrusion], and wanted to introduce our full-spectrum masterbatch range:

- Filler Masterbatch (PE & PP) - manufactured in-house at our 6th of October facility
- White, Black, Colour & Additive Masterbatch - distributed via our Coraplast partnership
- Custom formulations - engineered to your polymer type and processing conditions

Many of our customers have consolidated from 3-5 masterbatch vendors down to one - reducing procurement complexity, improving batch consistency, and shortening lead times.

Would it be worth a 10-minute call to discuss your current masterbatch requirements?

Best regards,
[Sender Name] | Blau Batch
info@blaubatch.com | +2 0102 222 7723
"""))

    story.append(Paragraph('<b>Email 2 — Follow-up (send April 4, 3 days later)</b>', S['heading3']))
    story.append(Paragraph('Subject: "Quick follow-up - Blau Batch masterbatch range"', S['body']))
    story.extend(caption_block('Email Body', """
Hi [First Name],

Just following up on my note from earlier this week about Blau Batch's masterbatch range.

Our filler masterbatch is produced in-house - meaning faster lead times, batch-level QC with full traceability, and competitive pricing without import delays. For specialty grades, our Coraplast distribution partnership gives you access to 50+ international-grade formulations through the same account.

If you'd like, I can send:
-> Technical data sheets for our FMPE or FMPP filler series
-> A competitive quote based on your volume
-> Trial quantity for evaluation

Just reply or reach us on WhatsApp: wa.me/201022227723

Best, [Sender Name]
"""))

    story.append(PageBreak())

    # ── DAY 4 ──
    story.append(Paragraph('Day 4 — Thursday, April 2', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Single Image 1200x1200  |  Post at 10:00 AM Cairo', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption — FMPE vs FMPP Comparison', """
Filler Masterbatch: PE Carrier vs PP Carrier - which one fits your process?

One of the most common questions we get from plastics manufacturers is whether to use a PE-based or PP-based filler masterbatch. The answer depends on your application.

FMPE Series (PE Carrier):
-> Best for blown film, bags, and flexible packaging
-> Lower melt temperature compatibility
-> CaCO3 loadings from 70% to 80%
-> Excellent dispersion in LDPE and HDPE matrices

FMPP Series (PP Carrier):
-> Best for injection moulding, raffia, and rigid packaging
-> Higher heat stability for PP processing temperatures
-> CaCO3 loadings from 70% to 80%
-> Maintains mechanical properties in PP compounds

Both series manufactured in-house with batch-level QC, full traceability, and TDS per shipment.

-> Get a recommendation: blaubatch.com/campaign

#FillerMasterbatch #PlasticsProcessing #CaCO3 #BlownFilm #InjectionMoulding #BlauBatch
"""))

    story.extend(prompt_block('Image Design Prompt (1200x1200)', [
        'Two-column comparison layout on Deep Navy (#141B3E)',
        'Top: "FILLER MASTERBATCH" badge + "FMPE vs FMPP" headline',
        'Left column: FMPE Series in Amber (#D4840A) - PE Carrier - Film, bags, flexible',
        'Right column: FMPP Series in Sky Blue (#2B8DD0) - PP Carrier - Moulding, raffia, rigid',
        'Columns on Steel Blue (#23447A) card backgrounds, separated by vertical line',
        'IMAGE AREA: Optional pellet thumbnail in each column',
        'Bottom: Blau Batch logo + blaubatch.com/campaign',
    ]))

    story.append(PageBreak())

    # ── DAY 5 ──
    story.append(Paragraph('Day 5 — Friday, April 3', S['day_title']))
    story.append(Paragraph('WhatsApp + LinkedIn Organic  |  Catalogue Push + Factory Story  |  11:00 AM Cairo', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('<b>WhatsApp Business Message</b>', S['heading3']))
    story.extend(caption_block('WhatsApp Message (send to contact list)', """
Assalamu Alaikum [Name],

This is [Sender] from Blau Batch.

We've just launched our full product catalogue covering our complete masterbatch range:

- Filler Masterbatch (PE & PP) - Manufactured in Egypt
- White, Black, Colour & Additive - via Coraplast partnership
- 50+ grades available
- Custom formulations

Download our catalogue: [LINK]
Request a quote: blaubatch.com/campaign

Would you like technical data sheets for any specific grades?
"""))
    story.append(Paragraph('<i>Attach: 1-page product overview PDF</i>', S['body_indent']))

    story.append(Spacer(1, 4*mm))
    story.append(Paragraph('<b>LinkedIn Organic Post — Factory Story</b>', S['heading3']))
    story.extend(caption_block('LinkedIn Caption', """
Friday factory check.

Our 6th of October production facility running another batch of FMPE filler masterbatch this morning.

Every batch = full QC, TDS, and Certificate of Analysis before dispatch.

That's what in-house manufacturing gives you - control, consistency, and confidence in every shipment.

Have a great weekend.

#Manufacturing #MadeInEgypt #Masterbatch #QualityControl #BlauBatch
"""))

    story.extend(prompt_block('Image Design Prompt (1080x1080)', [
        'IMAGE AREA (PRIMARY): Best with real factory/production photo',
        'If no photo: Dark gradient Navy to Steel Blue background',
        'Centre: Large "QC" text, Montserrat Black, white',
        '"Every Batch. Every Time." in Amber (#D4840A)',
        'Factory icon + "6th of October, Egypt" bottom-left',
        'Blau Batch logo bottom-right',
    ]))

    story.append(PageBreak())

    # ── DAY 6 ──
    story.append(Paragraph('Day 6 — Saturday, April 4', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Single Image 1200x628  |  Post at 10:00 AM Cairo', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption — Packaging Industry Focus', """
If you manufacture plastic packaging - film, bags, containers, or closures - here's how the right masterbatch supplier impacts your bottom line:

1. Filler masterbatch at the right CaCO3 loading reduces raw material cost without compromising film properties

2. Consistent batch quality means fewer production stoppages and less scrap

3. Access to colour, additive, and UV grades from one supplier simplifies procurement

4. Technical support helps you optimise let-down ratios for your specific line setup

We work with packaging producers across Egypt, Saudi Arabia, UAE, and Europe.

What does your current masterbatch supply chain look like? Drop a comment or DM us.

-> Full product range: blaubatch.com/campaign

#PackagingIndustry #PlasticPackaging #BlownFilm #Masterbatch #CostReduction #BlauBatch
"""))

    story.extend(prompt_block('Image Design Prompt (1200x628)', [
        'Left 55%: "PACKAGING" badge + headline + 4 benefit icons',
        'Right 45%: IMAGE AREA for packaging industry photo',
        'If no photo: Abstract packaging icon on Steel Blue card',
        'Bottom strip: Blau Batch logo + blaubatch.com',
    ]))

    story.append(Spacer(1, 6*mm))
    story.append(Paragraph('Day 7 — Sunday, April 5', S['day_title']))
    story.append(Paragraph('REST DAY  |  Review Week 1 metrics  |  Adjust ad targeting/budget  |  Prepare Week 2 creatives', S['day_meta']))

    story.append(PageBreak())

    # ══════════════════════════════════════
    # WEEK 2
    # ══════════════════════════════════════
    story.append(Paragraph('Week 2 — Conversion &amp; Retargeting', S['week_title']))
    story.append(Paragraph('April 6 - April 12, 2026', S['week_sub']))
    story.append(amber_hr())

    # ── DAY 8 ──
    story.append(Paragraph('Day 8 — Monday, April 6', S['day_title']))
    story.append(Paragraph('LinkedIn Paid  |  Lead Gen Ad #2 — Specialty Angle  |  1200x628', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('<b>Ad Copy</b>', S['heading3']))
    story.extend(bullet_list([
        'Headline: Full-Spectrum Masterbatch - Manufactured & Distributed',
        'Description: Filler, colour, white, black, additive & specialty grades. One supplier, one account, one technical team.',
        'CTA: Learn More',
        'Budget: 35% of LinkedIn ad spend for Week 2',
        'Audience: Same as Ad #1 + retarget website visitors & Ad #1 engagers',
    ]))

    story.extend(prompt_block('Ad Creative Design Prompt', [
        'Centred layout on Deep Navy with blue radial glow',
        'Logo top centre, "From Filler to UV Stabilisers" headline',
        '"One Call. One Supplier." sub-headline in Sky Blue',
        'Horizontal product strip: 6 rounded cards (FILLER, WHITE, BLACK, COLOUR, ADDITIVE, SPECIALTY)',
        'CTA bar: "Request Your Quote" in Sky Blue button',
    ]))

    story.append(Spacer(1, 4*mm))

    # ── DAY 9 ──
    story.append(Paragraph('Day 9 — Tuesday, April 7', S['day_title']))
    story.append(Paragraph('Email Outreach  |  Batch 2: Agriculture &amp; Construction  |  Cold email sequence', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('Subject A: "Masterbatch for [agriculture/construction] - manufactured in Egypt"', S['body']))
    story.append(Paragraph('Subject B: "Reduce masterbatch procurement complexity for [Company Name]"', S['body']))
    story.extend(caption_block('Email Body — Key Points', """
Hi [First Name],

For [agriculture film / construction profile] manufacturers, we supply:

- FMPE/FMPP Filler Masterbatch - CaCO3 loadings 70-80%, reducing material cost
- UV Stabiliser & Additive Masterbatch - critical for outdoor-exposure applications
- Black & White Masterbatch - consistent colour across production runs
- Custom formulations - tailored to your polymer system

Everything from one supplier, with technical support included.
Full QC on every batch - MFI testing, ash content, TDS/CoA per shipment.

Request a quote: blaubatch.com/campaign

Best regards, [Sender Name] | Blau Batch
"""))

    story.append(PageBreak())

    # ── DAY 10 ──
    story.append(Paragraph('Day 10 — Wednesday, April 8', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Text Post (no image)  |  Post at 9:30 AM Cairo', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption — Thought Leadership: Supplier Consolidation', """
A trend we're seeing across MENA plastics manufacturing:

Supplier consolidation.

Companies that used to manage separate vendors for filler, colour, black, white, and additive masterbatch are moving toward single-source suppliers.

Here's why:

-> Procurement teams spend 15-20% of their time on vendor management. Fewer vendors = more time on value-adding work.

-> When one supplier owns the full technical picture, the grade recommendations are better. No more mismatched advice from five different sources.

-> Logistics get simpler. One supplier, one shipping schedule, one invoice.

-> Quality becomes consistent. One QC standard across your entire masterbatch supply.

This is exactly the model we built Blau Batch around.

The question isn't whether to consolidate. It's when.

What's your experience - are you seeing this trend in your market too?

#PlasticsIndustry #SupplyChain #Procurement #Manufacturing #MENA #BlauBatch
"""))

    story.append(PageBreak())

    # ── DAY 11 ──
    story.append(Paragraph('Day 11 — Thursday, April 9', S['day_title']))
    story.append(Paragraph('Google Display Retargeting + LinkedIn Organic  |  Banners + Black MB Post', S['day_meta']))
    story.append(hr())

    story.append(Paragraph('<b>Google Retargeting Banners</b>', S['heading3']))
    story.append(Paragraph('Audience: Visitors to blaubatch.com/campaign who did NOT submit the form', S['body']))

    banner_data = [
        [Paragraph('<b>Size</b>', S['table_head']), Paragraph('<b>Layout</b>', S['table_head'])],
        [Paragraph('728 x 90', S['table_cell_left']), Paragraph('Logo left | "Get your personalised quote in 24h" centre | Sky Blue CTA right', S['table_cell_left'])],
        [Paragraph('300 x 250', S['table_cell_left']), Paragraph('Logo top | "Full-Spectrum Masterbatch / One Supplier" centre | CTA bottom', S['table_cell_left'])],
        [Paragraph('160 x 600', S['table_cell_left']), Paragraph('Logo top | Vertical product badges | "One Source" | CTA | URL bottom', S['table_cell_left'])],
    ]
    banner_table = Table(banner_data, colWidths=[30*mm, 130*mm])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), STEEL),
        ('BACKGROUND', (0, 1), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph('<b>LinkedIn Organic — Black Masterbatch Grades</b>', S['heading3']))
    story.append(Paragraph('Post at 10:30 AM Cairo  |  Image: 1200x1200', S['day_meta']))
    story.extend(caption_block('Caption', """
Choosing the right carbon black masterbatch grade matters more than most people think.

Through our Coraplast distribution partnership, we offer 20+ black masterbatch grades:

BLACK 10 FF - General-purpose, excellent dispersion
BLACK 51 FF - High jetness for premium applications
BLACK 93 FF - UV-stabilised for outdoor exposure
BLACK 179 FF - Food-contact approved

Need help selecting the right black grade? Our technical team can recommend based on your polymer type, processing method, and performance requirements.

-> Technical data sheets: blaubatch.com/campaign

#BlackMasterbatch #CarbonBlack #PlasticsProcessing #Coraplast #BlauBatch
"""))

    story.append(PageBreak())

    # ── DAY 12 ──
    story.append(Paragraph('Day 12 — Friday, April 10', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Single Image 1200x1200  |  Post at 10:00 AM Cairo', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption — Before/After Social Proof', """
What does switching to a single-source masterbatch supplier actually look like?

BEFORE:
- 4 different masterbatch suppliers
- 4 different quality standards
- 4 different lead times
- Procurement spending ~2 days/week on vendor coordination

AFTER (with Blau Batch):
- 1 supplier covering filler, colour, additive, black & white
- 1 QC standard - batch-level testing on every shipment
- Streamlined logistics - single shipping schedule
- Technical support from one team that knows your full requirement

The transition typically takes 2-4 weeks: start with your highest-volume grade, prove consistency, then expand.

-> Start here: blaubatch.com/campaign

#SupplyChainOptimisation #PlasticsManufacturing #VendorConsolidation #BlauBatch
"""))

    story.extend(prompt_block('Image Design Prompt (1200x1200)', [
        'Before/After split layout on Deep Navy',
        'Top half: "BEFORE" - cluttered boxes representing multiple suppliers, red-tinted',
        'Bottom half: "AFTER" - single clean card with Blau Batch logo, green checkmark',
        'Divider: Arrow in Sky Blue between sections',
        'Bottom: blaubatch.com/campaign + logo',
    ]))

    story.append(Spacer(1, 6*mm))

    # ── DAY 13 ──
    story.append(Paragraph('Day 13 — Saturday, April 11', S['day_title']))
    story.append(Paragraph('LinkedIn Paid  |  Lead Gen Ad #3 — Trust/Credibility  |  1200x628', S['day_meta']))
    story.append(hr())

    story.extend(bullet_list([
        'Headline: Batch-Level QC. TDS with Every Shipment.',
        'Description: Blau Batch - in-house masterbatch manufacturer with full quality control. Request your quote.',
        'CTA: Get Quote',
        'Budget: 25% of LinkedIn ad spend for Week 2',
        'Audience: Retarget people who engaged with previous ads but did not convert',
    ]))

    story.extend(prompt_block('Ad Creative Design Prompt', [
        'Left 45%: IMAGE AREA for factory/QC photo (or geometric abstract)',
        'Right 55%: "TRUSTED BY MANUFACTURERS" label',
        '"Quality You Can Verify" headline, Montserrat Black',
        'Green checkmarks: Batch-level QC / TDS & CoA / Full traceability',
        'Amber CTA button: "REQUEST QUOTE"',
    ]))

    story.append(PageBreak())

    # ── DAY 14 ──
    story.append(Paragraph('Day 14 — Sunday, April 12', S['day_title']))
    story.append(Paragraph('LinkedIn Organic  |  Image 1200x1200  |  Post at 10:00 AM Cairo  |  Campaign Wrap', S['day_meta']))
    story.append(hr())

    story.extend(caption_block('Caption — Campaign Wrap + Evergreen CTA', """
Over the past two weeks, we've had conversations with plastics manufacturers across Egypt, Saudi Arabia, UAE, Turkey, and Europe about one idea:

What if you only needed one masterbatch supplier?

The response has been clear - manufacturers want:
- Fewer vendors to manage
- Consistent quality across all grades
- A technical partner, not just a supplier
- Competitive pricing backed by in-house production

That's exactly what we've built at Blau Batch.

Our full product range covers:
- Filler Masterbatch (PE & PP) - manufactured in-house
- White, Black, Colour & Additive - distributed via Coraplast
- Custom formulations - engineered to specification

Whether you need a full masterbatch overhaul or just want to evaluate one grade - we're here.

-> Request a quote: blaubatch.com/campaign
-> WhatsApp: wa.me/201022227723
-> Email: info@blaubatch.com

Thank you to everyone who reached out. Let's build something consistent.

#BlauBatch #Masterbatch #FullSpectrum #PlasticsManufacturing #MENA
"""))

    story.extend(prompt_block('Image Design Prompt (1200x1200)', [
        'Deep Navy with radial blue glow, centred layout',
        'Logo centred, medium size',
        '"Thank You." Montserrat Black, white, ~44pt',
        '"The conversation continues." Montserrat Bold, Sky Blue',
        'Product badges row: FILLER, WHITE, BLACK, COLOUR, ADDITIVE, CUSTOM',
        'Three contact methods below',
        '"blaubatch.com/campaign" at bottom in Sky Blue',
    ]))

    story.append(PageBreak())

    # ══════════════════════════════════════
    # GOOGLE SEARCH ADS
    # ══════════════════════════════════════
    story.append(Paragraph('Bonus: Google Search Ad Copy', S['week_title']))
    story.append(amber_hr())

    ad_groups = [
        ('Ad Group 1 — Filler Masterbatch', [
            'Headline 1: Filler Masterbatch Manufacturer | Egypt',
            'Headline 2: CaCO3 PE & PP Filler - In-House QC',
            'Headline 3: FMPE & FMPP Series | Get Quote',
            'Description 1: Egyptian filler masterbatch manufacturer. PE & PP carriers, 70-80% CaCO3 loading. Batch-level QC, TDS with every shipment.',
            'Description 2: Reduce material costs with high-quality filler masterbatch. Manufactured in Egypt, supplied across MENA & Europe.',
            'Keywords: filler masterbatch, filler masterbatch supplier, CaCO3 masterbatch, filler masterbatch Egypt, PE filler masterbatch, PP filler masterbatch',
        ]),
        ('Ad Group 2 — Colour & Additive', [
            'Headline 1: Colour & Additive Masterbatch | MENA',
            'Headline 2: Coraplast Authorised Distributor',
            'Headline 3: 50+ Grades Available | Quote in 24h',
            'Description 1: Full range of colour, additive, UV, and specialty masterbatch from Coraplast. Authorised distributor serving MENA & Europe.',
            'Description 2: White, black, colour, additive masterbatch - one supplier for your entire requirement. Technical support included.',
            'Keywords: colour masterbatch, color masterbatch supplier, additive masterbatch, UV masterbatch, masterbatch distributor MENA',
        ]),
        ('Ad Group 3 — Brand', [
            'Headline 1: Blau Batch | Full-Spectrum Masterbatch',
            'Headline 2: Manufacturer + Distributor | One Source',
            'Headline 3: Request Quote - 24h Response',
            'Description 1: Egyptian masterbatch manufacturer and Coraplast distributor. Filler, colour, white, black, additive - one supplier for everything.',
            'Description 2: Simplify your masterbatch supply chain. In-house manufacturing + international distribution. Serving MENA & Europe.',
            'Keywords: masterbatch supplier, masterbatch manufacturer Egypt, Blau Batch, masterbatch MENA, full spectrum masterbatch',
        ]),
    ]

    for title, items in ad_groups:
        story.append(Paragraph(title, S['heading2']))
        for item in items:
            story.append(Paragraph(esc(item), S['body_indent']))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())

    # ══════════════════════════════════════
    # ASSETS CHECKLIST
    # ══════════════════════════════════════
    story.append(Paragraph('Campaign Assets Checklist', S['week_title']))
    story.append(amber_hr())

    assets = [
        ['1', 'Landing page (Campaign.jsx)', '/campaign', 'Built'],
        ['2', 'Launch carousel (5 slides)', '1080x1080 each', 'Design needed'],
        ['3', 'LinkedIn Ad #1 creative', '1200x628', 'Design needed'],
        ['4', 'LinkedIn Ad #2 creative', '1200x628', 'Design needed'],
        ['5', 'LinkedIn Ad #3 creative', '1200x628', 'Design needed'],
        ['6', 'FMPE vs FMPP comparison', '1200x1200', 'Design needed'],
        ['7', 'Packaging industry image', '1200x628', 'Design needed'],
        ['8', 'Factory / QC photo', '1080x1080', 'Photo needed'],
        ['9', 'Black MB grades image', '1200x1200', 'Design needed'],
        ['10', 'Before/After infographic', '1200x1200', 'Design needed'],
        ['11', 'Campaign wrap image', '1200x1200', 'Design needed'],
        ['12', 'Google retargeting banners', '3 sizes', 'Design needed'],
        ['13', 'WhatsApp product PDF', 'A4', 'Design needed'],
        ['14', 'Email templates (x2)', 'HTML', 'Copy ready'],
        ['15', 'Google Search ad copy', 'Text', 'Written'],
    ]

    asset_header = [
        Paragraph('<b>#</b>', S['table_head']),
        Paragraph('<b>Asset</b>', S['table_head']),
        Paragraph('<b>Format</b>', S['table_head']),
        Paragraph('<b>Status</b>', S['table_head']),
    ]
    asset_rows = [asset_header]
    for row in assets:
        status_color = GREEN if row[3] in ('Built', 'Written') else AMBER
        asset_rows.append([
            Paragraph(row[0], S['table_cell']),
            Paragraph(row[1], S['table_cell_left']),
            Paragraph(row[2], S['table_cell']),
            Paragraph(f'<font color="{status_color.hexval()}">{row[3]}</font>', S['table_cell']),
        ])

    asset_table = Table(asset_rows, colWidths=[12*mm, 68*mm, 38*mm, 42*mm])
    asset_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), STEEL),
        ('BACKGROUND', (0, 1), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F8FAFC')]),
    ]))
    story.append(asset_table)

    story.append(Spacer(1, 10*mm))

    # Brand reference
    story.append(Paragraph('Brand Quick Reference', S['heading2']))
    brand_data = [
        [Paragraph('<b>Element</b>', S['table_head']), Paragraph('<b>Value</b>', S['table_head'])],
        [Paragraph('Heading Font', S['table_cell_left']), Paragraph('Montserrat Black (900), ExtraBold (800), Bold (700)', S['table_cell_left'])],
        [Paragraph('Body Font', S['table_cell_left']), Paragraph('Open Sans Regular (400), Medium (500), SemiBold (600)', S['table_cell_left'])],
        [Paragraph('Deep Navy', S['table_cell_left']), Paragraph('#141B3E', S['table_cell_left'])],
        [Paragraph('Steel Blue', S['table_cell_left']), Paragraph('#23447A', S['table_cell_left'])],
        [Paragraph('Sky Blue', S['table_cell_left']), Paragraph('#2B8DD0', S['table_cell_left'])],
        [Paragraph('Manufacturing Amber', S['table_cell_left']), Paragraph('#D4840A (manufacturing content only)', S['table_cell_left'])],
        [Paragraph('Tone', S['table_cell_left']), Paragraph('Professional, technically confident, direct. No consumer hype.', S['table_cell_left'])],
    ]
    brand_table = Table(brand_data, colWidths=[42*mm, 118*mm])
    brand_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), STEEL),
        ('BACKGROUND', (0, 1), (-1, -1), WHITE),
        ('GRID', (0, 0), (-1, -1), 0.5, LIGHT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F8FAFC')]),
    ]))
    story.append(brand_table)

    # ── BUILD ──
    doc.build(story, onFirstPage=cover_page, onLaterPages=page_bg)
    print(f'PDF saved to: {OUTPUT_PATH}')

if __name__ == '__main__':
    build()
