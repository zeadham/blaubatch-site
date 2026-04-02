import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{
      background: `
        radial-gradient(ellipse 60% 80% at 50% 50%, rgba(43,141,208,0.08) 0%, transparent 65%),
        #F0F5FA
      `,
      padding: '100px 48px',
      borderTop: '1px solid rgba(20,27,62,0.08)',
    }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0',
            border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 20,
          }}
        >Get Started</motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(30px, 5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20,
          }}
        >
          Ready to Optimise Your<br />
          <span style={{ background: 'linear-gradient(135deg, #2B8DD0, #2B8DD0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Masterbatch Supply?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16 }}
          style={{ fontSize: 16, color: 'rgba(20,27,62,0.6)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 44px' }}
        >
          Send your specification and our technical team will respond with a grade recommendation and quote within 24 hours.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.24 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}
        >
          <a href="/contact#quote-form" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 32px', background: '#2B8DD0', color: '#fff',
            borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
            fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
            transition: 'all 0.2s', border: '1px solid transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(46,127,208,0.42)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <Mail size={15} /> Request a Quote <ArrowRight size={14} />
          </a>

          <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '15px 32px', background: 'transparent', color: '#25D366',
            borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 13,
            fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
            border: '1px solid rgba(37,211,102,0.35)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Contact info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
        >
          {[
            { icon: Mail, label: 'Email', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com' },
            { icon: Phone, label: 'Phone', val: '+2 0102 2227723', href: 'tel:+20102222723' },
            { icon: MapPin, label: 'Office', val: 'Arkan Plaza, Sheikh Zayed City, Giza', href: '#' },
          ].map(({ icon: Icon, label, val, href }) => (
            <a key={label} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#fff', border: '1px solid rgba(20,27,62,0.1)',
              borderRadius: 12, padding: '16px 20px', textAlign: 'left', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,141,208,0.3)'; e.currentTarget.style.background = '#F5F9FF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,27,62,0.1)'; e.currentTarget.style.background = '#fff' }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 9, background: 'rgba(46,127,208,0.12)', border: '1px solid rgba(46,127,208,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="#2B8DD0" />
              </div>
              <div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(20,27,62,0.45)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#141B3E', fontWeight: 500 }}>{val}</div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          section[id] + section { padding: 64px 20px !important; }
          section:last-of-type > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
