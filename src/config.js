export const WA_NUMBER = '573001234567'
export const PHONE = '+57 300 123 4567'
export const CLINIC_NAME = 'Clínica Estética Premium'
export const CITY = 'Bogotá'
export const ADDRESS = 'Bogotá, Colombia'
export const EMAIL = 'info@clinicaestetica.co'
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Bogotá,+Colombia'
export const GOOGLE_REVIEWS_URL = 'https://search.google.com/local/reviews?placeid=ChIJ&hl=es'
export const INSTAGRAM = 'https://instagram.com/clinicaesteticabogota'
export const FACEBOOK = 'https://facebook.com/clinicaesteticabogota'

export const waLink = (msg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const WA_MSG_DEFAULT =
  `Hola! Vi su página web y quiero agendar una consulta en ${CLINIC_NAME} Bogotá. ¿Cuál es su disponibilidad?`

export const WA_MSG_SERVICE = (service) =>
  `Hola! Me interesa el tratamiento de *${service}* en ${CLINIC_NAME} Bogotá. ¿Me pueden dar información y precio?`
