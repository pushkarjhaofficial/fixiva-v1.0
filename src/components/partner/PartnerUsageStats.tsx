// src/components/partner/PartnerUsageStats.tsx

import React from "react"

const PartnerUsageStats: React.FC = () => {
  const stats = [
    { label: "Active Clients", value: 18 },
    { label: "Monthly Usage", value: "₹34,500" },
    { label: "Services Availed", value: 132 },
    { label: "Loyalty Issued", value: "₹3,200" }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded border p-4 text-center bg-white dark:bg-neutral-900 dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-500">{stat.label}</p>
          <p className="mt-1 text-lg font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default PartnerUsageStats
