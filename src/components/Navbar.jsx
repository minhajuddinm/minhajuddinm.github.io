import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../lib/theme.js'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Research',   href: '#research'   },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Ventures',   href: '#ventures'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-full flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <mask id="moon-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle r="9" fill="black" animate={{ cx: dark ? 17 : 30, cy: dark ? 7 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        </mask>
        <motion.circle cx="12" cy="12" fill="currentColor" stroke="none" mask="url(#moon-mask)" animate={{ r: dark ? 8 : 4.5 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        <motion.g animate={{ opacity: dark ? 0 : 1, rotate: dark ? -45 : 0, scale: dark ? 0.6 : 1 }} style={{ originX: '12px', originY: '12px' }} transition={{ duration: 0.4 }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </motion.g>
      </svg>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('')

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 400 && !menuOpen)
      last = y
      const ids = NAV_LINKS.map(l => l.href.slice(1))
      const probe = y + 140
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && probe >= el.offsetTop) { setActive(ids[i]); return }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto transition-all duration-300 rounded-full pl-6 pr-2 py-2 flex items-center justify-between gap-6 w-full md:w-auto ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-2xl shadow-lg shadow-black/5 border border-border-soft'
            : 'bg-surface/30 backdrop-blur-xl border border-transparent'
        }`}
        aria-label="Primary navigation"
      >
        <a href="#hero" className="font-display text-xl text-ink hover:text-accent transition-colors flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--glow))]" aria-hidden="true" />
          Minhaj
        </a>

        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1)
            return (
              <li key={href} className="relative">
                <a
                  href={href}
                  className={`relative z-10 block px-4 py-2 text-sm font-bold transition-colors ${isActive ? 'text-accent' : 'text-ink-muted hover:text-ink'}`}
                >
                  {label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent-soft border border-accent/15 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            className="md:hidden flex flex-col gap-1.5 p-2.5"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(p => !p)}
          >
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full mt-3 left-4 right-4 bg-surface/95 backdrop-blur-2xl border border-border-soft rounded-2xl shadow-2xl shadow-black/10 p-3 pointer-events-auto md:hidden"
          >
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li key={href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <a
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      active === href.slice(1) ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:bg-warm-bg hover:text-ink'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
