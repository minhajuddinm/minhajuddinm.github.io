import { useScrollReveal } from '../hooks/useScrollReveal'

const EXPERIENCE = [
  {
    id: 1,
    role: 'Research Intern',
    org: 'University of Aberdeen',
    period: 'May 2026 – Aug 2026',
    badge: 'Upcoming',
    bullets: [
      'Mitacs Globalink Research Award recipient.',
      'Investigating Quantum Key Distribution protocols.',
      'Collaborating with faculty on quantum-safe communication research.',
    ],
  },
  {
    id: 2,
    role: 'Co-founder & President',
    org: 'ALCOMS, Algoma University',
    period: '2024 – Present',
    badge: null,
    bullets: [
      'Founded the Computer Science Society from scratch.',
      'Organized Thunder Hacks hackathon (March 2025).',
      'Grew membership to 100+ students.',
    ],
  },
  {
    id: 3,
    role: 'Undergraduate Researcher — HCI',
    org: 'SLIDE Research Studio, Algoma University',
    period: '2024 – Present',
    badge: null,
    bullets: [
      'Conducting HCI research on HYPAR (AR personalized packaging) and V.O.I.D. (VR locomotion).',
      'Collaborating with Dr. Somang Nam on XR and spatial computing research.',
    ],
  },
  {
    id: 4,
    role: 'Research Assistant — Edge-Cloud Computing',
    org: 'Algoma University',
    period: '2024 – Present',
    badge: null,
    bullets: [
      'Developing EDOA, an adaptive task offloading framework for edge-cloud environments.',
      'Optimizing energy consumption and latency using dynamic decision algorithms.',
    ],
  },
]

function TimelineEntry({ entry, index }) {
  const ref = useScrollReveal(index * 100)

  return (
    <div ref={ref} className="reveal relative pl-9 pb-12 last:pb-0">
      {/* Dot */}
      <div
        className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-warm-bg"
        aria-hidden="true"
      />
      {/* Vertical line — hidden on last child */}
      <div
        className="absolute left-[6px] top-5 bottom-0 w-px bg-border-soft last:hidden"
        aria-hidden="true"
      />

      {/* Role + optional badge */}
      <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
        <h3 className="font-display text-xl text-ink">{entry.role}</h3>
        {entry.badge && (
          <span className="px-2.5 py-0.5 bg-accent-soft text-accent text-xs font-medium rounded-full">
            {entry.badge}
          </span>
        )}
      </div>

      {/* Org + dates */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-4">
        <span className="text-sm font-medium text-accent">{entry.org}</span>
        <span className="text-sm text-ink-muted">{entry.period}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
            <span className="text-accent shrink-0 mt-px leading-5">–</span>
            <span className="leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  const headingRef = useScrollReveal()

  return (
    <section id="experience" className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="reveal mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            Experience
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Timeline</h2>
        </div>

        <div className="relative">
          {EXPERIENCE.map((entry, i) => (
            <TimelineEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
