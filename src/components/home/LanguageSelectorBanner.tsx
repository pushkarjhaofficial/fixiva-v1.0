// src/components/home/LanguageSelectorBanner.tsx

import React from "react"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

export interface LanguageSelectorBannerProps {
  className?: string
}

const LanguageSelectorBanner: React.FC<LanguageSelectorBannerProps> = ({ className }) => {
  const { i18n } = useTranslation()
  const languages = ["en", "hi", "ar", "fr", "es"]

  return (
    <div className={clsx("py-4 bg-[--color-bg] text-center text-sm", className)}>
      {languages.map(lang => (
        <button
          key={lang}
          className={clsx("mx-2 px-2 py-1 text-xs font-semibold rounded", {
            "bg-[--color-primary] text-white": i18n.language === lang,
            "text-[--color-text-secondary]": i18n.language !== lang,
          })}
          onClick={() => i18n.changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelectorBanner
