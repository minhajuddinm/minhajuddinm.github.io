import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAPERS, STATUS_META } from '../data/papers.js'
import { EASE, spotlightMove } from '../lib/motion.js'
import SectionHeading from './SectionHeading.jsx'

const FILTERS = [
  { id: 'all',       label: 'All'            },
  { id: 'hci',       label: 'HCI / XR'       },
  { id: 'quantum',   label: 'Quantum'        },
  { id: 'computing', label: 'Edge Computing' },
]

const KIND_LABEL = { journal: 'Journal', full: 'Full paper', survey: 'Survey', poster: 'Poster', demo: 'Demo' }

function FilterTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter research papers">
      {FILTERS.map(f => {
        const n = f.id === 'all' ? PAPERS.length : PAPERS.filter(p => p.category === f.id).length
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            aria-pressed={active === f.id}
            className={`relative px-4 py-2 rounded-full text-sm font-mono tracking-wide transition-colors duration-200 ${
              active === f.id ? 'text-accent' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {active === f.id && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 bg-accent-soft border border-accent/20 rounded-full"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">{f.label} <span className="opacity-50 tabular-nums">{n}</span></span>
          </button>
        )
      })}
    </div>
  )
}

function Chevron({ open }) {
  return (
    <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

const DOT = {
  published: 'bg-emerald-500 dark:bg-emerald-300',
  accepted:  'bg-sky-500 dark:bg-sky-300',
  review:    'bg-amber-500 dark:bg-amber-300 animate-twinkle',
}

function ResearchCard({ paper, index, flash }) {
  const [expanded, setExpanded] = useState(false)
  const st = STATUS_META[paper.statusKey]

  useEffect(() => { if (flash) setExpanded(true) }, [flash])

  return (
    <motion.article
      id={`paper-${paper.id}`}
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 2) * 0.08 }}
      onMouseMove={spotlightMove}
      className={`spotlight group relative bg-surface border rounded-2xl flex flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:shadow-[0_18px_44px_rgb(var(--accent)/0.10)] ${
        flash ? 'border-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]' : 'border-border-soft hover:border-accent/30'
      }`}
    >
      <div className="relative z-10 flex flex-col flex-1 p-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono px-2.5 py-1 bg-accent-soft border border-accent/15 text-accent text-[11px] tracking-wide rounded-lg">{paper.tag}</span>
            <span className="font-mono text-[11px] text-ink-muted">{KIND_LABEL[paper.kind]}</span>
          </div>
          <span className="font-mono text-[11px] text-ink-muted tabular-nums">{paper.year}</span>
        </div>

        <h3 className="font-display text-xl text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-300">{paper.title}</h3>
        <p className="text-xs text-ink-muted mb-0.5">{paper.authors}</p>
        <p className="text-xs text-ink-muted italic mb-5">{paper.venue}</p>

        <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-full w-fit ${st.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${DOT[paper.statusKey]}`} aria-hidden="true" />
          {st.label}
        </span>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="abstract"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-border-soft">
                <p className="text-sm text-ink-muted leading-relaxed">{paper.abstract}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(p => !p)}
          className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-accent hover:opacity-70 transition-opacity w-fit"
          aria-expanded={expanded}
        >
          {expanded ? 'collapse' : 'read abstract'}
          <Chevron open={expanded} />
        </button>
      </div>
    </motion.article>
  )
}

export default function Research() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [flash, setFlash] = useState(null)

  /* A star clicked in the constellation opens its card here */
  useEffect(() => {
    const on = e => {
      setActiveFilter('all')
      setFlash(e.detail)
      setTimeout(() => setFlash(null), 2400)
    }
    window.addEventListener('open-paper', on)
    return () => window.removeEventListener('open-paper', on)
  }, [])

  const filtered = activeFilter === 'all' ? PAPERS : PAPERS.filter(p => p.category === activeFilter)

  return (
    <section id="research" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-warm-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="02"
          label="research"
          title="Publications & Active Work"
          sub="Human-computer interaction, spatial computing, quantum communication and intelligent systems."
          className="mb-12"
        />

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((paper, i) => (
              <ResearchCard key={paper.id} paper={paper} index={i} flash={flash === paper.id} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
