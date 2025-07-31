import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from "react"
import { toast } from "react-hot-toast"

// === Modal Meta Type ===
interface ModalState {
  visible: boolean
  content: ReactNode | null
}

// === Context Shape ===
export interface NotificationContextType {
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
  notifyInfo: (message: string) => void
  showModal: (content: ReactNode) => void
  hideModal: () => void
  modal: ModalState
}

const NotificationContext = createContext<NotificationContextType | null>(null)

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({ visible: false, content: null })

  const notifySuccess = useCallback((message: string) => {
    toast.success(message || "✅ Action completed.")
  }, [])

  const notifyError = useCallback((message: string) => {
    toast.error(message || "❌ Something went wrong.")
  }, [])

  const notifyInfo = useCallback((message: string) => {
    toast(message || "ℹ️ Update received.")
  }, [])

  const showModal = useCallback((content: ReactNode) => {
    setModal({ visible: true, content })
  }, [])

  const hideModal = useCallback(() => {
    setModal({ visible: false, content: null })
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifySuccess,
        notifyError,
        notifyInfo,
        showModal,
        hideModal,
        modal
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// === Custom Hook ===
export const useNotification = (): NotificationContextType => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotification must be used within <NotificationProvider>")
  return ctx
}

export { NotificationContext }