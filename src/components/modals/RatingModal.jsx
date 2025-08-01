import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

const RatingModal = ({
  isOpen,
  onClose,
  onSubmit,
  serviceName = "your service",
}) => {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (!rating) {
      toast.error(t("please_select_rating", { defaultValue: "Please select a rating first!" }));
      return;
    }
    sendBotEvent("service_rated", { service: serviceName, rating, review });
    onSubmit?.({ rating, review });
    toast.success(t("thank_you_feedback", { defaultValue: "Thank you for your feedback!" }));
    onClose?.();
    setRating(0);
    setReview("");
  };

  return (
    <>
      <FixivaHelmet
        title={t("rate_service_title", { defaultValue: `Rate ${serviceName}` })}
        description={t("rate_service_desc", { defaultValue: "Share your rating and review for our service." })}
        name="RatingModal"
      />
      <AnimatePresence>
        {isOpen && (
          <Dialog as="div" className="relative z-50" onClose={onClose} open={isOpen}>
            <div className="fixed inset-0 bg-[var(--color-bg-dark)]/50 backdrop-blur-sm" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="w-full max-w-md rounded-xl bg-[var(--color-bg)] p-6 shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-label={t("rate_service_aria", { defaultValue: "Rate Service Modal" })}
              >
                <Dialog.Title className="mb-3 text-center text-lg font-semibold">
                  {t("rate_service", { defaultValue: "Rate" })} {serviceName}
                </Dialog.Title>
                <div className="mb-4 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer text-2xl transition-all ${((hovered || rating) >= star)
                        ? "text-yellow-400"
                        : "text-[var(--color-border)]"
                        }`}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setRating(star)}
                      aria-label={t("set_rating", { defaultValue: `Set rating ${star}` })}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') setRating(star);
                      }}
                    />
                  ))}
                </div>
                <textarea
                  aria-label={t("review_textarea", { defaultValue: "Leave an optional review..." })}
                  className="mb-4 h-24 w-full resize-none rounded-md border border-[var(--color-border)] p-2 text-sm bg-[var(--color-bg)] text-[var(--color-text)]"
                  placeholder={t("leave_review", { defaultValue: "Leave an optional review..." })}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
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
                    aria-label={t("submit_rating", { defaultValue: "Submit Rating" })}
                    onClick={handleSubmit}
                    className="rounded bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--color-accent)]"
                    type="button"
                  >
                    {t("submit", { defaultValue: "Submit" })}
                  </button>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};export default RatingModal;