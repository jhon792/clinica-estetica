import { DIMS } from '../lib/images'

/**
 * Negociación de formato en el propio HTML: WebP primero, JPEG como red de
 * seguridad. Sin JavaScript de por medio, funciona antes de que hidrate React.
 *
 * Se retiró AVIF a propósito: varios navegadores móviles (Chrome antiguo en
 * Android, y sobre todo los navegadores in-app de WhatsApp/Instagram) aceptan
 * el <source type="image/avif"> pero fallan al decodificar y NO caen al
 * siguiente <source> — la imagen queda en blanco. WebP tiene soporte universal
 * (iOS 14+, todo Android moderno) y aquí pesa incluso menos que el AVIF, así
 * que quitarlo elimina el fallo sin coste.
 *
 * `priority` solo debe marcarse en la imagen que forma el LCP. Marcarlas
 * todas equivale a no marcar ninguna.
 */
export default function Img({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '100vw',
  style,
}) {
  const [w, h] = DIMS[src] || [1, 1]

  return (
    // `display: contents` disuelve el <picture>: el <img> hereda directamente
    // la caja del padre, así que h-full/object-cover se comportan como se espera.
    <picture className="contents">
      <source srcSet={`/img/${src}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`/img/${src}.jpg`}
        alt={alt}
        width={w}
        height={h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable="false"
        className={className}
        style={style}
      />
    </picture>
  )
}
