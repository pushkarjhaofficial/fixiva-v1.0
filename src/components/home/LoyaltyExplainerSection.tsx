// src/components/home/LoyaltyExplainerSection.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { FaCoins, FaGift, FaUserFriends } from "react-icons/fa"

export interface LoyaltyExplainerSectionProps {
  className?: string
}

const LoyaltyExplainerSection: React.FC<LoyaltyExplainerSectionProps> = ({ className }) => {
  const { t } = useTranslation()

  const perks = [
    { icon: <FaCoins />, label: t("home.loyalty.coins") },
    { icon: <FaGift />, label: t("home.loyalty.rewards") },
    { icon: <FaUserFriends />, label: t("home.loyalty.referrals") }
  ]

  return (
    <section className={clsx("py-16 bg-[--color-bg-secondary] text-[--color-text-secondary]", className)}>
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">{t("home.loyalty.title")}</h2>
        <p className="mb-8 text-lg">{t("home.loyalty.description")}</p>
        <div className="flex flex-wrap justify-center gap-6">
          {perks.map((perk, i) => (
            <div key={i} className="flex flex-col items-center bg-[--color-bg] shadow rounded p-5 w-40">
              <div className="text-3xl text-[--color-primary] mb-2">{perk.icon}</div>
              <div className="text-sm font-semibold">{perk.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LoyaltyExplainerSection
