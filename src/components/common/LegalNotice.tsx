// src/components/common/LegalNotice.tsx

import React from "react"
import { Link } from "react-router-dom"

const LegalNotice: React.FC = () => {
  return (
    <div className="text-xs text-center text-neutral-400 py-4">
      <Link to="/terms" className="hover:underline">Terms</Link> •{" "}
      <Link to="/privacy" className="hover:underline">Privacy</Link> •{" "}
      <Link to="/refunds" className="hover:underline">Refunds</Link>
    </div>
  )
}

export default LegalNotice
