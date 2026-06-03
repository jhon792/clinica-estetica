import { useState } from 'react'
import { waLink } from '../config'

const faqs = [
  {
    q: '¿Cuánto cuesta el botox en Bogotá?',
    a: 'El Botox Full Face en nuestra clínica tiene un precio desde $850.000 COP. El costo varía según las áreas a tratar y el protocolo personalizado. Ofrecemos consulta de valoración por $50.000 que se descuenta del tratamiento contratado. Contáctanos para un presupuesto personalizado.',
  },
  {
    q: '¿Cuánto duran los resultados de la armonización facial?',
    a: 'Los resultados con ácido hialurónico duran entre 9 y 18 meses según el área y el metabolismo de cada paciente. El botox tiene una duración de 4 a 6 meses. Recomendamos una cita de control al mes del tratamiento para asegurar resultados óptimos.',
  },
  {
    q: '¿Qué es el Endolaser y para qué sirve?',
    a: 'El Endolaser es nuestra tecnología láser de última generación certificada. En versión facial estimula el colágeno para tensar la piel y reducir arrugas con resultados visibles desde la 1ª sesión. En versión corporal elimina grasa localizada y moldea la silueta. Es un procedimiento no invasivo y sin tiempo de recuperación significativo.',
  },
  {
    q: '¿Es segura la medicina estética? ¿Qué certificaciones tienen?',
    a: 'Sí, completamente. Todos nuestros procedimientos son realizados por médicos certificados con más de 12 años de experiencia. Usamos únicamente productos aprobados por INVIMA, seguimos protocolos de bioseguridad internacionales y contamos con instalaciones IPS. Avalados por 500+ reseñas en Google con calificación 4.9/5.',
  },
  {
    q: '¿Cuántas sesiones de depilación láser necesito?',
    a: 'En promedio entre 6 y 8 sesiones para resultados permanentes. El número exacto depende del fototipo de piel, color y grosor del vello, y el área a tratar. Las sesiones se realizan cada 4 a 6 semanas siguiendo el ciclo de crecimiento del vello. Ofrecemos paquetes con descuento por múltiples sesiones.',
  },
  {
    q: '¿Qué incluye la consulta de valoración facial?',
    a: 'La valoración incluye análisis de proporciones áureas del rostro, evaluación del estado de la piel, diagnóstico médico personalizado, diseño de un plan de tratamiento con proyección de resultados, y resolución de todas tus dudas. Costo: $50.000 COP, que se descuenta si contratas el tratamiento.',
  },
  {
    q: '¿Dónde queda la clínica estética en Bogotá?',
    a: 'Estamos ubicados en Cra. 43 #18-101, Bogotá, Colombia. Atendemos de lunes a viernes de 8:00 a 19:00 y sábados de 9:00 a 16:00. Puedes contactarnos por WhatsApp al +57 300 123 4567 para agendar tu cita sin salir de casa.',
  },
  {
    q: '¿Tienen opciones de financiación o facilidades de pago?',
    a: 'Aceptamos tarjetas de crédito, débito y transferencias bancarias. Para procedimientos quirúrgicos manejamos planes de financiamiento personalizados adaptados a tu presupuesto. Contáctanos por WhatsApp para conocer las opciones disponibles para el tratamiento que deseas.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="preguntas-frecuentes" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#b8973e]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">
              Preguntas Frecuentes
            </span>
            <span className="w-8 h-px bg-[#b8973e]" />
          </div>
          <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.025em] font-serif mb-4">
            Todo lo que quieres<br />
            <span className="text-[#b8973e]">saber antes de tu cita</span>
          </h2>
          <p className="text-[14px] text-[#6b7280] font-medium max-w-lg mx-auto leading-relaxed">
            Resolvemos las dudas más comunes sobre medicina estética en Bogotá.
            ¿Tienes una pregunta diferente? Escríbenos por WhatsApp.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-14">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border transition-all duration-300 ${
                open === i
                  ? 'border-[#b8973e]/60 shadow-[0_4px_20px_rgba(184,151,62,0.12)]'
                  : 'border-[#e8e0d4] hover:border-[#b8973e]/40'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className={`text-[15px] font-bold leading-snug transition-colors duration-200 ${
                  open === i ? 'text-[#b8973e]' : 'text-[#1a1612]'
                }`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                  open === i
                    ? 'bg-[#b8973e] border-[#b8973e] rotate-45'
                    : 'border-[#e8e0d4] text-[#9a8e84]'
                }`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke={open === i ? 'white' : 'currentColor'} strokeWidth="2">
                    <path d="M6 2v8M2 6h8"/>
                  </svg>
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60' : 'max-h-0'}`}>
                <div className="px-6 pb-6">
                  <div className="w-8 h-px bg-[#b8973e]/40 mb-4" />
                  <p className="text-[13px] font-medium leading-[1.85] text-[#4a4240]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#f9f6f0] border border-[#e8e0d4] p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-[15px] font-bold text-[#1a1612] mb-1">¿Tienes otra pregunta?</p>
            <p className="text-[12px] text-[#6b7280] font-medium">
              Nuestro equipo responde en menos de 2 horas por WhatsApp.
            </p>
          </div>
          <a
            href={waLink('Hola! Tengo una pregunta sobre los tratamientos en Clínica Estética Premium Bogotá.')}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-300 shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
