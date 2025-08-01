import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";
// import Lottie from "lottie-react"; // Uncomment if you want to show animation
// import successAnimation from "@/assets/success.json"; // Provide your animation

export function BookingSuccessView({
  title = "Booking Successful!",
  message,
  buttonText = "View Bookings",
  redirectTo = "/customer/bookings",
}) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Optionally: sendBotEvent("booking_success_shown");

  return (
    <>
      <FixivaHelmet
        title={t("booking_success_title", { defaultValue: title })}
        description={t("booking_success_desc", {
          defaultValue: "Your booking was successful.",
        })}
        name="BookingSuccessView"
      />

      <div className="flex flex-col items-center justify-center min-h-[240px] py-12 space-y-5 text-center">
        {/* 
        <Lottie animationData={successAnimation} loop={false} style={{ width: 120, height: 120 }} />
        */}
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          {t("booking_success_title", { defaultValue: title })}
        </h2>
        {message && (
          <p className="text-sm text-muted">{message}</p>
        )}
        <Link
          to={redirectTo}
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded bg-[--color-primary] text-[--color-text-light] font-semibold hover:bg-[--color-hover] transition"
        >
          <FileText size={18} />
          {t("booking_success_button", { defaultValue: buttonText })}
        </Link>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingSuccessView;
