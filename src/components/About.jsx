import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { ACCEPTED_COUNT } from '../data/papers.js'
import { spotlightMove } from '../lib/motion.js'

const PORTRAIT = new URL('../assets/portrait.webp', import.meta.url).href

/* Line icons in the same stroke style as the rest of the site */
const ICON = {
  education: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5" /><path d="M22 10v6" /></>,
  location:  <><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  lab:       <><path d="M9 3h6" /><path d="M10 3v6.5L4.6 18.4A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.4-2.6L14 9.5V3" /><path d="M7.5 15h9" /></>,
  globe:     <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" /></>,
}

function InfoIcon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[name]}
    </svg>
  )
}

const INFO = [
  { label: 'Education',   icon: 'education', text: 'Starting MSc in Computer Science (Thesis), Algoma University · BCS Honours, Dec 2026' },
  { label: 'Location',    icon: 'location',  text: 'Brampton, Ontario, Canada' },
  { label: 'Research Lab',icon: 'lab',       text: 'SLIDE Research Studio' },
  { label: 'Internship',  icon: 'globe',     text: 'Mitacs Globalink · University of Aberdeen (2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR / AR', 'HCI', 'Node.js',
  'TailwindCSS', 'Git', 'LaTeX', 'C++', 'Three.js', 'AR Foundation',
]

const STATS = [
  { to: ACCEPTED_COUNT, suffix: '', label: 'Accepted Papers' },
  { to: 7,   suffix: '+',  label: 'Projects Built'  },
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
            className="px-3 py-1.5 font-mono text-xs text-ink-muted border border-border-soft rounded-lg bg-warm-bg whitespace-nowrap tracking-wide flex-shrink-0 hover:border-accent/30 hover:text-accent transition-colors duration-200 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Portrait: 4:5 head-and-shoulders photo in a soft frame */
function Avatar() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-40 sm:w-48 mb-8 mx-auto md:mx-0 p-1.5 rounded-[1.25rem] bg-surface border border-border-soft shadow-[0_14px_36px_rgb(var(--accent)/0.12)]"
    >
      <img
        src={PORTRAIT}
        alt="Muhammad Minhajuddin, smiling, wearing glasses and a grey checked blazer over a black shirt in a bright office"
        width="1024"
        height="1024"
        loading="lazy"
        decoding="async"
        className="block w-full h-auto aspect-[4/5] object-cover rounded-[0.95rem]"
      />
    </motion.figure>
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
    <section id="about" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">

        <SectionHeading index="01" label="about" title="Who I Am" className="mb-16" />

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
              <div className="eyebrow">{label}</div>
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
            <SkillMarquee />
          </motion.div>

          {/* Right: Info card */}
          <motion.div variants={fadeUp} className="min-w-0">
            <motion.div
              onMouseMove={spotlightMove}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="spotlight relative bg-surface border border-border-soft rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_48px_rgb(var(--accent)/0.10)] hover:border-accent/20 transition-all duration-300"
            >
              {/* Gradient top band */}
              <div className="h-1 bg-gradient-to-r from-accent/50 via-glow/60 to-accent/50" />

              <div className="relative p-8">
                {/* Background glow */}
                <div className="absolute top-4 right-4 w-28 h-28 bg-accent-soft rounded-full blur-2xl pointer-events-none opacity-60" />

                <ul className="space-y-6 relative z-10">
                  {INFO.map(({ icon, label, text }) => (
                    <li key={text} className="flex items-start gap-4 group">
                      <span className="shrink-0 w-11 h-11 flex items-center justify-center text-accent bg-warm-bg rounded-xl border border-border-soft group-hover:border-accent/30 group-hover:bg-accent-soft transition-colors duration-200">
                        <InfoIcon name={icon} />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="eyebrow mb-1">{label}</p>
                        <p className="text-[15px] font-medium text-ink leading-snug break-words">{text}</p>
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
