import React from "react"
import clsx from "clsx"
import { FaExclamationCircle, FaCheck, FaUser, FaArrowUp } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtGrievance {
  id: string
  by: string
  type: string
  status: "open" | "in_progress" | "escalated" | "closed"
  desc: string
  date: string
  escalateTo?: string
  resolveDate?: string
  history?: { status: string; date: string; note?: string }[]
}

export interface GovtGrievancePanelProps {
  grievances: GovtGrievance[]
  onEscalate: (id: string) => void
  onResolve: (id: string) => void
  className?: string
}

const GovtGrievancePanel: React.FC<GovtGrievancePanelProps> = ({
  grievances, onEscalate, onResolve, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaExclamationCircle /> Grievance & Escalation
      </h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">By</th>
            <th className="px-2 py-1 text-left">Type</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Description</th>
            <th className="px-2 py-1 text-left">Date</th>
            <th className="px-2 py-1 text-left">History</th>
            <th className="px-2 py-1 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {grievances.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-6">No grievances.</td>
            </tr>
          ) : (
            grievances.map(g => (
              <tr key={g.id}>
                <td className="px-2 py-1 flex items-center gap-1"><FaUser /> {g.by}</td>
                <td className="px-2 py-1">{g.type}</td>
                <td className="px-2 py-1">
                  {g.status}
                  {g.status === "escalated" && g.escalateTo && (
                    <span className="ml-1 text-pink-600">
                      <FaArrowUp /> {g.escalateTo}
                    </span>
                  )}
                </td>
                <td className="px-2 py-1">{g.desc}</td>
                <td className="px-2 py-1">{new Date(g.date).toLocaleString()}</td>
                <td className="px-2 py-1">
                  {g.history?.map((h, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      [{new Date(h.date).toLocaleDateString()}] {h.status}
                      {h.note && ` - ${h.note}`}
                    </div>
                  ))}
                </td>
                <td className="px-2 py-1 flex gap-2">
                  {(g.status === "open" || g.status === "in_progress") && (
                    <>
                      <button
                        className="px-2 py-1 bg-pink-600 text-white rounded text-xs"
                        onClick={() => onEscalate(g.id)}
                      >Escalate</button>
                      <button
                        className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        onClick={() => onResolve(g.id)}
                      ><FaCheck /> Resolve</button>
                    </>
                  )}
                  {g.status === "closed" && (
                    <span className="text-green-600 font-semibold">Closed</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default GovtGrievancePanel
