"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "rc_crystals_visited";
const PRELOADER_MS = 2200;

function useFirstVisit() {
  const [mounted, setMounted] = useState(false);
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const visited = sessionStorage.getItem(STORAGE_KEY);
      if (!visited) {
        setIsFirst(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // sessionStorage blocked (private mode / some mobile browsers) — skip preloader
    }
  }, []);

  return mounted && isFirst;
}

export function Preloader() {
  const isFirst = useFirstVisit();
  const [visible, setVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isFirst) return;
    const ms = prefersReduced ? 300 : PRELOADER_MS;

    // Primary timer
    const timer = setTimeout(() => setVisible(false), ms);

    // Safety escape — fires on visibility change (mobile tab-switch) or hard cap at ms + 1500
    const hardCap = setTimeout(() => setVisible(false), ms + 1500);

    const onVisible = () => {
      if (document.visibilityState === "visible") setVisible(false);
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(timer);
      clearTimeout(hardCap);
      document.removeEventListener("visibilitychange", onVisible);
    };
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
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-[3px] bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: (PRELOADER_MS / 1000) - 0.3, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Image
              src="/crystalslogowht.png"
              alt="Rotaract Club of Coimbatore Crystals"
              width={220}
              height={70}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* RID tag */}
          <motion.p
            className="absolute bottom-8 right-8 text-primary/40 text-xs tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            RID 3206
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
