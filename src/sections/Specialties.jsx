import { useState } from 'react'
import Img from '../components/Img'
import AutoCarousel from '../components/AutoCarousel'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'
import { waLink } from '../config'

/**
 * Procedimientos. Cabecera centrada, dos pestañas por región (Faciales /
 * Corporales) y un carrusel de tarjetas-imagen que avanza solo de derecha a
 * izquierda. Cada tarjeta enlaza a WhatsApp con el mensaje del procedimiento.
 */
export default function Specialties() {
  const content = useContent()
  const t = content.specialties
  const root = useReveal({ threshold: 0.06 })
  const [cat, setCat] = useState('facial')

  const items = t.items.filter((s) => s.cat === cat)
  const TABS = [
    { key: 'facial', label: t.tabs.facial },
    { key: 'corporal', label: t.tabs.corporal },
  ]

  return (
    <section id="especialidades" ref={root} data-cursor-bg="light" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        {/* Cabecera centrada */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <p className="rise eyebrow mb-5">{t.label}</p>
          <h2 className="rise font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink" style={{ '--d': '80ms' }}>
            {t.title}
          </h2>

          {/* Pestañas */}
          <div className="rise mt-9 inline-flex items-center gap-2 rounded-full bg-paper p-1.5 ring-1 ring-ink/8" style={{ '--d': '200ms' }} role="tablist">
            {TABS.map((tab) => {
              const on = cat === tab.key
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setCat(tab.key)}
                  data-cursor="link"
                  data-cursor-bg={on ? 'dark' : undefined}
                  className={`rounded-full px-6 py-2.5 text-[11px] tracking-[0.14em] uppercase transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    on ? 'bg-ink text-ivory' : 'text-slate-ink hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Carrusel */}
        <div className="rise" style={{ '--d': '320ms' }}>
          <AutoCarousel
            key={cat}
            items={items}
            ariaLabel={t.title}
            prevLabel={content.carousel.prev}
            nextLabel={content.carousel.next}
            gapClassName="gap-4 md:gap-6"
            cardClassName="w-[78%] shrink-0 sm:w-[46%] lg:w-[31.5%]"
            renderItem={(sp) => (
              <a
                href={waLink(content.wa.service(sp.name))}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-cursor-label={t.tabs[sp.cat]}
                className="group relative block overflow-hidden bg-sand"
                style={{ aspectRatio: '3 / 4' }}
              >
                <Img
                  src={sp.img}
                  alt={sp.name}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                  className="h-full w-full scale-[1.05] object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-100"
                />
                {/* Velo inferior para el rótulo. */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <span className="mb-2 block text-[9px] tracking-[0.3em] uppercase text-ivory/70">{sp.tag}</span>
                  <span className="block max-w-[16ch] font-display text-[clamp(1.35rem,2vw,1.9rem)] font-light leading-[1.1] text-ivory">
                    {sp.name}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ivory/80 transition-colors duration-500 group-hover:text-ivory">
                    {t.cta}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </a>
            )}
          />
        </div>
      </div>
    </section>
  )
}
