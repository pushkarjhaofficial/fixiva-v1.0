// src/components/vendor/VendorCalendar.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaCalendarAlt, FaTools, FaCheck } from "react-icons/fa"

export interface CalendarEvent {
  id: string
  title: string
  date: string // ISO string, e.g., "2024-07-30"
  type: "job" | "pickup" | "meeting" | "other"
  status?: "scheduled" | "completed" | "cancelled"
  color?: string
}

export interface VendorCalendarProps {
  events: CalendarEvent[]
  onEventClick?: (eventId: string) => void
  className?: string
}

/**
 * VendorCalendar
 * Simple, scalable monthly calendar. For enterprise, swap with FullCalendar.io.
 */
const VendorCalendar: React.FC<VendorCalendarProps> = ({
  events,
  onEventClick,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  // Group events by day (YYYY-MM-DD)
  const grouped = events.reduce((acc, ev) => {
    const day = ev.date.slice(0, 10)
    acc[day] = acc[day] || []
    acc[day].push(ev)
    return acc
  }, {} as Record<string, CalendarEvent[]>)

  // Show current month by default
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Build array of day numbers for this month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaCalendarAlt /> {t("vendor.calendar") || "Calendar"}
      </h2>
      <div className="grid grid-cols-7 gap-1 border border-[--color-border] rounded bg-[--color-bg-secondary]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className={clsx("text-xs font-semibold text-center py-2", subText)}>{d}</div>
        ))}
        {days.map((day) => {
          const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          const evs = grouped[key] || []
          return (
            <div
              key={day}
              className={clsx("h-20 border border-[--color-border] relative rounded p-1 overflow-y-auto")}
            >
              <div className={clsx("absolute top-1 left-1 text-xs", text)}>{day}</div>
              {evs.map((ev, idx) => (
                <button
                  key={ev.id}
                  className={clsx(
                    "w-full mt-5 mb-1 px-1 py-0.5 text-xs rounded flex items-center gap-1",
                    ev.color ? "" : "bg-[--color-primary]/10 text-[--color-primary]",
                    ev.color,
                    ev.status === "completed" && "line-through opacity-60"
                  )}
                  style={{ background: ev.color || undefined }}
                  onClick={() => onEventClick?.(ev.id)}
                  title={ev.title}
                >
                  {ev.type === "job" && <FaTools className="inline" />}
                  {ev.type === "pickup" && <FaCheck className="inline" />}
                  <span className="truncate">{ev.title}</span>
                </button>
              ))}
            </div>
          )
        })}
      </div>
      <div className={clsx("text-xs mt-3", subText)}>
        {t("vendor.calendarLegend") || "Click event for details. For advanced, integrate FullCalendar.io."}
      </div>
    </div>
  )
}

export default VendorCalendar
