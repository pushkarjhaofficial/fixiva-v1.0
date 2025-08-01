// src/components/admin/AdminRecycleStats.tsx

import React from "react"
import clsx from "clsx"
import { FaRecycle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"

export interface RecycleStat {
  type: string
  count: number
  weight?: number // in kg
}

export interface AdminRecycleStatsProps {
  stats: RecycleStat[]
  className?: string
}

const AdminRecycleStats: React.FC<AdminRecycleStatsProps> = ({
  stats,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", bg, border, className)}
      aria-labelledby="admin-recycle-stats-title"
    >
      <h2
        id="admin-recycle-stats-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaRecycle aria-hidden />
        {t("admin.recycleStats") || "Recycling Stats"}
      </h2>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.length === 0 ? (
          <li
            className={clsx("col-span-full text-center text-sm", subText)}
            aria-live="polite"
          >
            {t("admin.noRecycleStats") || "No recycling data available."}
          </li>
        ) : (
          stats.map((stat, i) => (
            <li
              key={i}
              className={clsx("border rounded p-4 text-center shadow-sm", border, "bg-[--color-bg-secondary]")}
            >
              <div className={clsx("text-sm font-medium uppercase", subText)}>
                {stat.type}
              </div>
              <div className={clsx("text-2xl font-bold", text)}>{stat.count}</div>
              {typeof stat.weight === "number" && (
                <div className={clsx("text-xs", subText)}>
                  {stat.weight.toLocaleString()} {t("admin.kg") || "kg"}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminRecycleStats
