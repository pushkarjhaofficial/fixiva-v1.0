// src/components/govt/GovtComplianceStatus.tsx

import React from "react"

export interface ComplianceRecord {
  contractor: string
  project: string
  lastInspection: string
  complianceScore: number // % out of 100
  flagged: boolean
}

interface Props {
  records: ComplianceRecord[]
}

const GovtComplianceStatus: React.FC<Props> = ({ records }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compliance Reports</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-neutral-100 dark:bg-neutral-800 text-left">
            <th className="p-2">Contractor</th>
            <th className="p-2">Project</th>
            <th className="p-2">Last Inspection</th>
            <th className="p-2">Compliance</th>
            <th className="p-2">Flag</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={idx} className="border-t dark:border-neutral-700">
              <td className="p-2">{r.contractor}</td>
              <td className="p-2">{r.project}</td>
              <td className="p-2">{new Date(r.lastInspection).toLocaleDateString()}</td>
              <td className="p-2 font-semibold">
                {r.complianceScore}%
              </td>
              <td className="p-2">
                {r.flagged ? (
                  <span className="text-red-600 font-medium">⚠️</span>
                ) : (
                  <span className="text-green-600 font-medium">✔️</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GovtComplianceStatus
