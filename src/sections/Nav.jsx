import { Fragment, useEffect, useRef, useState } from 'react'
import { scrollTo } from '../lib/motion'
import { useContent, useLang } from '../i18n'
import { LANGS } from '../content'
import { EMAIL, PHONE, INSTAGRAM, ADDRESS, CITY, waLink } from '../config'

/** Selector de idioma. `dark` invierte los tonos para el overlay. */
function LangToggle({ compact = false, dark = false }) {
  const { lang, setLang } = useLang()
  const c = useContent()
  const active = dark ? 'text-ivory' : 'text-ink'
  // Tonos inactivos que cumplen contraste AA: mist (8.4:1 sobre tinta) y
  // stone (5.3:1 sobre marfil). El activo destaca igual por ser pleno.
  const idle = dark ? 'text-mist hover:text-ivory' : 'text-stone hover:text-ink'
  const sep = dark ? 'text-ivory/25' : 'text-ink/20'
  return (
    <div className="flex shrink-0 items-center gap-1.5" role="group" aria-label={c.nav.langLabel}>
      {LANGS.map((l, i) => (
        <Fragment key={l.code}>
          {i > 0 && <span className={`text-[10px] ${sep}`} aria-hidden="true">/</span>}
          <button
            onClick={() => setLang(l.code)}
            data-cursor="link"
            aria-pressed={lang === l.code}
            lang={l.code}
            className={`text-[11px] tracking-[0.14em] uppercase transition-colors duration-500 ${lang === l.code ? active : idle}`}
          >
            {compact ? l.short : l.label}
          </button>
        </Fragment>
      ))}
    </div>
  )
}

export default function Nav() {
  const c = useContent()
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinel = useRef(null)
  const LINKS = c.nav.links

  // Un centinela invisible en el borde superior sustituye al listener de
  // scroll: el navegador nos avisa, no le preguntamos sesenta veces por segundo.
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setCondensed(!e.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' }
    )
    if (sentinel.current) io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  // Con el overlay abierto, el fondo no debe poder desplazarse.
  useEffect(() => {
    const lenis = window.__lenis
    if (open) { lenis?.stop(); document.body.style.overflow = 'hidden' }
    else { lenis?.start(); document.body.style.overflow = '' }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollTo(`#${id}`), open ? 620 : 0)
  }

  return (
    <>
      <div ref={sentinel} className="absolute top-0 h-px w-full" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:pt-6">
        <nav
          aria-label={c.nav.aria}
          className={`mx-auto flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            condensed
              ? 'max-w-[1240px] rounded-full bg-ivory/70 py-2 pl-7 pr-2 ring-1 ring-ink/8 backdrop-blur-2xl shadow-[0_1px_40px_-12px_rgba(18,16,14,0.18)]'
              : 'max-w-[1560px] rounded-full bg-transparent py-2 pl-2 pr-2 ring-1 ring-transparent'
          }`}
        >
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); scrollTo('#inicio') }}
            data-cursor="link"
            className="group relative shrink-0 px-2"
            aria-label={c.nav.home}
          >
            <span className="font-display text-[19px] font-normal tracking-[0.22em] text-ink">
              MARBRE
            </span>
            <span className="absolute -bottom-0.5 left-2 right-2 h-px origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.slice(0, 5).map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor="link"
                className="group relative whitespace-nowrap text-[11px] font-normal tracking-[0.14em] uppercase text-slate-ink transition-colors duration-500 hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            {/* Selector de idioma — junto a "Proceso", visible en todos los tamaños. */}
            <LangToggle compact />

            <span className="hidden h-4 w-px bg-ink/12 md:block" aria-hidden="true" />

            <button
              onClick={() => go('reserva')}
              data-cursor="link"
              data-cursor-bg="dark"
              className="group hidden items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-ivory transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] md:flex"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase">{c.nav.book}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-ivory/20">
                <Arrow />
              </span>
            </button>

            <button
              onClick={() => setOpen(true)}
              aria-label={c.nav.openMenu}
              aria-expanded={open}
              data-cursor="link"
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ink/10 transition-colors duration-500 hover:bg-ink/[0.04]"
            >
              <span className="relative block h-[9px] w-[18px]">
                <span className="absolute left-0 top-0 h-px w-full bg-ink" />
                <span className="absolute bottom-0 left-0 h-px w-full bg-ink" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <Overlay open={open} onClose={() => setOpen(false)} go={go} c={c} LINKS={LINKS} />
    </>
  )
}

function Overlay({ open, onClose, go, c, LINKS }) {
  return (
    <div
      data-cursor-bg="dark"
      className={`on-dark fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Telón: se desliza desde arriba con origen superior. No es un fade. */}
      <div
        className="absolute inset-0 origin-top bg-ink transition-transform duration-[1100ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{ transform: open ? 'scaleY(1)' : 'scaleY(0)' }}
      />

      {/* Escalar la cortina a cero no oculta a sus hijos: la visibilidad se
          apaga aparte para que el botón de cerrar no quede pintado encima. */}
      <div
        className="relative flex h-full flex-col px-6 py-4 transition-[opacity,visibility] duration-500 md:px-10 md:py-6"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transitionDelay: open ? '250ms' : '0ms',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-display text-[19px] tracking-[0.22em] text-ivory transition-opacity duration-500"
            style={{ opacity: open ? 1 : 0, transitionDelay: open ? '500ms' : '0ms' }}
          >
            MARBRE
          </span>

          <div className="flex items-center gap-5">
            <LangToggle dark />
            <button
              onClick={onClose}
              aria-label={c.nav.closeMenu}
              data-cursor="link"
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ivory/20 transition-colors duration-500 hover:bg-ivory/5"
            >
              <span className="relative block h-[18px] w-[18px]">
                <span
                  className="absolute left-0 top-1/2 h-px w-full bg-ivory transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transform: open ? 'rotate(45deg)' : 'translateY(-4px)', transitionDelay: open ? '450ms' : '0ms' }}
                />
                <span
                  className="absolute left-0 top-1/2 h-px w-full bg-ivory transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ transform: open ? 'rotate(-45deg)' : 'translateY(4px)', transitionDelay: open ? '450ms' : '0ms' }}
                />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-auto grid flex-1 grid-cols-1 items-end gap-12 pb-6 lg:grid-cols-[1fr_auto]">
          <nav aria-label={c.nav.menu}>
            <ul>
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <button
                    onClick={() => go(l.id)}
                    data-cursor="link"
                    className="group block py-[0.5vh] text-left"
                    style={{
                      transform: open ? 'translateY(0)' : 'translateY(110%)',
                      transition: 'transform 1100ms cubic-bezier(0.16,1,0.3,1)',
                      transitionDelay: open ? `${360 + i * 65}ms` : '0ms',
                    }}
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="num text-[10px] tracking-[0.2em] text-champagne">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(2.1rem,6.4vw,5.2rem)] font-light leading-[1.06] text-ivory/85 transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-3 group-hover:text-ivory">
                        {l.label}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="grid grid-cols-2 gap-x-10 gap-y-8 lg:grid-cols-1 lg:text-right"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'none' : 'translateY(20px)',
              transition: 'opacity 900ms ease, transform 900ms cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: open ? '760ms' : '0ms',
            }}
          >
            <div>
              <p className="eyebrow mb-3">{c.nav.contact}</p>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} data-cursor="link" className="block text-[14px] text-ivory/75 transition-colors hover:text-ivory">{PHONE}</a>
              <a href={`mailto:${EMAIL}`} data-cursor="link" className="block text-[14px] text-ivory/75 transition-colors hover:text-ivory">{EMAIL}</a>
            </div>
            <div>
              <p className="eyebrow mb-3">{c.nav.practice}</p>
              <p className="text-[14px] leading-relaxed text-ivory/75">{ADDRESS}<br />{CITY}, Colombia</p>
            </div>
            <div>
              <p className="eyebrow mb-3">{c.nav.direct}</p>
              <a href={waLink(c.wa.default)} target="_blank" rel="noreferrer" data-cursor="link" className="block text-[14px] text-ivory/75 transition-colors hover:text-ivory">WhatsApp</a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-cursor="link" className="block text-[14px] text-ivory/75 transition-colors hover:text-ivory">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
