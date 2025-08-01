// src/components/recycle/RecycleRequestForm.tsx

import React, { useState } from "react"

export interface RecycleFormData {
  itemType: string
  quantity: number
  pickupAddress: string
  preferredDate: string
}

interface Props {
  onSubmit: (data: RecycleFormData) => void
}

const RecycleRequestForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<RecycleFormData>({
    itemType: "",
    quantity: 1,
    pickupAddress: "",
    preferredDate: ""
  })

  const update = (key: keyof RecycleFormData, val: string | number) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(form)
      }}
      className="space-y-4 max-w-md"
    >
      <h3 className="text-lg font-semibold">Request Recycle Pickup</h3>

      <div>
        <label className="block text-sm font-medium">Item Type</label>
        <input
          type="text"
          value={form.itemType}
          onChange={(e) => update("itemType", e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={form.quantity}
          min={1}
          onChange={(e) => update("quantity", Number(e.target.value))}
          className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Pickup Address</label>
        <input
          type="text"
          value={form.pickupAddress}
          onChange={(e) => update("pickupAddress", e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Preferred Date</label>
        <input
          type="date"
          value={form.preferredDate}
          onChange={(e) => update("preferredDate", e.target.value)}
          className="w-full px-3 py-2 border rounded text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Request
      </button>
    </form>
  )
}

export default RecycleRequestForm
