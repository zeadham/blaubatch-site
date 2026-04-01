import Footer from '../components/Footer'

const SECTIONS = [
  {
    title: 'Orders & Acceptance',
    body: [
      'All orders are subject to acceptance by Blau Batch. An order is confirmed only upon receipt of a written order confirmation from Blau Batch. Verbal agreements or informal communications do not constitute a binding order.',
      'Minimum order quantities (MOQ) apply per grade and are stated in the relevant product quotation. Trial quantities may be available subject to prior agreement.',
      'Orders for custom or non-standard formulations require a signed specification agreement before production commences.',
    ],
  },
  {
    title: 'Pricing & Payment',
    body: [
      'All prices are quoted in US Dollars (USD) or Egyptian Pounds (EGP) as stated in the quotation and are valid for the period specified. Prices are subject to change due to raw material fluctuations, currency movements, or market conditions.',
      'Payment terms are stated on each invoice and must be strictly observed. Standard terms are 30% deposit upon order confirmation, balance prior to or upon shipment, unless otherwise agreed in writing.',
      'Late payments may incur interest at 2% per month on the outstanding balance. Blau Batch reserves the right to suspend future orders pending resolution of overdue accounts.',
    ],
  },
  {
    title: 'Delivery & Shipping',
    body: [
      'Delivery timelines are estimates and not guaranteed. Blau Batch will not be liable for delays caused by circumstances beyond its control including logistics disruptions, force majeure events, or customs clearance delays.',
      'Risk of loss passes to the buyer upon handover to the carrier or freight forwarder. Blau Batch recommends that buyers arrange appropriate cargo insurance.',
      'Standard packaging is 25 kg polypropylene bags. FIBC big bags (500–1000 kg) are available on request. Packaging specifications are confirmed at the time of order.',
    ],
  },
  {
    title: 'Product Quality & Specifications',
    body: [
      'All manufactured grades are tested to the specifications stated in the relevant Technical Data Sheet (TDS). A Certificate of Analysis (CoA) is issued with every shipment.',
      'Blau Batch warrants that products conform to the agreed specification at the time of delivery. This warranty does not extend to suitability for any particular end-use application, which is the buyer\'s responsibility to verify.',
      'Claims regarding product quality or specification non-conformance must be submitted in writing within 14 days of delivery, accompanied by representative samples. Blau Batch will investigate and respond within 21 days.',
    ],
  },
  {
    title: 'Returns & Cancellations',
    body: [
      'Standard grades may be returned within 14 days of delivery if they are found to be non-conforming to specification, subject to inspection and approval by Blau Batch.',
      'Custom or non-standard formulations are non-returnable and non-cancellable once production has commenced.',
      'Order cancellations must be submitted in writing. Cancellation fees may apply depending on the stage of production and materials committed.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'Blau Batch\'s total liability for any claim arising from the supply of products shall not exceed the value of the specific order to which the claim relates.',
      'Blau Batch shall not be liable for indirect, consequential, or special damages including lost profits, production losses, or downstream customer claims, regardless of the nature of the claim.',
      'Products supplied by Blau Batch as an authorised Coraplast distributor are subject to Coraplast\'s product warranties. Blau Batch passes through any applicable warranty to the buyer.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      'Technical data sheets, formulation information, and any proprietary technical documentation shared by Blau Batch remain the property of Blau Batch and may not be reproduced, shared, or used for competitive purposes without written consent.',
      'The Blau Batch name, logo, and brand materials are registered trademarks and may not be used without prior written authorisation.',
    ],
  },
  {
    title: 'Governing Law',
    body: [
      'These terms and any disputes arising from them are governed by the laws of the Arab Republic of Egypt. Any disputes that cannot be resolved amicably shall be referred to the courts of Giza, Egypt.',
      'For international buyers, disputes may be referred to arbitration under ICC rules by mutual written agreement.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions regarding these terms, contact: info@blaubatch.com · +2 0102 2227723',
      'Blau Batch Trading & Distribution Co. · Arkan Plaza, Building 4, 4th Floor, Sheikh Zayed City, Giza, Egypt.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <section style={{ background: '#141B3E', padding: '80px 48px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4840A', border: '1px solid rgba(212,132,10,0.3)', borderRadius: 4, padding: '4px 12px', display: 'inline-block', marginBottom: 20 }}>Legal</div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.025em', color: '#fff', marginBottom: 16, lineHeight: 1.1 }}>Terms &amp; Conditions</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>Last updated: March 2026 · Blau Batch Trading &amp; Distribution Co.</p>
        </div>
      </section>

      <section style={{ background: '#141B3E', padding: '40px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.9, marginBottom: 48, borderLeft: '3px solid #D4840A', paddingLeft: 20 }}>
            These Terms &amp; Conditions govern the supply of products and services by Blau Batch Trading &amp; Distribution Co. ("Blau Batch") to its customers. By placing an order, you agree to these terms.
          </p>

          {SECTIONS.map((s, i) => (
            <div key={s.title} style={{ marginBottom: 44, paddingBottom: 44, borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>
                <span style={{ color: '#D4840A', marginRight: 10, fontWeight: 900 }}>{String(i + 1).padStart(2, '0')}</span>{s.title}
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
