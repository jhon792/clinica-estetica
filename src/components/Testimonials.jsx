const reviews = [
  {
    name: 'Valentina Restrepo',
    treatment: 'Armonización Facial · Botox',
    rating: 5,
    text: 'Llegué con muchos miedos y salí completamente enamorada de mis resultados. La doctora es increíblemente detallista y el trato del equipo es de primera. Mi rostro luce natural, fresco y armonioso. ¡Ya agendé mi próxima cita!',
    date: 'Feb 2026',
    initials: 'VR',
    verified: true,
  },
  {
    name: 'Camila Torres',
    treatment: 'Labios · Ácido Hialurónico',
    rating: 5,
    text: 'Soñé con unos labios perfectos durante años y esta clínica lo hizo realidad. El procedimiento fue rápido, casi sin molestias, y el resultado es exactamente lo que pedí: natural pero con más volumen y definición.',
    date: 'Mar 2026',
    initials: 'CT',
    verified: true,
  },
  {
    name: 'Daniela Morales',
    treatment: 'Rinomodelación',
    rating: 5,
    text: 'No podía creer que sin cirugía pudiera lograr ese cambio. El resultado es espectacular y muy natural. La doctora explica cada paso, te hace sentir segura y confiada durante todo el procedimiento.',
    date: 'Ene 2026',
    initials: 'DM',
    verified: true,
  },
  {
    name: 'Sofía Ramírez',
    treatment: 'Limpieza Facial + Plasma',
    rating: 5,
    text: 'Mi piel nunca había lucido tan bien. Desde la primera sesión noté la diferencia. El ambiente de la clínica es impecable, muy limpio y profesional. Totalmente recomendado.',
    date: 'Abr 2026',
    initials: 'SR',
    verified: true,
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#b8973e">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-[#f9f6f0]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
                Pacientes Reales
              </span>
            </div>
            <h2 className="text-[40px] lg:text-[52px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif">
              Lo que Dicen<br />
              <span className="text-[#b8973e]">Nuestros Pacientes</span>
            </h2>
          </div>

          {/* Google rating summary */}
          <div className="flex items-center gap-5 bg-white border border-[#e8e0d4] px-7 py-5 shadow-sm shrink-0">
            <div className="text-center">
              <div className="text-[36px] font-extrabold text-[#1a1612] leading-none">4.9</div>
              <Stars count={5} />
              <div className="text-[9px] font-medium text-[#6b7280] mt-1.5">500+ reseñas en Google</div>
            </div>
            <div className="w-px h-12 bg-[#e8e0d4]" />
            <div>
              {[5, 4, 3].map(n => (
                <div key={n} className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-medium text-[#6b7280] w-3">{n}</span>
                  <div className="w-20 h-1.5 bg-[#e8e0d4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#b8973e] rounded-full"
                      style={{ width: n === 5 ? '90%' : n === 4 ? '7%' : '3%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map(r => (
            <div
              key={r.name}
              className="bg-white border border-[#e8e0d4] hover:border-[#b8973e]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-400 p-7 group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#b8973e]/10 border border-[#b8973e]/25 flex items-center justify-center shrink-0">
                    <span className="text-[13px] font-bold text-[#b8973e] font-serif">{r.initials}</span>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#1a1612] font-serif leading-tight">{r.name}</div>
                    <div className="text-[10px] font-medium text-[#b8973e] mt-0.5">{r.treatment}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Stars count={r.rating} />
                  <span className="text-[9px] font-medium text-[#9a8e84]">{r.date}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="mb-3 text-[#b8973e]/20">
                  <path d="M0 22V13.2C0 5.8 4.4 1.4 13.2 0l1.4 2.8C10 4 7.8 6.4 7.2 10H12V22H0zm16 0V13.2C16 5.8 20.4 1.4 29.2 0l1.4 2.8C26 4 23.8 6.4 23.2 10H28V22H16z" fill="currentColor"/>
                </svg>
                <p className="text-[12px] font-medium leading-[1.85] text-[#4a4240]">{r.text}</p>
              </div>

              {/* Verified badge */}
              {r.verified && (
                <div className="mt-5 pt-4 border-t border-[#f0e8d8] flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#b8973e]">
                    Paciente Verificada
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="#consulta"
            className="inline-flex items-center gap-3 bg-[#1a1612] hover:bg-[#b8973e] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-10 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
          >
            Empieza tu Transformación
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
