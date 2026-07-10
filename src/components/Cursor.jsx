import { useEffect, useRef } from 'react'

/**
 * Cursor propio. Dos cuerpos con inercias distintas: un punto que sigue al
 * ratón sin retardo y un anillo que llega tarde. Esa diferencia de fase es
 * lo que se lee como peso físico.
 *
 * Se monta solo en punteros finos. En táctil no existe.
 */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let scale = 1
    let targetScale = 1
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      // El punto es solidario al ratón: cero interpolación.
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }

    const tick = () => {
      // lerp: el anillo persigue, nunca alcanza del todo.
      ringPos.x += (pos.x - ringPos.x) * 0.14
      ringPos.y += (pos.y - ringPos.y) * 0.14
      scale += (targetScale - scale) * 0.16
      ring.current.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${scale})`
      // El rótulo viaja con el anillo, pero no se escala con él.
      label.current.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y + 34}px, 0) translateX(-50%)`
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (t) {
        targetScale = t.dataset.cursor === 'view' ? 3.4 : 2.1
        const text = t.dataset.cursorLabel || ''
        label.current.textContent = text
        label.current.style.opacity = text ? '1' : '0'
      } else {
        targetScale = 1
        label.current.style.opacity = '0'
      }
    }

    const onDown = () => { targetScale *= 0.82 }
    const onUp = () => { targetScale = targetScale / 0.82 }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    // El contraste lo garantiza `mix-blend-difference` con blanco PURO en cada
    // cuerpo: la mezcla por diferencia es |fondo − 255|, que sobre marfil da
    // casi negro y sobre tinta da casi blanco. El bug anterior venía de un
    // blanco al 50%, que sobre fondo claro daba un gris invisible. Con opacidad
    // plena el cursor nunca se pierde — cumple el contraste para baja visión.
    // El blend va en cada elemento, no en el contenedor: así se mezcla contra
    // la página y no contra una capa aislada.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border-[1.5px] mix-blend-difference"
        style={{ borderColor: '#ffffff' }}
      />
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full mix-blend-difference"
        style={{ background: '#ffffff' }}
      />
      <div
        ref={label}
        className="absolute left-0 top-0 whitespace-nowrap text-[9px] tracking-[0.28em] uppercase opacity-0 transition-opacity duration-300 mix-blend-difference"
        style={{ color: '#ffffff' }}
      />
    </div>
  )
}
