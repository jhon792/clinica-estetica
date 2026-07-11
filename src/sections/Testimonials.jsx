import { useLayoutEffect, useRef, useState } from 'react'
import AutoCarousel from '../components/AutoCarousel'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'
import { GOOGLE_MAPS_URL } from '../config'

/**
 * Testimonios con estética de reseña de Google (avatar, nombre, antigüedad,
 * cinco estrellas + insignia verificada, logo de Google y "Leer más"),
 * presentados en un carrusel de avance automático de derecha a izquierda.
 *
 * Nota: el contenido es de relleno. Para producción deben conectarse reseñas
 * reales de Google; el logotipo y la insignia de "verificado" solo deben
 * mostrarse con datos auténticos de Google.
 */
export default function Testimonials() {
  const c = useContent()
  const tr = c.testimonials
  const root = useReveal({ threshold: 0.12 })

  return (
    <section id="testimonios" ref={root} data-cursor-bg="light" className="relative overflow-hidden bg-paper py-28 md:py-36">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        {/* Cabecera centrada */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-16">
          <p className="rise eyebrow mb-5">{tr.label}</p>
          <h2 className="rise font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink" style={{ '--d': '80ms' }}>
            {tr.title}
          </h2>
          <p className="rise mt-6 max-w-[52ch] text-[15px] font-light leading-relaxed text-slate-ink" style={{ '--d': '180ms' }}>
            {tr.subtitle}
          </p>
          <p className="rise mt-1 max-w-[52ch] text-[13px] leading-relaxed text-stone" style={{ '--d': '240ms' }}>
            {tr.note}
          </p>
        </div>

        <div className="rise" style={{ '--d': '320ms' }}>
          <AutoCarousel
            items={tr.items}
            ariaLabel={tr.title}
            interval={5000}
            prevLabel={c.carousel.prev}
            nextLabel={c.carousel.next}
            gapClassName="gap-5 md:gap-6"
            cardClassName="w-[86%] shrink-0 sm:w-[60%] md:w-[46%] lg:w-[31.5%]"
            renderItem={(t) => <ReviewCard review={t} readMore={tr.readMore} readLess={tr.readLess} />}
          />
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, readMore, readLess }) {
  const textRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

  // Solo se muestra "Leer más" si el texto realmente desborda las líneas.
  useLayoutEffect(() => {
    const el = textRef.current
    if (el) setOverflowing(el.scrollHeight - el.clientHeight > 4)
  }, [])

  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-ink/8 shadow-[0_18px_50px_-30px_rgba(18,16,14,0.4)] md:p-7">
      {/* Trama de puntos tenue en la esquina, como en la referencia. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '11px 11px',
          color: '#E4DED1',
          maskImage: 'linear-gradient(225deg, #000 0%, transparent 62%)',
          WebkitMaskImage: 'linear-gradient(225deg, #000 0%, transparent 62%)',
        }}
      />

      <header className="relative flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} />
          <div>
            <p className="text-[14px] font-medium leading-tight text-ink">{review.name}</p>
            <p className="mt-0.5 text-[12px] text-stone">{review.time}</p>
          </div>
        </div>
        <GoogleG />
      </header>

      <div className="relative mt-3 flex items-center gap-1.5">
        <Stars />
        <Verified />
      </div>

      <p
        ref={textRef}
        className="relative mt-3 text-[14px] leading-[1.65] text-slate-ink"
        style={
          expanded
            ? undefined
            : { display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
        }
      >
        {review.text}
      </p>

      {overflowing && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          data-cursor="link"
          className="relative mt-3 self-start text-[13px] text-stone transition-colors duration-300 hover:text-ink"
        >
          {expanded ? readLess : readMore}
        </button>
      )}
    </figure>
  )
}

// Avatar con iniciales sobre un tono neutro derivado del nombre (sin fotos
// inventadas de personas reales).
const AV_COLORS = ['#8C7B63', '#6E685F', '#9A6B52', '#5B6B63', '#7A6E86', '#A0713E']
function Avatar({ name }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  const bg = AV_COLORS[h % AV_COLORS.length]
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-white"
      style={{ background: bg }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 / 5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

function Verified() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M12 1l2.6 1.9 3.2-.3 1 3 2.7 1.7-1 3 1 3-2.7 1.7-1 3-3.2-.3L12 23l-2.6-1.9-3.2.3-1-3L2.5 15l1-3-1-3 2.7-1.7 1-3 3.2.3z" />
      <path fill="#fff" d="M10.6 14.6l-2.2-2.2-1.1 1.1 3.3 3.3 5.9-5.9-1.1-1.1z" />
    </svg>
  )
}

function GoogleG() {
  return (
    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" data-cursor="link" aria-label="Google" className="relative shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.87z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.39v3.09A11.99 11.99 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.39A11.86 11.86 0 0 0 .1 12c0 1.94.46 3.77 1.29 5.38l3.88-3.09z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.39 6.62l3.88 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
      </svg>
    </a>
  )
}
