import React from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { BookingVoiceInput, QRScanner } from "@components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks"; // Adjust based on your actual hook import path
import { FixivaHelmet } from "@/shared"; // Adjust based on your shared component path

export function SocialProofStats({ stats }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Optionally send bot event on mount or interaction
  React.useEffect(() => {
    sendBotEvent("SocialProofStats_viewed");
  }, [sendBotEvent]);

  return (
    <>
      <FixivaHelmet
        title={t("component_title", { defaultValue: "Default Title" })}
        description={t("component_tooltip", { defaultValue: "Default description" })}
        name="SocialProofStats"
      />
      <div className="flex justify-around rounded-lg bg-[var(--color-background)] py-6 text-center">
        {stats.map((item, i) => (
          <div key={i}>
            <p className="text-2xl font-bold text-primary">{item.value}</p>
            <p className="text-sm text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default SocialProofStats;
