// src/components/dashboard/DashboardChart.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export interface DashboardChartProps {
  /** Array of data points: label on X-axis and numeric value */
  data: { label: string; value: number }[]
  /** Chart type: "line" or "bar" */
  type?: "line" | "bar"
  /** Chart container height in pixels */
  height?: number
  /** i18n key for the chart title */
  titleKey?: string
  /** Additional wrapper classes */
  className?: string
}

/**
 * DashboardChart
 * Renders a responsive line or bar chart of your data.
 * World-class, responsive, theme-aware, i18n-ready, and accessible.
 */
const DashboardChart: React.FC<DashboardChartProps> = ({
  data,
  type = "line",
  height = 300,
  titleKey,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <section
      role="region"
      aria-labelledby={titleKey ? "dashboard-chart-title" : undefined}
      className={clsx("bg-[--color-bg] p-4 rounded-lg shadow", className)}
    >
      {titleKey && (
        <h3
          id="dashboard-chart-title"
          className="text-lg font-semibold mb-2 text-[--color-text]"
        >
          {t(titleKey)}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {type === "line" ? (
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        ) : (
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </section>
  )
}

export default DashboardChart
