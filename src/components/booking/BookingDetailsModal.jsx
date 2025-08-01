import React from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";

export function BookingDetailsModal({ isOpen, onClose, booking }) {
  const { t } = useTranslation();
  if (!isOpen || !booking) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <FixivaHelmet
        title={t("booking_details", { defaultValue: "Booking Details" })}
        description={t("booking_details_desc", { defaultValue: "Full booking details view." })}
        name="BookingDetailsModal"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-[--color-bg] p-6 shadow-[var(--color-shadow)]">
          <Dialog.Title className="text-xl font-bold text-[--color-text] mb-4">
            {t("booking_details", { defaultValue: "Booking Details" })}
          </Dialog.Title>
          <div className="space-y-2 text-[--color-text] text-sm">
            <p><strong>{t("service", { defaultValue: "Service" })}:</strong> {booking.serviceName}</p>
            <p><strong>{t("date", { defaultValue: "Date" })}:</strong> {booking.date}</p>
            <p><strong>{t("time", { defaultValue: "Time" })}:</strong> {booking.time}</p>
            <p><strong>{t("vendor", { defaultValue: "Vendor" })}:</strong> {booking.vendorName || t("not_assigned", { defaultValue: "Not assigned" })}</p>
            <p><strong>{t("address", { defaultValue: "Address" })}:</strong> {booking.address}</p>
            <p><strong>{t("status", { defaultValue: "Status" })}:</strong> {t(booking.status, { defaultValue: booking.status })}</p>
          </div>
          <div className="flex justify-end mt-6">
            <button
              aria-label={t("close_modal", { defaultValue: "Close details modal" })}
              onClick={onClose}
              className="px-4 py-2 bg-[--color-primary] text-[--color-text-light] rounded hover:opacity-90"
            >
              {t("close", { defaultValue: "Close" })}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default BookingDetailsModal;
