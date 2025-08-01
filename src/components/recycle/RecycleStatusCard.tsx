// src/components/recycle/RecycleStatusCard.tsx

import React from "react"

export interface RecycleStatus {
  requestId: string
  status: "pending" | "scheduled" | "picked_up" | "rewarded"
  rewardPoints: number
  scheduledDate?: string
}

interface Props {
  data: RecycleStatus
  onViewQRCode?: () => void
}

const RecycleStatusCard: React.FC<Props> = ({ data, onViewQRCode }) => {
  const statusColors: Record<string, string> = {
    pending: "bg-red-100 text-red-700 dark:bg-red-900",
    scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900",
    picked_up: "bg-blue-100 text-blue-700 dark:bg-blue-900",
    rewarded: "bg-green-100 text-green-700 dark:bg-green-900"
  }

  return (
    <div className="p-4 border rounded bg-white dark:bg-neutral-900 dark:border-neutral-800 space-y-2">
      <h3 className="font-semibold text-lg">Recycle Status</h3>
      <p className="text-sm text-neutral-600">
        Request ID: <span className="font-mono">{data.requestId}</span>
      </p>
      {data.scheduledDate && (
        <p className="text-sm text-neutral-600">
          Scheduled: {new Date(data.scheduledDate).toLocaleDateString()}
        </p>
      )}
      <p className="text-sm">
        Status:{" "}
        <span className={`text-xs px-2 py-0.5 rounded ${statusColors[data.status]}`}>
          {data.status.replace("_", " ")}
        </span>
      </p>
      <p className="text-sm">Reward Points: <strong>{data.rewardPoints}</strong></p>

      {onViewQRCode && (
        <button
          onClick={onViewQRCode}
          className="text-sm underline text-primary-600"
        >
          View QR Code
        </button>
      )}
    </div>
  )
}

export default RecycleStatusCard
