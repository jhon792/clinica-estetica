import { useState, useRef, useEffect, useCallback } from 'react'

const BASE = '/fotos/antes_despues/'

const cases = [
  {
    label: 'Rinoplastia',
    category: 'Cirugía Facial',
    desc: 'Refinamiento nasal para lograr armonía y equilibrio facial perfectos.',
    before: BASE + 'Rinoplastia antes.jpg',
    after:  BASE + 'Rinoplastia despues.jpg',
    height: '500px',
    width: '100%',
  },
  {
    label: 'Lifting Facial',
    category: 'Rejuvenecimiento',
    desc: 'Rejuvenecimiento facial profundo con resultados naturales y duraderos.',
    before: BASE + 'Lifting facial antes .jpg',
    after:  BASE + 'Lifting facial  después.jpg',
    height: '500px',
    width: '100%',
  },
  {
    label: 'Cirugía Estética',
    category: 'Transformación',
    desc: 'Resultados sorprendentes con técnicas quirúrgicas de vanguardia.',
    before: BASE + 'Resultados de cirugía estética_ cambios sorprendentes(1)antes.jpg',
    after:  BASE + 'Resultados de cirugía estética_ cambios sorprendentes(1)despues.jpg',
    height: '500px',
    width: '100%',
  },
  {
    label: 'Lipoescultura',
    category: 'Corporal',
    desc: 'Contorno corporal definido con abdominoplastia y liposucción 360°.',
    before: BASE + 'Lipoescultura antes.jpg',
    after:  BASE + 'Lipoescultura despues.jpg',
    height: '500px',
    width: '100%',
  },
  {
    label: 'Rinoplastia II',
    category: 'Cirugía Facial',
    desc: 'Nariz estilizada y armoniosa manteniendo la esencia natural del paciente.',
    before: BASE + 'Rinoplastia 2 antes.jpg',
    after:  BASE + 'Rinoplastia 2 despues.jpg',
    height: '500px',
    width: '100%',
  },
  {
    label: 'Pérdida de Peso',
    category: 'Tratamiento Corporal',
    desc: 'Transformación corporal integral con resultados visibles y duraderos.',
    before: BASE + 'Perdida de peso antes.jpg',
    after:  BASE + 'Perdida de peso despues.jpg',
    height: '500px',
    width: '100%',
  },
]

function ComparisonSlider({ before, after, label, height = '500px', width = '100%' }) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)

  const update = useCallback((clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(1, ((clientX - left) / width) * 100)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => update(e.clientX ?? e.touches?.[0]?.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, update])

  const start = (e) => {
    setDragging(true)
    update(e.touches ? e.touches[0].clientX : e.clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-col-resize"
      style={{ height, width }}
      onMouseDown={start}
      onTouchStart={start}
    >
      {/* ── DESPUÉS: foto completa de fondo ── */}
      <div className="absolute inset-0">
        <img
          src={after}
          alt={`${label} — Después`}
          draggable={false}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute bottom-3 right-3 z-10 bg-[#1a1612]/80 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 shadow-sm">
          DESPUÉS
        </span>
      </div>

      {/* ── ANTES: foto superpuesta, recortada por el slider ── */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        {/* inner div mantiene el ancho exacto del contenedor padre */}
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: `${10000 / pos}%` }}
        >
          <img
            src={before}
            alt={`${label} — Antes`}
            draggable={false}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <span className="absolute bottom-3 left-3 z-10 bg-[#b8973e]/90 backdrop-blur-sm text-white text-[9px] font-bold tracking-[0.22em] uppercase px-3 py-1.5 shadow-sm">
          ANTES
        </span>
      </div>

      {/* ── Línea divisora: se extiende -2px fuera del contenedor para que
           overflow:hidden la corte exactamente en el borde de la imagen ── */}
      <div
        style={{
          position: 'absolute',
          top: '1px',
          bottom: '1px',
          left: `${pos}%`,
          transform: 'translateX(-50%)',
          width: '3px',
          background: 'white',
          boxShadow: '1px 0 0 rgba(0,0,0,0.5), -1px 0 0 rgba(0,0,0,0.5)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* ── Handle circular ── */}
      <div
        className="absolute top-1/2 z-30 pointer-events-none flex items-center justify-center rounded-full bg-white border border-[#e8e0d4]"
        style={{
          left: `${pos}%`,
          width: 40,
          height: 40,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a1612" strokeWidth="2.5">
          <path d="M8 4L4 8l4 4M16 4l4 4-4 4"/>
        </svg>
      </div>

      {/* ── Hint "Desliza" ── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[8px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full opacity-70">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Desliza
        </span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const cardRefs = useRef([])
  const [visible, setVisible] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = cardRefs.current.findIndex((el) => el === entry.target)
            if (i !== -1) setVisible((prev) => new Set([...prev, i]))
          }
        })
      },
      { threshold: 0.15 }
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="resultados" className="py-24 bg-[#f9f6f0] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Casos Reales · Bogotá
            </span>
            <span className="w-8 h-px bg-[#b8973e]" />
          </div>
          <h2 className="text-[38px] lg:text-[52px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif mb-4">
            Resultados Reales:<br />
            <span className="text-[#b8973e]">Antes y Después</span>
          </h2>
          <p className="text-[14px] font-medium text-[#6b7280] max-w-xl mx-auto leading-relaxed">
            Desliza el control para descubrir la transformación real de nuestros pacientes.
            Procedimientos certificados, resultados que hablan por sí solos.
          </p>
        </div>

        {/* ── Grid de tarjetas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={c.label}
              ref={(el) => (cardRefs.current[i] = el)}
              className="flex flex-col bg-white border border-[#e8e0d4] overflow-hidden rounded-xl shadow-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:border-[#b8973e]/50 transition-all duration-500"
              style={{
                opacity: visible.has(i) ? 1 : 0,
                transform: visible.has(i) ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.65s ease ${i * 110}ms, transform 0.65s ease ${i * 110}ms, box-shadow 0.3s, border-color 0.3s`,
              }}
            >
              <ComparisonSlider before={c.before} after={c.after} label={c.label} height={c.height} width={c.width} />

              <div className="p-5 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#b8973e]">
                  {c.category}
                </span>
                <h3 className="text-[16px] font-bold text-[#1a1612] font-serif leading-tight">
                  {c.label}
                </h3>
                <div className="w-6 h-px bg-[#b8973e]/50" />
                <p className="text-[11px] font-medium text-[#6b7280] leading-[1.7]">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Trust bar ── */}
        <div className="mt-14 pt-10 border-t border-[#e8e0d4] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            {[
              { icon: '🏥', text: 'Procedimientos certificados' },
              { icon: '👩‍⚕️', text: 'Médicos especializados' },
              { icon: '✅', text: 'Resultados garantizados' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-[14px]">{item.icon}</span>
                <span className="text-[11px] font-semibold text-[#4a4240]">{item.text}</span>
              </div>
            ))}
          </div>
          <a
            href="#consulta"
            className="shrink-0 flex items-center gap-3 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(184,151,62,0.3)]"
          >
            Quiero mis Resultados
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
