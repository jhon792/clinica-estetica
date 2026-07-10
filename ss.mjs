/**
 * Captura de auditoría. Recorre la página en escritorio y móvil, registra
 * errores de consola y peticiones fallidas, y guarda una lámina por sección.
 *   node ss.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

mkdirSync('./screenshots', { recursive: true })

const URL = 'http://localhost:5174/'
const SECTIONS = [
  'inicio', 'filosofia', 'cirujana', 'resultados', 'comparador',
  'especialidades', 'proceso', 'instalaciones', 'tecnologia',
  'testimonios', 'preguntas', 'reserva',
]

const browser = await chromium.launch()
const errors = []
const failed = []

async function shoot(label, viewport, scale = 2) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale })
  const page = await ctx.newPage()

  page.on('console', (m) => m.type() === 'error' && errors.push(`[${label}] ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`[${label}] PAGEERROR ${e.message}`))
  page.on('requestfailed', (r) => failed.push(`[${label}] ${r.url()} — ${r.failure()?.errorText}`))

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200) // deja terminar la entrada del hero

  for (const id of SECTIONS) {
    const found = await page.evaluate((sid) => {
      const el = document.getElementById(sid)
      if (!el) return false
      el.scrollIntoView({ behavior: 'instant', block: 'start' })
      return true
    }, id)
    if (!found) { errors.push(`[${label}] falta #${id}`); continue }
    await page.waitForTimeout(1500) // pins + reveals
    await page.screenshot({ path: `./screenshots/${label}-${id}.png` })
  }

  await ctx.close()
}

await shoot('desktop', { width: 1512, height: 945 })
await shoot('mobile', { width: 390, height: 844 }, 3)

await browser.close()

console.log('\n── errores de consola ──')
console.log(errors.length ? errors.join('\n') : 'ninguno')
console.log('\n── peticiones fallidas ──')
console.log(failed.length ? [...new Set(failed)].join('\n') : 'ninguna')
