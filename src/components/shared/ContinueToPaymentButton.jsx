import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BookingVoiceInput, QRScanner } from "@/components";
import FixivaHelmet from "@/components";
import { useFixivaBot } from "@/hooks";
import { RetryButton } from "@/shared";

const ContinueToPaymentButton = ({ onContinue, disabled = false }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    sendBotEvent?.("continue_to_payment_clicked");
    toast.success(t("continue_to_payment_success", { defaultValue: "Redirecting to payment..." }));
    onContinue?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("continue_to_payment_title", { defaultValue: "Continue to Payment" })}
        description={t("continue_to_payment_desc", { defaultValue: "Proceed to payment to complete your booking." })}
        name="ContinueToPaymentButton"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow flex flex-col items-start"
        aria-label={t("continue_to_payment_aria", { defaultValue: "Continue to Payment Button" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("continue_to_payment", { defaultValue: "Continue to Payment" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] mb-4">
          {t("continue_to_payment_hint", { defaultValue: "Finalize your booking securely with instant payment." })}
        </p>
        <div className="flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction} disabled={disabled}>
            {t("pay_now", { defaultValue: "Pay Now" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};export default ContinueToPaymentButton;