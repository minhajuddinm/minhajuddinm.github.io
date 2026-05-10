import { motion } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const FEATURED = {
  id: 0,
  name: 'Snappy',
  description:
    'Immersive XR companion that helps children understand medical procedures, reducing pre-procedure anxiety through clarity instead of distraction. Built at the XR Hackathon in Montreal.',
  longDescription:
    'Snappy uses spatial computing to create a calm, engaging companion experience for pediatric patients. By walking children through procedures in an immersive yet gentle XR environment, it replaces fear with understanding.',
  tags: ['Unity', 'C#', 'AR', 'VR', 'XR', 'Healthcare'],
  github: null,
  demo: null,
  accent: 'from-accent/10 via-emerald-400/5 to-transparent',
}

const PROJECTS = [
  {
    id: 1,
    name: 'Eyes of the Soul',
    description: 'A VR narrative game built in Unity with a psychological horror / exploration theme.',
    tags: ['Unity', 'C#', 'VR', 'Meta SDK'],
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
]

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function FeaturedCard({ project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-border-soft rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_56px_rgba(42,94,64,0.12)] hover:border-accent/20 transition-all duration-300 mb-5"
    >
      {/* Gradient top bar */}
      <div className="h-1 bg-gradient-to-r from-accent/60 via-emerald-400/70 to-accent/60" />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10 p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            {/* Featured badge */}
            <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-accent-soft border border-accent/15 rounded-full">
              <Star size={10} className="text-accent fill-accent" aria-hidden="true" />
              <span className="font-mono text-[10px] text-accent/80 uppercase tracking-widest">Featured Project</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-ink">{project.name}</h3>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:justify-end">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="font-mono px-2.5 py-1 bg-warm-bg border border-border-soft text-ink-muted text-[11px] tracking-wide rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-ink leading-relaxed mb-2 text-lg max-w-2xl">{project.description}</p>
        <p className="text-ink-muted leading-relaxed max-w-2xl text-sm">{project.longDescription}</p>

        {(project.github || project.demo) && (
          <div className="flex items-center gap-4 mt-6 pt-5 border-t border-border-soft">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-accent transition-colors"
              >
                <Github size={14} aria-hidden="true" /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-accent transition-colors"
              >
                <ExternalLink size={12} aria-hidden="true" /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
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
      {/* Subtle top bar */}
      <div className="h-[2px] bg-gradient-to-r from-border-soft via-accent/20 to-border-soft flex-shrink-0" />

      {/* Hover glow */}
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
              <Github size={13} aria-hidden="true" /> GitHub
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
              <ExternalLink size={12} aria-hidden="true" /> Live
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

        {/* Featured project */}
        <FeaturedCard project={FEATURED} />

        {/* Grid */}
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
