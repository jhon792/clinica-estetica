import { useState } from 'react'
import Img from '../components/Img'
import { SectionMark, Lines, Rise } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { VIDEOS } from '../config'

/**
 * Sección de vídeo con patrón "fachada" (lite-youtube):
 *
 *   1. En reposo solo existe la miniatura (auto-hospedada, AVIF/WebP/JPG) y un
 *      botón de reproducción propio. Ni un byte de YouTube se descarga.
 *   2. Al pulsar, se inserta el iframe con autoplay. Así la sección no lastra
 *      la carga inicial (YouTube inyecta ~500 KB + cookies de terceros) y solo
 *      paga ese coste quien decide ver.
 *
 * No es un iframe incrustado: es una portada editorial que reproduce bajo demanda.
 */
export default function Videos() {
  const root = useReveal({ threshold: 0.08 })

  return (
    <section id="peliculas" ref={root} data-cursor-bg="light" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionMark index="X" label="En Movimiento" />
            <h2 className="mt-10 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em]">
              <Lines lines={['Antes de decidir,', 'infórmese.']} step={110} />
            </h2>
          </div>
          <Rise delay={300} className="md:col-span-4 md:col-start-9">
            <p className="max-w-[42ch] text-[14px] leading-[1.9] font-light text-slate-ink">
              Dos conversaciones breves sobre lo que conviene saber antes de una
              cirugía plástica. La decisión mejor tomada es siempre la mejor
              informada.
            </p>
          </Rise>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video, index }) {
  const ref = useReveal({ threshold: 0.15 })
  const [playing, setPlaying] = useState(false)

  return (
    <figure ref={ref} className="rise" style={{ '--d': `${index * 140}ms` }}>
      <div className="group relative overflow-hidden bg-ink" style={{ aspectRatio: '16 / 9' }}>
        {playing ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            allow="accelerated-download; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            data-cursor="view"
            data-cursor-label="Reproducir"
            aria-label={`Reproducir: ${video.title}`}
            className="absolute inset-0 h-full w-full"
          >
            {/* Miniaturas a todo color desde la carga. El velo inferior las
                integra en la sección sin restarles el color del vídeo. */}
            <Img
              src={video.thumb}
              alt={`Miniatura del vídeo: ${video.title}`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full scale-[1.03] object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-100"
            />
            {/* Velo cinematográfico: banda oscura densa abajo para que el rótulo
                propio domine y el texto incrustado de la miniatura se hunda. */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/15 transition-opacity duration-700 group-hover:from-ink/85 group-hover:via-ink/30" />

            {/* Botón de reproducción propio: anillo fino + triángulo, no el de YouTube. */}
            <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-24 md:w-24">
              <span className="absolute inset-0 rounded-full border border-ivory/40 transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-90 group-hover:border-ivory/70" />
              <span className="absolute inset-0 rounded-full bg-ivory/0 backdrop-blur-0 transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-ivory group-hover:backdrop-blur-sm" />
              <svg
                viewBox="0 0 24 24"
                className="relative ml-1 h-6 w-6 text-ivory transition-colors duration-[700ms] group-hover:text-ink md:h-7 md:w-7"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.2v13.6a.5.5 0 0 0 .77.42l10.6-6.8a.5.5 0 0 0 0-.84L8.77 4.78A.5.5 0 0 0 8 5.2z" />
              </svg>
            </span>

            {/* Rótulo editorial */}
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-left md:p-8">
              <span>
                <span className="eyebrow mb-2 block text-mist">{video.kicker}</span>
                <span className="block max-w-[26ch] font-display text-[clamp(1.15rem,1.8vw,1.6rem)] font-light leading-tight text-ivory">
                  {video.title}
                </span>
                <span className="mt-2 block text-[11px] tracking-[0.14em] text-mist">{video.author}</span>
              </span>
              <span className="num shrink-0 text-[10px] tracking-[0.2em] text-mist">
                0{index + 1}
              </span>
            </span>
          </button>
        )}
      </div>
    </figure>
  )
}
