// src/components/chat/FixivaBotWelcomeCard.tsx

import React from "react"

const FixivaBotWelcomeCard: React.FC = () => {
  return (
    <div className="rounded border p-3 text-sm mb-3 bg-green-50 dark:bg-green-900 dark:border-green-700">
      <p>👋 I'm <strong>FixivaBot</strong>. I can help you with bookings, loyalty, recycling, and support.</p>
      <p className="mt-1 text-xs text-green-600 dark:text-green-300">You can type or speak your request.</p>
    </div>
  )
}

export default FixivaBotWelcomeCard
