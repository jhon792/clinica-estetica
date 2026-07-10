import { useEffect, useRef } from 'react'

const INK = '#12100E'
const IVORY = '#FBFAF7'

/**
 * Cursor propio, adaptativo y determinista.
 *
 * En lugar de mezclar colores (mix-blend), que sobre tonos medios da grises
 * ambiguos, el cursor lee bajo el puntero el ancestro más cercano con
 * `data-cursor-bg` y elige un color sólido:
 *   · fondo claro  → cursor NEGRO
 *   · fondo oscuro → cursor BLANCO
 * La transición de color es suave (250 ms) para que el cambio no salte. Esto
 * garantiza contraste real en cualquier sección — clave para baja visión.
 *
 * Dos cuerpos con inercias distintas (punto sólido + anillo rezagado) dan la
 * sensación de peso. Se monta solo en punteros finos; en táctil no existe.
 */
export default function Cursor() {
  const layer = useRef(null)
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
    let mode = 'light'
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }

    const readMode = () => {
      // La capa es pointer-events-none, así que elementFromPoint devuelve el
      // contenido de debajo, no el propio cursor.
      const el = document.elementFromPoint(pos.x, pos.y)
      const ctx = el?.closest('[data-cursor-bg]')
      const next = ctx?.getAttribute('data-cursor-bg') === 'dark' ? 'dark' : 'light'
      if (next !== mode) {
        mode = next
        layer.current.style.color = mode === 'dark' ? IVORY : INK
      }
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.14
      ringPos.y += (pos.y - ringPos.y) * 0.14
      scale += (targetScale - scale) * 0.16
      ring.current.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${scale})`
      label.current.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y + 34}px, 0) translateX(-50%)`
      readMode()
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
    <div
      ref={layer}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden [@media(pointer:fine)]:block"
      style={{ color: INK }}
    >
      <div
        ref={ring}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border-[1.5px] border-current transition-colors duration-200"
      />
      <div
        ref={dot}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-current transition-colors duration-200"
      />
      <div
        ref={label}
        className="absolute left-0 top-0 whitespace-nowrap text-[9px] tracking-[0.28em] uppercase text-current opacity-0 transition-[opacity,color] duration-200"
      />
    </div>
  )
}
