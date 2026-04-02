import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

const CYCLE = [
  { name: 'Filler', color: '#D4840A' },
  { name: 'White', color: '#CBD5E1' },
  { name: 'Black', color: '#94A3B8' },
  { name: 'Colour', color: '#F472B6' },
  { name: 'Additive', color: '#2B8DD0' },
]

const STATS = [
  { n: '5', unit: '+', label: 'Product Lines' },
  { n: 'MENA', unit: '', label: '& Europe' },
  { n: 'ISO', unit: '', label: '9001 Aligned' },
  { n: '70–80', unit: '%', label: 'CaCO₃ Loading' },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % CYCLE.length), 3200)
    return () => clearInterval(t)
  }, [])

  const p = CYCLE[active]

  return (
    <section style={{
      minHeight: '100vh',
      paddingTop: 68,
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Full background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&h=1080&fit=crop&auto=format")',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      {/* Left-side frosted underlay — text legibility without killing the image */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.52) 48%, rgba(255,255,255,0) 72%)',
      }} />

      {/* Bottom fade — blends into the page background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, rgba(250,250,252,0.65) 100%)',
      }} />

      {/* ── Background grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23141b3e' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '80px 48px', position: 'relative', textAlign: 'left' }}>

        {/* Tag */}
        <motion.div {...fadeUp(0.05)} style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          border: '1px solid rgba(46,127,208,0.35)', borderRadius: 20,
          padding: '5px 14px', marginBottom: 24,
          fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2B8DD0',
          background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)',
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, background: '#2B8DD0', borderRadius: '50%', display: 'inline-block' }} />
          Egypt · MENA · Europe
        </motion.div>

        {/* H1 with animated product word */}
        <motion.h1 {...fadeUp(0.12)} style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', margin: '0 0 22px',
          maxWidth: 680,
        }}>
          Egypt's{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: `linear-gradient(135deg, ${p.color}, #2B8DD0)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', display: 'inline-block',
              }}
            >
              {p.name}
            </motion.span>
          </AnimatePresence>
          <br />Manufacturer &amp; Distributor
        </motion.h1>

        {/* Sub */}
        <motion.p {...fadeUp(0.2)} style={{
          fontSize: 17, color: 'rgba(20,27,62,0.72)', lineHeight: 1.8,
          maxWidth: 520, marginBottom: 40, fontWeight: 300,
        }}>
          High-performance masterbatch for plastics producers across MENA and Europe. Filler, White, Black, Additive, and Colour — one supplier, one relationship.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.28)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56, justifyContent: 'flex-start' }}>
          <a href="/contact#quote-form" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 30px', background: '#2B8DD0', color: '#fff',
            borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
            fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
            transition: 'all 0.2s', border: '1px solid transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(46,127,208,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Request a Quote <ArrowRight size={14} />
          </a>
          <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px 30px', background: 'rgba(37,211,102,0.15)', color: '#25D366',
            borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
            fontWeight: 700, letterSpacing: '0.06em',
            border: '1px solid rgba(37,211,102,0.35)', transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.25)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.15)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'; e.currentTarget.style.transform = 'none' }}
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
          <a href="#products" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 30px', background: 'rgba(20,27,62,0.07)', color: '#141B3E',
            borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
            fontWeight: 700, letterSpacing: '0.06em',
            border: '1px solid rgba(20,27,62,0.18)', transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(20,27,62,0.35)'; e.currentTarget.style.background = 'rgba(20,27,62,0.12)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,27,62,0.18)'; e.currentTarget.style.background = 'rgba(20,27,62,0.07)' }}
          >
            View Products
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.36)} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', background: 'rgba(20,27,62,0.08)',
          border: '1px solid rgba(20,27,62,0.1)', borderRadius: 12, overflow: 'hidden',
          maxWidth: 540,
          backdropFilter: 'blur(8px)',
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.82)', padding: '16px 10px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 900, color: '#141B3E', lineHeight: 1 }}>
                {s.n}<span style={{ color: '#2B8DD0', fontSize: 15 }}>{s.unit}</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(20,27,62,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat, sans-serif', marginTop: 5, fontWeight: 700 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div { padding: 60px 24px !important; }
          section { align-items: flex-start !important; }
        }
        @media (max-width: 500px) {
          section > div > div:last-child { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
