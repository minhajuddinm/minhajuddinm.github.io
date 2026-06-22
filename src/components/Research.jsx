import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PAPERS = [
  {
    id: 1,
    tag: 'Edge Computing',
    category: 'computing',
    title: 'Towards Adaptive and Energy-Aware Task Offloading in Edge-Cloud Environments',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE SysCon 2026 · Published',
    abstract:
      'This paper proposes EDOA, an adaptive task offloading framework for edge-cloud environments, optimizing energy consumption and latency using a dynamic decision algorithm.',
    status: { emoji: '✅', label: 'Published', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
  {
    id: 2,
    tag: 'HCI / AR',
    category: 'hci',
    title: 'HYPAR: Hyper-Personalized Packaging in Augmented Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'ISEMV 2026 · Under Review',
    abstract:
      'HYPAR investigates how AR can deliver personalized packaging experiences, exploring real-time visual customization of product packaging through mobile AR interfaces.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
  {
    id: 3,
    tag: 'VR / HCI',
    category: 'hci',
    title: 'V.O.I.D.: Evaluating Locomotion Methods in Virtual Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'ACM SUI 2026 · Under Review',
    abstract:
      'A comparative study evaluating different locomotion techniques in virtual reality environments, measuring comfort, presence, and task performance across methods.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
  {
    id: 4,
    tag: 'Quantum Crypto',
    category: 'quantum',
    title: 'Quantum Key Distribution Protocol Analysis',
    year: '2026',
    authors: 'Minhajuddin, M.',
    venue: 'Mitacs Globalink Project · University of Aberdeen, 2026',
    abstract:
      'A 12-week research internship investigating QKD protocols, focusing on security models, error rates, and practical implementation challenges for quantum-safe communication.',
    status: { emoji: '🔭', label: 'Ongoing', cls: 'bg-stone-100 text-stone-600 border border-stone-200' },
    topBar: 'from-violet-400/40 via-violet-500/40 to-violet-400/40',
  },
  {
    id: 5,
    tag: 'HCI / XR',
    category: 'hci',
    title: 'A.U.R.A.: Augmented User Responsive Assistance',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'HCII 2026 · Late Breaking Work · Accepted',
    // [PLACEHOLDER: refine abstract]
    abstract:
      'A.U.R.A. is an augmented reality system designed to provide context-aware, responsive user assistance through adaptive spatial overlays and intelligent interaction models.',
    status: { emoji: '✅', label: 'Accepted', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
  {
    id: 6,
    tag: 'MR / HCI',
    category: 'hci',
    title: 'PRISM: Mixed Reality Visual Analytics',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE ISMAR 2026 · Poster · Under Review',
    // [PLACEHOLDER: refine abstract]
    abstract:
      'PRISM is a Unity-based mixed reality system that enables immersive, multi-modal visual analytics by embedding interactive data visualizations directly into physical environments.',
    status: { emoji: '🔄', label: 'Under Review', cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
    topBar: 'from-amber-400/50 via-amber-500/50 to-amber-400/50',
  },
]

const FILTERS = [
  { id: 'all',       label: 'All Papers'     },
  { id: 'hci',       label: 'HCI / XR'       },
  { id: 'computing', label: 'Edge Computing'  },
  { id: 'quantum',   label: 'Quantum'         },
]

function FilterTabs({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter research papers">
      {FILTERS.map(f => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-mono tracking-wide transition-colors duration-200 ${
            active === f.id ? 'text-accent' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {active === f.id && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 bg-accent-soft border border-accent/15 rounded-full"
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            />
          )}
          <span className="relative z-10">{f.label}</span>
        </button>
      ))}
    </div>
  )
}

function Chevron({ open }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
}

function ResearchCard({ paper }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative bg-white border border-border-soft rounded-2xl flex flex-col shadow-sm hover:shadow-[0_16px_40px_rgba(42,94,64,0.10)] hover:border-accent/18 transition-all duration-300 overflow-hidden"
    >
      {/* Status-colored top bar */}
      <div className={`h-[3px] bg-gradient-to-r ${paper.topBar} flex-shrink-0`} />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex flex-col flex-1 p-7">
        {/* Tag + year */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-mono px-2.5 py-1 bg-accent-soft border border-accent/15 text-accent text-[11px] tracking-wide rounded-lg">
            {paper.tag}
          </span>
          <span className="font-mono text-[11px] text-ink-muted tabular-nums">{paper.year}</span>
        </div>

        <h3 className="font-display text-lg text-ink leading-snug mb-3">{paper.title}</h3>
        <p className="text-xs text-ink-muted mb-0.5">{paper.authors}</p>
        <p className="text-xs text-ink-muted italic mb-4">{paper.venue}</p>

        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full w-fit ${paper.status.cls}`}>
          <span aria-hidden="true">{paper.status.emoji}</span>
          {paper.status.label}
        </span>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="abstract"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border-soft">
                <p className="text-sm text-ink-muted leading-relaxed">{paper.abstract}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(p => !p)}
          className="mt-4 flex items-center gap-1.5 font-mono text-[11px] text-accent hover:text-accent/70 transition-colors"
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

  const filtered = activeFilter === 'all'
    ? PAPERS
    : PAPERS.filter(p => p.category === activeFilter)

  return (
    <section id="research" className="py-28 px-6 bg-warm-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// research'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
            Publications &amp; Active Work
          </h2>
          <p className="text-ink-muted max-w-xl leading-relaxed text-lg font-light">
            Exploring human-computer interaction, spatial computing, and intelligent systems.
          </p>
        </motion.div>

        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <div className="grid sm:grid-cols-2 gap-5">
          <AnimatePresence mode="wait">
            {filtered.map(paper => (
              <ResearchCard key={paper.id} paper={paper} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
