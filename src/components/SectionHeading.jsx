import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

/* Section title. Each word rises out of a mask. */
export default function SectionHeading({ title, sub, className = 'mb-14' }) {
  const words = title.split(' ')
  return (
    <div className={className}>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tight"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block"
              variants={{
                hidden:  { y: '105%', rotate: 4 },
                visible: { y: '0%', rotate: 0, transition: { duration: 0.8, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="mt-5 text-ink-muted max-w-xl leading-relaxed text-lg font-light"
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}
