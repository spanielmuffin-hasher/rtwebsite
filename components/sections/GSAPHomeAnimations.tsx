"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Zero-render GSAP orchestrator for homepage scroll timelines.
 * Renders nothing — only wires up ScrollTrigger animations after mount.
 */
export function GSAPHomeAnimations() {
  const prefersReduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {

      // ── 1. "Serving Since" stat cards stagger in ──────────────
      const statCards = document.querySelectorAll(".home-stat-card");
      if (statCards.length) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: "#home-about",
              start: "top 65%",
              once: true,
            },
          }
        );
      }

      // ── 2. Section heading pin-reveal timeline ─────────────────
      // Each h2 with data-gsap-heading gets a word-stagger reveal
      document.querySelectorAll("[data-gsap-heading]").forEach((el) => {
        const words = el.textContent?.split(" ") ?? [];
        el.innerHTML = words
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden"><span class="gsap-word inline-block">${w}</span></span> `
          )
          .join("");

        gsap.fromTo(
          el.querySelectorAll(".gsap-word"),
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.055,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // ── 3. Horizontal rule decorators ─────────────────────────
      document.querySelectorAll(".gsap-hr").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // ── 4. Image parallax on any [data-parallax] elements ─────
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax ?? "0.2");
        gsap.to(el, {
          y: `${speed * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // ── 5. Stagger reveal for any .gsap-stagger-group children ─
      document.querySelectorAll(".gsap-stagger-group").forEach((group) => {
        const children = group.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: group,
              start: "top 75%",
              once: true,
            },
          }
        );
      });

    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return null;
}
