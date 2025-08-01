import React from "react"
import clsx from "clsx"
import { FaComments, FaUser, FaRobot } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportChatMessage {
  id: string
  sender: "agent" | "customer" | "bot"
  text: string
  time: string
}

export interface SupportChatPanelProps {
  messages: SupportChatMessage[]
  onSend: (message: string) => void
  className?: string
}

const SupportChatPanel: React.FC<SupportChatPanelProps> = ({
  messages, onSend, className
}) => {
  const { theme } = useTheme()
  const [input, setInput] = React.useState("")
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  const handleSend = () => {
    if (input.trim()) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <div className={clsx("rounded-lg shadow border p-6 flex flex-col", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaComments /> Support Chat
      </h2>
      <div className="flex-1 overflow-y-auto mb-2 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={clsx(
              "p-2 rounded-lg",
              msg.sender === "agent" ? "bg-blue-50 text-left" :
              msg.sender === "customer" ? "bg-gray-50 text-right" :
              "bg-yellow-50 text-left"
            )}
          >
            <span className="font-semibold mr-2">
              {msg.sender === "agent" ? <FaUser /> : msg.sender === "customer" ? "You" : <FaRobot />}
            </span>
            <span>{msg.text}</span>
            <span className="ml-2 text-xs text-gray-400">{new Date(msg.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSend() }}
        />
        <button
          type="button"
          className="px-3 py-1 rounded bg-[--color-primary] text-white"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default SupportChatPanel
