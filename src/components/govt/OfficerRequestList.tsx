// src/components/govt/OfficerRequestList.tsx

import React from "react"

export interface OfficerRequest {
  id: string
  title: string
  department: string
  status: "pending" | "in_progress" | "resolved"
  raisedOn: string
}

interface Props {
  requests: OfficerRequest[]
  onView: (id: string) => void
}

const OfficerRequestList: React.FC<Props> = ({ requests, onView }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Requests Overview</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {requests.map((req) => (
          <li
            key={req.id}
            className="py-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{req.title}</p>
              <p className="text-xs text-neutral-500">
                {req.department} • {new Date(req.raisedOn).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded ${
                req.status === "resolved"
                  ? "bg-green-100 text-green-700 dark:bg-green-900"
                  : req.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900"
                  : "bg-red-100 text-red-700 dark:bg-red-900"
              }`}>
                {req.status}
              </span>
              <button
                onClick={() => onView(req.id)}
                className="text-sm text-primary-600 hover:underline"
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OfficerRequestList
