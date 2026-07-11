import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Carrusel de avance automático, de derecha a izquierda, con bucle infinito.
 *
 * Cómo funciona el bucle sin saltos: la lista se repite tres veces y el índice
 * arranca en la copia central. Al avanzar hacia cualquiera de los extremos, al
 * terminar la transición se "salta" una copia entera SIN animación — como las
 * tres copias son idénticas, el ojo no percibe el reajuste. Así el desfile es
 * continuo tanto con el avance automático como con las flechas.
 *
 * El desplazamiento se hace con `translate3d` (GPU), no con scroll nativo, para
 * un control determinista del bucle. Se pausa al pasar el cursor y cuando la
 * pestaña no está visible; respeta `prefers-reduced-motion`.
 */
export default function AutoCarousel({
  items,
  renderItem,
  cardClassName,
  gapClassName = 'gap-4 md:gap-6',
  interval = 4200,
  ariaLabel,
  dark = false,
}) {
  // El reinicio al cambiar de categoría se hace remontando el componente
  // (`key` desde el padre), no con estado: así no hace falta un efecto que
  // resetee el índice y el arranque siempre parte de la copia central.
  const N = items.length
  const trackRef = useRef(null)
  const [index, setIndex] = useState(N) // arranca en la copia central
  const [animate, setAnimate] = useState(false)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Tres copias: una a cada lado de la central para poder asomar en las
  // transiciones de borde.
  const repeated = []
  for (let k = 0; k < 3; k++) for (let j = 0; j < N; j++) repeated.push({ item: items[j], real: j, key: `${k}-${j}` })

  // Medir el ancho de una tarjeta (incluida la separación) desde el DOM: como
  // el ancho es responsivo (%), medir en píxeles es lo fiable.
  useLayoutEffect(() => {
    const measure = () => {
      const cards = trackRef.current?.children
      if (!cards || cards.length < 2) return
      const a = cards[0].getBoundingClientRect()
      const b = cards[1].getBoundingClientRect()
      setStep(b.left - a.left)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [N])

  // Reactivar la animación un frame después de un salto o de la medida inicial,
  // para que el reajuste sea instantáneo y no un deslizamiento visible.
  useEffect(() => {
    if (animate) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(r)
  }, [animate])

  // Avance automático.
  useEffect(() => {
    if (paused || reduced || N <= 1) return
    const t = setInterval(() => setIndex((i) => i + 1), interval)
    return () => clearInterval(t)
  }, [paused, reduced, interval, N])

  // Pausar cuando la pestaña no está visible.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onEnd = () => {
    if (index >= 2 * N) { setAnimate(false); setIndex((i) => i - N) }
    else if (index < N) { setAnimate(false); setIndex((i) => i + N) }
  }

  const go = (dir) => setIndex((i) => i + dir)

  return (
    <div
      className="relative"
      role="group"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className={`flex ${gapClassName}`}
          style={{
            transform: `translate3d(${-index * step}px, 0, 0)`,
            transition: animate && step ? 'transform 850ms cubic-bezier(0.32,0.72,0,1)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={onEnd}
        >
          {repeated.map(({ item, real, key }) => {
            // Solo la copia central (k=1) participa en foco y accesibilidad;
            // las laterales son duplicados visuales (`inert` las saca del
            // tabulador y del árbol de accesibilidad).
            const ghost = key.split('-')[0] !== '1'
            return (
              <div key={key} className={cardClassName} inert={ghost || undefined}>
                {renderItem(item, real)}
              </div>
            )
          })}
        </div>
      </div>

      {N > 1 && (
        <>
          <Arrow side="left" onClick={() => go(-1)} dark={dark} />
          <Arrow side="right" onClick={() => go(1)} dark={dark} />
        </>
      )}
    </div>
  )
}

function Arrow({ side, onClick, dark }) {
  const base = dark
    ? 'bg-ink/50 text-ivory ring-ivory/25 hover:bg-ink/80'
    : 'bg-ivory/70 text-ink ring-ink/12 hover:bg-ivory'
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="link"
      aria-label={side === 'left' ? 'Anterior' : 'Siguiente'}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full ring-1 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-90 ${base} ${
        side === 'left' ? 'left-2 md:left-3' : 'right-2 md:right-3'
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 13 12" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {side === 'left' ? <path d="M8.5 2L4 6l4.5 4" /> : <path d="M4.5 2L9 6l-4.5 4" />}
      </svg>
    </button>
  )
}
