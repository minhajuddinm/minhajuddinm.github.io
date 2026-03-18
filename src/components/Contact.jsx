import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'minhaj112204@gmail.com',
    href: 'mailto:minhaj112204@gmail.com',
    icon: <EmailIcon />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-minhajuddin76',
    href: 'https://linkedin.com/in/muhammad-minhajuddin76',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    value: 'github.com/minhajuddin', // TODO: Replace with your actual GitHub username
    href: 'https://github.com/minhajuddin',
    icon: <GitHubIcon />,
  },
]

const INPUT_CLASS =
  'w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-sm text-ink ' +
  'placeholder:text-ink-muted/50 focus:outline-none focus:border-accent transition-colors'

export default function Contact() {
  const headingRef = useScrollReveal()
  const linksRef = useScrollReveal(100)
  const formRef = useScrollReveal(200)
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Replace with Formspree submission or your own backend.
    // Example with Formspree:
    //   const data = new FormData(e.target)
    //   await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: data })
    setSent(true)
  }

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="reveal mb-16">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">Let's Connect</h2>
          <p className="text-ink-muted max-w-md leading-relaxed">
            Open to research collaborations, internship opportunities, and interesting conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Contact links */}
          <div ref={linksRef} className="reveal space-y-7">
            {CONTACT_LINKS.map(({ label, value, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors shrink-0">
                  {icon}
                </span>
                <div>
                  <p className="text-[10px] font-medium text-ink-muted uppercase tracking-widest mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm text-ink group-hover:text-accent transition-colors">
                    {value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Right: Contact form */}
          {/* TODO: Set action to your Formspree URL, e.g. https://formspree.io/f/YOUR_FORM_ID */}
          <form
            ref={formRef}
            className="reveal space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] font-medium text-ink-muted uppercase tracking-widest mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-medium text-ink-muted uppercase tracking-widest mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-medium text-ink-muted uppercase tracking-widest mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {sent ? (
              <p className="text-sm font-medium text-emerald-600 py-2">
                Message sent — I'll be in touch soon!
              </p>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Send Message
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
