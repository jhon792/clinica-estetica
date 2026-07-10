// ═══════════════════════════════════════════════════════════
// Fuente única de verdad. Todo dato de marca, contacto y copy
// vive aquí para que el cliente pueda editar sin tocar JSX.
// ═══════════════════════════════════════════════════════════

export const WA_NUMBER = '573001234567'
export const PHONE = '+57 300 123 4567'
export const CLINIC_NAME = 'Marbre'
export const CLINIC_LEGAL = 'Marbre · Instituto de Cirugía Plástica'
export const SURGEON = 'Dra. Valentina Restrepo'
export const SURGEON_TITLE = 'Cirujana Plástica · Miembro SCCP'
export const CITY = 'Bogotá'
export const ADDRESS = 'Carrera 11 # 82—01, Piso 9'
export const ADDRESS_FULL = 'Carrera 11 # 82—01, Piso 9 · Bogotá, Colombia'
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

export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const WA_MSG_DEFAULT = `Buenas tardes. Me gustaría solicitar una consulta de valoración en ${CLINIC_NAME}.`
export const WA_MSG_SERVICE = (s) => `Buenas tardes. Quisiera información sobre ${s} en ${CLINIC_NAME}.`

// ── Filosofía ──────────────────────────────────────────────
export const PHILOSOPHY =
  'No perseguimos un rostro de moda. Perseguimos el suyo — la versión que el tiempo, la genética o la circunstancia le negaron. Cada intervención empieza con una conversación larga y termina cuando nadie es capaz de señalar qué cambió.'

// ── Especialidades ─────────────────────────────────────────
export const SPECIALTIES = [
  {
    n: '01',
    name: 'Rinoplastia Ultrasónica',
    tag: 'Facial',
    img: 'rinoplastia',
    body: 'Remodelación ósea por ultrasonido en lugar de osteotomos. Menos hematoma, menos edema, y un dorso que responde al milímetro. La nariz no se rehace: se corrige.',
  },
  {
    n: '02',
    name: 'Lifting Facial Profundo',
    tag: 'Facial',
    img: 'ba/lifting-despues',
    body: 'Plano profundo sobre el SMAS, reposicionando el tejido en el vector en que descendió. La piel no se tensa — se acompaña de vuelta a su sitio.',
  },
  {
    n: '03',
    name: 'Armonización Facial',
    tag: 'No quirúrgico',
    img: 'armonizacion',
    body: 'Ácido hialurónico y toxina en cantidades que se cuentan en décimas. El objetivo no es el volumen: es la proporción entre tercios.',
  },
  {
    n: '04',
    name: 'Lipoescultura de Alta Definición',
    tag: 'Corporal',
    img: 'ba/lipoescultura-despues',
    body: 'Trabajo por capas sobre la anatomía muscular subyacente. Revelamos una estructura que ya existe en lugar de dibujar una que no.',
  },
  {
    n: '05',
    name: 'Cirugía Mamaria',
    tag: 'Corporal',
    img: 'mamaria',
    body: 'Elección de implante guiada por medidas torácicas, no por catálogo. Plano dual, incisión inframamaria, resultado que envejece bien.',
  },
  {
    n: '06',
    name: 'Medicina Regenerativa',
    tag: 'No quirúrgico',
    img: 'regenerativa',
    body: 'Polinucleótidos, exosomas y bioestimuladores de colágeno. La piel produce lo que ha dejado de producir. Sin llenar, sin tensar.',
  },
]

// ── Proceso ────────────────────────────────────────────────
export const PROCESS = [
  {
    n: 'I',
    title: 'Consulta',
    time: '90 minutos',
    body: 'Una sola paciente por franja horaria. Analizamos proporciones, historia clínica y — sobre todo — qué espera ver en el espejo. Si no somos la respuesta, se lo diremos.',
  },
  {
    n: 'II',
    title: 'Simulación',
    time: 'Vectra 3D',
    body: 'Captura tridimensional del rostro o del contorno corporal. Verá el resultado proyectado antes de decidir. Ninguna cirugía debería empezar con una sorpresa.',
  },
  {
    n: 'III',
    title: 'Preoperatorio',
    time: '3 semanas',
    body: 'Valoración cardiológica, laboratorio completo y protocolo de suspensión farmacológica. La seguridad es la única parte del proceso que no se personaliza.',
  },
  {
    n: 'IV',
    title: 'Intervención',
    time: 'Quirófano propio',
    body: 'Anestesiólogo de planta, monitorización invasiva y un solo procedimiento por jornada. La agenda no dicta el tiempo quirúrgico.',
  },
  {
    n: 'V',
    title: 'Recuperación',
    time: '12 meses',
    body: 'Suite privada la primera noche, drenaje linfático manual y controles al día 1, 7, 30, 90 y 365. El resultado definitivo tarda un año en existir.',
  },
]

// ── Tecnología ─────────────────────────────────────────────
export const TECHNOLOGY = [
  { name: 'Piezotome®', desc: 'Rinoplastia ultrasónica de precisión ósea', meta: 'Acteon' },
  { name: 'Vectra® H2', desc: 'Simulación tridimensional preoperatoria', meta: 'Canfield' },
  { name: 'Renuvion®', desc: 'Retracción cutánea por plasma helio', meta: 'Apyx' },
  { name: 'VASER® Lipo', desc: 'Emulsión selectiva por ultrasonido', meta: 'Solta' },
  { name: 'Quirófano ISO 7', desc: 'Flujo laminar y presión positiva', meta: 'Certificado' },
]

// ── Testimonios ────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote: 'Llevaba nueve años buscando a alguien que me dijera que no necesitaba nada. La Dra. Restrepo fue la primera en decírmelo, y aun así volví a ella cuando llegó el momento.',
    author: 'C. M.',
    meta: 'Rinoplastia · 2024',
  },
  {
    quote: 'Mi hermana no notó la cirugía. Notó que había dormido bien. Eso era exactamente lo que yo quería.',
    author: 'A. V.',
    meta: 'Lifting profundo · 2023',
  },
  {
    quote: 'Me enseñó la simulación en 3D y me advirtió de lo que no podía prometer. Nunca antes un médico me había hablado de límites. Firmé ese mismo día.',
    author: 'L. G.',
    meta: 'Armonización facial · 2025',
  },
]

// ── Antes y después ────────────────────────────────────────
//
// AVISO AL CLIENTE — leer antes de publicar.
// Cada pie describe únicamente lo que la fotografía demuestra. Ninguna
// afirmación clínica (técnica empleada, volúmenes, meses transcurridos) debe
// añadirse sin que la historia clínica la respalde: en una web médica un pie
// de foto es una declaración, no un adorno.
//
//   · `showcase: false` excluye el caso de la galería de Resultados. Se usa en
//     el caso de rinoplastia, cuya foto "después" es de postoperatorio
//     inmediato (hematoma y sutura visibles). Sirve para ilustrar el proceso,
//     no para vender el resultado.
//   · Los pares de rinoplastia secundaria y contorno no están estandarizados:
//     cambian el fondo y la iluminación entre ambas tomas.
//
export const CASES = [
  {
    id: 'rinoplastia-2',
    title: 'Rinoplastia secundaria',
    meta: 'Perfil · Postoperatorio consolidado',
    before: 'ba/rinoplastia-2-antes',
    after: 'ba/rinoplastia-2-despues',
    note: 'Corrección de dorso y proyección de punta tras una cirugía previa realizada en otro centro.',
  },
  {
    id: 'lifting',
    title: 'Lifting facial profundo',
    meta: 'Frontal · Postoperatorio consolidado',
    before: 'ba/lifting-antes',
    after: 'ba/lifting-despues',
    note: 'Reposicionamiento del tejido en el tercio medio. Sin tensión cutánea aparente.',
  },
  {
    id: 'contorno',
    title: 'Contorno corporal',
    meta: 'Frontal · Postoperatorio consolidado',
    before: 'ba/contorno-antes',
    after: 'ba/contorno-despues',
    note: 'Redefinición de cintura y contorno abdominal. Sin cicatriz visible en el encuadre.',
  },
  {
    id: 'lipoescultura',
    title: 'Contorno abdominal',
    meta: 'Abdomen · Postoperatorio consolidado',
    before: 'ba/lipoescultura-antes',
    after: 'ba/lipoescultura-despues',
    note: 'Corrección de flacidez y redefinición de la pared abdominal.',
  },
  {
    id: 'rinoplastia',
    title: 'Rinoplastia ultrasónica',
    meta: 'Perfil · Postoperatorio inmediato',
    showcase: false,
    before: 'ba/rinoplastia-antes',
    after: 'ba/rinoplastia-despues',
    note: 'Reducción de giba dorsal. La imagen corresponde a los primeros días: el hematoma y la sutura de la columela son propios de esta fase y desaparecen antes del tercer mes.',
  },
]

// ── Preguntas ──────────────────────────────────────────────
export const FAQS = [
  {
    q: '¿Cuánto cuesta la consulta de valoración?',
    a: 'La consulta tiene un valor de $450.000 COP y dura noventa minutos. Incluye simulación tridimensional Vectra y se descuenta íntegramente del procedimiento si decide operarse con nosotros. No agendamos más de cuatro valoraciones al día.',
  },
  {
    q: '¿Cuándo veré el resultado definitivo?',
    a: 'El edema inicial cede entre la segunda y la cuarta semana, y a los tres meses el resultado es socialmente presentable. Pero el resultado definitivo —el que fotografiamos— aparece a los doce meses en rinoplastia y a los nueve en cirugía corporal. Cualquiera que le prometa menos, le está vendiendo el postoperatorio y no la cirugía.',
  },
  {
    q: '¿Puedo operarme si vengo de fuera de Colombia?',
    a: 'Sí. Coordinamos la valoración inicial por videoconsulta, y nuestro equipo gestiona alojamiento, traslados y acompañamiento clínico. Requerimos una estancia mínima de diez días postoperatorios en Bogotá antes de autorizar un vuelo.',
  },
  {
    q: '¿Qué pasa si no soy candidata?',
    a: 'Se lo diremos en la primera consulta y le devolveremos el importe íntegro. Aproximadamente uno de cada cinco pacientes que nos visita recibe la recomendación de no operarse, o de esperar. Es la parte de nuestro trabajo de la que estamos más orgullosos.',
  },
  {
    q: '¿Quién realiza la cirugía?',
    a: `Siempre la ${SURGEON}, sin excepción y sin cirujanos en formación. Opera un único procedimiento por jornada quirúrgica, acompañada de anestesiólogo de planta e instrumentadora fija. Nunca subcontratamos.`,
  },
  {
    q: '¿Es seguro operarse en Colombia?',
    a: 'Lo es cuando el cirujano está certificado por la Sociedad Colombiana de Cirugía Plástica y opera en quirófano habilitado. La complicación en Colombia no nace del país: nace del turismo quirúrgico de bajo coste. Verifique siempre el registro de su cirujano antes de reservar cualquier vuelo.',
  },
]

// ── Cifras ─────────────────────────────────────────────────
export const FIGURES = [
  { value: '18', label: 'Años de ejercicio' },
  { value: '2.400', label: 'Procedimientos' },
  { value: '1', label: 'Cirugía por jornada' },
  { value: '0,4%', label: 'Tasa de revisión' },
]
