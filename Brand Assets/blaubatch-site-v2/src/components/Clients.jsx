import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Replace these with real client logos when ready
// Each logo: { name, svg } — swap svg with <img src="..."> for real logos
const LOGOS = [
  {
    name: 'Plastex Group',
    svg: (
      <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="10" width="4" height="16" rx="2" fill="currentColor"/>
        <rect x="0" y="10" width="18" height="4" rx="2" fill="currentColor"/>
        <rect x="0" y="18" width="14" height="4" rx="2" fill="currentColor"/>
        <rect x="14" y="10" width="4" height="12" rx="2" fill="currentColor"/>
        <text x="24" y="26" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="0.5">PLASTEX</text>
        <text x="24" y="35" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" fill="currentColor" opacity="0.5" letterSpacing="2">GROUP</text>
      </svg>
    ),
  },
  {
    name: 'Nile Polymers',
    svg: (
      <svg width="130" height="36" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 28 L2 8 L6 8 L16 22 L16 8 L20 8 L20 28 L16 28 L6 14 L6 28 Z" fill="currentColor"/>
        <text x="28" y="26" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="0.5">NILE</text>
        <text x="28" y="35" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" fill="currentColor" opacity="0.5" letterSpacing="1.5">POLYMERS</text>
      </svg>
    ),
  },
  {
    name: 'Gulf Pack',
    svg: (
      <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="18" r="9" fill="none" stroke="currentColor" strokeWidth="3"/>
        <path d="M10 9 L10 18 L17 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="26" y="22" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="0.5">GULF</text>
        <text x="26" y="33" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="400" fill="currentColor" opacity="0.6" letterSpacing="1">PACK</text>
      </svg>
    ),
  },
  {
    name: 'TexPro Industries',
    svg: (
      <svg width="140" height="36" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="9" width="22" height="4" rx="2" fill="currentColor"/>
        <rect x="9" y="9" width="4" height="20" rx="2" fill="currentColor"/>
        <text x="30" y="26" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="0.5">TEXPRO</text>
        <text x="30" y="35" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" fill="currentColor" opacity="0.5" letterSpacing="1.5">INDUSTRIES</text>
      </svg>
    ),
  },
]

export default function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#141B3E', padding: '52px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}>
            Trusted by plastics manufacturers across the region
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            background: '#FFFFFF',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '28px 32px',
                borderRight: i < LOGOS.length - 1 ? '1px solid #E2E8F0' : 'none',
                color: '#23447A',
                transition: 'color 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#2B8DD0'}
              onMouseLeave={e => e.currentTarget.style.color = '#23447A'}
              title={`${logo.name} — placeholder logo`}
            >
              {logo.svg}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`@media(max-width:900px){ .clients-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  )
}
