import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { QRScanner, BookingVoiceInput } from "@/components";
import { RetryButton } from "@/shared";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function MultiBookingActionBar() {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    sendBotEvent("multi_booking_action_triggered");
    toast.success(t("action_success", { defaultValue: "Action completed" }));
  };

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Multi-Booking Actions" })}
        description={t("component_tooltip", {
          defaultValue: "Perform actions for multiple bookings at once.",
        })}
        name="MultiBookingActionBar"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="rounded-xl bg-[--color-surface] p-6 shadow-md"
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("component_title", { defaultValue: "Multi-Booking Actions" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text)]">
          {t("component_description", {
            defaultValue:
              "Perform actions for multiple bookings at once, like bulk cancel or reassign.",
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
export default MultiBookingActionBar;
