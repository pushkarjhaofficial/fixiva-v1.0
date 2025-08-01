// src/components/vendor/VendorSupportTickets.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaTicketAlt, FaCheckCircle, FaClock, FaExclamationCircle } from "react-icons/fa"

export interface SupportTicket {
  id: string
  subject: string
  status: "open" | "pending" | "closed" | "escalated"
  createdAt: string  // ISO string
  lastUpdate: string // ISO string
  requester: string
}

export interface VendorSupportTicketsProps {
  tickets: SupportTicket[]
  onSelect?: (id: string) => void
  className?: string
}

const STATUS_ICON = {
  open: <FaClock className="text-yellow-600" title="Open" />,
  pending: <FaExclamationCircle className="text-orange-500" title="Pending" />,
  closed: <FaCheckCircle className="text-green-600" title="Closed" />,
  escalated: <FaExclamationCircle className="text-red-600" title="Escalated" />
}

/**
 * VendorSupportTickets
 * World-class, theme-aware, modular support tickets table for vendor/corp/partner/support agent.
 */
const VendorSupportTickets: React.FC<VendorSupportTicketsProps> = ({
  tickets,
  onSelect,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaTicketAlt /> {t("vendor.supportTickets") || "Support Tickets"}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className={clsx("bg-[--color-bg-secondary]")}>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.ticketId") || "Ticket ID"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.subject") || "Subject"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.requester") || "Requester"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.status") || "Status"}</th>
              <th className="px-3 py-2 text-left font-semibold">{t("vendor.lastUpdate") || "Last Update"}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("py-6 text-center", subText)}>
                  {t("vendor.noSupportTickets") || "No tickets found."}
                </td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr
                  key={ticket.id}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer"
                  onClick={() => onSelect?.(ticket.id)}
                  tabIndex={0}
                  aria-label={ticket.subject}
                >
                  <td className="px-3 py-2 font-medium">{ticket.id}</td>
                  <td className="px-3 py-2">{ticket.subject}</td>
                  <td className="px-3 py-2">{ticket.requester}</td>
                  <td className="px-3 py-2 flex items-center gap-2">
                    {STATUS_ICON[ticket.status]}{" "}
                    <span className="ml-1">{t(`vendor.ticketStatus.${ticket.status}`) || ticket.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    {new Date(ticket.lastUpdate).toLocaleString()}
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

export default VendorSupportTickets
