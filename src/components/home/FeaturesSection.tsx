import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import {
  FaTools,
  FaRecycle,
  FaShieldAlt,
  FaClock,
  FaBolt
} from "react-icons/fa"

export interface FeaturesSectionProps {
  className?: string
}

/**
 * FeaturesSection
 * - Highlights major Fixiva capabilities.
 * - Fully internationalized, responsive, theme-aware, and optimized.
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = ({ className }) => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()

  const features = [
    {
      icon: <FaTools />,
      title: t("home.features.repair.title"),
      description: t("home.features.repair.description")
    },
    {
      icon: <FaRecycle />,
      title: t("home.features.recycle.title"),
      description: t("home.features.recycle.description")
    },
    {
      icon: <FaBolt />,
      title: t("home.features.instant.title"),
      description: t("home.features.instant.description")
    },
    {
      icon: <FaShieldAlt />,
      title: t("home.features.trusted.title"),
      description: t("home.features.trusted.description")
    },
    {
      icon: <FaClock />,
      title: t("home.features.schedule.title"),
      description: t("home.features.schedule.description")
    }
  ]

  return (
    <section
      role="region"
      aria-labelledby="features-section-heading"
      dir={i18n.dir()}
      className={clsx(
        "py-16 bg-[--color-bg-secondary] text-[--color-text-secondary]",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2
          id="features-section-heading"
          className="text-3xl font-bold text-center mb-12"
        >
          {t("home.features.heading")}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <article
              key={idx}
              role="article"
              aria-label={feature.title}
              className={clsx(
                "flex flex-col items-center text-center p-6",
                "bg-[--color-bg] rounded-lg shadow-lg",
                "transition-transform transform hover:scale-[1.03] hover:shadow-xl"
              )}
            >
              <div className="text-5xl mb-4 text-[--color-primary]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
