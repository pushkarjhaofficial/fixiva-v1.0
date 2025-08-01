// src/components/home/EnterpriseCTASection.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export interface EnterpriseCTASectionProps {
  className?: string
}

const EnterpriseCTASection: React.FC<EnterpriseCTASectionProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <section className={clsx("py-20 px-6 bg-[--color-bg-secondary] text-center", className)}>
      <h2 className="text-3xl font-bold mb-4 text-[--color-text-secondary]">
        {t("home.enterprise.title")}
      </h2>
      <p className="text-lg mb-6 text-[--color-text-secondary]">
        {t("home.enterprise.subtitle")}
      </p>
      <Link
        to="/partner"
        className="inline-block px-8 py-3 rounded-md text-lg font-semibold bg-[--color-primary] text-white hover:bg-[--color-primary]/90 transition"
      >
        {t("home.enterprise.button")}
      </Link>
    </section>
  )
}

export default EnterpriseCTASection
