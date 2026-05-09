import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Research',   href: '#research'   },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active,   setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const ids = NAV_LINKS.map(l => l.href.slice(1))
      const y   = window.scrollY + 120
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && y >= el.offsetTop) { setActive(ids[i]); return }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
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
            ? 'bg-white/75 backdrop-blur-2xl shadow-lg shadow-stone-900/5 border border-border-soft'
            : 'bg-white/40 backdrop-blur-xl border border-transparent'
        }`}
        aria-label="Primary navigation"
      >
        <a href="#hero" className="font-display text-xl text-ink hover:text-accent transition-colors">
          Minhaj
        </a>

        <ul className="hidden md:flex items-center gap-2" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const id       = href.slice(1)
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
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
          onClick={() => setMenuOpen(p => !p)}
        >
          <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2 bg-accent' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2 bg-accent' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-full mt-3 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-border-soft rounded-2xl shadow-2xl shadow-stone-900/10 p-4 pointer-events-auto md:hidden"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const id       = href.slice(1)
              const isActive = active === id
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-accent-soft text-accent border border-accent/10'
                        : 'text-ink-muted hover:bg-warm-bg hover:text-ink'
                    }`}
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
