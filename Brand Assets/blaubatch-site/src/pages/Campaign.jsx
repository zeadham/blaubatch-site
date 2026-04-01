import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, ChevronRight, Mail, Phone, MessageSquare,
  Factory, Package, Beaker, Truck, Shield, Users, Globe, Zap,
  ChevronDown, Download,
} from 'lucide-react'
import Footer from '../components/Footer'

/* ── animation helpers ── */
const fade = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})
const inFade = (inView, delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

/* ── data ── */
const PRODUCTS = [
  { code: 'FMPE', name: 'PE Filler Masterbatch', badge: 'MANUFACTURED', badgeColor: '#D4840A', href: '/fmpe' },
  { code: 'FMPP', name: 'PP Filler Masterbatch', badge: 'MANUFACTURED', badgeColor: '#D4840A', href: '/fmpp' },
  { code: 'WHITE', name: 'White Masterbatch', badge: 'DISTRIBUTED', badgeColor: '#2B8DD0', href: '/white-masterbatch' },
  { code: 'BLACK', name: 'Black Masterbatch', badge: 'DISTRIBUTED', badgeColor: '#2B8DD0', href: '/black-masterbatch' },
  { code: 'ADDITIVE', name: 'Additive Masterbatch', badge: 'DISTRIBUTED', badgeColor: '#2B8DD0', href: '/additive-masterbatch' },
  { code: 'COLOUR', name: 'Colour Masterbatch', badge: 'DISTRIBUTED', badgeColor: '#2B8DD0', href: '/color-masterbatch' },
]

const INDUSTRIES = [
  { icon: Package, label: 'Packaging', sub: 'Film, bags, containers, closures', href: '/industries/packaging' },
  { icon: Factory, label: 'Pipe Extrusion', sub: 'HDPE, PPR, PVC pressure & drainage', href: '/industries/pipes' },
  { icon: Beaker, label: 'Agriculture', sub: 'Mulch film, drip tape, greenhouse', href: '/industries/agriculture' },
  { icon: Truck, label: 'Construction', sub: 'Profiles, sheets, geomembranes', href: '/industries/textiles' },
]

const ADVANTAGES = [
  { icon: Factory, title: 'In-House Manufacturing', desc: 'Own production facility in 6th of October — full process control, QC, and batch traceability on every run.' },
  { icon: Globe, title: 'Global Distribution', desc: 'Authorised Coraplast distributor — colour, additive, white, black, and specialty grades across MENA & Europe.' },
  { icon: Users, title: 'Technical Partnership', desc: 'Custom formulation development, application support, and real production problem-solving with your engineering team.' },
  { icon: Shield, title: 'Certified Quality', desc: 'TDS and Certificate of Analysis issued per shipment. MFI, ash content, colour, and dispersion tested every batch.' },
  { icon: Zap, title: 'Fast Lead Times', desc: 'Core filler grades held in stock. Specialty grades sourced on established trade lanes — no surprises, no delays.' },
  { icon: Package, title: 'Flexible MOQs', desc: 'Trial quantities available. Scale from sample to full production volumes with consistent pricing and terms.' },
]

const PRODUCT_OPTIONS = [
  'Filler Masterbatch (PE)', 'Filler Masterbatch (PP)',
  'White Masterbatch', 'Black Masterbatch',
  'Additive Masterbatch', 'Colour Masterbatch',
  'Multiple Products', 'Not Sure — Need Advice',
]

export default function CampaignPage() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <ProblemSection />
      <ProductsSection />
      <IndustriesSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <LeadFormSection />
      <Footer />
    </>
  )
}

/* ═══════════════════════════════════════════
   1. HERO — Full-Spectrum Campaign Hero
   ═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{
      paddingTop: 108, paddingBottom: 100, paddingLeft: 48, paddingRight: 48,
      background: '#141B3E', position: 'relative', overflow: 'hidden',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 900, height: 900, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(46,127,208,0.1) 0%, transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.016'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative' }}>

        {/* Left — Text */}
        <div>
          <motion.div {...fade(0.04)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#D4840A', border: '1px solid rgba(212,132,10,0.4)',
            borderRadius: 20, padding: '5px 14px', marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4840A' }} />
            One Source. Full Spectrum.
          </motion.div>

          <motion.h1 {...fade(0.1)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: 22, color: '#fff',
          }}>
            Every Masterbatch Grade.<br />
            <span style={{
              background: 'linear-gradient(135deg, #2B8DD0, #6AB4E8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>One Trusted Supplier.</span>
          </motion.h1>

          <motion.p {...fade(0.17)} style={{
            fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
            maxWidth: 500, fontWeight: 300, marginBottom: 36,
          }}>
            Filler, colour, white, black, additive, and specialty masterbatch — manufactured in-house and distributed from global sources. Simplify your supply chain with Blau Batch.
          </motion.p>

          <motion.div {...fade(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <a href="#get-quote" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 32px', background: '#2B8DD0', color: '#fff',
              borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
              fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'all 0.2s', border: '1px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(46,127,208,0.42)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Get a Quote <ArrowRight size={15} />
            </a>
            <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 28px', background: 'transparent', color: '#25D366',
              borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
              fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
              border: '1px solid rgba(37,211,102,0.35)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)' }}
            >
              <MessageSquare size={15} /> WhatsApp Us
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div {...fade(0.32)} style={{ display: 'flex', gap: 32 }}>
            {[
              { n: '6+', label: 'Product Lines' },
              { n: '50+', label: 'Grades Available' },
              { n: '24h', label: 'Quote Response' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 900, color: '#2B8DD0', letterSpacing: '-0.02em' }}>{s.n}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Hero Image Placeholder */}
        <motion.div {...fade(0.2, 0)} initial={{ opacity: 0, x: 24 }}>
          <div style={{
            position: 'relative', borderRadius: 24, overflow: 'hidden', minHeight: 480,
            background: 'linear-gradient(145deg, #0a1628 0%, #162040 35%, #1a2d5a 70%, #23447A 100%)',
            boxShadow: '0 0 80px rgba(43,141,208,0.15), 0 40px 80px rgba(0,0,0,0.4)',
          }}>
            {/* Dot texture */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(43,141,208,0.12) 2px, transparent 2px)',
              backgroundSize: '24px 24px',
            }} />

            {/* Large background text */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(72px, 10vw, 130px)',
              color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.04em', userSelect: 'none',
            }}>B</div>

            {/* IMAGE PLACEHOLDER: Replace src with actual hero image */}
            {/* Suggested: Factory production line, masterbatch pellets close-up, or team photo */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {/* <img src="/campaign-hero.jpg" alt="Blau Batch masterbatch production" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
              Hero Image
            </div>

            {/* Gradient overlays */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,24,41,0.75) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,24,41,0.15) 0%, transparent 40%)' }} />

            {/* Accent line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent 0%, #2B8DD0 40%, transparent 100%)' }} />

            {/* Chip */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(43,141,208,0.4)', borderRadius: 8, padding: '7px 14px',
              fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            }}>Full-Spectrum Supplier</div>

            {/* Stat card */}
            <div style={{
              position: 'absolute', bottom: 24, left: 24,
              background: 'rgba(13,24,41,0.65)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16, padding: '16px 22px',
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 28, color: '#D4840A', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 5 }}>MENA</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>& Europe Coverage</div>
            </div>

            {/* Decorative rings */}
            <div style={{ position: 'absolute', top: -70, right: -70, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(43,141,208,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -35, right: -35, width: 130, height: 130, borderRadius: '50%', border: '1px solid rgba(43,141,208,0.07)', pointerEvents: 'none' }} />
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section:first-of-type > div:last-of-type { grid-template-columns: 1fr !important; gap: 40px !important; }
          section:first-of-type { padding: 100px 20px 60px !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   2. TRUST STRIP — Social proof bar
   ═══════════════════════════════════════════ */
function TrustStripSection() {
  return (
    <section style={{
      background: '#23447A', padding: '20px 48px',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 40, flexWrap: 'wrap',
      }}>
        {[
          'In-House Manufacturer',
          'Authorised Coraplast Distributor',
          'MENA & Europe Coverage',
          'Full QC on Every Batch',
          '24h Quote Response',
        ].map(item => (
          <div key={item} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
          }}>
            <CheckCircle2 size={13} color="#2B8DD0" strokeWidth={2.5} />
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   3. PROBLEM — Why consolidate?
   ═══════════════════════════════════════════ */
function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{ background: '#141B3E', padding: '96px 48px' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...inFade(inView, 0)} style={{
          display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
          fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A',
          border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
        }}>The Problem</motion.div>

        <motion.h2 {...inFade(inView, 0.08)} style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: 24, color: '#fff',
        }}>
          Still Managing 3–5 Masterbatch Suppliers?
        </motion.h2>

        <motion.p {...inFade(inView, 0.14)} style={{
          fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: 640, margin: '0 auto 48px',
        }}>
          Multiple suppliers means multiple quality standards, multiple lead times, and multiple accounts to manage. Every additional vendor adds complexity, inconsistency, and cost to your production line.
        </motion.p>

        <motion.div {...inFade(inView, 0.2)} style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }}>
          {[
            { num: '3–5', label: 'Average suppliers managed', sub: 'for a typical masterbatch requirement' },
            { num: '15–20%', label: 'Time spent on vendor management', sub: 'procurement, QC checks, logistics coordination' },
            { num: '2–4 wk', label: 'Delays on specialty grades', sub: 'when importing without a local distribution partner' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14, padding: '28px 22px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 900, color: '#D4840A', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.num}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{s.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          section:nth-of-type(3) > div > div:last-child { grid-template-columns: 1fr !important; }
          section:nth-of-type(3) { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   4. PRODUCTS — Full product lineup
   ═══════════════════════════════════════════ */
function ProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{
      background: '#141B3E', padding: '96px 48px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div {...inFade(inView, 0)} style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
          }}>Our Products</motion.div>
          <motion.h2 {...inFade(inView, 0.08)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff', marginBottom: 14,
          }}>
            Full-Spectrum Masterbatch Range
          </motion.h2>
          <motion.p {...inFade(inView, 0.14)} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            From in-house manufactured filler grades to internationally sourced colour, white, black, and additive masterbatch — everything your production line needs.
          </motion.p>
        </div>

        <motion.div {...inFade(inView, 0.2)} style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }}>
          {PRODUCTS.map((p, i) => (
            <Link to={p.href} key={p.code} style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14, padding: '28px 24px', transition: 'all 0.25s', textDecoration: 'none',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* IMAGE PLACEHOLDER: Replace with product image */}
              {/* Suggested: Close-up of masterbatch pellets in the product's colour */}
              <div style={{
                height: 120, borderRadius: 10, background: `linear-gradient(135deg, ${p.badgeColor}15, ${p.badgeColor}08)`,
                border: `1px solid ${p.badgeColor}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 24,
                color: `${p.badgeColor}30`, letterSpacing: '-0.02em',
              }}>
                {/* <img src={`/products/${p.code.toLowerCase()}.jpg`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} /> */}
                {p.code}
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontFamily: 'Montserrat, sans-serif', fontSize: 8, fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: p.badgeColor,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.badgeColor }} />
                {p.badge}
              </div>

              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{p.name}</div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, color: '#2B8DD0', fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'auto',
              }}>
                View Details <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section:nth-of-type(4) > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
          section:nth-of-type(4) { padding: 64px 20px !important; }
        }
        @media (max-width: 560px) {
          section:nth-of-type(4) > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   5. INDUSTRIES — Who we serve
   ═══════════════════════════════════════════ */
function IndustriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{
      background: '#141B3E', padding: '96px 48px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'center' }}>

        {/* Left — Text */}
        <div>
          <motion.div {...inFade(inView, 0)} style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
          }}>Industries</motion.div>

          <motion.h2 {...inFade(inView, 0.08)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff', marginBottom: 16,
          }}>
            Built for Plastics<br />
            <span style={{ background: 'linear-gradient(135deg, #2B8DD0, #6AB4E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Manufacturers
            </span>
          </motion.h2>

          <motion.p {...inFade(inView, 0.14)} style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 32, maxWidth: 440,
          }}>
            Whether you extrude film, mould containers, produce pipes, or manufacture agricultural products — we supply the masterbatch grades your process demands.
          </motion.p>

          {/* IMAGE PLACEHOLDER: Replace with industry application image */}
          {/* Suggested: Collage of packaging, pipes, agriculture film, construction products */}
          <div style={{
            height: 200, borderRadius: 14, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg, #0a1628, #162040)',
            border: '1px solid rgba(255,255,255,0.09)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {/* <img src="/campaign-industries.jpg" alt="Industries served by Blau Batch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            Industries Image
          </div>
        </div>

        {/* Right — Industry cards */}
        <motion.div {...inFade(inView, 0.2)} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          {INDUSTRIES.map(ind => (
            <Link to={ind.href} key={ind.label} style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14, padding: '28px 24px', textDecoration: 'none', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10, marginBottom: 16,
                background: 'rgba(43,141,208,0.12)', border: '1px solid rgba(43,141,208,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ind.icon size={19} color="#2B8DD0" strokeWidth={1.5} />
              </div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: 6 }}>{ind.label}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{ind.sub}</div>
            </Link>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section:nth-of-type(5) > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          section:nth-of-type(5) { padding: 64px 20px !important; }
        }
        @media (max-width: 560px) {
          section:nth-of-type(5) > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   6. ADVANTAGES — Why Blau Batch
   ═══════════════════════════════════════════ */
function AdvantagesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{
      background: '#141B3E', padding: '96px 48px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <motion.div {...inFade(inView, 0)} style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
          }}>Why Blau Batch</motion.div>
          <motion.h2 {...inFade(inView, 0.08)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff',
          }}>
            The Single Source Advantage
          </motion.h2>
        </div>

        <motion.div {...inFade(inView, 0.16)} style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
        }}>
          {ADVANTAGES.map((a, i) => (
            <div key={a.title} style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14, padding: '30px 24px', transition: 'all 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 11, marginBottom: 18,
                background: i === 0 ? 'rgba(212,132,10,0.12)' : 'rgba(43,141,208,0.12)',
                border: `1px solid ${i === 0 ? 'rgba(212,132,10,0.2)' : 'rgba(43,141,208,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <a.icon size={20} color={i === 0 ? '#D4840A' : '#2B8DD0'} strokeWidth={1.5} />
              </div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', marginBottom: 8 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{a.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section:nth-of-type(6) > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
          section:nth-of-type(6) { padding: 64px 20px !important; }
        }
        @media (max-width: 560px) {
          section:nth-of-type(6) > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   7. TESTIMONIALS / SOCIAL PROOF
   ═══════════════════════════════════════════ */
function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section style={{
      background: '#23447A', padding: '80px 48px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...inFade(inView, 0)} style={{
          display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
          fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
          border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
        }}>What Our Customers Say</motion.div>

        <motion.div {...inFade(inView, 0.12)} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32,
        }}>
          {[
            {
              quote: 'Switching to Blau Batch for our full masterbatch requirement reduced our vendor management overhead significantly. One supplier, consistent quality, faster lead times.',
              name: 'Customer Testimonial',
              role: 'Packaging Manufacturer — Egypt',
            },
            {
              quote: 'Their technical team helped us optimise our CaCO\u2083 loading for blown film, reducing material cost without affecting line speed. That is the kind of partnership we value.',
              name: 'Customer Testimonial',
              role: 'Pipe Producer — Saudi Arabia',
            },
          ].map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14, padding: '30px 28px', textAlign: 'left',
            }}>
              {/* IMAGE PLACEHOLDER: Replace with customer logo or photo */}
              {/* Suggested: Customer company logo (anonymised if needed) */}
              <div style={{
                width: 48, height: 48, borderRadius: 10, marginBottom: 18,
                background: 'rgba(43,141,208,0.12)', border: '1px solid rgba(43,141,208,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {/* <img src={`/testimonials/logo-${i+1}.png`} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} /> */}
                Logo
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          section:nth-of-type(7) > div > div:last-child { grid-template-columns: 1fr !important; }
          section:nth-of-type(7) { padding: 56px 20px !important; }
        }
      `}</style>
    </section>
  )
}

/* ═══════════════════════════════════════════
   8. LEAD FORM — Campaign conversion section
   ═══════════════════════════════════════════ */
function LeadFormSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    product: '', name: '', company: '', email: '', phone: '', country: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: '#F8FAFC', border: '1px solid #CBD5E1',
    borderRadius: 8, color: '#1E293B',
    fontFamily: 'Open Sans, sans-serif', fontSize: 14,
    transition: 'border-color 0.2s', outline: 'none',
  }

  const labelStyle = {
    fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748B',
    marginBottom: 8, display: 'block',
  }

  return (
    <section id="get-quote" style={{
      background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(46,127,208,0.1) 0%, transparent 65%), #141B3E`,
      padding: '100px 48px',
    }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}>

        {/* Left — CTA text */}
        <div>
          <motion.div {...inFade(inView, 0)} style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            border: '1px solid rgba(74,170,224,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
          }}>Request a Quote</motion.div>

          <motion.h2 {...inFade(inView, 0.08)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.1, color: '#fff', marginBottom: 16,
          }}>
            Let's Talk<br />
            <span style={{ background: 'linear-gradient(135deg, #2B8DD0, #6AB4E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Production.
            </span>
          </motion.h2>

          <motion.p {...inFade(inView, 0.14)} style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 36, maxWidth: 400,
          }}>
            Tell us what you need — polymer type, application, and target volume. Our technical team will respond with a grade recommendation and competitive quote within 24 hours.
          </motion.p>

          {/* What you get */}
          <div style={{ marginBottom: 32 }}>
            {[
              'Grade recommendation for your application',
              'Competitive pricing with flexible MOQs',
              'Technical data sheets for every grade',
              'Sample availability for trial runs',
              'Dedicated account manager',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
                <CheckCircle2 size={14} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: Mail, label: 'Email', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com' },
              { icon: Phone, label: 'Phone', val: '+2 0102 222 7723', href: 'tel:+201022227723' },
              { icon: MessageSquare, label: 'WhatsApp', val: 'Message us directly', href: 'https://wa.me/201022227723', green: true },
            ].map(c => (
              <a key={c.label} href={c.href} target={c.green ? '_blank' : undefined} rel={c.green ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)', transition: 'all 0.2s', textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: c.green ? 'rgba(37,211,102,0.12)' : 'rgba(46,127,208,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <c.icon size={15} color={c.green ? '#25D366' : '#2B8DD0'} strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: c.green ? '#25D366' : '#fff' }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <motion.div {...inFade(inView, 0.2)} style={{
          background: '#fff', borderRadius: 18, padding: '36px 32px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px',
                background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 size={28} color="#22C55E" />
              </div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 22, color: '#141B3E', marginBottom: 10, letterSpacing: '-0.02em' }}>Quote Request Received</h3>
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, maxWidth: 340, margin: '0 auto' }}>
                Our technical team will review your requirements and respond within 24 business hours with a grade recommendation and pricing.
              </p>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step >= s ? '#2B8DD0' : '#E2E8F0', color: step >= s ? '#fff' : '#94A3B8',
                      fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800,
                    }}>{s}</div>
                    <span style={{
                      fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: step >= s ? '#1E293B' : '#94A3B8',
                    }}>{s === 1 ? 'Product' : 'Your Details'}</span>
                    {s < 2 && <div style={{ width: 40, height: 1, background: '#E2E8F0', margin: '0 4px' }} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <div style={labelStyle}>What product are you looking for?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                    {PRODUCT_OPTIONS.map(p => (
                      <button key={p} onClick={() => update('product', p)} style={{
                        padding: '14px 16px', borderRadius: 10, border: form.product === p ? '2px solid #2B8DD0' : '1px solid #E2E8F0',
                        background: form.product === p ? 'rgba(43,141,208,0.06)' : '#F8FAFC',
                        cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'Open Sans, sans-serif', fontSize: 13,
                        color: form.product === p ? '#2B8DD0' : '#475569', fontWeight: form.product === p ? 600 : 400,
                        transition: 'all 0.15s',
                      }}>
                        {p}
                      </button>
                    ))}
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Tell us about your application (optional)</label>
                    <textarea
                      rows={3} value={form.message} onChange={e => update('message', e.target.value)}
                      placeholder="E.g., Blown film for packaging, 30% filler loading, 200 MT/month..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                      onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                      onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                    />
                  </div>

                  <button onClick={() => form.product && setStep(2)} style={{
                    width: '100%', padding: '14px', background: form.product ? '#2B8DD0' : '#CBD5E1',
                    color: '#fff', border: 'none', borderRadius: 9,
                    fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    cursor: form.product ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                  onMouseEnter={e => form.product && (e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,127,208,0.35)')}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                        placeholder="Your name" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                        onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Company *</label>
                      <input type="text" value={form.company} onChange={e => update('company', e.target.value)}
                        placeholder="Company name" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                        onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                        placeholder="you@company.com" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                        onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone / WhatsApp</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                        placeholder="+20 xxx xxx xxxx" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                        onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Country</label>
                    <input type="text" value={form.country} onChange={e => update('country', e.target.value)}
                      placeholder="E.g., Egypt, Saudi Arabia, UAE..." style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#2B8DD0'}
                      onBlur={e => e.target.style.borderColor = '#CBD5E1'}
                    />
                  </div>

                  {/* Summary */}
                  <div style={{
                    background: '#F1F5F9', borderRadius: 10, padding: '14px 16px', marginBottom: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Selected Product</div>
                      <div style={{ fontSize: 13, color: '#1E293B', fontWeight: 600 }}>{form.product}</div>
                    </div>
                    <button onClick={() => setStep(1)} style={{
                      fontSize: 11, color: '#2B8DD0', background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                    }}>Change</button>
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setStep(1)} style={{
                      padding: '14px 20px', background: 'transparent', color: '#64748B',
                      border: '1px solid #CBD5E1', borderRadius: 9,
                      fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
                      letterSpacing: '0.06em', cursor: 'pointer',
                    }}>Back</button>

                    <button onClick={() => {
                      if (form.name && form.company && form.email) setSubmitted(true)
                    }} style={{
                      flex: 1, padding: '14px', background: (form.name && form.company && form.email) ? '#2B8DD0' : '#CBD5E1',
                      color: '#fff', border: 'none', borderRadius: 9,
                      fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800,
                      letterSpacing: '0.07em', textTransform: 'uppercase',
                      cursor: (form.name && form.company && form.email) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                    onMouseEnter={e => (form.name && form.company && form.email) && (e.currentTarget.style.boxShadow = '0 8px 24px rgba(46,127,208,0.35)')}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                      <Mail size={14} /> Submit Quote Request
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #get-quote > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #get-quote { padding: 64px 20px !important; }
        }
        @media (max-width: 560px) {
          #get-quote div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
