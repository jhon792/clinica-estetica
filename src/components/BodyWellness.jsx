const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/>
        <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
      </svg>
    ),
    title: 'Evaluación Personalizada',
    desc: 'Cada cuerpo es único. Diseñamos un plan exclusivo basado en tus metas y condición física real.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Tecnología Certificada',
    desc: 'Equipos de última generación y técnicas avaladas internacionalmente para resultados seguros.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <path d="M22 4L12 14.01l-3-3"/>
      </svg>
    ),
    title: 'Acompañamiento Continuo',
    desc: 'Te seguimos antes, durante y después. Tu transformación es un proceso, no un momento.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'Resultados Naturales',
    desc: 'Realzamos tu belleza auténtica. Sin excesos, sin artificios — solo la mejor versión de ti.',
  },
]

export default function BodyWellness() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Imagen */}
          <div className="relative overflow-hidden lg:min-h-full min-h-[420px] order-2 lg:order-1">
            <img
              src="/fotos/Resultados de cirugía estética_ cambios sorprendentes.jpg"
              alt="Resultados de cirugía estética y bienestar corporal"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 25%' }}
              loading="lazy"
            />
            {/* Overlay sutil para separación */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 pointer-events-none" />

            {/* Stat flotante */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm border border-[#e8e0d4] px-5 py-4 shadow-lg">
              <p className="text-[28px] font-extrabold text-[#b8973e] leading-none font-serif">92%</p>
              <p className="text-[11px] font-medium text-[#6b7280] mt-1 leading-tight max-w-[140px]">
                de pacientes nota mejoras desde la primera sesión
              </p>
            </div>
          </div>

          {/* Contenido */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-8 lg:px-14 py-14 bg-[#f9f6f0]">

            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
                Bienestar Integral
              </span>
            </div>

            <h2 className="text-[36px] lg:text-[44px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.02em] font-serif mb-4">
              Tu Cuerpo Merece<br />el Mejor Cuidado
            </h2>

            <p className="text-[13px] leading-relaxed text-[#6b7280] font-medium mb-10 max-w-md">
              La verdadera transformación va más allá de lo estético. En nuestra clínica trabajamos tu bienestar desde adentro hacia afuera, con un enfoque integral que combina ciencia, tecnología y cuidado humano.
            </p>

            {/* Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 border border-[#b8973e]/40 flex items-center justify-center text-[#b8973e] mt-0.5">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#1a1612] mb-1">{p.title}</h4>
                    <p className="text-[11px] leading-[1.7] text-[#6b7280] font-medium">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Separador */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#e8e0d4]" />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div className="flex-1 h-px bg-[#e8e0d4]" />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#consulta"
                className="inline-flex items-center gap-2.5 bg-[#1a1612] hover:bg-[#b8973e] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
              >
                Comienza Tu Transformación
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <p className="text-[10px] font-medium text-[#9a8e84] leading-tight">
                Valoración inicial gratuita<br />sin compromiso
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
