"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  speed?: number; // 0–1, fraction of scroll speed for bg
  overlay?: boolean;
  overlayOpacity?: number;
}

export function ParallaxSection({
  children,
  className = "",
  bgClassName = "bg-neutral-50",
  speed = 0.3,
  overlay = false,
  overlayOpacity = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -50}%`, `${speed * 50}%`]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layer */}
      <motion.div
        className={`absolute inset-[-20%] will-change-transform ${bgClassName}`}
        style={prefersReduced ? {} : { y }}
        aria-hidden
      />

      {/* Optional dark overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-neutral-900 pointer-events-none"
          style={{ opacity: overlayOpacity }}
          aria-hidden
        />
      )}

      {/* Content sits above parallax layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Simpler: just the bg element — use inside existing sections
export function ParallaxBg({
  className = "",
  speed = 0.25,
}: {
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -60}%`, `${speed * 60}%`]
  );

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-[-30%] will-change-transform pointer-events-none ${className}`}
      style={prefersReduced ? {} : { y }}
      aria-hidden
    />
  );
}
