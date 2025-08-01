// src/components/chat/ChatQuickActions.tsx

import React from "react"

interface Props {
  onSelect: (message: string) => void
}

const quickReplies = [
  "📅 Book a service",
  "♻️ Recycle request",
  "💰 Loyalty balance",
  "📞 Talk to support"
]

const ChatQuickActions: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto px-2 pb-2">
      {quickReplies.map((msg, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(msg)}
          className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 rounded hover:bg-primary-100 dark:hover:bg-primary-800"
        >
          {msg}
        </button>
      ))}
    </div>
  )
}

export default ChatQuickActions
