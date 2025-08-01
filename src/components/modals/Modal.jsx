import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export function Modal({ title, onClose, children, show = true }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    sendBotEvent("modal_opened", { title });
    return () => {
      document.body.style.overflow = "auto";
      sendBotEvent("modal_closed", { title });
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-dark)]/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("modal", { defaultValue: "Modal Dialog" })}
        >
          <FixivaHelmet
            title={t("modal_title", { defaultValue: title || "Dialog" })}
            description={t("modal_desc", { defaultValue: "Application modal dialog box." })}
            name="Modal"
          />
          <motion.div
            initial={{ scale: 0.96, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-[var(--color-bg)] rounded-xl shadow-2xl max-w-md w-full mx-4 relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] text-xl focus:outline-none"
              aria-label={t("close_modal", { defaultValue: "Close Modal" })}
              type="button"
            >
              <FaTimes />
            </button>

            {/* Title */}
            {title && (
              <div className="border-b border-[var(--color-border)] px-6 py-4">
                <h2 className="text-lg font-semibold text-[var(--color-text)]">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="p-6 text-[var(--color-text)]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// auto‑added by add-default-exports.js
export default Modal;
