import { useState } from 'react'
import ParticleField from './components/ParticleField'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Roadmap from './components/Roadmap'
import SprintModal from './components/SprintModal'
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
      </main>
      <Footer />
      <SprintModal sprint={active} onClose={() => setActive(null)} />
    </>
  )
}

export default App
