import React from "react"
import clsx from "clsx"
import { FaMapMarkedAlt } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
export interface VendorServiceCoverageMapProps {
  mapUrl?: string // embed url or link
  className?: string
}
const VendorServiceCoverageMap: React.FC<VendorServiceCoverageMapProps> = ({
  mapUrl, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <div className={
