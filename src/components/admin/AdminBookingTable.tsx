// src/components/admin/AdminBookingTable.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaClipboardList, FaCheck, FaTimes } from "react-icons/fa"

export interface AdminBooking {
  id: string
  customer: string
  vendor: string
  date: string // ISO
  status: "pending" | "confirmed" | "completed" | "cancelled"
  amount: number
}

export interface AdminBookingTableProps {
  bookings: AdminBooking[]
  onSelect?: (bookingId: string) => void
  className?: string
}

const AdminBookingTable: React.FC<AdminBookingTableProps> = ({
  bookings,
  onSelect,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"

  return (
    <section
      aria-labelledby="admin-booking-table-title"
      className={clsx("rounded-lg shadow border p-6", bg, border, className)}
    >
      <h2
        id="admin-booking-table-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaClipboardList aria-hidden /> {t("admin.bookings") || "All Bookings"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead>
            <tr className={subText}>
              <th className="px-3 py-2 text-left">{t("common.customer")}</th>
              <th className="px-3 py-2 text-left">{t("common.vendor")}</th>
              <th className="px-3 py-2 text-left">{t("common.date")}</th>
              <th className="px-3 py-2 text-left">{t("common.status")}</th>
              <th className="px-3 py-2 text-left">{t("common.amount")}</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={clsx("text-center py-6", subText)}
                  aria-live="polite"
                >
                  {t("admin.noBookings") || "No bookings found."}
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(b.id)}
                >
                  <td className="px-3 py-2">{b.customer}</td>
                  <td className="px-3 py-2">{b.vendor}</td>
                  <td className="px-3 py-2">
                    <time dateTime={b.date}>
                      {new Date(b.date).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short"
                      })}
                    </time>
                  </td>
                  <td className="px-3 py-2 flex items-center gap-1">
                    {b.status === "completed" && (
                      <FaCheck className="text-green-600" title="Completed" aria-label={t("booking.completed")} />
                    )}
                    {b.status === "cancelled" && (
                      <FaTimes className="text-red-600" title="Cancelled" aria-label={t("booking.cancelled")} />
                    )}
                    <span>{t(`booking.status.${b.status}`) || b.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "INR"
                    }).format(b.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminBookingTable
