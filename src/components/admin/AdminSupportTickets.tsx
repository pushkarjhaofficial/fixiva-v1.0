// src/components/admin/AdminSupportTickets.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaTicketAlt, FaCheck, FaExclamation } from "react-icons/fa"

export interface SupportTicket {
  id: string
  subject: string
  user: string
  status: "open" | "closed" | "pending"
  createdAt: string
  updatedAt?: string
}

export interface AdminSupportTicketsProps {
  tickets: SupportTicket[]
  onSelect?: (ticketId: string) => void
  className?: string
}

const AdminSupportTickets: React.FC<AdminSupportTicketsProps> = ({
  tickets,
  onSelect,
  className
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <FaExclamation className="text-yellow-600 inline mr-1" />
      case "closed":
        return <FaCheck className="text-green-600 inline mr-1" />
      default:
        return null
    }
  }

  return (
    <section
      className={clsx("rounded-lg shadow border p-6", cardBg, className)}
      aria-labelledby="admin-support-tickets-title"
    >
      <h2
        id="admin-support-tickets-title"
        className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}
      >
        <FaTicketAlt aria-hidden /> {t("admin.supportTickets") || "Support Tickets"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b">
            <tr className={text}>
              <th className="px-3 py-2 text-left">{t("support.subject") || "Subject"}</th>
              <th className="px-3 py-2 text-left">{t("common.user") || "User"}</th>
              <th className="px-3 py-2 text-left">{t("common.status") || "Status"}</th>
              <th className="px-3 py-2 text-left">{t("common.created") || "Created"}</th>
              <th className="px-3 py-2 text-left">{t("common.updated") || "Updated"}</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={5} className={clsx("text-center py-6", subText)}>
                  {t("support.noTickets") || "No tickets found."}
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr
                  key={t.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect?.(t.id)}
                  onKeyDown={(e) => e.key === "Enter" && onSelect?.(t.id)}
                  className="hover:bg-[--color-bg-hover] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                >
                  <td className="px-3 py-2">{t.subject}</td>
                  <td className="px-3 py-2">{t.user}</td>
                  <td className="px-3 py-2">
                    {getStatusIcon(t.status)}
                    <span className="capitalize">{t.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    {t.updatedAt
                      ? new Date(t.updatedAt).toLocaleString()
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminSupportTickets
