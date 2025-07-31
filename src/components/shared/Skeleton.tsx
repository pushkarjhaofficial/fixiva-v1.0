import React from "react"
import clsx from "clsx"

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  rounded?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
  style?: React.CSSProperties
  count?: number
}

/**
 * Skeleton
 * Renders a theme-aware animated loading placeholder.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 24,
  rounded = "md",
  className = "",
  style = {},
  count = 1
}) => {
  const baseCls =
    "bg-[--color-bg-secondary] animate-pulse select-none"
  const roundedCls =
    rounded === "sm"
      ? "rounded-sm"
      : rounded === "md"
      ? "rounded-md"
      : rounded === "lg"
      ? "rounded-lg"
      : rounded === "xl"
      ? "rounded-xl"
      : "rounded-full"

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(baseCls, roundedCls, className)}
          style={{ width, height, ...style }}
          aria-busy="true"
          aria-label="Loading"
        />
      ))}
    </>
  )
}

export default Skeleton
