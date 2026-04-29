"use client";

import { useEffect, useRef } from "react";

/**
 * Ink trail cursor — small ink drops bloom and fade along the cursor path.
 * Skips touch devices and reduced-motion users.
 */

interface InkDrop {
  x: number;
  y: number;
  r: number;
  maxR: number;
  opacity: number;
  colorIdx: number;
  life: number; // 0 → 1
}

const INK_COLORS: [number, number, number][] = [
  [236, 72,  153], // pink
  [139, 92,  246], // violet
  [244, 63,  94],  // rose
  [109, 40,  217], // deep violet
];

export function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    if (touch) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const drops: InkDrop[] = [];
    let lastX = -999, lastY = -999;
    let colorCycle = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 14) {
        // Main drop at cursor
        drops.push({
          x: e.clientX,
          y: e.clientY,
          r: 0,
          maxR: 10 + Math.random() * 18,
          opacity: 0.55 + Math.random() * 0.3,
          colorIdx: colorCycle % INK_COLORS.length,
          life: 0,
        });

        // Tiny satellite drops — 1-2 small splashes nearby
        const splashCount = Math.random() < 0.45 ? 2 : 1;
        for (let i = 0; i < splashCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const spread = 6 + Math.random() * 14;
          drops.push({
            x: e.clientX + Math.cos(angle) * spread,
            y: e.clientY + Math.sin(angle) * spread,
            r: 0,
            maxR: 3 + Math.random() * 7,
            opacity: 0.3 + Math.random() * 0.3,
            colorIdx: (colorCycle + 1) % INK_COLORS.length,
            life: 0,
          });
        }

        colorCycle++;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Remove dead drops
      for (let i = drops.length - 1; i >= 0; i--) {
        if (drops[i].life >= 1) drops.splice(i, 1);
      }

      for (const d of drops) {
        d.life += 0.022;
        // Expand quickly at first, then plateau
        d.r = d.maxR * Math.min(1, Math.pow(d.life / 0.35, 0.55));
        const [r, g, b] = INK_COLORS[d.colorIdx];
        // Fade: sharp fade after life > 0.4
        const fade = d.life < 0.35
          ? 1
          : 1 - Math.pow((d.life - 0.35) / 0.65, 1.4);
        const alpha = d.opacity * Math.max(0, fade);

        // Radial gradient for ink bleed look
        const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        grd.addColorStop(0,    `rgba(${r},${g},${b},${alpha})`);
        grd.addColorStop(0.55, `rgba(${r},${g},${b},${alpha * 0.5})`);
        grd.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  );
}
