// src/components/support/SupportTicketPriorityPanel.tsx

import React from "react"
import clsx from "clsx"
import {
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

const priorities = ["low", "medium", "high", "urgent"] as const
type Priority = typeof priorities[number]

export interface SupportTicketPriorityPanelProps {
  ticketId: string
  currentPriority: Priority
  onChangePriority: (ticketId: string, newPriority: Priority) => void
  className?: string
}

const priorityColors: Record<Priority, string> = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-orange-600",
  urgent: "text-red-600"
}

const priorityLabels: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent"
}

const SupportTicketPriorityPanel: React.FC<SupportTicketPriorityPanelProps> = ({
  ticketId,
  currentPriority,
  onChangePriority,
  className
}) => {
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const textColor = theme === "dark" ? "text-white" : "text-gray-900"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"

  const handleChangePriority = (newPriority: Priority) => {
    if (currentPriority !== newPriority) {
      onChangePriority(ticketId, newPriority)
    }
  }

  return (
    <div
      className={clsx(
        "rounded-lg border shadow-sm p-6 space-y-5 transition-colors duration-300",
        cardBg,
        borderColor,
        className
      )}
      aria-label="Support Ticket Priority Panel"
    >
      <h2 className={clsx("text-lg font-semibold flex items-center gap-2", textColor)}>
        <FaExclamationTriangle className="text-yellow-500" />
        Set Ticket Priority
      </h2>

      <div className="flex flex-wrap gap-3">
        {priorities.map(priority => (
          <button
            key={priority}
            onClick={() => handleChangePriority(priority)}
            aria-pressed={currentPriority === priority}
            aria-label={`Set priority to ${priorityLabels[priority]}`}
            className={clsx(
              "px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring",
              priorityColors[priority],
              currentPriority === priority
                ? "bg-opacity-20 ring-2 ring-offset-2 ring-[--color-primary]"
                : "hover:bg-opacity-10"
            )}
          >
            {priorityLabels[priority]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t pt-3 text-sm text-neutral-400">
        <FaArrowDown className="text-base" />
        <span>Low</span>
        <span className="flex-grow border-t border-dashed mx-2" />
        <span>Urgent</span>
        <FaArrowUp className="text-base" />
      </div>
    </div>
  )
}

export default SupportTicketPriorityPanel
