import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const INDUSTRIES = [
  { img: '/images/industries/packaging.png', name: 'Packaging & Flexible Film', desc: 'Blown film, cast film, stretch wrap, lamination', products: ['Filler MB', 'Colour MB', 'Additive MB'], href: '/industries/packaging' },
  { img: '/images/industries/pipes.png', name: 'Pipes, Fittings & Profiles', desc: 'HDPE pipes, PPR hot water, PVC drainage, irrigation', products: ['Black MB', 'White MB', 'Filler MB'], href: '/industries/pipes' },
  { img: '/images/industries/agriculture.png', name: 'Agriculture', desc: 'Mulch film, greenhouse, silage wrap, shade netting', products: ['UV Additive', 'Black MB', 'Filler MB'], href: '/industries/agriculture' },
  { img: '/images/industries/textiles.png', name: 'Textiles & Fibre', desc: 'PP non-woven, filament yarn, staple fibre, spunbond', products: ['Colour MB', 'White MB', 'Filler MB'], href: '/industries/textiles' },
  { img: '/images/industries/construction.png', name: 'Construction', desc: 'Geomembranes, waterproofing sheets, drainage boards', products: ['Black MB', 'Filler MB', 'Additive MB'], href: null },
  { img: '/images/industries/wire_cable.png', name: 'Wire & Cable', desc: 'Cable jacketing, conduit, armoured sheathing', products: ['Cable Black', 'Flame Retardant'], href: '/industries/wire-cable' },
  { img: '/images/industries/automotive.png', name: 'Automotive & Technical', desc: 'Interior components, under-hood parts, technical injection', products: ['Colour MB', 'Additive MB'], href: '/industries/automotive' },
  { img: '/images/industries/consumer_goods.png', name: 'Consumer Goods', desc: 'Housewares, toys, appliances, caps and closures', products: ['Colour MB', 'Anti-static', 'Filler MB'], href: null },
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
                backgroundImage: `url(${ind.img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                border: '1px solid rgba(20,27,62,0.1)',
                borderRadius: 12, padding: '24px 20px', cursor: ind.href ? 'pointer' : 'default', transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', minHeight: 280, justifyContent: 'flex-end',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ borderColor: 'rgba(43,141,208,0.5)', y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #141B3E 0%, rgba(20,27,62,0.6) 40%, transparent 100%)', zIndex: 0 }} />
              
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 800,
                  marginBottom: 8, lineHeight: 1.25, color: '#fff',
                }}>{ind.name}</h3>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16 }}>{ind.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: ind.href ? 18 : 0 }}>
                  {ind.products.map(p => (
                    <span key={p} style={{
                      fontSize: 9, padding: '3px 8px',
                      background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4,
                      fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.04em',
                      color: '#fff',
                    }}>{p}</span>
                  ))}
                </div>

                {ind.href && (
                  <Link to={ind.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 10, fontFamily: 'Montserrat, sans-serif', fontWeight: 800,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#2B8DD0', transition: 'all 0.2s', alignSelf: 'flex-start',
                    background: 'rgba(255,255,255,0.95)', padding: '6px 12px', borderRadius: 4,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.transform = 'none' }}
                  >Explore <ArrowRight size={10} /></Link>
                )}
              </div>
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
