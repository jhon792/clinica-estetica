import { useEffect, useRef } from 'react'
import { SectionMark, Lines } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { PROCESS } from '../config'

export default function Process() {
  const root = useRef(null)
  const line = useRef(null)
  const head = useReveal()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // La línea se dibuja exactamente al ritmo del recorrido. No es un adorno:
      // es la barra de progreso del propio proceso quirúrgico.
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top 62%',
            end: 'bottom 78%',
            scrub: 0.6,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={root} className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16">

          {/* Columna fija: el enunciado permanece mientras los pasos desfilan. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div ref={head}>
                <SectionMark index="VI" label="Proceso" />
                <h2 className="mt-10 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-light leading-[1.04] tracking-[-0.02em] text-ink">
                  <Lines lines={['Cinco meses', 'antes de la', 'primera incisión.']} step={110} />
                </h2>
                <p className="rise mt-8 max-w-[38ch] text-[14px] leading-[1.9] font-light text-slate-ink" style={{ '--d': '400ms' }}>
                  La cirugía dura horas. El proceso que la rodea dura un año.
                  Ninguna de sus fases se acelera por conveniencia de agenda.
                </p>
              </div>
            </div>
          </div>

          {/* Pasos */}
          <div data-steps className="relative lg:col-span-7 lg:col-start-6">
            <div className="absolute bottom-0 left-0 top-2 w-px bg-ink/10" aria-hidden="true">
              <div ref={line} className="h-full w-px origin-top bg-ink/70" style={{ transform: 'scaleY(0)' }} />
            </div>

            <ol>
              {PROCESS.map((step, i) => (
                <Step key={step.n} step={step} last={i === PROCESS.length - 1} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ step, last }) {
  const ref = useReveal({ threshold: 0.35 })
  return (
    <li ref={ref} className={`relative pl-10 md:pl-16 ${last ? 'pb-0' : 'pb-16 md:pb-24'}`}>
      <span
        className="rise absolute -left-[3.5px] top-2 h-2 w-2 rounded-full bg-ink"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <h3 className="rise font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-light leading-tight tracking-[-0.015em] text-ink">
          <span className="num mr-4 align-middle text-[10px] tracking-[0.2em] text-brass">{step.n}</span>
          {step.title}
        </h3>
        <span className="rise eyebrow shrink-0" style={{ '--d': '120ms' }}>{step.time}</span>
      </div>
      <p className="rise mt-5 max-w-[54ch] text-[14.5px] leading-[1.9] font-light text-slate-ink" style={{ '--d': '200ms' }}>
        {step.body}
      </p>
    </li>
  )
}
