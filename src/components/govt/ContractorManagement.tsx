// src/components/govt/ContractorManagement.tsx

import React from "react"

export interface Contractor {
  id: string
  name: string
  assignedProjects: number
  rating: number
  status: "active" | "blacklisted"
}

interface Props {
  contractors: Contractor[]
  onToggleStatus: (id: string) => void
}

const ContractorManagement: React.FC<Props> = ({ contractors, onToggleStatus }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contractors</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {contractors.map((c) => (
          <li key={c.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-neutral-500">
                {c.assignedProjects} projects • ⭐ {c.rating.toFixed(1)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded ${
                c.status === "active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900"
                  : "bg-red-100 text-red-700 dark:bg-red-900"
              }`}>
                {c.status}
              </span>
              <button
                onClick={() => onToggleStatus(c.id)}
                className="text-sm underline text-primary-600"
              >
                {c.status === "active" ? "Blacklist" : "Restore"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContractorManagement
