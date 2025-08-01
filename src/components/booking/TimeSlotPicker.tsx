// src/components/booking/TimeSlotPicker.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"

export interface TimeSlotPickerProps {
  slots: string[] // ISO times or "09:00 AM"
  selectedSlot: string | null
  onSelectSlot: (slot: string) => void
  disabled?: boolean
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
  disabled = false
}) => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelectSlot(slot)}
          disabled={disabled}
          className={clsx(
            "rounded px-4 py-2 border text-sm transition",
            selectedSlot === slot
              ? "bg-primary-600 text-white border-primary-600"
              : "bg-white dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900 border-neutral-300 dark:border-neutral-600"
          )}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}

export default TimeSlotPicker
