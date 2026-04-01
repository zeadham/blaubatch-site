import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Sprout, Wrench, Zap, Package } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import QuoteForm from '../components/shared/QuoteForm'
import IsoBadges from '../components/shared/IsoBadges'
import Footer from '../components/Footer'

const GRADES = [
  { code: 'AMB-UV10', carrier: 'LDPE / LLDPE', type: 'UV Stabiliser', app: 'Mulch film, greenhouse film, outdoor packaging', note: 'UV Stabiliser' },
  { code: 'AMB-SA03', carrier: 'LDPE / PP', type: 'Erucamide', app: 'Blown film, bags, flexible packaging', note: 'Slip Agent' },
  { code: 'AMB-AB05', carrier: 'LDPE', type: 'Silica-based', app: 'Film, packaging, food contact bags', note: 'Antiblock' },
  { code: 'AMB-AS10', carrier: 'LDPE / PP', type: 'Permanent', app: 'Electronic packaging, technical film', note: 'Anti-static' },
  { code: 'AMB-OB05', carrier: 'LDPE / PP', type: 'OB-1 / OB-2', app: 'Film, fibre, injection moulding', note: 'Optical Brightener' },
  { code: 'AMB-FR20', carrier: 'LDPE', type: 'Halogen-free', app: 'Cable jacketing, insulation, conduit', note: 'Flame Retardant' },
]

const FEATURES = [
  'HALS-based UV stabilisers rated for 10+ year outdoor performance',
  'Slip and antiblock agents for film-to-film release and anti-stick',
  'Permanent anti-static grades — does not wash off or migrate',
  'Optical brighteners for high-whiteness and fluorescence in film & fibre',
  'Halogen-free flame retardant grades for cable and technical applications',
  'All grades supplied with TDS, CoA, and technical dosage guidance',
]

const AMB_PRODUCTS = [
  { name: 'UV Stabiliser (AMB-UV)', sub: 'HALS-based · Outdoor & agricultural', value: 'Additive MB UV Stabiliser' },
  { name: 'Slip / Antiblock (AMB-SA/AB)', sub: 'Erucamide slip · Silica antiblock', value: 'Additive MB Slip/Antiblock' },
  { name: 'Anti-static (AMB-AS)', sub: 'Permanent grade · Film & packaging', value: 'Additive MB Anti-static' },
  { name: 'Optical Brightener (AMB-OB)', sub: 'OB-1/OB-2 · Film, fibre, moulding', value: 'Additive MB Optical Brightener' },
  { name: 'Flame Retardant (AMB-FR)', sub: 'Halogen-free · Cable & insulation', value: 'Additive MB Flame Retardant' },
  { name: 'Not sure yet', sub: "We'll recommend the right additive", value: 'Not sure — need recommendation' },
]

const AMB_APPLICATIONS = ['Blown Film', 'Agricultural Film', 'Greenhouse Film', 'Cable Jacketing', 'Electronic Packaging', 'Fibre & Yarn', 'Injection Moulding', 'Non-woven']

const AMB_INDUSTRIES = [
  { icon: Sprout, name: 'Agriculture', href: '/industries/agriculture', desc: 'UV stabilisers (HALS-based) for greenhouse film, mulch, silage, and irrigation pipe. Blended with filler or white MB for complete performance packages.', tags: ['UV Stabiliser', 'Greenhouse', 'Mulch Film'] },
  { icon: Wrench, name: 'Pipes & Infrastructure', href: '/industries/pipes', desc: 'Antioxidants and thermal stabilisers for long-service-life PE and PP pipe systems. Ensures polymer stability through processing and service conditions.', tags: ['Antioxidants', 'Thermal Stab.', 'PE/PP Pipe'] },
  { icon: Zap, name: 'Cable & Wire', href: '/industries/wire-cable', desc: 'Flame retardant and UV-stable additive MB for cable jacketing, conduit, and insulation. Halogen-free flame retardant options available.', tags: ['Flame Retardant', 'UV Stable', 'Cable'] },
  { icon: Package, name: 'Packaging & Film', href: '/industries/packaging', desc: 'Slip and antiblock additives for blown film to control COF and prevent blocking. Antistatic MB for packaging of electronics and sensitive goods.', tags: ['Slip/Antiblock', 'Antistatic', 'Blown Film'] },
]

export default function AdditiveMBPage() {
  const specsRef = useRef(null)
  const specsInView = useInView(specsRef, { once: true, margin: '-60px' })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Additive Masterbatch', parent: 'Products', parentHref: '/#products' }}
        badge="CORAPLAST DISTRIBUTED"
        badgeColor="#2B8DD0"
        title="Additive Masterbatch"
        titleAccent="AMB Series"
        sub="Precision performance additives that extend product life, improve processing, and meet compliance requirements — UV stabilisers, slip, antiblock, anti-static, OB, and flame retardants."
        visual={{
          bg: 'linear-gradient(145deg, #020a18 0%, #061830 35%, #0d3060 70%, #1a50a0 100%)',
          dots: 'rgba(74,170,224,0.18)',
          symbol: 'AMB',
          accent: '#2B8DD0',
          chip: 'AMB SERIES',
          stat: { n: '6 types', label: 'Performance Additives' },
        }}
        cta={{
          primary: { label: 'Request a Quote', href: '#quote-form' },
          secondary: { label: 'View Grades', href: '#grades' },
        }}
      />

      {/* Grades table */}
      <section style={{ background: '#141B3E', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            ref={specsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Grade Reference</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>Available Grades</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>All grades supplied with TDS and CoA. Custom additive combinations and carrier systems available on request.</p>
            </div>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 130px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.09)', padding: '12px 20px' }}>
                {['Grade Code', 'Carrier', 'Active', 'Application', 'Type'].map(h => (
                  <div key={h} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{h}</div>
                ))}
              </div>
              {GRADES.map((g, i) => (
                <div key={g.code} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr 130px', padding: '14px 20px', borderBottom: i < GRADES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff' }}>{g.code}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.carrier}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, color: '#2B8DD0' }}>{g.type}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.app}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: g.note === 'UV Stabiliser' ? '#22C55E' : g.note === 'Flame Retardant' ? '#D4840A' : 'rgba(255,255,255,0.5)' }}>{g.note}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: '#23447A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
                  <CheckCircle2 size={15} color="#2B8DD0" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>

            <IsoBadges />
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section style={{ background: '#141B3E', padding: '72px 48px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Industries</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>Where Additive Masterbatch Is Used</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Additive masterbatch is used across every processing application — wherever performance enhancement beyond colour or filler is needed.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {AMB_INDUSTRIES.map(ind => {
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

      {/* Quote form */}
      <section id="quote-form" ref={formRef} style={{ background: '#141B3E', padding: '0 48px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Request a Quote</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>Get Additive Masterbatch Pricing</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Tell us your additive type, quantity, and application — we'll respond within 24 hours with pricing and samples if needed.</p>
          </motion.div>
          <QuoteForm
            products={AMB_PRODUCTS}
            defaultProduct="Additive MB UV Stabiliser"
            applications={AMB_APPLICATIONS}
            step1Title="Select Additive Type"
            step1Sub="Choose an additive grade or tell us your requirement"
          />
        </div>
        <style>{`@media(max-width:900px){ section { padding-left: 20px !important; padding-right: 20px !important; } } .ind-link:hover { border-color: rgba(43,141,208,0.4) !important; }`}</style>
      </section>

      <Footer />
    </>
  )
}
