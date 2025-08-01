import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks"; // Use alias always
import { toast } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiMic } from "react-icons/fi";
import { useFixivaBot } from "@/hooks"; // For bot analytics

const BookUsingVoice = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();

  const handleClick = () => {
    onClick?.();
    sendBotEvent?.("book_using_voice_clicked");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "component_used", { method: "voice" });
    }
    toast.success(t("book_using_voice_success", { defaultValue: "Voice booking started" }));
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            aria-label={t("book_using_voice", { defaultValue: "Book Using Voice" })}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:bg-[--color-accent] disabled:opacity-50"
          >
            <FiMic className="inline mr-2" />
            {t("book_using_voice", { defaultValue: "Book Using Voice" })}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          className="bg-[--color-tooltip-bg] text-sm px-3 py-2 rounded shadow z-50"
        >
          {t("book_using_voice_tooltip", { defaultValue: "Book your service using voice input." })}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default BookUsingVoice;