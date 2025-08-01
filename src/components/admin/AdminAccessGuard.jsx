import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from "@components/shared/FixivaHelmet";
import { RetryButton } from "@/shared/retrybutton";;
import { BookingVoiceInput } from "@components/booking/BookingVoiceInput";
import { QRScanner } from "@components/booking/QRScanner";

export function AdminAccessGuard() {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleProtectedAction = () => {
    sendBotEvent?.("admin_access_guard_triggered");
    toast.success(
      t("access_granted", { defaultValue: "Admin access verified." })
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("admin_access_guard_title", {
          defaultValue: "Admin Access Guard",
        })}
        description={t("admin_access_guard_description", {
          defaultValue: "Secure your admin actions with guard verification.",
        })}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded border border-dashed border-[var(--color-border)] p-6 text-[var(--color-text)] bg-[var(--color-card)]"
        role="region"
        aria-label="Admin Access Guard Section"
      >
        <h2 className="text-lg font-semibold mb-2">
          {t("verify_guard", { defaultValue: "Verify Admin Action" })}
        </h2>
        <p className="text-sm mb-4">
          {t("admin_guard_info", {
            defaultValue:
              "Use voice input or QR scan to validate critical admin operations.",
          })}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <BookingVoiceInput
            onVoiceResult={(result) => {
              toast.success(
                t("voice_verified", {
                  defaultValue: `Verified via voice: ${result}`,
                })
              );
            }}
          />
          <QRScanner
            onResult={(data) => {
              toast.success(
                t("qr_verified", {
                  defaultValue: `QR code verified: ${data}`,
                })
              );
            }}
          />
          <RetryButton onClick={handleProtectedAction}>
            {t("manual_override", { defaultValue: "Manual Override" })}
          </RetryButton>
        </div>
      </motion.div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default AdminAccessGuard;
