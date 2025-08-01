import React from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from "@/shared";

export function BookingAISummaryModal({ isOpen, onClose, summary }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <FixivaHelmet
        title={t("booking_ai_summary", { defaultValue: "AI Booking Summary" })}
        description={t("booking_ai_summary_desc", { defaultValue: "AI-generated summary of your booking details." })}
        name="BookingAISummaryModal"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-[--color-bg] p-6 shadow-[var(--color-shadow)]">
          <Dialog.Title className="text-xl font-bold text-[--color-text] mb-4">
            {t("ai_summary_heading", { defaultValue: "AI Summary" })}
          </Dialog.Title>
          <div className="text-[--color-text] whitespace-pre-line mb-6">
            {summary || t("no_summary_available", { defaultValue: "No summary available." })}
          </div>
          <div className="flex justify-end">
            <button
              aria-label={t("close_modal", { defaultValue: "Close summary modal" })}
              onClick={onClose}
              className="px-4 py-2 bg-[--color-primary] text-[--color-text-light] rounded hover:opacity-90"
            >
              {t("close", { defaultValue: "Close" })}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default BookingAISummaryModal;
