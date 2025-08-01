// src/components/notifications/NotificationBell.tsx

import React from "react"

interface Props {
  count: number
  onClick: () => void
}

const NotificationBell: React.FC<Props> = ({ count, onClick }) => {
  return (
    <button onClick={onClick} className="relative text-neutral-600 dark:text-neutral-300">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V4a2 2 0 00-4 0v1.341A6.002 6.002 0 006 11v3c0 .386-.149.735-.405 1.005L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
          {count}
        </span>
      )}
    </button>
  )
}

export default NotificationBell
