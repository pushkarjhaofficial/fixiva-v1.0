import React from "react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingSkeleton({ count = 3 }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Optionally, sendBotEvent("booking_skeleton_shown");

  return (
    <>
      <FixivaHelmet
        title={t("booking_skeleton_title", { defaultValue: "Loading Bookings..." })}
        description={t("booking_skeleton_desc", { defaultValue: "Loading your booking data." })}
        name="BookingSkeleton"
      />
      <div className="animate-pulse space-y-6 p-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="mb-2 h-4 w-2/3 rounded bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg)]" />
            <div className="h-3 w-1/4 rounded bg-[var(--color-bg-muted)] dark:bg-[var(--color-bg)]" />
          </div>
        ))}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingSkeleton;
