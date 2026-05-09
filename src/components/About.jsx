import { motion } from 'framer-motion'

const INFO = [
  { icon: '🎓', text: 'Algoma University, BCS Honours — Dec 2026' },
  { icon: '📍', text: 'Brampton, Ontario, Canada' },
  { icon: '🔬', text: 'SLIDE Research Studio' },
  { icon: '✈️', text: 'Mitacs Globalink Intern · University of Aberdeen (May–Aug 2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR/AR', 'HCI',
  'Node.js', 'TailwindCSS', 'Git', 'LaTeX',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
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
          <p className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-3">About</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Who I Am</h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Bio + skills */}
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
            <p className="text-ink-muted leading-relaxed mb-10">
              Research-driven and builder-minded — he writes papers and ships real things.
            </p>

            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="px-4 py-1.5 bg-accent-soft border border-accent/12 text-accent text-xs font-semibold rounded-full cursor-default select-none hover:bg-accent hover:text-white transition-colors duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: Info card */}
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-white border border-border-soft rounded-3xl p-8 shadow-sm hover:shadow-[0_20px_48px_rgba(181,69,27,0.1)] hover:border-accent/20 transition-shadow duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent-soft/60 rounded-bl-full pointer-events-none" />
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
