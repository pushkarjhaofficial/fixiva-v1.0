import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaStore, FaUserTie, FaTools, FaCoins, FaMapMarkedAlt } from "react-icons/fa"

export interface FranchiseDashboardStats {
  franchiseName: string
  totalBranches: number
  totalEmployees: number
  activeJobs: number
  completedJobs: number
  totalRevenue: number
  revenueCurrency: string
  loyaltyCoins: number
  region: string
}

export interface FranchiseDashboardProps {
  stats: FranchiseDashboardStats
  className?: string
}

const FranchiseDashboard: React.FC<FranchiseDashboardProps> = ({
  stats, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-xl font-bold mb-5 flex items-center gap-2", text)}>
        <FaStore /> {stats.franchiseName} Franchise Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaMapMarkedAlt className="text-blue-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.region}</span>
          <span className="text-xs">Region</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaUserTie className="text-green-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.totalEmployees}</span>
          <span className="text-xs">Employees</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaTools className="text-yellow-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.activeJobs}</span>
          <span className="text-xs">Active Jobs</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaCoins className="text-orange-500 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.loyaltyCoins}</span>
          <span className="text-xs">Loyalty Coins</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="text-pink-600 font-bold text-2xl">{stats.completedJobs}</span>
          <span className="text-xs">Completed Jobs</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="font-bold text-lg">{stats.revenueCurrency} {stats.totalRevenue.toLocaleString()}</span>
          <span className="text-xs">Total Revenue</span>
        </div>
      </div>
    </div>
  )
}
export default FranchiseDashboard
