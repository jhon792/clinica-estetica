import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { PHILOSOPHY } from '../config'
import { SectionMark } from '../components/Type'
import { useReveal } from '../hooks/useReveal'

/**
 * La sección se fija y el párrafo se enciende palabra por palabra al ritmo
 * del scroll. El lector no puede adelantarse al texto: lee a la velocidad a
 * la que decide avanzar. Es la única animación de la web atada al scrub.
 */
export default function Philosophy() {
  const root = useRef(null)
  const mark = useReveal()
  const words = PHILOSOPHY.split(' ')

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to('[data-word]', {
        color: 'var(--color-ink)',
        stagger: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=140%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="filosofia"
      ref={root}
      className="relative flex min-h-[100dvh] items-center bg-ivory py-28 md:py-36"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        <div ref={mark} className="mb-16 md:mb-24">
          <SectionMark index="I" label="Filosofía" />
        </div>

        <p className="max-w-[26ch] font-display text-[clamp(1.6rem,4.1vw,3.35rem)] font-light leading-[1.28] tracking-[-0.015em] md:max-w-[30ch]">
          {/* El estado "sin leer" no puede ser ilegible: arranca en un gris
              ceniza que ya cumple contraste (3.4:1 para texto grande) y viaja
              hasta la tinta. La palabra encendida sigue destacando; la apagada
              se puede leer igualmente. */}
          {words.map((w, i) => (
            <span key={i} data-word className="text-ash transition-none">
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink/8 pt-8 md:mt-24 md:flex-row md:items-baseline md:justify-between">
          <p className="eyebrow">Marbre · Instituto de Cirugía Plástica</p>
          <p className="max-w-[42ch] text-[13px] leading-relaxed text-stone">
            Miembro de la Sociedad Colombiana de Cirugía Plástica, Estética y
            Reconstructiva. Registro habilitado ante la Secretaría de Salud.
          </p>
        </div>
      </div>
    </section>
  )
}
