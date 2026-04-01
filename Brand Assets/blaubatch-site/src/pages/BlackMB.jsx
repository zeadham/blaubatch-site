import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Sprout, Wrench, Zap, Package } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import QuoteForm from '../components/shared/QuoteForm'
import IsoBadges from '../components/shared/IsoBadges'
import Footer from '../components/Footer'

const GRADES = [
  { code: 'BMB-PE25', carrier: 'LDPE / LLDPE', cb: '25%', app: 'Blown film, cast film, general packaging', note: 'Standard' },
  { code: 'BMB-PE40', carrier: 'LDPE / LLDPE', cb: '40%', app: 'Mulch film, agricultural applications', note: 'UV Stable' },
  { code: 'BMB-PP25', carrier: 'PP Homopolymer', cb: '25%', app: 'Raffia, non-woven, woven sacks', note: 'Standard' },
  { code: 'BMB-PIPE', carrier: 'HDPE', cb: '2.5% (in resin)', app: 'PE100 pipes, fittings, pressure pipe', note: 'Pipe Grade' },
  { code: 'BMB-CAB', carrier: 'LDPE', cb: '40%', app: 'Cable jacketing, conduit, insulation', note: 'Cable Grade' },
]

const FEATURES = [
  'High-structure carbon black for superior UV protection',
  'PE and PP carrier systems — broad process compatibility',
  'UV-stable grades rated for 10+ year outdoor performance',
  'Pipe-grade concentrate meeting PE100 colour requirements',
  'Cable-grade with excellent dispersion and volume resistivity',
  'Tight batch-to-batch colour consistency — jet black, no grey tone',
]

const BMB_PRODUCTS = [
  { name: 'BMB-PE Series', sub: 'PE carrier · Film & general applications', value: 'Black MB PE Series' },
  { name: 'BMB-PP Series', sub: 'PP carrier · Raffia, woven, non-woven', value: 'Black MB PP Series' },
  { name: 'Pipe Grade (BMB-PIPE)', sub: 'HDPE carrier · PE100 pipe systems', value: 'Black MB Pipe Grade' },
  { name: 'Cable Grade (BMB-CAB)', sub: 'LDPE carrier · Cable jacketing', value: 'Black MB Cable Grade' },
  { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
]

const BMB_APPLICATIONS = ['Blown Film', 'Agricultural Film', 'Pipe & Fittings', 'Cable Jacketing', 'Conduit', 'Raffia / Woven', 'Non-woven', 'Injection Moulding']

const BMB_INDUSTRIES = [
  { icon: Sprout, name: 'Agriculture', href: '/industries/agriculture', desc: 'Black mulch film for weed suppression and soil moisture retention, silage stretch film, and UV-stable irrigation pipe. BMB-PE40 is rated for extended outdoor exposure.', tags: ['Mulch Film', 'Silage Film', 'Irrigation Pipe'] },
  { icon: Wrench, name: 'Pipes & Infrastructure', href: '/industries/pipes', desc: 'PE100 water mains, gas distribution pipes, and sewage systems. BMB-PIPE meets the specific carbon black dispersion and loading requirements for pressure pipe systems.', tags: ['PE100 Pipe', 'Gas Pipe', 'Water Mains'] },
  { icon: Zap, name: 'Cable & Wire', href: '/industries/wire-cable', desc: 'Cable jacketing, conduit, and insulation for power and telecommunications. BMB-CAB provides the volume resistivity and UV stability required for outdoor cable systems.', tags: ['Cable Jacketing', 'Conduit', 'Insulation'] },
  { icon: Package, name: 'Packaging & Film', href: '/industries/packaging', desc: 'Black packaging film, barrier bags, and agricultural packaging. Black MB delivers deep jet-black colour with no grey tone across blown and cast film lines.', tags: ['Black Film', 'Barrier Bags', 'Cast Film'] },
]

export default function BlackMBPage() {
  const specsRef = useRef(null)
  const specsInView = useInView(specsRef, { once: true, margin: '-60px' })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Black Masterbatch', parent: 'Products', parentHref: '/#products' }}
        badge="CORAPLAST DISTRIBUTED"
        badgeColor="#2B8DD0"
        title="Black Masterbatch"
        titleAccent="BMB Series"
        sub="High-structure carbon black concentrates engineered for jet-black depth and 10+ year UV protection — for pipes, agricultural film, cable jacketing, and outdoor applications."
        visual={{
          bg: 'linear-gradient(145deg, #000000 0%, #080808 35%, #101010 70%, #060606 100%)',
          dots: 'rgba(255,255,255,0.04)',
          symbol: 'CB',
          accent: '#64748B',
          chip: 'BMB SERIES',
          stat: { n: '10+ yrs', label: 'UV Protection' },
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
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>All grades supplied with TDS and CoA. Custom carbon black loadings and speciality formulations available on request.</p>
            </div>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px 1fr 110px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.09)', padding: '12px 20px' }}>
                {['Grade Code', 'Carrier', 'CB%', 'Application', 'Type'].map(h => (
                  <div key={h} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{h}</div>
                ))}
              </div>
              {GRADES.map((g, i) => (
                <div key={g.code} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px 1fr 110px', padding: '14px 20px', borderBottom: i < GRADES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff' }}>{g.code}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.carrier}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#2B8DD0' }}>{g.cb}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.app}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: g.note === 'UV Stable' ? '#22C55E' : g.note === 'Pipe Grade' || g.note === 'Cable Grade' ? '#D4840A' : 'rgba(255,255,255,0.5)' }}>{g.note}</div>
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
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>Where Black Masterbatch Is Used</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Black masterbatch serves critical UV protection and aesthetic roles across agriculture, infrastructure, cable, and packaging — wherever deep, consistent black is required.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {BMB_INDUSTRIES.map(ind => {
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
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>Get Black Masterbatch Pricing</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Tell us your grade, quantity, and application — we'll respond within 24 hours with pricing and samples if needed.</p>
          </motion.div>
          <QuoteForm
            products={BMB_PRODUCTS}
            defaultProduct="Black MB PE Series"
            applications={BMB_APPLICATIONS}
            step1Title="Select Black MB Grade"
            step1Sub="Choose a series or tell us your application"
          />
        </div>
        <style>{`@media(max-width:900px){ section { padding-left: 20px !important; padding-right: 20px !important; } } .ind-link:hover { border-color: rgba(43,141,208,0.4) !important; }`}</style>
      </section>

      <Footer />
    </>
  )
}
