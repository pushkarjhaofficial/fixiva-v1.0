// src/components/admin/AdminDashboardOverview.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import {
  FaChartPie,
  FaUserShield,
  FaUsers,
  FaTools,
  FaRecycle
} from "react-icons/fa"

export interface AdminOverviewStats {
  totalUsers: number
  activeVendors: number
  totalBookings: number
  recycledItems: number
  revenue: number
  newSignups?: number
  [key: string]: number | undefined
}

export interface AdminDashboardOverviewProps {
  stats: AdminOverviewStats
  className?: string
}

const ADMIN_OVERVIEW_CONFIG: {
  key: keyof AdminOverviewStats
  icon: React.ReactNode
  label: string
  color: string
}[] = [
  {
    key: "totalUsers",
    icon: <FaUsers aria-hidden />,
    label: "Total Users",
    color: "text-blue-600"
  },
  {
    key: "activeVendors",
    icon: <FaUserShield aria-hidden />,
    label: "Active Vendors",
    color: "text-green-700"
  },
  {
    key: "totalBookings",
    icon: <FaTools aria-hidden />,
    label: "Total Bookings",
    color: "text-primary-600"
  },
  {
    key: "recycledItems",
    icon: <FaRecycle aria-hidden />,
    label: "Recycled Items",
    color: "text-green-500"
  },
  {
    key: "revenue",
    icon: <FaChartPie aria-hidden />,
    label: "Revenue",
    color: "text-yellow-600"
  },
  {
    key: "newSignups",
    icon: <FaUsers aria-hidden />,
    label: "New Signups",
    color: "text-indigo-700"
  }
]

const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  stats,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <section
      aria-labelledby="admin-dashboard-overview-title"
      className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}
    >
      <h2
        id="admin-dashboard-overview-title"
        className={clsx("text-lg font-semibold mb-4", text)}
      >
        {t("admin.dashboardOverview") || "Admin Dashboard Overview"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {ADMIN_OVERVIEW_CONFIG.filter((c) => stats[c.key] !== undefined).map(
          (conf) => (
            <div
              key={conf.key}
              className={clsx(
                "rounded flex flex-col items-center p-4 shadow bg-[--color-bg-secondary]"
              )}
              role="group"
              aria-label={t(`admin.${conf.key}`) || conf.label}
            >
              <div className={clsx("text-2xl mb-2", conf.color)}>{conf.icon}</div>

              <div className={clsx("text-3xl font-bold", text)}>
                {conf.key === "revenue"
                  ? new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "INR"
                    }).format(Number(stats[conf.key] || 0))
                  : stats[conf.key]}
              </div>

              <div className={clsx("text-sm", text)}>
                {t(`admin.${conf.key}`) || conf.label}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default AdminDashboardOverview
