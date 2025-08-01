// src/components/vendor/VendorDocumentViewer.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaFilePdf, FaFileImage, FaExternalLinkAlt } from "react-icons/fa"

export interface VendorDocument {
  id: string
  name: string
  type: "pdf" | "image"
  url: string
  uploadedAt?: string // ISO
  uploadedBy?: string
}

export interface VendorDocumentViewerProps {
  documents: VendorDocument[]
  className?: string
}

const VendorDocumentViewer: React.FC<VendorDocumentViewerProps> = ({
  documents,
  className
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>
        {t("vendor.documentViewer") || "Documents"}
      </h2>
      <ul className="space-y-4">
        {documents.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>
            {t("vendor.noDocuments") || "No documents found."}
          </li>
        ) : (
          documents.map((doc) => (
            <li key={doc.id} className="flex items-center gap-4 bg-[--color-bg-secondary] p-3 rounded">
              {doc.type === "pdf" ? (
                <FaFilePdf className="text-2xl text-red-600" />
              ) : (
                <FaFileImage className="text-2xl text-blue-500" />
              )}
              <div className="flex-1">
                <div className={clsx("font-medium", text)}>{doc.name}</div>
                <div className={clsx("text-xs", subText)}>
                  {doc.uploadedAt && new Date(doc.uploadedAt).toLocaleString()}
                  {doc.uploadedBy && <> • {t("vendor.uploadedBy") || "By"}: {doc.uploadedBy}</>}
                </div>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-2 py-1 rounded bg-[--color-primary] text-white flex items-center gap-1 text-xs font-semibold hover:opacity-80"
                title={t("vendor.openDocument") || "Open"}
              >
                <FaExternalLinkAlt /> {t("vendor.open") || "Open"}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default VendorDocumentViewer
