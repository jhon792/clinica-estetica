/* eslint-disable react-refresh/only-export-components -- archivo de contexto:
   conviven el proveedor y sus hooks; separarlos no aporta nada aquí. */
import { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT } from './content'

const LangContext = createContext(null)

const STORAGE_KEY = 'marbre-lang'

function initialLang() {
  if (typeof window === 'undefined') return 'es'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  // Primera visita: si el navegador está en inglés, arrancamos en inglés.
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

/**
 * Proveedor de idioma. Guarda la elección en localStorage y mantiene el
 * atributo `lang` del documento sincronizado (importa para accesibilidad y
 * para que el corrector ortográfico del navegador acierte). El cambio es
 * instantáneo: React re-renderiza con el nuevo diccionario, sin recargar.
 */
export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch { /* modo privado */ }
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang debe usarse dentro de <LangProvider>')
  return ctx
}

/** El diccionario del idioma activo. */
export function useContent() {
  const { lang } = useLang()
  return CONTENT[lang]
}
