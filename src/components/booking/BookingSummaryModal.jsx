import React from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingSummaryModal({ isOpen, onClose, formData = {} }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("booking_summary_heading", { defaultValue: "Booking Summary" })}
        description={t("booking_summary_desc", { defaultValue: "Preview your booking before confirming." })}
        name="BookingSummaryModal"
      />
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-[--color-bg] p-6 shadow-[var(--color-shadow)]">
            <Dialog.Title className="text-xl font-bold text-[--color-text] mb-4">
              {t("booking_summary_heading", { defaultValue: "Booking Summary" })}
            </Dialog.Title>
            <div className="space-y-2 text-[--color-text]">
              <p>
                <strong>{t("service_label", { defaultValue: "Service" })}:</strong>{" "}
                {formData.serviceName || t("not_set", { defaultValue: "Not set" })}
              </p>
              <p>
                <strong>{t("date_label", { defaultValue: "Date" })}:</strong>{" "}
                {formData.date || t("not_set", { defaultValue: "Not set" })}
              </p>
              <p>
                <strong>{t("time_label", { defaultValue: "Time" })}:</strong>{" "}
                {formData.time || t("not_set", { defaultValue: "Not set" })}
              </p>
              <p>
                <strong>{t("location_label", { defaultValue: "Location" })}:</strong>{" "}
                {formData.location && formData.location.lat && formData.location.lng
                  ? `${formData.location.lat.toFixed(4)}, ${formData.location.lng.toFixed(4)}`
                  : t("not_set", { defaultValue: "Not set" })}
              </p>
              <p>
                <strong>{t("vendor_label", { defaultValue: "Vendor" })}:</strong>{" "}
                {formData.vendorName || t("not_selected", { defaultValue: "Not selected" })}
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                aria-label={t("close_modal", { defaultValue: "Close summary modal" })}
                onClick={onClose}
                className="px-4 py-2 bg-[--color-primary] text-[--color-text-light] rounded hover:opacity-90"
              >
                {t("close", { defaultValue: "Close" })}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingSummaryModal;
