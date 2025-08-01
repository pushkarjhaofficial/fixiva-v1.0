// src/components/vendor/VendorStatsWidget.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaBriefcase, FaCheck, FaTools, FaMoneyBillWave } from "react-icons/fa"

export interface VendorStatsWidgetProps {
  totalJobs: number
  completedJobs: number
  pendingJobs: number
  totalEarnings: number
  className?: string
}

/**
 * VendorStatsWidget
 * High-impact, modular stat cards for vendor dashboard header.
 */
const VendorStatsWidget: React.FC<VendorStatsWidgetProps> = ({
  totalJobs,
  completedJobs,
  pendingJobs,
  totalEarnings,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const label = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const value = theme === "dark" ? "text-white" : "text-gray-900"

  const stats = [
    {
      icon: <FaBriefcase className="text-[--color-primary]" />,
      label: t("vendor.totalJobs") || "Total Jobs",
      value: totalJobs,
    },
    {
      icon: <FaCheck className="text-green-600" />,
      label: t("vendor.completedJobs") || "Completed",
      value: completedJobs,
    },
    {
      icon: <FaTools className="text-yellow-600" />,
      label: t("vendor.pendingJobs") || "Pending",
      value: pendingJobs,
    },
    {
      icon: <FaMoneyBillWave className="text-green-400" />,
      label: t("vendor.totalEarnings") || "Earnings",
      value: new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "INR",
      }).format(totalEarnings),
    }
  ]

  return (
    <div className={clsx("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
      {stats.map((s, i) => (
        <div key={i} className={clsx("flex flex-col items-center border rounded-lg p-4 shadow-sm", cardBg, border)}>
          <div className="mb-1 text-2xl">{s.icon}</div>
          <div className={clsx("font-bold text-lg", value)}>{s.value}</div>
          <div className={clsx("text-xs mt-1", label)}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}

export default VendorStatsWidget
