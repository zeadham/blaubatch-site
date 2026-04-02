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
    specs: ['70% · 75% · 80% CaCO₃', 'LDPE · LLDPE · HDPE', 'Blown Film · Cast Film'],
    featured: true,
    href: '/fmpe',
    hrefs: [{ label: 'FMPE Series', url: '/fmpe' }, { label: 'FMPP Series', url: '/fmpp' }],
    imgUrl: '/images/heroes/filler.png',
  },
  {
    code: 'WMB Series',
    name: 'White Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'TiO₂-based white concentrates. High opacity, multiple grades including food-contact compliant.',
    specs: ['PE & PP carriers', 'Food-contact grades', 'High-whiteness'],
    href: '/white-masterbatch',
    imgUrl: '/images/heroes/white.png',
  },
  {
    code: 'BMB Series',
    name: 'Black Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'Carbon black concentrates with UV-stable grades for pipes, agricultural film, and cable.',
    specs: ['UV-stable grades', 'Pipe · Cable · Film', 'PE & PP carriers'],
    href: '/black-masterbatch',
    imgUrl: '/images/heroes/black.png',
  },
  {
    code: 'CMB Series',
    name: 'Colour Masterbatch',
    badge: 'CORAPLAST',
    badgeColor: '#23447A',
    desc: 'Full-spectrum colour matching — RAL, Pantone, and custom development in PE and PP.',
    specs: ['RAL · Pantone matching', 'Custom development', 'Food-contact grades'],
    href: '/color-masterbatch',
    imgUrl: '/images/heroes/colour.png',
  },
]

function ProductCard({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isFeatured = p.featured
  const cardBg = '#ffffff'
  const textColor = '#141B3E'
  const subColor = 'rgba(20,27,62,0.65)'
  const specBg = 'rgba(43,141,208,0.1)'
  const specText = '#2B8DD0'
  const borderColor = isFeatured ? 'rgba(212,132,10,0.5)' : '#CBD5E1'

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
        transition: 'all 0.3s', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(26,59,110,0.15)',
      }}
      whileHover={{ y: -6, boxShadow: isFeatured ? '0 20px 50px rgba(212,132,10,0.25)' : '0 20px 50px rgba(26,59,110,0.35)', borderColor: isFeatured ? '#D4840A' : 'rgba(255,255,255,0.4)' }}
    >
      {/* Product Photo Banner */}
      <div style={{
        height: 180, position: 'relative', overflow: 'hidden',
        backgroundImage: `url(${p.imgUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        flexShrink: 0, borderBottom: `1px solid ${borderColor}`,
      }}>
        {isFeatured && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(to right, transparent, #D4840A, transparent)',
          }} />
        )}
      </div>

      <div style={{ padding: '24px 20px 28px', display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 12, gap: 10 }}>
        <div>
          <span style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: p.badgeColor === '#D4840A' ? '#D4840A' : '#2B8DD0',
            border: `1px solid ${p.badgeColor === '#D4840A' ? 'rgba(212,132,10,0.35)' : 'rgba(46,127,208,0.3)'}`,
            borderRadius: 4, padding: '3px 8px', display: 'inline-block', marginBottom: 6,
          }}>{p.badge}</span>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: subColor, letterSpacing: '0.06em', fontWeight: 600 }}>{p.code}</div>
        </div>
      </div>

      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.01em', color: textColor }}>{p.name}</h3>
      <p style={{ fontSize: 13, color: subColor, lineHeight: 1.65, marginBottom: 18, flex: 1 }}>{p.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
        {p.specs.map(s => (
          <span key={s} style={{
            fontSize: 10, padding: '3px 9px',
            background: specBg, borderRadius: 5,
            fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.04em',
            color: specText,
          }}>{s}</span>
        ))}
      </div>

      {p.hrefs ? (
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          {p.hrefs.map(link => (
            <a key={link.url} href={link.url} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center',
              fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 900,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              color: '#D4840A', border: '2px solid rgba(212,132,10,0.6)',
              borderRadius: 6, padding: '12px 0px',
              transition: 'all 0.2s',
              background: 'rgba(212,132,10,0.1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D4840A'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,132,10,0.1)'; e.currentTarget.style.color = '#D4840A' }}
            >
              {link.label} <ArrowRight size={12} />
            </a>
          ))}
        </div>
      ) : (
        <a href={p.href} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800,
          letterSpacing: '0.05em', textTransform: 'uppercase',
          color: isFeatured ? '#D4840A' : '#fff',
          background: isFeatured ? 'transparent' : '#2B8DD0',
          border: isFeatured ? '1px solid rgba(212,132,10,0.3)' : 'none',
          padding: '12px 16px', borderRadius: 6,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 15px rgba(46,127,208,0.3)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
        >
          View Details <ArrowRight size={12} />
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

        <div id="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {PRODUCTS.map((p, i) => <ProductCard key={p.name} p={p} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { #products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; } }
        @media (max-width: 600px) { 
          #products { padding: 64px 20px !important; } 
          #products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
