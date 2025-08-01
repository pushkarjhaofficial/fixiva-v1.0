import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";
import { useTheme, useFixivaBot } from "@/hooks";

export function ChatInput({ onClick, disabled = false }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleClick = () => {
    if (onClick) {
      onClick();
      triggerBot('component_clicked');
      if (typeof window !== 'undefined') {
        window.gtag?.('event', 'component_used', { method: 'default' });
      }
      toast.success(t('action_success', { defaultValue: 'Action completed' }));
    }
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          aria-label={t('ChatInput', { defaultValue: 'ChatInput' })}
          onClick={handleClick}
          disabled={disabled}
          className="px-4 py-2 rounded-md font-semibold transition-colors text-white bg-[--color-primary] hover:opacity-90 disabled:opacity-60"
        >
          <FiCheckCircle className="inline mr-2" />
          {t('ChatInput', { defaultValue: 'ChatInput' })}
        </button>
      </Tooltip.Trigger>
    </Tooltip.Root>
  );
}

// auto‑added by add-default-exports.js
export default ChatInput;
