import { useState } from 'react'

const SERVICE_IMG = {
  'Armonización facial / Botox full face': '/fotos/Control Botox.jpeg',
  'Labios Ácido Hialurónico': '/fotos/Labios Ácido Hialurónico.jpeg',
  'Rinomodelación': '/fotos/Rinomodelación.jpeg',
  'Mentón': '/fotos/Mentón.jpeg',
  'Esperma de Salmón': '/fotos/Esperma de Salmón.jpeg',
  'Hialuronidasa': '/fotos/Hialuronidasa.jpeg',
  'Endolaser Facial': '/fotos/Endolaser Facial.jpeg',
  'Limpieza Facial Profunda + Plasma': '/fotos/Limpieza Facial Profunda.jpeg',
  'Limpieza Facial Profunda': '/fotos/Limpieza Facial Profunda.jpeg',
  'Hidratación Labios con Hidrafiller': '/fotos/Hidratación Labios con Hidrafiller.jpeg',
  'Retoque Labios': '/fotos/Retoque Labios.jpeg',
  'Control Botox': '/fotos/Control Botox.jpeg',
  'Valoración Armonización Facial': '/fotos/Valoración Armonización Facial.jpeg',
  'Péptidos': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=85&auto=format&fit=crop',
  'Endolaser Corporal': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500&q=85&auto=format&fit=crop',
  'Depilación Láser': 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500&q=85&auto=format&fit=crop',
  'Sueroterapia': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=85&auto=format&fit=crop',
  'Enzimas': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=85&auto=format&fit=crop',
  'Ezosomas': 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=500&q=85&auto=format&fit=crop',
  'Remoción de Lunares': 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=500&q=85&auto=format&fit=crop',
  'Labios Técnica Suave': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=85&auto=format&fit=crop',
  'Peptonas-Vitamina C': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=85&auto=format&fit=crop',
  'Liposucción': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=85&auto=format&fit=crop',
  'Lipectomía (abdominoplastia)': 'https://images.unsplash.com/photo-1551590192-8070a16d9f67?w=500&q=85&auto=format&fit=crop',
  'Balón Gástrico': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=85&auto=format&fit=crop',
  'Lipoescultura 360°': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=85&auto=format&fit=crop',
  'Gluteoplastia (aumento de glúteos)': 'https://images.unsplash.com/photo-1498757581981-8ddb3c0b9b07?w=500&q=85&auto=format&fit=crop',
  'Mastopexia (levantamiento de senos)': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85&auto=format&fit=crop',
  'Rinoplastia': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=85&auto=format&fit=crop',
  'Blefaroplastia (párpados)': 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf?w=500&q=85&auto=format&fit=crop',
}

const categories = [
  {
    id: 'facial',
    label: 'Facial & Armonización',
    services: [
      { name: 'Armonización facial / Botox full face', duration: '60 min', price: '$850.000', desc: 'Botox premium para un rostro fresco, joven y armonioso.' },
      { name: 'Labios Ácido Hialurónico', duration: '30 min', price: '$900.000', desc: 'Labios más voluminosos y definidos de forma natural y hidratada.' },
      { name: 'Rinomodelación', duration: '60 min', price: '$850.000', desc: 'Define y eleva tu nariz sin cirugía con resultados inmediatos.' },
      { name: 'Mentón', duration: '30 min', price: '$850.000', desc: 'Proyecta tu perfil y armoniza tu rostro con precisión milimétrica.' },
      { name: 'Esperma de Salmón', duration: '30 min', price: '$1.200.000', desc: 'Tres sesiones para regeneración celular profunda y bioestimulación.' },
      { name: 'Hialuronidasa', duration: '20 min', price: '$150.000', desc: 'Disuelve o ajusta ácido hialurónico previo de forma segura.' },
      { name: 'Endolaser Facial', duration: '120 min', price: '$1.500.000', desc: 'Tecnología láser para rejuvenecimiento facial profundo y duradero.' },
      { name: 'Limpieza Facial Profunda + Plasma', duration: '60 min', price: '$150.000', desc: 'Limpieza profesional potenciada con plasma rico en plaquetas.' },
      { name: 'Limpieza Facial Profunda', duration: '60 min', price: '$100.000', desc: 'Limpieza intensiva para una piel radiante y libre de impurezas.' },
      { name: 'Hidratación Labios con Hidrafiller', duration: '20 min', price: '$150.000', desc: 'Hidratación profunda y volumen natural para unos labios perfectos.' },
      { name: 'Retoque Labios', duration: '30 min', price: '$450.000', desc: 'Perfecciona y mantiene los resultados de tratamientos previos.' },
      { name: 'Control Botox', duration: '30 min', price: '$50.000', desc: 'Seguimiento y ajuste preciso de tratamientos de botox anteriores.' },
      { name: 'Valoración Armonización Facial', duration: '30 min', price: '$50.000', desc: 'Consulta diagnóstica personalizada para planificar tu tratamiento.' },
    ],
  },
  {
    id: 'corporal',
    label: 'Corporal & Bienestar',
    services: [
      { name: 'Péptidos', duration: '30 min', price: '$1.500.000', desc: 'Tratamiento de pérdida de peso progresivo y bienestar integral.' },
      { name: 'Endolaser Corporal', duration: '120 min', price: '$1.800.000', desc: 'Moldea tu cuerpo eliminando grasa localizada con tecnología láser.' },
      { name: 'Depilación Láser', duration: '30 min', price: '$80.000', desc: 'Definitiva y sin dolor con tecnología para resultados permanentes.' },
      { name: 'Sueroterapia', duration: '30 min', price: '$220.000', desc: 'Nutre tu cuerpo con vitaminas y minerales esenciales vía IV.' },
      { name: 'Enzimas', duration: '30 min', price: '$250.000', desc: 'Tratamiento enzimático para potenciar la renovación celular activa.' },
      { name: 'Ezosomas', duration: '30 min', price: '$350.000', desc: 'Terapia de vanguardia para regeneración tisular profunda y efectiva.' },
    ],
  },
  {
    id: 'otros',
    label: 'Otros Tratamientos',
    services: [
      { name: 'Remoción de Lunares', duration: '30 min', price: '$150.000', desc: 'Sin dolor, segura y rápida. Resultados definitivos en tu piel.' },
      { name: 'Labios Técnica Suave', duration: '30 min', price: '$850.000', desc: 'Labios más jugosos y definidos. Haz brillar tu sonrisa.' },
      { name: 'Peptonas-Vitamina C', duration: '20 min', price: '$60.000', desc: 'Cóctel vitamínico revitalizante para luminosidad y firmeza inmediata.' },
    ],
  },
  {
    id: 'quirurgicos',
    label: 'Cirugía Estética',
    services: [
      { name: 'Liposucción', duration: '2–4 h', desc: 'Elimina depósitos de grasa resistentes y moldea tu silueta.' },
      { name: 'Lipectomía (abdominoplastia)', duration: '2–3 h', desc: 'Abdomen plano y firme. Retira exceso de piel y reafirma musculatura.' },
      { name: 'Balón Gástrico', duration: '30 min', desc: 'Procedimiento mínimamente invasivo para pérdida de peso progresiva.' },
      { name: 'Lipoescultura 360°', duration: '3–5 h', desc: 'Redefinición integral del contorno corporal en alta definición.' },
      { name: 'Gluteoplastia (aumento de glúteos)', duration: '2–3 h', desc: 'Glúteos proyectados y naturales adaptados a tu anatomía.' },
      { name: 'Mastopexia (levantamiento de senos)', duration: '2–3 h', desc: 'Recupera la firmeza del busto con resultados estéticos duraderos.' },
      { name: 'Rinoplastia', duration: '2–3 h', desc: 'Refinamiento quirúrgico para lograr armonía facial perfecta.' },
      { name: 'Blefaroplastia (párpados)', duration: '1–2 h', desc: 'Rejuvenece la mirada con una expresión fresca y descansada.' },
    ],
  },
]

function ServiceCard({ service }) {
  const [hov, setHov] = useState(false)
  const img = SERVICE_IMG[service.name]

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white border border-[#e8e0d4] hover:border-[#b8973e]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-all duration-400 flex flex-col overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#f9f6f0] shrink-0">
        {img ? (
          <img
            src={img}
            alt={service.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700"
            style={{ transform: hov ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L28 10L28 22L16 28L4 22L4 10Z" stroke="#b8973e" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="16" r="2.5" fill="#b8973e"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        {/* Gold top bar on hover */}
        <div className={`absolute top-0 left-0 h-0.5 bg-[#b8973e] transition-all duration-500 ${hov ? 'w-full' : 'w-0'}`} />
        {/* Price badge */}
        {service.price && (
          <div className="absolute bottom-3 right-3 bg-[#0f0d0b]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1">
            {service.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-5 flex-1">
        <h4 className="text-[16px] font-bold text-[#1a1612] group-hover:text-[#b8973e] transition-colors duration-300 leading-tight font-serif">
          {service.name}
        </h4>
        <div className="w-6 h-px bg-[#b8973e]/50" />
        <p className="text-[11px] leading-[1.75] text-[#6b7280] font-medium flex-1">{service.desc}</p>
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-[#f0e8d8]">
          <div className="flex items-center gap-1.5 text-[#9a8e84]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span className="text-[10px] font-medium">{service.duration}</span>
          </div>
          <a
            href="#consulta"
            className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#1a1612] hover:text-[#b8973e] flex items-center gap-1.5 transition-colors duration-200"
          >
            Reservar
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 5h6M5 2l3 3-3 3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('facial')
  const active = categories.find(c => c.id === activeTab)

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Procedimientos Certificados
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[40px] lg:text-[52px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif">
              Tratamientos &<br />Servicios
            </h2>
            <a
              href="#consulta"
              className="hidden sm:inline-flex items-center gap-2 border-2 border-[#1a1612] text-[#1a1612] hover:bg-[#1a1612] hover:text-white text-[11px] font-bold tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-300 self-end"
            >
              Agendar Cita
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-[#e8e0d4] pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-5 py-3 text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-200 -mb-px ${
                activeTab === cat.id
                  ? 'text-[#b8973e] border-b-2 border-[#b8973e]'
                  : 'text-[#6b7280] hover:text-[#1a1612] border-b-2 border-transparent'
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                activeTab === cat.id ? 'bg-[#b8973e]/15 text-[#b8973e]' : 'bg-[#f0e8d8] text-[#9a8e84]'
              }`}>
                {cat.services.length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {active.services.map(svc => (
            <ServiceCard key={svc.name} service={svc} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-10 border-t border-[#e8e0d4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-medium text-[#6b7280]">
            ¿No encuentras lo que buscas? Contáctanos para una valoración personalizada.
          </p>
          <a
            href="#consulta"
            className="flex items-center gap-3 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 shadow-[0_4px_20px_rgba(184,151,62,0.3)]"
          >
            Agenda tu Consulta Gratuita
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
