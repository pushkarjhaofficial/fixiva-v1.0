// src/components/common/EmptyState.tsx

import React from "react"

interface Props {
  title?: string
  message?: string
  icon?: React.ReactNode
}

const EmptyState: React.FC<Props> = ({
  title = "Nothing here yet",
  message = "We couldn’t find any data to display.",
  icon = <span className="text-4xl">🪹</span>
}) => {
  return (
    <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-1">{message}</p>
    </div>
  )
}

export default EmptyState
