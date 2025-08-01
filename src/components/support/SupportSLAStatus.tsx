import React from "react"
import clsx from "clsx"
import { FaStopwatch, FaExclamationCircle } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SLAStat {
  total: number
  breached: number
  dueSoon: number
  inCompliance: number
}

export interface SupportSLAStatusProps {
  sla: SLAStat
  className?: string
}

const SupportSLAStatus: React.FC<SupportSLAStatusProps> = ({ sla, className }) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaStopwatch /> SLA Monitor
      </h2>
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl">{sla.total}</span>
          <span className="text-xs">Total Tickets</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl text-red-600">{sla.breached}</span>
          <span className="text-xs text-red-600">SLA Breached</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl text-yellow-500">{sla.dueSoon}</span>
          <span className="text-xs text-yellow-500">Due Soon</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl text-green-500">{sla.inCompliance}</span>
          <span className="text-xs text-green-500">In Compliance</span>
        </div>
      </div>
    </div>
  )
}
export default SupportSLAStatus
