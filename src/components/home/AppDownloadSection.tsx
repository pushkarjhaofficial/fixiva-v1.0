// src/components/home/AppDownloadSection.tsx

import React from "react"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

export interface AppDownloadSectionProps {
  className?: string
}

const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <section className={clsx("py-16 bg-[--color-bg] text-[--color-text]", className)}>
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{t("home.app.title")}</h2>
        <p className="mb-6 text-lg">{t("home.app.subtitle")}</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://play.google.com/store/apps/details?id=com.fixiva.app" target="_blank" rel="noopener noreferrer">
            <img src="/images/google-play-badge.svg" alt="Google Play" className="h-12" />
          </a>
          <a href="https://apps.apple.com/app/fixiva/id123456789" target="_blank" rel="noopener noreferrer">
            <img src="/images/app-store-badge.svg" alt="App Store" className="h-12" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default AppDownloadSection
