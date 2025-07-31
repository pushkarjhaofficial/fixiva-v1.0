import React from "react"
import { useTheme, FIXIVA_THEMES, type FixivaTheme } from "@/hooks/useTheme"

export const ThemeSwitcher: React.FC = () => {
  // If your useTheme hook does NOT return emoji/toggleTheme, add fallback below
  const {
    theme,
    setTheme,
    availableThemes = FIXIVA_THEMES,
    toggleTheme,
    emoji = "🎨"
  } = useTheme() as ReturnType<typeof useTheme> & { emoji?: string; toggleTheme?: () => void }

  // Future ready: You can keep an extended map for emoji/name/label per theme
  const THEME_META: Record<FixivaTheme, { name: string; emoji: string }> = {
    glass:      { name: "Glass", emoji: "🧊" },
    light:      { name: "Light", emoji: "🌞" },
    dark:       { name: "Dark", emoji: "🌑" },
    dracula:    { name: "Dracula", emoji: "🧛‍♂️" },
    luxury:     { name: "Luxury", emoji: "💎" },
    synthwave:  { name: "Synthwave", emoji: "🪐" },
    cyberpunk:  { name: "Cyberpunk", emoji: "⚡" },
    valentine:  { name: "Valentine", emoji: "💖" },
    halloween:  { name: "Halloween", emoji: "🎃" },
    blue:       { name: "Blue", emoji: "🌊" },
    green:      { name: "Green", emoji: "🌱" },
    red:        { name: "Red", emoji: "🍎" },
    purple:     { name: "Purple", emoji: "🔮" },
    gold:       { name: "Gold", emoji: "🥇" },
    pink:       { name: "Pink", emoji: "🌸" },
    mono:       { name: "Mono", emoji: "⚫" }
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-lg" aria-label="Current theme">{THEME_META[theme]?.emoji || emoji}</span>
      <select
        aria-label="Switch theme"
        value={theme}
        onChange={e => setTheme(e.target.value as FixivaTheme)}
        className="border rounded px-2 py-1 bg-transparent text-sm"
      >
        {availableThemes.map((t) =>
          <option key={t} value={t}>
            {THEME_META[t]?.emoji || "🎨"} {THEME_META[t]?.name || t}
          </option>
        )}
      </select>
      {/* Cycle themes button (optional) */}
      {toggleTheme && (
        <button
          aria-label="Next theme"
          onClick={toggleTheme}
          className="ml-2 px-2 py-1 border rounded text-xs hover:opacity-80"
          type="button"
        >
          ⏭
        </button>
      )}
    </div>
  )
}

export default ThemeSwitcher
