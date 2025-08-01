import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FixivaHelmet } from "@/shared";

export function BookingCard({ booking }) {
  const { t } = useTranslation();
  if (!booking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-lg border border-[var(--color-border)] bg-[--color-bg] p-4 shadow-sm"
    >
      <FixivaHelmet
        title={t("booking_card", { defaultValue: "Booking Card" })}
        description={t("booking_card_desc", { defaultValue: "Your repair booking summary card." })}
        name="BookingCard"
      />
      <div className="mb-2 flex justify-between items-center">
        <span className="font-semibold">{booking.serviceName}</span>
        <span className={`px-2 py-1 rounded text-xs ${booking.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}`}>
          {t(booking.status, { defaultValue: booking.status })}
        </span>
      </div>
      <div className="text-xs text-[var(--color-text)] mb-2">
        {t("date", { defaultValue: "Date" })}: {booking.date}
      </div>
      <div className="text-xs text-[var(--color-text)] mb-2">
        {t("vendor", { defaultValue: "Vendor" })}: {booking.vendorName || t("not_assigned", { defaultValue: "Not assigned" })}
      </div>
      <Link
        to={`/customer/bookings/${booking.id}`}
        className="text-sm text-[--color-primary] font-medium hover:underline"
      >
        {t("view_details", { defaultValue: "View Details" })}
      </Link>
    </motion.div>
  );
}
export default BookingCard;
