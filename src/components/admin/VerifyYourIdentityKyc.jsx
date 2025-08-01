import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";

const VerifyYourIdentityKyc = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) onClick();

    triggerBot?.("kyc_verification_triggered");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "kyc_verification_triggered", {
        theme: theme || "default",
        source: "VerifyYourIdentityKyc",
      });
    }

    toast.success(
      t("kyc_verification_started", {
        defaultValue: "KYC verification process has started.",
      })
    );
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            disabled={disabled}
            aria-label={t("kyc_verify_button_label", {
              defaultValue: "Verify Your Identity",
            })}
            className="px-4 py-2 rounded-md font-semibold transition-colors bg-[--color-primary] hover:bg-[--color-primary-hover] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="inline-block mr-2 text-lg" />
            {t("kyc_verify_button_text", {
              defaultValue: "Verify Your Identity (KYC)",
            })}
          </motion.button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
          >
            {t("kyc_verify_tooltip", {
              defaultValue: "Click to start KYC verification",
            })}
            <Tooltip.Arrow className="fill-[--color-tooltip]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default VerifyYourIdentityKyc;