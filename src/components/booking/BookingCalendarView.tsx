import React from "react"
import { addDays, format, isSameDay, isBefore } from "date-fns"
import clsx from "clsx"

export type BookingCalendarRole =
  | "customer"
  | "vendor"
  | "admin"
  | "govt_officer"
  | "govt_employee"
  | "corp_admin"
  | "partner"
  | "auditor"
  | "support_agent"

export interface BookingSlot {
  time: string // e.g. "10:00 AM"
  available: boolean
  bookedBy?: string
  meta?: any
}

export interface BookingCalendarViewProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  slots: Record<string, BookingSlot[]> // Key: date string (yyyy-MM-dd), value: array of slots
  selectedDate: Date
  selectedSlot?: BookingSlot
  onSlotSelect: (slot: BookingSlot, date: Date) => void
  disabledDates?: Date[]
  minDate?: Date
  maxDate?: Date
  loading?: boolean
  role?: BookingCalendarRole
  className?: string
}

const getDateKey = (date: Date) => format(date, "yyyy-MM-dd")

export const BookingCalendarView: React.FC<BookingCalendarViewProps> = ({
  currentDate,
  onDateChange,
  slots,
  selectedDate,
  selectedSlot,
  onSlotSelect,
  disabledDates = [],
  minDate,
  maxDate,
  loading = false,
  role = "customer",
  className
}) => {
  const today = new Date()
  const daysToShow = 7 // Show 7 days at a time (week view)
  const dateList: Date[] = []

  // Generate a week's dates for the view, respecting min/max
  for (let i = 0; i < daysToShow; i++) {
    const d = addDays(currentDate, i)
    if (minDate && isBefore(d, minDate)) continue
    if (maxDate && isBefore(maxDate, d)) continue
    dateList.push(d)
  }

  const isDateDisabled = (d: Date) =>
    disabledDates.some((dd) => isSameDay(d, dd)) ||
    (minDate && isBefore(d, minDate)) ||
    (maxDate && isBefore(maxDate, d))

  return (
    <div className={clsx("w-full rounded-xl shadow bg-[--color-bg] p-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => onDateChange(addDays(currentDate, -daysToShow))}
          className="px-2 py-1 rounded hover:bg-[--color-primary]/10"
          aria-label="Previous week"
        >
          ◀
        </button>
        <div className="font-bold text-lg">
          {format(dateList[0], "MMM dd")} - {format(dateList[dateList.length - 1], "MMM dd, yyyy")}
        </div>
        <button
          onClick={() => onDateChange(addDays(currentDate, daysToShow))}
          className="px-2 py-1 rounded hover:bg-[--color-primary]/10"
          aria-label="Next week"
        >
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dateList.map((date) => {
          const disabled = isDateDisabled(date)
          const isSelected = isSameDay(date, selectedDate)
          return (
            <button
              key={getDateKey(date)}
              onClick={() => !disabled && onDateChange(date)}
              className={clsx(
                "flex flex-col items-center px-2 py-2 rounded-lg focus:outline-none transition-all",
                isSelected && "bg-[--color-primary] text-white shadow-lg scale-105",
                disabled && "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
              disabled={disabled}
              aria-selected={isSelected}
              aria-label={format(date, "PPP")}
            >
              <span className="font-bold">{format(date, "EEE")}</span>
              <span className="text-2xl">{format(date, "dd")}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="text-center text-[--color-primary] py-4">Loading slots...</div>
        ) : (
          <>
            <div className="font-semibold mb-2">
              {format(selectedDate, "EEEE, MMMM dd, yyyy")}
            </div>
            <div className="flex flex-wrap gap-2">
              {(slots[getDateKey(selectedDate)] || []).length === 0 && (
                <span className="text-gray-400">No slots available</span>
              )}
              {(slots[getDateKey(selectedDate)] || []).map((slot) => {
                const selected = selectedSlot && selectedSlot.time === slot.time
                return (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && onSlotSelect(slot, selectedDate)}
                    className={clsx(
                      "px-4 py-2 rounded-md font-medium border transition-colors focus:outline-none",
                      slot.available
                        ? selected
                          ? "bg-[--color-primary] text-white border-[--color-primary] shadow"
                          : "bg-white text-[--color-primary] border-[--color-primary] hover:bg-[--color-primary]/10"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    )}
                    disabled={!slot.available}
                    aria-pressed={selected}
                  >
                    {slot.time}
                    {!slot.available && (
                      <span className="ml-1 text-xs text-red-400">(unavailable)</span>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BookingCalendarView
