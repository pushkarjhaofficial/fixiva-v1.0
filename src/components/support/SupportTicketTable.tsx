import React from "react"
import clsx from "clsx"
import { FaLifeRing, FaCheck, FaArrowUp, FaUser, FaPaperclip } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportTicket {
  id: string
  subject: string
  customer: string
  created: string
  status: "open" | "pending" | "resolved" | "escalated" | "closed"
  assignedTo: string
  hasAttachment?: boolean
  priority: "low" | "medium" | "high" | "urgent"
  actions?: string[]
}

export interface SupportTicketTableProps {
  tickets: SupportTicket[]
  onResolve?: (id: string) => void
  onEscalate?: (id: string) => void
  className?: string
}

const SupportTicketTable: React.FC<SupportTicketTableProps> = ({
  tickets, onResolve, onEscalate, className
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
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Created</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Assigned To</th>
              <th className="px-3 py-2 text-left">Priority</th>
              <th className="px-3 py-2 text-left">Attachment</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className={clsx("text-center py-6", subText)}>No tickets.</td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className="px-3 py-2">{ticket.subject}</td>
                  <td className="px-3 py-2 flex items-center gap-1">
                    <FaUser /> {ticket.customer}
                  </td>
                  <td className="px-3 py-2">{new Date(ticket.created).toLocaleString()}</td>
                  <td className="px-3 py-2">{ticket.status}</td>
                  <td className="px-3 py-2">{ticket.assignedTo}</td>
                  <td className="px-3 py-2">{ticket.priority}</td>
                  <td className="px-3 py-2">{ticket.hasAttachment && <FaPaperclip />}</td>
                  <td className="px-3 py-2 flex gap-1">
                    {ticket.status !== "resolved" && onResolve && (
                      <button
                        className="px-2 py-1 rounded bg-green-600 text-white text-xs"
                        onClick={() => onResolve(ticket.id)}
                        disabled={ticket.status === "closed"}
                      >
                        <FaCheck /> Mark Resolved
                      </button>
                    )}
                    {ticket.status !== "escalated" && onEscalate && (
                      <button
                        className="px-2 py-1 rounded bg-yellow-600 text-white text-xs"
                        onClick={() => onEscalate(ticket.id)}
                        disabled={ticket.status === "closed"}
                      >
                        <FaArrowUp /> Escalate
                      </button>
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
export default SupportTicketTable
