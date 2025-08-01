import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { useFixivaBot } from "@/hooks";
import { FaRobot } from "react-icons/fa";
import { BookingVoiceInput, QRScanner } from "@/components";
import { RetryButton } from "@/shared";

const FixivaotTrigger = ({ onTrigger, disabled = false }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    sendBotEvent?.("fixiva_bot_trigger_clicked");
    toast.success(t("ai_bot_trigger_success", { defaultValue: "Fixiva AI Assistant activated!" }));
    onTrigger?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("fixiva_bot_trigger_title", { defaultValue: "Ask FixivaBot" })}
        description={t("fixiva_bot_trigger_desc", { defaultValue: "Start a conversation with Fixiva AI Assistant." })}
        name="FixivaBotTrigger"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow flex flex-col items-start"
        aria-label={t("fixiva_bot_trigger_aria", { defaultValue: "Fixiva AI Chatbot Trigger" })}
      >
        <h2 className="mb-2 text-lg font-bold flex items-center gap-2">
          <FaRobot className="text-[var(--color-primary)]" />
          {t("fixiva_ai_assistant", { defaultValue: "Fixiva AI Assistant" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] mb-4">
          {t("fixiva_ai_hint", { defaultValue: "Get instant answers or help for any Fixiva service!" })}
        </p>
        <div className="flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction} disabled={disabled}>
            {t("ask_now", { defaultValue: "Ask Now" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};

export default  FixivaBotTrigger;
