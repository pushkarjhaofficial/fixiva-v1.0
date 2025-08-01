// src/components/franchise/FranchiseVendorStats.tsx

import React from "react"

interface VendorSummary {
  name: string
  jobsCompleted: number
  rating: number
}

const FranchiseVendorStats: React.FC = () => {
  const topVendors: VendorSummary[] = [
    { name: "Raj Singh", jobsCompleted: 124, rating: 4.9 },
    { name: "Saira Khan", jobsCompleted: 112, rating: 4.7 },
    { name: "Amit Roy", jobsCompleted: 98, rating: 4.6 }
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Top Performing Vendors</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {topVendors.map((v, i) => (
          <li key={i} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{v.name}</p>
              <p className="text-sm text-neutral-500">{v.jobsCompleted} jobs</p>
            </div>
            <span className="text-sm font-semibold text-yellow-500">{v.rating.toFixed(1)} ★</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FranchiseVendorStats
