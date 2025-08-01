import React from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { FaQuoteLeft } from "react-icons/fa"

export interface Testimonial {
  name: string
  role: string
  photoUrl?: string
  quote: string
}

export interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  className?: string
}

/**
 * TestimonialsSection
 * - Displays quotes from customers, vendors, partners, and govt officers
 * - Responsive, i18n-ready, theme-aware, SEO-friendly
 */
const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  className,
}) => {
  const { t, i18n } = useTranslation()

  return (
    <section
      role="region"
      aria-labelledby="testimonials-heading"
      dir={i18n.dir()}
      className={clsx("py-16 bg-[--color-bg-secondary] text-[--color-text-secondary]", className)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="testimonials-heading"
          className="text-3xl font-bold text-center mb-12"
        >
          {t("home.testimonials.heading")}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tst, idx) => (
            <blockquote
              key={idx}
              className="relative p-6 bg-[--color-bg] rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <FaQuoteLeft
                className="text-4xl text-[--color-primary] mb-4"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed mb-4">
                &ldquo;{tst.quote}&rdquo;
              </p>
              {tst.photoUrl && (
                <img
                  src={tst.photoUrl}
                  alt={tst.name}
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />
              )}
              <footer className="text-sm font-semibold">
                {tst.name}, <span className="opacity-75">{tst.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
