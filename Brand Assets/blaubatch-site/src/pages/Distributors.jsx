import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Globe, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/shared/PageHero'
import Footer from '../components/Footer'

const REGIONS = [
  {
    region: 'Egypt — Direct',
    flag: '🇪🇬',
    coverage: 'All governorates',
    desc: 'All Egyptian customers are served directly by Blau Batch from our 6th of October City facility. Direct sales, technical support, and logistics coordination.',
    contacts: [
      { label: 'Sales & Technical', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com' },
      { label: 'WhatsApp', val: 'Available on request', href: null },
    ],
    type: 'direct',
  },
  {
    region: 'Gulf Cooperation Council',
    flag: '🌍',
    coverage: 'UAE · Saudi Arabia · Kuwait · Qatar · Bahrain · Oman',
    desc: 'GCC markets are served through a combination of direct export from Egypt and appointed regional distributors. Contact us for the distributor in your country.',
    contacts: [
      { label: 'Export Enquiries', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com?subject=GCC Distribution Enquiry' },
    ],
    type: 'partner',
  },
  {
    region: 'Levant',
    flag: '🌍',
    coverage: 'Jordan · Lebanon · Palestine · Syria (where accessible)',
    desc: 'Levant distribution is handled through regional trading partners with local logistics and technical support capability.',
    contacts: [
      { label: 'Regional Enquiries', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com?subject=Levant Distribution Enquiry' },
    ],
    type: 'partner',
  },
  {
    region: 'North Africa',
    flag: '🌍',
    coverage: 'Libya · Tunisia · Algeria · Morocco (selected markets)',
    desc: 'North African markets beyond Egypt are served on a project basis. Minimum order quantities apply for export shipments.',
    contacts: [
      { label: 'Export Enquiries', val: 'info@blaubatch.com', href: 'mailto:info@blaubatch.com?subject=North Africa Export Enquiry' },
    ],
    type: 'partner',
  },
]

const CORAPLAST_MARKETS = [
  'Germany', 'France', 'Italy', 'Spain', 'United Kingdom',
  'Poland', 'Turkey', 'Czech Republic', 'Hungary', 'Romania',
]

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 8, color: '#fff', fontFamily: 'Open Sans, sans-serif', fontSize: 14,
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 7,
}

function FocusInput(props) {
  const [focused, setFocused] = useState(false)
  const style = { ...inputStyle, borderColor: focused ? 'rgba(46,127,208,0.55)' : 'rgba(255,255,255,0.09)' }
  const isTextarea = props.as === 'textarea'
  const isSelect = props.as === 'select'
  const commonProps = {
    style: isTextarea ? { ...style, resize: 'vertical', minHeight: 90, lineHeight: 1.6 }
           : isSelect ? { ...style, appearance: 'none', cursor: 'pointer',
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
               backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
             }
           : style,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...props,
    as: undefined,
  }
  if (isTextarea) return <textarea {...commonProps} />
  if (isSelect) return <select {...commonProps}>{props.children}</select>
  return <input {...commonProps} />
}

function DistributorForm() {
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '',
    territory: '', sector: '', volume: '', about: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.company || !form.name || !form.email || !form.phone || !form.territory) {
      alert('Please fill in all required fields.')
      return
    }
    setDone(true)
  }

  if (done) return (
    <div style={{ background: '#141B3E', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '48px 36px', textAlign: 'center' }}>
      <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: 26 }}>✅</div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Application received.</div>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 360, margin: '0 auto 24px' }}>
        Thank you for applying. We'll review your application and reach out within 48 business hours.
      </p>
      <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
        color: '#25D366', padding: '12px 20px', borderRadius: 8,
        fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700,
      }}>💬 Follow up on WhatsApp</a>
    </div>
  )

  return (
    <div style={{ background: '#141B3E', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '36px' }}>
      <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Distributor Application</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>Takes about 3 minutes to complete.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Company Name <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput placeholder="Your company name" value={form.company} onChange={e => set('company', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Your Name <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Email <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput type="email" placeholder="your@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Phone / WhatsApp <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput type="tel" placeholder="+20 / +966 / ..." value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Country / Territory <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput as="select" value={form.territory} onChange={e => set('territory', e.target.value)}>
            <option value="">Select your market</option>
            {['Jordan','Kuwait','Morocco','Algeria','Libya','Iraq','Romania','Bulgaria','Saudi Arabia','UAE','Turkey','Poland',"Other — I'll specify below"].map(t => (
              <option key={t} value={t} style={{ background: '#23447A' }}>{t}</option>
            ))}
          </FocusInput>
        </div>
        <div>
          <label style={labelStyle}>Plastics Sector Focus <span style={{ color: '#2B8DD0' }}>*</span></label>
          <FocusInput as="select" value={form.sector} onChange={e => set('sector', e.target.value)}>
            <option value="">Primary industry served</option>
            {['Film & Flexible Packaging','Pipe & Profile Extrusion','Injection Molding','Woven Bags / Raffia','Blow Molding','Non-woven','Mixed / General Plastics'].map(s => (
              <option key={s} value={s} style={{ background: '#23447A' }}>{s}</option>
            ))}
          </FocusInput>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Estimated Annual Masterbatch Volume <span style={{ color: '#2B8DD0' }}>*</span></label>
        <FocusInput as="select" value={form.volume} onChange={e => set('volume', e.target.value)}>
          <option value="">How much do you expect to sell annually?</option>
          {['Under 10 MT (exploring)','10 – 30 MT','30 – 100 MT','100 – 500 MT','500 MT+ (high volume)'].map(v => (
            <option key={v} value={v} style={{ background: '#23447A' }}>{v}</option>
          ))}
        </FocusInput>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Tell us about your business</label>
        <FocusInput as="textarea" placeholder="Brief description of your company, current supplier relationships, and why you're interested in partnering with Blau Batch..." value={form.about} onChange={e => set('about', e.target.value)} />
      </div>

      <button onClick={submit} style={{
        width: '100%', padding: '14px', background: '#2B8DD0', color: '#fff', border: 'none',
        borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700,
        cursor: 'pointer', transition: 'background 0.2s',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
      onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
      >Submit Application ↗</button>
    </div>
  )
}

export default function DistributorsPage() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const inView1 = useInView(ref1, { once: true, margin: '-60px' })
  const inView2 = useInView(ref2, { once: true, margin: '-60px' })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Distributors' }}
        tag="Where We Operate"
        title="MENA Distribution"
        titleAccent="Network"
        sub="Blau Batch serves plastic manufacturers across Egypt, the Gulf Cooperation Council, the Levant, and selected North African markets — directly and through regional distribution partners."
        cta={{
          primary: { label: 'Contact for Your Region', href: 'mailto:info@blaubatch.com?subject=Distribution / Export Enquiry' },
          secondary: { label: 'Become a Distributor', href: '#become-distributor' },
        }}
      />

      {/* Regional cards */}
      <section style={{ background: '#141B3E', padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div ref={ref1}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >Regional Coverage</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView1 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 40, lineHeight: 1.1 }}
            >Markets We Serve</motion.h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            {REGIONS.map((r, i) => (
              <motion.div key={r.region}
                initial={{ opacity: 0, y: 24 }} animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
                style={{ background: '#23447A', border: `1px solid ${r.type === 'direct' ? 'rgba(212,132,10,0.25)' : 'rgba(255,255,255,0.09)'}`, borderRadius: 14, padding: '28px', position: 'relative', overflow: 'hidden' }}
              >
                {r.type === 'direct' && (
                  <div style={{ position: 'absolute', top: 18, right: 18, fontFamily: 'Montserrat, sans-serif', fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 3, background: 'rgba(212,132,10,0.2)', color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)' }}>Direct Sales</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{r.flag}</span>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 900, color: '#fff' }}>{r.region}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 2 }}>{r.coverage}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 18 }}>{r.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {r.contacts.map(c => (
                    <div key={c.label} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', minWidth: 90 }}>{c.label}</span>
                      {c.href ? (
                        <a href={c.href} style={{ fontSize: 12, color: '#2B8DD0', fontWeight: 600 }}>{c.val}</a>
                      ) : (
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{c.val}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coraplast network */}
      <section style={{ background: '#23447A', padding: '88px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div ref={ref2}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(46,127,208,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16 }}
            >Our Supply Partner</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView2 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 16, lineHeight: 1.1 }}
            >Coraplast — Global Reach</motion.h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 24 }}>For white, black, colour, and additive masterbatch lines, Blau Batch is the regional distributor for Coraplast — an internationally certified manufacturer with a global distribution footprint and an ISO 9001 / ISO 14001 quality system.</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>European customers sourcing Coraplast products can be connected directly. Contact us with your product requirements and region.</p>
          </div>
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>Coraplast European Markets</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
              {CORAPLAST_MARKETS.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#141B3E', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Globe size={12} color="rgba(46,127,208,0.6)" />
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{m}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(46,127,208,0.1)', border: '1px solid rgba(46,127,208,0.2)', borderRadius: 10 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, color: '#2B8DD0', marginBottom: 4 }}>Coraplast Certifications</div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>ISO 9001 · ISO 14001 · REACH compliant · EU 10/2011 food-contact grades available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor Application Form */}
      <section id="apply" style={{ background: '#23447A', padding: '80px 48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60, alignItems: 'start' }}>

          {/* Left info */}
          <div>
            <div style={{ display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(74,170,224,0.25)', borderRadius: 4, padding: '4px 10px', marginBottom: 16 }}>Apply Now</div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>Tell us about your business.</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 24 }}>We review every application personally. You'll hear from us within 48 business hours. No automated rejection emails — if we're not the right fit, we'll tell you why.</p>

            <div style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: '20px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 12 }}>Our commitment to you</div>
              {['Response within 48 business hours', 'Honest feedback even if we pass', 'Your information stays confidential', 'No pushy sales follow-up'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                  <CheckCircle2 size={14} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px', background: 'rgba(46,127,208,0.06)', border: '1px solid rgba(46,127,208,0.15)', borderRadius: 10 }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700, color: '#2B8DD0', marginBottom: 8 }}>Prefer to talk first?</div>
              <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#25D366', fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700 }}>
                💬 WhatsApp us before applying
              </a>
            </div>
          </div>

          {/* Right form */}
          <DistributorForm />
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } section { padding: 56px 20px !important; } }`}</style>
    </>
  )
}
