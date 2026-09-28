import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_LABELS = ['Product', 'Quantity', 'Contact']

const DEFAULT_PRODUCTS = [
  { name: 'FMPE Series', sub: 'PE Carrier · 70–80% CaCO₃', value: 'FMPE Series — PE Filler Masterbatch' },
  { name: 'FMPP Series', sub: 'PP Carrier · 70–80% CaCO₃', value: 'FMPP Series — PP Filler Masterbatch' },
  { name: 'Color Masterbatch', sub: 'Full color range · PE & PP', value: 'Color Masterbatch' },
  { name: 'Custom Formulation', sub: 'Tailored to your spec', value: 'Custom Formulation' },
]

const DEFAULT_APPLICATIONS = [
  'Blown Film', 'Cast Film', 'Injection Molding', 'Blow Molding',
  'Raffia / Woven Bags', 'Non-woven', 'Thermoforming', 'Pipe & Profile Extrusion', 'Other',
]

const QUANTITIES = [
  '500 kg – 1 MT (trial)', '1 MT – 5 MT', '5 MT – 20 MT', '20 MT – 50 MT', '50 MT+',
]

const REGIONS = [
  'Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Jordan', 'Turkey', 'Poland / Europe',
  "Other — I'll specify in the message",
]

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: 8, color: '#fff', fontFamily: 'Open Sans, sans-serif', fontSize: 14,
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 7,
}

function FocusInput(props) {
  const [focused, setFocused] = useState(false)
  const style = { ...inputStyle, borderColor: focused ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }
  const isTextarea = props.as === 'textarea'
  const isSelect = props.as === 'select'
  const commonProps = {
    style: isTextarea ? { ...style, resize: 'vertical', minHeight: 100, lineHeight: 1.6 }
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

const btnNext = {
  padding: '12px 24px', background: '#fff', color: '#1A5AB8', border: 'none',
  borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800,
  cursor: 'pointer', transition: 'background 0.2s',
}
const btnBack = {
  padding: '12px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7,
  fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
}

export default function QuoteForm({
  products = DEFAULT_PRODUCTS,
  defaultProduct,
  applications = DEFAULT_APPLICATIONS,
  step1Title = 'What are you looking for?',
  step1Sub = 'Select a product to get started.',
}) {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [product, setProduct] = useState(defaultProduct || products[0]?.value || '')
  const [form, setForm] = useState({
    grade: '', application: '',
    qty: '', frequency: '', region: '', details: '',
    name: '', company: '', email: '', phone: '', contactMethod: 'Email',
  })
  const formRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const goStep = (n) => {
    setStep(n)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!form.name || !form.email || !form.phone || !form.company) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    const payload = { product, ...form }
    try {
      const res = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } catch {
      setSubmitting(false)
      alert('Sorry, your request could not be sent. Please email us at adham.zahran@blaubatch.com.')
      return
    }
    setSubmitting(false)
    setDone(true)
  }

  return (
    <div ref={formRef} style={{ background: '#1A5AB8', border: '1px solid rgba(26,90,184,0.3)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(26,90,184,0.15)' }}>
      {!done && (
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const active = step === n
            const completed = step > n
            return (
              <div key={n} style={{
                flex: 1, padding: '16px', textAlign: 'center',
                borderBottom: `3px solid ${active ? '#fff' : 'transparent'}`,
                transition: 'all 0.2s', cursor: completed ? 'pointer' : 'default',
              }}
              onClick={() => completed && goStep(n)}
              >
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800,
                  color: completed ? '#fff' : active ? '#fff' : 'rgba(255,255,255,0.5)',
                  marginBottom: 2, letterSpacing: '0.05em',
                }}>
                  {completed ? '✓' : `0${n}`}
                </div>
                <div style={{ fontSize: 11, color: active ? '#fff' : 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            )
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="success"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ padding: '56px 36px', textAlign: 'center' }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: 28,
            }}>✅</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 10, color: '#fff' }}>
              Quote request received.
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 360, margin: '0 auto 28px' }}>
              Thank you. We'll review your requirements and get back to you within 24 hours — usually much sooner during business hours.
            </p>
            <a href="https://wa.me/201022227723" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
              color: '#25D366', padding: '12px 20px', borderRadius: 8,
              fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700,
            }}>
              💬 Follow up on WhatsApp
            </a>
          </motion.div>

        ) : step === 1 ? (
          <motion.div key="step1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6, color: '#fff' }}>{step1Title}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>{step1Sub}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {products.map(p => (
                <div key={p.value}
                  onClick={() => setProduct(p.value)}
                  style={{
                    padding: '14px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
                    border: product === p.value ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                    background: product === p.value ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, marginBottom: 3, color: '#fff' }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{p.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Grade / Specific requirement <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <FocusInput placeholder="e.g. FMPE-1080, or describe your need" value={form.grade} onChange={e => set('grade', e.target.value)} />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Application <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <FocusInput as="select" value={form.application} onChange={e => set('application', e.target.value)}>
                <option value="">Select your application</option>
                {applications.map(a => <option key={a} value={a} style={{ background: '#23447A' }}>{a}</option>)}
              </FocusInput>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <button onClick={() => goStep(2)} style={btnNext}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'none' }}
              >Next: Quantity & Region →</button>
            </div>
          </motion.div>

        ) : step === 2 ? (
          <motion.div key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6, color: '#fff' }}>Order details</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Help us prepare a precise quote.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Estimated Quantity <span style={{ color: '#2B8DD0' }}>*</span></label>
                <FocusInput as="select" value={form.qty} onChange={e => set('qty', e.target.value)}>
                  <option value="">Select quantity</option>
                  {QUANTITIES.map(q => <option key={q} value={q} style={{ background: '#23447A' }}>{q}</option>)}
                </FocusInput>
              </div>
              <div>
                <label style={labelStyle}>Frequency</label>
                <FocusInput as="select" value={form.frequency} onChange={e => set('frequency', e.target.value)}>
                  <option value="">Order frequency</option>
                  {['One-time / Trial', 'Monthly', 'Quarterly', 'Ongoing supply'].map(f => (
                    <option key={f} value={f} style={{ background: '#23447A' }}>{f}</option>
                  ))}
                </FocusInput>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Delivery Region <span style={{ color: '#2B8DD0' }}>*</span></label>
              <FocusInput as="select" value={form.region} onChange={e => set('region', e.target.value)}>
                <option value="">Where do you need delivery?</option>
                {REGIONS.map(r => <option key={r} value={r} style={{ background: '#23447A' }}>{r}</option>)}
              </FocusInput>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Additional details <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <FocusInput as="textarea" placeholder="Polymer type, processing parameters, current supplier info, or any technical requirements..." value={form.details} onChange={e => set('details', e.target.value)} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>The more detail you provide, the more precise our quote.</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <button onClick={() => goStep(1)} style={btnBack}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >← Back</button>
              <button onClick={() => goStep(3)} style={btnNext}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'none' }}
              >Next: Your Details →</button>
            </div>
          </motion.div>

        ) : (
          <motion.div key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6, color: '#fff' }}>Your contact details</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>We'll send your quote directly to you.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: '#2B8DD0' }}>*</span></label>
                <FocusInput placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Company <span style={{ color: '#2B8DD0' }}>*</span></label>
                <FocusInput placeholder="Company name" value={form.company} onChange={e => set('company', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Email Address <span style={{ color: '#2B8DD0' }}>*</span></label>
              <FocusInput type="email" placeholder="your@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Phone / WhatsApp <span style={{ color: '#2B8DD0' }}>*</span></label>
              <FocusInput type="tel" placeholder="+20 or +966 ..." value={form.phone} onChange={e => set('phone', e.target.value)} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>Include country code. WhatsApp preferred for faster response.</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Preferred Contact Method</label>
              <FocusInput as="select" value={form.contactMethod} onChange={e => set('contactMethod', e.target.value)}>
                {['Email', 'WhatsApp', 'Phone Call'].map(m => <option key={m} value={m} style={{ background: '#23447A' }}>{m}</option>)}
              </FocusInput>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.09)', marginBottom: 12 }}>
              <button onClick={() => goStep(2)} style={btnBack}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >← Back</button>
              <span />
            </div>

            <button onClick={submit} disabled={submitting} style={{
              width: '100%', padding: '14px', background: submitting ? 'rgba(255,255,255,0.5)' : '#fff', color: '#1A5AB8', border: 'none',
              borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 900,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s',
              opacity: submitting ? 0.75 : 1,
            }}
            onMouseEnter={e => !submitting && (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
            onMouseLeave={e => !submitting && (e.currentTarget.style.background = '#fff')}
            >{submitting ? 'Sending…' : 'Submit Quote Request ↗'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
