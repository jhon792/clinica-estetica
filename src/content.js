// ═══════════════════════════════════════════════════════════
// Contenido bilingüe. Todo el texto visible del sitio vive aquí, en dos
// idiomas con la MISMA forma. Los componentes lo consumen con `useContent()`
// (ver i18n.jsx), así el cambio de idioma es instantáneo y sin recarga.
//
// Los campos NO traducibles (slugs de imagen, ids de vídeo, before/after)
// se repiten idénticos en ambos idiomas a propósito: cada idioma queda
// autocontenido y legible. Si cambia un slug, cámbielo en los dos.
// ═══════════════════════════════════════════════════════════

const es = {
  surgeonTitle: 'Cirujana Plástica · Miembro SCCP',

  wa: {
    default: 'Buenas tardes. Me gustaría solicitar una consulta de valoración en Marbre.',
    service: (s) => `Buenas tardes. Quisiera información sobre ${s} en Marbre.`,
  },

  nav: {
    aria: 'Principal',
    home: 'Marbre — inicio',
    book: 'Reservar',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menu: 'Menú principal',
    skip: 'Saltar al contenido',
    langLabel: 'Idioma',
    links: [
      { id: 'cirujana', label: 'La Cirujana' },
      { id: 'resultados', label: 'Resultados' },
      { id: 'especialidades', label: 'Procedimientos' },
      { id: 'proceso', label: 'Proceso' },
      { id: 'instalaciones', label: 'Instalaciones' },
      { id: 'peliculas', label: 'En Movimiento' },
      { id: 'preguntas', label: 'Preguntas' },
    ],
    contact: 'Consulta',
    practice: 'Consultorio',
    direct: 'Directo',
  },

  hero: {
    eyebrow: 'Bogotá · Desde 2007',
    titleLines: ['La cirugía', 'que nadie'],
    titleEm: 'advierte.',
    body: 'Un solo procedimiento al día. Una sola cirujana. Diecisiete años perfeccionando el arte más difícil de la medicina estética: que el resultado no se vea.',
    cta: 'Solicitar valoración',
    secondary: 'Ver resultados reales',
    photoLabel: 'Fotografía sin retoque · Paciente real',
  },

  philosophy: {
    label: 'Filosofía',
    text: 'No perseguimos un rostro de moda. Perseguimos el suyo — la versión que el tiempo, la genética o la circunstancia le negaron. Cada intervención empieza con una conversación larga y termina cuando nadie es capaz de señalar qué cambió.',
    footLeft: 'Marbre · Instituto de Cirugía Plástica',
    footRight: 'Miembro de la Sociedad Colombiana de Cirugía Plástica, Estética y Reconstructiva. Registro habilitado ante la Secretaría de Salud.',
  },

  surgeon: {
    label: 'La Cirujana',
    nameLines: ['Dra. Valentina', 'Restrepo'],
    bio1: 'Formada en la Universidad Nacional de Colombia y especializada en rinoplastia estructural en el Hospital Universitario La Paz de Madrid. Ha operado en cuatro continentes y ha rechazado aproximadamente a uno de cada cinco pacientes que la han buscado.',
    bio2: 'Opera un único procedimiento por jornada quirúrgica. No delega, no supervisa desde fuera, no comparte quirófano. Cree que la cirugía plástica es la única especialidad médica donde el paciente llega sano, y que esa asimetría obliga a una prudencia que la industria ha ido olvidando.',
    place: 'Bogotá, 2025',
    portrait: 'Retrato',
    figures: [
      { value: '18', label: 'Años de ejercicio' },
      { value: '2.400', label: 'Procedimientos' },
      { value: '1', label: 'Cirugía por jornada' },
      { value: '0,4%', label: 'Tasa de revisión' },
    ],
  },

  results: {
    label: 'Resultados',
    titleLines: ['Cuatro casos.', 'Ningún retoque digital.'],
    desc: 'Fotografía clínica sin edición, publicada con consentimiento escrito. Cada resultado es individual y no constituye una promesa de resultado equivalente.',
    continue: 'Continúa',
    continueTitle: ['Compare usted', 'mismo, milímetro', 'a milímetro.'],
    caseCursor: 'Caso',
  },

  comparator: {
    label: 'Antes y Después',
    titleTop: 'Arrastre.',
    titleBottom: 'Compruebe.',
    before: 'Antes',
    after: 'Después',
    drag: 'Arrastrar',
    ariaSlider: (t) => `Comparador antes y después: ${t}`,
    ariaValue: (p) => `${p}% del resultado postoperatorio visible`,
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',
    full: 'Pantalla completa',
    exitFull: 'Salir de pantalla completa',
  },

  // `showcase: false` excluye el caso de la galería de Resultados (foto de
  // postoperatorio inmediato). Los slugs before/after son idénticos en EN.
  cases: [
    { id: 'rinoplastia-2', title: 'Rinoplastia secundaria', meta: 'Perfil · Postoperatorio consolidado', before: 'ba/rinoplastia-2-antes', after: 'ba/rinoplastia-2-despues', note: 'Corrección de dorso y proyección de punta tras una cirugía previa realizada en otro centro.' },
    { id: 'lifting', title: 'Lifting facial profundo', meta: 'Frontal · Postoperatorio consolidado', before: 'ba/lifting-antes', after: 'ba/lifting-despues', note: 'Reposicionamiento del tejido en el tercio medio. Sin tensión cutánea aparente.' },
    { id: 'contorno', title: 'Contorno corporal', meta: 'Frontal · Postoperatorio consolidado', before: 'ba/contorno-antes', after: 'ba/contorno-despues', note: 'Redefinición de cintura y contorno abdominal. Sin cicatriz visible en el encuadre.' },
    { id: 'lipoescultura', title: 'Contorno abdominal', meta: 'Abdomen · Postoperatorio consolidado', before: 'ba/lipoescultura-antes', after: 'ba/lipoescultura-despues', note: 'Corrección de flacidez y redefinición de la pared abdominal.' },
    { id: 'rinoplastia', title: 'Rinoplastia ultrasónica', meta: 'Perfil · Postoperatorio inmediato', showcase: false, before: 'ba/rinoplastia-antes', after: 'ba/rinoplastia-despues', note: 'Reducción de giba dorsal. La imagen corresponde a los primeros días: el hematoma y la sutura de la columela son propios de esta fase y desaparecen antes del tercer mes.' },
  ],

  specialties: {
    label: 'Especialidades',
    title: 'Procedimientos',
    tabs: { facial: 'Faciales', corporal: 'Corporales' },
    cta: 'Consultar este procedimiento',
    items: [
      { n: '01', cat: 'facial', name: 'Rinoplastia Ultrasónica', tag: 'Facial', img: 'rinoplastia', body: 'Remodelación ósea por ultrasonido en lugar de osteotomos. Menos hematoma, menos edema, y un dorso que responde al milímetro. La nariz no se rehace: se corrige.' },
      { n: '02', cat: 'facial', name: 'Lifting Facial Profundo', tag: 'Facial', img: 'ba/lifting-despues', body: 'Plano profundo sobre el SMAS, reposicionando el tejido en el vector en que descendió. La piel no se tensa — se acompaña de vuelta a su sitio.' },
      { n: '03', cat: 'facial', name: 'Armonización Facial', tag: 'No quirúrgico', img: 'toxina', body: 'Ácido hialurónico y toxina en cantidades que se cuentan en décimas. El objetivo no es el volumen: es la proporción entre tercios.' },
      { n: '04', cat: 'corporal', name: 'Lipoescultura de Alta Definición', tag: 'Corporal', img: 'ba/lipoescultura-despues', body: 'Trabajo por capas sobre la anatomía muscular subyacente. Revelamos una estructura que ya existe en lugar de dibujar una que no.' },
      { n: '05', cat: 'corporal', name: 'Cirugía Mamaria', tag: 'Corporal', img: 'mamaria', body: 'Elección de implante guiada por medidas torácicas, no por catálogo. Plano dual, incisión inframamaria, resultado que envejece bien.' },
      { n: '06', cat: 'facial', name: 'Medicina Regenerativa', tag: 'No quirúrgico', img: 'consulta', body: 'Polinucleótidos, exosomas y bioestimuladores de colágeno. La piel produce lo que ha dejado de producir. Sin llenar, sin tensar.' },
    ],
  },

  process: {
    label: 'Proceso',
    titleLines: ['Cinco meses', 'antes de la', 'primera incisión.'],
    intro: 'La cirugía dura horas. El proceso que la rodea dura un año. Ninguna de sus fases se acelera por conveniencia de agenda.',
    steps: [
      { n: 'I', title: 'Consulta', time: '90 minutos', body: 'Una sola paciente por franja horaria. Analizamos proporciones, historia clínica y — sobre todo — qué espera ver en el espejo. Si no somos la respuesta, se lo diremos.' },
      { n: 'II', title: 'Simulación', time: 'Vectra 3D', body: 'Captura tridimensional del rostro o del contorno corporal. Verá el resultado proyectado antes de decidir. Ninguna cirugía debería empezar con una sorpresa.' },
      { n: 'III', title: 'Preoperatorio', time: '3 semanas', body: 'Valoración cardiológica, laboratorio completo y protocolo de suspensión farmacológica. La seguridad es la única parte del proceso que no se personaliza.' },
      { n: 'IV', title: 'Intervención', time: 'Quirófano propio', body: 'Anestesiólogo de planta, monitorización invasiva y un solo procedimiento por jornada. La agenda no dicta el tiempo quirúrgico.' },
      { n: 'V', title: 'Recuperación', time: '12 meses', body: 'Suite privada la primera noche, drenaje linfático manual y controles al día 1, 7, 30, 90 y 365. El resultado definitivo tarda un año en existir.' },
    ],
  },

  facilities: {
    label: 'Instalaciones',
    titleLines: ['Novecientos metros', 'sobre Bogotá.'],
    desc: 'Mármol de Carrara, roble macizo y acero cepillado. Quirófano propio certificado ISO 7. Una sola paciente en el edificio durante toda la jornada quirúrgica.',
    enlarge: 'Ampliar',
    galleryAria: 'Galería de instalaciones',
    close: 'Cerrar',
    closeGallery: 'Cerrar galería',
    prev: 'Anterior',
    next: 'Siguiente',
    plates: [
      { src: 'consulta', alt: 'Valoración clínica en sala privada con luz natural, Marbre Bogotá' },
      { src: 'protocolo-piel', alt: 'Protocolo de preparación cutánea preoperatoria' },
      { src: 'endolaser', alt: 'Cabina de procedimientos no quirúrgicos' },
      { src: 'toxina', alt: 'Control de seguimiento tras la aplicación de toxina botulínica' },
      { src: 'armonizacion', alt: 'Análisis de proporciones faciales previo a la armonización' },
      { src: 'regenerativa', alt: 'Preparación de bioestimuladores de colágeno' },
    ],
  },

  technology: {
    label: 'Tecnología',
    titleLines: ['El instrumento', 'no opera.'],
    intro: 'Ningún equipo sustituye el criterio. Pero un equipo insuficiente limita lo que ese criterio puede ejecutar. Estos son los cinco que usamos, y la razón exacta de cada uno.',
    marquee: 'Quirófano ISO 7 · Anestesiólogo de planta · Un procedimiento por jornada · ',
    items: [
      { name: 'Piezotome®', desc: 'Rinoplastia ultrasónica de precisión ósea', meta: 'Acteon' },
      { name: 'Vectra® H2', desc: 'Simulación tridimensional preoperatoria', meta: 'Canfield' },
      { name: 'Renuvion®', desc: 'Retracción cutánea por plasma helio', meta: 'Apyx' },
      { name: 'VASER® Lipo', desc: 'Emulsión selectiva por ultrasonido', meta: 'Solta' },
      { name: 'Quirófano ISO 7', desc: 'Flujo laminar y presión positiva', meta: 'Certificado' },
    ],
  },

  testimonials: {
    label: 'Testimonios',
    prev: 'Testimonio anterior',
    next: 'Testimonio siguiente',
    disclaimer: 'Testimonios reproducidos con autorización expresa. Identidades abreviadas a petición de las pacientes. Ningún testimonio ha sido compensado económicamente.',
    items: [
      { quote: 'Llevaba nueve años buscando a alguien que me dijera que no necesitaba nada. La Dra. Restrepo fue la primera en decírmelo, y aun así volví a ella cuando llegó el momento.', author: 'C. M.', meta: 'Rinoplastia · 2024' },
      { quote: 'Mi hermana no notó la cirugía. Notó que había dormido bien. Eso era exactamente lo que yo quería.', author: 'A. V.', meta: 'Lifting profundo · 2023' },
      { quote: 'Me enseñó la simulación en 3D y me advirtió de lo que no podía prometer. Nunca antes un médico me había hablado de límites. Firmé ese mismo día.', author: 'L. G.', meta: 'Armonización facial · 2025' },
    ],
  },

  videos: {
    label: 'En Movimiento',
    titleLines: ['Antes de decidir,', 'infórmese.'],
    desc: 'Dos conversaciones breves sobre lo que conviene saber antes de una cirugía plástica. La decisión mejor tomada es siempre la mejor informada.',
    play: 'Reproducir',
    items: [
      { id: 'Xvyz9POcOYc', thumb: 'video/tips-pita', kicker: 'Preparación', title: 'Ocho decisiones antes de operarse', author: 'Criterio quirúrgico · 6 min' },
      { id: 'zobCkNxt_M0', thumb: 'video/consejos-callejas', kicker: 'Consulta', title: 'Cinco preguntas que debe hacer a su cirujano', author: 'Antes de la valoración · 8 min' },
    ],
  },

  faq: {
    label: 'Preguntas',
    titleLines: ['Lo que otras', 'clínicas evitan', 'responder.'],
    noQuestion: '¿No encuentra su pregunta?',
    writeUs: 'Escríbanos directamente',
    items: [
      { q: '¿Cuánto cuesta la consulta de valoración?', a: 'La consulta tiene un valor de $450.000 COP y dura noventa minutos. Incluye simulación tridimensional Vectra y se descuenta íntegramente del procedimiento si decide operarse con nosotros. No agendamos más de cuatro valoraciones al día.' },
      { q: '¿Cuándo veré el resultado definitivo?', a: 'El edema inicial cede entre la segunda y la cuarta semana, y a los tres meses el resultado es socialmente presentable. Pero el resultado definitivo —el que fotografiamos— aparece a los doce meses en rinoplastia y a los nueve en cirugía corporal. Cualquiera que le prometa menos, le está vendiendo el postoperatorio y no la cirugía.' },
      { q: '¿Puedo operarme si vengo de fuera de Colombia?', a: 'Sí. Coordinamos la valoración inicial por videoconsulta, y nuestro equipo gestiona alojamiento, traslados y acompañamiento clínico. Requerimos una estancia mínima de diez días postoperatorios en Bogotá antes de autorizar un vuelo.' },
      { q: '¿Qué pasa si no soy candidata?', a: 'Se lo diremos en la primera consulta y le devolveremos el importe íntegro. Aproximadamente uno de cada cinco pacientes que nos visita recibe la recomendación de no operarse, o de esperar. Es la parte de nuestro trabajo de la que estamos más orgullosos.' },
      { q: '¿Quién realiza la cirugía?', a: 'Siempre la Dra. Valentina Restrepo, sin excepción y sin cirujanos en formación. Opera un único procedimiento por jornada quirúrgica, acompañada de anestesiólogo de planta e instrumentadora fija. Nunca subcontratamos.' },
      { q: '¿Es seguro operarse en Colombia?', a: 'Lo es cuando el cirujano está certificado por la Sociedad Colombiana de Cirugía Plástica y opera en quirófano habilitado. La complicación en Colombia no nace del país: nace del turismo quirúrgico de bajo coste. Verifique siempre el registro de su cirujano antes de reservar cualquier vuelo.' },
    ],
  },

  booking: {
    label: 'Reserva',
    titleLines: ['Cuatro consultas', 'al día. Ni una', 'más.'],
    intro: 'Noventa minutos, simulación tridimensional incluida y el compromiso de decirle que no si esa es la respuesta correcta. Le contactaremos en menos de veinticuatro horas.',
    contactLabels: { phone: 'Teléfono', email: 'Correo', practice: 'Consultorio', hours: 'Horario' },
    hoursValue: 'Lunes a viernes, 8:00 — 18:00',
    fields: {
      nombre: 'Nombre completo',
      email: 'Correo electrónico',
      telefono: 'Teléfono',
      procedimiento: 'Procedimiento de interés',
      fecha: 'Fecha preferida (opcional)',
      mensaje: 'Cuéntenos brevemente (opcional)',
    },
    dontKnow: 'Aún no lo sé',
    errors: {
      nombre: 'Indíquenos su nombre completo.',
      email: 'Revise el correo: falta el dominio.',
      telefono: 'Un teléfono de contacto válido, con indicativo.',
      procedimiento: 'Seleccione el procedimiento que le interesa.',
      fechaPast: 'Esa fecha ya pasó.',
    },
    submit: 'Enviar solicitud',
    submitHelp: 'Se abrirá WhatsApp con su solicitud redactada. Puede revisarla antes de enviarla.',
    privacy: 'Sus datos se usan únicamente para agendar la consulta y no se comparten con terceros. Ley 1581 de 2012.',
    msg: {
      title: 'Solicitud de valoración — Marbre',
      name: 'Nombre',
      email: 'Correo',
      phone: 'Teléfono',
      procedure: 'Procedimiento',
      date: 'Fecha preferida',
      message: 'Mensaje',
    },
    sent: {
      kicker: 'Solicitud compuesta',
      title: 'Gracias. Hemos abierto WhatsApp con su solicitud.',
      body1: 'Si la ventana no se abrió, escríbanos a',
      body2: '. Respondemos en menos de veinticuatro horas hábiles.',
      again: 'Enviar otra solicitud',
    },
  },

  footer: {
    reserveKicker: 'Reserve su consulta',
    reserveTitle: ['Noventa minutos', 'que cambian', 'la decisión.'],
    contact: 'Contacto',
    cols: [
      { title: 'Instituto', items: [
        { label: 'La Cirujana', id: 'cirujana' },
        { label: 'Instalaciones', id: 'instalaciones' },
        { label: 'Tecnología', id: 'tecnologia' },
        { label: 'Preguntas', id: 'preguntas' },
      ] },
      { title: 'Procedimientos', items: [
        { label: 'Resultados', id: 'resultados' },
        { label: 'Antes y después', id: 'comparador' },
        { label: 'Procedimientos', id: 'especialidades' },
        { label: 'Proceso', id: 'proceso' },
      ] },
    ],
    getHere: 'Cómo llegar',
    openMaps: 'Abrir en Google Maps',
    legal: '© 2026 Marbre · Instituto de Cirugía Plástica · Dra. Valentina Restrepo · Reg. SCCP 4412',
    privacy: 'Política de privacidad',
    data: 'Tratamiento de datos',
    top: 'Volver arriba',
  },

  whatsapp: {
    message: 'Escribir por WhatsApp a Marbre',
    open: 'Ver redes sociales',
    close: 'Cerrar redes sociales',
    social: 'Redes sociales',
  },
}

const en = {
  surgeonTitle: 'Plastic Surgeon · SCCP Member',

  wa: {
    default: 'Good afternoon. I would like to request a consultation at Marbre.',
    service: (s) => `Good afternoon. I would like information about ${s} at Marbre.`,
  },

  nav: {
    aria: 'Main',
    home: 'Marbre — home',
    book: 'Book',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Main menu',
    skip: 'Skip to content',
    langLabel: 'Language',
    links: [
      { id: 'cirujana', label: 'The Surgeon' },
      { id: 'resultados', label: 'Results' },
      { id: 'especialidades', label: 'Procedures' },
      { id: 'proceso', label: 'Process' },
      { id: 'instalaciones', label: 'Facilities' },
      { id: 'peliculas', label: 'In Motion' },
      { id: 'preguntas', label: 'Questions' },
    ],
    contact: 'Consultation',
    practice: 'Practice',
    direct: 'Direct',
  },

  hero: {
    eyebrow: 'Bogotá · Since 2007',
    titleLines: ['The surgery', 'no one'],
    titleEm: 'notices.',
    body: 'One procedure a day. One surgeon. Seventeen years perfecting the hardest art in aesthetic medicine: making the result invisible.',
    cta: 'Request a consultation',
    secondary: 'See real results',
    photoLabel: 'Unretouched photograph · Real patient',
  },

  philosophy: {
    label: 'Philosophy',
    text: 'We don’t chase a fashionable face. We chase yours — the version that time, genetics or circumstance denied you. Every procedure begins with a long conversation and ends when no one can point to what changed.',
    footLeft: 'Marbre · Institute of Plastic Surgery',
    footRight: 'Member of the Colombian Society of Plastic, Aesthetic and Reconstructive Surgery. Licensed and registered with the Health Department.',
  },

  surgeon: {
    label: 'The Surgeon',
    nameLines: ['Dr. Valentina', 'Restrepo'],
    bio1: 'Trained at the National University of Colombia and specialized in structural rhinoplasty at La Paz University Hospital in Madrid. She has operated across four continents and has turned away roughly one in five patients who have sought her out.',
    bio2: 'She performs a single procedure per operating day. She does not delegate, does not supervise from afar, does not share an operating room. She believes plastic surgery is the only medical specialty where the patient arrives healthy, and that this asymmetry demands a prudence the industry has been forgetting.',
    place: 'Bogotá, 2025',
    portrait: 'Portrait',
    figures: [
      { value: '18', label: 'Years in practice' },
      { value: '2,400', label: 'Procedures' },
      { value: '1', label: 'Surgery per day' },
      { value: '0.4%', label: 'Revision rate' },
    ],
  },

  results: {
    label: 'Results',
    titleLines: ['Four cases.', 'No digital retouching.'],
    desc: 'Unedited clinical photography, published with written consent. Each result is individual and is not a promise of an equivalent outcome.',
    continue: 'Continue',
    continueTitle: ['Compare for', 'yourself, millimetre', 'by millimetre.'],
    caseCursor: 'Case',
  },

  comparator: {
    label: 'Before & After',
    titleTop: 'Drag.',
    titleBottom: 'See.',
    before: 'Before',
    after: 'After',
    drag: 'Drag',
    ariaSlider: (t) => `Before and after comparator: ${t}`,
    ariaValue: (p) => `${p}% of the postoperative result visible`,
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    full: 'Fullscreen',
    exitFull: 'Exit fullscreen',
  },

  cases: [
    { id: 'rinoplastia-2', title: 'Secondary rhinoplasty', meta: 'Profile · Consolidated result', before: 'ba/rinoplastia-2-antes', after: 'ba/rinoplastia-2-despues', note: 'Dorsum correction and tip projection after a previous surgery performed at another clinic.' },
    { id: 'lifting', title: 'Deep facelift', meta: 'Front · Consolidated result', before: 'ba/lifting-antes', after: 'ba/lifting-despues', note: 'Tissue repositioning in the mid-face. No apparent skin tension.' },
    { id: 'contorno', title: 'Body contour', meta: 'Front · Consolidated result', before: 'ba/contorno-antes', after: 'ba/contorno-despues', note: 'Waist and abdominal contour redefinition. No scar visible in frame.' },
    { id: 'lipoescultura', title: 'Abdominal contour', meta: 'Abdomen · Consolidated result', before: 'ba/lipoescultura-antes', after: 'ba/lipoescultura-despues', note: 'Correction of laxity and redefinition of the abdominal wall.' },
    { id: 'rinoplastia', title: 'Ultrasonic rhinoplasty', meta: 'Profile · Immediate post-op', showcase: false, before: 'ba/rinoplastia-antes', after: 'ba/rinoplastia-despues', note: 'Dorsal hump reduction. The image is from the first days: the bruising and columellar suture are typical of this phase and fade before the third month.' },
  ],

  specialties: {
    label: 'Specialties',
    title: 'Procedures',
    tabs: { facial: 'Facial', corporal: 'Body' },
    cta: 'Enquire about this procedure',
    items: [
      { n: '01', cat: 'facial', name: 'Ultrasonic Rhinoplasty', tag: 'Facial', img: 'rinoplastia', body: 'Bone reshaping by ultrasound rather than osteotomes. Less bruising, less swelling, and a dorsum that responds to the millimetre. The nose isn’t rebuilt: it’s corrected.' },
      { n: '02', cat: 'facial', name: 'Deep Facelift', tag: 'Facial', img: 'ba/lifting-despues', body: 'A deep plane over the SMAS, repositioning tissue along the vector in which it descended. The skin isn’t stretched — it’s guided back into place.' },
      { n: '03', cat: 'facial', name: 'Facial Harmonization', tag: 'Non-surgical', img: 'toxina', body: 'Hyaluronic acid and toxin in amounts measured in tenths. The goal isn’t volume: it’s the proportion between thirds.' },
      { n: '04', cat: 'corporal', name: 'High-Definition Liposculpture', tag: 'Body', img: 'ba/lipoescultura-despues', body: 'Layered work over the underlying muscular anatomy. We reveal a structure that already exists rather than drawing one that doesn’t.' },
      { n: '05', cat: 'corporal', name: 'Breast Surgery', tag: 'Body', img: 'mamaria', body: 'Implant choice guided by chest measurements, not by catalogue. Dual plane, inframammary incision, a result that ages well.' },
      { n: '06', cat: 'facial', name: 'Regenerative Medicine', tag: 'Non-surgical', img: 'consulta', body: 'Polynucleotides, exosomes and collagen biostimulators. The skin produces what it had stopped producing. No filling, no tightening.' },
    ],
  },

  process: {
    label: 'Process',
    titleLines: ['Five months', 'before the', 'first incision.'],
    intro: 'Surgery lasts hours. The process around it lasts a year. None of its phases is rushed for the sake of a schedule.',
    steps: [
      { n: 'I', title: 'Consultation', time: '90 minutes', body: 'One patient per time slot. We analyse proportions, medical history and — above all — what you expect to see in the mirror. If we’re not the answer, we’ll tell you.' },
      { n: 'II', title: 'Simulation', time: 'Vectra 3D', body: 'A three-dimensional capture of the face or the body contour. You’ll see the projected result before deciding. No surgery should begin with a surprise.' },
      { n: 'III', title: 'Pre-op', time: '3 weeks', body: 'Cardiology assessment, full lab work and a medication-suspension protocol. Safety is the one part of the process that isn’t personalised.' },
      { n: 'IV', title: 'Surgery', time: 'Private theatre', body: 'A staff anaesthetist, invasive monitoring and a single procedure per day. The schedule does not dictate surgical time.' },
      { n: 'V', title: 'Recovery', time: '12 months', body: 'A private suite the first night, manual lymphatic drainage and check-ups on days 1, 7, 30, 90 and 365. The final result takes a year to exist.' },
    ],
  },

  facilities: {
    label: 'Facilities',
    titleLines: ['Nine hundred metres', 'above Bogotá.'],
    desc: 'Carrara marble, solid oak and brushed steel. A private ISO 7-certified operating theatre. A single patient in the building throughout the entire surgical day.',
    enlarge: 'Enlarge',
    galleryAria: 'Facilities gallery',
    close: 'Close',
    closeGallery: 'Close gallery',
    prev: 'Previous',
    next: 'Next',
    plates: [
      { src: 'consulta', alt: 'Clinical consultation in a private room with natural light, Marbre Bogotá' },
      { src: 'protocolo-piel', alt: 'Preoperative skin preparation protocol' },
      { src: 'endolaser', alt: 'Non-surgical procedures cabin' },
      { src: 'toxina', alt: 'Follow-up check after botulinum toxin treatment' },
      { src: 'armonizacion', alt: 'Facial proportion analysis prior to harmonization' },
      { src: 'regenerativa', alt: 'Preparation of collagen biostimulators' },
    ],
  },

  technology: {
    label: 'Technology',
    titleLines: ['The instrument', 'does not operate.'],
    intro: 'No equipment replaces judgement. But inadequate equipment limits what that judgement can carry out. These are the five we use, and the exact reason for each.',
    marquee: 'ISO 7 theatre · Staff anaesthetist · One procedure per day · ',
    items: [
      { name: 'Piezotome®', desc: 'Ultrasonic rhinoplasty, bone-precise', meta: 'Acteon' },
      { name: 'Vectra® H2', desc: 'Three-dimensional preoperative simulation', meta: 'Canfield' },
      { name: 'Renuvion®', desc: 'Helium-plasma skin retraction', meta: 'Apyx' },
      { name: 'VASER® Lipo', desc: 'Selective ultrasonic emulsification', meta: 'Solta' },
      { name: 'ISO 7 Theatre', desc: 'Laminar flow and positive pressure', meta: 'Certified' },
    ],
  },

  testimonials: {
    label: 'Testimonials',
    prev: 'Previous testimonial',
    next: 'Next testimonial',
    disclaimer: 'Testimonials reproduced with express authorization. Identities abbreviated at the patients’ request. No testimonial has been financially compensated.',
    items: [
      { quote: 'For nine years I looked for someone to tell me I didn’t need anything. Dr. Restrepo was the first to say it — and I still came back to her when the time was right.', author: 'C. M.', meta: 'Rhinoplasty · 2024' },
      { quote: 'My sister didn’t notice the surgery. She noticed I’d slept well. That was exactly what I wanted.', author: 'A. V.', meta: 'Deep facelift · 2023' },
      { quote: 'She showed me the 3D simulation and warned me what she couldn’t promise. No doctor had ever spoken to me about limits. I signed that same day.', author: 'L. G.', meta: 'Facial harmonization · 2025' },
    ],
  },

  videos: {
    label: 'In Motion',
    titleLines: ['Before you decide,', 'get informed.'],
    desc: 'Two short conversations on what’s worth knowing before plastic surgery. The best decision is always the best-informed one.',
    play: 'Play',
    items: [
      { id: 'Xvyz9POcOYc', thumb: 'video/tips-pita', kicker: 'Preparation', title: 'Eight decisions before surgery', author: 'Surgical judgement · 6 min' },
      { id: 'zobCkNxt_M0', thumb: 'video/consejos-callejas', kicker: 'Consultation', title: 'Five questions to ask your surgeon', author: 'Before your consultation · 8 min' },
    ],
  },

  faq: {
    label: 'Questions',
    titleLines: ['What other', 'clinics avoid', 'answering.'],
    noQuestion: 'Can’t find your question?',
    writeUs: 'Write to us directly',
    items: [
      { q: 'How much does the consultation cost?', a: 'The consultation costs $450,000 COP and lasts ninety minutes. It includes a Vectra three-dimensional simulation and is fully deducted from the procedure if you decide to operate with us. We book no more than four consultations a day.' },
      { q: 'When will I see the final result?', a: 'The initial swelling subsides between the second and fourth week, and by three months the result is socially presentable. But the definitive result — the one we photograph — appears at twelve months for rhinoplasty and nine for body surgery. Anyone who promises you less is selling you the recovery, not the surgery.' },
      { q: 'Can I have surgery if I’m coming from outside Colombia?', a: 'Yes. We coordinate the initial assessment by video consultation, and our team arranges accommodation, transfers and clinical support. We require a minimum ten-day postoperative stay in Bogotá before authorizing a flight.' },
      { q: 'What happens if I’m not a candidate?', a: 'We’ll tell you at the first consultation and refund the full amount. Roughly one in five patients who visit us is advised not to operate, or to wait. It’s the part of our work we’re proudest of.' },
      { q: 'Who performs the surgery?', a: 'Always Dr. Valentina Restrepo, without exception and without trainee surgeons. She performs a single procedure per operating day, accompanied by a staff anaesthetist and a fixed scrub nurse. We never subcontract.' },
      { q: 'Is it safe to have surgery in Colombia?', a: 'It is when the surgeon is certified by the Colombian Society of Plastic Surgery and operates in a licensed theatre. Complications in Colombia don’t come from the country: they come from low-cost surgical tourism. Always verify your surgeon’s registration before booking any flight.' },
    ],
  },

  booking: {
    label: 'Booking',
    titleLines: ['Four consultations', 'a day. Not one', 'more.'],
    intro: 'Ninety minutes, three-dimensional simulation included, and the commitment to tell you no if that is the right answer. We’ll be in touch within twenty-four hours.',
    contactLabels: { phone: 'Phone', email: 'Email', practice: 'Practice', hours: 'Hours' },
    hoursValue: 'Monday to Friday, 8:00 — 18:00',
    fields: {
      nombre: 'Full name',
      email: 'Email address',
      telefono: 'Phone',
      procedimiento: 'Procedure of interest',
      fecha: 'Preferred date (optional)',
      mensaje: 'Tell us briefly (optional)',
    },
    dontKnow: 'I’m not sure yet',
    errors: {
      nombre: 'Please tell us your full name.',
      email: 'Check the email: the domain is missing.',
      telefono: 'A valid contact phone, with country code.',
      procedimiento: 'Select the procedure you’re interested in.',
      fechaPast: 'That date has already passed.',
    },
    submit: 'Send request',
    submitHelp: 'WhatsApp will open with your request drafted. You can review it before sending.',
    privacy: 'Your data is used only to schedule the consultation and is not shared with third parties. Colombian Law 1581 of 2012.',
    msg: {
      title: 'Consultation request — Marbre',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      procedure: 'Procedure',
      date: 'Preferred date',
      message: 'Message',
    },
    sent: {
      kicker: 'Request drafted',
      title: 'Thank you. We’ve opened WhatsApp with your request.',
      body1: 'If the window didn’t open, write to us at',
      body2: '. We reply within twenty-four business hours.',
      again: 'Send another request',
    },
  },

  footer: {
    reserveKicker: 'Book your consultation',
    reserveTitle: ['Ninety minutes', 'that change', 'the decision.'],
    contact: 'Contact',
    cols: [
      { title: 'Institute', items: [
        { label: 'The Surgeon', id: 'cirujana' },
        { label: 'Facilities', id: 'instalaciones' },
        { label: 'Technology', id: 'tecnologia' },
        { label: 'Questions', id: 'preguntas' },
      ] },
      { title: 'Procedures', items: [
        { label: 'Results', id: 'resultados' },
        { label: 'Before & after', id: 'comparador' },
        { label: 'Procedures', id: 'especialidades' },
        { label: 'Process', id: 'proceso' },
      ] },
    ],
    getHere: 'Getting here',
    openMaps: 'Open in Google Maps',
    legal: '© 2026 Marbre · Institute of Plastic Surgery · Dr. Valentina Restrepo · Reg. SCCP 4412',
    privacy: 'Privacy policy',
    data: 'Data processing',
    top: 'Back to top',
  },

  whatsapp: {
    message: 'Message Marbre on WhatsApp',
    open: 'View social media',
    close: 'Close social media',
    social: 'Social media',
  },
}

export const CONTENT = { es, en }
export const LANGS = [
  { code: 'es', label: 'Español', short: 'ES', flag: 'co' },
  { code: 'en', label: 'English', short: 'EN', flag: 'gb' },
]
