// src/components/support/SupportChat.tsx

import React, { useState } from "react"

export interface ChatMessage {
  id: string
  sender: "agent" | "user"
  text: string
  timestamp: string
}

interface SupportChatProps {
  messages: ChatMessage[]
  onSend: (message: string) => void
}

const SupportChat: React.FC<SupportChatProps> = ({ messages, onSend }) => {
  const [input, setInput] = useState("")

  return (
    <div className="flex flex-col h-[400px] border rounded bg-white dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
          >
            <div className={`px-3 py-2 rounded text-sm max-w-xs ${
              msg.sender === "agent"
                ? "bg-primary-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white"
            }`}>
              {msg.text}
              <div className="text-xs mt-1 text-right text-neutral-300">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!input.trim()) return
          onSend(input)
          setInput("")
        }}
        className="flex border-t p-2 gap-2 dark:border-neutral-700"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded border text-sm dark:bg-neutral-800 dark:border-neutral-600"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-1.5 bg-primary-600 text-white rounded text-sm">
          Send
        </button>
      </form>
    </div>
  )
}

export default SupportChat
