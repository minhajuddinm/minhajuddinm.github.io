import { motion, MotionConfig, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Constellation from './components/Constellation.jsx'
import Cursor from './components/Cursor.jsx'
import About from './components/About.jsx'
import Research from './components/Research.jsx'
import Projects from './components/Projects.jsx'
import Ventures from './components/Ventures.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

/* Reading progress. Driven by a transform so scrolling never triggers layout or a re-render. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] bg-gradient-to-r from-accent to-glow z-[100] origin-left"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  return (
    /* reducedMotion="user": transforms stay still for visitors who ask for less motion */
    <MotionConfig reducedMotion="user">
      <a href="#about" className="skip-link">Skip to content</a>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Constellation />
        <Research />
        <Projects />
        <Ventures />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
