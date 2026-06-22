import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const INFO = [
  { label: 'Education',   icon: '🎓', text: 'Algoma University, BCS Honours · Dec 2026' },
  { label: 'Location',    icon: '📍', text: 'Brampton, Ontario, Canada' },
  { label: 'Research Lab',icon: '🔬', text: 'SLIDE Research Studio' },
  { label: 'Internship',  icon: '✈️', text: 'Mitacs Globalink · University of Aberdeen (2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR / AR', 'HCI', 'Node.js',
  'TailwindCSS', 'Git', 'LaTeX', 'C++', 'Three.js', 'AR Foundation',
]

const STATS = [
  { to: 6,   suffix: '',   label: 'Research Papers' },
  { to: 6,   suffix: '+',  label: 'Projects Built'  },
  { to: 100, suffix: '+',  label: 'ALCOMS Members'  },
  { to: 2,   suffix: '',   label: 'Years Researching'},
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
    <div className="relative overflow-hidden mt-10 -mx-1">
      <div className="absolute inset-y-0 left-0  w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      <div className="marquee-track gap-2.5">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1.5 font-mono text-[11px] text-ink-muted border border-border-soft rounded-lg bg-warm-bg whitespace-nowrap tracking-wide flex-shrink-0 hover:border-accent/30 hover:text-accent transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Gradient-ring avatar with initials */
function Avatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-24 h-24 mb-8 mx-auto md:mx-0"
    >
      {/* Animated gradient ring */}
      <div
        className="absolute inset-0 rounded-full p-[2.5px]"
        style={{ background: 'linear-gradient(135deg, #2A5E40 0%, #34D399 50%, #2A5E40 100%)' }}
      >
        <div className="w-full h-full rounded-full bg-accent-soft flex items-center justify-center">
          <span className="font-display text-3xl text-accent select-none">M</span>
        </div>
      </div>
      {/* Online indicator */}
      <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-surface" />
      </span>
    </motion.div>
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
            <motion.div key={label} variants={fadeUp} className="group cursor-default">
              <div className="font-display text-4xl sm:text-5xl text-ink tabular-nums mb-1 group-hover:text-accent transition-colors duration-300">
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
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
        >
          {/* Left: Avatar + bio + marquee */}
          <motion.div variants={fadeUp} className="min-w-0">
            <Avatar />
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
              Research-driven and builder-minded: he writes papers and ships real things.
            </p>
            <SkillMarquee />
          </motion.div>

          {/* Right: Info card */}
          <motion.div variants={fadeUp} className="min-w-0">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative bg-white border border-border-soft rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_48px_rgba(42,94,64,0.10)] hover:border-accent/20 transition-all duration-300"
            >
              {/* Gradient top band */}
              <div className="h-1 bg-gradient-to-r from-accent/50 via-emerald-400/60 to-accent/50" />

              <div className="relative p-8">
                {/* Background glow */}
                <div className="absolute top-4 right-4 w-28 h-28 bg-accent-soft rounded-full blur-2xl pointer-events-none opacity-60" />

                <ul className="space-y-6 relative z-10">
                  {INFO.map(({ icon, label, text }) => (
                    <li key={text} className="flex items-start gap-4 group">
                      <span className="text-xl shrink-0 p-2.5 bg-warm-bg rounded-xl border border-border-soft leading-none group-hover:border-accent/20 group-hover:bg-accent-soft transition-colors duration-200">
                        {icon}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="font-mono text-[9px] text-accent/55 uppercase tracking-widest mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-ink leading-snug break-words">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
