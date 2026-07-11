import { useMemo, useState } from 'react'
import { SectionMark, Lines, Rise } from '../components/Type'
import { useReveal } from '../hooks/useReveal'
import { useContent } from '../i18n'
import { EMAIL, PHONE, ADDRESS, CITY, WA_NUMBER } from '../config'

// Reglas de validación. La lógica es fija; los textos de error llegan del
// diccionario del idioma activo (E), así el mensaje se traduce con la web.
const rulesFor = (E) => ({
  nombre: (v) => (v.trim().length < 3 ? E.nombre : ''),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? E.email : ''),
  telefono: (v) => {
    const d = v.replace(/\D/g, '')
    return d.length < 7 || d.length > 15 ? E.telefono : ''
  },
  procedimiento: (v) => (!v ? E.procedimiento : ''),
  fecha: (v) => {
    if (!v) return ''
    // Comparación en fecha local: `new Date('2026-07-10')` se interpreta como
    // UTC y en Bogotá (UTC-5) retrocedería un día.
    const [y, m, d] = v.split('-').map(Number)
    const chosen = new Date(y, m - 1, d)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return chosen < today ? E.fechaPast : ''
  },
  mensaje: () => '',
})

export default function Booking() {
  const c = useContent()
  const t = c.booking
  const SPECIALTIES = c.specialties.items
  const root = useReveal({ threshold: 0.08 })
  const [values, setValues] = useState({
    nombre: '', email: '', telefono: '', procedimiento: '', fecha: '', mensaje: '',
  })
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)

  const RULES = useMemo(() => rulesFor(t.errors), [t.errors])
  const errors = useMemo(
    () => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, RULES[k](v)])),
    [values, RULES]
  )
  const valid = Object.values(errors).every((e) => !e)

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))
  const blur = (name) => () => setTouched((tt) => ({ ...tt, [name]: true }))
  const errorOf = (name) => (touched[name] ? errors[name] : '')

  const message = useMemo(() => {
    const M = t.msg
    const l = [
      M.title,
      ``,
      `${M.name}: ${values.nombre}`,
      `${M.email}: ${values.email}`,
      `${M.phone}: ${values.telefono}`,
      `${M.procedure}: ${values.procedimiento}`,
    ]
    if (values.fecha) l.push(`${M.date}: ${values.fecha}`)
    if (values.mensaje.trim()) l.push(``, `${M.message}: ${values.mensaje.trim()}`)
    return l.join('\n')
  }, [values, t.msg])

  const submit = (e) => {
    e.preventDefault()
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))
    if (!valid) {
      // Llevar el foco al primer campo con error: sin esto, en un formulario
      // largo el usuario no sabe qué ha fallado.
      const first = Object.keys(values).find((k) => errors[k])
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    setSent(true)
  }

  const today = new Date()
  const min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const FIELDS = [
    { name: 'nombre', label: t.fields.nombre, type: 'text', autoComplete: 'name' },
    { name: 'email', label: t.fields.email, type: 'email', autoComplete: 'email' },
    { name: 'telefono', label: t.fields.telefono, type: 'tel', autoComplete: 'tel' },
  ]

  return (
    <section id="reserva" ref={root} className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10">
        <SectionMark index="IX" label={t.label} />

        <div className="mt-14 grid grid-cols-1 gap-y-16 md:mt-20 lg:grid-cols-12 lg:gap-x-20">
          {/* Contexto */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] font-light leading-[1.04] tracking-[-0.02em]">
              <Lines lines={t.titleLines} step={110} />
            </h2>

            <Rise delay={340} className="mt-8">
              <p className="max-w-[42ch] text-[14.5px] leading-[1.9] font-light text-slate-ink">
                {t.intro}
              </p>
            </Rise>

            <div className="mt-14 space-y-8 border-t border-ink/8 pt-10">
              <Contact label={t.contactLabels.phone} value={PHONE} href={`tel:${PHONE.replace(/\s/g, '')}`} />
              <Contact label={t.contactLabels.email} value={EMAIL} href={`mailto:${EMAIL}?subject=${encodeURIComponent(t.msg.title)}`} />
              <Contact label={t.contactLabels.practice} value={`${ADDRESS} · ${CITY}`} />
              <Contact label={t.contactLabels.hours} value={t.hoursValue} />
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <Sent onReset={() => setSent(false)} email={EMAIL} t={t.sent} />
            ) : (
              <form onSubmit={submit} noValidate>
                {FIELDS.map((f, i) => (
                  <Field
                    key={f.name}
                    {...f}
                    delay={i * 90}
                    value={values[f.name]}
                    error={errorOf(f.name)}
                    onChange={set(f.name)}
                    onBlur={blur(f.name)}
                  />
                ))}

                <Field
                  name="procedimiento"
                  label={t.fields.procedimiento}
                  as="select"
                  delay={270}
                  value={values.procedimiento}
                  error={errorOf('procedimiento')}
                  onChange={set('procedimiento')}
                  onBlur={blur('procedimiento')}
                >
                  <option value=""></option>
                  {SPECIALTIES.map((s) => <option key={s.n} value={s.name}>{s.name}</option>)}
                  <option value={t.dontKnow}>{t.dontKnow}</option>
                </Field>

                <Field
                  name="fecha"
                  label={t.fields.fecha}
                  type="date"
                  delay={360}
                  min={min}
                  value={values.fecha}
                  error={errorOf('fecha')}
                  onChange={set('fecha')}
                  onBlur={blur('fecha')}
                  alwaysFloat
                />

                <Field
                  name="mensaje"
                  label={t.fields.mensaje}
                  as="textarea"
                  delay={450}
                  value={values.mensaje}
                  error=""
                  onChange={set('mensaje')}
                  onBlur={blur('mensaje')}
                />

                <Rise delay={540} className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    data-cursor="link"
                    data-cursor-bg="dark"
                    className="group flex items-center gap-4 rounded-full bg-ink py-3 pl-8 pr-3 text-ivory transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink/90 active:scale-[0.97] disabled:opacity-40"
                  >
                    <span className="text-[10px] tracking-[0.22em] uppercase">{t.submit}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-ivory/20">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  <p className="max-w-[30ch] text-[11px] leading-relaxed text-stone">
                    {t.submitHelp}
                  </p>
                </Rise>

                <p className="mt-8 text-[11px] leading-relaxed text-stone">
                  {t.privacy}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Campo con etiqueta flotante. El error solo aparece tras el primer `blur`:
 * marcar en rojo un correo a medio escribir es hostil.
 */
function Field({ name, label, type = 'text', as, value, error, onChange, onBlur, delay = 0, children, alwaysFloat, ...rest }) {
  const filled = alwaysFloat || String(value).length > 0
  const id = `f-${name}`
  const common = {
    id,
    name,
    value,
    onChange,
    onBlur,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-err` : undefined,
    className:
      'peer w-full appearance-none border-0 border-b border-ink/15 bg-transparent pb-3 pt-7 text-[15px] font-light text-ink outline-none transition-colors duration-500 focus:border-ink',
    ...rest,
  }

  return (
    <Rise delay={delay} className="relative pt-2">
      <div className="relative">
        {as === 'textarea' ? (
          <textarea {...common} rows={3} />
        ) : as === 'select' ? (
          <select {...common}>{children}</select>
        ) : (
          <input {...common} type={type} />
        )}

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 origin-left transition-all duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            filled
              ? 'top-0 text-[10px] tracking-[0.2em] uppercase text-stone'
              : 'top-6 text-[15px] font-light text-stone'
          } peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-ink`}
        >
          {label}
        </label>

        {/* Filete que se dibuja bajo el campo enfocado. */}
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] peer-focus:scale-x-100" />
      </div>

      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ maxHeight: error ? '2.5rem' : '0rem', opacity: error ? 1 : 0 }}
      >
        <p id={`${id}-err`} role="alert" className="pt-2.5 text-[11.5px] text-signal">
          {error}
        </p>
      </div>
    </Rise>
  )
}

function Contact({ label, value, href }) {
  const inner = <span className="text-[14px] font-light text-ink">{value}</span>
  return (
    <div className="rise flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
      <span className="eyebrow w-28 shrink-0">{label}</span>
      {href ? (
        <a href={href} data-cursor="link" className="group relative">
          {inner}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
        </a>
      ) : inner}
    </div>
  )
}

function Sent({ onReset, email, t }) {
  return (
    <div className="border-t border-ink/10 pt-12" role="status">
      <p className="eyebrow mb-6">{t.kicker}</p>
      <p className="max-w-[30ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.2] tracking-[-0.015em] text-ink">
        {t.title}
      </p>
      <p className="mt-8 max-w-[46ch] text-[14px] leading-[1.9] font-light text-slate-ink">
        {t.body1}{' '}
        <a href={`mailto:${email}`} className="border-b border-ink/30 pb-0.5 text-ink transition-colors hover:border-ink" data-cursor="link">
          {email}
        </a>
        {t.body2}
      </p>
      <button
        onClick={onReset}
        data-cursor="link"
        className="group relative mt-12 text-[10px] tracking-[0.22em] uppercase text-ink"
      >
        {t.again}
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-ink/30 transition-transform duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:origin-right group-hover:scale-x-0" />
      </button>
    </div>
  )
}
