import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download } from 'lucide-react'

const GRADES = [
  { series: 'FMPE Series', code: 'FMPE-1070', carrier: 'LDPE/LLDPE', loading: '70%', app: 'Blown film, bags, agricultural film — standard dosage 10–40%', mfi: '2–4 g/10min', badge: 'PE' },
  { series: 'FMPE Series', code: 'FMPE-1075', carrier: 'LDPE/LLDPE', loading: '75%', app: 'Blown film, cast film, injection — dosage 10–35%', mfi: '2–4 g/10min', badge: 'PE' },
  { series: 'FMPE Series', code: 'FMPE-1080', carrier: 'LDPE/LLDPE', loading: '80%', app: 'High-output blown film, extrusion — dosage 5–25%', mfi: '2–4 g/10min', badge: 'PE' },
  { series: 'FMPP Series', code: 'FMPP-1070', carrier: 'PP Homopolymer', loading: '70%', app: 'PP blown film, cast film, raffia — standard dosage 10–40%', mfi: '8–12 g/10min', badge: 'PP' },
  { series: 'FMPP Series', code: 'FMPP-1075', carrier: 'PP Homopolymer', loading: '75%', app: 'Raffia, non-woven, BOPP film — dosage 10–35%', mfi: '8–12 g/10min', badge: 'PP' },
  { series: 'FMPP Series', code: 'FMPP-1080', carrier: 'PP Homopolymer', loading: '80%', app: 'High loading raffia, woven bags, injection — dosage 5–25%', mfi: '8–12 g/10min', badge: 'PP' },
]

const QC_TESTS = [
  'Melt Flow Index (MFI)', 'Ash Content (% CaCO₃)', 'Colour & Appearance',
  'Dispersion Quality', 'Moisture Content', 'Bulk Density',
]

export default function Specs() {
  const headRef = useRef(null)
  const inView = useInView(headRef, { once: true, margin: '-80px' })
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' })

  return (
    <section id="specs" style={{ background: '#141B3E', padding: '96px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div ref={headRef} style={{ marginBottom: 52 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
              fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A',
              border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', marginBottom: 16,
            }}
          >Technical Data</motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 12, lineHeight: 1.1, color: '#FFFFFF' }}
          >Filler Masterbatch<br />Grade Reference</motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.8, maxWidth: 540 }}
          >
            In-house manufactured grades with full batch traceability. Technical data sheets and certificates of analysis issued with every shipment. Custom formulations available on request.
          </motion.p>
        </div>

        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 24 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#23447A', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14, overflow: 'hidden', marginBottom: 40,
          }}
        >
          <div style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 100px 80px 1fr 100px',
            background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.09)',
            padding: '12px 20px',
          }}>
            {['Series', 'Grade Code', 'Carrier', 'Loading', 'Application', 'MFI'].map(h => (
              <div key={h} style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(107,180,232,0.8)',
              }}>{h}</div>
            ))}
          </div>

          {GRADES.map((g, i) => (
            <div key={g.code} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 100px 80px 1fr 100px',
              padding: '14px 20px', borderBottom: i < GRADES.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: 'rgba(107,180,232,0.6)' }}>{g.series}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>{g.code}</span>
                <span style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '2px 6px', borderRadius: 3,
                  background: g.badge === 'PE' ? 'rgba(46,127,208,0.15)' : 'rgba(74,170,224,0.12)',
                  color: g.badge === 'PE' ? '#2B8DD0' : '#2B8DD0',
                }}>{g.badge}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(107,180,232,0.75)' }}>{g.carrier}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#D4840A' }}>{g.loading}</div>
              <div style={{ fontSize: 12, color: 'rgba(107,180,232,0.75)' }}>{g.app}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: '#2B8DD0' }}>{g.mfi}</div>
            </div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '22px' }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 14 }}>In-House QC Tests</div>
            {QC_TESTS.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2B8DD0', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'rgba(107,180,232,0.85)' }}>{t}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{ background: '#23447A', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '22px' }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4840A', marginBottom: 14 }}>Packaging & Delivery</div>
            {[
              { label: 'Standard Bags', val: '25 kg PP bags' },
              { label: 'Big Bags (FIBC)', val: '500–1000 kg' },
              { label: 'Private Label', val: 'Available on request' },
              { label: 'Documentation', val: 'TDS · CoA · CoO' },
              { label: 'Lead Times', val: 'Agreed per order' },
              { label: 'Sample Quantities', val: 'Within days' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.09)', fontSize: 12 }}>
                <span style={{ color: 'rgba(107,180,232,0.7)' }}>{r.label}</span>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#FFFFFF', fontSize: 11 }}>{r.val}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.26 }}
            style={{
              background: 'linear-gradient(150deg, #23447A, #23447A)',
              border: '1px solid rgba(46,127,208,0.25)', borderRadius: 12, padding: '22px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B8DD0', marginBottom: 14 }}>Documentation</div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em', color: '#fff' }}>Technical Data Sheets</h3>
              <p style={{ fontSize: 13, color: 'rgba(107,180,232,0.85)', lineHeight: 1.7, marginBottom: 20 }}>
                Full technical data sheets and safety data sheets available for all manufactured grades. Request documents with your enquiry.
              </p>
            </div>
            <a href="mailto:info@blaubatch.com?subject=TDS Request" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
              padding: '12px 20px', background: '#2B8DD0', color: '#fff',
              borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 11,
              fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2B8DD0'}
            onMouseLeave={e => e.currentTarget.style.background = '#2B8DD0'}
            >
              <Download size={13} /> Request TDS
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #specs > div > div:last-child { grid-template-columns: 1fr !important; }
          #specs { padding: 64px 20px !important; }
        }
      `}</style>
    </section>
  )
}
