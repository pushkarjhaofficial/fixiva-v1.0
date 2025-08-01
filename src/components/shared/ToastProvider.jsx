import React from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

/**
 * ToastProvider – Global toast notification context provider with premium styles, theme, i18n, and analytics.
 */
export default function ToastProvider({ children }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { sendBotEvent } = useFixivaBot();

  React.useEffect(() => {
    sendBotEvent("provider_mounted", { name: "ToastProvider" });
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("toast_notifications_title", { defaultValue: "Notifications" })}
        description={t("toast_notifications_desc", { defaultValue: "Global toast notifications for Fixiva." })}
        name="ToastProvider"
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Theme styles via CSS variables (works with all themes)
          style: {
            borderRadius: "12px",
            background: "var(--color-bg-alt)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
            fontSize: "1rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
            padding: "14px 20px",
          },
          duration: 4000,
          // ARIA: polite, accessible
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        }}
      />
      {children}
    </>
  );
}
