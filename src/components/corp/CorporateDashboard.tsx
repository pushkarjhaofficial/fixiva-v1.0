// src/components/corporate/CorporateDashboard.tsx

import React from "react"

interface StatCard {
  label: string
  value: number | string
}

const CorporateDashboard: React.FC = () => {
  const stats: StatCard[] = [
    { label: "Total Requests", value: 284 },
    { label: "Resolved", value: 231 },
    { label: "Pending", value: 53 }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Corporate Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded border p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700"
          >
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CorporateDashboard
