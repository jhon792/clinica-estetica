const serviceLinks = [
  'Armonización Facial',
  'Labios Ácido Hialurónico',
  'Rinomodelación',
  'Endolaser Facial',
  'Depilación Láser',
  'Sueroterapia',
]

const infoLinks = [
  'Sobre Nosotros',
  'Tecnología',
  'Galería',
  'Preguntas Frecuentes',
  'Política de Privacidad',
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
]

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#0f0d0b] text-[#9a8e84]">

      {/* Location + Map */}
      <div className="border-b border-[#1e1a17]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Address */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#b8973e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#b8973e]">Ubicación</span>
            </div>
            <h3 className="text-[30px] font-extrabold text-white mb-8 leading-tight font-serif">
              Visítanos en<br />
              <span className="text-[#b8973e]">Villavicencio, Meta</span>
            </h3>

            <div className="space-y-5">
              {[
                {
                  icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/>,
                  label: 'Dirección',
                  value: 'Cra. 43 #18-101, Villavicencio · Meta, Colombia',
                  href: null,
                },
                {
                  icon: <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>,
                  label: 'Teléfono',
                  value: '+57 300 123 4567',
                  href: 'tel:+573001234567',
                },
                {
                  icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></>,
                  label: 'Email',
                  value: 'info@clinicaestetica.co',
                  href: 'mailto:info@clinicaestetica.co',
                },
                {
                  icon: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
                  label: 'Horario',
                  value: 'Lun–Vie: 8:00–19:00 · Sáb: 9:00–16:00',
                  href: null,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full border border-[#b8973e]/25 flex items-center justify-center shrink-0 mt-0.5 bg-[#b8973e]/5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8973e" strokeWidth="1.5">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280] mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-[12px] font-medium text-[#9a8e84] hover:text-[#b8973e] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[12px] font-medium text-[#9a8e84]">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[360px] overflow-hidden border border-[#2a2420]">
            <iframe
              title="Ubicación Clínica"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-73.6321!3d4.1421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCra.+43+%2318-101%2C+Villavicencio!5e0!3m2!1ses!2sco!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(90%) contrast(1.05) brightness(0.85)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 border border-[#b8973e]/25 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-[#b8973e]/10 border border-[#b8973e]/25 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L28 10L28 22L16 28L4 22L4 10Z" stroke="#b8973e" strokeWidth="1.5" fill="none"/>
                <circle cx="16" cy="16" r="2.5" fill="#b8973e"/>
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-bold tracking-[0.2em] uppercase text-white">Clínica</div>
              <div className="text-[9px] font-medium tracking-[0.25em] uppercase text-[#b8973e]">Estética Premium</div>
            </div>
          </div>
          <p className="text-[11px] font-medium leading-[1.8] text-[#6b7280] mb-6">
            Medicina estética de vanguardia en el corazón de Villavicencio. Tu belleza, nuestra pasión.
          </p>
          <div className="flex items-center gap-2.5">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-[#2a2420] hover:border-[#b8973e] hover:bg-[#b8973e]/10 flex items-center justify-center transition-all duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#9a8e84">
                  <path d={s.path}/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white mb-5">Tratamientos</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map(s => (
              <li key={s}>
                <a href="#servicios" className="flex items-center gap-2 text-[11px] font-medium text-[#6b7280] hover:text-[#b8973e] transition-colors">
                  <span className="w-1 h-1 rounded-full bg-[#b8973e]/40 shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white mb-5">Información</h4>
          <ul className="space-y-2.5">
            {infoLinks.map(link => (
              <li key={link}>
                <a href="#" className="flex items-center gap-2 text-[11px] font-medium text-[#6b7280] hover:text-[#b8973e] transition-colors">
                  <span className="w-1 h-1 rounded-full bg-[#b8973e]/40 shrink-0" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* WhatsApp CTA */}
        <div>
          <h4 className="text-[10px] font-bold tracking-[0.22em] uppercase text-white mb-5">Contacto Rápido</h4>
          <p className="text-[11px] font-medium text-[#6b7280] leading-[1.8] mb-5">
            ¿Tienes dudas? Escríbenos por WhatsApp y te respondemos de inmediato.
          </p>
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] text-[#25D366] hover:text-white text-[10px] font-bold tracking-[0.12em] uppercase px-5 py-3 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e1a17]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-medium tracking-wide text-[#3a3330]">
            © 2026 Clínica Estética Premium · Villavicencio, Meta, Colombia
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-[#b8973e]/25" />
            <div className="w-1 h-1 rounded-full bg-[#b8973e]/40" />
            <div className="h-px w-8 bg-[#b8973e]/25" />
          </div>
          <p className="text-[10px] font-medium tracking-wide text-[#3a3330]">
            Medicina Estética Avanzada
          </p>
        </div>
      </div>
    </footer>
  )
}
