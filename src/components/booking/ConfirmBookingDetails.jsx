import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { QRScanner, BookingVoiceInput } from "@/components";
import { RetryButton } from "@/shared";
import { FixivaHelmet } from "@/shared";

export function ConfirmBookingDetails() {
  const { t } = useTranslation();

  const handleAction = () => {
    toast.success(t("action_success", { defaultValue: "Action completed" }));
  };

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Confirm Booking Details" })}
        description={t("component_description", {
          defaultValue: "Review and confirm your booking before proceeding.",
        })}
        name="ConfirmBookingDetails"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl bg-[--color-surface] p-6 shadow-md"
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("component_title", { defaultValue: "Confirm Booking Details" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text)]">
          {t("component_description", {
            defaultValue: "Review and confirm your booking before proceeding.",
          })}
        </p>

        <div className="mt-4 flex gap-4">
          <RetryButton onClick={handleAction} />
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default ConfirmBookingDetails;
