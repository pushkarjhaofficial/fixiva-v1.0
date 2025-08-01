// src/components/partner/PartnerSLAStatusCard.tsx

import React from "react"

const PartnerSLAStatusCard: React.FC = () => {
  const stats = [
    { label: "Avg. Resolution Time", value: "3.2 hrs" },
    { label: "SLA Breaches", value: 1 },
    { label: "Uptime", value: "99.6%" },
    { label: "Last Audit", value: "12 July 2025" }
  ]

  return (
    <div className="rounded border bg-white dark:bg-neutral-900 dark:border-neutral-800 p-4 space-y-2">
      <h3 className="text-lg font-semibold">SLA Compliance</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        {stats.map((s) => (
          <li key={s.label} className="space-y-1">
            <p className="text-neutral-500">{s.label}</p>
            <p className="font-medium">{s.value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PartnerSLAStatusCard
