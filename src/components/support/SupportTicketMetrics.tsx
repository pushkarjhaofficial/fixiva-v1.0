import React from "react"
import clsx from "clsx"
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportTicketMetricsProps {
  totalTickets: number
  newTickets: number
  resolvedTickets: number
  reopenedTickets: number
  unresolvedTickets: number
  className?: string
}

const SupportTicketMetrics: React.FC<SupportTicketMetricsProps> = ({
  totalTickets, newTickets, resolvedTickets, reopenedTickets, unresolvedTickets, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6 space-y-4", cardBg, className)}>
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <FaChartLine /> Ticket Metrics
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Total Tickets:</span>
          <span className="font-semibold">{totalTickets}</span>
        </div>
        <div className="flex justify-between">
          <span>New Tickets:</span>
          <span className="font-semibold text-green-600">{newTickets}</span>
        </div>
        <div className="flex justify-between">
          <span>Resolved Tickets:</span>
          <span className="font-semibold text-blue-600">{resolvedTickets}</span>
        </div>
        <div className="flex justify-between">
          <span>Reopened Tickets:</span>
          <span className="font-semibold text-yellow-600">{reopenedTickets}</span>
        </div>
        <div className="flex justify-between">
          <span>Unresolved Tickets:</span>
          <span className="font-semibold text-red-600">{unresolvedTickets}</span>
        </div>
      </div>
    </div>
  )
}
export default SupportTicketMetrics
