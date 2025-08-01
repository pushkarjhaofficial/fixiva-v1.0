// src/components/admin/AdminRevenueChart.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaChartLine } from "react-icons/fa"

export interface RevenueData {
  date: string // ISO or YYYY-MM-DD
  value: number
}

export interface AdminRevenueChartProps {
  data: RevenueData[]
  className?: string
}

const AdminRevenueChart: React.FC<AdminRevenueChartProps> = ({
  data,
  className
}) => {
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  if (!data || data.length < 2) return null

  const maxY = Math.max(...data.map((d) => d.value), 1)
  const minY = Math.min(...data.map((d) => d.value), 0)

  const height = 100
  const chartHeight = 80
  const chartWidth = 300

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * chartWidth
      const y = height - ((d.value - minY) / (maxY - minY)) * chartHeight
      return `${x},${y}`
    })
    .join(" ")

  const lastY =
    height -
    ((data[data.length - 1].value - minY) / (maxY - minY)) * chartHeight

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", bg, border, className)}
      aria-labelledby="admin-revenue-chart-title"
    >
      <h2
        id="admin-revenue-chart-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaChartLine aria-hidden /> Revenue Trends
      </h2>

      <svg
        viewBox={`0 0 ${chartWidth + 20} ${height + 10}`}
        className="w-full h-28"
        role="img"
        aria-label="Revenue trend line chart"
      >
        <polyline
          fill="none"
          stroke="#16a34a"
          strokeWidth={2.5}
          points={points}
        />
        <circle
          r={4}
          fill="#16a34a"
          cx={chartWidth}
          cy={lastY}
        />
      </svg>

      <div className={clsx("flex justify-between text-xs mt-2", text)}>
        <span>{data[0].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </section>
  )
}

export default AdminRevenueChart
