/**
 * Normaliza el nombre de cada foto a un slug limpio y emite tres formatos.
 * El navegador elige: AVIF si puede, WebP si no, JPG como último recurso.
 * Se ejecuta a mano (`npm run img`), no en cada build: los originales no cambian.
 */
import sharp from 'sharp'
import { mkdirSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

const SRC = 'public/fotos'
const OUT = 'public/img'

const RENAME = {
  'portada.jpeg': 'hero',
  'doctora.jpeg': 'cirujana',
  'Rinomodelación.jpeg': 'rinoplastia',
  'Valoración Armonización Facial.jpeg': 'armonizacion',
  'Esperma de Salmón.jpeg': 'regenerativa',
  'Resultados de cirugía estética_ cambios sorprendentes.jpg': 'mamaria',
  'Endolaser Facial.jpeg': 'endolaser',
  'Control Botox.jpeg': 'toxina',
  'Limpieza Facial Profunda.jpeg': 'protocolo-piel',
  'Labios Ácido Hialurónico.jpeg': 'labios',
  'Mentón.jpeg': 'menton',
  'Hialuronidasa.jpeg': 'consulta',
  'Retoque Labios.jpeg': 'detalle',
  'Hidratación Labios con Hidrafiller.jpeg': 'hidratacion',
}

const RENAME_BA = {
  'Rinoplastia antes.jpg': 'rinoplastia-antes',
  'Rinoplastia despues.jpg': 'rinoplastia-despues',
  'Rinoplastia 2 antes.jpg': 'rinoplastia-2-antes',
  'Rinoplastia 2 despues.jpg': 'rinoplastia-2-despues',
  'Lifting facial antes .jpg': 'lifting-antes',
  'Lifting facial  después.jpg': 'lifting-despues',
  'Lipoescultura antes.jpg': 'lipoescultura-antes',
  'Lipoescultura despues.jpg': 'lipoescultura-despues',
  'Perdida de peso antes.jpg': 'contorno-antes',
  'Perdida de peso despues.jpg': 'contorno-despues',
  'Resultados de cirugía estética_ cambios sorprendentes(1)antes.jpg': 'mamaria-antes',
  'Resultados de cirugía estética_ cambios sorprendentes(1)despues.jpg': 'mamaria-despues',
}

async function emit(inPath, outBase) {
  const img = sharp(inPath)
  const { width, height } = await img.metadata()
  await Promise.all([
    img.clone().avif({ quality: 62, effort: 6 }).toFile(`${outBase}.avif`),
    img.clone().webp({ quality: 78 }).toFile(`${outBase}.webp`),
    img.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(`${outBase}.jpg`),
  ])
  return { width, height }
}

const dims = {}

mkdirSync(OUT, { recursive: true })
mkdirSync(join(OUT, 'ba'), { recursive: true })

for (const [file, slug] of Object.entries(RENAME)) {
  const p = join(SRC, file)
  if (!existsSync(p)) { console.warn('FALTA', file); continue }
  dims[slug] = await emit(p, join(OUT, slug))
}

for (const [file, slug] of Object.entries(RENAME_BA)) {
  const p = join(SRC, 'antes_despues', file)
  if (!existsSync(p)) { console.warn('FALTA ba/', file); continue }
  dims[`ba/${slug}`] = await emit(p, join(OUT, 'ba', slug))
}

// Sobrantes: cualquier original no mapeado, para no perder material.
const known = new Set(Object.keys(RENAME))
for (const f of readdirSync(SRC)) {
  if (/\.(jpe?g|png)$/i.test(f) && !known.has(f)) console.log('sin mapear:', f)
}

console.log(JSON.stringify(dims, null, 2))
console.log(`\n${Object.keys(dims).length} imágenes × 3 formatos`)
