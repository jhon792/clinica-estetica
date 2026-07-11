import { SectionMark } from '../components/Type'
import AutoCarousel from '../components/AutoCarousel'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'

/**
 * Testimonios en carrusel de avance automático (derecha → izquierda). Cada
 * testimonio es una tarjeta a tamaño de cita; el desfile continuo comunica
 * "muchas voces" sin la frialdad de un muro de reseñas con estrellas.
 */
export default function Testimonials() {
  const tr = useContent().testimonials
  const root = useReveal({ threshold: 0.15 })

  return (
    <section id="testimonios" ref={root} className="relative overflow-hidden bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <SectionMark index="VII" label={tr.label} />
        </div>

        <AutoCarousel
          items={tr.items}
          ariaLabel={tr.label}
          interval={5000}
          gapClassName="gap-5 md:gap-8"
          cardClassName="w-[85%] shrink-0 md:w-[58%] lg:w-[40%]"
          renderItem={(t) => (
            <figure className="flex h-full flex-col justify-between border-t border-ink/12 pt-2 pr-2">
              <blockquote className="pt-8">
                <span className="mb-6 block font-display text-[2.6rem] leading-none text-champagne/50" aria-hidden="true">”</span>
                <p className="max-w-[34ch] font-display text-[clamp(1.25rem,2.1vw,1.9rem)] font-light leading-[1.3] tracking-[-0.01em] text-ink">
                  {t.quote}
                </p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="h-px w-8 bg-ink/25" />
                <span className="text-[12px] tracking-[0.12em] text-ink">{t.author}</span>
                <span className="eyebrow">{t.meta}</span>
              </figcaption>
            </figure>
          )}
        />

        <p className="mt-14 max-w-[62ch] text-[11.5px] leading-relaxed text-stone">
          {tr.disclaimer}
        </p>
      </div>
    </section>
  )
}
