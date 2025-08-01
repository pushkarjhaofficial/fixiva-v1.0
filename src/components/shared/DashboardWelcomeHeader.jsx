import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot, useAuth } from "@/hooks";
import FixivaHelmet from "@/components";

const avatarFallback = "https://ui-avatars.com/api/?name=User&background=F5F5F5&color=222&size=128";

export function DashboardWelcomeHeader() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const { user } = useAuth();

  React.useEffect(() => {
    sendBotEvent?.("dashboard_welcome_header_rendered");
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("dashboard_welcome_title", { defaultValue: "Welcome to Your Dashboard" })}
        description={t("dashboard_welcome_desc", { defaultValue: "Premium Fixiva dashboard and smart insights." })}
        name="DashboardWelcomeHeader"
      />
      <div className="mb-10 flex items-center gap-4">
        <img
          src={user?.avatar || avatarFallback}
          alt={user?.full_name || "User Avatar"}
          className="h-16 w-16 rounded-full border-2 border-[var(--color-border)] shadow"
          loading="lazy"
        />
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">
            {t("welcome_back", { defaultValue: "Welcome back" })},{" "}
            {user?.full_name?.split(" ")[0] || t("user", { defaultValue: "User" })}!
          </h1>
          <p className="text-sm text-[var(--color-text)]">
            {t("dashboard_subtitle", { defaultValue: "Your premium service dashboard" })}
          </p>
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default DashboardWelcomeHeader;
