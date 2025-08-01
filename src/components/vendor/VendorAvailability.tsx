// src/components/vendor/VendorAvailability.tsx

import React, { useState } from "react"
import BookingCalendar from "../booking/BookingCalendar"

export interface VendorAvailabilityProps {
  availableDates: Date[]
  onUpdate: (dates: Date[]) => void
}

const VendorAvailability: React.FC<VendorAvailabilityProps> = ({
  availableDates,
  onUpdate
}) => {
  const [selected, setSelected] = useState<Date | null>(null)

  const handleSelect = (date: Date) => {
    if (availableDates.some(d => d.toDateString() === date.toDateString())) {
      onUpdate(availableDates.filter(d => d.toDateString() !== date.toDateString()))
    } else {
      onUpdate([...availableDates, date])
    }
    setSelected(date)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Availability Calendar</h3>
      <BookingCalendar
        availableDates={availableDates}
        selectedDate={selected}
        onSelectDate={handleSelect}
      />
    </div>
  )
}

export default VendorAvailability
