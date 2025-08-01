// src/components/shared/Avatar.tsx

import React from "react"
import clsx from "clsx"

interface Props {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16"
}

const Avatar: React.FC<Props> = ({ src, alt = "Avatar", size = "md" }) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className={clsx("rounded-full object-cover", sizeMap[size])}
    />
  )
}

export default Avatar
