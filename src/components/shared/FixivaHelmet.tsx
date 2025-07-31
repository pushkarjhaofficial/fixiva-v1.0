import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

export interface FixivaHelmetProps {
  title?: string
  description?: string
  name?: string   // e.g. company/app name
  image?: string  // Open Graph & Twitter image
  url?: string
  lang?: string
  schema?: object // JSON-LD structured data
}

const DEFAULT_TITLE = "Fixiva — Repair, Recycle & Reward Platform"
const DEFAULT_DESC = "Book repairs, recycle old devices, and earn rewards with Fixiva. The world's first universal service OS."
const DEFAULT_IMAGE = "/og-fixiva.png"
const DEFAULT_URL = "https://fixiva.com"

export const FixivaHelmet: React.FC<FixivaHelmetProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  name = "Fixiva",
  image = DEFAULT_IMAGE,
  url = DEFAULT_URL,
  lang = "en",
  schema
}) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@fixiva" />
      <meta httpEquiv="Content-Language" content={lang} />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#1c70e8" />
      {/* JSON-LD schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  </HelmetProvider>
)

export default FixivaHelmet
