/**
 * Iconos de redes en trazo fino, del mismo peso que el resto de la interfaz.
 * Nada de logotipos rellenos de colores de marca: aquí todo es línea sobre
 * materia. `currentColor` deja que el contexto decida el tono.
 */
const PATHS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M15.4 7.4h-1.7a1.9 1.9 0 0 0-1.9 1.9V21M9.4 12.4h5.6" />
  ),
  tiktok: (
    <path d="M14 4v10.4a3 3 0 1 1-2.2-2.9M14 4c.4 2.2 1.9 3.7 4 3.9" />
  ),
}

/**
 * Pin oficial de Google Maps con sus cuatro colores. La silueta del pin recorta
 * (clipPath) cuatro bandas de color; encima, el círculo blanco. Limpio a
 * cualquier tamaño porque los colores se pintan dentro de la forma, no como
 * trazos sueltos.
 */
export function GoogleMapsIcon({ size = 16, className = '' }) {
  const pin = 'M12 2C7.86 2 4.5 5.36 4.5 9.5c0 4.9 6.06 11.2 7.03 12.18a.66.66 0 0 0 .94 0C13.44 20.7 19.5 14.4 19.5 9.5 19.5 5.36 16.14 2 12 2z'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="gm-pin"><path d={pin} /></clipPath>
      </defs>
      <g clipPath="url(#gm-pin)">
        <rect x="0" y="0" width="24" height="24" fill="#EA4335" />
        <path d="M-2 12 L10 -2 H24 V6 L8 24 H-2 Z" fill="#FBBC04" />
        <path d="M6 -2 H24 V9 L11 -2 Z" fill="#4285F4" />
        <path d="M11 8 L24 8 V24 H9 Z" fill="#34A853" />
        <path d="M12 6 a3.5 3.5 0 0 1 3.2 5 L12 20 8.8 11 A3.5 3.5 0 0 1 12 6z" fill="#EA4335" />
      </g>
      <circle cx="12" cy="9.4" r="2.7" fill="#fff" />
    </svg>
  )
}

export default function SocialIcon({ name, size = 18, className = '', style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
