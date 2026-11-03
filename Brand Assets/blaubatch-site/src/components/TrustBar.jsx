const PILLS = [
  '✓  ISO 9001 Aligned Production',
  '✓  In-House Lab Testing',
  '✓  TDS & CoA Per Shipment',
  '✓  Coraplast Authorised Distributor',
  '✓  MENA · Europe · Global',
  '✓  25 kg Bags & FIBC Big Bags',
  '✓  Custom Formulation Service',
  '✓  Full Batch Traceability',
  '✓  PE & PP Carrier Systems',
  '✓  Fast Enquiry-to-Quote',
]

const ALL = [...PILLS, ...PILLS]

export default function TrustBar() {
  return (
    <div style={{
      background: '#EEF4FA',
      borderTop: '1px solid rgba(20,27,62,0.1)',
      borderBottom: '1px solid rgba(20,27,62,0.1)',
      padding: '14px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #EEF4FA, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #EEF4FA, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="scroll-x" style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}>
        {ALL.map((pill, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0 24px',
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.05em', color: 'rgba(20,27,62,0.6)',
            borderRight: '1px solid rgba(20,27,62,0.08)',
          }}>
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}
