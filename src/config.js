// ═══════════════════════════════════════════════════════════
// Constantes de marca y contacto — NO traducibles. El texto visible del sitio
// (en dos idiomas) vive en content.js y se consume con useContent().
// ═══════════════════════════════════════════════════════════

export const WA_NUMBER = '573001234567'
export const PHONE = '+57 300 123 4567'
export const CLINIC_NAME = 'Marbre'
export const SURGEON = 'Dra. Valentina Restrepo'
export const CITY = 'Bogotá'
export const ADDRESS = 'Carrera 11 # 82—01, Piso 9'
export const EMAIL = 'consulta@marbre.co'
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Carrera+11+%2382-01,+Bogotá'
// Embed de solo lectura: `output=embed` no requiere clave de API. Cambie la
// dirección aquí y el mapa del footer la sigue. Sustituya por la ubicación real.
export const GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps?q=Carrera+11+%2382-01,+Bogot%C3%A1,+Colombia&z=15&output=embed'
export const INSTAGRAM = 'https://instagram.com/marbre.clinica'
export const FACEBOOK = 'https://facebook.com/marbre.clinica'
export const TIKTOK = 'https://tiktok.com/@marbre.clinica'
export const SITE_URL = 'https://marbre.co'

// Redes sociales. Un único origen para el menú flotante y el footer, así no
// hay dos listas que se desincronicen. El orden es el de aparición.
export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', href: INSTAGRAM },
  { key: 'facebook', label: 'Facebook', href: FACEBOOK },
  { key: 'tiktok', label: 'TikTok', href: TIKTOK },
]

// Colores oficiales de cada red (fondo de marca; el glitch de TikTok se maneja
// en el componente).
export const BRAND = {
  instagram: {
    hoverBg: 'linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
  },
  facebook: { hoverBg: '#1877F2' },
  tiktok: { hoverBg: '#010101' },
  whatsapp: { hoverBg: '#25D366' },
}

export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
