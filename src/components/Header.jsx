import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  {
    label: 'Tratamientos',
    href: '#servicios',
    dropdown: [
      { label: 'Facial & Armonización', href: '#servicios' },
      { label: 'Corporal & Bienestar', href: '#servicios' },
      { label: 'Procedimientos Quirúrgicos', href: '#servicios' },
      { label: 'Otros Tratamientos', href: '#servicios' },
    ],
  },
  { label: '¿Por qué Nosotros?', href: '#por-que-escogernos' },
  { label: 'Blog', href: '#blog' },
  { label: 'Videos', href: '#videos' },
  { label: 'Contacto', href: '#contacto' },
]

function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 z-50">
      <div className="bg-white border border-[#e8e0d4] shadow-[0_8px_30px_rgba(0,0,0,0.10)] min-w-[220px] py-2">
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-[#e8e0d4] rotate-45" />
        {items.map(item => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-5 py-2.5 text-[12px] font-medium text-[#1a1612] hover:bg-[#f9f6f0] hover:text-[#b8973e] transition-colors"
          >
            <span className="w-1 h-1 rounded-full bg-[#b8973e] shrink-0" />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimer.current)
    setOpenDrop(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDrop(null), 80)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.08)]' : 'border-b border-[#e8e0d4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between gap-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-full bg-[#b8973e] flex items-center justify-center transition-all duration-300 group-hover:bg-[#1a1612]">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L28 10L28 22L16 28L4 22L4 10Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="16" r="2.5" fill="white"/>
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#1a1612] leading-tight">Clínica</div>
            <div className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#b8973e] leading-tight">Estética Premium</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
              onMouseLeave={link.dropdown ? handleMouseLeave : undefined}
            >
              <a
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold text-[#1a1612] hover:text-[#b8973e] transition-colors duration-200 rounded"
              >
                {link.label}
                {link.dropdown && (
                  <svg
                    width="9" height="9" viewBox="0 0 12 8" fill="none"
                    className={`transition-transform duration-200 ${openDrop === link.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </a>
              {link.dropdown && openDrop === link.label && (
                <DropdownMenu items={link.dropdown} />
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#consulta"
            className="hidden md:flex items-center gap-2 bg-[#b8973e] hover:bg-[#9a7c32] text-white text-[11px] font-bold tracking-[0.1em] uppercase px-6 py-3 transition-all duration-300 shadow-[0_4px_16px_rgba(184,151,62,0.3)]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            Reservar Cita
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-[#1a1612]"
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[520px] border-t border-[#e8e0d4]' : 'max-h-0'}`}>
        <nav className="flex flex-col py-3 bg-white">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 text-[12px] font-semibold text-[#1a1612] hover:text-[#b8973e] hover:bg-[#f9f6f0] transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#consulta"
            onClick={() => setMenuOpen(false)}
            className="mx-6 mt-3 mb-1 text-center text-[11px] font-bold tracking-[0.1em] uppercase bg-[#b8973e] hover:bg-[#9a7c32] text-white px-5 py-3 transition-all duration-300"
          >
            Reservar Cita
          </a>
        </nav>
      </div>
    </header>
  )
}
