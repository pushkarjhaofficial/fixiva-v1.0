import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingReviewForm({ onSubmit, onClose }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") return;
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <>
      <FixivaHelmet
        title={t("review_form_title", { defaultValue: "Booking Review" })}
        description={t("review_form_desc", { defaultValue: "Leave your review for this booking." })}
        name="BookingReviewForm"
      />

      <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
        <div className="bg-[var(--color-bg)] dark:bg-[var(--color-surface)] p-6 rounded-xl shadow max-w-md w-full relative">
          <button
            aria-label={t("close_modal", { defaultValue: "Close review modal" })}
            className="absolute top-2 right-2 text-[var(--color-text)] hover:text-text"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold mb-4">📝 {t("submit_review", { defaultValue: "Submit Review" })}</h2>

          {/* Star Rating */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-6 h-6 cursor-pointer transition ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
                onClick={() => setRating(i)}
                aria-label={t("rating_star", { defaultValue: `Rate ${i}` })}
                filled={i <= rating ? 1 : 0}
              />
            ))}
          </div>

          {/* Comment box */}
          <textarea
            rows={4}
            className="w-full p-2 rounded bg-[var(--color-bg-muted)] dark:bg-[var(--color-surface)] border border-[var(--color-border)] text-sm"
            placeholder={t("write_review", { defaultValue: "Write your review..." })}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-label={t("review_textarea_label", { defaultValue: "Review comment" })}
          />

          <button
            aria-label={t("submit_review_btn", { defaultValue: "Submit review" })}
            onClick={handleSubmit}
            disabled={rating === 0 || comment.trim() === ""}
            className="mt-4 bg-[--color-primary] text-[--color-text-light] px-4 py-2 rounded hover:bg-[--color-hover] w-full disabled:opacity-60"
          >
            {t("submit", { defaultValue: "Submit" })}
          </button>
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingReviewForm;
