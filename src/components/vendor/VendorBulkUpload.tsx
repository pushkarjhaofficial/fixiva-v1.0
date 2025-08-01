import React, { useRef } from "react"
import clsx from "clsx"
import { FaUpload } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"
export interface VendorBulkUploadProps {
  onUpload: (file: File) => Promise<void>
  loading?: boolean
  error?: string
  className?: string
}
const VendorBulkUpload: React.FC<VendorBulkUploadProps> = ({
  onUpload, loading, error, className
}) => {
  const { theme } = useTheme()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    if (fileRef.current) fileRef.current.value = ""
  }
  return (
    <div className={clsx("rounded-lg shadow border p-6", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaUpload /> Bulk Upload (.csv)
      </h2>
      <input type="file" accept=".csv" ref={fileRef} onChange={handleFile} className="mb-3" disabled={loading} />
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}
export default VendorBulkUpload
