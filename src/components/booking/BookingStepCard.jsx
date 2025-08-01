import React from "react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingStepCard({ title, children, className = "" }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("booking_step_title", { defaultValue: title || "Booking Step" })}
        description={t("booking_step_desc", {
          defaultValue: "Fill out this step to proceed with your booking.",
        })}
        name="BookingStepCard"
      />
      <div className={`space-y-6 ${className}`}>
        {title && (
          <h2 className="text-center text-2xl font-bold text-[var(--color-text)]">
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingStepCard;
