"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  "data-gsap-heading"?: string;
  [key: string]: unknown;
}

/**
 * Pure CSS reveal — no Framer Motion.
 * Server renders opacity:0 + translate. IntersectionObserver sets data-visible=true
 * which triggers the CSS transition. No hydration mismatch, no race condition.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 32,
  duration = 0.7,
  once = true,
  threshold = 0.12,
  ...rest
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateMap: Record<string, string> = {
    up:    `translateY(${distance}px)`,
    down:  `translateY(-${distance}px)`,
    left:  `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none:  "none",
  };

  const hiddenTransform = translateMap[direction];

  return (
    <div
      ref={ref}
      className={clsx(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        transition: mounted
          ? `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`
          : "none",
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Stagger list wrapper ─────────────────────────────────────────────────────
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
  threshold = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); if (once) obs.disconnect(); }
        else if (!once) setVisible(false);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: mounted
              ? `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${initialDelay + i * staggerDelay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${initialDelay + i * staggerDelay}s`
              : "none",
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// ─── Text line clip reveal ────────────────────────────────────────────────────
export function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(110%)",
          transition: mounted
            ? `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`
            : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
