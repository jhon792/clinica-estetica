/**
 * Primitivas tipográficas de revelado.
 * El escalonado no es decorativo: gobierna el orden en que se lee la página.
 * Nada entra a la vez.
 */

/** Líneas que suben desde detrás de una máscara. Para titulares. */
export function Lines({ lines, className = '', step = 90, start = 0, as: Tag = 'span' }) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span style={{ '--d': `${start + i * step}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/** Letra por letra. Reservado para una sola palabra: en frases largas cansa. */
export function Chars({ text, className = '', step = 26, start = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span className="mask-line inline-block" key={i} aria-hidden="true">
          <span
            className="inline-block"
            style={{ '--d': `${start + i * step}ms` }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  )
}

/** Entrada pesada con desenfoque. Para párrafos, imágenes, cualquier bloque. */
export function Rise({ children, delay = 0, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`rise ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** Filete de 1px que se dibuja de izquierda a derecha. */
export function Rule({ delay = 0, className = '' }) {
  return (
    <div
      className={`rule h-px bg-ink/12 w-full ${className}`}
      style={{ '--d': `${delay}ms` }}
    />
  )
}

/** Cifra romana + rótulo. La firma editorial de cada sección. */
export function SectionMark({ index, label, delay = 0 }) {
  return (
    <div className="flex items-baseline gap-5" style={{ '--d': `${delay}ms` }}>
      <span className="rise num text-[10px] tracking-[0.3em] text-brass">{index}</span>
      <span className="rise eyebrow" style={{ '--d': `${delay + 80}ms` }}>{label}</span>
    </div>
  )
}
