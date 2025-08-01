import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function BookingAddressInput({ address, setAddress }) {
  const { t } = useTranslation();

  useEffect(() => {
    autoFillAddress();
    // eslint-disable-next-line
  }, []);

  const autoFillAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          setAddress(res.data.display_name || "");
        } catch {
          // Show error if needed
        }
      });
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--color-text)]">
        {t("address", { defaultValue: "Address" })}
      </label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full rounded border border-[var(--color-border)] bg-muted p-3 text-sm"
        placeholder={t("enter_full_address", { defaultValue: "Enter your full address" })}
        aria-label={t("address", { defaultValue: "Address" })}
      />
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingAddressInput;
