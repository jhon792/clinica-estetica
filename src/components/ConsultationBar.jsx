import { useState } from 'react'

const serviceOptions = [
  'Armonización Facial',
  'Botox Full Face',
  'Labios Ácido Hialurónico',
  'Rinomodelación',
  'Endolaser Facial',
  'Limpieza Facial Profunda',
  'Péptidos',
  'Endolaser Corporal',
  'Depilación Láser',
  'Sueroterapia',
  'Remoción de Lunares',
  'Procedimiento Quirúrgico',
  'Otro tratamiento',
]

export default function ConsultationBar() {
  const [form, setForm] = useState({ name: '', email: '', date: '', service: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="consulta" className="bg-[#f9f6f0] border-y border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">

          {/* Label */}
          <div className="shrink-0 lg:max-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#b8973e]">Consulta Gratis</span>
            </div>
            <h2 className="text-[32px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.02em] font-serif">
              Agenda tu<br />Cita Hoy
            </h2>
            <p className="text-[11px] font-medium text-[#6b7280] mt-2 leading-relaxed">
              Sin compromiso. Respuesta en menos de 2 horas.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-16 bg-[#d4c4a0] shrink-0" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="col-span-2 lg:col-span-1 bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium placeholder-[#9a8e84] px-4 py-3.5 focus:border-[#b8973e] transition-all duration-200 rounded-none"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="col-span-2 lg:col-span-1 bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium placeholder-[#9a8e84] px-4 py-3.5 focus:border-[#b8973e] transition-all duration-200 rounded-none"
              />
              <input
                type="date"
                required
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium px-4 py-3.5 focus:border-[#b8973e] transition-all duration-200 rounded-none"
              />
              <select
                required
                value={form.service}
                onChange={e => setForm({ ...form, service: e.target.value })}
                className="bg-white border border-[#e8e0d4] text-[12px] font-medium px-4 py-3.5 focus:border-[#b8973e] transition-all duration-200 rounded-none"
                style={{ color: form.service ? '#1a1612' : '#9a8e84' }}
              >
                <option value="" disabled>Tipo de servicio</option>
                {serviceOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <button
                type="submit"
                className={`flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-all duration-300 ${
                  sent
                    ? 'bg-green-600 text-white'
                    : 'bg-[#1a1612] hover:bg-[#b8973e] text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)]'
                }`}
              >
                {sent ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    ¡Solicitud Enviada!
                  </>
                ) : (
                  <>
                    Reservar Cita
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
              <p className="text-[10px] font-medium text-[#9a8e84]">
                También por WhatsApp:{' '}
                <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer" className="text-[#b8973e] hover:underline font-semibold">
                  +57 300 123 4567
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
