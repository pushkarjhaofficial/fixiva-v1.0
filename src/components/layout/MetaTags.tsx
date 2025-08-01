// src/components/layout/MetaTags.tsx

import React from "react"
import Head from "next/head"

interface Props {
  title?: string
  description?: string
  canonical?: string
  jsonLd?: Record<string, any>
}

const MetaTags: React.FC<Props> = ({ title, description, canonical, jsonLd }) => {
  return (
    <Head>
      <title>{title || "Fixiva – Universal Repair OS"}</title>
      <meta name="description" content={description || "Book services, track jobs, recycle assets, and earn loyalty credits – Fixiva"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {canonical && <link rel="canonical" href={canonical} />}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0f172a" />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  )
}

export default MetaTags
