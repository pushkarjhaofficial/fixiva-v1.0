import React from "react"
import clsx from "clsx"
import { FaLifeRing, FaCheck, FaTimes } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerSupportTicket {
  id: string
  subject: string
  raisedBy: string
  date: string
  status: "open" | "closed" | "pending"
  resolution?: string
}

export interface PartnerSupportTicketTableProps {
  tickets: PartnerSupportTicket[]
  onResolve?: (id: string) => void
  className?: string
}

const PartnerSupportTicketTable: React.FC<PartnerSupportTicketTableProps> = ({
  tickets, onResolve, className
}) => {
  const { theme } = useTheme()
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  return (
    <div className={clsx("rounded-lg shadow border p-6", className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaLifeRing /> Support Tickets
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Subject</th>
              <th className="px-3 py-2 text-left">Raised By</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Resolution</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={6} className={clsx("text-center py-6", subText)}>No tickets.</td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="px-3 py-2">{ticket.subject}</td>
                  <td className="px-3 py-2">{ticket.raisedBy}</td>
                  <td className="px-3 py-2">{new Date(ticket.date).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{ticket.status}</td>
                  <td className="px-3 py-2">{ticket.resolution || "-"}</td>
                  <td className="px-3 py-2">
                    {ticket.status === "open" && onResolve && (
                      <button
                        className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onResolve(ticket.id)}
                      >
                        <FaCheck /> Mark Closed
                      </button>
                    )}
                    {ticket.status !== "open" && (
                      <span className="text-xs text-gray-400">Closed</span>
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
export default PartnerSupportTicketTable
