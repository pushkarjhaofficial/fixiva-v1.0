import React from "react"
import clsx from "clsx"
import { FaHandshake, FaChartLine, FaUserFriends, FaTasks } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerDashboardStats {
  partnerName: string
  totalCustomers: number
  totalJobs: number
  activeJobs: number
  completedJobs: number
  totalRevenue: number
  region: string
}

export interface PartnerDashboardProps {
  stats: PartnerDashboardStats
  className?: string
}

const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  stats, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-xl font-bold mb-5 flex items-center gap-2", text)}>
        <FaHandshake /> {stats.partnerName} Partner Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaUserFriends className="text-blue-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.totalCustomers}</span>
          <span className="text-xs">Customers</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaTasks className="text-yellow-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.activeJobs}</span>
          <span className="text-xs">Active Jobs</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaChartLine className="text-green-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.completedJobs}</span>
          <span className="text-xs">Completed Jobs</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="font-bold text-lg">{stats.totalRevenue.toLocaleString()}</span>
          <span className="text-xs">Revenue</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="text-sm">{stats.region}</span>
          <span className="text-xs">Region</span>
        </div>
      </div>
    </div>
  )
}
export default PartnerDashboard
