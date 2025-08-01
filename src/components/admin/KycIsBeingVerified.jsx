import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";

const KycIsBeingVerified = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) onClick();

    triggerBot?.("kyc_verification_pending");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "kyc_status_check", {
        context: "KYCStatusButton",
        theme: theme || "default",
      });
    }

    toast.success(
      t("kyc_verification_pending_toast", {
        defaultValue: "KYC verification is currently in progress.",
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
            aria-label={t("kyc_button_label", {
              defaultValue: "KYC is being verified",
            })}
            className="px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:bg-[--color-primary-hover] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="inline-block mr-2 text-lg" />
            {t("kyc_button_text", { defaultValue: "KYC is being verified" })}
          </motion.button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
          >
            {t("kyc_button_tooltip", {
              defaultValue: "Your KYC is under review by our team.",
            })}
            <Tooltip.Arrow className="fill-[--color-tooltip]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default KycIsBeingVerified;