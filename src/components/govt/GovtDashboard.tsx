// src/components/govt/GovtDashboard.tsx

import React from "react"

interface Stat {
  label: string
  value: number
}

const GovtDashboard: React.FC = () => {
  const stats: Stat[] = [
    { label: "Active Projects", value: 12 },
    { label: "Escalations", value: 4 },
    { label: "Monthly Spend (₹)", value: 148000 }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Government Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded border p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700"
          >
            <p className="text-sm text-neutral-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GovtDashboard
