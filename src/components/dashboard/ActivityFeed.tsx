// src/components/dashboard/ActivityFeed.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { formatDistanceToNow } from "date-fns"
import { useTheme } from "@/hooks/useTheme"

export interface ActivityItem {
  id: string
  message: string
  timestamp: string   // ISO string
  link?: string       // optional URL to view details
}

export interface ActivityFeedProps {
  /** Recent activity items */
  items: ActivityItem[]
  /** Optional extra classes */
  className?: string
}

/**
 * ActivityFeed
 * Displays a scrollable list of recent actions with relative timestamps.
 * World-class, accessible, i18n-ready, theme-aware.
 */
const ActivityFeed: React.FC<ActivityFeedProps> = ({ items, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-900"
  const timeColor = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <section
      role="region"
      aria-labelledby="activity-feed-title"
      className={clsx("p-4 rounded-lg shadow border overflow-y-auto", bgColor, borderColor, className)}
      style={{ maxHeight: "400px" }}
    >
      <h3 id="activity-feed-title" className={clsx("text-lg font-semibold mb-3", textColor)}>
        {t("dashboard.activityFeed.title")}
      </h3>
      {items.length === 0 ? (
        <p className={clsx("text-sm", textColor)}>
          {t("dashboard.activityFeed.empty")}
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className={clsx("text-sm", textColor)}>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.message}
                    </a>
                  ) : (
                    item.message
                  )}
                </span>
                <time
                  dateTime={item.timestamp}
                  className={clsx("text-xs italic", timeColor)}
                  aria-label={new Date(item.timestamp).toLocaleString()}
                >
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ActivityFeed
