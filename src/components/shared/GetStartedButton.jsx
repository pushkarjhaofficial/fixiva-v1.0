import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import { RetryButton } from "@/shared";
import FixivaHelmet from "@/components";
import { BookingVoiceInput, QRScanner } from "@/components";

const GetStartedButton = ({ onGetStarted, disabled = false }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    sendBotEvent?.("get_started_clicked");
    toast.success(t("get_started_success", { defaultValue: "Let's get started!" }));
    onGetStarted?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("get_started_title", { defaultValue: "Get Started" })}
        description={t("get_started_desc", { defaultValue: "Start your first booking or action now." })}
        name="GetStartedButton"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow flex flex-col items-start"
        aria-label={t("get_started_button_aria", { defaultValue: "Get Started Button" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("get_started", { defaultValue: "Get Started" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] mb-4">
          {t("get_started_hint", { defaultValue: "Click below to begin your Fixiva journey!" })}
        </p>
        <div className="flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction} disabled={disabled}>
            {t("get_started", { defaultValue: "Get Started" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};export default GetStartedButton;