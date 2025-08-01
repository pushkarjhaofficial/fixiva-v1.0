// src/components/notifications/NotificationItem.tsx

import React from "react"

export interface NotificationData {
  id: string
  title: string
  message: string
  timestamp: string
  type: "info" | "alert" | "success"
  read?: boolean
}

interface Props {
  item: NotificationData
  onClick: (id: string) => void
}

const NotificationItem: React.FC<Props> = ({ item, onClick }) => {
  const typeColor: Record<NotificationData["type"], string> = {
    info: "text-blue-600 dark:text-blue-400",
    alert: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400"
  }

  return (
    <button
      onClick={() => onClick(item.id)}
      className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition focus:outline-none"
    >
      <p className={`font-medium text-sm ${typeColor[item.type]}`}>{item.title}</p>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{item.message}</p>
      <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
        {new Date(item.timestamp).toLocaleString()}
      </p>
    </button>
  )
}

export default NotificationItem
