import { useState } from 'react'
import { SectionMark } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { TESTIMONIALS } from '../config'

/**
 * Un testimonio a la vez, a tamaño de titular. Un carrusel de tarjetas con
 * estrellas comunicaría "reseñas"; esto comunica "palabra". La diferencia es
 * todo el encargo.
 */
export default function Testimonials() {
  const root = useReveal({ threshold: 0.2 })
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d) => {
    setDir(d)
    setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonios" ref={root} className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        <SectionMark index="IX" label="Testimonios" />

        <div className="relative mt-16 min-h-[42vh] md:mt-24 md:min-h-[38vh]">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={t.author}
              aria-hidden={idx !== i}
              className="absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: idx === i ? 1 : 0,
                // El testimonio saliente se va hacia donde vino el entrante.
                transform: idx === i ? 'none' : `translateY(${dir > 0 ? 26 : -26}px)`,
                pointerEvents: idx === i ? 'auto' : 'none',
              }}
            >
              <blockquote>
                <span className="mb-8 block font-display text-[3rem] leading-none text-champagne/40 md:mb-10" aria-hidden="true">”</span>
                <p className="max-w-[24ch] font-display text-[clamp(1.5rem,3.4vw,2.7rem)] font-light leading-[1.28] tracking-[-0.015em] text-ink md:max-w-[28ch]">
                  {t.quote}
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-5">
                <span className="h-px w-10 bg-ink/25" />
                <span className="text-[12px] tracking-[0.12em] text-ink">{t.author}</span>
                <span className="eyebrow">{t.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-ink/8 pt-8">
          <p className="num text-[10px] tracking-[0.2em] text-stone">
            {String(i + 1).padStart(2, '0')}
            <span className="mx-2 text-ink/15">—</span>
            {String(TESTIMONIALS.length).padStart(2, '0')}
          </p>

          <div className="flex gap-2">
            <Ctrl onClick={() => go(-1)} label="Testimonio anterior"><path d="M9 2L4 6l5 4" /></Ctrl>
            <Ctrl onClick={() => go(1)} label="Testimonio siguiente"><path d="M4 2l5 4-5 4" /></Ctrl>
          </div>
        </div>

        <p className="mt-8 max-w-[62ch] text-[11.5px] leading-relaxed text-stone">
          Testimonios reproducidos con autorización expresa. Identidades
          abreviadas a petición de las pacientes. Ningún testimonio ha sido
          compensado económicamente.
        </p>
      </div>
    </section>
  )
}

function Ctrl({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor="link"
      className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-ink/12 transition-all duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink hover:text-ivory active:scale-[0.94]"
    >
      <svg width="13" height="13" viewBox="0 0 13 12" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  )
}
