import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAPERS, CLUSTERS, STATUS_META } from '../data/papers.js'
import { useTheme } from '../lib/theme.js'
import { useMediaQuery, EASE } from '../lib/motion.js'

/* ────────────────────────────────────────────────────────────
   Research constellation
   Every paper is a star. Stars sit in one cluster per field.
   Desktop: the section pins and scrolling flies the camera
   cluster to cluster. Mobile / reduced motion: static map.
   The Three.js part lives in constellationScene.js and loads
   after first paint.
   ──────────────────────────────────────────────────────────── */

/* Legend colours (kept in sync with constellationScene.js) */
const PALETTE = {
  dark:  { published: '#7ED6A4', accepted: '#8EC5FF', review: '#FFC46B' },
  light: { published: '#1F7A4D', accepted: '#2B63C9', review: '#C2740C' },
}

/* Stage boundaries along the pinned scroll (0..1) */
const STAGES = [0.18, 0.40, 0.62, 0.83]
const stageOf = p => (p < STAGES[0] ? 0 : p < STAGES[1] ? 1 : p < STAGES[2] ? 2 : p < STAGES[3] ? 3 : 4)


export default function Constellation() {
  const { theme } = useTheme()
  const desktop = useMediaQuery('(min-width: 768px)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const tour = desktop && !reduce

  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const labelsRef = useRef({})
  const clusterLabelsRef = useRef({})
  const progressRef = useRef(0)
  const themeRef = useRef(theme)
  const apiRef = useRef({})

  const [stage, setStage] = useState(0)
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [ready, setReady] = useState(false)

  const byCluster = useMemo(() => {
    const m = {}
    CLUSTERS.forEach(c => { m[c.id] = PAPERS.filter(p => p.category === c.id) })
    return m
  }, [])

  /* Scroll progress through the pinned section */
  useEffect(() => {
    if (!tour) { progressRef.current = 0; setStage(0); return }
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0
      progressRef.current = p
      setStage(s => { const n = stageOf(p); return n === s ? s : n })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [tour])

  useEffect(() => { setSelected(null) }, [stage])

  /* Three.js scene: loaded after first paint so the text shows at once */
  useEffect(() => {
    let alive = true
    let handle = null
    import('./constellationScene.js').then(({ mountScene }) => {
      if (!alive) return
      handle = mountScene({
        canvas: canvasRef.current, desktop, reduce, progressRef, themeRef, labelsRef, clusterLabelsRef,
        papers: PAPERS, clusters: CLUSTERS,
        onHover: p => setHovered(p),
        onSelect: p => setSelected(p),
      })
      if (handle) { apiRef.current.paint = handle.paint; setReady(true) }
    }).catch(() => {})
    return () => { alive = false; handle?.dispose(); setReady(false) }
  }, [desktop, reduce])

  useEffect(() => { themeRef.current = theme; apiRef.current.paint?.(theme) }, [theme])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const focusCluster = stage >= 1 && stage <= 3 ? CLUSTERS[stage - 1] : null

  const openInList = useCallback((p) => {
    setSelected(null)
    window.dispatchEvent(new CustomEvent('open-paper', { detail: p.id }))
    document.getElementById(`paper-${p.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const total = PAPERS.length
  const published = PAPERS.filter(p => p.statusKey === 'published').length

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative bg-warm-bg"
      style={{ height: tour ? '420vh' : 'auto' }}
      aria-label="Introduction and research map"
    >
      <div className={`${tour ? 'sticky top-0 h-screen' : desktop ? 'relative h-screen min-h-[640px]' : 'relative min-h-[100svh]'} overflow-hidden grain`}>
        {/* Sky */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-x-0 top-0 w-full ${desktop ? 'h-full' : 'h-[60svh]'} transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />

        {/* Gradient that keeps the text column readable */}
        <div
          className={`absolute inset-x-0 top-0 pointer-events-none ${desktop ? 'h-full' : 'h-[60svh]'}`}
          style={{
            background: desktop
              ? 'linear-gradient(90deg, rgb(var(--bg)) 0%, rgb(var(--bg) / .85) 30%, rgb(var(--bg) / 0) 58%)'
              : 'linear-gradient(180deg, rgb(var(--bg) / 0) 55%, rgb(var(--bg)) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Star labels */}
        <div className={`absolute inset-x-0 top-0 pointer-events-none ${desktop ? 'h-full' : 'h-[60svh]'}`} aria-hidden="true">
          {PAPERS.map(p => {
            const show = (focusCluster && focusCluster.id === p.category) || (hovered && hovered.id === p.id)
            return (
              <div key={p.id} ref={el => { labelsRef.current[p.id] = el }} className="absolute left-0 top-0 will-change-transform">
                <div data-flip className="transition-transform duration-500">
                <div
                  className={`ml-4 -mt-2 whitespace-nowrap font-mono text-[11px] tracking-wide px-2 py-0.5 rounded-md bg-surface/80 backdrop-blur border border-border-soft text-ink transition-all duration-300 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`}
                >
                  {p.short}
                </div>
                </div>
              </div>
            )
          })}
          {CLUSTERS.map(c => (
            <div
              key={c.id}
              ref={el => { clusterLabelsRef.current[c.id] = el }}
              className={`absolute left-0 top-0 will-change-transform transition-opacity duration-500 ${(stage === 0 || stage === 4) && ready ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent whitespace-nowrap">
                {c.label} · {byCluster[c.id].length}
              </span>
            </div>
          ))}
        </div>

        {/* Text layer */}
        <div className={`relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pointer-events-none ${desktop ? 'h-full flex items-center' : 'pt-[50svh] pb-24'}`}>
          <div className="w-full md:max-w-[520px] pointer-events-auto" style={{ minHeight: tour ? 380 : undefined }}>
            <AnimatePresence mode="wait">
              {stage === 0 && <Intro key="intro" tour={tour} total={total} />}
              {focusCluster && (
                <ClusterCaption
                  key={focusCluster.id}
                  index={stage}
                  cluster={focusCluster}
                  papers={byCluster[focusCluster.id]}
                  onPick={setSelected}
                />
              )}
              {stage === 4 && <Outro key="outro" total={total} published={published} />}
            </AnimatePresence>
          </div>
        </div>

        {/* Stage rail */}
        {tour && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3" aria-hidden="true">
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} className={`block w-[3px] rounded-full transition-all duration-500 ${stage === i ? 'h-8 bg-accent' : 'h-3 bg-ink/20'}`} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="absolute left-5 sm:left-8 bottom-6 z-10 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-ink-muted" aria-hidden="true">
          {['published', 'accepted', 'review'].map(k => (
            <span key={k} className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${k === 'review' ? 'animate-twinkle' : ''}`}
                style={{ background: PALETTE[theme][k], boxShadow: `0 0 8px ${PALETTE[theme][k]}` }}
              />
              {STATUS_META[k].label}
            </span>
          ))}
        </div>

        {/* Scroll cue */}
        {tour && stage === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase">scroll to fly</span>
            <motion.span
              animate={{ scaleY: [1, 0.3, 1], opacity: [0.35, 1, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-accent to-transparent origin-top"
            />
          </motion.div>
        )}

        {/* Paper card */}
        <AnimatePresence>
          {selected && <PaperPanel key={selected.id} paper={selected} onClose={() => setSelected(null)} onOpen={openInList} />}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Text blocks ─── */

const CYCLE = ['humans,', 'students,', 'researchers,', 'builders,']

function CyclingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % CYCLE.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block italic text-accent"
        >
          {CYCLE[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const block = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
  exit:    { opacity: 0, y: -18, filter: 'blur(6px)', transition: { duration: 0.35, ease: EASE } },
}

function Intro({ tour, total }) {
  const words = ['Building', 'at', 'the', 'intersection', 'of']
  return (
    <motion.div {...block}>
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-glow opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-glow" />
        </span>
        <span className="font-mono text-[11px] text-ink-muted tracking-wide">Undergrad Researcher · Brampton, ON</span>
      </div>

      <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl text-ink tracking-tight mb-6">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.06em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.06 }}
            >
              {w}
            </motion.span>
          </span>
        ))}
        <CyclingWord />{' '}
        <span className="inline-block overflow-hidden align-bottom pb-[0.06em]">
          <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}>
            technology, and ideas.
          </motion.span>
        </span>
      </h1>

      <p className="text-base sm:text-lg text-ink-muted leading-relaxed mb-8 max-w-md">
        Muhammad Minhajuddin. Computer Science researcher at Algoma University working on
        HCI, mixed reality and quantum communication.
      </p>

      <div className="flex flex-wrap gap-3">
        <a href="#research" data-cursor="view" className="px-7 py-3.5 bg-accent text-warm-bg rounded-full text-sm font-bold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300">
          Publications
        </a>
        <a href="#projects" className="px-7 py-3.5 bg-surface/70 backdrop-blur border border-border-soft text-ink rounded-full text-sm font-bold hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
          Projects
        </a>
      </div>

      <p className="mt-8 font-mono text-[11px] text-ink-muted">
        {tour
          ? `Each star is one of ${total} papers. Scroll to fly through them, or click a star.`
          : `Each star is one of ${total} papers. Click or tap a star to read it.`}
      </p>
    </motion.div>
  )
}

function ClusterCaption({ index, cluster, papers, onPick }) {
  return (
    <motion.div {...block}>
      <p className="font-mono text-[11px] text-accent mb-3 tracking-widest">0{index} / 03 · FIELD</p>
      <h2 className="font-display text-5xl sm:text-6xl text-ink mb-3 tracking-tight">{cluster.label}</h2>
      <p className="text-ink-muted mb-6 leading-relaxed">{cluster.blurb}</p>
      <ul className="space-y-1.5">
        {papers.map((p, i) => (
          <motion.li key={p.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}>
            <button
              onClick={() => onPick(p)}
              data-cursor="open"
              className="group w-full text-left flex items-baseline gap-3 py-1.5 border-b border-border-soft/70 hover:border-accent/40 transition-colors"
            >
              <span className="font-mono text-[10px] text-ink-muted tabular-nums w-8 shrink-0">{p.year}</span>
              <span className="text-sm text-ink group-hover:text-accent transition-colors leading-snug">{p.short}</span>
              <span className="ml-auto font-mono text-[10px] text-ink-muted shrink-0">{p.venue.split(' · ')[0]}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function Outro({ total, published }) {
  return (
    <motion.div {...block}>
      <p className="font-mono text-[11px] text-accent mb-3 tracking-widest">THE MAP SO FAR</p>
      <h2 className="font-display text-5xl sm:text-6xl text-ink mb-4 tracking-tight">{total} papers, 3 fields.</h2>
      <p className="text-ink-muted mb-8 leading-relaxed max-w-md">
        {published} published, the rest accepted or under review, including a journal submission to IEEE TVCG.
        The dashed line links the V.O.I.D. poster to its journal extension.
      </p>
      <a href="#research" data-cursor="view" className="inline-flex px-7 py-3.5 bg-accent text-warm-bg rounded-full text-sm font-bold shadow-lg shadow-accent/25 hover:-translate-y-0.5 transition-all duration-300">
        Read the full list
      </a>
    </motion.div>
  )
}

function PaperPanel({ paper, onClose, onOpen }) {
  const st = STATUS_META[paper.statusKey]
  return (
    <motion.aside
      role="dialog"
      aria-label={paper.title}
      initial={{ opacity: 0, x: 40, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.98 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="absolute z-20 right-4 left-4 bottom-4 md:left-auto md:right-12 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:w-[400px] bg-surface/90 backdrop-blur-xl border border-border-soft rounded-2xl shadow-2xl shadow-black/10 p-6"
    >
      <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full text-ink-muted hover:text-ink hover:bg-accent-soft transition-colors" aria-label="Close">
        ✕
      </button>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-accent-soft text-accent border border-accent/15">{paper.tag}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
      </div>
      <h3 className="font-display text-xl text-ink leading-snug mb-2 pr-6">{paper.title}</h3>
      <p className="text-xs text-ink-muted mb-0.5">{paper.authors}</p>
      <p className="text-xs text-ink-muted italic mb-4">{paper.venue}</p>
      <p className="text-sm text-ink-muted leading-relaxed mb-5 max-h-40 overflow-auto">{paper.abstract}</p>
      <button onClick={() => onOpen(paper)} className="font-mono text-[11px] text-accent hover:underline underline-offset-4">
        see it in the publication list →
      </button>
    </motion.aside>
  )
}
