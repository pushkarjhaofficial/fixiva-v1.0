// src/components/shared/FixivaHelmet.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";

/**
 * FixivaHelmet
 *
 * A drop‑in wrapper around react‑helmet-async that also fires a
 * `page_view` event when mounted via `useFixivaBot`.
 */
export function FixivaHelmet({
  title,
  description,
  name,
  children,   // optional extra <Helmet> children
  ...rest     // other Helmet props (htmlAttributes, etc)
}) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  useEffect(() => {
    sendBotEvent("page_view", { page: name });
  }, [sendBotEvent, name]);

  // allow passing either an i18n key or a literal string
  const seoTitle = t(title, { defaultValue: title });
  const seoDesc  = t(description, { defaultValue: description });

  return (
    <Helmet {...rest}>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />

      {/* Open Graph */}
      <meta property="og:title"        content={seoTitle} />
      <meta property="og:description"  content={seoDesc} />
      <meta property="og:type"         content="website" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />

      {children}
    </Helmet>
  );
}

FixivaHelmet.propTypes = {
  title:       PropTypes.string.isRequired,
  description: PropTypes.string,
  name:        PropTypes.string.isRequired,
  children:    PropTypes.node,
};

FixivaHelmet.defaultProps = {
  description: "",
  children:    null,
};

export default FixivaHelmet;
