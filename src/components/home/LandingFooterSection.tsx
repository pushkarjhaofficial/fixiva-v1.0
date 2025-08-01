// src/components/home/LandingFooterSection.tsx

import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export interface LandingFooterSectionProps {
  className?: string
}

const LandingFooterSection: React.FC<LandingFooterSectionProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <footer className={clsx("py-10 bg-[--color-bg-secondary] text-[--color-text-secondary]", className)}>
      <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold mb-2">{t("home.footer.about")}</h4>
          <p className="text-sm">{t("home.footer.aboutDesc")}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">{t("home.footer.links")}</h4>
          <ul className="text-sm space-y-1">
            <li><Link to="/booking">{t("nav.booking")}</Link></li>
            <li><Link to="/recycle">{t("nav.recycle")}</Link></li>
            <li><Link to="/dashboard">{t("nav.dashboard")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">{t("home.footer.legal")}</h4>
          <ul className="text-sm space-y-1">
            <li><Link to="/privacy">{t("nav.privacy")}</Link></li>
            <li><Link to="/terms">{t("nav.terms")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">{t("home.footer.contact")}</h4>
          <p className="text-sm">support@fixiva.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-[--color-text-secondary]">
        &copy; {new Date().getFullYear()} Fixiva. {t("home.footer.rights")}
      </div>
    </footer>
  )
}

export default LandingFooterSection
