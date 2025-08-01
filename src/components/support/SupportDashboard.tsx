import React from "react"
import clsx from "clsx"
import { FaLifeRing, FaTicketAlt, FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportDashboardStats {
  agentName: string
  openTickets: number
  resolvedTickets: number
  pendingTickets: number
  escalatedTickets: number
  avgResponseTime: number // in minutes
  region: string
}

export interface SupportDashboardProps {
  stats: SupportDashboardStats
  className?: string
}

const SupportDashboard: React.FC<SupportDashboardProps> = ({
  stats, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-xl font-bold mb-5 flex items-center gap-2", text)}>
        <FaLifeRing /> {stats.agentName} Support Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaTicketAlt className="text-blue-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.openTickets}</span>
          <span className="text-xs">Open Tickets</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaCheckCircle className="text-green-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.resolvedTickets}</span>
          <span className="text-xs">Resolved</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaClock className="text-yellow-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.avgResponseTime} min</span>
          <span className="text-xs">Avg Response</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <FaExclamationCircle className="text-pink-600 text-2xl mb-1" />
          <span className="text-lg font-bold">{stats.escalatedTickets}</span>
          <span className="text-xs">Escalated</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="font-bold text-lg">{stats.pendingTickets}</span>
          <span className="text-xs">Pending</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-[--color-bg-secondary] rounded">
          <span className="text-sm">{stats.region}</span>
          <span className="text-xs">Region</span>
        </div>
      </div>
    </div>
  )
}
export default SupportDashboard
