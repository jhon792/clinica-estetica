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

export default function SocialIcon({ name, size = 18, className = '' }) {
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
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
