// src/components/common/PageLoader.tsx

import React from "react"

const PageLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full py-16">
      <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full" />
    </div>
  )
}

export default PageLoader
