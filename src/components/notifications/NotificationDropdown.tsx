// src/components/notifications/NotificationDropdown.tsx

import React from "react"
import NotificationItem, { NotificationData } from "./NotificationItem"
import NotificationEmptyState from "./NotificationEmptyState"

interface Props {
  items: NotificationData[]
  onItemClick: (id: string) => void
}

const NotificationDropdown: React.FC<Props> = ({ items, onItemClick }) => {
  return (
    <div className="absolute top-12 right-0 w-80 bg-white dark:bg-neutral-900 border rounded shadow-lg z-50 dark:border-neutral-800">
      {items.length === 0 ? (
        <NotificationEmptyState />
      ) : (
        <div className="max-h-64 overflow-y-auto">
          {items.map((item) => (
            <NotificationItem key={item.id} item={item} onClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
