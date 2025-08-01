import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import {
  FaDownload,
  FaCalendarAlt,
  FaWrench,
  FaCoins,
} from "react-icons/fa"

export interface HowItWorksSectionProps {
  className?: string
}

/**
 * HowItWorksSection
 * - Guides users through the Fixiva process
 * - Theme-aware, fully translated, and accessible
 * - Layout scales across all screen sizes
 */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ className }) => {
  const { t, i18n } = useTranslation()

  const steps = [
    {
      icon: <FaDownload />,
      title: t("home.howItWorks.steps.download.title"),
      description: t("home.howItWorks.steps.download.description"),
    },
    {
      icon: <FaCalendarAlt />,
      title: t("home.howItWorks.steps.book.title"),
      description: t("home.howItWorks.steps.book.description"),
    },
    {
      icon: <FaWrench />,
      title: t("home.howItWorks.steps.fix.title"),
      description: t("home.howItWorks.steps.fix.description"),
    },
    {
      icon: <FaCoins />,
      title: t("home.howItWorks.steps.earn.title"),
      description: t("home.howItWorks.steps.earn.description"),
    },
  ]

  return (
    <section
      role="region"
      aria-labelledby="how-it-works-heading"
      dir={i18n.dir()}
      className={clsx(
        "py-16 bg-[--color-bg] text-[--color-text]",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2
          id="how-it-works-heading"
          className="text-3xl font-bold mb-10"
        >
          {t("home.howItWorks.heading")}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 bg-[--color-bg-secondary] rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-5xl mb-4 text-[--color-primary]">
                {step.icon}
              </span>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
