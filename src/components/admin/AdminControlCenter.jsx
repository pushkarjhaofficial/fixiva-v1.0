import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from "@components/shared/FixivaHelmet";

const AdminControlCenter = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) onClick();
    triggerBot?.("admin_control_center_clicked");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "admin_control_center_used", {
        theme: theme || "default",
        section: "Admin Panel",
      });
    }

    toast.success(
      t("action_success", { defaultValue: "Action completed successfully" })
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("admin_control_center_title", {
          defaultValue: "Admin Control Center",
        })}
        description={t("admin_control_center_description", {
          defaultValue: "Access all admin operations from a centralized control point.",
        })}
      />

      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleClick}
              disabled={disabled}
              aria-label={t("admin_control_center_action", {
                defaultValue: "Control Center Access",
              })}
              className="px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:bg-[--color-primary-hover] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
            >
              <FiCheckCircle className="inline-block mr-2 text-lg" />
              {t("admin_control_center_button", {
                defaultValue: "Open Control Center",
              })}
            </motion.button>
          </Tooltip.Trigger>

          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={8}
              className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
            >
              {t("tooltip_control_center", {
                defaultValue: "Click to open admin controls",
              })}
              <Tooltip.Arrow className="fill-[--color-tooltip]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};export default AdminControlCenter;