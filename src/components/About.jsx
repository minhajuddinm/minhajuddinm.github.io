import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const INFO = [
  { icon: '🎓', text: 'Algoma University, BCS Honours — Dec 2026' },
  { icon: '📍', text: 'Brampton, Ontario, Canada' },
  { icon: '🔬', text: 'SLIDE Research Studio' },
  { icon: '✈️', text: 'Mitacs Globalink Intern · University of Aberdeen (May–Aug 2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR / AR', 'HCI', 'Node.js',
  'TailwindCSS', 'Git', 'LaTeX', 'C++', 'Three.js', 'AR Foundation',
]

const STATS = [
  { to: 4,   suffix: '',   label: 'Research Papers' },
  { to: 6,   suffix: '+',  label: 'Projects Built'  },
  { to: 100, suffix: '+',  label: 'ALCOMS Members'  },
  { to: 2,   suffix: '',   label: 'Years Researching'},
]

/* Animated count-up number */
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const ctrl = animate(0, to, {
      duration: 1.3,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.floor(v)),
    })
    return ctrl.stop
  }, [isInView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

/* Infinite horizontal skill marquee */
function SkillMarquee() {
  const doubled = [...SKILLS, ...SKILLS]
  return (
    <div className="relative overflow-hidden mt-10 -mx-1">
      <div className="absolute inset-y-0 left-0  w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      <div className="marquee-track gap-2.5">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 font-mono text-[11px] text-ink-muted border border-border-soft rounded bg-warm-bg whitespace-nowrap tracking-wide flex-shrink-0"
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
    <section id="about" className="py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// about'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Who I Am</h2>
        </motion.div>

        {/* Stats row with count-up */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 pb-16 border-b border-border-soft"
        >
          {STATS.map(({ to, suffix, label }) => (
            <motion.div key={label} variants={fadeUp}>
              <div className="font-display text-4xl sm:text-5xl text-ink tabular-nums mb-1">
                <Counter to={to} suffix={suffix} />
              </div>
              <div className="font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Bio + marquee */}
          <motion.div variants={fadeUp}>
            <p className="text-lg text-ink leading-relaxed mb-4">
              Minhaj is a final-year Computer Science Honours student at Algoma University,
              graduating December 2026.
            </p>
            <p className="text-ink-muted leading-relaxed mb-4">
              He co-founded ALCOMS (Algoma University Computer Science Society) and serves as its
              President. His work spans HCI, Mixed Reality, Generative AI, edge-cloud computing,
              and quantum cryptography.
            </p>
            <p className="text-ink-muted leading-relaxed">
              Research-driven and builder-minded — he writes papers and ships real things.
            </p>
            <SkillMarquee />
          </motion.div>

          {/* Right: Info card */}
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative bg-white border border-border-soft rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_48px_rgba(196,96,10,0.1)] hover:border-accent/20 transition-shadow duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-soft rounded-bl-full pointer-events-none" />
              <ul className="space-y-6 relative z-10">
                {INFO.map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="text-xl shrink-0 p-2 bg-warm-bg rounded-xl border border-border-soft leading-none">
                      {icon}
                    </span>
                    <span className="text-sm font-medium text-ink leading-snug pt-2">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
