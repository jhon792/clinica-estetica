import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { scrollTo } from '../lib/motion'
import SocialIcon, { GoogleMapsIcon } from '../components/SocialIcon'
import {
  CLINIC_LEGAL, SURGEON, EMAIL, PHONE, ADDRESS, CITY,
  GOOGLE_MAPS_URL, GOOGLE_MAPS_EMBED, SOCIALS, BRAND, waLink, WA_MSG_DEFAULT,
} from '../config'

const COLS = [
  {
    title: 'Instituto',
    items: [
      { label: 'Filosofía', id: 'filosofia' },
      { label: 'La Cirujana', id: 'cirujana' },
      { label: 'Instalaciones', id: 'instalaciones' },
      { label: 'Tecnología', id: 'tecnologia' },
    ],
  },
  {
    title: 'Procedimientos',
    items: [
      { label: 'Resultados', id: 'resultados' },
      { label: 'Antes y después', id: 'comparador' },
      { label: 'Especialidades', id: 'especialidades' },
      { label: 'Proceso', id: 'proceso' },
    ],
  },
]

export default function Footer() {
  const root = useReveal({ threshold: 0.05 })
  const year = new Date().getFullYear()

  return (
    <footer ref={root} data-cursor-bg="dark" className="on-dark relative overflow-hidden bg-ink pt-24 md:pt-32">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-12 md:gap-x-10">
          <div className="col-span-2 md:col-span-4">
            <p className="rise eyebrow mb-6">Reserve su consulta</p>
            <button
              onClick={() => scrollTo('#reserva')}
              data-cursor="link"
              className="group block text-left"
            >
              <span className="rise block font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-light leading-[1.14] text-ivory" style={{ '--d': '80ms' }}>
                Noventa minutos<br />que cambian<br />la decisión.
              </span>
              <span className="rise mt-8 flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-ivory/20 transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-ivory group-hover:text-ink" style={{ '--d': '200ms' }}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

          {COLS.map((col, ci) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2 md:col-start-auto">
              <p className="rise eyebrow mb-6" style={{ '--d': `${120 + ci * 60}ms` }}>{col.title}</p>
              <ul className="space-y-3.5">
                {col.items.map((it, i) => (
                  <li key={it.id} className="rise" style={{ '--d': `${200 + ci * 60 + i * 40}ms` }}>
                    <button
                      onClick={() => scrollTo(`#${it.id}`)}
                      data-cursor="link"
                      className="group relative text-[13px] font-light text-mist transition-colors duration-500 hover:text-ivory"
                    >
                      {it.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ivory/50 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-3 md:col-start-10">
            <p className="rise eyebrow mb-6" style={{ '--d': '300ms' }}>Contacto</p>
            <address className="space-y-3.5 not-italic">
              {[
                { label: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
                { label: EMAIL, href: `mailto:${EMAIL}` },
                { label: 'WhatsApp', href: waLink(WA_MSG_DEFAULT), ext: true },
              ].map((l, i) => (
                <div key={l.label} className="rise" style={{ '--d': `${360 + i * 40}ms` }}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noreferrer' } : {})}
                    data-cursor="link"
                    className="group relative text-[13px] font-light text-mist transition-colors duration-500 hover:text-ivory"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ivory/50 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                  </a>
                </div>
              ))}
              <div className="rise pt-2" style={{ '--d': '520ms' }}>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="text-[13px] font-light leading-relaxed text-mist transition-colors duration-500 hover:text-ivory"
                >
                  {ADDRESS}<br />{CITY}, Colombia
                </a>
              </div>
            </address>

            {/* Redes: iconos de trazo, misma línea que el resto de la interfaz. */}
            <div className="rise mt-8 flex items-center gap-3" style={{ '--d': '560ms' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  aria-label={s.label}
                  className="group/soc relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-mist ring-1 ring-ivory/15 transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-transparent"
                >
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/soc:opacity-100"
                    style={{ background: BRAND[s.key].hoverBg }}
                  />
                  <SocialIcon
                    name={s.key}
                    size={17}
                    className={`relative transition-[color,filter] duration-500 group-hover/soc:text-white ${
                      s.key === 'tiktok'
                        ? 'group-hover/soc:[filter:drop-shadow(1.4px_0_0_#FE2C55)_drop-shadow(-1.4px_0_0_#25F4EE)]'
                        : ''
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mapa: monocromo para no romper la paleta. Diferido, y solo se
            carga cuando entra en viewport — un iframe de Maps es pesado. */}
        <MapPanel />

        {/* Logotipo a sangre: la última palabra de la página. Va en SVG, no en
            texto, porque a 0,09 de opacidad es una filigrana — y una filigrana
            no debe presentarse a una auditoría de contraste como si fuera
            contenido legible. */}
        <div className="mt-24 md:mt-32">
          <div className="rule h-px w-full bg-ivory/12" />
          <svg
            viewBox="0 0 1000 172"
            aria-hidden="true"
            focusable="false"
            className="rise mt-10 w-full select-none"
            style={{ '--d': '200ms' }}
          >
            <text
              x="500"
              y="130"
              textAnchor="middle"
              fill="#FBFAF7"
              fillOpacity="0.09"
              fontSize="150"
              fontWeight="300"
              letterSpacing="4"
              fontFamily="Zodiak, serif"
            >
              MARBRE
            </text>
          </svg>
        </div>

        {/* El botón flotante de WhatsApp ocupa la esquina inferior derecha.
            Esta franja se aparta para que no le pise la letra pequeña. */}
        <div className="flex flex-col gap-6 border-t border-ivory/10 pb-28 pt-9 md:flex-row md:items-center md:justify-between md:pb-9 md:pr-48">
          <p className="text-[11px] leading-relaxed text-mist/80">
            © {year} {CLINIC_LEGAL} · {SURGEON} · Reg. SCCP 4412
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="#" data-cursor="link" className="text-[11px] text-mist/80 transition-colors hover:text-ivory">Política de privacidad</a>
            <a href="#" data-cursor="link" className="text-[11px] text-mist/80 transition-colors hover:text-ivory">Tratamiento de datos</a>
            <button
              onClick={() => scrollTo('#inicio')}
              data-cursor="link"
              className="group flex items-center gap-2.5 text-[11px] text-mist/80 transition-colors hover:text-ivory"
            >
              Volver arriba
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1" aria-hidden="true">
                <path d="M5 9V1M1.5 4.5L5 1l3.5 3.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * Panel de mapa.
 *
 * El iframe de Google Maps solo se inserta cuando el footer se acerca al
 * viewport: montarlo de entrada añadiría cientos de KB y peticiones a terceros
 * a una carga que hemos peleado por mantener en 222 KB. Hasta entonces se ve
 * una plancha con la dirección, que además es lo que aparece si el usuario
 * bloquea contenido de Google.
 *
 * El filtro monocromo alinea el mapa con la paleta; se retira en hover para
 * que la lectura de calles sea nítida cuando el usuario va a usarlo de verdad.
 */
function MapPanel() {
  const ref = useRef(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLoad(true); io.disconnect() } },
      { rootMargin: '400px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="rise mt-20 md:mt-28" style={{ '--d': '120ms' }}>
      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">Cómo llegar</p>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="group relative flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase text-mist transition-colors hover:text-ivory"
        >
          <GoogleMapsIcon size={15} className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110" />
          Abrir en Google Maps
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ivory/50 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
        </a>
      </div>

      <div className="group relative h-[240px] w-full overflow-hidden bg-[#0a0908] ring-1 ring-ivory/10 md:h-[340px]">
        {load ? (
          <iframe
            title={`Ubicación de ${CLINIC_LEGAL} en el mapa`}
            src={GOOGLE_MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 opacity-95 transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-100"
            style={{ filter: 'grayscale(1) contrast(0.95)' }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0) contrast(1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1) contrast(0.95)' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[13px] font-light text-mist">{ADDRESS} · {CITY}</p>
          </div>
        )}
      </div>
    </div>
  )
}
