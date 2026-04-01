import IndustryPage from './IndustryPage'

const CONFIG = {
  hero: {
    title: 'Masterbatch for',
    titleAccent: 'Textiles & Fibre',
    badge: 'TEXTILES INDUSTRY',
    accentColor: '#A855F7',
    sub: 'Colour, white, filler, and anti-static masterbatch for PP non-woven, filament yarn, staple fibre, geotextiles, and spunbond fabric — formulated for fibre-spinning and fine-denier applications.',
    visual: {
      img: 'https://images.unsplash.com/photo-1542600204-7cdbd6916e78?w=800&auto=format',
      bg: 'linear-gradient(145deg, #0d0518 0%, #1a0830 35%, #2d1050 70%, #3d1870 100%)',
      dots: 'rgba(168,85,247,0.15)',
      symbol: 'FIBRE',
      accent: '#A855F7',
      chip: 'TEXTILES & FIBRE',
      stat: { n: 'Fine-denier', label: 'Fibre-grade Dispersion' },
    },
  },
  applications: {
    title: 'Textile & Fibre Applications',
    sub: 'Masterbatch for fibre and textile processing requires exceptional dispersion — any agglomerates will cause filament breaks, nozzle blockage, and fabric defects. Our fibre grades are formulated accordingly.',
    items: [
      { name: 'PP Non-woven (Spunbond / Meltblown)', desc: 'White, colour, and anti-static masterbatch for hygiene, medical, and geotextile spunbond PP non-woven fabric.' },
      { name: 'Filament Yarn (BCF & FDY)', desc: 'Fine-denier PP and PET carpet yarn and fashion yarn — colour masterbatch with zero agglomerates and MFI-matched carriers.' },
      { name: 'Staple Fibre', desc: 'PP staple fibre for wadding, stuffing, automotive NVH, and technical felts. Colour and filler masterbatch grades.' },
      { name: 'Raffia & Woven Fabric', desc: 'PP raffia tape for FIBC bags, woven sacks, carpet backing, and geotextiles. Filler and colour masterbatch.' },
      { name: 'Geotextiles', desc: 'UV-stabilised PP geotextile non-woven and woven fabric for road construction, drainage, and erosion control.' },
      { name: 'Spunlace & Airlaid', desc: 'Colour and functional additive masterbatch for spunlace non-woven used in wipes and medical applications.' },
    ],
  },
  keyPoints: [
    'Fibre-grade dispersion rating — particle size <5 µm to prevent filament breaks in fine-denier spinning',
    'MFI-matched carrier selection ensures no viscosity upset at the spinning die',
    'Anti-static masterbatch (AMB-AS10) prevents static charge build-up in PP fibre processing',
    'Optical brightener (AMB-OB05) delivers high fluorescent whiteness for hygiene non-woven',
    'PP homopolymer carrier grades compatible with standard PP fibre and raffia extrusion lines',
    'Full CoA and colour batch records for quality traceability in textile supply chains',
  ],
  products: {
    industryName: 'Textiles & Fibre',
    sub: 'Fibre-grade masterbatch for PP non-woven, yarn, raffia, and geotextile applications.',
    items: [
      {
        series: 'CMB SERIES',
        name: 'Colour Masterbatch',
        desc: 'Fibre-grade colour concentrates in PP homopolymer carrier. Full colour gamut, RAL/Pantone matching, MFI-optimised for spinning.',
        href: '/color-masterbatch',
      },
      {
        series: 'WMB-PP SERIES',
        name: 'White Masterbatch',
        desc: '20–30% TiO₂ in PP homopolymer. Brilliant blue-white for hygiene non-woven and fashion fibre. Optical brightener option available.',
        href: '/white-masterbatch',
      },
      {
        series: 'FMPP SERIES',
        tag: 'MANUFACTURED',
        name: 'Filler Masterbatch (PP)',
        desc: '70–80% CaCO₃ in PP homopolymer carrier. Used in raffia, woven sacks, and staple fibre to reduce cost and improve stiffness.',
        href: '/fmpp',
      },
      {
        series: 'AMB-AS10',
        tag: 'ANTI-STATIC',
        name: 'Anti-static Masterbatch',
        desc: 'Permanent anti-static for PP non-woven and fibre. Prevents dust attraction during processing and in final hygiene and medical products.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-OB05',
        tag: 'OPTICAL BRIGHTENER',
        name: 'Optical Brightener',
        desc: 'OB-1/OB-2 fluorescent whitening in LDPE/PP carrier. Dramatically increases CIE whiteness in non-woven, fibre, and woven fabric.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-UV10',
        name: 'UV Stabiliser',
        desc: 'HALS UV stabiliser for outdoor geotextile and construction fabric that requires UV resistance over 2–5 year service life.',
        href: '/additive-masterbatch',
      },
    ],
  },
  quoteForm: {
    industryLabel: 'Textiles & Fibre',
    defaultProduct: 'Colour Masterbatch',
    products: [
      { name: 'Colour Masterbatch', sub: 'Fibre-grade · PP carrier', value: 'Colour Masterbatch' },
      { name: 'White Masterbatch (WMB-PP)', sub: 'TiO₂ · Non-woven & fibre', value: 'White MB PP Series' },
      { name: 'Filler Masterbatch (FMPP)', sub: 'CaCO₃ · Raffia & woven sacks', value: 'Filler MB PP Series' },
      { name: 'Anti-static (AMB-AS10)', sub: 'Permanent · PP fibre', value: 'Additive MB Anti-static' },
      { name: 'Optical Brightener (AMB-OB05)', sub: 'OB-1/OB-2 · Whiteness boost', value: 'Additive MB Optical Brightener' },
      { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
    ],
    applications: ['PP Non-woven (Spunbond)', 'PP Non-woven (Meltblown)', 'Filament Yarn', 'Staple Fibre', 'Raffia / Woven Sacks', 'Geotextiles', 'Spunlace / Wipes', 'FIBC Bags'],
  },
}

export default function TextilesPage() {
  return <IndustryPage config={CONFIG} />
}
