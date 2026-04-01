import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function WhatsApp() {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="wa-fab-container" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 600, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, width: 300, overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{ background: '#25D366', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/logo.jpg" alt="Blau Batch" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff' }}>Blau Batch</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>Technical Sales Team</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, opacity: 0.8 }}>
                <X size={18} />
              </button>
            </div>

            {/* Message bubble */}
            <div style={{ padding: '18px 16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px 12px 12px 12px', padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 6 }}>
                  Hello! Send us your masterbatch requirement — polymer type, application, and target volume — and we'll respond with a recommendation and quote.
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>Blau Batch</p>
              </div>

              <a
                href="https://wa.me/201022227723?text=Hello%20Blau%20Batch%2C%20I%20would%20like%20to%20enquire%20about%20your%20masterbatch%20products."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '12px 20px', background: '#25D366', color: '#fff',
                  borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                  fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#20bb5a'}
                onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
              >
                Start Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
            style={{
              background: '#23447A', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 8, padding: '8px 14px',
              fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
              color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
          >Chat with us</motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(37,211,102,0.4)',
        }}
        aria-label="Chat on WhatsApp"
      >
        {open ? (
          <X size={22} color="#fff" />
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          .wa-fab-container { bottom: 80px !important; right: 16px !important; }
        }
      `}</style>
    </div>
  )
}
