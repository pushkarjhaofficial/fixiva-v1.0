import React from "react"
import clsx from "clsx"
import { FaArrowUp, FaLifeRing } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportEscalation {
  id: string
  ticketId: string
  reason: string
  escalatedBy: string
  date: string
  status: "pending" | "reviewed" | "resolved"
}

export interface SupportEscalationPanelProps {
  escalations: SupportEscalation[]
  onReview?: (id: string) => void
  className?: string
}

const SupportEscalationPanel: React.FC<SupportEscalationPanelProps> = ({
  escalations, onReview, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaArrowUp /> Escalations
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
              <th className="px-3 py-2 text-left">Review</th>
            </tr>
          </thead>
          <tbody>
            {escalations.length === 0 ? (
              <tr>
                <td colSpan={6} className={clsx("text-center py-6", subText)}>No escalations.</td>
              </tr>
            ) : (
              escalations.map(esc => (
                <tr key={esc.id}>
                  <td className="px-3 py-2">{esc.ticketId}</td>
                  <td className="px-3 py-2">{esc.reason}</td>
                  <td className="px-3 py-2">{esc.escalatedBy}</td>
                  <td className="px-3 py-2">{new Date(esc.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{esc.status}</td>
                  <td className="px-3 py-2">
                    {esc.status === "pending" && onReview && (
                      <button
                        className="px-2 py-1 rounded bg-yellow-600 text-white text-xs"
                        onClick={() => onReview(esc.id)}
                      >
                        Review
                      </button>
                    )}
                    {esc.status !== "pending" && (
                      <span className="text-xs text-gray-400">{esc.status}</span>
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
export default SupportEscalationPanel
