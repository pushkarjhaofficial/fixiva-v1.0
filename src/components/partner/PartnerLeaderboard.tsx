import React from "react"
import clsx from "clsx"
import { FaTrophy } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerLeaderboardEntry {
  id: string
  name: string
  metric: string
  value: number
  position: number
}

export interface PartnerLeaderboardProps {
  entries: PartnerLeaderboardEntry[]
  className?: string
}

const PartnerLeaderboard: React.FC<PartnerLeaderboardProps> = ({
  entries, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaTrophy /> Partner Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Metric</th>
              <th className="px-3 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className={clsx("text-center py-6", text)}>No data.</td>
              </tr>
            ) : (
              entries.map(entry => (
                <tr key={entry.id}>
                  <td className="px-3 py-2">{entry.position}</td>
                  <td className="px-3 py-2">{entry.name}</td>
                  <td className="px-3 py-2">{entry.metric}</td>
                  <td className="px-3 py-2">{entry.value}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default PartnerLeaderboard
