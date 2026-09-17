import { useState } from 'react'
import { About, Footer } from '@/components/About'
import { Catalog } from '@/components/Catalog'
import { Hero } from '@/components/Hero'
import { StatsSection } from '@/components/StatsSection'
import { WhatsAppFloat } from '@/components/SocialLinks'
import { wines } from '@/data/wines'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import 'lenis/dist/lenis.css'

const featured = wines[0]!

export default function App() {
  useSmoothScroll()
  const [selected, setSelected] = useState(featured)

  return (
    <div id="topo" className="relative w-full min-h-dvh overflow-x-clip">
      <Hero />
      <main className="w-full min-w-0">
        <StatsSection />
        <Catalog selected={selected} onSelect={setSelected} />
        <About />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
