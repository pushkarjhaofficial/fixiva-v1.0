import React from "react";
import { useTranslation } from "react-i18next";

export function BookingDateTimeInput({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <label className="text-sm font-medium">
        {t("select_date", { defaultValue: "Date" })}
        <input
          type="date"
          className="ml-2 border px-2 py-1 rounded"
          value={value.date || ""}
          onChange={(e) => onChange({ ...value, date: e.target.value })}
        />
      </label>
      <label className="text-sm font-medium">
        {t("select_time", { defaultValue: "Time" })}
        <input
          type="time"
          className="ml-2 border px-2 py-1 rounded"
          value={value.time || ""}
          onChange={(e) => onChange({ ...value, time: e.target.value })}
        />
      </label>
    </div>
  );
}
export default BookingDateTimeInput;
