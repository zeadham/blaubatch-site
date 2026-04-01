import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ShoppingBag, Sprout, Home, Layers } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import QuoteForm from '../components/shared/QuoteForm'
import IsoBadges from '../components/shared/IsoBadges'
import Footer from '../components/Footer'

const GRADES = [
  { code: 'WMB-PE20', carrier: 'LDPE / LLDPE', tio2: '20%', app: 'Blown film, cast film, general packaging', note: 'Standard' },
  { code: 'WMB-PE30', carrier: 'LDPE / LLDPE', tio2: '30%', app: 'High-opacity film, lamination', note: 'High Opacity' },
  { code: 'WMB-PP20', carrier: 'PP Homopolymer', tio2: '20%', app: 'Raffia, woven bags, non-woven', note: 'Standard' },
  { code: 'WMB-PP30', carrier: 'PP Homopolymer', tio2: '30%', app: 'BOPP film, thermoforming', note: 'High Opacity' },
  { code: 'WMB-FC20', carrier: 'LDPE / PP', tio2: '20%', app: 'Food packaging, direct contact', note: 'Food Grade' },
]

const FEATURES = [
  'TiO₂ rutile grade — superior opacity and brightness',
  'PE and PP carrier systems for wide compatibility',
  'Food-contact compliant grades (EU 10/2011 & FDA)',
  'Consistent blue-white tones with high CIE whiteness index',
  'Excellent dispersion — no agglomerates or streaks',
  'Available in standard 25 kg bags and 500 kg FIBC',
]

const WMB_PRODUCTS = [
  { name: 'WMB-PE Series', sub: 'LDPE/LLDPE carrier · Blown & cast film', value: 'White MB PE Series' },
  { name: 'WMB-PP Series', sub: 'PP Homopolymer carrier · Raffia & film', value: 'White MB PP Series' },
  { name: 'Food-Contact Grade', sub: 'EU 10/2011 & FDA compliant', value: 'White MB Food-Contact Grade' },
  { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
]

const WMB_APPLICATIONS = ['Blown Film', 'Cast Film', 'Injection Moulding', 'Raffia / Woven', 'BOPP Film', 'Food Packaging', 'Thermoforming', 'Non-woven']

const WMB_INDUSTRIES = [
  { icon: ShoppingBag, name: 'Packaging & Flexible Film', href: '/industries/packaging', desc: 'White food packaging, lamination film, stand-up pouches, and retail bags. White MB delivers the opacity and brightness required for branded packaging.', tags: ['Food Packaging', 'Stand-Up Pouches', 'Lamination'] },
  { icon: Sprout, name: 'Agriculture', href: '/industries/agriculture', desc: 'White mulch film for soil temperature control, tunnel covers, and greenhouse film. Provides reflectivity and UV performance required for agricultural applications.', tags: ['Mulch Film', 'Tunnel Covers', 'Greenhouse'] },
  { icon: Home, name: 'Consumer Goods', desc: 'White containers, caps, closures, and household products in PE and PP. White MB ensures batch-consistent whiteness across injection moulded and blown parts.', tags: ['Containers', 'Caps & Closures', 'Household'] },
  { icon: Layers, name: 'Non-Woven', href: '/industries/textiles', desc: 'White hygiene nonwovens for diapers, wipes, and medical textiles. Food-contact and medical-grade white MB available on request.', tags: ['Hygiene NW', 'Medical Textile', 'Spunbond'] },
]

export default function WhiteMBPage() {
  const specsRef = useRef(null)
  const specsInView = useInView(specsRef, { once: true, margin: '-60px' })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'White Masterbatch', parent: 'Products', parentHref: '/#products' }}
        badge="CORAPLAST DISTRIBUTED"
        badgeColor="#2B8DD0"
        title="White Masterbatch"
        titleAccent="WMB Series"
        sub="TiO₂-based white concentrates delivering high opacity, brilliant blue-white tone, and consistent batch-to-batch performance — in PE and PP carrier systems."
        visual={{
          bg: 'linear-gradient(145deg, #5a6a7a 0%, #8aa0b8 35%, #b8d0e4 70%, #d4e8f4 100%)',
          dots: 'rgba(255,255,255,0.35)',
          symbol: 'TiO₂',
          accent: '#AACCDD',
          chip: 'WMB SERIES',
          stat: { n: '20–30%', label: 'TiO₂ Loading' },
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
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>All grades supplied with TDS and CoA. Custom TiO₂ loadings and carrier combinations available on request.</p>
            </div>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, overflow: 'hidden', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px 1fr 100px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.09)', padding: '12px 20px' }}>
                {['Grade Code', 'Carrier', 'TiO₂', 'Application', 'Type'].map(h => (
                  <div key={h} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{h}</div>
                ))}
              </div>
              {GRADES.map((g, i) => (
                <div key={g.code} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 80px 1fr 100px', padding: '14px 20px', borderBottom: i < GRADES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff' }}>{g.code}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.carrier}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#2B8DD0' }}>{g.tio2}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{g.app}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: g.note === 'Food Grade' ? '#22C55E' : '#D4840A' }}>{g.note}</div>
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
      <section style={{ background: '#141B3E', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Industries</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>Where White Masterbatch Is Used</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>White masterbatch is a core component across packaging, agriculture, and consumer goods — anywhere high opacity, whiteness, and TiO₂ performance are required.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {WMB_INDUSTRIES.map(ind => {
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
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>Get White Masterbatch Pricing</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Tell us your grade, quantity, and application — we'll respond within 24 hours with pricing and samples if needed.</p>
          </motion.div>
          <QuoteForm
            products={WMB_PRODUCTS}
            defaultProduct="White MB PE Series"
            applications={WMB_APPLICATIONS}
            step1Title="Select White MB Grade"
            step1Sub="Choose a series or tell us your application"
          />
        </div>
        <style>{`@media(max-width:900px){ section { padding-left: 20px !important; padding-right: 20px !important; } } .ind-link:hover { border-color: rgba(43,141,208,0.4) !important; }`}</style>
      </section>

      <Footer />
    </>
  )
}
