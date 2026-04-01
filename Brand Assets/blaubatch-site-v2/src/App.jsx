import { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WhatsApp from './components/WhatsApp'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import FMPEPage from './pages/FMPE'
import FMPPPage from './pages/FMPP'
import ColorMBPage from './pages/ColorMB'
import WhiteMBPage from './pages/WhiteMB'
import BlackMBPage from './pages/BlackMB'
import AdditiveMBPage from './pages/AdditiveMB'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import ResourcesPage from './pages/Resources'
import DistributorsPage from './pages/Distributors'
import NotFound from './pages/NotFound'
import SustainabilityPage from './pages/Sustainability'
import CampaignPage from './pages/Campaign'
import PackagingPage from './pages/industries/Packaging'
import PipesPage from './pages/industries/Pipes'
import AgriculturePage from './pages/industries/Agriculture'
import TextilesPage from './pages/industries/Textiles'
import WireCablePage from './pages/industries/WireCable'
import AutomotivePage from './pages/industries/Automotive'
import PrivacyPage from './pages/Privacy'
import TermsPage from './pages/Terms'
import SitemapPage from './pages/Sitemap'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#141B3E',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40, textAlign: 'center',
        }}>
          <div style={{ maxWidth: 440 }}>
            <div style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A',
              border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4,
              padding: '4px 12px', display: 'inline-block', marginBottom: 20,
            }}>Error</div>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 28, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 28 }}>
              An unexpected error occurred. Please refresh the page or return home.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '10px 22px', background: '#2B8DD0', color: '#fff', border: 'none',
                  borderRadius: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 12,
                  fontWeight: 800, letterSpacing: '0.06em', cursor: 'pointer',
                }}
              >Refresh Page</button>
              <a
                href="/"
                style={{
                  padding: '10px 22px', background: 'transparent', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8,
                  fontFamily: 'Montserrat, sans-serif', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >Return Home</a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div style={{ background: '#141B3E', minHeight: '100vh' }}>
          <Navbar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fmpe" element={<FMPEPage />} />
              <Route path="/fmpp" element={<FMPPPage />} />
              <Route path="/color-masterbatch" element={<ColorMBPage />} />
              <Route path="/white-masterbatch" element={<WhiteMBPage />} />
              <Route path="/black-masterbatch" element={<BlackMBPage />} />
              <Route path="/additive-masterbatch" element={<AdditiveMBPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/distributors" element={<DistributorsPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/campaign" element={<CampaignPage />} />
              <Route path="/industries/packaging" element={<PackagingPage />} />
              <Route path="/industries/pipes" element={<PipesPage />} />
              <Route path="/industries/agriculture" element={<AgriculturePage />} />
              <Route path="/industries/textiles" element={<TextilesPage />} />
              <Route path="/industries/wire-cable" element={<WireCablePage />} />
              <Route path="/industries/automotive" element={<AutomotivePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
          <WhatsApp />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
