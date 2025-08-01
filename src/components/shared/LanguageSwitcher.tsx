// src/components/shared/LanguageSwitcher.tsx

import React from "react"
import { useTranslation } from "react-i18next"

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const languages = [
    { code: "en", label: "🇺🇸" },
    { code: "hi", label: "🇮🇳" },
    { code: "ar", label: "🇸🇦" },
    { code: "es", label: "🇪🇸" }
  ]

  return (
    <select
      className="bg-transparent text-sm outline-none"
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSwitcher
