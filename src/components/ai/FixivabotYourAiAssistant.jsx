import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import { toast } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";

const FixivabotYourAiAssistant = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();

  const handleClick = () => {
    onClick?.();
    sendBotEvent?.("fixivabot_ai_assistant_clicked");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "component_used", { method: "ai_assistant" });
    }
    toast.success(t("fixivabot_action_success", { defaultValue: "AI Assistant Activated!" }));
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            disabled={disabled}
            aria-label={t("fixivabot_ai_assistant", { defaultValue: "FixivaBot: Your AI Assistant" })}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:bg-[--color-accent] disabled:opacity-50"
            type="button"
          >
            <FiCheckCircle className="inline mr-2" />
            {t("fixivabot_ai_assistant", { defaultValue: "FixivaBot: Your AI Assistant" })}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          className="bg-[--color-tooltip-bg] text-sm px-3 py-2 rounded shadow z-50"
        >
          {t("fixivabot_tooltip", { defaultValue: "Start a conversation with Fixiva AI for help and support." })}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default FixivabotYourAiAssistant;