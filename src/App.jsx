import { useEffect } from 'react'
import './index.css'

import { initSmoothScroll, ScrollTrigger } from './lib/motion'
import Cursor from './components/Cursor'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Philosophy from './sections/Philosophy'
import Surgeon from './sections/Surgeon'
import Results from './sections/Results'
import Comparator from './sections/Comparator'
import Specialties from './sections/Specialties'
import Process from './sections/Process'
import Facilities from './sections/Facilities'
import Technology from './sections/Technology'
import Testimonials from './sections/Testimonials'
import Videos from './sections/Videos'
import FAQ from './sections/FAQ'
import Booking from './sections/Booking'
import Footer from './sections/Footer'
import WhatsApp from './components/WhatsApp'

export default function App() {
  useEffect(() => {
    const destroy = initSmoothScroll()

    // Las secciones fijadas calculan sus distancias a partir de la altura del
    // documento. Esa altura cambia cuando terminan de cargar las fuentes (el
    // texto se recompone) y las imágenes diferidas. Sin este refresco, los pins
    // arrancan y terminan en el sitio equivocado.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      destroy?.()
    }
  }, [])

  return (
    <div className="grain">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-[11px] focus:tracking-[0.2em] focus:uppercase focus:text-ivory"
      >
        Saltar al contenido
      </a>

      <Cursor />
      <Nav />

      <main id="contenido">
        <Hero />
        <Philosophy />
        <Surgeon />
        <Results />
        <Comparator />
        <Specialties />
        <Process />
        <Facilities />
        <Technology />
        <Testimonials />
        <Videos />
        <FAQ />
        <Booking />
      </main>

      <Footer />
      <WhatsApp />
    </div>
  )
}
