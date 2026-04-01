import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const REASONS = [
  { num: '01', title: 'Manufacturer + Distributor — One Relationship', body: 'Filler MB in-house, full Coraplast range distributed. One supplier, one invoice, one technical contact.' },
  { num: '02', title: 'Full In-House Quality Control', body: 'Every batch tested — MFI, ash content, colour, dispersion — with TDS and CoA per shipment.' },
  { num: '03', title: 'Technical Partnership, Not Just Supply', body: 'We review your polymer type, processing conditions, and requirements to recommend the right grade.' },
  { num: '04', title: 'Reliable Supply Across MENA & Europe', body: 'Core grades in stock for immediate dispatch. Established trade lanes across 10+ countries.' },
  { num: '05', title: 'Custom Formulation Service', body: 'Bespoke CaCO₃ loading, carrier polymer, and additive package — from sample to production scale.' },
  { num: '06', title: 'Competitive & Transparent Pricing', body: 'Own-facility production, no intermediaries. Fast quote turnaround with flexible MOQ.' },
]

const TRUST_STATS = [
  { n: 'MENA', label: '& Europe' },
  { n: '5+', label: 'Product Lines' },
  { n: '25 kg', label: 'Bags & FIBC' },
]

export default function WhyUs() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="why" style={{ background: '#F5F7FA', padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

          <div>
            <div ref={headRef}>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
                  fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
                  border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
                }}
              >Why Blau Batch</motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.07 }}
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#1a2744' }}
              >The Single Source<br />Advantage</motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.14 }}
                style={{ fontSize: 15, color: 'rgba(26,39,68,0.6)', lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}
              >
                Manufacturing excellence, distribution reach, and technical expertise — one point of supply for reliability and consistency.
              </motion.p>
            </div>

            <div>
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.num}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', gap: 18, padding: '20px 0', borderBottom: '1px solid rgba(26,39,68,0.1)' }}
                >
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 900,
                    color: 'rgba(26,39,68,0.15)', flexShrink: 0, minWidth: 26, paddingTop: 2,
                    letterSpacing: '0.05em',
                  }}>{r.num}</div>
                  <div>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, marginBottom: 6, letterSpacing: '-0.01em', color: '#1a2744' }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(26,39,68,0.6)', lineHeight: 1.7 }}>{r.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'sticky', top: 88 }}
          >
            {/* Factory / facility image */}
            <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 16, position: 'relative', height: 240 }}>
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=400&fit=crop&auto=format"
                alt="Blau Batch manufacturing facility"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,39,68,0.7) 0%, transparent 60%)' }} />
              <div style={{
                position: 'absolute', bottom: 14, left: 16,
                fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
              }}>6th of October, Egypt — Production Facility</div>
            </div>

            <div style={{
              background: '#1a3562', border: '1px solid rgba(46,127,208,0.15)',
              borderRadius: 16, padding: '30px', marginBottom: 16,
            }}>
              <div style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                marginBottom: 22,
              }}>The Blau Batch Model</div>

              {[
                { n: '01', color: '#D4840A', label: 'MANUFACTURE', sub: 'Own production — full process control, QC, and traceability.' },
                { n: '02', color: '#2B8DD0', label: 'DISTRIBUTE', sub: 'Authorised Coraplast distributor across MENA and Europe.' },
                { n: '03', color: '#2B8DD0', label: 'PARTNER', sub: 'Technical consultation and custom formulation development.' },
                { n: '04', color: '#22C55E', label: 'INNOVATE', sub: 'New grade development and service improvements.' },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: `${item.color}18`, border: `1px solid ${item.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 11, color: item.color,
                  }}>{item.n}</div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: item.color, marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px',
              background: 'rgba(26,39,68,0.08)', borderRadius: 10, overflow: 'hidden',
              border: '1px solid rgba(26,39,68,0.1)',
            }}>
              {TRUST_STATS.map(s => (
                <div key={s.label} style={{ background: '#fff', padding: '16px 10px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, color: '#2B8DD0' }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: 'rgba(26,39,68,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 16, background: '#fff', border: '1px solid rgba(26,39,68,0.1)',
              borderRadius: 12, padding: '20px 22px',
            }}>
              {['Batch-level QC on every run', 'TDS & CoA with every shipment', 'Full raw material traceability', 'Fast enquiry-to-quote turnaround', 'Trial quantities available'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(26,39,68,0.08)' }}>
                  <CheckCircle2 size={14} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(26,39,68,0.7)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #why > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #why > div > div > div:last-child { position: static !important; }
          #why { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}
