import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

/**
 * DashboardStatsCard
 * @param {string} label - stat label
 * @param {string|number} value - stat value
 * @param {React.ReactNode} icon - icon to display
 * @param {string} color - one of ["indigo", "green", "yellow", "red", "blue", "gray"]
 */
export function DashboardStatsCard({ label, value, icon, color = "indigo" }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Color system: map to custom color variable or add your preferred color tokens
  const colorClasses = {
    indigo: "text-indigo-500",
    green: "text-emerald-500",
    yellow: "text-yellow-500",
    red: "text-red-500",
    blue: "text-blue-500",
    gray: "text-gray-400",
  };

  React.useEffect(() => {
    sendBotEvent?.("dashboard_stat_card_rendered", { label, value, color });
  }, [label, value, color, sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("dashboard_stat_card_title", { defaultValue: "Dashboard Stat" })}
        description={t("dashboard_stat_card_desc", { defaultValue: "Insightful dashboard stat card." })}
        name="DashboardStatsCard"
      />
      <div
        className="rounded-xl bg-[var(--color-bg)] p-5 shadow transition hover:-translate-y-1 hover:shadow-[var(--color-shadow)]"
        aria-label={t(label, { defaultValue: label })}
      >
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[var(--color-text)]">{value}</div>
          <div className={`h-6 w-6 flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
        </div>
        <p className="mt-2 text-sm text-[var(--color-text)]">{t(label, { defaultValue: label })}</p>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default DashboardStatsCard;
