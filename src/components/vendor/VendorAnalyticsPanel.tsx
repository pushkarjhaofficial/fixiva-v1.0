import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaChartBar } from "react-icons/fa"

export interface Metric {
  label: string
  value: string | number
  description?: string
}
export interface VendorAnalyticsPanelProps {
  metrics: Metric[]
  className?: string
}
const VendorAnalyticsPanel: React.FC<VendorAnalyticsPanelProps> = ({
  metrics, className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaChartBar /> {t("vendor.analytics") || "Analytics"}
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <li key={i} className={clsx("border rounded p-3 flex flex-col items-center", subText)}>
            <span className={clsx("font-bold text-2xl", text)}>{m.value}</span>
            <span>{m.label}</span>
            {m.description && <span className="text-xs">{m.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default VendorAnalyticsPanel
