import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { QRScanner, BookingVoiceInput } from "@/components";
import { RetryButton } from "@/shared";
import { FixivaHelmet } from "@/shared";

export function VoiceBookingButton() {
  const { t } = useTranslation();

  const handleAction = () => {
    toast.success(t("action_success", { defaultValue: "Action completed" }));
  };

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Book by Voice" })}
        description={t("component_description", {
          defaultValue: "Easily create bookings using voice commands.",
        })}
        name="VoiceBookingButton"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl bg-[--color-surface] p-6 shadow-md"
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("component_title", { defaultValue: "Book by Voice" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text)]">
          {t("component_description", {
            defaultValue:
              "Easily create bookings using voice commands.",
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
export default VoiceBookingButton;
