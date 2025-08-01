import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme, useFixivaBot } from "@/hooks";
import { toast } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";

const VendorManagementPanel = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();

  const handleClick = () => {
    onClick?.();
    sendBotEvent?.("vendor_panel_clicked");
    if (typeof window !== "undefined" && window.gtag)
      window.gtag("event", "component_used", { method: "vendor_panel" });
    toast.success(t("action_success", { defaultValue: "Action completed!" }));
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            disabled={disabled}
            aria-label={t("vendor_management_panel", { defaultValue: "Vendor Management Panel" })}
            className={`px-4 py-2 rounded-md font-semibold transition-colors text-white ${
              disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[var(--color-primary)] hover:bg-[var(--color-accent)]"
            }`}
            type="button"
          >
            <FiCheckCircle className="inline mr-2" />
            {t("vendor_management_panel", { defaultValue: "Vendor Management Panel" })}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          className="rounded bg-[var(--color-bg-dark)] px-2 py-1 text-xs text-[var(--color-text-light)] shadow"
        >
          {t("manage_vendors_tooltip", { defaultValue: "Manage all vendors here" })}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default VendorManagementPanel;