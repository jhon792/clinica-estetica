import { SectionMark, Rise } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'

/**
 * Sección oscura. Rompe la respiración clara de la página justo antes de los
 * testimonios: el contraste hace que el marfil que viene después se sienta más
 * limpio de lo que es. Es un truco de montaje, no de diseño.
 */
export default function Technology() {
  const t = useContent().technology
  const root = useReveal({ threshold: 0.08 })

  return (
    <section id="tecnologia" ref={root} data-cursor-bg="dark" className="on-dark relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div>
          <SectionMark index="VI" label={t.label} />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-y-10 md:mt-20 lg:grid-cols-12">
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-ivory lg:col-span-5">
            <Rise as="span" className="block">{t.titleLines[0]}<br />{t.titleLines[1]}</Rise>
          </h2>
          <Rise delay={200} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[46ch] text-[14.5px] leading-[1.9] font-light text-mist">
              {t.intro}
            </p>
          </Rise>
        </div>

        {/* Tabla editorial: filas con filete, sin cajas ni sombras. */}
        <div className="mt-20 md:mt-28">
          {t.items.map((it, i) => (
            <Row key={it.name} {...it} n={i + 1} />
          ))}
          <div className="h-px w-full bg-ivory/10" />
        </div>
      </div>

      {/* Marquesina: un solo tramo duplicado. Nunca se detiene, nunca acelera. */}
      <div className="relative mt-24 flex overflow-hidden md:mt-32" aria-hidden="true">
        <Marquee text={t.marquee} />
        <Marquee text={t.marquee} />
      </div>
    </section>
  )
}

function Row({ name, desc, meta, n }) {
  const ref = useReveal({ threshold: 0.5 })
  return (
    <div ref={ref} className="group border-t border-ivory/10">
      <div className="rise grid grid-cols-12 items-baseline gap-4 py-7 transition-colors duration-700 md:py-9">
        <span className="num col-span-2 text-[10px] tracking-[0.2em] text-champagne md:col-span-1">
          {String(n).padStart(2, '0')}
        </span>
        <h3 className="col-span-10 font-display text-[clamp(1.2rem,2.2vw,1.85rem)] font-light leading-tight text-ivory transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] md:col-span-4 md:group-hover:translate-x-3">
          {name}
        </h3>
        <p className="col-span-12 text-[13.5px] leading-relaxed text-mist md:col-span-5 md:col-start-6">
          {desc}
        </p>
        <span className="eyebrow col-span-12 md:col-span-2 md:text-right">{meta}</span>
      </div>
    </div>
  )
}

/**
 * Marquesina fantasma.
 *
 * Va en SVG y no en HTML por una razón concreta: a 0,07 de opacidad esto es
 * ornamento puro, pero un `<span>` sigue siendo un nodo de texto y toda
 * auditoría de contraste lo mide y lo suspende — con razón, porque no puede
 * saber que nadie debe leerlo. En SVG el mismo trazo es un dibujo.
 *
 * `textLength` obliga a cada copia a ocupar justo el ancho del viewBox, así
 * dos copias contiguas empalman sin costura al desplazarse un -100%.
 */
function Marquee({ text }) {
  return (
    <svg
      viewBox="0 0 2000 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="h-[clamp(2.2rem,5.2vw,4.6rem)] w-screen shrink-0"
      style={{ animation: 'slide 44s linear infinite' }}
    >
      <text
        x="0"
        y="66"
        textLength="2000"
        lengthAdjust="spacingAndGlyphs"
        fill="#FBFAF7"
        fillOpacity="0.17"
        fontSize="68"
        fontWeight="300"
        fontFamily="Zodiak, serif"
      >
        {text}
      </text>
      <style>{`
        @keyframes slide { from { transform: translateX(0) } to { transform: translateX(-100%) } }
        @media (prefers-reduced-motion: reduce) { svg[style*="slide"] { animation: none !important } }
      `}</style>
    </svg>
  )
}
