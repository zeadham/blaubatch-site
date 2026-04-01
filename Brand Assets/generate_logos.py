import os, base64, io, glob
from PIL import Image, ImageDraw, ImageFont
import numpy as np

BASE  = "C:/Users/Adham/Desktop/Blau Batch Master/Brand Assets"
LOGOS = f"{BASE}/Logos"
FONTS = f"{BASE}/Fonts"
OUT   = f"{BASE}/Logos/Export"

DEEP_NAVY  = (20,  27,  62)
STEEL_BLUE = (35,  68,  122)
SKY_BLUE   = (43,  141, 208)
WHITE      = (255, 255, 255)
BLACK      = (0,   0,   0)

FONT_BLACK = ImageFont.truetype(f"{FONTS}/Montserrat-Black.ttf",   300)
FONT_REG   = ImageFont.truetype(f"{FONTS}/Montserrat-Regular.ttf",  80)

# Source assets
primary = Image.open(f"{LOGOS}/BlauBatch_Logo_Primary.jpg").convert("RGBA")
cutout  = Image.open(f"{LOGOS}/Blaubatch_cutout-logo.png").convert("RGBA")

H = 2400
def fit(img, h):
    r = h / img.height
    return img.resize((int(img.width * r), h), Image.LANCZOS)

primary_h = fit(primary, H)
cutout_h  = fit(cutout,  H)

# ── Save helpers ──
def save_png(img, folder, name):
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    p = f"{OUT}/{folder}/{name}.png"
    img.save(p, "PNG", dpi=(300, 300))
    print(f"  PNG  {folder}/{name}.png  ({os.path.getsize(p)//1024} KB)")

def save_jpg(img, folder, name, bg=WHITE):
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    canvas = Image.new("RGB", img.size, bg)
    if img.mode == "RGBA":
        canvas.paste(img, mask=img.split()[3])
    else:
        canvas.paste(img)
    p = f"{OUT}/{folder}/{name}.jpg"
    canvas.save(p, "JPEG", quality=95, dpi=(300, 300))
    print(f"  JPG  {folder}/{name}.jpg  ({os.path.getsize(p)//1024} KB)")

def img_to_b64(img, fmt="PNG"):
    buf = io.BytesIO()
    if fmt == "JPEG":
        img.convert("RGB").save(buf, "JPEG", quality=95)
        mime = "image/jpeg"
    else:
        img.save(buf, "PNG")
        mime = "image/png"
    return mime, base64.b64encode(buf.getvalue()).decode()

def save_svg(content, folder, name):
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    p = f"{OUT}/{folder}/{name}.svg"
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  SVG  {folder}/{name}.svg  ({os.path.getsize(p)//1024} KB)")

def save_eps(img_rgb, w_pt, h_pt, folder, name):
    buf = io.BytesIO()
    img_rgb.save(buf, "JPEG", quality=95)
    jpeg_hex = buf.getvalue().hex()
    px_w, px_h = img_rgb.size
    eps = "\n".join([
        "%!PS-Adobe-3.0 EPSF-3.0",
        f"%%BoundingBox: 0 0 {int(w_pt)} {int(h_pt)}",
        "%%LanguageLevel: 2",
        "%%Creator: Blau Batch Brand System",
        "%%EndComments",
        f"{int(w_pt)} {int(h_pt)} scale",
        "/DeviceRGB setcolorspace",
        "<<",
        f"  /ImageType 1",
        f"  /Width {px_w}",
        f"  /Height {px_h}",
        "  /BitsPerComponent 8",
        "  /Decode [0 1 0 1 0 1]",
        f"  /ImageMatrix [{px_w} 0 0 -{px_h} 0 {px_h}]",
        "  /DataSource currentfile /ASCIIHexDecode filter /DCTDecode filter",
        ">>",
        "image",
        jpeg_hex,
        ">",
        "%%EOF",
    ])
    os.makedirs(f"{OUT}/{folder}", exist_ok=True)
    p = f"{OUT}/{folder}/{name}.eps"
    with open(p, "w") as f:
        f.write(eps)
    print(f"  EPS  {folder}/{name}.eps  ({os.path.getsize(p)//1024} KB)")

def on_bg(img, bg_color):
    canvas = Image.new("RGBA", img.size, bg_color + (255,))
    canvas.paste(img, mask=img.split()[3])
    return canvas

# ════════════════════════════════════════════
# 1. LOGOMARK ONLY
# ════════════════════════════════════════════
print("\n── 1. Logomark Only ──")
lm = cutout_h
lw, lh = lm.size

save_png(lm,                  "Logomark", "BlauBatch_Logomark_Transparent")
save_png(on_bg(lm, DEEP_NAVY),"Logomark", "BlauBatch_Logomark_on_Navy")
save_jpg(lm,                  "Logomark", "BlauBatch_Logomark_on_White")
save_jpg(on_bg(lm, DEEP_NAVY),"Logomark", "BlauBatch_Logomark_on_Navy")

mime, b64 = img_to_b64(lm)
save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lw} {lh}">\n'
    f'  <title>Blau Batch Logomark</title>\n'
    f'  <image href="data:{mime};base64,{b64}" width="{lw}" height="{lh}"/>\n'
    f'</svg>',
    "Logomark", "BlauBatch_Logomark_Transparent")

save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lw} {lh}">\n'
    f'  <title>Blau Batch Logomark on Navy</title>\n'
    f'  <rect width="{lw}" height="{lh}" fill="#141B3E"/>\n'
    f'  <image href="data:{mime};base64,{b64}" width="{lw}" height="{lh}"/>\n'
    f'</svg>',
    "Logomark", "BlauBatch_Logomark_on_Navy")

save_eps(on_bg(lm, WHITE).convert("RGB"),      200, int(200*lh/lw), "Logomark", "BlauBatch_Logomark_on_White")
save_eps(on_bg(lm, DEEP_NAVY).convert("RGB"),  200, int(200*lh/lw), "Logomark", "BlauBatch_Logomark_on_Navy")

# ════════════════════════════════════════════
# 2. PRIMARY LOGO
# ════════════════════════════════════════════
print("\n── 2. Primary Logo ──")
pr = primary_h
pw, ph = pr.size

save_png(pr,                    "Primary", "BlauBatch_Logo_Primary")
save_jpg(pr,                    "Primary", "BlauBatch_Logo_Primary_on_White")
save_jpg(on_bg(pr, DEEP_NAVY),  "Primary", "BlauBatch_Logo_Primary_on_Navy")

mime2, b64_2 = img_to_b64(pr)
save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {pw} {ph}">\n'
    f'  <title>Blau Batch Primary Logo</title>\n'
    f'  <image href="data:{mime2};base64,{b64_2}" width="{pw}" height="{ph}"/>\n'
    f'</svg>',
    "Primary", "BlauBatch_Logo_Primary")

save_eps(on_bg(pr, DEEP_NAVY).convert("RGB"), 200, int(200*ph/pw), "Primary", "BlauBatch_Logo_Primary")

# ════════════════════════════════════════════
# 3. TEXT-ONLY LOGO
# ════════════════════════════════════════════
print("\n── 3. Text-Only Logo ──")

def make_text_logo(text, font, color, bg=None, pad=120):
    d = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    bb = d.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    W, H2 = tw + pad*2, th + pad*2
    img = Image.new("RGBA", (W, H2), (0,0,0,0) if bg is None else bg+(255,))
    ImageDraw.Draw(img).text((pad - bb[0], pad - bb[1]), text, font=font, fill=color+(255,))
    return img

to_navy  = make_text_logo("BLAU BATCH", FONT_BLACK, DEEP_NAVY)
to_white = make_text_logo("BLAU BATCH", FONT_BLACK, WHITE, bg=DEEP_NAVY)
to_black = make_text_logo("BLAU BATCH", FONT_BLACK, BLACK)
tw, th = to_navy.size

save_png(to_navy,  "TextOnly", "BlauBatch_TextOnly_Navy_Transparent")
save_png(to_white, "TextOnly", "BlauBatch_TextOnly_White_on_Navy")
save_jpg(to_navy,  "TextOnly", "BlauBatch_TextOnly_Navy_on_White")
save_jpg(to_white, "TextOnly", "BlauBatch_TextOnly_White_on_Navy")
save_jpg(to_black, "TextOnly", "BlauBatch_TextOnly_Black_on_White")

save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {tw} {th}">\n'
    f'  <title>Blau Batch Text-Only Logo</title>\n'
    f'  <style>@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900");</style>\n'
    f'  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"\n'
    f'        font-family="Montserrat, Arial Black, sans-serif" font-weight="900"\n'
    f'        font-size="{int(th*0.68)}px" fill="#141B3E" letter-spacing="6">BLAU BATCH</text>\n'
    f'</svg>',
    "TextOnly", "BlauBatch_TextOnly_Navy")

save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {tw} {th}">\n'
    f'  <title>Blau Batch Text-Only Logo White on Navy</title>\n'
    f'  <style>@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@900");</style>\n'
    f'  <rect width="{tw}" height="{th}" fill="#141B3E"/>\n'
    f'  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"\n'
    f'        font-family="Montserrat, Arial Black, sans-serif" font-weight="900"\n'
    f'        font-size="{int(th*0.68)}px" fill="#FFFFFF" letter-spacing="6">BLAU BATCH</text>\n'
    f'</svg>',
    "TextOnly", "BlauBatch_TextOnly_White_on_Navy")

save_eps(on_bg(to_navy, WHITE).convert("RGB"),  400, int(400*th/tw), "TextOnly", "BlauBatch_TextOnly_Navy_on_White")
save_eps(to_white.convert("RGB"),               400, int(400*th/tw), "TextOnly", "BlauBatch_TextOnly_White_on_Navy")

# ════════════════════════════════════════════
# 4. HORIZONTAL LOCKUP
# ════════════════════════════════════════════
print("\n── 4. Horizontal Lockup ──")

MARK_H = 800
PAD    = 80
GAP    = 120

mark = fit(primary, MARK_H)
mw, mh = mark.size

d = ImageDraw.Draw(Image.new("RGBA", (1,1)))
bb_n = d.textbbox((0,0), "BLAU BATCH", font=FONT_BLACK)
bb_t = d.textbbox((0,0), "Full-Spectrum Masterbatch Solutions", font=FONT_REG)
nw, nh = bb_n[2]-bb_n[0], bb_n[3]-bb_n[1]
tw2, th2 = bb_t[2]-bb_t[0], bb_t[3]-bb_t[1]
SP = 40
blk_h = nh + SP + th2
blk_w = max(nw, tw2)

TOT_W = PAD + mw + GAP + blk_w + PAD
TOT_H = max(mh, blk_h) + PAD*2

def make_horiz(bg, name_col, tag_col):
    img = Image.new("RGBA", (TOT_W, TOT_H), bg+(255,) if bg else (0,0,0,0))
    draw = ImageDraw.Draw(img)
    my = (TOT_H - mh)//2
    img.paste(mark, (PAD, my), mask=mark.split()[3] if mark.mode=="RGBA" else None)
    tx = PAD + mw + GAP
    ty = (TOT_H - blk_h)//2
    draw.text((tx - bb_n[0], ty - bb_n[1]),      "BLAU BATCH", font=FONT_BLACK, fill=name_col+(255,))
    draw.text((tx - bb_t[0], ty+nh+SP - bb_t[1]), "Full-Spectrum Masterbatch Solutions", font=FONT_REG, fill=tag_col+(255,))
    return img

hz_white = make_horiz(WHITE,     DEEP_NAVY, STEEL_BLUE)
hz_navy  = make_horiz(DEEP_NAVY, WHITE,     SKY_BLUE)
hz_tr    = make_horiz(None,      DEEP_NAVY, STEEL_BLUE)

save_png(hz_tr,    "Horizontal", "BlauBatch_Horizontal_Transparent")
save_png(hz_white, "Horizontal", "BlauBatch_Horizontal_on_White")
save_png(hz_navy,  "Horizontal", "BlauBatch_Horizontal_on_Navy")
save_jpg(hz_white, "Horizontal", "BlauBatch_Horizontal_on_White")
save_jpg(hz_navy,  "Horizontal", "BlauBatch_Horizontal_on_Navy")

mime3, b64_3 = img_to_b64(mark)
my_s = (TOT_H - mh)//2
ty_s = (TOT_H - blk_h)//2

save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TOT_W} {TOT_H}">\n'
    f'  <title>Blau Batch Horizontal Lockup</title>\n'
    f'  <style>@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900");</style>\n'
    f'  <rect width="{TOT_W}" height="{TOT_H}" fill="#FFFFFF"/>\n'
    f'  <image href="data:{mime3};base64,{b64_3}" x="{PAD}" y="{my_s}" width="{mw}" height="{mh}"/>\n'
    f'  <text x="{PAD+mw+GAP}" y="{ty_s+nh}"\n'
    f'        font-family="Montserrat, Arial Black, sans-serif" font-weight="900"\n'
    f'        font-size="{nh}px" fill="#141B3E" letter-spacing="2">BLAU BATCH</text>\n'
    f'  <text x="{PAD+mw+GAP}" y="{ty_s+nh+SP+th2}"\n'
    f'        font-family="Montserrat, Arial, sans-serif" font-weight="400"\n'
    f'        font-size="{th2}px" fill="#23447A">Full-Spectrum Masterbatch Solutions</text>\n'
    f'</svg>',
    "Horizontal", "BlauBatch_Horizontal_on_White")

save_svg(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {TOT_W} {TOT_H}">\n'
    f'  <title>Blau Batch Horizontal Lockup on Navy</title>\n'
    f'  <style>@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900");</style>\n'
    f'  <rect width="{TOT_W}" height="{TOT_H}" fill="#141B3E"/>\n'
    f'  <image href="data:{mime3};base64,{b64_3}" x="{PAD}" y="{my_s}" width="{mw}" height="{mh}"/>\n'
    f'  <text x="{PAD+mw+GAP}" y="{ty_s+nh}"\n'
    f'        font-family="Montserrat, Arial Black, sans-serif" font-weight="900"\n'
    f'        font-size="{nh}px" fill="#FFFFFF" letter-spacing="2">BLAU BATCH</text>\n'
    f'  <text x="{PAD+mw+GAP}" y="{ty_s+nh+SP+th2}"\n'
    f'        font-family="Montserrat, Arial, sans-serif" font-weight="400"\n'
    f'        font-size="{th2}px" fill="#2B8DD0">Full-Spectrum Masterbatch Solutions</text>\n'
    f'</svg>',
    "Horizontal", "BlauBatch_Horizontal_on_Navy")

save_eps(hz_white.convert("RGB"), 500, int(500*TOT_H/TOT_W), "Horizontal", "BlauBatch_Horizontal_on_White")
save_eps(hz_navy.convert("RGB"),  500, int(500*TOT_H/TOT_W), "Horizontal", "BlauBatch_Horizontal_on_Navy")

print("\n\nAll exports complete.")
all_files = [f for f in glob.glob(f"{OUT}/**/*", recursive=True) if os.path.isfile(f)]
print(f"Total files: {len(all_files)}")
for f in sorted(all_files):
    print(f"  {f.replace(OUT+'/', '')}")
