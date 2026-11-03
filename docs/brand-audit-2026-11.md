# BLAU BATCH Brand Audit: Typography & File Versions

**Date:** 2026-11-03 · **Scope:** every tracked file on `main` plus this branch, and the unmerged AfroPlast 2027 print branch (read-only).
**Status:** audit only. **Nothing has been deleted yet**; see §3 for the proposed list awaiting approval.

---

## 1. Which brand files are current

Brand documents in date order (dates from the files' own metadata):

| Date | File | What it is | Status |
|---|---|---|---|
| 2026-03-16 | `Documents & Reports/BlauBatch_BrandIdentity.pdf` | First brand identity deck, 18 pages. Its display text uses Poppins, Anton and Archivo Black. | **Superseded** |
| 2026-03-17 | `BlauBatch_CorporateIdentity_v2.pptx` | "Corporate Identity Manual **v2.0**" | **Superseded** by v4.0 (same manual) |
| 2026-03-19 | `BlauBatch_BrandGuidelines_v4.docx` | "Corporate Identity Manual **v4.0**" | **Current**: brand strategy, colour, type, voice |
| 2026-03-30 | `BlauBatch_VisualIdentityGuide_v1.docx` | Visual Identity Guide v1.0 | **Current**: logo, colour, type and asset rules (newest) |

**The current guideline set is Brand Guidelines v4 plus Visual Identity Guide v1.** They complement each other and should both stay.

Other versioned files:

| Files | Latest | Older versions |
|---|---|---|
| `BlauBatch_Coraplast_ProductCatalog_v1 / v2 / v2.1.pdf` (all 2026-03-16) | **v2.1** (22:33) | v1 (22:07), v2 (22:25) |
| `Coraplast White and Black technical sheet.zip` vs `Coraplast_extracted/` | `Coraplast_extracted/` (used by `generate_tds_pdfs.py`) | The zip is a byte-identical copy (all 49 files match) |

Already cleaned on `main` (2026-09-28): the old website copy `blaubatch-site-v2`, the unpacked guideline XML in `bg_unpacked/`, and the Word lock file. **The current website is `Brand Assets/blaubatch-site`.**

---

## 2. Typography: what each file actually uses

| Font | Where it's used |
|---|---|
| **Montserrat + Open Sans** | Brand Guidelines v4 §5 and Visual Identity Guide §12–13 (the written spec) · website `blaubatch-site` (all pages) · Instagram carousels (7) · product card · logo SVGs · `build_visual_identity.js`, `generate_logos.py`, `generate_tds_pdfs.py` · Word datasheet template and 8 Word datasheets · AfroPlast 2027 print files (unmerged branch) · `Brand Assets/Fonts/` (Montserrat only; no Open Sans or Inter files) |
| **Inter** | `Sales Tools/index.html`, `Sales Tools/pipeline-tracker.html` (internal tools, 2026-09-13) · this presentation's blueprint and Canva prompt (changed 2026-11-03) |
| **Cairo** | Arabic, per Visual Identity Guide §12.3 · AfroPlast print files |
| **Poppins / Anton / Archivo Black** | Only the superseded `BlauBatch_BrandIdentity.pdf` |
| **Helvetica / Arial (fallback)** | All 57 Generated TDS PDFs and `BlauBatch_ProductCatalogue_2026.pdf`. The generator ran on a machine without Montserrat or Open Sans installed and fell back, so these PDFs are off-brand. |
| Calibri / Cambria / Aptos | Supplier-original Coraplast TDS PDFs and the original filler TDS PDFs (not Blau Batch-designed; leave as is) |

**Finding:** no guideline file specifies Inter. The written standard is still Montserrat for headings and Open Sans for body. Inter appears only in the internal Sales Tools and in the new presentation docs. A decision is needed (see §4).

---

## 3. Proposed deletions (awaiting approval)

Git history keeps every deleted file, so any of these can be restored later.

| # | Path | Reason | Size |
|---|---|---|---|
| D1 | `Brand Assets/Documents & Reports/BlauBatch_BrandIdentity.pdf` | First identity deck, superseded by v4 and the VI Guide; uses retired fonts | 12 MB |
| D2 | `Brand Assets/BlauBatch_CorporateIdentity_v2.pptx` | Manual v2.0, superseded by v4.0 | 2.7 MB |
| D3 | `Brand Assets/Documents & Reports/BlauBatch_Coraplast_ProductCatalog_v1.pdf` | Superseded by v2.1 | 18 KB |
| D4 | `Brand Assets/Documents & Reports/BlauBatch_Coraplast_ProductCatalog_v2.pdf` | Superseded by v2.1 | 467 KB |
| D5 | `Brand Assets/Technical Sheets/Coraplast White and Black technical sheet.zip` | Byte-identical duplicate of `Coraplast_extracted/` | 17 MB |
| D6 | `Brand Assets/Technical Sheets/Cora plast files/` (552 files) | Browser "Save page" copies of Coraplast's online PDF viewer: HTML, CSS and JavaScript only, no actual PDFs. Covers Black, NIR-Black, Geomembrane, SPD Polyester/PE/PP, Special effects and Code of Conduct. Download the real PDFs from Coraplast if needed. | 174 MB |

**Kept on purpose:**
- **Logo source masters:** `Logos/BlauBatch_Logo_Primary.jpg` and `Logos/Blaubatch_cutout-logo.png` look like duplicates of files in `Export/`, but the generator scripts read them.
- **JPG/PNG/SVG/EPS variants in `Logos/Export/`:** the VI Guide §2.4 requires all four formats.
- **Generated TDS PDFs:** these are the current outputs. They should be **regenerated** with the brand font installed, not deleted.
- **Word datasheets:** these are the sources for the PDFs.

---

## 4. Decision needed: brand typeface

| Option | What changes |
|---|---|
| **A. Inter becomes the brand font** | Update BG v4 §5 and VI §12–13 to Inter (as BG v5 / VI v1.1). Then move the website, Instagram templates, product card, Word datasheet template, generator scripts and AfroPlast print files to Inter, add Inter font files to `Brand Assets/Fonts/` and regenerate all TDS PDFs. Logo files keep their Montserrat Black wordmark. |
| **B. Montserrat + Open Sans stay** | Revert the presentation blueprint and Canva prompt to Montserrat and Open Sans, and either move Sales Tools to the brand fonts or treat them as internal-only. Add the Open Sans files to `Brand Assets/Fonts/` and regenerate the TDS PDFs with the brand fonts. |
