import { motion } from 'framer-motion'

const INFO = [
  { icon: '🎓', text: 'Algoma University, BCS Honours - Dec 2026' },
  { icon: '📍', text: 'Brampton, Ontario, Canada' },
  { icon: '🔬', text: 'SLIDE Research Studio' },
  { icon: '✈️', text: 'Mitacs Globalink Intern : University of Aberdeen (May–Aug 2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR/AR', 'HCI',
  'Node.js', 'TailwindCSS', 'Git', 'LaTeX',
]

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="about" className="py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-3">
            About
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Who I Am</h2>
        </motion.div>

        {/* Two-column layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Bio + skills */}
          <motion.div variants={itemVariants}>
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

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {SKILLS.map(skill => (
                <motion.span
                  whileHover={{ scale: 1.1, rotate: Math.random() * 6 - 3, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  key={skill}
                  className="px-4 py-1.5 bg-accent-soft/50 border border-accent/10 text-accent text-xs font-semibold rounded-full cursor-pointer transition-colors hover:bg-accent-soft"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: Fact card */}
          <motion.div variants={itemVariants} className="preserve-3d perspective-1000" style={{ transformStyle: "preserve-3d" }}>
            <motion.div 
              whileHover={{ scale: 1.05, rotateX: 4, rotateY: -4, zIndex: 10 }}
              className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative background element in card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-soft to-transparent rounded-bl-full pointer-events-none" />
              
              <ul className="space-y-6 relative z-10" style={{ transform: "translateZ(30px)" }}>
                {INFO.map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="text-2xl shrink-0 leading-none p-2 bg-warm-bg rounded-xl shadow-sm border border-slate-200/50">{icon}</span>
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
