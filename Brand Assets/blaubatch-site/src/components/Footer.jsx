const NAV_COLS = [
  {
    title: 'Products',
    links: [
      { label: 'Filler Masterbatch (FMPE)', href: '/fmpe' },
      { label: 'Filler Masterbatch (FMPP)', href: '/fmpp' },
      { label: 'White Masterbatch', href: '/white-masterbatch' },
      { label: 'Black Masterbatch', href: '/black-masterbatch' },
      { label: 'Additive Masterbatch', href: '/additive-masterbatch' },
      { label: 'Colour Masterbatch', href: '/color-masterbatch' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Packaging & Flexible Film', href: '/industries/packaging' },
      { label: 'Pipes, Fittings & Profiles', href: '/industries/pipes' },
      { label: 'Agriculture', href: '/industries/agriculture' },
      { label: 'Textiles & Fibre', href: '/industries/textiles' },
      { label: 'Wire & Cable', href: '/industries/wire-cable' },
      { label: 'Automotive & Technical', href: '/industries/automotive' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Blau Batch', href: '/#why' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Distributors', href: '/distributors' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/blaubatch',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61553290265555',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/blaubatch/',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
]

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer style={{
      background: '#141b3e',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '64px 48px 32px',
    }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >

        {/* Top: brand + nav cols */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>

          {/* Brand col */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/logo-mark.png" alt="Blau Batch" style={{ height: 32, objectFit: 'contain' }} />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
                  fontSize: 14, color: '#fff', letterSpacing: '0.12em',
                  textTransform: 'uppercase', lineHeight: 1,
                }}>BLAU BATCH</span>
              </div>
            </div>

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 20 }}>
              Full-Spectrum Masterbatch Solutions — manufacturer and distributor serving MENA, Europe, and global markets.
            </p>

            {/* Coraplast partner note */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6,
              padding: '6px 12px', marginBottom: 22,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Authorised Coraplast Distributor</span>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.55)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(46,127,208,0.15)'; e.currentTarget.style.color = '#2B8DD0'; e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)' }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(col => (
            <div key={col.title}>
              <div style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                marginBottom: 18,
              }}>{col.title}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} style={{
                      fontSize: 13, color: 'rgba(255,255,255,0.58)', transition: 'color 0.15s', fontWeight: 400,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.58)'}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Address bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, marginBottom: 24,
          display: 'flex', gap: 32, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Office', val: 'Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt' },
            { label: 'Factory', val: '79, 6th Industrial Zone, 6th of October, Egypt' },
            { label: 'Email', val: 'info@blaubatch.com' },
            { label: 'Phone', val: '+2 0102 2227723' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Blau Batch. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Sitemap', href: '/sitemap' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >{label}</a>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          footer { padding: 48px 20px 24px !important; }
        }
        @media (max-width: 560px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
          footer > div > div:nth-child(2) { flex-direction: column !important; gap: 16px !important; }
        }
      `}</style>
    </footer>
  )
}
