/**
 * Auditoría objetiva contra el build de producción.
 *   1) axe-core (WCAG 2.1 AA) en escritorio y móvil, con el menú abierto y cerrado.
 *   2) LCP y CLS reales medidos por el navegador.
 *   3) Peso transferido de la carga inicial.
 *
 *   npx vite preview --port 4179 && node audit.mjs
 */
import { chromium } from 'playwright'

const URL = process.env.AUDIT_URL || 'http://localhost:4179/'
const AXE = './node_modules/axe-core/axe.min.js'

const browser = await chromium.launch()

async function a11y(label, viewport, openMenu = false) {
  const ctx = await browser.newContext({ viewport })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  // La entrada del hero encadena retardos hasta 1400 ms más una transición de
  // 1 s. Medir antes de que termine hace que axe lea opacidades intermedias y
  // denuncie contrastes que ningún usuario llega a ver.
  await page.waitForTimeout(4200)

  if (openMenu) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page.waitForTimeout(1400)
  }

  await page.addScriptTag({ path: AXE })
  const res = await page.evaluate(async () =>
    axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })
  )

  console.log(`\n═══ axe · ${label} ═══`)
  if (!res.violations.length) console.log('0 violaciones')
  for (const v of res.violations) {
    console.log(`\n[${v.impact}] ${v.id} — ${v.help} (${v.nodes.length})`)
    for (const n of v.nodes.slice(0, 4)) {
      console.log('   ', n.html.replace(/\s+/g, ' ').slice(0, 130))
      console.log('   →', n.failureSummary?.split('\n').slice(0, 2).join(' ').slice(0, 150))
    }
  }
  await ctx.close()
  return res.violations.length
}

async function vitals() {
  const ctx = await browser.newContext({ viewport: { width: 1512, height: 945 } })
  const page = await ctx.newPage()

  let bytes = 0
  page.on('response', async (r) => {
    const len = r.headers()['content-length']
    if (len) bytes += parseInt(len, 10)
  })

  await page.goto(URL, { waitUntil: 'load' })

  const v = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0
        let cls = 0
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = e.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value
        }).observe({ type: 'layout-shift', buffered: true })

        setTimeout(() => {
          const nav = performance.getEntriesByType('navigation')[0]
          const fcp = performance.getEntriesByName('first-contentful-paint')[0]
          resolve({
            lcp: Math.round(lcp),
            cls: +cls.toFixed(4),
            fcp: Math.round(fcp?.startTime || 0),
            domComplete: Math.round(nav.domComplete),
          })
        }, 3500)
      })
  )

  console.log('\n═══ métricas (build de producción, local) ═══')
  console.log(`FCP            ${v.fcp} ms`)
  console.log(`LCP            ${v.lcp} ms   ${v.lcp < 2500 ? '✓ bueno' : '✗'}`)
  console.log(`CLS            ${v.cls}      ${v.cls < 0.1 ? '✓ bueno' : '✗'}`)
  console.log(`DOM completo   ${v.domComplete} ms`)
  console.log(`Transferido    ~${Math.round(bytes / 1024)} KB`)
  await ctx.close()
}

let total = 0
total += await a11y('escritorio 1512', { width: 1512, height: 945 })
total += await a11y('escritorio · menú abierto', { width: 1512, height: 945 }, true)
total += await a11y('móvil 390', { width: 390, height: 844 })
await vitals()

await browser.close()
console.log(`\n${total === 0 ? '✓' : '✗'} total de violaciones: ${total}`)
