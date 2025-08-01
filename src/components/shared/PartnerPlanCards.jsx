import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
import { toast } from "react-hot-toast";

export function PartnerPlanCards({ plans = [], onSelect }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleSelect = (plan) => {
    sendBotEvent("partner_plan_selected", { plan });
    toast.success(t("plan_selected", { defaultValue: "Plan selected!" }));
    onSelect?.(plan);
  };

  return (
    <>
      <FixivaHelmet
        title={t("partner_plans_title", { defaultValue: "Partner Plans" })}
        description={t("partner_plans_desc", { defaultValue: "Choose the best plan to become a Fixiva partner." })}
        name="PartnerPlanCards"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id || idx}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="bg-[var(--color-bg)] shadow-[var(--color-shadow)] p-6 rounded-xl border border-[var(--color-border)] flex flex-col"
            tabIndex={0}
            aria-label={t("partner_plan_card", { defaultValue: plan.name })}
          >
            <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">{t(plan.name, { defaultValue: plan.name })}</h3>
            <p className="text-[var(--color-text)] mb-4">{t(plan.description, { defaultValue: plan.description })}</p>
            <p className="text-2xl font-bold text-[var(--color-primary)] mb-4">
              {plan.currency || "₹"}{plan.price}
            </p>
            <ul className="mb-4 space-y-1 text-sm text-[var(--color-muted)]">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {t(f, { defaultValue: f })}</li>
              ))}
            </ul>
            <button
              aria-label={t("choose_plan", { defaultValue: "Choose Plan" })}
              onClick={() => handleSelect(plan)}
              className="bg-[var(--color-primary)] text-[var(--color-text-light)] px-4 py-2 rounded-md font-semibold hover:bg-[var(--color-accent)] transition"
              type="button"
            >
              {t("choose_plan", { defaultValue: "Choose Plan" })}
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default PartnerPlanCards;
