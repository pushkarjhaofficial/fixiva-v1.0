// src/components/vendor/VendorAnnouncementsBoard.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaBullhorn } from "react-icons/fa"

export interface AnnouncementItem {
  id: string
  title: string
  content: string
  date: string    // ISO string
  author?: string
  urgent?: boolean
}

export interface VendorAnnouncementsBoardProps {
  announcements: AnnouncementItem[]
  className?: string
}

/**
 * VendorAnnouncementsBoard
 * Modular, theme-aware, elite announcements/news panel for vendor, partner, admin, or global app use.
 */
const VendorAnnouncementsBoard: React.FC<VendorAnnouncementsBoardProps> = ({
  announcements,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <section className={clsx("rounded-lg shadow border p-6", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaBullhorn /> {t("vendor.announcements") || "Announcements"}
      </h2>
      <ul className="space-y-5">
        {announcements.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>
            {t("vendor.noAnnouncements") || "No announcements."}
          </li>
        ) : (
          announcements.map(a => (
            <li key={a.id} className={clsx(
              "rounded p-4 border",
              a.urgent ? "bg-red-50 border-red-300 text-red-700 font-bold animate-pulse" : "bg-[--color-bg-secondary] border-[--color-border]",
              "transition"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <span className={clsx("font-bold", text)}>{a.title}</span>
                {a.urgent && <span className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-semibold">URGENT</span>}
              </div>
              <div className={clsx("mb-2", text)}>{a.content}</div>
              <div className={clsx("flex gap-3 items-center text-xs", subText)}>
                <span>{new Date(a.date).toLocaleString()}</span>
                {a.author && <span>{t("vendor.announcementBy") || "By"}: {a.author}</span>}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default VendorAnnouncementsBoard
