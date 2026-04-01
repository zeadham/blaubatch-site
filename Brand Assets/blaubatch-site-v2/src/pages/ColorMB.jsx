import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Palette, CheckCircle2, FlaskConical, Leaf, Sun, Film, Settings, Home, ShoppingBag, Car, Shirt } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import ColorQuoteForm from '../components/shared/ColorQuoteForm'
import IsoBadges from '../components/shared/IsoBadges'
import Footer from '../components/Footer'

const FAMILIES = [
  { name: 'Standard Colours', sub: 'RAL & Pantone library', desc: 'Over 2,000 stocked references across RAL Classic, RAL Design, and Pantone TPX systems — ready for immediate sampling.', icon: Palette },
  { name: 'Custom Matching', sub: 'Colour lab service', desc: 'Submit a physical sample, brand reference, or colour code. We return matched pellets and a ΔE report within 5 business days.', icon: FlaskConical },
  { name: 'Food-Contact Grades', sub: 'EU 10/2011 & FDA', desc: 'White, black, and colour masterbatch grades compliant with EU 10/2011 Regulation and FDA 21 CFR for food packaging applications.', icon: Leaf },
  { name: 'UV-Stable Colours', sub: 'Lightfastness 7–8', desc: 'Outdoor-grade colours with ISO 105-B02 lightfastness ratings ≥7. Suitable for agricultural film, pipe, and construction profiles.', icon: Sun },
  { name: 'Masterbatch for Film', sub: 'Blown & cast film grades', desc: 'Low MFI concentrates designed for thin film lines — excellent dispersibility, no gels, optimised let-down ratios.', icon: Film },
  { name: 'Engineering Polymer Grades', sub: 'ABS · PA · PC · PET', desc: 'High-temperature stable pigment systems for ABS, polyamide, polycarbonate, and PET resins.', icon: Settings },
]

const CARRIERS = [
  { resin: 'LDPE / LLDPE', use: 'Blown film, cast film, packaging' },
  { resin: 'HDPE', use: 'Containers, pipes, profiles' },
  { resin: 'PP Homopolymer', use: 'Raffia, non-woven, injection moulding' },
  { resin: 'PP Copolymer', use: 'Flexible PP, thermoforming' },
  { resin: 'PS / HIPS', use: 'Consumer goods, packaging' },
  { resin: 'ABS', use: 'Automotive, electronics, consumer' },
]

const CMB_INDUSTRIES = [
  { icon: Home, name: 'Consumer Goods', desc: 'Coloured packaging, household products, toys, and personal care containers. Colour MB enables brand-consistent RAL/Pantone shades across PE and PP substrates.', tags: ['Household', 'Personal Care', 'Toys'] },
  { icon: ShoppingBag, name: 'Packaging & Retail', href: '/industries/packaging', desc: 'Branded retail packaging, coloured film, and decorative bags. Custom colour development from reference samples or RAL/Pantone codes with ΔE ≤ 0.5 consistency.', tags: ['Retail Packaging', 'Coloured Film', 'Bags'] },
  { icon: Car, name: 'Automotive', href: '/industries/automotive', desc: 'Interior trim components, technical parts, and under-bonnet applications in PP and PA compounds. Colour matched to OEM specifications with heat-stable pigment systems.', tags: ['Interior Trim', 'Technical Parts', 'PP Compounds'] },
  { icon: Shirt, name: 'Textiles & Non-Woven', href: '/industries/textiles', desc: 'Coloured fibres, carpet backing yarns, and coloured non-wovens. Colour MB in PP carrier for fibre and non-woven applications with controlled MFI.', tags: ['Coloured Fibre', 'Carpet Yarn', 'NW Fabric'] },
]

const ADVANTAGES = [
  'Coraplast-sourced — global manufacturing partner with ISO 9001 and ISO 14001 certification',
  'Consistent batch-to-batch ΔE ≤ 0.5 across production runs',
  'Wide carrier compatibility — PE, PP, PS, ABS, PA, PC, PET',
  'Typical let-down ratio 1–3% for standard applications',
  'Food-contact grades available with full regulatory documentation',
  'Custom development with physical sample or digital colour reference',
]

export default function ColorMBPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-60px' })
  const inView2 = useInView(ref2, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Colour Masterbatch', parent: 'Products', parentHref: '/#products' }}
        badge="CORAPLAST DISTRIBUTED"
        badgeColor="#2B8DD0"
        title="Colour Masterbatch"
        titleAccent="Full Spectrum Solutions"
        sub="Exact colour matching across RAL and Pantone systems, custom colour development, and food-contact compliant grades — for PE, PP, PS, ABS, PA, PC, and PET."
        visual={{
          img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format',
          bg: 'linear-gradient(145deg, #b83232 0%, #d4822a 25%, #c8b420 48%, #35a070 70%, #2860a0 100%)',
          dots: 'rgba(255,255,255,0.15)',
          symbol: 'RGB',
          accent: '#E8A030',
          chip: 'CMB SERIES',
          stat: { n: '1000+', label: 'Colours Available' },
        }}
        cta={{
          primary: { label: 'Request Colour Sample', href: '#quote-form' },
          secondary: { label: 'View Colour Families', href: '#colours' },
        }}
      />

      {/* Colour Families */}
      <section style={{ background: '#F4F7FB', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={ref1}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.35)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >Product Range</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 40, lineHeight: 1.1, color: '#141B3E' }}
            >Colour Product Families</motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {FAMILIES.map((f, i) => (
              <motion.div key={f.name}
                initial={{ opacity: 0, y: 24 }} animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '24px', transition: 'all 0.2s' }}
                whileHover={{ borderColor: 'rgba(46,127,208,0.35)', y: -3 }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(43,141,208,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <f.icon size={20} strokeWidth={1.5} color="#2B8DD0" />
                </div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 900, color: '#141B3E', marginBottom: 4 }}>{f.name}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700, color: '#2B8DD0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{f.sub}</div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages + Carrier Table */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div ref={ref2}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16, display: 'inline-block' }}>Why Choose Us</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: 28, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#141B3E' }}>Technical Advantages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {ADVANTAGES.map(a => (
                <div key={a} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid #E2E8F0', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: '#334155', lineHeight: 1.65 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16, display: 'inline-block' }}>Carrier Compatibility</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 28, fontWeight: 900, marginBottom: 28, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#141B3E' }}>By Resin Type</h2>
            <div style={{ background: '#F4F7FB', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#EFF6FF', borderBottom: '1px solid #E2E8F0', padding: '10px 20px' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>Carrier Resin</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}>Typical Applications</span>
              </div>
              {CARRIERS.map((c, i) => (
                <div key={c.resin} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '13px 20px', borderBottom: i < CARRIERS.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#2B8DD0' }}>{c.resin}</span>
                  <span style={{ fontSize: 12, color: '#475569' }}>{c.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Colour Process */}
      <section style={{ background: '#F4F7FB', padding: '88px 48px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.35)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}>Custom Development</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#141B3E' }}>Colour Matching Process</h2>
            <p style={{ fontSize: 14, color: '#475569', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>From reference to production-ready masterbatch in 5 business days</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              { step: '01', title: 'Submit Reference', desc: 'Send a physical sample, RAL/Pantone code, or hex value to our colour lab' },
              { step: '02', title: 'Lab Formulation', desc: 'Our colourists develop a pigment formula targeting your specification' },
              { step: '03', title: 'Sample & ΔE Report', desc: 'We produce matched pellets and issue a full ΔE measurement report' },
              { step: '04', title: 'Production Release', desc: 'Approved formula locked — consistent batch-to-batch ΔE ≤ 0.5' },
            ].map((s, i) => (
              <div key={s.step} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: i === 0 ? '14px 0 0 14px' : i === 3 ? '0 14px 14px 0' : 0, padding: '28px 24px', position: 'relative' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 36, fontWeight: 900, color: 'rgba(0,0,0,0.08)', lineHeight: 1, marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#141B3E', marginBottom: 8 }}>{s.title}</div>
                <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#FFFFFF', padding: '80px 48px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'linear-gradient(150deg, #23447A, #23447A)', border: '1px solid rgba(46,127,208,0.25)', borderRadius: 16, padding: '36px' }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 12 }}>Start Your Colour Project</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 26, fontWeight: 900, marginBottom: 14, letterSpacing: '-0.02em', color: '#fff' }}>Request Samples or Custom Match</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 24 }}>Share your colour target, target resin, and required volume — we'll handle the rest from formulation to delivery.</p>
            <a href="mailto:info@blaubatch.com?subject=Colour Masterbatch Enquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#2B8DD0', color: '#fff', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none' }}
            >Get Started <ArrowRight size={14} /></a>
          </div>
          <div style={{ background: '#F4F7FB', border: '1px solid #E2E8F0', borderRadius: 16, padding: '36px' }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 16 }}>Related Products</div>
            {[
              { name: 'FMPE Series', sub: 'PE Filler Masterbatch · 70–80% CaCO₃', href: '/fmpe' },
              { name: 'FMPP Series', sub: 'PP Filler Masterbatch · 70–80% CaCO₃', href: '/fmpp' },
              { name: 'Additive Masterbatch', sub: 'UV · Slip · Antiblock · Anti-static', href: '/#products' },
            ].map(p => (
              <Link key={p.name} to={p.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #E2E8F0', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#141B3E', marginBottom: 3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{p.sub}</div>
                </div>
                <ArrowRight size={16} color="rgba(0,0,0,0.2)" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section style={{ background: '#141B3E', padding: '72px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Industries</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, color: '#fff' }}>Where Colour Masterbatch Is Used</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Colour masterbatch is used wherever colour consistency, brand matching, and substrate compatibility are critical — from consumer packaging to technical automotive parts.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {CMB_INDUSTRIES.map(ind => {
              const Tag = ind.href ? 'a' : 'div'
              return (
                <Tag key={ind.name} href={ind.href} style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '24px', textDecoration: 'none', display: 'block', cursor: ind.href ? 'pointer' : 'default', transition: 'border-color 0.2s' }}
                  className={ind.href ? 'ind-link' : undefined}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(43,141,208,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <ind.icon size={20} strokeWidth={1.5} color="#2B8DD0" />
                  </div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, marginBottom: 8, color: '#fff' }}>{ind.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{ind.desc}</div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {ind.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(43,141,208,0.12)', borderRadius: 4, color: '#2B8DD0', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{t}</span>)}
                  </div>
                </Tag>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" style={{ background: '#141B3E', padding: '80px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(74,170,224,0.25)', borderRadius: 4, padding: '4px 10px', marginBottom: 14 }}>Request a Sample or Quote</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>Get a colour masterbatch quote.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>We respond within 24 hours.</p>
          </div>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <ColorQuoteForm />
          </div>
          <div style={{ maxWidth: 1200, margin: '40px auto 0' }}>
            <IsoBadges />
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } section { padding: 56px 20px !important; } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #23447A; color: #fff; }
        .ind-link:hover { border-color: rgba(43,141,208,0.4) !important; }
      `}</style>
    </>
  )
}
