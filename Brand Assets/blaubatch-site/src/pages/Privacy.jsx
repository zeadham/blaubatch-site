import Footer from '../components/Footer'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: [
      'When you submit a quote request, contact form, or enquiry on this website, we collect the information you provide: your name, company name, email address, phone number, and details about your product requirements.',
      'We may also collect standard server log data (IP address, browser type, pages visited) through our hosting provider (Netlify) for security and performance purposes.',
      'We do not use tracking cookies, advertising pixels, or third-party analytics beyond the tools described in this policy.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To respond to your enquiry and provide the quote, samples, or technical information you requested.',
      'To communicate with you about your order, shipment, or ongoing supply relationship.',
      'To send relevant product updates or technical bulletins — only where you have indicated interest. You can opt out at any time.',
      'We do not sell, rent, or share your personal data with third parties for marketing purposes.',
    ],
  },
  {
    title: 'Data Storage & Security',
    body: [
      'Form submissions are processed via Netlify Forms and transmitted to our internal team over encrypted connections (TLS). Data is stored within Netlify\'s secure infrastructure and on our internal company systems.',
      'We retain enquiry and order data for up to 7 years for legal and accounting compliance, after which it is securely deleted.',
      'We implement reasonable technical and organisational measures to protect your data from unauthorised access, loss, or disclosure.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'This website uses no advertising or tracking cookies. We may use minimal session cookies required for the operation of the site. These are not used to identify you personally.',
      'If we add analytics tools in the future, this policy will be updated accordingly.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You have the right to request access to the personal data we hold about you, to correct inaccurate data, or to request deletion of your data where we have no legal obligation to retain it.',
      'To exercise any of these rights, contact us at info@blaubatch.com. We will respond within 30 days.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Our website is hosted on Netlify. Netlify\'s privacy policy governs how they handle infrastructure-level data.',
      'We use WhatsApp (Meta) as an optional communication channel. If you initiate a WhatsApp conversation, Meta\'s terms and privacy policy apply to that communication.',
      'We do not embed social media trackers, advertising networks, or third-party analytics.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'Blau Batch — Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt.',
      'Email: info@blaubatch.com · Phone: +2 0102 2227723',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section style={{ background: '#141B3E', padding: '80px 48px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B8DD0', border: '1px solid rgba(43,141,208,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>Legal</div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>Last updated: March 2026 · Blau Batch Trading &amp; Distribution Co.</p>
        </div>
      </section>

      <section style={{ background: '#141B3E', padding: '40px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: 48, borderLeft: '3px solid #2B8DD0', paddingLeft: 20 }}>
            Blau Batch is committed to protecting your personal data. This policy explains what information we collect when you use our website, how we use it, and your rights in relation to it.
          </p>

          {SECTIONS.map((s, i) => (
            <div key={s.title} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#2B8DD0', marginRight: 10, fontWeight: 900 }}>{String(i + 1).padStart(2, '0')}</span>{s.title}
              </h2>
              {s.body.map((para, j) => (
                <p key={j} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, marginBottom: j < s.body.length - 1 ? 14 : 0 }}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){ section { padding-left: 20px !important; padding-right: 20px !important; } }`}</style>
    </>
  )
}
