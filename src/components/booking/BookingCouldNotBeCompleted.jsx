import React from "react";
import { useTranslation } from "react-i18next";
import { FaExclamationCircle } from "react-icons/fa";

export function BookingCouldNotBeCompleted({ message }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-40 rounded-lg border bg-[var(--color-bg-muted)] p-6 text-[var(--color-text)]">
      <FaExclamationCircle className="text-red-500 text-3xl mb-2" />
      <h2 className="font-bold mb-1">{t("booking_failed", { defaultValue: "Booking Failed" })}</h2>
      <p className="text-sm">{message || t("booking_error_generic", { defaultValue: "Could not complete the booking. Please try again later." })}</p>
    </div>
  );
}
export default BookingCouldNotBeCompleted;
