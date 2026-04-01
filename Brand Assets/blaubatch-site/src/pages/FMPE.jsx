import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, CheckCircle2, ShoppingBag, Sprout, HardHat, Home } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import QuoteForm from '../components/shared/QuoteForm'
import Footer from '../components/Footer'

const FMPE_PRODUCTS = [
  { name: 'FMPE-1070', sub: '70% CaCO₃ · Dosage 10–40%', value: 'FMPE-1070 — 70% CaCO₃ PE Filler Masterbatch' },
  { name: 'FMPE-1075 ★', sub: '75% CaCO₃ · Dosage 10–35%', value: 'FMPE-1075 — 75% CaCO₃ PE Filler Masterbatch' },
  { name: 'FMPE-1080', sub: '80% CaCO₃ · Dosage 5–25%', value: 'FMPE-1080 — 80% CaCO₃ PE Filler Masterbatch' },
  { name: 'Not sure yet', sub: 'We\'ll recommend the right grade', value: 'Not sure — need recommendation' },
]

const FMPE_APPLICATIONS = [
  'Blown Film', 'Cast Film', 'Injection Molding', 'Blow Molding',
  'Pipe & Profile Extrusion', 'Agricultural Film', 'Other',
]

const GRADES = [
  { code: 'FMPE-1070', loading: '70%', dosage: '10–40%', mfi: '2–4 g/10min', apps: 'Blown film, bags, agricultural film', desc: 'Standard loading — ideal balance of cost reduction and processability for standard blown film and bag production.' },
  { code: 'FMPE-1075', loading: '75%', dosage: '10–35%', mfi: '2–4 g/10min', apps: 'Blown film, cast film, injection moulding', desc: 'Mid-range loading for maximum cost efficiency. Recommended for standard blown film lines with appropriate processing equipment.' },
  { code: 'FMPE-1080', loading: '80%', dosage: '5–25%', mfi: '2–4 g/10min', apps: 'High-output blown film, extrusion', desc: 'High CaCO₃ loading for cost-intensive applications. Contact technical team for processing advice.' },
]

const ADVANTAGES = [
  'Consistent CaCO₃ dispersion — in-house milling and compounding',
  'Batch-level QC — MFI, ash content, colour and dispersion tested before dispatch',
  'Full traceability from raw material intake to finished goods',
  'Compatible with standard blown film, cast film, and extrusion lines',
  'Reduces raw material cost without compromising film mechanical properties',
  'Available in 25 kg PP bags and 500–1000 kg FIBC big bags',
]

const DOSAGE = [
  { app: 'Blown Film (standard)', range: '10–30%', note: 'Start at 15%, adjust based on haze and tear strength requirements' },
  { app: 'Blown Film (high output)', range: '15–40%', note: 'Use FMPE-1075 for best processability at high dosage rates' },
  { app: 'Cast Film', range: '10–30%', note: 'Check optical properties at each dosage increment' },
  { app: 'Injection Moulding', range: '5–20%', note: 'Lower dosage — monitor impact strength and surface finish' },
  { app: 'Extrusion Coating', range: '10–25%', note: 'Ensure line speed and melt temperature are appropriate' },
  { app: 'Agricultural Film', range: '10–25%', note: 'Combine with UV stabiliser additive MB for outdoor applications' },
]

const SPEC_CARD = [
  { key: 'Base Mineral', val: 'Calcium Carbonate (CaCO₃)' },
  { key: 'Carrier Resin', val: 'LDPE / LLDPE / HDPE' },
  { key: 'CaCO₃ Loading', val: '70% · 75% · 80%' },
  { key: 'Melt Flow Index', val: '2–4 g/10min (190°C/2.16kg)' },
  { key: 'Moisture Content', val: '< 0.3%' },
  { key: 'Colour', val: 'White / Off-white' },
  { key: 'Packaging', val: '25 kg PP bags · 500–1000 kg FIBC' },
  { key: 'Origin', val: '6th of October, Egypt' },
]

const FMPE_INDUSTRIES = [
  { icon: ShoppingBag, name: 'Packaging & Flexible Film', href: '/industries/packaging', desc: 'Blown film bags, FFS film, stretch wrap, and general PE packaging. FMPE reduces raw material cost while maintaining tensile strength and seal integrity.', tags: ['Blown Film', 'FFS Film', 'Stretch Wrap'] },
  { icon: Sprout, name: 'Agriculture', href: '/industries/agriculture', desc: 'Greenhouse covers, mulch film, silage wrap, and irrigation tubes. FMPE combined with UV additive masterbatch gives optimal cost and outdoor performance.', tags: ['Greenhouse Film', 'Mulch Film', 'Silage Wrap'] },
  { icon: HardHat, name: 'Construction & Sheeting', desc: 'Construction barrier film, damp-proof membranes, and geomembrane sheets. High CaCO₃ loading improves stiffness without adding weight.', tags: ['Barrier Film', 'DPM', 'Geomembrane'] },
  { icon: Home, name: 'Consumer Goods', desc: 'Household film products, carrier bags, and bin liners. FMPE delivers the cost reduction and opacity needed for high-volume commodity applications.', tags: ['Carrier Bags', 'Bin Liners', 'Household Film'] },
]

export default function FMPEPage() {
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'FMPE Series', parent: 'Products', parentHref: '/#products' }}
        badge="IN-HOUSE MANUFACTURED"
        badgeColor="#D4840A"
        title="PE Filler Masterbatch"
        titleAccent="FMPE Series"
        sub="CaCO₃-based filler masterbatch on polyethylene carrier — produced at our 6th of October facility. Three grades for blown film, cast film, extrusion, and injection moulding."
        visual={{
          bg: 'linear-gradient(145deg, #1a0900 0%, #3d1e00 35%, #6b3700 70%, #4a2800 100%)',
          dots: 'rgba(212,132,10,0.18)',
          symbol: 'CaCO₃',
          accent: '#D4840A',
          chip: 'FMPE SERIES',
          stat: { n: '70–80%', label: 'CaCO₃ Loading' },
        }}
        cta={{
          primary: { label: 'Request a Quote', href: '#quote-form' },
          secondary: { label: 'View Grades', href: '#grades' },
        }}
      />

      {/* Grade comparison */}
      <section style={{ background: '#F5F7FA', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={tableRef}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={tableInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.35)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >Grade Comparison</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={tableInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 40, lineHeight: 1.1, color: '#1a2744' }}
            >FMPE Series — All Grades</motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {GRADES.map((g, i) => (
              <motion.div key={g.code}
                initial={{ opacity: 0, y: 24 }} animate={tableInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{ background: '#fff', border: '1px solid rgba(26,39,68,0.1)', borderRadius: 14, padding: '24px', transition: 'all 0.2s', cursor: 'default', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                whileHover={{ borderColor: 'rgba(212,132,10,0.35)', y: -3 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, color: '#1a2744', marginBottom: 2 }}>{g.code}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(26,39,68,0.4)', fontWeight: 600 }}>PE Carrier</div>
                  </div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 26, fontWeight: 900, color: '#D4840A' }}>{g.loading}</div>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(26,39,68,0.6)', lineHeight: 1.65, marginBottom: 18 }}>{g.desc}</p>
                {[['Dosage Range', g.dosage], ['MFI (190°C)', g.mfi], ['Applications', g.apps]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(26,39,68,0.08)', fontSize: 12 }}>
                    <span style={{ color: 'rgba(26,39,68,0.4)' }}>{k}</span>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#2B8DD0', fontSize: 11, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages + Dosage */}
      <section style={{ background: '#141B3E', borderTop: '1px solid rgba(255,255,255,0.09)', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16, display: 'inline-block' }}>Technical Advantages</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: 28, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#FFFFFF' }}>Why FMPE Series</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ADVANTAGES.map(a => (
                <div key={a} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.09)', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16, display: 'inline-block' }}>Dosage Guidelines</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: 28, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#FFFFFF' }}>By Application</h2>
            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, overflow: 'hidden' }}>
              {DOSAGE.map((d, i) => (
                <div key={d.app} style={{ padding: '16px 20px', borderBottom: i < DOSAGE.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>{d.app}</span>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 900, color: '#D4840A' }}>{d.range}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section style={{ background: '#141B3E', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Industries</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>Where FMPE Filler Masterbatch Is Used</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>FMPE grades are used across the full range of PE film and extrusion applications — wherever CaCO₃ loading delivers cost and performance advantages.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {FMPE_INDUSTRIES.map(ind => {
              const Tag = ind.href ? 'a' : 'div'
              return (
                <Tag key={ind.name} href={ind.href} style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '24px', textDecoration: 'none', display: 'block', cursor: ind.href ? 'pointer' : 'default', transition: 'border-color 0.2s' }}
                  className={ind.href ? 'ind-link' : undefined}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(43,141,208,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <ind.icon size={20} strokeWidth={1.5} color="#2B8DD0" />
                  </div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, marginBottom: 8, color: '#fff' }}>{ind.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{ind.desc}</div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {ind.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(43,141,208,0.12)', borderRadius: 4, color: '#2B8DD0', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{t}</span>)}
                  </div>
                </Tag>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA + Related */}
      <section style={{ background: '#23447A', padding: '88px 48px', borderTop: '1px solid rgba(255,255,255,0.09)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div id="quote-form">
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 12 }}>Get a Quote</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em', color: '#fff' }}>Request pricing for FMPE Series.</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 20 }}>Fill in the form and we'll send a tailored quote within 24 hours.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {['FMPE-1070, 1075, and 1080 all available from stock', 'COA provided with every shipment', 'Technical support during your trial period', 'Datasheet (TDS) sent on request'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  <CheckCircle2 size={14} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <QuoteForm
              products={FMPE_PRODUCTS}
              defaultProduct={FMPE_PRODUCTS[0].value}
              applications={FMPE_APPLICATIONS}
              step1Title="Which FMPE grade do you need?"
              step1Sub="Select a grade or tell us your application and we'll recommend one."
            />
          </div>
          <div style={{ background: '#141B3E', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: '36px' }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Related Products</div>
            {[
              { name: 'FMPP Series', sub: 'PP Filler Masterbatch · 70–80% CaCO₃', href: '/fmpp', badge: 'MANUFACTURED' },
              { name: 'Colour Masterbatch', sub: 'Full spectrum · RAL / Pantone matching', href: '/color-masterbatch', badge: 'CORAPLAST' },
              { name: 'Additive Masterbatch', sub: 'UV stabilisers · Slip · Antiblock', href: '/#products', badge: 'CORAPLAST' },
            ].map(p => (
              <Link key={p.name} to={p.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.09)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{p.sub}</div>
                </div>
                <ArrowRight size={16} color="rgba(0,0,0,0.2)" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } section { padding: 56px 20px !important; } } .ind-link:hover { border-color: rgba(43,141,208,0.4) !important; }`}</style>
    </>
  )
}
