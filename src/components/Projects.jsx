import { useScrollReveal } from '../hooks/useScrollReveal'

const PROJECTS = [
  {
    id: 1,
    name: 'Eyes of the Soul',
    description:
      'A VR narrative game built in Unity with a psychological horror / exploration theme.',
    tags: ['Unity', 'C#', 'VR', 'Meta SDK'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: null,
  },
  {
    id: 2,
    name: 'Thunder Hacks',
    description: 'Organized a 24-hour hackathon for Algoma University students.',
    tags: ['Event Management', 'Web', 'React'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: '#', // TODO: Replace with your actual demo/event URL
  },
  {
    id: 3,
    name: 'ALCOMS Website',
    description:
      'Built and maintained the official site for the Algoma University Computer Science Society.',
    tags: ['React', 'TailwindCSS', 'Vite'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: '#', // TODO: Replace with your actual demo URL
  },
  {
    id: 4,
    name: 'HYPAR AR Prototype',
    description:
      'AR mobile prototype for hyper-personalized product packaging using markerless tracking.',
    tags: ['Unity', 'AR Foundation', 'C#'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: null,
  },
  {
    id: 5,
    name: 'EDOA Simulator',
    description:
      'Simulation tool for testing the EDOA edge-cloud task offloading algorithm.',
    tags: ['Python', 'Matplotlib', 'NumPy'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: null,
  },
  {
    id: 6,
    name: 'Personal Portfolio',
    description: 'This site — designed and built from scratch.',
    tags: ['React', 'Vite', 'TailwindCSS'],
    github: '#', // TODO: Replace with your actual GitHub URL
    demo: '#', // TODO: Replace with your actual live URL
  },
]

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const ref = useScrollReveal(index * 60)

  return (
    <article
      ref={ref}
      className="reveal bg-white border border-border-soft rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200"
    >
      <h3 className="font-display text-xl text-ink mb-3">{project.name}</h3>
      <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-accent-soft text-accent text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-border-soft">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent transition-colors"
            aria-label={`${project.name} on GitHub`}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent transition-colors"
            aria-label={`${project.name} live demo`}
          >
            <ExternalLinkIcon />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const headingRef = useScrollReveal()

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="reveal mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            Projects
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Things I've Built</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
