import React from "react"
import clsx from "clsx"
import { FaUser, FaTools, FaDownload, FaCalendarAlt, FaFileAlt } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface GovtEmployeeAsset {
  asset: string
  assetTag: string
  status: string
  lastService: string
  nextServiceDue: string
}

export interface GovtEmployeeSelfServicePanelProps {
  name: string
  employeeId: string
  department: string
  assets: GovtEmployeeAsset[]
  payrollLink: string
  downloadLinks: { name: string; url: string }[]
  onRequestRepair: (assetTag: string) => void
  className?: string
}

const GovtEmployeeSelfServicePanel: React.FC<GovtEmployeeSelfServicePanelProps> = ({
  name, employeeId, department, assets, payrollLink, downloadLinks, onRequestRepair, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaUser /> Employee Self-Service
      </h2>
      <div className="mb-2">
        <div>Name: <span className="font-semibold">{name}</span></div>
        <div>ID: <span className="font-semibold">{employeeId}</span></div>
        <div>Department: <span className="font-semibold">{department}</span></div>
      </div>
      <div className="my-4">
        <h3 className="font-semibold mb-2 flex items-center gap-1"><FaTools /> My Assets</h3>
        <table className="min-w-full text-sm mb-2">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left">Asset</th>
              <th className="px-2 py-1 text-left">Tag</th>
              <th className="px-2 py-1 text-left">Status</th>
              <th className="px-2 py-1 text-left">Last Service</th>
              <th className="px-2 py-1 text-left">Next Due</th>
              <th className="px-2 py-1 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">No assets assigned.</td>
              </tr>
            ) : (
              assets.map(a => (
                <tr key={a.assetTag}>
                  <td className="px-2 py-1">{a.asset}</td>
                  <td className="px-2 py-1">{a.assetTag}</td>
                  <td className="px-2 py-1">{a.status}</td>
                  <td className="px-2 py-1">{a.lastService}</td>
                  <td className="px-2 py-1">{a.nextServiceDue}</td>
                  <td className="px-2 py-1">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      onClick={() => onRequestRepair(a.assetTag)}
                    >Request Repair</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-2">
        <a
          href={payrollLink}
          className="bg-green-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
          download
        >
          <FaDownload /> Download Payroll
        </a>
      </div>
      <div>
        <h3 className="font-semibold mb-2 flex items-center gap-1"><FaFileAlt /> Downloadable Forms</h3>
        <ul className="list-disc pl-5">
          {downloadLinks.length === 0 ? (
            <li className="text-gray-400">No forms available.</li>
          ) : (
            downloadLinks.map(f => (
              <li key={f.url}>
                <a href={f.url} className="text-blue-600 underline" download>
                  {f.name}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
export default GovtEmployeeSelfServicePanel
