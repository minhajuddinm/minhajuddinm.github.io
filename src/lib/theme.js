import { useEffect, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'

function readTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t)
  try { localStorage.setItem('theme', t) } catch (e) { /* storage unavailable */ }
}

/* Theme state shared through the data-theme attribute on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(() => (typeof document === 'undefined' ? 'light' : readTheme()))

  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(readTheme()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Follow the OS setting until the visitor picks one
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = e => {
      let saved = null
      try { saved = localStorage.getItem('theme') } catch (err) {}
      if (!saved) document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
    }
    mq.addEventListener?.('change', onChange)
    return () => { obs.disconnect(); mq.removeEventListener?.('change', onChange) }
  }, [])

  /* Circular reveal from the click point where the View Transitions API exists */
  const toggle = useCallback((e) => {
    const next = readTheme() === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) { applyTheme(next); return }

    const x = e?.clientX ?? window.innerWidth - 40
    const y = e?.clientY ?? 40
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const vt = document.startViewTransition(() => { flushSync(() => applyTheme(next)) })
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => {})
  }, [])

  return { theme, toggle }
}
