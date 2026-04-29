"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  as: Tag = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const springConfig = { stiffness: 200, damping: 18, mass: 0.6 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseEnter = () => { setIsHovered(true); scale.set(1.04); };
  const handleMouseLeave = () => { setIsHovered(false); x.set(0); y.set(0); scale.set(1); };

  // Before mount: render a plain element so server HTML matches client initial render.
  // Framer Motion adds style={{transform:"none"}} to every motion.* on SSR — unavoidable
  // unless we skip the motion element entirely until after hydration.
  if (!mounted) {
    const PlainTag = Tag as React.ElementType;
    return (
      <PlainTag
        className={`relative ${className}`}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </PlainTag>
    );
  }

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.button;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLButtonElement>}
      style={prefersReduced ? {} : { x, y, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
      {!prefersReduced && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] bg-white/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </MotionTag>
  );
}
