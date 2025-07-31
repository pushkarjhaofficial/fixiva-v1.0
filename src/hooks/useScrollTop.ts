import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * useScrollTop
 * Scrolls window to top on every route change.
 *
 * @param options Optional scroll options.
 * - top: number (default 0)
 * - left: number (default 0)
 * - behavior: 'auto' | 'smooth' (default 'auto')
 */
export const useScrollTop = (
  options: { top?: number; left?: number; behavior?: ScrollBehavior } = {}
): void => {
  const { pathname } = useLocation()
  const { top = 0, left = 0, behavior = "auto" } = options

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top, left, behavior })
    }
  }, [pathname, top, left, behavior])
}

export default useScrollTop
