// src/components/vendor/VendorJobTable.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaCheck, FaClock, FaTools } from "react-icons/fa"

export interface VendorJobTableRow {
  id: string
  serviceName: string
  scheduledAt: string   // ISO string
  status: string
  customer: string
  price: number
}

export interface VendorJobTableProps {
  rows: VendorJobTableRow[]
  onSelect?: (jobId: string) => void
  className?: string
}

/**
 * VendorJobTable
 * Responsive, accessible, theme-aware vendor jobs/pickups listing table.
 */
const VendorJobTable: React.FC<VendorJobTableProps> = ({ rows, onSelect, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-gray-100" : "text-gray-900"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  // Map status to icon
  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FaCheck className="text-green-500" title={t("booking.status.completed")} />
      case "pending":
        return <FaClock className="text-yellow-500" title={t("booking.status.pending")} />
      default:
        return <FaTools className="text-gray-400" title={status} />
    }
  }

  return (
    <div className={clsx("overflow-x-auto rounded-lg shadow border", bg, border, className)}>
      <table className={clsx("min-w-full text-sm", text)}>
        <thead>
          <tr className="bg-[--color-bg-secondary]">
            <th className="p-3 text-left font-semibold">{t("vendor.serviceName") || "Service"}</th>
            <th className="p-3 text-left font-semibold">{t("vendor.customer") || "Customer"}</th>
            <th className="p-3 text-left font-semibold">{t("vendor.scheduledAt") || "Scheduled"}</th>
            <th className="p-3 text-left font-semibold">{t("vendor.price") || "Price"}</th>
            <th className="p-3 text-left font-semibold">{t("vendor.status") || "Status"}</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                {t("vendor.noJobs") || "No jobs found."}
              </td>
            </tr>
          ) : (
            rows.map(row => (
              <tr key={row.id} className="hover:bg-[--color-bg-hover] cursor-pointer transition"
                onClick={() => onSelect?.(row.id)}
                tabIndex={0}
                aria-label={`${row.serviceName} ${row.customer}`}
              >
                <td className="p-3 font-medium">{row.serviceName}</td>
                <td className="p-3">{row.customer}</td>
                <td className="p-3">{new Date(row.scheduledAt).toLocaleString()}</td>
                <td className="p-3">
                  {new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "INR"
                  }).format(row.price)}
                </td>
                <td className="p-3">{statusIcon(row.status)} <span className="ml-2">{t(`booking.status.${row.status}`) || row.status}</span></td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded bg-[--color-primary] text-white text-xs font-bold hover:opacity-90">
                    {t("common.details") || "Details"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default VendorJobTable
