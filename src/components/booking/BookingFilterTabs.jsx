import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export function BookingFilterTabs({ tabs, active, onTab }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 border-b border-[var(--color-border)]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          aria-label={t(tab.label, { defaultValue: tab.label })}
          className={clsx(
            "px-4 py-2 rounded-t-md font-semibold transition-colors",
            active === tab.value
              ? "bg-[--color-primary] text-[--color-text-light]"
              : "bg-transparent text-[--color-text]"
          )}
          onClick={() => onTab(tab.value)}
        >
          {t(tab.label, { defaultValue: tab.label })}
        </button>
      ))}
    </div>
  );
}
export default BookingFilterTabs;
