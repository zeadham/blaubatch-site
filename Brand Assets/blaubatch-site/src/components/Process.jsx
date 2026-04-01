import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, FlaskConical, Package, Truck, HeadphonesIcon } from 'lucide-react'

const STEPS = [
  { icon: MessageSquare, n: '01', title: 'Enquiry & Specification', body: 'Send your polymer type, application, and volume. Quote within 24 hours.', color: '#2B8DD0' },
  { icon: FlaskConical, n: '02', title: 'Formulation & Sample', body: 'Standard grades from stock, or custom formulation developed to your spec.', color: '#2B8DD0' },
  { icon: Package, n: '03', title: 'Production & QC', body: 'In-house lab testing on every batch. TDS and CoA issued before dispatch.', color: '#D4840A' },
  { icon: Truck, n: '04', title: 'Packaging & Dispatch', body: '25 kg bags or FIBC. Full export documentation for international orders.', color: '#2B8DD0' },
  { icon: HeadphonesIcon, n: '05', title: 'Ongoing Technical Support', body: 'Process troubleshooting and grade optimisation after delivery.', color: '#22C55E' },
]

export default function Process() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="process" style={{
      background: '#141B3E',
      padding: '96px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 56, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
              fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
              border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
            }}
          >How We Work</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#FFFFFF' }}
          >From Enquiry to Delivery</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}
          >
            From first contact to ongoing technical partnership — structured and transparent.
          </motion.p>
        </div>

        <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 28, left: '10%', right: '10%', height: 1,
            background: 'linear-gradient(to right, transparent, rgba(46,127,208,0.25) 20%, rgba(46,127,208,0.25) 80%, transparent)',
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1,
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: `${step.color}15`, border: `2px solid ${step.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, flexShrink: 0,
                }}>
                  <Icon size={20} color={step.color} strokeWidth={1.8} />
                </div>

                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 900,
                  letterSpacing: '0.12em', color: step.color, marginBottom: 8,
                }}>STEP {step.n}</div>

                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800,
                  marginBottom: 10, lineHeight: 1.35, letterSpacing: '-0.01em', color: '#FFFFFF',
                }}>{step.title}</h3>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{step.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
            Not sure which grade fits your process? Our technical team will review your specification.
          </p>
          <a href="mailto:info@blaubatch.com" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', background: '#2B8DD0',
            color: '#fff',
            borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
            fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none' }}
          >
            Contact Technical Team
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process { padding: 64px 20px !important; }
          #process > div > div:last-child { flex-direction: column !important; gap: 32px !important; }
          #process > div > div:last-child > div[style*="absolute"] { display: none !important; }
        }
      `}</style>
    </section>
  )
}
