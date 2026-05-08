import { motion } from 'framer-motion'

const EXPERIENCE = [
  {
    id: 1,
    role: 'Research Intern',
    org: 'University of Aberdeen',
    period: 'May 2026 – Aug 2026',
    badge: 'Upcoming',
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
    bullets: [
      'Developing EDOA, an adaptive task offloading framework for edge-cloud environments.',
      'Optimizing energy consumption and latency using dynamic decision algorithms.',
    ],
  },
]

function TimelineEntry({ entry }) {
  const itemVariants = {
    hidden: { opacity: 0, x: -50, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <motion.div variants={itemVariants} className="relative pl-9 pb-12 last:pb-0">
      {/* Dot */}
      <motion.div
        initial={{ scale: 0, boxShadow: "0 0 0 rgba(79,70,229,0)" }}
        whileInView={{ scale: 1, boxShadow: "0 0 20px rgba(79,70,229,0.3)" }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        className="absolute left-[3px] top-2 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-warm-bg"
        aria-hidden="true"
      />
      {/* Vertical line — hidden on last child */}
      <div
        className="absolute left-[9px] top-5 bottom-0 w-px bg-slate-200 last:hidden"
        aria-hidden="true"
      />

      {/* Role + optional badge */}
      <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
        <h3 className="font-display text-xl text-ink">{entry.role}</h3>
        {entry.badge && (
          <span className="px-2.5 py-0.5 bg-accent-soft text-accent text-xs font-medium rounded-full">
            {entry.badge}
          </span>
        )}
      </div>

      {/* Org + dates */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-4">
        <span className="text-sm font-medium text-accent">{entry.org}</span>
        <span className="text-sm text-ink-muted">{entry.period}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className="text-accent shrink-0 mt-px leading-5">–</span>
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  return (
    <section id="experience" className="py-28 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-3">
            Experience
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Timeline</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {EXPERIENCE.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
