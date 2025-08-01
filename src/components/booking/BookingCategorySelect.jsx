import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export function BookingCategorySelect({ categoryId, setCategoryId }) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data || []);
    } catch {
      // Show error if needed
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--color-text)]">
        {t("select_service_category", { defaultValue: "Select Service Category" })}
      </label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full rounded border border-[var(--color-border)] bg-muted p-3 text-sm"
        aria-label={t("select_service_category", { defaultValue: "Select Service Category" })}
      >
        <option value="">{t("choose_category", { defaultValue: "-- Choose Category --" })}</option>
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
export default BookingCategorySelect;
