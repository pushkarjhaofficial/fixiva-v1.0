import { useContext } from "react"
import { SocketContext } from "@/context/SocketContext"

export interface UseSocketReturn {
  connected: boolean
  attempts: number
  emitEvent: (event: string, ...args: any[]) => void
  onEvent: (event: string, callback: (...args: any[]) => void) => (() => void) | undefined
  socket: any // You can type this as SocketIOClient.Socket if desired
}

/**
 * useSocket
 * Typed, SSR-safe access to socket context for Fixiva.
 */
export const useSocket = (): UseSocketReturn => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error("useSocket must be used within SocketProvider")
  return ctx as UseSocketReturn
}

export default useSocket
