import { useContext } from "react"
import { LanguageContext } from "@/context/LanguageContext"

export interface LanguageMeta {
  /** Display name, e.g. "English", "हिन्दी" */
  name: string
  /** Flag emoji or icon */
  flag: string
  /** Text direction */
  dir: "ltr" | "rtl"
}

export interface UseLanguageReturn {
  /** Current language code, e.g. "en", "hi" */
  lang: string
  /** All available languages */
  availableLanguages: Record<string, LanguageMeta>
  /** Switch to another language code */
  switchLanguage: (code: string) => void
}

/**
 * useLanguage
 * Typed, SSR-safe access to LanguageContext for i18n.
 * Must be used within <LanguageProvider>.
 */
export const useLanguage = (): UseLanguageReturn => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx as UseLanguageReturn
}

export default useLanguage