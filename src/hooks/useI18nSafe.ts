import { useTranslation } from "react-i18next"
import type { TFunction } from "i18next"
import { useMemo } from "react"

/**
 * useI18nSafe
 * Safely wraps useTranslation for SSR, fallback, and runtime key checks.
 *
 * - Ensures no missing keys crash render
 * - Returns a t() that always provides a string (never undefined)
 * - Can auto-inject defaultValue for missing translations
 */
export const useI18nSafe = (
  ns?: string | string[],
  defaultLang = "en"
): { t: TFunction; i18n: any } => {
  const { t, i18n } = useTranslation(ns)

  // Wrap t to always fallback to defaultValue or key if missing
  const safeT: TFunction = useMemo(
    () =>
      ((key: string, opt: any = {}) => {
        const val = t(key, { ...opt, defaultValue: opt.defaultValue || key })
        return typeof val === "string" ? val : key
      }) as TFunction,
    [t]
  )

  return { t: safeT, i18n }
}

export default useI18nSafe
