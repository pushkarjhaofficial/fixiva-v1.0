// src/components/chat/ChatMessageBubble.tsx

import React from "react"

export interface ChatMessage {
  id: string
  sender: "bot" | "user" | "agent"
  text: string
  timestamp: string
}

interface Props {
  message: ChatMessage
}

const ChatMessageBubble: React.FC<Props> = ({ message }) => {
  const isBot = message.sender === "bot"
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-primary-600 text-white"
            : isBot
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white"
            : "bg-yellow-100 text-yellow-900"
        }`}
      >
        <p>{message.text}</p>
        <p className="text-[10px] mt-1 text-right text-neutral-400">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ChatMessageBubble
