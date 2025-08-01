// src/components/booking/BookingLocationPicker.tsx

import React, { useState } from "react"
import { useTranslation } from "react-i18next"

export interface BookingLocation {
  address: string
  lat?: number
  lng?: number
}

interface BookingLocationPickerProps {
  location: BookingLocation
  onChange: (location: BookingLocation) => void
}

const BookingLocationPicker: React.FC<BookingLocationPickerProps> = ({
  location,
  onChange
}) => {
  const { t } = useTranslation()
  const [input, setInput] = useState(location.address || "")

  const handleManualChange = () => {
    onChange({ ...location, address: input })
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t("booking.location")}</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleManualChange}
        className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        placeholder={t("booking.enter_address") || "Enter your address"}
      />
      {/* Optional future map integration here */}
    </div>
  )
}

export default BookingLocationPicker
