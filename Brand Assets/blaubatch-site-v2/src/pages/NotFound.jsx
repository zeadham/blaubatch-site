import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <section style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `radial-gradient(ellipse 60% 80% at 70% 50%, rgba(46,127,208,0.1) 0%, transparent 60%), #141B3E`,
        padding: '120px 48px 80px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 520 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(80px, 15vw, 140px)', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, rgba(46,127,208,0.3), rgba(74,170,224,0.15))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 8 }}
          >404</motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.35)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>Page Not Found</div>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 14, lineHeight: 1.15 }}>This page doesn't exist</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 32 }}>The page you're looking for may have been moved, renamed, or never existed. Try one of the links below.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: '#2B8DD0', color: '#fff', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none' }}
              ><Home size={13} /> Go Home</Link>
              <Link to="/fmpe" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}
              >FMPE Series <ArrowRight size={13} /></Link>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}
              >Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  )
}
