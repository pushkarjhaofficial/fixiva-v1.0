import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";
import { Player } from "@lottiefiles/react-lottie-player";
import { toast } from "react-hot-toast";

// Example animations (replace these imports with your assets)
import confettiAnimation from "@/assets/lottie/confetti-celebration.json";
import badgeAnimation from "@/assets/lottie/badge-unlock.json";

export function LoyaltyCard({ completed = 0, onRedeem = () => {} }) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  // Loyalty levels and progress
  const loyaltyLevel =
    completed >= 50
      ? "Platinum"
      : completed >= 30
      ? "Gold"
      : completed >= 15
      ? "Silver"
      : "Bronze";

  const progress = completed >= 50 ? 100 : (completed / 50) * 100;

  const handleRedeem = () => {
    sendBotEvent("loyalty_redeem_clicked", { completed, loyaltyLevel });
    toast.success(
      t("loyalty_redeem_success", { defaultValue: "Redeem initiated! Enjoy your loyalty benefits." })
    );
    onRedeem?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("loyalty_card_title", { defaultValue: "Loyalty Progress" })}
        description={t("loyalty_card_desc", { defaultValue: "Track and redeem your loyalty rewards." })}
        name="LoyaltyCard"
      />
      <div className="bg-[var(--color-bg)] rounded-xl p-6 mb-12 shadow relative overflow-hidden">
        {/* Confetti Animation (top right) */}
        <Player
          autoplay
          loop
          src={confettiAnimation}
          style={{ height: 100, width: 100 }}
          className="absolute -top-5 -right-5 opacity-50 pointer-events-none"
        />

        <div className="flex items-center justify-between">
          {/* Info & Progress */}
          <div className="max-w-[65%]">
            <h2 className="text-lg font-bold text-[var(--color-text)]">
              🎖 {t("loyalty_progress", { defaultValue: "Loyalty Progress" })}
            </h2>
            <p className="text-sm text-[var(--color-text)] mb-1">
              {t("current_level", { defaultValue: "Current Level:" })}{" "}
              <span className="font-medium text-[var(--color-primary)]">{t(loyaltyLevel, { defaultValue: loyaltyLevel })}</span>
            </p>
            <div className="w-full bg-[var(--color-muted)] rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "var(--color-primary, #6366f1)",
                }}
              />
            </div>
            <span className="block text-xs mt-2 text-[var(--color-text)]">
              {t("loyalty_hint", {
                defaultValue: `Complete more bookings to reach ${loyaltyLevel} status and unlock special rewards!`,
              })}
            </span>
          </div>

          {/* Badge & CTA */}
          <div className="flex flex-col items-center gap-2 min-w-[90px]">
            <Player
              autoplay
              loop
              src={badgeAnimation}
              style={{ height: 80, width: 80 }}
              className="pointer-events-none"
            />
            <span className="text-xs text-[var(--color-text)]">{t(loyaltyLevel, { defaultValue: loyaltyLevel })} Badge</span>
            <button
              aria-label={t("redeem_offers", { defaultValue: "Redeem Offers" })}
              onClick={handleRedeem}
              className="text-sm bg-[var(--color-primary)] text-[var(--color-text-light)] px-3 py-1 rounded shadow hover:bg-[var(--color-accent)] transition"
              type="button"
            >
              🎁 {t("redeem_offers", { defaultValue: "Redeem Offers" })}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default LoyaltyCard;
