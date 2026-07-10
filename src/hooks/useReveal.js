import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver, nunca un listener de scroll. Añade `is-in` una sola
 * vez y se desconecta: la animación de entrada no se repite jamás al volver
 * a pasar. Repetirla es el tic delator de una plantilla.
 */
export function useReveal({ threshold = 0.18, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return ref
}
