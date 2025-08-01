// src/components/vendor/VendorDocumentsUploader.tsx

import React, { useRef, useState } from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

export interface DocumentType {
  key: string
  label: string
  required?: boolean
}

export interface VendorDocumentsUploaderProps {
  documents: DocumentType[]
  onUpload: (docKey: string, file: File) => Promise<void>
  uploaded: Record<string, boolean>   // docKey => uploaded or not
  errors?: Record<string, string>     // docKey => error message
  className?: string
}

/**
 * VendorDocumentsUploader
 * Reusable, elite KYC/document uploader with status feedback per doc.
 */
const VendorDocumentsUploader: React.FC<VendorDocumentsUploaderProps> = ({
  documents,
  onUpload,
  uploaded,
  errors = {},
  className,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const [loadingKey, setLoadingKey] = useState<string | null>(null)
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({})

  const bg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  const handleFileChange = async (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoadingKey(docKey)
    try {
      await onUpload(docKey, file)
    } catch {}
    setLoadingKey(null)
    if (fileInputs.current[docKey]) fileInputs.current[docKey]!.value = ""
  }

  return (
    <div className={clsx("rounded-lg shadow border p-6 max-w-lg mx-auto", bg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>
        {t("vendor.uploadDocuments")}
      </h2>
      <ul className="space-y-5">
        {documents.map((doc) => (
          <li key={doc.key} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={clsx("font-medium", text)}>{t(doc.label)}</span>
              {doc.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
              {uploaded[doc.key] && (
                <FaCheckCircle className="text-green-500 ml-2" title={t("common.uploaded")} />
              )}
              {errors[doc.key] && (
                <FaTimesCircle className="text-red-500 ml-2" title={t("common.uploadError")} />
              )}
            </div>
            <div className="flex items-center gap-3">
              <input
                ref={el => fileInputs.current[doc.key] = el}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="flex-1 border rounded px-2 py-1"
                aria-label={t("vendor.selectFile")}
                disabled={!!uploaded[doc.key] || !!loadingKey}
                onChange={e => handleFileChange(doc.key, e)}
              />
              <button
                type="button"
                className={clsx(
                  "px-3 py-2 rounded bg-[--color-primary] text-white flex items-center gap-2 font-medium",
                  (!!uploaded[doc.key] || !!loadingKey) && "opacity-60 cursor-not-allowed"
                )}
                disabled={!!uploaded[doc.key] || !!loadingKey}
                onClick={() => fileInputs.current[doc.key]?.click()}
              >
                <FaCloudUploadAlt /> {t("vendor.upload")}
              </button>
            </div>
            {errors[doc.key] && (
              <span className="text-xs text-red-500">{errors[doc.key]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VendorDocumentsUploader
