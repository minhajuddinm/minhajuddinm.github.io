import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Constellation from './components/Constellation.jsx'
import Cursor from './components/Cursor.jsx'
import VelocityMarquee from './components/VelocityMarquee.jsx'
import About from './components/About.jsx'
import Research from './components/Research.jsx'
import Projects from './components/Projects.jsx'
import Ventures from './components/Ventures.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function update() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setWidth(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-accent to-glow z-[100]"
      style={{ width: `${width}%`, transition: 'width 0.05s linear' }}
    />
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Constellation />
        <About />
        <VelocityMarquee items={['Human-Computer Interaction', 'Mixed Reality', 'Quantum Communication', 'Edge-Cloud Computing', 'Generative AI']} />
        <Research />
        <Projects />
        <Ventures />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
