import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaGift } from "react-icons/fa";
import Confetti from "react-confetti";

export function FirstBookingPopup({ show, onClose, reward = null }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (show) {
      const audio = new Audio("/sounds/congrats.mp3");
      audio.play().catch(() => {});
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative rounded-lg bg-[--color-bg] p-6 shadow-xl dark:bg-[var(--color-bg)]"
            aria-label={t("first_booking_popup", { defaultValue: "First Booking Popup" })}
          >
            <button
              aria-label={t("close", { defaultValue: "Close" })}
              onClick={onClose}
              className="absolute top-3 right-3 text-[var(--color-text)] hover:text-[var(--color-text)]"
            >
              <FaTimes />
            </button>

            <FaCheckCircle className="text-[var(--color-primary)] text-4xl mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-1">
              {t("congrats", { defaultValue: "Congratulations!" })}
            </h2>
            <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text)] mb-4">
              {t("first_booking_success", {
                defaultValue: "Your first FIXIVA booking was successful. 🎉"
              })}
            </p>

            {reward && (
              <div className="mt-4 bg-[var(--color-bg)] dark:bg-[var(--color-bg)]/20 p-4 rounded-lg">
                <div className="flex items-center justify-center gap-3 mb-2 text-[var(--color-text)] dark:text-[var(--color-text)] font-medium">
                  <FaGift /> {t("reward_earned", { defaultValue: "You’ve earned a reward!" })}
                </div>
                <p className="text-sm font-semibold">{reward.message}</p>
                {reward.code && (
                  <div className="mt-2 text-[var(--color-text)] dark:text-[var(--color-text)] font-mono bg-[--color-bg] dark:bg-zinc-800 border rounded px-4 py-1 inline-block">
                    {reward.code}
                  </div>
                )}
              </div>
            )}

            <button
              aria-label={t("lets_go", { defaultValue: "Let's Go" })}
              onClick={onClose}
              className="mt-6 bg-[--color-primary] text-[--color-text-light] px-6 py-2 rounded-lg hover:bg-[--color-hover] transition"
            >
              {t("lets_go", { defaultValue: "Let’s Go 🚀" })}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


// auto‑added by add-default-exports.js
export default FirstBookingPopup;
