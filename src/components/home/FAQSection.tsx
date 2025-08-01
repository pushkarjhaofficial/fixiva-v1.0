// src/components/home/FAQSection.tsx

import React, { useState } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"

export interface FAQItem {
  question: string
  answer: string
}
export interface FAQSectionProps {
  items: FAQItem[]
  className?: string
}

const FAQSection: React.FC<FAQSectionProps> = ({ items, className }) => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={clsx("py-16 bg-[--color-bg-secondary] text-[--color-text-secondary]", className)}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t("home.faq.heading")}</h2>
        <ul className="space-y-4">
          {items.map((faq, idx) => (
            <li key={idx} className="border rounded-lg bg-[--color-bg]">
              <button
                onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                className="w-full p-4 text-left font-semibold"
              >
                {faq.question}
              </button>
              {openIndex === idx && (
                <div className="px-4 pb-4 text-sm text-[--color-text-secondary]">{faq.answer}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FAQSection
