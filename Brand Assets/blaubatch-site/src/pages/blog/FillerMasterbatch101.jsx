import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Footer from '../../components/Footer'
import useSEO from '../../hooks/useSEO'

const SECTIONS = [
  {
    heading: 'The basics',
    body: 'Filler masterbatch is a concentrated mixture of mineral fillers — most commonly calcium carbonate (CaCO₃) — dispersed in a polymer carrier. It\'s blended into base resins like polyethylene (PE) or polypropylene (PP) during production to partially replace virgin polymer.\n\nThe result? Lower raw material costs, improved processing performance, and often better physical properties — all without sacrificing the quality your customers expect.',
  },
  {
    heading: 'Why manufacturers rely on it',
    bullets: [
      { label: 'Cost efficiency', text: 'Mineral fillers cost significantly less than virgin polymer. Even a modest loading rate can deliver measurable savings at scale.' },
      { label: 'Enhanced performance', text: 'Depending on formulation, filler masterbatch can improve stiffness, opacity, printability, and dimensional stability.' },
      { label: 'Process consistency', text: 'A well-formulated masterbatch disperses uniformly, reducing variation on the line.' },
    ],
  },
  {
    heading: 'Choosing the right grade',
    body: 'Not all filler masterbatches are the same. Particle size, surface treatment, filler loading, and carrier resin compatibility all affect performance. The right grade depends on your end application — whether that\'s blown film, injection moulding, pipes, or nonwovens.\n\nAt Blau Batch, we engineer each grade to meet the demands of specific industries and processing conditions, so you get consistent performance batch after batch.',
  },
]

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is Filler Masterbatch — And Why Does It Matter for Your Production?',
  description: 'Learn what filler masterbatch is, how CaCO₃ replaces virgin polymer, and how it reduces costs without compromising quality. Blau Batch FMPE & FMPP grades.',
  author: { '@type': 'Organization', name: 'Blau Batch' },
  publisher: {
    '@type': 'Organization',
    name: 'Blau Batch',
    logo: { '@type': 'ImageObject', url: 'https://www.blaubatch.com/logo.jpg' },
  },
  datePublished: '2026-04-01',
  url: 'https://www.blaubatch.com/blog/what-is-filler-masterbatch',
  mainEntityOfPage: 'https://www.blaubatch.com/blog/what-is-filler-masterbatch',
  keywords: 'filler masterbatch, CaCO3 masterbatch, calcium carbonate masterbatch, PE masterbatch, PP masterbatch, cost reduction plastics',
}

export default function FillerMasterbatch101() {
  useSEO({
    title: 'What Is Filler Masterbatch & Why Does It Matter? | Blau Batch',
    description: 'Learn what filler masterbatch is, how CaCO₃ replaces virgin polymer, and how it reduces costs without compromising quality. Blau Batch FMPE & FMPP grades.',
    canonical: 'https://www.blaubatch.com/blog/what-is-filler-masterbatch',
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-post-1-schema'
    script.text = JSON.stringify(STRUCTURED_DATA)
    document.head.appendChild(script)
    return () => { document.getElementById('blog-post-1-schema')?.remove() }
  }, [])

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d1829 0%, #141B3E 60%, #1a2550 100%)', padding: '100px 48px 72px', borderBottom: '1px solid rgba(43,141,208,0.15)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.45)', fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 28 }}>
              <ArrowLeft size={13} /> Blog
            </Link>

            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>
              Masterbatch Basics
            </div>

            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 42px)', color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 20 }}>
              What Is Filler Masterbatch — And Why Does It Matter for Your Production?
            </h1>

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 640 }}>
              If you manufacture plastic products, every gram of raw polymer counts. That's where <strong style={{ color: 'rgba(255,255,255,0.8)' }}>filler masterbatch</strong> comes in.
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>Blau Batch · April 2026 · 3 min read</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>Primary keyword: filler masterbatch</span>
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
                {s.bullets && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {s.bullets.map(b => (
                      <div key={b.label} style={{ padding: '16px 20px', background: '#23447A', border: '1px solid rgba(43,141,208,0.15)', borderRadius: 12 }}>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#2B8DD0', fontSize: 13 }}>{b.label}</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}> — {b.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Internal links */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 36, marginTop: 8 }}>
              <p style={{ marginBottom: 20 }}>Ready to optimise your formulation? Explore our filler masterbatch grades:</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'FMPE Series — Filler Masterbatch for PE', href: '/fmpe' },
                  { label: 'FMPP Series — Filler Masterbatch for PP', href: '/fmpp' },
                  { label: 'Contact our technical team', href: '/contact' },
                ].map((link, i) => (
                  <Link key={link.href} to={link.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '10px 18px', background: i === 2 ? '#2B8DD0' : 'transparent',
                    border: '1px solid rgba(43,141,208,0.4)', borderRadius: 8,
                    color: i === 2 ? '#fff' : '#2B8DD0', fontFamily: 'Montserrat, sans-serif',
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,141,208,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
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
          <Link to="/blog/sustainable-plastics-masterbatch" style={{
            display: 'block', padding: '24px 28px',
            background: '#141B3E', border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: 14, textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.35)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)' }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22C55E', marginBottom: 10 }}>Sustainability</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 6 }}>Less Virgin Polymer, Lower Footprint: Blau Batch's Approach to Sustainable Manufacturing</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#22C55E', fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700 }}>Read more <ArrowRight size={12} /></div>
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
