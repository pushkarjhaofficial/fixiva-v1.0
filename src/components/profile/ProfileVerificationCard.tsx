// src/components/profile/ProfileVerificationCard.tsx

import React from "react"

const ProfileVerificationCard: React.FC = () => {
  const verifications = [
    { label: "Email Verified", status: true },
    { label: "Mobile Verified", status: true },
    { label: "KYC Completed", status: false }
  ]

  return (
    <div className="rounded border p-4 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <h3 className="text-lg font-semibold mb-2">Verification Status</h3>
      <ul className="space-y-1 text-sm">
        {verifications.map((v, i) => (
          <li key={i} className="flex items-center justify-between">
            <span>{v.label}</span>
            <span className={v.status ? "text-green-600" : "text-red-600"}>
              {v.status ? "✔️" : "❌"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfileVerificationCard
