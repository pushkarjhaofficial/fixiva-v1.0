// src/components/vendor/VendorPayoutHistory.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaRupeeSign, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa"

export interface PayoutItem {
  id: string
  date: string     // ISO
  amount: number
  status: "pending" | "completed" | "failed"
  method: string
  reference?: string
  note?: string
}

export interface VendorPayoutHistoryProps {
  payouts: PayoutItem[]
  className?: string
}

const STATUS_ICON = {
  pending: <FaClock className="text-yellow-600" title="Pending" />,
  completed: <FaCheckCircle className="text-green-600" title="Completed" />,
  failed: <FaTimesCircle className="text-red-600" title="Failed" />
}

/**
 * VendorPayoutHistory
 * Modular, robust payout/settlement/transaction listing for vendor/franchise/partner/admin dashboards.
 */
const VendorPayoutHistory: React.FC<VendorPayoutHistoryProps> = ({ payouts, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaRupeeSign /> {t("vendor.payoutHistory") || "Payout History"}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className={clsx("bg-[--color-bg-secondary]")}>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.payoutDate") || "Date"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.payoutAmount") || "Amount"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.payoutMethod") || "Method"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.status") || "Status"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.reference") || "Reference"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.note") || "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length === 0 ? (
              <tr>
                <td colSpan={6} className={clsx("py-6 text-center", subText)}>
                  {t("vendor.noPayouts") || "No payouts found."}
                </td>
              </tr>
            ) : (
              payouts.map((p) => (
                <tr key={p.id} className="hover:bg-[--color-bg-hover] transition">
                  <td className="px-3 py-2">{new Date(p.date).toLocaleString()}</td>
                  <td className="px-3 py-2 font-medium text-green-700">
                    {new Intl.NumberFormat(undefined, { style: "currency", currency: "INR" }).format(p.amount)}
                  </td>
                  <td className="px-3 py-2">{p.method}</td>
                  <td className="px-3 py-2 flex items-center gap-2">
                    {STATUS_ICON[p.status]} <span>{t(`vendor.payoutStatus.${p.status}`) || p.status}</span>
                  </td>
                  <td className="px-3 py-2">{p.reference || "--"}</td>
                  <td className="px-3 py-2">{p.note || "--"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VendorPayoutHistory
