// src/components/home/HomeCTASection.tsx

import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import clsx from "clsx"

export interface HomeCTASectionProps {
  className?: string
}

const HomeCTASection: React.FC<HomeCTASectionProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <section className={clsx("py-16 px-6 text-center bg-[--color-bg]", className)}>
      <h2 className="text-3xl font-bold mb-4 text-[--color-text]">
        {t("home.cta.title")}
      </h2>
      <p className="text-lg mb-6 text-[--color-text-secondary]">
        {t("home.cta.subtitle")}
      </p>
      <Link
        to="/booking"
        className="inline-block px-8 py-3 rounded-md text-lg font-semibold bg-[--color-primary] text-white hover:bg-[--color-primary]/90 transition"
      >
        {t("home.cta.button")}
      </Link>
    </section>
  )
}

export default HomeCTASection
