// src/components/home/HomeStatsBanner.tsx

import React from "react"
import clsx from "clsx"

export interface StatItem {
  label: string
  value: string | number
}
export interface HomeStatsBannerProps {
  stats: StatItem[]
  className?: string
}

const HomeStatsBanner: React.FC<HomeStatsBannerProps> = ({ stats, className }) => {
  return (
    <section className={clsx("py-10 bg-[--color-primary] text-white", className)}>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs uppercase">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeStatsBanner
