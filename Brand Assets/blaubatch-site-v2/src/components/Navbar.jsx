import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const PRODUCTS = [
  { name: 'Filler Masterbatch (PE)', sub: 'FMPE Series · 70–80% CaCO₃', href: '/fmpe', badge: 'MANUFACTURED' },
  { name: 'Filler Masterbatch (PP)', sub: 'FMPP Series · 70–80% CaCO₃', href: '/fmpp', badge: 'MANUFACTURED' },
  { name: 'White Masterbatch', sub: 'TiO₂-based, food-contact grades', href: '/white-masterbatch' },
  { name: 'Black Masterbatch', sub: 'UV-stable, pipe & cable grades', href: '/black-masterbatch' },
  { name: 'Additive Masterbatch', sub: 'UV, slip, antiblock, anti-static', href: '/additive-masterbatch' },
  { name: 'Colour Masterbatch', sub: 'RAL/Pantone, custom matching', href: '/color-masterbatch' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
    height: 68,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px',
    background: '#141b3e',
    backdropFilter: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    transition: 'all 0.3s ease',
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <img src="/logo.jpg" alt="Blau Batch" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.2 }}>
            <div style={{ color: '#fff' }}>BLAU</div>
            <div style={{ color: '#fff' }}>BATCH</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hidden-mobile">
          {/* Products dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: productsOpen ? '#fff' : 'rgba(255,255,255,0.65)',
              borderRadius: 6, transition: 'all 0.2s',
            }}>
              Products <ChevronDown size={12} style={{ opacity: 0.6, transform: productsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                    background: '#23447A', border: '1px solid rgba(255,255,255,0.13)',
                    borderRadius: 12, padding: 6, minWidth: 260,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                  }}
                >
                  {PRODUCTS.map(p => (
                    <Link key={p.name} to={p.href} onClick={() => setProductsOpen(false)} style={{
                      display: 'block', padding: '10px 14px', borderRadius: 8,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.name}</span>
                        {p.badge && (
                          <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 3, background: '#D4840A', color: '#fff' }}>{p.badge}</span>
                        )}
                      </div>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Open Sans, sans-serif' }}>{p.sub}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[['About', '/about'], ['Sustainability', '/sustainability'], ['Distributors', '/distributors'], ['Resources', '/resources'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={label} to={href} style={{
              padding: '8px 14px', fontFamily: 'Montserrat, sans-serif', fontSize: 11,
              fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)', borderRadius: 6, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent' }}
            >{label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="/contact#quote-form" style={{
            padding: '8px 18px', background: '#2B8DD0', color: '#fff',
            borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 11,
            fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'all 0.2s', border: '1px solid transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none' }}
          >Request Quote ↗</a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4, display: 'none' }}
            className="mobile-hamburger"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed', top: 68, left: 0, right: 0, zIndex: 499,
              background: '#141b3e', borderBottom: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Products sub-list */}
              <div style={{ padding: '8px 16px 4px', fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Products</div>
              {PRODUCTS.map(p => (
                <Link key={p.name} to={p.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '10px 16px', fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                    fontWeight: 700, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.75)',
                    borderRadius: 8, transition: 'background 0.15s', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {p.name}
                  {p.badge && <span style={{ fontSize: 8, fontWeight: 800, padding: '2px 5px', borderRadius: 3, background: '#D4840A', color: '#fff', letterSpacing: '0.06em' }}>{p.badge}</span>}
                </Link>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 16px' }} />
              {[['About', '/about'], ['Sustainability', '/sustainability'], ['Distributors', '/distributors'], ['Resources', '/resources'], ['Contact', '/contact']].map(([label, href]) => (
                <Link key={label} to={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: '12px 16px', fontFamily: 'Montserrat, sans-serif', fontSize: 13,
                    fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)',
                    borderRadius: 8, transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{label}</Link>
              ))}
              <a href="/contact#quote-form" onClick={() => setMobileOpen(false)} style={{
                marginTop: 8, padding: '13px 20px', background: '#2B8DD0', color: '#fff',
                borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center',
              }}>Request Quote ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-hamburger { display: block !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
