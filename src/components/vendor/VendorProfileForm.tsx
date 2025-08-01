// src/components/vendor/VendorProfileForm.tsx

import React, { useState } from "react"

export interface VendorProfile {
  name: string
  email: string
  phone: string
  serviceAreas: string[]
}

interface Props {
  profile: VendorProfile
  onSave: (profile: VendorProfile) => void
}

const VendorProfileForm: React.FC<Props> = ({ profile, onSave }) => {
  const [form, setForm] = useState<VendorProfile>(profile)

  const handleChange = (key: keyof VendorProfile, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(form)
      }}
      className="space-y-4 max-w-md"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Service Areas (comma-separated)</label>
        <input
          type="text"
          value={form.serviceAreas.join(", ")}
          onChange={(e) => handleChange("serviceAreas", e.target.value.split(",").map(s => s.trim()))}
          className="w-full border rounded px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded"
      >
        Save Profile
      </button>
    </form>
  )
}

export default VendorProfileForm
