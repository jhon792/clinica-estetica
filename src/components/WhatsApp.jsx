import { useEffect, useRef, useState } from 'react'
import { waLink, SOCIALS, BRAND } from '../config'
import { useContent } from '../i18n'
import SocialIcon from './SocialIcon'

/**
 * Cluster flotante de contacto.
 *
 * El pill principal es la acción de WhatsApp. Encima se despliegan las redes:
 *   · En puntero fino, el despliegue lo gobierna el hover sobre todo el grupo.
 *   · En táctil no existe hover, así que un botón dedicado (·· ) alterna el
 *     menú, y se cierra al tocar fuera. Nunca se secuestra el tap del pill de
 *     WhatsApp para abrir el menú: el usuario que quiere escribir, escribe.
 *
 * No aparece hasta que el hero sale de pantalla: un botón sobre el primer
 * fotograma rompería la promesa del hero.
 */
export default function WhatsApp() {
  const c = useContent()
  const w = c.whatsapp
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinel = useRef(null)
  const cluster = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setVisible(!e.isIntersecting),
      { rootMargin: '-90% 0px 0px 0px' }
    )
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  // Cierre por tap-fuera y por Escape (solo relevante en el modo táctil).
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (cluster.current && !cluster.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const fine = () =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  return (
    <>
      <div ref={sentinel} className="pointer-events-none absolute top-0 h-[100dvh] w-px" aria-hidden="true" />

      <div
        ref={cluster}
        className="group fixed bottom-6 right-6 z-[55] flex flex-col items-end"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px) scale(0.94)',
          transition: 'opacity 900ms cubic-bezier(0.32,0.72,0,1), transform 900ms cubic-bezier(0.32,0.72,0,1)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        onMouseEnter={() => fine() && setOpen(true)}
        onMouseLeave={() => fine() && setOpen(false)}
      >
        {/* Redes: se elevan y aparecen escalonadas. En reposo no reciben foco
            del tabulador, para no atrapar al teclado en un menú cerrado.
            Cuando está cerrado colapsa a altura cero: así el cluster flotante
            solo ocupa el botón y no intercepta clics del contenido de detrás. */}
        <ul
          className="flex flex-col items-end gap-2.5 overflow-hidden transition-[max-height,margin] duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
          role="menu"
          aria-label={w.social}
          style={{ maxHeight: open ? '220px' : '0px', marginBottom: open ? '0.75rem' : '0px' }}
        >
          {SOCIALS.map((s, i) => (
            <li key={s.key} role="none">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                role="menuitem"
                data-cursor="link"
                aria-label={s.label}
                tabIndex={open ? 0 : -1}
                className="group/item flex items-center gap-3"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(12px) scale(0.8)',
                  transition: `opacity 500ms cubic-bezier(0.32,0.72,0,1) ${open ? i * 55 : 0}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${open ? i * 55 : 0}ms`,
                  pointerEvents: open ? 'auto' : 'none',
                }}
              >
                <span className="rounded-full bg-ink/85 px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase text-ivory opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/item:opacity-100">
                  {s.label}
                </span>
                {/* Color oficial de la red desde la carga: fondo de marca +
                    icono blanco (glitch cian/rosa permanente en TikTok). El
                    anillo blanco tenue despega el círculo casi negro de TikTok
                    de cualquier fondo. */}
                <span
                  className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full shadow-[0_6px_28px_-8px_rgba(18,16,14,0.5)] ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/item:scale-105 group-active/item:scale-95"
                  style={{ background: BRAND[s.key].hoverBg }}
                >
                  <SocialIcon
                    name={s.key}
                    size={17}
                    className={`relative text-white ${
                      s.key === 'tiktok'
                        ? '[filter:drop-shadow(1.4px_0_0_#FE2C55)_drop-shadow(-1.4px_0_0_#25F4EE)]'
                        : ''
                    }`}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Fila inferior: pill de WhatsApp + toggle táctil. */}
        <div className="flex items-center gap-2.5">
          {/* Toggle: solo en puntero grueso. En fino, el hover ya abre. */}
          <button
            type="button"
            aria-label={open ? w.close : w.open}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink shadow-[0_6px_28px_-8px_rgba(18,16,14,0.5)] ring-1 ring-ink/8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 [@media(pointer:fine)]:hidden"
          >
            <span className="relative block h-4 w-4">
              <span
                className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-all duration-500"
                style={{ transform: open ? 'translate(-50%,-50%) rotate(45deg) scaleX(3.4)' : 'translate(-50%,-50%) translateX(-5px)' }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-opacity duration-300"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-all duration-500"
                style={{ transform: open ? 'translate(-50%,-50%) rotate(-45deg) scaleX(3.4)' : 'translate(-50%,-50%) translateX(5px)' }}
              />
            </span>
          </button>

          <a
            href={waLink(c.wa.default)}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            data-cursor-bg="dark"
            aria-label={w.message}
            className="group/wa flex items-center gap-3 rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-ivory shadow-[0_8px_40px_-10px_rgba(18,16,14,0.5)] transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
          >
            <span className="hidden text-[10px] tracking-[0.2em] uppercase sm:block">WhatsApp</span>
            {/* Verde oficial de WhatsApp desde la carga. */}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/wa:scale-105">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </>
  )
}
