// src/components/partner/PartnerClientList.tsx

import React from "react"

export interface PartnerClient {
  id: string
  name: string
  location: string
  totalSpend: number
  activeUsers: number
}

interface Props {
  clients?: PartnerClient[]
}

const PartnerClientList: React.FC<Props> = ({ clients = [] }) => {
  const sample = [
    { id: "C1", name: "Zentech Pvt Ltd", location: "Mumbai", totalSpend: 78000, activeUsers: 24 },
    { id: "C2", name: "Sunrise Solutions", location: "Bangalore", totalSpend: 56200, activeUsers: 17 },
    { id: "C3", name: "GlobalCore", location: "Delhi", totalSpend: 48250, activeUsers: 12 }
  ]

  const list = clients.length > 0 ? clients : sample

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Linked Clients</h3>
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
        {list.map((client) => (
          <li key={client.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-xs text-neutral-500">{client.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">₹{client.totalSpend.toLocaleString()}</p>
              <p className="text-xs text-neutral-500">{client.activeUsers} users</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PartnerClientList
