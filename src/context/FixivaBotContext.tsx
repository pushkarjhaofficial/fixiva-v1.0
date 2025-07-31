import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react"

// === TYPES ===
export interface BotMessage {
  text: string
  fromBot: boolean
  timestamp?: string
}

export interface FixivaBotContextType {
  isVisible: boolean
  messages: BotMessage[]
  loading: boolean
  startChat: () => void
  sendUserMessage: (message: string) => void
  sendBotMessage: (message: string) => void
  toggleBotVisibility: () => void
  closeChat: () => void
}

const FixivaBotContext = createContext<FixivaBotContextType | null>(null)

interface FixivaBotProviderProps {
  children: ReactNode
}

export const FixivaBotProvider: React.FC<FixivaBotProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState<BotMessage[]>([])
  const [loading, setLoading] = useState(false)

  const sendBotMessage = useCallback((message: string) => {
    setMessages(prev => [
      ...prev,
      { text: message, fromBot: true, timestamp: new Date().toISOString() }
    ])
  }, [])

  const sendUserMessage = useCallback((message: string) => {
    setMessages(prev => [
      ...prev,
      { text: message, fromBot: false, timestamp: new Date().toISOString() }
    ])
    setLoading(true)
    setTimeout(() => {
      sendBotMessage("🤖 I'm processing your request...")
      setLoading(false)
    }, 1500)
  }, [sendBotMessage])

  const toggleBotVisibility = useCallback(() => {
    setIsVisible(prev => !prev)
  }, [])

  const startChat = useCallback(() => {
    setMessages([
      { text: "👋 Hello! How can I assist you today?", fromBot: true, timestamp: new Date().toISOString() }
    ])
    setLoading(true)
    setIsVisible(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsVisible(false)
    setMessages([])
  }, [])

  return (
    <FixivaBotContext.Provider
      value={{
        isVisible,
        messages,
        loading,
        startChat,
        sendUserMessage,
        sendBotMessage,
        toggleBotVisibility,
        closeChat
      }}
    >
      {children}
    </FixivaBotContext.Provider>
  )
}

// === HOOK ===
export const useFixivaBot = (): FixivaBotContextType => {
  const ctx = useContext(FixivaBotContext)
  if (!ctx) throw new Error("useFixivaBot must be used within <FixivaBotProvider>")
  return ctx
}

export { FixivaBotContext }
