import { useState } from 'react'
import ParticleField from './components/ParticleField'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Roadmap from './components/Roadmap'
import SprintModal from './components/SprintModal'
import Mentors from './components/Mentors'
import CTA from './components/CTA'
import Footer from './components/Footer'
import type { Sprint } from './data/curriculum'

function App() {
  const [active, setActive] = useState<Sprint | null>(null)

  return (
    <>
      <ParticleField />
      <NavBar />
      <main className="relative">
        <Hero />
        <Roadmap onOpen={setActive} />
        <Mentors />
        <CTA />
      </main>
      <Footer />
      <SprintModal sprint={active} onClose={() => setActive(null)} />
    </>
  )
}

export default App
