import { useState } from 'react'
import { About, Footer } from '@/components/About'
import { Catalog } from '@/components/Catalog'
import { Hero } from '@/components/Hero'
import { StatsSection } from '@/components/StatsSection'
import { wines } from '@/data/wines'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import 'lenis/dist/lenis.css'

const featured = wines[0]!

export default function App() {
  useSmoothScroll()
  const [selected, setSelected] = useState(featured)

  return (
    <div id="topo" className="min-h-dvh">
      <Hero />
      <main>
        <StatsSection />
        <Catalog selected={selected} onSelect={setSelected} />
        <About />
      </main>
      <Footer />
    </div>
  )
}
