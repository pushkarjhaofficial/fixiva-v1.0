import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useTheme, useFixivaBot } from "@/hooks";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FiCheckCircle } from "react-icons/fi";

const SearchingBestVendorForYou = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();

  const handleClick = () => {
    onClick?.();
    sendBotEvent?.("searching_best_vendor_clicked");
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "component_used", { method: "searching_best_vendor" });
    }
    toast.success(
      t("searching_best_vendor_success", {
        defaultValue: "Searching the best vendor for you!",
      })
    );
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleClick}
            disabled={disabled}
            aria-label={t("searching_best_vendor_for_you", {
              defaultValue: "Searching Best Vendor For You",
            })}
            className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors text-[var(--color-text-light)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50"
            type="button"
          >
            <FiCheckCircle />
            {t("searching_best_vendor_for_you", {
              defaultValue: "Searching Best Vendor For You",
            })}
          </motion.button>
        </Tooltip.Trigger>
        <Tooltip.Content
          side="top"
          align="center"
          className="bg-[var(--color-tooltip-bg)] text-sm px-3 py-2 rounded shadow-[var(--color-shadow)] z-50"
        >
          {t("searching_best_vendor_tooltip", {
            defaultValue: "We'll match you with the best available vendor instantly.",
          })}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default SearchingBestVendorForYou;