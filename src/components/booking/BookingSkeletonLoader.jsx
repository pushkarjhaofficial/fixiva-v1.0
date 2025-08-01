import React from "react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingSkeletonLoader() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Optionally, sendBotEvent("skeleton_loader_shown");

  return (
    <>
      <FixivaHelmet
        title={t("booking_loading_title", { defaultValue: "Loading Booking..." })}
        description={t("booking_loading_desc", { defaultValue: "Please wait while we load your booking." })}
        name="BookingSkeletonLoader"
      />
      <div className="animate-pulse space-y-4 p-6 rounded-lg bg-[var(--color-surface)] shadow">
        <div className="h-10 w-full rounded bg-[var(--color-bg)]" />
        <div className="mt-4 h-6 w-1/2 rounded bg-[var(--color-bg)]" />
        <div className="h-10 w-full rounded bg-[var(--color-bg)]" />
        <div className="mt-4 h-6 w-2/3 rounded bg-[var(--color-bg)]" />
        <div className="h-10 w-full rounded bg-[var(--color-bg)]" />
        <div className="mt-6 h-[300px] w-full rounded bg-[var(--color-bg)]" />
        <div className="h-12 w-full rounded bg-[var(--color-primary-muted)]" />
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingSkeletonLoader;
