// src/components/corporate/CorporateRequestForm.tsx

import React, { useState } from "react"

export interface CorporateRequestData {
  department: string
  issue: string
  priority: "low" | "medium" | "high"
  location: string
}

interface Props {
  onSubmit: (data: CorporateRequestData) => void
}

const CorporateRequestForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<CorporateRequestData>({
    department: "",
    issue: "",
    priority: "medium",
    location: ""
  })

  const updateField = (field: keyof CorporateRequestData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="space-y-4 max-w-xl"
    >
      <h3 className="text-lg font-semibold">Raise New Request</h3>

      <div>
        <label className="block text-sm font-medium">Department</label>
        <input
          type="text"
          value={form.department}
          onChange={(e) => updateField("department", e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Issue</label>
        <textarea
          value={form.issue}
          onChange={(e) => updateField("issue", e.target.value)}
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Priority</label>
        <select
          value={form.priority}
          onChange={(e) =>
            updateField("priority", e.target.value as "low" | "medium" | "high")
          }
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded"
      >
        Submit Request
      </button>
    </form>
  )
}

export default CorporateRequestForm
