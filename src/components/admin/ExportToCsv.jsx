import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";

// Sample data
const sampleData = [
  { name: "User A", email: "usera@example.com", role: "Admin" },
  { name: "User B", email: "userb@example.com", role: "Editor" },
];

const ExportToCsv = ({ onClick, disabled = false }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { triggerBot } = useFixivaBot();

  const handleExport = () => {
    if (onClick) onClick();

    triggerBot?.("admin_export_csv");

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "admin_export_csv", {
        theme: theme || "default",
        method: "ExportToCsv",
      });
    }

    // Actual CSV export logic
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Role"]
        .concat(sampleData.map((r) => `${r.name},${r.email},${r.role}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fixiva_admin_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      t("csv_export_success", { defaultValue: "CSV export completed!" })
    );
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleExport}
            disabled={disabled}
            aria-label={t("export_csv_button", {
              defaultValue: "Export to CSV",
            })}
            className="px-4 py-2 rounded-md font-semibold transition-colors bg-[--color-primary] hover:bg-[--color-primary-hover] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="inline-block mr-2 text-lg" />
            {t("export_csv_button", { defaultValue: "Export to CSV" })}
          </motion.button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            sideOffset={8}
            className="bg-[--color-tooltip] text-sm text-white px-3 py-1.5 rounded shadow-md z-50"
          >
            {t("tooltip_export_csv", {
              defaultValue: "Click to export admin data to CSV",
            })}
            <Tooltip.Arrow className="fill-[--color-tooltip]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};export default ExportToCsv;