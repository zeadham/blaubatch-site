import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function PageHero({
  breadcrumb, badge, badgeColor = '#D4840A', tag, tagColor = '#2B8DD0',
  title, titleAccent, sub, cta,
  bgImage = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&h=900&fit=crop&auto=format',
  bgOverlay = 'rgba(20,27,62,0.82)',
  bgGradient,
}) {
  return (
    <section data-pagehero="" style={{
      paddingTop: 108, paddingBottom: 80,
      paddingLeft: 48, paddingRight: 48,
      position: 'relative', overflow: 'hidden',
      minHeight: 420,
      display: 'flex', alignItems: 'center',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: bgGradient || `linear-gradient(135deg, ${bgOverlay} 0%, rgba(20,27,62,0.92) 50%, ${bgOverlay} 100%)`,
      }} />

      {/* Subtle gradient for depth */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.2) 100%)',
      }} />

      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.016'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', textAlign: 'center' }}>

        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div {...fade(0.04)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11,
            color: 'rgba(255,255,255,0.4)', marginBottom: 24,
            fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >Home</Link>
            <ChevronRight size={11} />
            {breadcrumb.parent && (
              <><Link to={breadcrumb.parentHref || '#'} style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >{breadcrumb.parent}</Link><ChevronRight size={11} /></>
            )}
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{breadcrumb.current}</span>
          </motion.div>
        )}

        {/* Badge */}
        {badge && (
          <motion.div {...fade(0.06)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: badgeColor, border: `1px solid ${badgeColor}45`,
            borderRadius: 20, padding: '5px 12px', marginBottom: 18,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: badgeColor, display: 'inline-block' }} />
            {badge}
          </motion.div>
        )}

        {/* Tag */}
        {tag && (
          <motion.div {...fade(0.06)} style={{
            display: 'inline-block', fontFamily: 'Montserrat, sans-serif', fontSize: 10,
            fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: tagColor, border: `1px solid ${tagColor}50`,
            borderRadius: 4, padding: '4px 12px', marginBottom: 16,
          }}>{tag}</motion.div>
        )}

        {/* Title */}
        <motion.h1 {...fade(0.1)} style={{
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', marginBottom: 20, color: '#fff',
          maxWidth: 700, margin: '0 auto 20px',
        }}>
          {title}
          {titleAccent && (
            <><br /><span style={{
              background: 'linear-gradient(135deg, #2B8DD0, #2B8DD0)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{titleAccent}</span></>
          )}
        </motion.h1>

        {/* Sub */}
        {sub && (
          <motion.p {...fade(0.17)} style={{
            fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.85,
            maxWidth: 560, fontWeight: 300, marginBottom: cta ? 36 : 0,
            margin: '0 auto', marginBottom: cta ? 36 : 0,
          }}>{sub}</motion.p>
        )}

        {/* CTA buttons */}
        {cta && (
          <motion.div {...fade(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 36 }}>
            <a href={cta.primary.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', background: '#2B8DD0', color: '#fff',
              borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
              fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'all 0.2s', border: '1px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(46,127,208,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {cta.primary.label} <ArrowRight size={14} />
            </a>
            {cta.secondary && (
              <a href={cta.secondary.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 24px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)',
                borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 700, letterSpacing: '0.06em',
                border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
              >
                {cta.secondary.label}
              </a>
            )}
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[data-pagehero] { padding: 100px 20px 60px !important; min-height: 340px !important; }
        }
      `}</style>
    </section>
  )
}
