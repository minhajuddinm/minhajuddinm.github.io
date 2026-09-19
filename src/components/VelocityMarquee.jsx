import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useMediaQuery } from '../lib/motion.js'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

/* Large outlined text strip. Drifts on its own and speeds up / skews with scroll velocity. */
export default function VelocityMarquee({ items, baseVelocity = -2 }) {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })
  const skew = useTransform(smooth, [-2000, 0, 2000], [8, 0, -8])
  const dir = useRef(1)

  useAnimationFrame((t, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    x.set(wrap(-50, 0, x.get() + move))
  })

  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden py-10 sm:py-14 border-y border-border-soft bg-warm-bg select-none" aria-hidden="true">
      <motion.div style={{ x: useTransform(x, v => `${v}%`), skewX: reduce ? 0 : skew }} className="flex w-max whitespace-nowrap">
        {[0, 1].map(k => (
          <div key={k} className="flex items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={`font-display text-5xl sm:text-7xl lg:text-8xl px-6 ${i % 2 ? 'text-transparent' : 'text-ink'}`}
                  style={i % 2 ? { WebkitTextStroke: '1px rgb(var(--ink) / .45)' } : undefined}
                >
                  {w}
                </span>
                <span className="w-3 h-3 rotate-45 bg-accent/70 mx-2" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
