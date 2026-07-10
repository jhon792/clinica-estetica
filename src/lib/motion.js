import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis y GSAP mantienen cada uno su propio bucle de animación. Si los dejas
 * correr por separado, ScrollTrigger lee posiciones de scroll de un frame
 * anterior y el resultado es un micro-jitter visible en cualquier elemento
 * fijado (pin). La cura es una única fuente de tiempo: el ticker de GSAP
 * conduce el rAF de Lenis, y cada scroll de Lenis fuerza un update de
 * ScrollTrigger. Un solo reloj, cero deriva.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return null

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
    lerp: 0.1,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.6,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  window.__lenis = lenis

  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    delete window.__lenis
  }
}

export function scrollTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export { gsap, ScrollTrigger }
