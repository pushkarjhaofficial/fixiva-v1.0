// src/components/vendor/VendorJobCard.tsx

import React from "react"
import clsx from "clsx"

export interface VendorJob {
  id: string
  serviceName: string
  customerName: string
  dateTime: string
  price: number
  status: "pending" | "accepted" | "in_progress" | "completed"
}

interface Props {
  job: VendorJob
  onAction: (jobId: string, action: "accept" | "reject" | "complete") => void
}

const VendorJobCard: React.FC<Props> = ({ job, onAction }) => {
  const handleAction = (action: "accept" | "reject" | "complete") => {
    onAction(job.id, action)
  }

  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <h3 className="font-medium text-lg">{job.serviceName}</h3>
      <p className="text-sm text-neutral-500">{job.customerName} — {new Date(job.dateTime).toLocaleString()}</p>
      <p className="mt-1 font-semibold text-primary-700 dark:text-primary-300">₹{job.price}</p>
      <div className="mt-3 flex gap-2">
        {job.status === "pending" && (
          <>
            <button
              onClick={() => handleAction("accept")}
              className="px-3 py-1 text-sm rounded bg-green-600 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => handleAction("reject")}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white"
            >
              Reject
            </button>
          </>
        )}
        {job.status === "accepted" && (
          <button
            onClick={() => handleAction("complete")}
            className="px-3 py-1 text-sm rounded bg-primary-600 text-white"
          >
            Mark Completed
          </button>
        )}
        <span className={clsx(
          "ml-auto px-2 py-0.5 rounded text-xs",
          job.status === "completed" && "bg-green-100 text-green-700",
          job.status === "in_progress" && "bg-yellow-100 text-yellow-700",
          job.status === "pending" && "bg-neutral-100 text-neutral-600"
        )}>
          {job.status}
        </span>
      </div>
    </div>
  )
}

export default VendorJobCard
