"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { CommunityCanvas } from "@/components/CommunityCanvas";

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  eyebrow?: string;
}

function SplitWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        initial={{ y: "115%", opacity: 0, rotate: 2 }}
        animate={{ y: "0%", opacity: 1, rotate: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function Hero({ title, subtitle, cta, ctaSecondary, eyebrow }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY       = useTransform(scrollYProgress, [0, 1],    ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const words = title.split(" ");

  const heroContent = (
    <>
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-8 mt-6"
        >
          <span className="inline-flex items-center gap-3">
            <span className="w-6 h-[2px] bg-gradient-to-r from-primary to-violet-500 rounded-full flex-shrink-0 self-start mt-[0.55em]" />
            <span
              className="font-display font-semibold tracking-[0.18em] uppercase"
              style={{
                fontSize: "0.9rem",
                background: "linear-gradient(90deg, #EC4899, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {eyebrow}
            </span>
          </span>
        </motion.div>
      )}

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] font-display font-bold text-slate-900 leading-[1.1] tracking-tight mb-5">
        {(!mounted || prefersReduced) ? (
          title
        ) : (
          words.map((word, i) => (
            <span key={i}>
              <SplitWord word={word} delay={0.45 + i * 0.09} />
              {i < words.length - 1 && "\u00A0"}
            </span>
          ))
        )}
      </h1>

      {/* Gradient underline — left-aligned */}
      <motion.div
        className="h-1 w-24 rounded-full mb-6"
        style={{
          transformOrigin: "left",
          background: "linear-gradient(90deg, #EC4899, #8B5CF6, #F43F5E)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 3s ease-in-out infinite",
        }}
        initial={mounted ? { scaleX: 0, opacity: 0 } : false}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-slate-500 text-base md:text-lg max-w-lg leading-relaxed mb-10"
          initial={mounted ? { opacity: 0, y: 22 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* CTAs — left-aligned */}
      {(cta || ctaSecondary) && (
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4 mb-14"
          initial={mounted ? { opacity: 0, y: 22 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
        >
          {cta && (
            <MagneticButton
              as="a"
              href={cta.href}
              strength={0.3}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-sm tracking-wide overflow-hidden shadow-pink-glow"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-2px]">
                {cta.label}
              </span>
              <motion.span
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </motion.span>
              <motion.span
                className="absolute inset-0 bg-primary-700 rounded-full"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </MagneticButton>
          )}
          {ctaSecondary && (
            <MagneticButton
              as="a"
              href={ctaSecondary.href}
              strength={0.25}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm tracking-wide hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm"
            >
              {ctaSecondary.label}
            </MagneticButton>
          )}
        </motion.div>
      )}

      {/* Stats strip — left-aligned */}
      <motion.div
        className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-start gap-3 sm:gap-5"
        initial={mounted ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        {[
          { value: "2017", label: "Est." },
          { value: "9+",   label: "Years" },
          { value: "200+", label: "Projects" },
          { value: "50+", label: "Members" },
        ].map((s) => (
          <motion.div
            key={s.label}
            className="text-center px-4 py-2 rounded-2xl backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(236,72,153,0.14)",
            }}
            whileHover={{ scale: 1.07, boxShadow: "0 0 28px rgba(236,72,153,0.18)" }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xl font-display font-bold text-slate-900">{s.value}</p>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );

  const wrapperClass = "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-28";
  const innerClass   = "w-full lg:max-w-[500px]";

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] pt-20 flex items-center overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Canvas background */}
      <CommunityCanvas />

      {/* Left-aligned content — right half left clear for gear */}
      {mounted ? (
        <motion.div
          className={wrapperClass}
          style={prefersReduced ? {} : { y: contentY, opacity: contentOpacity }}
        >
          <div className={innerClass}>{heroContent}</div>
        </motion.div>
      ) : (
        <div className={wrapperClass}>
          <div className={innerClass}>{heroContent}</div>
        </div>
      )}

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          zIndex: 5,
          background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
