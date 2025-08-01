// src/components/recycle/RecycleInfoBanner.tsx

import React from "react"

const RecycleInfoBanner: React.FC = () => {
  return (
    <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-700 text-sm space-y-2">
      <h4 className="text-base font-semibold text-green-800 dark:text-green-300">
        ♻️ Help Us Keep the Planet Clean
      </h4>
      <p className="text-green-800 dark:text-green-200">
        Fixiva rewards you for recycling your old appliances, e-waste, and materials.
        Book a free pickup and earn loyalty credits.
      </p>
      <ul className="list-disc list-inside pl-2 text-green-700 dark:text-green-300">
        <li>No cost for pickup</li>
        <li>Earn ₹50–₹500 in loyalty credits</li>
        <li>Support Swachh Bharat + UN SDGs</li>
      </ul>
      <p>
        <a
          href="/policy/recycle"
          className="text-green-700 underline hover:text-green-900 dark:text-green-400"
        >
          Learn more →
        </a>
      </p>
    </div>
  )
}

export default RecycleInfoBanner
