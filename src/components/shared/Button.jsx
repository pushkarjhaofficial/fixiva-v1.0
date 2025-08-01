import React from "react";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { motion } from "framer-motion";

export function Button({
  children,
  type = "button",
  onClick,
  loading = false,
  full = false,
  className = "",
  "aria-label": ariaLabel = "Action Button",
  ...rest
}) {
  const { t } = useTranslation();

  return (
    <>
      <FixivaHelmet
        title={t("button_component_title", { defaultValue: "Button" })}
        description={t("button_component_desc", { defaultValue: "App-wide button with motion and loader." })}
        name="Button"
      />
      <motion.button
        whileTap={{ scale: 0.98 }}
        type={type}
        onClick={onClick}
        disabled={loading}
        aria-label={ariaLabel}
        className={`
          inline-flex items-center justify-center
          px-5 py-2.5 rounded-md font-semibold
          bg-[--color-primary] text-[--color-text-light]
          hover:bg-[--color-hover] transition duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${full ? "w-full" : ""}
          ${className}
        `}
        {...rest}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-[--color-text-light]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-8 12h4z"
            />
          </svg>
        )}
        {loading ? t("please_wait", { defaultValue: "Please wait..." }) : children}
      </motion.button>
    </>
  );
}


// auto‑added by add-default-exports.js
export default Button;
