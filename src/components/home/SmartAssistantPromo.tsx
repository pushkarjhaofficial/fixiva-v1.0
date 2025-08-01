import React from "react"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "react-i18next"
import { FaMicrophoneAlt, FaRobot } from "react-icons/fa"
import assistantImage from "@/assets/ai-assistant.png"

export interface SmartAssistantPromoProps {
  className?: string
}

/**
 * SmartAssistantPromo
 * Promotes FixivaBot & Voice/AI Assistant capabilities.
 * Includes illustration, voice icon, and multilingual promo text.
 */
const SmartAssistantPromo: React.FC<SmartAssistantPromoProps> = ({ className }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const textColor = theme === "dark" ? "text-white" : "text-gray-900"
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600"
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white"

  return (
    <section
      role="region"
      aria-labelledby="smart-assistant-title"
      className={clsx(
        "py-16 px-4 lg:px-0",
        bgColor,
        className
      )}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Block */}
        <div>
          <h2
            id="smart-assistant-title"
            className={clsx("text-3xl font-bold mb-4 flex items-center gap-3", textColor)}
          >
            <FaRobot className="text-[--color-primary]" />
            {t("home.smartAssistant.heading") || "Meet Your AI Assistant"}
          </h2>
          <p className={clsx("mb-6 text-lg", subText)}>
            {t("home.smartAssistant.description") ||
              "Use voice commands, AI help, or FixivaBot for seamless bookings, recycling, and support. Faster than ever before."}
          </p>
          <div className="flex items-center gap-4">
            <button
              className="px-5 py-2 bg-[--color-primary] text-white rounded-md font-semibold hover:bg-[--color-primary]/90 transition flex items-center gap-2"
              aria-label="Try voice assistant"
            >
              <FaMicrophoneAlt />
              {t("home.smartAssistant.cta") || "Try Voice"}
            </button>
            <button
              className="px-5 py-2 border border-[--color-primary] text-[--color-primary] rounded-md font-medium hover:bg-[--color-primary]/10 transition"
              aria-label="Chat with FixivaBot"
            >
              💬 {t("home.smartAssistant.botCta") || "Chat with FixivaBot"}
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={assistantImage}
            alt={t("home.smartAssistant.imageAlt") || "AI Assistant Illustration"}
            className="max-w-sm w-full h-auto drop-shadow-xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default SmartAssistantPromo
