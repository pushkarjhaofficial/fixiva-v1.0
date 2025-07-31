import { useContext } from "react"
import { SidebarContext } from "@/context/SidebarContext"

export interface UseSidebarReturn {
  isCollapsed: boolean
  toggleCollapse: () => void
  setCollapsed: (value: boolean) => void
  isVisible: boolean
  toggleVisibility: () => void
  setVisible: (value: boolean) => void
}

/**
 * useSidebar
 * Typed, SSR-safe access to SidebarContext for navigation UX.
 */
export const useSidebar = (): UseSidebarReturn => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx as UseSidebarReturn
}

export default useSidebar
