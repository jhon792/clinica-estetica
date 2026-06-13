const videos = [
  {
    id: '3BGeIQfQteA',
    title: 'Procedimientos de Medicina Estética',
    desc: 'Conoce de cerca nuestros procedimientos, tecnología de vanguardia y los resultados reales que logramos con nuestros pacientes día a día.',
  },
  {
    id: 'Y3YxhQaluXg',
    title: 'Transformaciones y Resultados Reales',
    desc: 'Testimonios y casos de éxito que reflejan nuestro compromiso con la excelencia, la seguridad y el bienestar de cada uno de nuestros pacientes.',
  },
]

export default function Videos() {
  return (
    <section id="videos" className="py-24 bg-[#f9f6f0]">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Contenido Educativo
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[40px] lg:text-[52px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif">
              Videos<br />Informativos
            </h2>
            <p className="text-[#6b7280] text-[14px] leading-relaxed max-w-sm sm:text-right">
              Conoce más sobre nuestros procedimientos, tecnología y resultados a través de contenido especializado.
            </p>
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col gap-4 group">
              {/* Video iframe wrapper */}
              <div className="relative w-full overflow-hidden bg-[#0f0d0b] shadow-[0_8px_40px_rgba(0,0,0,0.15)]" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
                {/* Gold top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#b8973e] z-10" />
              </div>

              {/* Video info */}
              <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b8973e]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#b8973e]">
                    Video Informativo
                  </span>
                </div>
                <h3 className="text-[20px] font-bold text-[#1a1612] font-serif leading-tight">
                  {video.title}
                </h3>
                <p className="text-[#6b7280] text-[13px] leading-relaxed">
                  {video.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 pt-10 border-t border-[#e8e0d4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#6b7280] max-w-lg">
            ¿Tienes preguntas sobre algún procedimiento? Nuestro equipo está disponible para resolver todas tus dudas sin compromiso.
          </p>
          <a
            href="#consulta"
            className="shrink-0 flex items-center gap-3 bg-[#1a1612] hover:bg-[#b8973e] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300"
          >
            Consulta Sin Compromiso
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
