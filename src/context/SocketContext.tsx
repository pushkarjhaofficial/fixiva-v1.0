// src/context/SocketContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode
} from "react"
import { useAuth } from "@/context/AuthContext"
import type { Socket } from "socket.io-client"

// ── Context Types ──────────────────────────────────────────
interface SocketContextType {
  connected: boolean
  attempts: number
  emitEvent: (event: string, ...args: any[]) => void
  onEvent: (event: string, callback: (...args: any[]) => void) => () => void
  socket: Socket | null
}

// ── Create Context ─────────────────────────────────────────
const SocketContext = createContext<SocketContextType | null>(null)

interface SocketProviderProps {
  children: ReactNode
}

// ── Provider ────────────────────────────────────────────────
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { token, isAuthenticated } = useAuth()
  const socketRef = useRef<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [attempts, setAttempts] = useState(0)

  // Disable socket if no URL or not authed
  const socketDisabled = !import.meta.env.VITE_SOCKET_URL || !isAuthenticated

  // Initialize via dynamic import
  const initSocket = useCallback(() => {
    if (socketDisabled || socketRef.current || typeof window === "undefined") return

    ;(async () => {
      try {
        // Dynamically load the client package (no require needed)
        const { io } = await import("socket.io-client")
        const socket: Socket = io(import.meta.env.VITE_SOCKET_URL!, {
          auth: { token },
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000
        })

        socketRef.current = socket

        socket.on("connect", () => {
          setConnected(true)
          setAttempts(0)
        })

        socket.on("disconnect", () => {
          setConnected(false)
        })

        socket.on("reconnect_attempt", () => {
          setAttempts((prev) => prev + 1)
        })
      } catch (err) {
        console.warn("⚠️ Socket init failed (backend not ready?):", err)
      }
    })()
  }, [token, isAuthenticated, socketDisabled])

  // Mount / Cleanup
  useEffect(() => {
    initSocket()
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [initSocket])

  // Emit helper
  const emitEvent = useCallback(
    (event: string, ...args: any[]) => {
      if (socketRef.current && connected) {
        socketRef.current.emit(event, ...args)
      }
    },
    [connected]
  )

  // Subscribe helper
  const onEvent = useCallback(
    (event: string, callback: (...args: any[]) => void) => {
      if (!socketRef.current) return () => {}
      socketRef.current.on(event, callback)
      return () => {
        socketRef.current?.off(event, callback)
      }
    },
    []
  )

  return (
    <SocketContext.Provider
      value={{
        connected,
        attempts,
        emitEvent,
        onEvent,
        socket: socketRef.current
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────
export const useSocket = (): SocketContextType => {
  const ctx = useContext(SocketContext)
  if (!ctx) throw new Error("useSocket must be used within <SocketProvider>")
  return ctx
}

export { SocketContext }