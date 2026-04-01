import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const SITEMAP = [
  {
    section: 'Main',
    color: '#2B8DD0',
    pages: [
      { label: 'Home', path: '/', desc: 'Overview of Blau Batch products, capabilities, and contact' },
      { label: 'About', path: '/about', desc: 'Our story, manufacturing facility, and team' },
      { label: 'Sustainability', path: '/sustainability', desc: 'Environmental commitment and responsible manufacturing' },
      { label: 'Distributors', path: '/distributors', desc: 'Authorised distribution partners across the region' },
      { label: 'Resources', path: '/resources', desc: 'Technical data sheets, guides, and blog articles' },
      { label: 'Contact', path: '/contact', desc: 'Get in touch, request a quote, or find our offices' },
    ],
  },
  {
    section: 'Products — Manufactured',
    color: '#D4840A',
    pages: [
      { label: 'FMPE Series — PE Filler Masterbatch', path: '/fmpe', desc: 'CaCO₃ filler MB in LDPE/LLDPE carrier · 70%, 75%, 80%' },
      { label: 'FMPP Series — PP Filler Masterbatch', path: '/fmpp', desc: 'CaCO₃ filler MB in PP Homopolymer carrier · 70%, 75%, 80%' },
    ],
  },
  {
    section: 'Products — Coraplast Distributed',
    color: '#2B8DD0',
    pages: [
      { label: 'White Masterbatch', path: '/white-masterbatch', desc: 'TiO₂-based white concentrates in PE and PP carriers' },
      { label: 'Black Masterbatch', path: '/black-masterbatch', desc: 'Carbon black concentrates for film, pipe, and cable' },
      { label: 'Colour Masterbatch', path: '/color-masterbatch', desc: 'Full-spectrum RAL/Pantone colour matching in PE & PP' },
      { label: 'Additive Masterbatch', path: '/additive-masterbatch', desc: 'UV stabilisers, slip/antiblock, flame retardant, optical brighteners' },
    ],
  },
  {
    section: 'Industries',
    color: '#2B8DD0',
    pages: [
      { label: 'Packaging & Flexible Film', path: '/industries/packaging', desc: 'Blown film, FFS film, bags, lamination, food packaging' },
      { label: 'Pipes, Fittings & Profiles', path: '/industries/pipes', desc: 'PE100 water pipe, gas pipe, profile extrusion' },
      { label: 'Agriculture', path: '/industries/agriculture', desc: 'Greenhouse film, mulch film, silage, irrigation' },
      { label: 'Textiles & Fibre', path: '/industries/textiles', desc: 'Raffia, non-woven, BOPP, carpet yarn' },
      { label: 'Wire & Cable', path: '/industries/wire-cable', desc: 'Cable jacketing, conduit, insulation, flame retardant' },
      { label: 'Automotive', path: '/industries/automotive', desc: 'Interior trim, technical PP parts, under-bonnet' },
    ],
  },
  {
    section: 'Legal',
    color: '#94A3B8',
    pages: [
      { label: 'Privacy Policy', path: '/privacy', desc: 'How we collect, use, and protect your personal data' },
      { label: 'Terms & Conditions', path: '/terms', desc: 'Supply terms, payment, delivery, and liability' },
      { label: 'Sitemap', path: '/sitemap', desc: 'Full index of all pages on this website' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <section style={{ background: '#141B3E', padding: '80px 48px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>Navigation</div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff', marginBottom: 12, lineHeight: 1.1 }}>Sitemap</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>A complete index of all pages on blaubatch.com</p>
        </div>
      </section>

      <section style={{ background: '#141B3E', padding: '40px 48px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SITEMAP.map(group => (
            <div key={group.section}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 3, height: 20, background: group.color, borderRadius: 2, flexShrink: 0 }} />
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: group.color }}>{group.section}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
                {group.pages.map(page => (
                  <Link
                    key={page.path}
                    to={page.path}
                    style={{
                      display: 'block', padding: '16px 20px',
                      background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: 10, textDecoration: 'none',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = group.color === '#D4840A' ? 'rgba(212,132,10,0.4)' : 'rgba(43,141,208,0.4)'; e.currentTarget.style.background = '#2a5090' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = '#23447A' }}
                  >
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 5 }}>{page.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{page.desc}</div>
                    <div style={{ fontSize: 10, color: group.color, marginTop: 8, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{page.path}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){ section { padding-left: 20px !important; padding-right: 20px !important; } }`}</style>
    </>
  )
}
