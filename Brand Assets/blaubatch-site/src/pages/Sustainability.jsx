import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Leaf, Recycle, BarChart3, Globe, Shield, Zap } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import Footer from '../components/Footer'

const PILLARS = [
  {
    icon: <Leaf size={22} color="#22C55E" />,
    title: 'Environmental Commitment',
    color: '#22C55E',
    points: [
      'ISO 14001:2015 certified environmental management system',
      'Continuous reduction of production waste and energy consumption',
      'Responsible raw material sourcing from verified supply chains',
      'Factory water recycling and zero-liquid-discharge practices',
    ],
  },
  {
    icon: <Recycle size={22} color="#2B8DD0" />,
    title: 'Waste Reduction Practices',
    color: '#2B8DD0',
    points: [
      'In-process regrind integration — production trim is reincorporated, not discarded',
      'Closed-loop packaging — return programs for 500 kg FIBCs',
      'Batch optimisation to minimise purging and colour changeover waste',
      'Lean production scheduling to eliminate overrun and dead stock',
    ],
  },
  {
    icon: <Globe size={22} color="#D4840A" />,
    title: 'Recyclable & Compliant Formulations',
    color: '#D4840A',
    points: [
      'Mono-material masterbatch grades for HDPE and PP recyclate streams',
      'Food-contact grades meeting EU Regulation 10/2011 and FDA 21 CFR',
      'Heavy-metal-free pigment systems — no cadmium, lead, or chromate VI',
      'Halogen-free flame retardant masterbatch for cable and electronic applications',
    ],
  },
]

const ESG_METRICS = [
  { n: 'ISO 14001', label: 'Environmental Management', color: '#22C55E' },
  { n: 'Heavy-metal\nfree', label: 'All pigment systems', color: '#2B8DD0' },
  { n: 'Halogen\nfree', label: 'Flame retardant grades', color: '#D4840A' },
  { n: 'EU 10/2011', label: 'Food-contact compliance', color: '#22C55E' },
]

const COMPLIANCE = [
  { label: 'EU Regulation 10/2011', desc: 'Plastic materials and articles intended to contact food', badge: 'FOOD CONTACT' },
  { label: 'FDA 21 CFR', desc: 'United States food-contact compliance for applicable grades', badge: 'FOOD CONTACT' },
  { label: 'RoHS / REACH', desc: 'Restriction of hazardous substances in pigments and carriers', badge: 'CHEMICAL SAFETY' },
  { label: 'ISO 14001:2015', desc: 'Certified environmental management system at our facility', badge: 'CERTIFIED' },
  { label: 'ISO 9001:2015', desc: 'Quality management system — consistent, traceable production', badge: 'CERTIFIED' },
  { label: 'SVHC-Free', desc: 'No Substances of Very High Concern in standard formulations', badge: 'REACH' },
]

export default function SustainabilityPage() {
  const pillarsRef = useRef(null)
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-60px' })
  const complianceRef = useRef(null)
  const complianceInView = useInView(complianceRef, { once: true, margin: '-60px' })
  const metricsRef = useRef(null)
  const metricsInView = useInView(metricsRef, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Sustainability', parent: 'Company' }}
        badge="ESG & ENVIRONMENT"
        badgeColor="#22C55E"
        title="Responsible Masterbatch"
        titleAccent="For a Circular Economy"
        sub="European and global buyers increasingly require verifiable ESG commitments. Blau Batch delivers fully compliant, recyclable masterbatch formulations backed by certified environmental management practices."
        bgGradient="linear-gradient(135deg, rgba(2,20,8,0.9) 0%, rgba(10,64,32,0.85) 50%, rgba(5,40,16,0.9) 100%)"
        cta={{
          primary: { label: 'Request Compliance Docs', href: '/contact#quote-form' },
          secondary: { label: 'View Certifications', href: '#compliance' },
        }}
      />

      {/* ESG Metrics bar */}
      <section ref={metricsRef} style={{ background: '#0d1829', borderBottom: '1px solid rgba(34,197,94,0.12)', padding: '40px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {ESG_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ textAlign: 'center', padding: '16px 8px' }}
              >
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
                  fontSize: 'clamp(16px, 2vw, 22px)', color: m.color,
                  letterSpacing: '-0.01em', marginBottom: 6, whiteSpace: 'pre-line', lineHeight: 1.2,
                }}>{m.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section style={{ background: '#141B3E', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            ref={pillarsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Our Approach</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, color: '#fff' }}>Three Pillars of Responsible Production</h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 560 }}>
                Our environmental programme covers the full production lifecycle — from raw material selection through manufacturing, packaging, and end-of-life recyclability of the final plastic article.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 28 }}
                  animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                  style={{
                    background: '#23447A',
                    border: `1px solid ${pillar.color}22`,
                    borderRadius: 16, padding: '28px 24px',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${pillar.color}15`,
                    border: `1px solid ${pillar.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                  }}>{pillar.icon}</div>
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.3 }}>{pillar.title}</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {pillar.points.map(pt => (
                      <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckCircle2 size={14} color={pillar.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What this means for buyers */}
      <section style={{ background: '#0d1829', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>For European Buyers</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 16, color: '#fff', lineHeight: 1.15 }}>ESG Compliance You Can Document</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 24 }}>
                European importers face increasing pressure under the CSRD, REACH, and packaging regulations. We supply full compliance documentation with every shipment — CoA, TDS, SVHC declarations, and material safety data — so your procurement and ESG teams can close quickly.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32 }}>
                Our food-contact and recyclable grades are engineered to meet EU circular economy targets, with mono-material formulations that support sortation and mechanical recycling.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: <Shield size={15} color="#22C55E" />, text: 'SVHC declarations provided for all grades on request' },
                  { icon: <BarChart3 size={15} color="#2B8DD0" />, text: 'Full supply chain traceability documentation' },
                  { icon: <Zap size={15} color="#D4840A" />, text: 'Rapid response — compliance pack within 48 hours' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9 }}>
                    {item.icon}
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(145deg, #0d2d0f, #1a4a1c)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 20, padding: '36px 32px',
              }}
            >
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', marginBottom: 20 }}>Recyclable Grades at a Glance</div>
              {[
                { grade: 'FMPE / FMPP Series', note: 'CaCO₃ filler — compatible with PE/PP mechanical recycling streams', tag: 'RECYCLABLE' },
                { grade: 'WMB-PE / WMB-PP', note: 'TiO₂ white — stays in polymer matrix during recycling; sortation compatible', tag: 'RECYCLABLE' },
                { grade: 'BMB-PE Series', note: 'Carbon black — designed for closed-loop agricultural and packaging recycle', tag: 'RECYCLABLE' },
                { grade: 'AMB-FR20', note: 'Halogen-free flame retardant — no toxic combustion by-products', tag: 'HALOGEN-FREE' },
                { grade: 'WMB-FC20', note: 'Food-contact grade — EU 10/2011 & FDA compliant', tag: 'FOOD CONTACT' },
              ].map((item, i) => (
                <div key={i} style={{
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{item.grade}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.note}</div>
                  </div>
                  <span style={{
                    flexShrink: 0, fontSize: 8, fontWeight: 800, letterSpacing: '0.07em',
                    padding: '3px 8px', borderRadius: 4,
                    background: item.tag === 'FOOD CONTACT' ? 'rgba(34,197,94,0.15)' : item.tag === 'HALOGEN-FREE' ? 'rgba(212,132,10,0.15)' : 'rgba(74,170,224,0.15)',
                    color: item.tag === 'FOOD CONTACT' ? '#22C55E' : item.tag === 'HALOGEN-FREE' ? '#D4840A' : '#2B8DD0',
                    border: `1px solid ${item.tag === 'FOOD CONTACT' ? 'rgba(34,197,94,0.25)' : item.tag === 'HALOGEN-FREE' ? 'rgba(212,132,10,0.25)' : 'rgba(74,170,224,0.25)'}`,
                    fontFamily: 'Montserrat, sans-serif',
                  }}>{item.tag}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance table */}
      <section id="compliance" ref={complianceRef} style={{ background: '#141B3E', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={complianceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Standards & Certifications</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8, color: '#fff' }}>What We Can Document</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Full compliance packs are available on request. Contact us with your specific standard or regulatory requirement.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {COMPLIANCE.map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 16,
                  padding: '18px 20px', background: '#23447A',
                  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
                }}>
                  <CheckCircle2 size={16} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff' }}>{item.label}</span>
                      <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, background: 'rgba(34,197,94,0.12)', color: '#22C55E', fontFamily: 'Montserrat, sans-serif', border: '1px solid rgba(34,197,94,0.2)' }}>{item.badge}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0d1829, #0d1829)', padding: '80px 48px', borderTop: '1px solid rgba(34,197,94,0.15)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>Get Compliance Documentation</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>Need ESG, REACH, or Food-Contact Docs?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 32 }}>
              Tell us your grade, volume, and compliance requirement — we'll send the full documentation pack within 48 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact#quote-form" style={{
                padding: '14px 28px', background: '#22C55E', color: '#fff',
                borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#16a34a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#22C55E'; e.currentTarget.style.transform = 'none' }}
              >Request Compliance Pack →</a>
              <a href="/resources" style={{
                padding: '14px 24px', background: 'transparent', color: 'rgba(255,255,255,0.75)',
                borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 700, letterSpacing: '0.06em',
                border: '1px solid rgba(255,255,255,0.18)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >Technical Resources</a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`@media(max-width:900px){
        section { padding-left: 20px !important; padding-right: 20px !important; }
        section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
      }`}</style>
    </>
  )
}
