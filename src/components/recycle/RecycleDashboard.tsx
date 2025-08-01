import React from "react"
import clsx from "clsx"
import { FaRecycle, FaCheckCircle, FaClock, FaUser, FaHistory } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface RecycleStatus {
  id: string
  assetName: string
  category: string
  status: "scheduled" | "picked_up" | "in_transit" | "recycled" | "rewarded" | "cancelled"
  scheduledDate: string
  agentName?: string
  rewardCoins?: number
}

export interface RecycleDashboardProps {
  statusList: RecycleStatus[]
  onViewHistory?: (id: string) => void
  className?: string
}

const statusColor: Record<RecycleStatus["status"], string> = {
  scheduled: "text-blue-600",
  picked_up: "text-orange-500",
  in_transit: "text-purple-600",
  recycled: "text-green-600",
  rewarded: "text-yellow-600",
  cancelled: "text-red-500"
}

const RecycleDashboard: React.FC<RecycleDashboardProps> = ({
  statusList, onViewHistory, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaRecycle /> Recycle Dashboard
      </h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Asset</th>
            <th className="px-2 py-1 text-left">Category</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Scheduled</th>
            <th className="px-2 py-1 text-left">Agent</th>
            <th className="px-2 py-1 text-left">Reward</th>
            <th className="px-2 py-1 text-left">History</th>
          </tr>
        </thead>
        <tbody>
          {statusList.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">No assets scheduled for recycle.</td>
            </tr>
          ) : (
            statusList.map(item => (
              <tr key={item.id}>
                <td className="px-2 py-1">{item.assetName}</td>
                <td className="px-2 py-1">{item.category}</td>
                <td className={clsx("px-2 py-1 font-semibold", statusColor[item.status])}>{item.status}</td>
                <td className="px-2 py-1">{new Date(item.scheduledDate).toLocaleString()}</td>
                <td className="px-2 py-1 flex items-center gap-1">
                  {item.agentName ? <><FaUser /> {item.agentName}</> : "-"}
                </td>
                <td className="px-2 py-1">{item.rewardCoins ? `${item.rewardCoins} Coins` : "-"}</td>
                <td className="px-2 py-1">
                  <button
                    className="text-xs underline text-blue-700 flex items-center gap-1"
                    onClick={() => onViewHistory?.(item.id)}
                  >
                    <FaHistory /> View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default RecycleDashboard
