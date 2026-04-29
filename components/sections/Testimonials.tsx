"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";

const REVIEWS = [
  {
    name: "Arun Krishnamurthy",
    role: "Ex-President, 2022–23",
    text: "Rotaract Crystals transformed the way I look at leadership. The projects we ran, the friendships we built — these are bonds that last a lifetime.",
    rating: 5,
  },
  {
    name: "Priya Subramaniam",
    role: "Active Member",
    text: "Being part of this club gave me practical experience in project management and community outreach that no classroom could have taught me.",
    rating: 5,
  },
  {
    name: "Karthik Venkatesh",
    role: "Ex-Secretary, 2023–24",
    text: "The Crystals family goes beyond service. We grow together, celebrate together, and lift each other up. It's a community within a community.",
    rating: 5,
  },
  {
    name: "Divya Ramesh",
    role: "Active Member",
    text: "From my first meeting to leading a project — every step was supported. The mentorship here is unmatched in the district.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-primary">
          <path d="M8 1l1.94 3.93L14 5.76l-3 2.92.71 4.13L8 10.77l-3.71 1.94.71-4.13L2 5.76l4.06-.83L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-wide section-padding mb-12">
        <SectionReveal className="text-center">
          <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Reviews &amp; Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900">
            What Our Members Say
          </h2>
        </SectionReveal>
      </div>

      {/* Scrollable card track — no GSAP here, CSS-driven for simplicity */}
      <div className="flex gap-6 px-[5vw] overflow-x-auto pb-6 h-scroll-container">
        {[...REVIEWS, ...REVIEWS].map((review, i) => {
          const card = (
            <>
              <Stars count={review.rating} />
              <p className="text-neutral-600 text-sm leading-relaxed mt-4 mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">{review.name}</p>
                  <p className="text-neutral-400 text-xs">{review.role}</p>
                </div>
              </div>
            </>
          );

          const cardClass = "flex-shrink-0 w-80 bg-neutral-50 rounded-3xl p-7 border border-neutral-100";

          return mounted ? (
            <motion.div
              key={i}
              className={cardClass}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: prefersReduced ? 0 : (i % REVIEWS.length) * 0.08,
              }}
            >
              {card}
            </motion.div>
          ) : (
            <div key={i} className={cardClass}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
