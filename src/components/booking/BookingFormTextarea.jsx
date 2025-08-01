import React from "react";
import { useTranslation } from "react-i18next";

export function BookingFormTextarea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  disabled = false,
  required = false,
  name = "",
  className = "",
}) {
  const { t } = useTranslation();

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full resize-none rounded-md border border-[var(--color-border)] bg-muted/10 p-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-[--color-focus-ring]"
        aria-label={label || name}
      />
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingFormTextarea;
