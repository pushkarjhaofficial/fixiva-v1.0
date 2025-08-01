import React from "react"
import clsx from "clsx"
import { FaExclamationTriangle, FaCheck } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface CorpIncident {
  id: string
  type: string
  description: string
  status: "open" | "resolved" | "in_progress"
  raisedBy: string
  date: string
  resolvedAt?: string
}
export interface CorpIncidentTrackerProps {
  incidents: CorpIncident[]
  onResolve?: (id: string) => void
  className?: string
}

const CorpIncidentTracker: React.FC<CorpIncidentTrackerProps> = ({
  incidents, onResolve, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaExclamationTriangle /> Incident Tracker
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Raised By</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={6} className={clsx("text-center py-6", subText)}>No incidents.</td>
              </tr>
            ) : (
              incidents.map(i => (
                <tr key={i.id}>
                  <td className="px-3 py-2">{i.type}</td>
                  <td className="px-3 py-2">{i.description}</td>
                  <td className="px-3 py-2">{i.raisedBy}</td>
                  <td className="px-3 py-2">{new Date(i.date).toLocaleString()}</td>
                  <td className="px-3 py-2">{i.status}</td>
                  <td className="px-3 py-2">
                    {i.status === "open" && onResolve && (
                      <button className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onResolve(i.id)}>
                        <FaCheck /> Resolve
                      </button>
                    )}
                    {i.status !== "open" && (
                      <span className="text-xs text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default CorpIncidentTracker
