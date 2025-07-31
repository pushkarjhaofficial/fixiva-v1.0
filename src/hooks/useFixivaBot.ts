import { useContext } from "react"
import { FixivaBotContext } from "@/context/FixivaBotContext"

export interface BotMessage {
  text: string
  fromBot: boolean
}

export interface UseFixivaBotReturn {
  isVisible: boolean
  messages: BotMessage[]
  loading: boolean
  startChat: () => void
  sendUserMessage: (message: string) => void
  sendBotMessage: (message: string) => void
  toggleBotVisibility: () => void
  closeChat: () => void
}

/**
 * useFixivaBot
 * Typed, SSR-safe access to FixivaBotContext for AI chat and agent UX.
 */
export const useFixivaBot = (): UseFixivaBotReturn => {
  const ctx = useContext(FixivaBotContext)
  if (!ctx) throw new Error("useFixivaBot must be used within FixivaBotProvider")
  return ctx as UseFixivaBotReturn
}

export default useFixivaBot
