import React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"

export interface TooltipProps {
  content: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  delay?: number
  children: React.ReactNode
}

/**
 * Tooltip
 * Accessible, theme-aware tooltip for Fixiva UI.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = "top",
  delay = 200,
  children
}) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root delayDuration={delay}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          className="z-50 px-3 py-1.5 rounded bg-[--color-bg-secondary] text-[--color-primary] shadow-lg border text-sm font-medium animate-fadein"
        >
          {content}
          <RadixTooltip.Arrow className="fill-[--color-bg-secondary]" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
)

export default Tooltip
