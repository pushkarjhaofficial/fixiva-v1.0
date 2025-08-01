// src/components/support/TicketActionPanel.tsx

import React from "react"

interface Props {
  ticketId: string
  currentStatus: "open" | "in_progress" | "closed"
  onUpdateStatus: (status: "in_progress" | "closed") => void
}

const TicketActionPanel: React.FC<Props> = ({
  ticketId,
  currentStatus,
  onUpdateStatus
}) => {
  return (
    <div className="mt-4 flex gap-2 items-center">
      <span className="text-sm font-medium">Actions:</span>
      {currentStatus === "open" && (
        <button
          onClick={() => onUpdateStatus("in_progress")}
          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
        >
          Start Progress
        </button>
      )}
      {(currentStatus === "in_progress" || currentStatus === "open") && (
        <button
          onClick={() => onUpdateStatus("closed")}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default TicketActionPanel
