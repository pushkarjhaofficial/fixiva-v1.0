// src/components/layout/Footer.tsx

import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { useTheme } from "@/hooks/useTheme"
import useLanguage from "@/hooks/useLanguage"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa"

export interface FooterProps {
  /** Optional additional classes */
  className?: string
}

/**
 * Footer
 * World-class, responsive footer with company info, navigation, legal links, and social icons.
 */
const Footer: React.FC<FooterProps> = ({ className }) => {
  const { theme } = useTheme()
  const { lang } = useLanguage()

  const footerBg = "bg-[--color-bg-secondary]"
  const footerText = "text-[--color-text-secondary]"
  const borderTop = "border-t border-[--color-border]"

  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className={clsx(footerBg, footerText, borderTop, className)}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Fixiva</h3>
          <p className="text-sm leading-relaxed">
            Fixiva is the world’s most scalable, AI-powered repair &amp; recycle
            platform—connecting customers, vendors, and government partners
            seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/booking" className="hover:underline">
                Book Service
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/recycle" className="hover:underline">
                Recycle Device
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:underline">
                Live Chat
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-md font-medium mb-2">Resources</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:underline">
                Support Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-md font-medium mb-2">Connect with Us</h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://facebook.com/fixiva"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="text-xl hover:text-[--color-primary] transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/fixiva"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
              className="text-xl hover:text-[--color-primary] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/fixiva"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="text-xl hover:text-[--color-primary] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/company/fixiva"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="text-xl hover:text-[--color-primary] transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/fixiva"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="text-xl hover:text-[--color-primary] transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={clsx("py-4", "bg-[--color-bg]")}>
        <div className="max-w-7xl mx-auto px-4 text-center text-xs">
          &copy; {currentYear} Fixiva. All rights reserved. | Language: {lang.toUpperCase()}
        </div>
      </div>
    </footer>
  )
}

export default Footer
