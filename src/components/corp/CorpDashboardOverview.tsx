import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaBuilding, FaUsers, FaRecycle, FaChartBar } from "react-icons/fa"

export interface CorpDashboardStats {
  totalAssets: number
  activeEmployees: number
  openTickets: number
  recycledAssets: number
  totalVendors: number
  esgScore: number
  companyName?: string
}
export interface CorpDashboardOverviewProps {
  stats: CorpDashboardStats
  className?: string
}

const CorpDashboardOverview: React.FC<CorpDashboardOverviewProps> = ({
  stats, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-xl font-bold mb-5 flex items-center gap-2", text)}>
        <FaBuilding /> {stats.companyName || "Corporate"} Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaUsers className="text-blue-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.activeEmployees}</span>
          <span className="text-xs">Active Employees</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaRecycle className="text-green-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.recycledAssets}</span>
          <span className="text-xs">Recycled Assets</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaChartBar className="text-yellow-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.esgScore}</span>
          <span className="text-xs">ESG Score</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaUsers className="text-violet-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.totalVendors}</span>
          <span className="text-xs">Vendors</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaBuilding className="text-gray-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.totalAssets}</span>
          <span className="text-xs">Total Assets</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="text-pink-600 font-bold text-2xl">{stats.openTickets}</span>
          <span className="text-xs">Open Tickets</span>
        </div>
      </div>
    </div>
  )
}
export default CorpDashboardOverview
