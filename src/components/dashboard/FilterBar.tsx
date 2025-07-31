// src/components/dashboard/FilterBar.tsx

import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"

export interface FilterBarProps {
  /** Start date for filtering (ISO yyyy-MM-dd) */
  startDate?: string
  /** End date for filtering (ISO yyyy-MM-dd) */
  endDate?: string
  /** Available booking statuses to filter by */
  statuses?: string[] 
  /** Currently selected status */
  selectedStatus?: string
  /** Called when dates or status change */
  onFilter: (filter: {
    startDate?: string
    endDate?: string
    status?: string
  }) => void
  /** Called when reset button clicked */
  onReset?: () => void
  /** Extra wrapper classes */
  className?: string
}

const FilterBar: React.FC<FilterBarProps> = ({
  startDate: initialStart,
  endDate: initialEnd,
  statuses = [],
  selectedStatus: initialStatus,
  onFilter,
  onReset,
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [startDate, setStartDate] = useState(initialStart || "")
  const [endDate, setEndDate] = useState(initialEnd || "")
  const [status, setStatus] = useState(initialStatus || "")

  // Sync controlled props
  useEffect(() => {
    setStartDate(initialStart || "")
  }, [initialStart])

  useEffect(() => {
    setEndDate(initialEnd || "")
  }, [initialEnd])

  useEffect(() => {
    setStatus(initialStatus || "")
  }, [initialStatus])

  const handleApply = () => {
    onFilter({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      status: status || undefined,
    })
  }

  const handleReset = () => {
    setStartDate("")
    setEndDate("")
    setStatus("")
    onReset?.()
    onFilter({})  // clear filters
  }

  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  return (
    <div
      role="form"
      aria-label={t("dashboard.filterTitle")}
      className={clsx("flex flex-wrap items-end gap-4 p-4 rounded-lg shadow", inputBg, border, className)}
    >
      <div className="flex flex-col">
        <label htmlFor="filter-start" className={clsx("text-sm mb-1", text)}>
          {t("dashboard.filter.startDate")}
        </label>
        <input
          id="filter-start"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={clsx("px-3 py-2 rounded border", border, inputBg, text)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="filter-end" className={clsx("text-sm mb-1", text)}>
          {t("dashboard.filter.endDate")}
        </label>
        <input
          id="filter-end"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={clsx("px-3 py-2 rounded border", border, inputBg, text)}
        />
      </div>

      {statuses.length > 0 && (
        <div className="flex flex-col">
          <label htmlFor="filter-status" className={clsx("text-sm mb-1", text)}>
            {t("dashboard.filter.status")}
          </label>
          <select
            id="filter-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={clsx("px-3 py-2 rounded border", border, inputBg, text)}
          >
            <option value="">{t("dashboard.filter.allStatuses")}</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {t(`booking.status.${s}`)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center space-x-2 ml-auto">
        <button
          type="button"
          onClick={handleReset}
          className={clsx(
            "px-4 py-2 rounded font-medium transition",
            inputBg,
            text,
            "hover:bg-opacity-80"
          )}
        >
          {t("dashboard.filter.reset")}
        </button>
        <button
          type="button"
          onClick={handleApply}
          className={clsx(
            "px-4 py-2 rounded font-semibold transition bg-[--color-primary] text-white hover:bg-[--color-primary]/90"
          )}
        >
          {t("dashboard.filter.apply")}
        </button>
      </div>
    </div>
  )
}

export default FilterBar
