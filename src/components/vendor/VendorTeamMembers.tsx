// src/components/vendor/VendorTeamMembers.tsx

import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaUserTie, FaCheckCircle, FaEnvelope, FaPhone } from "react-icons/fa"

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  avatarUrl?: string
  verified?: boolean
}

export interface VendorTeamMembersProps {
  members: TeamMember[]
  className?: string
}

const VendorTeamMembers: React.FC<VendorTeamMembersProps> = ({ members, className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const border = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const text = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-500"

  return (
    <div className={clsx("rounded-lg shadow border p-6", cardBg, border, className)}>
      <h2 className={clsx("text-lg font-semibold mb-4", text)}>
        <FaUserTie className="inline-block mr-2" />
        {t("vendor.teamMembers") || "Team Members"}
      </h2>
      <ul className="space-y-4">
        {members.length === 0 ? (
          <li className={clsx("text-center text-sm", subText)}>
            {t("vendor.noTeamMembers") || "No team members found."}
          </li>
        ) : (
          members.map(member => (
            <li key={member.id} className={clsx("flex gap-4 items-center p-3 rounded bg-[--color-bg-secondary]")}>
              <img
                src={member.avatarUrl || "/avatar-default.svg"}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[--color-primary]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={clsx("font-bold text-base", text)}>{member.name}</span>
                  {member.verified && (
                    <FaCheckCircle className="text-green-500" title={t("vendor.verified")} />
                  )}
                </div>
                <div className={clsx("text-xs", subText)}>{t(`vendor.role.${member.role}`) || member.role}</div>
                <div className={clsx("flex gap-3 items-center mt-1 text-xs", subText)}>
                  <span><FaEnvelope className="inline mr-1" />{member.email}</span>
                  <span><FaPhone className="inline mr-1" />{member.phone}</span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default VendorTeamMembers
