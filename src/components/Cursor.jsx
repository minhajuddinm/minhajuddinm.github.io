import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../lib/motion.js'

/* Dot + trailing ring. Only on fine pointers; the ring grows over interactive elements
   and shows a label when an element carries data-cursor="...". */
export default function Cursor() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!fine || reduce) return
    document.documentElement.classList.add('has-cursor')
    const p = { x: -100, y: -100 }, r = { x: -100, y: -100 }
    let raf, hover = false, down = false, visible = false

    const move = e => {
      p.x = e.clientX; p.y = e.clientY
      if (!visible) { visible = true; r.x = p.x; r.y = p.y; ring.current.style.opacity = 1; dot.current.style.opacity = 1 }
      const t = e.target.closest?.('a, button, [role="button"], [data-cursor], input, textarea, label')
      const text = t?.getAttribute?.('data-cursor') || ''
      hover = !!t
      label.current.textContent = text
      ring.current.dataset.label = text ? '1' : ''
    }
    const leave = () => { visible = false; ring.current.style.opacity = 0; dot.current.style.opacity = 0 }
    const dn = () => { down = true }, up = () => { down = false }

    const tick = () => {
      r.x += (p.x - r.x) * 0.18
      r.y += (p.y - r.y) * 0.18
      const hasLabel = ring.current.dataset.label === '1'
      const s = hasLabel ? 2.1 : hover ? 1.7 : 1
      dot.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${hover ? 0 : 1})`
      ring.current.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%) scale(${down ? s * 0.85 : s})`
      label.current.style.opacity = hasLabel ? 1 : 0
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    raf = requestAnimationFrame(tick)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
    }
  }, [fine, reduce])

  if (!fine || reduce) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={ring}
        style={{ opacity: 0, transition: 'opacity .3s, background-color .3s, border-color .3s', willChange: 'transform' }}
        className="absolute left-0 top-0 w-9 h-9 rounded-full border border-accent/60 flex items-center justify-center data-[label='1']:bg-accent/90 data-[label='1']:border-accent"
      >
        <span ref={label} className="font-mono text-[6px] uppercase tracking-widest text-warm-bg transition-opacity" />
      </div>
      <div ref={dot} style={{ opacity: 0, willChange: 'transform' }} className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-accent transition-[opacity] duration-200" />
    </div>
  )
}
