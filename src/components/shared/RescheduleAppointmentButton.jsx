import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import { BookingVoiceInput, QRScanner } from "@/components";
import FixivaHelmet from "@/components";
import { RetryButton } from "@/shared";

const RescheduleAppointmentButton = ({ onReschedule, disabled = false }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    sendBotEvent?.("reschedule_appointment_clicked");
    toast.success(t("appointment_reschedule_success", { defaultValue: "Appointment reschedule started!" }));
    onReschedule?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("reschedule_appointment_title", { defaultValue: "Reschedule Appointment" })}
        description={t("reschedule_appointment_desc", { defaultValue: "Easily reschedule your appointment with a single click." })}
        name="RescheduleAppointmentButton"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow flex flex-col items-start"
        aria-label={t("reschedule_appointment_button_aria", { defaultValue: "Reschedule Appointment Button" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("reschedule_appointment", { defaultValue: "Reschedule Appointment" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] mb-4">
          {t("reschedule_appointment_hint", { defaultValue: "Change your booking to a new date and time." })}
        </p>
        <div className="flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction} disabled={disabled}>
            {t("retry_reschedule", { defaultValue: "Reschedule" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};export default RescheduleAppointmentButton;