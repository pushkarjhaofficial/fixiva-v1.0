// src/components/profile/ProfileUsageStats.tsx

import React from "react"

const ProfileUsageStats: React.FC = () => {
  const stats = [
    { label: "Total Bookings", value: 34 },
    { label: "Recycle Points", value: "₹850" },
    { label: "Loyalty Credits", value: "₹620" },
    { label: "Support Tickets", value: 2 }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="text-center rounded border p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-500">{s.label}</p>
          <p className="mt-1 font-semibold text-lg">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfileUsageStats
