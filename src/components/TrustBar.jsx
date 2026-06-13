const items = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="2">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    label: 'Médicos Certificados',
    sub: 'Especialistas avalados IPS',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    label: '4.9 / 5 en Google',
    sub: '500+ reseñas verificadas',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: '12+ Años de Experiencia',
    sub: 'Trayectoria en medicina estética',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    label: '2.500+ Pacientes',
    sub: 'Resultados seguros y medibles',
  },
]

export default function TrustBar() {
  return (
    <div className="bg-[#0f0d0b] py-7">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#2a2420]">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 lg:px-8 first:pl-0 last:pr-0">
              <div className="w-11 h-11 rounded-full border border-[#b8973e]/30 flex items-center justify-center shrink-0 bg-[#b8973e]/5">
                {item.icon}
              </div>
              <div>
                <div className="text-[13px] font-bold text-white leading-tight">{item.label}</div>
                <div className="text-[10px] font-medium text-[#9a8e84] mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
