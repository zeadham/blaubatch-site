import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Factory, Globe, Award, Users } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import Footer from '../components/Footer'

const STATS = [
  { val: '85%', label: 'Max CaCO₃ Loading', sub: 'FMPE & FMPP Series' },
  { val: '24h', label: 'Quote Response Time', sub: 'For qualified enquiries' },
  { val: '6+', label: 'Product Lines', sub: 'Manufactured & distributed' },
  { val: 'MENA', label: 'Primary Market', sub: 'Egypt · Gulf · Levant' },
]

const PILLARS = [
  { icon: Factory, title: 'In-House Manufacturing', desc: 'Our 6th of October City facility produces FMPE and FMPP Series masterbatch — giving us direct control over raw material selection, compounding, and QC. Every batch is tested for MFI, ash content, colour, and dispersibility before dispatch.' },
  { icon: Globe, title: 'Exclusive Distribution', desc: 'For the full product spectrum — white, black, colour, and additive masterbatch — we are the exclusive regional distributor for Coraplast, a globally certified manufacturer operating to ISO 9001 and ISO 14001 standards.' },
  { icon: Award, title: 'Technical Competence', desc: 'Our team brings deep processing knowledge across blown film, raffia, pipe, injection moulding, and extrusion coating lines. We don\'t just ship pellets — we recommend the right grade and dosage for your specific machine and application.' },
  { icon: Users, title: 'Responsive Partnership', desc: 'We operate as a hands-on partner, not a catalogue supplier. Quick sampling, technical data on request, and direct access to our compounding engineers — without the overhead of a multinational sales structure.' },
]

const TIMELINE = [
  { year: 'Founded', event: 'Blau Batch established in 6th of October City, Egypt — focusing on PE filler masterbatch production for the regional film and packaging sector.' },
  { year: 'Manufacturing', event: 'In-house compounding line commissioned. FMPE Series (70–80% CaCO₃) introduced — positioned as a domestic alternative to imported filler masterbatch.' },
  { year: 'Distribution', event: 'Partnership established with Coraplast for regional distribution of white, black, colour, and additive masterbatch product lines across MENA.' },
  { year: 'Expansion', event: 'FMPP Series (PP carrier) launched to serve raffia, non-woven, and BOPP film producers. Product portfolio now covers PE and PP across all major applications.' },
  { year: 'Today', event: 'Serving plastic manufacturers across Egypt, Gulf Cooperation Council markets, and the Levant — with ambitions to expand into European distribution channels.' },
]

export default function AboutPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-60px' })
  const inView2 = useInView(ref2, { once: true, margin: '-60px' })
  const inView3 = useInView(ref3, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'About' }}
        tag="Our Story"
        title="Masterbatch, Made"
        titleAccent="to a Higher Standard"
        sub="Egyptian masterbatch manufacturer and regional distributor. We produce filler masterbatch in-house and bring the full Coraplast range to plastics producers across MENA and Europe."
        visual={{
          img: '/images/hero_abstract_powder_1774906668418.png',
          bg: 'linear-gradient(145deg, #0a1830 0%, #23447A 40%, #1e3258 75%, #0d1829 100%)',
          dots: 'rgba(46,127,208,0.14)',
          symbol: 'BLAU',
          accent: '#2B8DD0',
          chip: 'EST. EGYPT',
          stat: { n: '6th Oct', label: 'Production City' },
        }}
        cta={{
          primary: { label: 'View Our Products', href: '/#products' },
          secondary: { label: 'Contact Us', href: '/contact' },
        }}
      />

      {/* Stats bar */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px 24px', borderRight: i < STATS.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#2B8DD0', lineHeight: 1, marginBottom: 6 }}>{s.val}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, color: '#141B3E', letterSpacing: '0.04em', marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Four pillars */}
      <section style={{ background: '#F4F7FB', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={ref1}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >How We Operate</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 40, lineHeight: 1.1, color: '#141B3E' }}
            >Our Four Pillars</motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {PILLARS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 24 }} animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '28px', display: 'flex', gap: 18 }}
              >
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <p.icon size={22} color="#2B8DD0" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 900, color: '#141B3E', marginBottom: 8 }}>{p.title}</div>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: '#FFFFFF', padding: '88px 48px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 72, alignItems: 'start' }}>
          <div ref={ref2}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.35)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >Our Journey</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 18, lineHeight: 1.1, color: '#141B3E' }}
            >Built to Last</motion.h2>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8 }}>From a focused PE filler masterbatch producer to a full-spectrum masterbatch partner for the MENA region — our growth has been deliberate and technically grounded.</p>
          </div>
          <div>
            {TIMELINE.map((t, i) => (
              <motion.div key={t.year}
                initial={{ opacity: 0, x: 20 }} animate={inView2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{ display: 'flex', gap: 20, paddingBottom: i < TIMELINE.length - 1 ? 28 : 0, position: 'relative' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2B8DD0', border: '2px solid #2B8DD0', marginTop: 4, flexShrink: 0 }} />
                  {i < TIMELINE.length - 1 && <div style={{ width: 1, flex: 1, background: 'rgba(46,127,208,0.25)', marginTop: 6 }} />}
                </div>
                <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 12 : 0 }}>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, color: '#2B8DD0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{t.year}</div>
                  <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.75 }}>{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#F4F7FB', padding: '88px 48px', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={ref3} style={{ textAlign: 'center', marginBottom: 56 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >What We Stand For</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView3 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#141B3E' }}
            >Our Commitments</motion.h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { title: 'Consistency', desc: 'Every batch meets the same specification. Our QC process exists so your process doesn\'t have to compensate for ours.' },
              { title: 'Transparency', desc: 'Full traceability from raw material intake to dispatch. TDS and CoA available on request for every shipment.' },
              { title: 'Technical Depth', desc: 'We understand your machine, not just our product. Grade selection and dosage advice are part of the service.' },
            ].map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 24 }} animate={inView3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: '28px' }}
              >
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 900, color: '#141B3E', marginBottom: 12 }}>{v.title}</div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.75 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(150deg, #EFF6FF, #F4F7FB)', padding: '80px 48px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', marginBottom: 16 }}>Work With Us</div>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 16, lineHeight: 1.1, color: '#141B3E' }}>Ready to discuss your requirements?</h2>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>Tell us about your process, your polymer, and your target application. We'll respond within 24 hours.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@blaubatch.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: '#2B8DD0', color: '#fff', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none' }}
            >Contact Us <ArrowRight size={14} /></a>
            <Link to="/distributors" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: 'transparent', color: '#141B3E', border: '1px solid #E2E8F0', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#94A3B8'; e.currentTarget.style.background = 'rgba(0,0,0,0.02)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = 'transparent' }}
            >Find a Distributor</Link>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } section { padding: 56px 20px !important; } }`}</style>
    </>
  )
}
