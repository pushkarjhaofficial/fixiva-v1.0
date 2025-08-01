// src/components/common/ErrorBoundary.tsx

import React from "react"

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Fixiva ErrorBoundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 text-red-600 dark:text-red-400">
          <p>🚨 Something went wrong. Please reload the page.</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
