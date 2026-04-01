import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FlaskConical, Shield, Zap, Globe, Wrench, DollarSign } from 'lucide-react'

const REASONS = [
  { icon: Shield, title: 'One Relationship', body: 'Filler MB in-house, full Coraplast range distributed. One supplier, one invoice.', color: '#2B8DD0' },
  { icon: FlaskConical, title: 'In-House QC', body: 'Every batch tested — MFI, ash content, colour, dispersion — TDS and CoA per shipment.', color: '#22C55E' },
  { icon: Wrench, title: 'Technical Partner', body: 'We review your polymer, conditions, and requirements to recommend the right grade.', color: '#D4840A' },
  { icon: Globe, title: 'MENA & Europe', body: 'Core grades in stock. Established trade lanes across 10+ countries.', color: '#2B8DD0' },
  { icon: Zap, title: 'Custom Formulation', body: 'Bespoke CaCO₃ loading, carrier, and additive package — sample to production.', color: '#F472B6' },
  { icon: DollarSign, title: 'Transparent Pricing', body: 'Own-facility production, no intermediaries. Fast quotes with flexible MOQ.', color: '#22C55E' },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why" style={{ background: '#F5F7FA', padding: '96px 48px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
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
          >The Single Source Advantage</motion.h2>
        </div>

        {/* Center logo with floating points around it */}
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', minHeight: 500 }}>

          {/* Center logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              zIndex: 2,
            }}
          >
            <img src="/logo-textonly-navy.png" alt="Blau Batch" style={{ height: 48, objectFit: 'contain' }} />
            <div style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,39,68,0.4)',
            }}>
              Full-Spectrum Masterbatch
            </div>
          </motion.div>

          {/* Connecting lines from center — decorative circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 220, height: 220, borderRadius: '50%',
              border: '1px dashed rgba(46,127,208,0.2)',
              zIndex: 1,
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 360, height: 360, borderRadius: '50%',
              border: '1px dashed rgba(46,127,208,0.1)',
              zIndex: 0,
            }}
          />

          {/* Floating point cards positioned around the center */}
          {REASONS.map((r, i) => {
            const Icon = r.icon
            // Position cards in a circle layout — 3 on left, 3 on right
            const positions = [
              { top: '2%', left: '0%' },      // top-left
              { top: '38%', left: '-3%' },     // mid-left
              { top: '74%', left: '0%' },      // bottom-left
              { top: '2%', right: '0%' },      // top-right
              { top: '38%', right: '-3%' },    // mid-right
              { top: '74%', right: '0%' },     // bottom-right
            ]
            const pos = positions[i]

            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', ...pos,
                  width: 'calc(38% - 16px)',
                  background: '#fff',
                  border: '1px solid rgba(26,39,68,0.08)',
                  borderRadius: 14, padding: '20px 20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  zIndex: 3,
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: `${r.color}12`, border: `1px solid ${r.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={r.color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#1a2744', marginBottom: 4, letterSpacing: '-0.01em' }}>{r.title}</h3>
                    <p style={{ fontSize: 12, color: 'rgba(26,39,68,0.55)', lineHeight: 1.6 }}>{r.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #why > div > div:last-child {
            display: grid !important;
            grid-template-columns: 1fr !important;
            position: static !important;
            min-height: auto !important;
            gap: 12px !important;
          }
          #why > div > div:last-child > div {
            position: static !important;
            width: 100% !important;
            transform: none !important;
          }
          #why > div > div:last-child > div[style*="border-radius: 50%"] { display: none !important; }
          #why > div > div:last-child > div:first-child { display: none !important; }
          #why { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}
