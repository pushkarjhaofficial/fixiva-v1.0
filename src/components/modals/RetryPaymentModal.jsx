import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import { RetryButton } from "@/Shared";
import FixivaHelmet from "@/components";
import { BookingVoiceInput, QRScanner } from "@components";

const RetryPaymentModal = ({ onRetry, onClose }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleRetry = () => {
    sendBotEvent("retry_payment_clicked");
    toast.success(t("payment_retry_success", { defaultValue: "Payment retry successful!" }));
    onRetry?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("retry_payment_title", { defaultValue: "Retry Payment" })}
        description={t("retry_payment_desc", { defaultValue: "Retry your payment securely with multiple options." })}
        name="RetryPaymentModal"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="w-full max-w-md rounded-xl bg-[var(--color-bg)] p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={t("retry_payment_aria", { defaultValue: "Retry Payment Modal" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("retry_payment", { defaultValue: "Retry Payment" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text)] mb-4">
          {t("retry_payment_desc", {
            defaultValue: "Your payment was not successful. You can retry with any method below.",
          })}
        </p>

        <div className="flex flex-col gap-4">
          <RetryButton onClick={handleRetry}>
            {t("retry_now", { defaultValue: "Retry Now" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            aria-label={t("close_modal", { defaultValue: "Close" })}
            onClick={onClose}
            className="rounded bg-cyan-600 px-4 py-2 text-sm text-white hover:bg-cyan-500"
            type="button"
          >
            {t("close", { defaultValue: "Close" })}
          </button>
        </div>
      </motion.div>
    </>
  );
};
export default RetryPaymentModal;