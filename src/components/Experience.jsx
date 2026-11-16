import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

const EXPERIENCE = [
  {
    id: 1,
    role: 'Research Intern',
    org: 'University of Aberdeen',
    period: 'May 2026 – Aug 2026',
    badge: null,
    badgeCls: '',
    bullets: [
      'Mitacs Globalink Research Award recipient.',
      'Investigated Quantum Key Distribution protocols.',
      'Collaborated with faculty on quantum-safe communication research.',
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
      'Organized Thunder Hacks (March 2026) and Thunder Hacks 2 (October 2026); the next edition is set for October 2027.',
      'Grew membership to 100+ students.',
    ],
  },
  {
    id: 5,
    role: 'Co-founder & CEO',
    org: 'LoomXR Labs Inc.',
    period: '2026 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Building a web AR platform that lets shoppers preview personalized packaging on the real product in their phone browser.',
      'Commercializing HYPAR research into a market-ready product.',
      'Leading product, grant strategy, and the Three.js web experience.',
    ],
  },
  {
    id: 6,
    role: 'Co-founder & CEO',
    org: 'Boundless Reality Origin Studios Inc. (BROS)',
    period: '2026 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Building accessible XR experiences as an Ontario-incorporated studio.',
      'Developing Eyes of the Soul, an accessible VR detective game for Blind and Low Vision players.',
    ],
  },
  {
    id: 3,
    role: 'Undergraduate Researcher · HCI',
    org: 'SLIDE Research Studio, Algoma University',
    period: '2025 – Present',
    badge: null,
    badgeCls: '',
    bullets: [
      'Conducting HCI research on HYPAR (AR personalized packaging) and V.O.I.D. (VR locomotion).',
      'Collaborating with Dr. Somang Nam on XR and spatial computing research.',
    ],
  },
  {
    id: 4,
    role: 'Research Assistant · Edge-Cloud Computing',
    org: 'Algoma University',
    period: '2024 – Jul 2026',
    badge: null,
    badgeCls: '',
    bullets: [
      'Developed EDOA, an adaptive task offloading framework for edge-cloud environments.',
      'Optimized energy consumption and latency using dynamic decision algorithms.',
    ],
  },
]

const isCurrent = entry => /present/i.test(entry.period)
const CURRENT_COUNT = EXPERIENCE.filter(isCurrent).length

const itemVariants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/* Filled, pulsing dot for a role held now; hollow ring for one that has ended */
function Dot({ current }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
      className="absolute left-0 top-[7px] flex h-4 w-4 items-center justify-center"
      aria-hidden="true"
    >
      {current ? (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-glow/50 animate-ping" />
          <span className="relative h-4 w-4 rounded-full bg-accent ring-4 ring-warm-bg shadow-[0_0_16px_rgb(var(--glow)/0.55)]" />
        </>
      ) : (
        <span className="relative h-4 w-4 rounded-full bg-warm-bg border-2 border-accent/60 ring-4 ring-warm-bg" />
      )}
    </motion.span>
  )
}

function TimelineEntry({ entry }) {
  const current = isCurrent(entry)
  return (
    <motion.li variants={itemVariants} className="group relative pl-10 pb-12 last:pb-0">
      <Dot current={current} />

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1">
        <h3 className="font-display text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors duration-300">{entry.role}</h3>
        <span className="flex items-center gap-2 text-sm text-ink-muted tabular-nums whitespace-nowrap">
          {entry.period}
          {current && (
            <span className="px-2 py-0.5 rounded-full bg-accent-soft border border-accent/20 text-accent text-xs">Now</span>
          )}
        </span>
      </div>

      <p className="text-[15px] font-semibold text-accent mb-4">{entry.org}</p>

      <ul className="space-y-1.5">
        {entry.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] text-ink-muted">
            <span className="shrink-0 mt-[0.72em] h-px w-2.5 bg-accent/50" aria-hidden="true" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

export default function Experience() {
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18 } },
  }

  return (
    <section id="experience" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-warm-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-x-12 gap-y-4">
        {/* Heading stays in view while the timeline scrolls past */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index="05"
              label="experience"
              title="Timeline"
              sub="Research, leadership and the companies in between."
              className="mb-10"
            />
            <dl className="flex flex-wrap gap-x-10 gap-y-4 mb-8">
              <div>
                <dt className="eyebrow mb-1">Current roles</dt>
                <dd className="font-display text-3xl text-ink tabular-nums">{CURRENT_COUNT}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Positions held</dt>
                <dd className="font-display text-3xl text-ink tabular-nums">{EXPERIENCE.length}</dd>
              </div>
            </dl>
            <div className="flex items-center gap-5 text-sm text-ink-muted" aria-hidden="true">
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--glow)/0.6)]" /> Current</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-accent/60" /> Completed</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative lg:col-span-7 lg:pt-3"
          ref={railRef}
        >
          {/* Rail drawn with scroll */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border-soft rounded-full" aria-hidden="true" />
          <motion.div
            style={{ scaleY: draw, transformOrigin: 'top' }}
            className="absolute left-[7px] top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-accent via-glow to-accent"
            aria-hidden="true"
          />
          <ol>
            {EXPERIENCE.map(entry => <TimelineEntry key={entry.id} entry={entry} />)}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
