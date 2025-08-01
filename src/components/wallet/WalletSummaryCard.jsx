import React from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
import { Skeleton, RetryButton } from "@/Shared";
import { BookingVoiceInput, QRScanner } from "@components";

const WalletSummaryCard = ({ balance = 0, currency = "₹", loading = false, onAction }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleAction = () => {
    toast.success(t("wallet_action_success", { defaultValue: "Wallet action completed!" }));
    sendBotEvent("wallet_action", { action: "retry" });
    onAction?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("wallet_summary_title", { defaultValue: "Wallet Summary" })}
        description={t("wallet_summary_desc", { defaultValue: "Your current wallet balance and quick actions." })}
        name="WalletSummaryCard"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow"
        aria-label={t("wallet_summary_aria", { defaultValue: "Wallet Summary Card" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("wallet_balance", { defaultValue: "Wallet Balance" })}
        </h2>
        <p className="text-2xl font-semibold text-[var(--color-primary)]">
          {loading ? <Skeleton width={120} height={24} /> : `${currency} ${balance.toLocaleString()}`}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text)]">
          {t("wallet_summary_hint", { defaultValue: "Use your balance for quick bookings and cashless payments." })}
        </p>
        <div className="mt-5 flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction}>
            {t("retry_wallet_action", { defaultValue: "Retry" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};
export default WalletSummaryCard;