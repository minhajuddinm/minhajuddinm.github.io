import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Grid + crosshair background ─── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgba(16,15,12,0.042) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(16,15,12,0.042) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '44px 44px',
        }}
      />

      {/* Horizontal axis */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ originX: 0.5 }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/12 to-transparent"
      />
      {/* Vertical axis */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ originY: 0.5 }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/12 to-transparent"
      />

      {/* Radial vignette — fades grid edges */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 20%, #F8F6F2 100%)' }}
      />
    </div>
  )
}

/* ─── Floating code annotation (desktop only) ─── */
function FloatingCode() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-12 top-[35%] hidden xl:block select-none pointer-events-none"
      aria-hidden="true"
    >
      <div className="font-mono text-[11px] leading-[1.85] tracking-wide">
        <div className="text-ink-muted/28">{'// status.json'}</div>
        <div className="text-ink-muted/22">{'{'}</div>
        <div className="ml-3 text-ink-muted/22">
          {'role: '}<span className="text-accent/45">{'"CS Researcher"'}</span>{','}
        </div>
        <div className="ml-3 text-ink-muted/22">
          {'org: '}<span className="text-accent/45">{'"Algoma Univ."'}</span>{','}
        </div>
        <div className="ml-3 text-ink-muted/22">
          {'open: '}<span className="text-emerald-500/55">{'true'}</span>
        </div>
        <div className="text-ink-muted/22">{'}'}</div>
      </div>
    </motion.div>
  )
}

/* ─── Magnetic CTA button ─── */
function MagneticButton({ href, children, primary }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - r.left - r.width  / 2) * 0.18,
      y: (e.clientY - r.top  - r.height / 2) * 0.18,
    })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      className={
        primary
          ? 'px-8 py-3.5 bg-accent text-white rounded-full text-sm font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow'
          : 'px-8 py-3.5 bg-white/80 backdrop-blur-md border border-border-soft text-ink rounded-full text-sm font-bold hover:bg-white hover:border-accent/30 transition-all'
      }
    >
      {children}
    </motion.a>
  )
}

/* ─── Headline word list ─── */
const WORDS = [
  { text: 'Building',     accent: false },
  { text: 'at',           accent: false },
  { text: 'the',          accent: false },
  { text: 'intersection', accent: false },
  { text: 'of',           accent: false },
  { text: 'humans,',      accent: true  },
  { text: 'technology,',  accent: false },
  { text: 'and',          accent: false },
  { text: 'ideas.',       accent: false },
]

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay } },
})

/* ─── Section ─── */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-warm-bg"
    >
      <GridBackground />
      <FloatingCode />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-accent/80 uppercase">
            CS Researcher · Developer · Innovator
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.12] mb-6 tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.065, delayChildren: 0.35 } } }}
        >
          {WORDS.map(({ text, accent }, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className={`inline-block mr-[0.27em] last:mr-0 ${accent ? 'text-accent italic' : ''}`}
            >
              {text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(0.95)}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-ink-muted mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Muhammad Minhajuddin — Computer Science Researcher &amp; Developer at Algoma University.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(1.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#research" primary>Explore Research</MagneticButton>
          <MagneticButton href="#projects">View Projects</MagneticButton>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          variants={fadeUp(1.3)}
          initial="hidden"
          animate="visible"
          className="mt-16 pt-10 border-t border-border-soft flex items-center justify-center gap-10"
        >
          {[
            { n: '4',   label: 'Papers' },
            { n: '6+',  label: 'Projects' },
            { n: '100+',label: 'Members led' },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-ink">{n}</div>
              <div className="font-mono text-[10px] text-ink-muted/55 uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-accent/40 uppercase">scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent origin-top"
        />
      </motion.div>
    </section>
  )
}
