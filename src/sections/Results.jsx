import { useEffect, useRef } from 'react'
import Img from '../components/Img'
import { SectionMark, Lines } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { gsap } from '../lib/motion'
import { useContent } from '../i18n'

/**
 * Scroll horizontal fijado. `matchMedia` de ScrollTrigger apaga el pin por
 * debajo de 1024px: en móvil, obligar a un dedo a empujar el eje X con el
 * pulgar es hostil. Allí se convierte en un carrusel con snap nativo.
 */
export default function Results() {
  const c = useContent()
  const t = c.results
  // La galería muestra resultados. El caso de postoperatorio inmediato vive
  // solo en el comparador, donde su pie explica la fase en que fue tomado.
  const showcase = c.cases.filter((x) => x.showcase !== false)
  const root = useRef(null)
  const track = useRef(null)
  const head = useReveal()

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current
      const distance = el.scrollWidth - window.innerWidth

      const tween = gsap.to(el, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Cada lámina se levanta ligeramente al cruzar el centro de pantalla.
      gsap.utils.toArray('[data-card]').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="resultados" ref={root} className="relative overflow-hidden bg-ivory py-24 lg:h-[100dvh] lg:py-0">
      <div className="flex h-full flex-col lg:justify-center">
        <div ref={head} className="mx-auto w-full max-w-[1560px] shrink-0 px-6 md:px-10 lg:pt-24">
          <SectionMark index="II" label={t.label} />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(2.1rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.02em]">
              <Lines lines={t.titleLines} step={110} />
            </h2>
            <p className="rise max-w-[36ch] text-[13px] leading-relaxed text-stone" style={{ '--d': '300ms' }}>
              {t.desc}
            </p>
          </div>
        </div>

        {/* Carril: transform en desktop, scroll nativo con snap en móvil. */}
        <div className="mt-14 lg:mt-16 lg:flex-1 lg:overflow-hidden">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:gap-8 md:px-10 lg:snap-none lg:overflow-visible lg:px-10 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ willChange: 'transform' }}
          >
            {showcase.map((item, i) => (
              <article
                key={item.id}
                data-card
                data-cursor="view"
                data-cursor-label={t.caseCursor}
                className="group w-[76vw] shrink-0 snap-center sm:w-[54vw] md:w-[40vw] lg:w-[26vw] lg:will-change-transform"
              >
                <div className="relative overflow-hidden bg-sand" style={{ aspectRatio: '4 / 5' }}>
                  <Img
                    src={item.after}
                    alt={`${item.title}. ${item.note}`}
                    sizes="(max-width: 640px) 76vw, (max-width: 1024px) 40vw, 26vw"
                    className="h-full w-full scale-[1.04] object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-100"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-ink/[0.04]" />
                  <span className="num absolute left-4 top-4 text-[10px] tracking-[0.2em] text-ivory mix-blend-difference">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display text-[19px] font-light leading-tight text-ink">{item.title}</h3>
                  <p className="eyebrow mt-2.5">{item.meta}</p>
                  <p className="mt-4 max-w-[34ch] text-[12.5px] leading-relaxed text-stone">{item.note}</p>
                </div>
              </article>
            ))}

            {/* Cierre del carril: llamada al comparador. */}
            <div className="flex w-[70vw] shrink-0 snap-center items-center lg:w-[24vw]">
              <a
                href="#comparador"
                data-cursor="link"
                className="group block"
                onClick={(e) => { e.preventDefault(); document.getElementById('comparador')?.scrollIntoView() }}
              >
                <p className="eyebrow mb-5">{t.continue}</p>
                <p className="font-display text-[clamp(1.7rem,2.4vw,2.4rem)] font-light leading-[1.1] text-ink">
                  {t.continueTitle.map((line, i) => (
                    <span key={i}>{line}{i < t.continueTitle.length - 1 && <br />}</span>
                  ))}
                </p>
                <span className="mt-7 flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-ink/15 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-ink group-hover:text-ivory">
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
