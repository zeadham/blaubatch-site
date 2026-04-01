import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, HelpCircle, BookOpen, Download, ArrowRight, ChevronDown } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import Footer from '../components/Footer'

const DOCS = [
  { title: 'FMPE Series — Technical Data Sheet', type: 'TDS', desc: 'MFI, ash content, moisture, carrier, packaging, and processing guidelines for FMPE-1070, 1075, 1080.', subject: 'TDS Request - FMPE Series' },
  { title: 'FMPP Series — Technical Data Sheet', type: 'TDS', desc: 'MFI, ash content, moisture, carrier, packaging, and processing guidelines for FMPP-1070, 1075, 1080.', subject: 'TDS Request - FMPP Series' },
  { title: 'Colour Masterbatch — Product Overview', type: 'Overview', desc: 'Carrier compatibility, colour systems, let-down ratios, ΔE tolerance, and food-contact grade availability.', subject: 'TDS Request - Colour Masterbatch' },
  { title: 'White Masterbatch — Product Overview', type: 'Overview', desc: 'TiO₂-based grades for blown film, injection moulding, and food-contact applications.', subject: 'TDS Request - White Masterbatch' },
  { title: 'Filler MB Dosage & Processing Guide', type: 'Guide', desc: 'Recommended dosage ranges by application type, temperature profiles, and troubleshooting tips for filler masterbatch.', subject: 'Processing Guide Request' },
  { title: 'Certificate of Analysis (sample)', type: 'CoA', desc: 'Typical CoA format issued with each batch — available for specific batch numbers on request.', subject: 'CoA Request' },
]

const FAQS = [
  {
    q: 'What is filler masterbatch and how does it reduce my costs?',
    a: 'Filler masterbatch is a concentrated blend of CaCO₃ (calcium carbonate) dispersed in a polymer carrier (PE or PP). By replacing a portion of your virgin polymer with filler masterbatch, you reduce raw material cost while maintaining acceptable mechanical properties. Typical cost savings depend on the price differential between virgin polymer and masterbatch, and the dosage rate used — generally 10–30% substitution in film applications.'
  },
  {
    q: 'What is the difference between FMPE and FMPP Series?',
    a: 'FMPE uses a polyethylene (LDPE/LLDPE/HDPE) carrier and is designed for PE applications: blown film, cast film, extrusion coating, and injection moulding. FMPP uses a polypropylene (PP homopolymer) carrier and is designed for PP applications: raffia tape, non-woven, BOPP film, and PP injection moulding. Using PE carrier in a PP process (or vice versa) can cause processing issues and is not recommended.'
  },
  {
    q: 'What dosage rate should I start with?',
    a: 'We recommend starting at 15% for most blown film applications and adjusting in 5% increments while monitoring mechanical properties (tear, tensile) and optical properties (haze). For raffia and non-woven, start at 10–15% and monitor fibre tenacity. The maximum recommended rate depends on your target properties, line speed, and equipment — contact our technical team for application-specific guidance.'
  },
  {
    q: 'How is the masterbatch packaged and what is the shelf life?',
    a: 'Our masterbatch is available in 25 kg PP woven bags (standard) and 500–1000 kg FIBC big bags (for high-volume orders). Shelf life is 24 months from production date when stored in original sealed packaging in a cool, dry environment (below 30°C, away from direct sunlight). Reseal partially used bags immediately to prevent moisture absorption.'
  },
  {
    q: 'Can I get a sample before placing a full order?',
    a: 'Yes. We offer pre-production samples upon request — typically 5–25 kg quantities for processing trials. Contact us with your polymer type, application, and processing parameters, and we\'ll advise on which grade to sample and arrange delivery.'
  },
  {
    q: 'Do you provide food-contact grade masterbatch?',
    a: 'Yes. Through our Coraplast partnership, we offer white, black, and colour masterbatch grades compliant with EU 10/2011 Regulation and FDA 21 CFR requirements for food contact applications. Request the specific grade and regulatory documentation when enquiring.'
  },
  {
    q: 'What quality control tests do you run on each batch?',
    a: 'Each production batch is tested for: Melt Flow Index (ISO 1133), ash content (ISO 3451), moisture content, colour consistency, and visual dispersibility. A Certificate of Analysis (CoA) is issued for every batch and can be provided alongside each shipment. Full traceability from raw material intake to finished goods is maintained.'
  },
  {
    q: 'What is your lead time and minimum order quantity?',
    a: 'Lead times depend on product type and stock availability — typically 3–7 business days for stocked items. Minimum order quantities vary by product. Contact us with your volume requirements and we\'ll provide a specific commercial offer. For large or recurring orders, we can discuss supply agreements with fixed pricing and reserved capacity.'
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', gap: 16, textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>{q}</span>
        <ChevronDown size={16} color="rgba(255,255,255,0.4)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: 18 }}>{a}</p>
      </motion.div>
    </div>
  )
}

const GLOSSARY = [
  { term: 'CaCO₃', def: 'Calcium Carbonate — the inorganic mineral used as filler. Typically sourced from limestone and surface-treated for improved polymer compatibility.' },
  { term: 'MFI / MFR', def: 'Melt Flow Index / Melt Flow Rate — measures how easily a polymer flows when melted (g/10min). Higher MFI = easier flow. FMPE tested at 190°C/2.16kg, FMPP at 230°C/2.16kg.' },
  { term: 'Let-Down Ratio (LDR)', def: 'The proportion of masterbatch blended into the base resin. A 2% LDR means 2 kg masterbatch per 98 kg of base polymer.' },
  { term: 'Carrier Resin', def: 'The polymer matrix in which pigment or filler is dispersed. Must be compatible with the end-use resin to avoid processing problems.' },
  { term: 'ΔE', def: 'Delta-E — a numerical measure of colour difference. ΔE ≤ 1.0 is generally considered imperceptible to the human eye; Blau Batch colour MB targets ΔE ≤ 0.5 batch-to-batch.' },
  { term: 'TDS', def: 'Technical Data Sheet — document listing all key product specifications, test methods, processing recommendations, and packaging details.' },
  { term: 'CoA', def: 'Certificate of Analysis — batch-specific document confirming that tested properties meet the product specification.' },
  { term: 'BOPP', def: 'Biaxially Oriented Polypropylene — PP film stretched in both machine and transverse directions for improved stiffness and barrier properties.' },
  { term: 'Raffia', def: 'Flat or fibrillated PP tape produced by slitting and stretching extruded film — used for woven bags, sacks, and geotextiles.' },
]

export default function ResourcesPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-60px' })
  const inView2 = useInView(ref2, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Resources' }}
        tag="Technical Library"
        title="Product Documents,"
        titleAccent="Guides & FAQs"
        sub="Technical data sheets, processing guides, certificates of analysis, and an FAQ covering filler masterbatch selection, dosage, processing, and quality control."
        visual={{
          img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
          bg: 'linear-gradient(145deg, #0a1830 0%, #0f2040 35%, #162e58 70%, #0d1e42 100%)',
          dots: 'rgba(46,127,208,0.16)',
          symbol: 'TDS',
          accent: '#2B8DD0',
          chip: 'TECH LIBRARY',
          stat: { n: '8 FAQs', label: 'Technical Answers' },
        }}
        cta={{
          primary: { label: 'Request a TDS', href: 'mailto:info@blaubatch.com?subject=TDS Request' },
          secondary: { label: 'View FAQs', href: '#faqs' },
        }}
      />

      {/* Documents */}
      <section style={{ background: '#141B3E', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={ref1}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
            >
              <FileText size={14} color="#2B8DD0" />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0' }}>Technical Documents</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 8, lineHeight: 1.1 }}
            >Download Library</motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView1 ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 40 }}
            >All documents are sent by email within 1 business day of request.</motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {DOCS.map((d, i) => (
              <motion.div key={d.title}
                initial={{ opacity: 0, y: 24 }} animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '22px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 3, background: 'rgba(46,127,208,0.2)', color: '#2B8DD0' }}>{d.type}</span>
                  <FileText size={14} color="rgba(255,255,255,0.25)" />
                </div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.4 }}>{d.title}</div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{d.desc}</p>
                <a href={`mailto:info@blaubatch.com?subject=${d.subject}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: 'rgba(46,127,208,0.15)', border: '1px solid rgba(46,127,208,0.25)', borderRadius: 7, color: '#2B8DD0', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s', width: 'fit-content' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(46,127,208,0.25)'; e.currentTarget.style.borderColor = 'rgba(46,127,208,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(46,127,208,0.15)'; e.currentTarget.style.borderColor = 'rgba(46,127,208,0.25)' }}
                ><Download size={11} /> Request</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#23447A', padding: '88px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 72, alignItems: 'start' }}>
          <div ref={ref2} style={{ position: 'sticky', top: 88 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
            >
              <HelpCircle size={14} color="#D4840A" />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A' }}>FAQ</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 16, lineHeight: 1.1 }}
            >Frequently Asked Questions</motion.h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: 24 }}>Can't find your answer? Contact us directly.</p>
            <a href="mailto:info@blaubatch.com?subject=Technical Question" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: '#2B8DD0', color: '#fff', borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
              onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
            >Ask a Question <ArrowRight size={12} /></a>
          </div>
          <div>
            {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section style={{ background: '#141B3E', padding: '88px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <BookOpen size={14} color="#2B8DD0" />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0' }}>Terminology</span>
          </div>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 40, lineHeight: 1.1 }}>Masterbatch Glossary</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 0 }}>
            {GLOSSARY.map((g, i) => (
              <div key={g.term} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingRight: i % 2 === 0 ? 40 : 0, paddingLeft: i % 2 === 1 ? 40 : 0, borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 900, color: '#2B8DD0', marginBottom: 6 }}>{g.term}</div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{g.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Articles */}
      <section style={{ background: '#F4F7FB', padding: '88px 48px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}>Technical Blog</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#141B3E' }}>Coming Soon: Technical Articles</h2>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, maxWidth: 560 }}>In-depth guides on masterbatch selection, processing, and applications — written by our compounding team for plastics engineers and procurement professionals.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { tag: 'Filler MB', title: 'What is Filler Masterbatch and How Does it Reduce Material Costs?', desc: 'A complete guide to CaCO₃-based filler masterbatch — how it works, how it\'s made, and how to calculate cost savings for your specific application.', color: '#D4840A', borderColor: 'rgba(212,132,10,0.25)' },
              { tag: 'Grade Selection', title: 'CaCO₃ Loading: 70% vs 75% vs 80% — Which Grade Is Right for Your Application?', desc: 'A technical comparison of high-loading filler grades — covering mechanical property trade-offs, processing considerations, and application fit.', color: '#2B8DD0', borderColor: 'rgba(46,127,208,0.25)' },
              { tag: 'Processing', title: 'PE vs PP Carrier Systems: Why Matching Carrier to Base Resin Matters', desc: 'Why using the wrong carrier polymer causes processing problems — and how to select the right filler masterbatch carrier for your production line.', color: '#2B8DD0', borderColor: 'rgba(46,127,208,0.25)' },
              { tag: 'White MB', title: 'TiO₂ Masterbatch: Understanding Opacity, Whiteness, and Food-Contact Compliance', desc: 'How TiO₂ loading affects opacity and CIE whiteness index — and what food-contact compliance (EU 10/2011, FDA) means in practice.', color: '#2B8DD0', borderColor: 'rgba(74,170,224,0.25)' },
              { tag: 'UV Protection', title: 'UV Stabilisation in Agricultural Film: What Makes a Masterbatch Last 10+ Years?', desc: 'How HALS-based UV stabilisers in black and additive masterbatch protect agricultural films from photodegradation in MENA and Mediterranean climates.', color: '#22C55E', borderColor: 'rgba(34,197,94,0.2)' },
              { tag: 'Quality', title: 'Reading a Masterbatch CoA: The 7 Properties Every Buyer Should Check', desc: 'MFI, ash content, moisture, colour delta-E, and dispersibility — a practical guide to reading a Certificate of Analysis before accepting a shipment.', color: '#D4840A', borderColor: 'rgba(212,132,10,0.25)' },
            ].map((a, i) => (
              <div key={i} style={{
                background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14,
                padding: '24px', display: 'flex', flexDirection: 'column', gap: 12,
                borderTop: `3px solid ${a.borderColor}`,
              }}>
                <div style={{
                  display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: a.color,
                  border: `1px solid ${a.borderColor}`, borderRadius: 4, padding: '3px 8px',
                  alignSelf: 'flex-start',
                }}>{a.tag}</div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, color: '#141B3E', lineHeight: 1.4, flex: 1 }}>{a.title}</h3>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.7 }}>{a.desc}</p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                  letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94A3B8',
                  paddingTop: 12, borderTop: '1px solid #F1F5F9',
                }}>
                  <span style={{ width: 20, height: 1, background: '#CBD5E1', display: 'inline-block' }} />
                  Article coming soon
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '20px 24px', background: '#EFF6FF', border: '1px solid rgba(46,127,208,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
              <strong style={{ color: '#141B3E' }}>Want early access to these articles?</strong>{' '}
              Email <a href="mailto:info@blaubatch.com" style={{ color: '#2B8DD0', fontWeight: 600 }}>info@blaubatch.com</a> and we'll notify you when each guide publishes.
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } section { padding: 56px 20px !important; } }`}</style>
    </>
  )
}
