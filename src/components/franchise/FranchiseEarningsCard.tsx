// src/components/franchise/FranchiseEarningsCard.tsx

import React from "react"

const FranchiseEarningsCard: React.FC = () => {
  const stats = [
    { label: "Total Earnings", value: "₹1,45,200" },
    { label: "Active Vendors", value: 42 },
    { label: "Jobs Completed", value: 960 },
    { label: "Loyalty Issued", value: "₹6,300" }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded border bg-white dark:bg-neutral-900 p-4 text-center dark:border-neutral-700"
        >
          <p className="text-sm text-neutral-500">{s.label}</p>
          <p className="mt-1 text-lg font-semibold">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

export default FranchiseEarningsCard
