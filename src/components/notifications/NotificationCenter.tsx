// src/components/notifications/NotificationCenter.tsx

import React, { useState } from "react"
import NotificationBell from "./NotificationBell"
import NotificationDropdown from "./NotificationDropdown"
import type { NotificationData } from "./NotificationItem"

const NotificationCenter: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  const notifications: NotificationData[] = [
    {
      id: "1",
      title: "Booking Confirmed",
      message: "Your booking for AC Repair is confirmed.",
      timestamp: new Date().toISOString(),
      type: "success"
    },
    {
      id: "2",
      title: "Recycle Pickup Scheduled",
      message: "Tomorrow at 10:00 AM",
      timestamp: new Date().toISOString(),
      type: "info"
    }
  ]

  const unreadCount = notifications.length

  return (
    <div className="relative">
      <NotificationBell count={unreadCount} onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <NotificationDropdown
          items={notifications}
          onItemClick={(id) => console.log("clicked:", id)}
        />
      )}
    </div>
  )
}

export default NotificationCenter
