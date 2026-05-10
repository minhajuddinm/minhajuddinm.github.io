import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, ArrowUpRight, Send, CheckCircle } from 'lucide-react'

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'minhaj112204@gmail.com',
    href: 'mailto:minhaj112204@gmail.com',
    icon: <Mail size={18} />,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-minhajuddin76',
    href: 'https://linkedin.com/in/muhammad-minhajuddin76',
    icon: <Linkedin size={18} />,
  },
  {
    label: 'GitHub',
    value: 'github.com/minhajuddinm',
    href: 'https://github.com/minhajuddinm',
    icon: <Github size={18} />,
  },
]

const INPUT_CLASS =
  'w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-sm text-ink ' +
  'placeholder:text-ink-muted/40 focus:outline-none focus:border-accent focus:ring-2 ' +
  'focus:ring-accent/10 transition-all duration-200 font-body'

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
    <section id="contact" className="relative py-28 px-6 bg-surface overflow-hidden">
      {/* Subtle orb background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full animate-orb-slow"
          style={{ background: 'radial-gradient(circle at center, rgba(42,94,64,0.06) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full animate-orb-med"
          style={{ background: 'radial-gradient(circle at center, rgba(52,211,153,0.05) 0%, transparent 65%)' }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Social link cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-3"
          >
            {CONTACT_LINKS.map(({ label, value, href, icon }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ x: 4, y: -2 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-4 group p-4 bg-warm-bg border border-border-soft rounded-2xl hover:border-accent/25 hover:bg-white hover:shadow-md hover:shadow-accent/5 transition-all duration-200"
              >
                <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-border-soft text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-200 shrink-0 shadow-sm">
                  {icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] text-ink-muted/60 uppercase tracking-widest mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-ink group-hover:text-accent transition-colors truncate">{value}</p>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-ink-muted/30 group-hover:text-accent/60 transition-colors shrink-0"
                  aria-hidden="true"
                />
              </motion.a>
            ))}

            {/* Availability note */}
            <motion.div
              variants={fadeUp}
              className="mt-6 p-4 bg-accent-soft border border-accent/12 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Available for opportunities</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Graduating Dec 2026. Open to research roles, internships, and collaborations starting late 2026.
              </p>
            </motion.div>
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
              { id: 'name',  type: 'text',  label: 'Name',  placeholder: 'Your name'       },
              { id: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com' },
            ].map(({ id, type, label, placeholder }) => (
              <motion.div key={id} variants={fadeUp}>
                <label htmlFor={id} className="block font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest mb-2">
                  {label}
                </label>
                <input
                  id={id} name={id} type={type} required
                  placeholder={placeholder}
                  className={INPUT_CLASS}
                />
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <label htmlFor="message" className="block font-mono text-[10px] text-ink-muted/60 uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                id="message" name="message" required rows={5}
                placeholder="What's on your mind?"
                className={`${INPUT_CLASS} resize-none`}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl"
                >
                  <CheckCircle size={16} className="text-emerald-600 shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-emerald-700">Message sent — I'll be in touch soon!</p>
                </motion.div>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-accent/20 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 transition-all duration-200"
                >
                  <Send size={15} aria-hidden="true" />
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
