import React from "react";
import { useTranslation } from "react-i18next";

export function BookingCategorySelector({ categories = [], selected, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {t("service_category", { defaultValue: "Service Category" })}
      </label>
      <select
        className="w-full rounded border bg-muted p-3"
        value={selected}
        onChange={onChange}
        aria-label={t("service_category", { defaultValue: "Service Category" })}
      >
        <option value="">{t("select", { defaultValue: "-- Select --" })}</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingCategorySelector;
