import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

export function ContactSupportCard({ contact = { phone: "+91 98765 43210", email: "support@fixiva.in" } }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  React.useEffect(() => {
    sendBotEvent?.("contact_support_card_rendered");
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("contact_support_title", { defaultValue: "Need Help?" })}
        description={t("contact_support_desc", { defaultValue: "Contact Fixiva customer support easily." })}
        name="ContactSupportCard"
      />
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[var(--color-shadow)] max-w-md">
        <h4 className="mb-2 text-lg font-bold text-[var(--color-primary)]">
          {t("need_help", { defaultValue: "Need Help?" })}
        </h4>
        <p className="text-sm text-[var(--color-muted)] mb-1">
          {t("reach_us_at", { defaultValue: "Reach us at:" })}
        </p>
        <p className="font-medium text-[var(--color-text)]">{contact.phone}</p>
        <p className="text-sm text-[var(--color-text)]">{contact.email}</p>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default ContactSupportCard;
