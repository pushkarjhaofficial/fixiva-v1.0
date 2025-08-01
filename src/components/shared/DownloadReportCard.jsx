import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { BookingVoiceInput, QRScanner } from "@/components";
import { FaDownload } from "react-icons/fa";
import { RetryButton } from "@/shared";

const DownloadReportCard = ({ onDownload, disabled = false }) => {
  const { t } = useTranslation();

  const handleAction = () => {
    toast.success(t("report_download_started", { defaultValue: "Download started!" }));
    onDownload?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("download_report_title", { defaultValue: "Download Report" })}
        description={t("download_report_desc", { defaultValue: "Export your reports in one click." })}
        name="DownloadReportCard"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-4 shadow flex flex-col items-start"
        aria-label={t("download_report_card_aria", { defaultValue: "Download Report Card" })}
      >
        <h2 className="mb-2 text-lg font-bold flex items-center gap-2">
          <FaDownload className="text-[var(--color-primary)]" />
          {t("download_report", { defaultValue: "Download Report" })}
        </h2>
        <p className="text-sm text-[var(--color-text)] mb-4">
          {t("download_report_hint", { defaultValue: "Export your activity or billing data for offline analysis or compliance." })}
        </p>
        <div className="flex gap-4 flex-wrap">
          <RetryButton onClick={handleAction} disabled={disabled}>
            {t("download_now", { defaultValue: "Download Now" })}
          </RetryButton>
          <BookingVoiceInput />
          <QRScanner />
        </div>
      </motion.div>
    </>
  );
};export default DownloadReportCard;