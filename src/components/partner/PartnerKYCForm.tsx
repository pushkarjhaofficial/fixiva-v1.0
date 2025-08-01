import React, { useState } from "react"
import clsx from "clsx"
import { FaFileUpload, FaIdCard } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface PartnerKYCFormProps {
  onSubmit: (data: any) => void
  uploading?: boolean
  error?: string
  className?: string
}

const PartnerKYCForm: React.FC<PartnerKYCFormProps> = ({
  onSubmit, uploading, error, className
}) => {
  const { theme } = useTheme()
  const [companyName, setCompanyName] = useState("")
  const [gst, setGst] = useState("")
  const [doc, setDoc] = useState<File | null>(null)
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <form className={clsx("rounded-lg shadow border p-6 space-y-4", cardBg, className)}
      onSubmit={e => { e.preventDefault(); onSubmit({ companyName, gst, doc }) }}>
      <h2 className="text-lg font-semibold flex gap-2 items-center"><FaIdCard /> Partner KYC</h2>
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="Company Name"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        className="w-full border rounded px-3 py-2"
        placeholder="GSTIN / Tax ID"
        value={gst}
        onChange={e => setGst(e.target.value)}
        required
      />
      <input
        type="file"
        accept=".pdf,.jpg,.png"
        className="w-full"
        onChange={e => setDoc(e.target.files?.[0] || null)}
        required
      />
      <button
        type="submit"
        className="px-5 py-2 rounded bg-[--color-primary] text-white"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : <><FaFileUpload /> Submit KYC</>}
      </button>
      {error && <div className="text-xs text-red-500">{error}</div>}
    </form>
  )
}
export default PartnerKYCForm
