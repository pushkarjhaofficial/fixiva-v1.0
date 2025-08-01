// src/components/booking/BookingCalendar.tsx

import React, { useState, useMemo } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isSameDay, isSameMonth } from "date-fns"
import { useTranslation } from "react-i18next"
import clsx from "clsx"

interface BookingCalendarProps {
  availableDates: Date[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  availableDates,
  selectedDate,
  onSelectDate
}) => {
  const { t } = useTranslation()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = []
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      days.push(new Date(date))
    }
    return days
  }, [currentMonth])

  const isAvailable = (date: Date) =>
    availableDates.some(d => isSameDay(d, date)) && isSameMonth(date, currentMonth)

  return (
    <div className="w-full max-w-md rounded-lg border bg-white p-4 shadow-sm dark:bg-neutral-900">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>←</button>
        <h2 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="font-semibold text-neutral-500 dark:text-neutral-400">{d}</div>
        ))}
        {daysInMonth.map((date) => {
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const enabled = isAvailable(date)
          return (
            <button
              key={date.toISOString()}
              onClick={() => enabled && onSelectDate(date)}
              disabled={!enabled}
              className={clsx(
                "rounded-full p-1.5 text-sm transition",
                enabled ? "hover:bg-primary-100 dark:hover:bg-primary-800" : "text-neutral-300",
                isSelected && "bg-primary-600 text-white"
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BookingCalendar
