/**
 * Banderas en SVG, no en emoji. Los emoji de bandera no se pintan en Windows
 * (aparecen como "CO"/"GB"), así que se dibujan a mano dentro de un rectángulo
 * redondeado uniforme (20×14) con un filete tenue que las despega de cualquier
 * fondo. Colombia representa el español (es-CO); Reino Unido, el inglés.
 */
const FLAGS = {
  co: (
    <>
      <rect width="20" height="14" fill="#FCD116" />
      <rect y="7" width="20" height="3.5" fill="#003893" />
      <rect y="10.5" width="20" height="3.5" fill="#CE1126" />
    </>
  ),
  gb: (
    <>
      <rect width="20" height="14" fill="#012169" />
      {/* Diagonales blancas y rojas (saltires) */}
      <g clipPath="url(#gbclip)">
        <path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" strokeWidth="2.8" />
        <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.2" />
      </g>
      {/* Cruz de San Jorge */}
      <rect x="8" width="4" height="14" fill="#fff" />
      <rect y="5" width="20" height="4" fill="#fff" />
      <rect x="8.75" width="2.5" height="14" fill="#C8102E" />
      <rect y="5.75" width="20" height="2.5" fill="#C8102E" />
    </>
  ),
}

export default function Flag({ code, className = '' }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={className}
      width="20"
      height="14"
      aria-hidden="true"
      focusable="false"
      style={{ borderRadius: '2.5px' }}
    >
      <defs>
        <clipPath id="gbclip"><rect width="20" height="14" /></clipPath>
      </defs>
      {FLAGS[code]}
      {/* Filete interior para definir el borde en claro y en oscuro. */}
      <rect x="0.4" y="0.4" width="19.2" height="13.2" rx="2.2" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
    </svg>
  )
}
