/* Three.js scene for the research constellation (split into its own chunk). */
import { AdditiveBlending,BufferAttribute,BufferGeometry,CanvasTexture,Clock,Float32BufferAttribute,Group,Line,LineBasicMaterial,LineDashedMaterial,LineSegments,NormalBlending,PerspectiveCamera,Points,PointsMaterial,Raycaster,SRGBColorSpace,Scene,Sprite,SpriteMaterial,Vector2,Vector3,WebGLRenderer } from 'three'

const CENTERS = {
  hci:       new Vector3(-3.6, 0.9, 0),
  quantum:   new Vector3(3.8, 1.5, -2.4),
  computing: new Vector3(0.7, -2.6, 1.4),
}

export const PALETTE = {
  dark:  { published: '#7ED6A4', accepted: '#8EC5FF', review: '#FFC46B', dust: '#9fb3a6', line: '#7ED6A4', nebula: '#5EEAAD' },
  light: { published: '#1F7A4D', accepted: '#2B63C9', review: '#C2740C', dust: '#48584c', line: '#2A5E40', nebula: '#2A5E40' },
}

const SIZE = { journal: 1.0, full: 0.8, survey: 0.8, poster: 0.6, demo: 0.6 }

/* Deterministic pseudo-random so the sky is the same on every visit */
function rng(seed) {
  let s = seed
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
}

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, 'rgba(255,255,255,1)')
  grd.addColorStop(0.12, 'rgba(255,255,255,0.95)')
  grd.addColorStop(0.28, 'rgba(255,255,255,0.35)')
  grd.addColorStop(0.6, 'rgba(255,255,255,0.08)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new CanvasTexture(c)
  t.colorSpace = SRGBColorSpace
  return t
}

function dotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')
  g.beginPath(); g.arc(16, 16, 14, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill()
  return new CanvasTexture(c)
}

const ss = t => { const c = Math.max(0, Math.min(1, t)); return c * c * (3 - 2 * c) }

export function mountScene({ canvas, desktop, reduce, progressRef, themeRef, labelsRef, clusterLabelsRef, papers, clusters, onHover, onSelect }) {
    
    let renderer
    try {
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch (e) {
      return null // no WebGL: the text layer still carries all content
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, desktop ? 2 : 1.5))
    renderer.setClearColor(0x000000, 0)

    const scene = new Scene()
    const camera = new PerspectiveCamera(50, 1, 0.1, 200)
    const glow = glowTexture()
    const dot = dotTexture()

    /* Background dust */
    const R = rng(7)
    const DUST = desktop ? 900 : 380
    const dpos = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      const r = 6 + R() * 16, th = R() * Math.PI * 2, ph = Math.acos(2 * R() - 1)
      dpos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      dpos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6
      dpos[i * 3 + 2] = Math.min(r * Math.cos(ph) - 4, 2)
    }
    const dustGeo = new BufferGeometry()
    dustGeo.setAttribute('position', new BufferAttribute(dpos, 3))
    const dustMat = new PointsMaterial({ size: 0.045, map: dot, transparent: true, opacity: 0.35, depthWrite: false, alphaTest: 0.01 })
    const dust = new Points(dustGeo, dustMat)
    scene.add(dust)

    const world = new Group()
    scene.add(world)

    /* Paper stars */
    const stars = []
    const lineMatIn = new LineBasicMaterial({ transparent: true, opacity: 0.22 })
    const lineMatLink = new LineDashedMaterial({ transparent: true, opacity: 0.7, dashSize: 0.12, gapSize: 0.08 })
    const nebulae = []
    const rings = []

    clusters.forEach((c, ci) => {
      const list = papers.filter(p => p.category === c.id)
      const center = CENTERS[c.id]
      const rr = rng(31 + ci * 11)
      const pts = []
      list.forEach((p, i) => {
        const n = list.length
        const a = i * 2.39996 + ci
        const rad = n === 1 ? 0 : 0.75 + (i / n) * 0.9 + rr() * 0.25
        const pos = new Vector3(
          center.x + Math.cos(a) * rad,
          center.y + Math.sin(a) * rad * 0.8 + (rr() - 0.5) * 0.3,
          center.z + (rr() - 0.5) * 1.2,
        )
        const mat = new SpriteMaterial({ map: glow, transparent: true, depthWrite: false })
        const s = new Sprite(mat)
        const base = SIZE[p.kind] || 0.7
        s.position.copy(pos)
        s.scale.setScalar(base)
        s.userData = { paper: p, base, phase: rr() * Math.PI * 2 }
        world.add(s)
        stars.push(s)
        pts.push(pos)
      })
      /* Chain the stars of a cluster by angle around its centre */
      if (pts.length > 1) {
        const ordered = [...pts].sort((a, b) => Math.atan2(a.y - center.y, a.x - center.x) - Math.atan2(b.y - center.y, b.x - center.x))
        const seg = []
        for (let i = 0; i < ordered.length; i++) {
          const a = ordered[i], b = ordered[(i + 1) % ordered.length]
          if (ordered.length === 2 && i === 1) break
          seg.push(a.x, a.y, a.z, b.x, b.y, b.z)
        }
        const g = new BufferGeometry()
        g.setAttribute('position', new Float32BufferAttribute(seg, 3))
        world.add(new LineSegments(g, lineMatIn))
      }
      /* Soft nebula behind each field */
      const neb = new Sprite(new SpriteMaterial({ map: glow, transparent: true, depthWrite: false, opacity: 0.1 }))
      neb.position.copy(center).add(new Vector3(0, 0, -0.8))
      neb.scale.setScalar(5.5)
      world.add(neb)
      nebulae.push(neb)
      /* Orbit ring */
      const ringGeo = new BufferGeometry().setFromPoints(
        Array.from({ length: 129 }, (_, k) => {
          const t = (k / 128) * Math.PI * 2
          return new Vector3(Math.cos(t) * 2.2, Math.sin(t) * 2.2, 0)
        }),
      )
      const ring = new Line(ringGeo, new LineBasicMaterial({ transparent: true, opacity: 0.12 }))
      ring.position.copy(center)
      ring.rotation.set(1.1 + ci * 0.3, 0.2 * ci, 0)
      world.add(ring)
      rings.push(ring)
    })

    /* The TVCG journal paper extends the V.O.I.D. poster: draw that link */
    const voidStar = stars.find(s => s.userData.paper.id === 3)
    const tvcgStar = stars.find(s => s.userData.paper.id === 10)
    let linkLine = null
    if (voidStar && tvcgStar) {
      const g = new BufferGeometry().setFromPoints([voidStar.position, tvcgStar.position])
      linkLine = new Line(g, lineMatLink)
      linkLine.computeLineDistances()
      world.add(linkLine)
    }

    /* Theme colours */
    function paint(t) {
      const P = PALETTE[t]
      const dark = t === 'dark'
      stars.forEach(s => {
        s.material.color.set(P[s.userData.paper.statusKey])
        s.material.blending = dark ? AdditiveBlending : NormalBlending
        s.material.needsUpdate = true
      })
      dustMat.color.set(P.dust)
      dustMat.opacity = dark ? 0.45 : 0.28
      lineMatIn.color.set(P.line); lineMatIn.opacity = dark ? 0.28 : 0.22
      lineMatLink.color.set(P.accepted)
      nebulae.forEach(n => { n.material.color.set(P.nebula); n.material.opacity = dark ? 0.09 : 0.06 })
      rings.forEach(r => { r.material.color.set(P.line); r.material.opacity = dark ? 0.16 : 0.12 })
    }
    paint(themeRef.current)

    /* Camera path */
    const off = desktop ? new Vector3(-1.7, 0, 0) : new Vector3(0, -0.4, 0)
    const key = (target, pos) => ({ target, pos })
    const overview = key(desktop ? new Vector3(-4.6, -0.2, 0) : new Vector3(0, -0.6, 0), new Vector3(desktop ? -3.4 : 0.8, 0.6, desktop ? 13 : 17))
    const K = [
      { t: 0.0, ...overview },
      { t: 0.1, ...overview },
      ...clusters.map((c, i) => {
        const ctr = CENTERS[c.id]
        return {
          t: [0.29, 0.51, 0.72][i],
          target: ctr.clone().add(off),
          pos: ctr.clone().add(off).add(new Vector3(0, 0.3, desktop ? 6.8 : 8)),
        }
      }),
      { t: 0.92, target: overview.target.clone(), pos: new Vector3(-5.6, 1.8, desktop ? 13.5 : 17) },
      { t: 1.0, target: overview.target.clone(), pos: new Vector3(-5.6, 1.8, desktop ? 13.5 : 17) },
    ]
    const camPos = new Vector3(), camTgt = new Vector3()
    function sample(p, outPos, outTgt) {
      let i = 0
      while (i < K.length - 2 && p > K[i + 1].t) i++
      const a = K[i], b = K[i + 1]
      const u = ss((p - a.t) / (b.t - a.t || 1))
      outPos.lerpVectors(a.pos, b.pos, u)
      outTgt.lerpVectors(a.target, b.target, u)
    }
    sample(0, camPos, camTgt)
    camera.position.copy(camPos)
    const lookAt = camTgt.clone()

    /* Pointer */
    const mouse = new Vector2(9, 9)
    const par = { x: 0, y: 0, tx: 0, ty: 0 }
    const ray = new Raycaster()
    function onMove(e) {
      const r = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1
      par.tx = mouse.x; par.ty = mouse.y
    }
    function onLeave() { mouse.set(9, 9); par.tx = 0; par.ty = 0 }
    function pick() {
      ray.setFromCamera(mouse, camera)
      const hit = ray.intersectObjects(stars, false)[0]
      return hit ? hit.object.userData.paper : null
    }
    function onClick() {
      const p = pick()
      if (p) onSelect(p)
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)

    /* Resize */
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    /* Only render while visible */
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const v = new Vector3()
    const c = new Vector3()
    const centers = CENTERS
    const clock = new Clock()
    let raf, lastHover = null, intro = 0
    function frame() {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime
      intro = Math.min(1, intro + dt * 0.6)

      sample(progressRef.current, camPos, camTgt)
      par.x += (par.tx - par.x) * 0.05
      par.y += (par.ty - par.y) * 0.05
      const drift = reduce ? 0 : 1
      camera.position.lerp(camPos.clone().add(new Vector3(par.x * 0.6 * drift + Math.sin(t * 0.15) * 0.25 * drift, par.y * 0.4 * drift, 0)), 0.08)
      lookAt.lerp(camTgt, 0.08)
      camera.lookAt(lookAt)

      if (!reduce) {
        dust.rotation.y = t * 0.012
        rings.forEach((r, i) => { r.rotation.z = t * (0.05 + i * 0.02) })
        if (linkLine) lineMatLink.dashOffset = -t * 0.3
      }

      const hov = pick()
      if (hov !== lastHover) {
        lastHover = hov
        onHover(hov)
        canvas.style.cursor = hov ? 'pointer' : ''
      }

      const w = canvas.clientWidth, h = canvas.clientHeight
      stars.forEach((s, i) => {
        const { base, phase, paper } = s.userData
        const tw = paper.statusKey === 'review' && !reduce ? 0.78 + 0.22 * Math.sin(t * 2.2 + phase) : 1
        const pop = ss(intro * 1.6 - i * 0.05)
        const hv = hov && hov.id === paper.id ? 1.35 : 1
        s.scale.setScalar(base * tw * hv * (0.2 + 0.8 * pop))
        s.material.opacity = pop

        /* HTML label that follows the star */
        const el = labelsRef.current[paper.id]
        if (el) {
          v.copy(s.position).project(camera)
          const behind = v.z > 1
          el.style.transform = `translate3d(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px, 0)`
          el.style.visibility = behind ? 'hidden' : 'visible'
          /* Put the label on the outer side of the star so neighbours do not collide */
          c.copy(centers[paper.category]).project(camera)
          const flip = el.firstChild
          if (flip) {
            const sx = (v.x * 0.5 + 0.5) * w
            const room = sx - flip.offsetWidth - 32 > (desktop ? w * 0.5 : 8)
            flip.style.transform = v.x < c.x && room ? 'translateX(calc(-100% - 2rem))' : ''
          }
        }
      })
      clusters.forEach(c => {
        const el = clusterLabelsRef.current[c.id]
        if (!el) return
        v.copy(CENTERS[c.id]).add(new Vector3(0, 2.0, 0)).project(camera)
        el.style.transform = `translate3d(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px, 0) translate(-50%, -100%)`
      })

      renderer.render(scene, camera)
    }
    frame()

    const dispose = () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
      scene.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.() })
      glow.dispose(); dot.dispose()
      renderer.dispose()
    }
    return { paint, dispose }
}
