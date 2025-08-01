// src/components/partner/PartnerBulkRequestForm.tsx

import React, { useState } from "react"

interface FormState {
  department: string
  quantity: number
  service: string
  location: string
}

const PartnerBulkRequestForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    department: "",
    quantity: 1,
    service: "",
    location: ""
  })

  const update = (key: keyof FormState, val: string | number) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting bulk request", form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h3 className="text-lg font-semibold">Raise Bulk Request</h3>

      <input
        type="text"
        value={form.department}
        onChange={(e) => update("department", e.target.value)}
        placeholder="Department"
        className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
      />

      <input
        type="number"
        min={1}
        value={form.quantity}
        onChange={(e) => update("quantity", Number(e.target.value))}
        placeholder="Quantity"
        className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
      />

      <input
        type="text"
        value={form.service}
        onChange={(e) => update("service", e.target.value)}
        placeholder="Service"
        className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
      />

      <input
        type="text"
        value={form.location}
        onChange={(e) => update("location", e.target.value)}
        placeholder="Location"
        className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded text-sm"
      >
        Submit Request
      </button>
    </form>
  )
}

export default PartnerBulkRequestForm
