import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { spotlightMove } from '../lib/motion.js'

const PROJECTS = [
  {
    id: 8,
    name: 'Quantum Grove',
    type: 'Learning platform',
    featured: 'lg',
    description: 'A quantum computing learning platform built with a team for the University of Waterloo IBM Qiskit Fall Fest 2026. Twenty-seven courses and 119 lessons take learners from qubits and gates to Grover search, QAOA, cryptography, and chemistry, with live Qiskit circuit experiments, saved progress, daily quizzes, and a WebXR lab for Meta Quest.',
    tags: ['React', 'TypeScript', 'FastAPI', 'Qiskit', 'WebXR'],
    github: 'https://github.com/minhajuddinm/quantum-grover',
    demo: 'https://quantum-grove-learn.vercel.app/',
  },
  {
    id: 1,
    name: 'Eyes of the Soul',
    type: 'VR game',
    description: 'An accessible VR detective game for Blind and Low Vision players, built in Unity. Developed under Boundless Reality Origin Studios Inc. (BROS).',
    tags: ['Unity', 'C#', 'VR', 'Meta SDK', 'Accessibility'],
    github: null,
    demo: null,
  },
  {
    id: 2,
    name: 'Thunder Hacks',
    type: 'Hackathon',
    description: 'A 24-hour hackathon for Algoma University students. Two editions run so far, in March and October 2026, with the third set for October 2027.',
    tags: ['Event Mgmt', 'Web', 'React'],
    github: 'https://github.com/minhajuddinm/thunderhacks-2026',
    demo: 'https://thunderhacks.algomau.ca',
  },
  {
    id: 3,
    name: 'ALCOMS Website',
    type: 'Website',
    description: 'Built and maintained the official site for the Algoma University Computer Science Society.',
    tags: ['React', 'TailwindCSS', 'Vite'],
    github: null,
    demo: 'https://alcoms.algomau.ca',
  },
  {
    id: 4,
    name: 'HYPAR Prototype',
    type: 'AR prototype',
    description: 'AR mobile prototype for hyper-personalized product packaging using markerless tracking.',
    tags: ['Unity', 'AR Foundation', 'C#'],
    github: 'https://github.com/minhajuddinm/HYPAR-Gen-AI-Texture-XR',
    demo: null,
  },
  {
    id: 5,
    name: 'EDOA Simulator',
    type: 'Simulation',
    description: 'Simulation tool for testing the EDOA edge-cloud task offloading algorithm.',
    tags: ['Python', 'Matplotlib', 'NumPy'],
    github: null,
    demo: null,
  },
  {
    id: 6,
    name: 'Snappy',
    type: 'XR companion',
    description: 'Immersive XR companion that helps children understand medical procedures, reducing pre-procedure anxiety through clarity instead of distraction. Built at an XR Hackathon in Montreal.',
    tags: ['Unity', 'C#', 'AR', 'VR', 'XR'],
    github: 'https://github.com/minhajuddinm/Snappy01',
    demo: 'https://www.youtube.com/watch?v=F3fzr3j_ySQ',
  },
  {
    id: 7,
    name: 'OSCE SIM',
    type: 'VR trainer',
    description: 'A VR clinical-reasoning trainer for medical students on Meta Quest: interview an AI patient by voice, order tests from an AI nurse, commit a diagnosis, and receive an AI-graded debrief with per-question coaching.',
    tags: ['Unity', 'C#', 'VR', 'Meta Quest', 'OpenAI Realtime API'],
    github: 'https://github.com/SLIDE-Studio/PatientSim',
    demo: 'https://www.youtube.com/watch?v=zg7NFme48mw&t=17s',
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

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

const isVideo = url => /youtube\.com|youtu\.be|vimeo\.com/.test(url)

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/* The featured card spans two columns so the grid closes with no orphan:
   8 projects fill the two-column layout as is, and 8 + 1 span fills the three-column one. */
const SPAN = { sm: 'sm:col-span-2', lg: 'lg:col-span-2' }

const LINK_CLASS =
  'inline-flex items-center gap-1.5 min-h-[44px] md:min-h-[36px] px-3.5 rounded-full border border-border-soft font-mono text-xs text-ink-muted ' +
  'hover:text-accent hover:border-accent/40 hover:bg-accent-soft transition-colors'

function ProjectCard({ project, index }) {
  const featured = !!project.featured
  const video = project.demo && isVideo(project.demo)
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onMouseMove={spotlightMove}
      className={`spotlight group relative bg-surface border border-border-soft rounded-2xl flex flex-col shadow-sm hover:shadow-[0_16px_40px_rgb(var(--accent)/0.10)] hover:border-accent/25 transition-[border-color,box-shadow] duration-300 overflow-hidden ${featured ? SPAN[project.featured] : ''}`}
    >
      <div className={`h-[2px] flex-shrink-0 bg-gradient-to-r ${featured ? 'from-accent/50 via-glow/60 to-accent/50' : 'from-border-soft via-accent/20 to-border-soft'}`} />
      {featured && <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />}

      <div className="relative z-10 flex flex-col flex-1 p-7">
        <div className="flex items-center justify-between gap-4 mb-5">
          <span className="eyebrow flex items-center gap-2">
            {featured && <span className="w-1.5 h-1.5 rounded-full bg-glow shadow-[0_0_8px_rgb(var(--glow))]" aria-hidden="true" />}
            {featured ? `${project.type}, featured` : project.type}
          </span>
          <span className="font-mono text-xs text-ink-muted tabular-nums" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className={`font-display text-ink mb-3 group-hover:text-accent transition-colors duration-300 ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {project.name}
        </h3>
        <p className={`text-ink-muted leading-relaxed flex-1 mb-6 ${featured ? 'text-base max-w-xl' : 'text-[15px]'}`}>{project.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
          <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
            {project.tags.map(tag => (
              <li
                key={tag}
                className="font-mono px-2.5 py-1 bg-warm-bg border border-border-soft text-ink-muted text-xs tracking-wide rounded-lg"
              >
                {tag}
              </li>
            ))}
          </ul>

          {(project.github || project.demo) && (
            <div className="flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={LINK_CLASS} aria-label={`${project.name} source on GitHub`}>
                  <GitHubIcon /> Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={LINK_CLASS} aria-label={video ? `Watch the ${project.name} demo video` : `Open the ${project.name} site`}>
                  {video ? <><PlayIcon /> Watch demo</> : <><ExternalIcon /> Visit site</>}
                </a>
              )}
            </div>
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
    <section id="projects" className="relative py-28 sm:py-36 px-5 sm:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading index="03" label="projects" title="Things I've Built"
          sub="XR games, research prototypes and community projects." className="mb-12" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </motion.div>
      </div>
    </section>
  )
}
