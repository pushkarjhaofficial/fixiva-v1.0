import React from "react";
import { useTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { BarChart3, Plus, Wallet, Bell, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export function BookingChart({ completed = 0, pending = 0, cancelled = 0 }) {
  const { t } = useTranslation();

  const chartData = {
    labels: [
      t("completed", { defaultValue: "Completed" }),
      t("pending", { defaultValue: "Pending" }),
      t("cancelled", { defaultValue: "Cancelled" }),
    ],
    datasets: [
      {
        label: t("bookings", { defaultValue: "Bookings" }),
        data: [completed, pending, cancelled],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" },
      title: {
        display: true,
        text: t("booking_status_overview", { defaultValue: "Booking Status Overview" }),
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="bg-[var(--color-bg)] p-6 rounded-xl shadow h-fit">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        {t("booking_overview", { defaultValue: "Booking Overview" })}
      </h2>
      <Bar data={chartData} options={chartOptions} />

      <div className="grid grid-cols-2 gap-4 mt-6 bg-[var(--color-bg)]/10 backdrop-blur-xl rounded-2xl p-4 shadow border border-white/10">
        <Link
          to="/customer/bookings"
          aria-label={t("new_booking", { defaultValue: "New Booking" })}
          className="group flex flex-col items-center justify-center gap-1 p-3 rounded-xl hover:bg-[--color-primary]/20 transition hover:scale-105 text-[var(--color-text)]"
        >
          <Plus className="h-6 w-6 text-[var(--color-text)] group-hover:text-[--color-primary] transition" />
          <span className="text-sm font-medium">{t("new_booking", { defaultValue: "New Booking" })}</span>
        </Link>
        <Link
          to="/customer/wallet"
          aria-label={t("wallet", { defaultValue: "Wallet" })}
          className="group flex flex-col items-center justify-center gap-1 p-3 rounded-xl hover:bg-[var(--color-bg)]/20 transition hover:scale-105 text-[var(--color-text)]"
        >
          <Wallet className="h-6 w-6 text-[var(--color-text)] group-hover:text-[--color-primary] transition" />
          <span className="text-sm font-medium">{t("wallet", { defaultValue: "Wallet" })}</span>
        </Link>
        <Link
          to="/customer/notifications"
          aria-label={t("notifications", { defaultValue: "Notifications" })}
          className="group relative flex flex-col items-center justify-center gap-1 p-3 rounded-xl hover:bg-[var(--color-bg)]/20 transition hover:scale-105 text-[var(--color-text)]"
        >
          <Bell className="h-6 w-6 text-[var(--color-text)] group-hover:text-[--color-primary] transition" />
          <span className="text-sm font-medium">{t("notifications", { defaultValue: "Notifications" })}</span>
          <span className="absolute top-2 right-3 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--color-text] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[--color-text]" />
          </span>
        </Link>
        <Link
          to="/customer/support"
          aria-label={t("support", { defaultValue: "Support" })}
          className="group flex flex-col items-center justify-center gap-1 p-3 rounded-xl hover:bg-[var(--color-bg)]/20 transition hover:scale-105 text-[var(--color-text)]"
        >
          <LifeBuoy className="h-6 w-6 text-[var(--color-text)] group-hover:text-[--color-primary] transition" />
          <span className="text-sm font-medium">{t("support", { defaultValue: "Support" })}</span>
        </Link>
      </div>
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingChart;
