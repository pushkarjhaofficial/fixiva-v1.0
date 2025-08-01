import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme, useFixivaBot } from "@/hooks";

export function RetryLogicTriggeredForBooking({ onClick, disabled = false }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) {
      onClick();
      triggerBot("component_clicked");
      window?.gtag?.("event", "component_used", { method: "default" });
      toast.success(t("action_success", { defaultValue: "Action completed" }));
    }
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          onClick={handleClick}
          disabled={disabled}
          aria-label={t("RetryLogicTriggeredForBooking", {
            defaultValue: "RetryLogicTriggeredForBooking",
          })}
          className="px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:opacity-90 disabled:opacity-60"
        >
          <FiCheckCircle className="inline mr-2" />
          {t("RetryLogicTriggeredForBooking", {
            defaultValue: "RetryLogicTriggeredForBooking",
          })}
        </button>
      </Tooltip.Trigger>
    </Tooltip.Root>
  );
}


// auto‑added by add-default-exports.js
export default RetryLogicTriggeredForBooking;
