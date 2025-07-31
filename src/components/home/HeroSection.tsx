// src/components/home/HeroSection.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { Link } from "react-router-dom"

export interface HeroSectionProps {
  /** Optional extra classes */
  className?: string
}

/**
 * HeroSection
 * World-class landing page hero with headline, subheadline,
 * primary & secondary CTAs, responsive design, theming, and i18n.
 */
const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  // Background image varies by theme
  const bgImage =
    theme === "dark"
      ? "url('/images/hero-dark.jpg')"
      : "url('/images/hero-light.jpg')"

  return (
    <section
      className={clsx(
        "relative flex items-center justify-center text-center text-[--color-text]",
        "h-screen bg-cover bg-center",
        className
      )}
      style={{
        backgroundImage: bgImage,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
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
