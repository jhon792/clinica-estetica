import { useCallback, useEffect, useRef, useState } from 'react'
import Img from '../components/Img'
import { SectionMark, Lines, Rise } from '../components/Type'
import { useReveal } from '../hooks/useReveal'

// Nota para el cliente: ninguna de estas fotos es del edificio. Son imágenes
// clínicas usadas como sustituto provisional. La sección pide fotografía
// arquitectónica real (mármol, vidrio, acero); hasta que exista, los pies de
// foto no describen espacios que la imagen no muestra. Se descartó `detalle`
// porque lleva incrustada la marca de agua de un tercero.
const PLATES = [
  { src: 'consulta', alt: 'Valoración clínica en sala privada con luz natural, Marbre Bogotá', span: 'md:col-span-7 md:row-span-2', ratio: '4 / 5' },
  { src: 'protocolo-piel', alt: 'Protocolo de preparación cutánea preoperatoria', span: 'md:col-span-5', ratio: '4 / 3' },
  { src: 'endolaser', alt: 'Cabina de procedimientos no quirúrgicos', span: 'md:col-span-5', ratio: '4 / 3' },
  { src: 'toxina', alt: 'Control de seguimiento tras la aplicación de toxina botulínica', span: 'md:col-span-4', ratio: '3 / 4' },
  { src: 'armonizacion', alt: 'Análisis de proporciones faciales previo a la armonización', span: 'md:col-span-4', ratio: '3 / 4' },
  { src: 'regenerativa', alt: 'Preparación de bioestimuladores de colágeno', span: 'md:col-span-4', ratio: '1 / 1' },
]

export default function Facilities() {
  const root = useReveal({ threshold: 0.05 })
  const [open, setOpen] = useState(null)

  // Estables entre renders: el efecto del lightbox depende de ellas y no debe
  // desmontarse y remontarse en cada repintado del padre.
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback((d) => setOpen((v) => (v + d + PLATES.length) % PLATES.length), [])

  return (
    <section id="instalaciones" ref={root} className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-20 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionMark index="VII" label="Instalaciones" />
            <h2 className="mt-10 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em]">
              <Lines lines={['Novecientos metros', 'sobre Bogotá.']} step={110} />
            </h2>
          </div>
          <Rise delay={300} className="md:col-span-4 md:col-start-9">
            <p className="max-w-[40ch] text-[14px] leading-[1.9] font-light text-slate-ink">
              Mármol de Carrara, roble macizo y acero cepillado. Quirófano
              propio certificado ISO 7. Una sola paciente en el edificio
              durante toda la jornada quirúrgica.
            </p>
          </Rise>
        </div>

        {/* Bento asimétrico. En móvil colapsa a una sola columna. */}
        <div className="grid grid-cols-1 gap-3 md:auto-rows-auto md:grid-cols-12 md:gap-4">
          {PLATES.map((p, i) => (
            <Plate key={p.src} {...p} index={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>

      <Lightbox plates={PLATES} index={open} onClose={close} onNav={nav} />
    </section>
  )
}

function Plate({ src, alt, span, ratio, index, onOpen }) {
  const ref = useReveal({ threshold: 0.15 })
  return (
    <figure ref={ref} className={`rise ${span}`} style={{ '--d': `${(index % 3) * 110}ms` }}>
      <button
        onClick={onOpen}
        data-cursor="view"
        data-cursor-label="Ampliar"
        aria-label={`Ampliar: ${alt}`}
        className="group relative block w-full overflow-hidden bg-sand"
        style={{ aspectRatio: ratio }}
      >
        <Img
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 45vw"
          className="h-full w-full scale-[1.03] object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-100"
        />
        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-[900ms] group-hover:bg-ink/[0.06]" />
      </button>
    </figure>
  )
}

function Lightbox({ plates, index, onClose, onNav }) {
  const open = index !== null
  const dialog = useRef(null)
  const restore = useRef(null)

  useEffect(() => {
    if (!open) return
    restore.current = document.activeElement
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    dialog.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
      document.body.style.overflow = ''
      // Devolver el foco a quien abrió. Sin esto, el lector de pantalla
      // aterriza en el <body> y pierde el hilo.
      restore.current?.focus?.()
    }
  }, [open, onClose, onNav])

  if (!open) return null
  const p = plates[index]

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de instalaciones"
      tabIndex={-1}
      className="fixed inset-0 z-[65] flex items-center justify-center outline-none"
    >
      <button
        aria-label="Cerrar galería"
        onClick={onClose}
        data-cursor="link"
        className="absolute inset-0 bg-ink/92 backdrop-blur-xl"
        style={{ animation: 'fadeIn 700ms cubic-bezier(0.32,0.72,0,1)' }}
      />

      <figure
        className="relative z-10 max-h-[82vh] max-w-[86vw]"
        style={{ animation: 'plate 900ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        <Img src={p.src} alt={p.alt} priority sizes="86vw" className="max-h-[76vh] w-auto object-contain" />
        <figcaption className="mt-5 flex items-baseline justify-between gap-8">
          <p className="max-w-[52ch] text-[12.5px] leading-relaxed text-mist">{p.alt}</p>
          <p className="num shrink-0 text-[10px] tracking-[0.2em] text-mist/80">
            {String(index + 1).padStart(2, '0')} / {String(plates.length).padStart(2, '0')}
          </p>
        </figcaption>
      </figure>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        <NavBtn onClick={() => onNav(-1)} label="Anterior"><path d="M9 2L4 6l5 4" /></NavBtn>
        <NavBtn onClick={() => onNav(1)} label="Siguiente"><path d="M4 2l5 4-5 4" /></NavBtn>
      </div>

      <button
        onClick={onClose}
        aria-label="Cerrar"
        data-cursor="link"
        className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-ivory/70 ring-1 ring-ivory/20 transition-colors duration-500 hover:bg-ivory/10 hover:text-ivory"
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </button>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes plate {
          from { opacity: 0; transform: scale(0.96) translateY(18px) }
          to { opacity: 1; transform: none }
        }
      `}</style>
    </div>
  )
}

function NavBtn({ onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor="link"
      className="flex h-11 w-11 items-center justify-center rounded-full text-ivory/70 ring-1 ring-ivory/20 transition-colors duration-500 hover:bg-ivory/10 hover:text-ivory"
    >
      <svg width="13" height="13" viewBox="0 0 13 12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  )
}
