import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
import { FaHeadset } from "react-icons/fa";
import { toast } from "react-hot-toast";

export function FloatingSupportButton({ onClick }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleClick = () => {
    sendBotEvent?.("floating_support_clicked");
    toast.success(t("support_opened", { defaultValue: "Support opened!" }));
    onClick?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("floating_support_title", { defaultValue: "Need Help?" })}
        description={t("floating_support_desc", { defaultValue: "Quickly connect with Fixiva support." })}
        name="FloatingSupportButton"
      />
      <motion.button
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.24 }}
        onClick={handleClick}
        aria-label={t("floating_support_aria", { defaultValue: "Open Support or Live Chat" })}
        className="fixed z-50 bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full shadow-lg bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-accent)] transition focus:outline-none"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
        type="button"
      >
        <FaHeadset className="text-2xl" />
        <span className="hidden sm:inline font-semibold">{t("need_help", { defaultValue: "Need Help?" })}</span>
      </motion.button>
    </>
  );
}


// auto‑added by add-default-exports.js
export default FloatingSupportButton;
