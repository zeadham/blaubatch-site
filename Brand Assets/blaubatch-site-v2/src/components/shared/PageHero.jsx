import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const fade = (delay = 0, x = 0, y = 20) => ({
  initial: { opacity: 0, y, x },
  animate: { opacity: 1, y: 0, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

function HeroVisual({ visual }) {
  return (
    <div style={{
      position: 'relative', 
      borderRadius: visual.img ? 0 : 24, 
      overflow: 'hidden',
      minHeight: 380, 
      background: visual.img ? 'transparent' : visual.bg,
      boxShadow: visual.img ? 'none' : `0 0 80px ${visual.accent}25, 0 40px 80px rgba(0,0,0,0.4)`,
    }}>
      {/* Dot texture */}
      {!visual.img && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${visual.dots || 'rgba(255,255,255,0.1)'} 2px, transparent 2px)`,
          backgroundSize: '24px 24px',
        }} />
      )}

      {/* Large background symbol */}
      {!visual.img && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
          fontSize: 'clamp(72px, 10vw, 130px)',
          color: 'rgba(255,255,255,0.07)',
          letterSpacing: '-0.04em', userSelect: 'none', lineHeight: 1,
          padding: 20,
          textAlign: 'center',
        }}>{visual.symbol}</div>
      )}

      {/* Gradient overlays */}
      {!visual.img && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(13,24,41,0.75) 0%, transparent 55%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(13,24,41,0.15) 0%, transparent 40%)',
          }} />
        </>
      )}

      {/* Accent top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(to right, transparent 0%, ${visual.accent} 40%, transparent 100%)`,
      }} />

      {/* Top-right chip */}
      {visual.chip && (
        <div style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)',
          border: `1px solid ${visual.accent}40`,
          borderRadius: 8, padding: '7px 14px',
          fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: visual.accent,
        }}>{visual.chip}</div>
      )}

      {/* Bottom-left stat card */}
      {visual.stat && (
        <div style={{
          position: 'absolute', bottom: 24, left: 24,
          background: 'rgba(13,24,41,0.65)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.14)', borderRadius: 16,
          padding: '16px 22px',
        }}>
          <div style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(22px, 3vw, 30px)',
            color: visual.accent, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 5,
          }}>{visual.stat.n}</div>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{visual.stat.label}</div>
        </div>
      )}

      {/* Decorative rings */}
      <div style={{
        position: 'absolute', top: -70, right: -70, width: 220, height: 220,
        borderRadius: '50%', border: `1px solid ${visual.accent}18`, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -35, right: -35, width: 130, height: 130,
        borderRadius: '50%', border: `1px solid ${visual.accent}12`, pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function PageHero({
  breadcrumb, badge, badgeColor = '#D4840A', tag, tagColor = '#2B8DD0',
  title, titleAccent, sub, visual, cta,
}) {
  return (
    <section data-pagehero="" style={{
      paddingTop: 108, paddingBottom: 80,
      paddingLeft: 48, paddingRight: 48,
      background: '#141B3E',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ── Full Background Image ── */}
      {visual?.img && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${visual.img}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          {/* Dark gradient overlay so text remains readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(20,27,62,0.95) 0%, rgba(20,27,62,0.85) 30%, rgba(20,27,62,0.4) 100%)',
          }} />
          {/* Bottom fade into next section */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: 'linear-gradient(to top, rgba(20,27,62,1) 0%, transparent 100%)',
          }} />
        </div>
      )}

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '38%',
        transform: 'translate(50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(46,127,208,0.1) 0%, transparent 65%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.016'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: visual ? '1fr 1fr' : '1fr', gap: 80, alignItems: 'center', position: 'relative' }}>

        {/* ── Left: Text ── */}
        <div>
          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.div {...fade(0.04)} style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 11,
              color: 'rgba(255,255,255,0.32)', marginBottom: 24,
              fontFamily: 'Montserrat, sans-serif', fontWeight: 700,
              letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.32)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
              >Home</Link>
              <ChevronRight size={11} />
              {breadcrumb.parent && (
                <><Link to={breadcrumb.parentHref || '#'} style={{ color: 'rgba(255,255,255,0.32)', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
                >{breadcrumb.parent}</Link><ChevronRight size={11} /></>
              )}
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{breadcrumb.current}</span>
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
              color: tagColor, border: `1px solid rgba(74,170,224,0.3)`,
              borderRadius: 4, padding: '4px 12px', marginBottom: 16,
            }}>{tag}</motion.div>
          )}

          {/* Title */}
          <motion.h1 {...fade(0.1)} style={{
            fontFamily: 'Montserrat, sans-serif', fontWeight: 900,
            fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: 20, color: '#fff',
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
              fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
              maxWidth: 500, fontWeight: 300, marginBottom: cta ? 36 : 0,
            }}>{sub}</motion.p>
          )}

          {/* CTA buttons */}
          {cta && (
            <motion.div {...fade(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={cta.primary.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 26px', background: '#2B8DD0', color: '#fff',
                borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
                transition: 'all 0.2s', border: '1px solid transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(46,127,208,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2B8DD0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {cta.primary.label} <ArrowRight size={14} />
              </a>
              {cta.secondary && (
                <a href={cta.secondary.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 24px', background: 'transparent', color: 'rgba(255,255,255,0.75)',
                  borderRadius: 9, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                  fontWeight: 700, letterSpacing: '0.06em',
                  border: '1px solid rgba(255,255,255,0.18)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.38)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                >
                  {cta.secondary.label}
                </a>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Right: Visual panel ── */}
        {visual && (
          <motion.div {...fade(0.2, 24, 0)}>
            <HeroVisual visual={visual} />
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[data-pagehero] > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          section[data-pagehero] { padding: 100px 20px 60px !important; }
        }
      `}</style>
    </section>
  )
}
