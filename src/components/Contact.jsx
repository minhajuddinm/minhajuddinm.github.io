import { useState } from 'react'
import { motion } from 'framer-motion'

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
  { label: 'Email',    value: 'minhaj112204@gmail.com',             href: 'mailto:minhaj112204@gmail.com',             icon: <EmailIcon />    },
  { label: 'LinkedIn', value: 'linkedin.com/in/muhammad-minhajuddin76', href: 'https://linkedin.com/in/muhammad-minhajuddin76', icon: <LinkedInIcon /> },
  { label: 'GitHub',   value: 'github.com/minhajuddinm',            href: 'https://github.com/minhajuddinm',           icon: <GitHubIcon />   },
]

const INPUT_CLASS =
  'w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-sm text-ink ' +
  'placeholder:text-ink-muted/40 focus:outline-none focus:border-accent transition-colors font-body'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-28 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-accent/70 mb-3 tracking-widest">{'// contact'}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink mb-4">Let's Connect</h2>
          <p className="text-ink-muted max-w-md leading-relaxed">
            Open to research collaborations, internship opportunities, and interesting conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Links */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-7"
          >
            {CONTACT_LINKS.map(({ label, value, href, icon }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-200 shrink-0">
                  {icon}
                </span>
                <div>
                  <p className="font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-sm text-ink group-hover:text-accent transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {[
              { id: 'name',    type: 'text',  label: 'Name',    placeholder: 'Your name'       },
              { id: 'email',   type: 'email', label: 'Email',   placeholder: 'you@example.com' },
            ].map(({ id, type, label, placeholder }) => (
              <motion.div key={id} variants={fadeUp}>
                <label htmlFor={id} className="block font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest mb-2">{label}</label>
                <input id={id} name={id} type={type} required placeholder={placeholder} className={INPUT_CLASS} />
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <label htmlFor="message" className="block font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest mb-2">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="What's on your mind?" className={`${INPUT_CLASS} resize-none`} />
            </motion.div>

            <motion.div variants={fadeUp}>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-emerald-600 py-2"
                >
                  Message sent — I'll be in touch soon!
                </motion.p>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full px-6 py-3.5 bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-accent/20 hover:bg-accent/90 transition-all"
                >
                  Send Message
                </motion.button>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
