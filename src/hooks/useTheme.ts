import { useCallback, useEffect, useState } from "react"

// Centralized list of theme keys (must match your theme.css)
export const FIXIVA_THEMES = [
  "glass", "light", "dark", "dracula", "luxury", "synthwave", "cyberpunk",
  "valentine", "halloween", "blue", "green", "red", "purple", "gold", "pink", "mono"
] as const

export type FixivaTheme = (typeof FIXIVA_THEMES)[number]

// Map themes to emoji (add/adjust as needed)
export const THEME_EMOJIS: Record<FixivaTheme, string> = {
  glass: "🪟",
  light: "🌞",
  dark: "🌚",
  dracula: "🧛",
  luxury: "💎",
  synthwave: "🌈",
  cyberpunk: "🤖",
  valentine: "💖",
  halloween: "🎃",
  blue: "🌊",
  green: "🌿",
  red: "🍎",
  purple: "🔮",
  gold: "🥇",
  pink: "🌸",
  mono: "⬛"
}

// Util to get/set persisted theme (localStorage), SSR-safe
function getStoredTheme(): FixivaTheme | null {
  if (typeof window === "undefined") return null
  const t = localStorage.getItem("fixiva_theme")
  return FIXIVA_THEMES.includes(t as FixivaTheme) ? (t as FixivaTheme) : null
}
function setStoredTheme(theme: FixivaTheme) {
  if (typeof window !== "undefined") localStorage.setItem("fixiva_theme", theme)
}

// Core useTheme hook with emoji
export const useTheme = (): {
  theme: FixivaTheme
  setTheme: (theme: FixivaTheme) => void
  availableThemes: readonly FixivaTheme[]
  emoji: string
} => {
  // Initial theme: load from storage, or default to 'glass'
  const [theme, setThemeState] = useState<FixivaTheme>(() => {
    return getStoredTheme() || "glass"
  })

  // Update <html data-theme> + storage on theme change
  useEffect(() => {
    if (typeof window === "undefined") return
    document.documentElement.setAttribute("data-theme", theme)
    setStoredTheme(theme)
    window.dispatchEvent(new CustomEvent("fixiva-theme-change", { detail: theme }))
  }, [theme])

  // Public setter
  const setTheme = useCallback((t: FixivaTheme) => {
    setThemeState(t)
  }, [])

  const emoji = THEME_EMOJIS[theme] || "🎨"

  return {
    theme,
    setTheme,
    availableThemes: FIXIVA_THEMES,
    emoji
  }
}

export default useTheme

// === (Optional) Built-in Voice Input for Theme Switching ===
export { useVoice } from "./useVoice"
