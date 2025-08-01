// src/components/common/FixivaLogo.tsx

import React from "react"

interface Props {
  size?: number
  className?: string
}

const FixivaLogo: React.FC<Props> = ({ size = 36, className = "" }) => {
  return (
    <img
      src="/logo/fixiva-logo.svg"
      width={size}
      height={size}
      alt="Fixiva"
      className={className}
      loading="lazy"
    />
  )
}

export default FixivaLogo
