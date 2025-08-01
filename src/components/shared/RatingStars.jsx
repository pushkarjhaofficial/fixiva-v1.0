import React from "react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

/**
 * RatingStars component
 * @param {number} rating - current rating (e.g. 3)
 * @param {number} outOf - max stars (e.g. 5)
 * @param {boolean} interactive - allow user to set rating
 * @param {function} onRate - callback on user rate (if interactive)
 */
export function RatingStars({ rating = 0, outOf = 5, interactive = false, onRate }) {
  const { t } = useTranslation();
  const { sendBotEvent } = useFixivaBot();

  const handleRate = (value) => {
    if (interactive && onRate) {
      onRate(value);
      sendBotEvent?.("rating_star_clicked", { value });
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("rating_stars_title", { defaultValue: "Rating" })}
        description={t("rating_stars_desc", { defaultValue: "User rating stars." })}
        name="RatingStars"
      />
      <div
        className="flex gap-1 items-center"
        aria-label={t("rating_stars_aria", { defaultValue: "Rating" })}
        role={interactive ? "slider" : "img"}
        aria-valuenow={rating}
        aria-valuemax={outOf}
      >
        {[...Array(outOf)].map((_, idx) => (
          <span
            key={idx}
            className={`text-xl cursor-pointer select-none ${
              idx < rating
                ? "text-yellow-400"
                : "text-[var(--color-border)]"
            }`}
            onClick={() => handleRate(idx + 1)}
            tabIndex={interactive ? 0 : -1}
            aria-label={
              interactive
                ? t("rate_n_stars", { defaultValue: `${idx + 1} star(s)`, count: idx + 1 })
                : undefined
            }
            onKeyDown={e => {
              if (interactive && (e.key === "Enter" || e.key === " ")) handleRate(idx + 1);
            }}
            role={interactive ? "button" : undefined}
          >
            {idx < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    </>
  );
}


// auto‑added by add-default-exports.js
export default RatingStars;
