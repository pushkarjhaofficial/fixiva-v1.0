import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";

const SystemErrorLogs = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) onClick();

    triggerBot?.("system_error_logs_clicked");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "admin_error_logs_accessed", {
        theme: theme || "default",
        source: "SystemErrorLogs",
      });
    }

    toast.success(
      t("error_log_triggered", {
        defaultValue: "System error logs accessed successfully!",
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
            aria-label={t("system_error_logs_label", {
              defaultValue: "Open System Error Logs",
            })}
            className="px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:bg-[--color-primary-hover] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="inline-block mr-2 text-lg" />
            {t("system_error_logs_button", {
              defaultValue: "Open Error Logs",
            })}
          </motion.button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
          >
            {t("system_error_logs_tooltip", {
              defaultValue: "View and export backend/system logs",
            })}
            <Tooltip.Arrow className="fill-[--color-tooltip]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default SystemErrorLogs;