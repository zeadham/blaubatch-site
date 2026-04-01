import IndustryPage from './IndustryPage'

const CONFIG = {
  hero: {
    title: 'Masterbatch for Packaging',
    titleAccent: '& Flexible Film',
    badge: 'PACKAGING INDUSTRY',
    accentColor: '#2B8DD0',
    sub: "Egypt's most demanded flexible film and packaging grades — filler, colour, white, and performance additives engineered for blown film, cast film, BOPP, and multilayer structures.",
    visual: {
      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format',
      bg: 'linear-gradient(145deg, #020d18 0%, #061830 35%, #0d2d50 70%, #1a4a80 100%)',
      dots: 'rgba(74,170,224,0.15)',
      symbol: 'FILM',
      accent: '#2B8DD0',
      chip: 'PACKAGING & FILM',
      stat: { n: 'Blown · Cast · BOPP', label: 'Film Processes Covered' },
    },
  },
  applications: {
    title: 'Packaging & Flexible Film Applications',
    sub: 'Our masterbatch grades cover the full range of flexible packaging — from commodity carrier bags to high-barrier multilayer food packaging.',
    items: [
      { name: 'Blown Film', desc: 'LDPE/LLDPE/HDPE blown film for bags, liners, agricultural covers, and general packaging.' },
      { name: 'Cast Film', desc: 'Cast PP and PE film for food wrapping, overwrap, stretch cling, and lamination.' },
      { name: 'BOPP Film', desc: 'Biaxially oriented polypropylene film for snack packaging, labels, and flexible pouches.' },
      { name: 'Multilayer Structures', desc: 'Co-extruded PE/PA/PP barrier structures for MAP and modified-atmosphere food packaging.' },
      { name: 'Carrier Bags & Liners', desc: 'High-volume commodity bags, bin liners, refuse sacks, and courier mailer bags.' },
      { name: 'Food Packaging', desc: 'Direct-contact food packaging requiring EU 10/2011 and FDA-compliant masterbatch grades.' },
    ],
  },
  keyPoints: [
    'Filler masterbatch (FMPE/FMPP) at 5–15% loading reduces raw material cost without film integrity loss',
    'Slip and antiblock additives (AMB-SA/AB) ensure film-to-film release and machine runnability',
    'Food-contact white grades (WMB-FC20) — EU 10/2011 compliant, confirmed in writing',
    'Optical brightener grades for blue-white tone in premium consumer packaging',
    'Anti-static masterbatch prevents dust attraction in electronic and technical packaging',
    'Tight colour lot-to-lot consistency for branded retail packaging runs',
  ],
  products: {
    industryName: 'Packaging & Film',
    sub: 'Select a product category to view grades, or contact us for a custom recommendation.',
    items: [
      {
        series: 'FMPE / FMPP',
        tag: 'MANUFACTURED',
        name: 'Filler Masterbatch',
        desc: '70–80% CaCO₃ in LDPE or PP carrier. Reduces cost, improves stiffness, and boosts printability in blown and cast film.',
        href: '/fmpe',
      },
      {
        series: 'WMB SERIES',
        name: 'White Masterbatch',
        desc: '20–30% TiO₂ in LDPE or PP. High opacity, food-contact grades available. For white films, lamination, and opaque packaging.',
        href: '/white-masterbatch',
      },
      {
        series: 'CMB SERIES',
        name: 'Colour Masterbatch',
        desc: 'RAL/Pantone-matched concentrates for branded packaging. Full gamut, food-contact grades on request.',
        href: '/color-masterbatch',
      },
      {
        series: 'AMB-SA/AB',
        name: 'Slip & Antiblock',
        desc: 'Erucamide slip + silica antiblock. Reduces COF for machine runnability and prevents blocking in stacked film rolls.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-AS10',
        name: 'Anti-static',
        desc: 'Permanent anti-static masterbatch for dust-free electronic and technical packaging. Does not migrate or wash off.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-OB05',
        name: 'Optical Brightener',
        desc: 'OB-1/OB-2 fluorescent brighteners for blue-white appearance in film and non-woven packaging applications.',
        href: '/additive-masterbatch',
      },
    ],
  },
  quoteForm: {
    industryLabel: 'Packaging & Film',
    defaultProduct: 'Filler MB PE Series',
    products: [
      { name: 'Filler Masterbatch (FMPE)', sub: 'LDPE carrier · Blown film & packaging', value: 'Filler MB PE Series' },
      { name: 'Filler Masterbatch (FMPP)', sub: 'PP carrier · Cast film & woven', value: 'Filler MB PP Series' },
      { name: 'White Masterbatch', sub: 'TiO₂-based · Opaque film', value: 'White MB PE Series' },
      { name: 'Colour Masterbatch', sub: 'Custom colour matching', value: 'Colour Masterbatch' },
      { name: 'Slip / Antiblock Additive', sub: 'Film runnability', value: 'Additive MB Slip/Antiblock' },
      { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
    ],
    applications: ['Blown Film', 'Cast Film', 'BOPP Film', 'Multilayer / Co-extrusion', 'Carrier Bags', 'Food Packaging', 'Agricultural Film', 'Courier / Mailer Bags'],
  },
}

export default function PackagingPage() {
  return <IndustryPage config={CONFIG} />
}
