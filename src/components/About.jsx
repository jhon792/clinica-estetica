const features = [
  'Médicos especialistas certificados',
  'Tecnología Endolaser de última generación',
  'Resultados naturales y duraderos',
  'Ambiente premium y esterilizado',
  'Protocolos clínicos seguros',
  'Seguimiento post-tratamiento',
]

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-[#0f0d0b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Images composition */}
          <div className="relative">
            {/* Main image */}
            <div className="relative w-[78%] h-[500px] overflow-hidden">
              <img
                src="/fotos/doctora.jpeg"
                alt="Doctora especialista"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 border border-[#b8973e]/20" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f0d0b]/40 to-transparent pointer-events-none" />
            </div>

            {/* Secondary image */}
            <div className="absolute bottom-0 right-0 w-[46%] h-[280px] overflow-hidden border-[5px] border-[#0f0d0b]">
              <img
                src="/fotos/doctora.jpeg"
                alt="Especialista en estética"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 25%' }}
              />
              <div className="absolute inset-0 border border-[#b8973e]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Experience badge */}
            <div className="absolute top-8 -right-3 bg-[#b8973e] px-6 py-5 text-center shadow-[0_8px_30px_rgba(184,151,62,0.4)]">
              <div className="text-[38px] font-extrabold text-white leading-none font-serif">12+</div>
              <div className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/80 mt-1">
                Años de<br/>Experiencia
              </div>
            </div>

            {/* Gold left accent line */}
            <div className="absolute top-10 -left-5 w-0.5 h-28 bg-gradient-to-b from-transparent via-[#b8973e] to-transparent opacity-60" />
          </div>

          {/* Right: Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
                Quiénes Somos
              </span>
            </div>

            <h2 className="text-[36px] lg:text-[48px] font-extrabold text-white leading-tight tracking-[-0.02em] mb-8 font-serif">
              Procedimientos de Alto<br />
              <span className="text-[#b8973e]">Estándar Médico</span><br />
              para Nuestros Pacientes.
            </h2>

            <p className="text-[13px] font-medium leading-[1.9] text-[#9a8e84] mb-5">
              En nuestra clínica de estética avanzada combinamos la precisión de la medicina científica con el arte de la belleza. Cada tratamiento está diseñado para realzar tu belleza natural con los más altos estándares de seguridad.
            </p>
            <p className="text-[13px] font-medium leading-[1.9] text-[#9a8e84] mb-10">
              Nuestro equipo de especialistas certificados utiliza tecnología de vanguardia para ofrecerte resultados naturales y duraderos en un ambiente de confort y privacidad absoluta.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {features.map(feat => (
                <div key={feat} className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#b8973e]/15 border border-[#b8973e]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b8973e]" />
                  </div>
                  <span className="text-[11px] font-medium text-[#c9b78a] leading-snug">{feat}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-8 border-t border-[#2a2420] mb-8">
              {[
                { num: '2.500+', label: 'Pacientes satisfechos' },
                { num: '30+', label: 'Tratamientos disponibles' },
                { num: '100%', label: 'Protocolos certificados' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-[24px] font-extrabold text-[#b8973e] leading-none font-serif">{s.num}</div>
                  <div className="text-[10px] font-medium text-[#6b7280] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#consulta"
              className="inline-flex items-center gap-3 border-2 border-[#b8973e] text-[#b8973e] hover:bg-[#b8973e] hover:text-white text-[11px] font-bold tracking-[0.12em] uppercase px-8 py-4 transition-all duration-300"
            >
              Agenda tu Valoración
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
