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
      background: '#141B3E',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ── Full Background Image ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("/images/hero_industrial_extruder_1774906655246.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Dark gradient overlay so text remains readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(20,27,62,0.95) 0%, rgba(20,27,62,0.7) 45%, rgba(20,27,62,0.1) 100%)',
        }} />
        {/* Bottom fade into next section */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to top, rgba(20,27,62,1) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Animated background orbs ── */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          top: '-20%', left: '35%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(46,127,208,0.2) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          bottom: '-10%', right: '5%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(212,132,10,0.14) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ── Background grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '60px 48px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* ── Left — copy ── */}
          <div>
            {/* Tag */}
            <motion.div {...fadeUp(0.05)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              border: '1px solid rgba(46,127,208,0.35)', borderRadius: 20,
              padding: '5px 14px', marginBottom: 24,
              fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: '#2B8DD0',
            }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, background: '#2B8DD0', borderRadius: '50%', display: 'inline-block' }} />
              Egypt · MENA · Europe
            </motion.div>

            {/* H1 with animated product word */}
            <motion.h1 {...fadeUp(0.12)} style={{
              fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
              fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 1.05,
              letterSpacing: '-0.03em', marginBottom: 22,
            }}>
              Egypt's<br />
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
              {' '}Manufacturer<br />&amp; Distributor
            </motion.h1>

            {/* Sub — trimmed */}
            <motion.p {...fadeUp(0.2)} style={{
              fontSize: 15.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8,
              maxWidth: 480, marginBottom: 36, fontWeight: 300,
            }}>
              High-performance masterbatch for plastics producers across MENA and Europe. Filler, White, Black, Additive, and Colour — one supplier, one relationship.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.28)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="/contact#quote-form" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 26px', background: '#2B8DD0', color: '#fff',
                  borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
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
                  padding: '13px 26px', background: 'rgba(37,211,102,0.12)', color: '#25D366',
                  borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                  fontWeight: 700, letterSpacing: '0.06em',
                  border: '1px solid rgba(37,211,102,0.35)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.2)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'; e.currentTarget.style.transform = 'none' }}
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </div>
              <a href="#products" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', background: 'transparent', color: '#fff',
                borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 700, letterSpacing: '0.06em',
                border: '1px solid rgba(255,255,255,0.18)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'transparent' }}
              >
                View Products
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div {...fadeUp(0.36)} style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px', background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, overflow: 'hidden',
            }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.04)', padding: '14px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                    {s.n}<span style={{ color: '#2B8DD0', fontSize: 14 }}>{s.unit}</span>
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat, sans-serif', marginTop: 5, fontWeight: 700 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — floating badges ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Transparent container for floating layout */}
            <div style={{
              position: 'relative', 
              minHeight: 450,
            }}>

              {/* Badge overlay */}
              <div style={{
                position: 'absolute', top: 20, right: 20,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212,132,10,0.4)',
                borderRadius: 8, padding: '8px 14px',
                fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A',
              }}>
                In-House Manufactured
              </div>

              {/* Bottom info overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 28px',
              }}>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)', marginBottom: 8,
                }}>
                  6th of October City, Egypt
                </div>
                <div style={{
                  display: 'flex', gap: 12, flexWrap: 'wrap',
                }}>
                  {['Filler MB', 'White MB', 'Black MB', 'Colour MB', 'Additive MB'].map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                      padding: '4px 10px', borderRadius: 4,
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative rings */}
            <div style={{
              position: 'absolute', top: -40, right: -40, width: 200, height: 200,
              borderRadius: '50%', border: '1px solid rgba(46,127,208,0.12)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -30, left: -30, width: 140, height: 140,
              borderRadius: '50%', border: '1px solid rgba(212,132,10,0.1)', pointerEvents: 'none',
            }} />
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          section > div { padding: 40px 24px !important; }
          section { align-items: flex-start !important; }
        }
        @media (max-width: 500px) {
          section > div > div > div:first-child > div:last-child { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}
