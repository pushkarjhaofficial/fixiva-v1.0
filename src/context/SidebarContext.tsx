import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react"

interface SidebarContextType {
  isCollapsed: boolean
  isVisible: boolean
  toggleCollapse: () => void
  toggleVisibility: () => void
  setCollapsed: (value: boolean) => void
  setVisible: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const collapsed = localStorage.getItem("fixiva_sidebar_collapsed") === "true"
    const visible = localStorage.getItem("fixiva_sidebar_visible") !== "false"

    setIsCollapsed(collapsed)
    setIsVisible(visible)
  }, [])

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    if (typeof window !== "undefined") {
      localStorage.setItem("fixiva_sidebar_collapsed", String(newState))
    }
  }

  const toggleVisibility = () => {
    const newState = !isVisible
    setIsVisible(newState)
    if (typeof window !== "undefined") {
      localStorage.setItem("fixiva_sidebar_visible", String(newState))
    }
  }

  const setCollapsed = (value: boolean) => {
    setIsCollapsed(value)
    if (typeof window !== "undefined") {
      localStorage.setItem("fixiva_sidebar_collapsed", String(value))
    }
  }

  const setVisible = (value: boolean) => {
    setIsVisible(value)
    if (typeof window !== "undefined") {
      localStorage.setItem("fixiva_sidebar_visible", String(value))
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        setCollapsed,
        isVisible,
        toggleVisibility,
        setVisible
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

// === Hook ===
export const useSidebar = (): SidebarContextType => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>")
  return ctx
}

export { SidebarContext }