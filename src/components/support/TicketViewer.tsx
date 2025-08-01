// src/components/support/TicketViewer.tsx

import React from "react"

export interface Ticket {
  id: string
  subject: string
  createdBy: string
  status: "open" | "in_progress" | "closed"
  createdAt: string
}

interface Props {
  tickets: Ticket[]
  onSelect: (ticketId: string) => void
}

const TicketViewer: React.FC<Props> = ({ tickets, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Support Tickets</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{ticket.subject}</p>
              <p className="text-xs text-neutral-500">{ticket.createdBy}</p>
              <p className="text-xs text-neutral-400">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded ${
                ticket.status === "closed"
                  ? "bg-green-100 text-green-700 dark:bg-green-900"
                  : ticket.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900"
                  : "bg-red-100 text-red-700 dark:bg-red-900"
              }`}>
                {ticket.status}
              </span>
              <button
                onClick={() => onSelect(ticket.id)}
                className="text-sm text-primary-600 hover:underline"
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketViewer
