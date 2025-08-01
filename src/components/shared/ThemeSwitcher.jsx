import React from "react";
import { useTheme } from "@/hooks";
import { useTranslation } from "react-i18next";

// Define your themes here (add more as needed)
const themes = [
  { value: "light", label: "🌞 Light" },
  { value: "dark", label: "🌚 Dark" },
  { value: "glass", label: "🧊 Glass" },
  { value: "luxury", label: "💎 Luxury" },
  { value: "dracula", label: "🧛 Dracula" },
  { value: "blue", label: "🌊 Blue" },
  { value: "green", label: "🌱 Green" },
  { value: "red", label: "🧨 Red" },
  { value: "purple", label: "🔮 Purple" },
  { value: "gold", label: "🏅 Gold" },
  { value: "mono", label: "⚫ Mono" },
];

export default function ThemeSwitcher({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label
        htmlFor="theme-select"
        className="text-sm font-medium text-[var(--color-text)]"
      >
        {t("theme", { defaultValue: "Theme" })}:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="bg-transparent text-sm text-[var(--color-text)] outline-none cursor-pointer rounded border border-[var(--color-border)] px-2 py-1"
        aria-label={t("select_theme", { defaultValue: "Select Theme" })}
      >
        {themes.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
