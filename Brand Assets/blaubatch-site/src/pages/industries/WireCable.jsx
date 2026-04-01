import IndustryPage from './IndustryPage'

const CONFIG = {
  hero: {
    title: 'Masterbatch for',
    titleAccent: 'Wire & Cable',
    badge: 'WIRE & CABLE INDUSTRY',
    accentColor: '#F59E0B',
    sub: 'Carbon black, flame retardant, and anti-static masterbatch for cable jacketing, insulation compounds, electrical conduit, and armoured cable sheathing — engineered for IEC and low-halogen compliance.',
  },
  applications: {
    title: 'Wire & Cable Applications',
    sub: 'Cable and wire applications place demanding requirements on masterbatch — correct carbon black loading for volume resistivity, halogen-free flame retardants, and consistent electrical properties batch-to-batch.',
    items: [
      { name: 'Cable Jacketing', desc: 'LDPE cable jacketing compound with BMB-CAB for jet-black appearance, UV protection, and correct volume resistivity.' },
      { name: 'Insulation Compound', desc: 'Additive masterbatch for XLPE and PVC insulation compounds — flame retardant and anti-tracking grades available.' },
      { name: 'Electrical Conduit', desc: 'Black masterbatch for rigid and flexible PVC/HDPE electrical conduit. UV-stable for surface-mounted installation.' },
      { name: 'Armoured Cable Sheathing', desc: 'Low-smoke, zero-halogen (LSZH) flame retardant masterbatch for armoured and instrumentation cable outer sheathing.' },
      { name: 'Data & Telecom Cable', desc: 'Carbon black masterbatch for fibre-optic duct, Cat5/6 data cable jacket, and coaxial cable outer sheath.' },
      { name: 'Automotive Wiring Harness', desc: 'Colour and flame retardant masterbatch for XLPE and PP automotive wiring harness insulation and jacket tubing.' },
    ],
  },
  keyPoints: [
    'BMB-CAB: 40% carbon black in LDPE carrier — formulated for cable jacketing volume resistivity (IEC 60093)',
    'Halogen-free flame retardant (AMB-FR20) — no HCl gas on combustion, LSZH compliant',
    'High-structure carbon black for superior UV protection and consistent jet-black appearance',
    'Anti-static grades (AMB-AS10) for ESD-safe cable protection and shielding applications',
    'IEC 60332 fire performance can be discussed — contact for application-specific recommendations',
    'All cable grades supplied with volume resistivity data, TDS, and MSDS on request',
  ],
  products: {
    industryName: 'Wire & Cable',
    sub: 'Cable-grade masterbatch engineered for electrical properties, flame performance, and UV stability.',
    items: [
      {
        series: 'BMB-CAB',
        tag: 'CABLE GRADE',
        name: 'Black MB — Cable Grade',
        desc: '40% high-structure carbon black in LDPE carrier. Engineered for cable jacketing — correct volume resistivity, excellent dispersion, jet-black appearance.',
        href: '/black-masterbatch',
      },
      {
        series: 'AMB-FR20',
        tag: 'HALOGEN-FREE',
        name: 'Flame Retardant MB',
        desc: 'Halogen-free flame retardant concentrate in LDPE carrier. For LSZH cable jacketing, armoured sheathing, and conduit requiring reduced fire hazard.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-AS10',
        tag: 'ANTI-STATIC',
        name: 'Anti-static Masterbatch',
        desc: 'Permanent anti-static for ESD-safe cable protection sleeves, shielding tubes, and anti-static conduit. Stable resistivity across temperature range.',
        href: '/additive-masterbatch',
      },
      {
        series: 'BMB-PE25',
        name: 'Black MB — Standard',
        desc: '25% carbon black in LDPE. For general-purpose conduit, cable trunking, and non-critical jacketing applications where full cable-grade spec is not required.',
        href: '/black-masterbatch',
      },
      {
        series: 'CMB SERIES',
        name: 'Colour Masterbatch',
        desc: 'IEC 60173-compliant colour coding for automotive and industrial wiring harness insulation — red, blue, green/yellow, orange, black, white, grey, brown.',
        href: '/color-masterbatch',
      },
      {
        series: 'AMB-UV10',
        name: 'UV Stabiliser',
        desc: 'HALS UV stabiliser for conduit and cable duct installed outdoors where carbon black pigmentation alone is not sufficient for long-term UV resistance.',
        href: '/additive-masterbatch',
      },
    ],
  },
  quoteForm: {
    industryLabel: 'Wire & Cable',
    defaultProduct: 'Black MB Cable Grade',
    products: [
      { name: 'Black MB — Cable Grade (BMB-CAB)', sub: 'LDPE carrier · Jacketing', value: 'Black MB Cable Grade' },
      { name: 'Flame Retardant MB (AMB-FR20)', sub: 'Halogen-free · LSZH sheathing', value: 'Additive MB Flame Retardant' },
      { name: 'Anti-static MB (AMB-AS10)', sub: 'Permanent · ESD-safe conduit', value: 'Additive MB Anti-static' },
      { name: 'Colour MB (IEC colour coding)', sub: 'Harness insulation colours', value: 'Colour Masterbatch' },
      { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
    ],
    applications: ['Cable Jacketing', 'Insulation Compound', 'Electrical Conduit', 'LSZH / Armoured Sheathing', 'Data & Telecom Cable', 'Automotive Wiring Harness', 'Cable Trunking', 'Fibre-optic Duct'],
  },
}

export default function WireCablePage() {
  return <IndustryPage config={CONFIG} />
}
