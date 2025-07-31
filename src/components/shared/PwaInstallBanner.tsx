import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "@/hooks/useTheme"
import { useLanguage } from "@/context/LanguageContext"

const copy: Record<string, { title: string; install: string; close: string }> = {
  en: {
    title: "Install Fixiva for instant access.",
    install: "Install App",
    close: "Close"
  },
  hi: {
    title: "इंस्टेंट एक्सेस के लिए Fixiva इंस्टॉल करें।",
    install: "ऐप इंस्टॉल करें",
    close: "बंद करें"
  }
  // Extend for all Fixiva languages
}

const STORAGE_KEY = "fixiva_pwa_dismissed"

export const PwaInstallBanner: React.FC = () => {
  const [show, setShow] = useState(false)
  const [prompt, setPrompt] = useState<any>(null)
  const dismissed = useRef(false)
  const { theme } = useTheme()
  const { lang } = useLanguage()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Dismissed by user before
    if (localStorage.getItem(STORAGE_KEY) === "true") return

    const handler = (e: any) => {
      e.preventDefault()
      setPrompt(e)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", handler)
    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const onInstall = async () => {
    if (prompt) {
      prompt.prompt()
      const result = await prompt.userChoice
      if (result.outcome === "accepted") setShow(false)
      setPrompt(null)
    }
  }

  const onClose = () => {
    setShow(false)
    dismissed.current = true
    localStorage.setItem(STORAGE_KEY, "true")
  }

  if (!show) return null
  const t = copy[lang] || copy["en"]

  return (
    <div
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex flex-col md:flex-row items-center gap-3 px-6 py-3 bg-[--color-bg] border border-[--color-primary] shadow-xl rounded-2xl"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.80)"
      }}
      aria-live="polite"
    >
      <span className="text-[--color-primary] font-bold text-lg">{t.title}</span>
      <button
        onClick={onInstall}
        className="px-4 py-1 bg-[--color-primary] text-white rounded font-semibold hover:bg-opacity-80 transition"
        aria-label={t.install}
      >
        {t.install}
      </button>
      <button
        onClick={onClose}
        className="px-2 py-1 text-[--color-primary] rounded hover:underline text-sm"
        aria-label={t.close}
      >
        {t.close}
      </button>
    </div>
  )
}

export default PwaInstallBanner
