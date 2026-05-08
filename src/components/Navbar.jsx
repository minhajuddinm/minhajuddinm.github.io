import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  // Show backdrop-blur shadow after scrolling past hero
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy: track which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      const scrollY = window.scrollY + 120 // offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrollY >= el.offsetTop) {
          setActive(sections[i])
          return
        }
      }
      setActive('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between gap-8 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl shadow-lg shadow-indigo-900/5 border border-slate-200/60'
            : 'bg-white/40 backdrop-blur-xl border border-transparent'
        }`}
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-xl text-ink hover:text-accent transition-colors"
        >
          Minhaj
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-2" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1)
            const isActive = active === id
            return (
              <li key={href} className="relative">
                <a
                  href={href}
                  className={`relative z-10 px-4 py-2 text-sm font-bold transition-colors ${
                    isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-accent-soft border border-accent/10 rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2 bg-accent' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2 bg-accent' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-full mt-4 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-indigo-900/10 p-4 pointer-events-auto md:hidden"
        >
          <ul className="flex flex-col gap-2" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = active === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive ? 'bg-accent-soft text-accent border border-accent/10' : 'text-ink-muted hover:bg-slate-50'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.div>
      )}
    </motion.div>
  )
}
