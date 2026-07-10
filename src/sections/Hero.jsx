import { useEffect, useRef } from 'react'
import Img from '../components/Img'
import { Lines } from '../components/Type'
import { gsap, prefersReducedMotion, scrollTo } from '../lib/motion'
import { SURGEON_TITLE } from '../config'

export default function Hero() {
  const root = useRef(null)
  const plate = useRef(null)
  const photo = useRef(null)
  const mphoto = useRef(null)

  useEffect(() => {
    // El hero no espera al observador: se revela en cuanto pinta.
    const t = setTimeout(() => root.current?.classList.add('is-in'), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // Dos capas a velocidades distintas. La plancha sube; la foto, dentro de
      // ella, baja. La disparidad es lo que produce la sensación de profundidad.
      gsap.to(plate.current, {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
      gsap.fromTo(
        photo.current,
        { yPercent: -6, scale: 1.14 },
        {
          yPercent: 6,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
        }
      )
      // Respiración de apertura: 2,6 s. Nadie la nota; todos la sienten.
      gsap.from(photo.current, { scale: 1.2, duration: 2.6, ease: 'expo.out' })

      // Fondo móvil: misma respiración de apertura + parallax al hacer scroll.
      if (mphoto.current) {
        gsap.from(mphoto.current, { scale: 1.16, duration: 2.6, ease: 'expo.out' })
        gsap.to(mphoto.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="inicio"
      data-cursor-bg="light"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-ivory pt-28 md:pt-32"
    >
      {/* ── Fondo inmersivo — solo móvil/tablet ──
          En pantallas estrechas el retrato vive DETRÁS del texto. Un velo de
          marfil, denso arriba y transparente abajo, mantiene el titular
          perfectamente legible y deja que el rostro emerja al pie. El plano
          de escritorio (a la derecha) se oculta aquí. */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <div ref={mphoto} className="absolute inset-0 will-change-transform">
          <Img
            src="hero"
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 22%' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--color-ivory) 0%, var(--color-ivory) 30%, color-mix(in srgb, var(--color-ivory) 86%, transparent) 48%, color-mix(in srgb, var(--color-ivory) 42%, transparent) 74%, color-mix(in srgb, var(--color-ivory) 30%, transparent) 88%, color-mix(in srgb, var(--color-ivory) 55%, transparent) 100%)',
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1560px] grid-cols-1 items-start gap-y-14 px-6 md:px-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-x-16 xl:gap-x-24">

        {/* ── Columna tipográfica ── */}
        <div className="relative z-10 lg:pb-16">
          <div className="mb-8 flex items-center gap-4 md:mb-10">
            <span
              className="rule h-px w-10 bg-champagne md:w-16"
              style={{ '--d': '120ms' }}
            />
            <span className="rise eyebrow" style={{ '--d': '280ms' }}>
              Bogotá · Desde 2007
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.9rem,8.6vw,7.4rem)] font-light leading-[0.94] tracking-[-0.025em] text-ink">
            <Lines lines={['La cirugía', 'que nadie']} step={110} start={200} />
            <span className="mask-line">
              <span style={{ '--d': '420ms' }} className="block">
                <em className="not-italic text-stone">advierte.</em>
              </span>
            </span>
          </h1>

          <div className="mt-9 max-w-[440px] md:mt-12">
            <p className="rise text-[15px] leading-[1.85] font-light text-slate-ink" style={{ '--d': '520ms' }}>
              Un solo procedimiento al día. Una sola cirujana. Diecisiete años
              perfeccionando el arte más difícil de la medicina estética:
              que el resultado no se vea.
            </p>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-14">
            <button
              onClick={() => scrollTo('#reserva')}
              data-cursor="link"
              data-cursor-bg="dark"
              className="rise group flex items-center gap-4 rounded-full bg-ink py-2.5 pl-8 pr-2.5 text-ivory transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
              style={{ '--d': '880ms' }}
            >
              <span className="text-[10px] tracking-[0.22em] uppercase">Solicitar valoración</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-ivory/20">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => scrollTo('#comparador')}
              data-cursor="link"
              className="rise group relative text-[10px] tracking-[0.22em] uppercase text-slate-ink transition-colors duration-500 hover:text-ink"
              style={{ '--d': '980ms' }}
            >
              Ver resultados reales
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-ink/25 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:origin-right group-hover:scale-x-0" />
            </button>
          </div>

        </div>

        {/* ── Plancha fotográfica — solo escritorio ── */}
        <div ref={plate} className="relative hidden lg:block">
          <figure className="relative ml-auto w-full max-w-[560px]">
            {/* Sin `rise`, a propósito. Esta plancha es el elemento LCP: un
                fade de opacidad retrasaría la métrica hasta que terminase la
                transición. Su entrada la da el escalado de GSAP más abajo —
                `transform` no bloquea la pintura. */}
            <div
              className="relative overflow-hidden bg-sand"
              style={{ aspectRatio: '3 / 4' }}
            >
              <div ref={photo} className="absolute inset-0 will-change-transform">
                <Img
                  src="hero"
                  alt="Consulta de valoración en Marbre, instituto de cirugía plástica en Bogotá"
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {/* Velo cálido de una sola parada: unifica la piel con el marfil. */}
              <div className="pointer-events-none absolute inset-0 bg-ink/[0.06]" />
            </div>

            <figcaption className="rise mt-5 flex items-baseline justify-between gap-6" style={{ '--d': '900ms' }}>
              <p className="eyebrow">{SURGEON_TITLE}</p>
              <p className="num text-[10px] tracking-[0.2em] text-stone">01 / 06</p>
            </figcaption>
          </figure>

          {/* Rótulo vertical al canto: firma de revista, no de plantilla. */}
          <div className="rise absolute -left-4 top-0 hidden xl:block" style={{ '--d': '1200ms' }}>
            <p
              className="eyebrow whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Fotografía sin retoque · Paciente real
            </p>
          </div>
        </div>
      </div>

      {/* Indicador de scroll: una línea que cae y se repone. */}
      <div className="rise absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block" style={{ '--d': '1400ms' }}>
        <div className="h-14 w-px overflow-hidden bg-ink/10">
          <div className="h-1/2 w-px bg-ink/60" style={{ animation: 'drop 2.6s cubic-bezier(0.7,0,0.2,1) infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes drop {
          0% { transform: translateY(-100%) }
          55%, 100% { transform: translateY(200%) }
        }
      `}</style>
    </section>
  )
}
