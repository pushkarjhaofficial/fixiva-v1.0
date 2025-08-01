// src/components/booking/BookingStepper.tsx

import React from "react"
import clsx from "clsx"

interface Step {
  key: string
  label: string
}

interface Props {
  steps: Step[]
  activeStep: string
  onStepClick?: (key: string) => void
}

const BookingStepper: React.FC<Props> = ({ steps, activeStep, onStepClick }) => {
  return (
    <div className="flex justify-between items-center gap-4 overflow-x-auto py-2">
      {steps.map((step, idx) => {
        const isActive = step.key === activeStep
        return (
          <div
            key={step.key}
            onClick={() => onStepClick?.(step.key)}
            className={clsx(
              "flex items-center gap-2 cursor-pointer",
              isActive
                ? "text-primary-700 font-semibold"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            )}
          >
            <span className={clsx("w-6 h-6 rounded-full flex items-center justify-center border", {
              "bg-primary-600 text-white border-primary-600": isActive,
              "border-neutral-400 dark:border-neutral-600": !isActive
            })}>
              {idx + 1}
            </span>
            <span className="whitespace-nowrap">{step.label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default BookingStepper
