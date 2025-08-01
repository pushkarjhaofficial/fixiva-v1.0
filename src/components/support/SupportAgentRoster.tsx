import React from "react"
import clsx from "clsx"
import { FaUserTie, FaCircle, FaPhone } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportAgent {
  id: string
  name: string
  status: "online" | "offline" | "busy"
  email: string
  phone: string
  openTickets: number
  resolvedTickets: number
}

export interface SupportAgentRosterProps {
  agents: SupportAgent[]
  onCall?: (id: string) => void
  className?: string
}

const statusColor: Record<SupportAgent["status"], string> = {
  online: "text-green-500",
  offline: "text-gray-400",
  busy: "text-yellow-400"
}

const SupportAgentRoster: React.FC<SupportAgentRosterProps> = ({
  agents, onCall, className
}) => {
  const { theme } = useTheme()
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, className)}>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaUserTie /> Support Agents
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Open</th>
              <th className="px-3 py-2 text-left">Resolved</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">No agents online.</td>
              </tr>
            ) : (
              agents.map(agent => (
                <tr key={agent.id}>
                  <td className="px-3 py-2"><FaCircle className={statusColor[agent.status]} /></td>
                  <td className="px-3 py-2">{agent.name}</td>
                  <td className="px-3 py-2">{agent.email}</td>
                  <td className="px-3 py-2">{agent.phone}</td>
                  <td className="px-3 py-2">{agent.openTickets}</td>
                  <td className="px-3 py-2">{agent.resolvedTickets}</td>
                  <td className="px-3 py-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-600 text-white text-xs flex items-center gap-1"
                      onClick={() => onCall?.(agent.id)}
                    >
                      <FaPhone /> Call
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default SupportAgentRoster
