import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../../components/shared/PageHero'
import QuoteForm from '../../components/shared/QuoteForm'
import Footer from '../../components/Footer'

/**
 * Shared template for all industry landing pages.
 * Pass `config` prop with all content data.
 */
export default function IndustryPage({ config }) {
  const appsRef = useRef(null)
  const appsInView = useInView(appsRef, { once: true, margin: '-60px' })
  const productsRef = useRef(null)
  const productsInView = useInView(productsRef, { once: true, margin: '-60px' })
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  const { hero, applications, products, keyPoints, quoteForm } = config

  return (
    <>
      <PageHero
        breadcrumb={{ current: hero.title, parent: 'Industries', parentHref: '/#industries' }}
        badge={hero.badge}
        badgeColor={hero.accentColor}
        title={hero.title}
        titleAccent={hero.titleAccent}
        sub={hero.sub}
        visual={hero.visual}
        cta={{
          primary: { label: 'Request a Quote', href: '#quote-form' },
          secondary: { label: 'View Products', href: '#products' },
        }}
      />

      {/* Applications */}
      <section style={{ background: '#141B3E', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            ref={appsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section header */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: hero.accentColor, border: `1px solid ${hero.accentColor}45`, borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Applications</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8, color: '#fff' }}>{applications.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>{applications.sub}</p>
            </div>

            {/* Application cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 48 }}>
              {applications.items.map((app, i) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={appsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.06 }}
                  style={{
                    padding: '20px 18px', background: '#23447A',
                    border: `1px solid ${hero.accentColor}18`, borderRadius: 12,
                  }}
                >
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{app.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.52)', lineHeight: 1.6 }}>{app.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Key points */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {keyPoints.map(pt => (
                <div key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: '#23447A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
                  <CheckCircle2 size={15} color={hero.accentColor} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommended Products */}
      <section id="products" style={{ background: '#08111e', padding: '80px 48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            ref={productsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: hero.accentColor, border: `1px solid ${hero.accentColor}45`, borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Recommended Grades</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8, color: '#fff' }}>Products for {products.industryName}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>{products.sub}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {products.items.map((prod, i) => (
                <motion.div
                  key={prod.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={productsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                  style={{
                    background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 14, padding: '22px 20px',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, color: hero.accentColor, letterSpacing: '0.06em' }}>{prod.series}</span>
                    {prod.tag && (
                      <span style={{ fontSize: 8, fontWeight: 800, padding: '2px 6px', borderRadius: 3, background: `${hero.accentColor}20`, color: hero.accentColor, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.06em', border: `1px solid ${hero.accentColor}35` }}>{prod.tag}</span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{prod.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{prod.desc}</div>
                  <Link
                    to={prod.href}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
                      color: hero.accentColor, letterSpacing: '0.04em',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    View product <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote-form" ref={formRef} style={{ background: '#141B3E', padding: '80px 48px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 14 }}>Request a Quote</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8, color: '#fff' }}>Get Pricing for {quoteForm.industryLabel}</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 520 }}>Tell us your application and volume — we'll respond within 24 hours with grade recommendations and pricing.</p>
          </motion.div>
          <QuoteForm
            products={quoteForm.products}
            defaultProduct={quoteForm.defaultProduct}
            applications={quoteForm.applications}
            step1Title="Select Product Type"
            step1Sub="Choose a masterbatch type for your application"
          />
        </div>
      </section>

      <Footer />

      <style>{`@media(max-width:900px){
        section { padding-left: 20px !important; padding-right: 20px !important; }
        section > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        section > div > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
      }`}</style>
    </>
  )
}
