import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const INDUSTRIES = [
  { icon: '📦', name: 'Packaging & Flexible Film', desc: 'Blown film, cast film, stretch wrap, lamination, carrier bags, food packaging', products: ['Filler MB', 'Colour MB', 'Additive MB'], href: '/industries/packaging' },
  { icon: '🔧', name: 'Pipes, Fittings & Profiles', desc: 'HDPE pipes, PPR hot water, PVC drainage, corrugated pipes, irrigation', products: ['Black MB', 'White MB', 'Filler MB'], href: '/industries/pipes' },
  { icon: '🌾', name: 'Agriculture', desc: 'Mulch film, greenhouse film, silage wrap, drip irrigation, shade netting', products: ['UV Additive MB', 'Black MB', 'Filler MB'], href: '/industries/agriculture' },
  { icon: '🧵', name: 'Textiles & Fibre', desc: 'PP non-woven, filament yarn, staple fibre, spunbond, geotextiles', products: ['Colour MB', 'White MB', 'Filler MB'], href: '/industries/textiles' },
  { icon: '🏗️', name: 'Construction', desc: 'Geomembranes, waterproofing sheets, drainage boards, wall panels', products: ['Black MB', 'Filler MB', 'Additive MB'], href: null },
  { icon: '⚡', name: 'Wire & Cable', desc: 'Cable jacketing, insulation compounds, conduit, armoured sheathing', products: ['Cable Black MB', 'Flame Retardant MB'], href: '/industries/wire-cable' },
  { icon: '🚗', name: 'Automotive & Technical', desc: 'Interior components, under-hood parts, technical injection, foams', products: ['Colour MB', 'Additive MB', 'Filler MB'], href: '/industries/automotive' },
  { icon: '🛍️', name: 'Consumer Goods', desc: 'Housewares, toys, appliances, furniture components, caps and closures', products: ['Colour MB', 'Anti-static MB', 'Filler MB'], href: null },
]

export default function Industries() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="industries" style={{
      background: '#F5F7FA',
      padding: '96px 48px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 52 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
              fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
              border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
            }}
          >Industries Served</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#141B3E' }}
          >Built for Plastics Processing</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            style={{ fontSize: 15, color: 'rgba(20,27,62,0.6)', lineHeight: 1.8, maxWidth: 560 }}
          >
            Grades formulated for PE, PP, PVC, PET, and ABS across film, injection, pipe extrusion, and fibre spinning.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#fff', border: '1px solid rgba(20,27,62,0.08)',
                borderRadius: 12, padding: '20px 18px', cursor: ind.href ? 'pointer' : 'default', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column',
              }}
              whileHover={{ background: '#F0F7FF', borderColor: 'rgba(43,141,208,0.3)', y: -2 }}
            >
              <div style={{
                fontSize: 28, marginBottom: 12, lineHeight: 1,
              }}>{ind.icon}</div>

              <h3 style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800,
                marginBottom: 8, lineHeight: 1.3, color: '#141B3E',
              }}>{ind.name}</h3>

              <p style={{ fontSize: 11, color: 'rgba(20,27,62,0.55)', lineHeight: 1.65, marginBottom: 12, flex: 1 }}>{ind.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: ind.href ? 14 : 0 }}>
                {ind.products.map(p => (
                  <span key={p} style={{
                    fontSize: 9, padding: '2px 7px',
                    background: 'rgba(74,170,224,0.12)', borderRadius: 3,
                    fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.04em',
                    color: '#2B8DD0',
                  }}>{p}</span>
                ))}
              </div>

              {ind.href && (
                <Link to={ind.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 10, fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: '#2B8DD0', opacity: 0.8, transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                >View industry <ArrowRight size={10} /></Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { #industries > div > div:last-child { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { #industries { padding: 64px 20px !important; } #industries > div > div:last-child { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
