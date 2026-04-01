// ISO Certification badges
// Update certNumber and issuer when you have the real certificate details

const BADGES = [
  {
    code: 'ISO 9001',
    year: '2015',
    label: 'Quality Management',
    color: '#2B8DD0',
    bg: 'rgba(46,127,208,0.1)',
    border: 'rgba(46,127,208,0.25)',
  },
  {
    code: 'ISO 14001',
    year: '2015',
    label: 'Environmental Management',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
  },
]

export default function IsoBadges({ certNumber = '[CERT-TBD]', issuer = 'Coraplast / TÜV' }) {
  return (
    <div style={{
      background: '#23447A',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 14,
      padding: '28px',
      marginTop: 40,
    }}>
      <div style={{
        fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)', marginBottom: 20,
      }}>
        Certifications &amp; Quality Standards
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        {BADGES.map(b => (
          <div key={b.code} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px',
            background: b.bg,
            border: `1px solid ${b.border}`,
            borderRadius: 10,
            flex: '1 1 180px',
          }}>
            {/* Shield icon */}
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: b.bg, border: `1px solid ${b.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                <path d="M9 1L1.5 4.5V9.5C1.5 13.64 4.74 17.5 9 18.5C13.26 17.5 16.5 13.64 16.5 9.5V4.5L9 1Z"
                  stroke={b.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10L8 12L12 8" stroke={b.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 900,
                color: b.color, lineHeight: 1,
              }}>{b.code}:{b.year}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>{b.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', gap: 24, flexWrap: 'wrap',
        paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Certificate No.</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{certNumber}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Issuing Body</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{issuer}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Scope</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Manufacture and distribution of masterbatch concentrates</div>
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
        Certificate details available on request — contact info@blaubatch.com
      </div>
    </div>
  )
}
