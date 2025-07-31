// src/components/dashboard/StatsCard.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

export interface StatsCardProps {
  /** Title of the metric, e.g. "Total Bookings" */
  title: string
  /** Main value to display, e.g. 128 */
  value: number | string
  /** Optional icon to show alongside the title */
  icon?: React.ReactNode
  /** Change since last period (positive or negative) */
  delta?: number
  /** Unit for the delta, e.g. "%" or "" */
  deltaUnit?: string
  /** Extra wrapper classes */
  className?: string
}

/**
 * StatsCard
 * Displays a KPI card with title, value, optional icon, and delta indicator.
 * World-class, responsive, theme-aware, i18n-ready, and accessible.
 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  delta,
  deltaUnit = "",
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const isPositive = (delta ?? 0) >= 0

  const deltaColor = isPositive ? "text-green-500" : "text-red-500"
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const textColor = theme === "dark" ? "text-white" : "text-gray-900"

  return (
    <div
      role="region"
      aria-label={t("dashboard.statsCard", { title })}
      className={clsx(
        "flex items-center p-4 rounded-lg shadow border",
        bgColor,
        borderColor,
        className
      )}
    >
      {icon && (
        <div className="mr-4 text-2xl text-[--color-primary] flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <dt className={clsx("text-sm font-medium", textColor)}>{t(title)}</dt>
        <dd className={clsx("mt-1 text-3xl font-semibold", textColor)}>
          {value}
        </dd>
      </div>
      {typeof delta === "number" && (
        <div className="flex items-center ml-4">
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          <span className={clsx("ml-1 text-sm font-medium", deltaColor)}>
            {Math.abs(delta)}
            {deltaUnit}
          </span>
        </div>
      )}
    </div>
  )
}

export default StatsCard
