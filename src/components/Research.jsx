import { forwardRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAPERS, CLUSTERS, STATUS_META } from '../data/papers.js'
import { EASE, spotlightMove } from '../lib/motion.js'
import SectionHeading from './SectionHeading.jsx'

const FILTERS = [{ id: 'all', label: 'All' }, ...CLUSTERS.map(c => ({ id: c.id, label: c.label }))]

const KIND_LABEL = { journal: 'Journal', full: 'Full paper', survey: 'Survey', wip: 'Work-in-progress paper', poster: 'Poster', demo: 'Demo' }

/* Accepted and published work leads as cards; everything still in motion sits in a compact list */
const isOut = p => p.statusKey === 'published' || p.statusKey === 'accepted'
const ORDER = { published: 0, accepted: 1, review: 2, wip: 3 }
const byStatus = (a, b) => ORDER[a.statusKey] - ORDER[b.statusKey]

/* The venue string ends with the status, which the chip already shows */
const venueOf = p => p.venue.split(' · ').slice(0, -1).join(' · ')

function FilterTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter research papers">
      {FILTERS.map(f => {
        const n = f.id === 'all' ? PAPERS.length : PAPERS.filter(p => p.category === f.id).length
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            aria-pressed={active === f.id}
            className={`relative min-h-[44px] px-4 rounded-full text-sm font-mono tracking-wide transition-colors duration-200 ${
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
            <span className="relative z-10">{f.label} <span className="tabular-nums font-light">{n}</span></span>
          </button>
        )
      })}
    </div>
  )
}

/* Author list with the site owner's name emphasised */
function Authors({ list }) {
  const parts = list.split(/(Minhajuddin, M\.)/)
  return parts.map((part, i) => (i % 2 ? <span key={i} className="font-semibold text-ink">{part}</span> : part))
}

function Chevron({ open }) {
  return (
    <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

const DOT = {
  published: 'bg-emerald-500 dark:bg-emerald-300',
  accepted:  'bg-sky-500 dark:bg-sky-300',
  review:    'bg-amber-500 dark:bg-amber-300',
  wip:       'bg-violet-500 dark:bg-violet-300',
}

function StatusChip({ statusKey, className = '' }) {
  const st = STATUS_META[statusKey]
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 text-xs font-medium rounded-full w-fit whitespace-nowrap ${st.cls} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${DOT[statusKey]}`} aria-hidden="true" />
      {st.label}
    </span>
  )
}

/* Shown only when a paper has a `link: { label, url }` in papers.js */
function PaperLink({ paper }) {
  if (!paper.link) return null
  return (
    <a
      href={paper.link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 min-h-[44px] font-mono text-xs text-accent hover:underline underline-offset-4"
      aria-label={`${paper.link.label}: ${paper.short}`}
    >
      {paper.link.label}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  )
}

function Abstract({ open, children }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="abstract"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* forwardRef: AnimatePresence popLayout measures the card through this ref */
const ResearchCard = forwardRef(function ResearchCard({ paper, index, flash }, ref) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => { if (flash) setExpanded(true) }, [flash])

  return (
    <motion.article
      ref={ref}
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
      <div className="relative z-10 flex flex-col flex-1 p-7 pb-4">
        <div className="flex items-center justify-between gap-4 mb-5">
          <StatusChip statusKey={paper.statusKey} />
          <span className="font-mono text-xs text-ink-muted tabular-nums">{paper.year}</span>
        </div>

        <h4 className="font-display text-xl text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-300">{paper.title}</h4>
        <p className="text-sm text-ink-muted mb-1"><Authors list={paper.authors} /></p>
        <p className="text-sm text-ink-muted italic">{venueOf(paper)}</p>

        <Abstract open={expanded}>
          <div className="mt-5 pt-5 border-t border-border-soft">
            <p className="text-[15px] text-ink-muted leading-relaxed">{paper.abstract}</p>
          </div>
        </Abstract>

        <div className="mt-auto pt-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setExpanded(p => !p)}
            className="inline-flex items-center gap-1.5 min-h-[44px] font-mono text-xs text-accent hover:underline underline-offset-4"
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Hide' : 'Read'} abstract: ${paper.short}`}
          >
            {expanded ? 'Hide abstract' : 'Read abstract'}
            <Chevron open={expanded} />
          </button>
          <PaperLink paper={paper} />
        </div>
      </div>
    </motion.article>
  )
})

/* One line per paper; the whole row opens the abstract */
function PaperRow({ paper, flash }) {
  const [open, setOpen] = useState(false)

  useEffect(() => { if (flash) setOpen(true) }, [flash])

  return (
    <li
      id={`paper-${paper.id}`}
      className={`border-b border-border-soft transition-colors duration-500 ${flash ? 'bg-accent-soft' : ''}`}
    >
      <button
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        className="group w-full text-left grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[3.5rem_minmax(0,1fr)_auto_auto] items-center gap-x-5 py-4 px-2 -mx-2 rounded-lg"
      >
        <span className="hidden md:block font-mono text-xs text-ink-muted tabular-nums">{paper.year}</span>
        <span className="min-w-0">
          <span className="block font-display text-lg text-ink leading-snug group-hover:text-accent transition-colors duration-300">{paper.title}</span>
          <span className="block text-sm text-ink-muted mt-1.5">
            <Authors list={paper.authors} /> <span aria-hidden="true">/</span> <span className="italic">{venueOf(paper)}</span>
            <span className="md:hidden">, {paper.year}</span>
          </span>
        </span>
        <StatusChip statusKey={paper.statusKey} className="hidden md:inline-flex" />
        <span className="text-ink-muted group-hover:text-accent transition-colors"><Chevron open={open} /></span>
      </button>

      <Abstract open={open}>
        <div className="pb-5 md:pl-[4.75rem] md:pr-10">
          <StatusChip statusKey={paper.statusKey} className="md:hidden mb-3" />
          <p className="text-[15px] text-ink-muted leading-relaxed max-w-[70ch]">{paper.abstract}</p>
          <PaperLink paper={paper} />
        </div>
      </Abstract>
    </li>
  )
}

function GroupHeading({ children, count }) {
  return (
    <h3 className="flex items-baseline gap-3 font-display text-2xl text-ink mb-6">
      {children}
      <span className="font-mono text-sm text-ink-muted tabular-nums">{count}</span>
    </h3>
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
  const out = filtered.filter(isOut).sort(byStatus)
  const pipeline = filtered.filter(p => !isOut(p)).sort(byStatus)

  return (
    <section id="research" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-warm-bg">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="02"
          label="research"
          title="Publications & Active Work"
          sub="Quantum communication and simulation, human-computer interaction, spatial computing and intelligent systems."
          className="mb-12"
        />

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        {out.length > 0 && (
          <div className="mb-20">
            <GroupHeading count={out.length}>Accepted and published</GroupHeading>
            <motion.div layout className="grid md:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {out.map((paper, i) => (
                  <ResearchCard key={paper.id} paper={paper} index={i} flash={flash === paper.id} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {pipeline.length > 0 && (
          <div>
            <GroupHeading count={pipeline.length}>Under review and in preparation</GroupHeading>
            <ul className="border-t border-border-soft">
              {pipeline.map(paper => <PaperRow key={paper.id} paper={paper} flash={flash === paper.id} />)}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
