import { useState } from 'react'
import { SectionMark, Lines } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'

/**
 * No es un acordeón. En escritorio, las preguntas son un índice y la respuesta
 * ocupa un panel fijo a la derecha: leer la siguiente no obliga a recolocar la
 * página. El acordeón queda para móvil, donde sí es la forma correcta.
 *
 * (Y así no repetimos la animación de despliegue que ya usa Especialidades.)
 */
export default function FAQ() {
  const t = useContent().faq
  const FAQS = t.items
  const root = useReveal({ threshold: 0.08 })
  const [i, setI] = useState(0)

  return (
    <section id="preguntas" ref={root} className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <SectionMark index="XI" label={t.label} />
          <h2 className="mt-10 max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] font-light leading-[1.04] tracking-[-0.02em]">
            <Lines lines={t.titleLines} step={110} />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-12">
          {/* Índice de preguntas */}
          <ul className="lg:col-span-6">
            {FAQS.map((f, idx) => (
              <li key={f.q} className="border-t border-ink/10 last:border-b lg:last:border-b-0">
                <h3>
                  <button
                    onClick={() => setI(idx)}
                    aria-expanded={i === idx}
                    aria-controls={`faq-panel-${idx}`}
                    data-cursor="link"
                    className="group flex w-full items-start gap-5 py-6 text-left md:gap-8 md:py-7"
                  >
                    <span className={`num mt-1.5 shrink-0 text-[10px] tracking-[0.2em] transition-colors duration-500 ${i === idx ? 'text-brass' : 'text-stone'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex-1 text-[clamp(1rem,1.55vw,1.25rem)] font-light leading-snug transition-colors duration-500 ${i === idx ? 'text-ink' : 'text-slate-ink group-hover:text-ink'}`}>
                      {f.q}
                    </span>
                    <span
                      className="mt-1.5 hidden h-px w-8 shrink-0 origin-left bg-ink transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:block"
                      style={{ transform: `scaleX(${i === idx ? 1 : 0})` }}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {/* Móvil: la respuesta cae bajo su pregunta. */}
                <div
                  id={`faq-panel-${idx}`}
                  role="region"
                  className="overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden"
                  style={{ maxHeight: i === idx ? '420px' : '0px', opacity: i === idx ? 1 : 0 }}
                >
                  <p className="pb-8 pl-[calc(0.625rem+1.25rem)] text-[14px] leading-[1.9] font-light text-slate-ink">
                    {f.a}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Escritorio: panel fijo. La respuesta se cambia, no se despliega. */}
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-32">
              <div className="relative min-h-[280px]">
                {FAQS.map((f, idx) => (
                  <div
                    key={f.q}
                    aria-hidden={i !== idx}
                    className="absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: i === idx ? 1 : 0,
                      transform: i === idx ? 'none' : 'translateY(14px)',
                      pointerEvents: i === idx ? 'auto' : 'none',
                    }}
                  >
                    <p className="text-[15px] leading-[1.95] font-light text-slate-ink">{f.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t border-ink/10 pt-8">
                <p className="eyebrow mb-4">{t.noQuestion}</p>
                <a
                  href="#reserva"
                  onClick={(e) => { e.preventDefault(); document.getElementById('reserva')?.scrollIntoView() }}
                  data-cursor="link"
                  className="group relative inline-block text-[10px] tracking-[0.22em] uppercase text-ink"
                >
                  {t.writeUs}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-ink/30 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:origin-right group-hover:scale-x-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
