import { useCallback, useEffect, useRef, useState } from 'react'
import Img from '../components/Img'
import { DIMS } from '../lib/images'
import { SectionMark } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { gsap } from '../lib/motion'
import { useContent } from '../i18n'

/**
 * Comparador antes/después.
 *
 * Tres decisiones que lo separan de un slider de plantilla:
 *
 * 1. La posición del divisor no vive en el estado de React. Un `setState` por
 *    cada `pointermove` reconciliaría el árbol 120 veces por segundo. Aquí el
 *    puntero solo escribe un número en un ref; un bucle rAF lo persigue con
 *    lerp y escribe una variable CSS. El arrastre nunca se despega del dedo.
 *
 * 2. El marco adopta la proporción del caso activo en vez de imponer una caja
 *    fija. Si forzáramos a todos los casos a un mismo rectángulo, unos se
 *    recortarían y otros flotarían en negro — y un antes/después recortado
 *    deja de ser una comparación clínica.
 *
 * 3. Es un `role="slider"` real: flechas, Inicio y Fin funcionan. Un
 *    comparador que solo obedece al ratón no es accesible.
 */
export default function Comparator() {
  const content = useContent()
  const tr = content.comparator
  const CASES = content.cases
  const root = useRef(null)
  const stage = useRef(null)
  const frame = useRef(null)
  const head = useReveal()

  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [full, setFull] = useState(false)
  const [pos, setPos] = useState(50) // solo para aria-valuenow y el rótulo

  const target = useRef(50)
  const current = useRef(50)
  const dragging = useRef(false)

  // ── Bucle de interpolación ───────────────────────────────
  useEffect(() => {
    let raf
    const loop = () => {
      const diff = target.current - current.current
      // Con el dedo puesto la respuesta es casi inmediata; al soltar, el
      // divisor se posa. Dos inercias para el mismo control.
      current.current += diff * (dragging.current ? 0.35 : 0.12)
      if (Math.abs(diff) < 0.05) current.current = target.current
      stage.current?.style.setProperty('--pos', `${current.current}%`)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const setFromClientX = useCallback((clientX) => {
    const r = stage.current?.getBoundingClientRect()
    if (!r) return
    const p = ((clientX - r.left) / r.width) * 100
    const clamped = Math.max(0, Math.min(100, p))
    target.current = clamped
    setPos(Math.round(clamped))
  }, [])

  // ── Arrastre ─────────────────────────────────────────────
  useEffect(() => {
    const el = stage.current
    if (!el) return

    const down = (e) => {
      dragging.current = true
      el.setPointerCapture?.(e.pointerId)
      setFromClientX(e.clientX)
    }
    const move = (e) => {
      if (!dragging.current) return
      setFromClientX(e.clientX)
    }
    const up = (e) => {
      dragging.current = false
      el.releasePointerCapture?.(e.pointerId)
    }

    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [setFromClientX])

  // ── Zoom con origen en el cursor ─────────────────────────
  useEffect(() => {
    const el = stage.current
    if (!el || !zoom) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--ox', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--oy', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [zoom])

  // ── Pantalla completa ────────────────────────────────────
  const toggleFull = async () => {
    if (!document.fullscreenElement) {
      await frame.current?.requestFullscreen?.().catch(() => {})
    } else {
      await document.exitFullscreen?.().catch(() => {})
    }
  }
  useEffect(() => {
    const onFs = () => setFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // ── El scroll pasa de un caso al siguiente — SOLO escritorio ───
  // En móvil no se fija la sección: cambiar de caso es tocar la lista y el
  // divisor se arrastra con el dedo. Fijar una sección alta y ciclar casos con
  // el scroll táctil resultaba confuso y chocaba con el gesto de arrastre.
  const caseCount = CASES.length
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollDrivenIndex(root.current, caseCount, setIndex)
    })
    return () => mm.revert()
  }, [caseCount])

  // ── Teclado ──────────────────────────────────────────────
  const onKey = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { target.current = Math.max(0, target.current - step); setPos(Math.round(target.current)); e.preventDefault() }
    if (e.key === 'ArrowRight') { target.current = Math.min(100, target.current + step); setPos(Math.round(target.current)); e.preventDefault() }
    if (e.key === 'Home') { target.current = 0; setPos(0); e.preventDefault() }
    if (e.key === 'End') { target.current = 100; setPos(100); e.preventDefault() }
  }

  const c = CASES[index]

  return (
    <section id="comparador" ref={root} data-cursor-bg="dark" className="on-dark relative bg-ink py-24 lg:min-h-[100dvh] lg:py-0">
      <div className="flex min-h-full flex-col justify-center py-8 lg:py-24">
        <div ref={head} className="mx-auto w-full max-w-[1560px] px-6 md:px-10">
          <div>
            <SectionMark index="IV" label={tr.label} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            {/* Índice de casos: el scroll lo recorre, el clic lo salta. */}
            <div className="lg:col-span-3">
              <h2 className="rise font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light leading-[1.06] tracking-[-0.02em] text-ivory">
                {tr.titleTop}<br />
                <span className="text-mist">{tr.titleBottom}</span>
              </h2>

              <ul className="mt-10 space-y-1">
                {CASES.map((item, i) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setIndex(i)}
                      data-cursor="link"
                      aria-current={i === index}
                      className="group flex w-full items-baseline gap-4 py-2.5 text-left"
                    >
                      <span className={`num text-[10px] tracking-[0.2em] transition-colors duration-500 ${i === index ? 'text-champagne' : 'text-mist/80'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[13px] leading-snug transition-colors duration-500 ${i === index ? 'text-ivory' : 'text-mist/80 group-hover:text-ivory'}`}>
                        {item.title}
                      </span>
                    </button>
                    <div className="h-px w-full bg-ivory/8">
                      <div
                        className="h-px bg-champagne/70 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                        style={{ transform: `scaleX(${i === index ? 1 : 0})`, transformOrigin: 'left' }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Escenario */}
            <div className="lg:col-span-9">
              <div
                ref={frame}
                className={`relative mx-auto ${
                  full
                    ? 'flex h-screen w-screen items-center justify-center bg-ink'
                    : 'w-full max-w-[440px] md:w-fit md:max-w-full'
                }`}
              >
              <div
                ref={stage}
                role="slider"
                tabIndex={0}
                aria-label={tr.ariaSlider(c.title)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pos}
                aria-valuetext={tr.ariaValue(pos)}
                onKeyDown={onKey}
                data-cursor="view"
                data-cursor-label={tr.drag}
                // `touch-pan-y`: el arrastre horizontal mueve el divisor, pero
                // el gesto vertical sigue desplazando la página (en móvil, un
                // `touch-none` atrapaba el dedo y no dejaba salir de la sección).
                className={`group relative touch-pan-y select-none overflow-hidden bg-[#0a0908] ${
                  full ? 'h-[94vh] max-w-full' : 'w-full max-w-full md:h-[64vh] md:w-auto lg:h-[70vh]'
                }`}
                // El marco toma la proporción del caso activo en lugar de
                // imponerle una caja: así la foto lo llena y el divisor barre
                // el rostro, no el fondo negro.
                style={{
                  '--pos': '50%', '--ox': '50%', '--oy': '50%',
                  aspectRatio: `${DIMS[c.before][0]} / ${DIMS[c.before][1]}`,
                }}
              >
                {CASES.map((item, i) => (
                  <div
                    key={item.id}
                    className="absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
                    aria-hidden={i !== index}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                      style={{
                        transform: zoom ? 'scale(1.9)' : 'scale(1)',
                        transformOrigin: 'var(--ox) var(--oy)',
                      }}
                    >
                      {/* Antes: capa base, íntegra. */}
                      <Img
                        src={item.before}
                        alt={`${item.title} — ${tr.before}`}
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                      {/* Después: recortada por la izquierda hasta el divisor. */}
                      <div
                        className="absolute inset-0"
                        style={{ clipPath: 'inset(0 0 0 var(--pos))' }}
                      >
                        <Img
                          src={item.after}
                          alt={`${item.title} — ${tr.after}`}
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Divisor */}
                <div
                  className="pointer-events-none absolute inset-y-0 z-10 w-px bg-ivory/90"
                  style={{ left: 'var(--pos)' }}
                >
                  <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/95 shadow-[0_2px_30px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-90">
                    <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                      <path d="M5.5 2L1.5 6l4 4M10.5 2l4 4-4 4" stroke="#12100E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                {/* Rótulos: se desvanecen cuando el divisor se les echa encima. */}
                <span
                  className="pointer-events-none absolute left-5 top-5 z-10 text-[9px] tracking-[0.3em] uppercase text-ivory/70 transition-opacity duration-300"
                  style={{ opacity: pos < 16 ? 0 : 1 }}
                >
                  {tr.before}
                </span>
                <span
                  className="pointer-events-none absolute right-5 top-5 z-10 text-[9px] tracking-[0.3em] uppercase text-ivory/70 transition-opacity duration-300"
                  style={{ opacity: pos > 84 ? 0 : 1 }}
                >
                  {tr.after}
                </span>
              </div>

              {/* Los controles son hermanos del slider, nunca hijos: un
                  `role="slider"` con descendientes enfocables es una violación
                  de `nested-interactive`, y además rompe la navegación por
                  tabulador. Viven en el marco, que es lo que se va a pantalla
                  completa. */}
              <div className="absolute bottom-5 right-5 z-10 flex gap-2">
                <StageButton onClick={() => setZoom((z) => !z)} active={zoom} label={zoom ? tr.zoomOut : tr.zoomIn}>
                  {zoom ? <IconZoomOut /> : <IconZoomIn />}
                </StageButton>
                <StageButton onClick={toggleFull} active={full} label={full ? tr.exitFull : tr.full}>
                  {full ? <IconCollapse /> : <IconExpand />}
                </StageButton>
              </div>

              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-[19px] font-light text-ivory">{c.title}</h3>
                  <p className="eyebrow mt-2">{c.meta}</p>
                </div>
                <p className="max-w-[46ch] text-[12.5px] leading-relaxed text-mist/80">{c.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** El scroll a través de la sección fijada avanza el índice de caso. */
function ScrollDrivenIndex(trigger, count, setIndex) {
  gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: () => `+=${count * 62}%`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.min(count - 1, Math.floor(self.progress * count))
        setIndex((prev) => (prev === i ? prev : i))
      },
    },
  })
}

function StageButton({ children, onClick, active, label }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={label}
      aria-pressed={active}
      data-cursor="link"
      className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        active ? 'bg-ivory text-ink' : 'bg-ink/40 text-ivory/80 ring-1 ring-ivory/20 hover:bg-ink/60 hover:text-ivory'
      }`}
    >
      {children}
    </button>
  )
}

const s = { stroke: 'currentColor', strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round' }
const IconZoomIn = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" {...s} /><path d="M10.5 10.5L14 14M7 5v4M5 7h4" {...s} /></svg>)
const IconZoomOut = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5" {...s} /><path d="M10.5 10.5L14 14M5 7h4" {...s} /></svg>)
const IconExpand = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" {...s} /></svg>)
const IconCollapse = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 6h4V2M14 6h-4V2M2 10h4v4M14 10h-4v4" {...s} /></svg>)
