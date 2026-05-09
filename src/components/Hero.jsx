import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HERO_WORDS = [
  { text: 'Building',      accent: false },
  { text: 'at',            accent: false },
  { text: 'the',           accent: false },
  { text: 'intersection',  accent: false },
  { text: 'of',            accent: false },
  { text: 'humans,',       accent: true  },
  { text: 'technology,',   accent: false },
  { text: 'and',           accent: false },
  { text: 'ideas.',        accent: false },
]

function MagneticButton({ href, children, primary }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18
    setPos({ x, y })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      className={
        primary
          ? 'px-8 py-3.5 bg-accent text-white rounded-full text-sm font-bold shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-shadow'
          : 'px-8 py-3.5 bg-white/80 backdrop-blur-md border border-border-soft text-ink rounded-full text-sm font-bold hover:bg-white hover:border-accent/25 transition-all'
      }
    >
      {children}
    </motion.a>
  )
}

const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden bg-warm-bg"
    >
      {/* Warm decorative blobs — amber/rose instead of indigo/purple */}
      <motion.div
        animate={{ y: [0, -28, 0], x: [0, 20, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[12%] w-72 h-72 bg-amber-200/35 rounded-full blur-[90px] pointer-events-none mix-blend-multiply"
      />
      <motion.div
        animate={{ y: [0, 28, 0], x: [0, -20, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[12%] right-[12%] w-80 h-80 bg-orange-200/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div
        animate={{ y: [0, -15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[45%] right-[8%] w-44 h-44 bg-rose-100/40 rounded-full blur-[60px] pointer-events-none mix-blend-multiply"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #F9F7F4 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="visible"
          className="inline-block mb-10"
        >
          <span className="px-5 py-2 rounded-full bg-accent-soft border border-accent/15 text-xs font-bold tracking-[0.2em] text-accent uppercase">
            CS Researcher &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Innovator
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.12] mb-6 tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.065, delayChildren: 0.3 } } }}
        >
          {HERO_WORDS.map(({ text, accent }, i) => (
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
          variants={fadeUp(0.9)}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg text-ink-muted mb-12 leading-relaxed max-w-xl mx-auto"
        >
          Muhammad Minhajuddin — Computer Science Researcher &amp; Developer at Algoma University.
        </motion.p>

        {/* CTA buttons — magnetic */}
        <motion.div
          variants={fadeUp(1.05)}
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
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-accent/50">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent origin-top"
        />
      </motion.div>
    </section>
  )
}
