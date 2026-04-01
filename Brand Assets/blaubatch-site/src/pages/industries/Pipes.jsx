import IndustryPage from './IndustryPage'

const CONFIG = {
  hero: {
    title: 'Masterbatch for Pipes,',
    titleAccent: 'Fittings & Profiles',
    badge: 'PIPE INDUSTRY',
    accentColor: '#D4840A',
    sub: 'Black, white, and filler masterbatch for HDPE pressure pipe (PE100), PPR hot water systems, PVC drainage, corrugated conduit, and irrigation tubing — with full PE100 compliance documentation.',
  },
  applications: {
    title: 'Pipe & Fitting Applications',
    sub: 'From large-diameter HDPE pressure mains to small-bore irrigation drip tape, our masterbatch grades are formulated for the demanding requirements of pipe extrusion and injection-moulded fittings.',
    items: [
      { name: 'HDPE Pressure Pipe (PE100)', desc: 'BMB-PIPE grade — 2.5% carbon black at correct structure for UV protection and PE100 colour specification.' },
      { name: 'PPR Hot Water Systems', desc: 'Colour and white masterbatch for polypropylene random copolymer hot and cold water pipe systems.' },
      { name: 'PVC Drainage & Sewer', desc: 'Filler and colour masterbatch compatible with rigid PVC pipe extrusion; grey and black standard tones.' },
      { name: 'Corrugated Conduit', desc: 'HDPE and PP black masterbatch for corrugated electrical conduit and cable protection pipe.' },
      { name: 'Drip Irrigation Tubing', desc: 'Low-loading filler masterbatch and UV-stable black for LLDPE and LDPE drip tape and micro-irrigation tubing.' },
      { name: 'Injection-Moulded Fittings', desc: 'Colour and additive masterbatch for PE, PP, and PVC injection-moulded pipe fittings and connectors.' },
    ],
  },
  keyPoints: [
    'BMB-PIPE: HDPE carrier at 2.5% loading — engineered for PE100 pipe colour conformance',
    'High-structure carbon black for maximum UV protection and long service life',
    'UV-stable black grades rated 10+ years outdoor performance for above-ground pipe',
    'Tight dispersion — no agglomerates that could cause stress concentrations in pressure pipe',
    'All pipe-grade concentrates supplied with full TDS, CoA, and material declarations',
    'White and colour grades for PPR systems — heat-stable up to processing temperatures required',
  ],
  products: {
    industryName: 'Pipes & Fittings',
    sub: 'Pipe-grade masterbatch with full compliance documentation. Contact us for PE100 conformance certificates.',
    items: [
      {
        series: 'BMB-PIPE',
        tag: 'PE100 GRADE',
        name: 'Black MB — Pipe Grade',
        desc: 'HDPE carrier, 2.5% loading in final resin. Engineered for PE100 pressure pipe colour specification. Excellent dispersion and UV protection.',
        href: '/black-masterbatch',
      },
      {
        series: 'BMB-PE40',
        tag: 'UV STABLE',
        name: 'Black MB — UV Stable',
        desc: '40% CB in LDPE/LLDPE carrier. For above-ground pipe, drip tape, and corrugated conduit requiring long-term UV resistance.',
        href: '/black-masterbatch',
      },
      {
        series: 'FMPE SERIES',
        tag: 'MANUFACTURED',
        name: 'Filler Masterbatch',
        desc: '70–80% CaCO₃ in LDPE. Used at low addition levels in drainage pipe and corrugated conduit to improve rigidity and reduce cost.',
        href: '/fmpe',
      },
      {
        series: 'WMB-PP SERIES',
        name: 'White Masterbatch',
        desc: 'PP homopolymer carrier, 20–30% TiO₂. For white PPR pipe systems and grey-toned PVC drainage pipe colourant bases.',
        href: '/white-masterbatch',
      },
      {
        series: 'CMB SERIES',
        name: 'Colour Masterbatch',
        desc: 'Custom colours for pipe system colour-coding (gas — yellow, water — blue, telecom — orange). RAL-matched on request.',
        href: '/color-masterbatch',
      },
      {
        series: 'AMB-UV10',
        name: 'UV Stabiliser',
        desc: 'HALS-based UV stabiliser for drip tape, irrigation pipe, and thin-wall LDPE tubing used in outdoor agricultural applications.',
        href: '/additive-masterbatch',
      },
    ],
  },
  quoteForm: {
    industryLabel: 'Pipes & Fittings',
    defaultProduct: 'Black MB Pipe Grade',
    products: [
      { name: 'Black MB — Pipe Grade (BMB-PIPE)', sub: 'HDPE carrier · PE100 compliant', value: 'Black MB Pipe Grade' },
      { name: 'Black MB — UV Stable (BMB-PE40)', sub: 'LDPE carrier · Agricultural & conduit', value: 'Black MB UV Stable' },
      { name: 'Filler Masterbatch (FMPE)', sub: 'LDPE carrier · Drainage pipe', value: 'Filler MB PE Series' },
      { name: 'White Masterbatch', sub: 'PP carrier · PPR systems', value: 'White MB PP Series' },
      { name: 'Colour Masterbatch', sub: 'Pipe colour coding', value: 'Colour Masterbatch' },
      { name: 'Not sure yet', sub: "We'll recommend the right grade", value: 'Not sure — need recommendation' },
    ],
    applications: ['HDPE Pressure Pipe (PE100)', 'PPR Hot Water Pipe', 'PVC Drainage', 'Corrugated Conduit', 'Drip Irrigation Tubing', 'Pipe Fittings (Injection Moulding)', 'Gas Pipe', 'Telecom Conduit'],
  },
}

export default function PipesPage() {
  return <IndustryPage config={CONFIG} />
}
