import { useScrollReveal } from '../hooks/useScrollReveal'

const INFO = [
  { icon: '🎓', text: 'Algoma University, BCS Honours — Dec 2026' },
  { icon: '📍', text: 'Brampton, Ontario, Canada' },
  { icon: '🔬', text: 'SLIDE Research Studio' },
  { icon: '✈️', text: 'Mitacs Globalink Intern — University of Aberdeen (May–Aug 2026)' },
]

const SKILLS = [
  'React', 'Python', 'Unity', 'C#', 'VR/AR', 'HCI',
  'Node.js', 'TailwindCSS', 'Git', 'LaTeX',
]

export default function About() {
  const headingRef = useScrollReveal()
  const bioRef = useScrollReveal(80)
  const cardRef = useScrollReveal(160)

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div ref={headingRef} className="reveal mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            About
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink">Who I Am</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Bio + skills */}
          <div ref={bioRef} className="reveal">
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
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-accent-soft text-accent text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Fact card */}
          <div ref={cardRef} className="reveal">
            <div className="bg-white border border-border-soft rounded-2xl p-7 shadow-sm">
              <ul className="space-y-5">
                {INFO.map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 leading-none mt-0.5">{icon}</span>
                    <span className="text-sm text-ink-muted leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
