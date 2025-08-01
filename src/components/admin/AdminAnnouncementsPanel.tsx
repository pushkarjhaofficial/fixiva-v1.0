// src/components/admin/AdminAnnouncementsPanel.tsx

import React from "react"
import clsx from "clsx"
import { FaBullhorn } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface Announcement {
  id: string
  title: string
  content: string
  date: string
  author?: string
  urgent?: boolean
}

export interface AdminAnnouncementsPanelProps {
  announcements: Announcement[]
  className?: string
}

const AdminAnnouncementsPanel: React.FC<AdminAnnouncementsPanelProps> = ({
  announcements,
  className,
}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const bg = isDark ? "bg-gray-900" : "bg-white"
  const text = isDark ? "text-white" : "text-gray-900"
  const subText = isDark ? "text-gray-400" : "text-gray-500"
  const border = isDark ? "border-gray-700" : "border-gray-200"

  return (
    <section
      aria-labelledby="admin-announcements-title"
      className={clsx("rounded-lg shadow border p-6", bg, border, className)}
    >
      <h2
        id="admin-announcements-title"
        className={clsx(
          "text-lg font-semibold mb-4 flex items-center gap-2",
          text
        )}
      >
        <FaBullhorn aria-hidden /> Announcements
      </h2>

      <ul role="list" className="space-y-5">
        {announcements.length === 0 ? (
          <li
            className={clsx("text-center text-sm", subText)}
            aria-live="polite"
          >
            No announcements at the moment.
          </li>
        ) : (
          announcements.map((a) => (
            <li
              key={a.id}
              className={clsx(
                "rounded p-4 border",
                a.urgent
                  ? "bg-red-50 border-red-300 text-red-700 font-semibold animate-pulse"
                  : "bg-[--color-bg-secondary] border-[--color-border]",
                "transition"
              )}
              role="listitem"
              aria-label={a.urgent ? "Urgent announcement" : "Announcement"}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={clsx("font-bold", text)}>{a.title}</span>
                {a.urgent && (
                  <span
                    className="ml-2 px-2 py-0.5 rounded bg-red-600 text-white text-xs font-semibold"
                    role="alert"
                    aria-label="Urgent announcement"
                  >
                    ⚠️ URGENT
                  </span>
                )}
              </div>

              <p className={clsx("mb-2", text)}>{a.content}</p>

              <div
                className={clsx(
                  "flex flex-wrap gap-3 items-center text-xs",
                  subText
                )}
              >
                <time dateTime={a.date}>
                  {new Date(a.date).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </time>
                {a.author && <span>By: {a.author}</span>}
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

export default AdminAnnouncementsPanel
