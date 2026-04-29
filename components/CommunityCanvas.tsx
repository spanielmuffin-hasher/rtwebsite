"use client";

import { useEffect, useRef } from "react";

/**
 * CommunityCanvas – Rotaract hero background.
 *
 * Three layers:
 *  1. Aurora field   – 5 large, very transparent gradient blobs moving on
 *                      Lissajous paths (smooth, organic, never random).
 *  2. Rotary wheel   – The actual Rotary International symbol (24-tooth gear,
 *                      6 spokes) as a faint watermark, slowly rotating.
 *  3. Service arcs   – 6 gentle bezier curves along the wheel's spokes,
 *                      each with a glowing highlight that flows outward —
 *                      representing service energy radiating from the club.
 */

type RGB = [number, number, number];

// ── Lissajous blob config ──────────────────────────────────────────────────
// x(t) = cxF*W + ampXF*W * sin(ax*t + phX)
// y(t) = cyF*H + ampYF*H * sin(ay*t + phY)
// Large radii + very low opacity = smooth aurora, never a visible "patch"
interface Blob {
  ax: number; ay: number;
  phX: number; phY: number;
  ampXF: number; ampYF: number;
  cxF: number; cyF: number;
  rF: number;       // radius as fraction of min(W,H)
  color: RGB;
  opacity: number;
  speed: number;    // t increment per frame
}

const BLOBS: Blob[] = [
  { ax:1, ay:2, phX:0,           phY:Math.PI/2,   ampXF:0.18,ampYF:0.12, cxF:0.50,cyF:0.42, rF:0.68, color:[236, 72,153], opacity:0.11, speed:0.00018 },
  { ax:2, ay:3, phX:Math.PI/4,   phY:0,            ampXF:0.14,ampYF:0.16, cxF:0.40,cyF:0.58, rF:0.62, color:[139, 92,246], opacity:0.10, speed:0.00014 },
  { ax:1, ay:3, phX:Math.PI,     phY:Math.PI/3,    ampXF:0.20,ampYF:0.10, cxF:0.60,cyF:0.50, rF:0.58, color:[244, 63, 94], opacity:0.08, speed:0.00022 },
  { ax:3, ay:2, phX:Math.PI/2,   phY:Math.PI,      ampXF:0.12,ampYF:0.18, cxF:0.32,cyF:0.55, rF:0.55, color:[245,158, 11], opacity:0.07, speed:0.00016 },
  { ax:2, ay:1, phX:2*Math.PI/3, phY:Math.PI/4,    ampXF:0.16,ampYF:0.14, cxF:0.70,cyF:0.44, rF:0.60, color:[109, 40,217], opacity:0.09, speed:0.00012 },
];

// ── Service arc config (one per gear spoke) ────────────────────────────────
interface ServiceArc {
  spokeAngleOffset: number; // added to current gear angle
  cpDist: number;           // control-point push fraction of base radius
  endDist: number;          // end-point fraction of min(W,H)
  color: RGB;
  speed: number;            // highlight flow speed (0–1 per frame)
  phase: number;            // initial highlight position
}

const SERVICE_ARCS: ServiceArc[] = [
  { spokeAngleOffset: 0,                color:[236, 72,153], cpDist:1.6, endDist:0.52, speed:0.0025, phase:0.00 },
  { spokeAngleOffset: Math.PI/3,        color:[139, 92,246], cpDist:1.5, endDist:0.48, speed:0.0020, phase:0.33 },
  { spokeAngleOffset: 2*Math.PI/3,      color:[245,158, 11], cpDist:1.7, endDist:0.50, speed:0.0030, phase:0.66 },
  { spokeAngleOffset: Math.PI,          color:[244, 63, 94], cpDist:1.6, endDist:0.52, speed:0.0022, phase:0.15 },
  { spokeAngleOffset: 4*Math.PI/3,      color:[139, 92,246], cpDist:1.5, endDist:0.48, speed:0.0028, phase:0.50 },
  { spokeAngleOffset: 5*Math.PI/3,      color:[236, 72,153], cpDist:1.7, endDist:0.50, speed:0.0018, phase:0.82 },
];

export function CommunityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let raf: number;
    let t = 0;
    let gearAngle = 0;

    // arc phases (mutable)
    const arcPhases = SERVICE_ARCS.map(a => a.phase);

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width  = rect.width;
      H = canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // ── helpers ──────────────────────────────────────────────
    const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

    /** Point on a quadratic bezier at parameter u ∈ [0,1] */
    const bezierPt = (
      x0:number,y0:number, cx0:number,cy0:number, x1:number,y1:number, u:number
    ): [number,number] => {
      const iu = 1 - u;
      return [
        iu*iu*x0 + 2*iu*u*cx0 + u*u*x1,
        iu*iu*y0 + 2*iu*u*cy0 + u*u*y1,
      ];
    };

    // ── draw gear (canvas path) ───────────────────────────────
    const drawGear = (cx: number, cy: number, outerR: number, teeth: number, angle: number, alpha: number) => {
      if (outerR < 12) return;
      const innerR = outerR * 0.68;
      const hubR   = innerR * 0.30;
      const step   = (Math.PI * 2) / teeth;
      const hw     = step * 0.30;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(219,39,119,1)`;
      ctx.lineWidth   = 2.8;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";

      // Teeth outline
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a = angle + i * step;
        ctx.lineTo(cx + Math.cos(a - hw) * innerR, cy + Math.sin(a - hw) * innerR);
        ctx.lineTo(cx + Math.cos(a - hw) * outerR, cy + Math.sin(a - hw) * outerR);
        ctx.lineTo(cx + Math.cos(a + hw) * outerR, cy + Math.sin(a + hw) * outerR);
        ctx.lineTo(cx + Math.cos(a + hw) * innerR, cy + Math.sin(a + hw) * innerR);
      }
      ctx.closePath();
      ctx.stroke();

      // Hub
      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.stroke();

      // 6 spokes
      for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * hubR * 1.1,   cy + Math.sin(a) * hubR * 1.1);
        ctx.lineTo(cx + Math.cos(a) * innerR * 0.94, cy + Math.sin(a) * innerR * 0.94);
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── draw one service arc ──────────────────────────────────
    const drawServiceArc = (
      cx: number, cy: number, gearR: number,
      arc: ServiceArc, phase: number, base: number
    ) => {
      const angle = gearAngle + arc.spokeAngleOffset;
      const innerR = gearR * 0.68;

      // start = spoke tip on inner ring
      const sx = cx + Math.cos(angle) * innerR * 0.95;
      const sy = cy + Math.sin(angle) * innerR * 0.95;

      // control point: pushed outward radially + slight perpendicular
      const cpR   = gearR * arc.cpDist;
      const cpx   = cx + Math.cos(angle) * cpR;
      const cpy   = cy + Math.sin(angle) * cpR;

      // end point: toward viewport edge along spoke direction
      const endR  = base * arc.endDist;
      const ex    = cx + Math.cos(angle) * endR;
      const ey    = cy + Math.sin(angle) * endR;

      const [r, g, b] = arc.color;

      // Faint guide path
      ctx.save();
      ctx.globalAlpha = 0.07;
      ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(cpx, cpy, ex, ey);
      ctx.stroke();
      ctx.restore();

      // Flowing highlight — a short bright segment travelling along the arc
      const segLen = 0.22; // fraction of arc length shown
      const u0 = phase;
      const u1 = Math.min(1, phase + segLen);

      if (u0 >= 1) return;

      // sample points along segment for the gradient
      const pts: [number,number][] = [];
      const steps = 20;
      for (let s = 0; s <= steps; s++) {
        const u = lerp(u0, u1, s / steps);
        pts.push(bezierPt(sx, sy, cpx, cpy, ex, ey, Math.max(0, Math.min(1, u))));
      }

      for (let s = 0; s < pts.length - 1; s++) {
        const progress = s / (pts.length - 1);
        // bright at center of segment, fades at both ends
        const bright = Math.sin(progress * Math.PI);
        ctx.save();
        ctx.globalAlpha = bright * 0.75;
        ctx.strokeStyle = `rgba(${r},${g},${b},1)`;
        ctx.lineWidth   = 1.8 + bright * 1.2;
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(pts[s][0],   pts[s][1]);
        ctx.lineTo(pts[s+1][0], pts[s+1][1]);
        ctx.stroke();
        ctx.restore();
      }

      // Glow at current tip
      const tipU = Math.min(1, phase + segLen * 0.5);
      const [tx, ty] = bezierPt(sx, sy, cpx, cpy, ex, ey, tipU);
      const gr = ctx.createRadialGradient(tx, ty, 0, tx, ty, 12);
      gr.addColorStop(0, `rgba(${r},${g},${b},0.45)`);
      gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(tx, ty, 12, 0, Math.PI * 2);
      ctx.fillStyle = gr;
      ctx.fill();
      ctx.restore();
    };

    // ── render loop ───────────────────────────────────────────
    const draw = () => {
      if (W === 0 || H === 0) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);

      t          += 1;
      gearAngle  += 0.00030;

      const cx    = W * 0.5;
      const cy    = H * 0.5;
      const base  = Math.min(W, H);
      // Gear sits right-of-center so it doesn't clash with centered text
      const gearCx = W * 0.72;
      const gearCy = H * 0.50;
      const gearR  = base * 0.30;

      // 1. Aurora blobs
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      for (const b of BLOBS) {
        const bx = b.cxF * W + b.ampXF * W * Math.sin(b.ax * t * b.speed + b.phX);
        const by = b.cyF * H + b.ampYF * H * Math.sin(b.ay * t * b.speed + b.phY);
        const br = base * b.rF;
        const grd = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        const [r, g, bl] = b.color;
        grd.addColorStop(0,   `rgba(${r},${g},${bl},${b.opacity})`);
        grd.addColorStop(0.45,`rgba(${r},${g},${bl},${b.opacity * 0.4})`);
        grd.addColorStop(1,   `rgba(${r},${g},${bl},0)`);
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
      ctx.restore();

      // 2. Rotary gear — white halo behind for contrast, then draw wheel
      const haloGrd = ctx.createRadialGradient(gearCx, gearCy, 0, gearCx, gearCy, gearR * 1.4);
      haloGrd.addColorStop(0,   "rgba(255,255,255,0.50)");
      haloGrd.addColorStop(0.55,"rgba(255,255,255,0.18)");
      haloGrd.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(gearCx, gearCy, gearR * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = haloGrd;
      ctx.fill();
      drawGear(gearCx, gearCy, gearR, 24, gearAngle, 0.45);

      // 3. Service arcs
      for (let i = 0; i < SERVICE_ARCS.length; i++) {
        arcPhases[i] = (arcPhases[i] + SERVICE_ARCS[i].speed) % 1.2;
        drawServiceArc(gearCx, gearCy, gearR, SERVICE_ARCS[i], arcPhases[i], base);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
