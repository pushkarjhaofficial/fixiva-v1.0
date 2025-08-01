import React from "react"
import clsx from "clsx"
import { FaBalanceScale, FaDownload } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface RecycleComplianceExportProps {
  onExport: (format: "csv" | "xlsx" | "pdf") => void
  lastExportAt?: string
  className?: string
}
const RecycleComplianceExport: React.FC<RecycleComplianceExportProps> = ({
  onExport, lastExportAt, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  return (
    <section className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4 flex items-center gap-2", text)}>
        <FaBalanceScale /> ESG/Compliance Export
      </h2>
      <div className="flex gap-3 items-center">
        <button
          type="button"
          className="bg-[--color-primary] text-white rounded px-4 py-2 flex items-center gap-2"
          onClick={() => onExport("csv")}
        >
          <FaDownload /> Export CSV
        </button>
        <button
          type="button"
          className="bg-[--color-primary] text-white rounded px-4 py-2 flex items-center gap-2"
          onClick={() => onExport("xlsx")}
        >
          <FaDownload /> Export Excel
        </button>
        <button
          type="button"
          className="bg-[--color-primary] text-white rounded px-4 py-2 flex items-center gap-2"
          onClick={() => onExport("pdf")}
        >
          <FaDownload /> Export PDF
        </button>
        {lastExportAt && (
          <span className="text-xs text-gray-500">Last export: {new Date(lastExportAt).toLocaleString()}</span>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Generate audit-ready ESG/EPR reports for government, CSR, or partner upload.
      </div>
    </section>
  )
}
export default RecycleComplianceExport
