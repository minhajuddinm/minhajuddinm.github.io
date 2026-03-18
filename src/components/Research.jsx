import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PAPERS = [
  {
    id: 1,
    tag: 'Edge Computing',
    title: 'Towards Adaptive and Energy-Aware Task Offloading in Edge-Cloud Environments',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'IEEE Syscon 2026 — Accepted',
    abstract:
      'This paper proposes EDOA, an adaptive task offloading framework for edge-cloud environments, optimizing energy consumption and latency using a dynamic decision algorithm.',
    status: { emoji: '✅', label: 'Published', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  },
  {
    id: 2,
    tag: 'HCI / AR',
    title: 'HYPAR: Hyper-Personalized Packaging in Augmented Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'Graphics Interface (GI) 2026 — Under Submission',
    abstract:
      'HYPAR investigates how AR can deliver personalized packaging experiences, exploring real-time visual customization of product packaging through mobile AR interfaces.',
    status: { emoji: '🔄', label: 'Under Review', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
  },
  {
    id: 3,
    tag: 'VR / HCI',
    title: 'V.O.I.D.: Evaluating Locomotion Methods in Virtual Reality',
    year: '2026',
    authors: 'Minhajuddin, M. et al.',
    venue: 'In Development',
    abstract:
      'A comparative study evaluating different locomotion techniques in virtual reality environments, measuring comfort, presence, and task performance across methods.',
    status: { emoji: '🔧', label: 'In Progress', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  },
  {
    id: 4,
    tag: 'Quantum Cryptography',
    title: 'Quantum Key Distribution Protocol Analysis',
    year: '2026',
    authors: 'Minhajuddin, M.',
    venue: 'Mitacs Globalink Project — University of Aberdeen, 2026',
    abstract:
      'A 12-week research internship investigating QKD protocols, focusing on security models, error rates, and practical implementation challenges for quantum-safe communication.',
    status: { emoji: '🔭', label: 'Ongoing', className: 'bg-purple-50 text-purple-700 border border-purple-200' },
  },
]

function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function ResearchCard({ paper, index }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useScrollReveal(index * 80)

  return (
    <article
      ref={ref}
      className="reveal bg-white border border-border-soft rounded-2xl p-6 hover:shadow-md transition-shadow"
    >
      {/* Top row: tag + year */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="px-2.5 py-1 bg-accent-soft text-accent text-xs font-medium rounded-full">
          {paper.tag}
        </span>
        <span className="text-xs text-ink-muted font-medium tabular-nums">{paper.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg text-ink leading-snug mb-3">
        {paper.title}
      </h3>

      {/* Authors & venue */}
      <p className="text-xs text-ink-muted mb-1">{paper.authors}</p>
      <p className="text-xs text-ink-muted italic mb-4">{paper.venue}</p>

      {/* Status badge */}
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${paper.status.className}`}>
        <span>{paper.status.emoji}</span>
        {paper.status.label}
      </span>

      {/* Expandable abstract */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border-soft">
          <p className="text-sm text-ink-muted leading-relaxed">{paper.abstract}</p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
        aria-expanded={expanded}
        aria-label={expanded ? 'Collapse abstract' : 'Read abstract'}
      >
        {expanded ? 'Collapse' : 'Read abstract'}
        <ChevronIcon open={expanded} />
      </button>
    </article>
  )
}

export default function Research() {
  const headingRef = useScrollReveal()

  return (
    <section id="research" className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="reveal mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            Research
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
            Publications &amp; Active Work
          </h2>
          <p className="text-ink-muted max-w-xl leading-relaxed">
            Exploring human-computer interaction, spatial computing, and intelligent systems.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {PAPERS.map((paper, i) => (
            <ResearchCard key={paper.id} paper={paper} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
