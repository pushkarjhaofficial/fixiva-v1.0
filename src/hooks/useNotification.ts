import { useContext } from "react"
import { NotificationContext } from "@/context/NotificationContext"

export interface NotificationModal {
  visible: boolean
  content: React.ReactNode | null
}

export interface UseNotificationReturn {
  notifySuccess: (msg: string) => void
  notifyError: (msg: string) => void
  notifyInfo: (msg: string) => void
  showModal: (content: React.ReactNode) => void
  hideModal: () => void
  modal: NotificationModal
}

/**
 * useNotification
 * Typed, SSR-safe access to NotificationContext for Fixiva UX.
 */
export const useNotification = (): UseNotificationReturn => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider")
  return ctx as UseNotificationReturn
}

export default useNotification
