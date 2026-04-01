import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PRODUCTS = [
  {
    code: 'FMPE / FMPP',
    name: 'Filler Masterbatch',
    badge: 'MANUFACTURED',
    badgeColor: '#D4840A',
    desc: 'CaCO₃-based filler in PE and PP carriers for blown film, extrusion, and injection moulding.',
    specs: ['70% · 75% · 80% CaCO₃', 'LDPE · LLDPE · HDPE carrier', 'Blown Film · Cast Film · Injection'],
    featured: true,
    href: '/fmpe',
    hrefs: [{ label: 'FMPE Series', url: '/fmpe' }, { label: 'FMPP Series', url: '/fmpp' }],
    iconColor: '#D4840A',
    visual: 'linear-gradient(135deg, #2a1500 0%, #4a2800 40%, #6b3a00 70%, #3d2000 100%)',
    visualDots: 'rgba(212,132,10,0.25)',
    visualLabel: 'CaCO₃',
  },
  {
    code: 'WMB Series',
    name: 'White Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'TiO₂-based white concentrates. High opacity, multiple grades including food-contact compliant.',
    specs: ['PE & PP carriers', 'Food-contact grades', 'High-whiteness variants'],
    href: '/white-masterbatch',
    iconColor: '#2B8DD0',
    visual: 'linear-gradient(135deg, #a8b8c4 0%, #d8e8f0 40%, #eef5f9 70%, #c8d8e4 100%)',
    visualDots: 'rgba(255,255,255,0.7)',
    visualLabel: 'TiO₂',
  },
  {
    code: 'BMB Series',
    name: 'Black Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'Carbon black concentrates with UV-stable grades for pipes, agricultural film, and cable.',
    specs: ['UV-stable grades', 'Pipe · Cable · Film', 'PE & PP carriers'],
    href: '/black-masterbatch',
    iconColor: '#2B8DD0',
    visual: 'linear-gradient(135deg, #000000 0%, #0d0d0d 40%, #1a1a1a 70%, #080808 100%)',
    visualDots: 'rgba(255,255,255,0.06)',
    visualLabel: 'CB',
  },
  {
    code: 'CMB Series',
    name: 'Colour Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'Full-spectrum colour matching — RAL, Pantone, and custom development in PE and PP.',
    specs: ['RAL · Pantone matching', 'Custom colour development', 'Food-contact grades'],
    href: '/color-masterbatch',
    iconColor: '#2B8DD0',
    visual: 'linear-gradient(135deg, #c94b4b 0%, #e8962a 25%, #d4c020 45%, #43b07c 65%, #2d6eb5 100%)',
    visualDots: 'rgba(255,255,255,0.18)',
    visualLabel: 'RGB',
  },
]

function ProductCard({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isFeatured = p.featured
  const cardBg = isFeatured ? '#1a3562' : '#fff'
  const textColor = isFeatured ? '#fff' : '#1a2744'
  const subColor = isFeatured ? 'rgba(255,255,255,0.6)' : 'rgba(26,39,68,0.6)'
  const specBg = isFeatured ? 'rgba(255,255,255,0.06)' : 'rgba(26,39,68,0.06)'
  const specText = isFeatured ? 'rgba(255,255,255,0.6)' : 'rgba(26,39,68,0.55)'
  const borderColor = isFeatured ? 'rgba(212,132,10,0.35)' : 'rgba(0,0,0,0.08)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 14, padding: 0,
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.25s', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: isFeatured ? '0 20px 50px rgba(212,132,10,0.15)' : '0 16px 40px rgba(0,0,0,0.1)' }}
    >
      {/* Product visual banner — taller */}
      <div style={{
        height: 200, background: p.visual, position: 'relative', overflow: 'hidden',
        borderRadius: '14px 14px 0 0', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${p.visualDots} 2.5px, transparent 2.5px)`,
          backgroundSize: '20px 20px',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 12, left: 16,
          fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 900,
          letterSpacing: '0.14em', color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
        }}>{p.visualLabel}</div>
        {isFeatured && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(to right, transparent, #D4840A, transparent)',
          }} />
        )}
      </div>

      <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <span style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: p.badgeColor === '#D4840A' ? '#D4840A' : '#2B8DD0',
            border: `1px solid ${p.badgeColor === '#D4840A' ? 'rgba(212,132,10,0.35)' : 'rgba(46,127,208,0.3)'}`,
            borderRadius: 4, padding: '3px 8px', display: 'inline-block', marginBottom: 8,
          }}>{p.badge}</span>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: subColor, letterSpacing: '0.06em', fontWeight: 600 }}>{p.code}</div>
        </div>
        {isFeatured && (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgba(212,132,10,0.15)', border: '1px solid rgba(212,132,10,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 14, color: '#D4840A',
          }}>B</div>
        )}
      </div>

      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 17, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em', color: textColor }}>{p.name}</h3>
      <p style={{ fontSize: 13, color: subColor, lineHeight: 1.7, marginBottom: 18, flex: 1 }}>{p.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 20 }}>
        {p.specs.map(s => (
          <span key={s} style={{
            fontSize: 10, padding: '3px 9px',
            background: specBg, borderRadius: 4,
            fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.04em',
            color: specText,
          }}>{s}</span>
        ))}
      </div>

      {p.hrefs ? (
        <div style={{ display: 'flex', gap: 10 }}>
          {p.hrefs.map(link => (
            <a key={link.url} href={link.url} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, flex: 1, justifyContent: 'center',
              fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)',
              borderRadius: 6, padding: '8px 12px',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,132,10,0.12)'; e.currentTarget.style.borderColor = 'rgba(212,132,10,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,132,10,0.3)' }}
            >
              {link.label} <ArrowRight size={11} />
            </a>
          ))}
        </div>
      ) : (
        <a href={p.href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          color: isFeatured ? '#D4840A' : '#2B8DD0',
          transition: 'gap 0.2s',
        }}>
          View Details <ArrowRight size={13} />
        </a>
      )}
      </div>
    </motion.div>
  )
}

export default function Products() {
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="products" style={{ background: '#F5F7FA', padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 52 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
              fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
              border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
            }}
          >Product Portfolio</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#1a2744' }}
          >Complete Masterbatch Portfolio</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            style={{ fontSize: 15, color: 'rgba(26,39,68,0.6)', lineHeight: 1.8, maxWidth: 540 }}
          >
            One supplier relationship covers your complete masterbatch requirement — from in-house manufactured Filler to the full Coraplast distributed range.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}
        </div>
      </div>

      <style>{`@media (max-width: 600px) { #products { padding: 64px 20px !important; } }`}</style>
    </section>
  )
}
