import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { ACCEPTED_COUNT } from '../data/papers.js'

/* Facts beside the bio. Each value is one or more plain lines. */
const FACTS = [
  { label: 'Education',    lines: ['MSc in Computer Science, thesis-based, Algoma University (starting)', 'BCS Honours, Algoma University, December 2026'] },
  { label: 'Location',     lines: ['Brampton, Ontario, Canada'] },
  { label: 'Research lab', lines: ['SLIDE Research Studio'] },
  { label: 'Internship',   lines: ['Mitacs Globalink, University of Aberdeen, 2026'] },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR / AR', 'HCI', 'Node.js',
  'TailwindCSS', 'Git', 'LaTeX', 'C++', 'Three.js', 'AR Foundation',
]

const STATS = [
  { to: ACCEPTED_COUNT, suffix: '', label: 'Accepted papers' },
  { to: 7,   suffix: '+',  label: 'Projects built'  },
  { to: 100, suffix: '+',  label: 'ALCOMS members'  },
  { to: 2,   suffix: '',   label: 'Years researching'},
]

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1300
    let start = null
    let raf

    function step(timestamp) {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.floor(eased * to))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

function SkillMarquee() {
  const doubled = [...SKILLS, ...SKILLS]
  return (
    <div className="relative overflow-hidden mt-14 -mx-1">
      <div className="absolute inset-y-0 left-0  w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      <div className="marquee-track gap-2.5">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 font-mono text-xs text-ink-muted border border-border-soft rounded-lg bg-warm-bg whitespace-nowrap tracking-wide flex-shrink-0 hover:border-accent/30 hover:text-accent transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">

        <SectionHeading title="Who I am" className="mb-12" />

        {/* Bio beside the facts */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start"
        >
          <motion.div variants={fadeUp} className="min-w-0 max-w-2xl">
            <p className="font-display text-2xl sm:text-3xl text-ink leading-snug mb-7">
              Minhaj is finishing his Computer Science Honours degree at Algoma University in
              December 2026 and is starting a thesis-based Master of Science in Computer Science there.
            </p>
            <p className="text-ink-muted leading-relaxed mb-4">
              He co-founded ALCOMS (Algoma University Computer Science Society) and serves as its
              President. His work spans HCI, Mixed Reality, Generative AI, edge-cloud computing,
              and quantum cryptography.
            </p>
            <p className="text-ink-muted leading-relaxed mb-4">
              Research-driven and builder-minded: he writes papers and ships real things.
            </p>
            <p className="text-ink-muted leading-relaxed">
              He co-founds and leads startups alongside his research: LoomXR Labs Inc. (personalized packaging previewed in web AR) and BROS Inc (accessible XR experiences).
            </p>
          </motion.div>

          <motion.dl variants={fadeUp} className="min-w-0 border-t border-border-soft">
            {FACTS.map(({ label, lines }) => (
              <div key={label} className="py-5 border-b border-border-soft">
                <dt className="text-sm text-ink-muted mb-1.5">{label}</dt>
                {lines.map(line => (
                  <dd key={line} className="text-[15px] font-medium text-ink leading-snug break-words mt-1.5">{line}</dd>
                ))}
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Figures with count-up */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 mt-16 sm:mt-20"
        >
          {STATS.map(({ to, suffix, label }) => (
            <motion.div key={label} variants={fadeUp}>
              <div className="font-display text-4xl sm:text-5xl text-ink tabular-nums mb-1.5">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="text-sm text-ink-muted">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        <SkillMarquee />
      </div>
    </section>
  )
}
