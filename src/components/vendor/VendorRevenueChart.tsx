// src/components/vendor/VendorRevenueChart.tsx

import React from "react"
import { Line } from "react-chartjs-2"
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from "chart.js"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"

// Register Chart.js modules once (required for standalone usage)
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

export interface RevenueDataPoint {
  date: string   // e.g., "2024-07-30"
  revenue: number
}

export interface VendorRevenueChartProps {
  data: RevenueDataPoint[]
  className?: string
}

const VendorRevenueChart: React.FC<VendorRevenueChartProps> = ({ data, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  // Chart.js dataset config
  const labels = data.map(d => d.date)
  const revenues = data.map(d => d.revenue)

  const chartData = {
    labels,
    datasets: [
      {
        label: t("vendor.revenue") || "Revenue",
        data: revenues,
        fill: false,
        borderColor: theme === "dark" ? "#90cdf4" : "#2563eb",
        backgroundColor: theme === "dark" ? "#90cdf4" : "#2563eb",
        tension: 0.2,
        pointRadius: 4,
        pointBackgroundColor: theme === "dark" ? "#fff" : "#2563eb"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#fff" : "#222"
        }
      },
      tooltip: {
        mode: "index" as const,
        intersect: false
      },
      title: {
        display: true,
        text: t("vendor.revenueTrends") || "Revenue Trends",
        color: theme === "dark" ? "#fff" : "#222",
        font: { size: 18 }
      }
    },
    scales: {
      x: {
        ticks: { color: theme === "dark" ? "#eee" : "#222" },
        grid: { color: theme === "dark" ? "#333" : "#eee" }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: theme === "dark" ? "#eee" : "#222",
          callback: (value: any) =>
            new Intl.NumberFormat(undefined, { style: "currency", currency: "INR" }).format(Number(value))
        },
        grid: { color: theme === "dark" ? "#333" : "#eee" }
      }
    }
  }

  return (
    <div className={className}>
      <Line data={chartData} options={options as any} />
    </div>
  )
}

export default VendorRevenueChart
