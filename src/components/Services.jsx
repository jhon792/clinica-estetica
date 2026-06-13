import { useState } from 'react'
import { waLink, WA_MSG_SERVICE } from '../config'

const UNS = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=85&auto=format&fit=crop`

const SERVICE_IMG = {
  // Fotos propias de la clínica
  'Armonización facial / Botox full face': '/fotos/Control Botox.jpeg',
  'Labios Ácido Hialurónico':             '/fotos/Labios Ácido Hialurónico.jpeg',
  'Rinomodelación':                       '/fotos/Rinomodelación.jpeg',
  'Hialuronidasa':                        '/fotos/Hialuronidasa.jpeg',
  'Endolaser Facial':                     '/fotos/Endolaser Facial.jpeg',
  'Limpieza Facial Profunda + Plasma':    '/fotos/Limpieza Facial Profunda.jpeg',
  'Hidratación Labios con Hidrafiller':   '/fotos/Hidratación Labios con Hidrafiller.jpeg',
  'Retoque Labios':                       '/fotos/Retoque Labios.jpeg',
  'Control Botox':                        '/fotos/Control Botox.jpeg',

  // Corporal & Bienestar
  'Péptidos':           UNS('1591384658362-1105c821611c'), // cuerpo esbelto en ropa deportiva
  'Endolaser Corporal': UNS('1717500251979-8a53b300d88b'), // mujer junto a máquina de tratamiento corporal
  'Depilación Láser':   UNS('1746806942799-b4db209e9a6b'), // profesional aplicando láser sobre paciente
  'Sueroterapia':       UNS('1516574187841-cb9cc2ca948b'), // suero IV médico en soporte clínico
  'Enzimas':            UNS('1605552986371-d78779ebe38b'), // primer plano textura de piel
  'Ezosomas':           UNS('1710580889701-9fa8f2cd5927'), // piel saludable en detalle

  // Otros Tratamientos
  'Remoción de Lunares':  UNS('1541752857837-f8a0154fd092'), // piel con manchas — zona a tratar
  'Labios Técnica Suave': UNS('1654374504608-67c4cfe65fca'), // primer plano labios y nariz
  'Peptonas-Vitamina C':  UNS('1723951174326-2a97221d3b7f'), // vitamina C con limones

  // Cirugía Estética
  'Liposucción':                          UNS('1747398594110-70ac0f75e3bc'), // primer plano abdomen
  'Lipectomía (abdominoplastia)':         UNS('1570454564834-efe597f09fe4'), // perfil artístico zona abdominal
  'Balón Gástrico':                       UNS('1675270444770-1a6d1f69aefc'), // mujer midiendo cintura
  'Lipoescultura 360°':                   UNS('1646909876562-9a00dab98e65'), // silueta corporal esculpida
  'Gluteoplastia (aumento de glúteos)':   UNS('1539272063674-aa6bdb6f1e32'), // perfil lateral cadera/glúteo
  'Mastopexia (levantamiento de senos)':  UNS('1769029271063-64e3084529f2'), // medición de contorno de busto
  'Rinoplastia':                          UNS('1762114468798-b3983219b584'), // perfil facial — nariz
  'Blefaroplastia (párpados)':            UNS('1483519173755-be893fab1f46'), // macro ojo humano
}

const categories = [
  {
    id: 'facial',
    label: 'Facial & Armonización',
    imgFocus: 'center 22%',
    services: [
      { name: 'Armonización facial / Botox full face', duration: '60 min', price: '$850.000', desc: 'Botox premium para un rostro fresco, joven y armonioso.', imgFocus: 'center 18%' },
      { name: 'Labios Ácido Hialurónico', duration: '30 min', price: '$900.000', desc: 'Labios más voluminosos y definidos de forma natural y hidratada.', imgFocus: 'center 62%' },
      { name: 'Rinomodelación', duration: '60 min', price: '$850.000', desc: 'Define y eleva tu nariz sin cirugía con resultados inmediatos.', imgFocus: 'center 40%' },
      { name: 'Hialuronidasa', duration: '20 min', price: '$150.000', desc: 'Disuelve o ajusta ácido hialurónico previo de forma segura.' },
      { name: 'Endolaser Facial', duration: '120 min', price: '$1.500.000', desc: 'Tecnología láser para rejuvenecimiento facial profundo y duradero.' },
      { name: 'Limpieza Facial Profunda + Plasma', duration: '60 min', price: '$150.000', desc: 'Limpieza profesional potenciada con plasma rico en plaquetas.' },
      { name: 'Hidratación Labios con Hidrafiller', duration: '20 min', price: '$150.000', desc: 'Hidratación profunda y volumen natural para unos labios perfectos.', imgFocus: 'center 62%' },
      { name: 'Retoque Labios', duration: '30 min', price: '$450.000', desc: 'Perfecciona y mantiene los resultados de tratamientos previos.', imgFocus: 'center 62%' },
      { name: 'Control Botox', duration: '30 min', price: '$50.000', desc: 'Seguimiento y ajuste preciso de tratamientos de botox anteriores.', imgFocus: 'center 18%' },
    ],
  },
  {
    id: 'corporal',
    label: 'Corporal & Bienestar',
    imgFocus: 'center 50%',
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
    imgFocus: 'center 35%',
    services: [
      { name: 'Remoción de Lunares', duration: '30 min', price: '$150.000', desc: 'Sin dolor, segura y rápida. Resultados definitivos en tu piel.' },
      { name: 'Labios Técnica Suave', duration: '30 min', price: '$850.000', desc: 'Labios más jugosos y definidos. Haz brillar tu sonrisa.', imgFocus: 'center 62%' },
      { name: 'Peptonas-Vitamina C', duration: '20 min', price: '$60.000', desc: 'Cóctel vitamínico revitalizante para luminosidad y firmeza inmediata.' },
    ],
  },
  {
    id: 'quirurgicos',
    label: 'Cirugía Estética',
    imgFocus: 'center 40%',
    services: [
      { name: 'Liposucción', duration: '2–4 h', desc: 'Elimina depósitos de grasa resistentes y moldea tu silueta.', imgFocus: 'center 50%' },
      { name: 'Lipectomía (abdominoplastia)', duration: '2–3 h', desc: 'Abdomen plano y firme. Retira exceso de piel y reafirma musculatura.', imgFocus: 'center 50%' },
      { name: 'Balón Gástrico', duration: '30 min', desc: 'Procedimiento mínimamente invasivo para pérdida de peso progresiva.', imgFocus: 'center 50%' },
      { name: 'Lipoescultura 360°', duration: '3–5 h', desc: 'Redefinición integral del contorno corporal en alta definición.', imgFocus: 'center 50%' },
      { name: 'Gluteoplastia (aumento de glúteos)', duration: '2–3 h', desc: 'Glúteos proyectados y naturales adaptados a tu anatomía.', imgFocus: 'center 50%' },
      { name: 'Mastopexia (levantamiento de senos)', duration: '2–3 h', desc: 'Recupera la firmeza del busto con resultados estéticos duraderos.', imgFocus: 'center 50%' },
      { name: 'Rinoplastia', duration: '2–3 h', desc: 'Refinamiento quirúrgico para lograr armonía facial perfecta.', imgFocus: 'center 38%' },
      { name: 'Blefaroplastia (párpados)', duration: '1–2 h', desc: 'Rejuvenece la mirada con una expresión fresca y descansada.', imgFocus: 'center 30%' },
    ],
  },
]

function ServiceCard({ service, defaultImgFocus = 'center 50%' }) {
  const [hov, setHov] = useState(false)
  const img = SERVICE_IMG[service.name]
  const imgFocus = service.imgFocus || defaultImgFocus

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white border border-[#e8e0d4] hover:border-[#b8973e]/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-all duration-400 flex flex-col overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden bg-[#f9f6f0] shrink-0">
        {img ? (
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              transform: hov ? 'scale(1.08)' : 'scale(1.0)',
              transformOrigin: imgFocus,
            }}
          >
            <img
              src={img}
              alt={service.name}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ objectPosition: imgFocus }}
            />
          </div>
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
            href={waLink(WA_MSG_SERVICE(service.name))}
            target="_blank"
            rel="noreferrer"
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

const MOBILE_LIMIT = 6

function MobileExpandableGrid({ services, imgFocus }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? services : services.slice(0, MOBILE_LIMIT)
  const hasMore = services.length > MOBILE_LIMIT

  return (
    <>
      {/* Desktop: always all */}
      <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map(svc => (
          <ServiceCard key={svc.name} service={svc} defaultImgFocus={imgFocus} />
        ))}
      </div>

      {/* Mobile: limited + Ver más */}
      <div className="grid sm:hidden grid-cols-1 gap-5">
        {visible.map(svc => (
          <ServiceCard key={svc.name} service={svc} defaultImgFocus={imgFocus} />
        ))}
        {hasMore && (
          <button
            onClick={() => setShowAll(v => !v)}
            className="flex items-center justify-center gap-2 border-2 border-[#b8973e] text-[#b8973e] text-[11px] font-bold tracking-[0.12em] uppercase px-6 py-4 transition-all duration-300 hover:bg-[#b8973e] hover:text-white"
          >
            {showAll ? 'Ver menos' : `Ver más (${services.length - MOBILE_LIMIT} más)`}
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        )}
      </div>
    </>
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
        <MobileExpandableGrid services={active.services} imgFocus={active.imgFocus} />

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
