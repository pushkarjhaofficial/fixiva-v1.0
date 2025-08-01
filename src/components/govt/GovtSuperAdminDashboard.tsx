import React from "react"
import clsx from "clsx"
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaTools, FaUserShield, FaFileAlt } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SuperAdminDashboardStat {
  title: string
  value: number | string
  icon: React.ReactNode
  className?: string
}

export interface GovtSuperAdminDashboardProps {
  stats: SuperAdminDashboardStat[]
  alerts: string[]
  className?: string
}

const GovtSuperAdminDashboard: React.FC<GovtSuperAdminDashboardProps> = ({
  stats, alerts, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <section className={clsx("p-6 rounded-lg shadow border", cardBg, className)}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaUserShield /> Govt/PSU Super-Admin Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={clsx("rounded-lg p-4 flex items-center gap-3 bg-[--color-bg-secondary]", s.className)}>
            {s.icon}
            <div>
              <div className="font-semibold text-lg">{s.value}</div>
              <div className="text-xs text-gray-500">{s.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold flex items-center gap-1 text-lg mb-2"><FaBell /> Alerts & Actions</h3>
        <ul className="list-disc pl-6 text-pink-700">
          {alerts.length === 0
            ? <li className="text-gray-400">No pending alerts.</li>
            : alerts.map((a, i) => <li key={i}>{a}</li>)
          }
        </ul>
      </div>
    </section>
  )
}
export default GovtSuperAdminDashboard
