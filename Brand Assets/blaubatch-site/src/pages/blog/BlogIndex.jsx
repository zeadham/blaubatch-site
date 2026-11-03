import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../../components/shared/PageHero'
import Footer from '../../components/Footer'
import useSEO from '../../hooks/useSEO'

const POSTS = [
  {
    slug: '/blog/what-is-filler-masterbatch',
    category: 'Masterbatch Basics',
    categoryColor: '#2B8DD0',
    title: 'What Is Filler Masterbatch — And Why Does It Matter for Your Production?',
    excerpt: 'Learn what filler masterbatch is, how CaCO₃ replaces virgin polymer, and how it can reduce raw material costs without compromising quality.',
    date: 'April 2026',
    readTime: '3 min read',
  },
  {
    slug: '/blog/sustainable-plastics-masterbatch',
    category: 'Sustainability',
    categoryColor: '#22C55E',
    title: "Less Virgin Polymer, Lower Footprint: Blau Batch's Approach to Sustainable Manufacturing",
    excerpt: 'Sustainability in plastics starts before the product is made. See how filler and additive masterbatch supports circular economy goals and reduces environmental impact.',
    date: 'April 2026',
    readTime: '3 min read',
  },
]

export default function BlogIndex() {
  useSEO({
    title: 'Blog — Masterbatch Insights & Industry Knowledge | Blau Batch',
    description: 'Technical articles on filler masterbatch, sustainability in plastics, and manufacturing best practices from the Blau Batch team.',
    canonical: 'https://www.blaubatch.com/blog',
  })

  return (
    <>
      <PageHero
        breadcrumb={{ current: 'Blog', parent: 'Resources' }}
        badge="KNOWLEDGE HUB"
        badgeColor="#2B8DD0"
        title="Masterbatch Insights &"
        titleAccent="Industry Knowledge"
        sub="Technical articles on filler masterbatch, sustainability in plastics, and manufacturing best practices from the Blau Batch team."
        bgGradient="linear-gradient(135deg, rgba(8,18,40,0.95) 0%, rgba(20,27,62,0.9) 60%, rgba(26,37,80,0.95) 100%)"
        cta={{
          primary: { label: 'Request a Quote', href: '/contact#quote-form' },
          secondary: { label: 'Technical Resources', href: '/resources' },
        }}
      />

      <section style={{ background: '#141B3E', padding: '72px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {POSTS.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={post.slug} style={{ display: 'block', textDecoration: 'none' }}>
                  <div style={{
                    padding: '32px 36px',
                    background: '#23447A',
                    border: `1px solid ${post.categoryColor}22`,
                    borderRadius: 16,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${post.categoryColor}55`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${post.categoryColor}22`; e.currentTarget.style.transform = 'none' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                      <span style={{
                        fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 800,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: post.categoryColor, border: `1px solid ${post.categoryColor}44`,
                        borderRadius: 4, padding: '3px 10px',
                      }}>{post.category}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>{post.date} · {post.readTime}</span>
                    </div>

                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(16px, 2vw, 22px)', color: '#fff', letterSpacing: '-0.015em', lineHeight: 1.3, marginBottom: 12 }}>
                      {post.title}
                    </h2>

                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 20 }}>
                      {post.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: post.categoryColor, fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700 }}>
                      Read article <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`@media(max-width:700px){
        section { padding-left: 20px !important; padding-right: 20px !important; }
      }`}</style>
    </>
  )
}
