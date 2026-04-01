import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEP_LABELS = ['Color Needs', 'Quantity', 'Contact']

const CARRIERS = [
  'CMB-PE (Polyethylene carrier)',
  'CMB-PP (Polypropylene carrier)',
  'Both PE and PP',
  'Not sure — need guidance',
]

const APPLICATIONS = [
  'Packaging film / bags',
  'Injection molding',
  'Blow molding / bottles',
  'Raffia / woven bags',
  'Non-woven',
  'Thermoforming',
  'Other',
]

const VOLUMES = [
  'Under 100 kg / month',
  '100–500 kg / month',
  '500 kg – 1 MT / month',
  '1–5 MT / month',
  '5+ MT / month',
]

const COUNTRIES = ['Egypt', 'Saudi Arabia', 'UAE', 'Jordan', 'Libya', 'Other']

const inputStyle = {
  width: '100%', padding: '12px 14px',
  background: '#141B3E', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8, color: '#fff', fontFamily: 'Open Sans, sans-serif', fontSize: 14,
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 7,
}

function FocusInput(props) {
  const [focused, setFocused] = useState(false)
  const style = { ...inputStyle, borderColor: focused ? 'rgba(46,127,208,0.55)' : 'rgba(255,255,255,0.12)' }
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

const btnNext = {
  padding: '12px 24px', background: '#2B8DD0', color: '#fff', border: 'none',
  borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700,
  cursor: 'pointer', transition: 'background 0.2s',
}
const btnBack = {
  padding: '12px 20px', background: 'transparent', color: 'rgba(255,255,255,0.6)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: 7,
  fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
}

export default function ColorQuoteForm() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    carrier: '', colorRef: '', application: '',
    volume: '', country: '', sample: 'Yes — send a color sample first',
    name: '', company: '', email: '', phone: '', notes: '',
  })
  const formRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const goStep = (n) => {
    setStep(n)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.company) {
      alert('Please fill in all required fields.')
      return
    }
    setDone(true)
  }

  return (
    <div ref={formRef} style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, overflow: 'hidden' }}>
      {/* Step tabs */}
      {!done && (
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const active = step === n
            const completed = step > n
            return (
              <div key={n} style={{
                flex: 1, padding: '16px', textAlign: 'center',
                borderBottom: `2px solid ${active ? '#2B8DD0' : 'transparent'}`,
                transition: 'all 0.2s', cursor: completed ? 'pointer' : 'default',
              }}
              onClick={() => completed && goStep(n)}
              >
                <div style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800,
                  color: completed ? '#2B8DD0' : active ? '#2B8DD0' : 'rgba(255,255,255,0.3)',
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
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 22, fontWeight: 900, marginBottom: 10 }}>
              Quote request received.
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 360, margin: '0 auto 28px' }}>
              We'll review your color requirements and get back to you within 24 hours.
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
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Tell us your color needs.</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>We'll match to any RAL, Pantone, or physical sample.</p>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Carrier resin required</label>
              <FocusInput as="select" value={form.carrier} onChange={e => set('carrier', e.target.value)}>
                <option value="">Select carrier...</option>
                {CARRIERS.map(c => <option key={c} value={c} style={{ background: '#23447A' }}>{c}</option>)}
              </FocusInput>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Color reference</label>
              <FocusInput placeholder="e.g. RAL 3020, Pantone 186 C, or describe: 'traffic red'" value={form.colorRef} onChange={e => set('colorRef', e.target.value)} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>You can also send us a physical sample for matching.</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Application (end use)</label>
              <FocusInput as="select" value={form.application} onChange={e => set('application', e.target.value)}>
                <option value="">Select application...</option>
                {APPLICATIONS.map(a => <option key={a} value={a} style={{ background: '#23447A' }}>{a}</option>)}
              </FocusInput>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.09)' }}>
              <button onClick={() => goStep(2)} style={btnNext}
                onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
                onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
              >Continue →</button>
            </div>
          </motion.div>

        ) : step === 2 ? (
          <motion.div key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Volume & requirements</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>Help us prepare the right offer.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Estimated monthly volume</label>
                <FocusInput as="select" value={form.volume} onChange={e => set('volume', e.target.value)}>
                  <option value="">Select quantity...</option>
                  {VOLUMES.map(v => <option key={v} value={v} style={{ background: '#23447A' }}>{v}</option>)}
                </FocusInput>
              </div>
              <div>
                <label style={labelStyle}>Country / Region</label>
                <FocusInput as="select" value={form.country} onChange={e => set('country', e.target.value)}>
                  <option value="">Select country...</option>
                  {COUNTRIES.map(c => <option key={c} value={c} style={{ background: '#23447A' }}>{c}</option>)}
                </FocusInput>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Sample required?</label>
              <FocusInput as="select" value={form.sample} onChange={e => set('sample', e.target.value)}>
                <option style={{ background: '#23447A' }}>Yes — send a color sample first</option>
                <option style={{ background: '#23447A' }}>No — go directly to commercial quote</option>
              </FocusInput>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.09)' }}>
              <button onClick={() => goStep(1)} style={btnBack}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >← Back</button>
              <button onClick={() => goStep(3)} style={btnNext}
                onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
                onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
              >Continue →</button>
            </div>
          </motion.div>

        ) : (
          <motion.div key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 900, marginBottom: 6 }}>Your contact details</h3>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Email <span style={{ color: '#2B8DD0' }}>*</span></label>
                <FocusInput type="email" placeholder="you@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp / Phone <span style={{ color: '#2B8DD0' }}>*</span></label>
                <FocusInput type="tel" placeholder="+20 ..." value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Additional notes</label>
              <FocusInput as="textarea" placeholder="Any additional color requirements, certifications needed, or processing notes..." value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.09)', marginBottom: 12 }}>
              <button onClick={() => goStep(2)} style={btnBack}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
              >← Back</button>
              <span />
            </div>

            <button onClick={submit} style={{
              width: '100%', padding: '14px', background: '#2B8DD0', color: '#fff', border: 'none',
              borderRadius: 7, fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
            onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
            >Submit Quote Request ↗</button>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 12 }}>
              We respond within 24 hours · Saturday–Thursday 9AM–5PM Cairo
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
