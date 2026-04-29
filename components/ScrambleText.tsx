"use client";

import React, { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SCRAMBLE_SPEED = 40;
const REVEAL_STEP = 1;

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function ScrambleText({
  text,
  className,
  as: Tag = "span",
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [scrambling, setScrambling] = useState(false);
  const rafRef = useRef<NodeJS.Timeout | null>(null);
  const iterRef = useRef(0);
  const prefersReduced = useReducedMotion();

  const scramble = useCallback(() => {
    if (prefersReduced) return;

    iterRef.current = 0;
    setScrambling(true);
    if (rafRef.current) clearInterval(rafRef.current);

    rafRef.current = setInterval(() => {
      const revealed = iterRef.current;
      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return char;
          return randomChar();
        })
        .join("");

      setDisplay(scrambled);
      iterRef.current += REVEAL_STEP;

      if (iterRef.current > text.length) {
        clearInterval(rafRef.current!);
        setDisplay(text);
        setScrambling(false);
      }
    }, SCRAMBLE_SPEED);
  }, [text, prefersReduced]);

  const reset = useCallback(() => {
    if (rafRef.current) clearInterval(rafRef.current);
    setDisplay(text);
    setScrambling(false);
  }, [text]);

  return (
    <Tag
      className={`inline-block ${scrambling ? "font-mono" : ""} ${className ?? ""}`}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onFocus={scramble}
      onBlur={reset}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}

export function WaveText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={`inline-flex ${className ?? ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-200"
          style={{
            transform: active ? `translateY(-3px)` : "translateY(0px)",
            transitionDelay: `${i * 25}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
