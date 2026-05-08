import { useState } from 'react'
import { motion } from 'framer-motion'

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
    venue: 'ISEMV 2026 — Under Review',
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
    venue: 'VRST 2026 — Under Review',
    abstract:
      'A comparative study evaluating different locomotion techniques in virtual reality environments, measuring comfort, presence, and task performance across methods.',
    status: { emoji: '🔄', label: 'Under Review', className: 'bg-blue-50 text-blue-700 border border-blue-200' },
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
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

function ResearchCard({ paper }) {
  const [expanded, setExpanded] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, filter: "blur(10px)", rotateX: -15 },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, zIndex: 10 }}
      layout
      className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(79,70,229,0.15)] hover:border-accent/30 transition-all duration-400 preserve-3d"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top row: tag + year */}
      <div className="flex items-center justify-between gap-4 mb-4" style={{ transform: "translateZ(40px)" }}>
        <span className="px-3 py-1 bg-accent-soft text-accent text-xs font-bold tracking-wide rounded-full">
          {paper.tag}
        </span>
        <span className="text-xs text-ink-muted font-medium tabular-nums">{paper.year}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg text-ink leading-snug mb-3" style={{ transform: "translateZ(60px)" }}>
        {paper.title}
      </h3>

      {/* Authors & venue */}
      <p className="text-xs text-ink-muted mb-1" style={{ transform: "translateZ(30px)" }}>{paper.authors}</p>
      <p className="text-xs text-ink-muted italic mb-4" style={{ transform: "translateZ(20px)" }}>{paper.venue}</p>

      {/* Status badge */}
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${paper.status.className}`} style={{ transform: "translateZ(20px)" }}>
        <span>{paper.status.emoji}</span>
        {paper.status.label}
      </span>

      {/* Expandable abstract */}
      <motion.div 
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="mt-4 pt-4 border-t border-border-soft">
          <p className="text-sm text-ink-muted leading-relaxed">{paper.abstract}</p>
        </div>
      </motion.div>

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
    </motion.article>
  )
}

export default function Research() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  return (
    <section id="research" className="py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto perspective-1000">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-3">
            Research
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">
            Publications &amp; Active Work
          </h2>
          <p className="text-ink-muted max-w-xl leading-relaxed text-lg font-light">
            Exploring human-computer interaction, spatial computing, and intelligent systems.
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 gap-5"
        >
          {PAPERS.map((paper) => (
            <ResearchCard key={paper.id} paper={paper} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
