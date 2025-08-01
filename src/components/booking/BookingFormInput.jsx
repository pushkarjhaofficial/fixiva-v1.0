import React from "react";
import { useTranslation } from "react-i18next";

export function BookingFormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  name = "",
  disabled = false,
  required = false,
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
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full rounded-md border border-[var(--color-border)] bg-muted p-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-[--color-focus-ring]"
        aria-label={label || name}
      />
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingFormInput;
