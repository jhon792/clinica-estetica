import { useState } from 'react'
import { WA_NUMBER, PHONE } from '../config'

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
  const [form, setForm] = useState({ name: '', phone: '', date: '', service: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    const dateFormatted = form.date
      ? new Date(form.date + 'T12:00:00').toLocaleDateString('es-CO', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })
      : 'Por definir'

    const msg =
      `Hola! Quiero agendar una cita en *Clínica Estética Premium Bogotá* 📅\n\n` +
      `*Nombre:* ${form.name}\n` +
      `*Tratamiento:* ${form.service || 'Por consultar'}\n` +
      `*Fecha preferida:* ${dateFormatted}\n` +
      `*Teléfono:* ${form.phone || 'Mismo WhatsApp'}\n\n` +
      `¿Tienen disponibilidad?`

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    )

    setTimeout(() => setSending(false), 1500)
  }

  return (
    <section id="consulta" className="bg-[#f9f6f0] border-y border-[#e8e0d4]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">

          {/* Label */}
          <div className="shrink-0 lg:max-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#b8973e]">Consulta Gratis</span>
            </div>
            <h2 className="text-[32px] font-extrabold text-[#1a1612] leading-tight tracking-[-0.02em] font-serif">
              Agenda tu<br />Cita Hoy
            </h2>
            <p className="text-[11px] font-medium text-[#6b7280] mt-2 leading-relaxed">
              Te contactamos en menos de 2 horas.
            </p>
            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Quiero información sobre sus tratamientos en Bogotá.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[11px] font-bold text-[#25D366] hover:underline"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir directamente
            </a>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-20 bg-[#d4c4a0] shrink-0" />

          {/* Form — envía a WhatsApp */}
          <form onSubmit={handleSubmit} className="flex-1 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="col-span-2 lg:col-span-1 bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium placeholder-[#9a8e84] px-4 py-3.5 focus:border-[#b8973e] focus:outline-none transition-all duration-200"
              />
              <input
                type="tel"
                placeholder="WhatsApp / Teléfono"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="col-span-2 lg:col-span-1 bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium placeholder-[#9a8e84] px-4 py-3.5 focus:border-[#b8973e] focus:outline-none transition-all duration-200"
              />
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="bg-white border border-[#e8e0d4] text-[#1a1612] text-[12px] font-medium px-4 py-3.5 focus:border-[#b8973e] focus:outline-none transition-all duration-200"
              />
              <select
                required
                value={form.service}
                onChange={e => setForm({ ...form, service: e.target.value })}
                className="bg-white border border-[#e8e0d4] text-[12px] font-medium px-4 py-3.5 focus:border-[#b8973e] focus:outline-none transition-all duration-200"
                style={{ color: form.service ? '#1a1612' : '#9a8e84' }}
              >
                <option value="" disabled>Tipo de tratamiento</option>
                {serviceOptions.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.06em] uppercase px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_3px_14px_rgba(37,211,102,0.3)] transition-all duration-300 disabled:opacity-70"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {sending ? 'Abriendo WhatsApp…' : 'Reservar por WhatsApp'}
              </button>
              <p className="text-[10px] font-medium text-[#9a8e84]">
                O llámanos:{' '}
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-[#b8973e] hover:underline font-semibold">
                  {PHONE}
                </a>
              </p>
            </div>

            {/* Trust signals */}
            <div className="mt-4 flex flex-wrap items-center gap-5">
              {[
                { icon: '🔒', label: 'Datos protegidos' },
                { icon: '⚡', label: 'Respuesta en 2 horas' },
                { icon: '🎁', label: 'Consulta sin costo' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-1.5">
                  <span className="text-[11px]">{t.icon}</span>
                  <span className="text-[10px] font-medium text-[#9a8e84]">{t.label}</span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
