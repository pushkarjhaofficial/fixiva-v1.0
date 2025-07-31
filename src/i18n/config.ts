// src/i18n/config.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: {} },
    hi: { translation: {} },
    // other languages…
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n // ✅ This is what you should import in LanguageContext
