import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
import { toast } from "react-hot-toast";
import { FaUserFriends, FaCopy, FaGift } from "react-icons/fa";

const REFERRAL_CODE = "FIXIVA123"; // Replace with dynamic code if available

export function CustomerReferralCard({ referralCode = REFERRAL_CODE, reward = "₹100" }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    sendBotEvent?.("referral_code_copied", { referralCode });
    toast.success(t("referral_code_copied", { defaultValue: "Referral code copied!" }));
  };

  const handleShare = () => {
    sendBotEvent?.("referral_code_shared", { referralCode });
    toast.success(t("referral_code_shared_success", { defaultValue: "Referral shared! Start earning." }));
    // Optionally implement navigator.share for mobile native sharing
  };

  return (
    <>
      <FixivaHelmet
        title={t("customer_referral_title", { defaultValue: "Refer & Earn" })}
        description={t("customer_referral_desc", { defaultValue: "Share your code and earn rewards." })}
        name="CustomerReferralCard"
      />
      <div
        className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-[var(--color-text)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
        aria-label={t("customer_referral_card", { defaultValue: "Customer Referral Card" })}
      >
        <div className="flex items-center gap-4">
          <FaUserFriends className="text-2xl text-[var(--color-primary)]" />
          <div>
            <h3 className="text-lg font-bold mb-1">{t("refer_and_earn", { defaultValue: "Refer & Earn" })}</h3>
            <p className="text-xs text-[var(--color-muted)]">
              {t("referral_subtitle", {
                defaultValue: `Invite friends and earn ${reward} wallet credit for each successful signup!`,
                reward,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <span className="font-mono px-3 py-1 rounded bg-[var(--color-bg-muted)] border border-[var(--color-border)] select-all">
            {referralCode}
          </span>
          <button
            aria-label={t("copy_code", { defaultValue: "Copy Code" })}
            className="p-2 rounded bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-accent)] transition"
            onClick={handleCopy}
            type="button"
          >
            <FaCopy />
          </button>
          <button
            aria-label={t("share_code", { defaultValue: "Share Code" })}
            className="p-2 rounded bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-accent)] transition"
            onClick={handleShare}
            type="button"
          >
            <FaGift />
          </button>
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default CustomerReferralCard;
