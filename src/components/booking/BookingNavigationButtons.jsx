import React from "react";
import { useTranslation } from "react-i18next";
import { FixivaHelmet } from "@/shared";

/**
 * BookingNavigationButtons
 * Props:
 * - onBack: () => void
 * - onNext: () => void
 * - backLabel: string (default: "Back")
 * - nextLabel: string (default: "Next")
 * - hideBack: boolean (default: false)
 */
export function BookingNavigationButtons({
  onBack,
  onNext,
  backLabel = "Back",
  nextLabel = "Next",
  hideBack = false,
}) {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("navigation_buttons", { defaultValue: "Booking Navigation" })}
        description={t("booking_nav_desc", { defaultValue: "Navigation buttons for multi-step booking forms." })}
        name="BookingNavigationButtons"
      />
      <div className="flex justify-between items-center gap-4 mt-4">
        {!hideBack && (
          <button
            aria-label={t("back", { defaultValue: "Back" })}
            type="button"
            onClick={onBack}
            className="btn-light px-4 py-2 rounded border dark:border-border"
          >
            {t(backLabel, { defaultValue: backLabel })}
          </button>
        )}
        <button
          aria-label={t("next", { defaultValue: "Next" })}
          type="button"
          onClick={onNext}
          className="btn-primary px-4 py-2 rounded"
        >
          {t(nextLabel, { defaultValue: nextLabel })}
        </button>
      </div>
    </>
  );
}

export default BookingNavigationButtons;
