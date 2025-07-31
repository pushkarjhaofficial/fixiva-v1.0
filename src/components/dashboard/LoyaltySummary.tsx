// src/components/dashboard/LoyaltySummary.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"

export interface LoyaltySummaryProps {
  /** Total loyalty points the user has earned */
  points: number
  /** Total recycle bonuses (coins) the user has accrued */
  recycleCoins: number
  /** Points required to reach the next loyalty tier */
  nextTierThreshold?: number
  /** Optional extra classes */
  className?: string
}

/**
 * LoyaltySummary
 * Displays a summary of loyalty points, recycle coins, and progress toward next tier.
 * Responsive, theme-aware, i18n-ready.
 */
const LoyaltySummary: React.FC<LoyaltySummaryProps> = ({
  points,
  recycleCoins,
  nextTierThreshold,
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const progress =
    nextTierThreshold && nextTierThreshold > 0
      ? Math.min(100, Math.round((points / nextTierThreshold) * 100))
      : undefined

  return (
    <div
      className={clsx(
        "bg-[--color-bg] text-[--color-text] shadow rounded-lg p-6 grid gap-6 sm:grid-cols-2",
        className
      )}
    >
      {/* Points Card */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium mb-2">
          {t("dashboard.loyalty.pointsLabel")}
        </span>
        <span className="text-4xl font-bold">{points}</span>
      </div>

      {/* Recycle Coins Card */}
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium mb-2">
          {t("dashboard.loyalty.recycleCoinsLabel")}
        </span>
        <span className="text-4xl font-bold">{recycleCoins}</span>
      </div>

      {/* Progress to Next Tier */}
      {progress !== undefined && (
        <div className="sm:col-span-2">
          <span className="text-sm font-medium">
            {t("dashboard.loyalty.nextTierProgress", { threshold: nextTierThreshold })}
          </span>
          <div className="w-full bg-[--color-border] rounded-full h-3 mt-1 overflow-hidden">
            <div
              className={clsx(
                "h-full rounded-full transition-all",
                theme === "dark" ? "bg-[--color-primary]" : "bg-[--color-primary]"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-right mt-1">
            {t("dashboard.loyalty.progressPercent", { percent: progress })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LoyaltySummary
