import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Animated orb background ─── */
function OrbBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 – top-right, large forest green */}
      <div
        className="absolute -top-48 -right-32 w-[700px] h-[700px] rounded-full animate-orb-slow"
        style={{ background: 'radial-gradient(circle at 40% 40%, rgba(42,94,64,0.11) 0%, transparent 65%)' }}
      />
      {/* Orb 2 – mid-left, emerald */}
      <div
        className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full animate-orb-med"
        style={{ background: 'radial-gradient(circle at 60% 60%, rgba(52,211,153,0.08) 0%, transparent 65%)' }}
      />
      {/* Orb 3 – bottom center */}
      <div
        className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full animate-orb"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(42,94,64,0.06) 0%, transparent 65%)' }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgba(42,94,64,0.04) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(42,94,64,0.04) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '44px 44px',
        }}
      />

      {/* Axis lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ originX: 0.5 }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ originY: 0.5 }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent"
      />

      {/* Edge vignette */}
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
      className="absolute right-10 top-[32%] hidden xl:block select-none pointer-events-none animate-float"
      aria-hidden="true"
    >
      <div className="bg-white/75 backdrop-blur-xl border border-border-soft rounded-2xl p-5 shadow-xl shadow-accent/5">
        <div className="font-mono text-[11px] leading-[1.9] tracking-wide">
          <div className="text-accent/55 mb-1">{'// status.json'}</div>
          <div className="text-ink-muted/55">{'{'}</div>
          <div className="ml-3 text-ink-muted/55">
            {'role: '}<span className="text-accent/75">{'"CS Researcher"'}</span>{','}
          </div>
          <div className="ml-3 text-ink-muted/55">
            {'org: '}<span className="text-accent/75">{'"Algoma Univ."'}</span>{','}
          </div>
          <div className="ml-3 text-ink-muted/55">
            {'open: '}<span className="text-emerald-600/80">{'true'}</span>
          </div>
          <div className="text-ink-muted/55">{'}'}</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Live cycling activity card (large screens) ─── */
const ACTIVITY_ITEMS = [
  'Mitacs Intern · University of Aberdeen',
  'Researching XR · SLIDE Research Studio',
  'Building at the edge of HCI & AI',
]

function LiveActivity() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % ACTIVITY_ITEMS.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-20 right-6 hidden lg:block"
      aria-hidden="true"
    >
      <div className="bg-white/85 backdrop-blur-xl border border-border-soft rounded-2xl p-4 shadow-xl shadow-accent/5 max-w-[225px]">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[9px] text-accent/70 uppercase tracking-widest font-medium">live</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="font-mono text-[11px] text-ink-muted leading-snug"
          >
            {ACTIVITY_ITEMS[idx]}
          </motion.p>
        </AnimatePresence>
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
          ? 'relative px-8 py-3.5 bg-accent text-white rounded-full text-sm font-bold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/45 transition-shadow duration-300 overflow-hidden group'
          : 'px-8 py-3.5 bg-white/80 backdrop-blur-md border border-border-soft text-ink rounded-full text-sm font-bold hover:bg-white hover:border-accent/25 hover:shadow-lg transition-all duration-200'
      }
    >
      {primary && (
        <span className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-full pointer-events-none" />
      )}
      <span className="relative">{children}</span>
    </motion.a>
  )
}

/* ─── Cycling word in headline ─── */
const CYCLE_WORDS = ['humans,', 'students,', 'researchers,', 'builders,']

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    let intervalId
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => setIdx(i => (i + 1) % CYCLE_WORDS.length), 2400)
    }, 2200)
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-accent italic inline-block mr-[0.27em]"
      >
        {CYCLE_WORDS[idx]}
      </motion.span>
    </AnimatePresence>
  )
}

const WORDS_BEFORE = ['Building', 'at', 'the', 'intersection', 'of']
const WORDS_AFTER  = ['technology,', 'and', 'ideas.']

const wordVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay } },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-warm-bg"
    >
      <OrbBackground />
      <FloatingCode />
      <LiveActivity />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Live status */}
        <motion.div
          variants={fadeUp(0.0)}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-2 mb-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-emerald-700/70 tracking-wide">
            Currently: Mitacs Research Intern · Aberdeen, UK
          </span>
        </motion.div>

        {/* Badge pill */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 bg-accent-soft border border-accent/12 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.15em] text-accent/80 uppercase">
            CS Researcher · Developer · Innovator
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-ink leading-[1.12] mb-6 tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.065, delayChildren: 0.35 } } }}
        >
          {WORDS_BEFORE.map((text, i) => (
            <motion.span key={`b-${i}`} variants={wordVariant} className="inline-block mr-[0.27em]">
              {text}
            </motion.span>
          ))}
          <motion.span variants={wordVariant} className="inline-block">
            <CyclingWord />
          </motion.span>
          {WORDS_AFTER.map((text, i) => (
            <motion.span
              key={`a-${i}`}
              variants={wordVariant}
              className={`inline-block mr-[0.27em] ${i === WORDS_AFTER.length - 1 ? 'last:mr-0' : ''}`}
            >
              {text}
            </motion.span>
          ))}
          <motion.span variants={wordVariant} className="inline-block ml-0.5 align-baseline">
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, times: [0, 0.45, 0.5, 1] }}
              className="inline-block w-[3px] h-[0.75em] bg-accent/50 align-middle rounded-[1px]"
              aria-hidden="true"
            />
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(0.95)}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-ink-muted mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Muhammad Minhajuddin, Computer Science Researcher &amp; Developer at Algoma University.
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
