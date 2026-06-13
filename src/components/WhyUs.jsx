const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Experiencia y Trayectoria',
    desc: 'Más de 12 años transformando vidas con resultados naturales. Nuestro equipo acumula miles de procedimientos exitosos avalados por pacientes satisfechos.',
    stat: '12+ años',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Atención Personalizada',
    desc: 'Cada paciente es único. Diseñamos planes de tratamiento a medida según tu anatomía, objetivos y estilo de vida, garantizando resultados que se adaptan a ti.',
    stat: '100% personalizado',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Tecnología de Vanguardia',
    desc: 'Contamos con equipos Endolaser y tecnología de última generación importada, que permiten procedimientos más seguros, precisos y con tiempos de recuperación reducidos.',
    stat: 'Equipos 2024',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Seguridad y Protocolos Médicos',
    desc: 'Seguimos estrictos protocolos clínicos certificados internacionalmente. Instalaciones esterilizadas, insumos premium y procedimientos avalados por organismos de salud.',
    stat: '100% certificado',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.5 12.5l3.5 3.5 8.5-8.5"/><circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    title: 'Acompañamiento Integral',
    desc: 'Tu bienestar es nuestra prioridad en cada etapa: valoración previa, el día del procedimiento y seguimiento post-tratamiento para garantizar resultados óptimos.',
    stat: 'Antes · Durante · Después',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Compromiso con tu Bienestar',
    desc: 'No buscamos solo resultados estéticos, sino transformar positivamente tu confianza y calidad de vida. Cada procedimiento está guiado por ética médica y vocación de servicio.',
    stat: '2.500+ pacientes felices',
  },
]

export default function WhyUs() {
  return (
    <section id="por-que-escogernos" className="py-24 bg-[#0f0d0b] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#b8973e 1px, transparent 1px), linear-gradient(90deg, #b8973e 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Nuestra Diferencia
            </span>
            <span className="w-8 h-px bg-[#b8973e]" />
          </div>
          <h2 className="text-[40px] lg:text-[52px] font-extrabold text-white leading-tight tracking-[-0.025em] font-serif mb-4">
            ¿Por qué<br />
            <span className="text-[#b8973e]">Escogernos?</span>
          </h2>
          <p className="text-[#9a8e84] text-[15px] leading-relaxed max-w-xl mx-auto">
            Somos la clínica de referencia en Bogotá para procedimientos estéticos seguros,
            naturales y con resultados que hablan por sí solos.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group bg-white/[0.03] border border-white/[0.07] hover:border-[#b8973e]/40 hover:bg-white/[0.06] transition-all duration-400 p-8 flex flex-col gap-5"
            >
              {/* Icon */}
              <div className="w-14 h-14 border border-[#b8973e]/30 group-hover:border-[#b8973e]/70 flex items-center justify-center text-[#b8973e] transition-colors duration-300 shrink-0">
                {reason.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-[20px] font-bold text-white leading-tight font-serif">
                  {reason.title}
                </h3>
                <div className="w-6 h-px bg-[#b8973e]/50" />
                <p className="text-[#9a8e84] text-[13px] leading-relaxed">
                  {reason.desc}
                </p>
              </div>

              {/* Stat badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8973e]" />
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#b8973e]">
                  {reason.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="#consulta"
            className="flex items-center gap-3 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-10 py-4 transition-all duration-300 shadow-[0_4px_24px_rgba(184,151,62,0.35)]"
          >
            Agenda tu Valoración Gratuita
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#servicios"
            className="flex items-center gap-3 border border-white/20 hover:border-white/50 text-white text-[11px] font-bold tracking-[0.1em] uppercase px-10 py-4 transition-all duration-300"
          >
            Ver Tratamientos
          </a>
        </div>
      </div>
    </section>
  )
}
