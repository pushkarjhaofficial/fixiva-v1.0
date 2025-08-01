// src/components/layout/MainLayout.tsx

import React from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 bg-neutral-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
