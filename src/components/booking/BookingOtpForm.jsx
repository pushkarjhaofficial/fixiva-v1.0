import React from "react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { FixivaHelmet } from "@/shared";
import { useFixivaBot } from "@/hooks";

export function BookingBookingOtpForm({ onSubmit, otp, setOtp, loading }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 6); // 6-digit OTP only
    setOtp(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) onSubmit();
  };

  return (
    <>
      <FixivaHelmet
        title={t("booking_otp_title", { defaultValue: "Enter OTP" })}
        description={t("booking_otp_desc", { defaultValue: "Enter the OTP sent to your registered mobile/email to confirm booking." })}
        name="BookingBookingOtpForm"
      />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xs mx-auto">
        <label htmlFor="booking-otp" className="block text-sm font-semibold mb-1">
          {t("enter_otp_label", { defaultValue: "Enter OTP" })}
        </label>
        <input
          id="booking-otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={handleChange}
          disabled={loading}
          className="w-full rounded border px-3 py-2 text-lg tracking-widest bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-[--color-primary] focus:border-[--color-primary]"
          placeholder={t("otp_placeholder", { defaultValue: "------" })}
          autoComplete="one-time-code"
        />

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="w-full flex justify-center items-center gap-2 rounded bg-[--color-primary] text-[--color-text-light] py-2 px-4 font-semibold transition hover:bg-[--color-hover] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("verifying", { defaultValue: "Verifying..." })}
            </>
          ) : (
            t("confirm_booking", { defaultValue: "Confirm Booking" })
          )}
        </button>
      </form>
    </>
  );
}


// auto‑added by add-default-exports.js
export default BookingBookingOtpForm;
