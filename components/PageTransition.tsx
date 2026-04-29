"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const WIPE_DURATION = 0.55;
const EASE = [0.76, 0, 0.24, 1] as const;

const curtainVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  enter: {
    scaleY: 1,
    transformOrigin: "bottom",
    transition: { duration: WIPE_DURATION, ease: EASE },
  },
  exit: {
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: WIPE_DURATION, ease: EASE, delay: 0.05 },
  },
};

const contentVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut", delay: WIPE_DURATION * 0.6 },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const reducedVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <>{children}</>;

  if (prefersReduced) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={reducedVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Full-screen crimson curtain wipe */}
        <motion.div
          className="fixed inset-0 z-[9999] bg-primary pointer-events-none"
          variants={curtainVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        />

        {/* Page content fades in after curtain reveals */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
