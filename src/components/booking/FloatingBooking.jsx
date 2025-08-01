import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FixivaHelmet } from "@/shared";

export function FloatingBooking() {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Book a Service" })}
        description={t("component_tooltip", {
          defaultValue: "Quickly book your next repair or service.",
        })}
        name="FloatingBooking"
      />

      <Link
        to="/booking"
        className="fixed bottom-6 right-6 rounded-full bg-[--color-primary] px-5 py-3 text-sm font-semibold text-[--color-text-light] shadow-[var(--color-shadow)] transition duration-300 hover:bg-[--color-hover]"
      >
        {t("book_now", { defaultValue: "Book Now" })}
      </Link>
    </>
  );
}


// auto‑added by add-default-exports.js
export default FloatingBooking;
