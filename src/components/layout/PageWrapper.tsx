// src/components/layout/PageWrapper.tsx

import React from "react"
import clsx from "clsx"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Sidebar from "@/components/layout/Sidebar"
import useAuth from "@/hooks/useAuth"

export interface PageWrapperProps {
  children: React.ReactNode
  /** Whether to include the sidebar (default: false) */
  withSidebar?: boolean
  /** Additional class names for the main content area */
  className?: string
}

/**
 * PageWrapper
 * Top-level layout component: renders header, optional sidebar, main content, and footer.
 * Ensures full-height layout with scrollable main area.
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  withSidebar = false,
  className,
}) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {withSidebar && <Sidebar />}

        <main
          role="main"
          className={clsx(
            "flex-1 overflow-auto bg-[--color-bg] text-[--color-text] p-4",
            className
          )}
        >
          {children}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default PageWrapper
