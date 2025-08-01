import React from "react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";
import BookingReviewForm from "./BookingReviewForm";

export function BookingReviewModal({ show, bookingId, onClose, onSubmit }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  if (!show) return null;

  const handleReviewSubmit = async (data) => {
    await onSubmit(bookingId, data);
    onClose();
  };

  return (
    <>
      <FixivaHelmet
        title={t("booking_review_title", { defaultValue: "Review Booking" })}
        description={t("booking_review_desc", { defaultValue: "Submit your review for this booking." })}
        name="BookingReviewModal"
      />
      <BookingReviewForm onSubmit={handleReviewSubmit} onClose={onClose} />
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingReviewModal;
