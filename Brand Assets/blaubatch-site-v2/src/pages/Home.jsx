import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Clients from '../components/Clients'
import Products from '../components/Products'
import Industries from '../components/Industries'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Products />
      <Industries />
      <WhyUs />
      <Process />
      <CTA />
      <Clients />
      <Footer />
    </>
  )
}
