import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    name: 'Eyes of the Soul',
    description: 'An accessible VR detective game for Blind and Low Vision players, built in Unity. Developed under Boundless Reality Origin Studios Inc. (BROS).',
    tags: ['Unity', 'C#', 'VR', 'Meta SDK', 'Accessibility'],
    github: '#',
    demo: null,
  },
  {
    id: 2,
    name: 'Thunder Hacks',
    description: 'Organized a 24-hour hackathon for Algoma University students.',
    tags: ['Event Mgmt', 'Web', 'React'],
    github: '#',
    demo: 'https://thunderhacks.algomau.ca',
  },
  {
    id: 3,
    name: 'ALCOMS Website',
    description: 'Built and maintained the official site for the Algoma University Computer Science Society.',
    tags: ['React', 'TailwindCSS', 'Vite'],
    github: '#',
    demo: 'https://alcoms.ca',
  },
  {
    id: 4,
    name: 'HYPAR Prototype',
    description: 'AR mobile prototype for hyper-personalized product packaging using markerless tracking.',
    tags: ['Unity', 'AR Foundation', 'C#'],
    github: '#',
    demo: null,
  },
  {
    id: 5,
    name: 'EDOA Simulator',
    description: 'Simulation tool for testing the EDOA edge-cloud task offloading algorithm.',
    tags: ['Python', 'Matplotlib', 'NumPy'],
    github: '#',
    demo: null,
  },
  {
    id: 6,
    name: 'Snappy',
    description: 'Immersive XR companion that helps children understand medical procedures, reducing pre-procedure anxiety through clarity instead of distraction. Built at an XR Hackathon in Montreal.',
    tags: ['Unity', 'C#', 'AR', 'VR', 'XR'],
    github: null,
    demo: null,
  },
]

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function ProjectCard({ project }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      layout
      className="group relative bg-white border border-border-soft rounded-2xl flex flex-col shadow-sm hover:shadow-[0_16px_40px_rgba(42,94,64,0.10)] hover:border-accent/18 transition-all duration-300 overflow-hidden"
    >
      <div className="h-[2px] bg-gradient-to-r from-border-soft via-accent/20 to-border-soft flex-shrink-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.035] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1 p-7">
        <h3 className="font-display text-xl text-ink mb-3">{project.name}</h3>
        <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-mono px-2.5 py-1 bg-warm-bg border border-border-soft text-ink-muted text-[11px] tracking-wide rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border-soft">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted hover:text-accent transition-colors"
              aria-label={`${project.name} on GitHub`}
            >
              <GitHubIcon /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted hover:text-accent transition-colors"
              aria-label={`${project.name} live demo`}
            >
              <ExternalIcon /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  }

  return (
    <section id="projects" className="py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// projects'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Things I've Built</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </motion.div>
      </div>
    </section>
  )
}
