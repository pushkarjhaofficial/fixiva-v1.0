// src/components/home/GovtUseCasesSection.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"

export interface GovtUseCasesSectionProps {
  className?: string
}

const GovtUseCasesSection: React.FC<GovtUseCasesSectionProps> = ({ className }) => {
  const { t } = useTranslation()

  const useCases = [
    t("home.govt.hospitals"),
    t("home.govt.schools"),
    t("home.govt.smartCities"),
    t("home.govt.ruralInfra"),
    t("home.govt.psuAssets"),
    t("home.govt.emergencyRepairs"),
  ]

  return (
    <section className={clsx("py-16 bg-[--color-bg] text-[--color-text]", className)}>
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">{t("home.govt.title")}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6 text-sm">
          {useCases.map((useCase, i) => (
            <li key={i} className="bg-[--color-bg-secondary] p-4 rounded shadow">
              {useCase}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default GovtUseCasesSection
