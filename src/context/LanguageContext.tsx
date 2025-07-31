import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback
} from "react"
import i18n from "@/i18n/config"

// === Language Meta Types ===
export interface LanguageMeta {
  name: string
  flag: string
  dir: "ltr" | "rtl"
}

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES

export interface LanguageContextType {
  lang: LanguageCode
  langMeta: LanguageMeta
  switchLanguage: (code: LanguageCode) => void
  availableLanguages: Record<LanguageCode, LanguageMeta>
}

// === Languages Supported by Fixiva ===
const SUPPORTED_LANGUAGES = {
  en: { name: "English", flag: "🇺🇸", dir: "ltr" },
  hi: { name: "हिंदी", flag: "🇮🇳", dir: "ltr" },
  bn: { name: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  ur: { name: "اردو", flag: "🇵🇰", dir: "rtl" },
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl" }
} as const

const DEFAULT_LANG: LanguageCode = "en"
const STORAGE_KEY = "fixiva_lang"

// === Create Context ===
export const LanguageContext = createContext<LanguageContextType | null>(null)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<LanguageCode>(DEFAULT_LANG)

  // Load language from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    const selected = stored && SUPPORTED_LANGUAGES[stored] ? stored : DEFAULT_LANG

    setLang(selected)
    i18n.changeLanguage(selected)
    document.documentElement.dir = SUPPORTED_LANGUAGES[selected].dir
  }, [])

  // Handle switching languages
  const switchLanguage = useCallback((code: LanguageCode) => {
    if (!SUPPORTED_LANGUAGES[code]) return
    setLang(code)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, code)
    }
    i18n.changeLanguage(code)
    document.documentElement.dir = SUPPORTED_LANGUAGES[code].dir
  }, [])

  return (
    <LanguageContext.Provider
      value={{
        lang,
        langMeta: SUPPORTED_LANGUAGES[lang],
        switchLanguage,
        availableLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// === Hook ===
export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>")
  return ctx
}
