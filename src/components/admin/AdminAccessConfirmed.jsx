import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from "@/components";

const AdminAccessConfirmed = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) onClick();

    triggerBot?.("admin_access_confirmed");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "admin_action_confirmed", {
        theme: theme || "default",
        context: "admin_panel",
      });
    }

    toast.success(
      t("action_success", { defaultValue: "Action completed successfully" })
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("admin_access_confirmed_title", { defaultValue: "Admin Access" })}
        description={t("admin_access_confirmed_description", {
          defaultValue: "Confirm administrative access securely.",
        })}
      />

      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleClick}
              disabled={disabled}
              aria-label={t("confirm_action", { defaultValue: "Confirm Action" })}
              className="px-4 py-2 rounded-md font-semibold transition-colors bg-[--color-primary] hover:bg-[--color-primary-hover] text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-ring]"
            >
              <FiCheckCircle className="inline-block mr-2 text-lg" />
              {t("confirm_access", { defaultValue: "Confirm Access" })}
            </motion.button>
          </Tooltip.Trigger>

          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={8}
              className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
            >
              {t("tooltip_confirm", {
                defaultValue: "Click to confirm admin access",
              })}
              <Tooltip.Arrow className="fill-[--color-tooltip]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};export default AdminAccessConfirmed;