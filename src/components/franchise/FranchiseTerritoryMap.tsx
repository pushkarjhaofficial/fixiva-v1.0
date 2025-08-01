// src/components/franchise/FranchiseTerritoryMap.tsx

import React from "react"

const FranchiseTerritoryMap: React.FC = () => {
  // In future: integrate Leaflet or Google Maps API here
  return (
    <div className="border rounded p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700">
      <h3 className="text-lg font-medium mb-2">Service Coverage Map</h3>
      <div className="h-60 w-full bg-neutral-200 dark:bg-neutral-800 rounded flex items-center justify-center text-sm text-neutral-600">
        [Map Placeholder]
      </div>
    </div>
  )
}

export default FranchiseTerritoryMap
