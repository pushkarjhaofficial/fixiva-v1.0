// src/components/dashboard/BookingHistory.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { BookingStatus } from "@/components/booking/BookingStatusTracker"

export interface BookingSummary {
  id: string
  serviceName: string
  dateTime: string   // ISO string
  vendorName: string
  status: BookingStatus
}

export interface BookingHistoryProps {
  /** List of past and upcoming bookings */
  bookings: BookingSummary[]
  /** Optional extra classes */
  className?: string
}

/**
 * BookingHistory
 * Renders a responsive table of bookings with service, date/time, vendor, status, and a details link.
 * Accessible, i18n-ready, theme-aware.
 */
const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings, className }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx("overflow-auto bg-[--color-bg] shadow rounded-lg", className)}>
      <table className="min-w-full divide-y divide-[--color-border]">
        <thead className="bg-[--color-bg-secondary]">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
              {t("dashboard.bookingId")}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
              {t("dashboard.service")}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
              {t("dashboard.dateTime")}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
              {t("dashboard.vendor")}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-[--color-text-secondary]">
              {t("dashboard.status")}
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-[--color-text-secondary]">
              {t("common.actions")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[--color-border]">
          {bookings.map((b) => (
            <tr key={b.id} className="hover:bg-[--color-bg-secondary]">
              <td className="px-4 py-3 text-sm text-[--color-text] truncate">{b.id}</td>
              <td className="px-4 py-3 text-sm text-[--color-text] truncate">{b.serviceName}</td>
              <td className="px-4 py-3 text-sm text-[--color-text] whitespace-nowrap">
                {new Date(b.dateTime).toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-[--color-text] truncate">{b.vendorName}</td>
              <td className="px-4 py-3 text-sm text-[--color-text] capitalize">{t(`booking.status.${b.status}`)}</td>
              <td className="px-4 py-3 text-sm text-[--color-text] text-center">
                <Link
                  to={`/booking/${b.id}`}
                  className="text-[--color-primary] hover:underline"
                >
                  {t("common.view")}
                </Link>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                {t("dashboard.noBookings")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookingHistory
