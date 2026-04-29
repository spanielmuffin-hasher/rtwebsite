"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "rc_crystals_visited";

function useFirstVisit() {
  const [mounted, setMounted] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    setMounted(true);
    const visited = sessionStorage.getItem(STORAGE_KEY);
    if (!visited) {
      setIsFirst(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, []);

  return mounted && isFirst;
}

const LETTERS = "ROTARACT".split("");

export function Preloader() {
  const isFirst = useFirstVisit();
  const [visible, setVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isFirst) return;
    const timer = setTimeout(() => setVisible(false), prefersReduced ? 400 : 2600);
    return () => clearTimeout(timer);
  }, [isFirst, prefersReduced]);

  if (!isFirst) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-neutral-900 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
        >
          {/* Animated progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-[3px] bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Logo mark */}
          <motion.div
            className="mb-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="text-white font-bold text-2xl font-display">R</span>
          </motion.div>

          {/* Staggered letter reveal */}
          <div className="flex gap-[0.08em] overflow-hidden" aria-hidden>
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                className="text-white text-4xl md:text-6xl font-display font-bold tracking-[0.15em]"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.35 + i * 0.045,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-3 text-neutral-400 text-sm tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Crystals · Coimbatore
          </motion.p>

          {/* Exit slash — bottom-right accent */}
          <motion.div
            className="absolute bottom-8 right-8 text-primary/30 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            RID 3206
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
