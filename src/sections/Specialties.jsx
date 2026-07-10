import { useEffect, useRef, useState } from 'react'
import Img from '../components/Img'
import { SectionMark } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { SPECIALTIES, waLink, WA_MSG_SERVICE } from '../config'

/**
 * Un índice, no una parrilla de tarjetas. La imagen no está en el documento:
 * flota junto al cursor y solo existe mientras la fila está viva. En táctil,
 * donde no hay cursor, cada fila abre su propia lámina al pulsarla.
 */
export default function Specialties() {
  const root = useReveal({ threshold: 0.05 })
  const list = useRef(null)
  const float = useRef(null)
  const [active, setActive] = useState(null)
  const [openRow, setOpenRow] = useState(null)

  useEffect(() => {
    const el = list.current
    const fl = float.current
    if (!el || !fl) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const p = { x: 0, y: 0 }
    const c = { x: 0, y: 0 }
    let raf

    const move = (e) => {
      const r = el.getBoundingClientRect()
      p.x = e.clientX - r.left
      p.y = e.clientY - r.top
    }
    const tick = () => {
      c.x += (p.x - c.x) * 0.09
      c.y += (p.y - c.y) * 0.09
      // La rotación nace de la velocidad lateral: la lámina "cae" hacia el lado
      // al que la arrastras. Es física, no decoración.
      const tilt = Math.max(-9, Math.min(9, (p.x - c.x) * 0.16))
      fl.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`
      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('pointermove', move)
    raf = requestAnimationFrame(tick)
    return () => { el.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="especialidades" ref={root} className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <SectionMark index="V" label="Especialidades" />
        </div>

        <div ref={list} className="relative">
          {/* Lámina flotante — solo en punteros finos. */}
          <div
            ref={float}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[19vw] max-w-[280px] overflow-hidden transition-opacity duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] [@media(pointer:fine)]:block"
            style={{ opacity: active === null ? 0 : 1, aspectRatio: '3 / 4' }}
          >
            {SPECIALTIES.map((sp, i) => (
              <div
                key={sp.n}
                className="absolute inset-0 transition-opacity duration-[500ms]"
                style={{ opacity: active === i ? 1 : 0 }}
              >
                <Img src={sp.img} alt="" sizes="19vw" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <ul onPointerLeave={() => setActive(null)}>
            {SPECIALTIES.map((sp, i) => (
              <li key={sp.n} className="border-t border-ink/10 last:border-b">
                <div
                  onPointerEnter={() => setActive(i)}
                  className="rise group relative"
                  style={{ '--d': `${i * 70}ms` }}
                >
                  <button
                    onClick={() => setOpenRow(openRow === i ? null : i)}
                    aria-expanded={openRow === i}
                    data-cursor="link"
                    className="flex w-full items-center gap-6 py-7 text-left md:gap-10 md:py-9"
                  >
                    <span className="num w-8 shrink-0 text-[10px] tracking-[0.2em] text-brass">{sp.n}</span>

                    <span className="flex-1">
                      <span className="block font-display text-[clamp(1.5rem,3.4vw,2.9rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] md:group-hover:translate-x-5">
                        {sp.name}
                      </span>
                    </span>

                    <span className="eyebrow hidden shrink-0 md:block">{sp.tag}</span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/12 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-ink group-hover:text-ivory">
                      <svg
                        width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        style={{ transform: openRow === i ? 'rotate(45deg)' : 'none' }}
                      >
                        <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  {/* grid-template-rows 0fr→1fr: se anima a altura desconocida
                      sin medir el DOM ni animar `height`. */}
                  <div
                    className="grid transition-[grid-template-rows] duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ gridTemplateRows: openRow === i ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:pb-12">
                        <p className="text-[14.5px] leading-[1.9] font-light text-slate-ink md:col-span-6 md:col-start-2">
                          {sp.body}
                        </p>
                        <div className="md:col-span-3 md:col-start-9">
                          <a
                            href={waLink(WA_MSG_SERVICE(sp.name))}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="link"
                            className="group/cta relative inline-block text-[10px] tracking-[0.22em] uppercase text-ink"
                          >
                            Consultar este procedimiento
                            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-ink/30 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:origin-right group-hover/cta:scale-x-0" />
                          </a>
                        </div>
                        {/* En táctil la foto vive dentro de la fila desplegada. */}
                        <div className="md:hidden">
                          <div className="overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                            <Img src={sp.img} alt={sp.name} sizes="100vw" className="h-full w-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
