// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode
} from "react"

// ── Theme Definitions ───────────────────────────────────────
export const AVAILABLE_THEMES = [
  "light",
  "dark",
  "blue",
  "solar",
  "emerald",
  "retro",
  "pastel",
  "synthwave"
] as const

export type Theme = (typeof AVAILABLE_THEMES)[number]

const DEFAULT_THEME: Theme = "light"
const STORAGE_KEY = "fixiva_theme"

// ── Context Shape ──────────────────────────────────────────
export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

// ── Provider ────────────────────────────────────────────────
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME)

  // Init from localStorage + apply to <html>
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const applied = stored && AVAILABLE_THEMES.includes(stored) ? stored : DEFAULT_THEME
    setThemeState(applied)
    document.documentElement.setAttribute("data-theme", applied)
  }, [])

  // Explicit setter
  const setTheme = useCallback((newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) return
    setThemeState(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [])

  // Cycle through the list
  const toggleTheme = useCallback(() => {
    const idx = AVAILABLE_THEMES.indexOf(theme)
    const next = AVAILABLE_THEMES[(idx + 1) % AVAILABLE_THEMES.length]
    setTheme(next)
  }, [theme, setTheme])

  const isDark = theme === "dark"

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────
export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>")
  return ctx
}
