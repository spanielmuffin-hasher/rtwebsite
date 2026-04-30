"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const STATS = [
  { value: 27,  suffix: "+", label: "Years of Service",  icon: "🏛️" },
  { value: 50, suffix: "+", label: "Active Members",     icon: "👥" },
  { value: 200, suffix: "+", label: "Projects Completed", icon: "✅" },
  { value: 12,  suffix: "",  label: "District Trainers",  icon: "🎓" },
];

function AnimatedStat({
  stat,
  index,
  trigger,
}: {
  stat: (typeof STATS)[number];
  index: number;
  trigger: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    if (prefersReduced) {
      setDisplayed(stat.value);
      return;
    }

    const duration   = 2000; // ms
    const delay      = index * 150;
    const startTime  = performance.now() + delay;
    let raf: number;

    const tick = (now: number) => {
      if (now < startTime) { raf = requestAnimationFrame(tick); return; }
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * stat.value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplayed(stat.value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, stat.value, stat.suffix, index, prefersReduced]);

  return <>{displayed}</>;
}

export function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 60%, #6d28d9 100%)",
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Moving grid overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "gridScrollDiag 20s linear infinite",
          }}
        />
      </div>

      <div className="container-wide section-padding relative z-10">
        <SectionReveal className="text-center mb-16">
          <p className="text-pink-200 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Impact in Numbers
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Measuring What Matters
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-3xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-500 group"
              style={{
                background: "rgba(255,255,255,0.08)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300" aria-hidden>
                {stat.icon}
              </span>
              <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2 tabular-nums">
                <AnimatedStat stat={stat} index={i} trigger={inView} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-pink-200 text-sm font-medium tracking-wide leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
