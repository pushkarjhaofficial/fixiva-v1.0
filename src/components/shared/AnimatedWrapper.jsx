import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedWrapper
 * - Wraps content with a consistent motion animation for smooth entry/exit.
 * - Accepts `className`, `style`, and children.
 * - Animation can be customized via props if needed.
 */
const animation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

function AnimatedWrapper({ children, className = "", style = {}, ...rest }) {
  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      className={`rounded-lg bg-[--color-bg] p-4 shadow dark:bg-[var(--color-bg)] ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedWrapper;
