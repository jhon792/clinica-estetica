import { waLink, WA_MSG_DEFAULT } from '../config'

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92vh] bg-white overflow-hidden flex items-stretch">

      {/* ── LEFT PANEL: Content ── */}
      <div className="relative z-10 w-full lg:w-[52%] flex items-center bg-white">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28 py-20 w-full max-w-2xl">

          {/* Certification badge */}
          <div className="inline-flex items-center gap-2 border border-[#b8973e]/40 bg-[#f9f6f0] px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#b8973e]">
              Clínica Certificada · Bogotá, Colombia
            </span>
          </div>

          {/* H1 con keywords locales para SEO */}
          <h1 className="text-[44px] md:text-[54px] lg:text-[62px] font-extrabold leading-[1.02] tracking-[-0.025em] text-[#1a1612] mb-3">
            Medicina Estética<br />
            <span className="text-[#b8973e]">en Bogotá</span>
          </h1>
          <p className="text-[16px] font-semibold text-[#4a4240] mb-4 leading-snug">
            Armonización Facial · Botox · Endolaser · Cirugía Estética
          </p>

          <p className="text-[14px] font-normal leading-[1.85] text-[#6b7280] mb-10 max-w-[420px]">
            Experiencia clínica avanzada, tecnología certificada y protocolos
            personalizados para resultados seguros, efectivos y medibles en el
            corazón de Colombia.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href={waLink(WA_MSG_DEFAULT)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_6px_24px_rgba(184,151,62,0.35)] hover:shadow-[0_8px_30px_rgba(184,151,62,0.45)]"
            >
              Reserva Ahora — Gratis
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-3 border-2 border-[#1a1612] text-[#1a1612] hover:bg-[#1a1612] hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-300"
            >
              Ver Tratamientos
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#e8e0d4]">
            {[
              { num: '4.9', label: '★ en Google', detail: '500+ reseñas' },
              { num: '12+', label: 'Años de experiencia', detail: 'En Colombia' },
              { num: '2.500+', label: 'Pacientes atendidos' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-[28px] font-extrabold text-[#1a1612] leading-none tracking-[-0.02em]">{s.num}</div>
                <div className="text-[10px] font-semibold text-[#b8973e] mt-1">{s.label}</div>
                {s.detail && <div className="text-[9px] text-[#9a8e84] mt-0.5 font-medium">{s.detail}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Photo ── */}
      <div className="hidden lg:block absolute right-0 top-0 w-[50%] h-full">
        <img
          src="/fotos/portada.jpeg"
          alt="Médica especialista en medicina estética Bogotá Colombia realizando tratamiento de armonización facial"
          width="900"
          height="1200"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Blend edge */}
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        {/* Dark tint */}
        <div className="absolute inset-0 bg-[#0f0d0b]/15 pointer-events-none" />

        {/* Floating card — technology */}
        <div className="absolute top-12 left-10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)] px-6 py-5 border-l-[3px] border-[#b8973e]">
          <div className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#b8973e] mb-1">Tecnología Certificada</div>
          <div className="text-[14px] font-bold text-[#1a1612]">Endolaser · INVIMA</div>
          <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">Resultados desde la 1ª sesión</div>
        </div>

        {/* Floating card — ratings */}
        <div className="absolute bottom-16 left-10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)] px-5 py-4 flex items-center gap-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#b8973e">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#1a1612] leading-none">4.9 / 5</div>
            <div className="text-[9px] text-[#6b7280] font-medium mt-0.5">500+ reseñas en Google</div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="absolute top-0 right-0 w-1 h-24 bg-gradient-to-b from-[#b8973e] to-transparent pointer-events-none" />
      </div>

      {/* Mobile: portada as background */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{ backgroundImage: 'url(/fotos/portada.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
        role="img"
        aria-label="Clínica Estética Premium Bogotá"
      >
        <div className="absolute inset-0 bg-white/90" />
      </div>
    </section>
  )
}
