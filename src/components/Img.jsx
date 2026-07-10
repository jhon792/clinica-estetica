import { DIMS } from '../lib/images'

/**
 * Negociación de formato en el propio HTML: el navegador coge AVIF si lo
 * entiende, WebP si no, y JPEG como red de seguridad. Sin JavaScript de por
 * medio, así que funciona antes de que hidrate React.
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
      <source srcSet={`/img/${src}.avif`} type="image/avif" sizes={sizes} />
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
