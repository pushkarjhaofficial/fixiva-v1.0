import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/context/LanguageContext"

const COOKIE_KEY = "fixiva_cookie_consent"

const copy: Record<string, { consent: string; accept: string; policy: string }> = {
  en: {
    consent: "We use cookies for best experience. See our",
    accept: "Accept",
    policy: "Cookie Policy"
  },
  hi: {
    consent: "हम सर्वोत्तम अनुभव के लिए कुकीज़ का उपयोग करते हैं।",
    accept: "स्वीकार करें",
    policy: "कुकी नीति"
  },
  // Extend for all Fixiva languages
}

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false)
  const { lang } = useLanguage()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(localStorage.getItem(COOKIE_KEY) !== "accepted")
    }
  }, [])

  const acceptCookies = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_KEY, "accepted")
      setShow(false)
    }
  }

  if (!show) return null
  const t = copy[lang] || copy["en"]

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[--color-bg-secondary] border-t border-[--color-primary] shadow-lg px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2 text-[--color-text]">
      <span>
        {t.consent}{" "}
        <Link to="/cookie-policy" className="underline hover:opacity-80" tabIndex={0}>
          {t.policy}
        </Link>
        .
      </span>
      <button
        onClick={acceptCookies}
        className="px-4 py-1 rounded bg-[--color-primary] text-white font-semibold hover:bg-opacity-90 ml-2"
        aria-label={t.accept}
      >
        {t.accept}
      </button>
    </div>
  )
}

export default CookieConsent
