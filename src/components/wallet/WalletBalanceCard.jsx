// src/components/WalletBalanceCard.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import FixivaHelmet from "@components/shared/FixivaHelmet";
import { BookingVoiceInput } from "@components";
import { QRScanner } from "@components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";

export function WalletBalanceCard() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wallet/balance");
      if (!res.ok) throw new Error("Network response was not ok");
      const json = await res.json();
      setBalance(json.balance);
    } catch (err) {
      const msg = t("wallet.fetchError", {
        defaultValue: "Failed to load wallet balance.",
      });
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleRefresh = () => {
    sendBotEvent("wallet_refresh", null);
    fetchBalance();
  };

  const formattedBalance =
    typeof balance === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(balance)
      : "--";

  return (
    <>
      {/* Custom SEO */}
      <FixivaHelmet
        title={t("wallet.seoTitle", { defaultValue: "Wallet Balance" })}
        description={t("wallet.seoDescription", {
          defaultValue: "Check your current wallet balance.",
        })}
        name="WalletBalanceCard"
      />
      <Helmet>
        <title>{t("wallet.seoTitle", { defaultValue: "Wallet Balance" })}</title>
        <meta
          name="description"
          content={t("wallet.seoDescription", {
            defaultValue: "Check your current wallet balance.",
          })}
        />
      </Helmet>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
        aria-live="polite"
      >
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {t("wallet.title", { defaultValue: "Wallet Balance" })}
        </h2>

        {loading ? (
          <div className="h-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ) : error ? (
          <div className="space-y-2 text-center text-red-600 dark:text-red-400">
            <p>{error}</p>
            <button
              onClick={fetchBalance}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              {t("wallet.retry", { defaultValue: "Retry" })}
            </button>
          </div>
        ) : (
          <p className="mb-4 text-2xl font-bold text-green-600 dark:text-green-400">
            {formattedBalance}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            &#x21bb;{" "}
            {t("wallet.refresh", { defaultValue: "Refresh Balance" })}
          </button>

          <BookingVoiceInput
            onResult={(amount) => {
              sendBotEvent("wallet_voice_input", { amount });
              toast.success(t("wallet.voiceSuccess", {
                defaultValue: "Received input: {{amount}}",
                amount,
              }));
            }}
          />

          <QRScanner
            onScan={(data) => {
              sendBotEvent("wallet_qr_scan", { data });
              toast.info(
                t("wallet.qrScanned", { defaultValue: "Scanned: {{data}}", data })
              );
            }}
          />
        </div>
      </motion.div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default WalletBalanceCard;
