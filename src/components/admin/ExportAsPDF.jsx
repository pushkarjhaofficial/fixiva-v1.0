import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { FixivaHelmet } from "@components/shared/FixivaHelmet";
import { RetryButton } from "@/shared/retrybutton";;
import { BookingVoiceInput } from "@components/booking/BookingVoiceInput";
import { QRScanner } from "@components/booking/QRScanner";

// Sample data to export
const sampleData = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
];

const ExportAsPDF = () => {
  const { t } = useTranslation();

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text(t("export_pdf_heading", { defaultValue: "Exported PDF Report" }), 14, 20);

    doc.autoTable({
      head: [["Name", "Email", "Status"]],
      body: sampleData.map((row) => [row.name, row.email, row.status]),
      startY: 30,
    });

    doc.save("fixiva_export.pdf");

    toast.success(
      t("export_success", { defaultValue: "PDF export completed successfully!" })
    );
  };

  return (
    <>
      <FixivaHelmet
        title={t("export_pdf_title", { defaultValue: "Export as PDF" })}
        description={t("export_pdf_description", {
          defaultValue: "Export admin data to PDF format",
        })}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[--color-bg] p-6 shadow-md text-[--color-text]"
        aria-label={t("export_pdf_aria", { defaultValue: "Export PDF Block" })}
      >
        <h2 className="mb-2 text-lg font-bold">
          {t("export_pdf_heading", { defaultValue: "Download Data as PDF" })}
        </h2>
        <p className="text-sm mb-4">
          {t("export_pdf_description_text", {
            defaultValue:
              "Click below to export sample admin data into a PDF report.",
          })}
        </p>

        <div className="flex flex-wrap gap-4">
          <RetryButton onClick={handleExport}>
            {t("export_button_pdf", { defaultValue: "Export PDF" })}
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
};export default ExportAsPDF;