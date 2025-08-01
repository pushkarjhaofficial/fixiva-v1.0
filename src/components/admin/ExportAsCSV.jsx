import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { FixivaHelmet } from "@components/shared/FixivaHelmet";
import { RetryButton } from "@/shared/retrybutton";;
import { BookingVoiceInput } from "@components/booking/BookingVoiceInput";
import { QRScanner } from "@components/booking/QRScanner";

// Mock data to export
const sampleData = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
];

const ExportAsCSV = () => {
  const { t } = useTranslation();

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Email,Status"]
        .concat(sampleData.map(row => `${row.name},${row.email},${row.status}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fixiva_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      t("export_success", { defaultValue: "CSV export completed successfully!" })
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("export_csv_title", { defaultValue: "Export as CSV" })}
        description={t("export_csv_description", {
          defaultValue: "Export your admin data to CSV format",
        })}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[--color-bg] p-6 shadow-md text-[--color-text]"
        aria-label={t("export_csv_aria", {
          defaultValue: "Export as CSV Component",
        })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("export_csv_heading", { defaultValue: "Download Data as CSV" })}
        </h2>
        <p className="text-sm mb-4">
          {t("export_csv_description_text", {
            defaultValue:
              "You can export sample admin data in CSV format using the button below.",
          })}
        </p>

        <div className="flex flex-wrap gap-4">
          <RetryButton onClick={handleExport}>
            {t("export_button", { defaultValue: "Export CSV" })}
          </RetryButton>
          <BookingVoiceInput
            onVoiceResult={(value) => {
              toast(t("voice_command_received", { defaultValue: "Voice: " }) + value);
            }}
          />
          <QRScanner
            onResult={(result) => {
              toast(t("qr_scanned", { defaultValue: "QR: " }) + result);
            }}
          />
        </div>
      </motion.div>
    </>
  );
};export default ExportAsCSV;