import { motion } from 'framer-motion'

const VENTURES = [
  {
    id: 1,
    monogram: 'L',
    name: 'LoomXR',
    role: 'Co-founder & CEO',
    period: '2026 – Present',
    description:
      'A B2B SaaS platform delivering luxury AR packaging experiences for premium brands. Commercialized from HYPAR research into a market-ready product.',
    tags: ['React', 'Three.js', 'WebAR', 'SaaS'],
    url: 'https://loomxr.vercel.app',
    ctaLabel: 'Visit LoomXR',
    topBar: 'from-emerald-400/50 via-emerald-500/50 to-emerald-400/50',
  },
  {
    id: 2,
    monogram: 'B',
    name: 'Boundless Reality Origin Studios (BROS)',
    role: 'Co-founder & CEO',
    period: '2026 – Present',
    description:
      'An Ontario-incorporated studio building accessible XR experiences. Its first title, Eyes of the Soul, is an accessible VR detective game for Blind and Low Vision players.',
    tags: ['Unity', 'C#', 'VR', 'Accessibility'],
    url: 'https://bros-inc-website.vercel.app/',
    ctaLabel: 'Visit BROS',
    topBar: 'from-violet-400/40 via-violet-500/40 to-violet-400/40',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function VentureMonogram({ letter }) {
  return (
    <div className="relative w-16 h-16 mb-6 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-full p-[2.5px]"
        style={{ background: 'linear-gradient(135deg, #2A5E40 0%, #34D399 50%, #2A5E40 100%)' }}
      >
        <div className="w-full h-full rounded-full bg-accent-soft flex items-center justify-center">
          <span className="font-display text-2xl text-accent select-none">{letter}</span>
        </div>
      </div>
    </div>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function VentureCard({ venture }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative bg-white border border-border-soft rounded-2xl flex flex-col shadow-sm hover:shadow-[0_20px_48px_rgba(42,94,64,0.12)] hover:border-accent/20 transition-all duration-300 overflow-hidden"
    >
      <div className={`h-[3px] bg-gradient-to-r ${venture.topBar} flex-shrink-0`} />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      <div className="relative z-10 flex flex-col flex-1 p-10">
        <VentureMonogram letter={venture.monogram} />

        <h3 className="font-display text-2xl sm:text-3xl text-ink leading-snug mb-3">
          {venture.name}
        </h3>

        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="font-mono text-xs text-accent font-medium">{venture.role}</span>
          <span className="text-border-soft select-none">·</span>
          <span className="font-mono px-2.5 py-1 bg-accent-soft border border-accent/15 text-accent text-[11px] tracking-wide rounded-full">
            Active · {venture.period}
          </span>
        </div>

        <p className="text-base text-ink-muted leading-relaxed mb-6 flex-1">
          {venture.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {venture.tags.map(tag => (
            <span
              key={tag}
              className="font-mono px-2.5 py-1 bg-warm-bg border border-border-soft text-ink-muted text-[11px] tracking-wide rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full text-sm font-bold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/45 transition-shadow duration-300 overflow-hidden self-start w-full sm:w-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-full pointer-events-none" />
          <span className="relative">{venture.ctaLabel}</span>
          <span className="relative"><ExternalLinkIcon /></span>
        </a>
      </div>
    </motion.article>
  )
}

export default function Ventures() {
  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  return (
    <section id="ventures" className="py-28 px-6 bg-warm-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// ventures'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">Ventures</h2>
          <p className="text-ink-muted max-w-xl leading-relaxed text-lg font-light">
            Companies I have founded and lead.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {VENTURES.map(v => <VentureCard key={v.id} venture={v} />)}
        </motion.div>
      </div>
    </section>
  )
}
