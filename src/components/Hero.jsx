import { motion } from 'framer-motion'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, perspective: 1000 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)", rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center dot-grid overflow-hidden perspective-1000 bg-warm-bg/50"
    >
      {/* Decorative Floating Blobs for Light Mode (Using mix-blend-multiply to tint the white background) */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 40, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-80 h-80 bg-indigo-300/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -40, 0],
          scale: [1, 1.4, 1],
          rotate: [0, -180, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-purple-300/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"
      />

      {/* Soft Vignette to fade dot grid edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #FAFAFA 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-6 text-center preserve-3d"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-block mb-8">
          <span className="px-5 py-2.5 rounded-full bg-accent-soft/80 border border-accent/20 text-xs font-bold tracking-[0.2em] text-accent uppercase backdrop-blur-md shadow-sm">
            CS Researcher &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Innovator
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl lg:text-8xl text-ink leading-[1.1] mb-6 tracking-tight">
          Building at the intersection of <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#3730A3,#4F46E5)] font-bold drop-shadow-sm pr-2">humans</span>, technology, and ideas.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-base sm:text-xl text-ink-muted mb-12 leading-relaxed max-w-2xl mx-auto font-light">
          Muhammad Minhajuddin — Computer Science Researcher &amp; Developer at Algoma University crafting immersive realities.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5">
          <motion.a
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 30px rgba(55, 48, 163, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            href="#research"
            className="px-8 py-3.5 bg-[linear-gradient(135deg,#3730A3,#4F46E5)] text-white rounded-full text-sm font-bold transition-all shadow-lg"
          >
            Explore Research
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-8 py-3.5 bg-white/70 backdrop-blur-md border border-border-soft text-ink rounded-full text-sm font-bold transition-all shadow-sm"
          >
            View Projects
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted/60"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-accent">Scroll</span>
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
