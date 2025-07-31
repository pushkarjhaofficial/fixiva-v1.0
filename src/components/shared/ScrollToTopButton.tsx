import React, { useEffect, useState } from "react"

export const ScrollToTopButton: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleScroll = () => setShow(window.scrollY > 200)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }

  return show ? (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-40 rounded-full bg-[--color-primary] text-white shadow-lg p-3 hover:scale-110 transition"
      style={{ boxShadow: "0 6px 30px -4px #1c70e855" }}
    >
      <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M12 18V6M12 6L6 12M12 6l6 6"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  ) : null
}

export default ScrollToTopButton
