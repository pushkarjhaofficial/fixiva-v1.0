import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

const RebookModal = ({ isOpen, onClose, onConfirm, serviceData = {} }) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState("");

  const handleRebook = () => {
    if (!selectedDate) {
      toast.error(t("please_choose_date", { defaultValue: "Please choose a date." }));
      return;
    }
    sendBotEvent("rebook_confirmed", { service: serviceData?.name, date: selectedDate, note });
    onConfirm?.({ date: selectedDate, note });
    toast.success(t("rebooking_initiated", { defaultValue: "Rebooking initiated!" }));
    onClose?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("rebook_modal_title", { defaultValue: "Rebook Service" })}
        description={t("rebook_modal_desc", { defaultValue: "Rebook your service with new date and note." })}
        name="RebookModal"
      />

      <AnimatePresence>
        {isOpen && (
          <Dialog as="div" className="relative z-50" onClose={onClose} open={isOpen}>
            <div className="fixed inset-0 bg-[var(--color-bg-dark)]/40 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="w-full max-w-md rounded-xl bg-[var(--color-bg)] p-6 shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-label={t("rebook_modal_aria", { defaultValue: "Rebook Service Modal" })}
              >
                <Dialog.Title className="mb-3 text-center text-lg font-semibold">
                  {t("rebook_service", { defaultValue: "Rebook" })} {serviceData?.name || t("service", { defaultValue: "Service" })}
                </Dialog.Title>
                <div className="mb-4">
                  <label htmlFor="rebook-datepicker" className="mb-1 block text-sm font-medium">
                    {t("choose_a_date", { defaultValue: "Choose a Date" })}
                  </label>
                  <DatePicker
                    id="rebook-datepicker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    dateFormat="Pp"
                    className="w-full rounded border px-3 py-2 bg-[var(--color-bg)] text-[var(--color-text)]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="rebook-note" className="mb-1 block text-sm font-medium">
                    {t("optional_note", { defaultValue: "Optional Note" })}
                  </label>
                  <textarea
                    id="rebook-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-24 w-full rounded border px-3 py-2 bg-[var(--color-bg)] text-[var(--color-text)]"
                    placeholder={t("special_instructions", { defaultValue: "Any special instructions or notes..." })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    aria-label={t("cancel", { defaultValue: "Cancel" })}
                    onClick={onClose}
                    className="rounded bg-[var(--color-bg-muted)] px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)]"
                    type="button"
                  >
                    {t("cancel", { defaultValue: "Cancel" })}
                  </button>
                  <button
                    aria-label={t("confirm_rebook", { defaultValue: "Confirm Rebook" })}
                    onClick={handleRebook}
                    className="rounded bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--color-accent)]"
                    type="button"
                  >
                    {t("confirm_rebook", { defaultValue: "Confirm Rebook" })}
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};export default RebookModal;