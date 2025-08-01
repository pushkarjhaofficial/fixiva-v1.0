// src/components/vendor/VendorDashboard.tsx

import React from "react"
import VendorStats from "./VendorStats"
import VendorJobCard, { VendorJob } from "./VendorJobCard"

export interface VendorDashboardProps {
  jobs: VendorJob[]
  onJobAction: (jobId: string, action: "accept" | "reject" | "complete") => void
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ jobs, onJobAction }) => {
  return (
    <div className="space-y-6">
      <VendorStats />
      <div className="grid gap-4">
        {jobs.length === 0 && (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No current jobs.
          </p>
        )}
        {jobs.map((job) => (
          <VendorJobCard key={job.id} job={job} onAction={onJobAction} />
        ))}
      </div>
    </div>
  )
}

export default VendorDashboard
