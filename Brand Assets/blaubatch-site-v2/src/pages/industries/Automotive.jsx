import IndustryPage from './IndustryPage'

const CONFIG = {
  hero: {
    title: 'Masterbatch for Automotive',
    titleAccent: '& Technical Moulding',
    badge: 'AUTOMOTIVE INDUSTRY',
    accentColor: '#EF4444',
    sub: 'Colour, additive, and filler masterbatch for automotive interior trim, under-hood technical components, injection-moulded housings, and PP/ABS technical parts — heat-stable formulations for demanding processing conditions.',
    visual: {
      img: 'https://images.unsplash.com/photo-1563200922-38b88ce1ee2c?w=800&auto=format',
      bg: 'linear-gradient(145deg, #150000 0%, #2a0000 35%, #400000 70%, #5a0808 100%)',
      dots: 'rgba(239,68,68,0.15)',
      symbol: 'AUTO',
      accent: '#EF4444',
      chip: 'AUTOMOTIVE',
      stat: { n: 'Heat-stable', label: 'Technical Grade Formulations' },
    },
  },
  applications: {
    title: 'Automotive & Technical Applications',
    sub: 'Automotive masterbatch must survive high injection temperatures, resist UV in interior applications, and meet OEM colour specifications. Our technical grades are formulated for these demands.',
    items: [
      { name: 'Interior Trim Components', desc: 'Dashboard, door panels, console trim in PP, ABS, or PC/ABS — colour matched to OEM RAL/NCS or Pantone specifications.' },
      { name: 'Under-hood Technical Parts', desc: 'Heat-stable colour and additive masterbatch for battery casings, fluid reservoirs, air ducts, and engine covers in PA and PP.' },
      { name: 'Bumpers & Exterior Cladding', desc: 'UV-stable colour masterbatch for PP bumper fascia, fender extensions, and exterior trim that requires outdoor UV stability.' },
      { name: 'Foam & Cushioning', desc: 'Colour masterbatch for PP foam and seat cushion components; anti-static grades for automotive electronics protection.' },
      { name: 'Technical Injection Moulding', desc: 'Filler masterbatch in PP and HDPE for engineering-class injection mouldings where stiffness and cost optimisation are required.' },
      { name: 'Wiring Harness & Connectors', desc: 'IEC-colour-coded masterbatch for automotive wiring harness insulation and connector housings.' },
    ],
  },
  keyPoints: [
    'Heat-stable pigment systems — processed at 220–280°C without colour shift or plate-out',
    'Light-stable grades with UV absorbers for interior trim subject to solar load',
    'OEM colour matching capability — RAL, NCS, Pantone, or colour chip references accepted',
    'Filler masterbatch improves rigidity and reduces shrinkage in large-format structural PP parts',
    'Anti-static additive prevents dust attraction in instrument clusters and electronic housings',
    'Full CoA, colour batch records, and SVHC declarations available for tier-1 supplier audits',
  ],
  products: {
    industryName: 'Automotive & Technical',
    sub: 'Technical-grade masterbatch for automotive interior, exterior, and under-hood applications.',
    items: [
      {
        series: 'CMB SERIES',
        tag: 'OEM COLOUR MATCH',
        name: 'Colour Masterbatch',
        desc: 'Heat-stable, light-stable colour concentrates for PP, ABS, PA, and PC/ABS. OEM RAL/Pantone matching, custom colour development from chip.',
        href: '/color-masterbatch',
      },
      {
        series: 'FMPP SERIES',
        tag: 'MANUFACTURED',
        name: 'Filler Masterbatch (PP)',
        desc: '70–80% CaCO₃ in PP homopolymer. Improves stiffness-to-weight in structural injection mouldings. Reduces material cost in high-volume automotive parts.',
        href: '/fmpp',
      },
      {
        series: 'AMB-UV10',
        tag: 'UV STABLE',
        name: 'UV Stabiliser MB',
        desc: 'HALS-based UV stabiliser for exterior automotive trim and bumper cladding. Prevents greying, chalking, and colour fade over vehicle service life.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-AS10',
        tag: 'ANTI-STATIC',
        name: 'Anti-static Masterbatch',
        desc: 'Permanent anti-static for electronic housings, instrument clusters, and sensor covers where static charge must be controlled.',
        href: '/additive-masterbatch',
      },
      {
        series: 'AMB-FR20',
        name: 'Flame Retardant MB',
        desc: 'Halogen-free FR for automotive interior panels, seat components, and cabin air filter housings where FMVSS 302 or ECE R118 compliance is relevant.',
        href: '/additive-masterbatch',
      },
      {
        series: 'FMPE SERIES',
        tag: 'MANUFACTURED',
        name: 'Filler Masterbatch (PE)',
        desc: 'LDPE carrier filler masterbatch for HDPE automotive components — fluid reservoirs, tool storage, wheel arch liners, and non-structural panels.',
        href: '/fmpe',
      },
    ],
  },
  quoteForm: {
    industryLabel: 'Automotive & Technical Moulding',
    defaultProduct: 'Colour Masterbatch',
    products: [
      { name: 'Colour Masterbatch (OEM match)', sub: 'PP / ABS / PA carrier · Interior & exterior', value: 'Colour Masterbatch' },
      { name: 'Filler Masterbatch (FMPP)', sub: 'PP carrier · Structural injection moulding', value: 'Filler MB PP Series' },
      { name: 'UV Stabiliser (AMB-UV10)', sub: 'HALS · Exterior trim', value: 'Additive MB UV Stabiliser' },
      { name: 'Anti-static (AMB-AS10)', sub: 'Permanent · Electronic housings', value: 'Additive MB Anti-static' },
      { name: 'Flame Retardant (AMB-FR20)', sub: 'Halogen-free · Interior panels', value: 'Additive MB Flame Retardant' },
      { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
    ],
    applications: ['Interior Trim (Injection Moulding)', 'Exterior Cladding / Bumpers', 'Under-hood Components', 'Wiring Harness / Connectors', 'Seat Components', 'Electronic Housings', 'Foam & Cushioning', 'Fluid Reservoirs'],
  },
}

export default function AutomotivePage() {
  return <IndustryPage config={CONFIG} />
}
