// src/components/chat/ChatInputBar.tsx

import React, { useState } from "react"
import ChatVoiceInput from "./ChatVoiceInput"

interface Props {
  onSend: (message: string) => void
}

const ChatInputBar: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-t p-2 gap-2 dark:border-neutral-800">
      <ChatVoiceInput onTranscript={(t) => setText(t)} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 rounded border text-sm dark:bg-neutral-900 dark:border-neutral-700"
      />
      <button type="submit" className="px-4 py-2 bg-primary-600 text-white text-sm rounded">
        Send
      </button>
    </form>
  )
}

export default ChatInputBar
