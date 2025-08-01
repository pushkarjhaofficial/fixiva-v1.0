import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
// Import Chart.js and react-chartjs-2
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const defaultData = {
  labels: ["AC Repair", "Fridge Repair", "TV Installation", "Plumbing", "Others"],
  datasets: [
    {
      label: "Service Popularity",
      data: [32, 24, 18, 16, 10],
      backgroundColor: [
        "rgba(99,102,241,0.85)", // Indigo
        "rgba(34,197,94,0.85)",  // Green
        "rgba(244,63,94,0.85)",  // Red
        "rgba(251,191,36,0.85)", // Yellow
        "rgba(156,163,175,0.85)",// Gray
      ],
      borderColor: [
        "rgba(99,102,241,1)",
        "rgba(34,197,94,1)",
        "rgba(244,63,94,1)",
        "rgba(251,191,36,1)",
        "rgba(156,163,175,1)",
      ],
      borderWidth: 2,
    },
  ],
};

export function ServicePopularityPieChart({ data = defaultData }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  React.useEffect(() => {
    sendBotEvent?.("service_popularity_piechart_rendered");
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("service_popularity_chart_title", { defaultValue: "Service Popularity" })}
        description={t("service_popularity_chart_desc", { defaultValue: "Most popular services booked on Fixiva." })}
        name="ServicePopularityPieChart"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="rounded-xl bg-[var(--color-bg)] p-6 shadow flex flex-col items-center"
        aria-label={t("service_popularity_chart_aria", { defaultValue: "Service Popularity Pie Chart" })}
      >
        <h3 className="text-lg font-bold mb-4 text-[var(--color-primary)]">
          {t("service_popularity_chart_title", { defaultValue: "Service Popularity" })}
        </h3>
        <div className="w-full max-w-xs sm:max-w-sm">
          <Pie data={data} />
        </div>
        <p className="mt-4 text-xs text-[var(--color-muted)] text-center">
          {t("service_popularity_chart_note", { defaultValue: "Based on recent Fixiva bookings." })}
        </p>
      </motion.div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default ServicePopularityPieChart;
