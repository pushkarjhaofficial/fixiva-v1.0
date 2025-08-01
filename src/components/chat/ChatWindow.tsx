// src/components/chat/ChatWindow.tsx

import React, { useState } from "react"
import ChatMessageBubble, { ChatMessage } from "./ChatMessageBubble"
import ChatInputBar from "./ChatInputBar"
import ChatQuickActions from "./ChatQuickActions"
import FixivaBotWelcomeCard from "./FixivaBotWelcomeCard"

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi 👋 I'm FixivaBot. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ])

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg])
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <FixivaBotWelcomeCard />
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <ChatQuickActions onSelect={(text) =>
        addMessage({
          id: Date.now().toString(),
          sender: "user",
          text,
          timestamp: new Date().toISOString()
        })
      } />
      <ChatInputBar onSend={(text) =>
        addMessage({
          id: Date.now().toString(),
          sender: "user",
          text,
          timestamp: new Date().toISOString()
        })
      } />
    </div>
  )
}

export default ChatWindow
