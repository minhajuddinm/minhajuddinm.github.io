import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

const PHOTO = new URL('../assets/portrait.webp', import.meta.url).href

const BTN = 'inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold whitespace-nowrap transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5 active:translate-y-0'

/* First screen: the name, one sentence, two actions, and the photograph. */
export default function Hero() {
  return (
    <section id="hero" className="relative bg-warm-bg grain overflow-hidden" aria-label="Introduction">
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-14 md:pt-32 md:pb-20 md:min-h-[min(100svh,820px)] grid items-center gap-10 md:gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="min-w-0">
          <h1 className="font-display text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl text-ink tracking-tight mb-6">
            {['Muhammad', 'Minhajuddin'].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className="text-lg sm:text-xl text-ink-muted leading-relaxed mb-8 max-w-md"
          >
            Starting a thesis MSc at Algoma in quantum communication and mixed reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#map" data-cursor="view" className={`${BTN} bg-accent text-warm-bg shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40`}>
              See the research
            </a>
            <a href="#contact" className={`${BTN} bg-surface border border-border-soft text-ink hover:border-accent/40`}>
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Landscape frame with one offset outline behind it */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative min-w-0 md:mr-3"
        >
          <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-accent/35" />
          <img
            src={PHOTO}
            alt="Muhammad Minhajuddin, smiling, wearing glasses and a grey checked blazer over a black shirt in a bright office"
            width="1024"
            height="1024"
            fetchpriority="high"
            decoding="async"
            className="relative block w-full aspect-[4/3] object-cover object-[50%_18%] rounded-[1.75rem] bg-surface"
          />
        </motion.figure>
      </div>
    </section>
  )
}
