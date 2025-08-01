import React from "react"
import clsx from "clsx"
import { FaHistory, FaArrowUp } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface EscalationHistoryEntry {
  ticketId: string
  reason: string
  escalatedBy: string
  date: string
  status: "pending" | "resolved" | "closed"
}

export interface SupportEscalationHistoryProps {
  history: EscalationHistoryEntry[]
  className?: string
}

const SupportEscalationHistory: React.FC<SupportEscalationHistoryProps> = ({
  history, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6 space-y-4", cardBg, className)}>
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <FaHistory /> Escalation History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Ticket</th>
              <th className="px-3 py-2 text-left">Reason</th>
              <th className="px-3 py-2 text-left">Escalated By</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">No escalation history.</td>
              </tr>
            ) : (
              history.map(entry => (
                <tr key={entry.ticketId}>
                  <td className="px-3 py-2">{entry.ticketId}</td>
                  <td className="px-3 py-2">{entry.reason}</td>
                  <td className="px-3 py-2">{entry.escalatedBy}</td>
                  <td className="px-3 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{entry.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default SupportEscalationHistory
