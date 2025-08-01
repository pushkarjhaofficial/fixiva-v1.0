// src/components/corporate/CorporateTeamList.tsx

import React from "react"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  active: boolean
}

interface CorporateTeamListProps {
  members: TeamMember[]
  onToggleActive: (id: string) => void
}

const CorporateTeamList: React.FC<CorporateTeamListProps> = ({
  members,
  onToggleActive
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Team Members</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between py-2"
          >
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-xs text-neutral-500">{member.email}</p>
              <p className="text-xs text-neutral-400 italic">{member.role}</p>
            </div>
            <button
              onClick={() => onToggleActive(member.id)}
              className={`px-3 py-1 text-sm rounded ${
                member.active
                  ? "bg-green-100 text-green-700 dark:bg-green-900"
                  : "bg-red-100 text-red-700 dark:bg-red-900"
              }`}
            >
              {member.active ? "Active" : "Inactive"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CorporateTeamList
