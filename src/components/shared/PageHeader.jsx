import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export function PageHeader({ title, subtitle }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  React.useEffect(() => {
    sendBotEvent?.("page_header_rendered", { title });
  }, [title, sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t(title, { defaultValue: title })}
        description={t(subtitle, { defaultValue: subtitle || "" })}
        name="PageHeader"
      />
      <div className="my-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-primary)]">
          {t(title, { defaultValue: title })}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--color-muted)]">
            {t(subtitle, { defaultValue: subtitle })}
          </p>
        )}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default PageHeader;
