// src/components/vendor/VendorStats.tsx

import React from "react"

const VendorStats: React.FC = () => {
  const stats = [
    { label: "Total Jobs", value: 120 },
    { label: "Earnings", value: "₹45,000" },
    { label: "Rating", value: "4.8 ★" }
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border p-4 text-center bg-white dark:bg-neutral-900 dark:border-neutral-800"
        >
          <p className="text-sm text-neutral-500">{stat.label}</p>
          <p className="mt-1 text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default VendorStats
