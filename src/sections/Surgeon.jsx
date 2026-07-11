import { useEffect, useRef, useState } from 'react'
import Img from '../components/Img'
import { Lines, Rise, SectionMark } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useContent } from '../i18n'
import { SURGEON } from '../config'

export default function Surgeon() {
  const c = useContent()
  const t = c.surgeon
  const root = useReveal({ threshold: 0.12 })
  const wrap = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        }
      )
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cirujana" ref={wrap} className="relative bg-paper py-28 md:py-40">
      <div ref={root} className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-16 md:mb-24">
          <SectionMark index="II" label={t.label} />
        </div>

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          {/* Retrato: sube por encima de la línea de la columna vecina. */}
          <figure className="relative lg:col-span-5 lg:-mt-6">
            <div className="relative overflow-hidden bg-sand" style={{ aspectRatio: '3 / 4' }}>
              <div ref={img} className="absolute inset-0 scale-[1.12] will-change-transform">
                <Img
                  src="cirujana"
                  alt={`${SURGEON}, cirujana plástica certificada en Bogotá`}
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <figcaption className="rise mt-5 flex items-baseline justify-between" style={{ '--d': '200ms' }}>
              <p className="eyebrow">{t.place}</p>
              <p className="num text-[10px] tracking-[0.2em] text-stone">{t.portrait}</p>
            </figcaption>
          </figure>

          {/* Texto: arranca más abajo, generando la escalera vertical. */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <h2 className="font-display text-[clamp(2.1rem,5.2vw,4.1rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
              <Lines lines={t.nameLines} step={110} />
            </h2>

            <Rise delay={340} className="mt-8 md:mt-10">
              <p className="max-w-[52ch] text-[15px] leading-[1.9] font-light text-slate-ink">
                {t.bio1}
              </p>
            </Rise>

            <Rise delay={460} className="mt-6">
              <p className="max-w-[52ch] text-[15px] leading-[1.9] font-light text-slate-ink">
                {t.bio2}
              </p>
            </Rise>

            {/* Firma manuscrita en trazo, no en fuente cursiva de sistema. */}
            <Rise delay={620} className="mt-12">
              <Signature />
            </Rise>

            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/8 pt-10 sm:grid-cols-4">
              {t.figures.map((f, i) => (
                <Figure key={f.label} {...f} delay={700 + i * 90} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// La cifra solo cuenta si es puramente numérica. "0,4%" se muestra tal cual:
// interpolar un porcentaje de revisión quirúrgica sería una cursilería.
const isCountable = (v) => /^[\d.]+$/.test(v)

function Figure({ value, label, delay }) {
  const ref = useReveal({ threshold: 0.6 })
  // El estado nace ya resuelto: en "0" solo si de verdad va a contar. Así no
  // hay un fotograma con un cero impostor, ni un setState dentro del efecto
  // que dispare un render en cascada.
  const willCount = isCountable(value) && !prefersReducedMotion()
  const [shown, setShown] = useState(() => (willCount ? '0' : value))

  useEffect(() => {
    const el = ref.current
    if (!el || !willCount) return

    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const target = parseFloat(value.replace('.', ''))
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 1.9,
        ease: 'expo.out',
        onUpdate: () => setShown(Math.round(obj.v).toLocaleString('es-CO')),
      })
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, ref, willCount])

  return (
    <div ref={ref} className="rise" style={{ '--d': `${delay}ms` }}>
      <p className="num font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-none tracking-[-0.02em] text-ink">
        {shown}
      </p>
      <p className="eyebrow mt-3 leading-relaxed">{label}</p>
    </div>
  )
}

function Signature() {
  return (
    <svg viewBox="0 0 260 64" className="h-12 w-auto text-ink/70" fill="none" aria-label="Firma de la Dra. Valentina Restrepo" role="img">
      <path
        d="M6 44c8-22 14-30 18-30 3 0 3 6 1 14-2 9-5 16-3 16 3 0 8-9 12-18 3-7 5-10 7-10 2 0 2 3 1 8-1 6-2 10 0 10 2 0 5-4 8-9M60 34c4 0 8-3 8-6 0-2-1-3-3-3-4 0-8 6-8 12 0 5 3 8 7 8 4 0 8-3 11-7M84 44c3-14 6-22 9-22 2 0 2 3 1 7-2 7-4 12-2 12 3 0 7-8 10-15M112 22c-4 12-6 20-4 20 3 0 8-8 11-16M126 8c-3 18-5 30-3 34 1 3 4 2 7-2M140 28c-5 0-9 5-9 11 0 4 2 7 6 7 5 0 9-6 10-13 0-3-1-5-3-5M156 44c2-12 5-20 8-20 2 0 2 3 0 9-2 7-3 11-1 11 3 0 7-8 10-16M186 24c-2-2-5-2-7 0-3 2-3 6 1 8 5 2 7 5 5 8-2 4-8 4-11 0M204 44c3-16 7-26 11-26 3 0 3 4 0 9-3 4-7 6-11 6h14"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
