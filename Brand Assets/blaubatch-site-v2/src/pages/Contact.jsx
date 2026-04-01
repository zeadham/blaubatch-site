import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import QuoteForm from '../components/shared/QuoteForm'
import Footer from '../components/Footer'

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Contact' }}
        tag="Get in Touch"
        title="Let's talk"
        titleAccent="production."
        sub="Request a quote, ask about our product range, or get technical support. We respond to all inquiries within 24 hours."
        visual={{
          img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format',
          bg: 'linear-gradient(145deg, #021a10 0%, #043520 35%, #06542e 70%, #094a28 100%)',
          dots: 'rgba(37,211,102,0.14)',
          symbol: '24h',
          accent: '#25D366',
          chip: 'QUICK RESPONSE',
          stat: { n: '24h', label: 'Response Time' },
        }}
        cta={{
          primary: { label: 'Email Us', href: 'mailto:info@blaubatch.com' },
          secondary: { label: 'WhatsApp Us', href: 'https://wa.me/201022227723' },
        }}
      />

      <section id="quote-form" style={{ background: '#141B3E', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'start' }}>

          {/* Contact sidebar */}
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Direct Channels</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 32 }}>
              {[
                { icon: Mail, label: 'Email', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com' },
                { icon: MessageSquare, label: 'WhatsApp', val: 'Message us directly', href: 'https://wa.me/201022227723', green: true },
                { icon: Phone, label: 'Phone', val: '+2 0102 222 7723', href: 'tel:+201022227723' },
                { icon: Clock, label: 'Response Time', val: 'Within 24 business hours', href: null },
              ].map(c => (
                <a key={c.label} href={c.href || undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: 16, border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10,
                    background: 'rgba(255,255,255,0.03)', transition: 'all 0.2s', cursor: c.href ? 'pointer' : 'default',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => c.href && (e.currentTarget.style.borderColor = 'rgba(46,127,208,0.3)', e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)', e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 8, background: c.green ? 'rgba(37,211,102,0.12)' : 'rgba(46,127,208,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <c.icon size={17} color={c.green ? '#25D366' : '#2B8DD0'} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: c.green ? '#25D366' : '#fff' }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>⏱ Working Hours</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 2, marginBottom: 4 }}>
                Saturday – Thursday
              </div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 14, color: '#fff' }}>9:00 AM – 5:00 PM</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Cairo EET / UTC+2</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, background: '#22C55E', borderRadius: '50%', flexShrink: 0, animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                <strong style={{ color: '#fff' }}>We respond within 24 hours</strong> — usually much faster during business hours.
              </span>
            </div>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Our Locations</div>
              {[
                { label: 'Head Office', addr: 'Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt' },
                { label: 'Factory', addr: '79, 6th Industrial Zone, 6th of October City, Giza, Egypt' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <MapPin size={15} color="rgba(255,255,255,0.35)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{l.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{l.addr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-step Quote Form */}
          <QuoteForm />
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @media(max-width:900px){
          #quote-form > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #quote-form { padding: 56px 20px !important; }
        }
        @media(max-width:560px){
          #quote-form div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #23447A; color: #fff; }
      `}</style>
    </>
  )
}
