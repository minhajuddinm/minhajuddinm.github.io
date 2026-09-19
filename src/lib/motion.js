import { useEffect, useState } from 'react'

export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const stagger = (s = 0.1, d = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: s, delayChildren: d } },
})

export function useMediaQuery(q) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [q])
  return match
}

/* Pointer-follow light for .spotlight elements */
export function spotlightMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
