import React, { useRef, useState } from "react"
import clsx from "clsx"
import { FaFileCsv, FaUpload } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface CorpBulkAssetUploadProps {
  onUpload: (file: File) => Promise<void>
  uploading?: boolean
  error?: string
  className?: string
}

const CorpBulkAssetUpload: React.FC<CorpBulkAssetUploadProps> = ({
  onUpload, uploading, error, className
}) => {
  const { theme } = useTheme()
  const [fileName, setFileName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name)
      onUpload(e.target.files[0])
    }
  }

  return (
    <section className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaFileCsv /> Bulk Asset CSV Upload
      </h2>
      <div className="flex gap-3 items-center">
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <button
          type="button"
          className="bg-[--color-primary] text-white rounded px-4 py-2 flex items-center gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <FaUpload /> Choose CSV
        </button>
        <span className="text-xs">{fileName}</span>
        {uploading && <span className="text-xs text-yellow-500">Uploading...</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Download template CSV (Type, Brand, Model, Serial, Owner, Status, AssignTo, Dept, etc).
      </p>
    </section>
  )
}
export default CorpBulkAssetUpload
