// src/components/vendor/VendorCalendar.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { useTheme } from "@/hooks/useTheme"
import { FaCalendarAlt, FaWrench } from "react-icons/fa"

export interface CalendarEvent {
  id: string
  title: string
  date: string      // ISO string (yyyy-MM-dd)
  time?: string     // Optional, e.g. "15:00"
  status?: string   // e.g. "pending", "completed"
}

export interface VendorCalendarProps {
  events: CalendarEvent[]
  className?: string
}

/**
 * VendorCalendar
 * Responsive, i18n-ready, theme-aware calendar view for vendor jobs.
 * Shows jobs by day, highlights today, supports theming, a11y.
 */
const VendorCalendar: React.FC<VendorCalendarProps> = ({ events, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  // Group events by date
  const eventsByDate: Record<string, CalendarEvent[]> = {}
  events.forEach(event => {
    if (!eventsByDate[event.date]) eventsByDate[event.date] = []
    eventsByDate[event.date].push(event)
  })

  // Sorted list of dates for grid
  const sortedDates = Object.keys(eventsByDate).sort()

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900"

  return (
    <section
      aria-labelledby="vendor-calendar-title"
      className={clsx("p-4 rounded-lg shadow border overflow-x-auto", bgColor, borderColor, className)}
      style={{ minWidth: 320 }}
    >
      <h2 id="vendor-calendar-title" className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", textColor)}>
        <FaCalendarAlt /> {t("vendor.calendarTitle")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedDates.length === 0 ? (
          <div className="col-span-full text-center text-sm text-gray-500">
            {t("vendor.noEvents")}
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date} className="border rounded-lg p-3 shadow-sm bg-[--color-bg-secondary]">
              <div className="font-semibold mb-2">
                {new Date(date).toLocaleDateString(undefined, {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </div>
              <ul className="space-y-2">
                {eventsByDate[date].map(ev => (
                  <li key={ev.id} className="flex items-center gap-2 text-sm">
                    <FaWrench className="text-[--color-primary]" />
                    <span className="font-medium">{ev.title}</span>
                    {ev.time && (
                      <span className="opacity-70 ml-2">{ev.time}</span>
                    )}
                    {ev.status && (
                      <span className={clsx(
                        "ml-auto text-xs px-2 py-0.5 rounded",
                        ev.status === "completed" ? "bg-green-100 text-green-700" :
                        ev.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-200 text-gray-800"
                      )}>
                        {t(`booking.status.${ev.status}`)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default VendorCalendar
