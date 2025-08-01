import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { FaHistory } from "react-icons/fa"

export interface ActivityLogItem {
  id: string
  timestamp: string // ISO
  user: string
  action: string
  details?: string
}
export interface VendorActivityLogProps {
  logs: ActivityLogItem[]
  className?: string
}
const VendorActivityLog: React.FC<VendorActivityLogProps> = ({
  logs, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaHistory /> Activity Log
      </h2>
      <ul className="space-y-3">
        {logs.length === 0
          ? <li className={clsx("text-center text-sm", subText)}>No activity yet.</li>
          : logs.map(l => (
            <li key={l.id} className={clsx("flex flex-col bg-[--color-bg-secondary] rounded p-2")}>
              <span className={clsx("font-bold", text)}>{l.action}</span>
              <span className={clsx("text-xs", subText)}>
                {new Date(l.timestamp).toLocaleString()} • {l.user}
                {l.details && <> • {l.details}</>}
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default VendorActivityLog
