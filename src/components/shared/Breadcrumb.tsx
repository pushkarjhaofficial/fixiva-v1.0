// src/components/shared/Breadcrumb.tsx

import React from "react"
import Link from "next/link"

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
}

const Breadcrumb: React.FC<Props> = ({ crumbs }) => {
  return (
    <nav className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
      {crumbs.map((c, idx) => (
        <span key={idx}>
          {c.href ? (
            <Link href={c.href} className="hover:underline text-primary-600">
              {c.label}
            </Link>
          ) : (
            <span>{c.label}</span>
          )}
          {idx < crumbs.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
