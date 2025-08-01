import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { Link } from "react-router-dom"

export interface HeroSectionProps {
  className?: string
}

/**
 * HeroSection
 * - SSR-safe landing section with background image
 * - i18n + RTL + responsive + theme-aware
 * - CTA buttons with full accessibility and visual priority
 */
const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()

  const bgImage =
    theme === "dark"
      ? "url('/images/hero-dark.jpg')"
      : "url('/images/hero-light.jpg')"

  return (
    <section
      role="region"
      aria-labelledby="hero-heading"
      dir={i18n.dir()}
      className={clsx(
        "relative flex items-center justify-center text-center",
        "h-screen bg-cover bg-center text-[--color-text]",
        className
      )}
      style={{ backgroundImage: bgImage }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 max-w-3xl px-4">
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
        >
          {t("home.heroHeadline")}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl mb-6 leading-relaxed">
          {t("home.heroSubheadline")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/booking"
            className="px-6 py-3 rounded-md text-lg font-semibold bg-[--color-primary] text-white hover:bg-[--color-primary]/90 transition"
          >
            {t("home.ctaPrimary")}
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-md text-lg font-medium border border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary]/10 transition"
          >
            {t("home.ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
