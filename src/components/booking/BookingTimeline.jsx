import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import clsx from "clsx";
import { FixivaHelmet } from "@/shared";

export function BookingTimeline({ steps = [], currentStep }) {
  const { t } = useTranslation();

  const getIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "in-progress":
        return <FaClock className="text-yellow-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("booking_timeline.title", { defaultValue: "Booking Timeline" })}
        description={t("booking_timeline.description", {
          defaultValue: "Visual progress of your booking status.",
        })}
        name="BookingTimeline"
      />

      <div className="w-full rounded-lg border border-[var(--color-border)] bg-[--color-bg] p-4 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold">
          {t("booking_timeline.progress", { defaultValue: "Booking Progress" })}
        </h3>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = step.key === currentStep;
            const isCompleted = step.status === "completed";

            return (
              <div
                key={index}
                className={clsx("flex items-center gap-4", {
                  "opacity-100": isActive || isCompleted,
                  "opacity-60": !isActive && !isCompleted,
                })}
              >
                <div className="flex-shrink-0">{getIcon(step.status)}</div>
                <div>
                  <div
                    className={clsx("text-sm font-medium", {
                      "text-[var(--color-text)]": true,
                    })}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-[var(--color-text)]">
                    {step.timestamp
                      ? new Date(step.timestamp).toLocaleString()
                      : t("booking_timeline.pending", { defaultValue: "Pending" })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingTimeline;
