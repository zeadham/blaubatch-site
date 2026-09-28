import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Footer from '../../components/Footer'
import useSEO from '../../hooks/useSEO'

const SECTIONS = [
  {
    heading: 'Reducing reliance on virgin polymer',
    body: 'Every ton of virgin polyethylene or polypropylene carries a significant carbon footprint from extraction, refining, and processing. Filler masterbatch — formulated with mineral-based fillers like calcium carbonate — allows manufacturers to reduce virgin polymer consumption without compromising product performance.\n\nFor high-volume producers, this substitution adds up quickly: fewer resources consumed, lower energy intensity per kilogram, and a smaller overall environmental footprint.',
  },
  {
    heading: 'Extending material life',
    body: 'Certain additive masterbatches — including UV stabilisers and antioxidants — extend the functional life of plastic products, especially in demanding outdoor applications like agricultural films and pipes. Longer-lasting products mean less frequent replacement and less waste entering the stream.',
    link: { label: 'Explore Additive Masterbatch (AMB Series)', href: '/additive-masterbatch' },
  },
  {
    heading: 'Supporting circular economy goals',
    body: 'Blau Batch formulations are designed with recyclability in mind. Compatible carriers and clean mineral fillers help ensure that products made with our masterbatches can re-enter recycling streams without contamination concerns.',
    link: { label: 'Read our full Sustainability commitment', href: '/sustainability' },
  },
  {
    heading: 'Our commitment',
    body: 'We believe responsible manufacturing is a competitive advantage — not a burden. That\'s why sustainability considerations are embedded in how we develop, test, and deliver every grade we produce.\n\nIf your team is working toward sustainability targets, we\'d like to help.',
  },
]

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Less Virgin Polymer, Lower Footprint: Blau Batch\'s Approach to Sustainable Manufacturing',
  description: 'How filler and additive masterbatch reduces virgin polymer use, extends product life, and supports recyclability. Blau Batch\'s sustainable manufacturing approach.',
  author: { '@type': 'Organization', name: 'Blau Batch' },
  publisher: {
    '@type': 'Organization',
    name: 'Blau Batch',
    logo: { '@type': 'ImageObject', url: 'https://www.blaubatch.com/logo.jpg' },
  },
  datePublished: '2026-04-01',
  url: 'https://www.blaubatch.com/blog/sustainable-plastics-masterbatch',
  mainEntityOfPage: 'https://www.blaubatch.com/blog/sustainable-plastics-masterbatch',
  keywords: 'sustainable masterbatch, sustainable plastics, circular economy plastics, recyclable masterbatch, filler masterbatch sustainability, CaCO3 carbon footprint',
}

export default function SustainableMasterbatch() {
  useSEO({
    title: 'Sustainable Plastics Manufacturing with Masterbatch | Blau Batch',
    description: 'How filler and additive masterbatch reduces virgin polymer use, extends product life, and supports recyclability. Blau Batch\'s sustainable manufacturing approach.',
    canonical: 'https://www.blaubatch.com/blog/sustainable-plastics-masterbatch',
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-post-2-schema'
    script.text = JSON.stringify(STRUCTURED_DATA)
    document.head.appendChild(script)
    return () => { document.getElementById('blog-post-2-schema')?.remove() }
  }, [])

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d2d0f 0%, #0d1829 50%, #141B3E 100%)', padding: '100px 48px 72px', borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 28 }}>
              <ArrowLeft size={13} /> Blog
            </Link>

            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>
              Sustainability
            </div>

            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 42px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 20 }}>
              Less Virgin Polymer, Lower Footprint: Blau Batch's Approach to Sustainable Manufacturing
            </h1>

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 640 }}>
              Sustainability in plastics manufacturing isn't just about end-of-life recycling. It starts at the very beginning — with what goes into the compound.
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>Blau Batch · April 2026 · 3 min read</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>Primary keyword: sustainable plastics masterbatch</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: '#141B3E', padding: '72px 48px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.85, fontFamily: 'system-ui, sans-serif' }}
          >
            {SECTIONS.map((s, i) => (
              <div key={i} style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.015em', marginBottom: 16 }}>{s.heading}</h2>
                {s.body && s.body.split('\n\n').map((para, j) => (
                  <p key={j} style={{ marginBottom: 16 }}>{para}</p>
                ))}
                {s.link && (
                  <Link to={s.link.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    color: '#22C55E', fontFamily: 'Montserrat, sans-serif',
                    fontSize: 13, fontWeight: 700, textDecoration: 'none',
                    marginTop: 4,
                  }}>
                    {s.link.label} <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            ))}

            {/* CTA */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 36, marginTop: 8 }}>
              <p style={{ marginBottom: 20 }}>Talk to us about how Blau Batch can support your sustainability goals:</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Contact our team', href: '/contact', accent: '#22C55E', bg: true },
                  { label: 'Sustainability page', href: '/sustainability', accent: '#22C55E', bg: false },
                  { label: 'FMPE & FMPP grades', href: '/fmpe', accent: '#2B8DD0', bg: false },
                ].map(link => (
                  <Link key={link.href} to={link.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 18px',
                    background: link.bg ? link.accent : 'transparent',
                    border: `1px solid ${link.bg ? link.accent : `${link.accent}66`}`,
                    borderRadius: 8,
                    color: link.bg ? '#fff' : link.accent,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!link.bg) e.currentTarget.style.background = `${link.accent}18` }}
                  onMouseLeave={e => { if (!link.bg) e.currentTarget.style.background = 'transparent' }}
                  >
                    {link.label} <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related post */}
      <section style={{ background: '#0d1829', padding: '48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Related Reading</p>
          <Link to="/blog/what-is-filler-masterbatch" style={{
            display: 'block', padding: '24px 28px',
            background: '#141B3E', border: '1px solid rgba(43,141,208,0.15)',
            borderRadius: 14, textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,141,208,0.35)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(43,141,208,0.15)' }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 10 }}>Masterbatch Basics</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 6 }}>What Is Filler Masterbatch — And Why Does It Matter for Your Production?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#2B8DD0', fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700 }}>Read more <ArrowRight size={12} /></div>
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`@media(max-width:700px){
        section { padding-left: 20px !important; padding-right: 20px !important; }
      }`}</style>
    </>
  )
}
