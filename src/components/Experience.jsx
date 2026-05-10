import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    id: 1,
    role: 'Research Intern',
    org: 'University of Aberdeen',
    period: 'May 2026 – Aug 2026',
    badge: 'Upcoming',
    badgeCls: 'bg-accent-soft text-accent border border-accent/15',
    bullets: [
      'Mitacs Globalink Research Award recipient.',
      'Investigating Quantum Key Distribution protocols.',
      'Collaborating with faculty on quantum-safe communication research.',
    ],
  },
  {
    id: 2,
    role: 'Co-founder & President',
    org: 'ALCOMS, Algoma University',
    period: '2024 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Founded the Computer Science Society from scratch.',
      'Organized Thunder Hacks hackathon (March 2025).',
      'Grew membership to 100+ students.',
    ],
  },
  {
    id: 3,
    role: 'Undergraduate Researcher — HCI',
    org: 'SLIDE Research Studio, Algoma University',
    period: '2024 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Conducting HCI research on HYPAR (AR personalized packaging) and V.O.I.D. (VR locomotion).',
      'Collaborating with Dr. Somang Nam on XR and spatial computing research.',
    ],
  },
  {
    id: 4,
    role: 'Research Assistant — Edge-Cloud Computing',
    org: 'Algoma University',
    period: '2024 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Developing EDOA, an adaptive task offloading framework for edge-cloud environments.',
      'Optimizing energy consumption and latency using dynamic decision algorithms.',
    ],
  },
]

const itemVariants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function TimelineEntry({ entry, isLast }) {
  return (
    <motion.div variants={itemVariants} className="relative pl-10 pb-12 last:pb-0">
      {/* Glowing dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
        className="absolute left-0 top-2 w-4 h-4 rounded-full bg-accent ring-4 ring-warm-bg shadow-[0_0_16px_rgba(42,94,64,0.45)]"
        aria-hidden="true"
      />

      {/* Animated connector line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-accent/30 via-border-soft to-border-soft/30"
          aria-hidden="true"
        />
      )}

      {/* Role + badge */}
      <div className="flex flex-wrap items-baseline gap-2.5 mb-1.5">
        <h3 className="font-display text-xl text-ink">{entry.role}</h3>
        {entry.badge && (
          <span className={`font-mono px-2.5 py-0.5 text-[11px] rounded-full border ${entry.badgeCls}`}>
            {entry.badge}
          </span>
        )}
      </div>

      {/* Org + period */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-4">
        <span className="text-sm font-semibold text-accent">{entry.org}</span>
        <span className="font-mono text-xs text-ink-muted pt-px">{entry.period}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {entry.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className="text-accent/50 shrink-0 mt-px leading-5 select-none">–</span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18 } },
  }

  return (
    <section id="experience" className="py-28 px-6 bg-warm-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// experience'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Timeline</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          {EXPERIENCE.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} isLast={i === EXPERIENCE.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
